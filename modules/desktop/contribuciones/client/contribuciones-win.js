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

        var intervalo1 = 30;
        var intervalo2 = 90;


        function formatPrice(value) {

            if ((value == '') || (value === null) || (value == 0))
                return '';
            if (typeof value !== 'undefined') {
                numero = parseFloat(value).toFixed(2);
                return '$' + Ext.util.Format.number(numero, '0,000.00') ;
            } else
                return '';
        };

        //incio variables visualizacion
        if (acceso) {
            var textField = new Ext.form.TextField({allowBlank: false, readOnly: false});
        } else {
            var textField = new Ext.form.TextField({allowBlank: false, readOnly: true});
        }

        if (acceso) {
            var textField10 = new Ext.form.TextField({allowBlank: false, readOnly: false, maxLength: 12});
        } else {
            var textField10 = new Ext.form.TextField({allowBlank: false, readOnly: true, maxLength: 12});
        }

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

        // TODO usar funcion


        function change(val) {

            if (val > 0) {
                return '<span style="color:green;">' + val + '</span>';
            } else if (val < 0) {
                return '<span style="color:red;">' + val + '</span>';
            }
            return val;
        }

        //fin variables visualizacion

        // inicio combos contribuciones


        //inicio combo caracter del tramite CDT
        storeCDT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=yearcontribution'
        });


        //inicio combo instituciones INST
        storeINST = new Ext.data.JsonStore({
            root: 'data',
            fields: ['nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=crn'
        });

        //inicio combo instituciones INST
        storegrant_number = new Ext.data.JsonStore({
            root: 'data',
            fields: ['nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=grant_number'
        });



        //fin combo instituciones INST

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
        //inicio combo notrelevant
        storenotrelevant = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'subcategory_name'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "1", "subcategory_name": "Yes"},
                    {"id": "0", "subcategory_name": "No"}
                ]
            }
        });

        var combonotrelevant = new Ext.form.ComboBox({
            id: 'combonotrelevant',
            store: storenotrelevant,
            valueField: 'id',
            displayField: 'subcategory_name',
            triggerAction: 'all',
            mode: 'local'
        });


        function costnotrelevant(id) {
            var index = storenotrelevant.findExact('id', id);
            if (index > -1) {
                var record = storenotrelevant.getAt(index);
                return record.get('subcategory_name');
            }

        }

        //fin combo GRANT

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
                    // storeContribucionesr.load();
                    /* if (action = 'update') {
                         storeContribuciones.load();
                       }
                     if (action = 'insert') {
                         storeContribuciones.load();
                       }*/
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
                {name: 'notrelevant', allowBlank: true},
                {name: 'year_contribution', allowBlank: true},
                {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true}
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
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {},
            listeners: {
                load: function (store, records, success) {
                    mensaje = Ext.getCmp('totalContribuciones');
                    mensaje.setText('Grant : ' + formatPrice(storeContribuciones.reader.jsonData['total_grant']) +
                        ', Programmed : ' + formatPrice(storeContribuciones.reader.jsonData['total_programmed']) +
                        ', Unprogrammed : ' + formatPrice(storeContribuciones.reader.jsonData['total_unprogrammed']) )
                },
                exception: function (proxy, response, operation) {
                    if (operation == 'destroy') {
                        Ext.Msg.show({
                            title: 'Error'
                            , msg: 'To delete the record, the dependent records must be deleted'
                            , modal: true
                            , icon: Ext.Msg.ERROR
                            , buttons: Ext.Msg.OK
                        });
                    } else
                    {
                        alert("Error con los datos!");
                    }
                }
            }
        });
        storeContribuciones = this.storeContribuciones;
        limitecontribuciones = 100;

        this.storeContribuciones.baseParams = {
            limit: limitecontribuciones
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
                    header: 'Alert',
                    dataIndex: 'id_contribucion',
                    // id: 'id_contribucion',
                    width: 12,
                    // editor: textField10,
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        // si estado es cerrado retorna amarillo
                        recuperaEstado = record.get('estado');
                        // grant_number = record.get('grant_number');
                        // alert('ps',this);
                        // if (grant_number.length > 10) {
                        //     alert('ps',grant_number.length);
                        // }
                        // si la fecha esta proxima a su vencimiento 30 dias
                        fecha_actual = new Date();
                        var diff = Math.abs(record.get('grant_tdd') - fecha_actual) / 3600000 / 24;

                        if (recuperaEstado === 'Closed') {
                            return '<span class="circleBase goldstate"></span>';
                        }

                        // regresa diff en dias
                        else if (diff < intervalo1) {
                            return '<span class="circleBase redstate"></span>';
                        }
                        // si la fecha esta proxima a su vencimiento 60 dias
                        else if (diff < intervalo2) {
                            return '<span class="circleBase bluestate"></span>';
                        }
                        else {
                            return '<span class="circleBase whitestate"></span>';
                        }
                        return value
                    }
                },
                {
                    header: 'Grant Number',
                    dataIndex: 'grant_number',
                    id: 'grant_number',
                    width: 38,
                    editor: textField10,
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
                    header: 'Total Direct Cost',
                    dataIndex: 'total_grant',
                    width: 35,
                    align: 'right',
                    renderer: 'usMoney',
                    editor: numero,
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
                    header: 'Total contribution',
                    dataIndex: 'total_contribution',
                    sortable: true,
                    width: 35,
                    renderer: 'usMoney',
                    // editor: numero,
                    align: 'right'
                },
                {
                    header: 'Programmed',
                    dataIndex: 'total_programmed',
                    width: 35,
                    renderer: 'usMoney',
                    align: 'right'
                },
                {
                    header: 'Unprogrammed',
                    dataIndex: 'total_unprogrammed',
                    width: 35,
                    renderer: 'usMoney',
                    align: 'right'
                },
                {
                    header: 'Grant TOD',
                    dataIndex: 'grant_tod',
                    width: 28,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: fecha,
                    align: 'right'
                },
                {
                    header: 'Grant TDD',
                    dataIndex: 'grant_tdd',
                    width: 28,
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

        this.gridContribuciones = new Ext.grid.EditorGridPanel({
            colModel: createColModel(),
            loadMask: true,
            plugins: [filters],
            autoExpandColumn: 'id',
  //          height: 495,
            store: this.storeContribuciones,
            viewConfig: {
                //para dar color a la fila
                forceFit: true,
                getRowClass: function (record, index) {
                },
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
                store: storeContribuciones,
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
        gridContribuciones = this.gridContribuciones;
        this.gridContribuciones.getBottomToolbar().add([
            '->', {
                text: 'Clear Filter Data',
                handler: function () {
                    gridContribuciones.filters.clearFilters();
                }
            }
        ]);

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
                    , trueText: 'Yes'
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

            height: desktop.getWinHeight() - 195,
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
                    width: 28,
                    renderer: 'usMoney',
                    align: 'right'
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
                    header: 'Not relevant',
                    dataIndex: 'notrelevant',
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
                displayMsg: 'Showing contributions  {0} - {1} of {2} ',
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
                                fieldLabel: 'Grant Number',
                                id: 'busqueda_grant_number',
                                name: 'busqueda_grant_number',
                                hiddenName: 'busqueda_grant_number',

                                anchor: '95%',
                                store: storegrant_number,
                                valueField: 'nombre',
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
                                fieldLabel: 'CRN',
                                id: 'busqueda_crn',
                                name: 'busqueda_crn',
                                hiddenName: 'busqueda_crn',
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
                                id: 'busqueda_year_contribution',
                                name: 'busqueda_year_contribution',
                                anchor: '95%',
                                hiddenName: 'busqueda_year_contribution',

                                store: storeCDT,
                                valueField: 'nombre',
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
                        items: []
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
                                '-',{
                                    text: 'Totales:'
                                    , xtype: 'tbtext',
                                    id: 'totalContribuciones'
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
                    ]
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
            title: 'Alert',
            msg: 'Are you sure you want to delete?',
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
            grant_number: '',
            estado: '',
            donor: '',
            fund: '',
            comments: '',
            isc: 0,
            total_grant: 0,
            total_programmed: 0,
            total_unprogrammed: 0,
            total_contribution: 0,
            notrelevant: 0,
            grant_tod: (new Date()),
            grant_tdd: (new Date()),
            grant_specific: '',
            year_contribution: (new Date().getFullYear()),
            crn: '',
            recepcion_documento: (new Date())
        });
        this.gridContribuciones.stopEditing();
        this.storeContribuciones.insert(0, contribuciones);
        this.gridContribuciones.startEditing(0, 0);

    },
    requestGridData: function () {
        this.storeContribuciones.load();
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
            msg: 'Download Excel file <br>Continue?',
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
            title: 'Alert',
            msg: 'Save?<br>Continue?',
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
                                    title: 'Error no params'
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
                title: 'Alert',
                msg: 'No results',
                scope: this,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
        // mensaje continuar y llamada a descarga archivo
        Ext.Msg.show({
            title: 'Alert',
            msg: 'Download Excel file <br>Continue?',
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
