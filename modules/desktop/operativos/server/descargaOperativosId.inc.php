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
if (isset($_GET["operativo"])) {
    $operativoId = $_GET["operativo"];
} else {
    exit;
}

$filaTitulo1 = 1;
$filaTitulo2 = 2;
$filaTitulo3 = 3;
$filacabecera = $filaTitulo3;
$anchoColumna = 16.5;

$dias = array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

// recuepro el listado de operativos en base al filtro
fecha_informe($operativoId);

function fecha_informe($operativoId)
{
    global $os;
    $sql = "SELECT fecha_impresion_informe FROM amc_operativos WHERE id = $operativoId ";
    $result = $os->db->conn->query($sql);
    $fechaInforme = $result->fetch(PDO::FETCH_ASSOC);
    if (!isset($fechaInforme['fecha_impresion_informe'])) {
        $sql = "UPDATE `amc_operativos` SET `fecha_impresion_informe`=now() WHERE (`id`='$operativoId')";
        $os->db->conn->query($sql);
    }
    return null;
}

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT * FROM amc_operativos WHERE id = $operativoId ";
$result = $os->db->conn->query($sql);
$operativo = $result->fetch(PDO::FETCH_ASSOC);

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);
orientacion('A1:F600', 'center');
//tamaños de texto pòr defecto
$objPHPExcel->getActiveSheet()->getStyle('A1:F3')->getFont()->setSize(12);
$objPHPExcel->getActiveSheet()->getStyle('A4:F100')->getFont()->setSize(10);


//definicion de estilos
$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);

//declaracion de los titulos de la linea 1 2 3
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':F' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':F' . $filaTitulo2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo3 . ':F' . $filaTitulo3);

$objPHPExcel->getActiveSheet()->getStyle('A1:A3')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->getStyle('A1:A3')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "MUNICIPIO DEL DISTRITO METROPOLITANO DE QUITO");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'AGENCIA METROPOLITANA DE CONTROL');
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo3, "INFORME DE OPERATIVO DE CONTROL No. AMC-" . $year = date('Y', strtotime($operativo['fecha_inicio_planificacion'])) . "-" . $operativoId);



textoSiguieteFila("1. DATOS GENERALES DEL OPERATIVO", 'A', 'F', 'left', true, "B");
textoSiguieteFila(regresaZonal($operativo['id_zonal']) . " - " . regresaUnidad($operativo['id_unidad']), 'A', 'F', 'center', true, "B");

$objPHPExcel->getActiveSheet()->getRowDimension($filacabecera + 1)->setRowHeight(27);
textoSiguieteFila("UBICACION: " . $operativo['zona'], 'A', 'B', 'center');

$dateInicio = new DateTime($operativo['fecha_inicio_planificacion']);
$fechaInicio = $dateInicio->format('H\hi');

$dateFin = new DateTime($operativo['fecha_fin_planificacion']);
$fechaFin = $dateFin->format('H\hi');

$interval = $dateInicio->diff($dateFin);


if (fechaLarga($operativo['fecha_inicio_planificacion']) === fechaLarga($operativo['fecha_fin_planificacion'])) {
    textoSiguieteFila("FECHA OPERATIVO:  " . fechaLarga($operativo['fecha_inicio_planificacion']), 'C', 'D', 'center', false);
    $horasIntervalo = $interval->format('%H horas %I minutos');
}
else {
    textoSiguieteFila("FECHA INICIO:  " . fechaLarga($operativo['fecha_inicio_planificacion']) . ". FECHA FIN: " . fechaLarga($operativo['fecha_fin_planificacion']), 'C', 'D', 'center', false);
    $objPHPExcel->getActiveSheet()->getRowDimension(6)->setRowHeight(50);
    $horasIntervalo = $interval->format('%d dias %H horas %I minutos');
}

textoSiguieteFila("FECHA INFORME: " . fechaLarga($operativo['fecha_impresion_informe']), 'E', 'F', 'center', false);


textoSiguieteFila("Hora Inicio: " . $fechaInicio, 'A', 'B', 'center');
textoSiguieteFila("Hora Fin: " . $fechaFin, 'C', 'D', 'center', false);
textoSiguieteFila("Duración: " . $horasIntervalo, 'E', 'F', 'center', false);

textoSiguieteFila("TIPO:" . regresaTipoOperativo($operativo['tipo_operativo']), 'A', 'F', 'center');

