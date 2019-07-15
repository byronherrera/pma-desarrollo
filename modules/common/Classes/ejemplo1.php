<?php

require __DIR__ . "/PhpSpreadsheet/autoload.php";


use PhpOffice\PhpSpreadsheet\IOFactory;


$inputFileName = __DIR__ . '/example1.xls';
$spreadsheet = IOFactory::load($inputFileName);
$sheetData = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
echo "hola";
var_dump($sheetData);
