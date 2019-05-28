<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectAcciones()
{
    global $os;
    $id_expediente = $_POST["id_expediente"];

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_expedientes_procesos_administrativos WHERE id_expediente = $id_expediente ";
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

function validarAcciones($id_member, $id_expediente)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT COUNT(*) AS total FROM amc_expedientes_procesos_administrativos WHERE id_member = $id_member AND id_expediente = $id_expediente  ";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row['total'] == 0) {
        return '';
    } else {
        return 'El usuario ya existe';
    }
}

function insertAcciones()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $cadenaDatos = '';
    $cadenaCampos = '';
    $data->id_persona = $os->get_member_id();
    // validamos que la persona ya exista, si existe agregamos un mensjae de error
    //$message = validarAcciones($data->id_member,$data->id_expediente );
    $message = "";
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);


    $sql = "INSERT INTO amc_expedientes_procesos_administrativos ($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data),
        "message" => $message
    ));
}

function updateAcciones()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    //$message = validarAcciones($data->id_member,$data->id_expediente );
    $message = "";
    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        $valBoolean = false;

        if ($valor === true) {
            $valor = 'true';
            $valBoolean = true;
        }
        if ($valor === false) {
            $valor = 'false';
            $valBoolean = true;
        }
        if (isset($valor)) {
            if ($valBoolean)
                $cadenaDatos = $cadenaDatos . $clave . " = " . $valor . " ,";
            else
                $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
        }
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);
    $sql = "UPDATE amc_expedientes_procesos_administrativos SET  $cadenaDatos  WHERE id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_expedientes_procesos_administrativos actualizado exitosamente" : $sql->errorCode(),
        "message" => $message
    ));
}


function deleteAcciones()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_expedientes_procesos_administrativos WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectAcciones();
        break;
    case 'insert' :
        insertAcciones();
        break;
    case 'update' :
        updateAcciones();
        break;
    case 'delete' :
        deleteAcciones();
        break;
}