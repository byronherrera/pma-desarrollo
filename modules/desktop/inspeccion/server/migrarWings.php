<?php

require_once '../../../common/Classes/PhpSpreadsheet/autoload.php';

//require __DIR__ . "/PhpSpreadsheet/autoload.php";

use PhpOffice\PhpSpreadsheet\IOFactory;

require_once '../../../../server/os.php';
$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


///////////////
///
///

//if(isset($_POST['data'])){
//    if($_POST['data']!= '0'){
if (isset($_FILES)) {
    $temp_file_name = $_FILES['photo-path']['tmp_name'];

    $original_file_name = $_FILES['photo-path']['name'];
    //$uploaddir = __DIR__ . "/../../../../migrar/";
    $uploaddir = __DIR__ ;

    $nombreArchivo = $_FILES['photo-path']['name'];

    $vowels = array("[", "]");
    $nombreArchivo = str_replace($vowels, "", $nombreArchivo);

    $uploadfile = $uploaddir . basename( $nombreArchivo );
    if (move_uploaded_file($temp_file_name, $uploadfile)) {
        // en caso de ser exito el ingreso entonces se inserta un registro en la base de datos

        $origen = $uploadfile;
        $destino = $uploadfile;
        $destino_temporal = tempnam("tmp/", "tmp");

        // guardamos la imagen

        $fp = fopen($destino, "w");
        fputs($fp, fread(fopen($destino_temporal, "r"), filesize($destino_temporal)));
        fclose($fp);
        //insertParticipantes('imagenes/operativos/' .$_POST['data']. '-' . $_FILES['photo-path']['name'], $_POST['data']);
    }
    //       }
    //   }
}


function insertParticipantes($url, $idOper)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT COUNT(*) total FROM amc_operativos_imagenes   WHERE url =  '$url';";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $id = 0;
    if ($row['total'] == 0) {

        $vowels = array("[", "]");
        $url = str_replace($vowels, "", $url);

        $sql = "INSERT INTO amc_operativos_imagenes (id_operativo, url) VALUES ('$idOper', '$url');";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();
        $id = $os->db->conn->lastInsertId();
    }

    // genero el nuevo codigo de proceso
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "file" => $_FILES['photo-path']['name'],
        "data" => $id,
        "message" => "error"
    ));
}


//////////////
///
///
///

$inputFileName = 'example1.xls';

$spreadsheet = IOFactory::load($inputFileName);
$data = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
$total = 0;
echo json_encode(array(
        "total" => $total,
        "success" => true,
        "data" => $data)
);