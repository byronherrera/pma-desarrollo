ALTER TABLE `pma-desarrollo`.`pma_contribuciones` 
CHANGE COLUMN `grant_TOD` `grant_tod` date NULL DEFAULT NULL AFTER `total_grant`,
CHANGE COLUMN `grant_TDD` `grant_tdd` date NULL DEFAULT NULL AFTER `grant_tod`;

DELETE FROM `pma-desarrollo`.`qo_privileges` WHERE `id` > 4;
