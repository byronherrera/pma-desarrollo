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
if (isset($_GET['param'])) {
    $data = json_decode(stripslashes($_GET["param"]));
}
if (isset($_GET['retiros'])) {
    $generaRetiros  = $_GET['retiros'];
}

$today = date("Y-n-j-H-i-s");

// para los reportes
$where = '';
// caso en reportes
if (isset($data->busqueda_tipo_control) and ($data->busqueda_tipo_control != '')) {
    $tipo = $data->busqueda_tipo_control;
    if ($where == '') {
        $where = "WHERE id_tipo_control like '%$tipo%'  ";
    } else {
        $where = $where . " AND id_tipo_control like '%$tipo%' ";
    }
}
if (isset($data->busqueda_nivel_complejidad) and ($data->busqueda_nivel_complejidad != '')) {
    $tipo = $data->busqueda_nivel_complejidad;
    if ($where == '') {
        $where = "WHERE id_nivel_complejidad like '%$tipo%'  ";
    } else {
        $where = $where . " AND id_nivel_complejidad like '%$tipo%' ";
    }
}

$titulosegundo = 'Unidad de Operativos';
if (isset($data->busqueda_zonal) and ($data->busqueda_zonal != '')) {
    $tipo = $data->busqueda_zonal;
    $titulosegundo = nombreZonal($tipo);
    if ($where == '') {
        $where = "WHERE id_zonal  = '$tipo' ";
    } else {
        $where = $where . " AND id_zonal = '$tipo' ";
    }
}


if (isset($data->busqueda_unidad_asignado) and ($data->busqueda_unidad_asignado != '')) {
    $tipo = $data->busqueda_unidad_asignado;
    if ($where == '') {
        $where = "WHERE id_unidad = $tipo ";
    } else {
        $where = $where . " AND id_unidad = $tipo ";
    }
}

if (isset($data->busqueda_persona_encargada) and ($data->busqueda_persona_encargada != '')) {
    $tipo = $data->busqueda_persona_encargada;
    if ($where == '') {
        $where = "WHERE id_persona_encargada  = '$tipo' ";
    } else {
        $where = $where . " AND id_persona_encargada = '$tipo' ";
    }
}
if (isset($data->busqueda_fallido) and ($data->busqueda_fallido != '')) {
    $tipo = $data->busqueda_fallido;
    if ($where == '') {
        $where = "WHERE fallido = '$tipo' ";
    } else {
        $where = $where . " AND fallido = '$tipo' ";
    }
}
if (isset($data->busqueda_finalizado) and ($data->busqueda_finalizado != '')) {
    $tipo = $data->busqueda_finalizado;
    if ($where == '') {
        $where = "WHERE finalizado = '$tipo' ";
    } else {
        $where = $where . " AND finalizado = '$tipo' ";
    }
}
if (isset($data->busqueda_estado) and ($data->busqueda_estado != '')) {
    $tipo = $data->busqueda_estado;
    if ($where == '') {
        $where = "WHERE id_estado = '$tipo' ";
    } else {
        $where = $where . " AND id_estado = '$tipo' ";
    }
}
if (isset($data->busqueda_tipo_operativo) and ($data->busqueda_tipo_operativo != '')) {
    $tipo = $data->busqueda_tipo_operativo;
    if ($where == '') {
        $where = "WHERE tipo_operativo = '$tipo' ";
    } else {
        $where = $where . " AND tipo_operativo = '$tipo' ";
    }
}

if (isset($data->busqueda_informe) and ($data->busqueda_informe != '')) {
    $tipo = $data->busqueda_informe;
    if ($where == '') {
        $where = "WHERE (select count(*) from amc_operativos_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = b.id ) > 0 ";
    } else {
        $where = $where . " AND (select count(*) from amc_operativos_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = b.id ) > 0               ";
    }
}
if (isset($data->busqueda_observaciones) and ($data->busqueda_observaciones != '')) {
    $tipo = $data->busqueda_observaciones;
    if ($where == '') {
        $where = "WHERE observaciones like '%$tipo%' ";
    } else {
        $where = $where . " AND observaciones like '%$tipo%' ";
    }
}
if (isset($data->busqueda_personal_asignado) and ($data->busqueda_personal_asignado != '')) {
    $tipo = $data->busqueda_personal_asignado;
    if ($where == '') {
        $where = "WHERE (select count(*) from amc_operativos_personal a where a.id_member = '$tipo' and a.id_operativo = b.id ) > 0 ";
    } else {
        $where = $where . " AND (select count(*) from amc_operativos_personal a where a.id_member = '$tipo' and a.id_operativo = b.id ) > 0  ";
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
        $where = "WHERE fecha_inicio_planificacion between '$fechainicio' and '$fechafin'  ";
    } else {
        $where = $where . " AND fecha_inicio_planificacion between '$fechainicio' and '$fechafin' ";
    }
}


