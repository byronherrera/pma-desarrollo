<?php
/**
 * PHPExcel
 *
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2012 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    1.7.7, 2012-05-19
 */

/** Error reporting */
error_reporting(E_ALL);

/** Include PHPExcel */
//echo dirname(__FILE__);
require_once '../../../common/Classes/PHPExcel.php';
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}
$numeroGuia = '';
// si no existe unidad es para reimpresion se envia como parametro guia, obtenemos id unidad
if (isset($_GET['unidad'])){
    $unidad = $_GET['unidad'];
} else {
    $newIdGuia = $_GET['guia'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $nombre = $os->db->conn->query("SELECT id_unidad, SUBSTRING(numero,10) as num FROM amc_guias WHERE id = $newIdGuia");
    $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
    $unidad =  $rowguia['id_unidad'];
    $numeroGuia = $rowguia['num'];
}

if (isset($_GET['reimpresion']))
    $reimpresion = settype($_GET['reimpresion'], 'boolean');
else
    $reimpresion = false;

//get nombre corto unidad
$nombreUnidad = '';
$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT nombre_completo FROM amc_unidades WHERE id = $unidad";
$resultguia = $os->db->conn->query($sql);
if ($resultguia) {
    $row = $resultguia->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        $nombreUnidad = $row['nombre_completo'];
    }
}


$today = date("Y-n-j");
include "exportarDenunciasNuevas.inc.php";

if ($number_of_rows == 0) {
    $nombreUnidad = '';
    $today = '';
    $year = '';
}

header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="denuncias-' . strtolower(quitar_espacio(quitar_tildes($nombreUnidad))) . '-SGE-' . $year . '-' . $numeroGuia . '-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');

//$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'PDF');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');

exit;

function quitar_tildes($cadena)
{
    $no_permitidas = array("á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "ñ", "À", "Ã", "Ì", "Ò", "Ù", "Ã™", "Ã ", "Ã¨", "Ã¬", "Ã²", "Ã¹", "ç", "Ç", "Ã¢", "ê", "Ã®", "Ã´", "Ã»", "Ã‚", "ÃŠ", "ÃŽ", "Ã”", "Ã›", "ü", "Ã¶", "Ã–", "Ã¯", "Ã¤", "«", "Ò", "Ã", "Ã„", "Ã‹");
    $permitidas = array("a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "n", "N", "A", "E", "I", "O", "U", "a", "e", "i", "o", "u", "c", "C", "a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "u", "o", "O", "i", "a", "e", "U", "I", "A", "E");
    $texto = str_replace($no_permitidas, $permitidas, $cadena);
    return $texto;
}

function quitar_espacio($cadena)
{
    $no_permitidas = array(" ");
    $permitidas = array("-");
    $texto = str_replace($no_permitidas, $permitidas, $cadena);
    return $texto;
}
