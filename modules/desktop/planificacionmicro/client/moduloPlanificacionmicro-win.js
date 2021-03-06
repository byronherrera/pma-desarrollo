var contribucionSeleccionada = '';
var costoMacroSeleccionada = '';
var costoMicroSeleccionada = '';

var maxTotalCostDetail = 0;

QoDesk.PlanificacionmicroWindow = Ext.extend(Ext.app.Module, {
    id: 'planificacionmicro',
    type: 'desktop/planificacionmicro',

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

        //Definición de escritura en campos bdd Planificacionmicro
        var writerDetallePlanificacionmicro = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        //Fin ventana planificacionmicro

        //inicio mantenimiento Planificacionmicro
        var proxyPlanificacionmicro = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudCostosMicro.php?operation=insert",
                read: urlPlanificacionmicro + "crudCostosMicro.php?operation=select",
                update: urlPlanificacionmicro + "crudCostosMicro.php?operation=update",
                destroy: urlPlanificacionmicro + "crudCostosMicro.php?operation=delete"
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

        var readerPlanificacionmicro = new Ext.data.JsonReader({
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
                {name: 'total_after_adjust', allowBlank: true},
                {name: 'total_cost_detail', allowBlank: true}
            ]
        });

        var writerPlanificacionmicro = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePlanificacionmicro = new Ext.data.Store({
            id: "storePlanificacionmicro",
            proxy: proxyPlanificacionmicro,
            reader: readerPlanificacionmicro,
            writer: writerPlanificacionmicro,
            autoSave: true,
            listeners: {
                exception: function (proxy, response, operation) {
                    if (operation == 'destroy') {
                        Ext.Msg.show({
                            title: 'Error'
//                            , msg: errorJson.msg
                            , msg: 'To delete the record, the dependent records must be deleted'
                            , modal: true
                            , icon: Ext.Msg.ERROR
                            , buttons: Ext.Msg.OK
                        });
                    }
                }
            }
        });
        //this.storePlanificacionmicro.load();

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
                {name: 'total_cost_detail', allowBlank: true},
                {name: 'fecha_registro', type: 'date', dateFormat: 'c', allowBlank: true},
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerCostoMacro = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Planificacionmicro
        this.storeDetallePlanificacionmicro = new Ext.data.Store({
            id: "storeDetallePlanificacionmicro",
            proxy: proxyDetallePlanificacionmicro,
            reader: readerDetallePlanificacionmicro,
            writer: writerDetallePlanificacionmicro,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            // autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            baseParams: {}
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

        var checkHandlerPlanificacionmicro = function (item, checked) {
            if (checked) {
                // if (todosInspectores == true) {
                //cc    //var store = this.storeListadoPlanificacionmicro;
                // } else {
                // var store = this.storeListadoTodosInspectores;
                // }
                //var store = this.storeModuloPlanificacionmicro;

                store.baseParams.filterField = item.key;
                searchListadoInpeccionesBtn.setText(item.text);
            }
        };

        //inicio mantenimiento PlanificacionmicroDetalle
        var proxyPlanificacionmicroDetalle = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudCostosMicroDetalle.php?operation=insert",
                read: urlPlanificacionmicro + "crudCostosMicroDetalle.php?operation=select",
                update: urlPlanificacionmicro + "crudCostosMicroDetalle.php?operation=update",
                destroy: urlPlanificacionmicro + "crudCostosMicroDetalle.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                        else {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                },
                exception: function (proxy, type, operation, options, response, arg) {
                    if (operation == 'update') {
                        AppMsg.setAlert("Requisito obligatorio", response.message);
                    }

                    if (operation == 'create') {
                        AppMsg.setAlert("Requisito obligatorio", response.message);
                    }
                },
            }
        });

        var readerPlanificacionmicroDetalle = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: true},
                {name: 'id_pma_costos_micro', allowBlank: false},
                {name: 'total', allowBlank: false},
                {name: 'adjust', allowBlank: false},
                {name: 'total_adjusted', allowBlank: false},
                {name: 'comment', allowBlank: true},
                {name: 'pr_microcosts', allowBlank: true},
                {name: 'sub_pr_microcosts', allowBlank: true},
                {name: 'po_microcosts', allowBlank: true},
                {name: 'sub_po_microcosts', allowBlank: true},
                {name: 'fecha_registro', type: 'date', dateFormat: 'c', allowBlank: true}
            ]
        });

        var writerPlanificacionmicroDetalle = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePlanificacionmicroDetalle = new Ext.data.Store({
            id: "storePlanificacionmicroDetalle",
            proxy: proxyPlanificacionmicroDetalle,
            reader: readerPlanificacionmicroDetalle,
            writer: writerPlanificacionmicroDetalle,
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
        storeActivitiesMic = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'subcategory_name'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=activities'
        });
        var comboActivitiesMic = new Ext.form.ComboBox({
            id: 'comboActivitiesMic',
            store: storeActivitiesMic,
            valueField: 'id',
            displayField: 'subcategory_name',
            triggerAction: 'all',
            mode: 'local'
        });

        function costActivitiesMic(id) {
            var index = storeActivitiesMic.find('id', id);
            if (index > -1) {
                var record = storeActivitiesMic.getAt(index);
                return record.get('subcategory_name');
            }

        }

        //fin combo ACTIVITIES 
        
        
        
        
        
        
        //inicio combo SO
        storeSOMic = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'category_name'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=so'
        });
        var comboSO = new Ext.form.ComboBox({
            id: 'comboSO',
            store: storeSOMic,
            valueField: 'id',
            displayField: 'category_name',
            triggerAction: 'all',
            mode: 'local'
        });

        function costSOMic(id) {
            var index = storeSOMic.find('id', id);
            if (index > -1) {
                var record = storeSOMic.getAt(index);
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
        storeCostCode3Full = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'description'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=costcode3full'
        });

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
            displayField:  'description' ,
            triggerAction: 'all',
            mode: 'local'
        });

        function costCode3(id) {
            var index = storeCostCode3Full.findExact('id', id);
            if (index > -1) {
                var record = storeCostCode3Full.getAt(index);
                return record.get('description');
            }
        }

        //fin combo costCode3

        //inicio combo glcode
        storeGLCode = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'commitment_description', 'gl_account', 'gl_description', 'gl_description2'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=glcode'
        });

        var comboGLCode = new Ext.form.ComboBox({
            id: 'comboGLCode',
            store: storeGLCode,
            valueField: 'id',
            displayField: 'gl_description2',
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

        storeDetallePlanificacionmicro = this.storeDetallePlanificacionmicro;
        storeCostoMacro = this.storeCostoMacro;
        storePlanificacionmicro = this.storePlanificacionmicro;
        storePlanificacionmicroDetalle = this.storePlanificacionmicroDetalle;

        limiteModuloPlanificacionmicro = 100;
        var anchoHelp = 43;
        var altoHelp = 220;


        this.gridPlanificacionmicroDetalle = new Ext.grid.EditorGridPanel({
            id: 'gridPlanificacionmicroDetalle',
            xtype: "grid",
            height: winHeight - altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            store: this.storePlanificacionmicroDetalle,
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
                    header: 'id_pma_costos_micro',
                    dataIndex: 'id_pma_costos_micro',
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
                {
                    header: 'Total adjusted',
                    dataIndex: 'total_adjusted',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    // editor: textField
                },
                {header: 'Description', dataIndex: 'comment', hidden: false, width: 200, editor: textField},
                {
                    header: 'PR',
                    dataIndex: 'pr_microcosts',
                    hidden: false,
                    width: 150,
                    // renderer: 'usMoney',
                    editor: textField
                },
                {
                    header: 'SUB PR',
                    dataIndex: 'sub_pr_microcosts',
                    hidden: false,
                    width: 150,
                    // renderer: 'usMoney',
                    editor: textField
                },
                {
                    header: 'PO',
                    dataIndex: 'po_microcosts',
                    hidden: false,
                    width: 150,
                    // renderer: 'usMoney',
                    editor: textField
                },
                {
                    header: 'SUB PO',
                    dataIndex: 'sub_po_microcosts',
                    hidden: false,
                    width: 150,
                    // renderer: 'usMoney',
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
            ],
            viewConfig: {forceFit: false},
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: false,
                listeners: {
                    rowselect: function (sm, row, rec) {

                        //  TODO ESTO LO COMENTO
                        /*storePlanificacionmicroDetalle.load({
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
                store: this.storePlanificacionmicroDetalle,
                displayInfo: true,
                displayMsg: 'Mostrando detalle que mostrar {0} - {1} de {2} PMA',
                emptyMsg: "No micro costs detail to be shown"
            }),
        });
        //fin mantenimiento PlanificacionmicroDetalle


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
                    // editor: comboCOSTPARENTDET,
                    renderer: costparentAdmDet
                },
                {
                    header: 'Amount Programmed',
                    dataIndex: 'total',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    // editor: textField
                },
                {
                    header: 'Adjust',
                    dataIndex: 'adjust',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    // editor: textField
                },
                {
                    header: 'Total adjusted',
                    dataIndex: 'total_adjusted',
                    hidden: false,
                    width: 150,
                    renderer: 'usMoney',
                    // editor: textField
                },
                {
                    header: 'Total Micro',
                    dataIndex: 'total_cost_detail',
                    hidden: false,
                    width: 100,
                    renderer: 'usMoney'
                },
                {
                    header: 'Register date',
                    dataIndex: 'fecha_registro',
                    hidden: false,
                    width: 100,
                    renderer: formatDate,
                },
                {header: 'Comment', dataIndex: 'comment', hidden: false, width: 200}
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        costoMacroSeleccionada = rec.id;
                        costoMicroSeleccionada = rec.id;

                        // actualizamos el combo boxluego de actualizar
                        costCodeNuevo2 = rec.data['cost_code'];
                        comboCostCode2.clearValue();
                        storeCostCode2.load({
                            params: {
                                costCodeNuevo2: costCodeNuevo2
                            },
                            callback: function(records, operation, success) {
                                if (success == true) {
                                    // create a checkbox for each task
                                    storePlanificacionmicro.baseParams = {
                                        id: costoMicroSeleccionada
                                    };
                                    storePlanificacionmicro.load();
                                } else {
                                    // the store didn't load, deal with it
                                    console.log ("Error ")

                                }
                            }
                        });
                        // fin actualizar combo
                        Ext.getCmp('paso4').expand();
                        Ext.getCmp('paso3').setTitle("Step 3 - Macro Costs - " + costparentAdmDet(rec.data['cost_code']) + " - Total: " + Ext.util.Format.usMoney(rec.data['total_adjusted']));
                        Ext.getCmp('paso4').setTitle("Step 4 - Micro Costs");


                    }
                }
            }),

            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloPlanificacionmicro,
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

        // Inicio mantenimiento Planificacionmicro
        this.gridDetallePlanificacionmicro = new Ext.grid.EditorGridPanel({
            id: 'gridDetallePlanificacionmicro',
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight - altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            readOnly: false,
            store: this.storeDetallePlanificacionmicro,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Year', dataIndex: 'year', hidden: false, width: 100},
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
                    // editor: comboSO,
                    renderer: costSOMic
                },
                {
                    header: 'Activity',
                    dataIndex: 'activity',
                    sortable: true,
                    width: 129,
                    // editor: comboActivitiesMic,
                    renderer: costActivitiesMic
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
                        costoMacroSeleccionada = rec.id;

                        storeCostoMacro.baseParams = {
                            id: costoMacroSeleccionada
                        };

                        storeCostoMacro.load();

                        Ext.getCmp('paso3').expand();

                        Ext.getCmp('paso2').setTitle("Step 2 - Activities - " + costSOMic(rec.data['so']) + " - " + costActivitiesMic(rec.data['activity']) + " - Total: " + Ext.util.Format.usMoney(rec.data['total']));
                        Ext.getCmp('paso3').setTitle("Step 3 - Macro Costs");
                        Ext.getCmp('paso4').setTitle("Step 4 - Micro Costs");

                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloPlanificacionmicro,
                store: storeDetallePlanificacionmicro,
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


        //Fin formato grid detalle planificacionmicro


        this.gridPlanificacionmicro = new Ext.grid.EditorGridPanel({
            id: 'gridPlanificacionmicro',
            xtype: "grid",
            height: winHeight - altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            store: this.storePlanificacionmicro,
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
                     //editor: comboGLCode,
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
                    editor: textField20
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
                },
                {
                    header: 'Total cost detail',
                    dataIndex: 'total_cost_detail',
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

                        Ext.getCmp('paso4').setTitle("Step 4 - Micro Costs- " + costCode2(rec.data['cost_code2']) + " - Total: " + Ext.util.Format.usMoney(rec.data['total_after_adjust']));

                        costCodeNuevo3 = rec.data['cost_code3'];
                        costoMicroSeleccionada = rec.data['cost_code2'];

                        // carga los combos en base del item seleccionado
                        storePlanificacionmicroDetalle.baseParams = {
                            costCodeNuevo2: costoMicroSeleccionada
                        };
                        storePlanificacionmicroDetalle.load( );

                        storeGLCode.baseParams = {
                            costCodeNuevo3: costCodeNuevo3
                        };
                        storeGLCode.load();

                        storeCostCode3.baseParams = {
                            costCodeNuevo3: costoMicroSeleccionada
                        };
                        storeCostCode3.load();
                        // TODO en caso que cost nivel 3 no tenga datos .. borrar toda la fila

                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storePlanificacionmicro,
                displayInfo: true,
                displayMsg: 'Showing micro costs {0} - {1} of {2} PMA',
                emptyMsg: "No micro costs to be shown"
            }),
        });

        //fin mantenimiento Planificacionmicro

        //Definición de url CRUD Payroll
        var proxyPayroll = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudPayroll.php?operation=insert",
                read: urlPlanificacionmicro + "crudPayroll.php?operation=select",
                update: urlPlanificacionmicro + "crudPayroll.php?operation=update",
                destroy: urlPlanificacionmicro + "crudPayroll.php?operation=delete"
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

        //Inicio ventana planificacionmicro
        //Definición de url CRUD
        var proxyModuloPlanificacionmicro = new Ext.data.HttpProxy({
            api: {
                create: urlPlanificacionmicro + "crudContribuciones.php?operation=insert",
                read: urlPlanificacionmicro + "crudContribuciones.php?operation=select",
                update: urlPlanificacionmicro + "crudContribuciones.php?operation=update",
                destroy: urlPlanificacionmicro + "crudContribuciones.php?operation=delete"
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

        //Definición de lectura de campos bdd Planificacionmicro
        var readerModuloPlanificacionmicro = new Ext.data.JsonReader({
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

        //Definición de escritura en campos bdd Planificacionmicro
        var writerModuloPlanificacionmicro = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        //Definición de store para módulo Planificacionmicro
        this.storeModuloPlanificacionmicro = new Ext.data.Store({
            id: "storeModuloPlanificacionmicro",
            proxy: proxyModuloPlanificacionmicro,
            reader: readerModuloPlanificacionmicro,
            writer: writerModuloPlanificacionmicro,
            //autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //autoSave: true
            //baseParams: {}
        });

        storeModuloPlanificacionmicro = this.storeModuloPlanificacionmicro;
        storeModuloPlanificacionmicro.baseParams = {
            limit: limiteModuloPlanificacionmicro
        };


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
                    width: 44,
                    editor: textField10,
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        // si estado es cerrado retorna amarillo
                        recuperaEstado = record.get('estado');
                        fecha_actual = new Date();
                        var diff = Math.abs(record.get('grant_tdd') - fecha_actual) / 3600000 / 24;
                        if (recuperaEstado === 'Closed') {
                            return '<span class="circleBase goldstate"></span>' + value;
                        }

                        // regresa diff en dias
                        else if (diff < intervalo1) {
                            return '<span class="circleBase redstate"></span>' + value;
                        }
                        // si la fecha esta proxima a su vencimiento 60 dias
                        else if (diff < intervalo2) {
                            return '<span class="circleBase bluestate"></span>' + value;
                        }
                        else {
                            return '<span class="circleBase whitestate"></span>' + value;
                        }
                        return value
                    }

                },
                {
                    header: 'CRN',
                    dataIndex: 'crn',
                    width: 40,
                    editor: textField
                },
                {
                    header: 'Fund',
                    dataIndex: 'fund',
                    width: 14,
                    editor: textField
                },
                {
                    header: 'Donor',
                    dataIndex: 'donor',
                    width: 28,
                    editor: textField,
                    hidden: true
                },
                {
                    header: 'Year',
                    dataIndex: 'year_contribution',
                    width: 10,
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
                    //editor: numero,
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
                    width: 20,
                    editor: comboStatus,
                    renderer: costStatus
                },
                {
                    header: 'Comments',
                    dataIndex: 'comments',
                    width: 55,
                    editor: textField
                },
                {
                    // COLUMNA EN BLANCO
                    header: '',
                    width: 15,
                    renderer: function () {
                        return ' ';
                    }
                }
            ];

            return new Ext.grid.ColumnModel({
                columns: columns,
                defaults: {
                    sortable: true,
                    filter: {type: 'string'}
                },
                viewConfig: {
                    //forceFit: winWidth > 1024 ? true : false,
                    forceFit: false
                }
            });
        };


        //Inicio formato grid Planificacionmicro
        this.gridModuloPlanificacionmicro = new Ext.grid.EditorGridPanel({
            id: 'gridModuloPlanificacionmicro',
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight - altoHelp,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - anchoHelp,
            store: this.storeModuloPlanificacionmicro,
            colModel: createColModel(),
            loadMask: true,
            plugins: [filters],
            autoExpandColumn: 'grant_number',

            viewConfig: {
                //forceFit: winWidth > 1024 ? true : false,
                forceFit: true,
                getRowClass: function (record, index) {
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        contribucionSeleccionada = rec.id;

                        storeDetallePlanificacionmicro.baseParams = {
                            id: contribucionSeleccionada
                        };

                        storeDetallePlanificacionmicro.load();

                        if (creacionDatosPlanificacionmicro) {
                            Ext.getCmp('btnNuevoDetallePlanificacionmicro').setDisabled(false);
                            Ext.getCmp('btnEliminarDetallePlanificacionmicro').setDisabled(false);
                            Ext.getCmp('gridDetallePlanificacionmicro').setVisible(true);
                        }

                        //Ext.getCmp('paso2').expand();

                        Ext.getCmp('paso1').setTitle("Step 1 - Contributions - Grant number: " + rec.data['grant_number'] + " - Total: " + Ext.util.Format.usMoney(rec.data['total_grant']) + " - Total programmed: " + Ext.util.Format.usMoney(rec.data['total_programmed']) + " - Unprogramed: " + Ext.util.Format.usMoney(rec.data['total_unprogrammed']));
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
                pageSize: limiteModuloPlanificacionmicro,
                store: storeModuloPlanificacionmicro,
                displayInfo: true,
                displayMsg: 'Showing contributions: {0} - {1} of {2} - PMA',
                emptyMsg: "No contributions to be shown"
            })
        });
        gridModuloPlanificacionmicro = this.gridModuloPlanificacionmicro;
        this.gridModuloPlanificacionmicro.getBottomToolbar().add([
            '->', {
                text: 'Clear Filter Data',
                handler: function () {
                    gridModuloPlanificacionmicro.filters.clearFilters();
                }
            }
        ]);

        //Fin formato grid Planificacionmicro
        //Fin ventana planificacionmicro


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
                title: 'MICRO PLANIFICATION',
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
                                    collapsed: false,
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
                                        items: this.gridModuloPlanificacionmicro,
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                text: 'New',
                                                scope: this,
                                                handler: this.addModuloPlanificacionmicro,
                                                disabled: true,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón Delete
                                            {
                                                text: "Delete",
                                                scope: this,
                                                handler: this.deleteModuloPlanificacionmicro,
                                                disabled: true,
                                                //disabled: !creacionTramites,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Reload data
                                            {
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataModuloPlanificacionmicro,
                                                scope: this,
                                                text: 'Reload data'
                                            },
                                            /*
                                                                                        '-',
                                                                                        {
                                                                                            xtype: 'checkbox',
                                                                                            boxLabel: 'Filter  vvv',
                                                                                            id: 'checkPendientesAprobar',
                                                                                            name: 'pendientesAprobar',
                                                                                            checked: accesosSecretaria,
                                                                                            inputValue: '1',
                                                                                            tooltip: 'Reload data',
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
                                                                                            }
                                                                                        },
                                                                                        '-',
                                            */
                                            '->'
                                            , {
                                                text: 'Search by:'
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
                                        title: 'Step 2 - Activities',
                                        border: false,
                                        id: 'paso2',
                                        autoScroll: true,
                                        items: [this.gridDetallePlanificacionmicro],
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                id: 'btnNuevoDetallePlanificacionmicro',
                                                text: 'New',
                                                scope: this,
                                                handler: this.addDetallePlanificacionmicro,
                                                disabled: true,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón Delete
                                            {
                                                id: 'btnEliminarDetallePlanificacionmicro',
                                                text: "Delete",
                                                scope: this,
                                                handler: this.deleteDetallePlanificacionmicro,
                                                disabled: true,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Reload data
                                            {
                                                id: 'btnRecargarDatosDetallePlanificacionmicro',
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataDetallePlanificacionmicro,
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
                                                disabled: true,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón Delete
                                            {
                                                id: 'btnEliminarCostoMacro',
                                                text: "Delete",
                                                scope: this,
                                                handler: this.deleteCostoMacro,
                                                disabled: true,
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
                                        items: this.gridPlanificacionmicro,
                                        tbar: [
                                            //Definición de botón nuevo
                                            {
                                                id: 'btnNuevoDetallePlanificacionmicro2',
                                                text: 'New',
                                                scope: this,
                                                handler: this.addPlanificacionmicro,
                                                disabled: false,
                                                iconCls: 'save-icon'
                                            },
                                            '-',
                                            //Definición de botón Delete
                                            {
                                                id: 'btnEliminarDetallePlanificacionmicro2',
                                                text: "Delete",
                                                scope: this,
                                                handler: this.deletePlanificacionmicro,
                                                disabled: false,
                                                iconCls: 'delete-icon'
                                            },
                                            '-',
                                            //Definición de botón Reload data
                                            {
                                                id: 'btnRecargarDatosDetallePlanificacionmicro2',
                                                iconCls: 'reload-icon',
                                                handler: this.requestGridDataPlanificacionmicro,
                                                disabled: false,
                                                scope: this,
                                                text: 'Reload data'
                                            }
                                        ]
                                    }, {
                                        title: 'Step 5 - Micro Costs Detail',
                                        border: false,
                                        autoScroll: true,
                                        id: 'paso5',
                                        items: this.gridPlanificacionmicroDetalle,
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
            this.storeModuloPlanificacionmicro.baseParams = {
                start: 0,
                limit: limiteModuloPlanificacionmicro
            };
            this.storeModuloPlanificacionmicro.load();
        }, 1500);
    },

    //Función para eliminación de registros de Planificacionmicro
    deleteModuloPlanificacionmicro: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
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

        // this.storePlanificacionmicroDetalle.load();
    },

    //Función para eliminación de registros de Planificacionmicro
    deleteDetallePlanificacionmicro: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
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
        this.gridDetallePlanificacionmicro.stopEditing();
        this.storeDetallePlanificacionmicro.insert(0, planificacionmicro);
        this.gridDetallePlanificacionmicro.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle planificacionmicro
    requestGridDataDetallePlanificacionmicro: function () {
        this.storeDetallePlanificacionmicro.load();
        console.log(1)


    },


    //Función para eliminación de registros de Planificacionmicro
    deletePlanificacionmicro: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPlanificacionmicro.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePlanificacionmicro.remove(rows);
                }
            }
        });
    },
    requestGridDataPlanificacionmicro: function () {
        this.storePlanificacionmicro.load();
    },
    requestGridDataMicroDetalle: function () {
        this.gridPlanificacionmicroDetalle.load();
    },
    //Función para inserción de registros de detalle de planificacionmicro
    addPlanificacionmicro: function () {
        var planificacionmicro = new this.storePlanificacionmicro.recordType({
            cost_code2: 1,
            cost_code3: 1,
            glcode: 1,
            cost_code4: 1,
            cost_code5: 1,
            description_micro: '',
            total_micro: 0,
            adjust: 0,
            total_after_adjust: 0,
            total_cost_detail: 0,
            id_pma_costos_macro: costoMacroSeleccionada,
        });
        this.gridPlanificacionmicro.stopEditing();
        this.storePlanificacionmicro.insert(0, planificacionmicro);
        this.gridPlanificacionmicro.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle planificacionmicro
    requestGridPlanificacionmicro: function () {
        this.storePlanificacionmicro.load();
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
            id_pma_contribuciones_detalle: costoMacroSeleccionada,
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
        this.storeCostoMacro.load();
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
                    var rows = this.gridPlanificacionmicroDetalle.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePlanificacionmicroDetalle.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de inspeccion
    addMicroDetalle: function () {
        var inspeccion = new this.storePlanificacionmicroDetalle.recordType({
            id_pma_costos_micro: costoMicroSeleccionada,
            total: 0,
            adjust: 0,
            total_adjusted: 0,
            comment: '',
            pr_microcosts: 0,
            sub_pr_microcosts: 0,
            po_microcosts: 0,
            sub_po_microcosts: 0,
            fecha_registro: (new Date()),
        });
        this.gridPlanificacionmicroDetalle.stopEditing();
        this.storePlanificacionmicroDetalle.insert(0, inspeccion);
        this.gridPlanificacionmicroDetalle.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridPlanificacionmicroDetalle: function () {
        this.storePlanificacionmicroDetalle.load();
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
        var rows = this.gridPlanificacionmicroDetalle.getSelectionModel().getSelections();
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
