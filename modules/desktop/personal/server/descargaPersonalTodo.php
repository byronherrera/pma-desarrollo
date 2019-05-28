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
$today = date("Y-n-j-H-i-s");


$filaTitulo1 = 1;
$filaTitulo2 = 2;
$filaTitulo3 = 3;
$filacabecera = $filaTitulo3;
$anchoColumna = 16.5;

$dias = array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

// recuepro el listado de operativos en base al filtro
//fecha_informe($operativoId);

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);
orientacion('A1:Q600', 'center');
//tamaños de texto pòr defecto
$objPHPExcel->getActiveSheet()->getStyle('A1:AE3')->getFont()->setSize(12);
$objPHPExcel->getActiveSheet()->getStyle('A4:AE500')->getFont()->setSize(10);


//definicion de estilos
$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);

//declaracion de los titulos de la linea 1 2 3
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':P' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':P' . $filaTitulo2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo3 . ':P' . $filaTitulo3);

$objPHPExcel->getActiveSheet()->getStyle('A1:A3')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "MUNICIPIO DEL DISTRITO METROPOLITANO DE QUITO");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'AGENCIA METROPOLITANA DE CONTROL');
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo3, "LISTADO PERSONAL");

textoSiguieteFila("No.", 'A', 'A', 'center', true, "B");
textoSiguieteFila("CÉDULA DE IDENTIDAD", 'B', 'B', 'center', false, "B");
textoSiguieteFila("APELLIDOS", 'C', 'C', 'center', false, "B");
textoSiguieteFila("NOMBRES", 'D', 'D', 'center', false, "B");
textoSiguieteFila("PARTIDA", 'E', 'E', 'center', false, "B");
textoSiguieteFila("ROL DEL PUESTO", 'F', 'F', 'center', false, "B");
textoSiguieteFila("DENOMINACION PUESTO", 'G', 'G', 'center', false, "B");
textoSiguieteFila("GRADO", 'H', 'H', 'center', false, "B");
textoSiguieteFila("REGIMEN", 'I', 'I', 'center', false, "B");
textoSiguieteFila("MODALIDAD BAJO LA QUE LABORA", 'J', 'J', 'center', false, "B");
textoSiguieteFila("RMU", 'K', 'K', 'center', false, "B");
textoSiguieteFila("UNIDAD", 'L', 'L', 'center', false, "B");
textoSiguieteFila("TELEFONO INSTITUCIONAL", 'M', 'M', 'center', false, "B");
textoSiguieteFila("EXTENSION", 'N', 'N', 'center', false, "B");
textoSiguieteFila("EMAIL", 'O', 'O', 'center', false, "B");
textoSiguieteFila("PISO", 'P', 'P', 'center', false, "B");

textoSiguieteFila("ESTADO", 'Q', 'Q', 'center', false, "B");
textoSiguieteFila("ZONAL", 'R', 'R', 'center', false, "B");
textoSiguieteFila("OBSERVACIONES", 'S', 'S', 'center', false, "B");
textoSiguieteFila("FECHA ENTRADA", 'T', 'T', 'center', false, "B");
textoSiguieteFila("FECHA SALIDA", 'U', 'U', 'center', false, "B");
textoSiguieteFila("TELEFONO 1", 'V', 'V', 'center', false, "B");
textoSiguieteFila("TELEFONO 2", 'W', 'W', 'center', false, "B");
textoSiguieteFila("DIRECCION PRINCIPAL", 'X', 'X', 'center', false, "B");
textoSiguieteFila("DIRECCION SECUNDARIA", 'Y', 'Y', 'center', false, "B");
textoSiguieteFila("DIRECCION NUMERO", 'Z', 'Z', 'center', false, "B");
textoSiguieteFila("PARROQUIA", 'AA', 'AA', 'center', false, "B");
textoSiguieteFila("BARRIO", 'AB', 'AB', 'center', false, "B");
textoSiguieteFila("RECORRIDO", 'AC', 'AC', 'center', false, "B");
textoSiguieteFila("FECHA NACIMIENTO", 'AD', 'AD', 'center', false, "B");
textoSiguieteFila("GEOPOSICIONAMIENTO", 'AE', 'AE', 'center', false, "B");

