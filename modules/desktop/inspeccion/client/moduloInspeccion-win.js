var contribucionSeleccionada = '';
var inspeccionSeleccionada = '';
var select_SO = '';

QoDesk.InspeccionWindow = Ext.extend(Ext.app.Module, {
    id: 'moduloInspeccion',
    type: 'desktop/moduloInspeccion',

    init: function () {
        this.launcher = {
            text: 'Inspeccion',
            iconCls: 'mantenimiento-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        //Variables de acceso
        var accesosCoordinadorInspeccion = this.app.isAllowedTo('accesosAdministrador', this.id); //Todos los accesos, visualiza todos los trámites
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id); //Todos los accesos, visualiza trámites pendientes
        var accesosInspectores = this.app.isAllowedTo('accesosInspeccion', this.id); //Sin acceso a pestaña trámites pendientes, acceso a inspecciones asignadas
        var accesosSupervision = this.app.isAllowedTo('accesosSupervision', this.id); //Solo modo lectura

        this.selectContribuciones = 0;
        this.select_SO = 0;

        //Control en caso de tener asignado el perfil de administrador
        if (accesosCoordinadorInspeccion && accesosSecretaria && accesosInspectores && accesosSupervision == true) {
            accesosSecretaria = false;
            accesosInspectores = false;
            accesosSupervision = false;
        }
        //Acceso para creación y edición en pestaña Datos inspección
        if (accesosCoordinadorInspeccion || accesosInspectores == true) {
            var creacionDatosInspeccion = true;
        } else {
            var creacionDatosInspeccion = false;
        }

        //Acceso para creación y edición en pestaña Trámites pendientes
        if (accesosCoordinadorInspeccion || accesosSecretaria == true) {
            var creacionTramites = true;
        } else {
            var creacionTramites = false;
        }

        // todosInspectores = accesosInspectores;

        if (accesosSecretaria) {
            isChecked = true;
        } else {
            isChecked = false;
        }

        var bloqueo = (accesosCoordinadorInspeccion || accesosSecretaria || accesosInspectores || accesosSupervision) ? true : false

        var desktop = this.app.getDesktop();
        var winHeight = desktop.getWinHeight();
        var winWidth = desktop.getWinWidth();

        this.selectPlanificaion = 0;
        selectPlanificaion = 0;

        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-moduloInspeccion');

        //Ubicación de la carpeta de Inspeccion
        var urlInspeccion = "modules/desktop/inspeccion/server/";
        // todasInspecciones = todosInspectores;
        var textField = new Ext.form.TextField({allowBlank: false, readOnly: false});
        var textFieldDetalle = new Ext.form.TextField({allowBlank: true, readOnly: false});

        var numero = new Ext.form.NumberField({
            allowBlank: false,
            allowNegative: false,
            maxValue: 100000000
        });

        //Definición del formato de fecha
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d') : '';
        }

        function formatDateNoTime(value) {
            return value ? value.dateFormat('Y-m-d') : '';
        }

        //Inicio ventana inspeccion
        //Definición de url CRUD
        var proxyModuloInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudContribuciones.php?operation=insert",
                read: urlInspeccion + "crudContribuciones.php?operation=select",
                update: urlInspeccion + "crudContribuciones.php?operation=update",
                destroy: urlInspeccion + "crudContribuciones.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerModuloInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'grant_number', type: 'string', allowBlank: false},
                {name: 'estado', allowBlank: true},
                {name: 'crn', allowBlank: true},
                {name: 'fund', allowBlank: true},
                {name: 'donor', allowBlank: true},
                {name: 'comments', allowBlank: true},
                {name: 'isc', allowBlank: true},
                {name: 'total_grant', allowBlank: false},
                {name: 'total_programmed', allowBlank: true},
                {name: 'total_unprogrammed', allowBlank: true},
                {name: 'grant_tod', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'grant_tdd', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'grant_specific', allowBlank: true},
                {name: 'year_contribution', allowBlank: true}
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerModuloInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Inicio ventana inspeccion
        //Definición de url CRUD
        var proxyDetalleInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudDetalleContribuciones.php?operation=insert",
                read: urlInspeccion + "crudDetalleContribuciones.php?operation=select",
                update: urlInspeccion + "crudDetalleContribuciones.php?operation=update",
                destroy: urlInspeccion + "crudDetalleContribuciones.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerDetalleInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_pma_contribuciones_detalle', allowBlank: false},
                {name: 'year', allowBlank: false},
                {name: 'so', allowBlank: false},
                {name: 'activity', allowBlank: false},
                {name: 'total', allowBlank: true},
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerDetalleInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        var proxyCostoMacro = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudCostosMacro.php?operation=insert",
                read: urlInspeccion + "crudCostosMacro.php?operation=select",
                update: urlInspeccion + "crudCostosMacro.php?operation=update",
                destroy: urlInspeccion + "crudCostosMacro.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    storeDetalleInspeccion.load();
                    storeModuloInspeccion.load();
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
                {name: 'id_pma_costos_macro', allowBlank: true},
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


        //Definición de store para módulo Inspeccion
        this.storeModuloInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyModuloInspeccion,
            reader: readerModuloInspeccion,
            writer: writerModuloInspeccion,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            //             //remoteSort: true,
            //             //autoSave: true
            //baseParams: {}
        });

        //Definición de store para módulo Inspeccion
        this.storeDetalleInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyDetalleInspeccion,
            reader: readerDetalleInspeccion,
            writer: writerDetalleInspeccion,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
            baseParams: {id: contribucionSeleccionada}
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
                var store = this.storeModuloInspeccion;
                store.baseParams.filterField = item.key;
                searchFieldBtn.setText(item.text);
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

        storeActivities = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'subcategory_name'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=activities'
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
            //   var index = storeActivities.findExact('id', id);
            var index = storeActivities.find('id', id);
            if (index > -1) {
                var record = storeActivities.getAt(index);
                return record.get('subcategory_name');
            }

        }

        //fin combo ACTIVITIES

        //inicio combo GRANT
        // storeSO = new Ext.data.JsonStore({
        //     root: 'data',
        //     fields: ['id', 'category_name'],
        //     autoLoad: true,
        //     url: 'modules/common/combos/combos.php?tipo=so'
        // });
        storeGrant = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'subcategory_name'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 'Yes', "subcategory_name": "Yes"},
                    {"id": 'No', "subcategory_name": "No"}
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
            //   var index = storeActivities.findExact('id', id);
            var index = storeGrant.find('id', id);
            if (index > -1) {
                var record = storeGrant.getAt(index);
                return record.get('subcategory_name');
            }
        }

        //fin combo GRANT

        //inicio combo Status
        // storeSO = new Ext.data.JsonStore({
        //     root: 'data',
        //     fields: ['id', 'category_name'],
        //     autoLoad: true,
        //     url: 'modules/common/combos/combos.php?tipo=so'
        // });
        storeStatus = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'subcategory_name'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 'Vigente', "subcategory_name": "Vigente"},
                    {"id": 'Cerrada', "subcategory_name": "Cerrada"}
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
            //   var index = storeActivities.findExact('id', id);
            var index = storeStatus.find('id', id);
            if (index > -1) {
                var record = storeStatus.getAt(index);
                return record.get('subcategory_name');
            }
        }

        //fin combo Status

        //inicio combo SO
        storeSO = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'category_name'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=so'
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

        function tipoActaInspeccion(id) {
            var index = storeTIPOACTAINSP.find('id', id);
            if (index > -1) {
                var record = storeTIPOACTAINSP.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }
        }





        //inicio combo Estado Recepcion Información Inspeccion ESREA
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
/*
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
*/
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

        function inspeccionFin(id) {
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




        var searchFieldBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'grant_number',
                        scope: this,
                        text: 'All columns'
                    }

                ]
            })
            , text: 'All columns'
        });





       // this.storeModuloInspeccion.load();



        storeModuloInspeccion = this.storeModuloInspeccion;
        limiteModuloInspeccion = 100;
        storeDetalleInspeccion = this.storeDetalleInspeccion;
        storeCostoMacro = this.storeCostoMacro;
        limiteDetalleInspeccion = 10;
        limiteDetalleInspeccionLarge = 100;
        storeModuloInspeccion.baseParams = {
            limit: limiteModuloInspeccion
        };

        //Inicio formato grid Inspeccion
        this.gridModuloInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridModuloInspeccion',
            xtype: "grid",
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight * 0.35,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - 16,
            store: this.storeModuloInspeccion,
            columns: [
                //Definición de campos bdd Inspeccion
                new Ext.grid.RowNumberer(),
                {
                    header: 'Grant Number',
                    dataIndex: 'grant_number',
                    sortable: true,
                    width: 30,
                    editor: textField
                },
                {
                    header: 'CRN',
                    dataIndex: 'crn',
                    sortable: true,
                    width: 35,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Fund',
                    dataIndex: 'fund',
                    sortable: true,
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Donor',
                    dataIndex: 'donor',
                    sortable: true,
                    width: 30,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Year',
                    dataIndex: 'year_contribution',
                    sortable: true,
                    width: 15,
                    editor: textField,
                    align: 'center'
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'ISC',
                    dataIndex: 'isc',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney',
                    editor: numero,
                    align: 'right'
                },
                {
                    header: 'Total Direct Cost',
                    dataIndex: 'total_grant',
                    sortable: true,
                    align: 'right',
                    width: 28,
                    renderer: 'usMoney',
                    editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 100000000
                    })
                },
                {
                    header: 'Total Programmed',
                    dataIndex: 'total_programmed',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney',
                    align: 'right'
                    /*editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 100000000
                    })*/
                },
                {
                    header: 'Unprogrammed',
                    dataIndex: 'total_unprogrammed',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney',
                    align: 'right'
                    /* editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 100000000
                    })*/
                },
                {
                    header: 'Grant TOD',
                    dataIndex: 'grant_tod',
                    sortable: true,
                    width: 40,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    }),
                    align: 'center'
                },
                {
                    header: 'Grant TDD',
                    dataIndex: 'grant_tdd',
                    sortable: true,
                    width: 40,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    }),
                    align: 'center'
                },
                {
                    header: 'Grant Specific',
                    dataIndex: 'grant_specific',
                    sortable: true,
                    width: 28,
                    editor: comboGrant,
                    renderer: costGrant
                },
                {
                    header: 'Status',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 28,
                    editor: comboStatus,
                    renderer: costStatus
                },
                {
                    header: 'Comments',
                    dataIndex: 'comments',
                    sortable: true,
                    width: 28,
                    editor: textField
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
                        selectContribuciones = rec.id;

                        storeDetalleInspeccion.baseParams.id = selectContribuciones;
                        storeDetalleInspeccion.load();

                        contribucionSeleccionada = rec.id;
                        inspeccionSeleccionada = rec.id_denuncia;

                        //storeDetalleInspeccion.load({params: {filterText: rec.data.codigo_tramite}});
                        if (creacionDatosInspeccion) {
                            Ext.getCmp('btnNuevoDetalleInspeccion').setDisabled(false);
                            Ext.getCmp('btnEliminarDetalleInspeccion').setDisabled(false);
                            Ext.getCmp('gridDetalleInspeccion').setVisible(true);
                        }
                        //
                        storeCostoMacro.load({params: {id: 0}});
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloInspeccion,
                store: storeModuloInspeccion,
                displayInfo: true,
                displayMsg: 'Showing contributions: {0} - {1} of {2} - PMA',
                emptyMsg: "No contributions to be shown"
            })
        });
        //Fin formato grid Inspeccion

        this.gridCostoMacro = new Ext.grid.EditorGridPanel({
            id: 'gridCostoMacro',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight - winHeight * .35 - 165,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: 'auto',
            readOnly: false,
            store: this.storeCostoMacro,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id_macro',
                    dataIndex: 'id_pma_costos_macro',
                    hidden: true,
                    width: 80,
                    editor: textFieldDetalle
                },
                {
                    header: 'Cost Code Macro',
                    dataIndex: 'cost_code',
                    sortable: true,
                    width: 250,
                    editor: comboCOSTPARENTDET,
                    renderer: costparentAdmDet
                },
                {
                    header: 'Amount Programmed',
                    dataIndex: 'total',
                    hidden: false,
                    width: 100,
                    renderer: 'usMoney',
                    editor: textFieldDetalle, align: 'right'
                },
                {
                    header: 'Adjust',
                    dataIndex: 'adjust',
                    hidden: false,
                    width: 100,
                    renderer: 'usMoney',
                    editor: textFieldDetalle, align: 'right'
                },
                {
                    header: 'Total adjusted',
                    dataIndex: 'total_adjusted',
                    align: 'right',
                    hidden: false,
                    width: 100,
                    renderer: 'usMoney'
                },
                {header: 'Comment', dataIndex: 'comment', hidden: false, width: 150, editor: textFieldDetalle},
                {
                    header: 'Register Date',
                    dataIndex: 'fecha_registro',
                    hidden: false,
                    width: 100,
                    renderer: formatDateNoTime,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d'
                    })
                },

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
                pageSize: limiteDetalleInspeccion,
                store: storeCostoMacro,
                displayInfo: true,
                displayMsg: 'Showing macro costs: {0} - {1} de {2} - PMA',
                emptyMsg: "Select macro cost"
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

        //Fin formato grid detalle ajustes

        this.gridDetalleInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridDetalleInspeccion',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes

            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: 'auto',
            height: winHeight - winHeight * .35 - 165,
            readOnly: false,
            store: this.storeDetalleInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id_pma_contribuciones_detalle',
                    dataIndex: 'id_pma_contribuciones_detalle',
                    hidden: true,
                    width: 50
                },
                {header: 'Year', dataIndex: 'year', hidden: false, width: 50, editor: textFieldDetalle},
                {
                    header: 'Strategic Objectives',
                    dataIndex: 'so',
                    sortable: true,
                    width: 120,
                    editor: comboSO,
                    renderer: costSO
                },
                {
                    header: 'Activity',
                    dataIndex: 'activity',
                    sortable: true,
                    width: 100,
                    editor: comboActivities,
                    renderer: costActivities
                },
                {header: 'Total macro', dataIndex: 'total', renderer: 'usMoney', width: 100, align: 'right'}
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
                        if (creacionDatosInspeccion) {
                            Ext.getCmp('btnNuevoDetalleInspeccion').setDisabled(false);
                            Ext.getCmp('btnEliminarDetalleInspeccion').setDisabled(false);
                            Ext.getCmp('gridCostoMacro').setVisible(true);
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetalleInspeccion,
                store: storeDetalleInspeccion,
                displayInfo: true,
                displayMsg: '{0} - {1} de {2} - PMA',
                emptyMsg: "Select activities"
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

        //Fin formato grid detalle inspeccion

     /*   this.tree = new Ext.ux.tree.TreeGrid({
            title: 'Core Team Projects',
            width: 500,
            height: winHeight * 0.42,
            renderTo: Ext.getBody(),
            enableDD: true,

            columns: [{
                header: 'Description',
                dataIndex: 'description',
                width: 230
            }, {
                header: 'Duration',
                width: 100,
                dataIndex: 'active',
                align: 'center',
                sortType: 'asFloat',
                tpl: new Ext.XTemplate('{duration:this.formatHours}', {
                    formatHours: function (v) {
                        if (v < 1) {
                            return Math.round(v * 60) + ' mins';
                        } else if (Math.floor(v) !== v) {
                            var min = v - Math.floor(v);
                            return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
                        } else {
                            return v + ' hour' + (v === 1 ? '' : 's');
                        }
                    }
                })
            }, {
                header: 'Cost',
                width: 150,
                dataIndex: 'cost'
            }],
            dataUrl: urlInspeccion + 'treegrid-data.php'
        });
*/
         //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            //Creación de la ventana win
            win = desktop.createWindow({
                id: 'grid-win-moduloInspeccion',
                //Definición del título de la ventana
                title: 'MACRO PLANIFICATION',
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
                            autoScroll: true,
                            title: 'Contributions',
                            closable: false,
                            //layout: 'fit',
                            //height: winHeight-70,
                            disabled: accesosInspectores,
                            hidden: true,
                            id: 'tramites-pendientes',
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'New',
                                    scope: this,
                                    handler: this.addModuloInspeccion,
                                    disabled: false,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deleteModuloInspeccion,
                                    //disabled: true,
                                    //disabled: !creacionTramites,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón Recargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataModuloInspeccion,
                                    scope: this,
                                    text: 'Reload data'
                                },
                                '-',
                                /*{
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
                                        storeModuloInspeccion.baseParams = {
                                            pendientesAprobar: isChecked
                                        };

                                        // if (!this.checked) {
                                        //Ext.getCmp('tb_seleccionarUnidad').setValue('Seleccionar Unidad');
                                        //}
                                    }
                                },*/
                                '-',
                                //bh boton generar
                                /*   {
                                       iconCls: 'excel-icon',
                                       handler: this.botonGenerarActa,
                                       scope: this,
                                       text: 'Generar Nueva Acta',
                                       tooltip: 'Se genera acta con las ',
                                       id: 'tb_repoteDenuncias',
                                       disabled: false
                                   },*/

                                //bh boton migrar Wings

                                {
                                    xtype: 'form',
                                    fileUpload: true,
                                    width: 300,
                                    frame: true,
                                    autoHeight: 50,
                                    defaults: {
                                        anchor: '100%',
                                        allowBlank: false
                                    },
                                    id: "fp",
                                    items: [
                                        {
                                            xtype: 'fileuploadfield',
                                            id: 'form-file',
                                            emptyText: 'Select file to import',
                                            fieldLabel: 'Excel File',
                                            name: 'photo-path',
                                            regex: /^.*.(xls|XLS|xlsx|XLSX)$/,
                                            regexText: 'Only Excel',
                                            buttonText: '',
                                            //buttonOnly: true,
                                            buttonCfg: {
                                                iconCls: 'ux-start-menu-submenu'
                                            }
                                        }
                                    ]
                                },
                                '-',
                                {
                                    text: "Upload Excel File",
                                    scope: this,
                                    handler: this.botonImportarWings,
                                    id: 'subirimagen',
                                    iconCls: 'subir-icon',
                                    //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                    disabled: false
                                },
                                '->'
                                , {
                                    text: 'Search by:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' ', ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storeModuloInspeccion
                                })
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: [
                                {
                                    id: 'formModuloInspeccion',
                                    titleCollapse: true,
                                    flex: 1,
                                    autoScroll: false,
                                    layout: 'column',
                                    items: this.gridModuloInspeccion
                                },
                                {
                                    flex: 2,
                                    bodyStyle: 'padding:0; background: #0f6dff',
                                    items: [
                                        {
                                            layout: 'border',
                                            height: winHeight - winHeight * 0.35 - 107,
                                            items: [{
                                                region: 'west',
                                                id: 'west-panel',
                                                title: 'Activities',
                                                split: true,
                                                width: 200,
                                                width: winWidth * 0.3,
                                                minSize: 175,
                                                maxSize: 400,
                                                collapsible: true,
                                                layoutConfig: {
                                                    animate: true
                                                },
                                                items: [{
                                                    tbar: [
                                                        //Definición de botón nuevo
                                                        {
                                                            id: 'btnNuevoDetalleInspeccion',
                                                            text: 'New',
                                                            scope: this,
                                                            handler: this.addDetalleInspeccion,
                                                            disabled: false,
                                                            iconCls: 'save-icon'
                                                        },
                                                        '-',
                                                        //Definición de botón eliminar
                                                        {
                                                            id: 'btnEliminarDetalleInspeccion',
                                                            text: "Delete",
                                                            scope: this,
                                                            handler: this.deleteDetalleInspeccion,
                                                            //disabled: true,
                                                            iconCls: 'delete-icon'
                                                        },
                                                        '-',
                                                        //Definición de botón Recargar datos
                                                        {
                                                            id: 'btnRecargarDatosDetalleInspeccion',
                                                            iconCls: 'reload-icon',
                                                            handler: this.requestGridDataDetalleInspeccion,
                                                            disabled: false,
                                                            scope: this,
                                                            text: 'Reload data'
                                                        }

                                                    ],
                                                    items: this.gridDetalleInspeccion
                                                }]
                                            }, {
                                                title: 'Macro Costs',
                                                region: 'center',
                                                items: [
                                                    {
                                                        tbar: [
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
                                                                text: "Eliminar",
                                                                scope: this,
                                                                handler: this.deleteCostoMacro,
                                                                disabled: false,
                                                                iconCls: 'delete-icon'
                                                            },
                                                            '-',
                                                            //Definición de botón Reload data datos
                                                            {
                                                                id: 'btnRecargarDatosCostoMacro',
                                                                iconCls: 'reload-icon',
                                                                handler: this.requestGridDataCostoMacro,
                                                                disabled: false,
                                                                scope: this,
                                                                text: 'Reload data'
                                                            }

                                                        ],
                                                        items: this.gridCostoMacro
                                                    }]


                                            }]
                                        }
                                    ]
                                }],
                        },
                        // {
                        //     title: 'Actas',
                        //     closable: true,
                        //     layout: 'border',
                        //     id: 'actas',
                        //     disabled: accesosInspectores,
                        //     tbar: [
                        //         {
                        //             iconCls: 'reload-icon',
                        //             handler: this.requestGridDataDenunciasActa,
                        //             scope: this,
                        //             text: 'Reload data'
                        //
                        //         },
                        //         {
                        //             iconCls: 'excel-icon',
                        //             handler: this.botonImprimirActa,
                        //             scope: this,
                        //             text: 'Imprimir Acta',
                        //             tooltip: 'Se reimprime el acta seleccionada.',
                        //             id: 'tb_repoteActas',
                        //             // disabled: !acceso
                        //         }
                        //     ],
                        //     items: [
                        //         {
                        //             region: 'north',
                        //             height: 200,
                        //             minSize: 100,
                        //             maxSize: 150,
                        //             closable: true,
                        //             autoScroll: false,
                        //             items: this.gridInspeccionActa
                        //
                        //         },
                        //         // create instance immediately
                        //         {
                        //             region: 'center',
                        //             split: true,
                        //             autoScroll: true,
                        //             height: 300,
                        //             minSize: 100,
                        //             maxSize: 150,
                        //             margins: '0 0 0 0',
                        //             items: this.gridInspeccionActaSimple
                        //         }
                        //     ]
                        //
                        // },
                        // {
                        //     autoScroll: true,
                        //     title: 'Inspecciones',
                        //     closable: false,
                        //     id: 'inspecciones',
                        //
                        //     tbar: [
                        //         //Definición de botón Recargar datos
                        //         {
                        //             iconCls: 'reload-icon',
                        //             handler: this.requestGridDataListadoInspeccion,
                        //             scope: this,
                        //             text: 'Reload data'
                        //         }, '-',
                        //         {
                        //             xtype: 'label',
                        //             html: "<object id='clipboard' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='16' height='16' align='middle'><param name='allowScriptAccess' value='always' /><param name='allowFullScreen' value='false' /><param name='movie' value='modules/common/libraries/grid-copy-clipboard/clipboard.swf' /><param name='quality' value='high' /><param name='bgcolor' value='#ffffff' /><param name='wmode' value='transparent' /><param name='flashvars' value='callback=f1' /><embed src='modules/common/libraries/grid-copy-clipboard/clipboard.swf' flashvars='callback=f1' quality='high' swliveconnect='true' bgcolor='#ffffff' width='16' height='16' wmode='transparent' name='clipboard' align='middle' allowscriptaccess='always' allowfullscreen='false' type='application/x-shockwave-flash' pluginspage='http://www.adobe.com/go/getflashplayer' /></object>"
                        //         },
                        //
                        //         '-',
                        //         /* {
                        //              iconCls: 'reload-icon',
                        //              handler: this.f1,
                        //              scope: this,
                        //              text: 'Recargar'
                        //          }, '-',*/
                        //         '->'
                        //         , {
                        //             text: 'Search by:'
                        //             , xtype: 'tbtext'
                        //         }
                        //
                        //         , searchListadoInpeccionesBtn
                        //         , ' ', ' '
                        //         , new QoDesk.QoAdmin.SearchField({
                        //             paramName: 'filterText'
                        //             ,
                        //             store: this.storeListadoInspeccion
                        //         })
                        //     ], items: [{
                        //         id: 'formListadoInspeccion',
                        //         titleCollapse: true,
                        //         flex: 1,
                        //         autoScroll: true,
                        //         layout: 'column',
                        //         items: this.gridListadoInspeccion
                        //     }]
                        // }
                    ]
                })
            });
        }
        //Llamado a función que muestra la ventana en pantalla
        win.show();

        setTimeout(function () {
            this.storeModuloInspeccion.load({
                params: {
                    start: 0,
                    limit: limiteModuloInspeccion,
                    pendientesAprobar: isChecked
                }
            });
        },  500);
    },

    //Función para eliminación de registros de Inspeccion
    deleteModuloInspeccion: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridModuloInspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeModuloInspeccion.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Inspeccion
    addModuloInspeccion: function () {
        var inspeccion = new this.storeModuloInspeccion.recordType({
            grant_number: '',
            crn: '',
            fund: 0,
            donor: '',
            year_contribution: (new Date().getFullYear()),
             isc: '',
            total_grant: 0,
            total_programmed: 0
        });
        this.gridModuloInspeccion.stopEditing();
        this.storeModuloInspeccion.insert(0, inspeccion);
        this.gridModuloInspeccion.startEditing(0, 1);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloInspeccion
    requestGridDataModuloInspeccion: function () {
        this.storeModuloInspeccion.load();
    },

   /* f1: function () {
        var format;
        format = SerializationMode.TabDelimited;
        //var s = Ext.getCmp('gridListadoTodosInspectores').store.serializeData(format);
        var s = Ext.getCmp('gridListadoTodosInspectores').store.serializeData(format);
        if (window.clipboardData)
            window.clipboardData.setData('text', s);
        else
            return (s);
    },*/
    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloInspeccion
/*    requestGridDataDenunciasActa: function () {

        this.storeInspeccionActa.load();
    },*/

    //Función para eliminación de registros de Inspeccion
    deleteDetalleInspeccion: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDetalleInspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDetalleInspeccion.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de inspeccion
    addDetalleInspeccion: function () {
        var inspeccion = new this.storeDetalleInspeccion.recordType({
            year: (new Date().getFullYear()),
            so: '',
            activity: '',
            //id_cost: '',
            id_pma_contribuciones_detalle: selectContribuciones
        });
        this.gridDetalleInspeccion.stopEditing();
        this.storeDetalleInspeccion.insert(0, inspeccion);
        this.gridDetalleInspeccion.startEditing(0, 1);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridDataDetalleInspeccion: function () {
        console.log(contribucionSeleccionada)
        this.storeDetalleInspeccion.load({
            params: {
                id: contribucionSeleccionada
            }
        });
    },

    //Función para carga de datos
    requestGridData: function () {
        this.storeModuloInspeccion.load({
            params:
                {
                    start: 0,
                    limit: limiteModuloInspeccion
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
            id_pma_costos_macro: select_SO,
            cost_code: 1,
            total: 0,
            doc: 0,
            dsc: 0,
            adjust: 0,
            comment: ' ',
            total_adjusted: 0,
            // activity: 1,
            // id_cost: ' ',
            fecha_registro: (new Date())
        });
        this.gridCostoMacro.stopEditing();
        this.storeCostoMacro.insert(0, inspeccion);
        this.gridCostoMacro.startEditing(0, 1);
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
        this.storeModuloInspeccion.load({
            params:
                {
                    start: 0,
                    limit: limiteModuloInspeccion
                }
        });
    },


    // bh boton generar nueva guía
   /* botonGenerarActa: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargar acta<br>El estado del trámite será actualizado.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/inspeccion/server/generarNuevasGuias.php';
                    setTimeout(function () {
                        AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                        storeModuloInspeccion.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    }, 1500);
                }
            }
        });
    },
*/

    // bh boton migrar informacion wings
    botonImportarWings: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'La migración sobrescribirá la información anterior<br><br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    //                window.location.href = 'modules/desktop/inspeccion/server/migrarWings.php';
                    //                setTimeout(function () {
                    //                    AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                    //                    storeModuloInspeccion.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    //                }, 1500);
                    if (Ext.getCmp('fp').getForm().isValid()) {
                        Ext.getCmp('fp').getForm().submit({
                            url: 'modules/desktop/inspeccion/server/migrarWings.php',
                            waitMsg: 'Subiendo archivo...',
                            //params: {data: selectOperativos},
                            success: function (fp, o) {


                                Ext.getCmp('fp').getForm().reset();
                            },
                            failure: function (form, action) {
                                //var errorJson = JSON.parse(action.response.responseText);
                                /*Ext.Msg.show({
                                    title: 'Error '
                                    , msg: errorJson.msg
                                    , modal: true
                                    , icon: Ext.Msg.ERROR
                                    , buttons: Ext.Msg.OK
                                });*/
                            }

                        });
                    }

                }
            }
        });
    },

    // bh boton generar nueva guía
    // ?reimpresion=true&guia=' + rows[0].get('id')
    /*botonImprimirActa: function () {
        // recuperamos registro seleccionado de datagrid denunciaguia
        var rows = this.gridInspeccionActa.getSelectionModel().getSelections();
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
        window.location.href = 'modules/desktop/inspeccion/server/generarNuevasGuias.php?reimpresion=true&guia=' + rows[0].get('id');
    },*/

    //bh boton generar nueva guía
    /*botonGenerarHojaRuta: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargar hoja de ruta<br>El estado de la inspección será actualizado.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    window.location.href = 'modules/desktop/inspeccion/server/generarHojaRuta.php';
                    /!*setTimeout(function () {
                        AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                        storeModuloInspeccion.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    }, 1500);
                    *!/
                }
            }
        });
    }*/

});
