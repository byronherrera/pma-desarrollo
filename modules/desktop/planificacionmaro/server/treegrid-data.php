<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

$data = array();

$tree = buildTree($data);

$tree = json_encode($tree);
echo $tree;

function buildTree(array $elements, $parentId = NULL) {
    global $os;
    $branch = array();
    $os->db->conn->query("SET NAMES 'utf8'");
    if (is_null($parentId))
    $sql = "SELECT * FROM pma_cost_category WHERE ISNULL(parent)";
    else
        $sql = "SELECT * FROM pma_cost_category WHERE parent = $parentId";

    $result = $os->db->conn->query($sql);
    while ($element = $result->fetch(PDO::FETCH_ASSOC)) {
        if ($element['parent'] == $parentId) {
            $children = buildTree($elements, $element['id']);
            if ($children) {
                $element['children'] = $children;
            }
            $branch[] = $element;
        }
    }
    return $branch;
}

