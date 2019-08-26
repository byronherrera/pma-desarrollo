var tramiteSeleccionado = '';
var planificacionmicroSeleccionada = '';

QoDesk.PlanificacionmicroWindow = Ext.extend(Ext.app.Module, {
    id: 'moduloPlanificacionmicro',
    type: 'desktop/moduloPlanificacionmicro',

    init: function () {
        this.launcher = {
            text: 'Planificacionmicro',
            iconCls: 'mantenimiento-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        //Variables de acceso
        var accesosCoordinadorPlanificacionmicro = this.app.isAllowedTo('accesosAdministrador', this.id); //Todos los accesos, visualiza todos los trámites
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id); //Todos los accesos, visualiza trámites pendientes
        var accesosInspectores = this.app.isAllowedTo('accesosPlanificacionmicro', this.id); //Sin acceso a pestaña trámites pendientes, acceso a planificacionmicroes asignadas
        var accesosSupervision = this.app.isAllowedTo('accesosSupervision', this.id); //Solo modo lectura

        this.selectContribuciones = 0;
        this.select_SO = 0;
        this.select_macro = 0;

        //Control en caso de tener asignado el perfil de administrador
        if (accesosCoordinadorPlanificacionmicro && accesosSecretaria && accesosInspectores && accesosSupervision == true) {
            accesosSecretaria = false;
            accesosInspectores = false;
            accesosSupervision = false;
        }
        //Acceso para creación y edición en pestaña Datos inspección
        if (accesosCoordinadorPlanificacionmicro || accesosInspectores == true) {
            var creacionDatosPlanificacionmicro = true;
        }
        else {
            var creacionDatosPlanificacionmicro = false;
        }

        //Acceso para creación y edición en pestaña Trámites pendientes
        if (accesosCoordinadorPlanificacionmicro || accesosSecretaria == true) {
            var creacionTramites = true;
        }
        else {
            var creacionTramites = false;
        }

        // todosInspectores = accesosInspectores;

        if (accesosSecretaria) {
            isChecked = true;
        }
        else {
            isChecked = false;
        }

        var bloqueo = (accesosCoordinadorPlanificacionmicro || accesosSecretaria || accesosInspectores || accesosSupervision) ? true : false

        var desktop = this.app.getDesktop();
        var winHeight = desktop.getWinHeight();
        var winWidth = desktop.getWinWidth();

        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-moduloPlanificacionmicro');

        //Ubicación de la carpeta de Planificacionmicro
        var urlPlanificacionmicro = "modules/desktop/planificacionmicro/server/";
        // todasPlanificacionmicro = todosInspectores;
        var textField = new Ext.form.TextField({allowBlank: false, readOnly: false});
        var textFieldDetalle = new Ext.form.TextField({allowBlank: true, readOnly: false});

        //Definición del formato de fecha
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }

        //Inicio ventana planificacionmicro
        //Definición de url CRUD
        var proxyModuloPlanificacionmicro = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudContribuciones.php?operation=insert",
                read: urlPlanificacionmicro + "crudContribuciones.php?operation=select",
                update: urlPlanificacionmicro + "crudContribuciones.php?operation=update",
                destroy: urlPlanificacionmicro + "crudContribuciones.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Planificacionmicro
        var readerModuloPlanificacionmicro = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'grant_number', allowBlank: true},
                {name: 'estado', allowBlank: true},
                {name: 'crn', allowBlank: true},
                {name: 'donor', allowBlank: true},
                {name: 'comments', allowBlank: true},
                {name: 'isc', allowBlank: true},
                {name: 'total_grant', allowBlank: true},
                {name: 'grant_tod', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'grant_tdd', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'grant_specific', allowBlank: true},
                {name: 'activity', allowBlank: true},
                {name: 'year_contribution', allowBlank: true}
            ]

        });

        //Definición de escritura en campos bdd Planificacionmicro
        var writerModuloPlanificacionmicro = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Inicio ventana planificacionmicro
        //Definición de url CRUD
        var proxyDetallePlanificacionmicro = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudDetalleContribuciones.php?operation=insert",
                read: urlPlanificacionmicro + "crudDetalleContribuciones.php?operation=select",
                update: urlPlanificacionmicro + "crudDetalleContribuciones.php?operation=update",
                destroy: urlPlanificacionmicro + "crudDetalleContribuciones-.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Planificacionmicro
        var readerDetallePlanificacionmicro = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_pma_contribuciones_detalle', allowBlank: true},
                {name: 'year', allowBlank: false},
                //{name: 'id_cost', allowBlank: true},
                {name: 'so', allowBlank: true},
                {name: 'activity', allowBlank: true},
                // {name: 'id_cost', allowBlank: true},
                // {name: 'id_cost_detail', allowBlank: true},
                // {name: 'category_name', allowBlank: true},
                // {name: 'subcategory_name', allowBlank: true},

                // {name: 'total_grant_q1', allowBlank: true},
                // {name: 'total_grant_q2', allowBlank: true},
                // {name: 'total_grant_q3', allowBlank: true},
                // {name: 'total_grant_q4', allowBlank: true},
                // {name: 'total_grant_prog_doc', allowBlank: true},
                // {name: 'total_grant_prog_dsc', allowBlank: true},
                // {name: 'total_pr_po_doc', allowBlank: true},
                // {name: 'total_actuals_doc', allowBlank: true},
                // {name: 'total_balance_doc', allowBlank: true},
                // {name: 'total_pr_po_dsc', allowBlank: true},
                // {name: 'total_actuals_dsc', allowBlank: true},
                // {name: 'total_grant_balance_dsc', allowBlank: true}
            ]
        });

        //Definición de escritura en campos bdd Planificacionmicro
        var writerDetallePlanificacionmicro = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de url CRUD
        var proxyListadoPlanificacionmicro = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudListadoPlanificacionmicro.php?operation=insert",
                read: urlPlanificacionmicro + "crudListadoPlanificacionmicro.php?operation=select",
                update: urlPlanificacionmicro + "crudListadoPlanificacionmicro.php?operation=update",
                destroy: urlPlanificacionmicro + "crudListadoPlanificacionmicro.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Planificacionmicro
        var readerListadoPlanificacionmicro = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'codigo_tramite', readOnly: false, allowBlank: true},
                {name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_planificacionmicro', readOnly: false, allowBlank: true},
                //{name: 'codificacion', readOnly: false, allowBlank: true},
                {name: 'nombre_denunciado', readOnly: false, allowBlank: true},
                {name: 'id_ordenanza', readOnly: true, allowBlank: true},
                {name: 'fecha_despacho', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_actividad', readOnly: false, allowBlank: true},
                //{name: 'respuesta', readOnly: false, allowBlank: true},
                {name: 'funcionario_entrega', readOnly: false, allowBlank: true},
                {name: 'funcionario_reasignacion', readOnly: false, allowBlank: true},
                {name: 'guia', readOnly: false, allowBlank: true},
                {name: 'id_zona', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'id_control_programado', readOnly: false, allow: true},
                {name: 'id_motivo_acta', readOnly: false, allow: true},
                {name: 'id_tipo_acta', readOnly: false, allow: true},
                {name: 'id_acta', readOnly: false, allow: true},
                {name: 'num_fojas', readOnly: false, allowBlank: true},
                {name: 'acta_verificacion', readOnly: false, allowBlank: true},
                {name: 'prioridad', readOnly: false, allowBlank: true},
                {name: 'fecha_acta', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'planificacionmicro_finalizada', readOnly: false, allowBlank: true},
                {name: 'infraccion', readOnly: false, allowBlank: true},
                {name: 'observaciones', readOnly: false, allowBlank: true}

            ]
        });

        //inicio mantenimiento Planificacionmicrodet
        var proxyPlanificacionmicrodet = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudCostosMicro.php?operation=insert",
                read: urlPlanificacionmicro + "crudCostosMicro.php?operation=select",
                update: urlPlanificacionmicro + "crudCostosMicro.php?operation=update",
                destroy: urlPlanificacionmicro + "crudCostosMicro.php?operation=delete"
            }
        });

        var readerPlanificacionmicrodet = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'id_pma_costos_micro', allowBlank: false},
                {name: 'cost_code_micro', allowBlank: false},
                {name: 'description_micro', allowBlank: false},
                {name: 'total_micro', allowBlank: false}
            ]
        });

        var writerPlanificacionmicrodet = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePlanificacionmicrodet = new Ext.data.Store({
            id: "id",
            proxy: proxyPlanificacionmicrodet,
            reader: readerPlanificacionmicrodet,
            writer: writerPlanificacionmicrodet,
            autoSave: true
        });
        this.storePlanificacionmicrodet.load();

        //Definición de escritura en campos bdd Planificacionmicro
        var writerListadoPlanificacionmicro = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });


        var proxyCostoMacro = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudCostosMacro.php?operation=insert",
                read: urlPlanificacionmicro + "crudCostosMacro.php?operation=select",
                update: urlPlanificacionmicro + "crudCostosMacro.php?operation=update",
                destroy: urlPlanificacionmicro + "crudCostosMacro.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerCostoMacro = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'cost_code', allowBlank: true},
                {name: 'total', allowBlank: true},
                {name: 'doc', allowBlank: true},
                {name: 'dsc', allowBlank: true},
                {name: 'adjust', allowBlank: true},
                {name: 'comment', allowBlank: true},
                {name: 'total_adjusted', allowBlank: true},
                {name: 'fecha_registro', type: 'date', dateFormat: 'c', allowBlank: true},
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerCostoMacro = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });


        //Definición de store para módulo Planificacionmicro
        this.storeModuloPlanificacionmicro = new Ext.data.Store({
            id: "id",
            proxy: proxyModuloPlanificacionmicro,
            reader: readerModuloPlanificacionmicro,
            writer: writerModuloPlanificacionmicro,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //autoSave: true
            //baseParams: {}
        });

        //Definición de store para módulo Planificacionmicro
        this.storeDetallePlanificacionmicro = new Ext.data.Store({
            id: "id",
            proxy: proxyDetallePlanificacionmicro,
            reader: readerDetallePlanificacionmicro,
            writer: writerDetallePlanificacionmicro,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            // autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeListadoPlanificacionmicro = new Ext.data.Store({
            id: "id",
            proxy: proxyListadoPlanificacionmicro,
            reader: readerListadoPlanificacionmicro,
            writer: writerListadoPlanificacionmicro,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeCostoMacro = new Ext.data.Store({
            id: "id",
            proxy: proxyCostoMacro,
            reader: readerCostoMacro,
            writer: writerCostoMacro,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        var checkHandler = function (item, checked) {
            if (checked) {
                var store = this.storeModuloPlanificacionmicro;
                store.baseParams.filterField = item.key;
                searchFieldBtn.setText(item.text);
            }
        };

        var checkHandlerPlanificacionmicro = function (item, checked) {
            if (checked) {
                // if (todosInspectores == true) {
                var store = this.storeListadoPlanificacionmicro;
                // } else {
                // var store = this.storeListadoTodosInspectores;
                // }
                //var store = this.storeModuloPlanificacionmicro;

                store.baseParams.filterField = item.key;
                searchListadoInpeccionesBtn.setText(item.text);
            }
        };

        //inicio combo COSTPARENTDET
        storeCOSTPARENTDET = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'cost'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=costparent'
        });

        var comboCOSTPARENTDET = new Ext.form.ComboBox({
            id: 'comboCOSTPARENTDET',
            store: storeCOSTPARENTDET,
            valueField: 'id',
            displayField: 'cost',
            triggerAction: 'all',
            mode: 'local'
        });

        function costparentAdmDet(id) {
            var index = storeCOSTPARENTDET.findExact('id', id);
            if (index > -1) {
                var record = storeCOSTPARENTDET.getAt(index);
                return record.get('cost');
            }
        }

        //fin combo COSTPARENTDET

        //inicio combo ACTIVITIES
        // storeSO = new Ext.data.JsonStore({
        //     root: 'data',
        //     fields: ['id', 'category_name'],
        //     autoLoad: true,
        //     url: 'modules/common/combos/combos.php?tipo=so'
        // });
        storeActivities = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'subcategory_name'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "subcategory_name": "Activity 1"},
                    {"id": 2, "subcategory_name": "Activity 3"},
                    {"id": 3, "subcategory_name": "Activity 4"},
                    {"id": 4, "subcategory_name": "Activity 5"},
                    {"id": 5, "subcategory_name": "Activity 6"},
                    {"id": 6, "subcategory_name": "Activity 7"},
                    {"id": 7, "subcategory_name": "Activity 8"}
                ]
            }
        });

        var comboActivities = new Ext.form.ComboBox({
            id: 'comboActivities',
            store: storeActivities,
            valueField: 'id',
            displayField: 'subcategory_name',
            triggerAction: 'all',
            mode: 'local'
        });

        function costActivities(id) {
            var index = storeActivities.find('id', id);
            if (index > -1) {
                var record = storeActivities.getAt(index);
                return record.get('subcategory_name');
            }
        }

        //fin combo ACTIVITIES

        //inicio combo SO
        // storeSO = new Ext.data.JsonStore({
        //     root: 'data',
        //     fields: ['id', 'category_name'],
        //     autoLoad: true,
        //     url: 'modules/common/combos/combos.php?tipo=so'
        // });
        storeSO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'category_name'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "category_name": "SO1"},
                    {"id": 2, "category_name": "SO2"},
                    {"id": 3, "category_name": "SO3"},
                    {"id": 4, "category_name": "SO4"}
                ]
            }
        });

        var comboSO = new Ext.form.ComboBox({
            id: 'comboSO',
            store: storeSO,
            valueField: 'id',
            displayField: 'category_name',
            triggerAction: 'all',
            mode: 'local'
        });

        function costSO(id) {
            var index = storeSO.find('id', id);
            if (index > -1) {
                var record = storeSO.getAt(index);
                return record.get('category_name');
            }
        }

        //fin combo SO

        //inicio combo SO
        storeCostCode2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'category_name'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=costcode2'
        });
        // storeSO = new Ext.data.JsonStore({
        //     root: 'datos',
        //     fields: ['id', 'category_name'],
        //     autoLoad: true,
        //     data: {
        //         datos: [
        //             {"id": 1, "category_name": "SO1"},
        //             {"id": 2, "category_name": "SO2"},
        //             {"id": 3, "category_name": "SO3"},
        //             {"id": 4, "category_name": "SO4"}
        //         ]
        //     }
        // });

        var comboSO = new Ext.form.ComboBox({
            id: 'comboSO',
            store: storeSO,
            valueField: 'id',
            displayField: 'category_name',
            triggerAction: 'all',
            mode: 'local'
        });

        function costSO(id) {
            var index = storeSO.find('id', id);
            if (index > -1) {
                var record = storeSO.getAt(index);
                return record.get('category_name');
            }
        }

        //fin combo SO


        //inicio combo tipo documento  TID
        storeTID = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Denuncia"},
                    {"id": 2, "nombre": "Comunicado"},
                    {"id": 3, "nombre": "Oficio"},
                    {"id": 4, "nombre": "Memorando"}
                ]
            }
        });

        var comboTID = new Ext.form.ComboBox({
            id: 'comboTID',
            store: storeTID,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            //allowBlank: true
        });

        function personaTipoDocumento(id) {
            var index = storeTID.find('id', id);
            if (index > -1) {
                var record = storeTID.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo documento  TID


        //inicio combo RAZON DEVOLUCIÓN
        storeRazonDevolucion = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "No es competencia de PMA (humedad)"},
                    {"id": 2, "nombre": "Requisitos incompletos"},
                    {"id": 3, "nombre": "Inicio de trámite en otra dependencia"},
                ]
            }
        });

        var comboRazonDevolucion = new Ext.form.ComboBox({
            id: 'comboRazonDevolucion',
            store: storeRazonDevolucion,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            //allowBlank: true
        });

        function razonDevolucion(id) {
            var index = storeRazonDevolucion.find('id', id);
            if (index > -1) {
                var record = storeRazonDevolucion.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Razon Devolucion

        //inicio combo reasignacion  REATOT
        storeREATOT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadestotal'
        });

        //inicio combo persona recepta la denuncia PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalsecretaria'

        });


        //inicio combo caracter del tramite CDT
        storeCDT = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Ordinario"},
                    {"id": 2, "nombre": "Urgente"}
                ]
            }
        });

        //inicio combo caracter del tramite CDT
        storePRIORIDAD = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Bajo"},
                    {"id": 1, "nombre": "Medio"},
                    {"id": 2, "nombre": "Alto"}
                ]
            }
        });

        //inicio combo caracter del tramite CDT
        storeINSPECCIONFIN = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "No"},
                    {"id": 1, "nombre": "Si"},
                    {"id": 2, "nombre": "Pendiente"}
                ]
            }
        });

        //inicio combo aprobación secretaría inspección
        storeAPROBADO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Verificado"},
                    {"id": 2, "nombre": "Devuelto"},
                    {"id": 0, "nombre": "Pendiente"}
                ]
            }
        });

        //Inicio combo Asunto - Control programado
        storeASUNTO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 8, "nombre": "Construcción informal"},
                    {"id": 7, "nombre": "Anulado"},
                    {"id": 6, "nombre": "Actualización/homologación"},
                    {"id": 5, "nombre": "Alcance informe anterior"},
                    {"id": 4, "nombre": "Anulado por usuario"},
                    {"id": 3, "nombre": "Edificaciones - seguimiento"},
                    {"id": 2, "nombre": "Contestación a oficio"},
                    {"id": 1, "nombre": "Control edificaciones"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //Inicio combo Asunto - Tipo trámite
        storeTIPOTRAMITE = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Sin selección"},
                    {"id": 1, "nombre": "Control programado 1"},
                    {"id": 2, "nombre": "Control programado 2"},
                    {"id": 3, "nombre": "Control programado 3"},
                    {"id": 4, "nombre": "Control programado 4"},
                    {"id": 5, "nombre": "Control programado 5"},
                    {"id": 6, "nombre": "Control programado 6"},
                    {"id": 7, "nombre": "Control programado 7"},
                    {"id": 8, "nombre": "Control programado 8"},
                    {"id": 9, "nombre": "Control final"},
                    {"id": 10, "nombre": "Control rutinario"},
                    {"id": 11, "nombre": "Control seguimientos"},
                    {"id": 12, "nombre": "Control técnico"},
                    {"id": 13, "nombre": "Contestación a oficio"},
                    {"id": 14, "nombre": "Control documentos"},
                    {"id": 15, "nombre": "Control medidas de mitigación EPMMOP"},
                    {"id": 16, "nombre": "Control áreas históricas"},
                    {"id": 17, "nombre": "Alcance informe anterior"},
                    {"id": 18, "nombre": "Informe de verificación"},
                    {"id": 19, "nombre": "Anulado mediante documento"},
                    {"id": 20, "nombre": "Homologación por pedido de administración zonal"}
                ]
            }
        });

        //inicio combo aprobación o registro de planos
        storeAPROBACIONPLANOS = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 7, "nombre": "Unificación de predios"},
                    {"id": 6, "nombre": "Actualización/reconocimiento edificaciones"},
                    {"id": 5, "nombre": "Ampliatorio"},
                    {"id": 4, "nombre": "Nuevo"},
                    {"id": 3, "nombre": "Modificatorio-apliatorio"},
                    {"id": 2, "nombre": "Modificatorio"},
                    {"id": 1, "nombre": "Aprobado"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //inicio combo estado de obra
        storeESTADOOBRA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 14, "nombre": "Derrocamiento"},
                    {"id": 13, "nombre": "Obra suspendida"},
                    {"id": 12, "nombre": "No fue posible ubicar el predio"},
                    {"id": 11, "nombre": "No se permitió ingreso a obra"},
                    {"id": 10, "nombre": "Revisión en planos"},
                    {"id": 9, "nombre": "Terminada y/o en funcionamiento"},
                    {"id": 8, "nombre": "Terminada y/o habitada"},
                    {"id": 7, "nombre": "Terminada"},
                    {"id": 6, "nombre": "En acabados"},
                    {"id": 5, "nombre": "Obra gris"},
                    {"id": 4, "nombre": "Mampostería"},
                    {"id": 3, "nombre": "Estructura y losas"},
                    {"id": 2, "nombre": "Cimentación"},
                    {"id": 1, "nombre": "No construida"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //Inicio combo Asunto - Control programado
        storeINVENTARIADO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 2, "nombre": "No"},
                    {"id": 1, "nombre": "Si"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //inicio combo tipo acta inspección
        storeTIPOACTAINSP = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Otro tipo"},
                    {"id": 1, "nombre": "Infracción"},
                    {"id": 7, "nombre": "Advertencia"},
                    {"id": 5, "nombre": "Conformidad"},
                    {"id": 4, "nombre": "Obstrucción"}
                ]
            }
        });

        var comboTIPOACTAINSP = new Ext.form.ComboBox({
            id: 'comboTIPOACTAINSP',
            store: storeTIPOACTAINSP,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function tipoActaPlanificacionmicro(id) {
            var index = storeTIPOACTAINSP.find('id', id);
            if (index > -1) {
                var record = storeTIPOACTAINSP.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }
        }

        //inicio combo aprobación secretaría inspección
        storeMOTIVOACTA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "De oficio"},
                    {"id": 1, "nombre": "Atención a trámite"},
                    {"id": 2, "nombre": "Denuncia"},
                    {"id": 3, "nombre": "Denuncia redes sociales"},
                    {"id": 4, "nombre": "Operativo"},
                    {"id": 5, "nombre": "Pedido del director"},
                    {"id": 6, "nombre": "Pedido de instrucción"},
                    {"id": 7, "nombre": "Pedido de resolución"},
                ]
            }
        });

        //inicio combo aprobación secretaría inspección
        storeACTAVERIFICACION = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Otro"},
                    {"id": 1, "nombre": "Acta"},
                    {"id": 2, "nombre": "Memo"},
                    {"id": 3, "nombre": "Oficio"},
                    {"id": 4, "nombre": "Informe"},
                    {"id": 5, "nombre": "Guía"}
                ]
            }
        });

        var comboMOTIVOACTA = new Ext.form.ComboBox({
            id: 'comboMOTIVOACTA',
            store: storeMOTIVOACTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboACTAVERIFICACION = new Ext.form.ComboBox({
            id: 'comboACTAVERIFICACION',
            store: storeACTAVERIFICACION,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function motivoActa(id) {
            var index = storeMOTIVOACTA.find('id', id);
            if (index > -1) {
                var record = storeMOTIVOACTA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }
        }

        function actaVerificacion(id) {
            var index = storeACTAVERIFICACION.find('id', id);
            if (index > -1) {
                var record = storeACTAVERIFICACION.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }
        }

        //inicio combo guia  REAGUIA
        storeREAGUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=guia'
        });

        //inicio combo tipo de actividad
        storeACTIVIDAD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre_actividad'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tipo_actividad'
        });

        //inicio combo unidad asignada Inspección
        storePERDIS = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personal_distributivo'
        });

        //inicio combo unidad asignada Inspección
        storeACTUALIZARFECHA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'fecha_asignacion'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=actualizar_fecha'
        });

        //inicio combo unidad asignada Inspección
        storeFUNREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personal_distributivo'
        });

        //inicio combo activo

        storeOFAC = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'true', "nombre": "Si"},
                    {"id": 'false', "nombre": "No"},
                    {"id": '', "nombre": "No"}
                ]
            }
        });

        //inicio combo Estado Recepcion Información Planificacionmicro ESREA
        storeESREA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Sin información"},
                    {"id": 1, "nombre": "Conforme"},
                    {"id": 2, "nombre": "Inconforme"}
                ]
            }
        });

        //inicio combo actividad  ACTA
        storeACTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=depPlanificacionmicro'
        });

        //inicio combo ZONA
        storeZONA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboZONA = new Ext.form.ComboBox({
            id: 'comboZONA',
            store: storeZONA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });
        var comboZONA2 = new Ext.form.ComboBox({
            id: 'comboZONA24',
            store: storeZONA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            listeners: {
                select: function (combo, record) {
                    comboPARROQUIA.enable();			//step 2
                    comboPARROQUIA.clearValue();		//step 3
                    storePARROQUIA.load({			//step 4
                        params: {
                            id: record.get('id')	//step 5
                        }
                    });
                }
            }
        });
        var comboZONA3 = new Ext.form.ComboBox({
            id: 'comboZONA3',
            store: storeZONA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            listeners: {
                select: function (combo, record) {
                    comboPARROQUIA2.enable();			//step 2
                    comboPARROQUIA2.clearValue();		//step 3
                    storePARROQUIA.load({			//step 4
                        params: {
                            id: record.get('id')	//step 5
                        }
                    });
                }
            }
        });

        function zonaAdm(id) {
            var index = storeZONA.find('id', id);
            if (index > -1) {
                var record = storeZONA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ZONA

        //inicio combo PARROQUIA
        storePARROQUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=parroquias'
        });

        this.storePARROQUIA = storePARROQUIA;

        var comboPARROQUIA = new Ext.form.ComboBox({
            id: 'comboPARROQUIA',
            store: storePARROQUIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            listeners: {
                select: function (combo, record) {
                    comboSECTORES.enable();			//step 2
                    comboSECTORES.clearValue();		//step 3
                    storeSECTORES.load({			//step 4
                        params: {
                            id: record.get('id')	//step 5
                        }
                    });
                }
            }
        });

        var comboPARROQUIA2 = new Ext.form.ComboBox({
            id: 'comboPARROQUIA2',
            store: storePARROQUIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            listeners: {
                select: function (combo, record) {
                    comboSECTORES2.enable();			//step 2
                    comboSECTORES2.clearValue();		//step 3
                    storeSECTORES.load({			//step 4
                        params: {
                            id: record.get('id')	//step 5
                        }
                    });
                }
            }
        });


        function parroquiaAdm(id) {
            var index = storePARROQUIA.findExact('id', id);
            if (index > -1) {
                var record = storePARROQUIA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo

        //inicio combo SECTORES
        storeSECTORES = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=sectores'
        });

        var comboSECTORES = new Ext.form.ComboBox({
            id: 'comboSECTORES',
            store: storeSECTORES,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });


        var comboSECTORES2 = new Ext.form.ComboBox({
            id: 'comboSECTORES2',
            store: storeSECTORES,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function sectoresAdm(id) {
            var index = storeSECTORES.findExact('id', id);
            if (index > -1) {
                var record = storeSECTORES.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo

        //inicio combo denuncias ordenanza DETIORD
        storeORD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboORD = new Ext.form.ComboBox({
            id: 'comboORD',
            store: storeORD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            //allowBlank: false
        });

        //inicio combo denuncias ordenanza DETIORD
        storeINSPORD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboINSPORD = new Ext.form.ComboBox({
            id: 'comboINSPORD',
            store: storeINSPORD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            //allowBlank: false
        });

        var comboCDT = new Ext.form.ComboBox({
            id: 'comboCDT',
            store: storeCDT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboPRIORIDAD = new Ext.form.ComboBox({
            id: 'comboPRIORIDAD',
            store: storePRIORIDAD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboINSPECCIONFIN = new Ext.form.ComboBox({
            id: 'comboINSPECCIONFIN',
            store: storeINSPECCIONFIN,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboAPROBADO = new Ext.form.ComboBox({
            id: 'comboAPROBADO',
            store: storeAPROBADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboASUNTO = new Ext.form.ComboBox({
            id: 'comboASUNTO',
            store: storeASUNTO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboTIPOTRAMITE = new Ext.form.ComboBox({
            id: 'comboTIPOTRAMITE',
            store: storeTIPOTRAMITE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboAPROBACIONPLANOS = new Ext.form.ComboBox({
            id: 'comboAPROBACIONPLANOS',
            store: storeAPROBACIONPLANOS,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboESTADOOBRA = new Ext.form.ComboBox({
            id: 'comboESTADOOBRA',
            store: storeESTADOOBRA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboLISTADOESTADOOBRA = new Ext.form.ComboBox({
            id: 'comboLISTADOESTADOOBRA',
            store: storeESTADOOBRA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboINVENTARIADO = new Ext.form.ComboBox({
            id: 'comboINVENTARIADO',
            store: storeINVENTARIADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function inventariado(id) {
            var index = storeINVENTARIADO.find('id', id);
            if (index > -1) {
                var record = storeINVENTARIADO.getAt(index);
                return record.get('nombre');
            }
        }

        function listaOrdenanzas(id) {
            var index = storeORD.find('id', id);
            if (index > -1) {
                var record = storeORD.getAt(index);
                return record.get('nombre');
            }
        }

        function asunto(id) {
            var index = storeASUNTO.find('id', id);
            if (index > -1) {
                var record = storeASUNTO.getAt(index);
                return record.get('nombre');
            }
        }

        function tipoTramite(id) {
            var index = storeTIPOTRAMITE.find('id', id);
            if (index > -1) {
                var record = storeTIPOTRAMITE.getAt(index);
                return record.get('nombre');
            }
        }

        function aprobacionPlanos(id) {
            var index = storeAPROBACIONPLANOS.find('id', id);
            if (index > -1) {
                var record = storeAPROBACIONPLANOS.getAt(index);
                return record.get('nombre');
            }
        }

        function estadoObra(id) {
            var index = storeESTADOOBRA.find('id', id);
            if (index > -1) {
                var record = storeESTADOOBRA.getAt(index);
                return record.get('nombre');
            }
        }

        function caracterTramite(id) {
            var index = storeCDT.find('id', id);
            if (index > -1) {
                var record = storeCDT.getAt(index);
                // return record.get('nombre');
                if (record.get('nombre') == 'Ordinario') {
                    return '<span style="color:darkgreen; font-weight:bold !important">' + record.get('nombre') + '</span>';
                } else {
                    return '<span style="color:red; font-weight:bold !important">' + record.get('nombre') + '</span>';
                }
            }
        }

        function prioridad(id) {
            var index = storePRIORIDAD.find('id', id);
            if (index > -1) {
                var record = storePRIORIDAD.getAt(index);
                // return record.get('nombre');
                if (record.get('nombre') == 'Bajo') {
                    return '<span style="color:darkgreen; font-weight:bold !important">' + record.get('nombre') + '</span>';
                } else if (record.get('nombre') == 'Medio') {
                    return '<span style="color:darkorange; font-weight:bold !important">' + record.get('nombre') + '</span>';
                } else {
                    return '<span style="color:red; font-weight:bold !important">' + record.get('nombre') + '</span>';
                }
            }
        }

        function planificacionmicroFin(id) {
            var index = storeINSPECCIONFIN.find('id', id);
            if (index > -1) {
                var record = storeINSPECCIONFIN.getAt(index);
                return record.get('nombre');
            }
        }

        function aprobacion(id) {
            var index = storeAPROBADO.find('id', id);
            if (index > -1) {
                var record = storeAPROBADO.getAt(index);
                // return record.get('nombre');
                if (record.get('nombre') == 'Verificado') {
                    return '<span style="color:darkgreen; font-weight:bold !important">' + record.get('nombre') + '</span>';
                } else {
                    return '<span style="color:red; font-weight:bold !important">' + record.get('nombre') + '</span>';
                }
            }
        }

        //fin  combo denuncias ordenanza

        //inicio combo reasignacion  REA
        storeREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre', 'orden'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidades',
            remoteSort: true, //true for server sorting
            sorters: [{
                property: 'orden',
                direction: 'ASC' // or 'ASC'
            }],
        });

        //inicio combo instituciones INST
        storeINST = new Ext.data.JsonStore({
            root: 'data',
            fields: ['nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=instituciones'

        });

        var comboINST = new Ext.form.ComboBox({
            id: 'comboINST',
            store: storeINST,
            valueField: 'nombre',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            allowBlank: false
        });


        function departamentoReasignacion(id) {
            var index = storeREA.find('id', id);
            if (index > -1) {
                var record = storeREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }

        storeREA.sort('orden', 'ASC');
        var comboREA = new Ext.form.ComboBox({
            id: 'comboREA',
            store: storeREA,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        storeACTIVIDAD.sort('orden', 'ASC');
        var comboACTIVIDAD = new Ext.form.ComboBox({
            id: 'comboACTIVIDAD',
            store: storeACTIVIDAD,
            valueField: 'id',
            displayField: 'nombre_actividad',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false
        });


        storePERDIS.sort('orden', 'ASC');
        var comboINSPECTOR = new Ext.form.ComboBox({
            id: 'comboINSPECTOR',
            store: storePERDIS,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus: true,
            disabled: false
        });
        comboINSPECTOR.on('select', function () {
            AppMsg.setAlert("Alerta ", 'Funcionario asignado');
            // this.gridCCFPlanificacionmicro.stopEditing();
            // this.storeCCFPlanificacionmicro.insert(0, planificacionmicro);

        })

        storeFUNREA.sort('orden', 'ASC');
        var comboFUNREA = new Ext.form.ComboBox({
            id: 'comboFUNREA',
            store: storeFUNREA,
            valueField: 'id',
            displayField: 'nombre',
            //mode: 'local',
            forceSelection: false,
            triggerAction: 'all',
            allowBlank: true
        });

        function tipoActividad(id) {
            var index = storeACTIVIDAD.find('id', id);
            if (index > -1) {
                var record = storeACTIVIDAD.getAt(index);
                return record.get('nombre_actividad');
            }
        }

        function tipoUnidadesPersonal(id) {
            var index = storePERDIS.findExact('id', id);
            if (index > -1) {
                var record = storePERDIS.getAt(index);
                return record.get('nombre');
            }
        }

        function tipoFuncionarioReasignacion(id) {
            var index = storeFUNREA.find('id', id);
            if (index > -1) {
                var record = storeFUNREA.getAt(index);
                return record.get('nombre');
            }
        }

        storePERDIS.sort('orden', 'ASC');
        var comboPERDIS = new Ext.form.ComboBox({
            id: 'comboPERDIS',
            store: storePERDIS,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus: true,
            disabled: false
        });
        comboPERDIS.on('select', function () {
            //AppMsg.setAlert("Alerta ", planificacionmicroSeleccionada);
            //AppMsg.setAlert("Alerta ", tramiteSeleccionado);
            //storeACTUALIZARFECHA.load({params: {id_planificacionmicro: planificacionmicroSeleccionada}});
            //storeACTUALIZARFECHA.load();
        })

        storePERDIS.sort('orden', 'ASC');
        var comboINSP = new Ext.form.ComboBox({
            id: 'comboINSP',
            store: storePERDIS,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus: true,
            disabled: false
        });
        comboINSP.on('select', function () {
            //AppMsg.setAlert("Alerta ", planificacionmicroSeleccionada);
            //AppMsg.setAlert("Alerta ", tramiteSeleccionado);
            //storeACTUALIZARFECHA.load({params: {id_planificacionmicro: planificacionmicroSeleccionada}});
            //storeACTUALIZARFECHA.load();
        })

        var searchFieldBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'grant_number',
                        scope: this,
                        text: 'Grant Number'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'num_documento',
                        scope: this,
                        text: 'Número documento'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'remitente',
                        scope: this,
                        text: 'Remitente'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'recepcion_documento',
                        scope: this,
                        text: 'Fecha Ingreso'
                    }, {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'cedula',
                        scope: this,
                        text: 'Cédula'
                    }, {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'email',
                        scope: this,
                        text: 'Email'
                    }, {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'institucion',
                        scope: this,
                        text: 'Entidad'
                    }, {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'asunto',
                        scope: this,
                        text: 'Asunto'
                    }, {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'guia',
                        scope: this,
                        text: 'Guía'
                    }
                ]
            })
            , text: 'Código trámite'
        });

        var searchListadoInpeccionesBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'codigo_tramite',
                        scope: this,
                        text: 'Código trámite'
                    }
                    , {
                        checked: true,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'id_planificacionmicro',
                        scope: this,
                        text: 'Código inspección'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'nombre_denunciado',
                        scope: this,
                        text: 'Nombre denunciado'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'funcionario_entrega',
                        scope: this,
                        text: 'Inspector'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'predio',
                        scope: this,
                        text: 'Predio'
                    }, {
                        checked: false,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'guia',
                        scope: this,
                        text: 'Guia'
                    }, {
                        checked: false,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'id_acta',
                        scope: this,
                        text: 'Número documento'
                    }
                ]
            })
            , text: 'Código trámite'
        });

        var searchPlanificacionmicroBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'id_planificacionmicro',
                        scope: this,
                        text: 'Código inspección'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerPlanificacionmicro,
                        group: 'filterField',
                        key: 'nombre_denunciado',
                        scope: this,
                        text: 'Nombre denunciado'
                    }
                ]
            })
            , text: 'Código trámite'
        });
        this.storeModuloPlanificacionmicro.load();
        this.storeDetallePlanificacionmicro.load();
        this.storeCostoMacro.load();
        this.storePlanificacionmicrodet.load();

        // if (todosInspectores == true) {
        this.storeListadoPlanificacionmicro.load();
        // } else {
        // this.storeListadoTodosInspectores.load();
        // }

        storeModuloPlanificacionmicro = this.storeModuloPlanificacionmicro;
        limiteModuloPlanificacionmicro = 100;
        storeDetallePlanificacionmicro = this.storeDetallePlanificacionmicro;
        limiteDetallePlanificacionmicro = 10;
        limiteDetallePlanificacionmicroLarge = 100;
        storeCostoMacro = this.storeCostoMacro;
        var anchoHelp = 43;
        var altoHelp = 185;
        storePlanificacionmicrodet = this.storePlanificacionmicrodet;
        storeModuloPlanificacionmicro.baseParams = {
            limit: limiteModuloPlanificacionmicro
        };

        //Inicio formato grid Planificacionmicro
        this.gridModuloPlanificacionmicro = new Ext.grid.EditorGridPanel({
            id: 'gridModuloPlanificacionmicro',
            xtype: "grid",
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight -altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            store: this.storeModuloPlanificacionmicro,
            columns: [
                //Definición de campos bdd Planificacionmicro
                new Ext.grid.RowNumberer(),
                {
                    header: 'Grant Number CSP',
                    dataIndex: 'grant_number',
                    sortable: true,
                    width: 38,
                    editor: textField
                },
                {
                    header: 'Estado',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'CRN',
                    dataIndex: 'crn',
                    sortable: true,
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Donor',
                    dataIndex: 'donor',
                    sortable: true,
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Comments',
                    dataIndex: 'comments',
                    sortable: true,
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Year contribution',
                    dataIndex: 'year_contribution',
                    sortable: true,
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'ISC',
                    dataIndex: 'isc',
                    sortable: true,
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Total Grant Value without ISC',
                    dataIndex: 'total_grant',
                    sortable: true,
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Grant TOD',
                    dataIndex: 'grant_tod',
                    sortable: true,
                    width: 40,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i:s'
                    })
                },
                {
                    header: 'Grant TDD',
                    dataIndex: 'grant_tdd',
                    sortable: true,
                    width: 40,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i:s'
                    })
                },
                {
                    header: 'Grant Specific',
                    dataIndex: 'grant_specific',
                    sortable: true,
                    width: 25,
                    editor: textField
                    // editor: comboGrant, renderer: personaTipoDocumento
                },
                {
                    header: 'Activity',
                    dataIndex: 'activity',
                    sortable: true,
                    width: 22,
                    editor: textField
                    // editor: new Ext.form.TextField({allowBlank: false})
                },


            ],
            viewConfig: {
                forceFit: winWidth > 1024 ? true : false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        //select_codigo_tramite = rec.id;
                        storeDetallePlanificacionmicro.load({params: {id: rec.id}});
                        tramiteSeleccionado = rec.id;
                        planificacionmicroSeleccionada = rec.id_denuncia;
                        //storeDetallePlanificacionmicro.load({params: {filterText: rec.data.codigo_tramite}});
                        if (creacionDatosPlanificacionmicro) {
                            Ext.getCmp('btnNuevoDetallePlanificacionmicro').setDisabled(false);
                            Ext.getCmp('btnEliminarDetallePlanificacionmicro').setDisabled(false);
                            // Ext.getCmp('checkTodasPlanificacionmicro').setValue(false);
                            // Ext.getCmp('gridDetalleTodasPlanificacionmicro').setVisible(false);
                            Ext.getCmp('gridDetallePlanificacionmicro').setVisible(true);
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloPlanificacionmicro,
                store: storeModuloPlanificacionmicro,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - PMA',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid Planificacionmicro

        //inicio mantenimiento PlanificacionmicroActa
        var proxyPlanificacionmicroActa = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudPlanificacionmicroActa.php?operation=insert",
                read: urlPlanificacionmicro + "crudPlanificacionmicroActa.php?operation=select",
                update: urlPlanificacionmicro + "crudPlanificacionmicroActa.php?operation=update",
                destroy: urlPlanificacionmicro + "crudPlanificacionmicroActa.php?operation=delete"
            }
        });

        var readerPlanificacionmicroActa = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'numero', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'id_member', allowBlank: false},
                {name: 'creado', allowBlank: false}
            ]
        });

        var writerPlanificacionmicroActa = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePlanificacionmicroActa = new Ext.data.Store({
            id: "id",
            proxy: proxyPlanificacionmicroActa,
            reader: readerPlanificacionmicroActa,
            writer: writerPlanificacionmicroActa,
            autoSave: true
        });
        this.storePlanificacionmicroActa.load();

        this.gridPlanificacionmicroActa = new Ext.grid.EditorGridPanel({
            id: 'gridPlanificacionmicroActa',
            xtype: "grid",
            height: 200,
            store: this.storePlanificacionmicroActa,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id',
                    dataIndex: 'id',
                    sortable: true,
                    width: 5
                }, {
                    header: 'Número',
                    dataIndex: 'numero',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Unidad Enviada',
                    dataIndex: 'unidad',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Fecha',
                    dataIndex: 'creado',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Encargado',
                    dataIndex: 'id_member',
                    sortable: true,
                    width: 40
                }
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: false,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        storePlanificacionmicroActaSimple.load({
                            params: {
                                filterField: 'guia',
                                filterText: rec.get("numero")
                            }
                        })
                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storePlanificacionmicroActa,
                displayInfo: true,
                displayMsg: 'Mostrando actas {0} - {1} de {2} PMA',
                emptyMsg: "No existen nada  que mostrar"
            }),
        });

        //fin mantenimiento PlanificacionmicroActa

        // Inicio mantenimiento PlanificacionmicroActa simple
        this.storePlanificacionmicroActaSimple = new Ext.data.Store({
            id: "id",
            proxy: proxyDetallePlanificacionmicro,
            reader: readerDetallePlanificacionmicro,
            writer: writerDetallePlanificacionmicro,
            autoSave: accesosSupervision, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storePlanificacionmicroActaSimple = this.storePlanificacionmicroActaSimple
        this.gridPlanificacionmicroActaSimple = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            height: 100,
            store: this.storePlanificacionmicroActaSimple,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_planificacionmicro', sortable: true, width: 90},
                //{header: 'Codificacion', dataIndex: 'codificacion', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                {
                    header: 'Codificacion',
                    dataIndex: 'id_actividad',
                    sortable: true,
                    width: 140,
                    renderer: tipoActividad
                },
                {
                    header: 'Nombre denunciado',
                    dataIndex: 'nombre_denunciado',
                    sortable: true,
                    width: 180,
                },
                {
                    header: 'Zonal', dataIndex: 'id_zona', sortable: true, width: 120,
                    renderer: zonaAdm
                },
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 150},
                {
                    header: 'Inspector',
                    dataIndex: 'funcionario_entrega',
                    sortable: true,
                    width: 200,
                    renderer: tipoUnidadesPersonal
                },
                {
                    header: 'Fecha asignación',
                    dataIndex: 'fecha_asignacion',
                    sortable: true,
                    width: 120,
                    allowBlank: true
                    ,
                    renderer: formatDate
                },
                {
                    header: 'Funcionario Reasignación',
                    dataIndex: 'funcionario_reasignacion',
                    sortable: true,
                    width: 200,
                    renderer: tipoFuncionarioReasignacion
                },
                {header: 'Guia', dataIndex: 'guia', sortable: true, width: 100},
                {header: 'Sumilla DMI', dataIndex: 'fecha_despacho', sortable: true, width: 120, allowBlank: true},
                //{header: 'Acta', dataIndex: 'id_acta', sortable: true, width: 100 },
                {
                    header: 'Prioridad', dataIndex: 'prioridad', sortable: true, width: 100,
                    renderer: prioridad
                },
                {
                    header: 'Fecha memo/oficio',
                    dataIndex: 'fecha_memo_oficio',
                    sortable: true,
                    width: 150,
                    allowBlank: true
                    ,
                    renderer: formatDate
                },
                {
                    header: 'Num memo/oficio',
                    dataIndex: 'numero_memo_oficio',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Cargo (enviado)',
                    dataIndex: 'cargo_enviado',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Institución recibe',
                    dataIndex: 'institucion_recibe',
                    sortable: true,
                    width: 150
                },
                {header: 'Num acta', dataIndex: 'numero_acta', sortable: true, width: 150, editor: textFieldDetalle},
                {
                    header: 'Num informe',
                    dataIndex: 'numero_informe',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Ordenanza aplicada',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 180,
                    renderer: listaOrdenanzas
                },
                {header: 'Infraccion', dataIndex: 'infraccion', sortable: true, width: 150},
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 150
                }
            ],

            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom

        });

        // Inicio mantenimiento CostoMacro
        this.gridCostoMacro = new Ext.grid.EditorGridPanel({
            id: 'gridCostoMacro',
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight -altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            readOnly: false,
            store: this.storeCostoMacro,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Cost Code',
                    dataIndex: 'cost_code',
                    sortable: true,
                    width: 200,
                    editor: comboCOSTPARENTDET,
                    renderer: costparentAdmDet
                },
                // {header: 'Cost Detail', dataIndex: 'id_cost_detail', sortable: true, width: 100, editor: comboCOSTPARENTDET, renderer: costparentAdmDet },
                {
                    header: 'Total',
                    dataIndex: 'total',
                    hidden: false,
                    width: 80,
                    renderer: 'usMoney',
                    editor: textFieldDetalle
                },
                // {
                //     header: 'Fecha de Registro',
                //     dataIndex: 'fecha_registro',
                //     hidden: false,
                //     width: 120,
                //     renderer: formatDate,
                //     editor: new Ext.ux.form.DateTimeField({
                //         dateFormat: 'Y-m-d',
                //         timeFormat: 'H:i:s'
                //     })
                // },
                {
                    header: 'DOC',
                    dataIndex: 'doc',
                    hidden: false,
                    width: 80,
                    renderer: 'usMoney',
                    editor: textFieldDetalle
                },
                {
                    header: 'DSC',
                    dataIndex: 'dsc',
                    hidden: false,
                    width: 80,
                    renderer: 'usMoney',
                    editor: textFieldDetalle
                },
                {
                    header: 'Adjust',
                    dataIndex: 'adjust',
                    hidden: false,
                    width: 100,
                    renderer: 'usMoney',
                    editor: textFieldDetalle
                },
                {header: 'Comment', dataIndex: 'comment', hidden: false, width: 100, editor: textFieldDetalle},
                {
                    header: 'Total adjusted',
                    dataIndex: 'total_adjusted',
                    hidden: false,
                    width: 100,
                    renderer: 'usMoney',
                    editor: textFieldDetalle
                },

                // {header: 'Total Grant V. I Quarter', dataIndex: 'total_grant_q1', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant V. II Quarter', dataIndex: 'total_grant_q2', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant V. III Quarter', dataIndex: 'total_grant_q3', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant V. IV Quarter', dataIndex: 'total_grant_q4', hidden: false, width: 140, editor: textFieldDetalle},
                // {header: 'Total Grant V. DOC ', dataIndex: 'total_grant_prog_doc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant V. DSC', dataIndex: 'total_grant_prog_dsc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total PR and PO - DOC', dataIndex: 'total_pr_po_doc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Actuals DOC', dataIndex: 'total_actuals_doc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant Value Balance DOC', dataIndex: 'total_balance_doc', hidden: false, width: 170, editor: textFieldDetalle},
                // {header: 'Total PR and PO - DSC', dataIndex: 'total_pr_po_dsc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Actuals DSC ', dataIndex: 'total_actuals_dsc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant Value Balance DSC', dataIndex: 'total_grant_balance_dsc', hidden: false, width: 170, editor: textFieldDetalle}
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
              singleSelect: true,
              listeners: {
                  rowselect: function (sm, row, rec) {
                      // recuperamos la informacion de personal asignado a ese operativo
                      select_macro = rec.id;


                      storePlanificacionmicrodet.load({params: {id: rec.id}});

                  }
              }
          }),

            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetallePlanificacionmicro,
                store: storeCostoMacro,
                displayInfo: true,
                displayMsg: 'Mostrando costos macro: {0} - {1} de {2} - PMA',
                emptyMsg: "Seleccione un costo macro"
            }),
            listeners: {
                beforeedit: function (e) {
                    // verficamos que ya no exista el dato
                    if (e.field == "funcionario_entrega") {
                        if (e.record.get('guia') > 0) {
                            Ext.Msg.show({
                                title: 'Error '
                                , msg: 'No se puede modificar una vez generada el acta  '
                                , modal: true
                                , icon: Ext.Msg.ERROR
                                , buttons: Ext.Msg.OK
                            });
                            return false
                        }
                    }

                }

            }

        });
        //Fin CostoMacro

        // Inicio mantenimiento Planificacionmicro
        this.gridDetallePlanificacionmicro = new Ext.grid.EditorGridPanel({
            id: 'gridDetallePlanificacionmicro',
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight -altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            readOnly: false,
            store: this.storeDetallePlanificacionmicro,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Year', dataIndex: 'year', hidden: false, width: 50, editor: textFieldDetalle},
                {
                    header: 'id_pma_contribuciones_detalle',
                    dataIndex: 'id_pma_contribuciones_detalle',
                    hidden: true,
                    width: 50
                },
                {
                    header: 'Strategic Objectives',
                    dataIndex: 'so',
                    sortable: true,
                    width: 125,
                    editor: comboSO,
                    renderer: costSO
                },
                {
                    header: 'Activity',
                    dataIndex: 'activity',
                    sortable: true,
                    width: 129,
                    editor: comboActivities,
                    renderer: costActivities
                },
                // {header: 'Cost Code', dataIndex: 'parent', sortable: true, width: 100, editor: comboCOSTPARENTDET, renderer: costparentAdmDet },
                // {header: 'Cost Detail', dataIndex: 'id_cost_detail', sortable: true, width: 100, editor: comboCOSTPARENTDET, renderer: costparentAdmDet },
                // {header: 'Strategic Objectives', dataIndex: 'parent', sortable: true, width: 100, editor: comboSO, renderer: costSO },
                // {header: 'Activities', dataIndex: 'parent', sortable: true, width: 100, editor: comboActivities, renderer: costActivities },

                // {header: 'Total Grant V. I Quarter', dataIndex: 'total_grant_q1', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant V. II Quarter', dataIndex: 'total_grant_q2', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant V. III Quarter', dataIndex: 'total_grant_q3', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant V. IV Quarter', dataIndex: 'total_grant_q4', hidden: false, width: 140, editor: textFieldDetalle},
                // {header: 'Total Grant V. DOC ', dataIndex: 'total_grant_prog_doc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant V. DSC', dataIndex: 'total_grant_prog_dsc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total PR and PO - DOC', dataIndex: 'total_pr_po_doc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Actuals DOC', dataIndex: 'total_actuals_doc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant Value Balance DOC', dataIndex: 'total_balance_doc', hidden: false, width: 170, editor: textFieldDetalle},
                // {header: 'Total PR and PO - DSC', dataIndex: 'total_pr_po_dsc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Actuals DSC ', dataIndex: 'total_actuals_dsc', hidden: false, width: 130, editor: textFieldDetalle},
                // {header: 'Total Grant Value Balance DSC', dataIndex: 'total_grant_balance_dsc', hidden: false, width: 170, editor: textFieldDetalle}
            ],
            viewConfig: {
                forceFit: false
            },

            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        select_SO = rec.id;


                        storeCostoMacro.load({params: {id: rec.id}});

                        //tramiteSeleccionado = rec.id;
                        //inspeccionSeleccionada = rec.id_denuncia;
                        //storeDetalleInspeccion.load({params: {filterText: rec.data.codigo_tramite}});
                        // if (creacionDatosInspeccion) {
                        //     Ext.getCmp('btnNuevoDetalleInspeccion').setDisabled(false);
                        //     Ext.getCmp('btnEliminarDetalleInspeccion').setDisabled(false);
                        //     // Ext.getCmp('checkTodasInspecciones').setValue(false);
                        //     // Ext.getCmp('gridDetalleTodasInspecciones').setVisible(false);
                        //     Ext.getCmp('gridCostoMacro').setVisible(true);
                        // }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetallePlanificacionmicro,
                store: storeDetallePlanificacionmicro,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - PMA',
                emptyMsg: "Seleccione un trámite"
            }),
            listeners: {
                beforeedit: function (e) {
                    // verficamos que ya no exista el dato
                    if (e.field == "funcionario_entrega") {
                        if (e.record.get('guia') > 0) {
                            Ext.Msg.show({
                                title: 'Error '
                                , msg: 'No se puede modificar una vez generada el acta  '
                                , modal: true
                                , icon: Ext.Msg.ERROR
                                , buttons: Ext.Msg.OK
                            });
                            return false
                        }
                    }

                }

            }

        });


        //Fin formato grid detalle planificacionmicro


        this.gridPlanificacionmicrodet = new Ext.grid.EditorGridPanel({
            id: 'gridPlanificacionmicrodet',
            xtype: "grid",
            height: winHeight -altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            store: this.storePlanificacionmicrodet,
            columns: [
                new Ext.grid.RowNumberer(),
                // {
                //     header: 'id',
                //     dataIndex: 'id',
                //     sortable: true,
                //     width: 5
                // },
                {
                    header: 'Cost Code Micro',
                    dataIndex: 'cost_code_micro',
                    sortable: true,
                    width: 30,
                    editor: comboSO,
                    renderer: costSO
                },
                {
                    header: 'Descripción',
                    dataIndex: 'description_micro',
                    sortable: true,
                    width: 40,
                    editor: textFieldDetalle
                },
                {
                    header: 'Total',
                    dataIndex: 'total_micro',
                    sortable: true,
                    width: 30,
                    editor: textFieldDetalle
                }
                // {
                //     header: 'Encargado',
                //     dataIndex: 'id_member',
                //     sortable: true,
                //     width: 40
                // }
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: false,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        //storePlanificacionmicrodetSimple.load({params: {filterField: 'guia', filterText: rec.get("numero")}})
                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storePlanificacionmicrodet,
                displayInfo: true,
                displayMsg: 'Mostrando pmicro {0} - {1} de {2} PMA',
                emptyMsg: "No existen nada  que mostrar"
            }),
        });

        //fin mantenimiento Planificacionmicrodet


        //Inicio pestaña planificacionmicroes
        this.gridListadoPlanificacionmicro = new Ext.grid.EditorGridPanel({
            id: 'gridListadoPlanificacionmicro',
            //Calculo de tamaño vertical frame inferior de pestaña Planificacionmicro
            height: winHeight * 0.85,
            //Calculo de tamaño vertical frame inferior de pestaña Planificacionmicro
            width: winWidth * 0.99,
            //readOnly: accesosSupervision,
            store: this.storeListadoPlanificacionmicro,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Total Grant Value Programmed I Quarter', dataIndex: 'total_grant_q1', hidden: true},
                {header: 'Total Grant Value Programmed II Quarter', dataIndex: 'total_grant_q2', hidden: true},
                {header: 'Total Grant Value Programmed III Quarter', dataIndex: 'total_grant_q3', hidden: true},
                {header: 'Total Grant Value Programmed IV Quarter', dataIndex: 'total_grant_q4', hidden: true},
                {header: 'Total Grant Value Programmed DOC ', dataIndex: 'total_grant_prog_doc', hidden: true},
                {header: 'Total Grant Value Programmed DSC', dataIndex: 'total_grant_prog_dsc', hidden: true},
                {header: 'Total PR and PO linked to programmed amount DOC', dataIndex: 'total_pr_po_doc', hidden: true},
                {header: 'Total Actuals DOC', dataIndex: 'total_actuals_doc', hidden: true},
                {
                    header: 'Total Grant Value Balance DOC (programmed -actuals - PR - PO)',
                    dataIndex: 'total_balance_doc',
                    hidden: true
                },
                {header: 'Total PR and PO linked to programmed amount DSC', dataIndex: 'total_pr_po_dsc', hidden: true},
                {header: 'Total Actuals DSC ', dataIndex: 'total_actuals_dsc', hidden: true},
                {
                    header: 'Total Grant Value Balance DSC (programmed -actuals - PR - PO)',
                    dataIndex: 'total_grant_balance_dsc',
                    hidden: true
                }

            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloPlanificacionmicro,
                store: this.storeListadoPlanificacionmicro,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - PMA',
                emptyMsg: "Seleccione un trámite"
            })
        });

        //Fin ventana Planificacionmicro

        //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            //Creación de la ventana win
            win = desktop.createWindow({
                id: 'grid-win-moduloPlanificacionmicro',
                //Definición del título de la ventana
                title: 'PLANIFICACIÓN MICRO',
                //Definición de tamaños de la ventana
                width: winWidth,
                height: winHeight,
                iconCls: 'mantenimiento-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                //Creación de panel de pestañas
                items: new Ext.TabPanel({
                    id: 'tabPrincipal',
                    activeTab: 0,
                    border: false,
                    items: [
                        //Pestaña Inspección
                        {
                            title: 'Registro de Contribuciones',
                            autoScroll: true,
                            closable: false,
                            layout: 'border',
//                          disabled: accesosInspectores,
                            hidden: true,
                            id: 'tramites-pendientes',

                            items: [
                                {
                                    region: 'east',
                                    id: 'east-panel',
                                    title: 'Totales',
                                    width: 300,
                                    minSize: 175,
                                    maxSize: 400,
                                    margins: '0 0 0 0',
                                    cmargins: '0 0 0 0',
                                    collapsible: true,
                                    split: true,
                                    layoutConfig: {
                                        animate: true
                                    },
                                    layout: 'column',
                                    autoScroll: true,
                                    items: [{
                                        columnWidth: 1,
                                        baseCls: 'x-plain',
                                        bodyStyle: 'padding:0 0 0 0',
                                        items: [{}]
                                    }]
                                },
                                {
                                    region: 'center',
                                    margins: '0 5 0 0',
                                    layout: 'accordion',
                                     
                                    items: [{
                                        title: 'Paso 1 - Contribuciones',
                                        autoScroll: true,
                                        border: false,
                                        items: this.gridModuloPlanificacionmicro,
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                text: 'Nuevo',
                                                scope: this,
                                                handler: this.addModuloPlanificacionmicro,
                                                disabled: false,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón eliminar
                                            {
                                                text: "Eliminar",
                                                scope: this,
                                                handler: this.deleteModuloPlanificacionmicro,
                                                disabled: true,
                                                //disabled: !creacionTramites,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Recargar datos
                                            {
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataModuloPlanificacionmicro,
                                                scope: this,
                                                text: 'Recargar'
                                            },
                                            '-',
                                            {
                                                xtype: 'checkbox',
                                                boxLabel: 'Pendientes por aprobar ',
                                                id: 'checkPendientesAprobar',
                                                name: 'pendientesAprobar',
                                                checked: accesosSecretaria,
                                                inputValue: '1',
                                                tooltip: 'Recargar datos',
                                                //disabled: !acceso,
                                                cls: 'barramenu',
                                                handler: function (checkbox, isChecked) {
                                                    //Ext.getCmp('tb_repoteDenuncias').setDisabled(!this.checked);
                                                    //Ext.getCmp('tb_seleccionarUnidad').setDisabled(!this.checked);
                                                    //Ext.getCmp('tb_seleccionarUnidad').getValue();
                                                    //storeDenuncias.load({params: {noenviados: isChecked}});
                                                    storeModuloPlanificacionmicro.baseParams = {
                                                        pendientesAprobar: isChecked
                                                    };
                                                    storeModuloPlanificacionmicro.load();
                                                    // if (!this.checked) {
                                                    //Ext.getCmp('tb_seleccionarUnidad').setValue('Seleccionar Unidad');
                                                    //}
                                                }
                                            },
                                            '-',
                                            //bh boton generar
                                            {
                                                iconCls: 'excel-icon',
                                                handler: this.botonGenerarActa,
                                                scope: this,
                                                text: 'Generar Nueva Acta',
                                                tooltip: 'Se genera acta con las ',
                                                id: 'tb_repoteDenuncias',
                                                disabled: false
                                            },
                                            '-',
                                            '->'
                                            , {
                                                text: 'Buscar por:'
                                                , xtype: 'tbtext'
                                            }

                                            , searchFieldBtn
                                            , ' ', ' '
                                            , new QoDesk.QoAdmin.SearchField({
                                                paramName: 'filterText'
                                                , store: this.storeModuloPlanificacionmicro
                                            })
                                        ],
                                    }, {
                                        title: 'Paso 2 - Actividades',
                                        border: false,
                                        autoScroll: true,
                                        items: [this.gridDetallePlanificacionmicro],
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                id: 'btnNuevoDetallePlanificacionmicro',
                                                text: 'Nuevo',
                                                scope: this,
                                                handler: this.addDetallePlanificacionmicro,
                                                disabled: true,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón eliminar
                                            {
                                                id: 'btnEliminarDetallePlanificacionmicro',
                                                text: "Eliminar",
                                                scope: this,
                                                handler: this.deleteDetallePlanificacionmicro,
                                                disabled: true,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Recargar datos
                                            {
                                                id: 'btnRecargarDatosDetallePlanificacionmicro',
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataDetallePlanificacionmicro,
                                                disabled: false,
                                                scope: this,
                                                text: 'Recargar'
                                            }

                                        ]
                                    }, {
                                        title: 'Paso 3 - Costos Macro',
                                        border: false,
                                        autoScroll: true,
                                        items: this.gridCostoMacro,
                                        tbar: [
                                            //Definición de botón nuevo
                                            // tbar: [
                                            //Definición de botón nuevo
                                            {
                                                id: 'btnNuevoCostoMacro',
                                                text: 'Nuevo',
                                                scope: this,
                                                handler: this.addCostoMacro,
                                                disabled: false,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón eliminar
                                            {
                                                id: 'btnEliminarCostoMacro',
                                                text: "Eliminar",
                                                scope: this,
                                                handler: this.deleteCostoMacro,
                                                disabled: true,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Recargar datos
                                            {
                                                id: 'btnRecargarDatosCostoMacro',
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataCostoMacro,
                                                disabled: false,
                                                scope: this,
                                                text: 'Recargar'
                                            }
                                            /*,
                                            '-',
                                            //Definición de botón guardar datos
                                            {
                                                text: 'Guardar datos Inspección',
                                                scope: this,
                                                handler: this.grabardenuncias,
                                                iconCls: 'save-icon',
                                                disabled: !acceso,
                                                id: 'tb_grabardenuncias'
                                                , formBind: true
                                            }*/
                                        ]
                                    }, {
                                        title: 'Paso 4 - Costos Micro',
                                        border: false,
                                        autoScroll: true,
                                        items: [this.gridPlanificacionmicrodet],
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                id: 'btnNuevoDetallePlanificacionmicro2',
                                                text: 'Nuevo',
                                                scope: this,
                                                handler: this.addPlanificacionmicrodet,
                                                disabled: false,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón eliminar
                                            {
                                                id: 'btnEliminarDetallePlanificacionmicro2',
                                                text: "Eliminar",
                                                scope: this,
                                                handler: this.deletePlanificacionmicrodet,
                                                disabled: false,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Recargar datos
                                            {
                                                id: 'btnRecargarDatosDetallePlanificacionmicro2',
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataPlanificacionmicrodet,
                                                disabled: false,
                                                scope: this,
                                                text: 'Recargar'
                                            }
                                            // ,
                                            // '-',
                                            // //Definición de botón guardar datos
                                            // {
                                            //     text: 'Guardar datos Inspección',
                                            //     scope: this,
                                            //     handler: this.grabardenuncias,
                                            //     iconCls: 'save-icon',
                                            //     //disabled: !acceso,
                                            //     id: 'tb_grabardenuncias'
                                            //     , formBind: true
                                            // }
                                        ]
                                    }]
                                }
                            ]
                        },
                        {
                            title: 'Actas',
                            closable: true,
                            layout: 'border',
                            id: 'actas',
                            disabled: accesosInspectores,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDenunciasActa,
                                    scope: this,
                                    text: 'Recargar Datos'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonImprimirActa,
                                    scope: this,
                                    text: 'Imprimir Acta',
                                    tooltip: 'Se reimprime el acta seleccionada.',
                                    id: 'tb_repoteActas',
                                    // disabled: !acceso
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 200,
                                    minSize: 100,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.gridPlanificacionmicroActa

                                },
                                // create instance immediately
                                {

                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                    margins: '0 0 0 0',
                                    items: this.gridPlanificacionmicroActaSimple
                                }
                            ]

                        },
                        {
                            autoScroll: true,
                            title: 'Planificacionmicro',
                            closable: false,
                            id: 'planificacionmicroes',
                            //layout: 'fit',
                            //height: winHeight-70,
                            // disabled: !pestPlanificacionmicro,
                            //Barra de botones
                            tbar: [
                                //Definición de botón Recargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataListadoPlanificacionmicro,
                                    scope: this,
                                    text: 'Recargar'
                                }, '-',
                                {
                                    xtype: 'label',
                                    html: "<object id='clipboard' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='16' height='16' align='middle'><param name='allowScriptAccess' value='always' /><param name='allowFullScreen' value='false' /><param name='movie' value='modules/common/libraries/grid-copy-clipboard/clipboard.swf' /><param name='quality' value='high' /><param name='bgcolor' value='#ffffff' /><param name='wmode' value='transparent' /><param name='flashvars' value='callback=f1' /><embed src='modules/common/libraries/grid-copy-clipboard/clipboard.swf' flashvars='callback=f1' quality='high' swliveconnect='true' bgcolor='#ffffff' width='16' height='16' wmode='transparent' name='clipboard' align='middle' allowscriptaccess='always' allowfullscreen='false' type='application/x-shockwave-flash' pluginspage='http://www.adobe.com/go/getflashplayer' /></object>"
                                },

                                '-',
                                /* {
                                     iconCls: 'reload-icon',
                                     handler: this.f1,
                                     scope: this,
                                     text: 'Recargar'
                                 }, '-',*/
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchListadoInpeccionesBtn
                                , ' ', ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    ,
                                    store: this.storeListadoPlanificacionmicro
                                })
                            ], items: [{
                                id: 'formListadoPlanificacionmicro',
                                titleCollapse: true,
                                flex: 1,
                                autoScroll: true,
                                layout: 'column',
                                items: this.gridListadoPlanificacionmicro
                                //items: this.gridListadoPlanificacionmicro
                            }]
                        }
                    ]
                })
            });
        }
        //Llamado a función que muestra la ventana en pantalla
        win.show();

        setTimeout(function () {
            this.storeModuloPlanificacionmicro.load({
                params: {
                    start: 0,
                    limit: limiteModuloPlanificacionmicro,
                    pendientesAprobar: isChecked
                }
            });
        }, 1500);
    },

    //Función para eliminación de registros de Planificacionmicro
    deleteModuloPlanificacionmicro: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridModuloPlanificacionmicro.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeModuloPlanificacionmicro.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Planificacionmicro
    addModuloPlanificacionmicro: function () {
        var planificacionmicro = new this.storeModuloPlanificacionmicro.recordType({
            grant_number: ' ',
            estado: ' ',
            donor: ' ',
            comments: ' ',
            isc: ' ',
            total_grant: ' ',
            activity: ' ',
            grant_tod: (new Date()),
            grant_tdd: (new Date()),
            grant_specific: ' ',
            year_contribution: (new Date().getFullYear()),
            // codigo_tramite: '',
            // recepción_documento: '',
            // //id_ordenanza: '0',
            // id_tipo_documento: '40',
            // num_documento: 's/n',
            // remitente: ' ',
            // //cedula: '',
            // //email: '',
            // //institucion: '',
            // //asunto: '',
            // id_caracter_tramite: '1',
            // cantidad_fojas: '0',
            // procesado_planificacionmicro: '1'
        });
        this.gridModuloPlanificacionmicro.stopEditing();
        this.storeModuloPlanificacionmicro.insert(0, planificacionmicro);
        this.gridModuloPlanificacionmicro.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloPlanificacionmicro
    requestGridDataModuloPlanificacionmicro: function () {
        this.storeModuloPlanificacionmicro.load();
    },

    f1: function () {
        var format;
        format = SerializationMode.TabDelimited;
        //var s = Ext.getCmp('gridListadoTodosInspectores').store.serializeData(format);
        var s = Ext.getCmp('gridListadoTodosInspectores').store.serializeData(format);
        if (window.clipboardData)
            window.clipboardData.setData('text', s);
        else
            return (s);
    },
    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloPlanificacionmicro
    requestGridDataDenunciasActa: function () {

        this.storePlanificacionmicroActa.load();
    },

    //Función para eliminación de registros de Planificacionmicro
    deleteDetallePlanificacionmicro: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDetallePlanificacionmicro.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDetallePlanificacionmicro.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de planificacionmicro
    addDetallePlanificacionmicro: function () {
        var planificacionmicro = new this.storeDetallePlanificacionmicro.recordType({
            year: '',
            so: 1,
            activity: 1,

            // id_cost: '',
            // id_cost_detail: '',
            // category_name: '',
            // subcategory_name: '',

            // total_grant_q1: '0',
            // total_grant_q2: '0',
            // total_grant_q3: '0',
            // total_grant_q4: '0',
            // total_grant_prog_doc: '0',
            // total_grant_prog_dsc: '0',
            // total_pr_po_doc: '0',
            // total_actuals_doc: '0',
            // total_balance_doc: '0',
            // total_pr_po_dsc: '0',
            // total_actuals_dsc: '0',
            // total_grant_balance_dsc: '0',

        });
        this.gridDetallePlanificacionmicro.stopEditing();
        this.storeDetallePlanificacionmicro.insert(0, planificacionmicro);
        this.gridDetallePlanificacionmicro.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle planificacionmicro
    requestGridDataDetallePlanificacionmicro: function () {
        this.storeDetallePlanificacionmicro.load({
            params: {
                id: tramiteSeleccionado
            }
        });
    },


    //Función para eliminación de registros de Planificacionmicro
    deletePlanificacionmicrodet: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPlanificacionmicrodet.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePlanificacionmicrodet.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de planificacionmicro
    addPlanificacionmicrodet: function () {
        var planificacionmicro = new this.storePlanificacionmicrodet.recordType({
            cost_code_micro: 1,
            description_micro:'',
            total_micro:0

            // total_grant_q1: '0',
            // total_grant_q2: '0',
            // total_grant_q3: '0',
            // total_grant_q4: '0',
            // total_grant_prog_doc: '0',
            // total_grant_prog_dsc: '0',
            // total_pr_po_doc: '0',
            // total_actuals_doc: '0',
            // total_balance_doc: '0',
            // total_pr_po_dsc: '0',
            // total_actuals_dsc: '0',
            // total_grant_balance_dsc: '0',

        });
        this.gridPlanificacionmicrodet.stopEditing();
        this.storePlanificacionmicrodet.insert(0, planificacionmicro);
        this.gridPlanificacionmicrodet.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle planificacionmicro
    requestGridPlanificacionmicrodet: function () {
        this.storePlanificacionmicrodet.load({
            params: {
                id: tramiteSeleccionado
            }
        });
    },


    //Función para eliminación de registros de Inspeccion
    deleteCostoMacro: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridCostoMacro.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeCostoMacro.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de inspeccion
    addCostoMacro: function () {
        var inspeccion = new this.storeCostoMacro.recordType({
            cost_code: 1,
            total: '',
            doc: '',
            dsc: '',
            adjust: '',
            comment: '',
            total_adjusted: '',
            activity: 1,
            id_cost: '',
            id_pma_costos_macro: select_SO,
            fecha_registro: (new Date()),

            // total_grant_q1: '0',
            // total_grant_q2: '0',
            // total_grant_q3: '0',
            // total_grant_q4: '0',
            // total_grant_prog_doc: '0',
            // total_grant_prog_dsc: '0',
            // total_pr_po_doc: '0',
            // total_actuals_doc: '0',
            // total_balance_doc: '0',
            // total_pr_po_dsc: '0',
            // total_actuals_dsc: '0',
            // total_grant_balance_dsc: '0',

        });
        this.gridCostoMacro.stopEditing();
        this.storeCostoMacro.insert(0, inspeccion);
        this.gridCostoMacro.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridDataCostoMacro: function () {
        this.storeCostoMacro.load({
            params: {
                id: select_SO
            }
        });
    },

    //Función para carga de datos
    requestGridData: function () {
        this.storeModuloPlanificacionmicro.load({
            params:
                {
                    start: 0,
                    limit: limiteModuloPlanificacionmicro
                }
        });
    },
    // bh boton generar nueva guía
    botonGenerarActa: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargar acta<br>El estado del trámite será actualizado.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/planificacionmicro/server/generarNuevasGuias.php';
                    setTimeout(function () {
                        AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                        storeModuloPlanificacionmicro.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    }, 1500);
                }
            }
        });
    },

    // bh boton generar nueva guía
    // ?reimpresion=true&guia=' + rows[0].get('id')
    botonImprimirActa: function () {
        // recuperamos registro seleccionado de datagrid denunciaguia
        var rows = this.gridPlanificacionmicroActa.getSelectionModel().getSelections();
        //validamos si existe seleccion  y mensaje error
        if (rows.length === 0) {
            Ext.Msg.show({
                title: 'Atencion',
                msg: 'Seleccione una guía a imprimir',
                scope: this,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
        window.location.href = 'modules/desktop/planificacionmicro/server/generarNuevasGuias.php?reimpresion=true&guia=' + rows[0].get('id');
    },

    //bh boton generar nueva guía
    botonGenerarHojaRuta: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargar hoja de ruta<br>El estado de la inspección será actualizado.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    window.location.href = 'modules/desktop/planificacionmicro/server/generarHojaRuta.php';
                    /*setTimeout(function () {
                        AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                        storeModuloPlanificacionmicro.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    }, 1500);
                    */
                }
            }
        });
    }

});
