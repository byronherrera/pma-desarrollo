QoDesk.ContribucionesWindow = Ext.extend(Ext.app.Module, {
    id: 'contribuciones',
    type: 'desktop/contribuciones',

    init: function () {
        this.launcher = {
            text: 'Contributions',
            iconCls: 'contribuciones-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministrador = this.app.isAllowedTo('accesosAdministrador', this.id);
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosZonales = this.app.isAllowedTo('accesosZonales', this.id);

        var acceso = (accesosAdministrador || accesosSecretaria || accesosZonales) ? true : false

        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-contribuciones');
        var urlContribuciones = "modules/desktop/contribuciones/server/";

        var textField = new Ext.form.TextField({allowBlank: false, readOnly: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d') : '';
        }
        function smalltext(id) {
            return '<span style="font-size: 10px!important">' + id + '</span>';
        }

        // inicio combos contribuciones

        //inicio combo tipo documento  TID
        storeGrant = new Ext.data.JsonStore({
            root: 'documento',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                documento: [
                    {"id": 'Cerrada', "nombre": "Cerrada"},
                    {"id": 'Vigente', "nombre": "Vigente"},
                    {"id": 'Pendiente', "nombre": "Pendiente"}
                ]
            }
        });
        function personaTipoDocumento(id) {
            var index = storeGrant.find('id', id);
            if (index > -1) {
                var record = storeGrant.getAt(index);
                return record.get('nombre');
            }
        }
        //fin combo tipo documento  TID

        //inicio combo guia  REAGUIA
        storeREAGUIA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "Yes", "nombre": "Yes"},
                    {"id": "No", "nombre": "No"}
                ]
            }
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
            root: 'data',
            fields: ['nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=yearcontribution'
        });

        var comboCDT = new Ext.form.ComboBox({
            id: 'comboCDT',
            store: storeCDT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        /*function caracterTramite(id) {
            return id;

        }*/
        //inicio combo caracter del tramite CDT
        // TODO usar funcion
        function change(val) {
            if (val > 0) {
                return '<span style="color:green;">' + val + '</span>';
            } else if (val < 0) {
                return '<span style="color:red;">' + val + '</span>';
            }
            return val;
        }

        //fin combo caracter del tramite CDT

        //inicio combo contribuciones ordenanza DETIORD
        /*storeDETIORD = new Ext.data.JsonStore({
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

        function contribucionesListaOrdenanza(id) {
            var index = storeDETIORD.findExact('id', id);
            if (index > -1) {
                var record = storeDETIORD.getAt(index);
                return record.get('nombre');
            }
        }
*/
        //fin  combo contribuciones ordenanza

        //inicio combo contribuciones ordenanza crolProgramado
       /* storecrolProgramado = new Ext.data.JsonStore({
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
        }*/

        //fin  combo contribuciones ordenanza

        //inicio combo persona recepta la denuncia PRD
       /* storePRD = new Ext.data.JsonStore({
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
        }*/


        //fin combo persona recepta la denuncia PRD

        //inicio combo instituciones INST
        storeINST = new Ext.data.JsonStore({
            root: 'data',
            fields: ['nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=donor'
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
        /*storeREMI = new Ext.data.JsonStore({
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
        }*/

        //fin combo instituciones REMI

// fin combos secretaria

// inicio combos inspeccion

        //inicio combo ZONA
        /*storeZONA = new Ext.data.JsonStore({
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
*/
        //fin combo ZONA

        //inicio combo actividad  ACTA
       /* storeACTA = new Ext.data.JsonStore({
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
        }*/

        //fin combo actividad  ACTA

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
                    {"id": "Vigente", "subcategory_name": "Vigente"},
                    {"id": "Cerrada", "subcategory_name": "Cerrada"}
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
                    {"id": "Si", "subcategory_name": "Si"},
                    {"id":  "No", "subcategory_name": "No"}
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
       /* storePRSA = new Ext.data.JsonStore({
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
        }*/

        //fin combo procedimientos PRSA

        //inicio combo persona asignada PRASA
/*        storePRASA = new Ext.data.JsonStore({
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
        }*/

        //fin combo caracter del tramite PRASA
// inicio combos inspeccion

// inicio pestañas de mantenimiento


// fin pestañas de mantenimiento

        // inicio ventana contribuciones
        var proxyContribuciones = new Ext.data.HttpProxy({
            api: {
                create: urlContribuciones + "crudContribuciones.php?operation=insert",
                read: urlContribuciones + "crudContribuciones.php?operation=select",
                update: urlContribuciones + "crudContribuciones.php?operation=update",
                destroy: urlContribuciones + "crudContribuciones.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        /*if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                        else {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }*/
                    }
                },
                exception: function (proxy, response, operation) {
                    if (operation == 'update') {
                        //AppMsg.setAlert("Requisito obligatorio", "Faltan datos");
                    }

                    if (operation == 'create') {
                        // AppMsg.setAlert("Requisito obligatorio", "Faltan datos");
                    }
                },
            }
        });

        var readerContribuciones = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'grant_number', allowBlank: false},
                {name: 'estado', allowBlank: false},
                {name: 'crn', allowBlank: false},
                {name: 'donor', allowBlank: false},
                {name: 'fund', allowBlank: false},
                {name: 'comments', allowBlank: false},
                {name: 'isc', allowBlank: false},
                {name: 'total_grant', allowBlank: true},
                {name: 'total_programmed', allowBlank: true},
                {name: 'total_unprogrammed', allowBlank: true},
                {name: 'grant_tod', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'grant_tdd', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'grant_specific', allowBlank: true},
                {name: 'activity', allowBlank: true},
                {name: 'year_contribution', allowBlank: true},
                {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true}
                //{name: 'id_tipo_documento', allowBlank: true},
                // {name: 'id_ordenanza', allowBlank: true},
                // {name: 'id_tipo', allowBlank: true},
                //{name: 'cedula', allowBlank: true},
                // {name: 'email', allowBlank: true},
                // {name: 'num_documento', allowBlank: false},
                // {name: 'remitente', allowBlank: false},
                // {name: 'asunto', allowBlank: false},
                // {name: 'institucion', allowBlank: true},
                // {name: 'descripcion_anexos', allowBlank: false},
                // {name: 'reasignacion', allowBlank: false},
                // {name: 'id_caracter_tramite', allowBlank: false},
                // {name: 'cantidad_fojas', allowBlank: false},
                // {name: 'id_zonal_origen', allowBlank: true},
                //{name: 'despacho_secretaria', type: 'boolean', allowBlank: false}
            ]
        });
        var writerContribuciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeContribuciones = new Ext.data.Store({
            id: "storeContribuciones",
            proxy: proxyContribuciones,
            reader: readerContribuciones,
            writer: writerContribuciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {}
        });
        storeContribuciones = this.storeContribuciones;
        limitecontribuciones = 100;

        this.storeContribuciones.baseParams = {
            limit: limitecontribuciones
        };

        this.gridContribuciones = new Ext.grid.EditorGridPanel({
            height: 495,
            store: this.storeContribuciones,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Grant Number',
                    dataIndex: 'grant_number',
                    sortable: true,
                    width: 38,
                    editor: textField
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
                    width: 28,
                    editor: textField
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Year',
                    dataIndex: 'year_contribution',
                    sortable: true,
                    width: 20,
                    editor: new Ext.ux.form.SpinnerField({
                        fieldLabel: 'Year',
                        name: 'year',
                        minValue: 2000,
                        maxValue: 2030
                    }),
                    align: 'right'
                },
                {
                    header: 'ISC',
                    dataIndex: 'isc',
                    sortable: true,
                    width: 28,
                    editor: textField,
                    align: 'right'
                    // renderer: personaReceptaDenuncia
                },
                {
                    header: 'Total Direct Cost',
                    dataIndex: 'total_grant',
                    sortable: true,
                    width: 28,
                    align: 'right',
                    renderer: 'usMoney',
                    editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 100000000
                    }),
                    align: 'right'
                },
                {
                    header: 'Total Programmed',
                    dataIndex: 'total_programmed',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney',
                    // editor: new Ext.form.NumberField({
                    //     allowBlank: false,
                    //     allowNegative: false,
                    //     maxValue: 100000000
                    // }),
                    align: 'right'
                },
                {
                    header: 'Unprogrammed',
                    dataIndex: 'total_unprogrammed',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney',
                    // editor: new Ext.form.NumberField({
                    //     allowBlank: false,
                    //     allowNegative: false,
                    //     maxValue: 100000000
                    // }),
                    align: 'right'
                },
                {
                    header: 'Grant TOD',
                    dataIndex: 'grant_tod',
                    sortable: true,
                    width: 40,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Grant TDD',
                    dataIndex: 'grant_tdd',
                    sortable: true,
                    width: 40,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
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
                }
            ],
            viewConfig: {
                //para dar color a la fila
                forceFit: true,
                getRowClass: function (record, index) {
                    /*if (record.get('despacho_secretaria') == false) {
                        return 'gold';
                    }*/
                }
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {
                        }
                    }
                }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitecontribuciones,
                store: this.storeContribuciones,
                displayInfo: true,
                displayMsg: 'Showing contributions  {0} - {1} of {2}',
                emptyMsg: "No contributions to be shown"

            }),

            listeners: {
                beforeedit: function (e) {
                    /*if (acceso) {
                        if (e.record.get("despacho_secretaria")) {
                            return false;
                        }
                        return true;
                    } else {
                        return false;
                    }*/
                },
                afteredit: function (sm) {


                }

            }
        });

        // datastore and datagrid in Guia
        this.storeContribucionesSimple = new Ext.data.Store({
            id: "storeContribucionesSimple",
            proxy: proxyContribuciones,
            reader: readerContribuciones,
            writer: writerContribuciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storeContribucionesSimple = this.storeContribucionesSimple
        this.gridContribucionesSimple = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: this.storeContribucionesSimple,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Grant number',
                    dataIndex: 'grant_number',
                    sortable: true,
                    width: 15
                },

                // {
                //     header: 'Recepción documento',
                //     dataIndex: 'recepcion_documento',
                //     sortable: true,
                //     width: 45,
                //     renderer: formatDate
                // } ,
                {
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
            id: "storeDocumentosReporte",
            proxy: proxyContribuciones,
            reader: readerContribuciones,
            writer: writerContribuciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeDocumentosReporte = this.storeDocumentosReporte

        this.gridDocumentosReporte = new Ext.grid.EditorGridPanel({

            height: desktop.getWinHeight() - 215,
            autoScroll: true,
            store: this.storeDocumentosReporte,

            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Grant Number CSP',
                    dataIndex: 'grant_number',
                    sortable: true,
                    width: 38
                },
                {
                    header: 'Estado',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 28
                },
                {
                    header: 'CRN',
                    dataIndex: 'crn',
                    sortable: true,
                    width: 28
                },
                {
                    header: 'Donor',
                    dataIndex: 'donor',
                    sortable: true,
                    width: 28
                },
                {
                    header: 'Comments',
                    dataIndex: 'comments',
                    sortable: true,
                    width: 28
                },
                {
                    header: 'Year contribution',
                    dataIndex: 'year_contribution',
                    sortable: true,
                    width: 28
                },
                {
                    header: 'ISC',
                    dataIndex: 'isc',
                    sortable: true,
                    width: 28
                },
                {
                    header: 'Total Grant Value without ISC',
                    dataIndex: 'total_grant',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney'
                },
                {
                    header: 'Programmed',
                    dataIndex: 'total_programmed',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney'
                },
                {
                    header: 'Unprogrammed',
                    dataIndex: 'total_unprogrammed',
                    sortable: true,
                    width: 28,
                    renderer: 'usMoney'
                },
                {
                    header: 'Grant TOD',
                    dataIndex: 'grant_tod',
                    sortable: true,
                    width: 40,
                    renderer: formatDate
                },
                {
                    header: 'Grant TDD',
                    dataIndex: 'grant_tdd',
                    sortable: true,
                    width: 40,
                    renderer: formatDate
                },
                {
                    header: 'Grant Specific',
                    dataIndex: 'grant_specific',
                    sortable: true,
                    width: 25
                },
                {
                    header: 'Activity',
                    dataIndex: 'activity',
                    sortable: true,
                    width: 22
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
                emptyMsg: "No contributions to be shown"
            }),
        });
        // fin datastore and datagrid in Guia


        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();


            this.seleccionDepar = 3;

            this.formContribucionesDetalle = new Ext.FormPanel({
//                id: 'formContribucionesDetalle',
                cls: 'no-border',
                id: 'formcabeceracontribuciones',
                items: this.gridContribuciones,
//                titleCollapse: true,
//                split: true,
//                flex: 1,
//                autoScroll: true,
//                layout: 'column',
                layout: 'fit',
                height: winHeight - 90

            });
            this.formConsultaDocumentos = new Ext.FormPanel({
                layout: 'column',
                title: 'Ingrese los parámetros para la búsqueda',
                frame: true,

                items: [
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio TOD',
                                id: 'busqueda_fecha_inicio',
                                anchor: '95%',
                                format: 'Y-m-d',
                                submitFormat: 'Y-m-d'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Fin TOD',
                                id: 'busqueda_fecha_fin',
                                anchor: '95%',
                                format: 'Y-m-d',
                                submitFormat: 'Y-m-d',
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Estado',
                                id: 'busqueda_tipo_documento',
                                name: 'busqueda_tipo_documento',
                                hiddenName: 'busqueda_tipo_documento',

                                anchor: '95%',
                                store: storeGrant,
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
                                fieldLabel: 'Donor',
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
                                fieldLabel: 'Year Contributión',
                                id: 'busqueda_caracter_tramite',
                                name: 'busqueda_caracter_tramite',
                                anchor: '95%',
                                hiddenName: 'busqueda_caracter_tramite',

                                store: storeCDT,
                                valueField: 'nombre',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Grant specific',
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

                        ]
                    }
                ]
            });


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
                        },
                        // {
                        //     checked: false,
                        //     checkHandler: checkHandler,
                        //     group: 'filterField',
                        //     key: 'num_documento',
                        //     scope: this,
                        //     text: 'Número documento'
                        // },
                        // {
                        //     checked: false,
                        //     checkHandler: checkHandler,
                        //     group: 'filterField',
                        //     key: 'remitente',
                        //     scope: this,
                        //     text: 'Remitente/ Denunciante'
                        // },
                    ]
                })
                , text: 'Any column'
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
                , text: 'Otra pestaña'
            });
            this.targetFieldBtn = targetFieldBtn;

            win = desktop.createWindow({
                id: 'grid-win-contribuciones',
                title: 'Contributions record',
                width: winWidth,
                height: winHeight,
                iconCls: 'contribuciones-icon',
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
                                    text: 'New',
                                    scope: this,
                                    handler: this.addcontribuciones,
                                    iconCls: 'save-icon',
                                    disabled: !acceso
                                },
                                '-',
                                {
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deletecontribuciones,
                                    iconCls: 'delete-icon',
                                    //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true
                                    disabled: false
                                },
                                '-',
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridData,
                                    scope: this,
                                    text: 'Reload data',
                                    tooltip: 'Reload data'
                                },
                              /*  {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporte,
                                    scope: this,
                                    text: 'Generate Report',
                                    tooltip: 'Generate Report',
                                    id: 'tb_repoteContribuciones',
                                    disabled: true
                                },*/
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
                                    , store: this.storeContribuciones
                                })
                            ],
                            items: this.formContribucionesDetalle
                        }
