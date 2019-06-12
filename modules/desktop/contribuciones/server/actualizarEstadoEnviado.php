<?php
/**
 * AMC
 *
 * Copyright (C)  2017
 *
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2015 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    1.0.0, 2017-06-15
 */
// luego de enviar la impresion se actualiza como enviado a inspeccion
/*
$sql = "UPDATE amc_denuncias
        SET envio_inspeccion = 'true'
        WHERE
            reasignacion LIKE '%$unidad%' 
        AND envio_inspeccion <> 'true'";

$result = $os->db->conn->query($sql);*/