// recuperamos los nombres de los usuarios

$numero = 1;
$sql = "SELECT * FROM amc_personal_distributivo WHERE id_estado = 1   ORDER BY apellidos";
$nombres = $os->db->conn->query($sql);
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila($numero, 'A', 'A', 'center');
    $numero++;
    textoSiguieteFila($nombreDetalle['cedula'], 'B', 'B', 'left', false);
    textoSiguieteFila($nombreDetalle['apellidos'], 'C', 'C', 'left', false);
    textoSiguieteFila($nombreDetalle['nombres'], 'D', 'D', 'left', false);
    textoSiguieteFila($nombreDetalle['partida'], 'E', 'E', 'center', false);
    textoSiguieteFila($nombreDetalle['rol'], 'F', 'F', 'left', false);
    textoSiguieteFila($nombreDetalle['denominacion'], 'G', 'G', 'left', false);
    textoSiguieteFila($nombreDetalle['grado'], 'H', 'H', 'center', false);
    textoSiguieteFila($nombreDetalle['regimen'], 'I', 'I', 'left', false);
    textoSiguieteFila($nombreDetalle['modalidad'], 'J', 'J', 'left', false);
    textoSiguieteFila($nombreDetalle['rmu'], 'K', 'K', 'center', false);
    textoSiguieteFila(regresaUnidad($nombreDetalle['unidad']), 'L', 'L', 'center', false);
    textoSiguieteFila($nombreDetalle['telefono_institucional'], 'M', 'M', 'center', false);
    textoSiguieteFila($nombreDetalle['extencion'], 'N', 'N', 'center', false);
    textoSiguieteFila($nombreDetalle['email'], 'O', 'O', 'left', false);
    textoSiguieteFila($nombreDetalle['piso'], 'P', 'P', 'left', false);

    textoSiguieteFila($nombreDetalle['id_estado'], 'Q', 'Q', 'left', false);
    textoSiguieteFila(regresaZonal($nombreDetalle['id_zonal']) , 'R', 'R', 'left', false);
    textoSiguieteFila($nombreDetalle['observaciones'], 'S', 'S', 'left', false);
    textoSiguieteFila($nombreDetalle['fecha_entrada'], 'T', 'T', 'left', false);
    textoSiguieteFila($nombreDetalle['fecha_salida'], 'U', 'U', 'left', false);
    textoSiguieteFila($nombreDetalle['telefono1'], 'V', 'V', 'left', false);
    textoSiguieteFila($nombreDetalle['telefono2'], 'W', 'W', 'left', false);
    textoSiguieteFila($nombreDetalle['direccionprincipal'], 'X', 'X', 'left', false);
    textoSiguieteFila($nombreDetalle['direccionsecundaria'], 'Y', 'Y', 'left', false);
    textoSiguieteFila($nombreDetalle['direccionnumero'], 'Z', 'Z', 'left', false);
    textoSiguieteFila($nombreDetalle['parroquia'], 'AA', 'AA', 'left', false);
    textoSiguieteFila($nombreDetalle['barrio'], 'AB', 'AB', 'left', false);
    textoSiguieteFila($nombreDetalle['recorrido'], 'AC', 'AC', 'left', false);
    textoSiguieteFila($nombreDetalle['fecha_nacimiento'], 'AD', 'AD', 'left', false);
    textoSiguieteFila($nombreDetalle['geoposicionamiento'], 'AE', 'AE', 'left', false);
}


//borde("A" . $primeraFilaImage . ':' . 'F' . $filacabecera);
// Elaborador por:
$textoElaboradoPor = "
Atentamente

__________________________
";

