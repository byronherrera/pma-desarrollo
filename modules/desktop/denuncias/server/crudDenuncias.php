<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

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

function selectDenuncias()
{
    global $os;

    $columnaBusqueda = 'codigo_tramite';
    $where = '';

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];

    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);

        //para el caso de busqueda por guia, recuperamos el id de la guia
        if ($columnaBusqueda == 'guia') {
            $sql = "SELECT id FROM amc_guias WHERE numero = '$campo'";
            $numguia = $os->db->conn->query($sql);
            if ($numguia) {
                $row = $numguia->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    $campo = $row['id'];
                }
            }
            $where = " WHERE $columnaBusqueda LIKE '%$campo%' AND despacho_secretaria = 'true'";
        } else
            $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
    }

    if (isset($_POST['unidadfiltro'])) {
        $unidad = $_POST['unidadfiltro'];
        if ($where == '') {
            $where = "WHERE reasignacion = $unidad ";
        } else {
            $where = " AND reasignacion = $unidad ";
        }
    }

    if (isset($_POST['noenviados'])) {
        if ($_POST['noenviados'] == 'true') {
            if ($where == '') {
                $where = " WHERE despacho_secretaria <> 'true'";
            } else {
                $where = $where . " AND despacho_secretaria <> 'true' ";
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

    $orderby = 'ORDER BY recepcion_documento DESC, codigo_tramite DESC';
    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }

    // para los reportes
    if (isset($_POST['busqueda_tipo_documento']) and ($_POST['busqueda_tipo_documento'] != '')) {
        $tipo = $_POST['busqueda_tipo_documento'];
        if ($where == '') {
            $where = "WHERE id_tipo_documento = $tipo ";
        } else {
            $where = $where . " AND id_tipo_documento = $tipo ";
        }
    }
    if (isset($_POST['busqueda_institucion']) and ($_POST['busqueda_institucion'] != '')) {
        $tipo = $_POST['busqueda_institucion'];
        if ($where == '') {
            $where = "WHERE institucion = '$tipo' ";
        } else {
            $where = $where . " AND institucion = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_caracter_tramite']) and ($_POST['busqueda_caracter_tramite'] != '')) {
        $tipo = $_POST['busqueda_caracter_tramite'];
        if ($where == '') {
            $where = "WHERE id_caracter_tramite = '$tipo' ";
        } else {
            $where = $where . " AND id_caracter_tramite = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_guia']) and ($_POST['busqueda_guia'] != '')) {
        $tipo = $_POST['busqueda_guia'];
        if ($where == '') {
            $where = "WHERE guia = '$tipo' ";
        } else {
            $where = $where . " AND guia = '$tipo' ";
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
            $fechafin = date("Y-m-d H:i:s");;
        }

        if ($where == '') {
            $where = "WHERE recepcion_documento between '$fechainicio' and '$fechafin'  ";
        } else {
            $where = $where . " AND recepcion_documento between '$fechainicio' and '$fechafin' ";
        }
    }


    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_denuncias $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_denuncias $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function insertDenuncias()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));
    $data->despacho_secretaria = 'false';
    $data->codigo_tramite = generaCodigoProcesoDenuncia();
    $data->id_persona = $os->get_member_id();
    $data->id_zonal_origen = $os->get_zonal_id();
    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        if ($valor != '') {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_denuncias($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    $message = '';
    if (isset($data->id_tipo_documento)) {
        if ($data->id_tipo_documento == '1') {
            if ((isset($data->cedula)) and (isset($data->email)) and (strlen($data->id_tipo) > 0)) {
                $success = true;
                $message = 'Datos correctos';
            } else {
                $success = false;
                $message = 'Falta cedula / email / tipo';
            }
        } else {
            $success = true;
            $message = 'Datos ok';
        }
    }

    echo json_encode(array(
        "success" => $success,
        "msg" => $sql->errorCode() == 0 ? $message : $sql->errorCode(),
        "data" => array($data),
        "message" => $message
    ));


}



function updateDenuncias()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    if (isset($data->despacho_secretaria)) {
        if (!$data->despacho_secretaria)
            $data->despacho_secretaria = 'false';
        else
            $data->despacho_secretaria = 'true';
    }

    $message = '';
    if (isset($data->id_tipo_documento)) {
        if ($data->id_tipo_documento == '1')
            if (validarCedulaCorreo($data->id)) {
                $message = 'Ingresar número de cédula, correo electrónico y tipo';
            }
    }

    if ($data->id_ordenanza == NULL)
        unset($data->id_ordenanza);


    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        if ($valor != '')
        $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    if (isset($data->id_tipo_documento)) {
        if ($data->id_tipo_documento == '1') {
            if (($data->cedula != '') and ($data->email != '') and ($data->id_tipo != '')) {
                $success = true;
                $message = 'Datos correctos';
                $grabar = true;

            } else {
                $success = false;
                $message = 'Falta cedula, correo electrónico y tipo como requisito obligatorio';
            }
        } else {
            $success = true;
            $message = 'Datos correctos';
            $grabar = true;
        }
    }

    if ($grabar) {
        $sql = "UPDATE amc_denuncias SET  $cadenaDatos  WHERE amc_denuncias.id = '$data->id' ";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();
        echo json_encode(array(
            "success" => $sql->errorCode() == 0,
            "msg" => $sql->errorCode() == 0 ? $message : $sql->errorCode(),
            "message" => $message
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "msg" => 'Error datos ',
            "message" => $message
        ));
    }
}

function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email, id_tipo FROM amc_denuncias WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0) or (strlen($row['id_tipo']) == 0)) {
        return true;
    } else {
        return false;
    }
}


function selectDenunciasForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *, (SELECT numero FROM amc_guias WHERE amc_guias.id = a.guia ) as guianumero, (SELECT COUNT(*) FROM amc_denuncias  b WHERE a.cedula = b.cedula and b.cedula <> '') as totaldocumentos FROM amc_denuncias as a  WHERE a.id = $id";
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

function updateDenunciasForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $id_persona = $_POST["id_persona"];
    $recepcion_documento = $_POST["recepcion_documento"];
    $id_tipo_documento = $_POST["id_tipo_documento"];
    $num_documento = $_POST["num_documento"];
    $remitente = $_POST["remitente"];
    $observacion_secretaria = $_POST["observacion_secretaria"];
    $asunto = addslashes($_POST["asunto"]);
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
    $despacho_secretaria = $_POST["despacho_secretaria"];
    $descripcion_anexos = addslashes($_POST["descripcion_anexos"]);
    $id_caracter_tramite = $_POST["id_caracter_tramite"];
    $cantidad_fojas = $_POST["cantidad_fojas"];
    $cedula = $_POST["cedula"];
    $email = $_POST["email"];
    $georeferencia = $_POST["georeferencia"];
    $direccion_denuncia = $_POST["direccion_denuncia"];

    $respuesta_devolucion = $_POST["respuesta_devolucion"];

    if ((isset($_POST["respuesta_devolucion"])) AND ($_POST["respuesta_devolucion"] <> '')) {
        $fecha_respuesta_devolucion = "'" . date("Y-m-d H:i:s") . "'";
        $tipo_respuesta_devolucion = $_POST["tipo_respuesta_devolucion"];

    } else {
        $fecha_respuesta_devolucion = "NULL";
        $tipo_respuesta_devolucion = '';
    }


    //para el caso de denuncias se valida que exista cedula y correo
    /* if ($id_tipo_documento == 1) {
         // se valida que se envio cedula, email
         $error = false;
         $msjError = '';
         if (!isset ($cedula) or $cedula == '') {
             $error = true;
             $msjError = 'Falta cédula. ' . $msjError;
         }
         if (!isset ($email) or $email == '') {
             $error = true;
             $msjError = $msjError . 'Falta email';
         }

         if ($error) {
             echo json_encode(array(
                 "success" => false,
                 "msg" => $msjError
             ));
             return;
         }

     }*/

    /*codigo_tramite='$codigo_tramite',*/
    $sql = "UPDATE amc_denuncias SET 
            id_persona = '$id_persona',
            recepcion_documento = '$recepcion_documento',
            id_tipo_documento = '$id_tipo_documento',
            num_documento = '$num_documento',
            remitente = '$remitente',
            asunto = '$asunto',
            observacion_secretaria = '$observacion_secretaria',
            reasignacion = '$reasignacion',
            descripcion_anexos = '$descripcion_anexos',
            id_caracter_tramite = '$id_caracter_tramite',
            cantidad_fojas = '$cantidad_fojas' ,
            cedula = '$cedula' ,
            email = '$email'  ,
            guia = '$guia'  ,
            despacho_secretaria = '$despacho_secretaria',
            direccion_denuncia = '$direccion_denuncia',
            georeferencia = '$georeferencia', 
            tipo_respuesta_devolucion = '$tipo_respuesta_devolucion',
            respuesta_devolucion = '$respuesta_devolucion',
            fecha_respuesta_devolucion = $fecha_respuesta_devolucion   
          WHERE id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteDenuncias()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_denuncias WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectDenuncias();
        break;
    case 'insert' :
        insertDenuncias();
        break;
    case 'update' :
        updateDenuncias();
        break;
    case 'selectForm' :
        selectDenunciasForm();
        break;
    case 'updateForm' :
        updateDenunciasForm();
        break;
    case 'delete' :
        deleteDenuncias();
        break;
}