textoSiguieteFila("2. TIPO DE OPERATIVO (EJES TEMATICOS DE CONTROL)", 'A', 'F', 'left', true, "B");
//textoSiguieteFila("CONTROL ESPACIO PUBLICO", 'A', 'F', 'center');
textoSiguieteFila(tiposDeControl($operativo['id_tipo_control']), 'A', 'F', 'center');

textoSiguieteFila('3. PERSONAL PARTICIPANTE EN EL OPERATIVO ', 'A', 'F', 'left', true, "B");

textoSiguieteFila("ENTIDAD", 'A', 'B', 'center', true, "B");
textoSiguieteFila("JEFE DE GRUPO", 'C', 'D', 'center', false, "B");
textoSiguieteFila("No. Participantes", 'E', 'F', 'center', false, "B");

// recuperamos los nombres de los usuarios
$sql = "SELECT (SELECT amc_entidades.nombre
                FROM amc_entidades 
                WHERE amc_entidades.id = b.id_entidad ) AS nombre, jefe_grupo, personas, asistencia  
        FROM amc_operativos_participantes b 
        WHERE id_operativo = '" . $operativo['id'] . "'";
$nombres = $os->db->conn->query($sql);
$nombresUsuarios = array();
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila($nombreDetalle['nombre'], 'A', 'B', 'center');
    textoSiguieteFila($nombreDetalle['jefe_grupo'], 'C', 'D', 'center', false);
    textoSiguieteFila($nombreDetalle['personas'], 'E', 'F', 'center', false);
}

textoSiguieteFila('PERSONAL AMC PARTICIPANTE EN EL OPERATIVO ', 'A', 'F', 'left', true, "B");

textoSiguieteFila("NOMBRE", 'A', 'C', 'center', true, "B");
textoSiguieteFila("OBSERVACIONES", 'D', 'F', 'center', false, "B");

textoSiguieteFila(regresaNombre($operativo['id_persona_encargada']), 'A', 'C', 'left');
textoSiguieteFila('RESPONSABLE', 'D', 'F', 'left', false);


// recuperamos los nombres de los usuarios
$sql = "SELECT id_member, observaciones, asistencia
        FROM amc_operativos_personal  
        WHERE id_operativo = '" . $operativo['id'] . "'";
$nombres = $os->db->conn->query($sql);
$nombresUsuarios = array();
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila(regresaNombre($nombreDetalle['id_member']), 'A', 'C', 'left');
    if ($nombreDetalle['asistencia'] == '1')
        textoSiguieteFila($nombreDetalle['observaciones'], 'D', 'F', 'left', false);
    else
        textoSiguieteFila($nombreDetalle['observaciones'] . " (INASISTENCIA)", 'D', 'F', 'left', false);
}


textoSiguieteFila('4. ACCIONES EJECUTADAS (ACTOS DE INICIO, ACTAS DE INFRACCION) ', 'A', 'F', 'left', true, "B");

textoSiguieteFila("Nombre Administrado", 'A', 'A', 'center', true, "B");
textoSiguieteFila("Ordenanza Metropolitana", 'B', 'B', 'center', false, "B");
textoSiguieteFila("Dirección Establecimiento", 'C', 'C', 'center', false, "B");
textoSiguieteFila("Hecho Constatado", 'D', 'D', 'center', false, "B");
textoSiguieteFila("Medida Adoptada", 'E', 'E', 'center', false, "B");
textoSiguieteFila("Actos Inicio ", 'F', 'F', 'center', false, "B");
$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':F' . $filacabecera)->getFont()->setSize(9);


// recuperamos los nombres de los usuarios
$sql = "SELECT *, (SELECT nombre FROM amc_operativos_informes_tipos_medidas a WHERE b.medida = a.id) medida_nombre
        FROM amc_operativos_informes b 
        WHERE id_operativo = '" . $operativo['id'] . "'";
