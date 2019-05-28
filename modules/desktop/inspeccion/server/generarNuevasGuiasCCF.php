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
$os->db->conn->query("SET NAMES 'utf8'");
/*
//  validacion para la primera vez
if (total_guias() > 0) {
    $nombre = $os->db->conn->query("SELECT id_unidad, SUBSTRING(numero,10) as num FROM amc_guias_inspeccion WHERE id = $newIdGuia");
    $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
    $numeroGuia = $rowguia['num'];
} else {
    $unidad = 0;
}
*/
if (isset($_GET['reimpresion']))
    $reimpresion = settype($_GET['reimpresion'], 'boolean');
else
    $reimpresion = false;

$today = date("Y-n-j");

///////////////////

$os->db->conn->query("SET NAMES 'utf8'");
if ($reimpresion)
    $sql = "SELECT *
        FROM amc_inspeccion_ccf 
        WHERE guia_generada = 0 
        ORDER BY id_ccf";
else
    $sql = "SELECT *
        FROM amc_inspeccion_ccf
        WHERE guia_generada = 0
        ORDER BY id_ccf";

//se carga el listado de
$result = $os->db->conn->query($sql);
$number_of_rows = $result->rowCount();

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);

$filaTitulo1 = 2;
$filaTitulo2 = 3;
$filacabecera = 5;
$filaInicio = 6;

$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);

//get nombre largo unidad

    $os->db->conn->query("SET NAMES 'utf8'");
    $unidad = 2;
    $sql = "SELECT nombre_completo FROM amc_unidades WHERE id = $unidad";
    $resultguia = $os->db->conn->query($sql);
    if ($resultguia) {
        $row = $resultguia->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $nombreUnidad = $row['nombre_completo'];
        }
    }

//get numero de guia

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT COUNT(id) num FROM amc_guias_ccf WHERE fecha_registro > '" .date("Y"). "-01-01 01:01:01';";
$resultguia = $os->db->conn->query($sql);
if ($resultguia) {
    $row = $resultguia->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        if (!$reimpresion)
            $numeroGuia = $row['num'] + 1;
    }
}
$year = date("Y");



//$nombreUnidad
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':D' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':D' . $filaTitulo2);

if ($number_of_rows > 0) {
    $newIdGuia = 'Vacio';
    //insert  numero de guia
    $os->db->conn->query("SET NAMES 'utf8'");

    $idUsuario = $os->get_member_id();
    if (!$reimpresion) {
        $sql = "INSERT INTO amc_guias_ccf (numero, unidad, id_member, id_unidad) VALUES ('GUIA-CCF-$numeroGuia-$year', '$nombreUnidad', '$idUsuario', '$unidad')";
        $resultguia = $os->db->conn->query($sql);
        $newIdGuia = $os->db->conn->lastInsertId();
    }

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "GUIA CCFs No. $numeroGuia-$year");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, $nombreUnidad);


//insert  numero de guia
}

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $os->get_member_id();
$nombre = $os->db->conn->query($sql);
$rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
$nombreUsuario = $rownombre['nombre'];

$filascabecera = $number_of_rows + $filaInicio + 2;
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filascabecera) . ':D' . ($filascabecera));
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filascabecera + 1) . ':D' . ($filascabecera + 1));
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filascabecera + 2) . ':D' . ($filascabecera + 2));
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filascabecera + 3) . ':D' . ($filascabecera + 3));

$objPHPExcel->getActiveSheet()->setCellValue('B' . $filascabecera, '__________________');
$objPHPExcel->getActiveSheet()->setCellValue('B' . ($filascabecera + 1), "ENTREGADO POR:");
$objPHPExcel->getActiveSheet()->setCellValue('B' . ($filascabecera + 2), $nombreUsuario);
$objPHPExcel->getActiveSheet()->setCellValue('B' . ($filascabecera + 3), "SECRETARIA GENERAL:");

//$objPHPExcel->getActiveSheet()->mergeCells('F' . ($filascabecera + 1) . ':I' . ($filascabecera + 2));
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 1), "RECIBIDO POR:");
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 3), "COORDINADOR INSPECCIÓN");
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filascabecera, '__________________');

$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 5), '__________________');
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 6), "APROBADO POR:");
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 7), "NATALYA MEJIA");
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 8), "SECRETARIO GENERAL");

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(50);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(40);



$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'CCF No');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'PROYECTO');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'PREDIO');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'ZONA');


$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia
    if (strlen($newIdGuia) > 0) {
        if (!$reimpresion) {
            $os->db->conn->query("SET NAMES 'utf8'");
            $sql = "UPDATE amc_inspeccion_ccf SET guia_generada = 1 WHERE (id='" . $rowdetalle['id'] . "')";
            $os->db->conn->query($sql);
        }
    }

    $noExistenFilas = false;

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['id_ccf']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['proyecto']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['predio']);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $rowdetalle['zona']);


    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':D' . $filaInicio)->applyFromArray($styleArray);
    $filaInicio++;
}


// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
$objPHPExcel->getProperties()->setCreator("Carlos Cevallos")
    ->setLastModifiedBy("Carlos Cevallos")
    ->setTitle("AMC reporte CCF")
    ->setSubject("")
    ->setDescription("AMC reporte CCF, generated using PHP classes.")
    ->setKeywords("AMC reporte CCF")
    ->setCategory("Archivo");


$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => '00000000'),
        ),
    ),
);


$objPHPExcel->getActiveSheet()->getStyle('A1:D100')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:D30')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:D30')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':D' . $filacabecera)->applyFromArray($styleArray);

//$objPHPExcel->getActiveSheet()->getStyle('A7:D7')->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);


// Set page orientation and size
//echo date('H:i:s') , " Set page orientation and size" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$objPHPExcel->getActiveSheet()->getStyle('A1:D3')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A4:D40')->getFont()->setSize(10);


$pageMargins = $objPHPExcel->getActiveSheet()->getPageMargins();


// margin is set in inches (0.5cm)
$margin = 0.5 / 2.54;

$pageMargins->setTop($margin);
$pageMargins->setBottom($margin);
$pageMargins->setLeft($margin);
$pageMargins->setRight($margin);


$objPHPExcel->getActiveSheet()->setShowGridLines(false);

//echo date('H:i:s') , " Set orientation to landscape" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
// luego de enviar la impresion se actualiza como enviado a inspeccion


/////////////////////////


if ($number_of_rows == 0) {
    $nombreUnidad = '';
    $today = '';
    $year = '';
}

header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="guia-ccf-' . strtolower(quitar_espacio(quitar_tildes($nombreUnidad))) . '-SGE-' . $year . '-' . $numeroGuia . '-' . $today . '.xlsx"');
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

function total_guias()
{
    global $os;
    $nombre = $os->db->conn->query("SELECT COUNT(*) AS total FROM amc_guias_inspeccion");
    $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rowguia['total'];
}
