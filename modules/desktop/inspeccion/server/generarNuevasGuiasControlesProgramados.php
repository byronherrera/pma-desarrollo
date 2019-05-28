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
global $result;
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

// si no existe unidad es para    reimpresion se envia como parametro guia, obtenemos id unidad
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

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);


if ($reimpresion) {
//   envioEmail($rowFuncionario['funcionario']);
    $siguienteZona = 1;
    imprimeActa($siguienteFila, 0, $reimpresion, $acta);
}else{
    $sql = "SELECT DISTINCT zona FROM amc_inspeccion_control_programado WHERE amc_inspeccion_control_programado.tecnico <> '' AND estado_asignacion = 3 AND envio_zonal = 1 AND guia_generada IS NULL;";
    $resultZonas = $os->db->conn->query($sql);
    $siguienteZona = 1;
    $test = 0;
    $year = date("Y");
    while ($rowZona = $resultZonas->fetch(PDO::FETCH_ASSOC)) {
        if (($rowZona['zona'] != '') and (!is_null($rowZona['zona']))) {
            //envioEmail($rowFuncionario['zona']);
            $siguienteZona = imprimeActa($siguienteZona, $rowZona['zona']);
            $test++;
        }
    }
    $pageMargins = $objPHPExcel->getActiveSheet()->getPageMargins();
    //$sql = "SELECT * FROM amc_inspeccion_control_programa  do WHERE guia_generada = 0 ORDER BY id";
}

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

//if ($number_of_rows == 0) {
    $nombreUnidad = '';
    $today = '';
    $year = '';
//}

header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="guia-controles-programados-' . $year . '-' . $numeroGuia . '-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');

//$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'PDF');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');

exit;


function imprimeActa($filaTitulo1, $zona, $reimpresion = false, $acta = 0)
{
    global $os;
    global $objPHPExcel;
    global $number_of_rows;
    global $today;

    $objPHPExcel->getActiveSheet()->setBreak('a' . ($filaTitulo1 - 1), PHPExcel_Worksheet::BREAK_ROW);

    $sql = "SELECT *
        FROM amc_inspeccion_control_programado 
        WHERE envio_zonal = 1
        AND amc_inspeccion_control_programado.zona = $zona
        AND estado_asignacion = 3 
	    AND envio_zonal = 1 
	    AND guia_generada IS NULL 
        ORDER BY id";
    $result = $os->db->conn->query($sql);
    $number_of_rows = $result->rowCount();


    //$filaTitulo1 = 1;
    $filaTitulo2 = $filaTitulo1 + 1;
    $filacabecera = $filaTitulo1 + 7;
    $filaInicio = $filaTitulo1 + 8;

    $styleArray = array(
        'borders' => array(
            'allborders' => array(
                'style' => PHPExcel_Style_Border::BORDER_THIN
            )
        )
    );

//get nombre largo unidad

    $os->db->conn->query("SET NAMES 'utf8'");
    $unidad = 3;
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
    $sql = "SELECT COUNT(id) num FROM amc_guias_controles_programados WHERE creado > '" . date("Y") . "-01-01 01:01:01';";
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
    $objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':I' . $filaTitulo1);


    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaTitulo1 . ':I' . $filaTitulo1)->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            )
        )
    );
    $objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':I' . $filaTitulo2);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaTitulo2 . ':I' . $filaTitulo2)->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            )
        )
    );

    $objPHPExcel->getActiveSheet()->getStyle('A'. ($filaTitulo2 +2) . ':I'.($filaTitulo2+5))->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT,
            )
        )
    );

    if ($number_of_rows > 0) {
        $newIdGuia = 'Vacio';
        //insert  numero de guia
        $os->db->conn->query("SET NAMES 'utf8'");

        $idUsuario = $os->get_member_id();
        if (!$reimpresion) {
            $sql = "INSERT INTO amc_guias_controles_programados (numero, unidad, id_member, id_unidad) VALUES ('GUIA-CP-$numeroGuia-$year', '$nombreUnidad', '$idUsuario', '$unidad')";
            $resultguia = $os->db->conn->query($sql);
            $newIdGuia = $os->db->conn->lastInsertId();
        }

        $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "AGENCIA METROPOLITANA DE CONTROL");
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

    $objPHPExcel->getActiveSheet()->setCellValue('B' . ($filaTitulo2 + 2), "GUÍA No. ");
    $objPHPExcel->getActiveSheet()->setCellValue('B' . ($filaTitulo2 + 3), "FECHA");

    $objPHPExcel->getActiveSheet()->setCellValue('C' . ($filaTitulo2 + 2), $numeroGuia);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . ($filaTitulo2 + 3), $today);

    $objPHPExcel->getActiveSheet()->setCellValue('F' . ($filaTitulo2 + 2), 'FECHA RECEPCIÓN');
    $objPHPExcel->getActiveSheet()->setCellValue('F' . ($filaTitulo2 + 3), "NOMBRE RECEPTOR");
    $objPHPExcel->getActiveSheet()->setCellValue('F' . ($filaTitulo2 + 4), "FIRMA Y SELLO");

    $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filaTitulo2 + 2), "__________________");
    $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filaTitulo2 + 3), "__________________");
    $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filaTitulo2 + 4), "__________________");

    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(18);
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(12);
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(14);
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(10);
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(15);
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(32);
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(15);
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(10);
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(15);


    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'FECHA RECEPCIÓN');
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'No TRÁMITE');
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'ZONA');
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'PREDIO');
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'CLAVE CATASTRAL');
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'PROPIETARIO');
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'CEDULA O RUC');
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'GDOC');
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'OBSERVACIONES');


    $noExistenFilas = true;


      while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia
        if (strlen($newIdGuia) > 0) {
            if (!$reimpresion) {
                $os->db->conn->query("SET NAMES 'utf8'");
                $sql = "UPDATE amc_inspeccion_control_programado SET envio_zonal = 1, guia_generada = '$numeroGuia' WHERE id= " . $rowdetalle['id'];
                $os->db->conn->query($sql);
            }
        }

        $noExistenFilas = false;


