ALTER TABLE `pma-desarrollo`.`pma_contribuciones`
MODIFY COLUMN `grant_number` varchar(18) NULL DEFAULT NULL AFTER `id_contribucion`;

ALTER TABLE `pma-desarrollo`.`pma_contribuciones`
ADD COLUMN `recepcion_documento` datetime(0) NULL AFTER `activity`,
ADD COLUMN `creado` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) AFTER `recepcion_documento`;

ALTER TABLE `pma-desarrollo`.`pma_contribuciones`
MODIFY COLUMN `id` int(11) NOT NULL AUTO_INCREMENT FIRST;