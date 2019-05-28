<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';


$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function verificarAnteriorOperativo($id_operativo)
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_expediente WHERE id = $id_operativo ";
    $result = $os->db->conn->query($sql);
    $data = array();
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        return $row;
    } else {
        return $row;
    }


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

function selectInstruccion()
{
    global $os;
    //TODO cambiar columna por defecto en busquedas
    $columnaBusqueda = 'id';

    $where = '';
    $usuarioLog = $os->get_member_id();
    if (isset($_POST['accesosInstruccion'])) {
        $accesosInstruccion = $_POST['accesosInstruccion'];
        if ($accesosInstruccion == 'true')
            $where = " WHERE $usuarioLog = id_persona_encargada ";
    }


    if (isset($_POST['accesosAdministradorIns'])) {
        $accesosInstruccion = $_POST['accesosAdministradorIns'];
        if ($accesosInstruccion == 'true')
            $where = " WHERE ($usuarioLog = id_persona_encargada or id_unidad = 3 ) ";
    }


    if (isset($_POST['accesosAdministradorOpe'])) {
        $accesosInstruccion = $_POST['accesosAdministradorOpe'];
        if ($accesosInstruccion == 'false')
            if ($where == '')
                $where = " WHERE visible  = 1 ";
            else
                $where = $where . " AND visible  = 1";
    }
    // se muestran todos los instruccion
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

        if ($columnaBusqueda == 'id_zonal') {
            $sql = "SELECT id FROM amc_zonas WHERE UPPER(nombre) like UPPER('%$campo%') LIMIT 1";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if (strlen($row['id']) > 0)
                $campo = $row['id'];
        }

        if ($columnaBusqueda == 'id_persona_encargada') {
            $sql = "SELECT id FROM qo_members WHERE UPPER(first_name) like UPPER('%$campo%') OR UPPER(last_name) like UPPER('%$campo%') OR UPPER(email_address) like UPPER('%$campo%') ";
            $result = $os->db->conn->query($sql);
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                if (strlen($row['id']) > 0) {
                    $campo = $row['id'];
                    if ($where == '')
                        $where = " WHERE $columnaBusqueda = '$campo'";
                    else
                        $where = $where . " OR $columnaBusqueda = '$campo'";
                }
            };
        } else {
            if ($where == '')
                $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
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
                $where = " WHERE (id_estado = 0 OR id_estado = 2) ";
            } else {
                $where = $where . " AND (id_estado = 1 OR id_estado = 2) ";
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

    $orderby = 'ORDER BY CONVERT( id,UNSIGNED INTEGER) DESC';
    if (isset($_POST['sort'])) {
        if ($_POST['sort'] == 'id') {
            $orderby = 'ORDER BY CONVERT( id,UNSIGNED INTEGER) DESC';
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
    /* if (isset($_POST['busqueda_finalizado']) and ($_POST['busqueda_finalizado'] != '')) {
         $tipo = $_POST['busqueda_finalizado'];
         if ($where == '') {
             $where = "WHERE finalizado = '$tipo' ";
         } else {
             $where = $where . " AND finalizado = '$tipo' ";
         }
     }*/
    if (isset($_POST['busqueda_informe']) and ($_POST['busqueda_informe'] != '')) {
        $tipo = $_POST['busqueda_informe'];
        if ($where == '') {
            $where = "WHERE (select count(*) from amc_expediente_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = amc_expediente.id ) > 0 ";
        } else {
            $where = $where . " AND (select count(*) from amc_expediente_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = amc_expediente.id ) > 0               ";
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
            $where = "WHERE (select count(*) from amc_expediente_personal a where a.id_member = '$tipo' and a.id_operativo = amc_expediente.id ) > 0 ";
        } else {
            $where = $where . " AND (select count(*) from amc_expediente_personal a where a.id_member = '$tipo' and a.id_operativo = amc_expediente.id ) > 0  ";
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
    $sql = "SELECT * FROM amc_expediente $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_expediente $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function insertInstruccion()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

// todo generar estado por defecto

    //  $data->finalizado = 'false';
    $data->codigo_expediente = generaNuevoCodigoInstruccion();
    $data->id_persona = $os->get_member_id();
    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        if ($clave != 'id') {
            $valBoolean = false;
            if ($valor === true) {
                $valor = 'true';
                $valBoolean = true;
            }
            if ($valor === false) {
                $valor = 'false';
                $valBoolean = true;
            }
            if (isset($valor)) {
                if (!$valBoolean) {
                    $cadenaCampos = $cadenaCampos . $clave . ',';
                    $cadenaDatos = $cadenaDatos . "'" . $valor . "',";

                } else {
                    $cadenaCampos = $cadenaCampos . $clave . ',';
                    $cadenaDatos = $cadenaDatos . $valor . ",";
                }
            }

        }
    }

    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_expediente($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $resultado = $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    echo json_encode(array(
        "success" => $resultado,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));
}

function verificaReincidenciaPredio($predio)
{
    if (!is_null($predio)) {
        global $os;

        $sql = "SELECT COUNT(*) total FROM amc_expediente WHERE predio = '$predio' AND predio <> ' '";
        $result = $os->db->conn->query($sql);
        $row = $result->fetch(PDO::FETCH_ASSOC);
        if ($row['total'] >= 2) {

            $sql = "UPDATE  amc_expediente SET reincidencia_predio = 0;
                        UPDATE  amc_expediente SET reincidencia_predio = 1 WHERE predio in (SELECT predio FROM ( SELECT COUNT(*) as total , predio from amc_expediente  GROUP BY predio ) b WHERE total > 1);";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();

            return 1;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

function verificaReincidenciaAdministrado($ruc, $cedula)
{
    global $os;
    // analizar para los casos que solo exista ruc o exista cedula
    // se genera una
    if ((!is_null($ruc)) or (!is_null($cedula))) {
        $sql = "UPDATE  amc_expediente SET reincidencia_administrado = 0;
                UPDATE  amc_expediente SET reincidencia_administrado = 1 WHERE ruc in (SELECT ruc FROM ( SELECT COUNT(*) as total , ruc from amc_expediente  GROUP BY ruc ) b WHERE total > 1);
                UPDATE  amc_expediente SET reincidencia_administrado = 1 WHERE cedula in (SELECT cedula FROM ( SELECT COUNT(*) as total , cedula from amc_expediente  GROUP BY cedula ) b WHERE total > 1);";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();
     //   return 1;
    }

    if (!is_null($ruc)) {
        $sql = "SELECT COUNT(*) total FROM amc_expediente WHERE ruc = $ruc";
        $result = $os->db->conn->query($sql);
        $row = $result->fetch(PDO::FETCH_ASSOC);
        if ($row['total'] >= 2) {
            return 1;
        }
    }
    if (!is_null($cedula)) {
        $sql = "SELECT COUNT(*) total FROM amc_expediente WHERE cedula = $cedula";
        $result = $os->db->conn->query($sql);
        $data = array();
        $row = $result->fetch(PDO::FETCH_ASSOC);
        if ($row['total'] >= 2) {
            return 1;
        } else {
            return 0;
        }
    }

    // si no encuentra coincidencia
    return 0;

}

function updateInstruccion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    /*
        if (isset($data->visible)) {
            if ($data->visible) {

                if (verificaEnvioEmail($data->id)) {
                    $fechaActual = date('d-m-Y H:i:s');
                    $fechaActual2 = date('d-m-Y');

                    $funcionario = $data->id_persona_encargada;

                    $detalle = '<table border="1">
                                <tr>
                                    <td>Código</td>
                                    <td valign="top">Fecha Inicio</td>
                                    <td valign="top">Fecha Fin</td>
                                    <td valign="top">Lugar Intervencion</td>
                                    <td valign="top">Punto Encuentro</td>
                                    <td valign="top">Observaciones</td>
                                    <td valign="top">Estado</td>
                                </tr>';
                    $detalle .= "<tr>" .
                        '<td valign="top">' . $data->id . '</td>' .
                        '<td valign="top">' . date("Y-m-d <br> H:m", strtotime($data->fecha_inicio_planificacion)) . "</td>" .
                        '<td valign="top">' . date("Y-m-d <br> H:m", strtotime($data->fecha_fin_planificacion))  . "</td>" .
                        '<td valign="top">' . $data->punto_encuentro_planificado . "</td>" .
                        '<td valign="top">' . $data->zona . "</td>" .
                        '<td valign="top">' . $data->observaciones  . "</td>" .
                        '<td valign="top"><strong>' . nombreEstado($data->id_estado) . "</strong></td>" .
                        "</tr></table><br>";

                    // pedimos listado de funcionarios que van al mismo operativo
                    $listado = getListdoFuncionariosOperativo($data->id);


                    if (count($listado) > 0)
                        $detalle .= "<p>Personal asignado</p>";
                    $detalle .= "<table>";
                    $funcionarios = array();
                    foreach ($listado as &$funcionario2) {
                        $detalle .= "<tr><td>" . regresaNombre($funcionario2) . "</td></tr>";
                        $funcionarios[] = regresaEmail($funcionario2);
                    }
                    $detalle .= "</table>";

                    $mensaje = getmensaje(regresaNombre($funcionario), $detalle, $fechaActual);

                    $email = regresaEmail($funcionario);
                    //   $email = "byron.herrera@quito.gob.ec";
                    $asunto = "Nuevo operativo asignado, " . " - " . regresaEmail($funcionario);
                   // enviarEmail($email, $asunto, $mensaje, $funcionarios);
                }
            }
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

            if (isset($data->id_estado)) {
                if ($data->id_estado === "2") {
                    $datetime = new DateTime();
                    $data->fecha_informe = $datetime->format('Y-m-d H:i:s');
                }
            };
        */

    // genero el listado de valores a insertar
    if (isset($data->id_persona_encargada)) {
        $cambioValorPrevio = verficaCambioValorPrevio("id_persona_encargada", $data->id, $data->id_persona_encargada);
        if (!$cambioValorPrevio) {
            $data->fecha_asignacion = date('Y-m-d\Th:i:s', time());
        }
    }

    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        $valBoolean = false;

        if ($valor === true) {
            $valor = 'true';
            $valBoolean = true;
        }
        if ($valor === false) {
            $valor = 'false';
            $valBoolean = true;
        }

        if (isset($valor) and ($valor != '')) {
            if ($valBoolean)
                $cadenaDatos = $cadenaDatos . $clave . " = " . $valor . " ,";
            else

                $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
        }
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);


    $sql = "UPDATE amc_expediente SET  $cadenaDatos  WHERE amc_expediente.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();


    $data->reincidencia_predio = verificaReincidenciaPredio($data->predio);
    $data->reincidencia_administrado = verificaReincidenciaAdministrado($data->ruc, $data->cedula);

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_expediente actualizado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));
}

function verficaCambioValorPrevio($columna, $id, $nuevoValor)
{
    global $os;

    $sql = "SELECT $columna FROM amc_expediente WHERE id = $id";
    $result = $os->db->conn->query($sql);
    $data = $result->fetch(PDO::FETCH_ASSOC);
    $valortemp = $data[$columna];
    if ($data[$columna] == $nuevoValor) {

        return true;
    } else {
        return false;
    }
}

;
function selectInstruccionForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_expediente WHERE id = $id";
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

function updateInstruccionForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $parroquias = $_POST["parroquias"];
    $barrios = $_POST["barrios"];
    $detalle = $_POST["detalle"];

    $sql = "UPDATE `amc_expediente` SET `detalle`='$detalle', `parroquias`='$parroquias', `barrios`='$barrios' WHERE (`id`='$id')";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteInstruccion()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_expediente WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_expediente, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectInstruccion();
        break;
    case 'insert' :
        insertInstruccion();
        break;
    case 'update' :
        updateInstruccion();
        break;
    case 'selectForm' :
        selectInstruccionForm();
        break;
    case 'updateForm' :
        updateInstruccionForm();
        break;
    case 'delete' :
        deleteInstruccion();
        break;
}
function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email FROM amc_expediente WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}


function getmensaje($nombre = '', $instruccion = '', $fecha = '')
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado, ' . $nombre . ' ha sido asignado al  siguiente operativo como responsable:<br>
                 <br>
                 <br>
                 ' . $instruccion . '
                 <br>
                 <br>
                 Favor ingresar en Matis AMC, para verificar el operativo asignado <a href="http://172.20.136.60/procesos-amc">aquí</a> .
                <br>	
                <br>	
                <p>De conformidad con el Memorando No. AMC-SM-JA-2018-003, del 4 de enero de 2018, mediente el cual la 
                Máxima Autoridad dispone</p>
                <p>"Todo el personal de la Agencia Metropolitana de Control, deberá utilizar de manera obligatoria el módulo de instruccion que se encuentra dentro de la INTRANET de la Institución, a fin de generar los informes de los instruccion realizados. En el sistema se deberá llenar los datos solicitados dentro de las 24 horas siguientes de haber realizado el operativo, con el objetivo de que se genere el informe respectivo."</p>

                <br>
                <p>"Se les recuerda a los funcionarios incluir toda la información recopilada del operativo en los campos respectivos, se dará seguimiento al mismo."</p>

                <br>

                <p>Fecha : ' . $fecha . '</p>
                <p>Atentamente </p>
                
                <p>SUPERVISION METROPOLITANA</p>
                <p>GAD MDMQ AGENCIA METROPOLITANA DE CONTROL</p>
                <p></p>
                <p>INFORMACIÓN IMPORTANTE</p>
                <p>************************************************</p>
                <p>- No responder este correo ya que es un Mensaje Automático.</p>
                
                <p>- Para sugerencias, escribe a tu coordinador.</p>

                </div>
                <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                </div>
                ';
    return $texto;
}

