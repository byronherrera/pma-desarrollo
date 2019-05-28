QoDesk.PersonalWindow = Ext.extend(Ext.app.Module, {
    id: 'personal',
    type: 'desktop/personal',

    init: function () {
        this.launcher = {
            text: 'Personal',
            iconCls: 'personal-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosPersonal = this.app.isAllowedTo('accesosPersonal', this.id);
        finalizados = true;
        limitepersonal = 100;
        this.selectPersonal = 0;
        selectPersonal = 0;
        // estado no usado
        //var accesosRecepciónIns = this.app.isAllowedTo('accesosRecepciónOpe', this.id);

        //var acceso = (accesosAdministradorOpe || accesosPersonal || accesosRecepciónIns) ? true : false
        var acceso = (accesosAdministradorOpe || accesosPersonal ) ? true : false

        var gridBlockPersonal = false;
        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-personal');
        var urlPersonal = "modules/desktop/personal/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }

        function formatDateFull(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

// inicio combos secretaria

        //inicio combo tipo documento  OPTID
        storeOPTID = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboOPTID = new Ext.ux.form.CheckboxCombo({
            width: 250,
            mode: 'local',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            allowBlank: false,
            listeners: {
                'change': function (cmb, arr) {
                }
            }
        });

        var comboOPTIDSimple = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalTipoPersonalSimple(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }


        var comboOPTIDSimple2 = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalTipoPersonalSimple2(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }


        function personalTipoPersonal(id) {
            if (id === '') return '';
            var nombres = id.split(",");
            retorno = '';
            for (var i = 0; i < nombres.length; i++) {
                index = storeOPTID.findExact('id', nombres[i]);
                var record = storeOPTID.getAt(index);
                if (typeof record !== 'undefined') {
                    retorno = record.data.nombre + ',' + retorno
                }
            }
            return retorno
        }

        //fin combo tipo documento  OPTID
//inicio combo tipo MEDIDA operativo
        storeOPINFOMEDIDA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposMedidasPersonal'
        });

        var comboOPINFOMEDIDA = new Ext.form.ComboBox({
            id: 'comboOPINFOMEDIDA',
            store: storeOPINFOMEDIDA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalTipoMedida(id) {
            var index = storeOPINFOMEDIDA.findExact('id', id);
            if (index > -1) {
                var record = storeOPINFOMEDIDA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel MEDIDA OPERATIVO
        //inicio combo activo
        storeOPOFAC = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'true', "nombre": "Si"},
                    {"id": 'false', "nombre": "No"}
                ]
            }
        });

        var comboOPOFAC = new Ext.form.ComboBox({
            id: 'comboOPOFAC',
            store: storeOPOFAC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalDespachadoActivo(id) {
            var index = storeOPOFAC.findExact('id', id);
            if (index > -1) {
                var record = storeOPOFAC.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo activo

        //inicio combo nivel complejidad
        storeOPNICO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": '1', "nombre": "Alto"},
                    {"id": '2', "nombre": "Medio"},
                    {"id": '3', "nombre": "Bajo"}
                ]
            }
        });

        var comboOPNICO = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPNICO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalNivelComplejidad(id) {
            var index = storeOPNICO.findExact('id', id);
            if (index > -1) {
                var record = storeOPNICO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo tipo operativo
        storeOPTIPO = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tipospersonal'
        });

        var comboOPTIPO = new Ext.form.ComboBox({
            id: 'comboOPTIPO',
            store: storeOPTIPO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalTipo(id) {
            var index = storeOPTIPO.findExact('id', id);
            if (index > -1) {
                var record = storeOPTIPO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo tipo operativo
        storeOPENTT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposentidades'
        });

        var comboOPENTT = new Ext.form.ComboBox({
            id: 'comboOPENTT',
            store: storeOPENTT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function entidadesTipo(id) {
            var index = storeOPENTT.findExact('id', id);
            if (index > -1) {
                var record = storeOPENTT.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo Unidades
        storeOPREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre', 'orden'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadessinfiltro',
            remoteSort: true, //true for server sorting
            sorters: [{
                property: 'orden',
                direction: 'ASC' // or 'ASC'
            }],
        });

        storeOPREA.sort('orden', 'ASC');
        var comboOPREA = new Ext.form.ComboBox({
            id: 'comboOPREA',
            store: storeOPREA,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        function personalUnidades(id) {
            var index = storeOPREA.findExact('id', id);
            if (index > -1) {
                var record = storeOPREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }

        //fin combo reasignacion OPREA


        //inicio combo reasignacion  OPREATOT
        storeOPREATOT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadestotal'
        });

        var comboOPREATOT = new Ext.form.ComboBox({
            id: 'comboOPREATOT',
            store: storeOPREATOT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoOPREATOTsignacion(id) {
            var index = storeOPREATOT.findExact('id', id);
            var record = storeOPREATOT.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion OPREATOT
        //inicio combo personal estado
        storeOPESTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalestados'
        });

        var comboOPESTA = new Ext.form.ComboBox({
            id: 'comboOPESTA',
            store: storeOPESTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalEstados(id) {
            var index = storeOPESTA.findExact('id', id);
            if (index > -1) {
                var record = storeOPESTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo personal estado
        //inicio combo guia  OPREAGUIA
        storeOPREAGUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=guia'
        });

        var comboOPREAGUIA = new Ext.form.ComboBox({
            id: 'comboOPREAGUIA',
            store: storeOPREAGUIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoOPREAGUIAS(id) {
            var index = storeOPREAGUIA.findExact('id', id);
            var record = storeOPREAGUIA.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion OPREAGUIA

        //inicio combo tipo documento  OPPERENC
        storeOPPERENC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalpersonal',
            baseParams: {
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosPersonal: accesosPersonal,
                acceso: acceso
            }
        });

        var comboOPPERENC = new Ext.ux.form.CheckboxCombo({
            width: 250,
            mode: 'local',
            store: storeOPPERENC,
            valueField: 'id',
            displayField: 'nombre',
            allowBlank: false,
            listeners: {
                'change': function (cmb, arr) {
                }
            }
        });

        function personalPersonalEncargado(id) {

            if (id === '') return ' ';
            if (id === null) return ' ';
            var nombres = id.split(",");
            retorno = '';

            for (var i = 0; i < nombres.length; i++) {
                index = storeOPPERENC.findExact('id', nombres[i]);
                var record = storeOPPERENC.getAt(index);
                if (typeof record !== 'undefined') {
                    retorno = record.data.nombre + ',' + retorno
                }
            }
            return retorno
        }

        //fin combo tipo documento  OPPERENC


        //inicio combo persona recepta la personal PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalpersonal',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosPersonal: accesosPersonal,
                acceso: acceso
            }

        });


        var comboPRD = new Ext.form.ComboBox({
            id: 'comboPRD',
            store: storePRD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        var comboPRD2 = new Ext.form.ComboBox({
            id: 'comboPRD2',
            store: storePRD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaDenuncia(id) {
            var index = storePRD.findExact('id', id);
            if (index > -1) {
                var record = storePRD.getAt(index);
                return record.get('nombre');
            }
        }

        storePRD2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalpersonal',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: true,
                accesosPersonal: false,
                acceso: acceso
            }

        });

        var comboPRD2 = new Ext.form.ComboBox({
            id: 'comboPRD2',
            store: storePRD2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaDenuncia2(id) {
            var index = storePRD2.findExact('id', id);
            if (index > -1) {
                var record = storePRD2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la personal PRD

// fin combos secretaria

// inicio combos personal

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

        function zonaAdm(id) {
            var index = storeZONA.findExact('id', id);
            if (index > -1) {
                var record = storeZONA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ZONA

        //inicio combo actividad  ACTA
        storeACTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=depPersonal'
        });

        var comboACTA = new Ext.form.ComboBox({
            id: 'comboACTA',
            store: storeACTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function actividadAdm(id) {
            var index = storeACTA.findExact('id', id);
            if (index > -1) {
                var record = storeACTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo actividad  ACTA
        storeSINO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 'false', "nombre": "NO"},
                    {"id": 'true', "nombre": "SI"}
                ]
            }
        });
        //inicio combo Estado Recepcion Información Personal ESOPREA
        storeESOPREA = new Ext.data.JsonStore({
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

        var comboESOPREA = new Ext.form.ComboBox({
            id: 'comboESOPREA',
            store: storeESOPREA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRecepcionAdm(id) {
            var index = storeESOPREA.findExact('id', id);
            if (index > -1) {
                var record = storeESOPREA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Estado Recepcion Información Personal ESOPREA

        //inicio combo procedimientos PRSA
        storePRSA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=procedimiento'
        });

        var comboPRSA = new Ext.form.ComboBox({
            id: 'comboPRSA',
            store: storePRSA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function procedimientosAdm(id) {
            var index = storePRSA.findExact('id', id);
            if (index > -1) {
                var record = storePRSA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo procedimientos PRSA

        //inicio combo persona asignada PRASA
        storePRASA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalpersonal'
        });

        var comboPRASA = new Ext.form.ComboBox({
            id: 'comboPRASA',
            store: storePRASA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personaAsignadaAdm(id) {
            var index = storePRASA.findExact('id', id);
            if (index > -1) {
                var record = storePRASA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite PRASA
// inicio combos personal

// inicio pestañas de mantenimiento


        //inicio mantenimiento PersonalGuia
        var proxyPersonalGuia = new Ext.data.HttpProxy({
            api: {
                create: urlPersonal + "crudPersonalGuia.php?operation=insert",
                read: urlPersonal + "crudPersonalGuia.php?operation=select",
                update: urlPersonal + "crudPersonalGuia.php?operation=update",
                destroy: urlPersonal + "crudPersonalGuia.php?operation=delete"
            }
        });

        var readerPersonalGuia = new Ext.data.JsonReader({
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

        var writerPersonalGuia = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePersonalGuia = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonalGuia,
            reader: readerPersonalGuia,
            writer: writerPersonalGuia,
            autoSave: true
        });
        this.storePersonalGuia.load();

        this.gridPersonalGuia = new Ext.grid.EditorGridPanel({
            id: 'gridPersonalGuia',
            xtype: "grid",
            height: 200,
            store: this.storePersonalGuia,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Número',
                    dataIndex: 'numero',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Fecha Guía',
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
                        storePersonalPersonal.load({params: {idOperativo: rec.get("id")}})
                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storePersonalGuia,
                displayInfo: true,
                displayMsg: 'Mostrando trámite {0} - {1} de {2}',
                emptyMsg: "No existen tramites que mostrar"
            }),
        });

        //fin mantenimiento PersonalGuías


// fin pestañas de mantenimiento

        // inicio ventana personal
        var proxyPersonal = new Ext.data.HttpProxy({
            api: {
                create: urlPersonal + "crudPersonal.php?operation=insert",
                read: urlPersonal + "crudPersonal.php?operation=select",
                update: urlPersonal + "crudPersonal.php?operation=update",
                destroy: urlPersonal + "crudPersonal.php?operation=delete"
            },

            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerPersonal = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'id_persona', allowBlank: false},
                {name: 'fecha_planificacion', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'fecha_inicio_planificacion', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'fecha_fin_planificacion', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'fecha_informe', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha_fin_planificacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha_fin_planificacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_tipo_control', allowBlank: false},
                {name: 'id_nivel_complejidad', allowBlank: false},
                {name: 'id_zonal', allowBlank: true},
                {name: 'observaciones', allowBlank: true},
                {name: 'tramite', allowBlank: true},
                {name: 'tipo_operativo', allowBlank: false},
                {name: 'zona', allowBlank: true},
                {name: 'id_unidad', allowBlank: true},
                {name: 'punto_encuentro_planificado', allowBlank: true},
                {name: 'id_persona_encargada', allowBlank: false},
                /* {name: 'fallido', type: 'boolean', allowBlank: false},*/
                /* {name: 'finalizado', type: 'boolean', allowBlank: false},*/
                {name: 'id_estado', allowBlank: false},
                {name: 'visible', type: 'boolean', allowBlank: true}
            ]
        });
        var writerPersonal = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storePersonal = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonal,
            reader: readerPersonal,
            writer: writerPersonal,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limitepersonal,
                finalizados: finalizados,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosPersonal: accesosPersonal,
                acceso: acceso
            }
        });
        storePersonal = this.storePersonal;

        this.gridPersonal = new Ext.grid.EditorGridPanel({
            height: desktop.getWinHeight() - 380,
            store: this.storePersonal,
            columns: [
                new Ext.grid.RowNumberer(),
                /* {
                 header: 'Código',
                 dataIndex: 'codigo_operativo',
                 sortable: true,
                 width: 45
                 },*/
                {
                    header: 'Código',
                    dataIndex: 'id',
                    sortable: true,
                    width: 45
                },
                {
                    header: 'Visible',
                    dataIndex: 'visible',
                    sortable: true,
                    width: 45,
                    align: 'center',
                    editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , xtype: 'booleancolumn'
                },
                {
                    header: 'Fecha inicio',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 100,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Fecha Fin',
                    dataIndex: 'fecha_fin_planificacion',
                    sortable: true,
                    width: 100,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Zonal',
                    dataIndex: 'id_zonal',
                    sortable: true,
                    width: 100,
                    editor: comboZONA, renderer: zonaAdm
                },
                {
                    header: 'Tipo de control',
                    dataIndex: 'id_tipo_control',
                    sortable: true,
                    width: 100,
                    editor: comboOPTID, renderer: personalTipoPersonal
                },
                {
                    header: 'Unidad',
                    dataIndex: 'id_unidad',
                    sortable: true,
                    width: 120, editor: comboOPREA,
                    renderer: personalUnidades
                },

                {
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 60,
                    editor: comboOPNICO, renderer: personalNivelComplejidad
                },
                {
                    header: 'Responsable',
                    dataIndex: 'id_persona_encargada',
                    sortable: true,
                    width: 120,
                    editor: comboPRD,
                    renderer: personaReceptaDenuncia,
                    /*
                     editor: comboOPPERENC,
                     renderer: personalPersonalEncargado,*/
                    id: 'id_persona_encargada'
                },
                {
                    header: 'Lugar intervención',
                    dataIndex: 'zona',
                    sortable: true,
                    width: 130,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Punto Encuentro',
                    dataIndex: 'punto_encuentro_planificado',
                    sortable: true,
                    width: 130,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 140,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Trámite',
                    dataIndex: 'tramite',
                    sortable: true,
                    width: 50,
                    editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 100000
                    })
                },
                {
                    header: 'Elaborado',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 100,
                    hidden: true,
                    //editor: comboPRD,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Fecha elaboracion',
                    dataIndex: 'fecha_planificacion',
                    sortable: true,
                    width: 100, hidden: true,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },

                {
                    header: 'Tipo planificación'
                    , dataIndex: 'tipo_operativo'
                    , align: 'left'
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 140
                    , editor: comboOPTIPO
                    , renderer: personalTipo
                },

                {
                    header: 'Fecha informe',
                    dataIndex: 'fecha_informe',
                    sortable: true,
                    width: 100, hidden: true,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Fecha Real Inicio',
                    dataIndex: 'fecha_real_inicio',
                    sortable: true,
                    width: 100, hidden: true,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Fecha Real Fin',
                    dataIndex: 'fecha_real_fin',
                    sortable: true,
                    width: 100, hidden: true,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Estado',
                    dataIndex: 'id_estado',
                    sortable: true,
                    width: 100,
                    editor: comboOPESTA,
                    renderer: personalEstados
                },

            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    // validamos la fecha
                    fechaActual = new Date();
                    fechaOperativo = record.get('fecha_fin_planificacion')

                    var diasDif = fechaActual.getTime() - fechaOperativo.getTime();
                    var horas = Math.round(diasDif / (1000 * 60 * 60 ));

                    if ((record.get('id_estado') == 1) && (horas > 86)) {
                        return 'redstate';
                    }

                    // registros que estan en planificacion
                    if (record.get('id_estado') == 1) {
                        // Ext.getCmp('id_persona_encargada').setReadOnly(true);
                        return 'gold';
                    }
                    // registros que ya estan realizados
                    if (record.get('id_estado') == 4) {
                        return 'bluestate';
                    }
                }
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {

                            // recuperamos la informacion de personal asignado a ese operativo
                            selectPersonal = rec.id;
                            storePersonalPersonal.load({params: {id_operativo: rec.id}});
                            storePersonalVehiculos.load({params: {id_operativo: rec.id}});
                            storePersonalInforme.load({params: {id_operativo: rec.id}});
                            storePersonalParticipantes.load({params: {id_operativo: rec.id}});
                            storePersonalImagenes.load({params: {id_operativo: rec.id}});

                            // para el caso que el operativo se haya finalizado se bloquea ya el borrar o editar
                            if (acceso) {
                                if (rec.get("id_estado") != 1) {
                                    Ext.getCmp('informesPersonalTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('imagenesPersonalTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('detallePersonalTab').setDisabled(acceso ? false : true);
                                    cargaDetalle(rec.id);
                                }
                                else {
                                    Ext.getCmp('informesPersonalTab').setDisabled(true);
                                    Ext.getCmp('imagenesPersonalTab').setDisabled(true);
                                    Ext.getCmp('detallePersonalTab').setDisabled(true);
                                    cargaDetalle(rec.id);
                                }

                                if ((rec.get("id_estado") == 1) || (rec.get("id_estado") == 4)) {
                                    gridBlockPersonal = false;
                                    Ext.getCmp('savedetalleoperativo').setDisabled(false);

                                    Ext.getCmp('borraroperativo').setDisabled(accesosAdministradorOpe ? false : true);
                                    Ext.getCmp('addpersonal').setDisabled(accesosAdministradorOpe ? false : true);
                                    // en caso que se tenga acceso tambien se habilitan o deshabilitan los botones para agregar detalle
                                    Ext.getCmp('borraroperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                    Ext.getCmp('addoperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);

                                    Ext.getCmp('borraroperativoparticipantes').setDisabled(accesosAdministradorOpe ? false : true);
                                    Ext.getCmp('addoperativoparticipantes').setDisabled(accesosAdministradorOpe ? false : true);

                                    Ext.getCmp('borraroperativodetallevehiculo').setDisabled(accesosAdministradorOpe ? false : true);
                                    Ext.getCmp('addoperativodetallevehiculo').setDisabled(accesosAdministradorOpe ? false : true);

                                    Ext.getCmp('borraroperativodetalleInforme').setDisabled(false);
                                    Ext.getCmp('addoperativodetalleInforme').setDisabled(false);

                                    Ext.getCmp('borraroperativoimagenes').setDisabled(false);

                                    Ext.getCmp('addoperativoimagenes').setDisabled(false);
                                    Ext.getCmp('subirimagen').setDisabled(false);
                                    // solamente para el caso
                                }
                                else {
                                    gridBlockPersonal = true;
                                    Ext.getCmp('savedetalleoperativo').setDisabled(true);

                                    Ext.getCmp('borraroperativo').setDisabled(true);
                                    Ext.getCmp('addpersonal').setDisabled(true);
                                    Ext.getCmp('borraroperativodetalle').setDisabled(true);
                                    Ext.getCmp('addoperativodetalle').setDisabled(true);

                                    Ext.getCmp('borraroperativoparticipantes').setDisabled(true);
                                    Ext.getCmp('addoperativoparticipantes').setDisabled(true);

                                    Ext.getCmp('borraroperativodetallevehiculo').setDisabled(true);
                                    Ext.getCmp('addoperativodetallevehiculo').setDisabled(true);

                                    Ext.getCmp('borraroperativodetalleInforme').setDisabled(true);
                                    Ext.getCmp('addoperativodetalleInforme').setDisabled(true);

                                    Ext.getCmp('borraroperativoimagenes').setDisabled(true);
                                    Ext.getCmp('addoperativoimagenes').setDisabled(true);
                                    Ext.getCmp('subirimagen').setDisabled(true);

                                }


                                //para el caso  de los botones
                                if ((rec.get("id_estado") == 2) || (rec.get("id_estado") == 3) || (rec.get("id_estado") == 5)) {
                                    Ext.getCmp('tb_repotePersonal').setDisabled(false);
                                } else {
                                    Ext.getCmp('tb_repotePersonal').setDisabled(true);
                                }
                                //para el caso que se es administrador
                                if (accesosAdministradorOpe) {
                                    Ext.getCmp('savedetalleoperativo').setDisabled(false);
                                }
                            }
                        }
                    }
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitepersonal,
                store: storePersonal,
                displayInfo: true,
                displayMsg: 'Mostrando personal {0} - {1} de {2} - AMC',
                emptyMsg: "No existen personal que mostrar"
            }),

            listeners: {
                beforeedit: function (e) {
                    // si el operativo esta identificado como estado o planificado (1) o informe (4) se peude editar
                    if (acceso) {
                        if ((e.record.get("id_estado") == 1) || (e.record.get("id_estado") == 4)) {
                            return true;
                        }
                        return false;
                    } else {
                        return false;
                    }
                }
            }
        });
        // fin ventana personal

        // inicio ventana personal detalle personal
        var proxyPersonalPersonal = new Ext.data.HttpProxy({
            api: {
                create: urlPersonal + "crudPersonalPersonal.php?operation=insert",
                read: urlPersonal + "crudPersonalPersonal.php?operation=select",
                update: urlPersonal + "crudPersonalPersonal.php?operation=update",
                destroy: urlPersonal + "crudPersonalPersonal.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerPersonalPersonal = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_member', allowBlank: false},
                {name: 'id_operativo', allowBlank: false},
                {name: 'observaciones', allowBlank: true},
                {name: 'asistencia', type: 'boolean', allowBlank: true}
            ]
        });
        var writerPersonalPersonal = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePersonalPersonal = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonalPersonal,
            reader: readerPersonalPersonal,
            writer: writerPersonalPersonal,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storePersonalPersonal = this.storePersonalPersonal;

        this.gridPersonalPersonal = new Ext.grid.EditorGridPanel({
            id: 'gridPersonalPersonal',

            autoHeight: true,
            autoScroll: true,
            store: this.storePersonalPersonal,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Personal',
                    dataIndex: 'id_member',
                    sortable: true,
                    width: 30,
                    editor: comboPRD2,
                    renderer: personaReceptaDenuncia2

                },
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'Asistencia',
                    dataIndex: 'asistencia',
                    sortable: true,
                    width: 30,
                    editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , xtype: 'booleancolumn'
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        // verifico variable que permite editar o no
                        if (gridBlockPersonal) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }

            }
        });

        var gridPersonalPersonal = this.gridPersonalPersonal
        // fin  ventana personal detalle personal

        // inicio ventana personal detalle participantes
        var proxyPersonalParticipantes = new Ext.data.HttpProxy({
            api: {
                create: urlPersonal + "crudPersonalParticipantes.php?operation=insert",
                read: urlPersonal + "crudPersonalParticipantes.php?operation=select",
                update: urlPersonal + "crudPersonalParticipantes.php?operation=update",
                destroy: urlPersonal + "crudPersonalParticipantes.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerPersonalParticipantes = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_entidad', allowBlank: false},
                {name: 'id_operativo', allowBlank: false},
                {name: 'jefe_grupo', allowBlank: false},
                {name: 'personas', allowBlank: true},
                {name: 'observaciones', allowBlank: true},
                {name: 'asistencia', type: 'boolean', allowBlank: true}
            ]
        });
        var writerPersonalParticipantes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePersonalParticipantes = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonalParticipantes,
            reader: readerPersonalParticipantes,
            writer: writerPersonalParticipantes,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storePersonalParticipantes = this.storePersonalParticipantes;

        this.gridPersonalParticipantes = new Ext.grid.EditorGridPanel({
            id: 'gridPersonalParticipantes',
            autoHeight: true,
            autoScroll: true,
            store: this.storePersonalParticipantes,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Participantes',
                    dataIndex: 'id_entidad',
                    sortable: true,
                    width: 30,
                    editor: comboOPENTT,
                    renderer: entidadesTipo
                },
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true
                },
                {
                    header: 'Jefe Grupo',
                    dataIndex: 'jefe_grupo',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Total personal',
                    dataIndex: 'personas',
                    sortable: true,
                    width: 20,
                    align: 'right',
                    editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 100000
                    })
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Asistencia',
                    dataIndex: 'asistencia',
                    sortable: true,
                    width: 30,
                    editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , xtype: 'booleancolumn'
                }
            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        // verifico variable que permite editar o no
                        if (gridBlockPersonal) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });

        var gridPersonalParticipantes = this.gridPersonalParticipantes
        // fin ventana personal detalle participantes

        var detalleOperativo = new Ext.FormPanel({
            id: 'formaDetalleOperativo',
            frame: true,
            bodyStyle: 'padding:0',
            width: '100%',
            items: [{
                layout: 'column',
                items: [{
                    xtype: 'hidden',
                    fieldLabel: 'Id',
                    name: 'id'
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Parroquias Intervenidas',
                        name: 'parroquias',
                        id: 'parroquias',
                        anchor: '95%'
                    }]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Barrios Intervenidos',
                        name: 'barrios',
                        id: 'barrios',
                        anchor: '95%'
                    }]
                }]
            }, {
                xtype: 'textarea',
                id: 'detalle',
                fieldLabel: 'Detalle Operativo',
                height: 145,
                anchor: '98%',
                name: 'detalle'
            }],
            defaults: {
                listeners: {
                    change: function (field, newVal, oldVal) {

                        var myForm = Ext.getCmp('formaDetalleOperativo').getForm();
                        myForm.submit({
                            url: 'modules/desktop/personal/server/crudPersonal.php?operation=updateForm',
                            method: 'POST',

                            success: function (form, action) {
                            }
                        });

                    }
                },
            },


        });

        // inicio ventana personal detalle imagenes
        var proxyPersonalImagenes = new Ext.data.HttpProxy({
            api: {
                create: urlPersonal + "crudPersonalImagenes.php?operation=insert",
                read: urlPersonal + "crudPersonalImagenes.php?operation=select",
                update: urlPersonal + "crudPersonalImagenes.php?operation=update",
                destroy: urlPersonal + "crudPersonalImagenes.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerPersonalImagenes = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'url', allowBlank: false},

            ]
        });
        var writerPersonalImagenes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePersonalImagenes = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonalImagenes,
            reader: readerPersonalImagenes,
            writer: writerPersonalImagenes,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storePersonalImagenes = this.storePersonalImagenes;

        this.gridPersonalImagenes = new Ext.grid.EditorGridPanel({
            id: 'gridPersonalImagenes',
            autoHeight: true,
            store: this.storePersonalImagenes,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Url imagen',
                    dataIndex: 'url',
                    sortable: true,
                    width: 100,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Imagen',
                    dataIndex: 'url',
                    renderer: function (value) {
                        return '<img src="' + value + '" width="150" />';
                    }
                }
                /*, {
                 header: 'Test',
                 dataIndex: 'url',
                 sortable: true,
                 width: 60,
                 editor: new Ext.ux.form.FileUploadField({
                 buttonOnly: true,

                 })
                 }
                 */
            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        if (gridBlockPersonal) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });

        var gridPersonalImagenes = this.gridPersonalImagenes
        // fin ventana personal detalle imagenes


        // inicio ventana personal detalle informe
        var proxyPersonalInforme = new Ext.data.HttpProxy({
            api: {
                create: urlPersonal + "crudPersonalInforme.php?operation=insert",
                read: urlPersonal + "crudPersonalInforme.php?operation=select",
                update: urlPersonal + "crudPersonalInforme.php?operation=update",
                destroy: urlPersonal + "crudPersonalInforme.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerPersonalInforme = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'id_ordenanza', allowBlank: false},
                {name: 'administrado', allowBlank: true},
                {name: 'direccion', allowBlank: true},
                {name: 'hecho', allowBlank: false},
                {name: 'medida', allowBlank: true},
                {name: 'numero_auto_inicio', allowBlank: true},
                {name: 'observaciones', allowBlank: true}

            ]
        });
        var writerPersonalInforme = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePersonalInforme = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonalInforme,
            reader: readerPersonalInforme,
            writer: writerPersonalInforme,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storePersonalInforme = this.storePersonalInforme;

        this.gridPersonalInforme = new Ext.grid.EditorGridPanel({
            id: 'gridPersonalInforme',

            autoHeight: true,
            autoScroll: true,
            store: this.storePersonalInforme,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Ordenanza',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 30,
                    editor: comboOPTIDSimple2,
                    renderer: personalTipoPersonalSimple2
                },
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true
                },
                {
                    header: 'Nombre administrado',
                    dataIndex: 'administrado',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Dirección infracción',
                    dataIndex: 'direccion',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Hecho constatado',
                    dataIndex: 'hecho',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Número documento',
                    dataIndex: 'numero_auto_inicio',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Medida',
                    dataIndex: 'medida',
                    sortable: true,
                    width: 60,
                    editor: comboOPINFOMEDIDA,
                    renderer: personalTipoMedida
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 120,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        if (gridBlockPersonal) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });

        var gridPersonalInforme = this.gridPersonalInforme
        // inicio ventana personal detalle personal


        // inicio ventana personal detalle vehiculos
        var proxyPersonalVehiculos = new Ext.data.HttpProxy({
            api: {
                create: urlPersonal + "crudPersonalVehiculos.php?operation=insert",
                read: urlPersonal + "crudPersonalVehiculos.php?operation=select",
                update: urlPersonal + "crudPersonalVehiculos.php?operation=update",
                destroy: urlPersonal + "crudPersonalVehiculos.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerPersonalVehiculos = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'conductor', allowBlank: false},
                {name: 'telefono', allowBlank: false},
                {name: 'observaciones', allowBlank: true}
            ]
        });
        var writerPersonalVehiculos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storePersonalVehiculos = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonalVehiculos,
            reader: readerPersonalVehiculos,
            writer: writerPersonalVehiculos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storePersonalVehiculos = this.storePersonalVehiculos;

        this.gridPersonalVehiculos = new Ext.grid.EditorGridPanel({
            id: 'gridPersonalVehiculos',

            autoHeight: true,
            autoScroll: true,
            store: this.storePersonalVehiculos,
            columns: [
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'Conductor',
                    dataIndex: 'conductor',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Teléfono',
                    dataIndex: 'telefono',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: false,
            stripeRows: true,
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        if (gridBlockPersonal) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }


        });

        var gridPersonalVehiculos = this.gridPersonalVehiculos
        // inicio ventana personal detalle vehiculos


        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonal,
            reader: readerPersonal,
            writer: writerPersonal,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeDocumentosReporte = this.storeDocumentosReporte
        this.gridDocumentosReporte = new Ext.grid.EditorGridPanel({

            height: desktop.getWinHeight() - 268,
            autoScroll: true,
            store: this.storeDocumentosReporte,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'id',
                    sortable: true,
                    width: 17
                },
                {
                    header: 'Fecha inicio',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 37,
                    renderer: formatDate
                },
                {
                    header: 'Fecha Fin',
                    dataIndex: 'fecha_fin_planificacion',
                    sortable: true,
                    width: 37,
                    renderer: formatDate
                },
                {
                    header: 'Tipo de control',
                    dataIndex: 'id_tipo_control',
                    sortable: true,
                    width: 45,
                    renderer: personalTipoPersonal
                },
                {
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 30,
                    renderer: personalNivelComplejidad
                },
                {
                    header: 'Zonal',
                    dataIndex: 'id_zonal',
                    sortable: true,
                    width: 40,
                    renderer: zonaAdm
                },
                {
                    header: 'Responsable',
                    dataIndex: 'id_persona_encargada',
                    sortable: true,
                    width: 40,
                    renderer: personalPersonalEncargado
                },
                /*                {
                 header: 'Participantes',
                 dataIndex: 'participantes',
                 sortable: true,
                 width: 55
                 },*/
                {
                    header: 'Punto Encuentro',
                    dataIndex: 'punto_encuentro_planificado',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Trámite',
                    dataIndex: 'tramite',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Elaborado',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 30,
                    hidden: true,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Fecha elaboracion',
                    dataIndex: 'fecha_planificacion',
                    sortable: true,
                    width: 45, hidden: true,
                    renderer: formatDate
                },
                {
                    header: 'Tipo'
                    , dataIndex: 'tipo_operativo'
                    , align: 'center'
                    , sortable: true
                    , width: 30
                    //,hidden: true
                    , renderer: personalTipo
                },
                /* {
                 header: 'Fallido'
                 , dataIndex: 'fallido'
                 , align: 'center'
                 , falseText: 'No'
                 , menuDisabled: true
                 , trueText: 'Si'
                 , sortable: true
                 , width: 25
                 , xtype: 'booleancolumn'
                 },*/
                /*{
                 header: 'Finalizado'
                 , dataIndex: 'finalizado'
                 , align: 'center'
                 , falseText: 'No'
                 , menuDisabled: true
                 , trueText: 'Si'
                 , sortable: true
                 , width: 25
                 , xtype: 'booleancolumn'
                 }*/
            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeDocumentosReporte,
                displayInfo: true,
                displayMsg: 'Mostrando personal {0} - {1} de {2}  >>',
                emptyMsg: "No existen personal que mostrar"
            }),
        });
        // fin datastore and datagrid in Guia


        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            this.seleccionDepar = 3;

            this.formConsultaDocumentos = new Ext.FormPanel({
                layout: 'column',
               // title: 'Ingrese los parámetros',
                frame: true,
                bodyStyle: 'padding:5px 5px 0',
                items: [
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'datetimefield',
                                fieldLabel: 'Fecha Inicio',
                                id: 'busqueda_fecha_inicio',
                                anchor: '95%',
                                dateFormat: 'Y-m-d',
                                timeFormat: 'H:i:s'
                            },
                            {
                                xtype: 'datetimefield',
                                fieldLabel: 'Fecha Fin',
                                id: 'busqueda_fecha_fin',
                                anchor: '95%',
                                dateFormat: 'Y-m-d',
                                timeFormat: 'H:i:s'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Tipo control',
                                id: 'busqueda_tipo_control',
                                name: 'busqueda_tipo_control',
                                hiddenName: 'busqueda_tipo_control',

                                anchor: '95%',
                                store: storeOPTID,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Nivel Complejidad',
                                id: 'busqueda_nivel_complejidad',
                                name: 'busqueda_nivel_complejidad',
                                hiddenName: 'busqueda_nivel_complejidad',

                                anchor: '95%',
                                store: storeOPNICO,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Responsable',
                                id: 'busqueda_persona_encargada',
                                name: 'busqueda_persona_encargada',
                                hiddenName: 'busqueda_persona_encargada',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            }
                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Zonal',
                                id: 'busqueda_zonal',
                                name: 'busqueda_zonal',
                                hiddenName: 'busqueda_zonal',

                                anchor: '95%',
                                store: storeZONA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Unidad',
                                id: 'busqueda_unidad_asignado',
                                name: 'busqueda_unidad_asignado',
                                hiddenName: 'busqueda_unidad_asignado',

                                anchor: '95%',
                                store: storeOPREA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Oper. Tipo',
                                id: 'busqueda_tipo_operativo',
                                name: 'busqueda_tipo_operativo',
                                hiddenName: 'busqueda_tipo_operativo',

                                anchor: '95%',
                                store: storeOPTIPO,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Estado',

                                id: 'busqueda_estado',
                                name: 'busqueda_estado',
                                hiddenName: 'busqueda_estado',


                                anchor: '95%',
                                store: storeOPESTA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Func.operante',
                                id: 'busqueda_personal_asignado',
                                name: 'busqueda_personal_asignado',
                                hiddenName: 'busqueda_personal_asignado',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            }
                            /*{
                             xtype: 'combo',
                             fieldLabel: 'Oper. Finalizado',
                             id: 'busqueda_finalizado',
                             name: 'busqueda_finalizado',
                             hiddenName: 'busqueda_finalizado',
                             anchor: '95%',
                             store: storeSINO,
                             valueField: 'id',
                             displayField: 'nombre',
                             typeAhead: true,
                             triggerAction: 'all',
                             mode: 'local'
                             },*/

                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [

                            {
                                xtype: 'textfield',
                                fieldLabel: 'Informe',
                                id: 'busqueda_informe',
                                name: 'busqueda_informe',
                                anchor: '95%'
                            },
                            /*{   xtype: 'textfield',
                             fieldLabel: 'Punto Encuentro',
                             id: 'busqueda_punto_encuentro',
                             name: 'busqueda_punto_encuentro',
                             anchor: '95%'
                             },*/
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Observaciones',
                                id: 'busqueda_observaciones',
                                name: 'busqueda_observaciones',
                                anchor: '95%'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Elaborado por',
                                id: 'busqueda_elaborado_por',
                                name: 'busqueda_elaborado_por',
                                hiddenName: 'busqueda_elaborado_por',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Revisado por',
                                id: 'busqueda_revisado_por',
                                name: 'busqueda_revisado_por',
                                hiddenName: 'busqueda_revisado_por',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Aprobado por',
                                id: 'busqueda_aprobado_por',
                                name: 'busqueda_aprobado_por',
                                hiddenName: 'busqueda_aprobado_por',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            }]
                    }
                ]
            });


            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storePersonal;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storePersonal;
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
                            key: 'id_zonal',
                            scope: this,
                            text: 'Zona'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'id_persona_encargada',
                            scope: this,
                            text: 'Responsable'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'punto_encuentro_planificado',
                            scope: this,
                            text: 'Punto encuentro'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'observaciones',
                            scope: this,
                            text: 'Observaciones'
                        }
                    ]
                })
                , text: 'Zona'
            });

            win = desktop.createWindow({
                id: 'grid-win-personal',
                title: 'Inspección - Gestión Personal',
                width: winWidth,
                height: winHeight,
                iconCls: 'personal-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',

                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        {
                            autoScroll: true,
                            title: 'Planificación personal',
                            closable: true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addpersonal,
                                    iconCls: 'save-icon',
                                    id: 'addpersonal',
                                    disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deletepersonal,
                                    id: 'borraroperativo',
                                    iconCls: 'delete-icon',
                                    disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                    //disabled: true
                                },
                                '-',
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridData,
                                    scope: this,
                                    text: 'Recargar Datos',
                                    tooltip: 'Recargar datos'
                                },
                                '-',
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Personal no finalizados',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: true,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        storePersonal.baseParams.finalizados = isChecked;
                                        storePersonal.load();
                                    }
                                }, '-',
                                {
                                    id: 'tb_repotePersonal',
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteOperativo,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de los operativo',
                                    disabled: true
                                },
                                /*'-',
                                 {
                                 xtype: 'checkbox',
                                 boxLabel: 'Todo personal',
                                 id: 'checkTodoPersonal',
                                 name: 'noenviados',
                                 checked: false,
                                 inputValue: '0',
                                 tooltip: 'Recargar datos',
                                 disabled: !acceso,
                                 cls: 'barramenu',
                                 handler: function (checkbox, isChecked) {
                                 storePRD.load({params: {todos: isChecked}});
                                 }
                                 },*/
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storePersonal
                                })
                            ],
                            items: [
                                {
                                    id: 'formcabecerapersonal',
                                    titleCollapse: true,
                                    flex: 1,
                                    autoScroll: true,
                                    layout: 'column',
                                    items: this.gridPersonal,
                                },
                                {

                                    flex: 2,
                                    bodyStyle: 'padding:0; background: #DFE8F6',
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'tabpanel',
                                            activeTab: 0,
                                            width: winWidth,
                                            cls: 'no-border',
                                            items: [
                                                {
                                                    title: 'Detalle Operativo',
                                                    layout: 'column',
                                                    id: 'detallePersonalTab',
                                                    height: 250,
                                                    items: detalleOperativo,
                                                    disabled: true,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Grabar',
                                                            scope: this,
                                                            handler: this.updateOperativo,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'savedetalleoperativo',
                                                            //disabled: !acceso
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Instituciones Participantes',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridPersonalParticipantes,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            //handler: this.addpersonalPersonal,
                                                            handler: this.addpersonalParticipantes,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'addoperativoparticipantes'
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deletepersonalPersonal,
                                                            handler: this.deletepersonalParticipantes,
                                                            id: 'borraroperativoparticipantes',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Personal asignado',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridPersonalPersonal,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addpersonalPersonal,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'addoperativodetalle',
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deletepersonalPersonal,
                                                            id: 'borraroperativodetalle',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Vehículos asignados',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridPersonalVehiculos,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addVehiculos,
                                                            id: 'addoperativodetallevehiculo',
                                                            iconCls: 'save-icon',
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteVehiculos,
                                                            id: 'borraroperativodetallevehiculo',
                                                            iconCls: 'delete-icon',
                                                            disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Informes',
                                                    layout: 'column',
                                                    id: 'informesPersonalTab',
                                                    disabled: true,
                                                    height: 250,
                                                    items: this.gridPersonalInforme,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addInforme,
                                                            id: 'addoperativodetalleInforme',
                                                            iconCls: 'save-icon',
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteInforme,
                                                            id: 'borraroperativodetalleInforme',
                                                            iconCls: 'delete-icon',
                                                            disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Imágenes',
                                                    id: 'imagenesPersonalTab',
                                                    layout: 'column',
                                                    height: 235,
                                                    disabled: true,
                                                    items: this.gridPersonalImagenes,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addpersonalImagenes,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'addoperativoimagenes',
                                                            hidden: true
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deletepersonalImagenes,
                                                            id: 'borraroperativoimagenes',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            xtype: 'form',
                                                            fileUpload: true,
                                                            width: 300,
                                                            frame: true,
                                                            autoHeight: 60,
                                                            defaults: {
                                                                anchor: '100%',
                                                                allowBlank: false

                                                            },
                                                            id: "fp",
                                                            items: [
                                                                {
                                                                    xtype: 'fileuploadfield',
                                                                    id: 'form-file',
                                                                    emptyText: 'Seleccione imagen a subir',
                                                                    fieldLabel: 'Imagen',
                                                                    name: 'photo-path',
                                                                    regex: /^.*.(jpg|JPG|jpeg|JPEG)$/,
                                                                    regexText: 'Solo imagenes ',
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
                                                            text: "Subir Imagen",
                                                            scope: this,
                                                            handler: function () {
                                                                if (Ext.getCmp('fp').getForm().isValid()) {
                                                                    Ext.getCmp('fp').getForm().submit({
                                                                        url: urlPersonal + 'file-upload.php',
                                                                        params: {data: selectPersonal},
                                                                        waitMsg: 'Subiendo Imagen...',
                                                                        success: function (fp, o) {

                                                                            storePersonalImagenes.load({params: {id_operativo: selectPersonal}});
                                                                            Ext.getCmp('fp').getForm().reset();
                                                                        },
                                                                        failure: function (form, action) {
                                                                            var errorJson = JSON.parse(action.response.responseText);
                                                                            Ext.Msg.show({
                                                                                title: 'Error '
                                                                                , msg: errorJson.msg
                                                                                , modal: true
                                                                                , icon: Ext.Msg.ERROR
                                                                                , buttons: Ext.Msg.OK
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            },
                                                            id: 'subirimagen',
                                                            iconCls: 'subir-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            disabled: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]
                        }

                        , {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled: this.app.isAllowedTo('accesosPersonal', this.id) ? false : true,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDocumentoReporte,
                                    scope: this,
                                    text: 'Buscar'

                                },
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDocumentoReporteReset,
                                    scope: this,
                                    text: 'Borrar formulario'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporte,
                                    scope: this,
                                    text: 'Exportar listado',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    disabled: !acceso,
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                    scope: this,
                                    text: 'Exportar calendario  personas',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    disabled: !acceso,
                                }
                                ,
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                    scope: this,
                                    text: 'Exportar calendario  personal',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    disabled: !acceso,
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 175,
                                    minSize: 100,
                                    maxSize: 170,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaDocumentos
                                },
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    split: true,
                                    height: 270,
                                    minSize: 100,
                                    maxSize: 150,
                                    region: 'center',
                                    autoEl: {
                                        id: 'iframemap',
                                        tag: 'iframe',
                                        style: 'height: 360px; width: 100%; border: none',
                                        src: 'http://localhost:8080/mapaRecorrido.html'
                                        //src: 'http://agenciadecontrol.quito.gob.ec/mapaPersonal.html'
                                    },
                                    id: 'data_export_iframe'
                                }
                            ]

                            //this.gridReportes
                        }

                    ]
                })
            });
        }
        win.show();
        function cargaDetalle(personal) {
            //forma = Ext.getCmp('formaDetalleOperativo');
            detalleOperativo.getForm().load({
                url: urlPersonal + 'crudPersonal.php?operation=selectForm',
                params: {
                    id: personal
                }
            });
        };

        setTimeout(function () {
            this.storePersonal.load({
                params: {
                    start: 0,
                    limit: limitepersonal,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue(),
                    accesosAdministradorOpe: accesosAdministradorOpe,
                    accesosPersonal: accesosPersonal
                }
            });
        }, 600);
    },
    deletepersonal: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPersonal.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePersonal.remove(rows);
                }
            }
        });
    },
    addpersonal: function () {
        var personal = new this.storePersonal.recordType({
            id_persona: '-',
            id: ' ',
            visible: '',
            fecha_planificacion: (new Date()),
            fecha_inicio_planificacion: (new Date()),
            fecha_fin_planificacion: (new Date()),
            id_tipo_control: '',
            id_nivel_complejidad: ' ',
            observaciones: ' ',

            punto_encuentro_planificado: ' ',
            id_zonal: ' ',
            tipo_operativo: '1',
            id_persona_encargada: ' ',

            id_estado: 1
        });
        this.gridPersonal.stopEditing();
        this.storePersonal.insert(0, personal);
        this.gridPersonal.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storePersonal.load();
    },

    deletepersonalPersonal: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPersonalPersonal.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePersonalPersonal.remove(rows);
                }
            }
        });
    },
    addpersonalPersonal: function () {
        var personal = new this.storePersonalPersonal.recordType({
            id_persona: '-',
            id_operativo: selectPersonal,
            asistencia: true,
            observaciones: ''
        });
        this.gridPersonalPersonal.stopEditing();
        this.storePersonalPersonal.insert(0, personal);
        this.gridPersonalPersonal.startEditing(0, 0);
    },
    requestGridDataPersonal: function () {
        this.storePersonalPersonal.load();
    },
    // controles insercion eliminar reload Participantes
    deletepersonalParticipantes: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPersonalParticipantes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePersonalParticipantes.remove(rows);
                }
            }
        });
    },
    updateOperativo: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formaDetalleOperativo').getForm();
                    myForm.submit({
                        url: 'modules/desktop/personal/server/crudPersonal.php?operation=updateForm',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                            //Ext.getCmp('tb_grabardenuncias').setDisabled(true);
                        },
                        failure: function (form, action) {
                            var errorJson = JSON.parse(action.response.responseText);
                            Ext.Msg.show({
                                title: 'Error campos obligatorios'
                                , msg: errorJson.msg
                                , modal: true
                                , icon: Ext.Msg.ERROR
                                , buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            }
        });
    },


    addpersonalParticipantes: function () {
        var personal = new this.storePersonalParticipantes.recordType({
            id_persona: '-',
            id_operativo: selectPersonal,
            asistencia: true,
            observaciones: '',
            id_entidad: '-',
            jefe_grupo: '-',
            personas: 0
        });
        this.gridPersonalParticipantes.stopEditing();
        this.storePersonalParticipantes.insert(0, personal);
        this.gridPersonalParticipantes.startEditing(0, 0);
    },
    requestGridDataParticipantes: function () {
        this.storePersonalParticipantes.load();
    },

    // controles insercion eliminar reload Imagenes
    deletepersonalImagenes: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPersonalImagenes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePersonalImagenes.remove(rows);
                }
            }
        });
    },
    addpersonalImagenes: function () {
        var personal = new this.storePersonalImagenes.recordType({
            id_persona: '-',
            id_operativo: selectPersonal,
            asistencia: true,
            observaciones: '',
            id_entidad: '-',
            jefe_grupo: '-',
            personas: 0
        });
        this.gridPersonalImagenes.stopEditing();
        this.storePersonalImagenes.insert(0, personal);
        this.gridPersonalImagenes.startEditing(0, 0);
    },
    requestGridDataImagenes: function () {
        this.storePersonalImagenes.load();
    },


    deleteVehiculos: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPersonalVehiculos.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePersonalVehiculos.remove(rows);
                }
            }
        });
    },
    addVehiculos: function () {
        var vehiculos = new this.storePersonalVehiculos.recordType({

            id_operativo: selectPersonal,
            conductor: '',
            telefono: '',
            observaciones: ''
        });


        this.gridPersonalVehiculos.stopEditing();
        this.storePersonalVehiculos.insert(0, vehiculos);
        this.gridPersonalVehiculos.startEditing(0, 0);
    },
    requestGridDataVehiculos: function () {
        this.storePersonalVehiculos.load();
    },

    deleteInforme: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPersonalInforme.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePersonalInforme.remove(rows);
                }
            }
        });
    },
    addInforme: function () {
        var informe = new this.storePersonalInforme.recordType({
            id_operativo: selectPersonal
        });

        this.gridPersonalInforme.stopEditing();
        this.storePersonalInforme.insert(0, informe);
        this.gridPersonalInforme.startEditing(0, 0);
    },
    requestGridDataInforme: function () {
        this.storePersonalInforme.load();
    },

    botonExportarReporteOperativo: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo con el informe<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/personal/server/descargaPersonalId.inc.php?operativo=' + selectPersonal;
                    /*setTimeout(function () {
                     storePersonal.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
                     }, 1000);*/

                }
            }
        });
    },

