
<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function  selectInspeccion()
{
    global $os;
    //Se inicializa el parámetro de búsqueda de código trámite
    $columnaBusqueda = 'id_inspeccion';
    $inspector = $os->get_member_id();

    $and = "";

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if (isset($_POST['filterField'])){
            $columnaBusqueda = $_POST['filterField'];
        }
        $and = " AND $columnaBusqueda LIKE '%$campo%'";
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

    $sql = "SELECT * FROM amc_inspeccion_ccf WHERE amc_inspeccion_ccf.tecnico = $inspector $and $orderby LIMIT $start, $limit";
    //$sql = "SELECT * FROM amc_inspeccion_ccf $and $orderby LIMIT $start, $limit";
    //$sql = "SELECT * FROM amc_inspeccion_ccf";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    };
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );

}

function selectInspeccionesCoordinadores()
{
    global $os;
    //$id = (int)$_POST ['id'];

    //Se inicializa el parámetro de búsqueda de código trámite
    $columnaBusqueda = 'id_inspeccion';
    $inspector = $os->get_member_id();
    $where = "";

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if (isset($_POST['filterField'])){
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

    $sql = "SELECT * FROM amc_inspeccion_ccf $where $orderby LIMIT $start, $limit";
    //$sql = "SELECT * FROM amc_inspeccion_ccf WHERE amc_inspeccion_ccf.tecnico = $inspector $and $orderby LIMIT $start, $limit";
    //$sql = "SELECT * FROM amc_inspeccion_ccf";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    };
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );

}

function insertInspeccion()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));
    //$data->despacho_secretaria = 'false';
    //Genero automáticamente un nuevo código único de trámite
    $data->codigo_tramite = generaNuevoCodigoTramiteUnico();
    //Registro automáticamente la fecha tomada del sistema
    $data->recepcion_documento = date('Y-m-d H:i:s');
    //Registro el usuario logueado en persona que recepta el trámite al ser creado desde inspección
    $data->id_persona = $os->get_member_id();
    $data->reasignacion = 3;

    //genero el listado de nombre de campos
     $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_denuncias($cadenaCampos)
	values($cadenaDatos);";
     $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso


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
    $año = date ('Y');
    $sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias WHERE  recepcion_documento > '". $año ."-01-03 00:00:01'";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodigo = $row['maximo'] + 1;
        return $nuevoCodigo;
    } else {
        // valor inicial proceso
        return 1;

    }
}

function updateInspeccion()
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
            $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE amc_inspeccion SET  $cadenaDatos  WHERE amc_inspeccion.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_inspeccion actualizado exitosamente" : $sql->errorCode(),
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


function selectInspeccionForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_inspeccion WHERE amc_inspeccion.id_denuncia = $id";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $row['procedimientosdetalle'] = selectProcedimientosCadena($row['procedimientos']);
        $data = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function updateInspeccionForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];

    if (isset($_POST["reasignacion"])) {
        $reasignacion = $_POST["reasignacion"];
    } else {
        //recuperamos la unidad en base a guia
        if (isset ($_POST["guia"])) {
            $valueGuia = $_POST["guia"];
            $os->db->conn->query("SET NAMES 'utf8'");
            $sql = "SELECT id_unidad FROM amc_guias WHERE id = $valueGuia ";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $reasignacion = $row ['id_unidad'];
        }
    }
    $guia = $_POST["guia"];
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];


    //para el caso de denuncias se valida que exista cedula y correo
    if ($id_tipo_documento == 1) {
        // se valida que se envio cedula, email
        $error = false;
        $msjError = '';
        if (!isset ($cedula) or $cedula == '') {
            $error = true;
            $msjError = 'Falta cédula. ' . $msjError;
        }
        if (!isset ($email) or $email == '') {
            $error = true;
            $msjError = $msjError . 'Falta email';
        }

        if ($error) {
            echo json_encode(array(
                "success" => false,
                "msg" => $msjError
            ));
            return;
        }

    }
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

function deleteInspeccion()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_denuncias WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectInspeccion();
        break;
    case 'selectTodos' :
        selectInspeccionesCoordinadores();
        break;
    case 'insert' :
        insertInspeccion();
        break;
    case 'update' :
        updateInspeccion();
        break;
    case 'selectForm' :
        selectInspeccionForm();
        break;
    case 'updateForm' :
        updateInspeccionForm();
        break;
    case 'delete' :
        deleteInspeccion();
        break;
}
