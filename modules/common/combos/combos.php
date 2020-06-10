<?php
require_once '../../../server/os.php';
$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function usuario()
{
    global $os;
    $usuario = $os->get_member_id();

    echo json_encode(array(
            "success" => true,
            "data" => $usuario)
    );
}

function comboProcedimiento()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_procedimientos ORDER BY id";
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

function comboParroquias()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    if (isset($_POST['id']))
        $where = " AND id_zona = " . $_POST['id'];
    else
        $where = '';
    $sql = "SELECT id, nombre FROM amc_parroquias WHERE activo = 1  $where ORDER BY id";
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

function comboSectores()
{
    global $os;
    if (isset($_POST['id']))
        $where = " AND id_parroquia = " . $_POST['id'];
    else
        $where = '';

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_sectores WHERE activo = 1  $where ORDER BY id";
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

function comboCostParent()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    //$sql = "SELECT id, CONCAT( IF (ISNULL(cost), (SELECT b.description FROM pma_cost_category b WHERE b.id = a.parent ) , cost ), ' - ',description) as cost FROM pma_cost_category a WHERE active = 1 AND nivel in (1,2)  ORDER BY id";
    $sql = "SELECT id, CONCAT(cost,' - ',description) cost FROM pma_cost_category WHERE active = 1 AND nivel in (1,2) AND ISNULL(parent)   ORDER BY id";
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

function comboCost()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, CONCAT(cost,' -',description) cost FROM pma_cost_category WHERE active = 1 ORDER BY id";
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

function comboSO()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, CONCAT(category_name,' - ',category_code) AS category_name FROM pma_so_categories ORDER BY id";
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


function comboActivities()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if (isset($_POST['datoSO']))
        $where = " WHERE id_cost_category = " . $_POST['datoSO'];
    else
        $where = '';

    $sql = "SELECT id, CONCAT(subcategory_name,' - ',subcategory_code) AS subcategory_name FROM pma_activities $where ORDER BY id";
    // echo ($sql);
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


function comboCostcode2()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if (isset($_POST['costCodeNuevo2']))
        $where = " AND parent = " . $_POST['costCodeNuevo2'];
    else
        $where = '';

    // $costCodeNuevo2 =
    //$sql = "SELECT id, description FROM pma_cost_category WHERE active = 1 AND nivel = 2 $where ORDER BY id";
    $sql = "SELECT id, CONCAT(description,'-',id) as description FROM pma_cost_category WHERE active = 1 AND nivel = 2 $where ORDER BY id";
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

function comboCostcode3()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if (isset($_POST['costCodeNuevo3']))
        $where = " AND parent = " . $_POST['costCodeNuevo3'];
    else
        $where = '';

    // $costCodeNuevo2 =
    //$sql = "SELECT id, description FROM pma_cost_category WHERE active = 1 AND nivel = 3 $where ORDER BY id";
    $sql = "SELECT id, CONCAT(description, '-' , parent  ) AS description 
            FROM pma_cost_category WHERE active = 1 AND nivel = 3 $where ORDER BY id";
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

function comboCostcode3Full()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    // $costCodeNuevo2 =
    //$sql = "SELECT id, description FROM pma_cost_category WHERE active = 1 AND nivel = 3 $where ORDER BY id";
    $sql = "SELECT id, CONCAT(description, '-' , parent, '-' , id  ) AS description FROM pma_cost_category WHERE active = 1 AND nivel = 3   ORDER BY id";
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

function recuperaCostCategory($idcost)
{
    global $os;
    // $costCodeNuevo2 =
    $sql = "SELECT cost FROM pma_cost_category WHERE id = $idcost";
    $result = $os->db->conn->query($sql);
    $data = $result->fetch(PDO::FETCH_ASSOC);
    return $data['cost'];
}

function comboGLCode()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $where = '';
    if (isset($_POST['costCodeNuevo3'])) {
//         $where = " WHERE cost_category = 'FA'" ;
        $cost = recuperaCostCategory($_POST['costCodeNuevo3']);
        $where = " WHERE cost_category = '$cost'";
    }

    $sql = "SELECT id, gl_account,  gl_description, commitment_description, CONCAT(gl_account,\" - \", gl_description) AS gl_description2 FROM pma_gl_codes $where ORDER BY id";

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

function comboCostcode4()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT id, description FROM pma_cost_category WHERE active = 1 AND nivel = 4 ORDER BY id";
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

function comboCostcode5()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if (isset($_POST['costCodeNuevo5']))
        $where = " AND parent = " . $_POST['costCodeNuevo5'];
    else
        $where = '';

    // $costCodeNuevo2 =
    $sql = "SELECT id, description FROM pma_cost_category WHERE active = 1 AND nivel = 5 $where ORDER BY id";
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


function comboGrantNumber()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id,grant_number   FROM pma_contribuciones ORDER BY id";
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

function comboHRDescription()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id,hr_position FROM pma_payroll ORDER BY id";
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


function comboSecretariaTramites()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    //  $sql = "SELECT id, codigo_tramite as nombre FROM amc_denuncias  ORDER BY id DESC ";
    $sql = "SELECT id, CONCAT(codigo_tramite, ' - ', YEAR(recepcion_documento)) as nombre FROM amc_denuncias ORDER BY id DESC";
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

function comboTiposExpedientesInstruccion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_expedientes_tipos_procesos_administrativos WHERE activo = 1 AND etapa = 'INSTRUCCION' ORDER BY id";
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

function comboTiposExpedientes()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre, etapa FROM amc_expedientes_tipos_procesos_administrativos WHERE activo = 1 ORDER BY id";
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

function comboOrdenanzas()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_ordenanzas WHERE activo = 1 ORDER BY orden";
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

function comboTiposOperativos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_operativos_tipos WHERE activo = 1 ORDER BY orden";
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

function comboTiposMedidasOperativos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_operativos_informes_tipos_medidas WHERE activo = 1 ORDER BY orden";
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

function comboTiposAccioOperativos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_operativos_acciones_tipos WHERE activo = 1 ORDER BY orden";
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

function comboTiposEntidades()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_entidades WHERE activo = 1 ORDER BY orden";
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

function comboReasignancion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_unidades WHERE activo = 1 ORDER BY id";
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

function comboPersonalSecretaria()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT
            a . id,
            CONCAT(a . first_name, ' ', a . last_name) AS nombre
            FROM
            qo_members a,qo_groups_has_members b
            WHERE
                a . id = b . qo_members_id AND a . active = 1
            ORDER BY
                a . last_name ASC,a . first_name ASC";
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

function comboPersonalOperativos()
{
    global $os;
    $todos = " AND (b . qo_groups_id = 8 OR b . qo_groups_id = 9 OR b . qo_groups_id = 1) ";
    if (isset($_POST['todos'])) {
        if ($_POST['todos'] == 'true') {
            $todos = "";
        }
    }
// EN CASO QUE SOLO SEA UN USUARIO SOLO MUESTRA EL USUARIO LOGEADO
    if (isset($_POST['accesosOperativos'])) {

        if ($_POST['accesosOperativos'] == 'true') {
            $id_user = $os->get_member_id();
            $todos = $todos . " AND a . id = $id_user ";
        }
    }

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT DISTINCT a . id,
            CONCAT(a . last_name, ' ', a . first_name) AS nombre
            FROM
            qo_members a,qo_groups_has_members b
            WHERE
                a . id = b . qo_members_id AND a . active = 1 $todos
            ORDER BY
                a . last_name ASC,a . first_name ASC";

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

function comboPersonalInstruccion()
{
    global $os;
    $todos = '';
    /*    $todos = " AND (b . qo_groups_id = 8 OR b . qo_groups_id = 9 OR b . qo_groups_id = 1) ";
        if (isset($_POST['todos'])) {
            if ($_POST['todos'] == 'true') {
                $todos = "";
            }
        }
    */

// EN CASO QUE SOLO SEA UN USUARIO SOLO MUESTRA EL USUARIO LOGEADO
    if (isset($_POST['accesosOperativos'])) {

        if ($_POST['accesosOperativos'] == 'true') {
            $id_user = $os->get_member_id();
            $todos = $todos . " AND a . id = $id_user ";
        }
    }

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT DISTINCT a . id,
            CONCAT(a . last_name, ' ', a . first_name) AS nombre
            FROM
            qo_members a,qo_groups_has_members b
            WHERE
                a . id = b . qo_members_id AND a . active = 1 $todos
            ORDER BY
                a . last_name ASC,a . first_name ASC";

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

function comboUnidades()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT id,  nombre, nombre_completo FROM amc_unidades WHERE activo = 1 ORDER BY id";
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

function comboUnidadesSinFiltro()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM amc_unidades ORDER BY nombre";
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

function comboUnidadesPersonal()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM amc_unidades_personal ORDER BY nombre";
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

function comboOperativosEstados()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM amc_operativos_estados WHERE activo = 1 ORDER BY orden";
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

function comboUnidadesTotal()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    /*$sqlZonal = '';
    if (isset($_POST['zonales'])) {
        if ($_POST['zonales'] == 'true') {
            $sqlZonal = " AND id = 2";
        }
    }*/

    $zonal_funcionario = $os->get_zonal_id();
    //$sql = "SELECT amc_unidades . id, CONCAT(amc_unidades . nombre, 'SSSS') AS nombre FROM amc_unidades WHERE activo = 1 ORDER BY id";
    $sql = "SELECT
                b . id, IF ((SELECT COUNT(*) FROM amc_denuncias as  a WHERE a . reasignacion = b . id AND despacho_secretaria <> 'true' ) = 0,b . nombre,
                (CONCAT(b . nombre, ' ( ', (SELECT COUNT(*) FROM amc_denuncias as  a WHERE a . reasignacion = b . id AND despacho_secretaria <> 'true' ), ' ) '))) AS nombre
                FROM amc_unidades b
                WHERE b . activo = 1 AND id_zonal = " . $zonal_funcionario . "
                 ORDER BY b . id ";

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

function comboDepInspeccion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_departamentos WHERE activo = 1 AND unidad = 3   ORDER BY id";
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

function comboGuia()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, CONCAT(numero, ' / ', unidad) as nombre FROM amc_guias ORDER BY id DESC LIMIT 60";
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

function comboPersonalInspeccion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, CONCAT(a . last_name, ' ', a . first_name) AS nombre  FROM amc_personal WHERE active = 1 AND unidad = 3 ORDER BY id";
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

function comboSexo()
{
    $data[] = array("id" => "I", "nombre" => "Indistino");
    $data[] = array("id" => "H", "nombre" => "Hombre");
    $data[] = array("id" => "M", "nombre" => "Mujer");

    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );

}

function comboActivo()
{
    $data[] = array("id" => "1", "nombre" => "Si");
    $data[] = array("id" => "0", "nombre" => "No");

    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );

}

function comboInstituciones()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT DISTINCT  institucion AS nombre FROM amc_denuncias WHERE length(institucion) > 0 ORDER BY institucion";
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

function comboDonor()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT DISTINCT  donor AS nombre FROM pma_contribuciones WHERE length(donor) > 0 ORDER BY donor";
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
function comboCrn()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT DISTINCT crn AS nombre FROM pma_contribuciones WHERE length(crn) > 0 ORDER BY crn";
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

function combogrant_number()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT DISTINCT grant_number AS nombre FROM pma_contribuciones WHERE length(grant_number) > 0 ORDER BY grant_number";
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

function comboYearContribution()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT DISTINCT  year_contribution AS nombre FROM pma_contribuciones WHERE length(year_contribution) > 0 ORDER BY year_contribution";
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


function comboRemitente()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    // limito la busqueda a los ultimos 200 dias
    $sql = "SELECT DISTINCT  remitente AS nombre FROM amc_denuncias WHERE length(remitente) > 0 AND recepcion_documento > DATE_ADD(NOW(), INTERVAL - 200 DAY)  ORDER BY remitente";
//    $sql = "SELECT DISTINCT  remitente AS nombre FROM amc_denuncias WHERE length(remitente) > 0   ORDER BY remitente";
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

function comboCargo()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM cargo";
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

function comboTipoActividad()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_inspeccion_actividad";
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

function comboTipoControl()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM  amc_tipo_control WHERE activo = 1 ORDER BY orden";
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

function comboPersonalDistributivo()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(last_name, ' ', first_name) as nombre,id FROM qo_members WHERE active = 1 ORDER BY last_name";
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

function comboCostMicroStaffOnly()
{

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT cost_code2 AS id, id_pma_costos_macro as parent, cost_code2  FROM pma_costos_micro where cost_code2 in (SELECT id FROM `pma_cost_category` WHERE description like 'Staff cost' ) ORDER BY glcode";
    //$sql = "SELECT cost_code2 as  id, id_pma_costos_macro as parent, cost_code2  FROM pma_costos_micro where cost_code2 in (SELECT id FROM `pma_cost_category` WHERE description like 'Staff cost' ) ORDER BY glcode";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        // esto es para pedir el padre
        $id_pma_costos_macro = get_pma_costos_macro ($row['parent'] );
        $nombreCostoMacro = $id_pma_costos_macro['cost_code'];

        // esto es para pedir el abuelo
        $id_pma_contribuciones_detalle = get_pma_contribuciones_detalle ($id_pma_costos_macro['id_pma_contribuciones_detalle'] );
        $nombreContribucionesDetalle = $id_pma_contribuciones_detalle['so'];

        // esto es para pedir el contribucion
        $id_pma_contribuciones = get_pma_contribuciones ($id_pma_contribuciones_detalle['id_pma_contribuciones'] );
        $nombreContribuciones = $id_pma_contribuciones['grant_number'];


        $row['data'] = $row['id']. "-".  $nombreContribuciones . "-". getCostContribucionesDetalleName ($nombreContribucionesDetalle). "-".  getCostCodeName ($nombreCostoMacro). " - " . getCostCodeName ($row['cost_code2']) ;
        $data[] = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}



switch ($_GET['tipo']) {
    case 'usuario' :
        usuario();
        break;
    case 'procedimiento' :
        comboProcedimiento();
        break;
    case 'tiposexpedientesinstruccion' :
        comboTiposExpedientesInstruccion();
        break;
    case 'tiposexpedientes' :
        comboTiposExpedientes();
        break;
    case 'secretariatramites' :
        comboSecretariaTramites();
        break;
    case 'parroquias' :
        comboParroquias();
        break;
    case 'sectores' :
        comboSectores();
        break;
    case 'ordenanzas' :
        comboOrdenanzas();
        break;
    case 'tiposoperativos' :
        comboTiposOperativos();
        break;
    case 'tiposMedidasOperativos' :
        comboTiposMedidasOperativos();
        break;
    case 'tiposAccioOperativos' :
        comboTiposAccioOperativos();
        break;
    case 'tiposentidades' :
        comboTiposEntidades();
        break;
    case 'reasignancion' :
        comboReasignancion();
        break;
    case 'unidades' :
        comboUnidades();
        break;
    case 'unidadessinfiltro' :
        comboUnidadesSinFiltro();
        break;
    case 'unidadespersonal' :
        comboUnidadesPersonal();
        break;
    case 'operativosestados' :
        comboOperativosEstados();
        break;
    case 'unidadestotal' :
        comboUnidadesTotal();
        break;
    case 'depInspeccion' :
        comboDepInspeccion();
        break;
    case 'guia' :
        comboGuia();
        break;
    case 'personalsecretaria' :
        comboPersonalSecretaria();
        break;
    case 'personaloperativos' :
        comboPersonalOperativos();
        break;
    case 'personalinstruccion' :
        comboPersonalInstruccion();
        break;
    //case 'personalinspeccion' :
    //comboPersonalInspeccion();
    //break;
    case 'cargo' :
        comboCargo();
        break;
    case 'sexo' :
        comboSexo();
        break;

    case 'activo' :
        comboActivo();
        break;

    case 'instituciones' :
        comboInstituciones();
        break;

    case 'donor' :
        comboDonor();
        break;
    case 'crn' :
        comboCrn();
        break;
    case 'grant_number' :
        combogrant_number();
        break;

    case 'yearcontribution' :
        comboYearContribution();
        break;

    case 'remitente' :
        comboRemitente();
        break;

    case 'tipo_actividad' :
        comboTipoActividad();
        break;
    case 'tipo_control' :
        comboTipoControl();
        break;

    case 'personal_distributivo' :
        comboPersonalDistributivo();
        break;

    case 'costparent' :
        comboCostParent();
        break;
    case 'cost' :
        comboCost();
        break;
    case 'so' :
        comboSO();
        break;
    case 'activities' :
        comboActivities();
        break;
    case 'grantNumber' :
        comboGrantNumber();
        break;
    case 'hrDescription' :
        comboHRDescription();
        break;
    case 'costMicroStaffOnly' :
        comboCostMicroStaffOnly();
        break;
    case 'costcode2' :
        comboCostcode2();
        break;
    case 'costcode3' :
        comboCostcode3();
        break;
    case 'costcode3full' :
        comboCostcode3Full();
        break;
    case 'costcode4' :
        comboCostcode4();
        break;
    case 'costcode5' :
        comboCostcode5();
        break;
    case 'glcode' :
        comboGLCode();
        break;

}


function get_pma_costos_macro ($id) {
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id,	id_pma_contribuciones_detalle, cost_code FROM  pma_costos_macro WHERE id = $id ";
    $result = $os->db->conn->query($sql);

    $row = $result->fetchAll(PDO::FETCH_ASSOC);
    return $row[0];
};

function get_pma_contribuciones_detalle ($id) {
    //id_pma_contribuciones_detalle
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id,	id_pma_contribuciones, so, activity FROM  pma_contribuciones_detalle WHERE id = $id ";
    $result = $os->db->conn->query($sql);

    $row = $result->fetchAll(PDO::FETCH_ASSOC);
    return $row[0];
};
function get_pma_contribuciones ($id) {
    //id_pma_contribuciones_detalle
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id,	grant_number  FROM  pma_contribuciones WHERE id = $id ";
    $result = $os->db->conn->query($sql);

    $row = $result->fetchAll(PDO::FETCH_ASSOC);
    return $row[0];
};

function getCostCodeName ($idCostcode) {
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT description FROM  pma_cost_category WHERE id = $idCostcode ";
    $result = $os->db->conn->query($sql);

    $row = $result->fetchAll(PDO::FETCH_ASSOC);
    return $row[0]['description'];
}
function getCostContribucionesDetalleName ($id) {
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT category_code FROM  pma_so_categories WHERE id = $id ";
    $result = $os->db->conn->query($sql);

    $row = $result->fetchAll(PDO::FETCH_ASSOC);
    return $row[0]['category_code'];
}