$os->db->conn->query("SET NAMES 'utf8'");

$sql = "SELECT *, (SELECT nombre FROM amc_operativos_estados c WHERE  C.id = b.id_estado ) estado FROM amc_operativos as b  $where  ORDER BY b.fecha_inicio_planificacion";

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

$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':J' . $filaTitulo1);

$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':J' . $filaTitulo2);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "LISTADO OPERATIVOS");

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, $titulosegundo);

$offsetTotalesTipo = totalesPorTipo($number_of_rows + $filaInicio, $where);


$filasPiePagina = $number_of_rows + $filaInicio + 4 + $offsetTotalesTipo;


// Elaborador por:
if (isset($data->busqueda_elaborado_por) and ($data->busqueda_elaborado_por != '')) {
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina) . ':B' . ($filasPiePagina));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina + 1) . ':B' . ($filasPiePagina + 1));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina + 2) . ':B' . ($filasPiePagina + 2));


    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filasPiePagina, '__________________');
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filasPiePagina + 1), regresaNombre($data->busqueda_elaborado_por));
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filasPiePagina + 2), "Elaborado por");
}
// Revisado por:
if (isset($data->busqueda_revisado_por) and ($data->busqueda_revisado_por != '')) {
    $objPHPExcel->getActiveSheet()->mergeCells('D' . ($filasPiePagina) . ':E' . ($filasPiePagina));
    $objPHPExcel->getActiveSheet()->mergeCells('D' . ($filasPiePagina + 1) . ':E' . ($filasPiePagina + 1));
    $objPHPExcel->getActiveSheet()->mergeCells('D' . ($filasPiePagina + 2) . ':E' . ($filasPiePagina + 2));
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filasPiePagina, '__________________');
    $objPHPExcel->getActiveSheet()->setCellValue('D' . ($filasPiePagina + 1), regresaNombre($data->busqueda_revisado_por));
    $objPHPExcel->getActiveSheet()->setCellValue('D' . ($filasPiePagina + 2), "Revisado por");
}
// Aprobado por:
if (isset($data->busqueda_aprobado_por) and ($data->busqueda_aprobado_por != '')) {
    $objPHPExcel->getActiveSheet()->mergeCells('G' . ($filasPiePagina) . ':H' . ($filasPiePagina));
    $objPHPExcel->getActiveSheet()->mergeCells('G' . ($filasPiePagina + 1) . ':H' . ($filasPiePagina + 1));
    $objPHPExcel->getActiveSheet()->mergeCells('G' . ($filasPiePagina + 2) . ':H' . ($filasPiePagina + 2));
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filasPiePagina, '__________________');
    $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filasPiePagina + 1), regresaNombre($data->busqueda_aprobado_por));
    $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filasPiePagina + 2), "Aprobado por");
}

// impresion pie de pagina
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('test_img');
$objDrawing->setDescription('test_img');
$objDrawing->setPath('image2.png');
$objDrawing->setCoordinates('A'. ($filasPiePagina + 5) );
//setOffsetX works properly
$objDrawing->setOffsetX(5);
$objDrawing->setOffsetY(5);
//set width, height
$objDrawing->setWidth(200);
$objDrawing->setHeight(70);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
// fin impresion pie de pagina

// impresion pie de pagina
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('test_img2');
$objDrawing->setDescription('test_img2');
$objDrawing->setPath('image1.png');
$objDrawing->setCoordinates('I1');
//setOffsetX works properly
$objDrawing->setOffsetX(0);
$objDrawing->setOffsetY(0);
//set width, height
$objDrawing->setWidth(100);
$objDrawing->setHeight(50);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
// fin impresion pie de pagina


// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('J')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('K')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('L')->setAutoSize(false);

$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(26);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(5.5);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(5.5);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(14);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(11);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(32);
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(16);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'Cod');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Fecha');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Inicio');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'Fin');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Funcionarios Operantes');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Observaciones');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Tipo control');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Complejidad');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Punto Encuentro');
$objPHPExcel->getActiveSheet()->setCellValue('J' . $filacabecera, 'Lugar Intervención');
$objPHPExcel->getActiveSheet()->setCellValue('K' . $filacabecera, 'Zonal');
$objPHPExcel->getActiveSheet()->setCellValue('L' . $filacabecera, 'Estado');

