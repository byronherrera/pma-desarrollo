<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectDetalleInspecciones()
{
    global $os;
    if (isset($_POST['id'])) {
        $id = (int)$_POST ['id'];
        $where = " id_denuncia  = '$id'";
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        if (isset($_POST['filterField'])) {
            $columnaBusqueda = $_POST['filterField'];
        }
        $where = " $columnaBusqueda = '$campo'";
    }

    // cambio BH
    $orderby = 'ORDER BY id DESC';

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_inspeccion WHERE $where  $orderby ";
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

function    selectDetalleTodasInspecciones()
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

    $sql = "SELECT * FROM amc_inspeccion $where $orderby LIMIT $start, $limit";
    //$sql = "SELECT * FROM amc_inspeccion";
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
    $data->id = generaCodigoProcesoOrdenanza();
    $data->id_inspeccion = generaNuevoCodigoInspeccion();
    $data->fecha_recepcion_documento = date('Y-m-d H:i:s');
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

    $sql1 = "INSERT INTO amc_inspeccion($cadenaCampos)
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
        actualizar_estado_tramite_usado($data->id_denuncia);
    } else {
        echo json_encode(array(
            "success" => false,
            "msg" => $sql->errorCode() . $sql1,
            "data" => array($data)
        ));
    }
}

function actualizar_estado_tramite_usado($id_tramite)
{
    global $os;
    // 8755
    $sql = "UPDATE  `amc_denuncias` SET `despacho_secretaria_insp` = 0 WHERE `id` = $id_tramite";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
}

function generaCodigoProcesoOrdenanza()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(id) AS maximo FROM amc_inspeccion";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso

        return 10759;

    }
}

function updateDetalleInspecciones()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    if (isset($data->despacho_secretaria)) {
        if (!$data->despacho_secretaria)
            $data->despacho_secretaria = 'false';
        else
            $data->despacho_secretaria = 'true';
    }

    $message = '';
    if (isset($data->id_tipo_documento)) {
        if ($data->id_tipo_documento == '1')
            if (validarCedulaCorreo($data->id)) {
                $message = 'Ingresar número de cédula y correo electrónico';
            }
    }

    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        if (($clave == 'funcionario_reasignacion') OR ($clave == 'guia') OR ($clave == 'acta_verificacion') OR ($clave == 'id_zona') OR ($clave == 'fecha_memo_oficio') OR ($clave == 'id_actividad') OR ($clave == 'id_ordenanza') OR ($clave == 'infraccion')) {
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

    cambioEstadoAsignacion ($data->funcionario_entrega, $data->id);
    cambioEstadoReasignacion ($data->funcionario_reasignacion, $data->id);

    $sql = "UPDATE amc_inspeccion SET  $cadenaDatos  WHERE amc_inspeccion.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias actualizado exitosamente" : $sql->errorCode(),
        "message" => $message
    ));


}

function cambioEstadoAsignacion ($id_asignacion, $idInspeccion ) {
    global $os;
    // en caso de que sea una reasignacion entonces se cambia de estado
    if (!is_null($id_asignacion) AND $id_asignacion != ''){

        // en caso de que ya exista se consulta si es el mimso dato o uno nuevo

        if ( verificaAnteriorReasignacion ($id_asignacion, $idInspeccion)) {
            $sql = "UPDATE `amc_inspeccion` SET `estado_asignacion` = 1 WHERE `id` = $idInspeccion";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();
        }
    }
}

function verificaAnteriorAsignacion ($id_reasignacion, $idInspeccion) {
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT funcionario_entrega FROM  `amc_inspeccion` WHERE  id = $idInspeccion";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row['funcionario_entrega'] === $id_reasignacion )
        return false;
    else
        return true;
}

function cambioEstadoReasignacion ($id_reasignacion, $idInspeccion ) {
    global $os;
    // en caso de que sea una reasignacion entonces se cambia de estado
    if (!is_null($id_reasignacion) AND $id_reasignacion != ''){

        // en caso de que ya exista se consulta si es el mimso dato o uno nuevo

        if ( verificaAnteriorReasignacion ($id_reasignacion, $idInspeccion)) {
            $sql = "UPDATE `amc_inspeccion` SET `estado_asignacion` = 3 WHERE `id` = $idInspeccion";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();

        }
    }
}

function verificaAnteriorReasignacion ($id_reasignacion, $idInspeccion) {
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT funcionario_reasignacion FROM  `amc_inspeccion` WHERE  id = $idInspeccion";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row['funcionario_reasignacion'] === $id_reasignacion )
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
    $sql = "SELECT cedula, email FROM amc_denuncias WHERE id = $id";
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
        $sql = "SELECT * FROM amc_inspeccion WHERE amc_inspeccion.id_denuncia = $id";
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
    $sql = "UPDATE amc_denuncias SET 
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
    $sql = "DELETE FROM amc_inspeccion WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias, eliminado exitosamente" : $sql->errorCode()
    ));
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
