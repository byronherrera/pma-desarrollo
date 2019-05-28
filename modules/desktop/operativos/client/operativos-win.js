QoDesk.OperativosWindow = Ext.extend(Ext.app.Module, {
    id: 'operativos',
    type: 'desktop/operativos',

    init: function () {
        this.launcher = {
            text: 'Inspección',
            iconCls: 'operativos-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        var accesosOperativos = this.app.isAllowedTo('accesosOperativos', this.id);

        var fecha_inicio_planificacion;
        var fecha_fin_planificacion;

        finalizados = true;
        limiteoperativos = 100;
        this.selectOperativos = 0;
        selectOperativos = 0;
        // estado no usado
        //var accesosRecepciónIns = this.app.isAllowedTo('accesosRecepciónOpe', this.id);

        //var acceso = (accesosAdministradorOpe || accesosOperativos || accesosRecepciónIns) ? true : false
        var acceso = (accesosAdministradorOpe || accesosOperativos) ? true : false

        var gridBlockOperativos = false;
        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-operativos');
        var urlOperativos = "modules/desktop/operativos/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value, field) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
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

        function operativosTipoOperativosSimple(id) {
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

        function operativosTipoOperativosSimple2(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }


        function operativosTipoOperativos(id) {
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
            url: 'modules/common/combos/combos.php?tipo=tiposMedidasOperativos'
        });

        var comboOPINFOMEDIDA = new Ext.form.ComboBox({
            id: 'comboOPINFOMEDIDA',
            store: storeOPINFOMEDIDA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function operativosTipoMedida(id) {
            var index = storeOPINFOMEDIDA.findExact('id', id);
            if (index > -1) {
                var record = storeOPINFOMEDIDA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel MEDIDA OPERATIVO

        //inicio combo tipo TIPO ACCION operativo
        storeOPTIPOACC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposAccioOperativos'
        });

        var comboOPTIPOACC = new Ext.form.ComboBox({
            id: 'comboOPTIPOACC',
            store: storeOPTIPOACC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function operativosTipoAccion(id) {
            var index = storeOPTIPOACC.findExact('id', id);
            if (index > -1) {
                var record = storeOPTIPOACC.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo TIPO ACCION operativo


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

        function operativosDespachadoActivo(id) {
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

        function operativosNivelComplejidad(id) {
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
            url: 'modules/common/combos/combos.php?tipo=tiposoperativos'
        });

        var comboOPTIPO = new Ext.form.ComboBox({
            id: 'comboOPTIPO',
            store: storeOPTIPO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function operativosTipo(id) {
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

        function operativosUnidades(id) {
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
        //inicio combo operativos estado
        storeOPESTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=operativosestados'
        });

        var comboOPESTA = new Ext.form.ComboBox({
            id: 'comboOPESTA',
            store: storeOPESTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function operativosEstados(id) {
            var index = storeOPESTA.findExact('id', id);
            if (index > -1) {
                var record = storeOPESTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo operativos estado
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
            url: 'modules/common/combos/combos.php?tipo=personaloperativos',
            baseParams: {
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosOperativos: accesosOperativos,
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

        function operativosPersonalEncargado(id) {

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


        //inicio combo persona recepta la operativos PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personaloperativos',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosOperativos: accesosOperativos,
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
            url: 'modules/common/combos/combos.php?tipo=personaloperativos',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: true,
                accesosOperativos: false,
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
            //var index = storePRD2.findExact('id', id);
            var index = storePRD2.findExact('id', id);
            if (index > -1) {
                var record = storePRD2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la operativos PRD

// fin combos secretaria

// inicio combos operativos

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
            url: 'modules/common/combos/combos.php?tipo=depOperativos'
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
        //inicio combo Estado Recepcion Información Operativos ESOPREA
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

        //fin combo Estado Recepcion Información Operativos ESOPREA

        //inicio combo estado retiros operativo ESREOP
        storeESREOP = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "Perecible", "nombre": "Perecible"},
                    {"id": "No perecible", "nombre": "No perecible"},
                    {"id": "Vehículos", "nombre": "Vehículos"},
                    {"id": "Otros", "nombre": "Otros"}
                ]
            }
        });

        var comboESREOP = new Ext.form.ComboBox({
            id: 'comboESREOP',
            store: storeESREOP,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRetirosAdm(id) {
            return id;
        }

        //fin combo Estado Recepcion Información Operativos ESREOP

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
            url: 'modules/common/combos/combos.php?tipo=personaloperativos'
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
// inicio combos operativos

// inicio pestañas de mantenimiento


// fin pestañas de mantenimiento

        // inicio ventana operativos
        var proxyOperativos = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativos.php?operation=insert",
                read: urlOperativos + "crudOperativos.php?operation=select",
                update: urlOperativos + "crudOperativos.php?operation=update",
                destroy: urlOperativos + "crudOperativos.php?operation=delete"
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

        var readerOperativos = new Ext.data.JsonReader({
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
                {name: 'fecha_impresion_informe', type: 'date', dateFormat: 'c', allowBlank: true},
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
                {name: 'visible', type: 'boolean', allowBlank: true},
                {name: 'mail_enviado', allowBlank: true}
            ]
        });
        var writerOperativos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeOperativos = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativos,
            reader: readerOperativos,
            writer: writerOperativos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limiteoperativos,
                finalizados: finalizados,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosAdministradorIns: accesosAdministradorIns,
                accesosOperativos: accesosOperativos,
                acceso: acceso
            }
        });
        storeOperativos = this.storeOperativos;

        this.gridOperativos = new Ext.grid.EditorGridPanel({
            height: desktop.getWinHeight() - 380,
            store: this.storeOperativos,
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
                    header: 'Enviado',
                    dataIndex: 'mail_enviado',
                    sortable: true,
                    width: 30 
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
                    header: 'Estado',
                    dataIndex: 'id_estado',
                    sortable: true,
                    width: 100,
                    editor: comboOPESTA,
                    renderer: operativosEstados
                },
                {
                    header: 'Fecha inicio',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 100,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i',
                        listeners: {
                            change: function (field, val, valOld) {
                                //fecha inicial debe ser mayor que la final
                                if (val > fecha_fin_planificacion)
                                //AppMsg.setAlert("Alerta ", 'Fecha inicial no  debe ser mayor que fecha final');
                                    fecha_inicio_planificacion = val
                                //fecha inicial no debe ser mayor de 12 horas
                                var diff = Math.abs(fecha_fin_planificacion - fecha_inicio_planificacion) / 3600000;
                                if (diff > 12)
                                    AppMsg.setAlert("Alerta ", 'Fecha final supera las 12 horas de operativo, están ' + parseFloat(diff).toFixed(1) + " horas");
                                else
                                    AppMsg.setAlert("Observación ", 'Están ' + parseFloat(diff).toFixed(1) + " horas de operativo");
                                // alerta fecha menor a la actual
                                fecha_actual = new Date();
                                if (val < fecha_actual) {
                                    //AppMsg.setAlert("Observación ", 'La fecha del operativo anterior a la fecha actual');
                                }
                            }
                        }
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
                        timeFormat: 'H:i',
                        listeners: {
                            change: function (field, val, valOld) {
                                //fecha inicial debe ser mayor que la final
                                if (val < fecha_inicio_planificacion)
                                    AppMsg.setAlert("Alerta ", 'Fecha final debe ser mayor que fecha inicial');
                                fecha_fin_planificacion = val
                                //fecha inicial no debe ser mayor de 12 horas
                                var diff = Math.abs(fecha_fin_planificacion - fecha_inicio_planificacion) / 3600000;
                                if (diff > 12)
                                    AppMsg.setAlert("Alerta ", 'Fecha final supera las 12 horas de operativo, están ' + parseFloat(diff).toFixed(1) + " horas");
                                else
                                    AppMsg.setAlert("Observación ", 'Están ' + parseFloat(diff).toFixed(1) + " horas de operativo");
                                // alerta fecha menor a la actual
                                fecha_actual = new Date();
                                if (val < fecha_actual) {
                                    AppMsg.setAlert("Observación ", 'La fecha del operativo anterior a la fecha actual');
                                }
                            }
                        }
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
                    editor: comboOPTID, renderer: operativosTipoOperativos
                },
                {
                    header: 'Unidad',
                    dataIndex: 'id_unidad',
                    sortable: true,
                    width: 120, editor: comboOPREA,
                    renderer: operativosUnidades
                },

                {
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 60,
                    editor: comboOPNICO, renderer: operativosNivelComplejidad
                },
                {
                    header: 'Responsable',
                    dataIndex: 'id_persona_encargada',
                    sortable: true,
                    width: 190,
                    editor: comboPRD,
                    renderer: personaReceptaDenuncia,
                    /*
                     editor: comboOPPERENC,
                     renderer: operativosPersonalEncargado,*/
                    id: 'id_persona_encargada'
                },
                {
                    header: 'Lugar intervención',
                    dataIndex: 'zona',
                    sortable: true,
                    width: 160,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Punto Encuentro',
                    dataIndex: 'punto_encuentro_planificado',
                    sortable: true,
                    width: 160,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 200,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Trámite',
                    dataIndex: 'tramite',
                    sortable: true,
                    width: 90,
                    editor: new Ext.form.TextField({allowBlank: false})
                    /*                    editor: new Ext.form.NumberField({
                                            allowBlank: false,
                                            allowNegative: false,
                                            maxValue: 100000
                                        }) */
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
                    , renderer: operativosTipo
                },
                {
                    header: 'Fecha informe',
                    dataIndex: 'fecha_informe',
                    sortable: true,
                    width: 100, hidden: true,
                    renderer: formatDate
                },
                {
                    header: 'fecha_impresion_informe',
                    dataIndex: 'fecha_impresion_informe',
                    sortable: true,
                    width: 100, hidden: true,
                    renderer: formatDate
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
                }
            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    // validamos la fecha
                    fechaActual = new Date();
                    fechaOperativo = record.get('fecha_fin_planificacion')

                    var diasDif = fechaActual.getTime() - fechaOperativo.getTime();
                    var horas = Math.round(diasDif / (1000 * 60 * 60));


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
                            fecha_inicio_planificacion = rec.get('fecha_inicio_planificacion')
                            fecha_fin_planificacion = rec.get('fecha_fin_planificacion');

                            // recuperamos la informacion de personal asignado a ese operativo
                            selectOperativos = rec.id;
                            storeOperativosPersonal.load({params: {id_operativo: rec.id}});
                            storeOperativosAcciones.load({params: {id_operativo: rec.id}});
                            storeOperativosInforme.load({params: {id_operativo: rec.id}});
                            storeOperativosAcciones.load({params: {id_operativo: rec.id}});
                            storeOperativosParticipantes.load({params: {id_operativo: rec.id}});
                            storeOperativosRetiros.load({params: {id_operativo: rec.id}});
                            storeOperativosImagenes.load({params: {id_operativo: rec.id}});

                            // para el caso que el operativo se haya finalizado se bloquea ya el borrar o editar
                            if (acceso) {
                                if (rec.get("id_estado") != 1) {
                                    Ext.getCmp('informesAccionesTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('informesOperativosTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('imagenesOperativosTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('detalleOperativosTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('retirosOperativosTab').setDisabled(acceso ? false : true);
                                    cargaDetalle(rec.id);
                                }
                                else {
                                    Ext.getCmp('informesAccionesTab').setDisabled(true);
                                    Ext.getCmp('informesOperativosTab').setDisabled(true);
                                    Ext.getCmp('imagenesOperativosTab').setDisabled(true);
                                    Ext.getCmp('detalleOperativosTab').setDisabled(true);
                                    Ext.getCmp('retirosOperativosTab').setDisabled(true);
                                    cargaDetalle(rec.id);
                                }

                                if ((rec.get("id_estado") == 1) || (rec.get("id_estado") == 4)) {
                                    gridBlockOperativos = false;
                                    Ext.getCmp('savedetalleoperativo').setDisabled(false);

                                    Ext.getCmp('borraroperativo').setDisabled(accesosAdministradorOpe ? false : true);
                                    Ext.getCmp('addoperativos').setDisabled(accesosAdministradorOpe ? false : true);

                                    Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                    Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                    // en caso que se tenga acceso tambien se habilitan o deshabilitan los botones para agregar detalle
                                    // valido si es el caso operativo tipo Permanentes Zonales


                                    if (rec.get("tipo_operativo") == 2) {
                                        Ext.getCmp('borraroperativodetalle').setDisabled(false);
                                        Ext.getCmp('addoperativodetalle').setDisabled(false);
                                        //Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                        // Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                    } else {
                                        Ext.getCmp('borraroperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                        Ext.getCmp('addoperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                        // Ext.getCmp('borraroperativoparticipantes').setDisabled(accesosAdministradorOpe ? false : true);
                                        // Ext.getCmp('addoperativoparticipantes').setDisabled(accesosAdministradorOpe ? false : true);
                                    }

                                    Ext.getCmp('borraroperativodetalleacciones').setDisabled(false);
                                    Ext.getCmp('addoperativodetalleacciones').setDisabled(false);

                                    Ext.getCmp('borraroperativodetalleInforme').setDisabled(false);
                                    Ext.getCmp('addoperativodetalleInforme').setDisabled(false);

                                    Ext.getCmp('borraroperativoimagenes').setDisabled(false);

                                    Ext.getCmp('addoperativoimagenes').setDisabled(false);
                                    Ext.getCmp('subirimagen').setDisabled(false);
                                    // solamente para el caso
                                }
                                else {
                                    gridBlockOperativos = true;
                                    Ext.getCmp('savedetalleoperativo').setDisabled(true);

                                    Ext.getCmp('borraroperativo').setDisabled(true);
                                    Ext.getCmp('addoperativos').setDisabled(true);

                                    Ext.getCmp('borraroperativodetalle').setDisabled(true);
                                    Ext.getCmp('addoperativodetalle').setDisabled(true);

                                    Ext.getCmp('borraroperativoparticipantes').setDisabled(true);
                                    Ext.getCmp('addoperativoparticipantes').setDisabled(true);

                                    Ext.getCmp('borraroperativodetalleacciones').setDisabled(true);
                                    Ext.getCmp('addoperativodetalleacciones').setDisabled(true);

                                    Ext.getCmp('borraroperativodetalleInforme').setDisabled(true);
                                    Ext.getCmp('addoperativodetalleInforme').setDisabled(true);

                                    Ext.getCmp('borraroperativoimagenes').setDisabled(true);
                                    Ext.getCmp('addoperativoimagenes').setDisabled(true);
                                    Ext.getCmp('subirimagen').setDisabled(true);

                                }


                                //para el caso que se es administrador
                                if (accesosAdministradorOpe) {
                                    Ext.getCmp('savedetalleoperativo').setDisabled(false);
                                }
                            }
                            //para el caso  de los botones
                            if ((rec.get("id_estado") == 2) || (rec.get("id_estado") == 3) || (rec.get("id_estado") == 5)) {
                                Ext.getCmp('tb_repoteOperativos').setDisabled(false);
                            } else {
                                Ext.getCmp('tb_repoteOperativos').setDisabled(true);
                            }

                        }
                    }
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteoperativos,
                store: storeOperativos,
                displayInfo: true,
                displayMsg: 'Mostrando operativos {0} - {1} de {2} - AMC',
                emptyMsg: "No existen operativos que mostrar"
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
        // fin ventana operativos

        // inicio ventana operativos detalle personal
        var proxyOperativosPersonal = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosPersonal.php?operation=insert",
                read: urlOperativos + "crudOperativosPersonal.php?operation=select",
                update: urlOperativos + "crudOperativosPersonal.php?operation=update",
                destroy: urlOperativos + "crudOperativosPersonal.php?operation=delete"
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

        var readerOperativosPersonal = new Ext.data.JsonReader({
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
        var writerOperativosPersonal = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosPersonal = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosPersonal,
            reader: readerOperativosPersonal,
            writer: writerOperativosPersonal,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosPersonal = this.storeOperativosPersonal;

        this.gridOperativosPersonal = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosPersonal',

            autoHeight: true,
            autoScroll: true,
            store: this.storeOperativosPersonal,
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
                        if (gridBlockOperativos) {
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

        var gridOperativosPersonal = this.gridOperativosPersonal
        // fin  ventana operativos detalle personal

        // inicio ventana operativos detalle participantes
        var proxyOperativosParticipantes = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosParticipantes.php?operation=insert",
                read: urlOperativos + "crudOperativosParticipantes.php?operation=select",
                update: urlOperativos + "crudOperativosParticipantes.php?operation=update",
                destroy: urlOperativos + "crudOperativosParticipantes.php?operation=delete"
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

        var readerOperativosParticipantes = new Ext.data.JsonReader({
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
        var writerOperativosParticipantes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosParticipantes = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosParticipantes,
            reader: readerOperativosParticipantes,
            writer: writerOperativosParticipantes,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosParticipantes = this.storeOperativosParticipantes;

        this.gridOperativosParticipantes = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosParticipantes',
            autoHeight: true,
            autoScroll: true,
            store: this.storeOperativosParticipantes,
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
                        if (gridBlockOperativos) {
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

        var gridOperativosParticipantes = this.gridOperativosParticipantes
        // fin ventana operativos detalle participantes

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
                fieldLabel: 'Resumen Operativo',
                height: 145,
                anchor: '98%',
                name: 'detalle'
            }],
            defaults: {
                listeners: {
                    change: function (field, newVal, oldVal) {
                        var myForm = Ext.getCmp('formaDetalleOperativo').getForm();
                        myForm.submit({
                            url: 'modules/desktop/operativos/server/crudOperativos.php?operation=updateForm',
                            method: 'POST',
                            success: function (form, action) {
                            }
                        });
                    }
                },
            }


        });

        // inicio ventana operativos detalle imagenes
        var proxyOperativosImagenes = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosImagenes.php?operation=insert",
                read: urlOperativos + "crudOperativosImagenes.php?operation=select",
                update: urlOperativos + "crudOperativosImagenes.php?operation=update",
                destroy: urlOperativos + "crudOperativosImagenes.php?operation=delete"
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

        var readerOperativosImagenes = new Ext.data.JsonReader({
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
        var writerOperativosImagenes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosImagenes = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosImagenes,
            reader: readerOperativosImagenes,
            writer: writerOperativosImagenes,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosImagenes = this.storeOperativosImagenes;

        this.gridOperativosImagenes = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosImagenes',
            autoHeight: true,
            store: this.storeOperativosImagenes,
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
                        return '<img src="' + value + '" width="300" />';
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
                        if (gridBlockOperativos) {
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

        var gridOperativosImagenes = this.gridOperativosImagenes
        // fin ventana operativos detalle imagenes


        // inicio ventana operativos detalle informe
        var proxyOperativosInforme = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosInforme.php?operation=insert",
                read: urlOperativos + "crudOperativosInforme.php?operation=select",
                update: urlOperativos + "crudOperativosInforme.php?operation=update",
                destroy: urlOperativos + "crudOperativosInforme.php?operation=delete"
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

        var readerOperativosInforme = new Ext.data.JsonReader({
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
        var writerOperativosInforme = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosInforme = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosInforme,
            reader: readerOperativosInforme,
            writer: writerOperativosInforme,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosInforme = this.storeOperativosInforme;

        this.gridOperativosInforme = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosInforme',

            autoHeight: true,
            autoScroll: true,
            store: this.storeOperativosInforme,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Ordenanza',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 30,
                    editor: comboOPTIDSimple2,
                    renderer: operativosTipoOperativosSimple2
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
                    renderer: operativosTipoMedida
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
                        if (gridBlockOperativos) {
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

        var gridOperativosInforme = this.storeOperativosInforme
        // inicio ventana operativos detalle personal


        // inicio ventana retiros detalle personal
        var proxyOperativosRetiros = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosRetiros.php?operation=insert",
                read: urlOperativos + "crudOperativosRetiros.php?operation=select",
                update: urlOperativos + "crudOperativosRetiros.php?operation=update",
                destroy: urlOperativos + "crudOperativosRetiros.php?operation=delete"
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

        var readerOperativosRetiros = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'nombre', allowBlank: true},
                {name: 'direccion', allowBlank: false},
                {name: 'tipo', allowBlank: true},
                {name: 'codigo_bodega', allowBlank: false},
                {name: 'detalle', allowBlank: true}
            ]
        });
        var writerOperativosRetiros = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosRetiros = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosRetiros,
            reader: readerOperativosRetiros,
            writer: writerOperativosRetiros,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosRetiros = this.storeOperativosRetiros;

        this.gridOperativosRetiros = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosRetiros',

            autoHeight: true,
            autoScroll: true,
            store: this.storeOperativosRetiros,
            columns: [
                new Ext.grid.RowNumberer(),
                /*       {
                           header: 'Retiros',
                           dataIndex: 'id_member',
                           sortable: true,
                           width: 30,
                           editor: comboPRD2,
                           renderer: personaReceptaDenuncia2

                       },*/
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'nombre',
                    dataIndex: 'nombre',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
                ,
                {
                    header: 'Dirección',
                    dataIndex: 'direccion',
                    sortable: true,
                    width: 80,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
                ,
                {
                    header: 'Tipo',
                    dataIndex: 'tipo',
                    sortable: true,
                    width: 25,
                    editor: comboESREOP,
                    renderer: estadoRetirosAdm
                }
                ,
                {
                    header: 'Código bodega',
                    dataIndex: 'codigo_bodega',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
                ,
                {
                    header: 'Detalle',
                    dataIndex: 'detalle',
                    sortable: true,
                    width: 200,
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
                        if (gridBlockOperativos) {
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

        var gridOperativosRetiros = this.gridOperativosRetiros
        // fin  ventana retiros detalle personal


        // inicio ventana operativos detalle vehiculos
        var proxyOperativosAcciones = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosAcciones.php?operation=insert",
                read: urlOperativos + "crudOperativosAcciones.php?operation=select",
                update: urlOperativos + "crudOperativosAcciones.php?operation=update",
                destroy: urlOperativos + "crudOperativosAcciones.php?operation=delete"
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

        var readerOperativosAcciones = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'id_accion', allowBlank: false},
                {name: 'cantidad', allowBlank: false},
                {name: 'observaciones', allowBlank: true}
            ]
        });
        var writerOperativosAcciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosAcciones = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosAcciones,
            reader: readerOperativosAcciones,
            writer: writerOperativosAcciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosAcciones = this.storeOperativosAcciones;

        this.gridOperativosAcciones = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosAcciones',

            autoHeight: true,
            autoScroll: true,
            store: this.storeOperativosAcciones,
            columns: [
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'Accion',
                    dataIndex: 'id_accion',
                    sortable: true,
                    width: 60,
                    editor: comboOPTIPOACC,
                    renderer: operativosTipoAccion
                },
                {
                    header: 'Cantidad',
                    dataIndex: 'cantidad',
                    sortable: true,
                    width: 60,
                    align: 'right',
                    editor: new Ext.ux.form.SpinnerField({
                        minValue: 0,
                        maxValue: 200
                    })
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
                        if (gridBlockOperativos) {
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

        var gridOperativosAcciones = this.gridOperativosAcciones
        // inicio ventana operativos detalle vehiculos


        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativos,
            reader: readerOperativos,
            writer: writerOperativos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limiteoperativos,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosAdministradorIns: accesosAdministradorIns,
                accesosOperativos: accesosOperativos

            }
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
                    renderer: operativosTipoOperativos
                },
                {
                    header: 'Estado',
                    dataIndex: 'id_estado',
                    sortable: true,
                    width: 45,
                    renderer: operativosEstados
                },
                {
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 30,
                    renderer: operativosNivelComplejidad
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
                    renderer: personaReceptaDenuncia
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
                    header: 'Lugar intervención ',
                    dataIndex: 'zona',
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
                    , renderer: operativosTipo
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
                displayMsg: 'Mostrando operativos {0} - {1} de {2}  >>',
                emptyMsg: "No existen operativos que mostrar"
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
                title: 'Ingrese los parámetros',
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
                                fieldLabel: 'Palabra clave',
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
                    var store = this.storeOperativos;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeOperativos;
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
                            key: 'id',
                            scope: this,
                            text: 'Código'
                        },
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
                , text: 'Código'
            });

            win = desktop.createWindow({
                id: 'grid-win-operativos',
                title: 'Inspección - Gestión Operativos',
                width: winWidth,
                height: winHeight,
                iconCls: 'operativos-icon',
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
                            title: 'Planificación operativos',
                            closable: true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addoperativos,
                                    iconCls: 'save-icon',
                                    id: 'addoperativos',
                                    disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteoperativos,
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
                                    boxLabel: 'Operativos no finalizados',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: true,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    //disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        storeOperativos.baseParams.finalizados = isChecked;
                                        storeOperativos.load();
                                    }
                                }, '-',
                                {
                                    id: 'tb_repoteOperativos',
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
                                    , store: this.storeOperativos
                                })
                            ],
                            items: [
                                {
                                    id: 'formcabeceraoperativos',
                                    items: this.gridOperativos,
                                    titleCollapse: true,
                                    split: true,
                                    flex: 1,
                                    autoScroll: true,
                                    layout: 'column'
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
                                                    title: 'Resumen Operativo',
                                                    layout: 'column',
                                                    id: 'detalleOperativosTab',
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
                                                        },
                                                        {
                                                            text: 'Ingresar el detalle de las acciones realizadas, retiros y actas en la pestaña respectiva.'
                                                            , xtype: 'tbtext'
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Instituciones Participantes',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridOperativosParticipantes,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            //handler: this.addoperativosPersonal,
                                                            handler: this.addoperativosParticipantes,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'addoperativoparticipantes'
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteoperativosPersonal,
                                                            handler: this.deleteoperativosParticipantes,
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
                                                    items: this.gridOperativosPersonal,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addoperativosPersonal,
                                                            iconCls: 'save-icon',
                                                            //disabled: true,
                                                            id: 'addoperativodetalle',
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteoperativosPersonal,
                                                            id: 'borraroperativodetalle',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            //disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Acciones Operativo',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridOperativosAcciones,
                                                    id: 'informesAccionesTab',
                                                    autoScroll: true,
                                                    disabled: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addAcciones,
                                                            id: 'addoperativodetalleacciones',
                                                            iconCls: 'save-icon',
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteAcciones,
                                                            id: 'borraroperativodetalleacciones',
                                                            iconCls: 'delete-icon',
                                                            disabled: true
                                                        }
                                                    ]
                                                },

                                                {
                                                    title: 'Actos Inicio  / Actas',
                                                    layout: 'column',
                                                    id: 'informesOperativosTab',
                                                    disabled: true,
                                                    height: 250,
                                                    items: this.gridOperativosInforme,
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
                                                    title: 'Retiros',
                                                    layout: 'column',
                                                    disabled: true,
                                                    height: 250,
                                                    id: 'retirosOperativosTab',
                                                    items: this.gridOperativosRetiros,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addretirosRetiros,
                                                            iconCls: 'save-icon',
                                                            //disabled: true,
                                                            id: 'addoperativodetalle2',
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteretirosRetiros,
                                                            id: 'borraroperativodetalle2',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            //disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Imágenes',
                                                    id: 'imagenesOperativosTab',
                                                    layout: 'column',
                                                    height: 235,
                                                    disabled: true,
                                                    items: this.gridOperativosImagenes,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addoperativosImagenes,
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
                                                            handler: this.deleteoperativosImagenes,
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
                                                                        url: urlOperativos + 'file-upload.php',
                                                                        params: {data: selectOperativos},
                                                                        waitMsg: 'Subiendo Imagen...',
                                                                        success: function (fp, o) {

                                                                            storeOperativosImagenes.load({params: {id_operativo: selectOperativos}});
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
                        },
                        {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled: this.app.isAllowedTo('accesosOperativos', this.id) ? false : true,
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
                                    xtype: 'checkbox',
                                    boxLabel: 'Detalle acciones',
                                    id: 'checkDetalleAcciones',
                                    name: 'detalleacciones',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de las acciones efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                },                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Detalle actas',
                                    id: 'checkDetalleActas',
                                    name: 'detalleactas',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de las actas efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                }, {
                                    xtype: 'checkbox',
                                    boxLabel: 'Detalle retiros',
                                    id: 'checkDetalleRecibidos',
                                    name: 'detalleretiros',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de los retiros efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                }, {
                                    xtype: 'checkbox',
                                    boxLabel: 'Totales personal',
                                    id: 'checkTotalesPersonal',
                                    name: 'totalespersonal',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de los retiros efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                }, '-',

                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporte,
                                    scope: this,
                                    text: 'Exportar listado',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                    scope: this,
                                    text: 'Exportar calendario  personas',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                }
                                ,
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioOperativos,
                                    scope: this,
                                    text: 'Exportar calendario  operativos',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
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
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 270,
                                    minSize: 100,
                                    maxSize: 150,
                                    items: this.gridDocumentosReporte
                                }
                            ]

                            //this.gridReportes
                        }
                    ]
                })
            });
        }
        win.show();

        function cargaDetalle(operativos) {
            //forma = Ext.getCmp('formaDetalleOperativo');
            detalleOperativo.getForm().load({
                url: urlOperativos + 'crudOperativos.php?operation=selectForm',
                params: {
                    id: operativos
                }
            });
        };

        setTimeout(function () {
            this.storeOperativos.load({
                params: {
                    start: 0,
                    limit: limiteoperativos,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue(),
                    accesosAdministradorOpe: accesosAdministradorOpe,
                    accesosOperativos: accesosOperativos
                }
            });
        }, 1800);
    },
    deleteoperativos: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativos.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativos.remove(rows);
                }
            }
        });
    },
    addoperativos: function () {
        var operativos = new this.storeOperativos.recordType({
            id_persona: '-',
            id_estado: '1',
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
            tipo_operativo: '2',
            id_persona_encargada: ' ',
            mail_enviado: 0
        });
        this.gridOperativos.stopEditing();
        this.storeOperativos.insert(0, operativos);
        this.gridOperativos.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeOperativos.load();
    },

    deleteoperativosPersonal: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativosPersonal.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativosPersonal.remove(rows);
                }
            }
        });
    },
    addoperativosPersonal: function () {
        var operativos = new this.storeOperativosPersonal.recordType({
            id_persona: '-',
            id_operativo: selectOperativos,
            asistencia: true,
            observaciones: ''
        });
        this.gridOperativosPersonal.stopEditing();
        this.storeOperativosPersonal.insert(0, operativos);
        this.gridOperativosPersonal.startEditing(0, 0);
    },
    requestGridDataPersonal: function () {
        this.storeOperativosPersonal.load();
    },
    // controles insercion eliminar reload Participantes
    deleteoperativosParticipantes: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativosParticipantes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativosParticipantes.remove(rows);
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
                        url: 'modules/desktop/operativos/server/crudOperativos.php?operation=updateForm',
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


    addoperativosParticipantes: function () {
        var operativos = new this.storeOperativosParticipantes.recordType({
            id_persona: '',
            id_operativo: selectOperativos,
            asistencia: true,
            observaciones: '',
            id_entidad: '',
            jefe_grupo: '-',
            personas: 0
        });
        this.gridOperativosParticipantes.stopEditing();
        this.storeOperativosParticipantes.insert(0, operativos);
        this.gridOperativosParticipantes.startEditing(0, 0);
    },
    requestGridDataParticipantes: function () {
        this.storeOperativosParticipantes.load();
    },

    // controles insercion eliminar reload Imagenes
    deleteoperativosImagenes: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativosImagenes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativosImagenes.remove(rows);
                }
            }
        });
    },
    addoperativosImagenes: function () {
        var operativos = new this.storeOperativosImagenes.recordType({
            id_persona: '-',
            id_operativo: selectOperativos,
            asistencia: true,
            observaciones: '',
            id_entidad: '-',
            jefe_grupo: '-',
            personas: 0
        });
        this.gridOperativosImagenes.stopEditing();
        this.storeOperativosImagenes.insert(0, operativos);
        this.gridOperativosImagenes.startEditing(0, 0);
    },
    requestGridDataImagenes: function () {
        this.storeOperativosImagenes.load();
    },

    deleteretirosRetiros: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativosRetiros.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativosRetiros.remove(rows);
                }
            }
        });
    },
    addretirosRetiros: function () {
        var retiros = new this.storeOperativosRetiros.recordType({
            id_persona: '-',
            id_operativo: selectOperativos,
            asistencia: true,
            observaciones: ''
        });
        this.gridOperativosRetiros.stopEditing();
        this.storeOperativosRetiros.insert(0, retiros);
        this.gridOperativosRetiros.startEditing(0, 0);
    },
    requestGridDataRetiros: function () {
        this.storeOperativosRetiros.load();
    },

    deleteAcciones: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativosAcciones.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativosAcciones.remove(rows);
                }
            }
        });
    },
    addAcciones: function () {
        var vehiculos = new this.storeOperativosAcciones.recordType({

            id_operativo: selectOperativos,
            conductor: '',
            telefono: '',
            observaciones: ''
        });


        this.gridOperativosAcciones.stopEditing();
        this.storeOperativosAcciones.insert(0, vehiculos);
        this.gridOperativosAcciones.startEditing(0, 0);
    },
    requestGridDataVehiculos: function () {
        this.storeOperativosAcciones.load();
    },

    deleteInforme: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativosInforme.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativosInforme.remove(rows);
                }
            }
        });
    },
    addInforme: function () {
        var informe = new this.storeOperativosInforme.recordType({
            id_operativo: selectOperativos
        });

        this.gridOperativosInforme.stopEditing();
        this.storeOperativosInforme.insert(0, informe);
        this.gridOperativosInforme.startEditing(0, 0);
    },
    requestGridDataInforme: function () {
        this.storeOperativosInforme.load();
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
                    window.location.href = 'modules/desktop/operativos/server/descargaOperativosId.inc.php?operativo=' + selectOperativos;
                    /*setTimeout(function () {
                     storeOperativos.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
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

        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosOperativos = this.app.isAllowedTo('accesosOperativos', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        this.storeDocumentosReporte.baseParams.accesosAdministradorOpe = accesosAdministradorOpe;

        this.storeDocumentosReporte.baseParams.accesosOperativos = accesosOperativos;
        this.storeDocumentosReporte.baseParams.accesosAdministradorIns = accesosAdministradorIns;
        // para indicar en la busqueda que es desde el formulario
        var formularioBusqueda  = 1;
        this.storeDocumentosReporte.baseParams.formularioBusqueda = formularioBusqueda;


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

                    generaAcciones = (Ext.getCmp('checkDetalleAcciones').getValue());
                    generaActas = (Ext.getCmp('checkDetalleActas').getValue());
                    generaRetiros = (Ext.getCmp('checkDetalleRecibidos').getValue());
                    generaTotalesPersonal = (Ext.getCmp('checkTotalesPersonal').getValue());

                    window.location.href = 'modules/desktop/operativos/server/descargaReporteOperativos.inc.php?param=' + valueParams + '&acciones=' + generaAcciones + '&totalespersonal=' + generaTotalesPersonal+ '&actas=' + generaActas+ '&retiros=' + generaRetiros;
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
                    window.location.href = 'modules/desktop/operativos/server/descargaReporteOperativoscalendario.inc.php?param=' + valueParams;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioOperativos: function () {
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
                    window.location.href = 'modules/desktop/operativos/server/descargaReporteOperativoscalendario2.inc.php?param=' + valueParams;
                }
            }
        });
    }
});