$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia
    $noExistenFilas = false;
    //cambio para impresiono el nivel de complejidad
    $niveles_complejidad = array("Alto", "Medio", "Bajo","");

    if (isset($rowdetalle['id_nivel_complejidad']) and ($rowdetalle['id_nivel_complejidad']!= ' ')) {
        $rowdetalle['id_nivel_complejidad'] = $niveles_complejidad[$rowdetalle['id_nivel_complejidad'] - 1];
    } else {
        $rowdetalle['id_nivel_complejidad'] = '';
    }

    //cambio para impresion el tipo de control
    $sql = "SELECT nombre_completo as nombre  FROM amc_ordenanzas WHERE id in (" . $rowdetalle['id_tipo_control'] . ")";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    $rowdetalle['id_tipo_control'] = $cadena_personal;

// recuperamos los nombres de los usuarios
    $sql = "SELECT (SELECT CONCAT(qo_members.last_name, ' ', qo_members.first_name) FROM qo_members WHERE qo_members.id = b.id_member ) AS nombre  FROM amc_operativos_personal b WHERE id_operativo = '" . $rowdetalle['id'] . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    $rowdetalle['personal'] = regresaNombre($rowdetalle['id_persona_encargada']). ' *, ' . $cadena_personal;

    // recuperamos el nombre de zona
    $sql = "SELECT  nombre  FROM amc_zonas WHERE id = '" . $rowdetalle['id_zonal'] . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    $rowdetalle['id_zonal'] = $cadena_personal;


    // formatos de impresion de fechas y horas
    $date = new DateTime($rowdetalle['fecha_inicio_planificacion']);
    $inicio = $date->format('H:i');

    $dias = array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    $rowdetalle['fecha_inicio_planificacion'] = $dias[$date->format('w')] . ", " . $date->format('d') . " de " . $meses[$date->format('m') - 1] . " del " . $date->format('Y');

    $date = new DateTime($rowdetalle['fecha_fin_planificacion']);
    $fin = $date->format('H:i');

    // envio de impresion de valores
    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['id']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['fecha_inicio_planificacion']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $inicio);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $fin);
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, $rowdetalle['personal']);
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, $rowdetalle['observaciones']);
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, $rowdetalle['id_tipo_control']);
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, substr($rowdetalle['id_nivel_complejidad'], 0, 200));
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filaInicio, strip_tags($rowdetalle['punto_encuentro_planificado']));
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, $rowdetalle['zona']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['id_zonal']);
    $objPHPExcel->getActiveSheet()->setCellValue('L' . $filaInicio, $rowdetalle['estado']);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':L' . $filaInicio)->applyFromArray($styleArray);
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


$objPHPExcel->getActiveSheet()->getStyle('A1:L600')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:L200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:L3000')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':L' . $filacabecera)->applyFromArray($styleArray);


// Set page orientation and size

$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$objPHPExcel->getActiveSheet()->getStyle('A1:L3')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A4:F40')->getFont()->setSize(10);
$objPHPExcel->getActiveSheet()->getStyle('G4:L40')->getFont()->setSize(9);


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


function nombreZonal($tipo)
{
    global $os;
    $sql = "SELECT  nombre_largo as nombre FROM amc_zonas WHERE id = '" . $tipo . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    return $cadena_personal;

}

function regresaNombre($id_dato)
{
    global $os;

    if (trim ($id_dato) != '') {
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);

        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre'];

    } else
        return '';



}

function totalesPorTipo($filaTitulo1, $where)
{
    global $objPHPExcel;
    global $os;
    global $styleArray;
    $sql = "SELECT * FROM amc_ordenanzas";
    $nombres = $os->db->conn->query($sql);

    $j = 0;

    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $totalOrdenanza = recuperarTotales($nombreDetalle['id'], $where);
        if ($totalOrdenanza != 0) {
            $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filaTitulo1 + $j), $nombreDetalle['nombre_completo']);
            $objPHPExcel->getActiveSheet()->setCellValue('H' . ($filaTitulo1 + $j), $totalOrdenanza);
            $objPHPExcel->getActiveSheet()->getStyle('G' . ($filaTitulo1 + $j) . ':H' . ($filaTitulo1 + $j))->applyFromArray($styleArray);
            $j++;
        };
    }
    return $j;
}

function recuperarTotales($id, $where)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($where == '') {
        $sql = "SELECT  COUNT(*) as total FROM amc_operativos as b WHERE id_tipo_control like '%$id%'";
    } else {
        $sql = "SELECT  COUNT(*) as total FROM amc_operativos as b $where AND id_tipo_control like '%$id%'";
    }
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);

    return $rownombre['total'];
}