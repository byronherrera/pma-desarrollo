<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectDenuncias()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_denuncias WHERE reasignacion = 3 ORDER BY id";
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

function insertDenuncias()
{
}

function updateDenuncias()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    $sql = "UPDATE amc_denuncias SET
            estado_recepcion_informacion='$data->estado_recepcion_informacion',
            codigo_inspeccion='$data->codigo_inspeccion',
            codigo_procedimiento='$data->codigo_procedimiento',
            id_zona='$data->id_zona',
            predio='$data->predio',
            observacion='$data->observacion',
            actividad='$data->actividad',
           
            persona_asignada='$data->persona_asignada'
	  WHERE amc_denuncias.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias actualizado exitosamente" : $sql->errorCode()
    ));
}

function selectDenunciasForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_denuncias WHERE id = $id";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function updateDenunciasForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];


    $estado_recepcion_informacion= $_POST["estado_recepcion_informacion"];
    $codigo_inspeccion= $_POST["codigo_inspeccion"];
    $codigo_procedimiento= $_POST["codigo_procedimiento"];
    $id_zona= $_POST["id_zona"];
    $predio= $_POST["predio"];
    $observacion= $_POST["observacion"];
    $actividad= $_POST["actividad"];
    $procedimientos= $_POST["procedimientos"];
    $persona_asignada= $_POST["persona_asignada"];

    $sql = "UPDATE amc_denuncias SET  
            estado_recepcion_informacion='$estado_recepcion_informacion',
            codigo_inspeccion='$codigo_inspeccion',
            codigo_procedimiento='$codigo_procedimiento',
            id_zona='$id_zona',
            predio='$predio',
            observacion='$observacion',
            actividad='$actividad',
            procedimientos='$procedimientos',
            persona_asignada='$persona_asignada'
          WHERE id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteDenuncias()
{
}

switch ($_GET['operation']) {
    case 'select' :
        selectDenuncias();
        break;
    case 'insert' :
        insertDenuncias();
        break;
    case 'update' :
        updateDenuncias();
        break;
    case 'selectForm' :
        selectDenunciasForm();
        break;
    case 'updateForm' :
        updateDenunciasForm();
        break;
    case 'delete' :
        deleteDenuncias();
        break;
}
