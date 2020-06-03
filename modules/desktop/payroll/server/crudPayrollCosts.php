<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectContribuciones()
{
    global $os;

    $columnaBusqueda = 'grant_number';
    $where = '';

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }
    if (isset($_POST['filterText'])) {
        $where = retornaWhereBusqueda($_POST['filterText'], $columnaBusqueda);
    }


    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;

    $orderby = 'ORDER BY id DESC';
    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }

//     para los reportes
    if (isset($_POST['busqueda_tipo_documento']) and ($_POST['busqueda_tipo_documento'] != '')) {
        $tipo = $_POST['busqueda_tipo_documento'];
        if ($where == '') {
            $where = "WHERE estado = '$tipo' ";
        } else {
            $where = $where . " AND estado = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_institucion']) and ($_POST['busqueda_institucion'] != '')) {
        $tipo = $_POST['busqueda_institucion'];
        if ($where == '') {
            $where = "WHERE donor = '$tipo' ";
        } else {
            $where = $where . " AND donor = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_caracter_tramite']) and ($_POST['busqueda_caracter_tramite'] != '')) {
        $tipo = $_POST['busqueda_caracter_tramite'];
        if ($where == '') {
            $where = "WHERE year_contribution = '$tipo' ";
        } else {
            $where = $where . " AND year_contribution = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_guia']) and ($_POST['busqueda_guia'] != '')) {
        $tipo = $_POST['busqueda_guia'];
        if ($where == '') {
            $where = "WHERE grant_specific = '$tipo' ";
        } else {
            $where = $where . " AND grant_specific = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_reasignacion']) and ($_POST['busqueda_reasignacion'] != '')) {
        $tipo = $_POST['busqueda_reasignacion'];
        if ($where == '') {
            $where = "WHERE reasignacion in ($tipo) ";
        } else {
            $where = $where . " AND reasignacion in ($tipo) ";
        }
    }

    if (isset($_POST['busqueda_fecha_inicio']) and ($_POST['busqueda_fecha_inicio'] != '')) {
        $fechainicio = $_POST['busqueda_fecha_inicio'];
        if (isset($_POST['busqueda_fecha_fin']) and ($_POST['busqueda_fecha_fin'] != '')) {
            $fechafin = $_POST['busqueda_fecha_fin'];
        } else {
            $fechafin = date("Y-m-d");;
        }
        if ($where == '') {
            $where = "WHERE grant_tod between '$fechainicio' and '$fechafin'  ";
        } else {
            $where = $where . " AND grant_tod between '$fechainicio' and '$fechafin' ";

        }
    }

    $os->db->conn->query("SET NAMES 'utf8'");
    $sqlA = "SELECT * FROM pma_costos_micro where cost_code2 in (SELECT id FROM `pma_cost_category` WHERE description like 'Staff cost' ) $where $orderby LIMIT $start, $limit";

    $result = $os->db->conn->query($sqlA);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    // $sql = "SELECT count(*) AS total FROM pma_costos_micro $where";
    // SELECT * FROM `pma_costos_micro` where cost_code2 in (SELECT id FROM `pma_cost_category` WHERE description = 'Staff cost' )
    $sql = "SELECT count(*) AS total FROM pma_costos_micro where cost_code2 in (SELECT id FROM `pma_cost_category` WHERE description like 'Staff cost' ) $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data,
            "sql" => $sqlA)
    );
}



switch ($_GET['operation']) {
    case 'select' :
        selectContribuciones();
        break;

}
