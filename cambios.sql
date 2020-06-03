ALTER TABLE `pma-desarrollo`.`pma_costos_micro_detalle` 
ADD COLUMN `crudCostosMicroDetalle` decimal(10, 0) NULL AFTER `total_adjusted`;

ALTER TABLE `pma-desarrollo`.`pma_costos_micro_detalle`
ADD COLUMN `id_pma_payroll_detalle` int(11) NOT NULL COMMENT 'usado para el caso que el detalle es ingresado desde payroll' AFTER `sub_po_microcosts`;