if (!is_null($rowdetalle['zona'])&& $rowdetalle['zona']!= ''){
    $os->db->conn->query("SET NAMES 'utf8'");
    $sqlZona = "SELECT nombre FROM amc_zonas WHERE (id =" . $rowdetalle['zona'] . ")";
    $zona = $os->db->conn->query($sqlZona);
    $nombreZona = $zona->fetch(PDO::FETCH_ASSOC);
}
        $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['fecha_recepcion_documento']);
        $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['codigo_tramite']);
        $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $nombreZona['nombre']);
        $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $rowdetalle['predio']);
        $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, $rowdetalle['clave_catastral']);
        $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, $rowdetalle['nombre_propietario']);
        $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, " " . $rowdetalle['cedula_propietario']);
        $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, $rowdetalle['gdoc']);

        $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':I' . $filaInicio)->applyFromArray($styleArray);
        $filaInicio++;
    }

// impresion pie de pagina
    $objDrawing = new PHPExcel_Worksheet_Drawing();
    $objDrawing->setName('test_img');
    $objDrawing->setDescription('test_img');
    $objDrawing->setPath('image2.png');
    $objDrawing->setCoordinates('A' . ($filaInicio));
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
    $objDrawing->setCoordinates('A' . $filaTitulo1);
//setOffsetX works properly
    $objDrawing->setOffsetX(0);
    $objDrawing->setOffsetY(0);
//set width, height
    $objDrawing->setWidth(100);
    $objDrawing->setHeight(50);
    $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
// fin impresion pie de pagina


// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
    $objPHPExcel->getProperties()->setCreator("Carlos Cevallos")
        ->setLastModifiedBy("Carlos Cevallos")
        ->setTitle("AMC reporte Controles programados")
        ->setSubject("")
        ->setDescription("AMC reporte Controles programados, generated using PHP classes.")
        ->setKeywords("AMC reporte Controles programados")
        ->setCategory("Archivo");


    $styleThinBlackBorderOutline = array(
        'borders' => array(
            'outline' => array(
                'style' => PHPExcel_Style_Border::BORDER_THIN,
                'color' => array('argb' => '00000000'),
            ),
        ),
    );


    $objPHPExcel->getActiveSheet()->getStyle('A1:I2')->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            )
        )
    );

    $objPHPExcel->getActiveSheet()->getStyle('A'. ($filaTitulo2 +2) . ':I'.($filaTitulo2+5))->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT,
            )
        )
    );

    $objPHPExcel->getActiveSheet()->getStyle('A7:I' . $filascabecera)->applyFromArray(
        array(
            'alignment' => array(
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
            )
        )
    );

    $objPHPExcel->getActiveSheet()->getStyle('A'. ($filaTitulo2 +6) . ':I'.($filaInicio))->getAlignment()->setWrapText(true);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':I' . $filacabecera)->applyFromArray($styleArray);

//$objPHPExcel->getActiveSheet()->getStyle('A7:D7')->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

// Set page orientation and size
//echo date('H:i:s') , " Set page orientation and size" , PHP_EOL;
    $objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaTitulo1 . ':I' . $filaTitulo1)->getFont()->setSize(12);
    $objPHPExcel->getActiveSheet()->getStyle('A' .($filaTitulo1+7) .':I' . $filaInicio)->getFont()->setSize(9);

    return $filaInicio + 6;
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

function total_guias()
{
    global $os;
    $nombre = $os->db->conn->query("SELECT COUNT(*) AS total FROM amc_guias_inspeccion");
    $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rowguia['total'];
}