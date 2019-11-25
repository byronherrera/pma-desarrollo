<?php
require_once '../../../common/Classes/PhpSpreadsheet/autoload.php';

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

    $uploadfile = $uploaddir . date('Y-m-d-h-i-s-') . basename($nombreArchivo);

    if (move_uploaded_file($temp_file_name, $uploadfile)) {

        $inputFileName = $uploadfile;

        $spreadsheet = IOFactory::load($inputFileName);

        $spreadsheet->getSheetByName('BUDGET');
        $spreadsheet->setActiveSheetIndexByName('BUDGET');
        $spreadsheet->getActiveSheet();

        $sheet = $spreadsheet->getActiveSheet()->getTitle();
        $total = 0;

        // recuperar informacion para migrate contribuciones

        // VACIAR LAS TABLAS TEMPORALES

        $sql = "DELETE FROM pma_migrate_contribuciones;";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();
        // REINICIAR LA TABLA
        $sql = "ALTER TABLE `pma_migrate_contribuciones` AUTO_INCREMENT = 1;";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        $sql = "DELETE FROM pma_migrate_detail;";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();
        // REINICIAR LA TABLA
        $sql = "ALTER TABLE `pma_migrate_detail` AUTO_INCREMENT = 1;";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        // todo descomentar esta
        //migrarPestana ('BUDGET', 'pma_migrate_contribuciones');

        migrarPestana('PRECOMITMENT', 'pma_migrate_detail');
        /*  migrarPestana ('COMIT', 'pma_migrate_detail');
          migrarPestana ('ACTUALS', 'pma_migrate_detail');*/

        echo json_encode(array(
                "total" => $total,
                "Sheet" => $sheet,
                "success" => true,
                "hoja " => "real")
        //"hoja " =>$fila_cabecera )
        );
    } else {
        echo json_encode(array(
                "total" => 0,
                "success" => false,
                "data" => "")
        );
    }
}

function migrarPestana($hoja = 'BUDGET', $tabla = 'pma_migrate_contribuciones')
{
    // CASO BUDGET
    global $os;
    global $spreadsheet;
    $sql = "SELECT * FROM pma_migrate WHERE active  = 1 AND tab_wings = '$hoja'";
    // obtengo el listado de las columnas a migrar
    $result = $os->db->conn->query($sql);
    $columnas = $result->fetchAll(PDO::FETCH_ASSOC);

    $data = $spreadsheet->getSheetByName($hoja)->toArray(null, true, false, true);

    for ($i = 2; $i <= count($data); $i++) {
        $cadenaDatos = '';
        $cadenaCampos = '';

        foreach ($data[$i] as $clave => $valor) {

            if ($valor != '') {
                // se busca el nombre de la columna
                foreach ($columnas as &$columna) {
                    if (in_array($data[1][$clave], $columna)) {
                        $columnaAsociada = $columna['table'];
                        break;
                    }
                }
                echo $columnaAsociada . "-";
                // para el caso de la columna fechas
                if ($columnaAsociada == 'document_date') {
                    $excel_date = $valor; //here is that value 41621 or 41631
                    $unix_date = ($excel_date - 25569) * 86400;
                    $excel_date = 25569 + ($unix_date / 86400);
                    $unix_date = ($excel_date - 25569) * 86400;
                    $valor = gmdate("Y/m/d", $unix_date);
                }

                $valor = addslashes($valor);

                $cadenaCampos = $cadenaCampos . "`" . $columnaAsociada . "`,";
                $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
                // en caso de no se budget agregrar el nombre

            }
        }

        $cadenaCampos = $cadenaCampos . "`tipo`,";
        $cadenaDatos = $cadenaDatos . "'$hoja',";

        $cadenaCampos = substr($cadenaCampos, 0, -1);
        $cadenaDatos = substr($cadenaDatos, 0, -1);

        $sql = "INSERT INTO $tabla ($cadenaCampos) values($cadenaDatos);";
        echo $sql;
        $sql = $os->db->conn->prepare($sql);

        $code = $sql->errorCode();

        echo $code;

        $sql->execute();

    }
    // FIN CASO BUDGET
}

