<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectPayroll()
{
    global $os;
    $where = '';

    //Se inicializa el parámetro de búsqueda de código trámite
    $columnaBusqueda = 'id';
    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if (isset($_POST['filterField'])) {
            $columnaBusqueda = $_POST['filterField'];
        }
        $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if (isset($_POST['filterField'])) {
            $columnaBusqueda = $_POST['filterField'];
        }
        $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
    }

    if (isset($_POST['id'])) {
        $idcampo = $_POST['id'];
        $where = " WHERE id_pma_payroll = '$idcampo'";
    }

    //$columnaBusqueda = 'busqueda_todos';

    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;

    $orderby = 'ORDER BY CONVERT( id,UNSIGNED INTEGER) ASC';
    if (isset($_POST['sort'])) {
        if ($_POST['sort'] == 'id') {
            $orderby = 'ORDER BY CONVERT( id,UNSIGNED INTEGER) ASC';
        } else {
            $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
        }
    }


    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM pma_payroll_detalle $where $orderby LIMIT $start, $limit";
    $sqlRev = $sql;
    $result = $os->db->conn->query($sql);

    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM pma_payroll_detalle $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "mensaje" => $sqlRev,
            "data" => $data)
    );
}

function insertDetailPayroll()
{
    global $os;

    $data = json_decode(stripslashes($_POST["data"]));

    $cadenaDatos = '';
    $cadenaCampos = '';

    if($data->monthly_cost_2019){
      $data->expected_cost_2019 = ($data->end_month - $data->starting_month) * $data->monthly_cost_2019;
      $data->january = $data->monthly_cost_2019;
      $data->february = $data->monthly_cost_2019;
      $data->march = $data->monthly_cost_2019;
      $data->april = $data->monthly_cost_2019;
      $data->may = $data->monthly_cost_2019;
      $data->june = $data->monthly_cost_2019;
      $data->july = $data->monthly_cost_2019;
      $data->august = $data->monthly_cost_2019;
      $data->september = $data->monthly_cost_2019;
      $data->october = $data->monthly_cost_2019;
      $data->november = $data->monthly_cost_2019;
      $data->december = $data->monthly_cost_2019;
      $data->total = $data->january
       + $data->february
       + $data->march
       + $data->april
       + $data->may
       + $data->june
       + $data->july
       + $data->august
       + $data->september
       + $data->october
       + $data->november
       + $data->december;
    }

    foreach ($data as $clave => $valor) {
        if ($clave != 'id') {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }

    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "INSERT INTO pma_payroll_detalle ($cadenaCampos) VALUES ($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));
}


function updateDetailPayroll()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    if($data->monthly_cost_2019){
        $data->expected_cost_2019 = ($data->end_month - $data->starting_month) * $data->monthly_cost_2019;
         $data->january = $data->monthly_cost_2019;
         $data->february = $data->monthly_cost_2019;
         $data->march = $data->monthly_cost_2019;
         $data->april = $data->monthly_cost_2019;
         $data->may = $data->monthly_cost_2019;
         $data->june = $data->monthly_cost_2019;
         $data->july = $data->monthly_cost_2019;
         $data->august = $data->monthly_cost_2019;
         $data->september = $data->monthly_cost_2019;
         $data->october = $data->monthly_cost_2019;
         $data->november = $data->monthly_cost_2019;
         $data->december = $data->monthly_cost_2019;
    }
    $data->total = $data->january
     + $data->february
     + $data->march
     + $data->april
     + $data->may
     + $data->june
     + $data->july
     + $data->august
     + $data->september
     + $data->october
     + $data->november
     + $data->december;

    if (isset($data->despacho_secretaria)) {
        if (!$data->despacho_secretaria)
            $data->despacho_secretaria = 'false';
        else
            $data->despacho_secretaria = 'true';
    }

    $message = '';


    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE pma_payroll_detalle SET  $cadenaDatos  WHERE pma_payroll_detalle.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en pma_payroll_detalle actualizado exitosamente" : $sql->errorCode(),
        "message" => $message,
        "data" => array($data)
    ));
}

function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email FROM pma_payroll_detalle WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}


function selectDetailPayrollForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *, (SELECT numero FROM amc_guias WHERE amc_guias.id = a.guia ) as guianumero, (SELECT COUNT(*) FROM pma_payroll_detalle  b WHERE a.cedula = b.cedula and b.cedula <> '') as totaldocumentos FROM pma_payroll_detalle as a  WHERE a.id = $id";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $row['procedimientosdetalle'] = selectProcedimientosCadena($row['procedimientos']);
        $data = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function updateDetailPayrollForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];

    if (isset($_POST["reasignacion"])) {
        $reasignacion = $_POST["reasignacion"];
    } else {
        //recuperamos la unidad en base a guia
        if (isset ($_POST["guia"])) {
            $valueGuia = $_POST["guia"];
            $os->db->conn->query("SET NAMES 'utf8'");
            $sql = "SELECT id_unidad FROM amc_guias WHERE id = $valueGuia ";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $reasignacion = $row ['id_unidad'];
        }
    }
    $guia = $_POST["guia"];
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];


    //para el caso de denuncias se valida que exista cedula y correo

    $sql = "UPDATE pma_payroll_detalle SET
            id = '$id',
            nombre = $nombre,
            nombre_completo = $nombre_completo,
            activo = $activo,
            orden = $orden


          WHERE id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteDetailPayroll()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM pma_payroll_detalle WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en pma_payroll, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectPayroll();
        break;
    case 'insert' :
        insertDetailPayroll();
        break;
    case 'update' :
        updateDetailPayroll();
        break;
    case 'selectForm' :
        selectDetailPayrollForm();
        break;
    case 'updateForm' :
        updateDetailPayrollForm();
        break;
    case 'delete' :
        deleteDetailPayroll();
        break;
}