$nombres = $os->db->conn->query($sql);
$nombresUsuarios = array();
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    // declarar tamaños de letra
    textoSiguieteFila($nombreDetalle['administrado'], 'A', 'A', 'center');
    textoSiguieteFila(regresaOrdenanza($nombreDetalle['id_ordenanza']), 'B', 'B', 'center', false);
    textoSiguieteFila($nombreDetalle['direccion'], 'C', 'C', 'center', false);
    textoSiguieteFila($nombreDetalle['hecho'], 'D', 'D', 'center', false);
    textoSiguieteFila($nombreDetalle['medida_nombre'], 'E', 'E', 'center', false);
    textoSiguieteFila($nombreDetalle['numero_auto_inicio'], 'F', 'F', 'center', false);
    if (strlen($nombreDetalle['observaciones']) > 1)
        textoSiguieteFila($nombreDetalle['observaciones'], 'A', 'F', 'left');

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':F' . $filacabecera)->getFont()->setSize(9);
}

textoSiguieteFila("5. OBSERVACIONES", 'A', 'F', 'left', true, "B");

$calcularAlto = calculaAltoTexto($operativo['detalle']);
$objPHPExcel->getActiveSheet()->getRowDimension($filacabecera + 1)->setRowHeight($calcularAlto);

textoSiguieteFila($operativo['detalle'], 'A', 'F', 'left');

textoSiguieteFila('RETIROS EFECTUADOS', 'A', 'F', 'left', true, "B");

textoSiguieteFila("Nombre Administrado", 'A', 'A', 'center', true, "B");
textoSiguieteFila("Dirección", 'B', 'B', 'center', false, "B");
textoSiguieteFila("Tipo", 'C', 'C', 'center', false, "B");
textoSiguieteFila("Código bodega ", 'D', 'D', 'center', false, "B");
textoSiguieteFila("Detalle", 'E', 'F', 'center', false, "B");
$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':F' . $filacabecera)->getFont()->setSize(9);

// recuperamos los nombres de los usuarios
$sql = "SELECT * FROM amc_operativos_retiros WHERE id_operativo = '" . $operativo['id'] . "'";
$nombres = $os->db->conn->query($sql);
$nombresUsuarios = array();
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    // declarar tamaños de letra
    textoSiguieteFila($nombreDetalle['nombre'], 'A', 'A', 'center');
    textoSiguieteFila($nombreDetalle['direccion'], 'B', 'B', 'center', false);
    textoSiguieteFila($nombreDetalle['tipo'], 'C', 'C', 'center', false);
    textoSiguieteFila($nombreDetalle['codigo_bodega'], 'D', 'D', 'center', false);
    textoSiguieteFila($nombreDetalle['detalle'], 'E', 'F', 'center', false);


    $objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':F' . $filacabecera)->getFont()->setSize(9);
}


// recuperamos el listado de acciones
$sql = "SELECT * FROM amc_operativos_acciones WHERE id_operativo = '" . $operativo['id'] . "'";
$nombres = $os->db->conn->query($sql);
$number_of_rows = $nombres->rowCount();

if ($number_of_rows > 0) {
    textoSiguieteFila('ACCIONES REALIZADAS', 'A', 'F', 'left', true, "B");

    textoSiguieteFila("Acciones realizadas", 'A', 'B', 'center', true, "B");
    textoSiguieteFila("Totales", 'C', 'D', 'center', false, "B");
    textoSiguieteFila("Detalle", 'E', 'F', 'center', false, "B");

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':F' . $filacabecera)->getFont()->setSize(9);

    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        // declarar tamaños de letra
        textoSiguieteFila(regresaTipoAccion($nombreDetalle['id_accion']), 'A', 'B', 'center');
        textoSiguieteFila($nombreDetalle['cantidad'], 'C', 'D', 'center', false);
        textoSiguieteFila($nombreDetalle['observaciones'], 'E', 'F', 'center', false);

        $objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':F' . $filacabecera)->getFont()->setSize(9);
    }
}


textoSiguieteFila("6. RESULTADOS", 'A', 'F', 'left', true, "B");
textoSiguieteFila("PARROQUIAS INTERVENIDAS", 'A', 'C', 'left', true, "B");
textoSiguieteFila("BARRIOS/SECTORES INTERVENIDOS", 'D', 'F', 'left', false, "B");

//determina cual es el mas alto
$calcularAlto1 = calculaAltoTexto($operativo['parroquias']);
$calcularAlto2 = calculaAltoTexto($operativo['barrios']);
$calcularAltoNuevo = ($calcularAlto1 > $calcularAlto2) ? $calcularAlto1 : $calcularAlto2;
$objPHPExcel->getActiveSheet()->getRowDimension($filacabecera + 1)->setRowHeight($calcularAltoNuevo);