textoSiguieteFila($textoElaboradoPor, 'A', 'F', 'left');

$filacabecera++;
//UBICACION DEL LOGO
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../../../../imagenes/image2.png');
$objDrawing->setCoordinates("A" . ($filacabecera));
//setOffsetX works properly
$objDrawing->setOffsetX(0);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(686);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());


$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../../../../imagenes/image1.png');
$objDrawing->setCoordinates("P1");
//setOffsetX works properly
$objDrawing->setOffsetX(10);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(100);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
//FIN UBICACION DEL LOGO

// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(11);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(22);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(18);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(10);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(38);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(24);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(8);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(32);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('J')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(36);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('K')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(10);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('L')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('M')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('M')->setWidth(10);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('N')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('N')->setWidth(12);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('O')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('O')->setWidth(32);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('P')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('P')->setWidth(50);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('Q')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('Q')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('R')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('R')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('S')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('S')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('T')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('T')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('U')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('U')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('V')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('V')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('W')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('W')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('X')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('X')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('Y')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('Y')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('Z')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('Z')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AA')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AA')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AB')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AB')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AC')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AC')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AD')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AD')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AE')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AE')->setWidth(25);



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


$objPHPExcel->getActiveSheet()->getStyle('A4:QF200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:Q300')->getAlignment()->setWrapText(true);

// genera los cuadros
//$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':F' . $filacabecera)->applyFromArray($styleArray);

// Set page orientation and size
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_DEFAULT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$pageMargins = $objPHPExcel->getActiveSheet()->getPageMargins();

// margin is set in inches (0.5cm)
$margin = 0.5 / 2.54;

$pageMargins->setTop($margin);
$pageMargins->setBottom($margin);
$pageMargins->setLeft($margin);
$pageMargins->setRight($margin);


$objPHPExcel->getActiveSheet()->setShowGridLines(false);


////////////////////////////////////////////////
// se crea la cabecera de archivo y se lo graba al archivo

// se crea la cabecera de archivo y se lo graba al archivo
header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="Operativo-AMC-' . '-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;


function regresaTipoOperativo($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_personal_distributivo_tipos WHERE id = '" . $id_dato . "'";
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}


function tiposDeControl($id_dato)
{
    $porciones = explode(",", $id_dato);
    $cadena = array();
    foreach ($porciones as &$valor) {
        $cadena[] = regresaOrdenanza($valor);
    }
    return implode(", ", $cadena);
}

function regresaOrdenanza($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT nombre FROM amc_ordenanzas WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];
}

function regresaNombre($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}

function regresaZonal($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_zonas WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}

function regresaUnidad($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *
            FROM amc_unidades_personal WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre_completo'];
}

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

function fechaInicioSQL($where)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT fecha_inicio_planificacion FROM amc_personal_distributivo as b  $where  ORDER BY b.fecha_inicio_planificacion  LIMIT 1 ";
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['fecha_inicio_planificacion'];
}

function fechaFinSQL($where)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT fecha_fin_planificacion FROM amc_personal_distributivo as b  $where  ORDER BY b.fecha_fin_planificacion DESC LIMIT 1 ";
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['fecha_fin_planificacion'];
}

function fechaLarga($fecha)
{
    global $dias, $meses;
    $date = new DateTime($fecha);
    return $dias[$date->format('w')] . " " . $date->format('d') . " de " . $meses[$date->format('m') - 1] . " del " . $date->format('Y');

}

function unirycuadro($espacio)
{
    global $objPHPExcel, $styleArray;
    $objPHPExcel->getActiveSheet()->mergeCells($espacio);
}

function borde($espacio)
{
    global $objPHPExcel, $styleArray;
    $objPHPExcel->getActiveSheet()->getStyle($espacio)->applyFromArray($styleArray);
}

function orientacion($rango, $tipo = 'center')
{
    global $objPHPExcel;
    $objPHPExcel->getActiveSheet()->getStyle($rango)->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => $tipo,
            )
        )
    );
}

