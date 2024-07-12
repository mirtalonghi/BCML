-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2024 a las 05:14:58
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mirta_cmvuelos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleto`
--

CREATE TABLE `boleto` (
  `BoletoID` int(10) NOT NULL,
  `NroBoleto` int(10) NOT NULL,
  `asiento` varchar(10) NOT NULL,
  `clase` varchar(2) NOT NULL,
  `precio` decimal(14,2) NOT NULL,
  `fechacomp` date NOT NULL,
  `PasajeroID` int(10) NOT NULL,
  `VueloID` int(10) NOT NULL,
  `ClaseID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase`
--

CREATE TABLE `clase` (
  `ClaseID` int(10) NOT NULL,
  `TipoClase` varchar(20) NOT NULL,
  `ValorEnMas` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasajero`
--

CREATE TABLE `pasajero` (
  `PasajeroID` int(10) NOT NULL,
  `Nropasajero` int(15) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido` varchar(80) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `pasaporteid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pilot`
--

CREATE TABLE `pilot` (
  `PilotoID` int(10) NOT NULL,
  `NroPiloto` int(10) NOT NULL,
  `nombre_piloto` varchar(80) NOT NULL,
  `apellido_piloto` varchar(80) NOT NULL,
  `licencia_piloto` varchar(20) NOT NULL,
  `horavuelo` datetime(6) NOT NULL,
  `fechacontrato` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piloto`
--

CREATE TABLE `piloto` (
  `PilotoID` int(10) NOT NULL,
  `NroPiloto` int(10) NOT NULL,
  `nombre_piloto` varchar(80) NOT NULL,
  `apellido_piloto` varchar(80) NOT NULL,
  `licencia_piloto` varchar(20) NOT NULL,
  `horavuelo` datetime(6) NOT NULL,
  `fechacontrato` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `piloto`
--

INSERT INTO `piloto` (`PilotoID`, `NroPiloto`, `nombre_piloto`, `apellido_piloto`, `licencia_piloto`, `horavuelo`, `fechacontrato`) VALUES
(1, 0, 'Mirta', 'Longhitano', 'ZYP3456FV', '0000-00-00 00:00:00.000000', '2024-07-10'),
(2, 0, 'Cesar', 'Aponte', 'Axlt205t', '0000-00-00 00:00:00.000000', '2024-07-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tripulante`
--

CREATE TABLE `tripulante` (
  `TripulanteID` int(10) NOT NULL,
  `NroTripulante` int(10) NOT NULL,
  `Nombre` varchar(80) NOT NULL,
  `Apellido` varchar(80) NOT NULL,
  `Puesto` varchar(20) NOT NULL,
  `FechaContratacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tripulante_vuelo`
--

CREATE TABLE `tripulante_vuelo` (
  `TripulanteID` int(10) NOT NULL,
  `VueloID` int(10) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vuelo`
--

CREATE TABLE `vuelo` (
  `VueloID` int(10) NOT NULL,
  `NroVuelo` int(15) NOT NULL,
  `fsalida` date NOT NULL,
  `fllegada` date NOT NULL,
  `origen` varchar(100) NOT NULL,
  `destino` varchar(100) NOT NULL,
  `PilotoID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `boleto`
--
ALTER TABLE `boleto`
  ADD PRIMARY KEY (`BoletoID`),
  ADD UNIQUE KEY `pasajeroid_2` (`PasajeroID`),
  ADD KEY `pasajeroid` (`PasajeroID`),
  ADD KEY `pasajeroid_3` (`PasajeroID`),
  ADD KEY `VueloID` (`VueloID`),
  ADD KEY `ClaseID` (`ClaseID`);

--
-- Indices de la tabla `clase`
--
ALTER TABLE `clase`
  ADD PRIMARY KEY (`ClaseID`);

--
-- Indices de la tabla `pasajero`
--
ALTER TABLE `pasajero`
  ADD PRIMARY KEY (`PasajeroID`),
  ADD UNIQUE KEY `pasaporteid_2` (`pasaporteid`),
  ADD UNIQUE KEY `pasaporteid_5` (`pasaporteid`),
  ADD KEY `pasaporteid` (`pasaporteid`),
  ADD KEY `pasaporteid_6` (`pasaporteid`);
ALTER TABLE `pasajero` ADD FULLTEXT KEY `pasaporteid_3` (`pasaporteid`);
ALTER TABLE `pasajero` ADD FULLTEXT KEY `pasaporteid_4` (`pasaporteid`);

--
-- Indices de la tabla `pilot`
--
ALTER TABLE `pilot`
  ADD PRIMARY KEY (`PilotoID`),
  ADD UNIQUE KEY `pilotoid_2` (`PilotoID`),
  ADD UNIQUE KEY `PilotoID_4` (`PilotoID`),
  ADD KEY `pilotoid` (`PilotoID`),
  ADD KEY `pilotoid_3` (`PilotoID`),
  ADD KEY `PilotoID_5` (`PilotoID`);

--
-- Indices de la tabla `piloto`
--
ALTER TABLE `piloto`
  ADD PRIMARY KEY (`PilotoID`);

--
-- Indices de la tabla `tripulante`
--
ALTER TABLE `tripulante`
  ADD PRIMARY KEY (`TripulanteID`);

--
-- Indices de la tabla `tripulante_vuelo`
--
ALTER TABLE `tripulante_vuelo`
  ADD UNIQUE KEY `TripiulanteID` (`TripulanteID`,`VueloID`),
  ADD KEY `TripulanteID` (`TripulanteID`),
  ADD KEY `VueloID` (`VueloID`);

--
-- Indices de la tabla `vuelo`
--
ALTER TABLE `vuelo`
  ADD PRIMARY KEY (`VueloID`),
  ADD KEY `pilotoid` (`PilotoID`),
  ADD KEY `pilotoid_2` (`PilotoID`),
  ADD KEY `pilotoid_3` (`PilotoID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `boleto`
--
ALTER TABLE `boleto`
  MODIFY `BoletoID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pasajero`
--
ALTER TABLE `pasajero`
  MODIFY `PasajeroID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `piloto`
--
ALTER TABLE `piloto`
  MODIFY `PilotoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tripulante`
--
ALTER TABLE `tripulante`
  MODIFY `TripulanteID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vuelo`
--
ALTER TABLE `vuelo`
  MODIFY `VueloID` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `boleto`
--
ALTER TABLE `boleto`
  ADD CONSTRAINT `boleto_ibfk_1` FOREIGN KEY (`VueloID`) REFERENCES `vuelo` (`VueloID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `boleto_ibfk_2` FOREIGN KEY (`PasajeroID`) REFERENCES `pasajero` (`PasajeroID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `boleto_ibfk_3` FOREIGN KEY (`ClaseID`) REFERENCES `clase` (`ClaseID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tripulante_vuelo`
--
ALTER TABLE `tripulante_vuelo`
  ADD CONSTRAINT `Tripulante_Vuelo_ibfk_1` FOREIGN KEY (`TripulanteID`) REFERENCES `tripulante` (`TripulanteID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Tripulante_Vuelo_ibfk_2` FOREIGN KEY (`VueloID`) REFERENCES `vuelo` (`VueloID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vuelo`
--
ALTER TABLE `vuelo`
  ADD CONSTRAINT `vuelo_ibfk_1` FOREIGN KEY (`PilotoID`) REFERENCES `pilot` (`PilotoID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
