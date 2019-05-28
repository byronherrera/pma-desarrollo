<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectDenunciasZonas()
{
    global $os;

    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;


    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 50;

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT amc_guias.numero,
            amc_guias.unidad,
            amc_guias.creado,
            (SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name)  FROM qo_members WHERE id = id_member)  AS id_member ,
            amc_guias.id
            FROM amc_guias  ORDER BY creado DESC LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }


    $sql = "SELECT count(*) AS total FROM amc_guias ";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "success" => true,
            "total" => $total,
            "data" => $data)
    );
}

function insertDenunciasZonas()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $sql = "INSERT INTO amc_zonas (nombre, activo )
	values('$data->nombre','$data->activo');";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array(
            array(
                "id" => $os->db->conn->lastInsertId(),
                "nombre" => $data->nombre,
                "activo" => $data->activo
            )
        )
    ));
}

function updateDenunciasZonas()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    $sql = "UPDATE amc_zonas SET
            nombre='$data->nombre',
            activo='$data->activo'
	  WHERE amc_zonas.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode()
    ));
}


function deleteDenunciasZonas()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_zonas WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectDenunciasZonas();
        break;
    case 'insert' :
        insertDenunciasZonas();
        break;
    case 'update' :
        updateDenunciasZonas();
        break;
    case 'delete' :
        deleteDenunciasZonas();
        break;
}