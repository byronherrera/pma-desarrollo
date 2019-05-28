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
    $sql = "SELECT * FROM amc_denuncias ORDER BY id";
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
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $sql = "INSERT INTO amc_denuncias(id_persona,codigo_tramite,recepcion_documento,id_tipo_documento,num_documento,remitente,asunto,reasignacion,descripcion_anexos,id_caracter_tramite,cantidad_fojas)
	values('$data->id_persona','$data->codigo_tramite','$data->recepcion_documento','$data->id_tipo_documento','$data->num_documento','$data->remitente','$data->asunto','$data->reasignacion','$data->descripcion_anexos','$data->id_caracter_tramite','$data->cantidad_fojas');";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array(
            array(
                "id" => $os->db->conn->lastInsertId(),
                "id_persona" => $data->id_persona,
                "codigo_tramite" => $data->codigo_tramite,
                "recepcion_documento" => $data->recepcion_documento,
                "id_tipo_documento" => $data->id_tipo_documento,
                "num_documento" => $data->num_documento,
                "remitente" => $data->remitente,
                "asunto" => $data->asunto,
                "reasignacion" => $data->reasignacion,
                "descripcion_anexos" => $data->descripcion_anexos,
                "id_caracter_tramite" => $data->id_caracter_tramite,
                "cantidad_fojas" => $data->cantidad_fojas
            )
        )
    ));
}

function updateDenuncias()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    $sql = "UPDATE amc_denuncias SET
      id='$data->id',
        id_persona='$data->id_persona',
        codigo_tramite='$data->codigo_tramite',
        recepcion_documento='$data->recepcion_documento',
        id_tipo_documento='$data->id_tipo_documento',
        num_documento='$data->num_documento',
        remitente='$data->remitente',
        asunto='$data->asunto',
        reasignacion='$data->reasignacion',
        descripcion_anexos='$data->descripcion_anexos',
        id_caracter_tramite='$data->id_caracter_tramite',
        cantidad_fojas='$data->cantidad_fojas'
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
    $id_persona = $_POST["id_persona"];
    $codigo_tramite = $_POST["codigo_tramite"];
    $recepcion_documento = $_POST["recepcion_documento"];
    $id_tipo_documento = $_POST["id_tipo_documento"];
    $num_documento = $_POST["num_documento"];
    $remitente = $_POST["remitente"];
    $asunto = $_POST["asunto"];
    $reasignacion = $_POST["reasignacion"];
    $descripcion_anexos = $_POST["descripcion_anexos"];
    $id_caracter_tramite = $_POST["id_caracter_tramite"];
    $cantidad_fojas = $_POST["cantidad_fojas"];


    $sql = "UPDATE amc_denuncias SET 
            id_persona='$id_persona',
            codigo_tramite='$codigo_tramite',
            recepcion_documento='$recepcion_documento',
            id_tipo_documento='$id_tipo_documento',
            num_documento='$num_documento',
            remitente='$remitente',
            asunto='$asunto',
            reasignacion='$reasignacion',
            descripcion_anexos='$descripcion_anexos',
            id_caracter_tramite='$id_caracter_tramite',
            cantidad_fojas='$cantidad_fojas' 
         
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
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_denuncias WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias, eliminado exitosamente" : $sql->errorCode()
    ));
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
