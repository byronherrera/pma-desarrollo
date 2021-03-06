var contribucionSeleccionada = '';
var forecastSeleccionada = '';
var costoMacroSeleccionada = '';
var costoMicroSeleccionada = '';

QoDesk.ForecastWindow = Ext.extend(Ext.app.Module, {
    id: 'moduloForecast',
    type: 'desktop/moduloForecast',

    init: function () {
        this.launcher = {
            text: 'Forecast',
            iconCls: 'mantenimiento-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        //Variables de acceso
        var accesosCoordinadorForecast = this.app.isAllowedTo('accesosAdministrador', this.id); //Todos los accesos, visualiza todos los trámites
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id); //Todos los accesos, visualiza trámites pendientes
        var accesosInspectores = this.app.isAllowedTo('accesosForecast', this.id); //Sin acceso a pestaña trámites pendientes, acceso a forecastes asignadas
        var accesosSupervision = this.app.isAllowedTo('accesosSupervision', this.id); //Solo modo lectura

        this.selectContribuciones = 0;
        this.select_SO = 0;
        this.select_macro = 0;

        //Control en caso de tener asignado el perfil de administrador
        if (accesosCoordinadorForecast && accesosSecretaria && accesosInspectores && accesosSupervision == true) {
            accesosSecretaria = false;
            accesosInspectores = false;
            accesosSupervision = false;
        }
        //Acceso para creación y edición en pestaña Datos inspección
        if (accesosCoordinadorForecast || accesosInspectores == true) {
            var creacionDatosForecast = true;
        }
        else {
            var creacionDatosForecast = false;
        }

        //Acceso para creación y edición en pestaña Trámites pendientes
        if (accesosCoordinadorForecast || accesosSecretaria == true) {
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

        var bloqueo = (accesosCoordinadorForecast || accesosSecretaria || accesosInspectores || accesosSupervision) ? true : false

        var desktop = this.app.getDesktop();
        var winHeight = desktop.getWinHeight();
        var winWidth = desktop.getWinWidth();

        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-moduloForecast');

        //Ubicación de la carpeta de Forecast
        var urlForecast = "modules/desktop/forecast/server/";

        var intervalo1 = 30;
        var intervalo2 = 90;


        //incio variables visualizacion
        var textField = new Ext.form.TextField({allowBlank: false, readOnly: false});
        var textField10 = new Ext.form.TextField({allowBlank: false, readOnly: false, maxLength: 10});
        var textField20 = new Ext.form.TextField({allowBlank: false, readOnly: false, maxLength: 20});

        var anio = new Ext.ux.form.SpinnerField({
            fieldLabel: 'Year',
            name: 'year',
            minValue: 2000,
            maxValue: 2030
        });

        var numero = new Ext.form.NumberField({
            allowBlank: false,
            allowNegative: false,
            maxValue: 100000000
        });

        var fecha = new Ext.form.DateField({format: 'Y-m-d'});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d') : '';
        }

        function valueColor(val) {
            if (val > 0) {
                return '<span style="color:green;">' + val + '</span>';
            } else if (val < 0) {
                return '<span style="color:red;">' + val + '</span>';
            }
            return val;
        }

        //fin variables visualizacion

        //Inicio Combos
        storeStatus = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'subcategory_name'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "Ongoing", "subcategory_name": "Ongoing"},
                    {"id": "Closed", "subcategory_name": "Closed"},
                    {"id": "Pending", "subcategory_name": "Pending"}
                ]
            }
        });

        var comboStatus = new Ext.form.ComboBox({
            id: 'comboStatus',
            store: storeStatus,
            valueField: 'id',
            displayField: 'subcategory_name',
            triggerAction: 'all',
            mode: 'local'
        });

        function costStatus(id) {
            return id;
        }

        //fin combo Status

        //inicio combo grant
        storeGrant = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'subcategory_name'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "Yes", "subcategory_name": "Yes"},
                    {"id": "No", "subcategory_name": "No"}
                ]
            }
        });

        var comboGrant = new Ext.form.ComboBox({
            id: 'comboGrant',
            store: storeGrant,
            valueField: 'id',
            displayField: 'subcategory_name',
            triggerAction: 'all',
            mode: 'local'
        });

        function costGrant(id) {
            return id
        }

        //fin combo GRANT
        //fin combos

        //Inicio ventana forecast
        //Definición de url CRUD
        var proxyDetalleForecast = new Ext.data.HttpProxy({
            api: {
                create: urlForecast + "crudDetalleContribuciones.php?operation=insert",
                read: urlForecast + "crudDetalleContribuciones.php?operation=select",
                update: urlForecast + "crudDetalleContribuciones.php?operation=update",
                destroy: urlForecast + "crudDetalleContribuciones-.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Forecast
        var readerDetalleForecast = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_pma_contribuciones', allowBlank: true},
                {name: 'year', allowBlank: false},
                //{name: 'id_cost', allowBlank: true},
                {name: 'so', allowBlank: true},
                {name: 'activity', allowBlank: true},
                {name: 'total', allowBlank: true},
                {name: 'total_planned', allowBlank: true},
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

        //Definición de escritura en campos bdd Forecast
        var writerDetalleForecast = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        //Fin ventana forecast

        //inicio mantenimiento Forecast
        var proxyForecast = new Ext.data.HttpProxy({
            api: {
                create: urlForecast + "crudCostosMicro.php?operation=insert",
                read: urlForecast + "crudCostosMicro.php?operation=select",
                update: urlForecast + "crudCostosMicro.php?operation=update",
                destroy: urlForecast + "crudCostosMicro.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    // en caso que la accion sea update
                    if (action = 'update') {
                        if (typeof res.total !== 'undefined') {
                            if (res.total != '') {
                                AppMsg.setAlert(AppMsg.STATUS_NOTICE, "se paso el valor");
                            }
                        }

                        setTimeout(function () {
                            costCodeNuevo3 = rs.data['cost_code2'];
                            comboCostCode3.clearValue();
                            storeCostCode3.load({
                                params: {
                                    costCodeNuevo3: costCodeNuevo3
                                }
                            });

                            costCodeNuevo5 = rs.data['cost_code4'];
                            comboCostCode5.clearValue();
                            storeCostCode5.load({
                                params: {
                                    costCodeNuevo5: costCodeNuevo5
                                }
                            });

                            costCodeNuevo3 = rs.data['cost_code3'];
                            storeGLCode.load({
                                params: {
                                    costCodeNuevo3: costCodeNuevo3
                                }
                            });
                        }, 700);

                    }
                    // fin  caso que la accion sea update
                }
            }
        });

        var readerForecast = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: true},
                {name: 'id_pma_costos_macro', allowBlank: true},
                {name: 'cost_code2', allowBlank: true},
                {name: 'cost_code3', allowBlank: true},
                {name: 'glcode', allowBlank: true},
                {name: 'glcode1', allowBlank: true},
                {name: 'glcode2', allowBlank: true},
                //{name: 'commitment_description', allowBlank: true},
                {name: 'gl_description', allowBlank: true},
                {name: 'cost_code4', allowBlank: true},
                {name: 'cost_code5', allowBlank: true},
                {name: 'description_micro', allowBlank: true},
                {name: 'total_micro', allowBlank: true},
                {name: 'adjust', allowBlank: true},
                {name: 'total_after_adjust', allowBlank: true}
            ]
        });

        var writerForecast = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeForecast = new Ext.data.Store({
            id: "storeForecast",
            proxy: proxyForecast,
            reader: readerForecast,
            writer: writerForecast,
            autoSave: true,
            listeners: {
                load: function () {
                }
            }
        });
        //this.storeForecast.load();

        //Definición de escritura en campos bdd Forecast
        var writerListadoForecast = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });


        var proxyCostoMacro = new Ext.data.HttpProxy({
            api: {
                create: urlForecast + "crudCostosMacro.php?operation=insert",
                read: urlForecast + "crudCostosMacro.php?operation=select",
                update: urlForecast + "crudCostosMacro.php?operation=update",
                destroy: urlForecast + "crudCostosMacro.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    costCodeNuevo2 = rs.data['cost_code'];
                    comboCostCode2.clearValue();
                    storeCostCode2.load({
                        params: {
                            costCodeNuevo2: costCodeNuevo2
                        }
                    });
                }
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
                {name: 'id_pma_contribuciones_detalle', allowBlank: true},
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

        //Definición de store para módulo Forecast
        this.storeDetalleForecast = new Ext.data.Store({
            id: "storeDetalleForecast",
            proxy: proxyDetalleForecast,
            reader: readerDetalleForecast,
            writer: writerDetalleForecast,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            // autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeCostoMacro = new Ext.data.Store({
            id: "storeCostoMacro",
            proxy: proxyCostoMacro,
            reader: readerCostoMacro,
            writer: writerCostoMacro,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        var checkHandlerForecast = function (item, checked) {
            if (checked) {
                // if (todosInspectores == true) {
                //cc    //var store = this.storeListadoForecast;
                // } else {
                // var store = this.storeListadoTodosInspectores;
                // }
                //var store = this.storeModuloForecast;

                store.baseParams.filterField = item.key;
                searchListadoInpeccionesBtn.setText(item.text);
            }
        };

        //inicio mantenimiento ForecastDetalle
        var proxyForecastDetalle = new Ext.data.HttpProxy({
            api: {
                create: urlForecast + "crudCostosMicroDetalle.php?operation=insert",
                read: urlForecast + "crudCostosMicroDetalle.php?operation=select",
                update: urlForecast + "crudCostosMicroDetalle.php?operation=update",
                destroy: urlForecast + "crudCostosMicroDetalle.php?operation=delete"
            }
        });

        var readerForecastDetalle = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: true},
                {name: 'id_pma_costos_macro', allowBlank: false},
                {name: 'total', allowBlank: false},
                {name: 'adjust', allowBlank: false},
                {name: 'comment', allowBlank: false},
                {name: 'total_adjusted', allowBlank: false},
                {name: 'fecha_registro', type: 'date', dateFormat: 'c', allowBlank: true}

            ]
        });

        var writerForecastDetalle = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeForecastDetalle = new Ext.data.Store({
            id: "storeForecastDetalle",
            proxy: proxyForecastDetalle,
            reader: readerForecastDetalle,
            writer: writerForecastDetalle,
            autoSave: true
        });

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
        this.storeSO = storeSO

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

        //inicio combo costCode2
        storeCostCode2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'description'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=costcode2'
        });

        var comboCostCode2 = new Ext.form.ComboBox({
            id: 'comboCostCode2',
            store: storeCostCode2,
            valueField: 'id',
            displayField: 'description',
            triggerAction: 'all',
            mode: 'local'
        });

        function costCode2(id) {
            var index = storeCostCode2.findExact('id', id);
            if (index > -1) {
                var record = storeCostCode2.getAt(index);
                return record.get('description');
            }
        }

        //fin combo costCode2

        //inicio combo costCode3
        storeCostCode3 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'description'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=costcode3'
        });

        var comboCostCode3 = new Ext.form.ComboBox({
            id: 'comboCostCode3',
            store: storeCostCode3,
            valueField: 'id',
            displayField: 'description',
            triggerAction: 'all',
            mode: 'local'
        });

        function costCode3(id) {
            var index = storeCostCode3.findExact('id', id);
            if (index > -1) {
                var record = storeCostCode3.getAt(index);
                return record.get('description');
            }
        }

        //fin combo costCode3

        //inicio combo glcode
        storeGLCode = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'commitment_description', 'gl_account', 'gl_description'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=glcode'
        });

        var comboGLCode = new Ext.form.ComboBox({
            id: 'comboGLCode',
            store: storeGLCode,
            valueField: 'id',
            displayField: 'gl_description',
            triggerAction: 'all',
            mode: 'local'
        });

        function glcode(id) {
            var index = storeGLCode.findExact('id', id);
            if (index > -1) {
                var record = storeGLCode.getAt(index);
                return record.get('gl_description');
            }
        }

        function glcode1(id) {
            var index = storeGLCode.findExact('id', id);
            if (index > -1) {
                var record = storeGLCode.getAt(index);
                return record.get('gl_account');
            }
        }

        function glcode2(id) {
            var index = storeGLCode.findExact('id', id);
            if (index > -1) {
                var record = storeGLCode.getAt(index);
                return record.get('commitment_description');
            }
        }

        //fin combo gl code

        //inicio combo costCode4
        storeCostCode4 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'description'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=costcode4'
        });

        var comboCostCode4 = new Ext.form.ComboBox({
            id: 'comboCostCode4',
            store: storeCostCode4,
            valueField: 'id',
            displayField: 'description',
            triggerAction: 'all',
            mode: 'local'
        });

        function costCode4(id) {
            var index = storeCostCode4.findExact('id', id);
            if (index > -1) {
                var record = storeCostCode4.getAt(index);
                return record.get('description');
            }
        }

        //fin combo costCode4

        //inicio combo costCode5
        storeCostCode5 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'description'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=costcode5'
        });

        var comboCostCode5 = new Ext.form.ComboBox({
            id: 'comboCostCode5',
            store: storeCostCode5,
            valueField: 'id',
            displayField: 'description',
            triggerAction: 'all',
            mode: 'local'
        });

        function costCode5(id) {
            var index = storeCostCode5.findExact('id', id);
            if (index > -1) {
                var record = storeCostCode5.getAt(index);
                return record.get('description');
            }
        }

        //fin combo costCode5


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


        //fin combo Razon Devolucion


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

        //inicio combo Estado Recepcion Información Forecast ESREA
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


        /*        //inicio combo PARROQUIA
                storePARROQUIA = new Ext.data.JsonStore({
                    root: 'data',
                    fields: ['id', 'nombre'],
                    autoLoad: true,
                    url: 'modules/common/combos/combos.php?tipo=parroquias'
                });*/

        //this.storePARROQUIA = storePARROQUIA;


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

        function forecastFin(id) {
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
        /*storeREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre', 'orden'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidades',
            remoteSort: true, //true for server sorting
            sorters: [{
                property: 'orden',
                direction: 'ASC' // or 'ASC'
            }],
        });*/


        var checkHandler = function (item, checked) {
            if (checked) {
                var store = this.storeContribuciones;
                store.baseParams.filterField = item.key;
                searchFieldBtn.setText(item.text);
            }
        };

        var targetHandler = function (item, checked) {
            if (checked) {
                //var store = this.storeContribuciones;
                this.seleccionDepar = item.key;
                this.targetFieldBtn.setText(item.text);
            }
        };

        var searchFieldBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'grant_number',
                        scope: this,
                        text: 'Any column'
                    }

                ]
            })
            , text: 'Any column'
        });


        // this.storeDetalleForecast.load();
        //  this.storeCostoMacro.load();
        // this.storeForecast.load();
        // this.storeForecastDetalle.load();
        // this.storeListadoForecast.load();


        storeDetalleForecast = this.storeDetalleForecast;
        storeCostoMacro = this.storeCostoMacro;
        storeForecast = this.storeForecast;
        storeForecastDetalle = this.storeForecastDetalle;

        limiteModuloForecast = 100;
        var anchoHelp = 43;
        var altoHelp = 210;


        this.gridForecastDetalle = new Ext.grid.EditorGridPanel({
            id: 'gridForecastDetalle',
            xtype: "grid",
            height: 200,
            store: this.storeForecastDetalle,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id',
                    dataIndex: 'id',
                    hidden: true,
                    width: 80,
                    // editor: textField
                },
                {
                    header: 'id_pma_costos_macro',
                    dataIndex: 'id_pma_costos_macro',
                    hidden: true,
                    width: 80,
                    // editor: textField
                },
                {
                    header: 'Amount Programmed',
                    dataIndex: 'total',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    editor: textField
                },

                {
                    header: 'Adjust',
                    dataIndex: 'adjust',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    editor: textField
                },
                {header: 'Description', dataIndex: 'comment', hidden: false, width: 200, editor: textField},
                {
                    header: 'Total adjusted',
                    dataIndex: 'total_adjusted',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    editor: textField
                },

                {
                    header: 'Register date',
                    dataIndex: 'fecha_registro',
                    hidden: false,
                    width: 100,
                    renderer: formatDate,
                    // editor: new Ext.ux.form.DateTimeField({
                    //     dateFormat: 'Y-m-d',
                    //     timeFormat: 'H:i:s'
                    // })
                }
                //TODO esto no existe en la tabla
                /*,
                {
                    header: 'Total Micro',
                    dataIndex: 'total_detalle_micro',
                    hidden: false,
                    width: 100,
                    renderer: formatDate,
                },*/
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: false,
                listeners: {
                    rowselect: function (sm, row, rec) {

                        //  TODO ESTO LO COMENTO
                        /*storeForecastDetalle.load({
                            params: {
                                filterField: 'guia',
                                filterText: rec.get("numero")
                            }
                        })*/
                    }

                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeForecastDetalle,
                displayInfo: true,
                displayMsg: 'Mostrando detalle que mostrar {0} - {1} de {2} PMA',
                emptyMsg: "No existen nada  que mostrar"
            }),
        });
        //fin mantenimiento ForecastDetalle


        // Inicio mantenimiento CostoMacro
        this.gridCostoMacro = new Ext.grid.EditorGridPanel({
            id: 'gridCostoMacro',
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight - altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            readOnly: false,
            store: this.storeCostoMacro,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id_macro',
                    dataIndex: 'id_pma_contribuciones_detalle',
                    hidden: true,
                    width: 80,
                    // editor: textField
                },
                {
                    header: 'Cost Code Macro',
                    dataIndex: 'cost_code',
                    sortable: true,
                    width: 250,
                    editor: comboCOSTPARENTDET,
                    renderer: costparentAdmDet
                },
                // {header: 'Cost Detail', dataIndex: 'id_cost_detail', sortable: true, width: 100, editor: comboCOSTPARENTDET, renderer: costparentAdmDet },
                {
                    header: 'Amount Programmed',
                    dataIndex: 'total',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    editor: textField
                },

                {
                    header: 'Adjust',
                    dataIndex: 'adjust',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    editor: textField
                },
                {header: 'Comment', dataIndex: 'comment', hidden: false, width: 200, editor: textField},
                {
                    header: 'Total adjusted',
                    dataIndex: 'total_adjusted',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    // editor: textField
                },

                {
                    header: 'Register date',
                    dataIndex: 'fecha_registro',
                    hidden: false,
                    width: 100,
                    renderer: formatDate,
                    // editor: new Ext.ux.form.DateTimeField({
                    //     dateFormat: 'Y-m-d',
                    //     timeFormat: 'H:i:s'
                    // })
                },
                {
                    header: 'Total Micro',
                    dataIndex: 'total_micro',
                    hidden: false,
                    width: 100,
                    renderer: formatDate,
                },
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
                        storeForecast.load({
                            params: {id: rec.id}
                        });
                        costoMacroSeleccionada = rec.id;

                        // fin actualizar combo
                        // Ext.getCmp('paso4').expand();
                        Ext.getCmp('paso3').setTitle("Step 3 - Macro Costs - " + costparentAdmDet(rec.data['cost_code']) + " - Total: " + rec.data['total_adjusted']);
                        Ext.getCmp('paso4').setTitle("Step 4 - Micro Costs");

                        // actualizamos el combo box
                        costCodeNuevo2 = rec.data['cost_code'];
                        comboCostCode2.clearValue();
                        storeCostCode2.load({
                            params: {
                                costCodeNuevo2: costCodeNuevo2
                            }
                        });

                    }
                }
            }),

            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloForecast,
                store: storeCostoMacro,
                displayInfo: true,
                displayMsg: 'Showing macro costs: {0} - {1} of {2} - PMA',
                emptyMsg: "No macro costs to be shown"
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

        // Inicio mantenimiento Forecast
        this.gridDetalleForecast = new Ext.grid.EditorGridPanel({
            id: 'gridDetalleForecast',
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight - altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            readOnly: false,
            store: this.storeDetalleForecast,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Year', dataIndex: 'year', hidden: false, width: 100, editor: textField},
                {
                    header: 'id_pma_contribuciones',
                    dataIndex: 'id_pma_contribuciones',
                    hidden: true,
                    width: 100
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
                {
                    header: 'Total Planned',
                    dataIndex: 'total_planned',
                    renderer: 'usMoney',
                    width: 100,
                    align: 'right',
                    editor: textField
                },
                {
                    header: 'Total macro',
                    dataIndex: 'total',
                    hidden: false,
                    renderer: valueColor,
                    renderer: 'usMoney',
                    align: 'right',
                    width: 150
                },

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
                        // alert(rec.id);
                        storeCostoMacro.load({params: {id: rec.id}});
                        // Ext.getCmp('paso3').expand();
                        Ext.getCmp('paso2').setTitle("Step 2 - Activities - " + costSO(rec.data['so']) + " - " + costActivities(rec.data['activity']) + " - Total: " + rec.data['total']);
                        Ext.getCmp('paso3').setTitle("Step 3 - Macro Costs");
                        Ext.getCmp('paso4').setTitle("Step 4 - Micro Costs");

                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloForecast,
                store: storeDetalleForecast,
                displayInfo: true,
                displayMsg: 'Showing activities: {0} - {1} of {2} - PMA',
                emptyMsg: "No activities to be shown"
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


        //Fin formato grid detalle forecast


        this.gridForecast = new Ext.grid.EditorGridPanel({
            id: 'gridForecast',
            xtype: "grid",
            height: winHeight - altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            store: this.storeForecast,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id_pma_costos_macro',
                    dataIndex: 'id_pma_costos_macro',
                    sortable: false,
                    width: 15,
                    hidden: true
                },
                {
                    header: 'Cost Code nivel 2',
                    dataIndex: 'cost_code2',
                    sortable: true,
                    width: 100,
                    editor: comboCostCode2,
                    renderer: costCode2
                },
                {
                    header: 'Cost Code nivel 3',
                    dataIndex: 'cost_code3',
                    sortable: true,
                    width: 150,
                    editor: comboCostCode3,
                    renderer: costCode3
                },
                {
                    header: 'GL description',
                    dataIndex: 'glcode',
                    sortable: true,
                    width: 100,
                    hidden: false,
                    editor: comboGLCode,
                    renderer: glcode
                },
                {
                    header: 'GL code',
                    dataIndex: 'glcode1',
                    sortable: true,
                    width: 100,
                    hidden: false,
                    // editor: comboGLCode,
                    renderer: glcode1
                },
                {
                    header: 'Commitment description',
                    dataIndex: 'glcode2',
                    sortable: true,
                    width: 100,
                    hidden: false,
                    // editor: comboGLCode,
                    renderer: glcode2
                },
                {
                    header: 'Cost Code nivel 4',
                    dataIndex: 'cost_code4',
                    sortable: true,
                    width: 100,
                    editor: comboCostCode4,
                    renderer: costCode4
                },
                {
                    header: 'Cost Code nivel 5',
                    dataIndex: 'cost_code5',
                    sortable: true,
                    width: 150,
                    editor: comboCostCode5,
                    renderer: costCode5
                },
                {
                    header: 'Descripción',
                    dataIndex: 'description_micro',
                    sortable: true,
                    width: 200,
                    editor: textField20
                },
                {
                    header: 'Total Planned',
                    dataIndex: 'total_micro',
                    sortable: true,
                    width: 100,
                    renderer: 'usMoney',
                    editor: textField
                },
                {
                    header: 'Adjust',
                    dataIndex: 'adjust',
                    sortable: true,
                    width: 100,
                    renderer: 'usMoney',
                    editor: textField20
                },
                {
                    header: 'Total after adjustment',
                    dataIndex: 'total_after_adjust',
                    sortable: true,
                    renderer: 'usMoney',
                    width: 150
                }

            ],
            viewConfig: {
                forceFit: false,
                /*getRowClass: function (record, index) {
                    dato1 = Ext.getCmp('paso4').getRow()

                    if (  (record.get('id_estado') == record.get('id_estado'))) {
                        return 'redstate';
                    }
                }*/
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: false,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        //storeForecastdetSimple.load({params: {filterField: 'guia', filterText: rec.get("numero")}})
                        Ext.getCmp('paso4').setTitle("Step 4 - Micro Costs- " + costCode2(rec.data['cost_code2']) + " - Total: " + rec.data['total_after_adjust']);
                        // rec.data['glcode']=rec.data['cost_code3']
                        costCodeNuevo3 = rec.data['cost_code3'];
                        costoMicroSeleccionada = rec.id;
                        storeGLCode.load({
                            params: {
                                costCodeNuevo3: costCodeNuevo3
                            }
                        });
                        // aca se carga el micro cost detail step 5
                        // costoMicroSeleccionada = rec.data['id'];
                        console.log(costoMicroSeleccionada);


                        storeForecastDetalle.load({
                            params: {
                                costCodeNuevo2: costCodeNuevo2
                            }
                        });

                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeForecast,
                displayInfo: true,
                displayMsg: 'Showing micro costs {0} - {1} of {2} PMA',
                emptyMsg: "No micro costs to be shown"
            }),
        });

        //fin mantenimiento Forecast

        //Definición de url CRUD Payroll
        var proxyPayroll = new Ext.data.HttpProxy({
            api: {
                create: urlForecast + "crudPayroll.php?operation=insert",
                read: urlForecast + "crudPayroll.php?operation=select",
                update: urlForecast + "crudPayroll.php?operation=update",
                destroy: urlForecast + "crudPayroll.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Costcategory
        var readerPayroll = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'location', allowBlank: false},
                {name: 'hr_position', allowBlank: false},
                {name: 'grade', allowBlank: true},
                {name: 'index_no', allowBlank: true},
                {name: 'hr_position', allowBlank: true},
                {name: 'number_months', allowBlank: true},
                {name: 'number_staff', allowBlank: true},
                {name: 'monthly_cost_2019', allowBlank: true},
                {name: 'monthly_cost_2018', allowBlank: true},
                {name: 'expected_cost_2019', allowBlank: true},
                {name: 'without_increase', allowBlank: true},
                {name: 'increase_2', allowBlank: true},
                {name: 'increase_5', allowBlank: true},
                {name: 'program_validation', allowBlank: true}
            ]
        });

        //Definición de escritura en campos bdd Payroll
        var writerPayroll = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Payroll
        this.storePayroll = new Ext.data.Store({
            id: "storePayroll",
            proxy: proxyPayroll,
            reader: readerPayroll,
            writer: writerPayroll,
            // autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storePayroll = this.storePayroll;
        limitemantenimiento = 100;
        storePayroll.baseParams = {
            limit: limitemantenimiento
        };

        this.storePayroll.load();

        this.gridPayroll = new Ext.grid.EditorGridPanel({
            height: winHeight / 2,
            // width: winWidth,
            store: this.storePayroll,
            columns: [
                //Definición de campos bdd Costcategory
                new Ext.grid.RowNumberer()
                // ,{header: 'ID', dataIndex: 'id', sortable: true, width: 10}
                // ,{header: 'Location', dataIndex: 'location', sortable: true, width: 40, editor: textField}
                , {
                    header: 'HR Description',
                    dataIndex: 'hr_position',
                    sortable: true,
                    width: 200,
                    editor: textField
                }
                , {header: 'Monthly cost 2018', dataIndex: 'monthly_cost_2018', sortable: true, width: 100}


            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limitemantenimiento,
                store: storePayroll,
                displayInfo: true,
                displayMsg: 'Showing: {0} - {1} of {2} - PMA',
                emptyMsg: "No data to be shown"
            })
        });
        //Fin formato grid Payroll

        //Inicio ventana forecast
        //Definición de url CRUD
        var proxyModuloForecast = new Ext.data.HttpProxy({
            api: {
                create: urlForecast + "crudContribuciones.php?operation=insert",
                read: urlForecast + "crudContribuciones.php?operation=select",
                update: urlForecast + "crudContribuciones.php?operation=update",
                destroy: urlForecast + "crudContribuciones.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    costCodeNuevo3 = rs.data['cost_code2'];
                    comboCostCode3.clearValue();
                    storeCostCode3.load({
                        params: {
                            costCodeNuevo3: costCodeNuevo3
                        }
                    });

                    glDescription = rs.data['glcode'];
                    comboCostCode3.clearValue();
                    storeCostCode3.load({
                        params: {
                            costCodeNuevo3: costCodeNuevo3
                        }
                    });

                    costCodeNuevo5 = rs.data['cost_code4'];
                    comboCostCode5.clearValue();
                    storeCostCode5.load({
                        params: {
                            costCodeNuevo5: costCodeNuevo5
                        }
                    });
                }
            }
        });

        //Definición de lectura de campos bdd Forecast
        var readerModuloForecast = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'grant_number', allowBlank: false},
                {name: 'estado', allowBlank: false},
                {name: 'crn', allowBlank: false},
                {name: 'donor', allowBlank: false},
                {name: 'fund', allowBlank: true},
                {name: 'comments', allowBlank: true},
                {name: 'isc', allowBlank: false},
                {name: 'total_grant', allowBlank: true},
                {name: 'total_programmed', allowBlank: true},
                {name: 'total_unprogrammed', allowBlank: true},
                {name: 'total_contribution', allowBlank: true},
                {name: 'grant_tod', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'grant_tdd', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'grant_specific', allowBlank: true},
                {name: 'activity', allowBlank: true},
                {name: 'year_contribution', allowBlank: true},
                {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true}
            ]

        });

        //Definición de escritura en campos bdd Forecast
        var writerModuloForecast = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        //Definición de store para módulo Forecast
        this.storeModuloForecast = new Ext.data.Store({
            id: "storeModuloForecast",
            proxy: proxyModuloForecast,
            reader: readerModuloForecast,
            writer: writerModuloForecast,
            //autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //autoSave: true
            //baseParams: {}
        });

        storeModuloForecast = this.storeModuloForecast;
        storeModuloForecast.baseParams = {
            limit: limiteModuloForecast
        };

        // this.storeModuloForecast.load();

        var filters = new Ext.ux.grid.GridFilters({
            // encode and local configuration options defined previously for easier reuse
            encode: false, // json encode the filter query
            local: true,   // defaults to false (remote filtering) // TODO campbiar por false para cargar
            filters: [
                {type: 'string', dataIndex: 'grant_number'},
                {type: 'string', dataIndex: 'crn'},
                {type: 'string', dataIndex: 'fund'},
                {type: 'string', dataIndex: 'donor'},
                {type: 'string', dataIndex: 'year_contribution'},
                {type: 'string', dataIndex: 'comments'},

                {type: 'numeric', dataIndex: 'isc'},
                {type: 'numeric', dataIndex: 'total_grant'},
                {type: 'numeric', dataIndex: 'total_programmed'},
                {type: 'numeric', dataIndex: 'total_unprogrammed'},
                {type: 'numeric', dataIndex: 'total_contribution'},

                {type: 'date', dataIndex: 'grant_tod'},
                {type: 'date', dataIndex: 'grant_tdd'},

                {
                    type: 'list',
                    dataIndex: 'grant_specific',
                    options: ['Yes', 'No'],
                    phpMode: true
                },
                {
                    type: 'list',
                    dataIndex: 'estado',
                    options: ['Closed', 'Ongoing'],
                    phpMode: true
                },
                {
                    type: 'boolean',
                    dataIndex: 'visible'
                }
            ]
        });

        var createColModel = function () {
            var columns = [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Grant Number',
                    dataIndex: 'grant_number',
                    id: 'grant_number',
                    width: 38,
                    editor: textField10,
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        // si estado es cerrado retorna amarillo
                        recuperaEstado = record.get('estado');
                        if (recuperaEstado === 'Closed') {
                            return '<span class="circleBase goldstate"></span>' + value;
                        }
                        // si la fecha esta proxima a su vencimiento 30 dias
                        fecha_actual = new Date();
                        var diff = Math.abs(record.get('grant_tdd') - fecha_actual) / 3600000 / 24;
                        // regresa diff en dias
                        if (diff < intervalo1) {
                            return '<span class="circleBase redstate"></span>' + value;
                        }
                        // si la fecha esta proxima a su vencimiento 60 dias
                        if (diff < intervalo2) {
                            return '<span class="circleBase bluestate"></span>' + value;
                        }
                        return value
                    }

                },
                {
                    header: 'CRN',
                    dataIndex: 'crn',
                    width: 28,
                    editor: textField
                },
                {
                    header: 'Fund',
                    dataIndex: 'fund',
                    width: 28,
                    editor: textField
                },
                {
                    header: 'Donor',
                    dataIndex: 'donor',
                    width: 28,
                    editor: textField
                },
                {
                    header: 'Year',
                    dataIndex: 'year_contribution',
                    width: 20,
                    editor: anio,
                    align: 'right'
                },
                {
                    header: 'ISC',
                    dataIndex: 'isc',
                    width: 28,
                    renderer: 'usMoney',
                    editor: numero,
                    align: 'right'
                },
                {
                    header: 'Total Direct Cost',
                    dataIndex: 'total_grant',
                    width: 28,
                    align: 'right',
                    renderer: 'usMoney',
                    editor: numero,
                },
                {
                    header: 'Total contribution',
                    dataIndex: 'total_contribution',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney',
                    editor: numero,
                    align: 'right'
                },
                {
                    header: 'Total Programmed',
                    dataIndex: 'total_programmed',
                    width: 28,
                    renderer: 'usMoney',
                    align: 'right'
                },
                {
                    header: 'Unprogrammed',
                    dataIndex: 'total_unprogrammed',
                    width: 28,
                    renderer: 'usMoney',
                    align: 'right'
                },
                {
                    header: 'Grant TOD',
                    dataIndex: 'grant_tod',
                    width: 40,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: fecha,
                    align: 'right'
                },
                {
                    header: 'Grant TDD',
                    dataIndex: 'grant_tdd',
                    width: 40,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: fecha,
                    align: 'right'
                },
                {
                    header: 'Grant Specific',
                    dataIndex: 'grant_specific',
                    width: 28,
                    editor: comboGrant,
                    renderer: costGrant
                },
                {
                    header: 'Status',
                    dataIndex: 'estado',
                    width: 28,
                    editor: comboStatus,
                    renderer: costStatus
                },
                {
                    header: 'Comments',
                    dataIndex: 'comments',
                    width: 28,
                    editor: textField
                }
            ];

            return new Ext.grid.ColumnModel({
                columns: columns,
                defaults: {
                    sortable: true,
                    filter: {type: 'string'}
                }
            });
        };


        //Inicio formato grid Forecast
        this.gridModuloForecast = new Ext.grid.EditorGridPanel({
            id: 'gridModuloForecast',
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight - altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            store: this.storeModuloForecast,
            colModel: createColModel(),
            loadMask: true,
            plugins: [filters],
            autoExpandColumn: 'grant_number',

            viewConfig: {
                // forceFit: winWidth > 1024 ? true : false
                forceFit: true,
                getRowClass: function (record, index) {

                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        //select_codigo_tramite = rec.id;
                        storeDetalleForecast.load({params: {id: rec.id}});
                        contribucionSeleccionada = rec.id;
                        forecastSeleccionada = rec.id_denuncia;
                        if (creacionDatosForecast) {
                            Ext.getCmp('btnNuevoDetalleForecast').setDisabled(false);
                            Ext.getCmp('btnEliminarDetalleForecast').setDisabled(false);
                            Ext.getCmp('gridDetalleForecast').setVisible(true);
                        }

                        //Ext.getCmp('paso2').expand();
                        Ext.getCmp('paso1').setTitle("Step 1 - Contributions - Grant number: " + rec.data['grant_number'] + " - Total: " + rec.data['total_grant'] + " - Total programmed: " + rec.data['total_programmed']);
                        Ext.getCmp('paso2').setTitle("Step 2 - Activities");
                        Ext.getCmp('paso3').setTitle("Step 3 - Macro Costs");
                        Ext.getCmp('paso4').setTitle("Step 4 - Micro Costs");
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloForecast,
                store: storeModuloForecast,
                displayInfo: true,
                displayMsg: 'Showing contributions: {0} - {1} of {2} - PMA',
                emptyMsg: "No contributions to be shown"
            })
        });
        gridModuloForecast = this.gridModuloForecast;
        this.gridModuloForecast.getBottomToolbar().add([
            '->', {
                text: 'Clear Filter Data',
                handler: function () {
                    gridModuloForecast.filters.clearFilters();
                }
            }
        ]);

        //Fin formato grid Forecast
        //Fin ventana forecast


        //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            //Creación de la ventana win
            win = desktop.createWindow({
                id: 'grid-win-moduloForecast',
                //Definición del título de la ventana
                title: 'FORECAST',
                //Definición de tamaños de la ventana
                width: winWidth,
                height: winHeight,
                iconCls: 'forecast-icon',
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
                            title: 'Contributions',
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
                                    title: 'Totals',
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
                                    items: [
                                        //   {
                                        //     columnWidth: 1,
                                        //     baseCls: 'x-plain',
                                        //     bodyStyle: 'padding:0 0 0 0',
                                        //     items: this.gridPayroll
                                        // }
                                    ]
                                },
                                {
                                    region: 'center',
                                    margins: '0 5 0 0',
                                    layout: 'accordion',
                                    items: [{
                                        title: 'Step 1 - Contributions',
                                        id: 'paso1',
                                        autoScroll: true,
                                        border: false,
                                        items: this.gridModuloForecast,
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                text: 'New',
                                                scope: this,
                                                handler: this.addModuloForecast,
                                                disabled: false,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón Delete
                                            {
                                                text: "Delete",
                                                scope: this,
                                                handler: this.deleteModuloForecast,
                                                disabled: false,
                                                //disabled: !creacionTramites,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Reload data
                                            {
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataModuloForecast,
                                                scope: this,
                                                text: 'Reload data'
                                            },
                                            '-',
                                            {
                                                text: "Move Data",
                                                scope: this,
                                                handler: this.botonTransferirDatos,
                                                id: 'movedata',
                                                iconCls: 'subir-icon',
                                                //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                disabled: false
                                            },
                                            // '-',
                                            // {
                                            //     xtype: 'checkbox',
                                            //     boxLabel: 'Filter',
                                            //     id: 'checkPendientesAprobar',
                                            //     name: 'pendientesAprobar',
                                            //     checked: accesosSecretaria,
                                            //     inputValue: '1',
                                            //     tooltip: 'Reload data',
                                            //     //disabled: !acceso,
                                            //     cls: 'barramenu',
                                            //     handler: function (checkbox, isChecked) {
                                            //         //Ext.getCmp('tb_repoteDenuncias').setDisabled(!this.checked);
                                            //         //Ext.getCmp('tb_seleccionarUnidad').setDisabled(!this.checked);
                                            //         //Ext.getCmp('tb_seleccionarUnidad').getValue();
                                            //         //storeDenuncias.load({params: {noenviados: isChecked}});
                                            //         storeModuloForecast.baseParams = {
                                            //             pendientesAprobar: isChecked
                                            //         };
                                            //         storeModuloForecast.load();
                                            //     }
                                            // },
                                            '-',
                                            '->'
                                            , {
                                                text: 'Search by:'
                                                , xtype: 'tbtext'
                                            }

                                            , searchFieldBtn
                                            , ' ', ' '
                                            , new QoDesk.QoAdmin.SearchField({
                                                paramName: 'filterText'
                                                , store: this.storeModuloForecast
                                            })
                                        ],
                                    }, {
                                        title: 'Step 2 - Activities',
                                        border: false,
                                        id: 'paso2',
                                        autoScroll: true,
                                        items: [this.gridDetalleForecast],
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                id: 'btnNuevoDetalleForecast',
                                                text: 'New',
                                                scope: this,
                                                handler: this.addDetalleForecast,
                                                disabled: false,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón Delete
                                            {
                                                id: 'btnEliminarDetalleForecast',
                                                text: "Delete",
                                                scope: this,
                                                handler: this.deleteDetalleForecast,
                                                disabled: false,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Reload data
                                            {
                                                id: 'btnRecargarDatosDetalleForecast',
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataDetalleForecast,
                                                disabled: false,
                                                scope: this,
                                                text: 'Reload data'
                                            }

                                        ]
                                    }, {
                                        title: 'Step 3 - Macro Costs',
                                        border: false,
                                        id: 'paso3',
                                        autoScroll: true,
                                        items: this.gridCostoMacro,
                                        tbar: [
                                            //Definición de botón nuevo
                                            // tbar: [
                                            //Definición de botón nuevo
                                            {
                                                id: 'btnNuevoCostoMacro',
                                                text: 'New',
                                                scope: this,
                                                handler: this.addCostoMacro,
                                                disabled: false,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón Delete
                                            {
                                                id: 'btnEliminarCostoMacro',
                                                text: "Delete",
                                                scope: this,
                                                handler: this.deleteCostoMacro,
                                                disabled: false,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Reload data
                                            {
                                                id: 'btnRecargarDatosCostoMacro',
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataCostoMacro,
                                                disabled: false,
                                                scope: this,
                                                text: 'Reload data'
                                            }
                                        ]
                                    }, {
                                        title: 'Step 4 - Micro Costs',
                                        border: false,
                                        autoScroll: true,
                                        id: 'paso4',
                                        items: [this.gridForecast],
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                id: 'btnNuevoDetalleForecast2',
                                                text: 'New',
                                                scope: this,
                                                handler: this.addForecast,
                                                disabled: false,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón Delete
                                            {
                                                id: 'btnEliminarDetalleForecast2',
                                                text: "Delete",
                                                scope: this,
                                                handler: this.deleteForecast,
                                                disabled: false,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Reload data
                                            {
                                                id: 'btnRecargarDatosDetalleForecast2',
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataForecast,
                                                disabled: false,
                                                scope: this,
                                                text: 'Reload data'
                                            }
                                        ]
                                    }
                                        , {
                                            title: 'Step 5 - Micro Costs Detail',
                                            border: false,
                                            autoScroll: true,
                                            id: 'paso5',
                                            items: [this.gridForecastDetalle],
                                            tbar: [
                                                //Definición de botón nuevo
                                                {
                                                    id: 'btnNuevoMicroDetalle',
                                                    text: 'New',
                                                    scope: this,
                                                    handler: this.addMicroDetalle,
                                                    disabled: false,
                                                    iconCls: 'save-icon'
                                                },
                                                '-',
                                                //Definición de botón Delete
                                                {
                                                    id: 'btnEliminarMicroDetalle',
                                                    text: "Delete",
                                                    scope: this,
                                                    handler: this.deleteMicroDetalle,
                                                    disabled: false,
                                                    iconCls: 'delete-icon'
                                                },
                                                '-',
                                                //Definición de botón Reload data
                                                {
                                                    id: 'btnRecargarDatosMicroDetalle',
                                                    iconCls: 'reload-icon',
                                                    handler: this.requestGridDataMicroDetalle,
                                                    disabled: false,
                                                    scope: this,
                                                    text: 'Reload data'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                })
            });
        }
        //Llamado a función que muestra la ventana en pantalla
        win.show();

        setTimeout(function () {
            this.storeModuloForecast.load({
                params: {
                    start: 0,
                    limit: limiteModuloForecast,
                    pendientesAprobar: isChecked
                }
            });
        }, 1500);
    },

    //Función para eliminación de registros de Forecast
    deleteModuloForecast: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridModuloForecast.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeModuloForecast.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Forecast
    addModuloForecast: function () {
        var forecast = new this.storeModuloForecast.recordType({
            grant_number: null,
            estado: '',
            donor: '',
            fund: '',
            comments: '',
            isc: 0,
            total_grant: 0,
            total_programmed: 0,
            total_unprogrammed: 0,
            activity: '',
            grant_tod: (new Date()),
            grant_tdd: (new Date()),
            grant_specific: ' ',
            year_contribution: (new Date().getFullYear()),
            crn: '',
            recepcion_documento: (new Date())
        });
        this.gridModuloForecast.stopEditing();
        this.storeModuloForecast.insert(0, forecast);
        this.gridModuloForecast.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloForecast
    requestGridDataModuloForecast: function () {
        this.storeModuloForecast.load();
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
    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloForecast
    requestGridDataDenunciasActa: function () {

        // this.storeForecastDetalle.load();
    },

    //Función para eliminación de registros de Forecast
    deleteDetalleForecast: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDetalleForecast.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDetalleForecast.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de forecast
    addDetalleForecast: function () {
        var forecast = new this.storeDetalleForecast.recordType({
            id_pma_contribuciones: contribucionSeleccionada,
            year: ' ',
            so: 1,
            activity: 1,
            total_planned: 0,
            total: 0,
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
        this.gridDetalleForecast.stopEditing();
        this.storeDetalleForecast.insert(0, forecast);
        this.gridDetalleForecast.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle forecast
    requestGridDataDetalleForecast: function () {
        this.storeDetalleForecast.load({
            params: {
                id: contribucionSeleccionada
            }
        });
    },


    //Función para eliminación de registros de Forecast
    deleteForecast: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridForecast.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeForecast.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de forecast
    addForecast: function () {
        var forecast = new this.storeForecast.recordType({
            cost_code2: 1,
            cost_code3: 1,
            glcode: 1,
            cost_code4: 1,
            cost_code5: 1,
            description_micro: '',
            total_micro: 0,
            adjust: 0,
            total_after_adjust: 0,
            id_pma_costos_macro: costoMacroSeleccionada,

        });
        this.gridForecast.stopEditing();
        this.storeForecast.insert(0, forecast);
        this.gridForecast.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle forecast
    requestGridForecast: function () {
        this.storeForecast.load({
            params: {
                id: contribucionSeleccionada
            }
        });
    },


    //Función para eliminación de registros de Inspeccion
    deleteCostoMacro: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
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
            id_pma_contribuciones_detalle: select_SO,
            cost_code: 1,
            total: 0,
            doc: 0,
            dsc: 0,
            adjust: 0,
            comment: '',
            total_adjusted: 0,
            // activity: 1,
            // id_cost: ' ',
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

    //Función para eliminación de registros de MicroDetalle
    deleteMicroDetalle: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridForecastDetalle.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeForecastDetalle.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de inspeccion
    addMicroDetalle: function () {
        var inspeccion = new this.storeForecastDetalle.recordType({
            id_pma_costos_macro: costoMicroSeleccionada,
            total: 0,
            adjust: 0,
            comment: '',
            total_adjusted: 0,
            fecha_registro: (new Date()),
        });
        this.gridForecastDetalle.stopEditing();
        this.storeForecastDetalle.insert(0, inspeccion);
        this.gridForecastDetalle.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridDataCostoMacro: function () {
        this.storeForecastDetalle.load({
            params: {
                id: costCodeNuevo3
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
                    window.location.href = 'modules/desktop/forecast/server/generarNuevasGuias.php';
                    setTimeout(function () {
                        AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                        storeModuloForecast.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    }, 1500);
                }
            }
        });
    },

    // bh boton generar nueva guía
    // ?reimpresion=true&guia=' + rows[0].get('id')
    botonImprimirActa: function () {
        // recuperamos registro seleccionado de datagrid denunciaguia
        var rows = this.gridForecastDetalle.getSelectionModel().getSelections();
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
        window.location.href = 'modules/desktop/forecast/server/generarNuevasGuias.php?reimpresion=true&guia=' + rows[0].get('id');
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
                    window.location.href = 'modules/desktop/forecast/server/gexºnerarHojaRuta.php';
                    /*setTimeout(function () {
                        AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                        storeModuloForecast.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    }, 1500);
                    */
                }
            }
        });
    },

    // cc boton transferir datos
    botonTransferirDatos: function () {
        Ext.Msg.show({
            title: 'Warning',
            msg: 'The migration will overwrite the previous information<br><br>Do you wish to continue?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    //                window.location.href = 'modules/desktop/inspeccion/server/migrarWings.php';
                    //                setTimeout(function () {
                    //                    AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                    //                    storeModuloContribution.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    //                }, 1500);

                    Ext.Ajax.request({
                        url: 'modules/desktop/forecast/server/migrarDatosForecast.php',
                        waitMsg: 'Moving data ...',
                        success: function(response, opts) {
                           // var obj = Ext.decode(response.responseText);
                           // console.dir(obj);
                        },
                        failure: function(response, opts) {
                            console.log('server-side failure with status code ');
                            alert ("errir")
                        }
                    });




                }
            }
        });
    },

});
