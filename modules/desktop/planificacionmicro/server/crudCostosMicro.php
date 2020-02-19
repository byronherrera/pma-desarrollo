<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function calcularTotal($id)
{
    // aca el calculo
    global $os;

    $sql = "SELECT SUM(total_after_adjust) as total  FROM pma_costos_micro where id = $id ";
    $result = $os->db->conn->query($sql);
    $total = 0;
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        if (!is_null($row ['total']))
            $total = $row ['total'];
    }
    return $total;
}
function calcularTotalMicroCostDetail($id)
{
    // aca el calculo
    global $os;

    $sql = "SELECT SUM(total_adjusted) as total  FROM pma_costos_micro_detalle where id_pma_costos_micro = $id ";
    $result = $os->db->conn->query($sql);
    $total = 0;
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        if (!is_null($row ['total']))
            $total = $row ['total'];
    }
    return $total;
}


function selectDetalleInspecciones()
{
    global $os;

    $where = "";

    if (isset($_POST['id'])) {
        $id = (int)$_POST ['id'];
        $where = "WHERE id_pma_costos_macro  = '$id'";
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        if (isset($_POST['filterField'])) {
            $columnaBusqueda = $_POST['filterField'];
        }
        $where = "WHERE $columnaBusqueda = '$campo'";
    }

    // cambio BH
    $orderby = 'ORDER BY id DESC';

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM pma_costos_micro  $where  $orderby ";

    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $total = calcularTotalMicroCostDetail($row['id']);

        $row['total_cost_detail'] = $total;
        $data[] = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function selectDetalleTodasInspecciones()
{
    global $os;
    //Se inicializa el parámetro de búsqueda de código trámite
    $columnaBusqueda = 'id_inspeccion';
    $funcionario_entrega = $os->get_member_id();
    $where = "";

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if (isset($_POST['filterField'])) {
            $columnaBusqueda = $_POST['filterField'];
        }
        $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
    }


    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;
    // cambio BH
    $orderby = 'ORDER BY id DESC';

    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM pma_costos_micro $where $orderby LIMIT $start, $limit";

    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function insertDetalleInspecciones()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    // $data->id_inspeccion = generaNuevoCodigoInspeccion();
    //$data->fecha_recepcion_documento = date('Y-m-d H:i:s');
    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {

        if (($clave == 'funcionario_reasignacion') OR ($clave == 'guia') OR ($clave == 'acta_verificacion') OR ($clave == 'id_zona') OR ($clave == 'id_actividad')) {
            if ($valor == '') {
                $valor = 'NULL';
            }
        }

        if ($valor === 'NULL') {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . " " . $valor . " ,";
        } else {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }

    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql1 = "INSERT INTO pma_costos_micro($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql1);

    $verificaInsert = $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    if ($verificaInsert) {
        echo json_encode(array(
            "success" => true,
            "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
            "data" => array($data)
        ));
        // para el caso que ya se haya procesado o sea reinspeccion
        //actualizar_estado_tramite_usado($data->id_pma_contribuciones);
    } else {
        echo json_encode(array(
            "success" => false,
            "msg" => $sql->errorCode() . $sql1,
            "data" => array($data)
        ));
    }
}

function updateDetalleInspecciones()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    // calculo el valor de total en base de amount - adjust
    $data->total_after_adjust = $data->total_micro + $data->adjust;


    $message = '';
    $data->glcode1 = $data->glcode;
    $data->glcode2 = $data->glcode;

    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        if (($clave == 'cost_code') OR ($clave == 'total') OR ($clave == 'doc') OR ($clave == 'dsc') OR ($clave == 'adjust') OR ($clave == 'comment') OR ($clave == 'fecha_registro') OR ($clave == 'total_adjusted')) {
            if ($valor == '') {
                $valor = 'NULL';
            }
        }

        if ($valor === 'NULL') {
            $cadenaDatos = $cadenaDatos . $clave . " = " . $valor . " ,";
        } else {
            $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
        }

    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    // poner

    $sql = "UPDATE pma_costos_micro SET  $cadenaDatos  WHERE pma_costos_micro.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    // actualizar el total en el padre
    $idMicro = actualizarMicroTotal ($data->id_pma_costos_macro);

   // $idActivities = calcularActivitiesTotal($data->id_pma_contribuciones_detalle);
   // calcularContribucionesTotal($idActivities);

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en pma_costos_micro actualizado exitosamente" : $sql->errorCode(),
        "message" => $message,
        "data" => $data,
        "total" => totalCostosMicro($data->id_pma_costos_macro)
    ));

}


function totalCostosMicro($id)
{
    // aca el calculo
    global $os;

    $sql = "SELECT SUM(total_micro) as total  FROM pma_costos_micro where id_pma_costos_macro = $id ";
    $result = $os->db->conn->query($sql);
    $total = 0;
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        if (!is_null($row ['total']))
            $total = $row ['total'];

    }
    return $total;
}



function verificaAnteriorAsignacion($id_reasignacion, $idInspeccion)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT funcionario_entrega FROM  `pma_costos_micro` WHERE  id = $idInspeccion";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row['funcionario_entrega'] === $id_reasignacion)
        return false;
    else
        return true;
}


function verificaAnteriorReasignacion($id_reasignacion, $idInspeccion)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT funcionario_reasignacion FROM  `pma_costos_micro` WHERE  id = $idInspeccion";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row['funcionario_reasignacion'] === $id_reasignacion)
        return false;
    else
        return true;
}

function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email FROM pma_costos_micro WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}


function selectDetalleInspeccionesForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    if ($id != 0) {
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT * FROM pma_costos_micro WHERE id_denuncia = $id";
        $result = $os->db->conn->query($sql);
        $data = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

            $data[] = $row;
        }
        echo json_encode(array(
                "success" => true,
                "data" => $data)
        );
    }

}

function updateDetalleInspeccionesForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];

    $guia = $_POST["guia"];
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];

    /*codigo_tramite='$codigo_tramite',*/
    $sql = "UPDATE pma_costos_micro SET 
            id = '$id',
            nombre = $nombre,
            nombre_completo = $nombre_completo,
            activo = $activo,
            orden = $orden

          WHERE id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteDetalleInspecciones()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));

    // se valida que no existan registros en la tabla hija
    if (validaRelacion($id,  'id_pma_costos_micro', 'pma_costos_micro_detalle')) {
        $sql = "DELETE FROM pma_costos_micro WHERE id = $id";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();
        echo json_encode(array(
            "success" => $sql->errorCode() == 0,
            "msg" => $sql->errorCode() == 0 ? "Ubicación en pma_costos_micro, eliminado exitosamente" : $sql->errorCode()
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "msg" => "Error tiene detalle",
            "message" => "Error tiene detalle"
        ));

    }
}



switch ($_GET['operation']) {
    case 'select' :
        selectDetalleInspecciones();
        break;
    case 'selectTodasInspecciones' :
        selectDetalleTodasInspecciones();
        break;
    case 'insert' :
        insertDetalleInspecciones();
        break;
    case 'update' :
        updateDetalleInspecciones();
        break;
    case 'selectForm' :
        selectDetalleInspeccionesForm();
        break;
    case 'updateForm' :
        updateDetalleInspeccionesForm();
        break;
    case 'delete' :
        deleteDetalleInspecciones();
        break;
}
