<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectActivityCodes()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM pma_activities";
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

    function insertActivityCodes()
    {
        global $os;

        $os->db->conn->query("SET NAMES 'utf8'");
        $data = json_decode(stripslashes($_POST["data"]));
        //$data->despacho_secretaria = 'false';

        //$data->id_persona = $os->get_member_id();
        //genero el listado de nombre de campos

        $cadenaDatos = '';
        $cadenaCampos = '';
        foreach ($data as $clave => $valor) {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }
        $cadenaCampos = substr($cadenaCampos, 0, -1);
        $cadenaDatos = substr($cadenaDatos, 0, -1);

        $sql = "INSERT INTO pma_activities($cadenaCampos)
	    values($cadenaDatos);";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        $data->id = $os->db->conn->lastInsertId();
      //  $data->orden = $data->id ;
        // genero el nuevo codigo de proceso


        echo json_encode(array(
            "success" => true,
            "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
            "data" => array($data)
        ));
    }

function updateActivityCodes()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));


    $message = '';


    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE pma_activities SET  $cadenaDatos  WHERE pma_activities.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode()
    ));
}


function deleteActivityCodes()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM pma_activities WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}


switch ($_GET['operation']) {
    case 'select' :
        selectActivityCodes();
        break;
    case 'insert' :
        insertActivityCodes();
        break;
    case 'update' :
        updateActivityCodes();
        break;
    case 'delete' :
        deleteActivityCodes();
        break;
}
