<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function insertDetalleMicro()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));
    $data->fecha_registro = date('Y-m-d H:i:s');
    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';

    // calcual autamaticamente el calculo de total adjusted en base a los otros registros
    $data->total_adjusted = $data->total + $data->adjust;

    foreach ($data as $clave => $valor) {

        if (($clave == 'funcionario_reasignacion') OR ($clave == 'guia') OR ($clave == 'acta_verificacion') OR ($clave == 'id_zona') OR ($clave == 'id_actividad')) {
            if ($valor == '') {
                $valor = 'NULL';
            }
        }

        if ($valor === 'NULL') {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . " " . $valor . " ,";
        } else {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }

    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql1 = "INSERT INTO pma_costos_micro_detalle($cadenaCampos)
	values($cadenaDatos);";

    $sql = $os->db->conn->prepare($sql1);

    $verificaInsert = $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    $idMicro = actualizarMicroDetailTotal($data->id_pma_costos_micro);


    if ($verificaInsert) {
        echo json_encode(array(
            "success" => true,
            "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
            "data" => array($data)
        ));
        // para el caso que ya se haya procesado o sea reinspeccion
        //actualizar_estado_tramite_usado($data->id_pma_contribuciones);
    } else {
        echo json_encode(array(
            "success" => false,
            "msg" => $sql->errorCode() . $sql1,
            "data" => array($data)
        ));
    }
}

function updateDetalleMicro()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    // calcual autamaticamente el calculo de total adjusted en base a los otros registros
    $data->total_adjusted = $data->total + $data->adjust;

    $message = '';
    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        if (($clave == 'cost_code') OR ($clave == 'total') OR ($clave == 'doc') OR ($clave == 'dsc') OR ($clave == 'adjust') OR ($clave == 'comment') OR ($clave == 'fecha_registro') OR ($clave == 'total_adjusted')) {
            if ($valor == '') {
                $valor = 'NULL';
            }
        }
        if ($valor === 'NULL') {
            $cadenaDatos = $cadenaDatos . $clave . " = " . $valor . " ,";
        } else {
            $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
        }

    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);


    // actualizar el total en el padre

    $MicroDetalle = actualizarMicroDetailTotal($data->id_pma_costos_micro, $data->id, $data->total_adjusted );
    $Micro = actualizarMicroTotal($MicroDetalle['id_pma_costos_macro']);
    $Activities = actualizaActivitiesTotal ($Micro['id_pma_contribuciones_detalle']);
    //actualizarContribucionesTotal ($Activities['id_pma_contribuciones']);
    //$total_after_adjust
    if ($MicroDetalle["total_after_adjust"] > $MicroDetalle["total"]) {
        //si le valor es mas alto
        $sql = "UPDATE pma_costos_micro_detalle SET  $cadenaDatos  WHERE pma_costos_micro_detalle.id = '$data->id' ";
        $sql = $os->db->conn->prepare($sql);

        $sql->execute();
        echo json_encode(array(
            "success" => $sql->errorCode() == 0,
            "msg" => $sql->errorCode() == 0 ? "Ubicación en pma_costos_micro_detalle actualizado exitosamente" : $sql->errorCode(),
            "message" => $message,
            "data" => array($data),
            "totalCostosMicro" => $MicroDetalle['total']
        ));
    } else {
        //si le valor es mas alto
        $sql = "UPDATE pma_costos_micro_detalle SET  $cadenaDatos  WHERE pma_costos_micro_detalle.id = '$data->id' ";
        $sql = $os->db->conn->prepare($sql);

        $sql->execute();
        $limite = $MicroDetalle["total_after_adjust"];

        //todo esto esta mal

        echo json_encode(array(
            "success" => true,
            "msg" => "Valor total  excede el limite de $limite",
            "message" => "Valor total excede el limite de $limite",
            "data" => array($data),
            "totalCostosMicro" => $MicroDetalle['total']
        ));

    }
}


function verificaAnteriorAsignacion($id_reasignacion, $idInspeccion)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT funcionario_entrega FROM  `pma_costos_micro_detalle` WHERE  id = $idInspeccion";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row['funcionario_entrega'] === $id_reasignacion)
        return false;
    else
        return true;
}



function selectDetalleMicro()
{
    global $os;
    $id = (int)$_POST ['costCodeNuevo2'];
    if ($id != 0) {
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT * FROM pma_costos_micro_detalle WHERE pma_costos_micro_detalle.id_pma_costos_micro = $id";
        $result = $os->db->conn->query($sql);
        $data = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

            $data[] = $row;
        }
        echo json_encode(array(
                "success" => true,
                "data" => $data)
        );
    }

}

function updateDetalleMicroForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];

    $guia = $_POST["guia"];
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];

    /*codigo_tramite='$codigo_tramite',*/
    $sql = "UPDATE pma_costos_micro_detalle SET
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

function deleteDetalleMicro()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM pma_costos_micro_detalle WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en pma_costos_micro_detalle, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectDetalleMicro();
        break;
    case 'selectTodasMicro' :
        selectDetalleTodasMicro();
        break;
    case 'insert' :
        insertDetalleMicro();
        break;
    case 'update' :
        updateDetalleMicro();
        break;
    case 'selectForm' :
        selectDetalleMicroForm();
        break;
    case 'updateForm' :
        updateDetalleMicroForm();
        break;
    case 'delete' :
        deleteDetalleMicro();
        break;
}
