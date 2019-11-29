<?php

require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


$nombreArchivo = explode(".", $nombreArchivo);
$i = $nombreArchivo[0];

if ($i == 'BUDGET') {
    $sql = "DELETE FROM pma_migrate_contribuciones;";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    // REINICIAR LA TABLA
    $sql = "ALTER TABLE `pma_migrate_contribuciones` AUTO_INCREMENT = 1;";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    if (prepararArchivoTitulos('Hoja1', $nombreArchivo[0])) {
        migrarPestana('Hoja1', 'pma_migrate_contribuciones', $nombreArchivo[0]);
    } else {
        $error = true;
        $mensajeError = $mensajeError . "Error pestania BUDGET";
    }

} elseif ($i == 'PRECOMITMENT') {
    $sql = "DELETE FROM pma_migrate_detail WHERE tipo = 'PRECOMITMENT';";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    migrarBudget($tabla);
} elseif ($i == 'COMIT') {
    $sql = "DELETE FROM pma_migrate_detail WHERE tipo = 'COMIT';";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
     migrarBudget($tabla);
} elseif ($i == 'ACTUALS') {
    $sql = "DELETE FROM pma_migrate_detail WHERE tipo = 'ACTUALS';";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();


    migrarBudget($tabla);
}


// imprimimos los resultados
if (!$error) {
    echo json_encode(array(
            "total" => 1,
            "Sheet" => 1,
            "success" => true,
            "hoja " => "real")
    );

} else {
    echo json_encode(array(
            "total" => 0,
            "mensage" => ,
            "success" => false,
            "data" => "")
    );
}


function migrarBudget($tabla)
{
    // CASO BUDGET
    global $os;
    global $spreadsheet;
    $sql = "SELECT * FROM pma_migrate WHERE active  = 1 ";
    // obtengo el listado de las columnas a migrar
    $result = $os->db->conn->query($sql);
    // $colunas almacena estructura de datos con la descripcion de las columnas a usarse
    $columnas = $result->fetchAll(PDO::FETCH_ASSOC);


        $sql = "INSERT INTO $tabla ;";

        $sql = $os->db->conn->prepare($sql);
        $code = $sql->errorCode();
        $sql->execute();

}


