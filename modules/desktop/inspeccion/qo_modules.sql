INSERT INTO `qo_modules` VALUES ('moduloInspeccion', 'desktop/moduloInspeccion', 'Inspección', 'x', '{\r\n  \"id\": \"inspeccion\",\r\n  \"type\": \"desktop/inspeccion\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Inspeccion de Inspeccion.\",\r\n    \"name\": \"Ventana Inspeccion\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosZonales\", \"description\": \"Personal de zonales\" }\r\n\r\n    ],\r\n    \"class\": \"QoInspeccion\",\r\n    \"file\": \"desktop/inspeccion/moduloInspeccion.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.InspeccionWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/inspeccion/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/inspeccion/client/\",\r\n        \"files\": [  \"moduloInspeccion-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"inspeccion-icon\",\r\n        \"shortcutIconCls\": \"inspeccion-shortcut\",\r\n        \"text\": \"Inspeccion\",\r\n        \"tooltip\": \"<b>Inspeccion</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);


ALTER TABLE `prueba`.`amc_denuncias`
ADD COLUMN `procesado_inspeccion` int(1) NULL  ;


/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50523
 Source Host           : localhost:3306
 Source Schema         : prueba

 Target Server Type    : MySQL
 Target Server Version : 50523
 File Encoding         : 65001

 Date: 06/02/2018 16:10:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for amc_inspeccion
-- ----------------------------
DROP TABLE IF EXISTS `amc_inspeccion`;
CREATE TABLE `amc_inspeccion`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_denuncia` int(11) NULL DEFAULT NULL,
  `id_inspeccion` int(11) NULL DEFAULT NULL,
  `fecha_recepcion_documento` datetime NULL DEFAULT NULL,
  `nombre_denunciado` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `codificacion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sumilla_dmi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `funcionario_entrega` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `respuesta` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `guia` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fecha_despacho` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `numero_memo_oficio` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cargo_enviado` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `institucion_recibe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_zona` int(11) NULL DEFAULT NULL,
  `numero_acta` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `numero_informe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_ordenanza` int(11) NULL DEFAULT NULL,
  `infraccion` int(1) NULL DEFAULT NULL,
  `predio` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `unidad_asignada` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_actividad` int(11) NULL DEFAULT NULL,
  `id_caracter_tramite` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of amc_inspeccion
-- ----------------------------
INSERT INTO `amc_inspeccion` VALUES (1, 11295, 1, '2018-01-29 14:04:25', 'MERCHAN REYES LUIS OSWALDO', 'EMISIÓN RESPUESTA TÉCNICO-LEGAL', 'ATENDER PABLO AIZAGA 12/01/2017 C. JATIVA REASIGNA A GABRIELA ENCALADA ENTREGA DIRECTOR', '30', 'RECIBE PATRICIA 12/01/2016 CON ACTA', '4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 2, NULL);
INSERT INTO `amc_inspeccion` VALUES (2, 11296, 2, '2018-01-30 10:46:18', 'CONJUNTO ARAWI', 'EMISION RESPUESTA TECNICO-LEGA', 'ATENDER 11/01/2017I', '33', 'RECIBE PATRICIA CON ACTA', '201', '2018-02-06 12:35:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 5, NULL);
INSERT INTO `amc_inspeccion` VALUES (3, 11297, 3, '2018-01-30 10:47:49', 'ANGEL CASTILLO', 'INSPECCIÓN TÉCNICA / CONSTRUCCIONES', 'ELABORAR DOCUMENTO DE RESPUESTA', '22', 'RECIBE PATRICIA 12/01/2017', '200', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 4, NULL);
INSERT INTO `amc_inspeccion` VALUES (8, 11296, 5, NULL, NULL, 'a', 'a', '30', 'a', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL);
INSERT INTO `amc_inspeccion` VALUES (10, 11297, 1548, '2018-02-05 12:02:52', 'test', 'test', 'test', '3', 'test', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL);
INSERT INTO `amc_inspeccion` VALUES (11, 11297, 1549, '2018-02-05 12:24:36', 'asd', 'testest', 'asd', '30', 'asd', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL);
INSERT INTO `amc_inspeccion` VALUES (12, 21882, 1550, '2018-02-06 09:08:38', 'Denunciado', 'Codificacion', 'sumilla', '4', 'respuesta', '10', '2018-02-06T12:31:01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL);
INSERT INTO `amc_inspeccion` VALUES (13, 21882, 1551, '2018-02-06 09:10:05', 'den 2', 'cod 2', 'sum 2', '25', 'respuesta 2', '12', '2018-02-06T14:11:44', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL);
INSERT INTO `amc_inspeccion` VALUES (14, 21881, 1552, '2018-02-06 09:13:04', 'test', 'test', 'test', '30', 'test', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL);
INSERT INTO `amc_inspeccion` VALUES (15, 21874, 1553, '2018-02-06 12:41:59', 'asd', '', NULL, '180', 'asd', '10', '2018-02-06T12:31:01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL);

SET FOREIGN_KEY_CHECKS = 1;



/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50523
 Source Host           : localhost:3306
 Source Schema         : prueba

 Target Server Type    : MySQL
 Target Server Version : 50523
 File Encoding         : 65001

 Date: 06/02/2018 16:10:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for amc_inspeccion_actividad
-- ----------------------------
DROP TABLE IF EXISTS `amc_inspeccion_actividad`;
CREATE TABLE `amc_inspeccion_actividad`  (
  `nombre_actividad` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id` int(11) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of amc_inspeccion_actividad
-- ----------------------------
INSERT INTO `amc_inspeccion_actividad` VALUES ('No asignado', 1);
INSERT INTO `amc_inspeccion_actividad` VALUES ('Inspección técnica', 2);
INSERT INTO `amc_inspeccion_actividad` VALUES ('Inspección general', 3);
INSERT INTO `amc_inspeccion_actividad` VALUES ('Inspección fauna urbana', 4);
INSERT INTO `amc_inspeccion_actividad` VALUES ('Conocimiento', 5);

SET FOREIGN_KEY_CHECKS = 1;
