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
// todo habilitar esta seccion
//if(isset($_POST['data'])){
//    if($_POST['data']!= '0'){

if (isset($_FILES)) {
    $temp_file_name = $_FILES['photo-path']['tmp_name'];

    $original_file_name = $_FILES['photo-path']['name'];
    $uploaddir = __DIR__ . "/../../../../migrar/";


    $nombreArchivo = $_FILES['photo-path']['name'];

    $vowels = array("[", "]");
    $nombreArchivo = str_replace($vowels, "", $nombreArchivo);

    $uploadfile = $uploaddir . date('Y-m-d-h-i-s-') . basename( $nombreArchivo );

    if (move_uploaded_file($temp_file_name, $uploadfile)) {

        $inputFileName = $uploadfile;

        $spreadsheet = IOFactory::load($inputFileName);

//        $spreadsheet->getSheetByName('BUDGET');
//        $spreadsheet->setActiveSheetIndexByName('BUDGET');
//        $spreadsheet->getActiveSheet()

        $sheet = $spreadsheet->getActiveSheet()->getTitle();
        $total = 0;

        // se recupera la columna a cargar
        $sql = "SELECT * FROM pma_migrate   WHERE active  = 1;";
        $result = $os->db->conn->query($sql);
        while ($row = $result->fetch(PDO::FETCH_ASSOC)
        ) {
            //recupea la columna
            $hoja = $row['tab_wings'];
            $fila = $row['name_wings'];
            $data = $spreadsheet->getSheetByName($hoja)->toArray(null, true, true, true);

            $fila_cabecera = $data(1);
            if (in_array("$fila", $os)) {
                echo "Existe Irix";
            }
        };

        echo json_encode(array(
                "total" => $total,
                "Sheet" => $sheet,
                "success" => true,
                "data" => $data)
        );

    } else {
        echo json_encode(array(
                "total" => 0,
                "success" => false,
                "data" => "")
        );
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




