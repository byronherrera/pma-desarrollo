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

 Date: 01/10/2019 21:14:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  `total_contribution` float NOT NULL DEFAULT 0,
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
INSERT INTO `pma_contribuciones` VALUES (1, NULL, '10029912', 'Closed', 'USA-C-01102-05', 'FFP', 1, 'Saldo USA 2016', 2017, 0, 311671, 1, 3577, 308094, '2018-04-30', '2019-09-02', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (2, NULL, '10029894', 'Closed', 'USA-C-01102-04', 'FFP', 1, 'Contribución 2017', 2017, 117757, 1682243, 0, 455, 1681788, '2018-04-30', '2018-04-30', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (3, NULL, '10032605', 'Closed', 'USA-C-01479-01', 'FFP', NULL, 'Contribución 2018', 2018, 122066, 1877934, 0, 643, 1877291, '2018-04-27', '2018-12-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (4, NULL, '10033899', 'Ongoing', 'USA-C-01535-01', 'FFP', NULL, 'Contribución 2018', 2018, 366197, 5633803, 0, 643, 5633160, '2019-09-02', '2019-09-30', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (5, NULL, '30004294', 'Ongoing', 'IPL EC01 2019_04_04', 'FFP', NULL, 'AF 2019', 2019, 183099, 2816901, 0, 643, 2816258, '2019-04-04', '2020-03-01', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (6, NULL, '10035028', 'Ongoing', 'USA-C-01619-01', 'FFP', NULL, 'Saldo 7 millones', 2019, 427230, 6572770, 0, 643, 6572127, '2020-02-28', '2020-02-28', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (7, NULL, '70000403', 'Closed', '001-C-01829 -01', 'CERF', NULL, 'Contribución 2018', 2018, 32714, 503288, 0, 643, 502645, '2019-03-26', '2019-03-26', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (8, NULL, '70000374', 'Ongoing', 'DEN-C-00220-01', 'Denmark', NULL, 'Gender', 2018, 0, 361916, 0, 643, 361273, '2019-12-31', '2019-12-31', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (9, NULL, '70000375', 'Ongoing', 'DEN-C-00220-02', 'Denmark', NULL, 'Gender', 2019, 0, 368474, 0, 643, 367831, '2019-12-31', '2019-12-31', 'Yes', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (10, NULL, '10034321', 'Ongoing', 'GER-C-00825-01', 'Germany', NULL, 'test', 2018, 69356, 1068222, 0, 643, 1067579, '2018-12-31', '2019-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (11, NULL, '10035334', 'Ongoing', 'CAN-C-00572-08', 'Canada', NULL, NULL, 2019, 23189, 356750, 0, 643, 356107, '2020-03-31', '2020-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (13, NULL, '10029899', 'Ongoing', 'KOR-C-00128-06', 'KOR MOFA', NULL, 'Korea I (saldo PRRO)', 2017, 50486, 721223, 0, 643, 720580, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (14, NULL, '10029744', 'Ongoing', 'KOR-C-00128-04', 'KOR MOFA', NULL, 'Korea II (1 millón)', 2017, 65421, 559056, 0, 643, 558413, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (15, NULL, '10029744', 'Ongoing', 'KOR-C-00128-04', 'KOR MOFA', NULL, 'Korea II (1 millón)', 2017, 0, 375523, 0, 643, 374880, '2019-09-30', '2019-09-30', 'No', 'Activity 4', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (16, NULL, '10029747', 'Ongoing', 'KOR-C-00128-05', 'KOR MOFA', NULL, 'Korea III (1 millón)', 2017, 65421, 713001, 0, 643, 712358, '2019-09-30', '2019-09-30', 'No', 'Activity 3', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (17, NULL, '10029747', 'Ongoing', 'KOR-C-00128-05', 'KOR MOFA', NULL, 'Korea III (1 millón)', 2017, 0, 221578, 0, 643, 220935, '2019-09-30', '2019-09-30', 'No', 'Activity 4', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (18, NULL, '10030661', 'Closed', 'WPD-C-03321-02', 'Private donors', NULL, 'McKnight ', 2017, 3745, 37452, 0, 643, 36809, '2019-08-31', '2019-11-30', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (19, NULL, '70000012', 'Ongoing', 'WPD-C-03871-02', 'Private donors', NULL, 'McKnight', 2017, 14997, 90908, 0, 643, 90265, '2019-08-31', '2019-11-30', 'Yes', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (20, NULL, '70000012', 'Ongoing', 'WPD-C-03871-02', 'Private donors', NULL, 'McKnight', 2017, 0, 59060, 0, 643, 58417, '2019-08-31', '2019-11-30', 'Yes', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (21, NULL, '10029859', 'Closed', 'WPD-C-03290-02', 'Private donors', NULL, 'Saldo YUM ', 2017, 5231, 121157, 0, 643, 120514, NULL, NULL, NULL, 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (22, NULL, '70000011', 'Pending', '001-C-01539-02', 'UN Adaptation Fund', NULL, 'FORECCSA', 2017, 66847, 119173, 0, 643, 118530, '2018-05-29', '2018-05-29', 'Yes', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (23, NULL, '70000011', 'Pending', '001-C-01539-02', 'UN Adaptation Fund', NULL, 'FORECCSA', 2017, 0, 1551997, 0, 643, 1551354, '2018-05-29', '2018-05-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (24, NULL, '70000065', 'Pending', '001-C-01023-02', 'UN Adaptation Fund', NULL, 'FORECCSA', 2017, 21825, 86009, 0, 643, 85366, '2018-05-29', '2018-05-29', 'Yes', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (25, NULL, '70000065', 'Pending', '001-C-01023-02', 'UN Adaptation Fund', NULL, 'FORECCSA', 2017, 0, 459606, 0, 643, 458963, '2018-05-29', '2018-05-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (26, NULL, '30003782', 'Closed', 'IRA ECCO EPR EC01', 'IRA AF', NULL, 'Venezolanos', 2017, 0, 93451, 0, 643, 92808, '2018-02-15', '2018-03-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (27, NULL, '1002098411', 'Ongoing', 'NET-C-00102-02', 'SRAC', 11, 'SRAC NET ', 2017, 3438, 45846, 111, 12, 45834, '2019-06-28', '2019-10-10', 'No', 'Activity 7', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (28, NULL, '10031132', 'Closed', 'UK-C00369-05', 'SRAC', NULL, 'UK DFID', 2017, 50374, 1196000, 0, 643, 1195357, '2018-05-31', '2018-07-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (29, NULL, '10031132', 'Closed', 'UK-C00369-05', 'SRAC', NULL, 'UK DFID Cambio grant', 2017, 0, 24000, 0, 643, 23357, '2018-05-31', '2018-07-31', 'No', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (30, NULL, '10032250', 'Closed', 'NET-C-00140-02', 'SRAC', NULL, 'NET MOFA', 2017, 30516, 500000, 0, 643, 499357, '2018-12-31', '2018-12-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (31, NULL, '10032701', 'Ongoing', 'SWE-C-00299-09', 'SRAC', NULL, 'SWEDEN Cambio grant', 2018, 18310, 54000, 0, 643, 53357, '0000-00-00', '0000-00-00', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (32, NULL, '10032701', 'Ongoing', 'SWE-C-00299-09', 'SRAC', NULL, 'SWEDEN Cambio grant', 2018, 0, 246000, 0, 643, 245357, '2019-08-04', '2019-11-22', 'No', 'Activity 5', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (33, NULL, '10033562', 'Ongoing', 'UK -C-00369-06', 'SRAC', 33, 'UK DFID', 2018, 122066, 1040000, 0, 643, 1039357, '2019-05-30', '2019-07-31', 'No', 'Activity 1', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (34, NULL, '70000144', 'Ongoing', '001-C-01692-01', 'UN Adaptation Fund', 22, 'Binacional 2018', 2018, 30155, 753866, 0, 643, 753223, '2017-11-29', '2022-11-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (35, NULL, '70000590', 'Closed', '001-C-01692-04', 'UN Adaptation Fund', 1, 'Binacional 2019', 2019, 239076, 5976903, 0, 643, 5976260, '2018-01-01', '2022-11-29', 'Yes', 'Activity 6', NULL, '2019-06-17 07:55:41');
INSERT INTO `pma_contribuciones` VALUES (36, NULL, '12111111', 'Ongoing', '123', '1231', 123, 'test', 2019, 11, 11111, 0, 0, 0, '2019-09-28', '2019-12-31', 'Yes', '', '2019-09-28 07:59:51', '2019-09-28 08:00:44');

SET FOREIGN_KEY_CHECKS = 1;
