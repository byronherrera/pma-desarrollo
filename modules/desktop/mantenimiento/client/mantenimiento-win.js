var selectedPayroll = '';

QoDesk.MantenimientoWindow = Ext.extend(Ext.app.Module, {
    id: 'mantenimiento',
    type: 'desktop/mantenimiento',

    init: function () {
        this.launcher = {
            text: 'Ingreso contribuciones',
            iconCls: 'mantenimiento-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        //Variables de acceso
        var accesosAdministrador = this.app.isAllowedTo('accesosAdministrador', this.id);
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosZonales = this.app.isAllowedTo('accesosZonales', this.id);
        var acceso = (accesosAdministrador || accesosSecretaria || accesosZonales) ? true : false
        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-mantenimiento');

        var winWidth = desktop.getWinWidth();
        var winHeight = desktop.getWinHeight();
        limitemantenimiento = 100;

        //Ubicación de la carpeta de mantenimiento
        var urlMantenimiento = "modules/desktop/mantenimiento/server/";

        var textField = new Ext.form.TextField({allowBlank: false});


        //Definición del formato de fecha
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        //Inicio ventana mantenimiento ordenanzas

        //Inicio Combo starting_month
        storeStarting_month = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'month'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "1", "month": "January"},
                    {"id": "2", "month": "February"},
                    {"id": "3", "month": "March"},
                    {"id": "4", "month": "April"},
                    {"id": "5", "month": "May"},
                    {"id": "6", "month": "June"},
                    {"id": "7", "month": "July"},
                    {"id": "8", "month": "August"},
                    {"id": "9", "month": "September"},
                    {"id": "10", "month": "October"},
                    {"id": "11", "month": "November"},
                    {"id": "12", "month": "December"}
                ]
            }
        });

        var comboStarting_month = new Ext.form.ComboBox({
            id: 'comboStarting_month',
            store: storeStarting_month,
            valueField: 'id',
            displayField: 'month',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererStarting_month(id) {
            var index = storeStarting_month.findExact('id', id);
            if (index > -1) {
                var record = storeStarting_month.getAt(index);
                return record.get('month');
            }

        }

        //fin combo Starting_month


        //Inicio Combo ending_month
        storeEnding_month = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'month'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "1", "month": "January"},
                    {"id": "2", "month": "February"},
                    {"id": "3", "month": "March"},
                    {"id": "4", "month": "April"},
                    {"id": "5", "month": "May"},
                    {"id": "6", "month": "June"},
                    {"id": "7", "month": "July"},
                    {"id": "8", "month": "August"},
                    {"id": "9", "month": "September"},
                    {"id": "10", "month": "October"},
                    {"id": "11", "month": "November"},
                    {"id": "12", "month": "December"}
                ]
            }
        });

        var comboEnding_month = new Ext.form.ComboBox({
            id: 'comboEnding_month',
            store: storeEnding_month,
            valueField: 'id',
            displayField: 'month',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererEnding_month(id) {
            var index = storeEnding_month.findExact('id', id);
            if (index > -1) {
                var record = storeEnding_month.getAt(index);
                return record.get('month');
            }
        }

        //fin combo Ending_month

        //inicio combo COSTPARENT
        storeCOSTPARENT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'cost'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=costparent'
        });

        var comboCOSTPARENT = new Ext.form.ComboBox({
            id: 'comboCOSTPARENT',
            store: storeCOSTPARENT,
            valueField: 'id',
            displayField: 'cost',
            triggerAction: 'all',
            mode: 'local'
        });

        function costparentAdmMantenimi(id) {
            var index = storeCOSTPARENT.findExact('id', id);
            if (index > -1) {
                var record = storeCOSTPARENT.getAt(index);
                return record.get('cost');
            }
        }

        //fin combo COSTPARENT


        //Definición de url CRUD
        var proxyCostcategory = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudCostcategory.php?operation=insert",
                read: urlMantenimiento + "crudCostcategory.php?operation=select",
                update: urlMantenimiento + "crudCostcategory.php?operation=update",
                destroy: urlMantenimiento + "crudCostcategory.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Costcategory
        var readerCostcategory = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'cost', allowBlank: false},
                {name: 'description', allowBlank: false},
                {name: 'active', allowBlank: true},
                {name: 'parent', allowBlank: true}
            ]
        });

        //Definición de escritura en campos bdd Costcategory
        var writerCostcategory = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Costcategory
        this.storeCostcategory = new Ext.data.Store({
            id: 'storeCostcategory',
            proxy: proxyCostcategory,
            reader: readerCostcategory,
            writer: writerCostcategory,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeCostcategory = this.storeCostcategory;

        storeCostcategory.baseParams = {
            limit: limitemantenimiento
        };

        this.storeCostcategory.load();

        //Inicio formato grid Costcategory
        this.gridCostcategory = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeCostcategory,
            columns: [
                //Definición de campos bdd Costcategory
                new Ext.grid.RowNumberer()
                , {header: 'ID', dataIndex: 'id', sortable: true, hidden: true, width: 10}
                , {header: 'Cost Code', dataIndex: 'cost', sortable: true, width: 40, editor: textField}
                , {
                    header: 'Description',
                    dataIndex: 'description',
                    sortable: true,
                    width: 200,
                    editor: textField
                }
                , {
                    header: 'Parent Cost Code',
                    dataIndex: 'parent',
                    sortable: true,
                    width: 100,
                    editor: comboCOSTPARENT,
                    renderer: costparentAdmMantenimi
                }
                , {
                    header: 'Type Cost'
                    , dataIndex: 'typecost'
                    , editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 50
                    , xtype: 'booleancolumn'
                }
                , {
                    header: 'Active'
                    , dataIndex: 'active'
                    , editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 50
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
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limitemantenimiento,
                store: storeCostcategory,
                displayInfo: true,
                displayMsg: 'Showing: {0} - {1} de {2} - PMA',
                emptyMsg: "No data to be shown"
            })
        });
        //Fin formato grid Costcategory

        //Inicio mantenimiento Payroll
        //Definición de url CRUD
        var proxyPayroll = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudPayroll.php?operation=insert",
                read: urlMantenimiento + "crudPayroll.php?operation=select",
                update: urlMantenimiento + "crudPayroll.php?operation=update",
                destroy: urlMantenimiento + "crudPayroll.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Payroll
        var readerPayroll = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'hr_position', allowBlank: false},
                {name: 'monthly_cost', allowBlank: false}
            ]
        });

        //Definición de escritura en campos bdd Payroll
        var writerPayroll = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Payroll
        this.storePayroll = new Ext.data.Store({
            id: 'storePayroll',
            proxy: proxyPayroll,
            reader: readerPayroll,
            writer: writerPayroll,
            autoSave: true
            //, baseParams: {limit: limitemantenimiento}
        });
        //Carga de datos al levantarse la pantalla

        this.storePayroll.load();

        //Inicio formato grid pestaña Payroll
        this.gridPayroll = new Ext.grid.EditorGridPanel({
            height: winHeight - 124,
            store: this.storePayroll,
            columns: [
                //Definición de campos bdd Payroll
                new Ext.grid.RowNumberer()
                , {header: 'ID', dataIndex: 'id', width: 20}
                , {header: 'HR Description', dataIndex: 'hr_position', sortable: true, width: 250, editor: textField}
                , {
                    header: 'Monthly cost',
                    dataIndex: 'monthly_cost',
                    sortable: true,
                    width: 200,
                    editor: textField
                }
            ],
            viewConfig: {forceFit: false},
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limitemantenimiento,
                store: this.storePayroll,
                displayInfo: true,
                displayMsg: 'Showing: {0} - {1} of {2} - PMA',
                emptyMsg: "No data to be shown"
            })
        });
        //Fin formato grid pestaña Payroll
        //Fin ventana mantenimiento Payroll


        //Definición de url CRUD GL codes
        var proxyGlCodes = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudGlCodes.php?operation=insert",
                read: urlMantenimiento + "crudGlCodes.php?operation=select",
                update: urlMantenimiento + "crudGlCodes.php?operation=update",
                destroy: urlMantenimiento + "crudGlCodes.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Costcategory
        var readerGlCodes = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'commitment_code', allowBlank: false},
                {name: 'commitment_description', allowBlank: false},
                {name: 'cost_type1', allowBlank: false},
                {name: 'type', allowBlank: false},
                {name: 'cost_category', allowBlank: false},
                {name: 'availability_type', allowBlank: false},
                {name: 'gl_account', allowBlank: false},
                {name: 'gl_description', allowBlank: false},
                {name: 'cbp_cost_category', allowBlank: false},

            ]
        });

        //Definición de escritura en campos bdd GlCodes
        var writerGlCodes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo GlCodes
        this.storeGlCodes = new Ext.data.Store({
            id: 'storeGlCodes',
            proxy: proxyGlCodes,
            reader: readerGlCodes,
            writer: writerGlCodes,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeGlCodes = this.storeGlCodes;
        storeGlCodes.baseParams = {
            limit: limitemantenimiento
        };

        this.storeGlCodes.load();

        //Inicio formato grid GlCodes
        this.gridGlCodes = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeGlCodes,
            columns: [
                //Definición de campos bdd Costcategory
                new Ext.grid.RowNumberer()
                , {header: 'ID', dataIndex: 'id', sortable: true, width: 10}
                , {
                    header: 'Commitment Code',
                    dataIndex: 'commitment_code',
                    sortable: true,
                    width: 40,
                    editor: textField
                }
                , {
                    header: 'Commitment Description',
                    dataIndex: 'commitment_description',
                    sortable: true,
                    width: 40,
                    editor: textField
                }
                , {header: 'Cost Type', dataIndex: 'cost_type1', sortable: true, width: 40, editor: textField}
                , {header: 'Type', dataIndex: 'type', sortable: true, width: 40, editor: textField}
                , {header: 'Cost Category', dataIndex: 'cost_category', sortable: true, width: 40, editor: textField}
                , {
                    header: 'Availability Type',
                    dataIndex: 'availability_type',
                    sortable: true,
                    width: 40,
                    editor: textField
                }
                , {header: 'GL Account', dataIndex: 'gl_account', sortable: true, width: 40, editor: textField}
                , {header: 'GL Description', dataIndex: 'gl_description', sortable: true, width: 40, editor: textField}
                , {
                    header: 'CBP Cost Category',
                    dataIndex: 'cbp_cost_category',
                    sortable: true,
                    width: 40,
                    editor: textField
                }
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
                store: storeGlCodes,
                displayInfo: true,
                displayMsg: 'Showing: {0} - {1} of {2} - PMA',
                emptyMsg: "No data to be shown"
            })
        });
        //Fin formato grid GlCodes


        //Definición de url CRUD
        var proxySoCodes = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudSoCodes.php?operation=insert",
                read: urlMantenimiento + "crudSoCodes.php?operation=select",
                update: urlMantenimiento + "crudSoCodes.php?operation=update",
                destroy: urlMantenimiento + "crudSoCodes.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd SoCodes
        var readerSoCodes = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'category_name', allowBlank: true},
                {name: 'category_code', allowBlank: true},
                // {name: 'activo', allowBlank: true},
                // {name: 'orden', allowBlank: true},
                // {name: 'base_legal', allowBlank: true}
            ]
        });

        //Definición de escritura en campos bdd SoCodes
        var writerSoCodes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo SoCodes
        this.storeSoCodes = new Ext.data.Store({
            id: 'storeSoCodes',
            proxy: proxySoCodes,
            reader: readerSoCodes,
            writer: writerSoCodes,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeSoCodes = this.storeSoCodes;
        storeSoCodes.baseParams = {
            limit: limitemantenimiento
        };

        this.storeSoCodes.load();

        //Inicio formato grid SoCodes
        this.gridSoCodes = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeSoCodes,
            columns: [
                //Definición de campos bdd SoCodes
                new Ext.grid.RowNumberer(),
                {header: 'SO Description', dataIndex: 'category_name', sortable: true, width: 200, editor: textField},
                {
                    header: 'SO Code',
                    dataIndex: 'category_code',
                    sortable: true,
                    width: 200,
                    editor: textField
                },
                // {
                //     header: 'Activo'
                //     , dataIndex: 'activo'
                //     , editor: {
                //         xtype: 'checkbox'
                //     }
                //     , falseText: 'No'
                //     , menuDisabled: true
                //     , trueText: 'Si'
                //     , sortable: true
                //     , width: 50
                //     , xtype: 'booleancolumn'
                // },
                //
                // {header: 'Orden', dataIndex: 'orden', sortable: true, width: 100, editor: textField},
                // {header: 'Base Legal', dataIndex: 'base_legal', sortable: true, width: 200, editor: textField}
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
                store: storeSoCodes,
                displayInfo: true,
                displayMsg: 'Showing SO Codes: {0} - {1} of {2} - PMA',
                emptyMsg: "No contributions to be shown"
            })
        });
        //Fin formato grid SoCodes
        //Fin ventana mantenimiento ordenanzas

        //Inicio ventana mantenimiento ActivityCodes
        //Definición de url CRUD
        var proxyActivityCodes = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudActivityCodes.php?operation=insert",
                read: urlMantenimiento + "crudActivityCodes.php?operation=select",
                update: urlMantenimiento + "crudActivityCodes.php?operation=update",
                destroy: urlMantenimiento + "crudActivityCodes.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd ActivityCodes
        var readerActivityCodes = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'subcategory_name', allowBlank: false},
                {name: 'subcategory_code', allowBlank: false},
                // {name: 'orden', allowBlank: true},
                // {name: 'id_zonal', allowBlank: false},
                // {name: 'activo', type: 'boolean', allowBlank: true},
                // {name: 'secretaria', type: 'boolean', allowBlank: true},
                // {name: 'prefijo', allowBlank: true},
                // {name: 'orden', allowBlank: true,type: 'integer'}
            ]
        });

        //Definición de escritura de campos bdd ActivityCodes
        var writerActivityCodes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña ActivityCodes
        this.storeActivityCodes = new Ext.data.Store({
            id: 'storeActivityCodes',
            proxy: proxyActivityCodes,
            reader: readerActivityCodes,
            writer: writerActivityCodes,
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            autoSave: true
            //baseParams: {}
        });
        storeActivityCodes = this.storeActivityCodes;
        storeActivityCodes.baseParams = {
            limit: limitemantenimiento
        };

        this.storeActivityCodes.load();


        //Inicio formato grid pestaña ActivityCodes
        this.gridActivityCodes = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeActivityCodes,
            columns: [
                //Definición de campos bdd ActivityCodes
                new Ext.grid.RowNumberer(),
                {
                    header: 'Activity description',
                    dataIndex: 'subcategory_name',
                    sortable: true,
                    width: 200,
                    editor: textField
                },
                {
                    header: 'Activity code',
                    dataIndex: 'subcategory_code',
                    sortable: true,
                    width: 200,
                    editor: textField
                },
                //
                // {
                //     header: 'Activo',
                //     dataIndex: 'activo',
                //     sortable: true,
                //     width: 45,
                //     align: 'center',
                //     editor: {
                //         xtype: 'checkbox'
                //     }
                //     , falseText: 'No'
                //     , menuDisabled: true
                //     , trueText: 'Si'
                //     , xtype: 'booleancolumn'
                // },
                // {
                //     header: 'Es secretaría',
                //     dataIndex: 'secretaria',
                //     sortable: true,
                //     width: 45,
                //     align: 'center',
                //     editor: {
                //         xtype: 'checkbox'
                //     }
                //     , falseText: 'No'
                //     , menuDisabled: true
                //     , trueText: 'Si'
                //     , xtype: 'booleancolumn'
                // } ,
                //
                // {header: 'Zonal', dataIndex: 'id_zonal', sortable: true, width: 100, editor: comboCOSTPARENT, renderer: zonaAdmMantenimi },
                // {header: 'Prefijo', dataIndex: 'prefijo', sortable: true, width: 100, editor: textField },
                // {header: 'Orden', dataIndex: 'orden', sortable: true, width: 100, editor: textField}
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
                store: storeActivityCodes,
                displayInfo: true,
                displayMsg: 'Showing activity codes: {0} - {1} of {2} - PMA',
                emptyMsg: "No contributions to be shown"
            })
        });
        //Fin formato grid pestaña ActivityCodes
        //Fin ventana mantenimiento ActivityCodes


        //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla

            //this.seleccionDepar = 3;
            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeSoCodes;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeSoCodes;
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
                            key: 'busqueda_todos',
                            scope: this,
                            text: 'Todos'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'numero_tramite',
                            scope: this,
                            text: 'Número trámite'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'ruc_licencia',
                            scope: this,
                            text: 'RUC/licencia'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'codigo',
                            scope: this,
                            text: 'Código'
                        }

                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'patente',
                            scope: this,
                            text: 'Patente'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'predio',
                            scope: this,
                            text: 'Predio'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'razon_social',
                            scope: this,
                            text: 'Razón social'
                        }
                    ]
                })
                , text: 'Todos'
            });

            //Creación de la ventana win
            win = desktop.createWindow({
                id: 'grid-win-mantenimiento',
                //Definición del título de la ventana
                title: 'MANAGEMENT MODULE',
                //Definición de tamaños de la ventana
                width: winWidth,
                height: winHeight,
                iconCls: 'mantenimiento-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                //Creación de panel de pestañas
                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        //Pestaña SoCodes
                        {
                            autoScroll: true,
                            title: 'SO Codes',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'New',
                                    scope: this,
                                    handler: this.addSoCodes,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    //Definición de botón Delete
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deleteSoCodes,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataSoCodes,
                                    scope: this,
                                    text: 'Reload data'
                                }
                            ]
                            //Llamado a función que arma la tabla de datos
                            , items: this.gridSoCodes
                        }
                        //Pestaña unidades
                        , {
                            autoScroll: true,
                            title: 'Activity Codes',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'New',
                                    scope: this,
                                    handler: this.addActivityCodes,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón Delete
                                {
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deleteActivityCodes,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataActivityCodes,
                                    scope: this,
                                    text: 'Reload data'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridActivityCodes
                        },

                        //Pestaña Costcategory
                        {
                            autoScroll: true,
                            title: 'Cost Category',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 65,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'New',
                                    scope: this,
                                    handler: this.addCostcategory,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    //Definición de botón Delete
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deleteCostcategory,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataCostcategory,
                                    scope: this,
                                    text: 'Reload data'
                                }
                            ]
                            //Llamado a función que arma la tabla de datos
                            , items: this.gridCostcategory
                        },

                        //Pestaña Payroll
                        {
                            autoScroll: true,
                            title: 'Payroll HR Position',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 65,

                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'New',
                                    scope: this,
                                    handler: this.addPayroll,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deletePayroll,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataPayroll,
                                    scope: this,
                                    text: 'Reload data'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridPayroll
                            // }]
                        },


                        //Pestaña GlCodes
                        {
                            autoScroll: true,
                            title: 'GL Codes',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 65,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'New',
                                    scope: this,
                                    handler: this.addGlCodes,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    //Definición de botón Delete
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deleteGlCodes,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataGlCodes,
                                    scope: this,
                                    text: 'Reload data'
                                }
                            ]
                            //Llamado a función que arma la tabla de datos
                            , items: this.gridGlCodes
                        }


                        //Pestaña Zonas
                        // , {
                        //     autoScroll: true,
                        //     title: 'Zonas',
                        //     closable: true,
                        //     layout: 'fit',
                        //     height: winHeight - 70,
                        //     //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                        //     //Barra de botones
                        //     tbar: [
                        //         //Definición de botón nuevo
                        //         {
                        //             text: 'Nuevo',
                        //             scope: this,
                        //             handler: this.addZonas,
                        //             iconCls: 'save-icon'
                        //         },
                        //         '-',
                        //         //Definición de botón Delete
                        //         {
                        //             text: "Delete",
                        //             scope: this,
                        //             handler: this.deleteZonas,
                        //             iconCls: 'delete-icon'
                        //         },
                        //         '-',
                        //         //Definición de botón regargar datos
                        //         {
                        //             iconCls: 'reload-icon',
                        //             handler: this.requestGridDataZonas,
                        //             scope: this,
                        //             text: 'Reload data'
                        //         }
                        //     ],
                        //     //Llamado a función que arma la tabla de datos
                        //     items: this.gridZonas
                        // }
                        // //Pestaña SoCodes
                        // , {
                        //     autoScroll: true,
                        //     title: 'Procedimientos',
                        //     closable: true,
                        //     //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                        //     layout: 'fit',
                        //     height: winHeight - 70,
                        //     //Barra de botones
                        //     tbar: [
                        //         //Definición de botón nuevo
                        //         {
                        //             text: 'Nuevo',
                        //             scope: this,
                        //             handler: this.addProcedimientos,
                        //             iconCls: 'save-icon'
                        //         },
                        //         '-',
                        //         //Definición de botón Delete
                        //         {
                        //             text: "Delete",
                        //             scope: this,
                        //             handler: this.deleteProcedimientos,
                        //             iconCls: 'delete-icon'
                        //         },
                        //         '-',
                        //         //Definición de botón regargar datos
                        //         {
                        //             iconCls: 'reload-icon',
                        //             handler: this.requestGridDataProcedimientos,
                        //             scope: this,
                        //             text: 'Reload data'
                        //         }
                        //     ],
                        //     //Llamado a función que arma la tabla de datos
                        //     items: this.gridProcedimientos
                        // },
                        // //Pestaña Tipos de operativos
                        // {
                        //     autoScroll: true,
                        //     title: 'Tipos de operativos',
                        //     closable: true,
                        //     layout: 'fit',
                        //     height: winHeight - 70,
                        //     //Barra de botones
                        //     tbar: [
                        //         //Definición de botón nuevo
                        //         {
                        //             text: 'Nuevo',
                        //             scope: this,
                        //             handler: this.addTiposOperativos,
                        //             iconCls: 'save-icon'
                        //         },
                        //         '-',
                        //         //Definición de botón Delete
                        //         {
                        //             text: "Delete",
                        //             scope: this,
                        //             handler: this.deleteTiposOperativos,
                        //             iconCls: 'delete-icon'
                        //         },
                        //         '-',
                        //         //Definición de botón regargar datos
                        //         {
                        //             iconCls: 'reload-icon',
                        //             handler: this.requestGridDataTiposOperativos,
                        //             scope: this,
                        //             text: 'Reload data'
                        //         }
                        //     ],
                        //     //Llamado a función que arma la tabla de datos
                        //     items: this.gridTiposOperativos
                        // },
                        // //Pestaña Entidades
                        // {
                        //     autoScroll: true,
                        //     title: 'Entidades',
                        //     closable: true,
                        //     layout: 'fit',
                        //     height: winHeight - 70,
                        //     //Barra de botones
                        //     tbar: [
                        //         //Definición de botón nuevo
                        //         {
                        //             text: 'Nuevo',
                        //             scope: this,
                        //             handler: this.addEntidades,
                        //             iconCls: 'save-icon'
                        //         },
                        //         '-',
                        //         //Definición de botón Delete
                        //         {
                        //             text: "Delete",
                        //             scope: this,
                        //             handler: this.deleteEntidades,
                        //             iconCls: 'delete-icon'
                        //         },
                        //         '-',
                        //         //Definición de botón regargar datos
                        //         {
                        //             iconCls: 'reload-icon',
                        //             handler: this.requestGridDataEntidades,
                        //             scope: this,
                        //             text: 'Reload data'
                        //         }
                        //     ],
                        //     //Llamado a función que arma la tabla de datos
                        //     items: this.gridEntidades
                        // }
                    ]
                }),
            });
        }
        //Llamado a función que muestra la ventana en pantalla
        // TODO verificar que se carga
        win.show();
        /*setTimeout(function () {
            this.storeSoCodes.load({
                params: {
                    start: 0,
                    limit: limitemantenimiento
                }
            });
        }, 10);*/
    },

    //Función para eliminación de registros de Costcategory
    deleteCostcategory: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Are you sure to delete the selected record?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridCostcategory.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeCostcategory.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Costcategory
    addCostcategory: function () {
        var operativos = new this.storeCostcategory.recordType({
            id: '',
            nombre: '',
            nombre_completo: '',
            activo: '',
            orden: '',
        });
        this.gridCostcategory.stopEditing();
        this.storeCostcategory.insert(0, operativos);
        this.gridCostcategory.startEditing(0, 1);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Costcategory
    requestGridDataCostcategory: function () {
        this.storeCostcategory.load();
    },

    //Función para carga de datos
    requestGridData: function () {
        this.storeCostcategory.load({
            params:
                {
                    start: 0,
                    limit: limitemantenimiento
                }
        });
    },

    //Función para eliminación de registros de Payroll
    deletePayroll: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPayroll.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePayroll.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Payroll
    addPayroll: function () {
        var dataPayroll = new this.storePayroll.recordType({
            id: ' ',
            hr_position: '',
            monthly_cost: 0
        });
        this.gridPayroll.stopEditing();
        this.storePayroll.insert(0, dataPayroll);
        this.gridPayroll.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Payroll
    requestGridDataPayroll: function () {
        this.storePayroll.load();
    },

    //Función para eliminación de registros de DetailPayroll


    //Función para eliminación de registros de GlCodes
    deleteGlCodes: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridGlCodes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeGlCodes.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de GlCodes
    addGlCodes: function () {
        var dataGlCodes = new this.storeGlCodes.recordType({
            id: ' ',
            location: '',
            grade: '',
            index_no: '',
            hr_position: '',
            monthly_cost: 0
        });
        this.gridGlCodes.stopEditing();
        this.storeGlCodes.insert(0, dataGlCodes);
        this.gridGlCodes.startEditing(0, 0);
    },
    //Función para actualizar los datos mostrados en pantalla de la pestaña de GlCodes
    requestGridDataGlCodes: function () {
        this.storeGlCodes.load();
    },

    //Función para eliminación de registros de GlCodes
    deleteSoCodes: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridSoCodes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeSoCodes.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de SoCodes
    addSoCodes: function () {
        var dataSoCodes = new this.storeSoCodes.recordType({
            id: ' ',
            category_name: '',
            category_code: ''

        });
        this.gridSoCodes.stopEditing();
        this.storeSoCodes.insert(0, dataSoCodes);
        this.gridSoCodes.startEditing(0, 0);
    },
    //Función para actualizar los datos mostrados en pantalla de la pestaña de SoCodes
    requestGridDataSoCodes: function () {
        this.storeSoCodes.load();
    },

    //Función para eliminación de registros de GlCodes
    deleteActivityCodes: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmation',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridActivityCodes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeActivityCodes.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de ActivityCodes
    addActivityCodes: function () {
        var dataActivityCodes = new this.storeActivityCodes.recordType({
            id: ' ',
            subcategory_name: '',
            subcategory_code: ''

        });
        this.gridActivityCodes.stopEditing();
        this.storeActivityCodes.insert(0, dataActivityCodes);
        this.gridActivityCodes.startEditing(0, 0);
    },
    //Función para actualizar los datos mostrados en pantalla de la pestaña de ActivityCodes
    requestGridDataActivityCodes: function () {
        this.storeActivityCodes.load();
    }




});
