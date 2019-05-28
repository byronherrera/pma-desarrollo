/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50523
Source Host           : localhost:3306
Source Database       : amc-seguimiento

Target Server Type    : MYSQL
Target Server Version : 50523
File Encoding         : 65001

Date: 2018-01-26 14:56:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for amc_operativos_retiros
-- ----------------------------
DROP TABLE IF EXISTS `amc_operativos_retiros`;
CREATE TABLE `amc_operativos_retiros` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_operativo` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `tipo` varchar(16) DEFAULT NULL,
  `codigo_bodega` varchar(20) DEFAULT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
