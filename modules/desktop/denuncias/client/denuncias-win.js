QoDesk.DenunciasWindow = Ext.extend(Ext.app.Module, {
    id: 'denuncias',
    type: 'desktop/denuncias',

    init: function () {
        this.launcher = {
            text: 'Recepción documentos',
            iconCls: 'denuncias-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministrador = this.app.isAllowedTo('accesosAdministrador', this.id);
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosZonales = this.app.isAllowedTo('accesosZonales', this.id);

        var geoSecretaria = "";

        var acceso = (accesosAdministrador || accesosSecretaria || accesosZonales) ? true : false

        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-denuncias');
        var urlDenuncias = "modules/desktop/denuncias/server/";

        var textField = new Ext.form.TextField({allowBlank: false});


        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

// inicio combos secretaria

        //inicio combo tipo documento  TID
        storeTID = new Ext.data.JsonStore({
            root: 'documento',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                documento: [
                    {"id": 2, "nombre": "Comunicados"},
                    {"id": 1, "nombre": "Denuncias"},
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
            forceSelection: true,
            allowBlank: false
        });

        function personaTipoDocumento(id) {
            var index = storeTID.find('id', id);
            if (index > -1) {
                var record = storeTID.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo documento  TID

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

        var comboOFAC = new Ext.form.ComboBox({
            id: 'comboOFAC',
            store: storeOFAC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function despachadoActivo(id) {
            var index = storeOFAC.findExact('id', id);
            if (index > -1) {
                var record = storeOFAC.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo activo

        //inicio combo tipo respuesta
        storeTIPPES = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'email', "nombre": "Email"},
                    {"id": 'oficio', "nombre": "Oficiio"},
                    {"id": 'memo', "nombre": "Memo"}
                ]
            }
        });

        var comboTIPPES = new Ext.form.ComboBox({
            id: 'comboOFAC',
            store: storeTIPPES,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function tipoRespuetaDevolucion(id) {
            var index = storeTIPPES.find('id', id);
            if (index > -1) {
                var record = storeTIPPES.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo activo


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

        function departamentoReasignacion(id) {
            var index = storeREA.findExact('id', id);
            if (index > -1) {
                var record = storeREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }

        //fin combo reasignacion REA


        //inicio combo aprobación secretaría inspección
        storeCONTROLPROGRAMADO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 8, "nombre": "Denuncia"},
                    {"id": 7, "nombre": "CCF"},
                    {"id": 6, "nombre": "Operativos"},
                    {"id": 5, "nombre": "Construcciones"},
                    {"id": 4, "nombre": "Fauna Urbana"},
                    {"id": 3, "nombre": "Operativo"},
                    {"id": 2, "nombre": "Inspeccion"},
                    {"id": 1, "nombre": "Inspeccion conjunta"},
                    {"id": 0, "nombre": "Control programado"}
                ]
            }
        });

        var comboCONTROLPROGRAMADO = new Ext.form.ComboBox({
            id: 'comboCONTROLPROGRAMADO',
            store: storeCONTROLPROGRAMADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function controlProgramado(id) {
            var index = storeCONTROLPROGRAMADO.find('id', id);
            if (index > -1) {
                var record = storeCONTROLPROGRAMADO.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }
        }

        //inicio combo reasignacion  REATOT
        storeREATOT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadestotal'
        });


        var comboREATOT = new Ext.form.ComboBox({
            id: 'comboREATOT',
            store: storeREATOT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoREATOTsignacion(id) {
            var index = storeREATOT.findExact('id', id);
            var record = storeREATOT.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion REATOT

        //inicio combo guia  REAGUIA
        storeREAGUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=guia'
        });


        var comboREAGUIA = new Ext.form.ComboBox({
            id: 'comboREAGUIA',
            store: storeREAGUIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoREAGUIAS(id) {
            var index = storeREAGUIA.findExact('id', id);
            var record = storeREAGUIA.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion REAGUIA


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

        var comboCDT = new Ext.form.ComboBox({
            id: 'comboCDT',
            store: storeCDT,
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
                    return '<span style="color:green;">' + record.get('nombre') + '</span>';
                } else {
                    return '<span style="color:red;">' + record.get('nombre') + '</span>';
                }
            }
        }
        //inicio combo caracter del tramite CDT

        //inicio combo zonal
        storeZonal = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboZonas = new Ext.form.ComboBox({
            id: 'comboZonas',
            store: storeZonal,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        function zonales(id) {
            var index = storeZonal.findExact('id', id);
            if (index > -1) {
                var record = storeZonal.getAt(index);
                return record.get('nombre');
            }
        }

        //fin  combo zoanl

        function change(val) {
            if (val > 0) {
                return '<span style="color:green;">' + val + '</span>';
            } else if (val < 0) {
                return '<span style="color:red;">' + val + '</span>';
            }
            return val;
        }


        //fin combo caracter del tramite CDT

        //inicio combo denuncias ordenanza DETIORD
        storeDETIORD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboDETIORD = new Ext.form.ComboBox({
            id: 'comboDETIORD',
            store: storeDETIORD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        function denunciasListaOrdenanza(id) {
            var index = storeDETIORD.findExact('id', id);
            if (index > -1) {
                var record = storeDETIORD.getAt(index);
                return record.get('nombre');
            }
        }

        //fin  combo denuncias ordenanza

        //inicio combo denuncias ordenanza crolProgramado
        storecrolProgramado = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tipo_control'
        });

        var comboCROLPROGRAMADO = new Ext.form.ComboBox({
            id: 'comboCROLPROGRAMADO',
            store: storecrolProgramado,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        function crolProgramado(id) {
            var index = storecrolProgramado.findExact('id', id);
            if (index > -1) {
                var record = storecrolProgramado.getAt(index);
                return record.get('nombre');
            }
        }

        //fin  combo denuncias ordenanza

        //inicio combo persona recepta la denuncia PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalsecretaria'
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

        function personaReceptaDenuncia(id) {
            var index = storePRD.findExact('id', id);
            if (index > -1) {
                var record = storePRD.getAt(index);
                return '<span style="font-size: 10px!important">' + record.get('nombre') + '</span>';
            }
        }

        function smalltext(id) {
            return '<span style="font-size: 10px!important">' + id + '</span>';
        }

        //fin combo persona recepta la denuncia PRD

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

        function listadoInstituciones(id) {

            return id;

        }

        //fin combo instituciones INST
        //inicio combo instituciones REMITENTE
        storeREMI = new Ext.data.JsonStore({
            root: 'data',
            fields: ['nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=remitente'

        });

        var comboREMI = new Ext.form.ComboBox({
            id: 'comboREMI',
            store: storeREMI,
            valueField: 'nombre',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            allowBlank: false
        });

        function listadoRemitentes(id) {
            return id;
        }

        //fin combo instituciones REMI

// fin combos secretaria

// inicio combos inspeccion

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
            url: 'modules/common/combos/combos.php?tipo=depInspeccion'
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

        var comboESREA = new Ext.form.ComboBox({
            id: 'comboESREA',
            store: storeESREA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRecepcionAdm(id) {
            var index = storeESREA.findExact('id', id);
            if (index > -1) {
                var record = storeESREA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Estado Recepcion Información Inspeccion ESREA

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
            url: 'modules/common/combos/combos.php?tipo=personalinspeccion'
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
// inicio combos inspeccion

// inicio pestañas de mantenimiento


        //inicio mantenimiento DenunciasGuia
        var proxyDenunciasGuia = new Ext.data.HttpProxy({
            api: {
                create: urlDenuncias + "crudDenunciasGuia.php?operation=insert",
                read: urlDenuncias + "crudDenunciasGuia.php?operation=select",
                update: urlDenuncias + "crudDenunciasGuia.php?operation=update",
                destroy: urlDenuncias + "crudDenunciasGuia.php?operation=delete"
            }
        });

        var readerDenunciasGuia = new Ext.data.JsonReader({
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

        var writerDenunciasGuia = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeDenunciasGuia = new Ext.data.Store({
            id: "id",
            proxy: proxyDenunciasGuia,
            reader: readerDenunciasGuia,
            writer: writerDenunciasGuia,
            autoSave: true
        });
        this.storeDenunciasGuia.load();

        this.gridDenunciasGuia = new Ext.grid.EditorGridPanel({
            id: 'gridDenunciasGuia',
            xtype: "grid",
            height: 200,
            store: this.storeDenunciasGuia,
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
                        storeDenunciasSimple.load({params: {filterField: 'guia', filterText: rec.get("id")}})
                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeDenunciasGuia,
                displayInfo: true,
                displayMsg: 'Mostrando denuncias {0} - {1} of {2}',
                emptyMsg: "No existen denuncias que mostrar"
            }),
        });

        //fin mantenimiento DenunciasGuías


// fin pestañas de mantenimiento

        // inicio ventana denuncias
        var proxyDenuncias = new Ext.data.HttpProxy({
            api: {
                create: urlDenuncias + "crudDenuncias.php?operation=insert",
                read: urlDenuncias + "crudDenuncias.php?operation=select",
                update: urlDenuncias + "crudDenuncias.php?operation=update",
                destroy: urlDenuncias + "crudDenuncias.php?operation=delete"
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
                exception: function (proxy, response, operation) {
                    if (operation == 'update') {
                        AppMsg.setAlert("Requisito obligatorio", "Faltan datos, cédula, email o tipo");
                    }

                    if (operation == 'create') {
                        AppMsg.setAlert("Requisito obligatorio", "Faltan datos, cédula, email o tipo");
                    }
                },
            }
        });

        var readerDenuncias = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'codigo_tramite', allowBlank: false},
                {name: 'id_persona', allowBlank: false},
                {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'id_tipo_documento', allowBlank: false},
                {name: 'id_ordenanza', allowBlank: true},
                {name: 'id_tipo', allowBlank: true},
                {name: 'cedula', allowBlank: true},
                {name: 'email', allowBlank: true},
                {name: 'num_documento', allowBlank: false},
                {name: 'remitente', allowBlank: false},
                {name: 'asunto', allowBlank: false},
                {name: 'institucion', allowBlank: true},
                {name: 'descripcion_anexos', allowBlank: false},
                {name: 'reasignacion', allowBlank: false},
                {name: 'id_caracter_tramite', allowBlank: false},
                {name: 'cantidad_fojas', allowBlank: false},
                {name: 'id_zonal_origen', allowBlank: true},
                {name: 'despacho_secretaria', type: 'boolean', allowBlank: false}
            ]
        });
        var writerDenuncias = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeDenuncias = new Ext.data.Store({
            id: "id",
            proxy: proxyDenuncias,
            reader: readerDenuncias,
            writer: writerDenuncias,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {}
        });
        storeDenuncias = this.storeDenuncias;
        limitedenuncias = 100;

        storeDenuncias.baseParams = {
            limit: limitedenuncias
        };

        this.gridDenuncias = new Ext.grid.EditorGridPanel({
            height: 200,
            store: this.storeDenuncias,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 18
                },
                {
                    header: 'Persona recepta',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 28,
                    renderer: personaReceptaDenuncia
                }, {
                    header: 'Recepción documento',
                    dataIndex: 'recepcion_documento',
                    sortable: true,
                    width: 40,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i:s'
                    })
                },
                {
                    header: 'Tipo documento',
                    dataIndex: 'id_tipo_documento',
                    sortable: true,
                    width: 25,
                    editor: comboTID, renderer: personaTipoDocumento
                },
                {
                    header: 'Cédula',
                    dataIndex: 'cedula',
                    sortable: true,
                    width: 22,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Email',
                    dataIndex: 'email',
                    sortable: true,
                    width: 35, editor: {
                        xtype: 'textfield',
                        vtype: 'email',
                        allowBlank: true
                    }
                },
                {
                    header: 'Motivo',
                    dataIndex: 'id_tipo',
                    sortable: true,
                    width: 22,
                    editor: comboCROLPROGRAMADO,
                    renderer: crolProgramado
                },
                {
                    header: 'Ordenanza',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 22,
                    editor: comboDETIORD, renderer: denunciasListaOrdenanza

                },
                {
                    header: 'N. documento',
                    dataIndex: 'num_documento',
                    sortable: true,
                    width: 36,
                    editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                },
                {
                    header: 'Remitente/denunciante',
                    dataIndex: 'remitente',
                    sortable: true,
                    width: 50,
                    editor: comboREMI, renderer: listadoRemitentes
                },
                {
                    header: 'Institución',
                    dataIndex: 'institucion',
                    sortable: true,
                    width: 30,
                    editor: comboINST, renderer: listadoInstituciones,
                    cls: 'expand-panel'
                },
                {
                    header: 'Asunto',
                    dataIndex: 'asunto',
                    sortable: true,
                    width: 50,
                    editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                },
                {
                    header: 'GDoc / Desc. anexos',
                    dataIndex: 'descripcion_anexos',
                    sortable: true,
                    width: 38,
                    editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                },
                {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    align: 'center',
                    width: 12,
                    editor: new Ext.ux.form.SpinnerField({
                        fieldLabel: 'Age',
                        name: 'age',
                        minValue: 0,
                        maxValue: 1000
                    })
                },
                {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 45,
                    editor: comboREA, renderer: departamentoReasignacion
                },
                {
                    header: 'Caracter',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 15,
                    editor: comboCDT, renderer: caracterTramite
                },
                {
                    header: 'Zonal',
                    dataIndex: 'id_zonal_origen',
                    align: 'center',
                    width: 30,
                    renderer: zonales
                },
                {
                    header: 'Despachado'
                    , dataIndex: 'despacho_secretaria'
                    , align: 'center'
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 18
                    , xtype: 'booleancolumn'
                    , hidden: true
                }
            ],
            viewConfig: {
                forceFit: true,
                getRowClass: function (record, index) {
                    if (record.get('despacho_secretaria') == false) {
                        return 'gold';
                    }
                }
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {
                            /*cargar el formulario*/
                            // cargaDetalle(rec.id, this.formDenunciaswebDetalle, rec);

                            cargaDetalle(rec.id, this.formDenunciasDetalle, rec.get("despacho_secretaria"));
                            if (acceso) {
                                if (rec.get("despacho_secretaria"))
                                    Ext.getCmp('tb_grabardenuncias').setDisabled(true);
                                else
                                    Ext.getCmp('tb_grabardenuncias').setDisabled(false);
                            }
                            ;
                            storeINST.load();
                        }
                    }
                }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitedenuncias,
                store: storeDenuncias,
                displayInfo: true,
                displayMsg: 'Mostrando trámites  {0} - {1} of {2}',
                emptyMsg: "No existen trámites que mostrar"
                //filter: Ext.getCmp('tb_seleccionarUnidad').getValue()

            }),

            listeners: {
                beforeedit: function (e) {
                    if (acceso) {
                        if (e.record.get("despacho_secretaria")) {
                            return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                },
                afteredit: function (sm) {
                    //rowselect: function (sm, row, rec) {
                    /*cargar el formulario*/
                    cargaDetalle(sm.record.i, this.formDenunciaswebDetalle, false);


                }

            }
        });

        // datastore and datagrid in Guia
        this.storeDenunciasSimple = new Ext.data.Store({
            id: "id",
            proxy: proxyDenuncias,
            reader: readerDenuncias,
            writer: writerDenuncias,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storeDenunciasSimple = this.storeDenunciasSimple
        this.gridDenunciasSimple = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: this.storeDenunciasSimple,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 15
                },
                {
                    header: 'Persona recepta',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 35,
                    renderer: personaReceptaDenuncia
                }, {
                    header: 'Recepción documento',
                    dataIndex: 'recepcion_documento',
                    sortable: true,
                    width: 45,
                    renderer: formatDate
                },
                {
                    header: 'Tipo documento',
                    dataIndex: 'id_tipo_documento',
                    sortable: true,
                    width: 30,
                    renderer: personaTipoDocumento
                },

                {
                    header: 'N. documento',
                    dataIndex: 'num_documento',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Remitente/denunciante',
                    dataIndex: 'remitente',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Asunto',
                    dataIndex: 'asunto',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'GDoc / Desc. anexos',
                    dataIndex: 'descripcion_anexos',
                    sortable: true,
                    width: 55
                }
                , {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 30,
                    renderer: caracterTramite
                }, {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    sortable: true,
                    width: 20
                }
                , {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 60,
                    renderer: departamentoReasignacion
                }
                , {
                    header: 'Despachado'
                    , dataIndex: 'despacho_secretaria'
                    , align: 'center'
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 20
                    , xtype: 'booleancolumn'
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
            listeners: {
                beforeedit: function (e) {
                    if (acceso) {
                        if (e.record.get("despacho_secretaria")) {
                            return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        // fin datastore and datagrid in Guia

        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyDenuncias,
            reader: readerDenuncias,
            writer: writerDenuncias,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeDocumentosReporte = this.storeDocumentosReporte
        this.gridDocumentosReporte = new Ext.grid.EditorGridPanel({

            height: desktop.getWinHeight() - 238,
            autoScroll: true,
            store: this.storeDocumentosReporte,

            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 15
                },
                {
                    header: 'Persona recepta',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 35,
                    renderer: personaReceptaDenuncia
                }, {
                    header: 'Recepción documento',
                    dataIndex: 'recepcion_documento',
                    sortable: true,
                    width: 45,
                    renderer: formatDate
                },
                {
                    header: 'Tipo documento',
                    dataIndex: 'id_tipo_documento',
                    sortable: true,
                    width: 30,
                    renderer: personaTipoDocumento
                },
                {
                    header: 'Ordenanza',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 28,
                    renderer: denunciasListaOrdenanza

                },
                {
                    header: 'Tipo',
                    dataIndex: 'id_tipo',
                    sortable: true,
                    width: 28,
                    renderer: crolProgramado

                },
                {
                    header: 'N. documento',
                    dataIndex: 'num_documento',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Remitente/ Denunciante',
                    dataIndex: 'remitente',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Institución',
                    dataIndex: 'institucion',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Asunto',
                    dataIndex: 'asunto',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'GDoc / Desc. anexos',
                    dataIndex: 'descripcion_anexos',
                    sortable: true,
                    width: 55
                }
                , {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 30,
                    renderer: caracterTramite
                }, {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    sortable: true,
                    width: 20
                }
                , {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 60,
                    renderer: departamentoReasignacion
                }
                , {
                    header: 'Despachado'
                    , dataIndex: 'despacho_secretaria'
                    , align: 'center'
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 20
                    , xtype: 'booleancolumn'
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
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeDocumentosReporte,
                displayInfo: true,
                displayMsg: 'Mostrando guías {0} - {1} of {2}',
                emptyMsg: "No existen guías que mostrar"
            }),
        });
        // fin datastore and datagrid in Guia


        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();


            this.seleccionDepar = 3;

            this.formDenunciasDetalle = new Ext.FormPanel({
                id: 'formDenunciasDetalle',
                cls: 'no-border',
                items: [
                    {
                        id: 'formcabeceradenuncias',
                        items: this.gridDenuncias,
                        titleCollapse: true,
                        split: true,
                        flex: 1,
                        autoScroll: true,
                        layout: 'column'
                    },
                    {
                        split: true,
                        flex: 2,
                        bodyStyle: 'padding:0; background: #DFE8F6',
                        layout: 'column',

                        items: [
                            {
                                xtype: 'tabpanel',

                                activeTab: 0,
                                width: winWidth - 14 ,
                                cls: 'no-border',
                                items: [
                                    {
                                        title: 'Secretaría',
                                        layout: 'column',
                                        height: winHeight - 321,
                                        width: winWidth - 14 ,
                                        autoScroll: true,
                                        tbar: [
                                            {
                                                text: 'Grabar Recepción Detalle',
                                                scope: this,
                                                handler: this.grabardenuncias,
                                                iconCls: 'save-icon',
                                                disabled: true,
                                                id: 'tb_grabardenuncias'
                                                , formBind: true
                                            },
                                            '->',
                                            {
                                                text: 'Denuncias anteriores:'
                                                , xtype: 'tbtext',
                                                id: 'textRecepcionAnteriores'
                                            }
                                        ],
                                        items: [
                                            {
                                                columnWidth: 1 / 3,
                                                layout: 'form',
                                                monitorValid: true,
                                                defaultType: 'textfield',
                                                items: [
                                                    {
                                                        xtype: 'hidden',
                                                        fieldLabel: 'Id',
                                                        name: 'id'
                                                    },
                                                    {
                                                        fieldLabel: 'Código trámite',
                                                        name: 'codigo_tramite',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Persona recepta',
                                                        name: 'id_persona',
                                                        id: 'id_persona',
                                                        anchor: '95%',
                                                        hiddenName: 'id_persona',
                                                        readOnly: true,
                                                        store: storePRD,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'

                                                    },
                                                    {
                                                        xtype: 'datetimefield',
                                                        fieldLabel: 'Fecha recepción',
                                                        id: 'recepcion_documento',
                                                        name: 'recepcion_documento',
                                                        anchor: '95%',
                                                        readOnly: false,
                                                        dateFormat: 'Y-m-d',
                                                        timeFormat: 'H:i:s'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Tipo documento',
                                                        id: 'id_tipo_documento',
                                                        name: 'id_tipo_documento',
                                                        anchor: '95%',

                                                        hiddenName: 'id_tipo_documento',
                                                        store: storeTID,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'
                                                    },
                                                    {
                                                        fieldLabel: 'Núm documento',
                                                        id: 'num_documento',
                                                        name: 'num_documento',
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        fieldLabel: 'Remitente/ Denunciante',
                                                        id: 'remitente',
                                                        name: 'remitente',
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        fieldLabel: 'CI denunciante',
                                                        id: 'cedula',
                                                        name: 'cedula',
                                                        allowBlank: true,
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        fieldLabel: 'Email denunciante',
                                                        id: 'email',
                                                        name: 'email',
                                                        anchor: '95%',
                                                        allowBlank: true
                                                        , vtype: 'email'
                                                    },
                                                    {
                                                        fieldLabel: 'Dirección denuncia',
                                                        id: 'direccion_denuncia',
                                                        name: 'direccion_denuncia',
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        fieldLabel: 'Georeferencia',
                                                        id: 'georeferenciaSecretaria',
                                                        name: 'georeferencia',
                                                        anchor: '95%',
                                                        allowBlank: true,
                                                        handleMouseEvents: true,
                                                        readOnly: true,
                                                        listeners: {
                                                            render: function (c) {
                                                                //evento click sobre el campo de geo referenciacion
                                                                c.getEl().on('click', function () {
                                                                    Ext.getCmp('panelPrincipal').setActiveTab(3);
                                                                }, c);
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: 1 / 3,
                                                layout: 'form',
                                                items: [
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Ordenanza',
                                                        id: 'id_ordenanza',
                                                        name: 'id_ordenanza',
                                                        anchor: '95%',

                                                        hiddenName: 'id_ordenanza',
                                                        store: storeDETIORD,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Descripción anexo',
                                                        id: 'descripcion_anexos',
                                                        name: 'descripcion_anexos',
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'spinnerfield',
                                                        fieldLabel: 'Cantidad de fojas',
                                                        id: 'cantidad_fojas',
                                                        name: 'cantidad_fojas',
                                                        minValue: 0,
                                                        maxValue: 200,
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        fieldLabel: 'Asunto',
                                                        id: 'asunto',
                                                        name: 'asunto',
                                                        height: 45,
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Institución',
                                                        id: 'institucion',
                                                        name: 'institucion',
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Caracter del trámite',
                                                        id: 'id_caracter_tramite',
                                                        name: 'id_caracter_tramite',
                                                        anchor: '95%',

                                                        hiddenName: 'id_caracter_tramite',
                                                        store: storeCDT,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'
                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        fieldLabel: 'Observaciones secretaria',
                                                        id: 'observacion_secretaria',
                                                        name: 'observacion_secretaria',
                                                        height: 45,
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'displayfield',
                                                        fieldLabel: 'Total documentos anteriores:',
                                                        name: 'totaldocumentos',
                                                        anchor: '95%'
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: 1 / 3,
                                                layout: 'form',
                                                defaults: {
                                                    listeners: {
                                                        change: function (field, newVal, oldVal) {
                                                            if (field.getName() == 'despacho_secretaria') {
                                                                if (oldVal == 'true') {
                                                                    if (newVal == 'false') {
                                                                        Ext.getCmp('tb_grabardenuncias').setDisabled(false);
                                                                        Ext.getCmp('reasignacion').enable();
                                                                    }
                                                                }
                                                            }
                                                            if (field.getName() == 'guia') {
                                                                if (oldVal != newVal) {
                                                                    Ext.getCmp('tb_grabardenuncias').setDisabled(false);
//                                                                        Ext.getCmp('reasignacion').enable();
                                                                }
                                                            }
                                                        }
                                                    },
                                                },
                                                items: [
                                                    /* {
                                                     xtype: 'combo',
                                                     fieldLabel: 'Reasignado a',
                                                     name: 'reasignacion',
                                                     anchor: '95%',

                                                     hiddenName: 'reasignacion',
                                                     store: storeREA,
                                                     valueField: 'id',
                                                     displayField: 'nombre',
                                                     typeAhead: true,
                                                     triggerAction: 'all',
                                                     mode: 'local'
                                                     },*/
                                                    {
                                                        xtype: 'multiselect',
                                                        fieldLabel: 'Reasignado a:<br />(Para seleccion<br /> multiple mantenga<br /> pulsada la tecla Ctrl)',
                                                        id: 'reasignacion',
                                                        name: 'reasignacion',
                                                        width: 300,
                                                        height: 130,
                                                        allowBlank: false, store: storeREA,
                                                        hiddenName: 'reasignacion',
                                                        displayField: 'nombre',
                                                        valueField: 'id',
                                                        ddReorder: true
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Guía',
                                                        name: 'guia',
                                                        id: 'guia',
                                                        anchor: '95%',

                                                        hiddenName: 'guia',
                                                        store: storeREAGUIA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Despachado',
                                                        name: 'despacho_secretaria',
                                                        id: 'despacho_secretaria',
                                                        anchor: '95%',
                                                        hiddenName: 'despacho_secretaria',
                                                        store: storeOFAC,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Tipo respuesta',
                                                        name: 'tipo_respuesta_devolucion',
                                                        id: 'tipo_respuesta_devolucion',
                                                        anchor: '95%',
                                                        hiddenName: 'tipo_respuesta_devolucion',
                                                        store: storeTIPPES,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'
                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        fieldLabel: 'Respuesta devolución',
                                                        id: 'respuesta_devolucion',
                                                        name: 'respuesta_devolucion',
                                                        height: 45,
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'displayfield',
                                                        fieldLabel: 'Fecha respuesta devolución',
                                                        name: 'fecha_respuesta_devolucion',
                                                        anchor: '95%'
                                                    }


                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Inspección',
                                        layout: 'column',
                                        autoScroll: true,
                                        items: [
                                            {
                                                type: 'container',
                                                columnWidth: 1 / 2,
                                                layout: 'form',
                                                items: [
                                                    {
                                                        bodyStyle: 'padding:0; background: #ebfaeb',
                                                        xtype: 'combo',
                                                        fieldLabel: 'Estado Recepcion Información',
                                                        name: 'estado_recepcion_informacion',
                                                        anchor: '95%',
                                                        hiddenName: 'estado_recepcion_informacion',

                                                        store: storeESREA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Actividad',
                                                        name: 'actividad',
                                                        anchor: '95%',
                                                        hiddenName: 'actividad',

                                                        store: storeACTA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Persona asignada',
                                                        name: 'persona_asignada',
                                                        anchor: '95%',
                                                        hiddenName: 'persona_asignada',

                                                        store: storePRASA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },

                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Cod inspección',
                                                        name: 'codigo_inspeccion',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'container',
                                                columnWidth: 1 / 2,
                                                layout: 'form',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Cod procedimiento',
                                                        name: 'codigo_procedimiento',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Zona',
                                                        name: 'id_zona',
                                                        anchor: '95%',
                                                        hiddenName: 'id_zona',

                                                        store: storeZONA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Predio',
                                                        name: 'predio',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    }
                                                    ,
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Observación',
                                                        name: 'observacion',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },

                                                    {

                                                        xtype: 'textarea',
                                                        fieldLabel: 'Procedimiento',
                                                        name: 'procedimientosdetalle',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'

                                                    }
                                                ]
                                            }
                                        ]
                                    }

                                ]
                            }

                        ]
                    }
                ],
                defaults: {
                    /*  listeners: {
                          change: function (field, newVal, oldVal) {
                              consolo.log ("ccc");
                              var myForm = Ext.getCmp('formDenunciasDetalle').getForm();
                              myForm.submit({
                                  url: 'modules/desktop/denuncias/server/crudDenuncias.php?operation=updateForm',
                                  method: 'POST'
                              });
                          }
                      }*/
                }

            });
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
                                fieldLabel: 'Tipo documento',
                                id: 'busqueda_tipo_documento',
                                name: 'busqueda_tipo_documento',
                                hiddenName: 'busqueda_tipo_documento',

                                anchor: '95%',
                                store: storeTID,
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
                                fieldLabel: 'Institución',
                                id: 'busqueda_institucion',
                                name: 'busqueda_institucion',
                                hiddenName: 'busqueda_institucion',
                                anchor: '95%',
                                store: storeINST,
                                valueField: 'nombre',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Caracter',
                                id: 'busqueda_caracter_tramite',
                                name: 'busqueda_caracter_tramite',
                                anchor: '95%',
                                hiddenName: 'busqueda_caracter_tramite',
                                store: storeCDT,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Guía',
                                name: 'busqueda_guia',
                                id: 'busqueda_guia',
                                anchor: '95%',
                                hiddenName: 'busqueda_guia',
                                store: storeREAGUIA,
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
                                xtype: 'multiselect',
                                fieldLabel: 'Unidades',
                                id: 'busqueda_reasignacion',
                                name: 'busqueda_reasignacion',
                                width: 300,
                                height: 100,
                                allowBlank: false, store: storeREA,
                                hiddenName: 'busqueda_reasignacion',
                                displayField: 'nombre',
                                valueField: 'id',
                                ddReorder: true
                            }
                        ]
                    }
                ]
            });


            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeDenuncias;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeDenuncias;
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
                            key: 'codigo_tramite',
                            scope: this,
                            text: 'Código trámite'
                        },
                        {
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
                            text: 'Remitente/ Denunciante'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'descripcion_anexos',
                            scope: this,
                            text: 'Descripcion Anexos'
                        }

                        ,
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'recepcion_documento',
                            scope: this,
                            text: 'Fecha'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'cedula',
                            scope: this,
                            text: 'Cédula'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'guia',
                            scope: this,
                            text: 'Guía'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'institucion',
                            scope: this,
                            text: 'Institución'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'asunto',
                            scope: this,
                            text: 'Asunto'
                        }
                    ]
                })
                , text: 'Código trámite'
            });
            var targetFieldBtn = new Ext.Button({
                menu: new Ext.menu.Menu({
                    id: 'tb_seleccionarUnidad1',
                    disabled: true,
                    items: [
                        {
                            checked: false,
                            checkHandler: targetHandler,
                            group: 'targetField',
                            key: '2',
                            scope: this,
                            text: 'Secretaría'
                        }
                        , {
                            checked: true,
                            checkHandler: targetHandler,
                            group: 'targetField',
                            key: '3',
                            scope: this,
                            text: 'Inspeccion'
                        }
                        , {
                            checked: false,
                            checkHandler: targetHandler,
                            group: 'targetField',
                            key: '4',
                            scope: this,
                            text: 'Instrucción'
                        }
                        , {
                            checked: false,
                            checkHandler: targetHandler,
                            group: 'targetField',
                            key: '5',
                            scope: this,
                            text: 'Resolución y Ejecución'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: '6',
                            scope: this,
                            text: 'Administrativa y financiera'
                        }
                    ]
                })
                , text: 'Inspeccion'
            });
            this.targetFieldBtn = targetFieldBtn;
            win = desktop.createWindow({
                id: 'grid-win-denuncias',
                title: 'Recepción Documentos',
                width: winWidth,
                height: winHeight,
                iconCls: 'denuncias-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',

                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    id: 'panelPrincipal',
                    items: [
                        {
                            autoScroll: true,
                            title: 'General',
                            closable: true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.adddenuncias,
                                    iconCls: 'save-icon',
                                    disabled: !acceso
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deletedenuncias,
                                    iconCls: 'delete-icon',
                                    //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true
                                    disabled: true
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
                                    boxLabel: 'No despachados -- ',
                                    id: 'checkNoEnviados',
                                    name: 'noenviados',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        Ext.getCmp('tb_repoteDenuncias').setDisabled(!this.checked);
                                        //Ext.getCmp('tb_seleccionarUnidad').setDisabled(!this.checked);
                                        //Ext.getCmp('tb_seleccionarUnidad').getValue();
                                        //storeDenuncias.load({params: {noenviados: isChecked}});
                                        storeDenuncias.baseParams = {
                                            noenviados: isChecked
                                        };
                                        storeDenuncias.load();
                                        // if (!this.checked) {
                                        Ext.getCmp('tb_seleccionarUnidad').setValue('Seleccionar Unidad');
                                        //}
                                    }
                                }, /*this.targetFieldBtn,*/
                                {
                                    xtype: 'combo',

                                    fieldLabel: 'Reasignado a',
                                    name: 'tb_reasignacion',
                                    anchor: '95%',
                                    id: 'tb_seleccionarUnidad',
                                    /* disabled: true,*/
                                    hiddenName: 'tb_reasignacion',
                                    store: storeREATOT,
                                    valueField: 'id',
                                    displayField: 'nombre',
                                    typeAhead: true,
                                    triggerAction: 'all',
                                    mode: 'local',
                                    width: 250,
                                    value: 'Seleccionar Unidad',
                                    listeners: {
                                        'select': function (t) {
                                            isChecked = (Ext.getCmp('checkNoEnviados').getValue());
                                            storeDenuncias.baseParams = {
                                                noenviados: isChecked,
                                                unidadfiltro: t.value
                                            };
                                            storeDenuncias.load();
                                        }

                                    }

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporte,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de los items',
                                    id: 'tb_repoteDenuncias',
                                    disabled: true
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
                                    , store: this.storeDenuncias
                                })
                            ],
                            items: this.formDenunciasDetalle
                        }
                        , {
                            title: 'Guías',
                            closable: true,
                            layout: 'border',
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDenunciasGuia,
                                    scope: this,
                                    text: 'Recargar Datos'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteReimpresion,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de la guía seleccionada',
                                    id: 'tb_repoteDenunciasGuias',
                                    disabled: !acceso
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
                                    items: this.gridDenunciasGuia

                                },
                                // create instance immediately
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                    margins: '0 0 0 0',
                                    items: this.gridDenunciasSimple
                                }
                            ]

                            //this.gridDenunciasGuia
                        }

                        , {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled: this.app.isAllowedTo('accesosSecretaria', this.id) ? false : true,
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
                                    id: 'tb_repoteDenunciasGuias',
//                                    disabled: !acceso,
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 145,
                                    minSize: 100,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaDocumentos
                                },
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                    items: this.gridDocumentosReporte
                                }
                            ]

                            //this.gridReportes
                        }


                        , {
                            autoScroll: true,
                            title: 'Geolocalización',
                            closable: true,

                            items: [{
                                region: 'center',
                                xtype: 'gmappanel',
                                zoomLevel: 12,
                                gmapType: 'map',
                                id: 'my_map',
                                border: false,
                                fbar: [
                                    {
                                        text: 'Confirmar dirección',
                                        handler: function () {
                                            Ext.getCmp('georeferenciaSecretaria').setValue(geoSecretaria);
                                            Ext.getCmp('panelPrincipal').setActiveTab(0);
                                        }
                                    }],
                                mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
                                mapControls: ['GSmallMapControl', 'GMapTypeControl'],
                                setCenter: {
                                    lat: -0.1756096,
                                    lng: -78.4761627
                                },
                                markers: [{
                                    lat: -0.17157021176359674,
                                    lng: -78.47847476417087,
                                    marker: {title: 'Quito', draggable: true},
                                    listeners: {
                                        click: function (e) {
                                            //console.log ("Click al boton");
                                        },
                                        dragend: function (e) {
                                            geoSecretaria = e.latLng.lat() + ", " + e.latLng.lng()

                                        }
                                    }
                                }]
                            }]
                        }
                    ]
                })
            });

        }
        win.show();

        function cargaDetalle(denuncias, forma, bloqueo) {
            forma = Ext.getCmp('formDenunciasDetalle');
            forma.getForm().load({
                url: urlDenuncias + 'crudDenuncias.php?operation=selectForm',
                params: {
                    id: denuncias
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textRecepcionAnteriores');
                    if (response.findField('totaldocumentos').getValue() != '0')
                        mensaje.setText('Total documentos anteriores: ' + response.findField('totaldocumentos').getValue())
                    else
                        mensaje.setText('')
                }
            });
            bloquearLectura(forma, bloqueo);
        };


        function bloquearLectura(forma, activar) {
            //en caso que se pueda editar .. revisamos permiso por perfil

            //validate if have access adminsitrator
            if (activar)
                activar2 = activar
            else
                activar2 = !accesosAdministrador

            //en caso que es solo lectura
            if (!acceso) {
                activar2 = activar = true;
            }

            Ext.getCmp('id_persona').setReadOnly(activar2);
            Ext.getCmp('recepcion_documento').setReadOnly(activar);
            Ext.getCmp('id_tipo_documento').setReadOnly(activar);
            Ext.getCmp('num_documento').setReadOnly(activar);
            Ext.getCmp('remitente').setReadOnly(activar);
            Ext.getCmp('cedula').setReadOnly(activar);
            Ext.getCmp('email').setReadOnly(activar);
            Ext.getCmp('descripcion_anexos').setReadOnly(activar);
            Ext.getCmp('cantidad_fojas').setReadOnly(activar);
            Ext.getCmp('asunto').setReadOnly(activar);
            Ext.getCmp('institucion').setReadOnly(activar);
            Ext.getCmp('id_caracter_tramite').setReadOnly(activar);
            Ext.getCmp('observacion_secretaria').setReadOnly(activar);


            Ext.getCmp('despacho_secretaria').setReadOnly(!acceso);
            Ext.getCmp('guia').setReadOnly(!acceso);


            if (accesosZonales)
                Ext.getCmp('reasignacion').disable();
            else {
                if (!activar)
                    Ext.getCmp('reasignacion').enable();
                else
                    Ext.getCmp('reasignacion').disable();
            }

        };


        setTimeout(function () {
            this.storeDenuncias.load({
                params: {
                    start: 0,
                    limit: limitedenuncias,
                    noenviados: Ext.getCmp('checkNoEnviados').getValue()
                }
            });
        }, 500);


    },
    deletedenuncias: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDenuncias.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDenuncias.remove(rows);
                }
            }
        });
    },
    adddenuncias: function () {
        var denuncias = new this.storeDenuncias.recordType({
            codigo_tramite: ' ',
            id_persona: ' ',
            id_tipo: '',
            recepcion_documento: (new Date()),
            id_tipo_documento: '2',
            num_documento: 'S/N',
            descripcion_anexos: '-',
            institucion: '',
            remitente: '',
            reasignacion: '',
            asunto: '',
            id_caracter_tramite: '1',
            cantidad_fojas: '0',
            despacho_secretaria: false,
            id_zonal_origen:' '

        });
        this.gridDenuncias.stopEditing();
        this.storeDenuncias.insert(0, denuncias);
        this.gridDenuncias.startEditing(0, 0);

    },
    requestGridData: function () {


        this.storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
    },

    botonExportarReporte: function () {

        if (Ext.getCmp('tb_seleccionarUnidad').getValue() == 'Seleccionar Unidad')
            Ext.Msg.show({
                title: 'Advertencia',
                msg: 'Seleccione unidad',
                scope: this,
                icon: Ext.Msg.WARNING
            });
        else
            Ext.Msg.show({
                title: 'Advertencia',
                msg: 'Se descarga el archivo Excel<br>Se cambia el estado de Enviado a Si.<br>¿Desea continuar?',
                scope: this,
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn == 'yes') {
                        window.location.href = 'modules/desktop/denuncias/server/descargaDenunciasNuevas.inc.php?unidad=' + Ext.getCmp('tb_seleccionarUnidad').getValue();
                        setTimeout(function () {
                            storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                        }, 1000);

                    }
                }
            });
    },

