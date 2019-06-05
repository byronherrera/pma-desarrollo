-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 06-06-2019 a las 01:38:56
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
-- Estructura de tabla para la tabla `pma_contribuciones`
--

CREATE TABLE IF NOT EXISTS `pma_contribuciones` (
  `id` int(11) NOT NULL,
  `id_contribucion` int(11) DEFAULT NULL,
  `grant_number` int(11) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `crn` varchar(20) DEFAULT NULL,
  `donor` varchar(20) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `year_contribution` int(4) DEFAULT NULL,
  `isc` decimal(20,0) NOT NULL DEFAULT '0',
  `total_grant` decimal(20,0) NOT NULL DEFAULT '0',
  `grant_TOD` datetime DEFAULT NULL,
  `grant_TDD` datetime DEFAULT NULL,
  `grant_specific` text,
  `activity` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Registro de contribuciones';

--
-- Volcado de datos para la tabla `pma_contribuciones`
--

INSERT INTO `pma_contribuciones` (`id`, `id_contribucion`, `grant_number`, `estado`, `crn`, `donor`, `comments`, `year_contribution`, `isc`, `total_grant`, `grant_TOD`, `grant_TDD`, `grant_specific`, `activity`) VALUES
(1, 1, 10029912, 'Cerrada', 'USA-C-01102-05', 'FFP', 'Saldo USA 2016', 2017, '0', '311678', '2019-06-05 12:52:06', '2019-06-05 12:52:10', 'Yes', 'Activity 1');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
