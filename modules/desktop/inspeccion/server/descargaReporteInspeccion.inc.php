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

// si no existe unidad es para reimpresion se envia como parametro guia, obtenemos id unidad
if (isset($_GET['param'])) {
    $data = json_decode(stripslashes($_GET["param"]));
}

$today = date("Y-n-j-H-i-s");

// para los reportes
$where = '';
if (isset($data->busqueda_fecha_inicio) and ($data->busqueda_tipo_documento != '')) {
    $tipo = $data->busqueda_tipo_documento;
    if ($where == '') {
        $where = "WHERE id_tipo_documento = $tipo ";
    } else {
        $where = $where . " AND id_tipo_documento = $tipo ";
    }
}
if (isset($data->busqueda_institucion) and ($data->busqueda_institucion != '')) {
    $tipo = $data->busqueda_institucion;
    if ($where == '') {
        $where = "WHERE institucion = '$tipo' ";
    } else {
        $where = $where . " AND institucion = '$tipo' ";
    }
}
if (isset($data->busqueda_caracter_tramite) and ($data->busqueda_caracter_tramite != '')) {
    $tipo = $data->busqueda_caracter_tramite;
    if ($where == '') {
        $where = "WHERE id_caracter_tramite = '$tipo' ";
    } else {
        $where = $where . " AND id_caracter_tramite = '$tipo' ";
    }
}
if (isset($data->busqueda_guia) and ($data->busqueda_guia != '')) {
    $tipo = $data->busqueda_guia;
    if ($where == '') {
        $where = "WHERE guia = '$tipo' ";
    } else {
        $where = $where . " AND guia = '$tipo' ";
    }
}
if (isset($data->busqueda_reasignacion) and ($data->busqueda_reasignacion != '')) {
    $tipo = $data->busqueda_reasignacion;
    if ($where == '') {
        $where = "WHERE reasignacion in ($tipo) ";
    } else {
        $where = $where . " AND reasignacion in ($tipo) ";
    }
}
if (isset($data->busqueda_fecha_inicio) and ($data->busqueda_fecha_inicio != '')) {
    $fechainicio = $data->busqueda_fecha_inicio;
    if (isset($data->busqueda_fecha_fin) and ($data->busqueda_fecha_fin != '')) {
        $fechafin = $data->busqueda_fecha_fin;
    } else {
        $fechafin = date('Y\m\d H:i:s');;
    }

    if ($where == '') {
        $where = "WHERE recepcion_documento between '$fechainicio' and '$fechafin'  ";
    } else {
        $where = $where . " AND recepcion_documento between '$fechainicio' and '$fechafin' ";
    }
}

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT *, (select nombre FROM amc_unidades as a WHERE a.id in (b.reasignacion) LIMIT 1) as nombre_unidad  
        FROM amc_denuncias as b $where ORDER BY b.codigo_tramite DESC";

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



$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':K' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':K' . $filaTitulo2);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "LISTADO DOCUMENTOS RECIBIDOS");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'Secretaría General');


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

$objPHPExcel->getActiveSheet()->setCellValue('C' . $filascabecera, '__________________');
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 1), $nombreUsuario);
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 2), "SECRETARIA GENERAL");

$objPHPExcel->getActiveSheet()->mergeCells('F' . ($filascabecera + 1) . ':I' . ($filascabecera + 2));
//$objPHPExcel->getActiveSheet()->setCellValue('F' . ($filascabecera + 1), $nombreUnidad);
$objPHPExcel->getActiveSheet()->mergeCells('F' . $filascabecera . ':I' . $filascabecera);
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filascabecera, '__________________');

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6.86);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(11.50);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(16.71);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(23);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(18);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(8.71);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);

$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(8.71);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('J')->setAutoSize(false);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('K')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(16.30);


$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'Codigo');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Fecha y hora de recepcion');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Tipo de documento');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'N. de documento');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Remitente');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Asunto');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Descripción del anexo');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Carácter de trámite');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Cantidad de fojas');
$objPHPExcel->getActiveSheet()->setCellValue('J' . $filacabecera, 'Unidad');
$objPHPExcel->getActiveSheet()->setCellValue('K' . $filacabecera, 'Observaciones');

$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia


    $noExistenFilas = false;
    switch ($rowdetalle['id_tipo_documento']) {
        case 1:
            $rowdetalle['id_tipo_documento'] = 'Denuncias';
            break;
        case 2:
            $rowdetalle['id_tipo_documento'] = 'Comunicados';
            break;
    }

    switch ($rowdetalle['id_caracter_tramite']) {
        case 1:
            $rowdetalle['id_caracter_tramite'] = 'Ordinario';
            break;
        case 2:
            $rowdetalle['id_caracter_tramite'] = 'Urgente';
            break;
    }

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['codigo_tramite']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['recepcion_documento']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['id_tipo_documento']);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $rowdetalle['num_documento']);
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, $rowdetalle['remitente']);
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, substr($rowdetalle['asunto'], 0, 200));
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, strip_tags($rowdetalle['descripcion_anexos']));
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, $rowdetalle['id_caracter_tramite']);
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filaInicio, $rowdetalle['cantidad_fojas']);
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, $rowdetalle['nombre_unidad']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['observacion_secretaria']);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':K' . $filaInicio)->applyFromArray($styleArray);
    $filaInicio++;
}


// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
$objPHPExcel->getProperties()->setCreator("Byron Herrera")
    ->setLastModifiedBy("Byron Herrera")
    ->setTitle("AMC reporte")
    ->setSubject("")
    ->setDescription("AMC reporte, generated using PHP classes.")
    ->setKeywords("AMC reporte")
    ->setCategory("Archivo");


$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => '00000000'),
        ),
    ),
);


$objPHPExcel->getActiveSheet()->getStyle('A1:K600')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:K200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:K30')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':K' . $filacabecera)->applyFromArray($styleArray);

//$objPHPExcel->getActiveSheet()->getStyle('A7:D7')->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);


// Set page orientation and size
//echo date('H:i:s') , " Set page orientation and size" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$objPHPExcel->getActiveSheet()->getStyle('A1:K3')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A4:K40')->getFont()->setSize(10);


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

////////////////////////////////////////////////
// se crea la cabecera de archivo y se lo graba al archivo
header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="export-documents-SGE-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');

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
