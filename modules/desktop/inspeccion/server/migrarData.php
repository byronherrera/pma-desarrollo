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


$nombreArchivo = '';

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

        $spreadsheet->getSheetByName('Hoja1');
        $spreadsheet->setActiveSheetIndexByName('Hoja1');
        $spreadsheet->getActiveSheet();

        $sheet = $spreadsheet->getActiveSheet()->getTitle();
        $total = 0;

        // recuperar informacion para migrate contribuciones

        // VACIAR LAS TABLAS TEMPORALES

        // preparar archivo

        $error = false;
        $mensajeError = '';



        $nombreArchivo = explode(".", $nombreArchivo);
        $i = $nombreArchivo[0];

        if ($i  == 'BUDGET') {
            $sql = "DELETE FROM pma_migrate_contribuciones;";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();
            // REINICIAR LA TABLA
            $sql = "ALTER TABLE `pma_migrate_contribuciones` AUTO_INCREMENT = 1;";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();
            if (prepararArchivoTitulos('Hoja1', $nombreArchivo[0])) {
                migrarPestana('Hoja1', 'pma_migrate_contribuciones', $nombreArchivo[0]);
            } else {
                $error = true;
                $mensajeError = $mensajeError ."Error pestania BUDGET";
            }

        } elseif ($i == 'PRECOMITMENT') {
            $sql = "DELETE FROM pma_migrate_detail WHERE tipo = 'PRECOMITMENT';";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();


            if (prepararArchivoTitulos('Hoja1', $nombreArchivo[0]))
                migrarPestana('Hoja1', 'pma_migrate_detail', $nombreArchivo[0]);
            else{
                $error = true;
                $mensajeError = $mensajeError . "Error pestania PRECOMITMENT, ";
            }
        } elseif ($i == 'COMIT') {
            $sql = "DELETE FROM pma_migrate_detail WHERE tipo = 'COMIT';";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();


            if (prepararArchivoTitulos('Hoja1', $nombreArchivo[0]))
                migrarPestana('Hoja1', 'pma_migrate_detail', $nombreArchivo[0]);
            else{
                $error = true;
                $mensajeError = $mensajeError . "Error pestania COMIT, ";
            }
        }elseif ($i == 'ACTUALS') {
            $sql = "DELETE FROM pma_migrate_detail WHERE tipo = 'ACTUALS';";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();


            if (prepararArchivoTitulos('Hoja1', $nombreArchivo[0]))
                migrarPestana('Hoja1', 'pma_migrate_detail', $nombreArchivo[0]);
            else{
                $error = true;
                $mensajeError = $mensajeError . "Error pestania ACTUALS, ";
            }
        }





/*

        if (prepararArchivoTitulos('COMIT'))
            migrarPestana('COMIT', 'pma_migrate_detail');
        else
        {
            $error = true;
            $mensajeError = $mensajeError . "Error pestania COMIT, ";
        }

        if (prepararArchivoTitulos('ACTUALS')){
            migrarPestana('ACTUALS', 'pma_migrate_detail');
        }
        else
        {
            $error = true;
            $mensajeError = $mensajeError ."Error pestania ACTUALS, ";
        }
*/

    } else {
        {
            $error = true;
            $mensajeError = "Error Archivo";
        }
    }

    // imprimimos los resultados
    if (!$error) {
        echo json_encode(array(
                "total" => $total,
                "Sheet" => $sheet,
                "success" => true,
                "hoja " => "real")
        );

    } else {
        echo json_encode(array(
                "total" => 0,
                "mensage" => $mensajeError,
                "success" => false,
                "data" => "")
        );
    }

}

function migrarPestana($hoja = 'Hoja1', $tabla = 'pma_migrate_contribuciones', $pestana)
{
    // CASO BUDGET
    global $os;
    global $spreadsheet;
    $sql = "SELECT * FROM pma_migrate WHERE active  = 1 AND tab_wings = '$pestana'";
    // obtengo el listado de las columnas a migrar
    $result = $os->db->conn->query($sql);
    // $colunas almacena estructura de datos con la descripcion de las columnas a usarse
    $columnas = $result->fetchAll(PDO::FETCH_ASSOC);

    $data = $spreadsheet->getSheetByName($hoja)->toArray(null, true, false, true);

    for ($i = 2; $i <= (count($data) - 1); $i++) {
        $cadenaDatos = '';
        $cadenaCampos = '';

        foreach ($data[$i] as $clave => $valor) {

            if ($valor != '') {
                // se busca el nombre de la columna
                foreach ($columnas as &$columna) {
                    if (in_array($data[1][$clave], $columna)) {
                        $columnaAsociada = $columna['table'];
                        $columType = $columna['type'];
                        break;
                    }
                };

                // para el caso de la columna fechas
                if ($columType == 'date') {
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
        // se incrementa el tipo de registro
        $cadenaCampos = $cadenaCampos . "`tipo`,";
        $cadenaDatos = $cadenaDatos . "'$pestana',";

        $cadenaCampos = substr($cadenaCampos, 0, -1);
        $cadenaDatos = substr($cadenaDatos, 0, -1);

        $sql = "INSERT INTO $tabla ($cadenaCampos) values($cadenaDatos);";

        $sql = $os->db->conn->prepare($sql);

        $code = $sql->errorCode();
        //echo $code;

         $sql->execute();

    }
    // FIN CASO BUDGET
}


function prepararArchivoTitulos($hoja = 'Hoja1', $pestana="BUDGET")
{
    // CASO BUDGET
    global $os;
    global $spreadsheet;

    $sql = "SELECT * FROM pma_migrate WHERE active  = 1 AND tab_wings = '$pestana'";
    // obtengo el listado de las columnas a migrar
    $result = $os->db->conn->query($sql);
    // $colunas almacena estructura de datos con la descripcion de las columnas a usarse

    //validamos que exista la pestana

    if ($spreadsheet->getSheetByName($hoja)) {
        while ($columna = $result->fetch(PDO::FETCH_ASSOC)) {

            $nombreOrden = $columna['orden'];
            $nameWings = $columna['name_wings'];

            $datoRecueprado = $spreadsheet->getSheetByName($hoja)->getCell($nombreOrden . '1')->getValue();;

            // en caso que no concuerde la fila se le cambia de nombre
            if ($datoRecueprado != $nameWings) {
                $spreadsheet->getSheetByName($hoja)->setCellValue($nombreOrden . '1', $nameWings);
            }

        }
        return true;
    } else
        return false;
}