function textoSiguieteFila($texto = '', $inicio, $fin, $alineacion = 'center', $nuevaLinea = true, $negrilla = '')
{

    global $filacabecera, $objPHPExcel;
    if ($nuevaLinea) $filacabecera++;
    if ($inicio != $fin) unirycuadro($inicio . $filacabecera . ':' . $fin . $filacabecera);
    borde($inicio . $filacabecera . ':' . $fin . $filacabecera);
    orientacion($inicio . $filacabecera . ':' . $fin . $filacabecera, $alineacion);
    $objPHPExcel->getActiveSheet()->setCellValue($inicio . $filacabecera, utf8_encode($texto));
    $objPHPExcel->getActiveSheet()->getStyle($inicio . $filacabecera)->getAlignment()->setWrapText(true);
    if ($negrilla == 'B') $objPHPExcel->getActiveSheet()->getStyle($inicio . $filacabecera . ':' . $fin . $filacabecera)->getFont()->setBold(true);
}

function textoSiguieteFilaHtml($texto = '', $inicio, $fin, $alineacion = 'center', $nuevaLinea = true, $negrilla = '')
{

    global $filacabecera, $objPHPExcel;
    if ($nuevaLinea) $filacabecera++;
    if ($inicio != $fin) unirycuadro($inicio . $filacabecera . ':' . $fin . $filacabecera);
    borde($inicio . $filacabecera . ':' . $fin . $filacabecera);
    orientacion($inicio . $filacabecera . ':' . $fin . $filacabecera, $alineacion);
    $wizard = new PHPExcel_Helper_HTML;
    $richText = $wizard->toRichTextObject($texto);

    $objPHPExcel->getActiveSheet()->setCellValue($inicio . $filacabecera, $richText);


    $objPHPExcel->getActiveSheet()->getStyle($inicio . $filacabecera)->getAlignment()->setWrapText(true);
    if ($negrilla == 'B') $objPHPExcel->getActiveSheet()->getStyle($inicio . $filacabecera . ':' . $fin . $filacabecera)->getFont()->setBold(true);
}

function calculaAltoTexto($texto)
{
    global $anchoColumna;
    $exp = explode("\n", $texto);
    $lineas = count($exp);
    $countTexto = strlen($texto);
    // formula medio compleja

    $resultado = ($countTexto / ($anchoColumna * 6)) * 6 + 16 * $lineas;
    return $resultado;
}

function imagenSiguieteFila($imagen = '', $inicio, $fin, $nuevaLinea = true)
{
    global $filacabecera, $objPHPExcel;
    if ($nuevaLinea) $filacabecera++;

    unirycuadro($inicio . $filacabecera . ':' . $fin . $filacabecera);

    $objPHPExcel->getActiveSheet()->getRowDimension($filacabecera)->setRowHeight(220);
    $objDrawing = new PHPExcel_Worksheet_Drawing();
    $objDrawing->setName($imagen);
    $objDrawing->setDescription($imagen);
    $objDrawing->setPath('../../../../' . $imagen);
    $objDrawing->setCoordinates($inicio . ($filacabecera));
    //setOffsetX works properly
    $objDrawing->setOffsetX(1);
    $objDrawing->setOffsetY(1);
    //set width, height

    $objDrawing->setWidth(360);
    $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
}

function fecha_informe($personalId)
{
    global $os;
    $sql = "SELECT fecha_impresion_informe FROM amc_personal_distributivo WHERE id = $personalId ";
    $result = $os->db->conn->query($sql);
    $fechaInforme = $result->fetch(PDO::FETCH_ASSOC);
    if (!isset($fechaInforme['fecha_impresion_informe'])) {
        $sql = "UPDATE `amc_personal_distributivo` SET `fecha_impresion_informe`=now() WHERE (`id`='$personalId')";
        $os->db->conn->query($sql);
    }
    return null;
}