function enviarEmail($email, $nombre, $mensaje, $funcionarios)
{
    $headers = "From: Agencia Metropolitana de Control <byron.herrera@quito.gob.ec>\r\n";
    //$headers .= "Reply-To: ". strip_tags("herrera.byron@gmail.com") . "\r\n";

    if (count($funcionarios) > 0) {
        $conCopia = implode(",", $funcionarios);
        $headers .= "CC: $conCopia \r\n";
    }

    $headers .= "CCO: byron.herrera@quito.gob.ec, paul.cevallos@quito.gob.ec, paul.hidalgo@quito.gob.ec, galo.salazar@quito.gob.ec, eduardo.chicaiza@quito.gob.ec, paulina.trujillo@quito.gob.ec \r\n";
    $headers .= "Bcc: byron.herrera@quito.gob.ec, paul.cevallos@quito.gob.ec, paul.hidalgo@quito.gob.ec, galo.salazar@quito.gob.ec, eduardo.chicaiza@quito.gob.ec, paulina.trujillo@quito.gob.ec \r\n";

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // VALIDAMOS QUE SOLO SE ENVIE EL CORREO EN PRODUCCION
    //require('../../../../server/os-config.php');
    $config = new config();
    if ($config->AMBIENTE == "PRODUCCION") {
        mail($email, $nombre, $mensaje, $headers);
    }

}

function verificaEnvioEmail($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id_persona_encargada, visible FROM amc_expediente WHERE id= $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row['visible'] == "") {
        if ($row['id_persona_encargada'] == " ") {
            return false;
        } else {
            return true;
        }

    } else
        return false;
}

function getListdoFuncionariosOperativo($id)
{
    global $os;
    $result = $os->db->conn->query("SELECT id_member FROM amc_expediente_personal WHERE id_operativo = $id;");
    $funcionarios = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $funcionarios[] = $row ['id_member'];
    }
    return $funcionarios;
}

function nombreEstado($data)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT nombre FROM amc_expediente_estados WHERE id = " . $data;
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}
