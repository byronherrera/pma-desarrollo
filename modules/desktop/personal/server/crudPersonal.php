<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectProcedimientosCadena($procLista)
{
    global $os;
    if (isset($procLista)) {
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT amc_procedimientos.nombre FROM amc_procedimientos WHERE id in ( $procLista ) ORDER BY id";
        $result = $os->db->conn->query($sql);
        $data = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row ['nombre'];
        }
        return implode(",\n", $data);
    } else {
        return '';
    }
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT amc_procedimientos.nombre FROM amc_procedimientos WHERE id in ( $procLista ) ORDER BY id";
    $result = $os->db->conn->query($sql);
    $data = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row ['nombre'];
    }
    return implode(",\n", $data);
}

function selectOperativos()
{
    global $os;
    //TODO cambiar columna por defecto en busquedas
    $columnaBusqueda = 'apellidos';

    $where = '';
    $usuarioLog = $os->get_member_id();
    if (isset($_POST['accesosOperativos'])) {
        $accesosOperativos = $_POST['accesosOperativos'];
        if ($accesosOperativos == 'true')
            $where = " WHERE $usuarioLog = id_persona_encargada ";
    }

    if (isset($_POST['accesosAdministradorOpe'])) {
        $accesosOperativos = $_POST['accesosAdministradorOpe'];
        if ($accesosOperativos == 'false')
            if ($where == '')
                $where = " WHERE visible  = 1 ";
            else
                $where = $where . " AND visible  = 1";
    }
    // se muestran todos los operativos
    if (isset($_POST['acceso'])) {
        $acceso = $_POST['acceso'];
        if ($acceso == 'false')
            $where = "";
        //$where = " WHERE $usuarioLog = id_persona_encargada ";
    }

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);

        if ($columnaBusqueda == 'unidad') {
            $sql = "SELECT id FROM amc_unidades_personal WHERE UPPER(nombre) like UPPER('%$campo%') LIMIT 1";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if (strlen($row['id']) > 0) {
                $campo = $row['id'];
            }
        }

        if ($where == '') {
            if ($columnaBusqueda == 'unidad')
                $where = " WHERE $columnaBusqueda = '$campo'";
            else
                $where = " WHERE $columnaBusqueda LIKE '%$campo%'";

        } else {
            if ($columnaBusqueda == 'unidad')
                $where = $where . " AND $columnaBusqueda = '$campo'";
            else
                $where = $where . " AND $columnaBusqueda LIKE '%$campo%'";
        }
    }

    if (isset($_POST['unidadfiltro'])) {
        $unidad = $_POST['unidadfiltro'];
        if ($where == '') {
            $where = "WHERE reasignacion = $unidad ";
        } else {
            $where = $where . " AND reasignacion = $unidad ";
        }
    }

    if (isset($_POST['finalizados'])) {
        if ($_POST['finalizados'] == 'true') {
            if ($where == '') {
                $where = " WHERE (id_estado = 1 OR id_estado = 4) ";
            } else {
                $where = $where . " AND (id_estado = 1 OR id_estado = 4) ";
            }
        }
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

    // caso en reportes
    if (isset($_POST['busqueda_tipo_control']) and ($_POST['busqueda_tipo_control'] != '')) {
        $tipo = $_POST['busqueda_tipo_control'];
        if ($where == '') {
            $where = "WHERE id_tipo_control like '%$tipo%'  ";
        } else {
            $where = $where . " AND id_tipo_control like '%$tipo%' ";
        }
    }
    if (isset($_POST['busqueda_nivel_complejidad']) and ($_POST['busqueda_nivel_complejidad'] != '')) {
        $tipo = $_POST['busqueda_nivel_complejidad'];
        if ($where == '') {
            $where = "WHERE id_nivel_complejidad like '%$tipo%'  ";
        } else {
            $where = $where . " AND id_nivel_complejidad like '%$tipo%' ";
        }
    }
    if (isset($_POST['busqueda_zonal']) and ($_POST['busqueda_zonal'] != '')) {
        $tipo = $_POST['busqueda_zonal'];
        if ($where == '') {
            $where = "WHERE id_zonal  = '$tipo' ";
        } else {
            $where = $where . " AND id_zonal = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_persona_encargada']) and ($_POST['busqueda_persona_encargada'] != '')) {
        $tipo = $_POST['busqueda_persona_encargada'];
        if ($where == '') {
            $where = "WHERE id_persona_encargada  like '%$tipo%' ";
        } else {
            $where = $where . " AND id_persona_encargada like '%$tipo%' ";
        }
    }
    if (isset($_POST['busqueda_estado']) and ($_POST['busqueda_estado'] != '')) {
        $tipo = $_POST['busqueda_estado'];
        if ($where == '') {
            $where = "WHERE id_estado = '$tipo' ";
        } else {
            $where = $where . " AND id_estado = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_tipo_operativo']) and ($_POST['busqueda_tipo_operativo'] != '')) {
        $tipo = $_POST['busqueda_tipo_operativo'];
        if ($where == '') {
            $where = "WHERE tipo_operativo = '$tipo' ";
        } else {
            $where = $where . " AND tipo_operativo = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_unidad_asignado']) and ($_POST['busqueda_unidad_asignado'] != '')) {
        $tipo = $_POST['busqueda_unidad_asignado'];
        if ($where == '') {
            $where = "WHERE id_unidad = $tipo ";
        } else {
            $where = $where . " AND id_unidad = $tipo ";
        }
    }

    if (isset($_POST['busqueda_informe']) and ($_POST['busqueda_informe'] != '')) {
        $tipo = $_POST['busqueda_informe'];
        if ($where == '') {
            $where = "WHERE (select count(*) from amc_personal_distributivo_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = amc_personal_distributivo.id ) > 0 ";
        } else {
            $where = $where . " AND (select count(*) from amc_personal_distributivo_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = amc_personal_distributivo.id ) > 0               ";
        }
    }


    if (isset($_POST['busqueda_observaciones']) and ($_POST['busqueda_observaciones'] != '')) {
        $tipo = $_POST['busqueda_observaciones'];
        if ($where == '') {
            $where = "WHERE observaciones like '%$tipo%' ";
        } else {
            $where = $where . " AND observaciones like '%$tipo%' ";
        }
    }
    if (isset($_POST['busqueda_personal_asignado']) and ($_POST['busqueda_personal_asignado'] != '')) {
        $tipo = $_POST['busqueda_personal_asignado'];
        if ($where == '') {
            $where = "WHERE (select count(*) from amc_personal_distributivo_personal a where a.id_member = '$tipo' and a.id_operativo = amc_personal_distributivo.id ) > 0 ";
        } else {
            $where = $where . " AND (select count(*) from amc_personal_distributivo_personal a where a.id_member = '$tipo' and a.id_operativo = amc_personal_distributivo.id ) > 0  ";
        }
    }
    if (isset($_POST['busqueda_fecha_inicio']) and ($_POST['busqueda_fecha_inicio'] != '')) {
        $fechainicio = $_POST['busqueda_fecha_inicio'];
        if (isset($_POST['busqueda_fecha_fin']) and ($_POST['busqueda_fecha_fin'] != '')) {
            $fechafin = $_POST['busqueda_fecha_fin'];
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
    $sql = "SELECT * FROM amc_personal_distributivo $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_personal_distributivo $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function insertOperativos()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));


    //$data->finalizado = 'false';
    // $data->codigo_operativo = generaCodigoProcesoDenuncia();
    //$data->id_persona = $os->get_member_id();
    //genero el listado de nombre de campos



    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        if ($clave != 'id') {
            if ($clave == 'fecha_salida') {
                if ($valor == ''){
                    $cadenaCampos = $cadenaCampos . $clave . ',';
                    $cadenaDatos = $cadenaDatos . " NULL ,";
                }
            } else {
                $cadenaCampos = $cadenaCampos . $clave . ',';
                $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
            }
        }
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_personal_distributivo($cadenaCampos)
	values($cadenaDatos);";
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

function generaCodigoProcesoDenuncia()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(codigo_operativo) AS maximo FROM amc_personal_distributivo";
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

function updateOperativos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    if (isset($data->finalizado)) {
        if (!$data->finalizado)
            $data->finalizado = 'false';
        else
            $data->finalizado = 'true';
    }

    if (isset($data->fecha_informe)) {
        $data->fecha_informe = NULL;
    }


    $message = '';
    if (isset($data->id_tipo_documento)) {
        if ($data->id_tipo_documento == '1')
            if (validarCedulaCorreo($data->id)) {
                $message = 'Ingresar número de cédula y correo electrónico';
            }
    }

// genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        if (($valor === null) or ($valor === ''))
            $cadenaDatos = $cadenaDatos . $clave . " = NULL,";
        else
            $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }

    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE amc_personal_distributivo SET  $cadenaDatos  WHERE amc_personal_distributivo.id = '$data->id' ";
    $sqlOrginal = $sql ;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_personal_distributivo actualizado exitosamente" : $sql->errorCode(),
        "message" => $message,
        "sqlOriginal" => $sqlOrginal
    ));
}

function selectOperativosForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_personal_distributivo WHERE id = $id";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function updateOperativosForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $parroquias = $_POST["parroquias"];
    $barrios = $_POST["barrios"];
    $detalle = $_POST["detalle"];


    $sql = "UPDATE `amc_personal_distributivo` SET `detalle`='$detalle', `parroquias`='$parroquias', `barrios`='$barrios' WHERE (`id`='$id')";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteOperativos()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_personal_distributivo WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_personal_distributivo, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectOperativos();
        break;
    case 'insert' :
        insertOperativos();
        break;
    case 'update' :
        updateOperativos();
        break;
    case 'selectForm' :
        selectOperativosForm();
        break;
    case 'updateForm' :
        updateOperativosForm();
        break;
    case 'delete' :
        deleteOperativos();
        break;
}
function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email FROM amc_personal_distributivo WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}
