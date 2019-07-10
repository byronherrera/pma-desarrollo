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

    //Se inicializa el parámetro de búsqueda de código trámite
    $columnaBusqueda = 'codigo_tramite';
    $funcionario_entrega = $os->get_member_id();
    $where = "";

    if (isset($_POST['id'])) {
        $id = (int)$_POST ['id'];
        $where = "id_denuncia  = '$id'";
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if (isset($_POST['filterField'])) {
            $columnaBusqueda = $_POST['filterField'];
        }
        $where = " $columnaBusqueda LIKE '%$campo%'";
    }

    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;

    $orderby = 'ORDER BY zona, parroquia, sector DESC';

    $os->db->conn->query("SET NAMES 'utf8'");

    if (strlen($where) > 0) {
        $sql = "SELECT * FROM amc_inspeccion_control_programado WHERE $where $orderby LIMIT $start, $limit";
        $sqlTotal = "SELECT count(*) AS total FROM amc_inspeccion_control_programado WHERE $where $orderby LIMIT $start, $limit";
    }
    else {
        $sql = "SELECT * FROM amc_inspeccion_control_programado  $orderby LIMIT $start, $limit";
        $sqlTotal = "SELECT count(*) AS total FROM amc_inspeccion_control_programado  $orderby LIMIT $start, $limit";
    }

    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }

    $result = $os->db->conn->query($sqlTotal);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function selectDetalleAsignacion()
{
    global $os;

    //Se inicializa el parámetro de búsqueda de código trámite
    $columnaBusqueda = 'predio';
    $funcionario_entrega = $os->get_member_id();
    $where = "";

    if (isset($_POST['pendientesAsignar'])) {
        if ($_POST['pendientesAsignar'] == 'true') {
            $where = " WHERE tecnico IS NULL ";
        }
    }

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

    $orderby = 'ORDER BY fecha_recepcion_documento DESC';

    $os->db->conn->query("SET NAMES 'utf8'");
    //$sql = "SELECT * FROM amc_inspeccion_control_programado WHERE amc_inspeccion_control_programado.id = $id";
    if (strlen($where) > 0) {
        $sql = "SELECT * FROM amc_inspeccion_control_programado  $where $orderby LIMIT $start, $limit";
        $sqlTotal = "SELECT count(*) AS total FROM amc_inspeccion_control_programado   $where ";
    }
    else {
        $sql = "SELECT * FROM amc_inspeccion_control_programado  $orderby LIMIT $start, $limit";
        $sqlTotal = "SELECT count(*) AS total FROM amc_inspeccion_control_programado  ";
    }

    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }

    $result = $os->db->conn->query($sqlTotal);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );


}

function insertDetalleInspecciones()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));
    $data->id = generaNuevoCodigoControlProgramado();
    $data->codigo_tramite = 'ITCC ' . date("y") . ' ' . generaNuevoCodigoControlProgramado();
    $data->fecha_recepcion_documento = date('Y-m-d H:i:s');
    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_inspeccion_control_programado($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso
    /*
        $sql = "INSERT INTO amc_inspeccion($cadenaCampos)
        values($cadenaDatos);";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        $data->id = $os->db->conn->lastInsertId();
    */
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));
}

function generaCodigoProcesoOrdenanza()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(id) AS maximo FROM amc_inspeccion_control_programado";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso

        return 40;

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
        if ($valor != '')
            $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";

         if(is_null($valor))
             $cadenaDatos = $cadenaDatos . $clave . " = NULL ,";
    }
         $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE amc_inspeccion_control_programado SET  $cadenaDatos  WHERE amc_inspeccion_control_programado.id = '$data->id' ";
        $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias actualizado exitosamente" : $sql->errorCode(),
        "message" => $message
    ));
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
        $sql = "SELECT * FROM amc_inspeccion_control_programado WHERE amc_inspeccion_control_programado.id_denuncia = $id";
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
    $sql = "UPDATE amc_inspeccion_control_programado SET 
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
    $sql = "DELETE FROM amc_inspeccion_control_programado WHERE id = $id";
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
    case 'selectAsignacion':
        selectDetalleAsignacion();
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
