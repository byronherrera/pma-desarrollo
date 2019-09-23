/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : pma-desarrollo

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 23/09/2019 06:44:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pma_activities
-- ----------------------------
DROP TABLE IF EXISTS `pma_activities`;
CREATE TABLE `pma_activities`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cost_category` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_cost_subcategory` int(11) NULL DEFAULT NULL,
  `subcategory_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `subcategory_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_activities
-- ----------------------------
INSERT INTO `pma_activities` VALUES (1, '1', 1, 'Activity 1', 'EC01.01.011.URT1');
INSERT INTO `pma_activities` VALUES (2, '2', 2, 'Activity 2', 'EC01.03.021.SMS1');
INSERT INTO `pma_activities` VALUES (3, '2', 3, 'Activity 3', 'EC01.03.021.SMS2');
INSERT INTO `pma_activities` VALUES (4, '3', 4, 'Activity 5', 'EC01.04.031.CAR1');
INSERT INTO `pma_activities` VALUES (5, '3', 5, 'Activity 6', 'EC01.04.031.CAR2');
INSERT INTO `pma_activities` VALUES (6, '4', 6, 'Activity 7', 'EC01.05.041.CSI1');
INSERT INTO `pma_activities` VALUES (7, '4', 7, 'Activity 8', 'EC01.05.041.CSI2');

-- ----------------------------
-- Table structure for pma_contribuciones
-- ----------------------------
DROP TABLE IF EXISTS `pma_contribuciones`;
CREATE TABLE `pma_contribuciones`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_contribucion` int(11) NULL DEFAULT NULL,
  `grant_number` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `estado` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `crn` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `donor` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `fund` decimal(20, 0) NULL DEFAULT NULL,
  `comments` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `year_contribution` int(4) NULL DEFAULT NULL,
  `isc` decimal(20, 0) NOT NULL DEFAULT 0,
  `total_grant` decimal(20, 0) NOT NULL DEFAULT 0,
  `total_programmed` decimal(20, 0) NULL DEFAULT 0,
  `total_unprogrammed` decimal(20, 0) NULL DEFAULT 0,
  `grant_tod` date NULL DEFAULT NULL,
  `grant_tdd` date NULL DEFAULT NULL,
  `grant_specific` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `activity` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `recepcion_documento` datetime(0) NULL DEFAULT NULL,
  `creado` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Registro de contribuciones' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_contribuciones
-- ----------------------------
INSERT INTO `pma_contribuciones` VALUES (1, NULL, '10029912', 'Cerrada', 'USA-C-01102-05', 'FFP', 1, 'Saldo USA 2016', 2017, 0, 311671, 4577, 307094, '2018-04-30', '2019-09-02', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (2, NULL, '10029894', 'Cerrada', 'USA-C-01102-04', 'FFP', 1, 'Contribución 2017', 2017, 117757, 1682243, 643, 1681600, '2018-04-30', '2018-04-30', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (3, NULL, '10032605', 'Cerrada', 'USA-C-01479-01', 'FFP', NULL, 'Contribución 2018', 2018, 122066, 1877934, 643, 1877291, '2018-04-27', '2018-12-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (4, NULL, '10033899', 'Vigente', 'USA-C-01535-01', 'FFP', NULL, 'Contribución 2018', 2018, 366197, 5633803, 643, 5633160, '2019-09-02', '2019-09-30', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (5, NULL, '30004294', 'Vigente', 'IPL EC01 2019_04_04', 'FFP', NULL, 'AF 2019', 2019, 183099, 2816901, 643, 2816258, '2019-04-04', '2020-03-01', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (6, NULL, '10035028', 'Vigente', 'USA-C-01619-01', 'FFP', NULL, 'Saldo 7 millones', 2019, 427230, 6572770, 643, 6572127, '2020-02-28', '2020-02-28', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (7, NULL, '70000403', 'Cerrada', '001-C-01829 -01', 'CERF', NULL, 'Contribución 2018', 2018, 32714, 503288, 643, 502645, '2019-03-26', '2019-03-26', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (8, NULL, '70000374', 'Vigente', 'DEN-C-00220-01', 'Denmark', NULL, 'Gender', 2018, 0, 361916, 643, 361273, '2019-12-31', '2019-12-31', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (9, NULL, '70000375', 'Vigente', 'DEN-C-00220-02', 'Denmark', NULL, 'Gender', 2019, 0, 368474, 643, 367831, '2019-12-31', '2019-12-31', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (10, NULL, '10034321', 'Cerrada', 'GER-C-00825-01', 'Germany', NULL, NULL, 2018, 69356, 1068222, 643, 1067579, '2018-12-31', '2019-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (11, NULL, '10035334', 'Vigente', 'CAN-C-00572-08', 'Canada', NULL, NULL, 2019, 23189, 356750, 643, 356107, '2020-03-31', '2020-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (13, NULL, '10029899', 'Vigente', 'KOR-C-00128-06', 'KOR MOFA', NULL, 'Korea I (saldo PRRO)', 2017, 50486, 721223, 643, 720580, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (14, NULL, '10029744', 'Vigente', 'KOR-C-00128-04', 'KOR MOFA', NULL, 'Korea II (1 millón)', 2017, 65421, 559056, 643, 558413, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (15, NULL, '10029744', 'Vigente', 'KOR-C-00128-04', 'KOR MOFA', NULL, 'Korea II (1 millón)', 2017, 0, 375523, 643, 374880, '2019-09-30', '2019-09-30', 'No', 'Activity 4', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (16, NULL, '10029747', 'Vigente', 'KOR-C-00128-05', 'KOR MOFA', NULL, 'Korea III (1 millón)', 2017, 65421, 713001, 643, 712358, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (17, NULL, '10029747', 'Vigente', 'KOR-C-00128-05', 'KOR MOFA', NULL, 'Korea III (1 millón)', 2017, 0, 221578, 643, 220935, '2019-09-30', '2019-09-30', 'No', 'Activity 4', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (18, NULL, '10030661', 'Cerrada', 'WPD-C-03321-02', 'Private donors', NULL, 'McKnight ', 2017, 3745, 37452, 643, 36809, '2019-08-31', '2019-11-30', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (19, NULL, '70000012', 'Vigente', 'WPD-C-03871-02', 'Private donors', NULL, 'McKnight', 2017, 14997, 90908, 643, 90265, '2019-08-31', '2019-11-30', 'Yes', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (20, NULL, '70000012', 'Vigente', 'WPD-C-03871-02', 'Private donors', NULL, 'McKnight', 2017, 0, 59060, 643, 58417, '2019-08-31', '2019-11-30', 'Yes', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (21, NULL, '10029859', 'Cerrada', 'WPD-C-03290-02', 'Private donors', NULL, 'Saldo YUM ', 2017, 5231, 121157, 643, 120514, NULL, NULL, NULL, 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (22, NULL, '70000011', 'Pendiente', '001-C-01539-02', 'UN Adaptation Fund', NULL, 'FORECCSA', 2017, 66847, 119173, 643, 118530, '2018-05-29', '2018-05-29', 'Yes', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (23, NULL, '70000011', 'Pendiente', '001-C-01539-02', 'UN Adaptation Fund', NULL, 'FORECCSA', 2017, 0, 1551997, 643, 1551354, '2018-05-29', '2018-05-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (24, NULL, '70000065', 'Pendiente', '001-C-01023-02', 'UN Adaptation Fund', NULL, 'FORECCSA', 2017, 21825, 86009, 643, 85366, '2018-05-29', '2018-05-29', 'Yes', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (25, NULL, '70000065', 'Pendiente', '001-C-01023-02', 'UN Adaptation Fund', NULL, 'FORECCSA', 2017, 0, 459606, 643, 458963, '2018-05-29', '2018-05-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (26, NULL, '30003782', 'Cerrada', 'IRA ECCO EPR EC01', 'IRA AF', NULL, 'Venezolanos', 2017, 0, 93451, 643, 92808, '2018-02-15', '2018-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (27, NULL, '10020984', 'Vigente', 'NET-C-00102-02', 'SRAC', NULL, 'SRAC NET ', 2017, 3438, 45846, 643, 45203, '0000-00-00', '0000-00-00', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (28, NULL, '10031132', 'Cerrada', 'UK-C00369-05', 'SRAC', NULL, 'UK DFID', 2017, 50374, 1196000, 643, 1195357, '2018-05-31', '2018-07-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (29, NULL, '10031132', 'Cerrada', 'UK-C00369-05', 'SRAC', NULL, 'UK DFID Cambio grant', 2017, 0, 24000, 643, 23357, '2018-05-31', '2018-07-31', 'No', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (30, NULL, '10032250', 'Cerrada', 'NET-C-00140-02', 'SRAC', NULL, 'NET MOFA', 2017, 30516, 500000, 643, 499357, '2018-12-31', '2018-12-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (31, NULL, '10032701', 'Vigente', 'SWE-C-00299-09', 'SRAC', NULL, 'SWEDEN Cambio grant', 2018, 18310, 54000, 643, 53357, '0000-00-00', '0000-00-00', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (32, NULL, '10032701', 'Vigente', 'SWE-C-00299-09', 'SRAC', NULL, 'SWEDEN Cambio grant', 2018, 0, 246000, 643, 245357, '0000-00-00', '0000-00-00', 'No', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (33, NULL, '10033562', 'Vigente', 'UK -C-00369-06', 'SRAC', NULL, 'UK DFID', 2018, 122066, 1040000, 643, 1039357, '2019-05-31', '2019-07-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (34, NULL, '70000144', 'Vigente', '001-C-01692-01', 'UN Adaptation Fund', NULL, 'Binacional 2018', 2018, 30155, 753866, 643, 753223, '2017-11-29', '2022-11-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (35, NULL, '70000590', 'Vigente', '001-C-01692-04', 'UN Adaptation Fund', NULL, 'Binacional 2019', 2019, 239076, 5976903, 643, 5976260, '2018-01-01', '2022-11-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (38, NULL, 'No relevant ', 'Vigente', '', 'Other', NULL, 'IVA PRRO ', 2017, 0, 114194, 643, 113551, '0000-00-00', '0000-00-00', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (39, NULL, 'No relevant ', 'Vigente', '', 'Other', NULL, 'IVA PRRO ', 2017, 0, 114194, 643, 113551, '0000-00-00', '0000-00-00', 'No', 'Activity 8', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (40, NULL, 'No relevant ', 'Vigente', '11', 'Other', 1, 'IVA ', 2017, 0, 180059, 643, 179416, '2019-09-12', '2019-09-12', 'No', 'Activity 6', NULL, '2019-06-17 07:55:41');

-- ----------------------------
-- Table structure for pma_contribuciones_detalle
-- ----------------------------
DROP TABLE IF EXISTS `pma_contribuciones_detalle`;
CREATE TABLE `pma_contribuciones_detalle`  (
  `id` int(11) NOT NULL,
  `id_pma_contribuciones_detalle` int(11) NULL DEFAULT NULL,
  `year` int(4) NULL DEFAULT NULL,
  `so` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `activity` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total` decimal(10, 0) NULL DEFAULT NULL,
  `doc` decimal(10, 0) NULL DEFAULT NULL,
  `dsc` decimal(10, 0) NULL DEFAULT NULL,
  `adjust` decimal(10, 0) NULL DEFAULT NULL,
  `comment` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total_adjusted` decimal(10, 0) NULL DEFAULT NULL,
  `fecha_registro` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `total_grant_q1` int(20) NULL DEFAULT 0,
  `total_grant_q2` int(20) NULL DEFAULT 0,
  `total_grant_q3` int(20) NULL DEFAULT 0,
  `total_grant_q4` int(20) NULL DEFAULT 0,
  `total_grant_prog_doc` int(20) NULL DEFAULT 0,
  `total_grant_prog_dsc` int(20) NULL DEFAULT 0,
  `total_pr_po_doc` int(20) NULL DEFAULT 0,
  `total_actuals_doc` int(20) NULL DEFAULT 0,
  `total_balance_doc` int(20) NULL DEFAULT 0,
  `total_pr_po_dsc` int(20) NULL DEFAULT 0,
  `total_actuals_dsc` int(20) NULL DEFAULT 0,
  `total_grant_balance_dsc` int(20) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_contribuciones_detalle
-- ----------------------------
INSERT INTO `pma_contribuciones_detalle` VALUES (1, 1, 2019, '1', '1', 3333, NULL, NULL, NULL, NULL, NULL, '2019-07-26 00:22:43', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `pma_contribuciones_detalle` VALUES (2, 1, 2018, '1', '2', 111, NULL, NULL, NULL, NULL, NULL, '2019-08-01 11:45:33', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `pma_contribuciones_detalle` VALUES (3, 1, 2017, '2', '1', 1133, NULL, NULL, NULL, NULL, NULL, '2019-08-01 11:53:44', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `pma_contribuciones_detalle` VALUES (4, 17, 2018, '1', '1', 0, NULL, NULL, NULL, NULL, NULL, '2019-09-02 03:30:30', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `pma_contribuciones_detalle` VALUES (5, 27, 2019, '1', '1', 0, NULL, NULL, NULL, NULL, NULL, '2019-09-18 00:42:55', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `pma_contribuciones_detalle` VALUES (6, 1, 2019, '1', '1', 0, NULL, NULL, NULL, NULL, NULL, '2019-09-21 00:14:41', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `pma_contribuciones_detalle` VALUES (8, 1, 2019, '1', '1', NULL, NULL, NULL, NULL, NULL, NULL, '2019-09-21 01:23:28', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `pma_contribuciones_detalle` VALUES (9, 1, 2019, '1', '2', NULL, NULL, NULL, NULL, NULL, NULL, '2019-09-21 01:23:58', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- ----------------------------
-- Table structure for pma_cost_category
-- ----------------------------
DROP TABLE IF EXISTS `pma_cost_category`;
CREATE TABLE `pma_cost_category`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nivel` int(11) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cost` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `parent` int(10) NULL DEFAULT NULL,
  `active` int(2) NULL DEFAULT NULL,
  `create` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `typecost` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_cost_category
-- ----------------------------
INSERT INTO `pma_cost_category` VALUES (1, 1, 'Transfer - Food', 'F', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (2, 2, 'Other cost', NULL, 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (3, 3, 'Food', 'FA', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (4, 3, 'Other Food-Related Costs', 'FB', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (5, 3, 'External Transport', 'FC', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (6, 3, 'In-Country Transport', 'FD', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (7, 3, 'Overland Transport', 'FE', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (8, 3, 'In-Country Storage', 'FF', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (9, 3, 'Overland Storage', 'FG', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (10, 3, 'In-Country Port', 'FH', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (11, 3, 'Overland Port', 'FI', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (12, 3, 'In-Country Supply Chain Management Costs', 'FJ', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (13, 3, 'Overland - Supply Chain Management Costs ', 'FK', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (14, 3, 'Cooperating Partner Costs', 'FL', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (15, 3, 'Cargo preference ', 'FM', 2, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (16, 2, 'Staff cost', NULL, 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (17, 3, 'Food 1', 'FA', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (18, 3, 'Other Food-Related Costs', 'FB', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (19, 3, 'External Transport', 'FC', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (20, 3, 'In-Country Transport', 'FD', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (21, 3, 'Overland Transport', 'FE', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (22, 3, 'In-Country Storage', 'FF', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (23, 3, 'Overland Storage', 'FG', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (24, 3, 'In-Country Port', 'FH', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (25, 3, 'Overland Port', 'FI', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (26, 3, 'In-Country Supply Chain Management Costs', 'FJ', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (27, 3, 'Overland - Supply Chain Management Costs ', 'FK', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (28, 3, 'Cooperating Partner Costs', 'FL', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (29, 3, 'Cargo preference ', 'FM', 16, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (30, 1, 'Transfer - CBT & Commodity Voucher', 'C  ', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (31, 2, 'Other cost', NULL, 30, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (32, 3, 'CBT & Commodity Voucher', 'CA', 31, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (33, 3, 'Delivery costs', 'CB', 31, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (34, 3, 'CBT and Commodity Voucher Management cost', 'CC', 31, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (35, 3, 'Cooperating Partner Costs', 'CD', 31, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (36, 2, 'Staff cost', NULL, 30, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (37, 3, 'Delivery costs', 'CB', 36, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (38, 3, 'CBT and Commodity Voucher Management cost', 'CC', 36, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (39, 3, 'Cooperating Partner Costs', 'CD', 36, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (40, 1, 'Transfer - Capacity Strengthening', 'S', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (41, 2, 'Other cost', NULL, 40, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (42, 3, 'Capacity Strengthening', 'SA', 41, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (43, 3, 'Cooperating Partner Costs', 'SB', 41, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (44, 2, 'Staff cost', NULL, 40, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (45, 3, 'Capacity Strengthening', 'SA', 44, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (46, 3, 'Cooperating Partner Costs', 'SB', 44, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (47, 1, 'Transfer - Service Delivery', 'D', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (48, 2, 'Other cost', NULL, 47, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (49, 3, 'Service Delivery', 'DA', 48, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (50, 3, 'Cooperating Partner Costs', 'DB', 48, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (51, 2, 'Salary cost', NULL, 47, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (52, 1, 'Implementation', 'I', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (53, 2, 'Other cost', NULL, 52, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (54, 3, 'Activity management costs', 'IA', 53, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (55, 2, 'Staff cost', NULL, 52, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (56, 3, 'Activity management costs', 'IA', 55, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (57, 1, 'DSC', 'A', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (58, 2, 'Other cost', NULL, 57, 1, '2019-08-26 08:54:56', NULL);
INSERT INTO `pma_cost_category` VALUES (59, 3, 'DSC', 'AA', 58, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (60, 3, 'Assessments Costs', 'AB', 58, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (61, 3, 'Evaluation Costs', 'AC', 58, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (62, 2, 'Staff cost', NULL, 57, 1, '2019-08-26 08:54:56', NULL);
INSERT INTO `pma_cost_category` VALUES (63, 3, 'DSC', 'AA', 62, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (64, 3, 'Assessments Costs', 'AB', 62, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (65, 3, 'Evaluation Costs', 'AC', 62, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (66, 4, 'Recurring cost', NULL, NULL, 1, '2019-08-26 08:14:03', NULL);
INSERT INTO `pma_cost_category` VALUES (67, 5, 'Office management CO', NULL, 66, 1, '2019-08-26 08:14:03', NULL);
INSERT INTO `pma_cost_category` VALUES (68, 5, 'Office management SO', NULL, 66, 1, '2019-08-26 08:14:03', NULL);
INSERT INTO `pma_cost_category` VALUES (69, 5, 'Travel ', NULL, 66, 1, '2019-08-26 08:14:03', NULL);
INSERT INTO `pma_cost_category` VALUES (70, 5, 'Other staff cost', NULL, 66, 1, '2019-08-26 08:14:03', NULL);
INSERT INTO `pma_cost_category` VALUES (71, 4, 'Programme cost', NULL, NULL, 1, '2019-08-26 08:59:23', NULL);
INSERT INTO `pma_cost_category` VALUES (72, 5, 'Ingreso manual de descripción de actividad', '', 71, 1, '2019-06-01 00:00:00', NULL);

-- ----------------------------
-- Table structure for pma_costos_macro
-- ----------------------------
DROP TABLE IF EXISTS `pma_costos_macro`;
CREATE TABLE `pma_costos_macro`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pma_costos_macro` int(11) NULL DEFAULT NULL,
  `cost_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total` decimal(10, 0) NULL DEFAULT NULL,
  `fecha_registro` date NULL DEFAULT NULL,
  `doc` decimal(10, 0) NULL DEFAULT NULL,
  `dsc` decimal(10, 0) NULL DEFAULT NULL,
  `adjust` decimal(10, 0) NULL DEFAULT NULL,
  `comment` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total_adjusted` decimal(10, 0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_costos_macro
-- ----------------------------
INSERT INTO `pma_costos_macro` VALUES (22, 4, '40', NULL, '2019-09-04', NULL, NULL, NULL, ' ', NULL);
INSERT INTO `pma_costos_macro` VALUES (23, 4, '30', NULL, '2019-09-04', NULL, NULL, NULL, ' ', NULL);
INSERT INTO `pma_costos_macro` VALUES (24, 4, '52', NULL, '2019-09-04', NULL, NULL, NULL, ' ', NULL);
INSERT INTO `pma_costos_macro` VALUES (25, 4, '57', NULL, '2019-09-04', NULL, NULL, NULL, ' ', NULL);
INSERT INTO `pma_costos_macro` VALUES (27, 10, '47', NULL, '2019-09-05', NULL, NULL, NULL, ' ', NULL);
INSERT INTO `pma_costos_macro` VALUES (29, 1, '30', 3333, '2019-09-18', NULL, NULL, NULL, ' ', 3333);
INSERT INTO `pma_costos_macro` VALUES (30, 3, '30', 1133, '2019-09-18', NULL, NULL, NULL, ' ', 1133);
INSERT INTO `pma_costos_macro` VALUES (31, 2, '40', 111, '2019-09-18', NULL, NULL, NULL, ' ', 111);
INSERT INTO `pma_costos_macro` VALUES (32, 1, '1', 0, '2019-09-21', 0, 0, 0, ' ', 0);

-- ----------------------------
-- Table structure for pma_costos_micro
-- ----------------------------
DROP TABLE IF EXISTS `pma_costos_micro`;
CREATE TABLE `pma_costos_micro`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pma_costos_micro` int(11) NULL DEFAULT NULL,
  `cost_code2` int(11) NULL DEFAULT NULL,
  `cost_code3` int(11) NULL DEFAULT NULL,
  `cost_code4` int(11) NULL DEFAULT NULL,
  `cost_code5` int(11) NULL DEFAULT NULL,
  `cost_code_micro` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `adjust` int(11) NULL DEFAULT NULL,
  `total_after_adjust` int(11) NULL DEFAULT NULL,
  `description_micro` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `total_micro` decimal(10, 0) NULL DEFAULT NULL,
  `glcode` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 30 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_costos_micro
-- ----------------------------
INSERT INTO `pma_costos_micro` VALUES (1, 1, NULL, NULL, NULL, NULL, '1', 0, 1, 'Taller 1', 1000, NULL);
INSERT INTO `pma_costos_micro` VALUES (2, 1, 2, 4, NULL, NULL, '1', 0, 1, 'Taller 2', 8000, NULL);
INSERT INTO `pma_costos_micro` VALUES (3, 2, 16, 29, NULL, NULL, '1', 0, 1, 'Taler Costa', 5000, NULL);
INSERT INTO `pma_costos_micro` VALUES (4, 2, 16, 18, NULL, NULL, '1', 0, 1, 'Taller Oriente', 5000, NULL);
INSERT INTO `pma_costos_micro` VALUES (5, 2, 16, 17, NULL, NULL, '1', 0, 1, 'Taller Galápagos', 11000, NULL);
INSERT INTO `pma_costos_micro` VALUES (6, NULL, 1, 1, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (7, NULL, 1, 1, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (8, NULL, 1, 1, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (9, 2, 1, 1, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (10, 2, 48, 1, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (11, 2, 2, 1, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (12, 2, 31, 33, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (13, 2, 36, 38, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (14, 2, 51, 1, 1, 1, NULL, 0, 0, '', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (15, 2, 16, 18, 1, 1, NULL, 0, 1, '', 1, NULL);
INSERT INTO `pma_costos_micro` VALUES (16, 2, 48, 49, 1, 1, NULL, 0, 22, '', 11, NULL);
INSERT INTO `pma_costos_micro` VALUES (17, 2, 36, 37, 1, 1, NULL, 0, 1, '', 1, NULL);
INSERT INTO `pma_costos_micro` VALUES (18, 2, 2, 3, 66, 68, NULL, 0, 131, 's1', 131, NULL);
INSERT INTO `pma_costos_micro` VALUES (21, 13, 2, 3, 71, 72, NULL, 0, 300, ' afsf', 300, '2');
INSERT INTO `pma_costos_micro` VALUES (22, 12, 53, 54, 1, 1, NULL, 0, 1000, '', 1000, NULL);
INSERT INTO `pma_costos_micro` VALUES (23, 26, 58, 59, 66, 67, NULL, NULL, 24000, 'Arriendo CITIMED', 24000, NULL);
INSERT INTO `pma_costos_micro` VALUES (24, 26, 62, 63, 71, 72, NULL, NULL, 10000, 'Consultoría medios de vida', 10000, NULL);
INSERT INTO `pma_costos_micro` VALUES (25, 21, 31, 32, 71, 72, NULL, NULL, 30000, 'Talleres mujeres rurales', 30000, NULL);
INSERT INTO `pma_costos_micro` VALUES (26, 21, 1, 1, 1, 1, NULL, NULL, 0, 'Taller MR', 0, NULL);
INSERT INTO `pma_costos_micro` VALUES (27, 13, 2, 4, 71, 72, NULL, 0, 300, 'test', 300, '199');
INSERT INTO `pma_costos_micro` VALUES (28, 13, 16, 19, 71, 72, NULL, 1111, 1411, 'tes1ss', 300, '211');
INSERT INTO `pma_costos_micro` VALUES (29, 14, 31, 33, 1, 1, NULL, 0, 0, '', 0, '498');

-- ----------------------------
-- Table structure for pma_gl_codes
-- ----------------------------
DROP TABLE IF EXISTS `pma_gl_codes`;
CREATE TABLE `pma_gl_codes`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_gl_codes` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `commitment_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `commitment_description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cost_type1` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cost_type2` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cost_category` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `availability_type` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gl_account` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gl_description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cbp_cost_category` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1390 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_gl_codes
-- ----------------------------
INSERT INTO `pma_gl_codes` VALUES (1, '', 'EFA12600400', 'FTV Expense Commodities Other', NULL, NULL, 'E', 'FA', '1', '2600400', 'Expense Commodities Other', 'Food');
INSERT INTO `pma_gl_codes` VALUES (2, '', 'EFA1500100', 'FTV CASH CER CEREALS AND GRAINS', NULL, NULL, 'E', 'FA', '1', '500100', 'CER CEREALS AND GRAINS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (3, '', 'EFA1500101', 'FTV CASH CER BARLEY', NULL, NULL, 'E', 'FA', '1', '500101', 'CER BARLEY', 'Food');
INSERT INTO `pma_gl_codes` VALUES (4, '', 'EFA1500102', 'FTV CASH CER BREAD', NULL, NULL, 'E', 'FA', '1', '500102', 'CER BREAD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (5, '', 'EFA1500103', 'FTV CASH CER BUCKWHEAT', NULL, NULL, 'E', 'FA', '1', '500103', 'CER BUCKWHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (6, '', 'EFA1500104', 'FTV CASH CER BULGUR WHEAT', NULL, NULL, 'E', 'FA', '1', '500104', 'CER BULGUR WHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (7, '', 'EFA1500105', 'FTV CASH CER MAIZE', NULL, NULL, 'E', 'FA', '1', '500105', 'CER MAIZE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (8, '', 'EFA1500106', 'FTV CASH CER MAIZE MEAL', NULL, NULL, 'E', 'FA', '1', '500106', 'CER MAIZE MEAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (9, '', 'EFA1500107', 'FTV CASH CER OAT', NULL, NULL, 'E', 'FA', '1', '500107', 'CER OAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (10, '', 'EFA1500108', 'FTV CASH CER PASTA', NULL, NULL, 'E', 'FA', '1', '500108', 'CER PASTA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (11, '', 'EFA1500109', 'FTV CASH CER QUINUA', NULL, NULL, 'E', 'FA', '1', '500109', 'CER QUINUA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (12, '', 'EFA1500110', 'FTV CASH CER RICE', NULL, NULL, 'E', 'FA', '1', '500110', 'CER RICE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (13, '', 'EFA1500111', 'FTV CASH CER SORGHUM/MILLET', NULL, NULL, 'E', 'FA', '1', '500111', 'CER SORGHUM/MILLET', 'Food');
INSERT INTO `pma_gl_codes` VALUES (14, '', 'EFA1500112', 'FTV CASH CER SOYA-FORTIFIED MAIZE MEAL', NULL, NULL, 'E', 'FA', '1', '500112', 'CER SOYA-FORTIFIED MAIZE MEAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (15, '', 'EFA1500113', 'FTV CASH CER WHEAT', NULL, NULL, 'E', 'FA', '1', '500113', 'CER WHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (16, '', 'EFA1500115', 'FTV CASH CER WHEAT FLOUR', NULL, NULL, 'E', 'FA', '1', '500115', 'CER WHEAT FLOUR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (17, '', 'EFA1500200', 'FTV CASH BEV BEVERAGES', NULL, NULL, 'E', 'FA', '1', '500200', 'BEV BEVERAGES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (18, '', 'EFA1500201', 'FTV CASH BEV BLACK TEA', NULL, NULL, 'E', 'FA', '1', '500201', 'BEV BLACK TEA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (19, '', 'EFA1500202', 'FTV CASH BEV COFFEE', NULL, NULL, 'E', 'FA', '1', '500202', 'BEV COFFEE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (20, '', 'EFA1500203', 'FTV CASH BEV FRUIT JUICE', NULL, NULL, 'E', 'FA', '1', '500203', 'BEV FRUIT JUICE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (21, '', 'EFA1500204', 'FTV CASH BEV MINERAL WATER', NULL, NULL, 'E', 'FA', '1', '500204', 'BEV MINERAL WATER', 'Food');
INSERT INTO `pma_gl_codes` VALUES (22, '', 'EFA1500205', 'FTV CASH BEVERAGE MIX', NULL, NULL, 'E', 'FA', '1', '500205', 'BEV BEVERAGE MIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (23, '', 'EFA1500250', 'FTV CASH DAI DAIRY PRODUCTS', NULL, NULL, 'E', 'FA', '1', '500250', 'DAI DAIRY PRODUCTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (24, '', 'EFA1500251', 'FTV CASH DAI CHEESE', NULL, NULL, 'E', 'FA', '1', '500251', 'DAI CHEESE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (25, '', 'EFA1500252', 'FTV CASH DAI DRIED WHOLE MILK', NULL, NULL, 'E', 'FA', '1', '500252', 'DAI DRIED WHOLE MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (26, '', 'EFA1500253', 'FTV CASH DAI ENRICHED DRIED SKIMMED MILK', NULL, NULL, 'E', 'FA', '1', '500253', 'DAI ENRICHED DRIED SKIMMED MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (27, '', 'EFA1500254', 'FTV CASH DAI INFANT FORMULA', NULL, NULL, 'E', 'FA', '1', '500254', 'DAI INFANT FORMULA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (28, '', 'EFA1500255', 'FTV CASH DAI PLAIN DRIED SKIMMED MILK', NULL, NULL, 'E', 'FA', '1', '500255', 'DAI PLAIN DRIED SKIMMED MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (29, '', 'EFA1500256', 'FTV CASH DAI THERAPEUTIC MILK', NULL, NULL, 'E', 'FA', '1', '500256', 'DAI THERAPEUTIC MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (30, '', 'EFA1500257', 'FTV CASH DAI UHT MILK', NULL, NULL, 'E', 'FA', '1', '500257', 'DAI UHT MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (31, '', 'EFA1500300', 'FTV CASH FRU FRUIT AND NUTS', NULL, NULL, 'E', 'FA', '1', '500300', 'FRU FRUIT AND NUTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (32, '', 'EFA1500301', 'FTV CASH FRU DRIED FRUITS', NULL, NULL, 'E', 'FA', '1', '500301', 'FRU DRIED FRUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (33, '', 'EFA1500302', 'FTV CASH FRU Date Paste', NULL, NULL, 'E', 'FA', '1', '500302', 'FRU Date Paste', 'Food');
INSERT INTO `pma_gl_codes` VALUES (34, '', 'EFA1500303', 'FTV CASH FRU Freshs Fruit', NULL, NULL, 'E', 'FA', '1', '500303', 'FRU FRESH FRUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (35, '', 'EFA1500350', 'FTV CASH FSH FISH', NULL, NULL, 'E', 'FA', '1', '500350', 'FSH FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (36, '', 'EFA1500351', 'FTV CASH FSH CANNED FISH', NULL, NULL, 'E', 'FA', '1', '500351', 'FSH CANNED FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (37, '', 'EFA1500352', 'FTV CASH FSH DRIED FISH', NULL, NULL, 'E', 'FA', '1', '500352', 'FSH DRIED FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (38, '', 'EFA1500400', 'FTV CASH MEA MEAT', NULL, NULL, 'E', 'FA', '1', '500400', 'MEA MEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (39, '', 'EFA1500401', 'FTV CASH MEA CANNED BEEF', NULL, NULL, 'E', 'FA', '1', '500401', 'MEA CANNED BEEF', 'Food');
INSERT INTO `pma_gl_codes` VALUES (40, '', 'EFA1500402', 'FTV CASH MEA CANNED CHICKEN', NULL, NULL, 'E', 'FA', '1', '500402', 'MEA CANNED CHICKEN', 'Food');
INSERT INTO `pma_gl_codes` VALUES (41, '', 'EFA1500403', 'FTV CASH MEA CANNED MEAT', NULL, NULL, 'E', 'FA', '1', '500403', 'MEA CANNED MEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (42, '', 'EFA1500404', 'FTV CASH MEA MEAT FRESH', NULL, NULL, 'E', 'FA', '1', '500404', 'MEA MEAT FRESH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (43, '', 'EFA1500450', 'FTV CASH MIX MIXED AND BLENDED FOODS', NULL, NULL, 'E', 'FA', '1', '500450', 'MIX MIXED AND BLENDED FOODS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (44, '', 'EFA1500451', 'FTV CASH MIX BISCUITS', NULL, NULL, 'E', 'FA', '1', '500451', 'MIX BISCUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (45, '', 'EFA1500452', 'FTV CASH MIX BP5 EMERGENCY RATIONS', NULL, NULL, 'E', 'FA', '1', '500452', 'MIX BP5 EMERGENCY RATIONS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (46, '', 'EFA1500453', 'FTV CASH MIX CORN-SOYA BLEND (CSB)', NULL, NULL, 'E', 'FA', '1', '500453', 'MIX CORN-SOYA BLEND (CSB)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (47, '', 'EFA1500454', 'FTV CASH MIX FAFFA', NULL, NULL, 'E', 'FA', '1', '500454', 'MIX FAFFA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (48, '', 'EFA1500455', 'FTV CASH MIX INKA MIX', NULL, NULL, 'E', 'FA', '1', '500455', 'MIX INKA MIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (49, '', 'EFA1500456', 'FTV CASH MIX LIKUNI PHALA', NULL, NULL, 'E', 'FA', '1', '500456', 'MIX LIKUNI PHALA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (50, '', 'EFA1500457', 'FTV CASH MIX VITACEREAL', NULL, NULL, 'E', 'FA', '1', '500457', 'MIX VITACEREAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (51, '', 'EFA1500458', 'FTV CASH MIX CORN-SOYA MILK (CSM)', NULL, NULL, 'E', 'FA', '1', '500458', 'MIX CORN-SOYA MILK (CSM)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (52, '', 'EFA1500459', 'FTV CASH MIX WHEAT-SOYA BLEND (WSB)', NULL, NULL, 'E', 'FA', '1', '500459', 'MIX WHEAT-SOYA BLEND (WSB)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (53, '', 'EFA1500460', 'FTV CASH MIX INDIAMIX', NULL, NULL, 'E', 'FA', '1', '500460', 'MIX INDIAMIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (54, '', 'EFA1500461', 'FTV CASH MIX HIGH ENERGY BISCUITS', NULL, NULL, 'E', 'FA', '1', '500461', 'MIX HIGH ENERGY BISCUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (55, '', 'EFA1500462', 'FTV CASH MIX HIGH ENERGY SUPPLEMENTS', NULL, NULL, 'E', 'FA', '1', '500462', 'MIX HIGH ENERGY SUPPLEMENTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (56, '', 'EFA1500463', 'FTV CASH MIX LACTO-SOYA BLEND', NULL, NULL, 'E', 'FA', '1', '500463', 'MIX LACTO-SOYA BLEND', 'Food');
INSERT INTO `pma_gl_codes` VALUES (57, '', 'EFA1500464', 'FTV CASH MIX PEA WHEAT BLENDED', NULL, NULL, 'E', 'FA', '1', '500464', 'MIX PEA WHEAT BLENDED', 'Food');
INSERT INTO `pma_gl_codes` VALUES (58, '', 'EFA1500465', 'FTV CASH MIX RICE SOYA BLEND', NULL, NULL, 'E', 'FA', '1', '500465', 'MIX RICE SOYA BLEND', 'Food');
INSERT INTO `pma_gl_codes` VALUES (59, '', 'EFA1500466', 'FTV CASH MIX WHEAT-SOYA MILK (WSM)', NULL, NULL, 'E', 'FA', '1', '500466', 'MIX WHEAT-SOYA MILK (WSM)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (60, '', 'EFA1500467', 'FTV CASH MIX READY TO USE SUPPLEMENTARY FOOD', NULL, NULL, 'E', 'FA', '1', '500467', 'MIX READY TO USE SUPPLEMENTARY FOOD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (61, '', 'EFA1500468', 'FTV CASH MIX READY TO USE THERAPEUTIC FOOD', NULL, NULL, 'E', 'FA', '1', '500468', 'MIX READY TO USE THERAPEUTIC FOOD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (62, '', 'EFA1500500', 'FTV CASH MSC MISCELLANEOUS', NULL, NULL, 'E', 'FA', '1', '500500', 'MSC MISCELLANEOUS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (63, '', 'EFA1500501', 'FTV CASH MSC API', NULL, NULL, 'E', 'FA', '1', '500501', 'MSC API', 'Food');
INSERT INTO `pma_gl_codes` VALUES (64, '', 'EFA1500502', 'FTV CASH MSC HALAWA', NULL, NULL, 'E', 'FA', '1', '500502', 'MSC HALAWA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (65, '', 'EFA1500503', 'FTV CASH MSC IODISED SALT', NULL, NULL, 'E', 'FA', '1', '500503', 'MSC IODISED SALT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (66, '', 'EFA1500504', 'FTV CASH MSC NUTS', NULL, NULL, 'E', 'FA', '1', '500504', 'MSC NUTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (67, '', 'EFA1500505', 'FTV CASH MSC SUGAR', NULL, NULL, 'E', 'FA', '1', '500505', 'MSC SUGAR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (68, '', 'EFA1500506', 'FTV CASH MSC Micronutrition Powder', NULL, NULL, 'E', 'FA', '1', '500506', 'MSC Micronutrition Powder', 'Food');
INSERT INTO `pma_gl_codes` VALUES (69, '', 'EFA1500507', 'FTV CASH MSC YEAST', NULL, NULL, 'E', 'FA', '1', '500507', 'MSC YEAST', 'Food');
INSERT INTO `pma_gl_codes` VALUES (70, '', 'EFA1500508', 'FTV CASH MSC Micronutrient Tablets', NULL, NULL, 'E', 'FA', '1', '500508', 'MSC Micronutrient Tablets', 'Food');
INSERT INTO `pma_gl_codes` VALUES (71, '', 'EFA1500509', 'FTV CASH MSC SPICES', NULL, NULL, 'E', 'FA', '1', '500509', 'MSC SPICES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (72, '', 'EFA1500510', 'FTV CASH MSC CRACKERS', NULL, NULL, 'E', 'FA', '1', '500510', 'MSC CRACKERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (73, '', 'EFA1500511', 'FTV CASH MSC TOMATO', NULL, NULL, 'E', 'FA', '1', '500511', 'MSC TOMATO', 'Food');
INSERT INTO `pma_gl_codes` VALUES (74, '', 'EFA1500512', 'FTV CASH MSC STARCH', NULL, NULL, 'E', 'FA', '1', '500512', 'MSC STARCH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (75, '', 'EFA1500513', 'FTV CASH MSC EGGS', NULL, NULL, 'E', 'FA', '1', '500513', 'MSC EGGS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (76, '', 'EFA1500550', 'FTV CASH OIL OILS AND FATS', NULL, NULL, 'E', 'FA', '1', '500550', 'OIL OILS AND FATS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (77, '', 'EFA1500551', 'FTV CASH OIL BUTTER OIL', NULL, NULL, 'E', 'FA', '1', '500551', 'OIL BUTTER OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (78, '', 'EFA1500552', 'FTV CASH OIL GHEE', NULL, NULL, 'E', 'FA', '1', '500552', 'OIL GHEE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (79, '', 'EFA1500553', 'FTV CASH OIL OLIVE OIL', NULL, NULL, 'E', 'FA', '1', '500553', 'OIL OLIVE OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (80, '', 'EFA1500554', 'FTV CASH OIL VEGETABLE OIL', NULL, NULL, 'E', 'FA', '1', '500554', 'OIL VEGETABLE OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (81, '', 'EFA1500560', 'FTV CASH NUT PEANUT BUTTER', NULL, NULL, 'E', 'FA', '1', '500560', 'NUT PEANUT BUTTER', 'Food');
INSERT INTO `pma_gl_codes` VALUES (82, '', 'EFA1500600', 'FTV CASH PPF PRE-PACKAGED FOOD PARCELS', NULL, NULL, 'E', 'FA', '1', '500600', 'PPF PRE-PACKAGED FOOD PARCELS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (83, '', 'EFA1500601', 'FTV CASH PPF RATIONS', NULL, NULL, 'E', 'FA', '1', '500601', 'PPF RATIONS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (84, '', 'EFA1500650', 'FTV CASH TUB ROOTS AND TUBERS', NULL, NULL, 'E', 'FA', '1', '500650', 'TUB ROOTS AND TUBERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (85, '', 'EFA1500651', 'FTV CASH TUB CASSAVA FLOUR', NULL, NULL, 'E', 'FA', '1', '500651', 'TUB CASSAVA FLOUR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (86, '', 'EFA1500652', 'FTV CASH TUB POTATO FLAKES/GRANULES', NULL, NULL, 'E', 'FA', '1', '500652', 'TUB POTATO FLAKES/GRANULES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (87, '', 'EFA1500653', 'FTV CASH FRESH TUBERS', NULL, NULL, 'E', 'FA', '1', '500653', 'TUB FRESH TUBERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (88, '', 'EFA1500700', 'FTV CASH PUL PULSES AND VEGETABLES', NULL, NULL, 'E', 'FA', '1', '500700', 'PUL PULSES AND VEGETABLES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (89, '', 'EFA1500701', 'FTV CASH PUL BEANS', NULL, NULL, 'E', 'FA', '1', '500701', 'PUL BEANS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (90, '', 'EFA1500702', 'FTV CASH PUL CANNED PULSES', NULL, NULL, 'E', 'FA', '1', '500702', 'PUL CANNED PULSES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (91, '', 'EFA1500703', 'FTV CASH PUL CANNED VEGETABLES', NULL, NULL, 'E', 'FA', '1', '500703', 'PUL CANNED VEGETABLES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (92, '', 'EFA1500704', 'FTV CASH PUL LENTILS', NULL, NULL, 'E', 'FA', '1', '500704', 'PUL LENTILS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (93, '', 'EFA1500705', 'FTV CASH PUL PEAS', NULL, NULL, 'E', 'FA', '1', '500705', 'PUL PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (94, '', 'EFA1500706', 'FTV CASH PUL SPLIT PEAS', NULL, NULL, 'E', 'FA', '1', '500706', 'PUL SPLIT PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (95, '', 'EFA1500707', 'FTV CASH PUL TEXTURED SOY PROTEIN', NULL, NULL, 'E', 'FA', '1', '500707', 'PUL TEXTURED SOY PROTEIN', 'Food');
INSERT INTO `pma_gl_codes` VALUES (96, '', 'EFA1500708', 'FTV CASH PUL SPLIT LENTILS', NULL, NULL, 'E', 'FA', '1', '500708', 'PUL SPLIT LENTILS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (97, '', 'EFA1500709', 'FTV CASH PUL CHICK PEAS', NULL, NULL, 'E', 'FA', '1', '500709', 'PUL CHICK PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (98, '', 'EFA1500710', 'FTV CASH PUL VEGETABLES FRESH', NULL, NULL, 'E', 'FA', '1', '500710', 'PUL VEGETABLES FRESH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (99, '', 'EFA2500100', 'FTV_IK CER CEREALS AND GRAINS', NULL, NULL, 'E', 'FA', '2', '500100', 'CER CEREALS AND GRAINS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (100, '', 'EFA2500101', 'FTV_IK CER BARLEY', NULL, NULL, 'E', 'FA', '2', '500101', 'CER BARLEY', 'Food');
INSERT INTO `pma_gl_codes` VALUES (101, '', 'EFA2500102', 'FTV_IK CER BREAD', NULL, NULL, 'E', 'FA', '2', '500102', 'CER BREAD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (102, '', 'EFA2500103', 'FTV_IK CER BUCKWHEAT', NULL, NULL, 'E', 'FA', '2', '500103', 'CER BUCKWHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (103, '', 'EFA2500104', 'FTV_IK CER BULGUR WHEAT', NULL, NULL, 'E', 'FA', '2', '500104', 'CER BULGUR WHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (104, '', 'EFA2500105', 'FTV_IK CER MAIZE', NULL, NULL, 'E', 'FA', '2', '500105', 'CER MAIZE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (105, '', 'EFA2500106', 'FTV_IK CER MAIZE MEAL', NULL, NULL, 'E', 'FA', '2', '500106', 'CER MAIZE MEAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (106, '', 'EFA2500107', 'FTV_IK CER OAT', NULL, NULL, 'E', 'FA', '2', '500107', 'CER OAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (107, '', 'EFA2500108', 'FTV_IK CER PASTA', NULL, NULL, 'E', 'FA', '2', '500108', 'CER PASTA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (108, '', 'EFA2500109', 'FTV_IK CER QUINUA', NULL, NULL, 'E', 'FA', '2', '500109', 'CER QUINUA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (109, '', 'EFA2500110', 'FTV_IK CER RICE', NULL, NULL, 'E', 'FA', '2', '500110', 'CER RICE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (110, '', 'EFA2500111', 'FTV_IK CER SORGHUM/MILLET', NULL, NULL, 'E', 'FA', '2', '500111', 'CER SORGHUM/MILLET', 'Food');
INSERT INTO `pma_gl_codes` VALUES (111, '', 'EFA2500112', 'FTV_IK CER SOYA-FORTIFIED MAIZE MEAL', NULL, NULL, 'E', 'FA', '2', '500112', 'CER SOYA-FORTIFIED MAIZE MEAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (112, '', 'EFA2500113', 'FTV_IK CER WHEAT', NULL, NULL, 'E', 'FA', '2', '500113', 'CER WHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (113, '', 'EFA2500115', 'FTV_IK CER WHEAT FLOUR', NULL, NULL, 'E', 'FA', '2', '500115', 'CER WHEAT FLOUR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (114, '', 'EFA2500200', 'FTV_IK BEV BEVERAGES', NULL, NULL, 'E', 'FA', '2', '500200', 'BEV BEVERAGES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (115, '', 'EFA2500201', 'FTV_IK BEV BLACK TEA', NULL, NULL, 'E', 'FA', '2', '500201', 'BEV BLACK TEA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (116, '', 'EFA2500202', 'FTV_IK BEV COFFEE', NULL, NULL, 'E', 'FA', '2', '500202', 'BEV COFFEE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (117, '', 'EFA2500203', 'FTV_IK BEV FRUIT JUICE', NULL, NULL, 'E', 'FA', '2', '500203', 'BEV FRUIT JUICE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (118, '', 'EFA2500204', 'FTV_IK BEV MINERAL WATER', NULL, NULL, 'E', 'FA', '2', '500204', 'BEV MINERAL WATER', 'Food');
INSERT INTO `pma_gl_codes` VALUES (119, '', 'EFA2500205', 'FTV_IK BEVERAGE MIX', NULL, NULL, 'E', 'FA', '2', '500205', 'BEV BEVERAGE MIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (120, '', 'EFA2500250', 'FTV_IK DAI DAIRY PRODUCTS', NULL, NULL, 'E', 'FA', '2', '500250', 'DAI DAIRY PRODUCTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (121, '', 'EFA2500251', 'FTV_IK DAI CHEESE', NULL, NULL, 'E', 'FA', '2', '500251', 'DAI CHEESE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (122, '', 'EFA2500252', 'FTV_IK DAI DRIED WHOLE MILK', NULL, NULL, 'E', 'FA', '2', '500252', 'DAI DRIED WHOLE MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (123, '', 'EFA2500253', 'FTV_IK DAI ENRICHED DRIED SKIMMED MILK', NULL, NULL, 'E', 'FA', '2', '500253', 'DAI ENRICHED DRIED SKIMMED MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (124, '', 'EFA2500254', 'FTV_IK DAI INFANT FORMULA', NULL, NULL, 'E', 'FA', '2', '500254', 'DAI INFANT FORMULA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (125, '', 'EFA2500255', 'FTV_IK DAI PLAIN DRIED SKIMMED MILK', NULL, NULL, 'E', 'FA', '2', '500255', 'DAI PLAIN DRIED SKIMMED MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (126, '', 'EFA2500256', 'FTV_IK DAI THERAPEUTIC MILK', NULL, NULL, 'E', 'FA', '2', '500256', 'DAI THERAPEUTIC MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (127, '', 'EFA2500257', 'FTV_IK DAI UHT MILK', NULL, NULL, 'E', 'FA', '2', '500257', 'DAI UHT MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (128, '', 'EFA2500300', 'FTV_IK FRU FRUIT AND NUTS', NULL, NULL, 'E', 'FA', '2', '500300', 'FRU FRUIT AND NUTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (129, '', 'EFA2500301', 'FTV_IK FRU DRIED FRUITS', NULL, NULL, 'E', 'FA', '2', '500301', 'FRU DRIED FRUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (130, '', 'EFA2500302', 'FTV_IK FRU Date Paste', NULL, NULL, 'E', 'FA', '2', '500302', 'FRU Date Paste', 'Food');
INSERT INTO `pma_gl_codes` VALUES (131, '', 'EFA2500303', 'FTV_IK FRU Freshs Fruit', NULL, NULL, 'E', 'FA', '2', '500303', 'FRU FRESH FRUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (132, '', 'EFA2500350', 'FTV_IK FSH FISH', NULL, NULL, 'E', 'FA', '2', '500350', 'FSH FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (133, '', 'EFA2500351', 'FTV_IK FSH CANNED FISH', NULL, NULL, 'E', 'FA', '2', '500351', 'FSH CANNED FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (134, '', 'EFA2500352', 'FTV_IK FSH DRIED FISH', NULL, NULL, 'E', 'FA', '2', '500352', 'FSH DRIED FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (135, '', 'EFA2500400', 'FTV_IK MEA MEAT', NULL, NULL, 'E', 'FA', '2', '500400', 'MEA MEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (136, '', 'EFA2500401', 'FTV_IK MEA CANNED BEEF', NULL, NULL, 'E', 'FA', '2', '500401', 'MEA CANNED BEEF', 'Food');
INSERT INTO `pma_gl_codes` VALUES (137, '', 'EFA2500402', 'FTV_IK MEA CANNED CHICKEN', NULL, NULL, 'E', 'FA', '2', '500402', 'MEA CANNED CHICKEN', 'Food');
INSERT INTO `pma_gl_codes` VALUES (138, '', 'EFA2500403', 'FTV_IK MEA CANNED MEAT', NULL, NULL, 'E', 'FA', '2', '500403', 'MEA CANNED MEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (139, '', 'EFA2500404', 'FTV_IK MEA MEAT FRESH', NULL, NULL, 'E', 'FA', '2', '500404', 'MEA MEAT FRESH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (140, '', 'EFA2500450', 'FTV_IK MIX MIXED AND BLENDED FOODS', NULL, NULL, 'E', 'FA', '2', '500450', 'MIX MIXED AND BLENDED FOODS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (141, '', 'EFA2500451', 'FTV_IK MIX BISCUITS', NULL, NULL, 'E', 'FA', '2', '500451', 'MIX BISCUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (142, '', 'EFA2500452', 'FTV_IK MIX BP5 EMERGENCY RATIONS', NULL, NULL, 'E', 'FA', '2', '500452', 'MIX BP5 EMERGENCY RATIONS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (143, '', 'EFA2500453', 'FTV_IK MIX CORN-SOYA BLEND (CSB)', NULL, NULL, 'E', 'FA', '2', '500453', 'MIX CORN-SOYA BLEND (CSB)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (144, '', 'EFA2500454', 'FTV_IK MIX FAFFA', NULL, NULL, 'E', 'FA', '2', '500454', 'MIX FAFFA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (145, '', 'EFA2500455', 'FTV_IK MIX INKA MIX', NULL, NULL, 'E', 'FA', '2', '500455', 'MIX INKA MIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (146, '', 'EFA2500456', 'FTV_IK MIX LIKUNI PHALA', NULL, NULL, 'E', 'FA', '2', '500456', 'MIX LIKUNI PHALA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (147, '', 'EFA2500457', 'FTV_IK MIX VITACEREAL', NULL, NULL, 'E', 'FA', '2', '500457', 'MIX VITACEREAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (148, '', 'EFA2500458', 'FTV_IK MIX CORN-SOYA MILK (CSM)', NULL, NULL, 'E', 'FA', '2', '500458', 'MIX CORN-SOYA MILK (CSM)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (149, '', 'EFA2500459', 'FTV_IK MIX WHEAT-SOYA BLEND (WSB)', NULL, NULL, 'E', 'FA', '2', '500459', 'MIX WHEAT-SOYA BLEND (WSB)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (150, '', 'EFA2500460', 'FTV_IK MIX INDIAMIX', NULL, NULL, 'E', 'FA', '2', '500460', 'MIX INDIAMIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (151, '', 'EFA2500461', 'FTV_IK MIX HIGH ENERGY BISCUITS', NULL, NULL, 'E', 'FA', '2', '500461', 'MIX HIGH ENERGY BISCUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (152, '', 'EFA2500462', 'FTV_IK MIX HIGH ENERGY SUPPLEMENTS', NULL, NULL, 'E', 'FA', '2', '500462', 'MIX HIGH ENERGY SUPPLEMENTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (153, '', 'EFA2500463', 'FTV_IK MIX LACTO-SOYA BLEND', NULL, NULL, 'E', 'FA', '2', '500463', 'MIX LACTO-SOYA BLEND', 'Food');
INSERT INTO `pma_gl_codes` VALUES (154, '', 'EFA2500464', 'FTV_IK MIX PEA WHEAT BLENDED', NULL, NULL, 'E', 'FA', '2', '500464', 'MIX PEA WHEAT BLENDED', 'Food');
INSERT INTO `pma_gl_codes` VALUES (155, '', 'EFA2500465', 'FTV_IK MIX RICE SOYA BLEND', NULL, NULL, 'E', 'FA', '2', '500465', 'MIX RICE SOYA BLEND', 'Food');
INSERT INTO `pma_gl_codes` VALUES (156, '', 'EFA2500466', 'FTV_IK MIX WHEAT-SOYA MILK (WSM)', NULL, NULL, 'E', 'FA', '2', '500466', 'MIX WHEAT-SOYA MILK (WSM)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (157, '', 'EFA2500467', 'FTV_IK MIX READY TO USE SUPPLEMENTARY FOOD', NULL, NULL, 'E', 'FA', '2', '500467', 'MIX READY TO USE SUPPLEMENTARY FOOD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (158, '', 'EFA2500468', 'FTV_IK MIX READY TO USE THERAPEUTIC FOOD', NULL, NULL, 'E', 'FA', '2', '500468', 'MIX READY TO USE THERAPEUTIC FOOD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (159, '', 'EFA2500500', 'FTV_IK MSC MISCELLANEOUS', NULL, NULL, 'E', 'FA', '2', '500500', 'MSC MISCELLANEOUS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (160, '', 'EFA2500501', 'FTV_IK MSC API', NULL, NULL, 'E', 'FA', '2', '500501', 'MSC API', 'Food');
INSERT INTO `pma_gl_codes` VALUES (161, '', 'EFA2500502', 'FTV_IK MSC HALAWA', NULL, NULL, 'E', 'FA', '2', '500502', 'MSC HALAWA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (162, '', 'EFA2500503', 'FTV_IK MSC IODISED SALT', NULL, NULL, 'E', 'FA', '2', '500503', 'MSC IODISED SALT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (163, '', 'EFA2500504', 'FTV_IK MSC NUTS', NULL, NULL, 'E', 'FA', '2', '500504', 'MSC NUTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (164, '', 'EFA2500505', 'FTV_IK MSC SUGAR', NULL, NULL, 'E', 'FA', '2', '500505', 'MSC SUGAR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (165, '', 'EFA2500506', 'FTV_IK MSC Micronutrition Powder', NULL, NULL, 'E', 'FA', '2', '500506', 'MSC Micronutrition Powder', 'Food');
INSERT INTO `pma_gl_codes` VALUES (166, '', 'EFA2500507', 'FTV_IK MSC YEAST', NULL, NULL, 'E', 'FA', '2', '500507', 'MSC YEAST', 'Food');
INSERT INTO `pma_gl_codes` VALUES (167, '', 'EFA2500508', 'FTV_IK MSC Micronutrient Tablets', NULL, NULL, 'E', 'FA', '2', '500508', 'MSC Micronutrient Tablets', 'Food');
INSERT INTO `pma_gl_codes` VALUES (168, '', 'EFA2500509', 'FTV_IK MSC SPICES', NULL, NULL, 'E', 'FA', '2', '500509', 'MSC SPICES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (169, '', 'EFA2500510', 'FTV_IK MSC CRACKERS', NULL, NULL, 'E', 'FA', '2', '500510', 'MSC CRACKERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (170, '', 'EFA2500511', 'FTV_IK MSC TOMATO', NULL, NULL, 'E', 'FA', '2', '500511', 'MSC TOMATO', 'Food');
INSERT INTO `pma_gl_codes` VALUES (171, '', 'EFA2500512', 'FTV_IK MSC STARCH', NULL, NULL, 'E', 'FA', '2', '500512', 'MSC STARCH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (172, '', 'EFA2500513', 'FTV_IK MSC EGGS', NULL, NULL, 'E', 'FA', '2', '500513', 'MSC EGGS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (173, '', 'EFA2500550', 'FTV_IK OIL OILS AND FATS', NULL, NULL, 'E', 'FA', '2', '500550', 'OIL OILS AND FATS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (174, '', 'EFA2500551', 'FTV_IK OIL BUTTER OIL', NULL, NULL, 'E', 'FA', '2', '500551', 'OIL BUTTER OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (175, '', 'EFA2500552', 'FTV_IK OIL GHEE', NULL, NULL, 'E', 'FA', '2', '500552', 'OIL GHEE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (176, '', 'EFA2500553', 'FTV_IK OIL OLIVE OIL', NULL, NULL, 'E', 'FA', '2', '500553', 'OIL OLIVE OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (177, '', 'EFA2500554', 'FTV_IK OIL VEGETABLE OIL', NULL, NULL, 'E', 'FA', '2', '500554', 'OIL VEGETABLE OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (178, '', 'EFA2500560', 'FTV_IK NUT PEANUT BUTTER', NULL, NULL, 'E', 'FA', '2', '500560', 'NUT PEANUT BUTTER', 'Food');
INSERT INTO `pma_gl_codes` VALUES (179, '', 'EFA2500600', 'FTV_IK PPF PRE-PACKAGED FOOD PARCELS', NULL, NULL, 'E', 'FA', '2', '500600', 'PPF PRE-PACKAGED FOOD PARCELS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (180, '', 'EFA2500601', 'FTV_IK PPF RATIONS', NULL, NULL, 'E', 'FA', '2', '500601', 'PPF RATIONS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (181, '', 'EFA2500650', 'FTV_IK TUB ROOTS AND TUBERS', NULL, NULL, 'E', 'FA', '2', '500650', 'TUB ROOTS AND TUBERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (182, '', 'EFA2500651', 'FTV_IK TUB CASSAVA FLOUR', NULL, NULL, 'E', 'FA', '2', '500651', 'TUB CASSAVA FLOUR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (183, '', 'EFA2500652', 'FTV_IK TUB POTATO FLAKES/GRANULES', NULL, NULL, 'E', 'FA', '2', '500652', 'TUB POTATO FLAKES/GRANULES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (184, '', 'EFA2500653', 'FTV_IK FRESH TUBERS', NULL, NULL, 'E', 'FA', '2', '500653', 'TUB FRESH TUBERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (185, '', 'EFA2500700', 'FTV_IK PUL PULSES AND VEGETABLES', NULL, NULL, 'E', 'FA', '2', '500700', 'PUL PULSES AND VEGETABLES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (186, '', 'EFA2500701', 'FTV_IK PUL BEANS', NULL, NULL, 'E', 'FA', '2', '500701', 'PUL BEANS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (187, '', 'EFA2500702', 'FTV_IK PUL CANNED PULSES', NULL, NULL, 'E', 'FA', '2', '500702', 'PUL CANNED PULSES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (188, '', 'EFA2500703', 'FTV_IK PUL CANNED VEGETABLES', NULL, NULL, 'E', 'FA', '2', '500703', 'PUL CANNED VEGETABLES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (189, '', 'EFA2500704', 'FTV_IK PUL LENTILS', NULL, NULL, 'E', 'FA', '2', '500704', 'PUL LENTILS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (190, '', 'EFA2500705', 'FTV_IK PUL PEAS', NULL, NULL, 'E', 'FA', '2', '500705', 'PUL PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (191, '', 'EFA2500706', 'FTV_IK PUL SPLIT PEAS', NULL, NULL, 'E', 'FA', '2', '500706', 'PUL SPLIT PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (192, '', 'EFA2500707', 'FTV_IK PUL TEXTURED SOY PROTEIN', NULL, NULL, 'E', 'FA', '2', '500707', 'PUL TEXTURED SOY PROTEIN', 'Food');
INSERT INTO `pma_gl_codes` VALUES (193, '', 'EFA2500708', 'FTV_IK PUL SPLIT LENTILS', NULL, NULL, 'E', 'FA', '2', '500708', 'PUL SPLIT LENTILS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (194, '', 'EFA2500709', 'FTV_IK PUL CHICK PEAS', NULL, NULL, 'E', 'FA', '2', '500709', 'PUL CHICK PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (195, '', 'EFA2500710', 'FTV_IK PUL VEGETABLES FRESH', NULL, NULL, 'E', 'FA', '2', '500710', 'PUL VEGETABLES FRESH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (196, '', 'EFB12100210', 'OTH Food Expense-Food Transformation', NULL, NULL, 'E', 'FB', '1', '2100210', 'Expense-Food Transformation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (197, '', 'EFB13007000', 'Other In-Country Costs', NULL, NULL, 'E', 'FB', '1', '3007000', 'Other In-Country Costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (198, '', 'EFB13008400', 'Other Overland costs non cap costs', NULL, NULL, 'E', 'FB', '1', '3008400', 'Other Overland costs non cap costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (199, '', 'EFB13008500', 'FTC Other LESS Recovery Costs', NULL, NULL, 'E', 'FB', '1', '3008500', 'LESS Recovery Costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (200, '', 'EFB13101000', 'OTH Food Insurance Premium - Premium to Self Insur', NULL, NULL, 'E', 'FB', '1', '3101000', 'Insurance Premium - Premium to Self Insurance Fund', 'Food');
INSERT INTO `pma_gl_codes` VALUES (201, '', 'EFB1582600', 'ODOC LESS Cash Milling Clearing Account', NULL, NULL, 'E', 'FB', '1', '582600', 'LESS- Milling Clearing Account', 'Food');
INSERT INTO `pma_gl_codes` VALUES (202, '', 'EFB1582650', 'ODOC LESS Cash Transformation Clearing', NULL, NULL, 'E', 'FB', '1', '582650', 'LESS- Transformation Clearing Account', 'Food');
INSERT INTO `pma_gl_codes` VALUES (203, '', 'EFB1583300', 'GCMF-Other Food related costs', NULL, NULL, 'E', 'FB', '1', '583300', 'GCMF-Other Food related costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (204, '', 'EFB17201000', 'OTH Internal Services provided - UNHRD', NULL, NULL, 'E', 'FB', '1', '7201000', 'Internal Services provided - UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (205, '', 'EFB17211000', 'GCMF-Sales other port costs', NULL, NULL, 'E', 'FB', '1', '7211000', 'GCMF-Sales other port costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (206, '', 'EFB17302000', 'OTH Food Quality and Quantity Survey', NULL, NULL, 'E', 'FB', '1', '7302000', 'Quality and Quantity Survey', 'Food');
INSERT INTO `pma_gl_codes` VALUES (207, '', 'EFB17303000', 'OTH Food Superintendence', NULL, NULL, 'E', 'FB', '1', '7303000', 'Superintendence', 'Food');
INSERT INTO `pma_gl_codes` VALUES (208, '', 'EFB22100210', 'OTH Food Expense-Food Transformation (IK)', NULL, NULL, 'E', 'FB', '2', '2100210', 'Expense-Food Transformation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (209, '', 'EFC13103000', 'FTC EXTR Insurance Premium - Charterer\'s Liability', NULL, NULL, 'E', 'FC', '1', '3103000', 'Insurance Premium - Charterer\'s Liability', 'Food');
INSERT INTO `pma_gl_codes` VALUES (210, '', 'EFC13104000', 'FTC EXTR Insurance Premium - War Risk', NULL, NULL, 'E', 'FC', '1', '3104000', 'Insurance Premium - War Risk', 'Food');
INSERT INTO `pma_gl_codes` VALUES (211, '', 'EFC1580300', 'Ext. Transp. Stevedoring Clear Acct', NULL, NULL, 'E', 'FC', '1', '580300', 'Inventory - Ex Transp Stevedoring Clearing Acct', 'Food');
INSERT INTO `pma_gl_codes` VALUES (212, '', 'EFC1580900', 'Inventory - Ex Transp Feight Clear Acct - Air', NULL, NULL, 'E', 'FC', '1', '580900', 'Inventory - Ex Transp Feight Clear Acct - Air', 'Food');
INSERT INTO `pma_gl_codes` VALUES (213, '', 'EFC1582000', 'LES External Transport Cash Freight - Ocean', NULL, NULL, 'E', 'FC', '1', '582000', 'LESS- Ext Trans Freight Clrg Acct – OCEAN', 'Food');
INSERT INTO `pma_gl_codes` VALUES (214, '', 'EFC1582100', 'LESS – Ext Trans Freight Clrg Acct – Overland', NULL, NULL, 'E', 'FC', '1', '582100', 'LESS – Ext Trans Freight Clrg Acct – Overland', 'Food');
INSERT INTO `pma_gl_codes` VALUES (215, '', 'EFC1582200', 'LES External Transport Cash Freight - Air', NULL, NULL, 'E', 'FC', '1', '582200', 'LESS- Ext Trans Freight Clrg Acct – AIR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (216, '', 'EFC1583100', 'GCMF-External Transport costs', NULL, NULL, 'E', 'FC', '1', '583100', 'GCMF-External Transport costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (217, '', 'EFC17201000', 'FTC EXTR Internal Services provided - UNHRD', NULL, NULL, 'E', 'FC', '1', '7201000', 'Internal Services provided - UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (218, '', 'EFC17204000', 'FTC EXTR Internal Service Fee (MCR) - Aviation', NULL, NULL, 'E', 'FC', '1', '7204000', 'Internal Service Fee (MCR) - Aviation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (219, '', 'EFC17205000', 'FTC EXTR Internal Services provided - Aviation', NULL, NULL, 'E', 'FC', '1', '7205000', 'Internal Services provided - Aviation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (220, '', 'EFC17305000', 'FTC EXTR Transport Ocean Cargo Handling', NULL, NULL, 'E', 'FC', '1', '7305000', 'Transport Ocean Cargo Handling', 'Food');
INSERT INTO `pma_gl_codes` VALUES (221, '', 'EFC17306000', 'FTC EXTR Transport Ocean Agency Fees', NULL, NULL, 'E', 'FC', '1', '7306000', 'Transport Ocean Agency Fees', 'Food');
INSERT INTO `pma_gl_codes` VALUES (222, '', 'EFC17307000', 'FTC EXTR Transport OC Container Demurrage', NULL, NULL, 'E', 'FC', '1', '7307000', 'Transport OC Container Demurrage', 'Food');
INSERT INTO `pma_gl_codes` VALUES (223, '', 'EFC17308000', 'FTC EXTR Transport Ocean Demurrage, Discharge, Not', NULL, NULL, 'E', 'FC', '1', '7308000', 'Transport Ocean Demurrage, Discharge, Not Recover', 'Food');
INSERT INTO `pma_gl_codes` VALUES (224, '', 'EFC17309000', 'FTC EXTR Transport Ocean Demurrage, Discharge, Rec', NULL, NULL, 'E', 'FC', '1', '7309000', 'Transport Ocean Demurrage, Discharge, Recoverable', 'Food');
INSERT INTO `pma_gl_codes` VALUES (225, '', 'EFC17310000', 'FTC EXTR Transport Ocean Demurrage, Loading, Not R', NULL, NULL, 'E', 'FC', '1', '7310000', 'Transport Ocean Demurrage, Loading, Not Recover', 'Food');
INSERT INTO `pma_gl_codes` VALUES (226, '', 'EFC17311000', 'FTC EXTR Transport Ocean Demurrage, Loading, Recov', NULL, NULL, 'E', 'FC', '1', '7311000', 'Transport Ocean Demurrage, Loading, Recoverable', 'Food');
INSERT INTO `pma_gl_codes` VALUES (227, '', 'EFC17312000', 'FTC EXTR Transport & Other Related Ocean', NULL, NULL, 'E', 'FC', '1', '7312000', 'Transport & Other Related Ocean', 'Food');
INSERT INTO `pma_gl_codes` VALUES (228, '', 'EFC17313000', 'FTC EXTR Transport Overland Related Services', NULL, NULL, 'E', 'FC', '1', '7313000', 'Transport Overland Related Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (229, '', 'EFC17314000', 'FTC EXTR Transport Overland Demurrage', NULL, NULL, 'E', 'FC', '1', '7314000', 'Transport Overland Demurrage', 'Food');
INSERT INTO `pma_gl_codes` VALUES (230, '', 'EFC17315000', 'FTC EXTR Transport Overland Cargo Handling', NULL, NULL, 'E', 'FC', '1', '7315000', 'Transport Overland Cargo Handling', 'Food');
INSERT INTO `pma_gl_codes` VALUES (231, '', 'EFC17510130', 'FTC EXTR Demurrage and Despatch Expense Adjustment', NULL, NULL, 'E', 'FC', '1', '7510130', 'Demurrage and Despatch Expense Adjustment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (232, '', 'EFC2582000', 'LES Exter.Transp In-Kind Freight - Ocean', NULL, NULL, 'E', 'FC', '2', '582000', 'LESS – Ext Trans Freight Clrg Acct – OCEAN', 'Food');
INSERT INTO `pma_gl_codes` VALUES (233, '', 'EFC2582100', 'LESS – ET In-Kind Freight Clrg Acct – Overland', NULL, NULL, 'E', 'FC', '2', '582100', 'LESS – Ext Trans Freight Clrg Acct – OVLD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (234, '', 'EFC2582200', 'LES ET In-Kind Freight - Air', NULL, NULL, 'E', 'FC', '2', '582200', 'LESS – Ext Trans Freight Clrg Acct – AIR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (235, '', 'EFD13002000', 'In-Country Landside Transport', NULL, NULL, 'E', 'FD', '1', '3002000', 'Landside Transport', 'Food');
INSERT INTO `pma_gl_codes` VALUES (236, '', 'EFD13003000', 'InCo Air Transport', NULL, NULL, 'E', 'FD', '1', '3003000', 'Air Transport', 'Food');
INSERT INTO `pma_gl_codes` VALUES (237, '', 'EFD13200000', 'IC-TR AirOps - Aircraft contract/charter', NULL, NULL, 'E', 'FD', '1', '3200000', 'AirOps - Aircraft contract/charter', 'Food');
INSERT INTO `pma_gl_codes` VALUES (238, '', 'EFD13201000', 'IC-TR AirOps - Aircraft operational support servic', NULL, NULL, 'E', 'FD', '1', '3201000', 'AirOps - Aircraft operational support services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (239, '', 'EFD13202000', 'IC-TR AirOps - Aircraft painting', NULL, NULL, 'E', 'FD', '1', '3202000', 'AirOps - Aircraft painting', 'Food');
INSERT INTO `pma_gl_codes` VALUES (240, '', 'EFD13203000', 'IC-TR AirOps - Aircraft Position & Deposition Char', NULL, NULL, 'E', 'FD', '1', '3203000', 'AirOps - Aircraft Position & Deposition Charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (241, '', 'EFD13204000', 'IC-TR AirOps - Aviation fuel', NULL, NULL, 'E', 'FD', '1', '3204000', 'AirOps - Aviation fuel', 'Food');
INSERT INTO `pma_gl_codes` VALUES (242, '', 'EFD13205000', 'IC-TR AirOps - Aviation Oil & Lubricants', NULL, NULL, 'E', 'FD', '1', '3205000', 'AirOps - Aviation Oil & Lubricants', 'Food');
INSERT INTO `pma_gl_codes` VALUES (243, '', 'EFD13207000', 'IC-TR AirOps - Aircraft navigation charges', NULL, NULL, 'E', 'FD', '1', '3207000', 'AirOps - Aircraft navigation charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (244, '', 'EFD13208000', 'IC-TR AirOps - Aircraft overflight, landing & park', NULL, NULL, 'E', 'FD', '1', '3208000', 'AirOps - Aircraft overflight, landing & parking', 'Food');
INSERT INTO `pma_gl_codes` VALUES (245, '', 'EFD13209000', 'IC-TR AirOps - Cargo Storage & miscellaneous', NULL, NULL, 'E', 'FD', '1', '3209000', 'AirOps - Cargo Storage & miscellaneous', 'Food');
INSERT INTO `pma_gl_codes` VALUES (246, '', 'EFD13210000', 'IC-TR AirOps - Aircraft ground handling', NULL, NULL, 'E', 'FD', '1', '3210000', 'AirOps - Aircraft ground handling', 'Food');
INSERT INTO `pma_gl_codes` VALUES (247, '', 'EFD13211000', 'IC-TR AirOps - Passenger handling charges', NULL, NULL, 'E', 'FD', '1', '3211000', 'AirOps - Passenger handling charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (248, '', 'EFD13212000', 'IC-TR AirOps - Cargo handling charges', NULL, NULL, 'E', 'FD', '1', '3212000', 'AirOps - Cargo handling charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (249, '', 'EFD13213000', 'IC-TR AirOps - In-Flight Catering', NULL, NULL, 'E', 'FD', '1', '3213000', 'AirOps - In-Flight Catering', 'Food');
INSERT INTO `pma_gl_codes` VALUES (250, '', 'EFD13214000', 'IC-TR AirOps - War risk insurance', NULL, NULL, 'E', 'FD', '1', '3214000', 'AirOps - War risk insurance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (251, '', 'EFD13215000', 'IC-TR AirOps - Aircrew accomodation, meal & transp', NULL, NULL, 'E', 'FD', '1', '3215000', 'AirOps - Aircrew accomodation, meal & transport', 'Food');
INSERT INTO `pma_gl_codes` VALUES (252, '', 'EFD13216000', 'IC-TR AirOps - Airport Construction Services', NULL, NULL, 'E', 'FD', '1', '3216000', 'AirOps - Airport Construction Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (253, '', 'EFD13217000', 'IC-TR AirOps - Air Tracking Charges', NULL, NULL, 'E', 'FD', '1', '3217000', 'AirOps - Air Tracking Charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (254, '', 'EFD16000500', 'IC-TR Supplies & Materials-Warehous & Workshop Equipment', NULL, NULL, 'E', 'FD', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (255, '', 'EFD17055000', 'IC-TR Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'FD', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (256, '', 'EFD17201000', 'IC-Tr Internal Services provided - UNHRD', NULL, NULL, 'E', 'FD', '1', '7201000', 'Internal Services provided - UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (257, '', 'EFD17204000', 'IC-Tr Internal Service Fee (MCR) - Aviation', NULL, NULL, 'E', 'FD', '1', '7204000', 'Internal Service Fee (MCR) - Aviation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (258, '', 'EFD17205000', 'IC-TR Internal Services provided - Aviation', NULL, NULL, 'E', 'FD', '1', '7205000', 'Internal Services provided - Aviation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (259, '', 'EFD17209100', 'IC-Tr Internal Logistics SA Serv Stand by costs', NULL, NULL, 'E', 'FD', '1', '7209100', 'Logistics SA Internal Serv Stand by costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (260, '', 'EFD17209200', 'IC-Tr Internal Logist SA Serv Deployment costs', NULL, NULL, 'E', 'FD', '1', '7209200', 'Logistics SA Internal Serv Deployment costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (261, '', 'EFD17210000', 'InCo GCMF-Sales Transport costs', NULL, NULL, 'E', 'FD', '1', '7210000', 'GCMF-Sales Transport costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (262, '', 'EFD1730800', 'IC-TR Workshop & Warehouse Equipment', NULL, NULL, 'E', 'FD', '1', '730800', 'Workshop & Warehouse Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (263, '', 'EFE13008100', 'OVLD Landside Transport non cap costs', NULL, NULL, 'E', 'FE', '1', '3008100', 'Landside Transport non cap costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (264, '', 'EFE13008200', 'OVLD Air Tranport non capitalized costs', NULL, NULL, 'E', 'FE', '1', '3008200', 'Air Tranport non capitalized costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (265, '', 'EFE13200000', 'OV-TR AirOps - Aircraft contract/charter', NULL, NULL, 'E', 'FE', '1', '3200000', 'AirOps - Aircraft contract/charter', 'Food');
INSERT INTO `pma_gl_codes` VALUES (266, '', 'EFE13201000', 'OV-TR AirOps - Aircraft operational support servic', NULL, NULL, 'E', 'FE', '1', '3201000', 'AirOps - Aircraft operational support services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (267, '', 'EFE13202000', 'OV-TR AirOps - Aircraft painting', NULL, NULL, 'E', 'FE', '1', '3202000', 'AirOps - Aircraft painting', 'Food');
INSERT INTO `pma_gl_codes` VALUES (268, '', 'EFE13203000', 'OV-TR AirOps - Aircraft Position & Deposition Char', NULL, NULL, 'E', 'FE', '1', '3203000', 'AirOps - Aircraft Position & Deposition Charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (269, '', 'EFE13204000', 'OV-TR AirOps - Aviation fuel', NULL, NULL, 'E', 'FE', '1', '3204000', 'AirOps - Aviation fuel', 'Food');
INSERT INTO `pma_gl_codes` VALUES (270, '', 'EFE13205000', 'OV-TR AirOps - Aviation Oil & Lubricants', NULL, NULL, 'E', 'FE', '1', '3205000', 'AirOps - Aviation Oil & Lubricants', 'Food');
INSERT INTO `pma_gl_codes` VALUES (271, '', 'EFE13207000', 'OV-TR AirOps - Aircraft navigation charges', NULL, NULL, 'E', 'FE', '1', '3207000', 'AirOps - Aircraft navigation charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (272, '', 'EFE13208000', 'OV-TR AirOps - Aircraft overflight, landing & park', NULL, NULL, 'E', 'FE', '1', '3208000', 'AirOps - Aircraft overflight, landing & parking', 'Food');
INSERT INTO `pma_gl_codes` VALUES (273, '', 'EFE13209000', 'OV-TR AirOps - Cargo Storage & miscellaneous', NULL, NULL, 'E', 'FE', '1', '3209000', 'AirOps - Cargo Storage & miscellaneous', 'Food');
INSERT INTO `pma_gl_codes` VALUES (274, '', 'EFE13210000', 'OV-TR AirOps - Aircraft ground handling', NULL, NULL, 'E', 'FE', '1', '3210000', 'AirOps - Aircraft ground handling', 'Food');
INSERT INTO `pma_gl_codes` VALUES (275, '', 'EFE13211000', 'OV-TR AirOps - Passenger handling charges', NULL, NULL, 'E', 'FE', '1', '3211000', 'AirOps - Passenger handling charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (276, '', 'EFE13212000', 'OV-TR AirOps - Cargo handling charges', NULL, NULL, 'E', 'FE', '1', '3212000', 'AirOps - Cargo handling charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (277, '', 'EFE13213000', 'OV-TR AirOps - In-Flight Catering', NULL, NULL, 'E', 'FE', '1', '3213000', 'AirOps - In-Flight Catering', 'Food');
INSERT INTO `pma_gl_codes` VALUES (278, '', 'EFE13214000', 'OV-TR AirOps - War risk insurance', NULL, NULL, 'E', 'FE', '1', '3214000', 'AirOps - War risk insurance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (279, '', 'EFE13215000', 'OV-TR AirOps - Aircrew accomodation, meal & transp', NULL, NULL, 'E', 'FE', '1', '3215000', 'AirOps - Aircrew accomodation, meal & transport', 'Food');
INSERT INTO `pma_gl_codes` VALUES (280, '', 'EFE13216000', 'OV-TR AirOps - Airport Construction Services', NULL, NULL, 'E', 'FE', '1', '3216000', 'AirOps - Airport Construction Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (281, '', 'EFE13217000', 'OV-TR AirOps - Air Tracking Charges', NULL, NULL, 'E', 'FE', '1', '3217000', 'AirOps - Air Tracking Charges', 'Food');
INSERT INTO `pma_gl_codes` VALUES (282, '', 'EFE1582300', 'LESS – Overland Freight Clrg Acct', NULL, NULL, 'E', 'FE', '1', '582300', 'LESS – Overland Freight Clrg Acct', 'Food');
INSERT INTO `pma_gl_codes` VALUES (283, '', 'EFE1582400', 'LESS – Overland Freight Clrg Acct – AIR', NULL, NULL, 'E', 'FE', '1', '582400', 'LESS – Overland Freight Clrg Acct – AIR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (284, '', 'EFE1583200', 'GCMF-Overland Transport costs', NULL, NULL, 'E', 'FE', '1', '583200', 'GCMF-Overland Transport costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (285, '', 'EFE17055000', 'OV-TR Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'FE', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (286, '', 'EFE17201000', 'OV-Tr Internal Services provided - UNHRD', NULL, NULL, 'E', 'FE', '1', '7201000', 'Internal Services provided - UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (287, '', 'EFE17204000', 'OV-Tr Internal Service Fee (MCR) - Aviation', NULL, NULL, 'E', 'FE', '1', '7204000', 'Internal Service Fee (MCR) - Aviation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (288, '', 'EFE17205000', 'OV-TR Internal Services provided - Aviation', NULL, NULL, 'E', 'FE', '1', '7205000', 'Internal Services provided - Aviation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (289, '', 'EFE17314000', 'Transport Overland Demurrage', NULL, NULL, 'E', 'FE', '1', '7314000', 'Transport Overland Demurrage', 'Food');
INSERT INTO `pma_gl_codes` VALUES (290, '', 'EFF13004000', 'InCo Transhipment Point costs non cap costs', NULL, NULL, 'E', 'FF', '1', '3004000', 'Transhipment Point costs non cap costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (291, '', 'EFF13005000', 'InCo EDP Operations non capitalized costs', NULL, NULL, 'E', 'FF', '1', '3005000', 'EDP Operations non capitalized costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (292, 'X', 'EFF16000200', 'IC-Stor Supplies & Materials-Security and safety e', NULL, NULL, 'E', 'FF', '1', '6000200', 'Supplies & Materials-Security and safety equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (293, '', 'EFF16000500', 'IC-Stor Supplies & Materials-Warehous & Workshop E', NULL, NULL, 'E', 'FF', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (294, '', 'EFF16000550', 'IC-Stor Supplies & Materials- Buildings Permanent/', NULL, NULL, 'E', 'FF', '1', '6000550', 'Supplies & Materials- Buildings Permanent/Mobile', 'Food');
INSERT INTO `pma_gl_codes` VALUES (295, '', 'EFF16505000', 'IC-Stor Warehouse - Packaging Materials', NULL, NULL, 'E', 'FF', '1', '6505000', 'Warehouse - Packaging Materials', 'Food');
INSERT INTO `pma_gl_codes` VALUES (296, '', 'EFF16600000', 'IC-Stor Utilities - General', NULL, NULL, 'E', 'FF', '1', '6600000', 'Utilities - General', 'Food');
INSERT INTO `pma_gl_codes` VALUES (297, '', 'EFF16601000', 'IC-Stor Utilities - Gas', NULL, NULL, 'E', 'FF', '1', '6601000', 'Utilities - Gas', 'Food');
INSERT INTO `pma_gl_codes` VALUES (298, '', 'EFF16602000', 'IC-Stor Utilities - Water', NULL, NULL, 'E', 'FF', '1', '6602000', 'Utilities - Water', 'Food');
INSERT INTO `pma_gl_codes` VALUES (299, '', 'EFF16603000', 'IC-Stor Utilities - Electricity', NULL, NULL, 'E', 'FF', '1', '6603000', 'Utilities - Electricity', 'Food');
INSERT INTO `pma_gl_codes` VALUES (300, '', 'EFF16604000', 'IC-Stor Office Supplies & Other Consumables', NULL, NULL, 'E', 'FF', '1', '6604000', 'Office Supplies & Other Consumables', 'Food');
INSERT INTO `pma_gl_codes` VALUES (301, '', 'EFF16605100', 'IC- Stor Fuel: Facilities', NULL, NULL, 'E', 'FF', '1', '6605100', 'Fuel: Facilities', 'Food');
INSERT INTO `pma_gl_codes` VALUES (302, '', 'EFF16606100', 'IC-Stor Insectisides, Fumigants and other related ', NULL, NULL, 'E', 'FF', '1', '6606100', 'Insectisides, Fumigants and other related products', 'Food');
INSERT INTO `pma_gl_codes` VALUES (303, '', 'EFF17001000', 'IC-Stor Rental of Facility', NULL, NULL, 'E', 'FF', '1', '7001000', 'Rental of Facility', 'Food');
INSERT INTO `pma_gl_codes` VALUES (304, '', 'EFF17002000', 'IC-Stor UN Common Premises Rental', NULL, NULL, 'E', 'FF', '1', '7002000', 'UN Common Premises Rental', 'Food');
INSERT INTO `pma_gl_codes` VALUES (305, '', 'EFF17022000', 'IC-Stor Insurance Public Liability and Premises', NULL, NULL, 'E', 'FF', '1', '7022000', 'Insurance Public Liability and Premises', 'Food');
INSERT INTO `pma_gl_codes` VALUES (306, '', 'EFF17050000', 'IC-Stor Equipment Repairs and Maintenance', NULL, NULL, 'E', 'FF', '1', '7050000', 'Equipment Repairs and Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (307, '', 'EFF17051000', 'IC-Stor Ordinary Premises Maintenance', NULL, NULL, 'E', 'FF', '1', '7051000', 'Ordinary Premises Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (308, '', 'EFF17052000', 'IC-Stor Extraordinary Premises Maintenance', NULL, NULL, 'E', 'FF', '1', '7052000', 'Extraordinary Premises Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (309, '', 'EFF17054000', 'IC-Stor - Office Cleaning', NULL, NULL, 'E', 'FF', '1', '7054000', 'Office Cleaning', 'Food');
INSERT INTO `pma_gl_codes` VALUES (310, '', 'EFF17100100', 'IC-Stor Equipment Leasing', NULL, NULL, 'E', 'FF', '1', '7100100', 'Equipment Leasing', 'Food');
INSERT INTO `pma_gl_codes` VALUES (311, '', 'EFF17102000', 'IC-Stor Other Office Expenses & Services (WFP Only', NULL, NULL, 'E', 'FF', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (312, '', 'EFF17118000', 'IC-Stor Security Guard Services ', NULL, NULL, 'E', 'FF', '1', '7118000', 'Security Guard Services ', 'Food');
INSERT INTO `pma_gl_codes` VALUES (313, '', 'EFF17119500', 'IC-Stor Fumigation Services', NULL, NULL, 'E', 'FF', '1', '7119500', 'Fumigation Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (314, '', 'EFF17201000', 'IC-Stor Internal Services provided - UNHRD', NULL, NULL, 'E', 'FF', '1', '7201000', 'Internal Services provided - UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (315, '', 'EFF17213000', 'IC-Stor GCMF - Storage', NULL, NULL, 'E', 'FF', '1', '7213000', 'GCMF - Storage', 'Food');
INSERT INTO `pma_gl_codes` VALUES (316, '', 'EFF1730100', 'IC-Stor Buildings - permanent', NULL, NULL, 'E', 'FF', '1', '730100', 'Buildings - permanent', 'Food');
INSERT INTO `pma_gl_codes` VALUES (317, '', 'EFF1730200', 'IC-Stor Buildings - mobile', NULL, NULL, 'E', 'FF', '1', '730200', 'Buildings - mobile', 'Food');
INSERT INTO `pma_gl_codes` VALUES (318, '', 'EFF1730500', 'IC-Stor Security and safety equipment', NULL, NULL, 'E', 'FF', '1', '730500', 'Security and safety equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (319, '', 'EFF1730800', 'IC-Stor Workshop & Warehouse Equipment', NULL, NULL, 'E', 'FF', '1', '730800', 'Workshop & Warehouse Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (320, '', 'EFG13008300', 'OVLD Transhipment Point costs non cap costs', NULL, NULL, 'E', 'FG', '1', '3008300', 'Transhipment Point costs non cap costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (321, '', 'EFG16000500', 'OV-Stor Supplies & Materials-Warehous & Workshop E', NULL, NULL, 'E', 'FG', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (322, '', 'EFG16505000', 'OV-Stor Warehouse - Packaging Materials', NULL, NULL, 'E', 'FG', '1', '6505000', 'Warehouse - Packaging Materials', 'Food');
INSERT INTO `pma_gl_codes` VALUES (323, '', 'EFG16600000', 'OV-Stor Utilities - General', NULL, NULL, 'E', 'FG', '1', '6600000', 'Utilities - General', 'Food');
INSERT INTO `pma_gl_codes` VALUES (324, '', 'EFG16601000', 'OV-Stor Utilities - Gas', NULL, NULL, 'E', 'FG', '1', '6601000', 'Utilities - Gas', 'Food');
INSERT INTO `pma_gl_codes` VALUES (325, '', 'EFG16602000', 'OV-Stor Utilities - Water', NULL, NULL, 'E', 'FG', '1', '6602000', 'Utilities - Water', 'Food');
INSERT INTO `pma_gl_codes` VALUES (326, '', 'EFG16603000', 'OV-Stor Utilities - Electricity', NULL, NULL, 'E', 'FG', '1', '6603000', 'Utilities - Electricity', 'Food');
INSERT INTO `pma_gl_codes` VALUES (327, '', 'EFG16604000', 'OV-Stor Office Supplies & Other Consumables', NULL, NULL, 'E', 'FG', '1', '6604000', 'Office Supplies & Other Consumables', 'Food');
INSERT INTO `pma_gl_codes` VALUES (328, '', 'EFG16605100', 'OV-Stor Fuel: Facilities', NULL, NULL, 'E', 'FG', '1', '6605100', 'Fuel: Facilities', 'Food');
INSERT INTO `pma_gl_codes` VALUES (329, '', 'EFG16606100', 'OV-Stor Insectisides, Fumigants and other related ', NULL, NULL, 'E', 'FG', '1', '6606100', 'Insectisides, Fumigants and other related products', 'Food');
INSERT INTO `pma_gl_codes` VALUES (330, '', 'EFG17001000', 'OV-Stor Rental of Facility', NULL, NULL, 'E', 'FG', '1', '7001000', 'Rental of Facility', 'Food');
INSERT INTO `pma_gl_codes` VALUES (331, '', 'EFG17002000', 'OV-Stor UN Common Premises Rental', NULL, NULL, 'E', 'FG', '1', '7002000', 'UN Common Premises Rental', 'Food');
INSERT INTO `pma_gl_codes` VALUES (332, '', 'EFG17022000', 'OV-Stor Insurance Public Liability and Premises', NULL, NULL, 'E', 'FG', '1', '7022000', 'Insurance Public Liability and Premises', 'Food');
INSERT INTO `pma_gl_codes` VALUES (333, '', 'EFG17050000', 'OV-Stor Equipment Repairs and Maintenance', NULL, NULL, 'E', 'FG', '1', '7050000', 'Equipment Repairs and Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (334, '', 'EFG17051000', 'OV-Stor Ordinary Premises Maintenance', NULL, NULL, 'E', 'FG', '1', '7051000', 'Ordinary Premises Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (335, '', 'EFG17052000', 'OV-Stor Extraordinary Premises Maintenance', NULL, NULL, 'E', 'FG', '1', '7052000', 'Extraordinary Premises Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (336, '', 'EFG17054000', 'OV-Stor Office Cleaning', NULL, NULL, 'E', 'FG', '1', '7054000', 'Office Cleaning', 'Food');
INSERT INTO `pma_gl_codes` VALUES (337, '', 'EFG17100100', 'OV-Stor Equipment Leasing', NULL, NULL, 'E', 'FG', '1', '7100100', 'Equipment Leasing', 'Food');
INSERT INTO `pma_gl_codes` VALUES (338, '', 'EFG17102000', 'OV-Stor Other Office Expenses & Services (WFP Only', NULL, NULL, 'E', 'FG', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (339, '', 'EFG17118000', 'OV-Stor Security Guard Services ', NULL, NULL, 'E', 'FG', '1', '7118000', 'Security Guard Services ', 'Food');
INSERT INTO `pma_gl_codes` VALUES (340, '', 'EFG17119500', 'OV-Stor Fumigation Services', NULL, NULL, 'E', 'FG', '1', '7119500', 'Fumigation Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (341, '', 'EFG17201000', 'OV-Stor Internal Services provided - UNHRD', NULL, NULL, 'E', 'FG', '1', '7201000', 'Internal Services provided - UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (342, '', 'EFG17213000', 'OV-Stor GCMF - Storage', NULL, NULL, 'E', 'FG', '1', '7213000', 'GCMF - Storage', 'Food');
INSERT INTO `pma_gl_codes` VALUES (343, '', 'EFG1730500', 'OV-Stor Security and safety equipment', NULL, NULL, 'E', 'FG', '1', '730500', 'Security and safety equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (344, '', 'EFG1730800', 'OV-Stor Workshop & Warehouse Equipment', NULL, NULL, 'E', 'FG', '1', '730800', 'Workshop & Warehouse Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (345, '', 'EFH13001000', 'Port Operations Costs non capitalized costs', NULL, NULL, 'E', 'FH', '1', '3001000', 'Port Operations Costs non capitalized costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (346, '', 'EFH1581700', 'Inventory - Stevedoring Clear Acct (In-country)', NULL, NULL, 'E', 'FH', '1', '581700', 'Inventory - Stevedoring Clear Acct (In-country)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (347, '', 'EFH17100100', 'IC-Port Equipment Leasing', NULL, NULL, 'E', 'FH', '1', '7100100', 'Equipment Leasing', 'Food');
INSERT INTO `pma_gl_codes` VALUES (348, '', 'EFH17119500', 'IC-Port Fumigation Services', NULL, NULL, 'E', 'FH', '1', '7119500', 'Fumigation Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (349, '', 'EFH17201000', 'IC-Port Internal Services provided - UNHRD', NULL, NULL, 'E', 'FH', '1', '7201000', 'Internal Services provided - UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (350, '', 'EFH17212000', 'IC-Port GCMF - Port', NULL, NULL, 'E', 'FH', '1', '7212000', 'GCMF - Port', 'Food');
INSERT INTO `pma_gl_codes` VALUES (351, '', 'EFH1730500', 'IC-Port Security and safety equipment', NULL, NULL, 'E', 'FH', '1', '730500', 'Security and safety equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (352, '', 'EFI13008000', 'OVLD Port Operations Costs non cap costs', NULL, NULL, 'E', 'FI', '1', '3008000', 'Port Operations Costs non cap costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (353, '', 'EFI1581000', 'Inventory - Stevedoring Clear Acct (Overland)', NULL, NULL, 'E', 'FI', '1', '581000', 'Inventory - Stevedoring Clear Acct (Overland)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (354, '', 'EFI17100100', 'OV-Port Equipment Leasing', NULL, NULL, 'E', 'FI', '1', '7100100', 'Equipment Leasing', 'Food');
INSERT INTO `pma_gl_codes` VALUES (355, '', 'EFI17119500', 'OV-Port Fumigation Services', NULL, NULL, 'E', 'FI', '1', '7119500', 'Fumigation Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (356, '', 'EFI17201000', 'OV-Port Internal Services provided - UNHRD', NULL, NULL, 'E', 'FI', '1', '7201000', 'Internal Services provided - UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (357, '', 'EFI17212000', 'OV-Port GCMF - Port', NULL, NULL, 'E', 'FI', '1', '7212000', 'GCMF - Port', 'Food');
INSERT INTO `pma_gl_codes` VALUES (358, '', 'EFI1730500', 'OV-Port Security and safety equipment', NULL, NULL, 'E', 'FI', '1', '730500', 'Security and safety equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (359, '', 'EFJ14001700', 'IC-SCM Overtime', NULL, NULL, 'E', 'FJ', '1', '4001700', 'Overtime', 'Food');
INSERT INTO `pma_gl_codes` VALUES (360, '', 'EFJ14004150', 'IC-SCM Danger Pay non-PSA funded (Int Staff)', NULL, NULL, 'E', 'FJ', '1', '4004150', 'Danger Pay non-PSA funded (Int Staff)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (361, '', 'EFJ14004300', 'IC-SCM Rest & Recup: Non-PSA Funded Post (Int. Sta', NULL, NULL, 'E', 'FJ', '1', '4004300', 'Rest & Recup: Non-PSA Funded Post (Int. Staff)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (362, '', 'EFJ14200000', 'IC-SCM Int\'l Consultants Honoraria -Payroll', NULL, NULL, 'E', 'FJ', '1', '4200000', 'Int\'l Consultants Honoraria -Payroll', 'Food');
INSERT INTO `pma_gl_codes` VALUES (363, '', 'EFJ14200100', 'IC-SCM Actual JPO\'s Post Cost -Salary/Allow/Benefi', NULL, NULL, 'E', 'FJ', '1', '4200100', 'Actual JPO\'s Post Cost -Salary/Allow/Benefits', 'Food');
INSERT INTO `pma_gl_codes` VALUES (364, '', 'EFJ14200220', 'IC-SCM Actual JPO’s Cost – Add Hardship Allowance', NULL, NULL, 'E', 'FJ', '1', '4200220', 'Actual JPO’s Cost – Add Hardship Allowance (AHA)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (365, '', 'EFJ14200230', 'IC-SCM Actual JPO’s Cost – Non Family Service Allo', NULL, NULL, 'E', 'FJ', '1', '4200230', 'Actual JPO’s Cost – Non Family Service Allowance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (366, '', 'EFJ14200300', 'IC-SCM Actual JPO\'s Post Cost - EMEA', NULL, NULL, 'E', 'FJ', '1', '4200300', 'Actual JPO\'s Post Cost - EMEA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (367, '', 'EFJ14200400', 'IC-SCM Actual JPO\'s Post Cost-Assignment Grant', NULL, NULL, 'E', 'FJ', '1', '4200400', 'Actual JPO\'s Post Cost-Assignment Grant', 'Food');
INSERT INTO `pma_gl_codes` VALUES (368, '', 'EFJ14200410', 'IC-SCM Actual JPO\'s Post Cost - Settling-in Grant', NULL, NULL, 'E', 'FJ', '1', '4200410', 'Actual JPO\'s Post Cost - Settling-in Grant', 'Food');
INSERT INTO `pma_gl_codes` VALUES (369, '', 'EFJ14200500', 'IC-SCM Actual JPO\'s Post Cost - Repatriation Grant', NULL, NULL, 'E', 'FJ', '1', '4200500', 'Actual JPO\'s Post Cost - Repatriation Grant', 'Food');
INSERT INTO `pma_gl_codes` VALUES (370, '', 'EFJ14200600', 'IC-SCM Other JPO costs (JPO Fund)', NULL, NULL, 'E', 'FJ', '1', '4200600', 'Other JPO costs (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (371, '', 'EFJ14200750', 'IC-SCM JPO Danger Pay (JPO Fund)', NULL, NULL, 'E', 'FJ', '1', '4200750', 'JPO Danger Pay (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (372, '', 'EFJ14200800', 'IC-SCM JPO Rest & Recuperation (JPO Fund)', NULL, NULL, 'E', 'FJ', '1', '4200800', 'JPO Rest & Recuperation (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (373, '', 'EFJ14200900', 'IC-SCM JPO Travel Entitlem Exclud. Duty Travel (JP', NULL, NULL, 'E', 'FJ', '1', '4200900', 'JPO Travel Entitlem Exclud. Duty Travel (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (374, '', 'EFJ14200950', 'IC-SCM JPO Training and Development (JPO Fund)', NULL, NULL, 'E', 'FJ', '1', '4200950', 'JPO Training and Development (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (375, 'X', 'EFJ14201000', 'IC-SCM Employee Duty Travel (WFP)', NULL, NULL, 'E', 'FJ', '1', '4201000', 'Employee Duty Travel (WFP)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (376, '', 'EFJ14201010', 'IC-SCM NO/GS Staff In-Country Deployment Travel', NULL, NULL, 'E', 'FJ', '1', '4201010', 'NO/GS Staff In-Country Deployment Travel', 'Food');
INSERT INTO `pma_gl_codes` VALUES (377, '', 'EFJ14201700', 'IC-SCM Int. Consultant Travel: Non Duty (WFP Only)', NULL, NULL, 'E', 'FJ', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (378, '', 'EFJ14201800', 'IC-SCM Temporary Assist. HQ Payroll Loc Staff', NULL, NULL, 'E', 'FJ', '1', '4201800', 'Temporary Assist. HQ Payroll Loc Staff', 'Food');
INSERT INTO `pma_gl_codes` VALUES (379, '', 'EFJ14201900', 'IC-SCM Separation Packages Setlem Loc Staff', NULL, NULL, 'E', 'FJ', '1', '4201900', 'Separation Packages Setlem Loc Staff', 'Food');
INSERT INTO `pma_gl_codes` VALUES (380, '', 'EFJ14202000', 'IC-SCM Medical Travel/Evacuation - Local Employees', NULL, NULL, 'E', 'FJ', '1', '4202000', 'Medical Travel/Evacuation - Local Employees', 'Food');
INSERT INTO `pma_gl_codes` VALUES (381, 'X', 'EFJ14202100', 'IC-SCM Residential Security NonPSA', NULL, NULL, 'E', 'FJ', '1', '4202100', 'Residential Security NonPSA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (382, '', 'EFJ14300000', 'IC-SCM Local Staff - National Officer', NULL, NULL, 'E', 'FJ', '1', '4300000', 'Local Staff - National Officer', 'Food');
INSERT INTO `pma_gl_codes` VALUES (383, '', 'EFJ14300100', 'IC-SCM Local Staff - General Service', NULL, NULL, 'E', 'FJ', '1', '4300100', 'Local Staff - General Service', 'Food');
INSERT INTO `pma_gl_codes` VALUES (384, '', 'EFJ14300110', 'IC-SCM Local Staff LT Benefits Accrual', NULL, NULL, 'E', 'FJ', '1', '4300110', 'Local Staff LT Benefits Accrual', 'Food');
INSERT INTO `pma_gl_codes` VALUES (385, '', 'EFJ14300200', 'IC-SCM Local Staff -Temporary Assistance', NULL, NULL, 'E', 'FJ', '1', '4300200', 'Local Staff -Temporary Assistance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (386, '', 'EFJ14300250', 'IC-SCM Casual Labour (Local)', NULL, NULL, 'E', 'FJ', '1', '4300250', 'Casual Labour (Local)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (387, '', 'EFJ14300300', 'IC-SCM Local Employees - Overtime', NULL, NULL, 'E', 'FJ', '1', '4300300', 'Local Employees - Overtime', 'Food');
INSERT INTO `pma_gl_codes` VALUES (388, '', 'EFJ14300350', 'IC-SCM Other Rest & Recup: Non Int.Staff &JPO Fund', NULL, NULL, 'E', 'FJ', '1', '4300350', 'Other Rest & Recup: Non Int.Staff &JPO Funded Post', 'Food');
INSERT INTO `pma_gl_codes` VALUES (389, '', 'EFJ14300410', 'IC-SCM Other Danger Pay: Non Int. Staff & JPO Fund', NULL, NULL, 'E', 'FJ', '1', '4300410', 'Other Danger Pay: Non Int. Staff & JPO Funded Post', 'Food');
INSERT INTO `pma_gl_codes` VALUES (390, '', 'EFJ14300500', 'IC-SCM Medical Insurance for SC, SSA & Casual Labo', NULL, NULL, 'E', 'FJ', '1', '4300500', 'Medical Insurance for SC, SSA & Casual Labour', 'Food');
INSERT INTO `pma_gl_codes` VALUES (391, '', 'EFJ14300550', 'IC-SCM MCS Employer contribution -  Non Payroll', NULL, NULL, 'E', 'FJ', '1', '4300550', 'MCS Employer contribution -  Non Payroll', 'Food');
INSERT INTO `pma_gl_codes` VALUES (392, '', 'EFJ14300560', 'IC-SCM Entry Medical Examination - Local Employees', NULL, NULL, 'E', 'FJ', '1', '4300560', 'Entry Medical Examination - Local Employees', 'Food');
INSERT INTO `pma_gl_codes` VALUES (393, '', 'EFJ14300570', 'IC-SCM DDSS payments to SC/SSA', NULL, NULL, 'E', 'FJ', '1', '4300570', 'DDSS payments to SC/SSA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (394, '', 'EFJ14300600', 'IC-SCM Non Staff HR: UNV', NULL, NULL, 'E', 'FJ', '1', '4300600', 'Non Staff HR: UNV', 'Food');
INSERT INTO `pma_gl_codes` VALUES (395, '', 'EFJ14300700', 'IC-SCM Local Consultants', NULL, NULL, 'E', 'FJ', '1', '4300700', 'Local Consultants', 'Food');
INSERT INTO `pma_gl_codes` VALUES (396, 'X', 'EFJ14300800', 'IC-SCM Coop Partner & Non WFP Employee Duty Travel', NULL, NULL, 'E', 'FJ', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'Food');
INSERT INTO `pma_gl_codes` VALUES (397, '', 'EFJ14300900', 'IC-SCM Non Staff HR: Interns', NULL, NULL, 'E', 'FJ', '1', '4300900', 'Non Staff HR: Interns', 'Food');
INSERT INTO `pma_gl_codes` VALUES (398, 'X', 'EFJ16000000', 'IC-SCM Supplies & Materials-Computer Equipment', NULL, NULL, 'E', 'FJ', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (399, 'X', 'EFJ16000050', 'IC-SCM Supplies & Materials-Office Equipment', NULL, NULL, 'E', 'FJ', '1', '6000050', 'Supplies & Materials-Office Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (400, 'X', 'EFJ16000100', 'IC-SCM Supplies & Materials-Office Furniture and f', NULL, NULL, 'E', 'FJ', '1', '6000100', 'Supplies & Materials-Office Furniture and fixtures', 'Food');
INSERT INTO `pma_gl_codes` VALUES (401, 'X', 'EFJ16000200', 'IC-SCM Supplies & Materials-Security and safety eq', NULL, NULL, 'E', 'FJ', '1', '6000200', 'Supplies & Materials-Security and safety equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (402, 'X', 'EFJ16000300', 'IC-SCM Supplies & Materials-Telecommunication Equi', NULL, NULL, 'E', 'FJ', '1', '6000300', 'Supplies & Materials-Telecommunication Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (403, 'X', 'EFJ16000400', 'IC-SCM Supplies & Materials-Motor Vehicles', NULL, NULL, 'E', 'FJ', '1', '6000400', 'Supplies & Materials-Motor Vehicles', 'Food');
INSERT INTO `pma_gl_codes` VALUES (404, 'X', 'EFJ16000500', 'IC-SCM Supplies & Materials-Warehous & Workshop Eq', NULL, NULL, 'E', 'FJ', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (405, 'X', 'EFJ16501000', 'IC-SCM Equipm: Kitchen/Canteen Materials & Equipme', NULL, NULL, 'E', 'FJ', '1', '6501000', 'Equipm: Kitchen/Canteen Materials & Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (406, 'X', 'EFJ16502000', 'IC-SCM Equipm: Health Related Material and Equipme', NULL, NULL, 'E', 'FJ', '1', '6502000', 'Equipm: Health Related Material and Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (407, 'X', 'EFJ16507000', 'IC-SCM Other Tools & Equipment', NULL, NULL, 'E', 'FJ', '1', '6507000', 'Other Tools & Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (408, 'X', 'EFJ16600000', 'IC-SCM Utilities - General', NULL, NULL, 'E', 'FJ', '1', '6600000', 'Utilities - General', 'Food');
INSERT INTO `pma_gl_codes` VALUES (409, 'X', 'EFJ16602000', 'IC-SCM Utilities - Water', NULL, NULL, 'E', 'FJ', '1', '6602000', 'Utilities - Water', 'Food');
INSERT INTO `pma_gl_codes` VALUES (410, 'X', 'EFJ16603000', 'IC-SCM Utilities - Electricity', NULL, NULL, 'E', 'FJ', '1', '6603000', 'Utilities - Electricity', 'Food');
INSERT INTO `pma_gl_codes` VALUES (411, 'X', 'EFJ16604000', 'IC-SCM Office Supplies & Other Consumables', NULL, NULL, 'E', 'FJ', '1', '6604000', 'Office Supplies & Other Consumables', 'Food');
INSERT INTO `pma_gl_codes` VALUES (412, 'X', 'EFJ16605000', 'IC-SCM Fuel, Diesel and Petrol: vehicles', NULL, NULL, 'E', 'FJ', '1', '6605000', 'Fuel, Diesel and Petrol: vehicles', 'Food');
INSERT INTO `pma_gl_codes` VALUES (413, 'X', 'EFJ16605100', 'IC-SCM Fuel: Facilities', NULL, NULL, 'E', 'FJ', '1', '6605100', 'Fuel: Facilities', 'Food');
INSERT INTO `pma_gl_codes` VALUES (414, 'X', 'EFJ16606000', 'IC-SCM Oil & Lubricants other', NULL, NULL, 'E', 'FJ', '1', '6606000', 'Oil & Lubricants other', 'Food');
INSERT INTO `pma_gl_codes` VALUES (415, 'X', 'EFJ16609000', 'IC-SCM Communications & IT Services (WFP only)', NULL, NULL, 'E', 'FJ', '1', '6609000', 'Communications & IT Services (WFP only)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (416, 'X', 'EFJ17001000', 'IC-SCM Rental of Facility', NULL, NULL, 'E', 'FJ', '1', '7001000', 'Rental of Facility', 'Food');
INSERT INTO `pma_gl_codes` VALUES (417, 'X', 'EFJ17024000', 'IC-SCM Insurance Vehicles', NULL, NULL, 'E', 'FJ', '1', '7024000', 'Insurance Vehicles', 'Food');
INSERT INTO `pma_gl_codes` VALUES (418, 'X', 'EFJ17050000', 'IC-SCM Equipment Repairs and Maintenance', NULL, NULL, 'E', 'FJ', '1', '7050000', 'Equipment Repairs and Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (419, 'X', 'EFJ17053000', 'IC-SCM Office Renovation', NULL, NULL, 'E', 'FJ', '1', '7053000', 'Office Renovation', 'Food');
INSERT INTO `pma_gl_codes` VALUES (420, 'X', 'EFJ17054000', 'IC-SCM Office Cleaning', NULL, NULL, 'E', 'FJ', '1', '7054000', 'Office Cleaning', 'Food');
INSERT INTO `pma_gl_codes` VALUES (421, 'X', 'EFJ17055000', 'IC-SCM Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'FJ', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (422, 'X', 'EFJ17100000', 'IC-SCM Vehicle Leasing', NULL, NULL, 'E', 'FJ', '1', '7100000', 'Vehicle Leasing', 'Food');
INSERT INTO `pma_gl_codes` VALUES (423, 'X', 'EFJ17100100', 'IC-SCM Equipment Leasing', NULL, NULL, 'E', 'FJ', '1', '7100100', 'Equipment Leasing', 'Food');
INSERT INTO `pma_gl_codes` VALUES (424, 'X', 'EFJ17102000', 'IC-SCM Other Office Expenses & Services (WFP Only)', NULL, NULL, 'E', 'FJ', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (425, '', 'EFJ17102010', 'IC-SCM Meetings & Workshops', NULL, NULL, 'E', 'FJ', '1', '7102010', 'Meetings & Workshops', 'Food');
INSERT INTO `pma_gl_codes` VALUES (426, 'X', 'EFJ17103000', 'IC-SCM Other UN Common Services (excluding Securit', NULL, NULL, 'E', 'FJ', '1', '7103000', 'Other UN Common Services (excluding Security)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (427, 'X', 'EFJ17118000', 'IC-SCM Security Guard Services ', NULL, NULL, 'E', 'FJ', '1', '7118000', 'Security Guard Services ', 'Food');
INSERT INTO `pma_gl_codes` VALUES (428, '', 'EFJ17119000', 'IC-SCM Commercial Consultancy Services', NULL, NULL, 'E', 'FJ', '1', '7119000', 'Commercial Consultancy Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (429, '', 'EFJ17200000', 'IC-SCM Internal Service Fee (MCR)- UNHRD', NULL, NULL, 'E', 'FJ', '1', '7200000', 'Internal Service Fee (MCR)- UNHRD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (430, '', 'EFJ17209050', 'IC-SCM Internal Services Provided – IT PER CAPITA', NULL, NULL, 'E', 'FJ', '1', '7209050', 'Internal Services Provided – IT PER CAPITA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (431, '', 'EFJ17209070', 'IC-SCM IInternal Services – Security costs recover', NULL, NULL, 'E', 'FJ', '1', '7209070', 'IInternal Services – Security costs recoveries', 'Food');
INSERT INTO `pma_gl_codes` VALUES (432, '', 'EFJ17211050', 'IC-SCM Internal Service Fee (MCR) - FPF', NULL, NULL, 'E', 'FJ', '1', '7211050', 'Internal Service Fee (MCR) - FPF', 'Food');
INSERT INTO `pma_gl_codes` VALUES (433, 'X', 'EFJ1730350', 'IC-SCM Office equipment', NULL, NULL, 'E', 'FJ', '1', '730350', 'Office equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (434, '', 'EFJ1730500', 'IC-SCM Security and safety equipment', NULL, NULL, 'E', 'FJ', '1', '730500', 'Security and safety equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (435, 'X', 'EFJ1730600', 'IC-SCM Telecommunication Equipment', NULL, NULL, 'E', 'FJ', '1', '730600', 'Telecommunication Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (436, 'X', 'EFJ1730700', 'IC-SCM Motor Vehicles Equipment', NULL, NULL, 'E', 'FJ', '1', '730700', 'Motor Vehicles Equipment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (437, '', 'EFJ1811300', 'IC-SCM Standard Staff Cost  (HQ Payroll)', NULL, NULL, 'E', 'FJ', '1', '811300', 'Standard Staff Cost  (HQ Payroll)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (438, '', 'EFJ27119000', 'IC-SCM Com. Cons. Serv. (IK)', NULL, NULL, 'E', 'FJ', '2', '7119000', 'Commercial Consultancy Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (439, '', 'EFK14001700', 'OV-SCM Overtime', NULL, NULL, 'E', 'FK', '1', '4001700', 'Overtime', 'Food');
INSERT INTO `pma_gl_codes` VALUES (440, '', 'EFK14004150', 'OV-SCM Danger Pay non-PSA funded (Int Staff)', NULL, NULL, 'E', 'FK', '1', '4004150', 'Danger Pay non-PSA funded (Int Staff)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (441, '', 'EFK14004300', 'OV-SCM Rest & Recup: Non-PSA Funded Post (Int. Sta', NULL, NULL, 'E', 'FK', '1', '4004300', 'Rest & Recup: Non-PSA Funded Post (Int. Staff)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (442, '', 'EFK14200000', 'OV-SCM Int\'l Consultants Honoraria -Payroll', NULL, NULL, 'E', 'FK', '1', '4200000', 'Int\'l Consultants Honoraria -Payroll', 'Food');
INSERT INTO `pma_gl_codes` VALUES (443, '', 'EFK14200100', 'OV-SCM Actual JPO\'s Post Cost -Salary/Allow/Benefi', NULL, NULL, 'E', 'FK', '1', '4200100', 'Actual JPO\'s Post Cost -Salary/Allow/Benefits', 'Food');
INSERT INTO `pma_gl_codes` VALUES (444, '', 'EFK14200220', 'OV-SCM Actual JPO’s Cost – Add Hardship Allowance', NULL, NULL, 'E', 'FK', '1', '4200220', 'Actual JPO’s Cost – Add Hardship Allowance (AHA)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (445, '', 'EFK14200230', 'OV-SCM Actual JPO’s Cost – Non Family Service Allo', NULL, NULL, 'E', 'FK', '1', '4200230', 'Actual JPO’s Cost – Non Family Service Allowance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (446, '', 'EFK14200300', 'OV-SCM Actual JPO\'s Post Cost - EMEA', NULL, NULL, 'E', 'FK', '1', '4200300', 'Actual JPO\'s Post Cost - EMEA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (447, '', 'EFK14200400', 'OV-SCM Actual JPO\'s Post Cost-Assignment Grant', NULL, NULL, 'E', 'FK', '1', '4200400', 'Actual JPO\'s Post Cost-Assignment Grant', 'Food');
INSERT INTO `pma_gl_codes` VALUES (448, '', 'EFK14200410', 'OV-SCM Actual JPO\'s Post Cost - Settling-in Grant', NULL, NULL, 'E', 'FK', '1', '4200410', 'Actual JPO\'s Post Cost - Settling-in Grant', 'Food');
INSERT INTO `pma_gl_codes` VALUES (449, '', 'EFK14200500', 'OV-SCM Actual JPO\'s Post Cost - Repatriation Grant', NULL, NULL, 'E', 'FK', '1', '4200500', 'Actual JPO\'s Post Cost - Repatriation Grant', 'Food');
INSERT INTO `pma_gl_codes` VALUES (450, '', 'EFK14200600', 'OV-SCM Other JPO costs (JPO Fund)', NULL, NULL, 'E', 'FK', '1', '4200600', 'Other JPO costs (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (451, '', 'EFK14200750', 'OV-SCM JPO Danger Pay (JPO Fund)', NULL, NULL, 'E', 'FK', '1', '4200750', 'JPO Danger Pay (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (452, '', 'EFK14200800', 'OV-SCM JPO Rest & Recuperation (JPO Fund)', NULL, NULL, 'E', 'FK', '1', '4200800', 'JPO Rest & Recuperation (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (453, '', 'EFK14200900', 'OV-SCM JPO Travel Entitlem Exclud. Duty Travel (JP', NULL, NULL, 'E', 'FK', '1', '4200900', 'JPO Travel Entitlem Exclud. Duty Travel (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (454, '', 'EFK14200950', 'OV-SCM JPO Training and Development (JPO Fund)', NULL, NULL, 'E', 'FK', '1', '4200950', 'JPO Training and Development (JPO Fund)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (455, 'X', 'EFK14201000', 'OV-SCM Employee Duty Travel (WFP)', NULL, NULL, 'E', 'FK', '1', '4201000', 'Employee Duty Travel (WFP)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (456, '', 'EFK14201010', 'OV-SCM NO/GS Staff In-Country Deployment Travel', NULL, NULL, 'E', 'FK', '1', '4201010', 'NO/GS Staff In-Country Deployment Travel', 'Food');
INSERT INTO `pma_gl_codes` VALUES (457, '', 'EFK14201700', 'OV-SCM Int. Consultant Travel: Non Duty (WFP Only)', NULL, NULL, 'E', 'FK', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (458, '', 'EFK14201800', 'OV-SCM Temporary Assist. HQ Payroll Loc Staff', NULL, NULL, 'E', 'FK', '1', '4201800', 'Temporary Assist. HQ Payroll Loc Staff', 'Food');
INSERT INTO `pma_gl_codes` VALUES (459, '', 'EFK14201900', 'OV-SCM Separation Packages Setlem Loc Staff', NULL, NULL, 'E', 'FK', '1', '4201900', 'Separation Packages Setlem Loc Staff', 'Food');
INSERT INTO `pma_gl_codes` VALUES (460, '', 'EFK14202000', 'OV-SCM Medical Travel/Evacuation - Local Employees', NULL, NULL, 'E', 'FK', '1', '4202000', 'Medical Travel/Evacuation - Local Employees', 'Food');
INSERT INTO `pma_gl_codes` VALUES (461, '', 'EFK14300000', 'OV-SCM Local Staff - National Officer', NULL, NULL, 'E', 'FK', '1', '4300000', 'Local Staff - National Officer', 'Food');
INSERT INTO `pma_gl_codes` VALUES (462, '', 'EFK14300100', 'OV-SCM Local Staff - General Service', NULL, NULL, 'E', 'FK', '1', '4300100', 'Local Staff - General Service', 'Food');
INSERT INTO `pma_gl_codes` VALUES (463, '', 'EFK14300110', 'OV-SCM Local Staff LT Benefits Accrual', NULL, NULL, 'E', 'FK', '1', '4300110', 'Local Staff LT Benefits Accrual', 'Food');
INSERT INTO `pma_gl_codes` VALUES (464, '', 'EFK14300200', 'OV-SCM Local Staff -Temporary Assistance', NULL, NULL, 'E', 'FK', '1', '4300200', 'Local Staff -Temporary Assistance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (465, '', 'EFK14300250', 'OV-SCM Casual Labour (Local)', NULL, NULL, 'E', 'FK', '1', '4300250', 'Casual Labour (Local)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (466, '', 'EFK14300300', 'OV-SCM Local Employees - Overtime', NULL, NULL, 'E', 'FK', '1', '4300300', 'Local Employees - Overtime', 'Food');
INSERT INTO `pma_gl_codes` VALUES (467, '', 'EFK14300350', 'OV-SCM Other Rest & Recup: Non Int.Staff &JPO Fund', NULL, NULL, 'E', 'FK', '1', '4300350', 'Other Rest & Recup: Non Int.Staff &JPO Funded Post', 'Food');
INSERT INTO `pma_gl_codes` VALUES (468, '', 'EFK14300410', 'OV-SCM Other Danger Pay: Non Int. Staff & JPO Fund', NULL, NULL, 'E', 'FK', '1', '4300410', 'Other Danger Pay: Non Int. Staff & JPO Funded Post', 'Food');
INSERT INTO `pma_gl_codes` VALUES (469, '', 'EFK14300500', 'OV-SCM Medical Insurance for SC, SSA & Casual Labo', NULL, NULL, 'E', 'FK', '1', '4300500', 'Medical Insurance for SC, SSA & Casual Labour', 'Food');
INSERT INTO `pma_gl_codes` VALUES (470, '', 'EFK14300550', 'OV-SCM MCS Employer contribution -  Non Payroll', NULL, NULL, 'E', 'FK', '1', '4300550', 'MCS Employer contribution -  Non Payroll', 'Food');
INSERT INTO `pma_gl_codes` VALUES (471, '', 'EFK14300560', 'OV-SCM Entry Medical Examination - Local Employees', NULL, NULL, 'E', 'FK', '1', '4300560', 'Entry Medical Examination - Local Employees', 'Food');
INSERT INTO `pma_gl_codes` VALUES (472, '', 'EFK14300570', 'OV-SCM DDSS payments to SC/SSA', NULL, NULL, 'E', 'FK', '1', '4300570', 'DDSS payments to SC/SSA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (473, '', 'EFK14300600', 'OV-SCM Non Staff HR: UNV', NULL, NULL, 'E', 'FK', '1', '4300600', 'Non Staff HR: UNV', 'Food');
INSERT INTO `pma_gl_codes` VALUES (474, '', 'EFK14300700', 'OV-SCM Local Consultants', NULL, NULL, 'E', 'FK', '1', '4300700', 'Local Consultants', 'Food');
INSERT INTO `pma_gl_codes` VALUES (475, '', 'EFK14300900', 'OV-SCM Non Staff HR: Interns', NULL, NULL, 'E', 'FK', '1', '4300900', 'Non Staff HR: Interns', 'Food');
INSERT INTO `pma_gl_codes` VALUES (476, '', 'EFK17119000', 'OV-SCM Commercial Consultancy Services', NULL, NULL, 'E', 'FK', '1', '7119000', 'Commercial Consultancy Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (477, '', 'EFK17209050', 'OV-SCM Internal Services Provided – IT PER CAPITA', NULL, NULL, 'E', 'FK', '1', '7209050', 'Internal Services Provided – IT PER CAPITA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (478, '', 'EFK1811300', 'OV-SCM Standard Staff Cost  (HQ Payroll)', NULL, NULL, 'E', 'FK', '1', '811300', 'Standard Staff Cost  (HQ Payroll)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (479, '', 'EFL13006000', 'CPC Distribution Costs', NULL, NULL, 'E', 'FL', '1', '3006000', 'Distribution Costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (480, '', 'EFL13240010', 'CPC Fixed costs: FLA (NGO) Expenses', NULL, NULL, 'E', 'FL', '1', '3240010', 'Fixed costs: FLA (NGO) Expenses', 'Food');
INSERT INTO `pma_gl_codes` VALUES (481, '', 'EFL13240020', 'CPC Fixed costs: MOU (GOV/UN Agency) Expenses', NULL, NULL, 'E', 'FL', '1', '3240020', 'Fixed costs: MOU (GOV/UN Agency) Expenses', 'Food');
INSERT INTO `pma_gl_codes` VALUES (482, 'X', 'EFL13303000', 'CPC Operational Expenses', NULL, NULL, 'E', 'FL', '1', '3303000', 'Operational Expenses', 'Food');
INSERT INTO `pma_gl_codes` VALUES (483, '', 'EFL13600210', 'CPC Delivery and Distribution: FLA (NGO) Expenses', NULL, NULL, 'E', 'FL', '1', '3600210', 'Delivery and Distribution costs: FLA (NGO) Expenses', 'Food');
INSERT INTO `pma_gl_codes` VALUES (484, '', 'EFL13600310', 'CPC Delivery and Distribution: MOU (GOV/UN Agency) Expneses', NULL, NULL, 'E', 'FL', '1', '3600310', 'Delivery and Distribution costs: MOU (GOV/UN Agency) Expenses', 'Food');
INSERT INTO `pma_gl_codes` VALUES (485, '', 'EFL14300800', 'CPC CPC Coop Partner & Non WFP Employe Duty Travel', NULL, NULL, 'E', 'FL', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'Food');
INSERT INTO `pma_gl_codes` VALUES (486, '', 'EFM1815300', 'CP Cargo Preference - Disbursement', NULL, NULL, 'E', 'FM', '1', '815300', 'Cargo Preference - Disbursement', 'Food');
INSERT INTO `pma_gl_codes` VALUES (487, '', 'ECA12004000', 'CBT Value Voucher Transfer to Beneficiaries', NULL, NULL, 'E', 'CA', '1', '2004000', 'Value Voucher Transfer to Beneficiaries', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (488, '', 'ECA12004010', 'CBT Value Voucher Transfer to Beneficiaries - Non-', NULL, NULL, 'E', 'CA', '1', '2004010', 'Value Voucher Transfer to Beneficiaries - Non-food', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (489, '', 'ECA12005000', 'CBT Cash Transfer to Beneficiaries', NULL, NULL, 'E', 'CA', '1', '2005000', 'Cash Transfer to Beneficiaries', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (490, '', 'ECA12005010', 'CBT Cash Transfer to Host Govt - Food', NULL, NULL, 'E', 'CA', '1', '2005010', 'Cash Transfer to Host Govt - Food', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (491, '', 'ECA12006000', 'CBT Commodity Voucher Transfer to Beneficiaries', NULL, NULL, 'E', 'CA', '1', '2006000', 'Commodity Voucher Transfer to Beneficiaries', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (492, '', 'ECA12860000', 'CBT CBT Loss expense account', NULL, NULL, 'E', 'CA', '1', '2860000', 'CBT Loss expense account', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (493, '', 'ECA18161000', 'CBT Write-Off: Cash-Based Transfer Losses', NULL, NULL, 'E', 'CB', '1', '8161000', 'Write-Off: Cash-Based Transfer Losses', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (494, '', 'ECB13108000', 'CBT Delivery: Other Insurance Acco', NULL, NULL, 'E', 'CB', '1', '3108000', 'Other Insurance Account Costs, legal fees, etc.', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (495, '', 'ECB13600110', 'CBT Delivery: Commercial Serv./Transaction Charges', NULL, NULL, 'E', 'CB', '1', '3600110', 'CBT Delivery: Commercial Serv./Transaction Charges', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (496, '', 'ECB16000000', 'CBT C&V S&M Computer Equipme', NULL, NULL, 'E', 'CB', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (497, '', 'ECB16000050', 'CBT Del S&M Office Equipment', NULL, NULL, 'E', 'CB', '1', '6000050', 'Supplies & Materials-Office Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (498, '', 'ECB16000100', 'CBT Del S&M Office Furniture', NULL, NULL, 'E', 'CB', '1', '6000100', 'Supplies & Materials-Office Furniture and fixtures', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (499, 'X', 'ECB16000300', 'CBT C&V S&M Telecommunicatio', NULL, NULL, 'E', 'CB', '1', '6000300', 'Supplies & Materials-Telecommunication Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (500, '', 'ECB16000500', 'CBT Del S&M Warehous & Works', NULL, NULL, 'E', 'CB', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (501, '', 'ECB16000550', 'CBT Del S&M Buildings Permanent/Mobile', NULL, NULL, 'E', 'CB', '1', '6000550', 'Supplies & Materials- Buildings Permanent/Mobile', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (502, '', 'ECB16600000', 'CBT Del  Utilities - General', NULL, NULL, 'E', 'CB', '1', '6600000', 'Utilities - General', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (503, '', 'ECB16601000', 'CBT Del  Utilities - Gas', NULL, NULL, 'E', 'CB', '1', '6601000', 'Utilities - Gas', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (504, '', 'ECB16602000', 'CBT Del  Utilities - Water', NULL, NULL, 'E', 'CB', '1', '6602000', 'Utilities - Water', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (505, '', 'ECB16603000', 'CBT Del  Utilities - Electricity', NULL, NULL, 'E', 'CB', '1', '6603000', 'Utilities - Electricity', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (506, '', 'ECB16604000', 'CBT Del  Office Supplies & Other Consumables', NULL, NULL, 'E', 'CB', '1', '6604000', 'Office Supplies & Other Consumables', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (507, '', 'ECB16605000', 'CBT Del  Fuel, Diesel and Pet', NULL, NULL, 'E', 'CB', '1', '6605000', 'Fuel, Diesel and Petrol: vehicles', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (508, '', 'ECB16605100', 'CBT Del  Fuel: Facilities', NULL, NULL, 'E', 'CB', '1', '6605100', 'Fuel: Facilities', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (509, '', 'ECB16606000', 'CBT Del  Oil & Lubricants oth', NULL, NULL, 'E', 'CB', '1', '6606000', 'Oil & Lubricants other', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (510, '', 'ECB16609000', 'CBT Del  Comm & IT Serv (WFP)', NULL, NULL, 'E', 'CB', '1', '6609000', 'Communications & IT Services (WFP only)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (511, '', 'ECB17001000', 'CBT Del  Rental of Facility', NULL, NULL, 'E', 'CB', '1', '7001000', 'Rental of Facility', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (512, '', 'ECB17002000', 'CBT Del  UN Common Premises Rental', NULL, NULL, 'E', 'CB', '1', '7002000', 'UN Common Premises Rental', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (513, '', 'ECB17022000', 'CBT Del  Insurance Public Liability and Premises', NULL, NULL, 'E', 'CB', '1', '7022000', 'Insurance Public Liability and Premises', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (514, '', 'ECB17050000', 'CBT Del  Equipment Repairs an', NULL, NULL, 'E', 'CB', '1', '7050000', 'Equipment Repairs and Maintenance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (515, '', 'ECB17051000', 'CBT Del  Ordinary Premises Maintenance', NULL, NULL, 'E', 'CB', '1', '7051000', 'Ordinary Premises Maintenance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (516, '', 'ECB17052000', 'CBT Del  Extraordinary Premises Maintenance', NULL, NULL, 'E', 'CB', '1', '7052000', 'Extraordinary Premises Maintenance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (517, '', 'ECB17054000', 'CBT Del  Office Cleaning', NULL, NULL, 'E', 'CB', '1', '7054000', 'Office Cleaning', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (518, '', 'ECB17055000', 'CBT Del  Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'CB', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (519, '', 'ECB17100000', 'CBT Del  Vehicle Leasing', NULL, NULL, 'E', 'CB', '1', '7100000', 'Vehicle Leasing', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (520, '', 'ECB17100100', 'CBT Del Equipment Leasing', NULL, NULL, 'E', 'CB', '1', '7100100', 'Equipment Leasing', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (521, '', 'ECB17102000', 'CBT Del Other Office Expenses & Services (WFP Only)', NULL, NULL, 'E', 'CB', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (522, '', 'ECB17118000', 'CBT C&V Security Guard Services ', NULL, NULL, 'E', 'CB', '1', '7118000', 'Security Guard Services ', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (523, '', 'ECB17119200', 'CBT Del Printing Services - External', NULL, NULL, 'E', 'CB', '1', '7119200', 'Printing Services - External', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (524, '', 'ECB17202000', 'CBT Del  Internal Service Fee (MCR)- GVLP', NULL, NULL, 'E', 'CB', '1', '7202000', 'Internal Service Fee (MCR)- GVLP', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (525, '', 'ECB17203000', 'CBT Del  Internal Services provided - GVLP', NULL, NULL, 'E', 'CB', '1', '7203000', 'Internal Services provided - GVLP', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (526, '', 'ECB1730200', 'CBT C&V Buildings - mobile', NULL, NULL, 'E', 'CB', '1', '730200', 'Buildings - mobile', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (527, '', 'ECB1730300', 'CBT C&V Computer equipment', NULL, NULL, 'E', 'CB', '1', '730300', 'Computer equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (528, '', 'ECB1730350', 'CBT Del  Office equipment', NULL, NULL, 'E', 'CB', '1', '730350', 'Office equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (529, '', 'ECB1730400', 'CBT Del  Office Furniture and', NULL, NULL, 'E', 'CB', '1', '730400', 'Office Furniture and fixtures', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (530, '', 'ECB1730500', 'CBT C&V Security and safety ', NULL, NULL, 'E', 'CB', '1', '730500', 'Security and safety equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (531, '', 'ECB1730600', 'CBT C&V Telecommunication Eq', NULL, NULL, 'E', 'CB', '1', '730600', 'Telecommunication Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (532, '', 'ECB1730700', 'CBT Del  Motor Vehicles Equip', NULL, NULL, 'E', 'CB', '1', '730700', 'Motor Vehicles Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (533, '', 'ECB1730800', 'CBT Del  Workshop & Warehouse', NULL, NULL, 'E', 'CB', '1', '730800', 'Workshop & Warehouse Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (534, '', 'ECB2730700', 'CBT Del  Motor Vehicles Equip (IK)', NULL, NULL, 'E', 'CB', '2', '730700', 'Motor Vehicles Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (535, '', 'ECB18161000', 'CBT Write-Off: Cash-Based Transfer Losses', NULL, NULL, 'E', 'CB', '1', '8161000', 'Write-Off: Cash-Based Transfer Losses', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (536, '', 'ECC14001700', 'CBT Overtime', NULL, NULL, 'E', 'CC', '1', '4001700', 'Overtime', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (537, '', 'ECC14004150', 'CBT Danger Pay non-PSA funded (Int Staff)', NULL, NULL, 'E', 'CC', '1', '4004150', 'Danger Pay non-PSA funded (Int Staff)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (538, '', 'ECC14004300', 'CBT Rest & Recup: Non-PSA Funded Post (Int. Staff)', NULL, NULL, 'E', 'CC', '1', '4004300', 'Rest & Recup: Non-PSA Funded Post (Int. Staff)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (539, '', 'ECC14200000', 'CBT Int\'l Consultants Honoraria -Payroll', NULL, NULL, 'E', 'CC', '1', '4200000', 'Int\'l Consultants Honoraria -Payroll', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (540, '', 'ECC14200100', 'CBT Actual JPO\'s Post Cost -Salary/Allow/Benefits', NULL, NULL, 'E', 'CC', '1', '4200100', 'Actual JPO\'s Post Cost -Salary/Allow/Benefits', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (541, '', 'ECC14200220', 'CBT Actual JPO’s Cost – Add Hardship Allowance (AH', NULL, NULL, 'E', 'CC', '1', '4200220', 'Actual JPO’s Cost – Add Hardship Allowance (AHA)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (542, '', 'ECC14200230', 'CBT Actual JPO’s Cost – Non Family Service Allowan', NULL, NULL, 'E', 'CC', '1', '4200230', 'Actual JPO’s Cost – Non Family Service Allowance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (543, '', 'ECC14200300', 'CBT Actual JPO\'s Post Cost - EMEA', NULL, NULL, 'E', 'CC', '1', '4200300', 'Actual JPO\'s Post Cost - EMEA', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (544, '', 'ECC14200400', 'CBT Actual JPO\'s Post Cost-Assignment Grant', NULL, NULL, 'E', 'CC', '1', '4200400', 'Actual JPO\'s Post Cost-Assignment Grant', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (545, '', 'ECC14200410', 'CBT Actual JPO\'s Post Cost - Settling-in Grant', NULL, NULL, 'E', 'CC', '1', '4200410', 'Actual JPO\'s Post Cost - Settling-in Grant', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (546, '', 'ECC14200500', 'CBT Actual JPO\'s Post Cost - Repatriation Grant', NULL, NULL, 'E', 'CC', '1', '4200500', 'Actual JPO\'s Post Cost - Repatriation Grant', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (547, '', 'ECC14200600', 'CBT Other JPO costs (JPO Fund)', NULL, NULL, 'E', 'CC', '1', '4200600', 'Other JPO costs (JPO Fund)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (548, '', 'ECC14200750', 'CBT JPO Danger Pay (JPO Fund)', NULL, NULL, 'E', 'CC', '1', '4200750', 'JPO Danger Pay (JPO Fund)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (549, '', 'ECC14200800', 'CBT JPO Rest & Recuperation (JPO Fund)', NULL, NULL, 'E', 'CC', '1', '4200800', 'JPO Rest & Recuperation (JPO Fund)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (550, '', 'ECC14200900', 'CBT JPO Travel Entitlem Exclud. Duty Travel (JPO F', NULL, NULL, 'E', 'CC', '1', '4200900', 'JPO Travel Entitlem Exclud. Duty Travel (JPO Fund)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (551, '', 'ECC14200950', 'CBT JPO Training and Development (JPO Fund)', NULL, NULL, 'E', 'CC', '1', '4200950', 'JPO Training and Development (JPO Fund)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (552, 'X', 'ECC14201000', 'CBT Employee Duty Travel (WFP)', NULL, NULL, 'E', 'CC', '1', '4201000', 'Employee Duty Travel (WFP)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (553, '', 'ECC14201010', 'CBT NO/GS Staff In-Country Deployment Travel', NULL, NULL, 'E', 'CC', '1', '4201010', 'NO/GS Staff In-Country Deployment Travel', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (554, '', 'ECC14201700', 'CBT Int. Consultant Travel: Non Duty (WFP Only)', NULL, NULL, 'E', 'CC', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (555, '', 'ECC14201800', 'CBT Temporary Assist. HQ Payroll Loc Staff', NULL, NULL, 'E', 'CC', '1', '4201800', 'Temporary Assist. HQ Payroll Loc Staff', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (556, '', 'ECC14201900', 'CBT Separation Packages Setlem Loc Staff', NULL, NULL, 'E', 'CC', '1', '4201900', 'Separation Packages Setlem Loc Staff', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (557, '', 'ECC14202000', 'CBT Medical Travel/Evacuation - Local Employees', NULL, NULL, 'E', 'CC', '1', '4202000', 'Medical Travel/Evacuation - Local Employees', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (558, '', 'ECC14300000', 'CBT Local Staff - National Officer', NULL, NULL, 'E', 'CC', '1', '4300000', 'Local Staff - National Officer', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (559, '', 'ECC14300100', 'CBT Local Staff - General Service', NULL, NULL, 'E', 'CC', '1', '4300100', 'Local Staff - General Service', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (560, '', 'ECC14300110', 'CBT Local Staff LT Benefits Accrual', NULL, NULL, 'E', 'CC', '1', '4300110', 'Local Staff LT Benefits Accrual', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (561, '', 'ECC14300200', 'CBT Local Staff -Temporary Assistance', NULL, NULL, 'E', 'CC', '1', '4300200', 'Local Staff -Temporary Assistance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (562, '', 'ECC14300250', 'CBT Casual Labour (Local)', NULL, NULL, 'E', 'CC', '1', '4300250', 'Casual Labour (Local)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (563, '', 'ECC14300300', 'CBT Local Employees - Overtime', NULL, NULL, 'E', 'CC', '1', '4300300', 'Local Employees - Overtime', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (564, '', 'ECC14300350', 'CBT Other Rest & Recup: Non Int.Staff &JPO Funded', NULL, NULL, 'E', 'CC', '1', '4300350', 'Other Rest & Recup: Non Int.Staff &JPO Funded Post', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (565, '', 'ECC14300410', 'CBT Other Danger Pay: Non Int. Staff & JPO Funded', NULL, NULL, 'E', 'CC', '1', '4300410', 'Other Danger Pay: Non Int. Staff & JPO Funded Post', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (566, '', 'ECC14300500', 'CBT Medical Insurance for SC, SSA & Casual Labour', NULL, NULL, 'E', 'CC', '1', '4300500', 'Medical Insurance for SC, SSA & Casual Labour', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (567, '', 'ECC14300550', 'CBT MCS Employer contribution -  Non Payroll', NULL, NULL, 'E', 'CC', '1', '4300550', 'MCS Employer contribution -  Non Payroll', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (568, '', 'ECC14300560', 'CBT Entry Medical Examination - Local Employees', NULL, NULL, 'E', 'CC', '1', '4300560', 'Entry Medical Examination - Local Employees', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (569, '', 'ECC14300570', 'CBT DDSS payments to SC/SSA', NULL, NULL, 'E', 'CC', '1', '4300570', 'DDSS payments to SC/SSA', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (570, '', 'ECC14300600', 'CBT Non Staff HR: UNV', NULL, NULL, 'E', 'CC', '1', '4300600', 'Non Staff HR: UNV', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (571, '', 'ECC14300700', 'CBT Local Consultants', NULL, NULL, 'E', 'CC', '1', '4300700', 'Local Consultants', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (572, 'X', 'ECC14300800', 'CBT Coop Partner & Non WFP Employee Duty Travel', NULL, NULL, 'E', 'CC', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (573, '', 'ECC14300900', 'CBT Non Staff HR: Interns', NULL, NULL, 'E', 'CC', '1', '4300900', 'Non Staff HR: Interns', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (574, 'X', 'ECC16000000', 'CBT S&M Computer Equipme', NULL, NULL, 'E', 'CC', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (575, 'X', 'ECC16000050', 'CBT S&M Office Equipment', NULL, NULL, 'E', 'CC', '1', '6000050', 'Supplies & Materials-Office Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (576, 'X', 'ECC16000500', 'CBT S&M Warehous & Works', NULL, NULL, 'E', 'CC', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (577, 'X', 'ECC16000550', 'CBT S&M Buildings Permanent/Mobile', NULL, NULL, 'E', 'CC', '1', '6000550', 'Supplies & Materials- Buildings Permanent/Mobile', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (578, 'X', 'ECC16501000', 'CBT S&M en Materials & E', NULL, NULL, 'E', 'CC', '1', '6501000', 'Equipm: Kitchen/Canteen Materials & Equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (579, 'X', 'ECC16604000', 'CBT Office Supplies & Other Consumables', NULL, NULL, 'E', 'CC', '1', '6604000', 'Office Supplies & Other Consumables', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (580, 'X', 'ECC16605000', 'CBT Fuel, Diesel and Pet', NULL, NULL, 'E', 'CC', '1', '6605000', 'Fuel, Diesel and Petrol: vehicles', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (581, 'X', 'ECC16609000', 'CBT Comm & IT Serv (WFP only)', NULL, NULL, 'E', 'CC', '1', '6609000', 'Communications & IT Services (WFP only)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (582, 'X', 'ECC17001000', 'CBT Rental of Facility', NULL, NULL, 'E', 'CC', '1', '7001000', 'Rental of Facility', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (583, 'X', 'ECC17022000', 'CBT Insurance Public Liability and Premises', NULL, NULL, 'E', 'CC', '1', '7022000', 'Insurance Public Liability and Premises', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (584, 'X', 'ECC17053000', 'CBT Office Renovation', NULL, NULL, 'E', 'CC', '1', '7053000', 'Office Renovation', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (585, 'X', 'ECC17054000', 'CBT Office Cleaning', NULL, NULL, 'E', 'CC', '1', '7054000', 'Office Cleaning', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (586, 'X', 'ECC17055000', 'CBT Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'CC', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (587, 'X', 'ECC17100000', 'CBT Vehicle Leasing', NULL, NULL, 'E', 'CC', '1', '7100000', 'Vehicle Leasing', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (588, 'X', 'ECC17102000', 'CBT Other Office Expenses & Services (WFP Only)', NULL, NULL, 'E', 'CC', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (589, '', 'ECC17102010', 'CBT Meetings & Workshops', NULL, NULL, 'E', 'CC', '1', '7102010', 'Meetings & Workshops', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (590, 'X', 'ECC17118000', 'CBT Security Guard Services ', NULL, NULL, 'E', 'CC', '1', '7118000', 'Security Guard Services ', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (591, '', 'ECC17119000', 'CBT Commercial Consultancy Services', NULL, NULL, 'E', 'CC', '1', '7119000', 'Commercial Consultancy Services', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (592, '', 'ECC17209050', 'CBT Internal Services Provided – IT PER CAPITA', NULL, NULL, 'E', 'CC', '1', '7209050', 'Internal Services Provided – IT PER CAPITA', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (593, '', 'ECC17209070', 'CBT IInternal Services –', NULL, NULL, 'E', 'CC', '1', '7209070', 'IInternal Services – Security costs recoveries', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (594, '', 'ECC1730500', 'CBT Security and safety ', NULL, NULL, 'E', 'CC', '1', '730500', 'Security and safety equipment', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (595, '', 'ECC1811300', 'CBT Standard Staff Cost  (HQ Payroll)', NULL, NULL, 'E', 'CC', '1', '811300', 'Standard Staff Cost  (HQ Payroll)', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (596, '', 'ECC27119000', 'CBT Com. Cons. Serv. (IK)', NULL, NULL, 'E', 'CC', '2', '7119000', 'Commercial Consultancy Services', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (597, '', 'ECD13240010', 'CBT Fixed costs: FLA (NGO) Expenses', NULL, NULL, 'E', 'CD', '1', '3240010', 'Fixed costs: FLA (NGO) Expenses', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (598, '', 'ECD13240020', 'CBT Fixed costs: MOU (GOV/UN Agency) Expenses', NULL, NULL, 'E', 'CD', '1', '3240020', 'Fixed costs: MOU (GOV/UN Agency) Expenses', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (599, 'X', 'ECD13303000', 'CBT Operational Expenses', NULL, NULL, 'E', 'CD', '1', '3303000', 'Operational Expenses', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (600, '', 'ECD13600210', 'CBT Delivery and Distribution costs: FLA (NGO) Exp', NULL, NULL, 'E', 'CD', '1', '3600210', 'Delivery and Distribution costs: FLA (NGO) Expenses', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (601, '', 'ECD13600310', 'CBT Delivery and Distribution costs: MOU (GOV/UN A', NULL, NULL, 'E', 'CD', '1', '3600310', 'Delivery and Distribution costs: MOU (GOV/UN Agency) Expenses', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (602, '', 'ECD14300800', 'CBT Coop Partner & Non WFP Employee Duty Travel', NULL, NULL, 'E', 'CD', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (603, '', 'ESA13101000', 'CS NFI Insurance Premium - Premium to Self Insur', NULL, NULL, 'E', 'SA', '1', '3101000', 'Insurance Premium - Premium to Self Insurance Fund', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (604, '', 'ESA13219100', 'CS Transportation- Land', NULL, NULL, 'E', 'SA', '1', '3219100', 'Transportation- Land (non capitalised)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (605, '', 'ESA13300000', 'CS Assesments/Pre-Appraisal', NULL, NULL, 'E', 'SA', '1', '3300000', 'ASSESSMENTS/PRE-APPRAISAL', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (606, '', 'ESA13301000', 'CS Evaluations/Surveys', NULL, NULL, 'E', 'SA', '1', '3301000', 'EVALUATIONS/SURVEYS', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (607, '', 'ESA13302000', 'CS Impact/Evaluation Monitoring', NULL, NULL, 'E', 'SA', '1', '3302000', 'IMPACT/EVALUATION MONITORING', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (608, '', 'ESA14001700', 'CS Overtime', NULL, NULL, 'E', 'SA', '1', '4001700', 'Overtime', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (609, '', 'ESA14004150', 'CS Danger Pay non-PSA funded (Int Staff)', NULL, NULL, 'E', 'SA', '1', '4004150', 'Danger Pay non-PSA funded (Int Staff)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (610, '', 'ESA14004300', 'CS Rest & Recup: Non-PSA Funded Post (Int. Staff)', NULL, NULL, 'E', 'SA', '1', '4004300', 'Rest & Recup: Non-PSA Funded Post (Int. Staff)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (611, '', 'ESA14200000', 'CS Int\'l Consultants Honoraria -Payroll', NULL, NULL, 'E', 'SA', '1', '4200000', 'Int\'l Consultants Honoraria -Payroll', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (612, '', 'ESA14200100', 'CS Actual JPO\'s Post Cost -Salary/Allow/Benefits', NULL, NULL, 'E', 'SA', '1', '4200100', 'Actual JPO\'s Post Cost -Salary/Allow/Benefits', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (613, '', 'ESA14200220', 'CS Actual JPO’s Cost – Add Hardship Allowance (AHA', NULL, NULL, 'E', 'SA', '1', '4200220', 'Actual JPO’s Cost – Add Hardship Allowance (AHA)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (614, '', 'ESA14200230', 'CS Actual JPO’s Cost – Non Family Service Allowanc', NULL, NULL, 'E', 'SA', '1', '4200230', 'Actual JPO’s Cost – Non Family Service Allowance', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (615, '', 'ESA14200300', 'CS Actual JPO\'s Post Cost - EMEA', NULL, NULL, 'E', 'SA', '1', '4200300', 'Actual JPO\'s Post Cost - EMEA', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (616, '', 'ESA14200400', 'CS Actual JPO\'s Post Cost-Assignment Grant', NULL, NULL, 'E', 'SA', '1', '4200400', 'Actual JPO\'s Post Cost-Assignment Grant', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (617, '', 'ESA14200410', 'CS Actual JPO\'s Post Cost - Settling-in Grant', NULL, NULL, 'E', 'SA', '1', '4200410', 'Actual JPO\'s Post Cost - Settling-in Grant', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (618, '', 'ESA14200500', 'CS Actual JPO\'s Post Cost - Repatriation Grant', NULL, NULL, 'E', 'SA', '1', '4200500', 'Actual JPO\'s Post Cost - Repatriation Grant', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (619, '', 'ESA14200600', 'CS Other JPO costs (JPO Fund)', NULL, NULL, 'E', 'SA', '1', '4200600', 'Other JPO costs (JPO Fund)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (620, '', 'ESA14200750', 'CS JPO Danger Pay (JPO Fund)', NULL, NULL, 'E', 'SA', '1', '4200750', 'JPO Danger Pay (JPO Fund)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (621, '', 'ESA14200800', 'CS JPO Rest & Recuperation (JPO Fund)', NULL, NULL, 'E', 'SA', '1', '4200800', 'JPO Rest & Recuperation (JPO Fund)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (622, '', 'ESA14200900', 'CS JPO Travel Entitlem Exclud. Duty Travel (JPO Fu', NULL, NULL, 'E', 'SA', '1', '4200900', 'JPO Travel Entitlem Exclud. Duty Travel (JPO Fund)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (623, '', 'ESA14200950', 'CS JPO Training and Development (JPO Fund)', NULL, NULL, 'E', 'SA', '1', '4200950', 'JPO Training and Development (JPO Fund)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (624, '', 'ESA14201000', 'CS Employee Duty Travel (WFP)', NULL, NULL, 'E', 'SA', '1', '4201000', 'Employee Duty Travel (WFP)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (625, '', 'ESA14201010', 'CS NO/GS Staff In-Country Deployment Travel', NULL, NULL, 'E', 'SA', '1', '4201010', 'NO/GS Staff In-Country Deployment Travel', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (626, '', 'ESA14201700', 'CS Int. Consultant Travel: Non Duty (WFP Only)', NULL, NULL, 'E', 'SA', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (627, '', 'ESA14201800', 'CS Temporary Assist. HQ Payroll Loc Staff', NULL, NULL, 'E', 'SA', '1', '4201800', 'Temporary Assist. HQ Payroll Loc Staff', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (628, '', 'ESA14201900', 'CS Separation Packages Setlem Loc Staff', NULL, NULL, 'E', 'SA', '1', '4201900', 'Separation Packages Setlem Loc Staff', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (629, '', 'ESA14202000', 'CS Medical Travel/Evacuation - Local Employees', NULL, NULL, 'E', 'SA', '1', '4202000', 'Medical Travel/Evacuation - Local Employees', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (630, 'X', 'ESA14202100', 'CS Residential Security NonPSA', NULL, NULL, 'E', 'SA', '1', '4202100', 'Residential Security NonPSA', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (631, '', 'ESA14300000', 'CS Local Staff - National Officer', NULL, NULL, 'E', 'SA', '1', '4300000', 'Local Staff - National Officer', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (632, '', 'ESA14300100', 'CS Local Staff - General Service', NULL, NULL, 'E', 'SA', '1', '4300100', 'Local Staff - General Service', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (633, '', 'ESA14300110', 'CS Local Staff LT Benefits Accrual', NULL, NULL, 'E', 'SA', '1', '4300110', 'Local Staff LT Benefits Accrual', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (634, '', 'ESA14300200', 'CS Local Staff -Temporary Assistance', NULL, NULL, 'E', 'SA', '1', '4300200', 'Local Staff -Temporary Assistance', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (635, '', 'ESA14300250', 'CS Casual Labour (Local)', NULL, NULL, 'E', 'SA', '1', '4300250', 'Casual Labour (Local)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (636, '', 'ESA14300300', 'CS Local Employees - Overtime', NULL, NULL, 'E', 'SA', '1', '4300300', 'Local Employees - Overtime', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (637, '', 'ESA14300350', 'CS Other Rest & Recup: Non Int.Staff &JPO Funded P', NULL, NULL, 'E', 'SA', '1', '4300350', 'Other Rest & Recup: Non Int.Staff &JPO Funded Post', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (638, '', 'ESA14300410', 'CS Other Danger Pay: Non Int. Staff & JPO Funded P', NULL, NULL, 'E', 'SA', '1', '4300410', 'Other Danger Pay: Non Int. Staff & JPO Funded Post', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (639, '', 'ESA14300500', 'CS Medical Insurance for SC, SSA & Casual Labour', NULL, NULL, 'E', 'SA', '1', '4300500', 'Medical Insurance for SC, SSA & Casual Labour', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (640, '', 'ESA14300550', 'CS MCS Employer contribution -  Non Payroll', NULL, NULL, 'E', 'SA', '1', '4300550', 'MCS Employer contribution -  Non Payroll', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (641, '', 'ESA14300560', 'CS Entry Medical Examination - Local Employees', NULL, NULL, 'E', 'SA', '1', '4300560', 'Entry Medical Examination - Local Employees', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (642, '', 'ESA14300570', 'CS DDSS payments to SC/SSA', NULL, NULL, 'E', 'SA', '1', '4300570', 'DDSS payments to SC/SSA', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (643, '', 'ESA14300600', 'CS Non Staff HR: UNV', NULL, NULL, 'E', 'SA', '1', '4300600', 'Non Staff HR: UNV', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (644, '', 'ESA14300700', 'CS Local Consultants', NULL, NULL, 'E', 'SA', '1', '4300700', 'Local Consultants', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (645, '', 'ESA14300800', 'IC-SCM Coop Partner & Non WFP Employee Duty Travel', NULL, NULL, 'E', 'SA', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (646, '', 'ESA14300900', 'CS Non Staff HR: Interns', NULL, NULL, 'E', 'SA', '1', '4300900', 'Non Staff HR: Interns', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (647, '', 'ESA16000000', 'CS Supplies & Materials-Computer Equipment', NULL, NULL, 'E', 'SA', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (648, '', 'ESA16000050', 'CS Supplies & Materials-Office Equipment', NULL, NULL, 'E', 'SA', '1', '6000050', 'Supplies & Materials-Office Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (649, '', 'ESA16000100', 'CS Supplies & Materials-Office Furniture and fixtu', NULL, NULL, 'E', 'SA', '1', '6000100', 'Supplies & Materials-Office Furniture and fixtures', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (650, 'X', 'ESA16000200', 'CS Supplies & Materials-Security and safety equipm', NULL, NULL, 'E', 'SA', '1', '6000200', 'Supplies & Materials-Security and safety equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (651, 'X', 'ESA16000300', 'CS Supplies & Materials-Telecommunication Equipmen', NULL, NULL, 'E', 'SA', '1', '6000300', 'Supplies & Materials-Telecommunication Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (652, 'X', 'ESA16000400', 'CS Supplies & Materials-Motor Vehicles', NULL, NULL, 'E', 'SA', '1', '6000400', 'Supplies & Materials-Motor Vehicles', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (653, '', 'ESA16000500', 'CS Supplies & Materials-Warehous & Workshop Equipm', NULL, NULL, 'E', 'SA', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (654, '', 'ESA16000550', 'CS S&M Buildings Permanent/Mobile', NULL, NULL, 'E', 'SA', '1', '6000550', 'Supplies & Materials- Buildings Permanent/Mobile', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (655, '', 'ESA16500000', 'CS Equipm: Agricultural Tools and Equipment', NULL, NULL, 'E', 'SA', '1', '6500000', 'Equipm: Agricultural Tools and Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (656, '', 'ESA16501000', 'CS Equipm: Kitchen/Canteen Materials & Equipment', NULL, NULL, 'E', 'SA', '1', '6501000', 'Equipm: Kitchen/Canteen Materials & Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (657, 'X', 'ESA16502000', 'CS Equipm: Health Related Material and Equipment', NULL, NULL, 'E', 'SA', '1', '6502000', 'Equipm: Health Related Material and Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (658, '', 'ESA16503000', 'CS Equipm: School Related Material and Equipment', NULL, NULL, 'E', 'SA', '1', '6503000', 'Equipm: School Related Material and Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (659, '', 'ESA16506000', 'CS Camping/Field Equipments', NULL, NULL, 'E', 'SA', '1', '6506000', 'Camping/Field Equipments', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (660, '', 'ESA16507000', 'CS Other Tools & Equipment', NULL, NULL, 'E', 'SA', '1', '6507000', 'Other Tools & Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (661, '', 'ESA16600000', 'CS Utilities - General', NULL, NULL, 'E', 'SA', '1', '6600000', 'Utilities - General', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (662, '', 'ESA16601000', 'CS Utilities - Gas', NULL, NULL, 'E', 'SA', '1', '6601000', 'Utilities - Gas', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (663, '', 'ESA16602000', 'CS Utilities - Water', NULL, NULL, 'E', 'SA', '1', '6602000', 'Utilities - Water', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (664, '', 'ESA16603000', 'CS Utilities - Electricity', NULL, NULL, 'E', 'SA', '1', '6603000', 'Utilities - Electricity', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (665, '', 'ESA16604000', 'CS Office Supplies & Other Consumables', NULL, NULL, 'E', 'SA', '1', '6604000', 'Office Supplies & Other Consumables', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (666, '', 'ESA16605000', 'CS Fuel, Diesel and Petrol: vehicles', NULL, NULL, 'E', 'SA', '1', '6605000', 'Fuel, Diesel and Petrol: vehicles', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (667, '', 'ESA16605100', 'CS Fuel: Facilities', NULL, NULL, 'E', 'SA', '1', '6605100', 'Fuel: Facilities', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (668, '', 'ESA16606000', 'CS Oil & Lubricants other', NULL, NULL, 'E', 'SA', '1', '6606000', 'Oil & Lubricants other', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (669, '', 'ESA16609000', 'CS Communications & IT Services (WFP only)', NULL, NULL, 'E', 'SA', '1', '6609000', 'Communications & IT Services (WFP only)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (670, '', 'ESA16610000', 'CS Communications & IT Services (UN Common)', NULL, NULL, 'E', 'SA', '1', '6610000', 'Communications & IT Services (UN Common)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (671, '', 'ESA17001000', 'CS Rental of Facility', NULL, NULL, 'E', 'SA', '1', '7001000', 'Rental of Facility', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (672, '', 'ESA17002000', 'CS UN Common Premises Rental', NULL, NULL, 'E', 'SA', '1', '7002000', 'UN Common Premises Rental', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (673, '', 'ESA17022000', 'CS Insurance Public Liability and Premises', NULL, NULL, 'E', 'SA', '1', '7022000', 'Insurance Public Liability and Premises', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (674, '', 'ESA17024000', 'CS Insurance Vehicles', NULL, NULL, 'E', 'SA', '1', '7024000', 'Insurance Vehicles', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (675, '', 'ESA17050000', 'CS Equipment Repairs and Maintenance', NULL, NULL, 'E', 'SA', '1', '7050000', 'Equipment Repairs and Maintenance', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (676, '', 'ESA17051000', 'CS Ordinary Premises Maintenance', NULL, NULL, 'E', 'SA', '1', '7051000', 'Ordinary Premises Maintenance', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (677, '', 'ESA17052000', 'CS Extraordinary Premises Maintenance', NULL, NULL, 'E', 'SA', '1', '7052000', 'Extraordinary Premises Maintenance', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (678, '', 'ESA17053000', 'CS Office Renovation', NULL, NULL, 'E', 'SA', '1', '7053000', 'Office Renovation', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (679, '', 'ESA17054000', 'CS Office Cleaning', NULL, NULL, 'E', 'SA', '1', '7054000', 'Office Cleaning', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (680, '', 'ESA17055000', 'CS Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'SA', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (681, '', 'ESA17056000', 'Cap. Str. Roads', NULL, NULL, 'E', 'SA', '1', '7056000', 'Roads', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (682, '', 'ESA17057000', 'Cap. Streng. Ports', NULL, NULL, 'E', 'SA', '1', '7057000', 'Ports', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (683, '', 'ESA17058000', 'CS Airports & Airstrips', NULL, NULL, 'E', 'SA', '1', '7058000', 'Airports & Airstrips', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (684, '', 'ESA17059000', 'CS Other Construction/Rehabilitation Serv', NULL, NULL, 'E', 'SA', '1', '7059000', 'Other Construction/Rehabilitation Serv', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (685, 'X', 'ESA17100000', 'CS Vehicle Leasing', NULL, NULL, 'E', 'SA', '1', '7100000', 'Vehicle Leasing', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (686, '', 'ESA17100100', 'CS Equipment Leasing', NULL, NULL, 'E', 'SA', '1', '7100100', 'Equipment Leasing', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (687, '', 'ESA17102000', 'CS Other Office Expenses & Services (WFP Only)', NULL, NULL, 'E', 'SA', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (688, '', 'ESA17102010', 'CS Meetings & Workshops', NULL, NULL, 'E', 'SA', '1', '7102010', 'Meetings & Workshops', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (689, '', 'ESA17103000', 'CS Other UN Common Services (excluding Security)', NULL, NULL, 'E', 'SA', '1', '7103000', 'Other UN Common Services (excluding Security)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (690, '', 'ESA17118000', 'CS Security Guard Services ', NULL, NULL, 'E', 'SA', '1', '7118000', 'Security Guard Services ', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (691, '', 'ESA17119000', 'CS Commercial Consultancy Services', NULL, NULL, 'E', 'SA', '1', '7119000', 'Commercial Consultancy Services', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (692, '', 'ESA17119100', 'CS Translation & Editing Services', NULL, NULL, 'E', 'SA', '1', '7119100', 'Translation & Editing Services', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (693, '', 'ESA17119200', 'CS Printing Services - External', NULL, NULL, 'E', 'SA', '1', '7119200', 'Printing Services - External', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (694, '', 'ESA17200000', 'CS Internal Service Fee (MCR)-UNHRD', NULL, NULL, 'E', 'SA', '1', '7200000', 'Internal Service Fee (MCR)- UNHRD', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (695, '', 'ESA17201000', 'CS Internal Services provided - UNHRD', NULL, NULL, 'E', 'SA', '1', '7201000', 'Internal Services provided - UNHRD', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (696, '', 'ESA17204000', 'CS Internal Service Fee (MCR) - Aviation', NULL, NULL, 'E', 'SA', '1', '7204000', 'Internal Service Fee (MCR) - Aviation', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (697, '', 'ESA17205000', 'Cap. Stren. Internal Services provided - Aviation', NULL, NULL, 'E', 'SA', '1', '7205000', 'Internal Services provided - Aviation', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (698, '', 'ESA17209050', 'CS Internal Services Provided – IT PER CAPITA', NULL, NULL, 'E', 'SA', '1', '7209050', 'Internal Services Provided – IT PER CAPITA', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (699, '', 'ESA17209070', 'CS IInternal Services – Security costs recoveries', NULL, NULL, 'E', 'SA', '1', '7209070', 'IInternal Services – Security costs recoveries', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (700, '', 'ESA1730300', 'CS Computer equipment', NULL, NULL, 'E', 'SA', '1', '730300', 'Computer equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (701, '', 'ESA1730350', 'CS Office equipment', NULL, NULL, 'E', 'SA', '1', '730350', 'Office equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (702, '', 'ESA1730400', 'CS Office Furniture and fixtures', NULL, NULL, 'E', 'SA', '1', '730400', 'Office Furniture and fixtures', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (703, '', 'ESA1730500', 'CS Security and safety equipment', NULL, NULL, 'E', 'SA', '1', '730500', 'Security and safety equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (704, '', 'ESA1730600', 'CS Telecommunication Equipment', NULL, NULL, 'E', 'SA', '1', '730600', 'Telecommunication Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (705, 'X', 'ESA1730700', 'CS Motor Vehicles Equipment', NULL, NULL, 'E', 'SA', '1', '730700', 'Motor Vehicles Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (706, '', 'ESA1730800', 'CS Workshop & Warehouse Equipment', NULL, NULL, 'E', 'SA', '1', '730800', 'Workshop & Warehouse Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (707, '', 'ESA17312000', 'CS Transport & Other Related Ocean', NULL, NULL, 'E', 'SA', '1', '7312000', 'Transport & Other Related Ocean', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (708, '', 'ESA1811300', 'CS Standard Staff Cost  (HQ Payroll)', NULL, NULL, 'E', 'SA', '1', '811300', 'Standard Staff Cost  (HQ Payroll)', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (709, '', 'ESA18140010', 'CS Other accounts receivable writte off', NULL, NULL, 'E', 'SA', '1', '8140010', 'Other accounts receivable writte off', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (710, '', 'ESA18402000', 'CS Advocacy & Public Information', NULL, NULL, 'E', 'SA', '1', '8402000', 'Advocacy & Public Information', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (711, '', 'ESA26506000', 'CS Camping/Field Equipments (IK)', NULL, NULL, 'E', 'SA', '2', '6506000', 'Camping/Field Equipments', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (712, '', 'ESA27119000', 'CS Com. Cons. Serv. (IK)', NULL, NULL, 'E', 'SA', '2', '7119000', 'Commercial Consultancy Services', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (713, '', 'ESB13240010', 'CS Fixed costs: FLA (NGO) Expenses', NULL, NULL, 'E', 'SB', '1', '3240010', 'Fixed costs: FLA (NGO) Expenses', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (714, '', 'ESB13240020', 'CS Fixed costs: MOU (GOV/UN Agency) Expenses', NULL, NULL, 'E', 'SB', '1', '3240020', 'Fixed costs: MOU (GOV/UN Agency) Expenses', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (715, 'X', 'ESB13303000', 'CS Operational Expenses', NULL, NULL, 'E', 'SB', '1', '3303000', 'Operational Expenses', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (716, '', 'ESB13600210', 'CS Delivery and Distribution costs: FLA (NGO) Expe', NULL, NULL, 'E', 'SB', '1', '3600210', 'Delivery and Distribution costs: FLA (NGO) Expenses', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (717, '', 'ESB13600310', 'CS Delivery and Distribution costs: MOU (GOV/UN Ag', NULL, NULL, 'E', 'SB', '1', '3600310', 'Delivery and Distribution costs: MOU (GOV/UN Agency) Expenses', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (718, '', 'ESB14300800', 'CS Coop Partner & Non WFP Employee Duty Travel', NULL, NULL, 'E', 'SB', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (719, '', 'EDA13101000', 'SD Insurance Premium - Premium to Self Insur', NULL, NULL, 'E', 'DA', '1', '3101000', 'Insurance Premium - Premium to Self Insurance Fund', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (720, '', 'EDA13108000', 'SD Other Insurance Acco', NULL, NULL, 'E', 'DA', '1', '3108000', 'Other Insurance Account Costs, legal fees, etc.', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (721, '', 'EDA13200000', 'SD AirOps - Aircraft contract/charter', NULL, NULL, 'E', 'DA', '1', '3200000', 'AirOps - Aircraft contract/charter', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (722, '', 'EDA13201000', 'SD AirOps - Aircraft operational support services', NULL, NULL, 'E', 'DA', '1', '3201000', 'AirOps - Aircraft operational support services', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (723, '', 'EDA13202000', 'SD AirOps - Aircraft painting', NULL, NULL, 'E', 'DA', '1', '3202000', 'AirOps - Aircraft painting', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (724, '', 'EDA13203000', 'SD AirOps-Aircraft Positioning&Dep.Charg', NULL, NULL, 'E', 'DA', '1', '3203000', 'AirOps - Aircraft Position & Deposition Charges', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (725, '', 'EDA13204000', 'SD AirOps - Aviation Fuel', NULL, NULL, 'E', 'DA', '1', '3204000', 'AirOps - Aviation fuel', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (726, '', 'EDA13205000', 'SD AirOps - Aviation Oil&Lubricants', NULL, NULL, 'E', 'DA', '1', '3205000', 'AirOps - Aviation Oil & Lubricants', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (727, '', 'EDA13207000', 'SD AirOps - Aircraft navigation charges', NULL, NULL, 'E', 'DA', '1', '3207000', 'AirOps - Aircraft navigation charges', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (728, '', 'EDA13208000', 'SD AirOps - Aircraft overflight, landing & parking', NULL, NULL, 'E', 'DA', '1', '3208000', 'AirOps - Aircraft overflight, landing & parking', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (729, '', 'EDA13209000', 'SD AirOps - Cargo Storage & miscellaneous', NULL, NULL, 'E', 'DA', '1', '3209000', 'AirOps - Cargo Storage & miscellaneous', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (730, '', 'EDA13210000', 'SD AirOps - Aircraft ground handling', NULL, NULL, 'E', 'DA', '1', '3210000', 'AirOps - Aircraft ground handling', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (731, '', 'EDA13211000', 'SD AirOps - Passenger handling charges', NULL, NULL, 'E', 'DA', '1', '3211000', 'AirOps - Passenger handling charges', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (732, '', 'EDA13212000', 'SD AirOps - Cargo handling charges', NULL, NULL, 'E', 'DA', '1', '3212000', 'AirOps - Cargo handling charges', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (733, '', 'EDA13213000', 'SD AirOps - In-Flight Catering', NULL, NULL, 'E', 'DA', '1', '3213000', 'AirOps - In-Flight Catering', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (734, '', 'EDA13214000', 'SD AirOps - War Risk insurance', NULL, NULL, 'E', 'DA', '1', '3214000', 'AirOps - War risk insurance', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (735, '', 'EDA13215000', 'SD AirOps - Aircrew accomodation, meal & transport', NULL, NULL, 'E', 'DA', '1', '3215000', 'AirOps - Aircrew accomodation, meal & transport', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (736, '', 'EDA13216000', 'SD AirOps - Airport Construction Services', NULL, NULL, 'E', 'DA', '1', '3216000', 'AirOps - Airport Construction Services', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (737, '', 'EDA13217000', 'SD AirOps - Air Tracking Charges', NULL, NULL, 'E', 'DA', '1', '3217000', 'AirOps - Air Tracking Charges', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (738, '', 'EDA13218000', 'SD Transport for Intern', NULL, NULL, 'E', 'DA', '1', '3218000', 'Transport for Internal Sales- Sea Freight (non cap', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (739, '', 'EDA13218100', 'SD Transportation- Sea ', NULL, NULL, 'E', 'DA', '1', '3218100', 'Transportation- Sea Freight (non capitalised)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (740, '', 'EDA13219000', 'SD Transpor for Interna', NULL, NULL, 'E', 'DA', '1', '3219000', 'Transpor for Internal Sales - Land (non capitalise', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (741, '', 'EDA13219050', 'SD Transport for Intern', NULL, NULL, 'E', 'DA', '1', '3219050', 'Transport for Internal Sales - Air (non capitalise', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (742, '', 'EDA13219100', 'SD Transportation- Land', NULL, NULL, 'E', 'DA', '1', '3219100', 'Transportation- Land (non capitalised)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (743, '', 'EDA13219150', 'SD Transportation - Air', NULL, NULL, 'E', 'DA', '1', '3219150', 'Transportation - Air (non capitalised)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (744, '', 'EDA23219150', 'SD Transportation Air IK (non capitalised)', NULL, NULL, 'E', 'DA', '2', '3219150', 'Transportation - Air (non capitalised)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (745, '', 'EDA13300000', 'SD ASSESSMENTS/PRE-APPRAISAL', NULL, NULL, 'E', 'DA', '1', '3300000', 'ASSESSMENTS/PRE-APPRAISAL', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (746, '', 'EDA13301000', 'SD EVALUATIONS/SURVEYS', NULL, NULL, 'E', 'DA', '1', '3301000', 'EVALUATIONS/SURVEYS', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (747, '', 'EDA13302000', 'SD IMPACT/EVALUATION MONITORING', NULL, NULL, 'E', 'DA', '1', '3302000', 'IMPACT/EVALUATION MONITORING', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (748, '', 'EDA14001700', 'SD Overtime', NULL, NULL, 'E', 'DA', '1', '4001700', 'Overtime', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (749, '', 'EDA14004150', 'SD Danger Pay non-PSA funded (Int Staff)', NULL, NULL, 'E', 'DA', '1', '4004150', 'Danger Pay non-PSA funded (Int Staff)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (750, '', 'EDA14004300', 'SD Rest & Recup: Non-PSA Funded Post (Int. Staff)', NULL, NULL, 'E', 'DA', '1', '4004300', 'Rest & Recup: Non-PSA Funded Post (Int. Staff)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (751, '', 'EDA14200000', 'SD Int\'l Consultants Honoraria -Payroll', NULL, NULL, 'E', 'DA', '1', '4200000', 'Int\'l Consultants Honoraria -Payroll', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (752, '', 'EDA14200100', 'SD Actual JPO\'s Post Cost -Salary/Allow/Benefits', NULL, NULL, 'E', 'DA', '1', '4200100', 'Actual JPO\'s Post Cost -Salary/Allow/Benefits', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (753, '', 'EDA14200220', 'SD Actual JPO’s Cost – Add Hardship Allowance (AHA', NULL, NULL, 'E', 'DA', '1', '4200220', 'Actual JPO’s Cost – Add Hardship Allowance (AHA)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (754, '', 'EDA14200230', 'SD Actual JPO’s Cost – Non Family Service Allowanc', NULL, NULL, 'E', 'DA', '1', '4200230', 'Actual JPO’s Cost – Non Family Service Allowance', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (755, '', 'EDA14200300', 'SD Actual JPO\'s Post Cost - EMEA', NULL, NULL, 'E', 'DA', '1', '4200300', 'Actual JPO\'s Post Cost - EMEA', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (756, '', 'EDA14200400', 'SD Actual JPO\'s Post Cost-Assignment Grant', NULL, NULL, 'E', 'DA', '1', '4200400', 'Actual JPO\'s Post Cost-Assignment Grant', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (757, '', 'EDA14200410', 'SD Actual JPO\'s Post Cost - Settling-in Grant', NULL, NULL, 'E', 'DA', '1', '4200410', 'Actual JPO\'s Post Cost - Settling-in Grant', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (758, '', 'EDA14200500', 'SD Actual JPO\'s Post Cost - Repatriation Grant', NULL, NULL, 'E', 'DA', '1', '4200500', 'Actual JPO\'s Post Cost - Repatriation Grant', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (759, '', 'EDA14200600', 'SD Other JPO costs (JPO Fund)', NULL, NULL, 'E', 'DA', '1', '4200600', 'Other JPO costs (JPO Fund)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (760, '', 'EDA14200750', 'SD JPO Danger Pay (JPO Fund)', NULL, NULL, 'E', 'DA', '1', '4200750', 'JPO Danger Pay (JPO Fund)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (761, '', 'EDA14200800', 'SD JPO Rest & Recuperation (JPO Fund)', NULL, NULL, 'E', 'DA', '1', '4200800', 'JPO Rest & Recuperation (JPO Fund)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (762, '', 'EDA14200900', 'SD JPO Travel Entitlem Exclud. Duty Travel (JPO Fu', NULL, NULL, 'E', 'DA', '1', '4200900', 'JPO Travel Entitlem Exclud. Duty Travel (JPO Fund)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (763, '', 'EDA14200950', 'SD JPO Training and Development (JPO Fund)', NULL, NULL, 'E', 'DA', '1', '4200950', 'JPO Training and Development (JPO Fund)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (764, '', 'EDA14201000', 'SD Employee Duty Travel (WFP)', NULL, NULL, 'E', 'DA', '1', '4201000', 'Employee Duty Travel (WFP)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (765, '', 'EDA14201010', 'SD NO/GS Staff In-Country Deployment Travel', NULL, NULL, 'E', 'DA', '1', '4201010', 'NO/GS Staff In-Country Deployment Travel', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (766, '', 'EDA14201700', 'SD Int. Consultant Travel: Non Duty (WFP Only)', NULL, NULL, 'E', 'DA', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (767, '', 'EDA14201800', 'SD Temporary Assist. HQ Payroll Loc Staff', NULL, NULL, 'E', 'DA', '1', '4201800', 'Temporary Assist. HQ Payroll Loc Staff', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (768, '', 'EDA14201900', 'SD Separation Packages Setlem Loc Staff', NULL, NULL, 'E', 'DA', '1', '4201900', 'Separation Packages Setlem Loc Staff', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (769, '', 'EDA14202000', 'SD Medical Travel/Evacuation - Local Employees', NULL, NULL, 'E', 'DA', '1', '4202000', 'Medical Travel/Evacuation - Local Employees', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (770, 'X', 'EDA14202100', 'SD Residential Security NonPSA', NULL, NULL, 'E', 'DA', '1', '4202100', 'Residential Security NonPSA', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (771, '', 'EDA14300000', 'SD Local Staff - National Officer', NULL, NULL, 'E', 'DA', '1', '4300000', 'Local Staff - National Officer', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (772, '', 'EDA14300100', 'SD Local Staff - General Service', NULL, NULL, 'E', 'DA', '1', '4300100', 'Local Staff - General Service', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (773, '', 'EDA14300110', 'SD Local Staff LT Benefits Accrual', NULL, NULL, 'E', 'DA', '1', '4300110', 'Local Staff LT Benefits Accrual', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (774, '', 'EDA14300200', 'SD Local Staff -Temporary Assistance', NULL, NULL, 'E', 'DA', '1', '4300200', 'Local Staff -Temporary Assistance', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (775, '', 'EDA14300250', 'SD Casual Labour (Local)', NULL, NULL, 'E', 'DA', '1', '4300250', 'Casual Labour (Local)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (776, '', 'EDA14300300', 'SD Local Employees - Overtime', NULL, NULL, 'E', 'DA', '1', '4300300', 'Local Employees - Overtime', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (777, '', 'EDA14300350', 'SD Other Rest & Recup: Non Int.Staff &JPO Funded P', NULL, NULL, 'E', 'DA', '1', '4300350', 'Other Rest & Recup: Non Int.Staff &JPO Funded Post', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (778, '', 'EDA14300410', 'SD Other Danger Pay: Non Int. Staff & JPO Funded P', NULL, NULL, 'E', 'DA', '1', '4300410', 'Other Danger Pay: Non Int. Staff & JPO Funded Post', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (779, '', 'EDA14300500', 'SD Medical Insurance for SC, SSA & Casual Labour', NULL, NULL, 'E', 'DA', '1', '4300500', 'Medical Insurance for SC, SSA & Casual Labour', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (780, '', 'EDA14300550', 'SD MCS Employer contribution -  Non Payroll', NULL, NULL, 'E', 'DA', '1', '4300550', 'MCS Employer contribution -  Non Payroll', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (781, '', 'EDA14300560', 'SD Entry Medical Examination - Local Employees', NULL, NULL, 'E', 'DA', '1', '4300560', 'Entry Medical Examination - Local Employees', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (782, '', 'EDA14300570', 'SD DDSS payments to SC/SSA', NULL, NULL, 'E', 'DA', '1', '4300570', 'DDSS payments to SC/SSA', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (783, '', 'EDA14300600', 'SD Non Staff HR: UNV', NULL, NULL, 'E', 'DA', '1', '4300600', 'Non Staff HR: UNV', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (784, '', 'EDA14300700', 'SD Local Consultants', NULL, NULL, 'E', 'DA', '1', '4300700', 'Local Consultants', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (785, '', 'EDA14300800', 'IC-SCM Coop Partner & Non WFP Employee Duty Travel', NULL, NULL, 'E', 'DA', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (786, '', 'EDA14300900', 'SD Non Staff HR: Interns', NULL, NULL, 'E', 'DA', '1', '4300900', 'Non Staff HR: Interns', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (787, '', 'EDA16000000', 'SD S&M Computer Equipment', NULL, NULL, 'E', 'DA', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (788, '', 'EDA16000050', 'SD S&M Office Equipment', NULL, NULL, 'E', 'DA', '1', '6000050', 'Supplies & Materials-Office Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (789, '', 'EDA16000100', 'SD S&M Office Furniture and', NULL, NULL, 'E', 'DA', '1', '6000100', 'Supplies & Materials-Office Furniture and fixtures', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (790, 'X', 'EDA16000200', 'SD S&M Security and safety ', NULL, NULL, 'E', 'DA', '1', '6000200', 'Supplies & Materials-Security and safety equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (791, 'X', 'EDA16000300', 'SD S&M Telecommunication Eq', NULL, NULL, 'E', 'DA', '1', '6000300', 'Supplies & Materials-Telecommunication Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (792, 'X', 'EDA16000400', 'SD S&M Motor Vehicles', NULL, NULL, 'E', 'DA', '1', '6000400', 'Supplies & Materials-Motor Vehicles', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (793, '', 'EDA16000500', 'SD S&M Warehous & Workshop ', NULL, NULL, 'E', 'DA', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (794, '', 'EDA16000550', 'SD S&M  Buildings Permanent', NULL, NULL, 'E', 'DA', '1', '6000550', 'Supplies & Materials- Buildings Permanent/Mobile', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (795, '', 'EDA16500000', 'SD Eq  Agricultural Tools ', NULL, NULL, 'E', 'DA', '1', '6500000', 'Equipm: Agricultural Tools and Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (796, '', 'EDA16501000', 'SD Eq  Kitchen/Canteen Mat', NULL, NULL, 'E', 'DA', '1', '6501000', 'Equipm: Kitchen/Canteen Materials & Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (797, 'X', 'EDA16502000', 'SD Eq  Health Related Mate', NULL, NULL, 'E', 'DA', '1', '6502000', 'Equipm: Health Related Material and Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (798, '', 'EDA16503000', 'SD Eq  School Related Mate', NULL, NULL, 'E', 'DA', '1', '6503000', 'Equipm: School Related Material and Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (799, '', 'EDA16504000', 'SD Eq  Building Material (', NULL, NULL, 'E', 'DA', '1', '6504000', 'Equipm: Building Material (for SO\'s only)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (800, '', 'EDA16505000', 'SD Warehouse - Packagin', NULL, NULL, 'E', 'DA', '1', '6505000', 'Warehouse - Packaging Materials', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (801, '', 'EDA16506000', 'SD Camping/Field Equipments', NULL, NULL, 'E', 'DA', '1', '6506000', 'Camping/Field Equipments', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (802, '', 'EDA16507000', 'SD Other Tools & Equipm', NULL, NULL, 'E', 'DA', '1', '6507000', 'Other Tools & Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (803, '', 'EDA26507000', 'SD Other Tools & Equipment (IK)', NULL, NULL, 'E', 'DA', '2', '6507000', 'Other Tools & Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (804, '', 'EDA16600000', 'SD Utilities - General', NULL, NULL, 'E', 'DA', '1', '6600000', 'Utilities - General', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (805, '', 'EDA16601000', 'SD Utilities - Gas', NULL, NULL, 'E', 'DA', '1', '6601000', 'Utilities - Gas', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (806, '', 'EDA16602000', 'SD Utilities - Water', NULL, NULL, 'E', 'DA', '1', '6602000', 'Utilities - Water', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (807, '', 'EDA16603000', 'SD Utilities - Electricity', NULL, NULL, 'E', 'DA', '1', '6603000', 'Utilities - Electricity', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (808, '', 'EDA16604000', 'SD Office Supplies & Other Consumables', NULL, NULL, 'E', 'DA', '1', '6604000', 'Office Supplies & Other Consumables', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (809, '', 'EDA16605000', 'SD Fuel, Diesel and Pet', NULL, NULL, 'E', 'DA', '1', '6605000', 'Fuel, Diesel and Petrol: vehicles', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (810, '', 'EDA16605100', 'SD Fuel: Facilities', NULL, NULL, 'E', 'DA', '1', '6605100', 'Fuel: Facilities', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (811, '', 'EDA16606000', 'SD Oil & Lubricants oth', NULL, NULL, 'E', 'DA', '1', '6606000', 'Oil & Lubricants other', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (812, '', 'EDA16609000', 'SD Communications & IT ', NULL, NULL, 'E', 'DA', '1', '6609000', 'Communications & IT Services (WFP only)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (813, '', 'EDA16610000', 'SD Communications & IT ', NULL, NULL, 'E', 'DA', '1', '6610000', 'Communications & IT Services (UN Common)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (814, '', 'EDA17001000', 'SD Rental of Facility', NULL, NULL, 'E', 'DA', '1', '7001000', 'Rental of Facility', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (815, '', 'EDA17002000', 'SD UN Common Premises Rental', NULL, NULL, 'E', 'DA', '1', '7002000', 'UN Common Premises Rental', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (816, '', 'EDA17022000', 'SD Insurance Public Liability and Premises', NULL, NULL, 'E', 'DA', '1', '7022000', 'Insurance Public Liability and Premises', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (817, '', 'EDA17024000', 'SD Insurance Vehicles', NULL, NULL, 'E', 'DA', '1', '7024000', 'Insurance Vehicles', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (818, '', 'EDA17050000', 'SD Equipment Repairs an', NULL, NULL, 'E', 'DA', '1', '7050000', 'Equipment Repairs and Maintenance', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (819, '', 'EDA17051000', 'SD Ordinary Premises Maintenance', NULL, NULL, 'E', 'DA', '1', '7051000', 'Ordinary Premises Maintenance', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (820, '', 'EDA17052000', 'SD Extraordinary Premises Maintenance', NULL, NULL, 'E', 'DA', '1', '7052000', 'Extraordinary Premises Maintenance', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (821, '', 'EDA17053000', 'SD Office Renovation', NULL, NULL, 'E', 'DA', '1', '7053000', 'Office Renovation', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (822, '', 'EDA17054000', 'SD Office Cleaning', NULL, NULL, 'E', 'DA', '1', '7054000', 'Office Cleaning', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (823, '', 'EDA17055000', 'SD Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'DA', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (824, '', 'EDA17100000', 'SD Vehicle Leasing', NULL, NULL, 'E', 'DA', '1', '7100000', 'Vehicle Leasing', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (825, '', 'EDA17100100', 'SD Equipment Leasing', NULL, NULL, 'E', 'DA', '1', '7100100', 'Equipment Leasing', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (826, '', 'EDA17102000', 'SD Other Office Expenses & Services (WFP Only)', NULL, NULL, 'E', 'DA', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (827, '', 'EDA17102010', 'SD Meetings & Workshops', NULL, NULL, 'E', 'DA', '1', '7102010', 'Meetings & Workshops', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (828, '', 'EDA17103000', 'SD Other UN Common Serv', NULL, NULL, 'E', 'DA', '1', '7103000', 'Other UN Common Services (excluding Security)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (829, '', 'EDA17118000', 'SD Security Guard Services ', NULL, NULL, 'E', 'DA', '1', '7118000', 'Security Guard Services ', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (830, '', 'EDA17119000', 'SD Commercial Consultancy Services', NULL, NULL, 'E', 'DA', '1', '7119000', 'Commercial Consultancy Services', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (831, '', 'EDA17119310', 'SD Field Engineering Services  (ODI)', NULL, NULL, 'E', 'DA', '1', '7119310', 'Field Engineering Services  (ODI)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (832, '', 'EDA17200000', 'SD Int Serv e Fee (MCR)- UNHRD', NULL, NULL, 'E', 'DA', '1', '7200000', 'Internal Service Fee (MCR)- UNHRD', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (833, '', 'EDA17201000', 'SD Int Serv es provided - UNHRD', NULL, NULL, 'E', 'DA', '1', '7201000', 'Internal Services provided - UNHRD', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (834, '', 'EDA17202000', 'SD Internal Service Fee (MCR)- GVLP', NULL, NULL, 'E', 'DA', '1', '7202000', 'Internal Service Fee (MCR)- GVLP', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (835, '', 'EDA17203000', 'SD Internal Services provided - GVLP', NULL, NULL, 'E', 'DA', '1', '7203000', 'Internal Services provided - GVLP', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (836, '', 'EDA17204000', 'SD Internal Service Fee (MCR) - Aviation', NULL, NULL, 'E', 'DA', '1', '7204000', 'Internal Service Fee (MCR) - Aviation', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (837, '', 'EDA17205000', 'SD Internal Services provided - Aviation', NULL, NULL, 'E', 'DA', '1', '7205000', 'Internal Services provided - Aviation', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (838, '', 'EDA17206000', 'SD Int Serv e Fee (MCR)- FESO', NULL, NULL, 'E', 'DA', '1', '7206000', 'Internal Service Fee (MCR)- FESO', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (839, '', 'EDA17207000', 'SD Int Serv es provided - FESO', NULL, NULL, 'E', 'DA', '1', '7207000', 'Internal Services provided - FESO', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (840, '', 'EDA17208000', 'SD Int Serv e Fee (MCR)- FITTEST', NULL, NULL, 'E', 'DA', '1', '7208000', 'Internal Service Fee (MCR)- FITTEST', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (841, '', 'EDA17209000', 'SD Int Serv es provided - FITTES', NULL, NULL, 'E', 'DA', '1', '7209000', 'Internal Services provided - FITTEST', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (842, '', 'EDA17209050', 'SD Internal Services Provided – IT PER CAPITA', NULL, NULL, 'E', 'DA', '1', '7209050', 'Internal Services Provided – IT PER CAPITA', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (843, '', 'EDA17209070', 'SD IInternal Services –', NULL, NULL, 'E', 'DA', '1', '7209070', 'IInternal Services – Security costs recoveries', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (844, '', 'EDA17209100', 'SD Logistics SA Interna', NULL, NULL, 'E', 'DA', '1', '7209100', 'Logistics SA Internal Serv Stand by costs', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (845, '', 'EDA17209200', 'SD Logistics SA Interna', NULL, NULL, 'E', 'DA', '1', '7209200', 'Logistics SA Internal Serv Deployment costs', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (846, '', 'EDA1730100', 'SD Buildings - permanen', NULL, NULL, 'E', 'DA', '1', '730100', 'Buildings - permanent', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (847, '', 'EDA1730200', 'SD Buildings - mobile', NULL, NULL, 'E', 'DA', '1', '730200', 'Buildings - mobile', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (848, '', 'EDA1730300', 'SD Computer equipment', NULL, NULL, 'E', 'DA', '1', '730300', 'Computer equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (849, '', 'EDA1730350', 'SD Office equipment', NULL, NULL, 'E', 'DA', '1', '730350', 'Office equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (850, '', 'EDA1730400', 'SD Office Furniture and', NULL, NULL, 'E', 'DA', '1', '730400', 'Office Furniture and fixtures', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (851, '', 'EDA1730500', 'SD Security and safety ', NULL, NULL, 'E', 'DA', '1', '730500', 'Security and safety equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (852, '', 'EDA1730600', 'SD Telecommunication Eq', NULL, NULL, 'E', 'DA', '1', '730600', 'Telecommunication Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (853, '', 'EDA1730700', 'SD Motor Vehicles Equip', NULL, NULL, 'E', 'DA', '1', '730700', 'Motor Vehicles Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (854, '', 'EDA1730800', 'SD Workshop & Warehouse', NULL, NULL, 'E', 'DA', '1', '730800', 'Workshop & Warehouse Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (855, '', 'EDA17312000', 'SD Transport & Other Related Ocean', NULL, NULL, 'E', 'DA', '1', '7312000', 'Transport & Other Related Ocean', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (856, '', 'EDA1811300', 'SD Standard Staff Cost  (HQ Payroll)', NULL, NULL, 'E', 'DA', '1', '811300', 'Standard Staff Cost  (HQ Payroll)', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (857, '', 'EDA1817520', 'SD NFT Procurement Service Delivery', NULL, NULL, 'E', 'DA', '1', '817520', 'NFI Procurement Service Delivery - pass through', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (858, '', 'EDA1817530', 'SD Engineering Service Delivery', NULL, NULL, 'E', 'DA', '1', '817530', 'Engineering Service Delivery - pass through', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (859, '', 'EDA26506000', 'SD Camping/Field Equipments (IK)', NULL, NULL, 'E', 'DA', '2', '6506000', 'Camping/Field Equipments', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (860, '', 'EDA27119000', 'SD Com. Cons. Serv. (IK)', NULL, NULL, 'E', 'DA', '2', '7119000', 'Commercial Consultancy Services', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (861, '', 'EDA2730700', 'SD Mot Veh Equip (IK)', NULL, NULL, 'E', 'DA', '2', '730700', 'Motor Vehicles Equipment', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (862, '', 'EDB13240010', 'SD Fixed costs: FLA (NGO) Expenses', NULL, NULL, 'E', 'DB', '1', '3240010', 'Fixed costs: FLA (NGO) Expenses', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (863, '', 'EDB13240020', 'SD Fixed costs: MOU (GOV/UN Agency) Expenses', NULL, NULL, 'E', 'DB', '1', '3240020', 'Fixed costs: MOU (GOV/UN Agency) Expenses', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (864, 'X', 'EDB13303000', 'SD Operational Expenses', NULL, NULL, 'E', 'DB', '1', '3303000', 'Operational Expenses', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (865, '', 'EDB13600210', 'SD Delivery and Distribution costs: FLA (NGO) Expe', NULL, NULL, 'E', 'DB', '1', '3600210', 'Delivery and Distribution costs: FLA (NGO) Expenses', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (866, '', 'EDB13600310', 'SD Delivery and Distribution costs: MOU (GOV/UN Ag', NULL, NULL, 'E', 'DB', '1', '3600310', 'Delivery and Distribution costs: MOU (GOV/UN Agency) Expenses', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (867, '', 'EDB14300800', 'SD Coop Partner & Non WFP Employee Duty Travel', NULL, NULL, 'E', 'DB', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (868, '', 'EIA13108000', 'Activ mgmt - Other Insurance Account Costs, legal', NULL, NULL, 'E', 'IA', '1', '3108000', 'Other Insurance Account Costs, legal fees, etc.', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (869, '', 'EIA13219100', 'Activ.mgmt Transportation- Land', NULL, NULL, 'E', 'IA', '1', '3219100', 'Transportation- Land (non capitalised)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (870, '', 'EIA13300000', 'Activ.Mgmt. Assesments/Pre-Appraisal', NULL, NULL, 'E', 'IA', '1', '3300000', 'ASSESSMENTS/PRE-APPRAISAL', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (871, '', 'EIA13302100', 'Activ.mgmt - Mid-Term evaluation', NULL, NULL, 'E', 'IA', '1', '3302100', 'Mid-Term evaluation', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (872, '', 'EIA13302200', 'Activ.mgmt - Cont. serv. Monitoring', NULL, NULL, 'E', 'IA', '1', '3302200', 'Cont. serv. Monitoring', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (873, '', 'EIA13302300', 'Activ.mgmt - Cont. Serv. Evaluation', NULL, NULL, 'E', 'IA', '1', '3302300', 'Cont. Serv. Evaluation', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (874, 'X', 'EIA13303000', 'Activ mgmt - Operational Expenses', NULL, NULL, 'E', 'IA', '1', '3303000', 'Operational Expenses', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (875, '', 'EIA14001700', 'Activ.mgmt Overtime', NULL, NULL, 'E', 'IA', '1', '4001700', 'Overtime', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (876, '', 'EIA14004150', 'Activ.mgmt Danger Pay non-PSA funded (Int Staff)', NULL, NULL, 'E', 'IA', '1', '4004150', 'Danger Pay non-PSA funded (Int Staff)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (877, '', 'EIA14004300', 'Activ.mgmt Rest & Recup: Non-PSA Funded Post (Int.', NULL, NULL, 'E', 'IA', '1', '4004300', 'Rest & Recup: Non-PSA Funded Post (Int. Staff)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (878, '', 'EIA14200000', 'Activ.mgmt Int\'l Consultants Honoraria -Payroll', NULL, NULL, 'E', 'IA', '1', '4200000', 'Int\'l Consultants Honoraria -Payroll', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (879, '', 'EIA14200100', 'Activ.mgmt Actual JPO\'s Post Cost -Salary/Allow/Be', NULL, NULL, 'E', 'IA', '1', '4200100', 'Actual JPO\'s Post Cost -Salary/Allow/Benefits', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (880, '', 'EIA14200220', 'Activ.mgmt Actual JPO’s Cost – Add Hardship Allowa', NULL, NULL, 'E', 'IA', '1', '4200220', 'Actual JPO’s Cost – Add Hardship Allowance (AHA)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (881, '', 'EIA14200230', 'Activ.mgmt Actual JPO’s Cost – Non Family Service', NULL, NULL, 'E', 'IA', '1', '4200230', 'Actual JPO’s Cost – Non Family Service Allowance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (882, '', 'EIA14200300', 'Activ.mgmt Actual JPO\'s Post Cost - EMEA', NULL, NULL, 'E', 'IA', '1', '4200300', 'Actual JPO\'s Post Cost - EMEA', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (883, '', 'EIA14200400', 'Activ.mgmt Actual JPO\'s Post Cost-Assignment Grant', NULL, NULL, 'E', 'IA', '1', '4200400', 'Actual JPO\'s Post Cost-Assignment Grant', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (884, '', 'EIA14200410', 'Activ.mgmt Actual JPO\'s Post Cost - Settling-in Gr', NULL, NULL, 'E', 'IA', '1', '4200410', 'Actual JPO\'s Post Cost - Settling-in Grant', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (885, '', 'EIA14200500', 'Activ.mgmt Actual JPO\'s Post Cost - Repatriation G', NULL, NULL, 'E', 'IA', '1', '4200500', 'Actual JPO\'s Post Cost - Repatriation Grant', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (886, '', 'EIA14200600', 'Activ.mgmt Other JPO costs (JPO Fund)', NULL, NULL, 'E', 'IA', '1', '4200600', 'Other JPO costs (JPO Fund)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (887, '', 'EIA14200750', 'Activ.mgmt JPO Danger Pay (JPO Fund)', NULL, NULL, 'E', 'IA', '1', '4200750', 'JPO Danger Pay (JPO Fund)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (888, '', 'EIA14200800', 'Activ.mgmt JPO Rest & Recuperation (JPO Fund)', NULL, NULL, 'E', 'IA', '1', '4200800', 'JPO Rest & Recuperation (JPO Fund)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (889, '', 'EIA14200900', 'Activ.mgmt JPO Travel Entitlem Exclud. Duty Travel', NULL, NULL, 'E', 'IA', '1', '4200900', 'JPO Travel Entitlem Exclud. Duty Travel (JPO Fund)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (890, '', 'EIA14200950', 'Activ.mgmt JPO Training and Development (JPO Fund)', NULL, NULL, 'E', 'IA', '1', '4200950', 'JPO Training and Development (JPO Fund)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (891, '', 'EIA14201000', 'Activ.mgmt Employee Duty Travel (WFP)', NULL, NULL, 'E', 'IA', '1', '4201000', 'Employee Duty Travel (WFP)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (892, '', 'EIA14201010', 'Activ.mgmt NO/GS Staff In-Country Deployment Trave', NULL, NULL, 'E', 'IA', '1', '4201010', 'NO/GS Staff In-Country Deployment Travel', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (893, '', 'EIA14201700', 'Activ.mgmt Int. Consultant Travel: Non Duty (WFP O', NULL, NULL, 'E', 'IA', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (894, '', 'EIA14201800', 'Activ.mgmt Temporary Assist. HQ Payroll Loc Staff', NULL, NULL, 'E', 'IA', '1', '4201800', 'Temporary Assist. HQ Payroll Loc Staff', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (895, '', 'EIA14201900', 'Activ.mgmt Separation Packages Setlem Loc Staff', NULL, NULL, 'E', 'IA', '1', '4201900', 'Separation Packages Setlem Loc Staff', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (896, '', 'EIA14202000', 'Activ.mgmt Medical Travel/Evacuation - Local Emplo', NULL, NULL, 'E', 'IA', '1', '4202000', 'Medical Travel/Evacuation - Local Employees', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (897, 'X', 'EIA14202100', 'Activ.mgmt Residential Security NonPSA', NULL, NULL, 'E', 'IA', '1', '4202100', 'Residential Security NonPSA', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (898, '', 'EIA14300000', 'Activ.mgmt Local Staff - National Officer', NULL, NULL, 'E', 'IA', '1', '4300000', 'Local Staff - National Officer', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (899, '', 'EIA14300100', 'Activ.mgmt Local Staff - General Service', NULL, NULL, 'E', 'IA', '1', '4300100', 'Local Staff - General Service', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (900, '', 'EIA14300110', 'Activ.mgmt Local Staff LT Benefits Accrual', NULL, NULL, 'E', 'IA', '1', '4300110', 'Local Staff LT Benefits Accrual', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (901, '', 'EIA14300200', 'Activ.mgmt Local Staff -Temporary Assistance', NULL, NULL, 'E', 'IA', '1', '4300200', 'Local Staff -Temporary Assistance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (902, '', 'EIA14300250', 'Activ.mgmt Casual Labour (Local)', NULL, NULL, 'E', 'IA', '1', '4300250', 'Casual Labour (Local)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (903, '', 'EIA14300300', 'Activ.mgmt Local Employees - Overtime', NULL, NULL, 'E', 'IA', '1', '4300300', 'Local Employees - Overtime', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (904, '', 'EIA14300350', 'Activ.mgmt Other Rest & Recup: Non Int.Staff &JPO', NULL, NULL, 'E', 'IA', '1', '4300350', 'Other Rest & Recup: Non Int.Staff &JPO Funded Post', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (905, '', 'EIA14300410', 'Activ.mgmt Other Danger Pay: Non Int. Staff & JPO', NULL, NULL, 'E', 'IA', '1', '4300410', 'Other Danger Pay: Non Int. Staff & JPO Funded Post', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (906, '', 'EIA14300500', 'Activ.mgmt Medical Insurance for SC, SSA & Casual', NULL, NULL, 'E', 'IA', '1', '4300500', 'Medical Insurance for SC, SSA & Casual Labour', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (907, '', 'EIA14300550', 'Activ.mgmt MCS Employer contribution -  Non Payrol', NULL, NULL, 'E', 'IA', '1', '4300550', 'MCS Employer contribution -  Non Payroll', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (908, '', 'EIA14300560', 'Activ.mgmt Entry Medical Examination - Local Emplo', NULL, NULL, 'E', 'IA', '1', '4300560', 'Entry Medical Examination - Local Employees', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (909, '', 'EIA14300570', 'Activ.mgmt DDSS payments to SC/SSA', NULL, NULL, 'E', 'IA', '1', '4300570', 'DDSS payments to SC/SSA', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (910, '', 'EIA14300600', 'Activ.mgmt Non Staff HR: UNV', NULL, NULL, 'E', 'IA', '1', '4300600', 'Non Staff HR: UNV', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (911, '', 'EIA14300700', 'Activ.mgmt Local Consultants', NULL, NULL, 'E', 'IA', '1', '4300700', 'Local Consultants', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (912, '', 'EIA14300800', 'Activ.mgmt Coop Partner & Non WFP Employee Duty Tr', NULL, NULL, 'E', 'IA', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (913, '', 'EIA14300900', 'Activ.mgmt Non Staff HR: Interns', NULL, NULL, 'E', 'IA', '1', '4300900', 'Non Staff HR: Interns', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (914, '', 'EIA16000000', 'Activ mgmt Supplies & Materials-Computer Equipment', NULL, NULL, 'E', 'IA', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (915, '', 'EIA16000050', 'Activ mgmt Supplies & Materials-Office Equipment', NULL, NULL, 'E', 'IA', '1', '6000050', 'Supplies & Materials-Office Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (916, '', 'EIA16000100', 'Activ mgmt Supplies & Materials-Office Furniture a', NULL, NULL, 'E', 'IA', '1', '6000100', 'Supplies & Materials-Office Furniture and fixtures', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (917, 'X', 'EIA16000200', 'Activ mgmt Supplies & Materials-Security and safet', NULL, NULL, 'E', 'IA', '1', '6000200', 'Supplies & Materials-Security and safety equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (918, 'X', 'EIA16000300', 'Activ mgmt Supplies & Materials-Telecommunication ', NULL, NULL, 'E', 'IA', '1', '6000300', 'Supplies & Materials-Telecommunication Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (919, 'X', 'EIA16000400', 'Activ mgmt Supplies & Materials-Motor Vehicles', NULL, NULL, 'E', 'IA', '1', '6000400', 'Supplies & Materials-Motor Vehicles', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (920, '', 'EIA16000500', 'Activ mgmt Supplies & Materials-Warehous & Worksho', NULL, NULL, 'E', 'IA', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (921, '', 'EIA16000550', 'Activ mgmt Supplies & Materials-Buildings Permanent/Mobile', NULL, NULL, 'E', 'IA', '1', '6000550', 'Supplies & Materials- Buildings Permanent/Mobile', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (922, '', 'EIA16000800', 'Activ mgmt Supplies & Materials-Licenses & rights', NULL, NULL, 'E', 'IA', '1', '6000800', 'Supplies & Materials-Licenses & rights', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (923, '', 'EIA16500000', 'Activ mgmt Equipm: Agricultural Tools and Equipmen', NULL, NULL, 'E', 'IA', '1', '6500000', 'Equipm: Agricultural Tools and Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (924, '', 'EIA16501000', 'Activ mgmt Equipm: Kitchen/Canteen Materials & Equ', NULL, NULL, 'E', 'IA', '1', '6501000', 'Equipm: Kitchen/Canteen Materials & Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (925, 'X', 'EIA16502000', 'Activ mgmt Equipm: Health Related Material and Equ', NULL, NULL, 'E', 'IA', '1', '6502000', 'Equipm: Health Related Material and Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (926, '', 'EIA16503000', 'Activ mgmt Equipm: School Related Material and Equ', NULL, NULL, 'E', 'IA', '1', '6503000', 'Equipm: School Related Material and Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (927, '', 'EIA16506000', 'Activ.mgmt Camping/Field Equipments', NULL, NULL, 'E', 'IA', '1', '6506000', 'Camping/Field Equipments', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (928, '', 'EIA16507000', 'Activ mgmt Other Tools & Equipment', NULL, NULL, 'E', 'IA', '1', '6507000', 'Other Tools & Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (929, '', 'EIA16600000', 'Activ.mgmt Utilities - General', NULL, NULL, 'E', 'IA', '1', '6600000', 'Utilities - General', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (930, '', 'EIA16601000', 'Activ.mgmt Utilities - Gas', NULL, NULL, 'E', 'IA', '1', '6601000', 'Utilities - Gas', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (931, '', 'EIA16602000', 'Activ.mgmt Utilities - Water', NULL, NULL, 'E', 'IA', '1', '6602000', 'Utilities - Water', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (932, '', 'EIA16603000', 'Activ.mgmt Utilities - Electricity', NULL, NULL, 'E', 'IA', '1', '6603000', 'Utilities - Electricity', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (933, '', 'EIA16604000', 'Activ.mgmt Office Supplies & Other Consumables', NULL, NULL, 'E', 'IA', '1', '6604000', 'Office Supplies & Other Consumables', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (934, '', 'EIA16605000', 'Activ mgmt Fuel, Diesel and Petrol: vehicles', NULL, NULL, 'E', 'IA', '1', '6605000', 'Fuel, Diesel and Petrol: vehicles', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (935, '', 'EIA16605100', 'Activ mgmt Fuel: Facilities', NULL, NULL, 'E', 'IA', '1', '6605100', 'Fuel: Facilities', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (936, '', 'EIA16606000', 'Activ mgmt Oil & Lubricants other', NULL, NULL, 'E', 'IA', '1', '6606000', 'Oil & Lubricants other', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (937, '', 'EIA16609000', 'Activ mgmt Communications & IT Services (WFP only)', NULL, NULL, 'E', 'IA', '1', '6609000', 'Communications & IT Services (WFP only)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (938, '', 'EIA16610000', 'Activ mgmt Communications & IT Services (UN Common', NULL, NULL, 'E', 'IA', '1', '6610000', 'Communications & IT Services (UN Common)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (939, '', 'EIA17001000', 'Activ.mgmt Rental of Facility', NULL, NULL, 'E', 'IA', '1', '7001000', 'Rental of Facility', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (940, '', 'EIA17002000', 'Activ.mgmt UN Common Premises Rental', NULL, NULL, 'E', 'IA', '1', '7002000', 'UN Common Premises Rental', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (941, '', 'EIA17022000', 'Activ.mgmt Insurance Public Liability and Premises', NULL, NULL, 'E', 'IA', '1', '7022000', 'Insurance Public Liability and Premises', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (942, '', 'EIA17024000', 'Activ.mgmt Insurance Vehicles', NULL, NULL, 'E', 'IA', '1', '7024000', 'Insurance Vehicles', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (943, '', 'EIA17050000', 'Activ mgmt Equipment Repairs and Maintenance', NULL, NULL, 'E', 'IA', '1', '7050000', 'Equipment Repairs and Maintenance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (944, '', 'EIA17051000', 'Activ.mgmt Ordinary Premises Maintenance', NULL, NULL, 'E', 'IA', '1', '7051000', 'Ordinary Premises Maintenance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (945, '', 'EIA17052000', 'Activ.mgmt Extraordinary Premises Maintenance', NULL, NULL, 'E', 'IA', '1', '7052000', 'Extraordinary Premises Maintenance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (946, '', 'EIA17053000', 'Activ.mgmt Office Renovation', NULL, NULL, 'E', 'IA', '1', '7053000', 'Office Renovation', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (947, '', 'EIA17054000', 'Activ.mgmt Office Cleaning', NULL, NULL, 'E', 'IA', '1', '7054000', 'Office Cleaning', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (948, '', 'EIA17055000', 'Activ.mgmt Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'IA', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (949, '', 'EIA17100000', 'Activ.mgmt Vehicle Leasing', NULL, NULL, 'E', 'IA', '1', '7100000', 'Vehicle Leasing', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (950, '', 'EIA17100100', 'Activ mgmt Equipment Leasing', NULL, NULL, 'E', 'IA', '1', '7100100', 'Equipment Leasing', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (951, '', 'EIA17102000', 'Activ.mgmt Other Office Expenses & Services (WFP O', NULL, NULL, 'E', 'IA', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (952, '', 'EIA17102010', 'Activ.mgmt Meetings & Workshops', NULL, NULL, 'E', 'IA', '1', '7102010', 'Meetings & Workshops', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (953, '', 'EIA17103000', 'Activ mgmt Other UN Common Services (excluding Sec', NULL, NULL, 'E', 'IA', '1', '7103000', 'Other UN Common Services (excluding Security)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (954, '', 'EIA17106000', 'Activ mgmt UN Organisation Services, Personnel ', NULL, NULL, 'E', 'IA', '1', '7106000', 'UN Organisation Services, Personnel', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (955, '', 'EIA17118000', 'Activ mgmt Security Guard Services ', NULL, NULL, 'E', 'IA', '1', '7118000', 'Security Guard Services ', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (956, '', 'EIA17119000', 'Activ.mgmt Commercial Consultancy Services', NULL, NULL, 'E', 'IA', '1', '7119000', 'Commercial Consultancy Services', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (957, '', 'EIA17119100', 'Activ.mgmt Translation & Editing Services', NULL, NULL, 'E', 'IA', '1', '7119100', 'Translation & Editing Services', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (958, '', 'EIA17119200', 'Activ.mgmt Printing Services - External', NULL, NULL, 'E', 'IA', '1', '7119200', 'Printing Services - External', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (959, '', 'EIA17119400', 'Activ.mgmt Mail & Courier Services', NULL, NULL, 'E', 'IA', '1', '7119400', 'Mail & Courier Services', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (960, '', 'EIA17200000', 'Activ.mgmt Internal Service Fee (MCR)- UNHRD', NULL, NULL, 'E', 'IA', '1', '7200000', 'Internal Service Fee (MCR)- UNHRD', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (961, '', 'EIA17201000', 'Activ.mgmt Internal Services provided - UNHRD', NULL, NULL, 'E', 'IA', '1', '7201000', 'Internal Services provided - UNHRD', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (962, '', 'EIA17202000', 'Activ.mgmt Internal Service Fee (MCR)- GVLP', NULL, NULL, 'E', 'IA', '1', '7202000', 'Internal Service Fee (MCR)- GVLP', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (963, '', 'EIA17203000', 'Activ.mgmt Internal Services provided - GVLP', NULL, NULL, 'E', 'IA', '1', '7203000', 'Internal Services provided - GVLP', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (964, '', 'EIA17209050', 'Activ.mgmt Internal Services Provided – IT PER CAP', NULL, NULL, 'E', 'IA', '1', '7209050', 'Internal Services Provided – IT PER CAPITA', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (965, '', 'EIA17209070', 'Activ mgmt IInternal Services – Security costs rec', NULL, NULL, 'E', 'IA', '1', '7209070', 'IInternal Services – Security costs recoveries', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (966, '', 'EIA17209080', 'Implementation Internal Services Provided - SINC', NULL, NULL, 'E', 'IA', '1', '7209080', 'Internal Services Provided - SINC', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (967, '', 'EIA17209320', 'IMPL - RR Contracted Coordination Service Internal', NULL, NULL, 'E', 'IA', '1', '7209320', 'Internal RR Contracted Coordination Service', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (968, '', 'EIA17209400', 'Activ mgmt-Internal Services Porvided - SAIM', NULL, NULL, 'E', 'IA', '1', '7209400', 'Internal Services Porvided - SAIM', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (969, '', 'EIA1730000', 'Activ mgmt Land', NULL, NULL, 'E', 'IA', '1', '730000', 'Land', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (970, '', 'EIA1730200', 'Activ mgmt Buildings - mobile', NULL, NULL, 'E', 'IA', '1', '730200', 'Buildings - mobile', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (971, '', 'EIA1730300', 'Activ mgmt Computer equipment', NULL, NULL, 'E', 'IA', '1', '730300', 'Computer equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (972, '', 'EIA1730350', 'Activ mgmt Office equipment', NULL, NULL, 'E', 'IA', '1', '730350', 'Office equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (973, '', 'EIA1730400', 'Activ mgmt Office Furniture and fixtures', NULL, NULL, 'E', 'IA', '1', '730400', 'Office Furniture and fixtures', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (974, '', 'EIA1730500', 'Activ mgmt Security and safety equipment', NULL, NULL, 'E', 'IA', '1', '730500', 'Security and safety equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (975, '', 'EIA1730600', 'Activ mgmt Telecommunication Equipment', NULL, NULL, 'E', 'IA', '1', '730600', 'Telecommunication Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (976, '', 'EIA1730700', 'Activ mgmt Motor Vehicles Equipment', NULL, NULL, 'E', 'IA', '1', '730700', 'Motor Vehicles Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (977, '', 'EIA1730800', 'Activ mgmt Workshop & Warehouse Equipment', NULL, NULL, 'E', 'IA', '1', '730800', 'Workshop & Warehouse Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (978, '', 'EIA1766000', 'Activ mgmt Leasehold Improvement', NULL, NULL, 'E', 'IA', '1', '766000', 'Leasehold Improvement', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (979, '', 'EIA1811300', 'Activ.mgmt Standard Staff Cost  (HQ Payroll)', NULL, NULL, 'E', 'IA', '1', '811300', 'Standard Staff Cost  (HQ Payroll)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (980, '', 'EIA18140010', 'Activ.mgmt Other accounts receivable writte off', NULL, NULL, 'E', 'IA', '1', '8140010', 'Other accounts receivable writte off', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (981, '', 'EIA18402000', 'Activ.mgmt Advocacy & Public Information', NULL, NULL, 'E', 'IA', '1', '8402000', 'Advocacy & Public Information', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (982, '', 'EIA26506000', 'Activ.mgmt Camping/Field Equipments (IK)', NULL, NULL, 'E', 'IA', '2', '6506000', 'Camping/Field Equipments', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (983, '', 'EIA27119000', 'Activ.mgmt Com. Cons. Serv. (IK)', NULL, NULL, 'E', 'IA', '2', '7119000', 'Commercial Consultancy Services', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (984, '', 'EIA2730700', 'Activ.mgmt Mot Veh Equip (IK)', NULL, NULL, 'E', 'IA', '2', '730700', 'Motor Vehicles Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (985, 'X', 'EIB16000000', 'Benef Rel Mgmt Supplies & Materials-Computer Equip', NULL, NULL, 'E', 'IB', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (986, 'X', 'EIB17024000', 'Benef.Rel.Mgmt Insurance Vehicles', NULL, NULL, 'E', 'IB', '1', '7024000', 'Insurance Vehicles', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (987, 'X', 'EIB17102010', 'Benef.Rel.Mgmt Meetings & Workshops', NULL, NULL, 'E', 'IB', '1', '7102010', 'Meetings & Workshops', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (988, 'X', 'EIB17119000', 'Benef.Rel.Mgmt Commercial Consultancy Services', NULL, NULL, 'E', 'IB', '1', '7119000', 'Commercial Consultancy Services', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (989, 'X', 'EIC17102010', 'Oth. Impl. Input Meetings & Workshops', NULL, NULL, 'E', 'IC', '1', '7102010', 'Meetings & Workshops', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (990, 'X', 'EID13300000', 'Assmt.cost Assesments/Pre-Appraisal', NULL, NULL, 'E', 'ID', '1', '3300000', 'ASSESSMENTS/PRE-APPRAISAL', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (991, 'X', 'EID14201000', 'Assmt.cost Employee Duty Travel (WFP)', NULL, NULL, 'E', 'ID', '1', '4201000', 'Employee Duty Travel (WFP)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (992, 'X', 'EID16000000', 'Assmt Cost Supplies & Materials-Computer Equipment', NULL, NULL, 'E', 'ID', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (993, 'X', 'EID16609000', 'Assmt Cost Communications & IT Services (WFP only)', NULL, NULL, 'E', 'ID', '1', '6609000', 'Communications & IT Services (WFP only)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (994, 'X', 'EID17055000', 'Assmt.cost Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'ID', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (995, 'X', 'EID17102010', 'Assmt.cost Meetings & Workshops', NULL, NULL, 'E', 'ID', '1', '7102010', 'Meetings & Workshops', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (996, 'X', 'EID17119000', 'Assmt.cost Commercial Consultancy Services', NULL, NULL, 'E', 'ID', '1', '7119000', 'Commercial Consultancy Services', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (997, 'X', 'EIE13303000', 'Eval Cost - Operational Expenses', NULL, NULL, 'E', 'IE', '1', '3303000', 'Operational Expenses', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (998, 'X', 'EIE14201000', 'Eval.cost Employee Duty Travel (WFP)', NULL, NULL, 'E', 'IE', '1', '4201000', 'Employee Duty Travel (WFP)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (999, 'X', 'EIE14201700', 'Eval.cost Int. Consultant Travel: Non Duty (WFP On', NULL, NULL, 'E', 'IE', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1000, 'X', 'EIE17102010', 'Eval.cost Meetings & Workshops', NULL, NULL, 'E', 'IE', '1', '7102010', 'Meetings & Workshops', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1001, 'X', 'EIF13302000', 'Monit.cost Impact/Evaluation Monitoring', NULL, NULL, 'E', 'IF', '1', '3302000', 'IMPACT/EVALUATION MONITORING', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1002, 'X', 'EIF13302500', 'Monit.cost Post Distribution Monitoring (WFP)', NULL, NULL, 'E', 'IF', '1', '3302500', 'POST DISTRIBUTION MONITORING (WFP)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1003, 'X', 'EIF13303000', 'Monit Cost - Operational Expenses', NULL, NULL, 'E', 'IF', '1', '3303000', 'Operational Expenses', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1004, 'X', 'EIF14201000', 'Monit.cost Employee Duty Travel (WFP)', NULL, NULL, 'E', 'IF', '1', '4201000', 'Employee Duty Travel (WFP)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1005, 'X', 'EIF14201700', 'Monit.cost Int. Consultant Travel: Non Duty (WFP O', NULL, NULL, 'E', 'IF', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1006, 'X', 'EIF14300110', 'Monit.cost Local Staff LT Benefits Accrual', NULL, NULL, 'E', 'IF', '1', '4300110', 'Local Staff LT Benefits Accrual', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1007, 'X', 'EIF16609000', 'Monit Cost Communications & IT Services (WFP only)', NULL, NULL, 'E', 'IF', '1', '6609000', 'Communications & IT Services (WFP only)', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1008, 'X', 'EIF17024000', 'Monit.cost Insurance Vehicles', NULL, NULL, 'E', 'IF', '1', '7024000', 'Insurance Vehicles', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1009, 'X', 'EIF17055000', 'Monit.cost Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'IF', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1010, 'X', 'EIF17100000', 'Monit.cost Vehicle Leasing', NULL, NULL, 'E', 'IF', '1', '7100000', 'Vehicle Leasing', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1011, 'X', 'EIF17102010', 'Monit.cost Meetings & Workshops', NULL, NULL, 'E', 'IF', '1', '7102010', 'Meetings & Workshops', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1012, 'X', 'EIF17119000', 'Monit.cost Commercial Consultancy Services', NULL, NULL, 'E', 'IF', '1', '7119000', 'Commercial Consultancy Services', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1013, '', 'EAA13108000', 'DSC Other Insuran.Account Costs, legal fees', NULL, NULL, 'E', 'AA', '1', '3108000', 'Other Insurance Account Costs, legal fees, etc.', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1014, '', 'EAC13302300', 'DSC - Cont. Serv. Evaluation', NULL, NULL, 'E', 'AA', '1', '3302300', 'Cont. Serv. Evaluation', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1015, '', 'EAA14001700', 'DSC Overtime', NULL, NULL, 'E', 'AA', '1', '4001700', 'Overtime', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1016, '', 'EAA14004150', 'DSC Danger Pay non-PSA funded (Int Staff)', NULL, NULL, 'E', 'AA', '1', '4004150', 'Danger Pay non-PSA funded (Int Staff)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1017, '', 'EAA14004300', 'DSC Rest & Recup: Non-PSA Funded Post (Int. ', NULL, NULL, 'E', 'AA', '1', '4004300', 'Rest & Recup: Non-PSA Funded Post (Int. Staff)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1018, '', 'EAA14200000', 'DSC Int\'l Consultants Honoraria -Payroll', NULL, NULL, 'E', 'AA', '1', '4200000', 'Int\'l Consultants Honoraria -Payroll', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1019, '', 'EAA14200010', 'DSC Int\'l Consultants Residential Security', NULL, NULL, 'E', 'AA', '1', '4200010', 'Int\'l Consultants Residential Security', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1020, '', 'EAA14200100', 'DSC Actual JPO\'s Post Cost -Salary/Allow/Ben', NULL, NULL, 'E', 'AA', '1', '4200100', 'Actual JPO\'s Post Cost -Salary/Allow/Benefits', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1021, '', 'EAA14200220', 'DSC Actual JPO’s Cost – Add Hardship Allowan', NULL, NULL, 'E', 'AA', '1', '4200220', 'Actual JPO’s Cost – Add Hardship Allowance (AHA)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1022, '', 'EAA14200230', 'DSC Actual JPO’s Cost – Non Family Service A', NULL, NULL, 'E', 'AA', '1', '4200230', 'Actual JPO’s Cost – Non Family Service Allowance', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1023, '', 'EAA14200300', 'DSC Actual JPO\'s Post Cost - EMEA', NULL, NULL, 'E', 'AA', '1', '4200300', 'Actual JPO\'s Post Cost - EMEA', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1024, '', 'EAA14200400', 'DSC Actual JPO\'s Post Cost-Assignment Grant', NULL, NULL, 'E', 'AA', '1', '4200400', 'Actual JPO\'s Post Cost-Assignment Grant', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1025, '', 'EAA14200410', 'DSC Actual JPO\'s Post Cost - Settling-in Gra', NULL, NULL, 'E', 'AA', '1', '4200410', 'Actual JPO\'s Post Cost - Settling-in Grant', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1026, '', 'EAA14200500', 'DSC Actual JPO\'s Post Cost - Repatriation Gr', NULL, NULL, 'E', 'AA', '1', '4200500', 'Actual JPO\'s Post Cost - Repatriation Grant', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1027, '', 'EAA14200600', 'DSC Other JPO costs (JPO Fund)', NULL, NULL, 'E', 'AA', '1', '4200600', 'Other JPO costs (JPO Fund)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1028, '', 'EAA14200750', 'DSC JPO Danger Pay (JPO Fund)', NULL, NULL, 'E', 'AA', '1', '4200750', 'JPO Danger Pay (JPO Fund)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1029, '', 'EAA14200800', 'DSC JPO Rest & Recuperation (JPO Fund)', NULL, NULL, 'E', 'AA', '1', '4200800', 'JPO Rest & Recuperation (JPO Fund)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1030, '', 'EAA14200900', 'DSC JPO Travel Entitlem Exclud. Duty Travel ', NULL, NULL, 'E', 'AA', '1', '4200900', 'JPO Travel Entitlem Exclud. Duty Travel (JPO Fund)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1031, '', 'EAA14200950', 'DSC JPO Training and Development (JPO Fund)', NULL, NULL, 'E', 'AA', '1', '4200950', 'JPO Training and Development (JPO Fund)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1032, '', 'EAA14201000', 'DSC Employee Duty Travel (WFP)', NULL, NULL, 'E', 'AA', '1', '4201000', 'Employee Duty Travel (WFP)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1033, '', 'EAA14201010', 'DSC NO/GS Staff In-Country Deployment Travel', NULL, NULL, 'E', 'AA', '1', '4201010', 'NO/GS Staff In-Country Deployment Travel', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1034, '', 'EAA14201700', 'DSC Int. Consultant Travel: Non Duty (WFP On', NULL, NULL, 'E', 'AA', '1', '4201700', 'Int. Consultant Travel: Non Duty (WFP Only)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1035, '', 'EAA14201800', 'DSC Temporary Assist. HQ Payroll Loc Staff', NULL, NULL, 'E', 'AA', '1', '4201800', 'Temporary Assist. HQ Payroll Loc Staff', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1036, '', 'EAA14201900', 'DSC Separation Packages Setlem Loc Staff', NULL, NULL, 'E', 'AA', '1', '4201900', 'Separation Packages Setlem Loc Staff', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1037, '', 'EAA14202000', 'DSC Medical Travel/Evacuation - Local Employ', NULL, NULL, 'E', 'AA', '1', '4202000', 'Medical Travel/Evacuation - Local Employees', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1038, '', 'EAA14202100', 'DSC Residential Security Non PSA Int.Staff', NULL, NULL, 'E', 'AA', '1', '4202100', 'Residential Security NonPSA', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1039, '', 'EAA14202200', 'DSC Emergency Medical Evacuation - WFP Employees', NULL, NULL, 'E', 'AA', '1', '4202200', 'Emergency Medical Evacuation - WFP Employees', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1040, '', 'EAA14300000', 'DSC Local Staff - National Officer', NULL, NULL, 'E', 'AA', '1', '4300000', 'Local Staff - National Officer', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1041, '', 'EAA14300100', 'DSC Local Staff - General Service', NULL, NULL, 'E', 'AA', '1', '4300100', 'Local Staff - General Service', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1042, '', 'EAA14300110', 'DSC Local Staff LT Benefits Accrual', NULL, NULL, 'E', 'AA', '1', '4300110', 'Local Staff LT Benefits Accrual', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1043, '', 'EAA14300200', 'DSC Local Staff -Temporary Assistance', NULL, NULL, 'E', 'AA', '1', '4300200', 'Local Staff -Temporary Assistance', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1044, '', 'EAA14300250', 'DSC Casual Labour (Local)', NULL, NULL, 'E', 'AA', '1', '4300250', 'Casual Labour (Local)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1045, '', 'EAA14300300', 'DSC Local Employees - Overtime', NULL, NULL, 'E', 'AA', '1', '4300300', 'Local Employees - Overtime', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1046, '', 'EAA14300350', 'DSC Other Rest & Recup: Non Int.Staff &JPO F', NULL, NULL, 'E', 'AA', '1', '4300350', 'Other Rest & Recup: Non Int.Staff &JPO Funded Post', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1047, '', 'EAA14300410', 'DSC Other Danger Pay: Non Int. Staff & JPO F', NULL, NULL, 'E', 'AA', '1', '4300410', 'Other Danger Pay: Non Int. Staff & JPO Funded Post', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1048, '', 'EAA14300500', 'DSC Medical Insurance for SC, SSA & Casual L', NULL, NULL, 'E', 'AA', '1', '4300500', 'Medical Insurance for SC, SSA & Casual Labour', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1049, '', 'EAA14300550', 'DSC MCS Employer contribution -  Non Payroll', NULL, NULL, 'E', 'AA', '1', '4300550', 'MCS Employer contribution -  Non Payroll', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1050, '', 'EAA14300560', 'DSC Entry Medical Examination - Local Employ', NULL, NULL, 'E', 'AA', '1', '4300560', 'Entry Medical Examination - Local Employees', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1051, '', 'EAA14300570', 'DSC DDSS payments to SC/SSA', NULL, NULL, 'E', 'AA', '1', '4300570', 'DDSS payments to SC/SSA', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1052, '', 'EAA14300600', 'DSC Non Staff HR: UNV', NULL, NULL, 'E', 'AA', '1', '4300600', 'Non Staff HR: UNV', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1053, '', 'EAA14300700', 'DSC Local Consultants', NULL, NULL, 'E', 'AA', '1', '4300700', 'Local Consultants', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1054, '', 'EAA14300800', 'DSC Coop Partner & Non WFP Employee Duty Tra', NULL, NULL, 'E', 'AA', '1', '4300800', 'Coop Partner & Non WFP Employee Duty Travel', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1055, '', 'EAA14300900', 'DSC Non Staff HR: Intern', NULL, NULL, 'E', 'AA', '1', '4300900', 'Non Staff HR: Interns', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1056, '', 'EAA16000000', 'DSC S&M Computer Equipme', NULL, NULL, 'E', 'AA', '1', '6000000', 'Supplies & Materials-Computer Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1057, '', 'EAA16000050', 'DSC S&M Office Equipment', NULL, NULL, 'E', 'AA', '1', '6000050', 'Supplies & Materials-Office Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1058, '', 'EAA16000100', 'DSC S&M Office Furniture', NULL, NULL, 'E', 'AA', '1', '6000100', 'Supplies & Materials-Office Furniture and fixtures', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1059, '', 'EAA16000200', 'DSC Supp&Mat MOSS Secur. & Safety Eqment', NULL, NULL, 'E', 'AA', '1', '6000200', 'Supplies & Materials-Security and safety equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1060, '', 'EAA16000300', 'DSC Supp&Mat  MOSS Telecomm. Equipment', NULL, NULL, 'E', 'AA', '1', '6000300', 'Supplies & Materials-Telecommunication Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1061, '', 'EAA16000400', 'DSC Supp&Mat MOSS Motor Vehicles', NULL, NULL, 'E', 'AA', '1', '6000400', 'Supplies & Materials-Motor Vehicles', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1062, '', 'EAA16000500', 'DSC S&M Warehous & Works', NULL, NULL, 'E', 'AA', '1', '6000500', 'Supplies & Materials-Warehous & Workshop Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1063, '', 'EAA16000550', 'DSC S&M  Buildings Perma', NULL, NULL, 'E', 'AA', '1', '6000550', 'Supplies & Materials- Buildings Permanent/Mobile', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1064, '', 'EAA16000600', 'DSC S&M Software acquire', NULL, NULL, 'E', 'AA', '1', '6000600', 'Supplies & Materials-Software acquired', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1065, '', 'EAA16000700', 'DSC S&M Software interna', NULL, NULL, 'E', 'AA', '1', '6000700', 'Supplies & Materials-Software internally developed', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1066, '', 'EAA16000800', 'DSC S&M Licenses and rig', NULL, NULL, 'E', 'AA', '1', '6000800', 'Supplies & Materials-Licenses and rights', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1067, '', 'EAA16000900', 'DSC S&M Copy Rights', NULL, NULL, 'E', 'AA', '1', '6000900', 'Supplies & Materials-Copy Rights', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1068, '', 'EAA16001000', 'DSC S&M Other intangible', NULL, NULL, 'E', 'AA', '1', '6001000', 'Supplies & Materials-Other intangible assets', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1069, '', 'EAA16502000', 'DSC S&M d Material and E', NULL, NULL, 'E', 'AA', '1', '6502000', 'Equipm: Health Related Material and Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1070, '', 'EAA16506000', 'DSC Camping/Field Equipments', NULL, NULL, 'E', 'AA', '1', '6506000', 'Camping/Field Equipments', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1071, '', 'EAA16507000', 'DSC Other Tools & Equipm', NULL, NULL, 'E', 'AA', '1', '6507000', 'Other Tools & Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1072, '', 'EAA16600000', 'DSC Utilities - General', NULL, NULL, 'E', 'AA', '1', '6600000', 'Utilities - General', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1073, '', 'EAA16601000', 'DSC Utilities - Gas', NULL, NULL, 'E', 'AA', '1', '6601000', 'Utilities - Gas', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1074, '', 'EAA16602000', 'DSC Utilities - Water', NULL, NULL, 'E', 'AA', '1', '6602000', 'Utilities - Water', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1075, '', 'EAA16603000', 'DSC Utilities - Electricity', NULL, NULL, 'E', 'AA', '1', '6603000', 'Utilities - Electricity', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1076, '', 'EAA16604000', 'DSC Office Supplies & Other Consumables', NULL, NULL, 'E', 'AA', '1', '6604000', 'Office Supplies & Other Consumables', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1077, '', 'EAA16605000', 'DSC Fuel, Diesel and Pet', NULL, NULL, 'E', 'AA', '1', '6605000', 'Fuel, Diesel and Petrol: vehicles', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1078, '', 'EAA16605100', 'DSC Fuel: Facilities', NULL, NULL, 'E', 'AA', '1', '6605100', 'Fuel: Facilities', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1079, '', 'EAA16606000', 'DSC Oil & Lubricants oth', NULL, NULL, 'E', 'AA', '1', '6606000', 'Oil & Lubricants other', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1080, '', 'EAA16609000', 'DSC Communications & IT', NULL, NULL, 'E', 'AA', '1', '6609000', 'Communications & IT Services (WFP only)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1081, '', 'EAA16610000', 'DSC Communications & IT', NULL, NULL, 'E', 'AA', '1', '6610000', 'Communications & IT Services (UN Common)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1082, '', 'EAA17001000', 'DSC Rental of Facility', NULL, NULL, 'E', 'AA', '1', '7001000', 'Rental of Facility', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1083, '', 'EAA17002000', 'DSC UN Common Premises Rental', NULL, NULL, 'E', 'AA', '1', '7002000', 'UN Common Premises Rental', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1084, '', 'EAA17021000', 'DSC Insurance Equipment', NULL, NULL, 'E', 'AA', '1', '7021000', 'Insurance Equipment - HQ/Field Offices', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1085, '', 'EAA17022000', 'DSC Insurance Public Liability and Premises', NULL, NULL, 'E', 'AA', '1', '7022000', 'Insurance Public Liability and Premises', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1086, '', 'EAA17024000', 'DSC Insurance Vehicles', NULL, NULL, 'E', 'AA', '1', '7024000', 'Insurance Vehicles', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1087, '', 'EAA17050000', 'DSC Equipment Repairs an', NULL, NULL, 'E', 'AA', '1', '7050000', 'Equipment Repairs and Maintenance', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1088, '', 'EAA17051000', 'DSC Ordinary Premises Maintenance', NULL, NULL, 'E', 'AA', '1', '7051000', 'Ordinary Premises Maintenance', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1089, '', 'EAA17052000', 'DSC Extraordinary Premises Maintenance', NULL, NULL, 'E', 'AA', '1', '7052000', 'Extraordinary Premises Maintenance', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1090, '', 'EAA17053000', 'DSC Office Renovation', NULL, NULL, 'E', 'AA', '1', '7053000', 'Office Renovation', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1091, '', 'EAA17054000', 'DSC Office Cleaning', NULL, NULL, 'E', 'AA', '1', '7054000', 'Office Cleaning', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1092, '', 'EAA17055000', 'DSC Vehicle Running Costs and Maintenance', NULL, NULL, 'E', 'AA', '1', '7055000', 'Vehicle Running Costs and Maintenance', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1093, '', 'EAA17100000', 'DSC Vehicle Leasing', NULL, NULL, 'E', 'AA', '1', '7100000', 'Vehicle Leasing', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1094, '', 'EAA17100100', 'DSC Equipment Leasing', NULL, NULL, 'E', 'AA', '1', '7100100', 'Equipment Leasing', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1095, '', 'EAA17102000', 'DSC Other Office Expenses & Services (WFP On', NULL, NULL, 'E', 'AA', '1', '7102000', 'Other Office Expenses & Services (WFP Only)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1096, '', 'EAA17102010', 'DSC Meetings & Workshops', NULL, NULL, 'E', 'AA', '1', '7102010', 'Meetings & Workshops', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1097, '', 'EAA17103000', 'DSC Other UN Common Serv', NULL, NULL, 'E', 'AA', '1', '7103000', 'Other UN Common Services (excluding Security)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1098, '', 'EAA17104000', 'DSC Services from FAO', NULL, NULL, 'E', 'AA', '1', '7104000', 'Services from FAO', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1099, '', 'EAA17106000', 'DSC UN Organisation Services, Personnel', NULL, NULL, 'E', 'AA', '1', '7106000', 'UN Organisation Services, Personnel', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1100, '', 'EAA17107000', 'DSC UN Organisation Services, Consultants', NULL, NULL, 'E', 'AA', '1', '7107000', 'UN Organisation Services, Consultants', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1101, '', 'EAA17108000', 'DSC UN Organisation Services, Travel', NULL, NULL, 'E', 'AA', '1', '7108000', 'UN Organisation Services, Travel', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1102, '', 'EAA17109000', 'DSC UN Organisation Services, General Expend', NULL, NULL, 'E', 'AA', '1', '7109000', 'UN Organisation Services, General Expenditures', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1103, '', 'EAA17110000', 'DSC Statutory Requirement: External Audit', NULL, NULL, 'E', 'AA', '1', '7110000', 'Statutory Requirement: External Audit', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1104, '', 'EAA17111000', 'DSC Contributions to UN Bodies', NULL, NULL, 'E', 'AA', '1', '7111000', 'Contributions to UN Bodies', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1105, '', 'EAA17112000', 'DSC Contribution Emergency Relief Co-ordinat', NULL, NULL, 'E', 'AA', '1', '7112000', 'Contribution Emergency Relief Co-ordination', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1106, '', 'EAA17113000', 'DSC Contribution UN Reform', NULL, NULL, 'E', 'AA', '1', '7113000', 'Contribution UN Reform', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1107, '', 'EAA17114000', 'DSC Security LCSSB Contribution', NULL, NULL, 'E', 'AA', '1', '7114000', 'Contribution UN Field Security', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1108, '', 'EAA17115000', 'DSC Contribution Joint Bodies', NULL, NULL, 'E', 'AA', '1', '7115000', 'Contribution Joint Bodies', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1109, '', 'EAA17116000', 'DSC Statutory Requirement: Governing Body', NULL, NULL, 'E', 'AA', '1', '7116000', 'Statutory Requirement: Governing Body', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1110, '', 'EAA17117000', 'DSC Legal Services', NULL, NULL, 'E', 'AA', '1', '7117000', 'Legal Services', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1111, '', 'EAA17118000', 'DSC Security Guard Services ', NULL, NULL, 'E', 'AA', '1', '7118000', 'Security Guard Services ', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1112, '', 'EAA17119000', 'DSC Commercial Consultancy Services', NULL, NULL, 'E', 'AA', '1', '7119000', 'Commercial Consultancy Services', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1113, '', 'EAA17119100', 'DSC Translation & Editing Services', NULL, NULL, 'E', 'AA', '1', '7119100', 'Translation & Editing Services', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1114, '', 'EAA17119200', 'DSC Printing Services - External', NULL, NULL, 'E', 'AA', '1', '7119200', 'Printing Services - External', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1115, '', 'EAA17119300', 'DSC Printing Services -  Internal (HQ only)', NULL, NULL, 'E', 'AA', '1', '7119300', 'Printing Services -  Internal (HQ only)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1116, '', 'EAA17119310', 'DSC Field Engineering Services  (ODI)', NULL, NULL, 'E', 'AA', '1', '7119310', 'Field Engineering Services  (ODI)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1117, '', 'EAA17119400', 'DSC Mail & Courier Services', NULL, NULL, 'E', 'AA', '1', '7119400', 'Mail & Courier Services', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1118, '', 'EAA17202000', 'DSC Internal Service Fee (MCR)- GVLP', NULL, NULL, 'E', 'AA', '1', '7202000', 'Internal Service Fee (MCR)- GVLP', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1119, '', 'EAA17203000', 'DSC Internal Services provided - GVLP', NULL, NULL, 'E', 'AA', '1', '7203000', 'Internal Services provided - GVLP', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1120, '', 'EAA17209000', 'DSC Internal Services provided - FITTEST', NULL, NULL, 'E', 'AA', '1', '7209000', 'Internal Services provided - FITTEST', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1121, '', 'EAA17209050', 'DSC Internal Services Provided – IT PER CAPI', NULL, NULL, 'E', 'AA', '1', '7209050', 'Internal Services Provided – IT PER CAPITA', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1122, '', 'EAA17209060', 'DSC Internal Services – Operations Evaluatio', NULL, NULL, 'E', 'AA', '1', '7209060', 'Internal Services – Operations Evaluation recover', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1123, '', 'EAA17209070', 'DSC IInternal Services –', NULL, NULL, 'E', 'AA', '1', '7209070', 'IInternal Services – Security costs recoveries', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1124, '', 'EAA17209080', 'DSC Internal Services Provided – SINC', NULL, NULL, 'E', 'AA', '1', '7209080', 'Internal Services Provided - SINC', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1125, '', 'EAA1730000', 'DSC Land', NULL, NULL, 'E', 'AA', '1', '730000', 'Land', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1126, '', 'EAA1730100', 'DSC Buildings - permanen', NULL, NULL, 'E', 'AA', '1', '730100', 'Buildings - permanent', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1127, '', 'EAA1730200', 'DSC Buildings - mobile', NULL, NULL, 'E', 'AA', '1', '730200', 'Buildings - mobile', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1128, '', 'EAA1730300', 'DSC Computer equipment', NULL, NULL, 'E', 'AA', '1', '730300', 'Computer equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1129, '', 'EAA1730350', 'DSC Office equipment', NULL, NULL, 'E', 'AA', '1', '730350', 'Office equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1130, '', 'EAA1730400', 'DSC Office Furniture and', NULL, NULL, 'E', 'AA', '1', '730400', 'Office Furniture and fixtures', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1131, '', 'EAA1730500', 'DSC Security and safety', NULL, NULL, 'E', 'AA', '1', '730500', 'Security and safety equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1132, '', 'EAA1730600', 'DSC Telecommunication Eq', NULL, NULL, 'E', 'AA', '1', '730600', 'Telecommunication Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1133, '', 'EAA1730700', 'DSC Motor Vehicles Equip', NULL, NULL, 'E', 'AA', '1', '730700', 'Motor Vehicles Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1134, '', 'EAA1730800', 'DSC Workshop & Warehouse', NULL, NULL, 'E', 'AA', '1', '730800', 'Workshop & Warehouse Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1135, '', 'EAA1760100', 'DSC Software acquired', NULL, NULL, 'E', 'AA', '1', '760100', 'Software acquired', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1136, '', 'EAA1760200', 'DSC Software internally', NULL, NULL, 'E', 'AA', '1', '760200', 'Software internally developed', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1137, '', 'EAA1760300', 'DSC Licenses and rights', NULL, NULL, 'E', 'AA', '1', '760300', 'Licenses and rights', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1138, '', 'EAA1760400', 'DSC Copy Rights', NULL, NULL, 'E', 'AA', '1', '760400', 'Copy Rights', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1139, '', 'EAA1760500', 'DSC Other intangible ass', NULL, NULL, 'E', 'AA', '1', '760500', 'Other intangible assets', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1140, '', 'EAA1766000', 'DSC Leasehold Improvemen', NULL, NULL, 'E', 'AA', '1', '766000', 'Leasehold Improvement', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1141, '', 'EAA1811300', 'DSC Standard Staff Cost  (HQ Payroll)', NULL, NULL, 'E', 'AA', '1', '811300', 'Standard Staff Cost  (HQ Payroll)', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1142, '', 'EAA18140010', 'DSC Other accounts receivable writte off', NULL, NULL, 'E', 'AA', '1', '8140010', 'Other accounts receivable writte off', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1143, '', 'EAA18160000', 'DSC Write Off of Cash Losses', NULL, NULL, 'E', 'AA', '1', '8160000', 'Write Off of Cash Losses', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1144, '', 'EAA18202000', 'DSC Bank Charges CO', NULL, NULL, 'E', 'AA', '1', '8202000', 'Bank Charges CO', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1145, '', 'EAA18400000', 'DSC Hospitality', NULL, NULL, 'E', 'AA', '1', '8400000', 'Hospitality', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1146, '', 'EAA18402000', 'DSC Advocacy & Public Information', NULL, NULL, 'E', 'AA', '1', '8402000', 'Advocacy & Public Information', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1147, '', 'EAA18404100', 'DSC Actuarial Fees', NULL, NULL, 'E', 'AA', '1', '8404100', 'Actuarial Fees', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1148, '', 'EAA26000400', 'DSC Supp&Mat MOSS Motor Vehicles (IK)', NULL, NULL, 'E', 'AA', '2', '6000400', 'Supplies & Materials-Motor Vehicles', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1149, '', 'EAA26000550', 'DSC Suppl.& Materials-Build.Pe (IK)', NULL, NULL, 'E', 'AA', '2', '6000550', 'Supplies & Materials- Buildings Permanent/Mobile', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1150, '', 'EAA26506000', 'DSC Camping/Field Equipments (IK)', NULL, NULL, 'E', 'AA', '2', '6506000', 'Camping/Field Equipments', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1151, '', 'EAA26609000', 'DSC In-Kind Communications & IT Services', NULL, NULL, 'E', 'AA', '2', '6609000', 'Communications & IT Services', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1152, '', 'EAA27001000', 'DSC Rental Facility (WFP only) (IK)', NULL, NULL, 'E', 'AA', '2', '7001000', 'Rental of Facility', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1153, '', 'EAA27119000', 'DSC Com. Cons. Serv. (IK)', NULL, NULL, 'E', 'AA', '2', '7119000', 'Commercial Consultancy Services', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1154, '', 'EAA2730100', 'DSC Buildings - permanent (IK)', NULL, NULL, 'E', 'AA', '2', '730100', 'Buildings - permanent', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1155, '', 'EAA2730700', 'DSC Mot Veh Equip (IK)', NULL, NULL, 'E', 'AA', '2', '730700', 'Motor Vehicles Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1156, '', 'EAB13300000', 'DSC ASSESSMENTS/PRE-APPRAISAL', NULL, NULL, 'E', 'AB', '1', '3300000', 'ASSESSMENTS/PRE-APPRAISAL', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1157, '', 'EAB17102010', 'DSC Assessm_Meetings & Workshops', NULL, NULL, 'E', 'AB', '1', '7102010', 'Meetings & Workshops', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1158, '', 'EAC13301000', 'DSC EVALUATIONS/SURVEYS', NULL, NULL, 'E', 'AC', '1', '3301000', 'EVALUATIONS/SURVEYS', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1159, '', 'EAC17102010', 'DSC Evaluat_Meetings & Workshops', NULL, NULL, 'E', 'AC', '1', '7102010', 'Meetings & Workshops', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1160, '', 'PFA1500100', 'FTV_CASH CER CEREALS AND GRAINS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500100', 'CER CEREALS AND GRAINS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1161, '', 'PFA1500101', 'FTV_CASH CER BARLEY(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500101', 'CER BARLEY', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1162, '', 'PFA1500102', 'FTV_CASH CER BREAD(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500102', 'CER BREAD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1163, '', 'PFA1500103', 'FTV_CASH CER BUCKWHEAT(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500103', 'CER BUCKWHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1164, '', 'PFA1500104', 'FTV_CASH CER BULGUR WHEAT(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500104', 'CER BULGUR WHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1165, '', 'PFA1500105', 'FTV_CASH CER MAIZE(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500105', 'CER MAIZE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1166, '', 'PFA1500106', 'FTV_CASH CER MAIZE MEAL(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500106', 'CER MAIZE MEAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1167, '', 'PFA1500107', 'FTV_CASH CER OAT(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500107', 'CER OAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1168, '', 'PFA1500108', 'FTV_CASH CER PASTA(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500108', 'CER PASTA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1169, '', 'PFA1500109', 'FTV_CASH CER QUINUA(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500109', 'CER QUINUA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1170, '', 'PFA1500110', 'FTV_CASH CER RICE(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500110', 'CER RICE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1171, '', 'PFA1500111', 'FTV_CASH CER SORGHUM/MILLET(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500111', 'CER SORGHUM/MILLET', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1172, '', 'PFA1500112', 'FTV_CASH CER SOYA-FORTIFIED MAIZE MEAL(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500112', 'CER SOYA-FORTIFIED MAIZE MEAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1173, '', 'PFA1500113', 'FTV_CASH CER WHEAT(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500113', 'CER WHEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1174, '', 'PFA1500115', 'FTV_CASH CER WHEAT FLOUR(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500115', 'CER WHEAT FLOUR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1175, '', 'PFA1500200', 'FTV_CASH BEV BEVERAGES(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500200', 'BEV BEVERAGES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1176, '', 'PFA1500201', 'FTV_CASH BEV BLACK TEA(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500201', 'BEV BLACK TEA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1177, '', 'PFA1500202', 'FTV_CASH BEV COFFEE(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500202', 'BEV COFFEE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1178, '', 'PFA1500203', 'FTV_CASH BEV FRUIT JUICE(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500203', 'BEV FRUIT JUICE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1179, '', 'PFA1500204', 'FTV_CASH BEV MINERAL WATER(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500204', 'BEV MINERAL WATER', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1180, '', 'PFA1500205', 'FTV_CASH BEV BEVERAGE MIX(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500205', 'BEV BEVERAGE MIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1181, '', 'PFA1500250', 'FTV_CASH DAI DAIRY PRODUCTS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500250', 'DAI DAIRY PRODUCTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1182, '', 'PFA1500251', 'FTV_CASH DAI CHEESE(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500251', 'DAI CHEESE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1183, '', 'PFA1500252', 'FTV_CASH DAI DRIED WHOLE MILK(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500252', 'DAI DRIED WHOLE MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1184, '', 'PFA1500253', 'FTV_CASH DAI ENRICHED DRIED SKIMMED MILK(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500253', 'DAI ENRICHED DRIED SKIMMED MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1185, '', 'PFA1500254', 'FTV_CASH DAI INFANT FORMULA(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500254', 'DAI INFANT FORMULA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1186, '', 'PFA1500255', 'FTV_CASH DAI PLAIN DRIED SKIMMED MILK(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500255', 'DAI PLAIN DRIED SKIMMED MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1187, '', 'PFA1500256', 'FTV_CASH DAI THERAPEUTIC MILK(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500256', 'DAI THERAPEUTIC MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1188, '', 'PFA1500257', 'FTV_CASH DAI UHT MILK(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500257', 'DAI UHT MILK', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1189, '', 'PFA1500300', 'FTV_CASH FRU FRUIT AND NUTS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500300', 'FRU FRUIT AND NUTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1190, '', 'PFA1500301', 'FTV_CASH FRU DRIED FRUITS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500301', 'FRU DRIED FRUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1191, '', 'PFA1500302', 'FTV_CASH FRU Date Paste(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500302', 'FRU Date Paste', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1192, '', 'PFA1500303', 'FTV_CASH FRU FRESH FRUITS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500303', 'FRU FRESH FRUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1193, '', 'PFA1500350', 'FTV_CASH FSH FISH(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500350', 'FSH FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1194, '', 'PFA1500351', 'FTV_CASH FSH CANNED FISH(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500351', 'FSH CANNED FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1195, '', 'PFA1500352', 'FTV_CASH FSH DRIED FISH(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500352', 'FSH DRIED FISH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1196, '', 'PFA1500400', 'FTV_CASH MEA MEAT(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500400', 'MEA MEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1197, '', 'PFA1500401', 'FTV_CASH MEA CANNED BEEF(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500401', 'MEA CANNED BEEF', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1198, '', 'PFA1500402', 'FTV_CASH MEA CANNED CHICKEN(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500402', 'MEA CANNED CHICKEN', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1199, '', 'PFA1500403', 'FTV_CASH MEA CANNED MEAT(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500403', 'MEA CANNED MEAT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1200, '', 'PFA1500404', 'FTV_CASH MEA MEAT FRESH(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500404', 'MEA MEAT FRESH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1201, '', 'PFA1500450', 'FTV_CASH MIX MIXED AND BLENDED FOODS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500450', 'MIX MIXED AND BLENDED FOODS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1202, '', 'PFA1500451', 'FTV_CASH MIX BISCUITS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500451', 'MIX BISCUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1203, '', 'PFA1500452', 'FTV_CASH MIX BP5 EMERGENCY RATIONS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500452', 'MIX BP5 EMERGENCY RATIONS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1204, '', 'PFA1500453', 'FTV_CASH MIX CORN-SOYA BLEND (CSB)(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500453', 'MIX CORN-SOYA BLEND (CSB)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1205, '', 'PFA1500454', 'FTV_CASH MIX FAFFA(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500454', 'MIX FAFFA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1206, '', 'PFA1500455', 'FTV_CASH MIX INKA MIX(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500455', 'MIX INKA MIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1207, '', 'PFA1500456', 'FTV_CASH MIX LIKUNI PHALA(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500456', 'MIX LIKUNI PHALA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1208, '', 'PFA1500457', 'FTV_CASH MIX VITACEREAL(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500457', 'MIX VITACEREAL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1209, '', 'PFA1500458', 'FTV_CASH MIX CORN-SOYA MILK (CSM)(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500458', 'MIX CORN-SOYA MILK (CSM)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1210, '', 'PFA1500459', 'FTV_CASH MIX WHEAT-SOYA BLEND (WSB)(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500459', 'MIX WHEAT-SOYA BLEND (WSB)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1211, '', 'PFA1500460', 'FTV_CASH MIX INDIAMIX(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500460', 'MIX INDIAMIX', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1212, '', 'PFA1500461', 'FTV_CASH MIX HIGH ENERGY BISCUITS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500461', 'MIX HIGH ENERGY BISCUITS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1213, '', 'PFA1500462', 'FTV_CASH MIX HIGH ENERGY SUPPLEMENTS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500462', 'MIX HIGH ENERGY SUPPLEMENTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1214, '', 'PFA1500463', 'FTV_CASH MIX LACTO-SOYA BLEND(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500463', 'MIX LACTO-SOYA BLEND', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1215, '', 'PFA1500464', 'FTV_CASH MIX PEA WHEAT BLENDED(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500464', 'MIX PEA WHEAT BLENDED', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1216, '', 'PFA1500465', 'FTV_CASH MIX RICE SOYA BLEND(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500465', 'MIX RICE SOYA BLEND', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1217, '', 'PFA1500466', 'FTV_CASH MIX WHEAT-SOYA MILK (WSM)(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500466', 'MIX WHEAT-SOYA MILK (WSM)', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1218, '', 'PFA1500467', 'FTV_CASH MIX READY TO USE SUPPLEMENTARY FOOD(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500467', 'MIX READY TO USE SUPPLEMENTARY FOOD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1219, '', 'PFA1500468', 'FTV_CASH MIX READY TO USE THERAPEUTIC FOOD(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500468', 'MIX READY TO USE THERAPEUTIC FOOD', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1220, '', 'PFA1500500', 'FTV_CASH MSC MISCELLANEOUS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500500', 'MSC MISCELLANEOUS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1221, '', 'PFA1500501', 'FTV_CASH MSC API(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500501', 'MSC API', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1222, '', 'PFA1500502', 'FTV_CASH MSC HALAWA(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500502', 'MSC HALAWA', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1223, '', 'PFA1500503', 'FTV_CASH MSC IODISED SALT(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500503', 'MSC IODISED SALT', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1224, '', 'PFA1500504', 'FTV_CASH MSC NUTS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500504', 'MSC NUTS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1225, '', 'PFA1500505', 'FTV_CASH MSC SUGAR(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500505', 'MSC SUGAR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1226, '', 'PFA1500506', 'FTV_CASH MSC Micronutrition Powder(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500506', 'MSC Micronutrition Powder', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1227, '', 'PFA1500507', 'FTV_CASH MSC YEAST(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500507', 'MSC YEAST', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1228, '', 'PFA1500508', 'FTV_CASH MSC Micronutrient Tablets(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500508', 'MSC Micronutrient Tablets', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1229, '', 'PFA1500509', 'FTV_CASH MSC SPICES(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500509', 'MSC SPICES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1230, '', 'PFA1500510', 'FTV_CASH MSC CRACKERS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500510', 'MSC CRACKERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1231, '', 'PFA1500511', 'FTV_CASH MSC TOMATO(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500511', 'MSC TOMATO', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1232, '', 'PFA1500512', 'FTV_CASH MSC STARCH(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500512', 'MSC STARCH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1233, '', 'PFA1500513', 'FTV_CASH MSC EGGS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500513', 'MSC EGGS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1234, '', 'PFA1500550', 'FTV_CASH OIL OILS AND FATS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500550', 'OIL OILS AND FATS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1235, '', 'PFA1500551', 'FTV_CASH OIL BUTTER OIL(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500551', 'OIL BUTTER OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1236, '', 'PFA1500552', 'FTV_CASH OIL GHEE(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500552', 'OIL GHEE', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1237, '', 'PFA1500553', 'FTV_CASH OIL OLIVE OIL(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500553', 'OIL OLIVE OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1238, '', 'PFA1500554', 'FTV_CASH OIL VEGETABLE OIL(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500554', 'OIL VEGETABLE OIL', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1239, '', 'PFA1500560', 'FTV_CASH NUT PEANUT BUTTER(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500560', 'NUT PEANUT BUTTER', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1240, '', 'PFA1500600', 'FTV_CASH PPF PRE-PACKAGED FOOD PARCELS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500600', 'PPF PRE-PACKAGED FOOD PARCELS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1241, '', 'PFA1500601', 'FTV_CASH PPF RATIONS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500601', 'PPF RATIONS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1242, '', 'PFA1500650', 'FTV_CASH TUB ROOTS AND TUBERS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500650', 'TUB ROOTS AND TUBERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1243, '', 'PFA1500651', 'FTV_CASH TUB CASSAVA FLOUR(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500651', 'TUB CASSAVA FLOUR', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1244, '', 'PFA1500652', 'FTV_CASH TUB POTATO FLAKES/GRANULES(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500652', 'TUB POTATO FLAKES/GRANULES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1245, '', 'PFA1500653', 'FTV_CASH TUB FRESH TUBERS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500653', 'TUB FRESH TUBERS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1246, '', 'PFA1500700', 'FTV_CASH PUL PULSES AND VEGETABLES(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500700', 'PUL PULSES AND VEGETABLES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1247, '', 'PFA1500701', 'FTV_CASH PUL BEANS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500701', 'PUL BEANS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1248, '', 'PFA1500702', 'FTV_CASH PUL CANNED PULSES(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500702', 'PUL CANNED PULSES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1249, '', 'PFA1500703', 'FTV_CASH PUL CANNED VEGETABLES(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500703', 'PUL CANNED VEGETABLES', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1250, '', 'PFA1500704', 'FTV_CASH PUL LENTILS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500704', 'PUL LENTILS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1251, '', 'PFA1500705', 'FTV_CASH PUL PEAS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500705', 'PUL PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1252, '', 'PFA1500706', 'FTV_CASH PUL SPLIT PEAS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500706', 'PUL SPLIT PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1253, '', 'PFA1500707', 'FTV_CASH PUL TEXTURED SOY PROTEIN(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500707', 'PUL TEXTURED SOY PROTEIN', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1254, '', 'PFA1500708', 'FTV_CASH PUL SPLIT LENTILS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500708', 'PUL SPLIT LENTILS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1255, '', 'PFA1500709', 'FTV_CASH PUL CHICK PEAS(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500709', 'PUL CHICK PEAS', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1256, '', 'PFA1500710', 'FTV_CASH PUL VEGETABLES FRESH(Plan)', NULL, NULL, 'P', 'FA', '1', 'PFA500710', 'PUL VEGETABLES FRESH', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1257, '', 'PFB10000004', 'Other Food Related Costs', NULL, NULL, 'P', 'FB', '1', 'PFB0000004', 'Other Food Related Costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1258, '', 'PFB10000005', 'Capital Investment', NULL, NULL, 'P', 'FB', '1', 'PFB0000005', 'Capital Investment', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1259, '', 'PFC10000001', 'External Transport  (Plan)', NULL, NULL, 'P', 'FC', '1', 'PFC0000001', 'External Transport ', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1260, '', 'PFD10000001', 'FTC Transport(Plan)', NULL, NULL, 'P', 'FD', '1', 'PFD0000001', 'Transport', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1261, '', 'PFD10000002', 'FTC Customs Clearance (Plan)', NULL, NULL, 'P', 'FD', '1', 'PFD0000002', 'Customs Clearance ', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1262, '', 'PFD10000003', 'FTC Fleet Transport (Plan)', NULL, NULL, 'P', 'FD', '1', 'PFD0000003', 'Fleet Transport ', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1263, '', 'PFF10000001', 'FTC Warehouse Equipment, Materials & Supplies(Plan)', NULL, NULL, 'P', 'FF', '1', 'PFF0000001', 'Warehouse Equipment, Materials & Supplies', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1264, '', 'PFF10000002', 'FTC Warehouse Operations(Plan)', NULL, NULL, 'P', 'FF', '1', 'PFF0000002', 'Warehouse Operations', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1265, '', 'PFF10000003', 'FTC Warehouse Rent & Running costs(Plan)', NULL, NULL, 'P', 'FF', '1', 'PFF0000003', 'Warehouse Rent & Running costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1266, '', 'PFH10000001', 'FTC Port Operations(Plan)', NULL, NULL, 'P', 'FH', '1', 'PFH0000001', 'Port Operations', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1267, '', 'PFJ14190000', 'FTC International Professional Staff', NULL, NULL, 'P', 'FJ', '1', 'PFJ4190000', 'International Professional Staff', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1268, '', 'PFJ14200000', 'FTC International Consultants(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4200000', 'International Consultants', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1269, '', 'PFJ14200001', 'FTC International Consultants MSLS cost(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4200001', 'International Consultants MSLS cost', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1270, '', 'PFJ14300000', 'FTC Local Staff - National Officer(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4300000', 'Local Staff - National Officer', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1271, '', 'PFJ14300100', 'FTC Local Staff - General Service(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4300100', 'Local Staff - General Service', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1272, '', 'PFJ14300200', 'FTC Local Staff -Temporary Assistance(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4300200', 'Local Staff -Temporary Assistance', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1273, '', 'PFJ14300450', 'FTC Staff Danger/Hazard Pay & Hardship Allowances(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4300450', 'Staff Danger/Hazard Pay & Hardship Allowances', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1274, '', 'PFJ14300600', 'FTC Non Staff HR: UNV(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4300600', 'Non Staff HR: UNV', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1275, '', 'PFJ14300700', 'FTC Local Consultants(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4300700', 'Local Consultants', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1276, '', 'PFJ14300800', 'FTC Staff Other cost(Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ4300800', 'Staff Other cost', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1277, '', 'PFJ15000007', 'Contracted Services (Plan)', NULL, NULL, 'P', 'FJ', '1', 'PFJ5000007', 'Contracted Services', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1278, '', 'PFL10000001', 'Fixed Costs (Plan)', NULL, NULL, 'P', 'FL', '1', 'PFL0000001', 'Fixed Costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1279, '', 'PFL10000002', 'Delivery and Distribution Costs (Plan)', NULL, NULL, 'P', 'FL', '1', 'PFL0000002', 'Delivery and Distribution Costs', 'Food');
INSERT INTO `pma_gl_codes` VALUES (1280, '', 'PCA12004000', 'Value Voucher Transfer', NULL, NULL, 'P', 'CA', '1', 'PCA2004000', 'Value Voucher Transfer', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1281, '', 'PCA12004010', 'Value Voucher Transfer for services', NULL, NULL, 'P', 'CA', '1', 'PCA2004010', 'Value Voucher Transfer for services', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1282, '', 'PCA12005000', 'Cash Transfer', NULL, NULL, 'P', 'CA', '1', 'PCA2005000', 'Cash Transfer', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1283, '', 'PCA12005010', 'CBT-Cash Transfer to Host Government(Plan)', NULL, NULL, 'P', 'CA', '1', 'PCA2005010', 'Cash Transfer to Host Government', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1284, '', 'PCA12006000', 'Commodity Voucher Transfer', NULL, NULL, 'P', 'CA', '1', 'PCA2006000', 'Commodity Voucher Transfer', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1285, '', 'PCB10000001', 'CBT-Transfer Platform set-up(Plan)', NULL, NULL, 'P', 'CB', '1', 'PCB0000001', 'Transfer Platform set-up', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1286, '', 'PCB10000002', 'CBT-Transfer Platform maintenance(Plan)', NULL, NULL, 'P', 'CB', '1', 'PCB0000002', 'Transfer Platform maintenance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1287, '', 'PCB10000003', 'CBT-FSP Transfer fee(Plan)', NULL, NULL, 'P', 'CB', '1', 'PCB0000003', 'FSP Transfer fee', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1288, '', 'PCB10000004', 'CBT-Delivery Mechanism Instrument(Plan)', NULL, NULL, 'P', 'CB', '1', 'PCB0000004', 'Delivery Mechanism Instrument', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1289, '', 'PCB10000005', 'CBT-Cash in Transit insurance(Plan)', NULL, NULL, 'P', 'CB', '1', 'PCB0000005', 'Cash in Transit insurance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1290, '', 'PCB10000006', 'CBT-Other Delivery costs(Plan)', NULL, NULL, 'P', 'CB', '1', 'PCB0000006', 'Other Delivery costs', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1291, '', 'PCC14190000', 'CBT International Professional Staff', NULL, NULL, 'P', 'CC', '1', 'PCC4190000', 'International Professional Staff', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1292, '', 'PCC14200000', 'CBT-International Consultants(Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC4200000', 'International Consultants', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1293, '', 'PCC14200001', 'CBT Int Cons MSLS cost (Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC4200001', 'International Consultants MSLS cost', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1294, '', 'PCC14300000', 'CBT-Local Staff - National Officer(Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC4300000', 'Local Staff - National Officer', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1295, '', 'PCC14300100', 'CBT-Local Staff - General Service(Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC4300100', 'Local Staff - General Service', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1296, '', 'PCC14300200', 'CBT-Local Staff -Temporary Assistance(Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC4300200', 'Local Staff -Temporary Assistance', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1297, '', 'PCC14300450', 'CBT-Staff Danger/Hazard Pay & Hardship Allowances(', NULL, NULL, 'P', 'CC', '1', 'PCC4300450', 'Staff Danger/Hazard Pay & Hardship Allowances', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1298, '', 'PCC14300600', 'CBT-Non Staff HR: UNV(Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC4300600', 'Non Staff HR: UNV', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1299, '', 'PCC14300700', 'CBT-Local Consultants(Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC4300700', 'Local Consultants', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1300, '', 'PCC14300800', 'CBT - Staff Other cost (Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC4300800', 'Staff Other cost', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1301, '', 'PCC15000007', 'CBT-Contracted Services(Plan)', NULL, NULL, 'P', 'CC', '1', 'PCC5000007', 'Contracted Services', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1302, '', 'PCD10000001', 'CBT-Fixed Costs(Plan)', NULL, NULL, 'P', 'CD', '1', 'PCD0000001', 'Fixed Costs', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1303, '', 'PCD10000002', 'CBT-Delivery and Distribution Costs(Plan)', NULL, NULL, 'P', 'CD', '1', 'PCD0000002', 'Delivery and Distribution Costs', 'CBT & CV');
INSERT INTO `pma_gl_codes` VALUES (1304, '', 'PSA14190000', 'CS International Professional Staff', NULL, NULL, 'P', 'SA', '1', 'PSA4190000', 'International Professional Staff', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1305, '', 'PSA14200000', 'CS-International Consultants(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA4200000', 'International Consultants', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1306, '', 'PSA14200001', 'CS International Consultants MSLS cost (Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA4200001', 'International Consultants MSLS cost', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1307, '', 'PSA14300000', 'CS-Local Staff - National Officer(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA4300000', 'Local Staff - National Officer', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1308, '', 'PSA14300100', 'CS-Local Staff - General Service(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA4300100', 'Local Staff - General Service', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1309, '', 'PSA14300200', 'CS-Local Staff -Temporary Assistance(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA4300200', 'Local Staff -Temporary Assistance', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1310, '', 'PSA14300450', 'CS-Staff Danger/Hazard Pay & Hardship Allowances(P', NULL, NULL, 'P', 'SA', '1', 'PSA4300450', 'Staff Danger/Hazard Pay & Hardship Allowances', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1311, '', 'PSA14300600', 'CS-Non Staff HR: UNV(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA4300600', 'Non Staff HR: UNV', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1312, '', 'PSA14300700', 'CS-Local Consultants(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA4300700', 'Local Consultants', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1313, '', 'PSA14300800', 'CS-Staff Other cost (Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA4300800', 'Staff Other cost', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1314, '', 'PSA15000001', 'CS-Facility Rent and Running cost(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA5000001', 'Facility Rent and Running costs', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1315, '', 'PSA15000004', 'CS-Equipment and Supplies(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA5000004', 'Equipment and Supplies', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1316, '', 'PSA15000005', 'CS-TC/IT Equipment(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA5000005', 'TC/IT Equipment', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1317, '', 'PSA15000006', 'CS-Travel costs(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA5000006', 'Travel costs', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1318, '', 'PSA15000007', 'CS-Contracted Services(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA5000007', 'Contracted Services', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1319, '', 'PSA15000008', 'CS-Trainings, Meetings, Workshop(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA5000008', 'Trainings, Meetings, Workshop', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1320, '', 'PSA15000009', 'CS-Equipment Transport & related costs(Plan)', NULL, NULL, 'P', 'SA', '1', 'PSA5000009', 'Equipment Transport & related costs', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1321, '', 'PSB10000001', 'CS-Fixed Costs(Plan)', NULL, NULL, 'P', 'SB', '1', 'PSB0000001', 'Fixed Costs', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1322, '', 'PSB10000002', 'CS-Delivery and Distribution Costs(Plan)', NULL, NULL, 'P', 'SB', '1', 'PSB0000002', 'Delivery and Distribution Costs', 'Capacity Strengthening');
INSERT INTO `pma_gl_codes` VALUES (1323, '', 'PDA13500000', 'SD Procurement of Commodity - Pass-through (Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA3500000', 'Procurement of Commodity - Pass-through', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1324, '', 'PDA14190000', 'SD International Professional Staff', NULL, NULL, 'P', 'DA', '1', 'PDA4190000', 'International Professional Staff', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1325, '', 'PDA14200000', 'SD-International Consultants(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA4200000', 'International Consultants', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1326, '', 'PDA14200001', 'SD International Consultants MSLS cost', NULL, NULL, 'P', 'DA', '1', 'PDA4200001', 'International Consultants MSLS cost', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1327, '', 'PDA14300000', 'SD-Local Staff - National Officer(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA4300000', 'Local Staff - National Officer', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1328, '', 'PDA14300100', 'SD-Local Staff - General Service(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA4300100', 'Local Staff - General Service', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1329, '', 'PDA14300200', 'SD-Local Staff -Temporary Assistance(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA4300200', 'Local Staff -Temporary Assistance', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1330, '', 'PDA14300450', 'SD-Staff Danger/Hazard Pay & Hardship Allowances(P', NULL, NULL, 'P', 'DA', '1', 'PDA4300450', 'Staff Danger/Hazard Pay & Hardship Allowances', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1331, '', 'PDA14300600', 'SD-Non Staff HR: UNV(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA4300600', 'Non Staff HR: UNV', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1332, '', 'PDA14300700', 'SD-Local Consultants(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA4300700', 'Local Consultants', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1333, '', 'PDA14300800', 'SD - Staff Other cost (Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA4300800', 'Staff Other cost', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1334, '', 'PDA15000001', 'SD-Facility Rent & Running costs(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA5000001', 'Facility Rent and Running costs', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1335, '', 'PDA15000005', 'SD Equipment and other Asset (Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA5000005', 'Equipment and other Asset', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1336, '', 'PDA15000007', 'SD Procurement of non-food items - Pass-through(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA5000007', 'Procurement of non-food items - Pass-through', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1337, '', 'PDA15000008', 'SD-Travel costs(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA5000008', 'Travel costs', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1338, '', 'PDA15000009', 'SD-Contracted Services(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA5000009', 'Contracted Services', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1339, '', 'PDA15000011', 'SD Transport and Port operation costs(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA5000011', 'Transport and Port operation costs', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1340, '', 'PDA15000013', 'SD Storage and Related costs(Plan)', NULL, NULL, 'P', 'DA', '1', 'PDA5000013', 'Storage and Related costs', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1341, '', 'PDA15000019', 'SD Storage Transport and Other costs-Pass-through', NULL, NULL, 'P', 'DA', '1', 'PDA5000019', 'Storage, Transport and Other costs  - Pass-through', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1342, '', 'PDB10000002', 'SD Implementation, Delivery and Distribution Costs(Plan)', NULL, NULL, 'P', 'DB', '1', 'PDB0000002', 'Implementation, Delivery and Distribution Costs', 'Service Delivery');
INSERT INTO `pma_gl_codes` VALUES (1343, '', 'PIA14190000', 'Act Mng International Professional Staff', NULL, NULL, 'P', 'IA', '1', 'PIA4190000', 'International Professional Staff', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1344, '', 'PIA14200000', 'Activ Mgmt International Consultants(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA4200000', 'International Consultants', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1345, '', 'PIA14200001', 'Activ Mgmt International Consultants MSLS cost(Pla', NULL, NULL, 'P', 'IA', '1', 'PIA4200001', 'International Consultants MSLS cost', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1346, '', 'PIA14300000', 'Activ Mgmt Local Staff - National Officer(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA4300000', 'Local Staff - National Officer', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1347, '', 'PIA14300100', 'Activ Mgmt Local Staff - General Service(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA4300100', 'Local Staff - General Service', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1348, '', 'PIA14300200', 'Activ Mgmt Local Staff -Temporary Assistance(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA4300200', 'Local Staff -Temporary Assistance', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1349, '', 'PIA14300450', 'Activ Mgmt Staff Danger/Hazard Pay & Hardship Allo', NULL, NULL, 'P', 'IA', '1', 'PIA4300450', 'Staff Danger/Hazard Pay & Hardship Allowances', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1350, '', 'PIA14300600', 'Activ Mgmt Non Staff HR: UNV(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA4300600', 'Non Staff HR: UNV', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1351, '', 'PIA14300700', 'Activ Mgmt Local Consultants(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA4300700', 'Local Consultants', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1352, '', 'PIA14300800', 'Activ Mgmt Staff Other cost(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA4300800', 'Staff Other cost', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1353, '', 'PIA15000001', 'Activ Mgmt Facility and running costs(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA5000001', 'Facility Rent and Running costs', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1354, '', 'PIA15000002', 'Activ Mgmt Vehicle Leasing and Running costs(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA5000002', 'Vehicle Leasing and Running costs', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1355, '', 'PIA15000003', 'Activ Mgmt Vehicle Acquisition(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA5000003', 'Vehicle Acquisition', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1356, '', 'PIA15000004', 'Activ Mgmt Equipment and Supplies(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA5000004', 'Equipment and Supplies', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1357, '', 'PIA15000005', 'Activ Mgmt TC/IT Equipment(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA5000005', 'TC/IT Equipment', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1358, '', 'PIA15000006', 'Activ Mgmt Security Costs(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA5000006', 'Security Costs', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1359, '', 'PIA15000007', 'Activ Mgmt  Travel costs(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA5000007', 'Travel costs', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1360, '', 'PIA15000008', 'Activ Mgmt Contracted Services - Other(Plan)', NULL, NULL, 'P', 'IA', '1', 'PIA5000008', 'Contracted Services - Other', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1361, '', 'PIA15000009', 'Activ Mngm Contracted Services - Evaluation', NULL, NULL, 'P', 'IA', '1', 'PIA5000009', 'Contracted Services - Evaluation', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1362, '', 'PIA15000010', 'Activ Mngm Contracted Services - Monitoring', NULL, NULL, 'P', 'IA', '1', 'PIA5000010', 'Contracted Services - Monitoring', 'Implementation');
INSERT INTO `pma_gl_codes` VALUES (1363, '', 'PAA14190000', 'DSC International Professional Staff', NULL, NULL, 'P', 'AA', '1', 'PAA4190000', 'International Professional Staff', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1364, '', 'PAA14200000', 'DSC-International Consultants (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA4200000', 'International Consultants', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1365, '', 'PAA14200001', 'DSC Int Cons MSLS cost (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA4200001', 'International Consultants MSLS cost', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1366, '', 'PAA14300000', 'DSC-Local Staff - National Officer (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA4300000', 'Local Staff - National Officer', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1367, '', 'PAA14300100', 'DSC-Local Staff - General Service (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA4300100', 'Local Staff - General Service', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1368, '', 'PAA14300200', 'DSC-Local Staff -Temporary Assistance (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA4300200', 'Local Staff -Temporary Assistance', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1369, '', 'PAA14300450', 'DSC-Staff Danger/Hazard Pay & Hardship Allowan', NULL, NULL, 'P', 'AA', '1', 'PAA4300450', 'Staff Danger/Hazard Pay & Hardship Allowances', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1370, '', 'PAA14300600', 'DSC-Non Staff HR: UNV (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA4300600', 'Non Staff HR: UNV', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1371, '', 'PAA14300700', 'DSC-Local Consultants (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA4300700', 'Local Consultants', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1372, '', 'PAA14300800', 'DSC-Staff Other cost (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA4300800', 'Staff Other cost', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1373, '', 'PAA15000001', 'DSC-Facility Rent and Running costs (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000001', 'Facility Rent and Running costs', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1374, '', 'PAA15000002', 'DSC-Vehicle Leasing and Running costs (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000002', 'Vehicle Leasing and Running costs', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1375, '', 'PAA15000003', 'DSC-Vehicle Acquisition (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000003', 'Vehicle Acquisition', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1376, '', 'PAA15000004', 'DSC-Office Equipment and Supplies (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000004', 'Office Equipment and Supplies', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1377, '', 'PAA15000005', 'DSC-TC/IT Equipment (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000005', 'TC/IT Equipment', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1378, '', 'PAA15000006', 'DSC-Security Costs (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000006', 'Security Costs', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1379, '', 'PAA15000007', 'DSC-Travel costs (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000007', 'Travel costs', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1380, '', 'PAA15000008', 'DSC-UN Organization Services  (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000008', 'UN Organization Services ', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1381, '', 'PAA15000009', 'DSC-Commercial Services (Plan)', NULL, NULL, 'P', 'AA', '1', 'PAA5000009', 'Commercial Services', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1382, '', 'PAB10000001', 'DSC-Assessments Costs (Plan)', NULL, NULL, 'P', 'AB', '1', 'PAB0000001', 'Assessments Costs', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1383, '', 'PAC10000001', 'DSC-Evaluation Costs (Plan)', NULL, NULL, 'P', 'AC', '1', 'PAC0000001', 'Evaluation Costs', 'DSC');
INSERT INTO `pma_gl_codes` VALUES (1384, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pma_gl_codes` VALUES (1385, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pma_gl_codes` VALUES (1386, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pma_gl_codes` VALUES (1387, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pma_gl_codes` VALUES (1388, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pma_gl_codes` VALUES (1389, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for pma_migrate
-- ----------------------------
DROP TABLE IF EXISTS `pma_migrate`;
CREATE TABLE `pma_migrate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tab_wings` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name_wings` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `table` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name_app` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `active` int(11) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_migrate
-- ----------------------------
INSERT INTO `pma_migrate` VALUES (1, 'BUDGET', 'Grant', 'pma_contrinuciones', 'grant_number', 1);
INSERT INTO `pma_migrate` VALUES (2, 'BUDGET', 'Activity 3', '1', NULL, 0);
INSERT INTO `pma_migrate` VALUES (3, 'BUDGET', 'Activity 4', '1', NULL, 0);
INSERT INTO `pma_migrate` VALUES (4, 'PRECOMIT', 'Grant', 'pma_contrinuciones', 'grant_number', 1);
INSERT INTO `pma_migrate` VALUES (5, 'PRECOMIT', 'Activity 6', '1', NULL, 0);
INSERT INTO `pma_migrate` VALUES (6, 'PRECOMIT', 'Activity 7', '1', NULL, 0);
INSERT INTO `pma_migrate` VALUES (7, 'PRECOMIT', 'Activity 8', '1', NULL, 0);

-- ----------------------------
-- Table structure for pma_payroll
-- ----------------------------
DROP TABLE IF EXISTS `pma_payroll`;
CREATE TABLE `pma_payroll`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `grade` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `staff` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `index_no` varchar(12) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `hr_position` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `number_months` int(11) NULL DEFAULT NULL,
  `number_staff` int(11) NULL DEFAULT NULL,
  `monthly_cost_2019` float NULL DEFAULT NULL,
  `monthly_cost_2018` float NULL DEFAULT NULL,
  `expected_cost_2019` float NULL DEFAULT NULL,
  `without_increase` float NULL DEFAULT NULL,
  `increase_2` float NULL DEFAULT NULL,
  `increase_5` float NULL DEFAULT NULL,
  `program_validation` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 47 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_payroll
-- ----------------------------
INSERT INTO `pma_payroll` VALUES (1, 'Quito', 'Programa', NULL, '8805019', 'National Officer ', 12, 1, 0, 6809, 0, 0, 0, 0, 0);
INSERT INTO `pma_payroll` VALUES (2, 'Quito ', 'Programa', NULL, '8817080', 'Senior Programme Associate', 12, 1, 0, 3808, 0, 0, 0, 0, 0);
INSERT INTO `pma_payroll` VALUES (3, 'Quito ', 'Programa', NULL, '8824089', 'Resilience Associate', 12, 1, 0, 2464, 0, 0, 0, 0, 0);
INSERT INTO `pma_payroll` VALUES (4, 'Quito ', 'Programa', NULL, '8836324', 'Nutrition Associate', 12, 1, 0, 2240, 0, 0, 0, 0, 0);
INSERT INTO `pma_payroll` VALUES (5, 'Quito ', 'Programa', NULL, '8843306', 'Nutrition Assistant', 12, 1, 0, 1400, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (6, 'Quito ', 'Programa', NULL, '8814073', 'SO_Quito', 12, 1, 0, 2128, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (7, 'Quito ', 'Programa', NULL, '8829387', 'Programme Assistant', 12, 1, 0, 2016, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (8, 'Quito ', 'Programa', NULL, '8805016', 'Programme & Finance Assistant', 12, 1, 0, 1792, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (9, 'Quito ', 'M&E', NULL, '8805018', 'Head of Monitoring', 12, 1, 0, 5903, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (10, 'Quito ', 'M&E', NULL, '8841746', 'Budget and Programming', 12, 1, 0, 2240, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (11, 'Quito ', 'M&E', NULL, '8848212', 'Communications Associate', 12, 1, 0, 1792, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (12, 'Quito ', 'M&E', NULL, '8842474', 'Monitoring Assistant', 12, 1, 0, 1400, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (13, 'Quito ', 'Programa', NULL, NULL, 'Coordinador Binacional Ad. Fund', 9, 1, 0, 2376, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (14, 'Quito ', 'Programa', NULL, '8845838', 'Coordinador Nacional Ad. Fund', 12, 1, 0, 3360, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (15, 'Quito ', 'Programa', NULL, '8843243', 'Punto Focal PMA Ad. Fund', 12, 1, 0, 1792, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (16, 'Quito ', 'Programa', NULL, '8847507', 'Punto Focal MAE Ad. Fund', 12, 1, 0, 1792, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (17, 'Quito ', 'Programa', NULL, '8847835', 'Programme Assistant', 12, 1, 0, 1792, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (18, 'Ibarra', 'Programa', NULL, '8826115', 'Coordinación SO', 12, 1, 0, 3024, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (19, 'Esmeraldas', 'Programa', NULL, '8831745', 'SO Esmeraldas ', 12, 1, 0, 1792, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (20, 'San Lorenzo', 'Programa', NULL, '8831747', 'SO Esmeraldas ', 12, 1, 0, 1680, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (21, 'Sucumbíos', 'Programa', NULL, '8822825', 'SO Sucumbíos', 12, 1, 0, 2240, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (22, 'Sucumbíos', 'Programa', NULL, '8829761', 'SO Sucumbíos', 12, 1, 0, 1680, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (23, 'Tulcán', 'Programa', NULL, '8824322', 'SO Tulcán', 12, 1, 0, 1540, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (24, 'Ibarra', 'Programa', NULL, '8837969', 'SO Ibarra', 6, 1, 0, 1400, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (25, 'Quito ', 'Servicios', NULL, '8803876', 'Head of Finance ', 12, 1, 0, 4623, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (26, 'Quito ', 'Servicios', NULL, '8805029', 'Finance Assistant', 12, 1, 0, 2695, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (27, 'Quito ', 'Servicios', NULL, '8804693', 'Head of Administration', 9, 1, 0, 5739, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (28, 'Quito ', 'Servicios', NULL, '8844585', 'Procurement Assistant', 12, 1, 0, 1792, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (29, 'Quito ', 'Servicios', NULL, '8824846', 'Admin Assistant', 12, 1, 0, 1404, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (30, 'Quito ', 'Servicios', NULL, '8803707', 'IT Associate', 12, 1, 0, 1960, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (31, 'Quito ', 'Servicios', NULL, '8806343', 'Driver', 12, 1, 0, 1372, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (32, 'Quito ', 'Servicios', NULL, '8804291', 'Head of Human Resources', 1, 1, 0, 2514, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (33, 'Quito ', 'Servicios', NULL, NULL, 'Head of Human Resources', 5, 1, 0, 2514, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (34, 'Quito ', 'Servicios', NULL, NULL, 'Head of Human Resources', 9, 1, 0, 2514, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (35, 'Quito ', 'Servicios', NULL, '8806862', 'HR Assistant / Finance', 12, 1, 0, 1680, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (36, 'Quito ', 'Servicios', NULL, '8846150', 'Admin Assistant', 12, 1, 0, 1400, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (37, 'Quito ', 'Programa', NULL, '8847370', 'Monitoring Assistant', 12, 1, 0, 1400, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (38, 'Quito ', 'Programa', NULL, '8846835', 'Consultor', 3, 1, 0, 2800, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (39, 'Guayaquil', 'Programa', NULL, '8846966', 'Consultor', 12, 1, 0, 2240, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (40, 'Tulcán', 'Programa', NULL, '8830986', 'SO Tulcán', 12, 1, 0, 1400, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (41, 'Guayaquil', 'Programa', NULL, NULL, 'SO Guayaquil ', 10, 1, 0, 1540, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (42, 'Quito ', 'Programa', NULL, NULL, 'Consultora', 9, 1, 0, 2800, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (43, 'Quito ', 'Programa', NULL, NULL, 'Programme Assistant', 0, 1, 0, 1792, 0, 0, 0, 0, NULL);
INSERT INTO `pma_payroll` VALUES (44, 'Quito ', 'Programa', NULL, NULL, 'CO Protección Social', 6, 1, 2800, 2240, 16800, 16000, 16320, 16800, NULL);
INSERT INTO `pma_payroll` VALUES (45, 'Quito ', 'Servicios', NULL, NULL, 'Admin Assistant', 7, 1, 1428, 1400, 9996, 17136, NULL, NULL, NULL);
INSERT INTO `pma_payroll` VALUES (46, 'Quito ', 'Programa', NULL, NULL, 'CO Género', 9, 1, 0, 2240, 0, 0, 0, 0, NULL);

-- ----------------------------
-- Table structure for pma_payroll_detalle
-- ----------------------------
DROP TABLE IF EXISTS `pma_payroll_detalle`;
CREATE TABLE `pma_payroll_detalle`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number-months` int(11) NULL DEFAULT NULL,
  `number-staff` int(11) NULL DEFAULT NULL,
  `monthly-cost-2019` float NULL DEFAULT NULL,
  `monthly-cost-2018` float NULL DEFAULT NULL,
  `expected-cost-2019` float NULL DEFAULT NULL,
  `without-increase` float NULL DEFAULT NULL,
  `increase-2` float NULL DEFAULT NULL,
  `increase-5` float NULL DEFAULT NULL,
  `program-validation` float NULL DEFAULT NULL,
  `id_pma_payroll` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for pma_planificacion_micro
-- ----------------------------
DROP TABLE IF EXISTS `pma_planificacion_micro`;
CREATE TABLE `pma_planificacion_micro`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_plan_micro` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `current_budget` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `precommit` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `commit` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `expend` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `available` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `unspent` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pma_so_categories
-- ----------------------------
DROP TABLE IF EXISTS `pma_so_categories`;
CREATE TABLE `pma_so_categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id__cost_category` int(11) NULL DEFAULT NULL,
  `category_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `category_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_so_categories
-- ----------------------------
INSERT INTO `pma_so_categories` VALUES (1, 1, 'SO1', 'EC01.01.011');
INSERT INTO `pma_so_categories` VALUES (2, 2, 'SO2', 'EC01.03.021');
INSERT INTO `pma_so_categories` VALUES (3, 3, 'SO3', 'EC01.04.031');
INSERT INTO `pma_so_categories` VALUES (4, 4, 'SO4', 'EC01.05.041 ');

-- ----------------------------
-- Table structure for qo_groups
-- ----------------------------
DROP TABLE IF EXISTS `qo_groups`;
CREATE TABLE `qo_groups`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `id_unidad` int(11) NULL DEFAULT NULL COMMENT 'describe a que unidad pertenece el grupo. ',
  `create` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`, `active`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = 'Un grupo describe el acceso funcional dentro del sistema MatisAMC\r\n' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_groups
-- ----------------------------
INSERT INTO `qo_groups` VALUES (1, 'Administrador', 'Administrador ', 1, 11, '2018-07-01 15:01:53');
INSERT INTO `qo_groups` VALUES (2, 'Administrador Secretaria General', 'Administrador  Secretaria General', 1, 2, '2018-07-01 15:01:53');
INSERT INTO `qo_groups` VALUES (3, 'Secretaria General', 'Usuarios Secretaria General', 1, 2, '2018-07-01 15:01:53');
INSERT INTO `qo_groups` VALUES (4, 'Zonales', 'Usuarios  Zonales  Secretaria General', 1, 2, '2018-07-01 15:01:53');
INSERT INTO `qo_groups` VALUES (5, 'Denuncias WEB', 'Denuncias WEB  Secretaria General', 1, 2, '2018-07-01 15:01:53');
INSERT INTO `qo_groups` VALUES (6, 'Inspeccion', 'Denuncias Inspeccion', 1, 3, '2018-07-01 15:01:53');
INSERT INTO `qo_groups` VALUES (7, 'Supervision', 'Usuarios Supervision', 1, 12, '2018-07-01 15:01:53');
INSERT INTO `qo_groups` VALUES (8, 'Administrador Operativos', 'Administrador  personal operativos', 1, 2, '2018-07-01 15:01:53');
INSERT INTO `qo_groups` VALUES (9, 'Operativos', 'Personal operativos AMC', 1, 3, '2018-07-01 15:01:53');

-- ----------------------------
-- Table structure for qo_groups_has_members
-- ----------------------------
DROP TABLE IF EXISTS `qo_groups_has_members`;
CREATE TABLE `qo_groups_has_members`  (
  `qo_groups_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `qo_members_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Is the member currently active in this group',
  `admin` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Is the member the administrator of this group',
  PRIMARY KEY (`qo_members_id`, `qo_groups_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_groups_has_members
-- ----------------------------
INSERT INTO `qo_groups_has_members` VALUES (1, 1, 1, 1);
INSERT INTO `qo_groups_has_members` VALUES (15, 2, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (1, 3, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (2, 3, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (3, 3, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (4, 3, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (5, 3, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (6, 3, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (3, 4, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (3, 5, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (2, 6, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (3, 7, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (8, 7, 1, 0);
INSERT INTO `qo_groups_has_members` VALUES (25, 7, 1, 0);

-- ----------------------------
-- Table structure for qo_groups_has_privileges
-- ----------------------------
DROP TABLE IF EXISTS `qo_groups_has_privileges`;
CREATE TABLE `qo_groups_has_privileges`  (
  `qo_groups_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `qo_privileges_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`qo_groups_id`, `qo_privileges_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_groups_has_privileges
-- ----------------------------
INSERT INTO `qo_groups_has_privileges` VALUES (1, 1);
INSERT INTO `qo_groups_has_privileges` VALUES (2, 2);
INSERT INTO `qo_groups_has_privileges` VALUES (3, 3);
INSERT INTO `qo_groups_has_privileges` VALUES (4, 4);
INSERT INTO `qo_groups_has_privileges` VALUES (5, 5);
INSERT INTO `qo_groups_has_privileges` VALUES (6, 6);
INSERT INTO `qo_groups_has_privileges` VALUES (7, 7);
INSERT INTO `qo_groups_has_privileges` VALUES (8, 9);
INSERT INTO `qo_groups_has_privileges` VALUES (9, 8);
INSERT INTO `qo_groups_has_privileges` VALUES (10, 10);
INSERT INTO `qo_groups_has_privileges` VALUES (11, 11);
INSERT INTO `qo_groups_has_privileges` VALUES (12, 12);
INSERT INTO `qo_groups_has_privileges` VALUES (13, 13);
INSERT INTO `qo_groups_has_privileges` VALUES (14, 14);
INSERT INTO `qo_groups_has_privileges` VALUES (15, 15);
INSERT INTO `qo_groups_has_privileges` VALUES (16, 16);
INSERT INTO `qo_groups_has_privileges` VALUES (17, 23);
INSERT INTO `qo_groups_has_privileges` VALUES (18, 18);
INSERT INTO `qo_groups_has_privileges` VALUES (19, 19);
INSERT INTO `qo_groups_has_privileges` VALUES (21, 21);
INSERT INTO `qo_groups_has_privileges` VALUES (22, 22);
INSERT INTO `qo_groups_has_privileges` VALUES (23, 24);
INSERT INTO `qo_groups_has_privileges` VALUES (24, 25);
INSERT INTO `qo_groups_has_privileges` VALUES (25, 26);
INSERT INTO `qo_groups_has_privileges` VALUES (26, 29);
INSERT INTO `qo_groups_has_privileges` VALUES (27, 28);
INSERT INTO `qo_groups_has_privileges` VALUES (28, 30);
INSERT INTO `qo_groups_has_privileges` VALUES (29, 31);
INSERT INTO `qo_groups_has_privileges` VALUES (30, 32);
INSERT INTO `qo_groups_has_privileges` VALUES (31, 33);
INSERT INTO `qo_groups_has_privileges` VALUES (32, 34);
INSERT INTO `qo_groups_has_privileges` VALUES (33, 35);
INSERT INTO `qo_groups_has_privileges` VALUES (34, 36);
INSERT INTO `qo_groups_has_privileges` VALUES (35, 37);
INSERT INTO `qo_groups_has_privileges` VALUES (36, 38);
INSERT INTO `qo_groups_has_privileges` VALUES (37, 39);
INSERT INTO `qo_groups_has_privileges` VALUES (38, 40);
INSERT INTO `qo_groups_has_privileges` VALUES (39, 41);
INSERT INTO `qo_groups_has_privileges` VALUES (40, 42);

-- ----------------------------
-- Table structure for qo_libraries
-- ----------------------------
DROP TABLE IF EXISTS `qo_libraries`;
CREATE TABLE `qo_libraries`  (
  `id` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_libraries
-- ----------------------------
INSERT INTO `qo_libraries` VALUES ('checkbox', '{\r\n   \"client\": {\r\n      \"css\": [\r\n         {\r\n           \"directory\": \"checkbox/\",\r\n           \"files\": [ \"min.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"checkbox/\",\r\n            \"files\": [ \"min.js\" ]\r\n         }\r\n      ]\r\n   }\r\n}\r\n', 1);
INSERT INTO `qo_libraries` VALUES ('colorpicker', '{\r\n   \"dependencies\": [\r\n      { \"id\": \"hexfield\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"client\": {\r\n      \"css\": [\r\n         {\r\n           \"directory\": \"color-picker/resources/\",\r\n           \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"color-picker/\",\r\n            \"files\": [ \"Ext.ux.ColorPicker.js\" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);
INSERT INTO `qo_libraries` VALUES ('columntree', '{\r\n   \"client\": {\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"column-tree/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);
INSERT INTO `qo_libraries` VALUES ('explorerview', '{\r\n   \"client\": {\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"explorer-view/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"explorer-view/\",\r\n            \"files\": [ \"Ext.ux.grid.ExplorerView.js\", \"Ext.ux.grid.GroupingExplorerView.js\" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);
INSERT INTO `qo_libraries` VALUES ('hexfield', '{\r\n   \"client\": {\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"hex-field/\",\r\n            \"files\": [ \"Ext.ux.form.HexField.js\" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);
INSERT INTO `qo_libraries` VALUES ('iframecomponent', '{\r\n   \"client\": {\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"iframe-component/\",\r\n            \"files\": [ \"Ext.ux.IFrameComponent.js\" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);
INSERT INTO `qo_libraries` VALUES ('modalnotice', '{\r\n   \"client\": {\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"modal-notice/\",\r\n            \"files\": [ \"Ext.plugin.ModalNotice.js\" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);
INSERT INTO `qo_libraries` VALUES ('roweditor', '{\r\n   \"client\": {\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"row-editor/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"row-editor/\",\r\n            \"files\": [ \"Ext.ux.grid.RowEditor.js\" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);
INSERT INTO `qo_libraries` VALUES ('statusbar', '{\r\n   \"client\": {\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"statusbar/\",\r\n            \"files\": [ \"Ext.ux.StatusBar.js\" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);

-- ----------------------------
-- Table structure for qo_log
-- ----------------------------
DROP TABLE IF EXISTS `qo_log`;
CREATE TABLE `qo_log`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `level` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT 'ERROR, WARNING, MESSAGE or AUDIT',
  `text` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `timestamp` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for qo_members
-- ----------------------------
DROP TABLE IF EXISTS `qo_members`;
CREATE TABLE `qo_members`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_name` varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email_address` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `locale` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'en',
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Is the member currently active',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_members
-- ----------------------------
INSERT INTO `qo_members` VALUES (1, 'BYRON', 'HERRERA', 'byron.herrera@wfp.org', '0325e9bd933864b199c0c5808a52332d2e42473e', 'en', 1);
INSERT INTO `qo_members` VALUES (2, 'Usuario2', 'Usuario Apellido 2', 'usuario2@wfp.org', '025367b891db1fcf9b09783f845bddb69460d0e5', 'en', 1);
INSERT INTO `qo_members` VALUES (3, 'Usuario3', 'Usuario Apellido 3', 'usuario3@wfp.org', 'f66c903555d57a5814445281459534d2dba08b39', 'en', 1);
INSERT INTO `qo_members` VALUES (4, 'Usuario4', 'Usuario Apellido 4', 'usuario4@wfp.org', '8932245571023dbdc587e7427569a6146a5f4b47', 'en', 1);
INSERT INTO `qo_members` VALUES (5, 'Usuario5', 'Usuario Apellido 5', 'usuario5@wfp.org', 'bf0c2796538ca66a85c8334a6b3457f35c8a9311', 'en', 1);
INSERT INTO `qo_members` VALUES (6, 'Usuario6', 'Usuario Apellido 6', 'usuario6@wfp.org', '6adc8623c87ee4f4385a281cce6a2d43f5c029da', 'en', 1);
INSERT INTO `qo_members` VALUES (7, 'Usuario7', 'Usuario Apellido 7', 'usuario7@wfp.org', '4b340fb9f7262d3a0fc5152b0dbc29bfa888acec', 'en', 1);

-- ----------------------------
-- Table structure for qo_modules
-- ----------------------------
DROP TABLE IF EXISTS `qo_modules`;
CREATE TABLE `qo_modules`  (
  `id` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `type` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `name` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_modules
-- ----------------------------
INSERT INTO `qo_modules` VALUES ('contribuciones', 'desktop/contribuciones', 'Contribuciones', 'Contributions management', '{\r\n  \"id\": \"contribuciones\",\r\n  \"type\": \"desktop/contribuciones\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Contributions management.\",\r\n    \"name\": \"Contributions management\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosZonales\", \"description\": \"Personal de zonales\" }\r\n\r\n    ],\r\n    \"class\": \"QoContribuciones\",\r\n    \"file\": \"desktop/contribuciones/contribuciones.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.ContribucionesWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/contribuciones/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\", \"Ext.ux.GMapPanel3.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/contribuciones/client/\",\r\n        \"files\": [  \"contribuciones-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"contribuciones-icon\",\r\n        \"shortcutIconCls\": \"contribuciones-shortcut\",\r\n        \"text\": \"Contributions\",\r\n        \"tooltip\": \"<b>Contributions management</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);
INSERT INTO `qo_modules` VALUES ('mantenimiento', 'desktop/mantenimiento', 'Management', 'Management interface', '{\r\n  \"id\": \"mantenimiento\",\r\n  \"type\": \"desktop/mantenimiento\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Maintenance.\",\r\n    \"name\": \"Maintenance\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosZonales\", \"description\": \"Personal de zonales\" }\r\n\r\n    ],\r\n    \"class\": \"QoMantenimiento\",\r\n    \"file\": \"desktop/mantenimiento/mantenimiento.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.MantenimientoWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/mantenimiento/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/mantenimiento/client/\",\r\n        \"files\": [  \"mantenimiento-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"mantenimiento-icon\",\r\n        \"shortcutIconCls\": \"mantenimiento-shortcut\",\r\n        \"text\": \"Maintenance\",\r\n        \"tooltip\": \"<b>Maintenance</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);
INSERT INTO `qo_modules` VALUES ('planificacion', 'desktop/planificacion', 'Macro', 'Macro', '{\r\n  \"id\": \"inspeccion\",\r\n  \"type\": \"desktop/inspeccion\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Macro Planning.\",\r\n    \"name\": \"Macro Planning.\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso con vista de todos los tramites\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso con vista de tramites pendientes\" },\r\n      { \"name\": \"accesosInspeccion\", \"description\": \"Personal de inspeccion\" },\r\n      { \"name\": \"accesosSupervision\", \"description\": \"Personal de supervision\" }\r\n    ],\r\n    \"class\": \"QoDenuncias\",\r\n    \"file\": \"desktop/inspeccion/denuncias.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.InspeccionWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/inspeccion/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      }\r\n			,{\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n			,{\r\n        \"directory\": \"common/libraries/treegrid/\",\r\n        \"files\": [  \"treegrid.css\"]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"../ext-3.4.1/examples/ux/treegrid/\",\r\n        \"files\": [ \"TreeGridColumnResizer.js\", \"TreeGridColumns.js\", \"TreeGridLoader.js\", \"TreeGridNodeUI.js\", \"TreeGridSorter.js\", \"TreeGrid.js\"]\r\n      },\r\n			{\r\n        \"directory\": \"desktop/inspeccion/client/\",\r\n        \"files\": [  \"moduloInspeccion-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"inspeccion-icon\",\r\n        \"shortcutIconCls\": \"inspeccion-shortcut\",\r\n        \"text\": \"Macro Planning\",\r\n        \"tooltip\": \"<b>Macro Planning</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);
INSERT INTO `qo_modules` VALUES ('planificacionmicro', 'desktop/planificacionmicro', 'Micro', 'Micro', '{\r\n  \"id\": \"planificacionmicro\",\r\n  \"type\": \"desktop/planificacionmicro\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Micro Planning.\",\r\n    \"name\": \"Micro Planning\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso con vista de todos los tramites\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso con vista de tramites pendientes\" },\r\n      { \"name\": \"accesosPlanificacionmicro\", \"description\": \"Personal de planificacionmicro\" },\r\n      { \"name\": \"accesosSupervision\", \"description\": \"Personal de supervision\" }\r\n\r\n    ],\r\n    \"class\": \"QoDenuncias\",\r\n    \"file\": \"desktop/planificacionmicro/denuncias.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.PlanificacionmicroWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/planificacionmicro/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/planificacionmicro/client/\",\r\n        \"files\": [  \"moduloPlanificacionmicro-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"planificacionmicro-icon\",\r\n        \"shortcutIconCls\": \"planificacionmicro-shortcut\",\r\n        \"text\": \"Micro Planning\",\r\n        \"tooltip\": \"<b>Micro Planning</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);
INSERT INTO `qo_modules` VALUES ('qo-admin', 'system/administration', 'Admin', 'Allows system administration', '{\r\n   \"id\": \"qo-admin\",\r\n\r\n   \"type\": \"system/administration\",\r\n\r\n   \"about\": {\r\n      \"author\": \"\",\r\n      \"description\": \"\",\r\n      \"name\": \"Admin\",\r\n      \"url\": \"\",\r\n      \"version\": \"1.0\"\r\n   },\r\n\r\n   \"dependencies\": [\r\n      { \"id\": \"columntree\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"client\": {\r\n      \"class\": \"QoDesk.QoAdmin\",\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"qwiki/admin/client/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"qwiki/admin/client/\",\r\n            \"files\": [ \"QoAdmin.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/\",\r\n            \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/groups/\",\r\n            \"files\": [ \"Groups.js\", \"GroupsTooltipEditor.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/members/\",\r\n            \"files\": [ \"Members.js\", \"MembersTooltipEditor.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/privileges/\",\r\n            \"files\": [ \"Privileges.js\", \"PrivilegesTooltipEditor.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/signups/\",\r\n            \"files\": [ \"Signups.js\", \"SignupsDetail.js\", \"SignupsGrid.js\" ]\r\n         }\r\n      ],\r\n      \"launcher\": {\r\n         \"config\": {\r\n            \"iconCls\": \"qo-admin-icon\",\r\n            \"shortcutIconCls\": \"qo-admin-shortcut-icon\",\r\n            \"text\": \"Admin\",\r\n            \"tooltip\": \"<b>Administrador</b><br />Permite configurar el sistema\"\r\n         },\r\n         \"paths\": {\r\n            \"startmenu\": \"/\"\r\n         }\r\n      }\r\n   },\r\n\r\n   \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"addGroup\", \"description\": \"Add a new group\" },\r\n         { \"name\": \"addMember\", \"description\": \"Add a new member\" },\r\n         { \"name\": \"addPrivilege\", \"description\": \"Add a new privilege\" },\r\n         { \"name\": \"approveSignupsToGroup\", \"description\": \"Approve a signup request\" },\r\n         { \"name\": \"deleteGroup\", \"description\": \"Delete a group\" },\r\n         { \"name\": \"deleteMember\", \"description\": \"Delete a member\" },\r\n         { \"name\": \"deletePrivilege\", \"description\": \"Delete a privilege\" },\r\n         { \"name\": \"denySignups\", \"description\": \"Deny a signup request\" },\r\n         { \"name\": \"editGroup\", \"description\": \"Edit a groups information\" },\r\n         { \"name\": \"editGroupPrivilege\", \"description\": \"Edit what privilege a group is associated with\" },\r\n         { \"name\": \"editMember\", \"description\": \"Edit a members information\" },\r\n         { \"name\": \"editMembersGroups\", \"description\": \"Edit what groups a member is associated with\" },\r\n         { \"name\": \"editPrivilege\", \"description\": \"Edit a privileges information\" },\r\n         { \"name\": \"editPrivilegeModules\", \"description\": \"Edit what modules and methods a privilege allows\" },\r\n         { \"name\": \"viewGroups\", \"description\": \"View groups\" },\r\n         { \"name\": \"viewGroupPrivileges\", \"description\": \"View the privileges available to the group\" },\r\n         { \"name\": \"viewMembers\", \"description\": \"View members information\" },\r\n         { \"name\": \"viewMemberGroups\", \"description\": \"View the groups available to the member\" },\r\n         { \"name\": \"viewPrivileges\", \"description\": \"View privilege information\" },\r\n         { \"name\": \"viewPrivilegeModules\", \"description\": \"View the modules available to the privilege\" },\r\n         { \"name\": \"viewSignups\", \"description\": \"View all sign ups\" }\r\n      ],\r\n      \"class\": \"QoAdmin\",\r\n      \"file\": \"qwiki/admin/server/QoAdmin.php\"\r\n   }\r\n}', 1);
INSERT INTO `qo_modules` VALUES ('qo-mail', 'email', 'Email', 'Allows users to send and receive email', '{\r\n   \"id\": \"qo-mail\",\r\n\r\n   \"type\": \"system/email\",\r\n\r\n   \"about\": {\r\n      \"author\": \"Todd Murdock\",\r\n      \"description\": \"Allows users to send and receive email\",\r\n      \"name\": \"qWikiMail\",\r\n      \"url\": \"www.qwikioffice.com\",\r\n      \"version\": \"1.0\"\r\n   },\r\n\r\n   \"dependencies\": [\r\n         { \"id\": \"iframecomponent\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"client\": {\r\n      \"class\": \"QoDesk.QoMail\",\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"qwiki/mail/client/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"qwiki/mail/client/\",\r\n            \"files\": [ \"QoMail.js\" ]\r\n         }\r\n      ],\r\n      \"launcher\": {\r\n         \"config\": {\r\n            \"iconCls\": \"qo-mail-icon\",\r\n            \"shortcutIconCls\": \"qo-mail-shortcut-icon\",\r\n            \"text\": \"Mail\",\r\n            \"tooltip\": \"<b>Mail</b><br />Allows you to send and receive email\"\r\n         },\r\n         \"paths\": {\r\n            \"startmenu\": \"/\"\r\n         }\r\n      }\r\n   },\r\n\r\n   \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"loadMemberFolders\", \"description\": \"Allow member to load (view) their folders\" },\r\n         { \"name\": \"addMemberFolder\", \"description\": \"Allow member to add a new folder\" }\r\n      ],\r\n      \"class\": \"QoMail\",\r\n      \"file\": \"qwiki/mail/server/QoMail.php\"\r\n   }\r\n}', 0);
INSERT INTO `qo_modules` VALUES ('qo-preferences', 'system/preferences', 'Preferences', 'Allows users to set and save their desktop preferences', '{\r\n   \"id\": \"qo-preferences\",\r\n\r\n   \"type\": \"system/preferences\",\r\n\r\n   \"about\": {\r\n      \"author\": \"\",\r\n      \"description\": \"\",\r\n      \"name\": \"Preferences\",\r\n      \"url\": \"www.qwikioffice.com\",\r\n      \"version\": \"1.0\"\r\n   },\r\n\r\n   \"dependencies\": [\r\n      { \"id\": \"colorpicker\", \"type\": \"library\" },\r\n      { \"id\": \"explorerview\", \"type\": \"library\" },\r\n      { \"id\": \"modalnotice\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"locale\": {\r\n      \"class\": \"QoDesk.QoPreferences.Locale\",\r\n      \"directory\": \"qwiki/preferences/client/locale/\",\r\n      \"extension\": \".json\",\r\n      \"languages\": [ \"en\" ]\r\n   },\r\n\r\n   \"client\": {\r\n      \"class\": \"QoDesk.QoPreferences\",\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"qwiki/preferences/client/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"qwiki/preferences/client/\",\r\n            \"files\": [ \"QoPreferences.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/preferences/client/lib/\",\r\n            \"files\": [ \"Appearance.js\", \"AutoRun.js\", \"Background.js\", \"CheckTree.js\", \"Grid.js\", \"Nav.js\", \"QuickStart.js\", \"Shortcuts.js\" ]\r\n         }\r\n      ],\r\n      \"launcher\": {\r\n         \"config\": {\r\n            \"iconCls\": \"qo-pref-icon\",\r\n            \"shortcutIconCls\": \"qo-pref-shortcut-icon\",\r\n            \"text\": \"Preferences\",\r\n            \"tooltip\": \"<b>Preferencias</b><br />Permite modificar su escritorio\"\r\n         },\r\n         \"paths\": {\r\n            \"contextmenu\": \"/\",\r\n            \"startmenutool\": \"/\"\r\n         }\r\n      }\r\n   },\r\n\r\n   \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"saveAppearance\", \"description\": \"Allow member to save appearance\" },\r\n         { \"name\": \"saveAutorun\", \"description\": \"Allow member to save which modules run at start up\" },\r\n         { \"name\": \"saveBackground\", \"description\": \"Allow member to save a wallpaper as the background\" },\r\n         { \"name\": \"saveQuickstart\", \"description\": \"Allow member to save which modules appear in the Quick Start panel\" },\r\n         { \"name\": \"saveShortcut\", \"description\": \"Allow member to save which modules appear as a Shortcut\" },\r\n         { \"name\": \"viewThemes\", \"description\": \"Allow member to view the available themes\" },\r\n         { \"name\": \"viewWallpapers\", \"description\": \"Allow member to view the available wallpapers\" }\r\n      ],\r\n      \"class\": \"QoPreferences\",\r\n      \"file\": \"qwiki/preferences/server/QoPreferences.php\"\r\n   }\r\n}', 1);
INSERT INTO `qo_modules` VALUES ('qo-profile', 'user/profile', 'Profile', 'Allows user profile administration', '{\r\n   \"id\": \"qo-profile\",\r\n\r\n   \"type\": \"user/profile\",\r\n\r\n   \"about\": {\r\n      \"author\": \"Todd Murdock\",\r\n      \"description\": \"Allows user profile administration\",\r\n      \"name\": \"Profile\",\r\n      \"url\": \"www.qwikioffice.com\",\r\n      \"version\": \"1.0\"\r\n   },\r\n\r\n    \"dependencies\": [\r\n      { \"id\": \"statusbar\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"locale\": {\r\n      \"class\": \"QoDesk.QoProfile.Locale\",\r\n      \"directory\": \"qwiki/profile/client/locale/\",\r\n      \"extension\": \".json\",\r\n      \"languages\": [ \"en\" ]\r\n   },\r\n\r\n   \"client\": {\r\n      \"class\": \"QoDesk.QoProfile\",\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"qwiki/profile/client/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"qwiki/profile/client/\",\r\n            \"files\": [ \"QoProfile.js\" ]\r\n         }\r\n      ],\r\n      \"launcher\": {\r\n         \"config\": {\r\n            \"iconCls\": \"qo-profile-icon\",\r\n            \"shortcutIconCls\": \"qo-profile-shortcut-icon\",\r\n            \"text\": \"Profile\",\r\n            \"tooltip\": \"<b>Profile</b><br />Allows user profile administration\"\r\n         },\r\n         \"paths\": {\r\n            \"contextmenu\": \"/\",\r\n            \"startmenutool\": \"/\"\r\n         }\r\n      }\r\n   },\r\n\r\n   \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"loadProfile\", \"description\": \"Load a users profile\" },\r\n         { \"name\": \"saveProfile\", \"description\": \"Save a members profile\" },\r\n         { \"name\": \"savePwd\", \"description\": \"Save a members password\" }\r\n      ],\r\n      \"class\": \"QoProfile\",\r\n      \"file\": \"qwiki/profile/server/QoProfile.php\"\r\n   }\r\n}', 1);

-- ----------------------------
-- Table structure for qo_preferences
-- ----------------------------
DROP TABLE IF EXISTS `qo_preferences`;
CREATE TABLE `qo_preferences`  (
  `qo_groups_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `qo_members_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL COMMENT 'JSON data',
  PRIMARY KEY (`qo_members_id`, `qo_groups_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_preferences
-- ----------------------------
INSERT INTO `qo_preferences` VALUES (0, 0, '{\"appearance\":{\"fontColor\": \"333333\",\"themeId\":1,\"taskbarTransparency\":\"100\"},\"background\":{\"color\": \"f9f9f9\",\"wallpaperId\":11,\"wallpaperPosition\":\"center\"},\"launchers\":{\"autorun\":[\"operativos\"],\"quickstart\": [\"operativos\"],\"shortcut\":[\"operativos\"]}}');
INSERT INTO `qo_preferences` VALUES (1, 1, '{\"appearance\":{\"fontColor\":\"F2DFDF\",\"themeId\":1,\"taskbarTransparency\":100},\"background\":{\"color\":\"f9f9f9\",\"wallpaperId\":11,\"wallpaperPosition\":\"center\"},\"launchers\":{\"shortcut\":[\"demo-accordion\",\"demo-tab\",\"demo-bogus\",\"veris\",\"tienda\",\"mapa\",\"ofertalaboral\",\"contenidos\",\"historia\",\"imageadmin\",\"denuncias-secretaria\",\"denuncias\",\"denuncias-inspeccion\",\"denuncias-crecretaria\",\"denunciassecretaria\",\"denunciasinspeccion\",\"denunciasweb\",\"inspeccion\",\"operativos\",\"personal\",\"moduloInspeccion\",\"instruccion\",\"planificacion\",\"planificacionmicro\",\"contribuciones\",\"mantenimiento\"],\"quickstart\":[\"demo-tab\",\"mapa\",\"contenidos\",\"denuncias-secretaria\",\"denunciassecretaria\",\"denuncias\",\"denunciasinspeccion\",\"denunciasweb\",\"inspeccion\",\"instruccion\",\"mantenimiento\",\"contribuciones\",\"planificacion\"],\"autorun\":[\"denuncias-inspeccion\",\"denuncias\",\"mantenimiento\"]}}');
INSERT INTO `qo_preferences` VALUES (1, 2, '{\"launchers\":{\"autorun\":[\"qo-preferences\",\"ofertalaboral\"],\"quickstart\":[\"ofertalaboral\",\"quitoconnect\"],\"shortcut\":[\"kiiconnect\",\"samsung\",\"canal\",\"programa\",\"quitoconnect\",\"denunciasweb\",\"denuncias\",\"operativos\",\"luae\",\"personal\"]}}');
INSERT INTO `qo_preferences` VALUES (15, 2, '{\"launchers\":{\"autorun\":[],\"shortcut\":[\"operativos\",\"denuncias\",\"denunciasweb\",\"luae\",\"mantenimiento\",\"personal\",\"moduloInspeccion\",\"qo-admin\"]}}');
INSERT INTO `qo_preferences` VALUES (2, 3, '{\"launchers\":{\"quickstart\":[\"enfapromo\",\"samsung\"],\"shortcut\":[\"enfapromo\",\"samsung\"]}}');
INSERT INTO `qo_preferences` VALUES (2, 4, '{\"launchers\":{\"shortcut\":[\"demo-accordion\",\"demo-grid\",\"demo-layout\",\"demo-bogus\",\"demo-tab\",\"denuncias-crecretaria\",\"denuncias\",\"denunciasweb\"],\"quickstart\":[\"denuncias-crecretaria\",\"denuncias\",\"denunciasweb\"],\"autorun\":[\"denunciasweb\"]}}');
INSERT INTO `qo_preferences` VALUES (3, 4, '{\"launchers\":{\"shortcut\":[\"demo-accordion\",\"demo-grid\",\"demo-layout\",\"demo-bogus\",\"demo-tab\",\"kiiconnect\"],\"quickstart\":[\"kiiconnect\"],\"autorun\":[\"denunciasweb\",\"denuncias\"]}}');
INSERT INTO `qo_preferences` VALUES (3, 5, '{\"launchers\":{\"shortcut\":[\"demo-accordion\",\"demo-grid\",\"demo-layout\",\"demo-bogus\",\"demo-tab\",\"kiiconnect\",\"denuncias-inspeccion\",\"denunciasinspeccion\",\"moduloInspeccion\"],\"quickstart\":[\"kiiconnect\",\"denuncias\",\"moduloInspeccion\"],\"autorun\":[\"denunciasinspeccion\",\"denuncias\"]}}');
INSERT INTO `qo_preferences` VALUES (2, 6, '{\"launchers\":{\"shortcut\":[\"operativos\",\"denuncias\",\"denunciasweb\",\"moduloInspeccion\"],\"autorun\":[\"operativos\",\"denunciasweb\"],\"quickstart\":[\"denunciasweb\",\"denuncias\",\"moduloInspeccion\"]}}');
INSERT INTO `qo_preferences` VALUES (4, 6, '{\"launchers\":{\"autorun\":[\"denuncias\"],\"shortcut\":[\"denuncias\"],\"quickstart\":[\"denuncias\"]}}');
INSERT INTO `qo_preferences` VALUES (3, 7, '{\"launchers\":{\"autorun\":[\"denuncias\"],\"shortcut\":[\"demo-accordion\",\"demo-grid\",\"demo-layout\",\"demo-bogus\",\"demo-tab\",\"denuncias\",\"moduloInspeccion\",\"operativos\"],\"quickstart\":[\"denuncias\",\"moduloInspeccion\"]},\"appearance\":{\"fontColor\":\"333333\",\"themeId\":2,\"taskbarTransparency\":100}}');
INSERT INTO `qo_preferences` VALUES (25, 7, '{\"launchers\":{\"shortcut\":[\"operativos\",\"moduloInspeccion\"],\"quickstart\":[\"operativos\",\"moduloInspeccion\"]}}');

-- ----------------------------
-- Table structure for qo_privileges
-- ----------------------------
DROP TABLE IF EXISTS `qo_privileges`;
CREATE TABLE `qo_privileges`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_privileges
-- ----------------------------
INSERT INTO `qo_privileges` VALUES (1, 'System Administrator', 'System administrator privileges.  Full access.', '{\"contribuciones\":[\"accesosSecretaria\"],\"mantenimiento\":[],\"planificacion\":[\"accesosAdministrador\"],\"planificacionmicro\":[],\"qo-admin\":[\"addGroup\",\"addMember\",\"addPrivilege\",\"approveSignupsToGroup\",\"deleteGroup\",\"deleteMember\",\"deletePrivilege\",\"denySignups\",\"editGroup\",\"editGroupPrivilege\",\"editMember\",\"editMembersGroups\",\"editPrivilege\",\"editPrivilegeModules\",\"viewGroups\",\"viewGroupPrivileges\",\"viewMembers\",\"viewMemberGroups\",\"viewPrivileges\",\"viewPrivilegeModules\",\"viewSignups\"],\"qo-preferences\":[\"saveAppearance\",\"saveAutorun\",\"saveBackground\",\"saveQuickstart\",\"saveShortcut\",\"viewThemes\",\"viewWallpapers\"],\"qo-profile\":[\"loadProfile\",\"saveProfile\",\"savePwd\"]}', 1);
INSERT INTO `qo_privileges` VALUES (2, 'Administrador Secretaria General', 'Interfaces Administrador  Secretaria General', '{\"denuncias\":[\"accesosAdministrador\",\"accesosSecretaria\"],\"denunciasweb\":[\"grabarDenuncia\"],\"moduloInspeccion\":[],\"personalmapa\":[],\"qo-preferences\":[\"saveAppearance\",\"saveAutorun\",\"saveBackground\",\"saveQuickstart\",\"saveShortcut\",\"viewThemes\",\"viewWallpapers\"],\"qo-profile\":[\"loadProfile\",\"savePwd\"]}', 1);
INSERT INTO `qo_privileges` VALUES (3, 'Secretaria General', 'Interface usuario Secretaria General', '{\"denuncias\":[\"accesosSecretaria\"],\"denunciasweb\":[],\"moduloInspeccion\":[\"accesosSupervision\"],\"operativos\":[\"accesosOperativos\"],\"qo-preferences\":[\"saveAppearance\",\"saveAutorun\",\"saveBackground\",\"saveQuickstart\",\"saveShortcut\",\"viewThemes\",\"viewWallpapers\"],\"qo-profile\":[\"loadProfile\",\"savePwd\"]}', 1);
INSERT INTO `qo_privileges` VALUES (4, 'Zonales', 'Usuarios  Zonales - Secretaria General', '{\"denuncias\":[\"accesosZonales\"],\"qo-preferences\":[\"saveAppearance\",\"saveAutorun\",\"saveBackground\",\"saveQuickstart\",\"saveShortcut\",\"viewThemes\",\"viewWallpapers\"],\"qo-profile\":[\"loadProfile\",\"savePwd\"]}', 1);

-- ----------------------------
-- Table structure for qo_sessions
-- ----------------------------
DROP TABLE IF EXISTS `qo_sessions`;
CREATE TABLE `qo_sessions`  (
  `id` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '' COMMENT 'a randomly generated id',
  `qo_members_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `qo_groups_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT 'Group the member signed in under',
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `ip` varchar(16) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `qo_members_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_sessions
-- ----------------------------
INSERT INTO `qo_sessions` VALUES ('0b588fc3ed5fe14a100b407cbc71b147', 1, 1, '{\"module\":{}}', '200.93.229.76', '2019-08-21 16:04:20');
INSERT INTO `qo_sessions` VALUES ('0da7a76d55994b6742bad0f779fb1735', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-06 11:36:06');
INSERT INTO `qo_sessions` VALUES ('1752fc89db45b92b3482f55d038ebc6b', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-22 21:35:07');
INSERT INTO `qo_sessions` VALUES ('1b0d861b89f92a090c8841145fe434c3', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-13 19:22:32');
INSERT INTO `qo_sessions` VALUES ('2182f770c222b1aeaee26577d5bb9f77', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-09 12:10:03');
INSERT INTO `qo_sessions` VALUES ('21b45b0031c46b0e5cf65bfb92a9b1c9', 1, 1, '{\"module\":{}}', '200.93.229.76', '2019-08-15 18:33:19');
INSERT INTO `qo_sessions` VALUES ('2a6ca4e33ef4fcf2d8e557bb4f4761ad', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-01 17:49:08');
INSERT INTO `qo_sessions` VALUES ('2e3a92c454f09e22ea995a51ec9726f2', 1, 1, NULL, '127.0.0.1', '2019-06-11 19:23:39');
INSERT INTO `qo_sessions` VALUES ('345f38c630451afdd840f1da1e556c9b', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-12 18:34:23');
INSERT INTO `qo_sessions` VALUES ('396153a99d4a86ae2bc9dcc0f2345e47', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-10 20:05:03');
INSERT INTO `qo_sessions` VALUES ('3c1125cae3892b479a0ea2bc37960132', 1, 1, NULL, '127.0.0.1', '2019-06-11 19:23:33');
INSERT INTO `qo_sessions` VALUES ('4ae57b03b4b6a7b270b3426cb5dfca50', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-20 23:20:44');
INSERT INTO `qo_sessions` VALUES ('5024507b4d9bf5ba00616cd131537e05', 1, 1, NULL, '127.0.0.1', '2019-09-08 21:48:26');
INSERT INTO `qo_sessions` VALUES ('532214687ae48c68dcd54b8169253ebc', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-21 13:57:25');
INSERT INTO `qo_sessions` VALUES ('57ea772e6275a65889cab8349f707f96', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-08-28 01:33:29');
INSERT INTO `qo_sessions` VALUES ('5ea9677eb3d3803726582c68b7aad9a9', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-07 05:57:23');
INSERT INTO `qo_sessions` VALUES ('68e2b8f590b9fcdc27b99a517e0e3731', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-22 21:50:18');
INSERT INTO `qo_sessions` VALUES ('6a1957a3cd380ee6d7b2b7ae484121fd', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-08-26 18:04:38');
INSERT INTO `qo_sessions` VALUES ('6b950e4e3d500b44629f9402da61b58e', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-01 20:08:29');
INSERT INTO `qo_sessions` VALUES ('6e14b0d4dd09aeaec00f8841f55bc191', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-09 10:13:36');
INSERT INTO `qo_sessions` VALUES ('7f1e41e4e1f3abd36658307eb4b9cafa', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-07 21:50:37');
INSERT INTO `qo_sessions` VALUES ('85cd5bc5e4cb49d4e9913b31880f8d8b', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-08-27 16:21:03');
INSERT INTO `qo_sessions` VALUES ('8a485370a7fd24fe15b8bd8ac15ff2c7', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-18 22:08:22');
INSERT INTO `qo_sessions` VALUES ('964500288675d870d6a9897fa1df7c02', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-18 22:49:56');
INSERT INTO `qo_sessions` VALUES ('984bea2ad29cbf541a7042d9668ea3f9', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-04 23:49:50');
INSERT INTO `qo_sessions` VALUES ('9b0f725ee1a59f05ce520b6c9417c834', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-10 22:01:37');
INSERT INTO `qo_sessions` VALUES ('9bb30b233be194928cc60d57074423c8', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-14 19:15:37');
INSERT INTO `qo_sessions` VALUES ('9fff09f6afcbcc108ac110a42acca97c', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-14 01:56:13');
INSERT INTO `qo_sessions` VALUES ('a099768f08005564e140cf2b81c4ff96', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-08-26 14:53:48');
INSERT INTO `qo_sessions` VALUES ('a6636ffd89bc6228d8e19e02bf3253f1', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-20 23:21:17');
INSERT INTO `qo_sessions` VALUES ('aa9be16511153e19fe9febdb5279e88a', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-18 01:01:49');
INSERT INTO `qo_sessions` VALUES ('afd40ab7c440452da5e47dcf28478721', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-04 21:56:42');
INSERT INTO `qo_sessions` VALUES ('b4b56d2dbf07aa58c0cc1dfce884c8c7', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-07 22:09:08');
INSERT INTO `qo_sessions` VALUES ('b599a5d385c1154ce14beee4756fe62a', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-05 15:02:19');
INSERT INTO `qo_sessions` VALUES ('b7c3c59aaf4c8f71dfaaec8cc3ef336d', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-15 16:45:21');
INSERT INTO `qo_sessions` VALUES ('b9c062dacc7dab5d6d430ada161444fc', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-11 19:57:31');
INSERT INTO `qo_sessions` VALUES ('bac1cb0b80c0610da20021b3b3be0603', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-12 19:44:29');
INSERT INTO `qo_sessions` VALUES ('be003fe99b1ad65e59421286a41b2d0e', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-01 17:57:14');
INSERT INTO `qo_sessions` VALUES ('bec14cec236e9ad5017b330386bfcd3d', 1, 1, '{\"module\":{}}', '186.46.207.61', '2019-08-22 14:48:53');
INSERT INTO `qo_sessions` VALUES ('bf4e2d9ce773038581c6848a5f99c3ba', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-05 04:02:13');
INSERT INTO `qo_sessions` VALUES ('c7642ecc189ac5757b10441a4c5c4a6e', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-16 16:59:57');
INSERT INTO `qo_sessions` VALUES ('c7a7b6f7b1d080190628b7d681070c4b', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-08-22 15:29:06');
INSERT INTO `qo_sessions` VALUES ('cce799d3861cbe016e725a48355e9d8d', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-25 19:17:53');
INSERT INTO `qo_sessions` VALUES ('cd78e2012aef743aae59d83f27ec5a2a', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-22 18:49:40');
INSERT INTO `qo_sessions` VALUES ('d19946ab735e38b81eb1cf1642b33198', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-08 01:15:53');
INSERT INTO `qo_sessions` VALUES ('d87d7d7abfd961f953fe9444415973a5', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-17 17:29:55');
INSERT INTO `qo_sessions` VALUES ('d9938cde320be6cb38ee50d359333a31', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-15 01:49:51');
INSERT INTO `qo_sessions` VALUES ('d9f4c815dd3eafd76a6e51d1182d5090', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-21 00:15:41');
INSERT INTO `qo_sessions` VALUES ('dbada837f1c3241ec8e84a66270c5177', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-16 01:41:14');
INSERT INTO `qo_sessions` VALUES ('dda30cd12cda9e501f0adead73dfeb46', 1, 1, '{\"module\":{}}', '186.46.204.1', '2019-08-21 01:08:00');
INSERT INTO `qo_sessions` VALUES ('e16fa7404922a7df3d0a81b66b66d409', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-02 03:54:22');
INSERT INTO `qo_sessions` VALUES ('e26bbf01bbbdf7b2760d2ee555229b6f', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-09-03 03:21:34');
INSERT INTO `qo_sessions` VALUES ('e612d6db994a877d555954b0836c496d', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-05 17:47:48');
INSERT INTO `qo_sessions` VALUES ('e62e46e5e678ec5076ef74e7345f5a97', 1, 1, '{\"module\":{}}', '186.71.238.70', '2019-08-01 01:34:56');
INSERT INTO `qo_sessions` VALUES ('e89cd69d3186f4dd174934dca842a350', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-08-14 22:59:58');
INSERT INTO `qo_sessions` VALUES ('ed1f1c0d629145cba3f4967047d832c7', 1, 1, '{\"module\":{}}', '186.71.250.52', '2019-07-30 01:46:02');
INSERT INTO `qo_sessions` VALUES ('f3fa48f2efdb87d9d15fec3136419b33', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-08-27 16:40:05');
INSERT INTO `qo_sessions` VALUES ('fa81a30f5c4d368e92371ef43805e157', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-18 23:06:49');
INSERT INTO `qo_sessions` VALUES ('fce1f6cab117e7b32c588016cc12774c', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-11 19:23:21');

-- ----------------------------
-- Table structure for qo_signup_requests
-- ----------------------------
DROP TABLE IF EXISTS `qo_signup_requests`;
CREATE TABLE `qo_signup_requests`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `last_name` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `email_address` varchar(55) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `comments` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for qo_spam
-- ----------------------------
DROP TABLE IF EXISTS `qo_spam`;
CREATE TABLE `qo_spam`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email_address` varchar(55) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for qo_themes
-- ----------------------------
DROP TABLE IF EXISTS `qo_themes`;
CREATE TABLE `qo_themes`  (
  `id` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_themes
-- ----------------------------
INSERT INTO `qo_themes` VALUES ('1', '{\r\n   \"about\": {\r\n      \"author\": \"Ext JS\",\r\n      \"version\": \"1.0\",\r\n      \"url\": \"www.extjs.com\"\r\n   },\r\n   \"group\": \"Ext JS\",\r\n   \"name\": \"Blue\",\r\n   \"thumbnail\": \"images/xtheme-blue.gif\",\r\n   \"file\": \"css/xtheme-blue.css\",\r\n   \"url\": \"http://extjs.cachefly.net/ext-3.2.1/resources/css/xtheme-blue.css\"\r\n}', 1);
INSERT INTO `qo_themes` VALUES ('2', '{\r\n   \"about\": {\r\n      \"author\": \"Ext JS\",\r\n      \"version\": \"1.0\",\r\n      \"url\": \"www.extjs.com\"\r\n   },\r\n   \"group\": \"Ext JS\",\r\n   \"name\": \"Gray\",\r\n   \"thumbnail\": \"images/xtheme-gray.gif\",\r\n   \"file\": \"css/xtheme-gray.css\",\r\n   \"url\": \"http://extjs.cachefly.net/ext-3.2.1/resources/css/xtheme-gray.css\"\r\n}', 1);
INSERT INTO `qo_themes` VALUES ('3', '{\r\n   \"about\": {\r\n      \"author\": \"Ext JS\",\r\n      \"version\": \"1.0\",\r\n      \"url\": \"www.extjs.com\"\r\n   },\r\n   \"group\": \"Ext JS\",\r\n   \"name\": \"Access\",\r\n   \"thumbnail\": \"images/xtheme-access.gif\",\r\n   \"file\": \"css/xtheme-access.css\",\r\n   \"url\": \"http://extjs.cachefly.net/ext-3.2.1/resources/css/xtheme-access.css\"\r\n}', 1);
INSERT INTO `qo_themes` VALUES ('4', '{\r\n   \"about\": {\r\n      \"author\": \"Ext JS User\",\r\n      \"version\": \"1.0\",\r\n      \"url\": \"www.extjs.com\"\r\n   },\r\n   \"group\": \"Ext JS\",\r\n   \"name\": \"Slate\",\r\n   \"thumbnail\": \"images/xtheme-slate.gif\",\r\n   \"file\": \"css/xtheme-slate.css\"\r\n}', 0);

-- ----------------------------
-- Table structure for qo_wallpapers
-- ----------------------------
DROP TABLE IF EXISTS `qo_wallpapers`;
CREATE TABLE `qo_wallpapers`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qo_wallpapers
-- ----------------------------
INSERT INTO `qo_wallpapers` VALUES (1, '{\r\n   \"group\": \"Blank\",\r\n   \"name\": \"Blank\",\r\n   \"thumbnail\": \"thumbnails/blank.gif\",\r\n   \"file\": \"blank.gif\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (2, '{\r\n   \"group\": \"Pattern\",\r\n   \"name\": \"Blue Psychedelic\",\r\n   \"thumbnail\": \"thumbnails/blue-psychedelic.jpg\",\r\n   \"file\": \"blue-psychedelic.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (3, '{\r\n   \"group\": \"Pattern\",\r\n   \"name\": \"Blue Swirl\",\r\n   \"thumbnail\": \"thumbnails/blue-swirl.jpg\",\r\n   \"file\": \"blue-swirl.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (4, '{\r\n   \"group\": \"Nature\",\r\n   \"name\": \"Colorado Farm\",\r\n   \"thumbnail\": \"thumbnails/colorado-farm.jpg\",\r\n   \"file\": \"colorado-farm.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (5, '{\r\n   \"group\": \"Nature\",\r\n   \"name\": \"Curls On Green\",\r\n   \"thumbnail\": \"thumbnails/curls-on-green.jpg\",\r\n   \"file\": \"curls-on-green.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (6, '{\r\n   \"group\": \"Pattern\",\r\n   \"name\": \"Emotion\",\r\n   \"thumbnail\": \"thumbnails/emotion.jpg\",\r\n   \"file\": \"emotion.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (7, '{\r\n   \"group\": \"Pattern\",\r\n   \"name\": \"Eos\",\r\n   \"thumbnail\": \"thumbnails/eos.jpg\",\r\n   \"file\": \"eos.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (8, '{\r\n   \"group\": \"Nature\",\r\n   \"name\": \"Fields of Peace\",\r\n   \"thumbnail\": \"thumbnails/fields-of-peace.jpg\",\r\n   \"file\": \"fields-of-peace.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (9, '{\r\n   \"group\": \"Nature\",\r\n   \"name\": \"Fresh Morning\",\r\n   \"thumbnail\": \"thumbnails/fresh-morning.jpg\",\r\n   \"file\": \"fresh-morning.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (10, '{\r\n   \"group\": \"Nature\",\r\n   \"name\": \"Lady Buggin\",\r\n   \"thumbnail\": \"thumbnails/ladybuggin.jpg\",\r\n   \"file\": \"ladybuggin.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (11, '{\r\n   \"group\": \"qWikiOffice\",\r\n   \"name\": \"qWikiOffice\",\r\n   \"thumbnail\": \"thumbnails/qwikioffice.jpg\",\r\n   \"file\": \"qwikioffice.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (12, '{\r\n   \"group\": \"Nature\",\r\n   \"name\": \"Summer\",\r\n   \"thumbnail\": \"thumbnails/summer.jpg\",\r\n   \"file\": \"summer.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (13, '{\r\n   \"group\": \"Pattern\",\r\n   \"name\": \"Emotion Pattern\",\r\n   \"thumbnail\": \"thumbnails/emotion-pattern.jpg\",\r\n   \"file\": \"emotion-pattern.jpg\"\r\n}', 1);
INSERT INTO `qo_wallpapers` VALUES (14, '{\r\n   \"group\": \"Pattern\",\r\n   \"name\": \"Pattern Red\",\r\n   \"thumbnail\": \"thumbnails/pattern-red.gif\",\r\n   \"file\": \"pattern-red.gif\"\r\n}', 1);

SET FOREIGN_KEY_CHECKS = 1;
