-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 07-06-2019 a las 00:14:33
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
  `total_grant_q1` int(20) DEFAULT '0',
  `total_grant_q2` int(20) DEFAULT '0',
  `total_grant_q3` int(20) DEFAULT '0',
  `total_grant_q4` int(20) DEFAULT '0',
  `total_grant_prog_doc` int(20) DEFAULT '0',
  `total_grant_prog_dsc` int(20) DEFAULT '0',
  `total_pr_po_doc` int(20) DEFAULT '0',
  `total_actuals_doc` int(20) DEFAULT '0',
  `total_balance_doc` int(20) DEFAULT '0',
  `total_pr_po_dsc` int(20) DEFAULT '0',
  `total_actuals_dsc` int(20) DEFAULT '0',
  `total_grant_balance_dsc` int(20) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pma_contribuciones_detalle`
--

INSERT INTO `pma_contribuciones_detalle` (`id`, `id_pma_contribuciones_detalle`, `total_grant_q1`, `total_grant_q2`, `total_grant_q3`, `total_grant_q4`, `total_grant_prog_doc`, `total_grant_prog_dsc`, `total_pr_po_doc`, `total_actuals_doc`, `total_balance_doc`, `total_pr_po_dsc`, `total_actuals_dsc`, `total_grant_balance_dsc`) VALUES
(1, 1, 1001, 1002, 1003, 1004, 1005, 0, 0, 0, 0, 0, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
