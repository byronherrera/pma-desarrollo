ALTER TABLE `pma-desarrollo`.`pma_contribuciones`
MODIFY COLUMN `grant_number` varchar(18) NULL DEFAULT NULL AFTER `id_contribucion`;