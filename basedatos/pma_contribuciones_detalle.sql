-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 11-06-2019 a las 06:29:21
-- Versión del servidor: 5.5.31
-- Versión de PHP: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `pma-desarrollo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_contribuciones_detalle`
--

CREATE TABLE IF NOT EXISTS `pma_contribuciones_detalle` (
  `id` int(11) NOT NULL,
  `id_pma_contribuciones_detalle` int(11) DEFAULT NULL,
  `year` int(4) DEFAULT NULL,
  `total_grant_q1` int(20) DEFAULT '0',
  `total_grant_q2` int(20) DEFAULT '0',
  `total_grant_q3` int(20) NOT NULL DEFAULT '0',
  `total_grant_q4` int(20) DEFAULT '0',
  `total_grant_prog_doc` int(20) DEFAULT '0',
  `total_grant_prog_dsc` int(20) DEFAULT '0',
  `total_pr_po_doc` int(20) DEFAULT '0',
  `total_actuals_doc` int(20) DEFAULT '0',
  `total_balance_doc` int(20) DEFAULT '0',
  `total_pr_po_dsc` int(20) DEFAULT '0',
  `total_actuals_dsc` int(20) DEFAULT '0',
  `total_grant_balance_dsc` int(20) DEFAULT '0',
  PRIMARY KEY (`id`,`total_grant_q3`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pma_contribuciones_detalle`
--

INSERT INTO `pma_contribuciones_detalle` (`id`, `id_pma_contribuciones_detalle`, `year`, `total_grant_q1`, `total_grant_q2`, `total_grant_q3`, `total_grant_q4`, `total_grant_prog_doc`, `total_grant_prog_dsc`, `total_pr_po_doc`, `total_actuals_doc`, `total_balance_doc`, `total_pr_po_dsc`, `total_actuals_dsc`, `total_grant_balance_dsc`) VALUES
(1, 1, 2018, 0, 1408450, 469483, 0, 1685605, 192328, 0, 1685605, 0, 66265, 126063, 0),
(2, 1, 2019, 0, 0, 0, 0, 0, 0, 617020, 2532590, 882512, 0, 0, 576983),
(3, 2, 2018, 1, 2, 1, 503288, 484031, 19257, 1, 174377, 309657, 1, 235, 19254);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
