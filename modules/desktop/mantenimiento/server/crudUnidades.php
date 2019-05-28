<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectDenunciasReasignacion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_unidades ORDER BY orden";
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

    function insertDenunciasReasignacion()
    {
        global $os;

        $os->db->conn->query("SET NAMES 'utf8'");
        $data = json_decode(stripslashes($_POST["data"]));
        //$data->despacho_secretaria = 'false';
        $data->id = generaCodigoProcesoUnidades();
        $data->orden = generaCodigoProcesoUnidades();
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

        $sql = "INSERT INTO amc_unidades($cadenaCampos)
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

function updateDenunciasReasignacion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    if ($data->secretaria) $data->secretaria = 1; else $data->secretaria = 0;

    $sql = "UPDATE amc_unidades SET
            nombre='$data->nombre',
            nombre_completo='$data->nombre_completo',
            orden=$data->orden,
            secretaria=$data->secretaria,
            activo='$data->activo'
	  WHERE amc_unidades.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode()
    ));
}


function deleteDenunciasReasignacion()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_unidades WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}

function generaCodigoProcesoUnidades()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(id) AS maximo FROM amc_unidades";
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

switch ($_GET['operation']) {
    case 'select' :
        selectDenunciasReasignacion();
        break;
    case 'insert' :
        insertDenunciasReasignacion();
        break;
    case 'update' :
        updateDenunciasReasignacion();
        break;
    case 'delete' :
        deleteDenunciasReasignacion();
        break;
}