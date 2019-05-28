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
    $sql = "SELECT * FROM amc_operativos WHERE id = $id_operativo ";
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

function selectOperativos()
{
    global $os;
    //TODO cambiar columna por defecto en busquedas
    $columnaBusqueda = 'id';

    $where = '';
    $usuarioLog = $os->get_member_id();
    if (!isset($_POST['formularioBusqueda'])) {
        if (isset($_POST['accesosOperativos'])) {
            $accesosOperativos = $_POST['accesosOperativos'];
            if ($accesosOperativos == 'true')
                $where = " WHERE $usuarioLog = id_persona_encargada ";
        }
    }


    if (isset($_POST['accesosAdministradorIns'])) {
        $accesosOperativos = $_POST['accesosAdministradorIns'];
        if ($accesosOperativos == 'true')
            $where = " WHERE ($usuarioLog = id_persona_encargada or id_unidad = 3 ) ";
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
            $where = "WHERE (select count(*) from amc_operativos_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = amc_operativos.id ) > 0 ";
        } else {
            $where = $where . " AND (select count(*) from amc_operativos_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = amc_operativos.id ) > 0               ";
        }
    }


    if (isset($_POST['busqueda_observaciones']) and ($_POST['busqueda_observaciones'] != '')) {
        $tipo = $_POST['busqueda_observaciones'];
        if ($where == '') {
            $where = "WHERE ( upper( punto_encuentro_planificado ) like '%$tipo%'or
                        upper( zona ) like '%$tipo%'or
                        upper( observaciones ) like '%$tipo%'or
                        upper( parroquias ) like '%$tipo%'or
                        upper( barrios) like '%$tipo%') ";
        } else {
            $where = $where . "AND ( upper( punto_encuentro_planificado ) like '%$tipo%'or
                            upper( observaciones ) like '%$tipo%'or
                        upper( zona ) like '%$tipo%'or
                        upper( parroquias ) like '%$tipo%'or
                        upper( barrios) like '%$tipo%') ";
        }
    }

    if (isset($_POST['busqueda_personal_asignado']) and ($_POST['busqueda_personal_asignado'] != '')) {
        $tipo = $_POST['busqueda_personal_asignado'];
        if ($where == '') {
            $where = "WHERE (select count(*) from amc_operativos_personal a where a.id_member = '$tipo' and a.id_operativo = amc_operativos.id ) > 0 ";
        } else {
            $where = $where . " AND (select count(*) from amc_operativos_personal a where a.id_member = '$tipo' and a.id_operativo = amc_operativos.id ) > 0  ";
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
    $sql = "SELECT * FROM amc_operativos $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_operativos $where";
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


    $data->finalizado = 'false';
    $data->codigo_operativo = generaCodigoProcesoOperativo();
    $data->id_persona = $os->get_member_id();
    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';


    $datafecha_planificacion =  date('Y-m-d\TH:i:s');

    // validar fechas de inicio .. si estan en null se le pone la fecha
    if (($data->fecha_planificacion == '') or !isset ($data->fecha_planificacion)) {
        // sin no esta deinida la fecha se pone fecha con la del dia
        $data->fecha_planificacion =   date('Y-m-d\TH:i:s');
    }

    if (($data->fecha_inicio_planificacion == '') or !isset ($data->fecha_inicio_planificacion)) {
        // sin no esta deinida la fecha se pone fecha con la del dia
        $data->fecha_inicio_planificacion =  date('Y-m-d\TH:i:s');
    }
    if (($data->fecha_fin_planificacion == '') or !isset ($data->fecha_fin_planificacion)) {
        // sin no esta deinida la fecha se pone fecha con la del dia
        $data->fecha_fin_planificacion =  date('Y-m-d\TH:i:s');
    }

    foreach ($data as $clave => $valor) {
        if ($clave != 'id') {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_operativos($cadenaCampos) values($cadenaDatos);";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $resultado = $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    echo json_encode(array(
        "success" => $resultado,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));

    $fichero = 'crudOperativos.log';
    $actual = file_get_contents($fichero);
    $actual .= $log . "\n";
    file_put_contents($fichero, $actual);
}


function updateOperativos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

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
                    '<td valign="top">' . date("Y-m-d <br> H:i", strtotime($data->fecha_inicio_planificacion)) . "</td>" .
                    '<td valign="top">' . date("Y-m-d <br> H:i", strtotime($data->fecha_fin_planificacion)) . "</td>" .
                    '<td valign="top">' . $data->zona . "</td>" .
                    '<td valign="top">' . $data->punto_encuentro_planificado . "</td>" .
                    '<td valign="top">' . $data->observaciones . "</td>" .
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
                $resultado = enviarEmail($email, $asunto, $mensaje, $funcionarios);
                if ($resultado) {
                    $sqlUpdate = "UPDATE `amc_operativos` SET `mail_enviado` = 1 WHERE `id` = " . $data->id;
                    $sql = $os->db->conn->prepare($sqlUpdate);
                    $grabaresultado = $sql->execute();
                    $data->mail_enviado = '1';
                }
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


    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        if (isset($valor))
            $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
        else
            $cadenaDatos = $cadenaDatos . $clave . " = NULL, ";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    verificarAnteriorOperativo($data->id);


    $sql = "UPDATE amc_operativos SET  $cadenaDatos  WHERE amc_operativos . id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "mail" => "aa",
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_operativos actualizado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));
}

function selectOperativosForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_operativos WHERE id = $id";
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

    $sql = "UPDATE `amc_operativos` SET `detalle`='$detalle', `parroquias`='$parroquias', `barrios`='$barrios' WHERE (`id`='$id')";
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
    $sql = "DELETE FROM amc_operativos WHERE id = $id";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_operativos, eliminado exitosamente" : $sql->errorCode()
    ));

    $log =  $os->get_member_id() . "-" . $log ;

    $fichero = 'crudOperativos.log';    
    $actual = file_get_contents($fichero);
    $actual .= $log . "\n";
    file_put_contents($fichero, $actual);
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
    $sql = "SELECT cedula, email FROM amc_operativos WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}


function getmensaje($nombre = '', $operativos = '', $fecha = '')
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado, ' . $nombre . ' ha sido asignado al  siguiente operativo como responsable:<br>
                 <br>
                 <br>
                 ' . $operativos . '
                 <br>
                 <br>
                 "Se le recuerda al responsable del operativo que es obligatorio llenar todo el detalle en 
                 ACCIONES OPERATIVO, ACTOS INICIO y RETIROS, dicho reporte debe estar en concordancia con lo reportado en el chat. 
                 En caso que no este correcto, se lo cambiará a estado INFORME y no se lo aceptará como finalizado.
                <br>

                <br>
                 Favor ingresar en Matis AMC, para verificar el operativo asignado <a href="http://172.20.136.60/procesos-amc">aquí</a> .
                <br>    
                <br>    
                <p>De conformidad con el Memorando No. AMC-SM-JA-2018-003, del 4 de enero de 2018, mediente el cual la 
                Máxima Autoridad dispone</p>
                <p>"Todo el personal de la Agencia Metropolitana de Control, deberá utilizar de manera obligatoria el módulo de operativos que se encuentra dentro de la INTRANET de la Institución, a fin de generar los informes de los operativos realizados. En el sistema se deberá llenar los datos solicitados dentro de las 24 horas siguientes de haber realizado el operativo, con el objetivo de que se genere el informe respectivo."</p>

                <br>

                <br>

                <p>Fecha : ' . $fecha . '</p>
                <p>Atentamente </p>
                
                <p>SUPERVISION METROPOLITANA</p>
                <p>GAD MDMQ AGENCIA METROPOLITANA DE CONTROL</p>
                <p></p>
                <p>INFORMACIÓN IMPORTANTE</p>
                <p>************************************************</p>
                <p>- No responder este correo es un Mensaje Automático.</p>
                
                <p>- Para sugerencias, escribe a tu coordinador.</p>

                </div>
                <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                </div>
                ';
    return $texto;
}

function enviarEmail($email, $nombre, $mensaje, $funcionarios)
{
    $config = new config();

    require '../../../common/Classes/PHPMailer/PHPMailerAutoload.php';
    //Create a new PHPMailer instance
    $mail = new PHPMailer;
    $mail->CharSet = "UTF-8";
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';
    $mail->Host = 'relay.quito.gob.ec';
    $mail->Port = 25;
    $mail->Username = "agencia.m.control@quito.gob.ec";
    $mail->Password = "12345678";
    $mail->setFrom('agencia.m.control@quito.gob.ec', 'Agencia Metropolitana de Control');

    $mail->AddBCC("byron.herrera@quito.gob.ec");
    $mail->AddBCC("pamela.parreno@quito.gob.ec");
    $mail->AddBCC("galo.salazar@quito.gob.ec");
    $mail->AddBCC("eduardo.chicaiza@quito.gob.ec");
    $mail->AddBCC("andrea.caicedo@quito.gob.ec");

    $mail->Subject = $nombre;
    $mail->msgHTML($mensaje);
    $mail->AltBody = 'Mensaje enviado';

    // se envia de acuerdo a si es produccion o pruebas
    if ($config->AMBIENTE == "PRODUCCION") {
        $mail->addAddress($email);
        foreach ($funcionarios as $emailfuncionario) {
            $mail->AddCC($emailfuncionario);
        }
    } else {
        $mail->addAddress("byron.herrera@quito.gob.ec");
    }

    $resultado = $mail->send();

    $fichero = 'OperativosEmailEnviados.log';
    $actual = file_get_contents($fichero);
    if ($resultado) {
        $actual .= "Enviado -" . date(" Y-m-d ") . "\n----\n";
    } else
        $actual .= "Error-" . date(" Y-m-d ") . "\n----\n";

    $actual .= $email . "\n----\n";
    $actual .= $nombre . "\n----\n";
    $actual .= $mensaje . "\n----\n";
    file_put_contents($fichero, $actual);

    return $resultado;

}


function verificaEnvioEmail($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id_persona_encargada, visible FROM amc_operativos WHERE id= $id";
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
    $result = $os->db->conn->query("SELECT id_member FROM amc_operativos_personal WHERE id_operativo = $id;");
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

    $sql = "SELECT nombre FROM amc_operativos_estados WHERE id = " . $data;
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}

