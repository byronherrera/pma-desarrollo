ALTER TABLE `amc_denuncias`
ADD COLUMN `procesado_inspeccion`  int(1) NULL AFTER `guia`,
ADD COLUMN `despacho_secretaria_insp`  int (1) NULL AFTER `procesado_inspeccion`,
ADD COLUMN `guia_secretaria`  varchar(20) NULL AFTER `despacho_secretaria_insp`;

ALTER TABLE `amc_denuncias`
MODIFY COLUMN `despacho_secretaria_insp`  int(1) NULL DEFAULT '0' AFTER `procesado_inspeccion`;

ALTER TABLE `amc_denuncias`
MODIFY COLUMN `procesado_inspeccion`  int(1) NULL DEFAULT '0' AFTER `guia`;

UPDATE `amc_denuncias` SET `procesado_inspeccion`='1';
UPDATE `amc_denuncias` SET `procesado_inspeccion`='0' WHERE id >= 14230;

UPDATE `amc_denuncias` SET `despacho_secretaria_insp`='0';