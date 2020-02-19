<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectPayroll()
{
    global $os;
    //$columnaBusqueda = 'busqueda_todos';
    $where = '';

    //Se inicializa el parámetro de búsqueda de código trámite
    $columnaBusqueda = 'pma_payroll.id';
    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        $where = " WHERE ( pma_payroll_employees.index_no LIKE '%$campo%' or 
         pma_payroll_employees.name LIKE '%$campo%' or 
         pma_payroll_employees.location LIKE '%$campo%' or 
         pma_payroll_employees.grade LIKE '%$campo%' )  ";
    }



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
    $sql = "SELECT pma_payroll_employees.id,
                    pma_payroll_employees.id_pma_payroll,
                    pma_payroll_employees.`name`,
                    pma_payroll_employees.location,
                    pma_payroll_employees.grade,
                    pma_payroll_employees.monthly_cost,
                    pma_payroll_employees.index_no,
                    pma_payroll_employees.hr_position,
                    (SELECT SUM(total) FROM pma_payroll_detalle WHERE pma_payroll_detalle.id_pma_payroll = pma_payroll_employees.id)  AS total_cost
                     FROM pma_payroll_employees  $where $orderby LIMIT $start, $limit";
   //  echo $sql;
    $result = $os->db->conn->query($sql);

    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM pma_payroll_employees $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    //$sql = "SELECT SUM(TOTAL) AS totaldetalle FROM pma_payroll_detalle $where";
    $sql = "SELECT SUM(TOTAL) AS totaldetalle FROM pma_payroll_detalle ";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $totalDetalle = $row['totaldetalle'];

    echo json_encode(array(
            "totalDetalle" => $totalDetalle,
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}


function insertPayroll()
{
    global $os;

    $data = json_decode(stripslashes($_POST["data"]));

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        if ($clave != 'id') {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "INSERT INTO pma_payroll_employees($cadenaCampos) VALUES ($cadenaDatos);";
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

//funcion verifica si el campo HRPosition se va a actualizar con los datos nuevos
function verificaCambioHRPOSITION($data)
{
    global $os;
    $id = $data->id;
    // recupero id original,
    $sql = "SELECT hr_position  FROM  pma_payroll_employees WHERE id = '$id';";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);

    // se compara con los campos
    if ($row['hr_position'] != $data->hr_position) {
        return true;
    } else {
        return false;
    }
}

function actualizaDataHR($data)
{
    global $os;

    $sql = "SELECT hr_position  FROM  pma_payroll_employees WHERE id = $data->id;";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);

    // se compara con los campos

    if ($row['hr_position'] != $data->hr_position) {
        return true;
    } else {
        return false;
    }
}

;


function updatePayroll()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    // if (isset($data->despacho_secretaria)) {
    //     if (!$data->despacho_secretaria)
    //         $data->despacho_secretaria = 'false';
    //     else
    //         $data->despacho_secretaria = 'true';
    // }


    $message = '';
    if ($data->total_cost == '') {
            calculaTotalCostPayroll ($data->id);
            $data->total_cost = 0;
    }

    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE pma_payroll_employees SET  $cadenaDatos  WHERE pma_payroll_employees.id = '$data->id' ";
    // echo($sql);
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en pma_payroll_employees actualizado exitosamente" : $sql->errorCode(),
        "message" => $message,
        "data" => $data
    ));
}

function calculaTotalCostPayroll ($id ) {
    return 1;
}


function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email FROM pma_payroll WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}


function selectPayrollForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *, (SELECT numero FROM amc_guias WHERE amc_guias.id = a.guia ) as guianumero, (SELECT COUNT(*) FROM pma_payroll  b WHERE a.cedula = b.cedula and b.cedula <> '') as totaldocumentos FROM pma_payroll as a  WHERE a.id = $id";
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

function updatePayrollForm()
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

    $sql = "UPDATE pma_payroll SET
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

function deletePayroll()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM pma_payroll_employees WHERE id = $id";
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
        insertPayroll();
        break;
    case 'update' :
        updatePayroll();
        break;
    case 'selectForm' :
        selectPayrollForm();
        break;
    case 'updateForm' :
        updatePayrollForm();
        break;
    case 'delete' :
        deletePayroll();
        break;
}
