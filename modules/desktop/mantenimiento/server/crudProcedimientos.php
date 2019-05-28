<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectMantenimientoProcedimientos()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_procedimientos ORDER BY id";
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

function insertMantenimientoProcedimientos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $sql = "INSERT INTO amc_procedimientos (nombre, observacion )
	values('$data->nombre','$data->observacion');";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array(
            array(
                "id" => $os->db->conn->lastInsertId(),
                "nombre" => $data->nombre,
                "observacion" => $data->observacion
            )
        )
    ));
}

function updateMantenimientoProcedimientos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    $sql = "UPDATE amc_procedimientos SET
            nombre='$data->nombre',
            observacion='$data->observacion'
	  WHERE amc_procedimientos.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode()
    ));
}


function deleteMantenimientoProcedimientos()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_procedimientos WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectMantenimientoProcedimientos();
        break;
    case 'insert' :
        insertMantenimientoProcedimientos();
        break;
    case 'update' :
        updateMantenimientoProcedimientos();
        break;
    case 'delete' :
        deleteMantenimientoProcedimientos();
        break;
}