<?php
/**
 * Created by PhpStorm.
 * User: Carlos Cevallos
 * Date: 02/02/2018
 * Time: 9:57
 */
//generaCodigoProcesoDenuncia

function generaNuevoCodigoTramiteUnico()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias WHERE recepcion_documento > '" . date("Y") . "-01-03 01:01:01';";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso
        return 11759;
    }
}

function generaNuevoCodigoInspeccion()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(id_inspeccion) AS maximo FROM amc_inspeccion WHERE fecha_recepcion_documento > '" . date("Y") . "-01-01 01:01:01';";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso
        return 1;
    }
}

function generaNuevoCodigoInstruccion()
{
    global $os;
    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(codigo_expediente) AS maximo FROM amc_expediente WHERE fecha_ingreso > '" . date("Y") . "-01-01 01:01:01';";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso
        return 1;
    }
}


function regresaNombre($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");


    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id_dato != '') {
        $sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre'];
    } else
        return '* No asignado';

}

function regresaEmail($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id_dato != '') {
        $sql = "SELECT email_address
            FROM qo_members WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['email_address'];
    } else
        return '* No asignado';

}

function calcularTotalGrantPlusISC($id)
{
    // aca el calculo
    global $os;
    $sql = "UPDATE pma_contribuciones SET total_contribution = total_grant + isc  WHERE `id` = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    return 1;
}


function actualizarContribucionesTotal($data)
{
    // aca el calculo
    global $os;
    $total = 0;
    $id = $data['id_pma_contribuciones'];

    $sql = "SELECT SUM(total) as total
            FROM pma_contribuciones_detalle where id_pma_contribuciones = $id ";
    $result = $os->db->conn->query($sql);
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        if (!is_null($row ['total']))
            $total = $row ['total'];
    }

    $sql = "UPDATE pma_contribuciones SET total_contribution = total_grant + isc  WHERE `id` = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $sql = "UPDATE pma_contribuciones SET total_programmed = $total, total_unprogrammed = total_grant - $total WHERE `id` = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    return 1;
}

function actualizaActivitiesTotal($id)
{

    global $os;
    $total = 0;
    $id_pma_contribuciones = 0;

    $sql = "SELECT SUM(total_adjusted) as total ,
            (select id_pma_contribuciones from pma_contribuciones_detalle WHERE id = $id) as id_pma_contribuciones
            FROM pma_costos_macro where id_pma_contribuciones_detalle = $id ";
    $result = $os->db->conn->query($sql);


    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        if (!is_null($row ['total'])) {
            $id_pma_contribuciones = $row ['id_pma_contribuciones'];
            $total = $row ['total'];
        }
    }

    $sql = "UPDATE pma_contribuciones_detalle SET total = $total  WHERE pma_contribuciones_detalle.id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $resultado = array("id_pma_contribuciones" => $id_pma_contribuciones, "total" => $total);
    return $resultado;
}

////////////////
function actualizarMicroTotal($id)
{
    global $os;
    $total = 0;
    $id_pma_contribuciones_detalle = 0;

    $sql = "SELECT SUM(total_after_adjust) as total
             FROM pma_costos_micro where id_pma_costos_macro = $id";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (!is_null($row ['total'])) {
        $total = $row ['total'];
    }
    $sql = "UPDATE pma_costos_macro SET total_cost_detail = $total  WHERE id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $sql = "select id_pma_contribuciones_detalle from pma_costos_macro  WHERE id = $id";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (!is_null($row ['id_pma_contribuciones_detalle'])) {
        $id_pma_contribuciones_detalle = $row ['id_pma_contribuciones_detalle'];
    }

    $resultado = array("id_pma_contribuciones_detalle" => $id_pma_contribuciones_detalle, "total" => $total);
    return $resultado;
}

function actualizarMicroDetailTotal($id,  $total_adjusted)
{
    global $os;
    $total = 0;
    $id_pma_costos_macro = 0;

    $sql = "SELECT SUM(total_adjusted) as total
             FROM pma_costos_micro_detalle where id_pma_costos_micro = $id AND id <> $id";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (!is_null($row ['total'])) {
        $total = $row ['total'];
    }


    $sql = "select id_pma_costos_macro, total_after_adjust from pma_costos_micro  WHERE id = $id";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (!is_null($row ['id_pma_costos_macro'])) {
        $id_pma_costos_macro = $row ['id_pma_costos_macro'];
        $total_after_adjust = $row ['total_after_adjust'];

        $sql = "SELECT SUM(total_adjusted) as total
             FROM pma_costos_micro_detalle where id_pma_costos_micro = $id ";
        $result = $os->db->conn->query($sql);
        $row = $result->fetch(PDO::FETCH_ASSOC);
        if (!is_null($row ['total'])) {
            $total = $row ['total'];
        }

        if ($total_after_adjust > $total) {
            $sql = "UPDATE pma_costos_micro SET total_cost_detail = $total  WHERE id = '$id' ";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();
        }
    }
    $resultado = array("id_pma_costos_macro" => $id_pma_costos_macro, "total" => $total, "total_after_adjust" => $total_after_adjust);
    return $resultado;
}


// funcion usada para generar la busqueda
function retornaWhereBusqueda($campo, $columnaBusqueda)
{
    $campo = str_replace(" ", "%", $campo);
    $where = " WHERE $columnaBusqueda LIKE '%$campo%' OR
                                    estado LIKE '%$campo%' OR
                                    crn  LIKE '%$campo%' OR
                                    donor LIKE '%$campo%' OR
                                    comments LIKE '%$campo%' OR
                                    year_contribution LIKE '%$campo%' OR
                                    isc LIKE '%$campo%' OR
                                    total_grant LIKE '%$campo%' OR
                                    grant_tod LIKE '%$campo%' OR
                                    grant_tdd LIKE '%$campo%' OR
                                    grant_specific LIKE '%$campo%' OR
                                    activity LIKE '%$campo%' ";
    return $where;
}


function validaRelacion($id, $idTablaHija = 'id_pma_costos_macro', $tablaHija = 'pma_costos_micro_detalle')
{
    global $os;

    $sql = "SELECT COUNT(*) as total  FROM $tablaHija where $idTablaHija = $id ";

    $result = $os->db->conn->query($sql);
    $total = 0;
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        if (!is_null($row ['total']))
            $total = $row ['total'];
    }

    if ($total > 0)
        return false;
    else
        return true;
}