// funcion usada por boton
    botonExportarReporteReimpresion: function () {
        // recuperamos registro seleccionado de datagrid denunciaguia
        var rows = this.gridDenunciasGuia.getSelectionModel().getSelections();
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
        // mensaje continuar y llamada a descarga archivo
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo Excel<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {

                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/denuncias/server/descargaDenunciasNuevas.inc.php?reimpresion=true&guia=' + rows[0].get('id');
                }
            }
        });
    },

    grabardenuncias: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formDenunciasDetalle').getForm();
                    myForm.submit({
                        url: 'modules/desktop/denuncias/server/crudDenuncias.php?operation=updateForm',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                            Ext.getCmp('tb_grabardenuncias').setDisabled(true);
                        },
                        failure: function (form, action) {
                            if (typeof action.response.responseText !== 'undefined') {
                                var errorJson = JSON.parse(action.response.responseText);
                                Ext.Msg.show({
                                    title: 'Error campos obligatorios'
                                    , msg: errorJson.msg
                                    , modal: true
                                    , icon: Ext.Msg.ERROR
                                    , buttons: Ext.Msg.OK
                                });
                            }
                        }
                    });
                }
            }
        });
    },
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


    requestGridDataDenunciasGuia: function () {
        this.storeDenunciasGuia.load();
    },
    requestGridDataDocumentoReporte: function () {
        this.storeDocumentosReporte.baseParams = this.formConsultaDocumentos.getForm().getValues();
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
                    window.location.href = 'modules/desktop/denuncias/server/descargaReporte.inc.php?param=' + valueParams;
                }
            }
        });
    }
});