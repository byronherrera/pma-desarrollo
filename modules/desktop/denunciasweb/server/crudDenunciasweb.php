<?php

//http://medoo.in/api/select
//http://localhost:10088/msv-dev/generareporte/modules/desktop/samsung/server/help.html#Error

require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function aprobarDenuncia()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");

    $data = json_decode('{}');
    $data->codigo_tramite = generaCodigoProcesoDenuncia();
    $data->id_persona = $os->get_member_id();
    $data->recepcion_documento = $_POST["fecha"];
    $data->id_tipo_documento = 1;
    $data->num_documento = "Denuncia web - ". $_POST["id"];
    $data->remitente = $_POST["nombre"] . ' '.$_POST["apellido"];

    $data->asunto = $_POST["ampliaciondenuncia"];

    // se deja quemado que se envia a inspeccion
    $data->reasignacion = 3;

    $data->descripcion_anexos = 'Denuncia Web, ' . addslashes($_POST["urldenuncia"]);
    $data->id_caracter_tramite = 1;
    $data->cedula = $_POST["cedula"];
    $data->email = $_POST["email"];
    //indicamos que la denuncia fue reciida en la matriz EUGENIO ESPEJO
    $data->id_zonal_origen = 10;
    $data->direccion_denuncia = $_POST["direcciondenunciado"];
    $data->georeferencia = $_POST["geoposicionamiento2"];

    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $valor = str_replace("'", "", $valor);
        $cadenaDatos = $cadenaDatos . "'" .  $valor . "',";
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
        "data" => $data->codigo_tramite
    ));
}


switch ($_GET['operation']) {
    case 'aprobarDenuncia' :
        aprobarDenuncia();
        break;

}