// funcion usada por boton

    showError: function (msg, title) {
        title = title || 'Error';
        Ext.Msg.show({
            title: title
            , msg: msg
            , modal: true
            , icon: Ext.Msg.ERROR
            , buttons: Ext.Msg.OK
        });
    },

    requestGridDataDocumentoReporte: function () {
        this.storeDocumentosReporte.baseParams = this.formConsultaDocumentos.getForm().getValues();
        this.storeDocumentosReporte.baseParams = this.formConsultaDocumentos.getForm().getValues();

        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosPersonal = this.app.isAllowedTo('accesosPersonal', this.id);

        this.storeDocumentosReporte.baseParams.accesosAdministradorOpe = accesosAdministradorOpe;
        this.storeDocumentosReporte.baseParams.accesosPersonal = accesosPersonal;

        this.storeDocumentosReporte.load();
    },

    requestGridDataDocumentoReporteReset: function () {
        this.formConsultaDocumentos.getForm().reset();
    },
    botonExportarDocumentoReporte: function () {
        var rows = this.storeDocumentosReporte.getCount()
        if (rows === 0) {
            Ext.Msg.show({
                title: 'Atencion',
                msg: 'Busqueda sin resultados',
                scope: this,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
        // mensaje continuar y llamada a descarga archivo
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo Excel<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    valueParams = JSON.stringify(this.formConsultaDocumentos.getForm().getValues());
                    window.location.href = 'modules/desktop/personal/server/descargaReportePersonal.inc.php?param=' + valueParams;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioPersonal: function () {
        var rows = this.storeDocumentosReporte.getCount()
        if (rows === 0) {
            Ext.Msg.show({
                title: 'Atencion',
                msg: 'Busqueda sin resultados',
                scope: this,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
        // mensaje continuar y llamada a descarga archivo
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo Excel<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    valueParams = JSON.stringify(this.formConsultaDocumentos.getForm().getValues());
                    window.location.href = 'modules/desktop/personal/server/descargaReportePersonalcalendario.inc.php?param=' + valueParams;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioPersonal: function () {
        var rows = this.storeDocumentosReporte.getCount()
        if (rows === 0) {
            Ext.Msg.show({
                title: 'Atencion',
                msg: 'Busqueda sin resultados',
                scope: this,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
        // mensaje continuar y llamada a descarga archivo
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo Excel<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    valueParams = JSON.stringify(this.formConsultaDocumentos.getForm().getValues());
                    window.location.href = 'modules/desktop/personal/server/descargaReportePersonalcalendario2.inc.php?param=' + valueParams;
                }
            }
        });
    }
});