/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50716
 Source Host           : localhost:3306
 Source Schema         : pma-desarrollo

 Target Server Type    : MySQL
 Target Server Version : 50716
 File Encoding         : 65001

 Date: 01/07/2019 18:13:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pma_activities
-- ----------------------------
DROP TABLE IF EXISTS `pma_activities`;
CREATE TABLE `pma_activities`  (
  `id` int(11) NOT NULL,
  `id_cost_category` int(11) NULL DEFAULT NULL,
  `id_cost_subcategory` int(11) NULL DEFAULT NULL,
  `subcategory_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `subcategory_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_activities
-- ----------------------------
INSERT INTO `pma_activities` VALUES (1, 1, 1, 'Activity 1', 'EC01.01.011.URT1');
INSERT INTO `pma_activities` VALUES (2, 1, 2, 'Activity 3', 'EC01.03.021.SMS1');
INSERT INTO `pma_activities` VALUES (3, 1, 3, 'Activity 4', 'EC01.03.021.SMS2');
INSERT INTO `pma_activities` VALUES (4, 1, 4, 'Activity 5', 'EC01.04.031.CAR1');
INSERT INTO `pma_activities` VALUES (5, 1, 5, 'Activity 6', 'EC01.04.031.CAR2');
INSERT INTO `pma_activities` VALUES (6, 1, 6, 'Activity 7', 'EC01.05.041.CSI1');
INSERT INTO `pma_activities` VALUES (7, 1, 7, 'Activity 8', 'EC01.05.041.CSI2');

-- ----------------------------
-- Table structure for pma_contribuciones
-- ----------------------------
DROP TABLE IF EXISTS `pma_contribuciones`;
CREATE TABLE `pma_contribuciones`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_contribucion` int(11) NULL DEFAULT NULL,
  `grant_number` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `estado` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `crn` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `donor` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `comments` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `year_contribution` int(4) NULL DEFAULT NULL,
  `isc` decimal(20, 0) NOT NULL DEFAULT 0,
  `total_grant` decimal(20, 0) NOT NULL DEFAULT 0,
  `grant_tod` date NULL DEFAULT NULL,
  `grant_tdd` date NULL DEFAULT NULL,
  `grant_specific` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `activity` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `recepcion_documento` datetime(0) NULL DEFAULT NULL,
  `creado` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Registro de contribuciones' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_contribuciones
-- ----------------------------
INSERT INTO `pma_contribuciones` VALUES (1, NULL, '10029912', 'Cerrada', 'USA-C-01102-05', 'FFP', 'Saldo USA 2016', 2017, 0, 311678, '2018-04-30', '2018-04-30', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (2, NULL, '10029894', 'Cerrada', 'USA-C-01102-04', 'FFP', 'Contribución 2017', 2017, 117757, 1682243, '2018-04-30', '2018-04-30', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (3, NULL, '10032605', 'Cerrada', 'USA-C-01479-01', 'FFP', 'Contribución 2018', 2018, 122066, 1877934, '2018-04-27', '2018-12-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (4, NULL, '10033899', 'Vigente', 'USA-C-01535-01', 'FFP', 'Contribución 2018', 2018, 366197, 5633803, NULL, '2019-09-30', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (5, NULL, '30004294', 'Vigente', 'IPL EC01 2019_04_04', 'FFP', 'AF 2019', 2019, 183099, 2816901, '2019-04-04', '2020-03-01', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (6, NULL, '10035028', 'Vigente', 'USA-C-01619-01', 'FFP', 'Saldo 7 millones', 2019, 427230, 6572770, '2020-02-28', '2020-02-28', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (7, NULL, '70000403', 'Cerrada', '001-C-01829 -01', 'CERF', 'Contribución 2018', 2018, 32714, 503288, '2019-03-26', '2019-03-26', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (8, NULL, '70000374', 'Vigente', 'DEN-C-00220-01', 'Denmark', 'Gender', 2018, 0, 361916, '2019-12-31', '2019-12-31', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (9, NULL, '70000375', 'Vigente', 'DEN-C-00220-02', 'Denmark', 'Gender', 2019, 0, 368474, '2019-12-31', '2019-12-31', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (10, NULL, '10034321', 'Cerrada', 'GER-C-00825-01', 'Germany', NULL, 2018, 69356, 1068222, '2018-12-31', '2019-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (11, NULL, '10035334', 'Vigente', 'CAN-C-00572-08', 'Canada', NULL, 2019, 23189, 356750, '2020-03-31', '2020-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (12, NULL, NULL, 'Cerrada', 'KOR-C-00128-06', 'KOR MOFA*', 'Korea I (PRRO)', NULL, 0, 162870, '2019-09-30', '2019-09-30', 'No', 'PRRO', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (13, NULL, '10029899', 'Vigente', 'KOR-C-00128-06', 'KOR MOFA', 'Korea I (saldo PRRO)', 2017, 50486, 721223, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (14, NULL, '10029744', 'Vigente', 'KOR-C-00128-04', 'KOR MOFA', 'Korea II (1 millón)', 2017, 65421, 559056, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (15, NULL, '10029744', 'Vigente', 'KOR-C-00128-04', 'KOR MOFA', 'Korea II (1 millón)', 2017, 0, 375523, '2019-09-30', '2019-09-30', 'No', 'Activity 4', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (16, NULL, '10029747', 'Vigente', 'KOR-C-00128-05', 'KOR MOFA', 'Korea III (1 millón)', 2017, 65421, 713001, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (17, NULL, '10029747', 'Vigente', 'KOR-C-00128-05', 'KOR MOFA', 'Korea III (1 millón)', 2017, 0, 221578, '2019-09-30', '2019-09-30', 'No', 'Activity 4', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (18, NULL, '10030661', 'Cerrada', 'WPD-C-03321-02', 'Private donors', 'McKnight ', 2017, 3745, 37452, '2019-08-31', '2019-11-30', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (19, NULL, '70000012', 'Vigente', 'WPD-C-03871-02', 'Private donors', 'McKnight', 2017, 14997, 90908, '2019-08-31', '2019-11-30', 'Yes', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (20, NULL, '70000012', 'Vigente', 'WPD-C-03871-02', 'Private donors', 'McKnight', 2017, 0, 59060, '2019-08-31', '2019-11-30', 'Yes', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (21, NULL, '10029859', 'Cerrada', 'WPD-C-03290-02', 'Private donors', 'Saldo YUM ', 2017, 5231, 121157, NULL, NULL, NULL, 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (22, NULL, '70000011', 'Pendiente', '001-C-01539-02', 'UN Adaptation Fund', 'FORECCSA', 2017, 66847, 119173, '2018-05-29', '2018-05-29', 'Yes', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (23, NULL, '70000011', 'Pendiente', '001-C-01539-02', 'UN Adaptation Fund', 'FORECCSA', 2017, 0, 1551997, '2018-05-29', '2018-05-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (24, NULL, '70000065', 'Pendiente', '001-C-01023-02', 'UN Adaptation Fund', 'FORECCSA', 2017, 21825, 86009, '2018-05-29', '2018-05-29', 'Yes', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (25, NULL, '70000065', 'Pendiente', '001-C-01023-02', 'UN Adaptation Fund', 'FORECCSA', 2017, 0, 459606, '2018-05-29', '2018-05-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (26, NULL, '30003782', 'Cerrada', 'IRA ECCO EPR EC01', 'IRA AF', 'Venezolanos', 2017, 0, 93451, '2018-02-15', '2018-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (27, NULL, '10020984', 'Vigente', 'NET-C-00102-02', 'SRAC', 'SRAC NET ', 2017, 3438, 45846, '0000-00-00', '0000-00-00', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (28, NULL, '10031132', 'Cerrada', 'UK-C00369-05', 'SRAC', 'UK DFID', 2017, 50374, 1196000, '2018-05-31', '2018-07-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (29, NULL, '10031132', 'Cerrada', 'UK-C00369-05', 'SRAC', 'UK DFID Cambio grant', 2017, 0, 24000, '2018-05-31', '2018-07-31', 'No', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (30, NULL, '10032250', 'Cerrada', 'NET-C-00140-02', 'SRAC', 'NET MOFA', 2017, 30516, 500000, '2018-12-31', '2018-12-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (31, NULL, '10032701', 'Vigente', 'SWE-C-00299-09', 'SRAC', 'SWEDEN Cambio grant', 2018, 18310, 54000, '0000-00-00', '0000-00-00', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (32, NULL, '10032701', 'Vigente', 'SWE-C-00299-09', 'SRAC', 'SWEDEN Cambio grant', 2018, 0, 246000, '0000-00-00', '0000-00-00', 'No', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (33, NULL, '10033562', 'Vigente', 'UK -C-00369-06', 'SRAC', 'UK DFID', 2018, 122066, 1040000, '2019-05-31', '2019-07-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (34, NULL, '70000144', 'Vigente', '001-C-01692-01', 'UN Adaptation Fund', 'Binacional 2018', 2018, 30155, 753866, '2017-11-29', '2022-11-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (35, NULL, '70000590', 'Vigente', '001-C-01692-04', 'UN Adaptation Fund', 'Binacional 2019', 2019, 239076, 5976903, '2018-01-01', '2022-11-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (37, NULL, '10032899', 'Cerrada', 'WPD-C-04534-01', 'Private donors', 'KFC', 2018, 5448, 77824, '2019-03-29', '2019-06-29', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (38, NULL, 'No relevant ', 'Vigente', NULL, 'Other', 'IVA PRRO ', 2017, 0, 114194, '0000-00-00', '0000-00-00', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (39, NULL, 'No relevant ', 'Vigente', NULL, 'Other', 'IVA PRRO ', 2017, 0, 114194, '0000-00-00', '0000-00-00', 'No', 'Activity 8', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (40, NULL, 'No relevant ', 'Vigente', NULL, 'Other', 'IVA ', 2017, 0, 180059, '0000-00-00', '0000-00-00', 'No', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (41, NULL, 'Por asignar', 'Vigente', NULL, 'Other', 'IVA ', 2017, 0, 299857, '0000-00-00', '0000-00-00', 'No', 'Por asignar', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (42, NULL, 'Por asignar', 'Vigente', NULL, 'Other', 'IVA', 2018, 0, 79677, '0000-00-00', '0000-00-00', 'No', 'Por asignar', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (43, NULL, 'Por asignar', 'Vigente', NULL, 'Other', 'GGCC', 2018, 0, 470471, '0000-00-00', '0000-00-00', 'No', 'Por asignar', NULL, '2019-06-17 07:55:41');

-- ----------------------------
-- Table structure for pma_contribuciones_detalle
-- ----------------------------
DROP TABLE IF EXISTS `pma_contribuciones_detalle`;
CREATE TABLE `pma_contribuciones_detalle`  (
  `id` int(11) NOT NULL,
  `id_pma_contribuciones_detalle` int(11) NULL DEFAULT NULL,
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
  `year` int(10) NULL DEFAULT NULL,
  `id_cost` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_contribuciones_detalle
-- ----------------------------
INSERT INTO `pma_contribuciones_detalle` VALUES (1, 1, 1001, 1002, 1003, 1004, 10051, 1, 0, 0, 0, 0, 0, 0, 2019, NULL);

-- ----------------------------
-- Table structure for pma_cost_category
-- ----------------------------
DROP TABLE IF EXISTS `pma_cost_category`;
CREATE TABLE `pma_cost_category`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cost` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `parent` int(10) NULL DEFAULT NULL,
  `active` int(2) NULL DEFAULT NULL,
  `create` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `typecost` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pma_cost_category
-- ----------------------------
INSERT INTO `pma_cost_category` VALUES (1, 'Transfer - Food', 'F', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (2, 'Food', 'FA', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (3, 'Other Food-Related Costs', 'FB', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (4, 'External Transport', 'FC', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (5, 'In-Country Transport', 'FD', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (6, 'Overland Transport', 'FE', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (7, 'In-Country Storage', 'FF', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (8, 'Overland Storage', 'FG', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (9, 'In-Country Port', 'FH', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (10, 'Overland Port', 'FI', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (11, 'In-Country Supply Chain Management Costs', 'FJ', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (12, 'Overland - Supply Chain Management Costs ', 'FK', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (13, 'Cooperating Partner Costs', 'FL', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (14, 'Cargo preference ', 'FM', 1, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (15, 'Transfer - CBT & Commodity Voucher', 'C  ', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (16, 'CBT & Commodity Voucher', 'CA', 15, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (17, 'Delivery costs', 'CB', 15, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (18, 'CBT and Commodity Voucher Management cost', 'CC', 15, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (19, 'Cooperating Partner Costs', 'CD', 15, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (20, 'Transfer - Capacity Strengthening', 'S', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (21, 'Capacity Strengthening', 'SA', 21, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (22, 'Cooperating Partner Costs', 'SB', 21, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (23, 'Transfer - Service Delivery', 'D', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (24, 'Service Delivery', 'DA', 23, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (25, 'Cooperating Partner Costs', 'DB', 23, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (26, 'Implementation', 'I', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (27, 'Activity management costs', 'IA', 26, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (28, 'Beneficiary Relationship Manager', 'IB', 26, NULL, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (29, 'Other Implementation Inputs', 'IC', 26, NULL, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (30, 'Assessments Costs', 'ID', 26, NULL, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (31, 'Evaluation costs', 'IE', 26, NULL, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (32, 'Monitoring costs', 'IF', 26, NULL, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (33, 'DSC', 'A', NULL, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (34, 'DSC', 'AA', 33, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (35, 'Assessments Costs', 'AB', 33, 1, '2019-06-01 00:00:00', NULL);
INSERT INTO `pma_cost_category` VALUES (36, 'Evaluation Costs', 'AC', 33, 1, '2019-06-01 00:00:00', NULL);

-- ----------------------------
-- Table structure for pma_so_categories
-- ----------------------------
DROP TABLE IF EXISTS `pma_so_categories`;
CREATE TABLE `pma_so_categories`  (
  `id` int(11) NOT NULL,
  `id__cost_category` int(11) NULL DEFAULT NULL,
  `category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `category_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `qo_modules` VALUES ('contribuciones', 'desktop/contribuciones', 'Contribuciones', 'Administracion de contribuciones', '{\r\n  \"id\": \"contribuciones\",\r\n  \"type\": \"desktop/contribuciones\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Mantenimiento de Contribuciones.\",\r\n    \"name\": \"Ventana Contribuciones\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosZonales\", \"description\": \"Personal de zonales\" }\r\n\r\n    ],\r\n    \"class\": \"QoContribuciones\",\r\n    \"file\": \"desktop/contribuciones/contribuciones.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.ContribucionesWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/contribuciones/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\", \"Ext.ux.GMapPanel3.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/contribuciones/client/\",\r\n        \"files\": [  \"contribuciones-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"contribuciones-icon\",\r\n        \"shortcutIconCls\": \"contribuciones-shortcut\",\r\n        \"text\": \"Contribuciones\",\r\n        \"tooltip\": \"<b>Ingreso contribuciones</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);
INSERT INTO `qo_modules` VALUES ('denunciasinspeccion', 'desktop/denunciasinspeccion', 'Denuncias- Dirección Inspección', 'Administrador - Denuncias  - Dirección Inspeccion', '{\r\n  \"id\": \"denunciasinspeccion\",\r\n  \"type\": \"desktop/denunciasinspeccion\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Mantenimiento de Denuncias inspeccion.\",\r\n    \"name\": \"Ventana Denuncias inspeccion\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n\r\n  \"client\": {\r\n    \"class\": \"QoDesk.DenunciasinspeccionWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/denunciasinspeccion/client/resources/\",\r\n        \"files\": [ \"styles.css\", \"css/MultiSelect.css\" ]\r\n      },\r\n			{\r\n        \"directory\": \"common/libraries/datetime/\",\r\n        \"files\": [ \"date-time-ux.css\" ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"desktop/denunciasinspeccion/client/\",\r\n        \"files\": [ \"denunciasinspeccion-win.js\",\"MultiSelect.js\" ]\r\n      },\r\n			{\r\n        \"directory\": \"common/libraries/datetime/\",\r\n        \"files\": [ \"date-time-ux.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"denunciasinspeccion-icon\",\r\n        \"shortcutIconCls\": \"denunciasinspeccion-shortcut\",\r\n        \"text\": \"Denuncias Inspeccion\",\r\n        \"tooltip\": \"<b>Denuncias - Direccion inspeccion</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}', 0);
INSERT INTO `qo_modules` VALUES ('denunciassecretaria', 'desktop/denunciassecretaria', 'Denuncias - Secretaria', 'Administrador de denuncias - secretaria general', '{\r\n  \"id\": \"denunciassecretaria\",\r\n  \"type\": \"desktop/denunciassecretaria\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Mantenimiento de Denuncias secretaria.\",\r\n    \"name\": \"Ventana Denuncias secretaria\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n\r\n  \"client\": {\r\n    \"class\": \"QoDesk.DenunciassecretariaWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/denunciassecretaria/client/resources/\",\r\n        \"files\": [ \"styles.css\"]\r\n      },\r\n			{\r\n        \"directory\": \"common/libraries/datetime/\",\r\n        \"files\": [ \"date-time-ux.css\" ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"desktop/denunciassecretaria/client/\",\r\n        \"files\": [  \"denunciassecretaria-win.js\" ]\r\n      },\r\n			{\r\n        \"directory\": \"common/libraries/datetime/\",\r\n        \"files\": [ \"date-time-ux.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"denunciassecretaria-icon\",\r\n        \"shortcutIconCls\": \"denunciassecretaria-shortcut\",\r\n        \"text\": \"Denuncias secretaria\",\r\n        \"tooltip\": \"<b>Denuncias secretaria</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n ', 0);
INSERT INTO `qo_modules` VALUES ('denunciasweb', 'desktop/denunciasweb', 'DenunciasWeb', 'DenunciasWeb', '{\r\n  \"id\": \"denunciasweb\",\r\n  \"type\": \"desktop/denunciasweb\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Mantenimiento de Denunciasweb.\",\r\n    \"name\": \"Ventana Denunciasweb\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"grabarDenuncia\", \"description\": \"Grabar Denuncias\" } \r\n      ],\r\n      \"class\": \"QoDenunciasWeb\",\r\n      \"file\": \"desktop/denunciasweb/denunciasweb.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.DenunciaswebWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/denunciasweb/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"  ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"desktop/denunciasweb/client/\",\r\n        \"files\": [  \"denunciasweb-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"denunciasweb-icon\",\r\n        \"shortcutIconCls\": \"denunciasweb-shortcut\",\r\n        \"text\": \"Denunciasweb\",\r\n        \"tooltip\": \"<b>Denuncias web</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 0);
INSERT INTO `qo_modules` VALUES ('instruccion', 'desktop/instruccion', 'Instruccion', 'Instrucción - módulo parte proceso administrativo sancionador ', '{\r\n  \"id\": \"instruccion\",\r\n  \"type\": \"desktop/instruccion\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"AMC Instruccion.\",\r\n    \"name\": \"Instruccion\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n\r\n  \"dependencies\": [\r\n    { \"id\": \"checkbox\", \"type\": \"library\" }\r\n  ],\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministradorOpe\", \"description\": \"Administrador instruccion\" },\r\n      { \"name\": \"accesosAdministradorIns\", \"description\": \"Administrador instruccion solo inspeccion\" },\r\n      { \"name\": \"accesosInstruccion\", \"description\": \"Usuario opeativos\" },\r\n      { \"name\": \"accesosRecepcionOpe\", \"description\": \"Recepcion instruccion\" }\r\n    ],\r\n    \"class\": \"QoInstruccion\",\r\n    \"file\": \"desktop/instruccion/instruccion.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.InstruccionWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/instruccion/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\", \"fileuploadfield/FileUploadField.css\" ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\", \"fileuploadfield/FileUploadField.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/instruccion/client/\",\r\n        \"files\": [  \"instruccion-win.js\" ]\r\n      },\r\n\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"instruccion-icon\",\r\n        \"shortcutIconCls\": \"instruccion-shortcut\",\r\n        \"text\": \"Instruccion\",\r\n        \"tooltip\": \"<b>Instruccion - AMC</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 0);
INSERT INTO `qo_modules` VALUES ('luae', 'desktop/luae', 'LUAE', 'Consulta LUAE', '{\r\n  \"id\": \"luae\",\r\n  \"type\": \"desktop/luae\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Mantenimiento de Luae.\",\r\n    \"name\": \"Ventana Luae\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosZonales\", \"description\": \"Personal de zonales\" }\r\n\r\n    ],\r\n    \"class\": \"QoLuae\",\r\n    \"file\": \"desktop/luae/luae.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.LuaeWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/luae/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/luae/client/\",\r\n        \"files\": [  \"luae-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"luae-icon\",\r\n        \"shortcutIconCls\": \"luae-shortcut\",\r\n        \"text\": \"Luae - Pucas\",\r\n        \"tooltip\": \"<b>Luae</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 0);
INSERT INTO `qo_modules` VALUES ('mantenimiento', 'desktop/mantenimiento', 'Mantenimiento', 'Mantenimiento de tablas', '{\r\n  \"id\": \"mantenimiento\",\r\n  \"type\": \"desktop/mantenimiento\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Mantenimiento de Mantenimiento.\",\r\n    \"name\": \"Ventana Mantenimiento\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosZonales\", \"description\": \"Personal de zonales\" }\r\n\r\n    ],\r\n    \"class\": \"QoMantenimiento\",\r\n    \"file\": \"desktop/mantenimiento/mantenimiento.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.MantenimientoWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/mantenimiento/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/mantenimiento/client/\",\r\n        \"files\": [  \"mantenimiento-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"mantenimiento-icon\",\r\n        \"shortcutIconCls\": \"mantenimiento-shortcut\",\r\n        \"text\": \"Mantenimiento\",\r\n        \"tooltip\": \"<b>Mantenimiento</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);
INSERT INTO `qo_modules` VALUES ('operativos', 'desktop/operativos', 'Operativos', 'Modulos de gestion de operativos', '{\r\n  \"id\": \"operativos\",\r\n  \"type\": \"desktop/operativos\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"AMC Operativos.\",\r\n    \"name\": \"Operativos\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n\r\n   \"dependencies\": [\r\n      { \"id\": \"checkbox\", \"type\": \"library\" }\r\n   ],\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministradorOpe\", \"description\": \"Administrador operativos\" },\r\n      { \"name\": \"accesosAdministradorIns\", \"description\": \"Administrador operativos solo inspeccion\" },\r\n      { \"name\": \"accesosOperativos\", \"description\": \"Usuario opeativos\" },\r\n      { \"name\": \"accesosRecepcionOpe\", \"description\": \"Recepcion operativos\" }\r\n    ],\r\n    \"class\": \"QoOperativos\",\r\n    \"file\": \"desktop/operativos/operativos.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.OperativosWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/operativos/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\", \"fileuploadfield/FileUploadField.css\" ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\", \"fileuploadfield/FileUploadField.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/operativos/client/\",\r\n        \"files\": [  \"operativos-win.js\" ]\r\n      },\r\n\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"operativos-icon\",\r\n        \"shortcutIconCls\": \"operativos-shortcut\",\r\n        \"text\": \"Operativos\",\r\n        \"tooltip\": \"<b>Operativos - AMC</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 0);
INSERT INTO `qo_modules` VALUES ('personal', 'desktop/personal', 'Personal', 'Administracion Personal', '{\r\n  \"id\": \"personal\",\r\n  \"type\": \"desktop/personal\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"AMC Personal.\",\r\n    \"name\": \"Personal\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n\r\n  \"dependencies\": [\r\n    { \"id\": \"checkbox\", \"type\": \"library\" }\r\n  ],\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministradorOpe\", \"description\": \"Administrador personal\" },\r\n      { \"name\": \"accesosPersonal\", \"description\": \"Usuario opeativos\" },\r\n      { \"name\": \"accesosRecepcionOpe\", \"description\": \"Recepcion personal\" }\r\n    ],\r\n    \"class\": \"QoPersonal\",\r\n    \"file\": \"desktop/personal/personal.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.PersonalWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/personal/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\", \"fileuploadfield/FileUploadField.css\" ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\", \"fileuploadfield/FileUploadField.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/personal/client/\",\r\n        \"files\": [  \"personal-win.js\" ]\r\n      },\r\n\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"personal-icon\",\r\n        \"shortcutIconCls\": \"personal-shortcut\",\r\n        \"text\": \"Personal\",\r\n        \"tooltip\": \"<b>Personal - AMC</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 0);
INSERT INTO `qo_modules` VALUES ('personalmapa', 'desktop/personalmapa', 'personalmapa', 'personalmapa', '{\r\n  \"id\": \"personalmapa\",\r\n  \"type\": \"desktop/personalmapa\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Mantenimiento de Personalmapa.\",\r\n    \"name\": \"Ventana Personalmapa\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso\" },\r\n      { \"name\": \"accesosZonales\", \"description\": \"Personal de zonales\" }\r\n\r\n    ],\r\n    \"class\": \"QoPersonalmapa\",\r\n    \"file\": \"desktop/personalmapa/personalmapa.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.PersonalmapaWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/personalmapa/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/personalmapa/client/\",\r\n        \"files\": [  \"personalmapa-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"personalmapa-icon\",\r\n        \"shortcutIconCls\": \"personalmapa-shortcut\",\r\n        \"text\": \"Personalmapa\",\r\n        \"tooltip\": \"<b>Personalmapa</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 0);
INSERT INTO `qo_modules` VALUES ('planificacion', 'desktop/planificacion', 'Planificación', 'AMC - Inspección', '{\r\n  \"id\": \"inspeccion\",\r\n  \"type\": \"desktop/inspeccion\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Inspeccion de Inspeccion.\",\r\n    \"name\": \"Ventana Inspeccion\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso con vista de todos los tramites\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso con vista de tramites pendientes\" },\r\n      { \"name\": \"accesosInspeccion\", \"description\": \"Personal de inspeccion\" },\r\n      { \"name\": \"accesosSupervision\", \"description\": \"Personal de supervision\" }\r\n\r\n    ],\r\n    \"class\": \"QoDenuncias\",\r\n    \"file\": \"desktop/inspeccion/denuncias.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.InspeccionWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/inspeccion/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/inspeccion/client/\",\r\n        \"files\": [  \"moduloInspeccion-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"inspeccion-icon\",\r\n        \"shortcutIconCls\": \"inspeccion-shortcut\",\r\n        \"text\": \"Planificacion\",\r\n        \"tooltip\": \"<b>Planificacion</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);
INSERT INTO `qo_modules` VALUES ('planificacionmicro', 'desktop/planificacionmicro', 'Planificacion micro', 'Planificacion micro', '{\r\n  \"id\": \"planificacionmicro\",\r\n  \"type\": \"desktop/planificacionmicro\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"Planificacionmicro de Planificacionmicro.\",\r\n    \"name\": \"Ventana Planificacionmicro\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministrador\", \"description\": \"Full acceso con vista de todos los tramites\" },\r\n      { \"name\": \"accesosSecretaria\", \"description\": \"Full acceso con vista de tramites pendientes\" },\r\n      { \"name\": \"accesosPlanificacionmicro\", \"description\": \"Personal de planificacionmicro\" },\r\n      { \"name\": \"accesosSupervision\", \"description\": \"Personal de supervision\" }\r\n\r\n    ],\r\n    \"class\": \"QoDenuncias\",\r\n    \"file\": \"desktop/planificacionmicro/denuncias.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.PlanificacionmicroWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/planificacionmicro/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [  \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\"   ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/planificacionmicro/client/\",\r\n        \"files\": [  \"moduloPlanificacionmicro-win.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"planificacionmicro-icon\",\r\n        \"shortcutIconCls\": \"planificacionmicro-shortcut\",\r\n        \"text\": \"Planificacion micro\",\r\n        \"tooltip\": \"<b>Planificacion micro</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1);
INSERT INTO `qo_modules` VALUES ('publicidad', 'desktop/publicidad', 'Publicidad', 'Administracion Trámites publicidad', '{\r\n  \"id\": \"publicidad\",\r\n  \"type\": \"desktop/publicidad\",\r\n  \"about\": {\r\n    \"author\": \"\",\r\n    \"description\": \"AMC Publicidad.\",\r\n    \"name\": \"Publicidad\",\r\n    \"url\": \"\",\r\n    \"version\": \"1.0\"\r\n  },\r\n\r\n  \"dependencies\": [\r\n    { \"id\": \"checkbox\", \"type\": \"library\" }\r\n  ],\r\n  \"server\": {\r\n    \"methods\": [\r\n      { \"name\": \"accesosAdministradorOpe\", \"description\": \"Administrador publicidad\" },\r\n      { \"name\": \"accesosPublicidad\", \"description\": \"Usuario opeativos\" },\r\n      { \"name\": \"accesosRecepcionOpe\", \"description\": \"Recepcion publicidad\" }\r\n    ],\r\n    \"class\": \"QoPublicidad\",\r\n    \"file\": \"desktop/publicidad/publicidad.php\"\r\n  },\r\n  \"client\": {\r\n    \"class\": \"QoDesk.PublicidadWindow\",\r\n    \"css\": [\r\n      {\r\n        \"directory\": \"desktop/publicidad/client/resources/\",\r\n        \"files\": [ \"styles.css\" ]\r\n      },\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"datetime/date-time-ux.css\", \"Spinner/Spinner.css\", \"MultiSelect.css\", \"fileuploadfield/FileUploadField.css\" ]\r\n      }\r\n    ],\r\n    \"javascript\": [\r\n      {\r\n        \"directory\": \"common/libraries/\",\r\n        \"files\": [ \"AppMsg.js\",\"datetime/date-time-ux.js\",\"CheckColumn.js\", \"Spinner/SpinnerField.js\", \"Spinner/Spinner.js\",\"MultiSelect.js\", \"fileuploadfield/FileUploadField.js\"  ]\r\n      },\r\n      {\r\n        \"directory\": \"desktop/publicidad/client/\",\r\n        \"files\": [  \"publicidad-win.js\" ]\r\n      },\r\n\r\n      {\r\n        \"directory\": \"qwiki/admin/client/\",\r\n        \"files\": [ \"QoAdmin.js\" ]\r\n      },\r\n      {\r\n        \"directory\": \"qwiki/admin/client/lib/\",\r\n        \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n      }\r\n    ],\r\n    \"launcher\": {\r\n      \"config\": {\r\n        \"iconCls\": \"publicidad-icon\",\r\n        \"shortcutIconCls\": \"publicidad-shortcut\",\r\n        \"text\": \"Publicidad\",\r\n        \"tooltip\": \"<b>Publicidad - AMC</b>\"\r\n      },\r\n      \"paths\": {\r\n        \"startmenu\": \"/\"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 0);
INSERT INTO `qo_modules` VALUES ('qo-admin', 'system/administration', 'Admin', 'Allows system administration', '{\r\n   \"id\": \"qo-admin\",\r\n\r\n   \"type\": \"system/administration\",\r\n\r\n   \"about\": {\r\n      \"author\": \"\",\r\n      \"description\": \"\",\r\n      \"name\": \"Admin\",\r\n      \"url\": \"\",\r\n      \"version\": \"1.0\"\r\n   },\r\n\r\n   \"dependencies\": [\r\n      { \"id\": \"columntree\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"client\": {\r\n      \"class\": \"QoDesk.QoAdmin\",\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"qwiki/admin/client/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"qwiki/admin/client/\",\r\n            \"files\": [ \"QoAdmin.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/\",\r\n            \"files\": [ \"ActiveColumn.js\", \"ColumnNodeUI.js\", \"Nav.js\", \"SearchField.js\", \"TooltipEditor.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/groups/\",\r\n            \"files\": [ \"Groups.js\", \"GroupsTooltipEditor.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/members/\",\r\n            \"files\": [ \"Members.js\", \"MembersTooltipEditor.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/privileges/\",\r\n            \"files\": [ \"Privileges.js\", \"PrivilegesTooltipEditor.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/admin/client/lib/signups/\",\r\n            \"files\": [ \"Signups.js\", \"SignupsDetail.js\", \"SignupsGrid.js\" ]\r\n         }\r\n      ],\r\n      \"launcher\": {\r\n         \"config\": {\r\n            \"iconCls\": \"qo-admin-icon\",\r\n            \"shortcutIconCls\": \"qo-admin-shortcut-icon\",\r\n            \"text\": \"Admin\",\r\n            \"tooltip\": \"<b>Administrador</b><br />Permite configurar el sistema\"\r\n         },\r\n         \"paths\": {\r\n            \"startmenu\": \"/\"\r\n         }\r\n      }\r\n   },\r\n\r\n   \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"addGroup\", \"description\": \"Add a new group\" },\r\n         { \"name\": \"addMember\", \"description\": \"Add a new member\" },\r\n         { \"name\": \"addPrivilege\", \"description\": \"Add a new privilege\" },\r\n         { \"name\": \"approveSignupsToGroup\", \"description\": \"Approve a signup request\" },\r\n         { \"name\": \"deleteGroup\", \"description\": \"Delete a group\" },\r\n         { \"name\": \"deleteMember\", \"description\": \"Delete a member\" },\r\n         { \"name\": \"deletePrivilege\", \"description\": \"Delete a privilege\" },\r\n         { \"name\": \"denySignups\", \"description\": \"Deny a signup request\" },\r\n         { \"name\": \"editGroup\", \"description\": \"Edit a groups information\" },\r\n         { \"name\": \"editGroupPrivilege\", \"description\": \"Edit what privilege a group is associated with\" },\r\n         { \"name\": \"editMember\", \"description\": \"Edit a members information\" },\r\n         { \"name\": \"editMembersGroups\", \"description\": \"Edit what groups a member is associated with\" },\r\n         { \"name\": \"editPrivilege\", \"description\": \"Edit a privileges information\" },\r\n         { \"name\": \"editPrivilegeModules\", \"description\": \"Edit what modules and methods a privilege allows\" },\r\n         { \"name\": \"viewGroups\", \"description\": \"View groups\" },\r\n         { \"name\": \"viewGroupPrivileges\", \"description\": \"View the privileges available to the group\" },\r\n         { \"name\": \"viewMembers\", \"description\": \"View members information\" },\r\n         { \"name\": \"viewMemberGroups\", \"description\": \"View the groups available to the member\" },\r\n         { \"name\": \"viewPrivileges\", \"description\": \"View privilege information\" },\r\n         { \"name\": \"viewPrivilegeModules\", \"description\": \"View the modules available to the privilege\" },\r\n         { \"name\": \"viewSignups\", \"description\": \"View all sign ups\" }\r\n      ],\r\n      \"class\": \"QoAdmin\",\r\n      \"file\": \"qwiki/admin/server/QoAdmin.php\"\r\n   }\r\n}', 1);
INSERT INTO `qo_modules` VALUES ('qo-mail', 'email', 'Email', 'Allows users to send and receive email', '{\r\n   \"id\": \"qo-mail\",\r\n\r\n   \"type\": \"system/email\",\r\n\r\n   \"about\": {\r\n      \"author\": \"Todd Murdock\",\r\n      \"description\": \"Allows users to send and receive email\",\r\n      \"name\": \"qWikiMail\",\r\n      \"url\": \"www.qwikioffice.com\",\r\n      \"version\": \"1.0\"\r\n   },\r\n\r\n   \"dependencies\": [\r\n         { \"id\": \"iframecomponent\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"client\": {\r\n      \"class\": \"QoDesk.QoMail\",\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"qwiki/mail/client/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"qwiki/mail/client/\",\r\n            \"files\": [ \"QoMail.js\" ]\r\n         }\r\n      ],\r\n      \"launcher\": {\r\n         \"config\": {\r\n            \"iconCls\": \"qo-mail-icon\",\r\n            \"shortcutIconCls\": \"qo-mail-shortcut-icon\",\r\n            \"text\": \"Mail\",\r\n            \"tooltip\": \"<b>Mail</b><br />Allows you to send and receive email\"\r\n         },\r\n         \"paths\": {\r\n            \"startmenu\": \"/\"\r\n         }\r\n      }\r\n   },\r\n\r\n   \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"loadMemberFolders\", \"description\": \"Allow member to load (view) their folders\" },\r\n         { \"name\": \"addMemberFolder\", \"description\": \"Allow member to add a new folder\" }\r\n      ],\r\n      \"class\": \"QoMail\",\r\n      \"file\": \"qwiki/mail/server/QoMail.php\"\r\n   }\r\n}', 0);
INSERT INTO `qo_modules` VALUES ('qo-preferences', 'system/preferences', 'Preferences', 'Allows users to set and save their desktop preferences', '{\r\n   \"id\": \"qo-preferences\",\r\n\r\n   \"type\": \"system/preferences\",\r\n\r\n   \"about\": {\r\n      \"author\": \"\",\r\n      \"description\": \"\",\r\n      \"name\": \"Preferences\",\r\n      \"url\": \"www.qwikioffice.com\",\r\n      \"version\": \"1.0\"\r\n   },\r\n\r\n   \"dependencies\": [\r\n      { \"id\": \"colorpicker\", \"type\": \"library\" },\r\n      { \"id\": \"explorerview\", \"type\": \"library\" },\r\n      { \"id\": \"modalnotice\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"locale\": {\r\n      \"class\": \"QoDesk.QoPreferences.Locale\",\r\n      \"directory\": \"qwiki/preferences/client/locale/\",\r\n      \"extension\": \".json\",\r\n      \"languages\": [ \"en\" ]\r\n   },\r\n\r\n   \"client\": {\r\n      \"class\": \"QoDesk.QoPreferences\",\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"qwiki/preferences/client/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"qwiki/preferences/client/\",\r\n            \"files\": [ \"QoPreferences.js\" ]\r\n         },\r\n         {\r\n            \"directory\": \"qwiki/preferences/client/lib/\",\r\n            \"files\": [ \"Appearance.js\", \"AutoRun.js\", \"Background.js\", \"CheckTree.js\", \"Grid.js\", \"Nav.js\", \"QuickStart.js\", \"Shortcuts.js\" ]\r\n         }\r\n      ],\r\n      \"launcher\": {\r\n         \"config\": {\r\n            \"iconCls\": \"qo-pref-icon\",\r\n            \"shortcutIconCls\": \"qo-pref-shortcut-icon\",\r\n            \"text\": \"Sistema\",\r\n            \"tooltip\": \"<b>Preferencias</b><br />Permite modificar su escritorio\"\r\n         },\r\n         \"paths\": {\r\n            \"contextmenu\": \"/\",\r\n            \"startmenutool\": \"/\"\r\n         }\r\n      }\r\n   },\r\n\r\n   \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"saveAppearance\", \"description\": \"Allow member to save appearance\" },\r\n         { \"name\": \"saveAutorun\", \"description\": \"Allow member to save which modules run at start up\" },\r\n         { \"name\": \"saveBackground\", \"description\": \"Allow member to save a wallpaper as the background\" },\r\n         { \"name\": \"saveQuickstart\", \"description\": \"Allow member to save which modules appear in the Quick Start panel\" },\r\n         { \"name\": \"saveShortcut\", \"description\": \"Allow member to save which modules appear as a Shortcut\" },\r\n         { \"name\": \"viewThemes\", \"description\": \"Allow member to view the available themes\" },\r\n         { \"name\": \"viewWallpapers\", \"description\": \"Allow member to view the available wallpapers\" }\r\n      ],\r\n      \"class\": \"QoPreferences\",\r\n      \"file\": \"qwiki/preferences/server/QoPreferences.php\"\r\n   }\r\n}', 1);
INSERT INTO `qo_modules` VALUES ('qo-profile', 'user/profile', 'Profile', 'Allows user profile administration', '{\r\n   \"id\": \"qo-profile\",\r\n\r\n   \"type\": \"user/profile\",\r\n\r\n   \"about\": {\r\n      \"author\": \"Todd Murdock\",\r\n      \"description\": \"Allows user profile administration\",\r\n      \"name\": \"Profile\",\r\n      \"url\": \"www.qwikioffice.com\",\r\n      \"version\": \"1.0\"\r\n   },\r\n\r\n    \"dependencies\": [\r\n      { \"id\": \"statusbar\", \"type\": \"library\" }\r\n   ],\r\n\r\n   \"locale\": {\r\n      \"class\": \"QoDesk.QoProfile.Locale\",\r\n      \"directory\": \"qwiki/profile/client/locale/\",\r\n      \"extension\": \".json\",\r\n      \"languages\": [ \"en\" ]\r\n   },\r\n\r\n   \"client\": {\r\n      \"class\": \"QoDesk.QoProfile\",\r\n      \"css\": [\r\n         {\r\n            \"directory\": \"qwiki/profile/client/resources/\",\r\n            \"files\": [ \"styles.css\" ]\r\n         }\r\n      ],\r\n      \"javascript\": [\r\n         {\r\n            \"directory\": \"qwiki/profile/client/\",\r\n            \"files\": [ \"QoProfile.js\" ]\r\n         }\r\n      ],\r\n      \"launcher\": {\r\n         \"config\": {\r\n            \"iconCls\": \"qo-profile-icon\",\r\n            \"shortcutIconCls\": \"qo-profile-shortcut-icon\",\r\n            \"text\": \"Perfil\",\r\n            \"tooltip\": \"<b>Profile</b><br />Allows user profile administration\"\r\n         },\r\n         \"paths\": {\r\n            \"contextmenu\": \"/\",\r\n            \"startmenutool\": \"/\"\r\n         }\r\n      }\r\n   },\r\n\r\n   \"server\": {\r\n      \"methods\": [\r\n         { \"name\": \"loadProfile\", \"description\": \"Load a users profile\" },\r\n         { \"name\": \"saveProfile\", \"description\": \"Save a members profile\" },\r\n         { \"name\": \"savePwd\", \"description\": \"Save a members password\" }\r\n      ],\r\n      \"class\": \"QoProfile\",\r\n      \"file\": \"qwiki/profile/server/QoProfile.php\"\r\n   }\r\n}', 1);

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
INSERT INTO `qo_preferences` VALUES (1, 1, '{\"appearance\":{\"fontColor\":\"F2DFDF\",\"themeId\":1,\"taskbarTransparency\":100},\"background\":{\"color\":\"f9f9f9\",\"wallpaperId\":11,\"wallpaperPosition\":\"center\"},\"launchers\":{\"shortcut\":[\"demo-accordion\",\"demo-tab\",\"demo-bogus\",\"veris\",\"tienda\",\"mapa\",\"ofertalaboral\",\"contenidos\",\"historia\",\"imageadmin\",\"denuncias-secretaria\",\"denuncias\",\"denuncias-inspeccion\",\"denuncias-crecretaria\",\"denunciassecretaria\",\"denunciasinspeccion\",\"denunciasweb\",\"inspeccion\",\"operativos\",\"personal\",\"moduloInspeccion\",\"instruccion\",\"contribuciones\",\"planificacion\",\"mantenimiento\"],\"quickstart\":[\"demo-tab\",\"mapa\",\"contenidos\",\"denuncias-secretaria\",\"denunciassecretaria\",\"denuncias\",\"denunciasinspeccion\",\"denunciasweb\",\"inspeccion\",\"instruccion\",\"mantenimiento\",\"contribuciones\",\"planificacion\"],\"autorun\":[\"denuncias-inspeccion\",\"denuncias\"]}}');
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
INSERT INTO `qo_sessions` VALUES ('1b0d861b89f92a090c8841145fe434c3', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-13 19:22:32');
INSERT INTO `qo_sessions` VALUES ('2e3a92c454f09e22ea995a51ec9726f2', 1, 1, NULL, '127.0.0.1', '2019-06-11 19:23:39');
INSERT INTO `qo_sessions` VALUES ('345f38c630451afdd840f1da1e556c9b', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-12 18:34:23');
INSERT INTO `qo_sessions` VALUES ('3c1125cae3892b479a0ea2bc37960132', 1, 1, NULL, '127.0.0.1', '2019-06-11 19:23:33');
INSERT INTO `qo_sessions` VALUES ('5ea9677eb3d3803726582c68b7aad9a9', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-07 05:57:23');
INSERT INTO `qo_sessions` VALUES ('7f1e41e4e1f3abd36658307eb4b9cafa', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-07 21:50:37');
INSERT INTO `qo_sessions` VALUES ('964500288675d870d6a9897fa1df7c02', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-18 22:49:56');
INSERT INTO `qo_sessions` VALUES ('afd40ab7c440452da5e47dcf28478721', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-04 21:56:42');
INSERT INTO `qo_sessions` VALUES ('b9c062dacc7dab5d6d430ada161444fc', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-11 19:57:31');
INSERT INTO `qo_sessions` VALUES ('bac1cb0b80c0610da20021b3b3be0603', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-12 19:44:29');
INSERT INTO `qo_sessions` VALUES ('be003fe99b1ad65e59421286a41b2d0e', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-07-01 17:57:14');
INSERT INTO `qo_sessions` VALUES ('c7642ecc189ac5757b10441a4c5c4a6e', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-16 16:59:57');
INSERT INTO `qo_sessions` VALUES ('cce799d3861cbe016e725a48355e9d8d', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-25 19:17:53');
INSERT INTO `qo_sessions` VALUES ('d87d7d7abfd961f953fe9444415973a5', 1, 1, '{\"module\":{}}', '127.0.0.1', '2019-06-17 17:29:55');
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