/*                        , {
                            title: 'Guías',
                            closable: true,
                            layout: 'border',
                            hidden: 'true', //TODO eliminar pestaña
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataContribucionesGuia,
                                    scope: this,
                                    text: 'Reload data'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteReimpresion,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de la guía seleccionada',
                                    id: 'tb_repoteContribucionesGuias',
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
                                    items: this.gridContribucionesGuia

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
                                    items: this.gridContribucionesSimple
                                }
                            ]

                            //this.gridContribucionesGuia
                        }
*/
                        , {
                            title: 'Reports',
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
                                    id: 'tb_repoteContribucionesGuias',
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 'auto',
                                    minSize: 100,
                                    maxSize: 150,
                                    closable: true,
                                    border: false,
                                    autoScroll: false,
                                    items: this.formConsultaDocumentos
                                },
                                {
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

/*

 */                   ]
                })
            });

        }
        win.show();



        setTimeout(function () {
            this.storeContribuciones.load({
                params: {
                    start: 0,
                    limit: limitecontribuciones,
                   // noenviados: Ext.getCmp('checkNoEnviados').getValue()
                }
            });
        }, 500);


    },
    deletecontribuciones: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridContribuciones.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeContribuciones.remove(rows);
                }
            }
        });
    },
    addcontribuciones: function () {
        var contribuciones = new this.storeContribuciones.recordType({
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
            // id_tipo: '',
            crn: '',
            recepcion_documento: (new Date())


        });
        this.gridContribuciones.stopEditing();
        this.storeContribuciones.insert(0, contribuciones);
        this.gridContribuciones.startEditing(0, 0);

    },
    requestGridData: function () {
        this.storeContribuciones.load( );
//        this.storeContribuciones.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
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
                        window.location.href = 'modules/desktop/contribuciones/server/descargaContribucionesNuevas.inc.php?unidad=' + Ext.getCmp('tb_seleccionarUnidad').getValue();
                        setTimeout(function () {
                            storeContribuciones.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                        }, 1000);

                    }
                }
            });
    },

// funcion usada por boton
    botonExportarReporteReimpresion: function () {
        // recuperamos registro seleccionado de datagrid denunciaguia
        var rows = this.gridContribucionesGuia.getSelectionModel().getSelections();
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
                    window.location.href = 'modules/desktop/contribuciones/server/descargaContribucionesNuevas.inc.php?reimpresion=true&guia=' + rows[0].get('id');
                }
            }
        });
    },

    grabarcontribuciones: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formContribucionesDetalle').getForm();
                    myForm.submit({
                        url: 'modules/desktop/contribuciones/server/crudContribuciones.php?operation=updateForm',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            storeContribuciones.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                            Ext.getCmp('tb_grabarcontribuciones').setDisabled(true);
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


    requestGridDataContribucionesGuia: function () {
        this.storeContribucionesGuia.load();
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
                    window.location.href = 'modules/desktop/contribuciones/server/descargaReporte.inc.php?param=' + valueParams;
                }
            }
        });
    }
});
