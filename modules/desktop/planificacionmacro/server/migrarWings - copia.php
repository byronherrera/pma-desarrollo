<?php
//require __DIR__ . "/PhpSpreadsheet/autoload.php";

//libreria de lectura de
require_once '../../../common/Classes/PhpSpreadsheet/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

require_once '../../../../server/os.php';
$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


///////////////

if (isset($_POST['data'])) {
    if ($_POST['data'] != '0') {
        if (isset($_FILES)) {
            $temp_file_name = $_FILES['photo-path']['tmp_name'];

            $original_file_name = $_FILES['photo-path']['name'];
            $uploaddir = __DIR__ . "/../../../../migrar/";

            $nombreArchivo = $_FILES['photo-path']['name'];

//            . date('-Y-m-d-h-i-s')
            $vowels = array("[", "]");
            $nombreArchivo = str_replace($vowels, "", $nombreArchivo );

            $uploadfile = $uploaddir . basename($nombreArchivo);

            if (move_uploaded_file($temp_file_name, $uploadfile)) {
                echo "subido";

                /*$inputFileName = $uploadfile;

                $spreadsheet = IOFactory::load($inputFileName);
                $data = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
                $total = 0;
                echo json_encode(array(
                        "total" => $total,
                        "success" => true,
                        "data" => $data)
                );*/

                // en caso de ser exito el ingreso entonces se inserta un registro en la base de datos

//        $destino_temporal = tempnam("tmp/", "tmp");
//        $origen = $uploadfile;
//
//
//        $fp = fopen($uploadfile, "w");
//        fputs($fp, fread(fopen($destino_temporal, "r"), filesize($destino_temporal)));
//        fclose($fp);
                //insertParticipantes('imagenes/operativos/' .$_POST['data']. '-' . $_FILES['photo-path']['name'], $_POST['data']);
            } else {
                echo json_encode(array(
                        "total" => 0,
                        "success" => false,
                        "data" => "")
                );
            }
        }
    }
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