textoSiguieteFila($operativo['parroquias'], 'A', 'C', 'left');
textoSiguieteFila($operativo['barrios'], 'D', 'F', 'left', false);

textoSiguieteFila("TOTALES PROCEDIMIENTOS LEVANTADOS", 'A', 'F', 'center', true, "B");

textoSiguieteFila("ORDENANZA", 'A', 'B', 'center', true, "B");
textoSiguieteFila("MEDIDA", 'C', 'D', 'center', false, "B");
textoSiguieteFila("TOTAL", 'E', 'F', 'center', false, "B");

$sql = "SELECT 	COUNT(*) total,	id_ordenanza,	medida, (SELECT nombre FROM amc_operativos_informes_tipos_medidas a WHERE b.medida = a.id) medida_nombre
        FROM
	      amc_operativos_informes b
        WHERE
	      id_operativo = " . $operativo['id'] . "
        GROUP BY
	        id_ordenanza,
	        medida;";

$nombres = $os->db->conn->query($sql);
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila(regresaOrdenanza($nombreDetalle['id_ordenanza']), 'A', 'B', 'left');
    textoSiguieteFila($nombreDetalle['medida_nombre'], 'C', 'D', 'left', false);
    textoSiguieteFila($nombreDetalle['total'], 'E', 'F', 'left', false);
}


$sql = "SELECT *
        FROM amc_operativos_imagenes b 
        WHERE id_operativo = '" . $operativo['id'] . "'";
$nombres = $os->db->conn->query($sql);
$lado = true;
$primeraFilaImage = $filacabecera + 1;
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    if ($lado) {
        imagenSiguieteFila($nombreDetalle['url'], 'A', 'C');
    } else {
        imagenSiguieteFila($nombreDetalle['url'], 'D', 'F', false);
    }
    $lado = !$lado;
}

// en el caso que no se quede el ultimo cuadro ocupado por una imagen
if (!$lado) $objPHPExcel->getActiveSheet()->mergeCells("D" . $filacabecera . ":F" . $filacabecera);
borde("A" . $primeraFilaImage . ':' . 'F' . $filacabecera);
// Elaborador por:
if ($operativo['id_persona_encargada'] === $os->get_member_id())
    $textoElaboradoPor = "
Elaborador por: " . regresaNombre($operativo['id_persona_encargada']);
else     $textoElaboradoPor = "
Elaborador por: " . regresaNombre($operativo['id_persona_encargada']) . "





Descargado por: " . regresaNombre($os->get_member_id());

$calcularAlto = calculaAltoTexto($operativo['detalle']);
$objPHPExcel->getActiveSheet()->getRowDimension($filacabecera + 1)->setRowHeight(110);


textoSiguieteFila($textoElaboradoPor, 'A', 'F', 'left');

$filacabecera++;
unirycuadro("A" . $filacabecera . ':' . "F" . $filacabecera);

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
$objDrawing->setCoordinates("F1");
//setOffsetX works properly
$objDrawing->setOffsetX(10);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(100);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());

// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth($anchoColumna);


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


$objPHPExcel->getActiveSheet()->getStyle('A4:F200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:F30')->getAlignment()->setWrapText(true);

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
header('Content-Disposition: attachment;filename="Operativo-AMC-' . $operativoId . '-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;


function regresaTipoOperativo($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_operativos_tipos WHERE id = '" . $id_dato . "'";
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
    if ($id_dato != '') {
        $sql = "SELECT *
            FROM amc_unidades WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre_completo'];
    } else
        return '';

}

function regresaTipoAccion($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id_dato != '') {
        $sql = "SELECT * FROM amc_operativos_acciones_tipos WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre_completo'];
    } else
        return '';

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
    $sql = "SELECT fecha_inicio_planificacion FROM amc_operativos as b  $where  ORDER BY b.fecha_inicio_planificacion  LIMIT 1 ";
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['fecha_inicio_planificacion'];
}

function fechaFinSQL($where)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT fecha_fin_planificacion FROM amc_operativos as b  $where  ORDER BY b.fecha_fin_planificacion DESC LIMIT 1 ";
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
    $objPHPExcel->getActiveSheet()->setCellValue($inicio . $filacabecera, $texto);
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
    //$objDrawing->setHeight(360);
    $objDrawing->setWidth(360);
    $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
}