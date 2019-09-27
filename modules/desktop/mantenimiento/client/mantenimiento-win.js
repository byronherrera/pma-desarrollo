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
                , {header: 'ID', dataIndex: 'id', sortable: true, hidden:true, width: 10}
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
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
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

        //Inicio mantenimiento DetailPayroll
        //Definición de url CRUD
        var proxyDetailPayroll = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudDetailPayroll.php?operation=insert",
                read: urlMantenimiento + "crudDetailPayroll.php?operation=select",
                update: urlMantenimiento + "crudDetailPayroll.php?operation=update",
                destroy: urlMantenimiento + "crudDetailPayroll.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    // en caso que la accion sea update
                    if (action = 'update') {
                      //storeDetailPayroll.load();
                    }
                  }
                }
        });

        //Definición de lectura de campos bdd DetailPayroll
        var readerDetailPayroll = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},

                // {name: 'id', allowBlank: false},
                // {name: 'location', allowBlank: false},
                // {name: 'hr_position', allowBlank: false},
                // {name: 'grade', allowBlank: true},
                // {name: 'index_no', allowBlank: true},
                // {name: 'hr_position', allowBlank: true},
                {name: 'year', allowBlank: false},
                {name: 'number_months', allowBlank: false},
                //{name: 'number_staff', allowBlank: true},
                {name: 'monthly_cost_2019', allowBlank: false},
                // {name: 'monthly_cost_2018', allowBlank: true},
                {name: 'expected_cost_2019', allowBlank: true},
                {name: 'january', allowBlank: true},
                {name: 'february', allowBlank: true},
                {name: 'march', allowBlank: true},
                {name: 'april', allowBlank: true},
                {name: 'may', allowBlank: true},
                {name: 'june', allowBlank: true},
                {name: 'july', allowBlank: true},
                {name: 'august', allowBlank: true},
                {name: 'september', allowBlank: true},
                {name: 'october', allowBlank: true},
                {name: 'november', allowBlank: true},
                {name: 'december', allowBlank: true},
                {name: 'total', allowBlank: true},

                // {name: 'without_increase', allowBlank: false},
                // {name: 'increase_2', allowBlank: true},
                // {name: 'increase_5', allowBlank: true},
                // {name: 'program_validation', allowBlank: true},
                 {name: 'id_pma_payroll', allowBlank: true}
            ],
            totalProperty: 'total',
        });

        //Definición de escritura en campos bdd DetailPayroll
        var writerDetailPayroll = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña DetailPayroll
        this.storeDetailPayroll = new Ext.data.Store({
            id: 'storeDetailPayroll',
            proxy: proxyDetailPayroll,
            reader: readerDetailPayroll,
            writer: writerDetailPayroll,
            autoSave: true
            //, baseParams: {limit: limitemantenimiento}
        });
        //Carga de datos al levantarse la pantalla
        storeDetailPayroll =this.storeDetailPayroll
        //Inicio formato grid pestaña DetailPayroll
        this.gridDetailPayroll = new Ext.grid.EditorGridPanel({
            id: 'gridDetailPayroll',
            height: winHeight - 124,
            store: this.storeDetailPayroll,
            columns: [
                //Definición de campos bdd DetailPayroll
                new Ext.grid.RowNumberer()
                , {header: 'ID', dataIndex: 'id', sortable: true, width: 10, hidden:true, editor: textField}
                // ,{header: 'ID', dataIndex: 'id', sortable: true, width: 10}
                // ,{header: 'Location', dataIndex: 'location', sortable: true, width: 40, editor: textField}
                // ,{header: 'Grade', dataIndex: 'grade', sortable: true, width: 100}
                // ,{header: 'Index_no', dataIndex: 'index_no', sortable: true, width: 100}

                , {header: 'Year', dataIndex: 'year', sortable: true, width: 100, editor: textField}
                , {header: 'Number months', dataIndex: 'number_months', sortable: true, width: 100, editor: textField}
                // , {header: 'Number staff', dataIndex: 'number_staff', sortable: true, width: 100, editor: textField}
                // , {header: 'Monthly cost', dataIndex: 'monthly_cost_2019', sortable: true, width: 100, editor: textField}
                ,{header: 'Monthly cost', dataIndex: 'monthly_cost_2019', sortable: true, width: 100, editor: textField}
                , {header: 'Expected cost', dataIndex: 'expected_cost_2019', sortable: true, width: 100 }
                , {header: 'January', dataIndex: 'january', sortable: true, width: 100, editor: textField}
                , {header: 'February', dataIndex: 'february', sortable: true, width: 100, editor: textField}
                , {header: 'March', dataIndex: 'march', sortable: true, width: 100, editor: textField}
                , {header: 'April', dataIndex: 'april', sortable: true, width: 100, editor: textField}
                , {header: 'May', dataIndex: 'may', sortable: true, width: 100, editor: textField}
                , {header: 'June', dataIndex: 'june', sortable: true, width: 100, editor: textField}
                , {header: 'July', dataIndex: 'july', sortable: true, width: 100, editor: textField}
                , {header: 'August', dataIndex: 'august', sortable: true, width: 100, editor: textField}
                , {header: 'September', dataIndex: 'september', sortable: true, width: 100, editor: textField}
                , {header: 'October', dataIndex: 'october', sortable: true, width: 100, editor: textField}
                , {header: 'November', dataIndex: 'november', sortable: true, width: 100, editor: textField}
                , {header: 'December', dataIndex: 'december', sortable: true, width: 100, editor: textField}
                , {header: 'Total', dataIndex: 'total', sortable: true, width: 100 }

                // , {header: 'Without increase', dataIndex: 'without_increase', sortable: true, width: 100, editor: textField}
                // , {header: 'Increase_2', dataIndex: 'increase_2', sortable: true, width: 100, editor: textField}
                // , {header: 'Increase_5', dataIndex: 'increase_5', sortable: true, width: 100, editor: textField}
                // , {header: 'Program Validation', dataIndex: 'program_validation', sortable: true, width: 100, editor: textField}
                // , {header: 'Program Validation', dataIndex: 'id_pma_payroll', hidden: true}
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limitemantenimiento,
                store: this.storeDetailPayroll,
                displayInfo: true,
                displayMsg: 'Showing: {0} - {1} of {2} - PMA',
                emptyMsg: "No data to be shown"
            })
        });
        //Fin formato grid pestaña DetailPayroll
        //Fin ventana mantenimiento DetailPayroll



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
                {name: 'location', allowBlank: false},
                {name: 'grade', allowBlank: false},
                {name: 'index_no', allowBlank: false},
                {name: 'hr_position', allowBlank: false},
                {name: 'monthly_cost_2018', allowBlank: false}
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
                , {header: 'ID', dataIndex: 'id', sortable: true, hidden:true, width: 10}
                , {header: 'Location', dataIndex: 'location', sortable: true, width: 40, editor: textField}
                , {header: 'Grade', dataIndex: 'grade', sortable: true, width: 70, editor: textField}
                , {header: 'Index-no', dataIndex: 'index_no', sortable: true, width: 60, editor: textField}
                , {header: 'HR Description', dataIndex: 'hr_position', sortable: true, width: 150, editor: textField}
                , {
                    header: 'Monthly cost',
                    dataIndex: 'monthly_cost_2018',
                    sortable: true,
                    width: 100,
                    editor: textField
                }
            ],
            viewConfig: {forceFit: false},
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de ese payroll
                        selectedPayroll = rec.id;
                        storeDetailPayroll.baseParams.id = selectedPayroll;
                        storeDetailPayroll.load();
                    }
                }
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
        var proxyOrdenanzas = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudOrdenanzas.php?operation=insert",
                read: urlMantenimiento + "crudOrdenanzas.php?operation=select",
                update: urlMantenimiento + "crudOrdenanzas.php?operation=update",
                destroy: urlMantenimiento + "crudOrdenanzas.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Ordenanzas
        var readerOrdenanzas = new Ext.data.JsonReader({
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

        //Definición de escritura en campos bdd Ordenanzas
        var writerOrdenanzas = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Ordenanzas
        this.storeOrdenanzas = new Ext.data.Store({
            id: 'storeOrdenanzas',
            proxy: proxyOrdenanzas,
            reader: readerOrdenanzas,
            writer: writerOrdenanzas,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeOrdenanzas = this.storeOrdenanzas;
        storeOrdenanzas.baseParams = {
            limit: limitemantenimiento
        };

        this.storeOrdenanzas.load();

        //Inicio formato grid Ordenanzas
        this.gridOrdenanzas = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeOrdenanzas,
            columns: [
                //Definición de campos bdd Ordenanzas
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
                store: storeOrdenanzas,
                displayInfo: true,
                displayMsg: 'Showing SO Codes: {0} - {1} of {2} - PMA',
                emptyMsg: "No contributions to be shown"
            })
        });
        //Fin formato grid Ordenanzas
        //Fin ventana mantenimiento ordenanzas

        //Inicio ventana mantenimiento Unidades
        //Definición de url CRUD
        var proxyUnidades = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudUnidades.php?operation=insert",
                read: urlMantenimiento + "crudUnidades.php?operation=select",
                update: urlMantenimiento + "crudUnidades.php?operation=update",
                destroy: urlMantenimiento + "crudUnidades.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Unidades
        var readerUnidades = new Ext.data.JsonReader({
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

        //Definición de escritura de campos bdd Unidades
        var writerUnidades = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Unidades
        this.storeUnidades = new Ext.data.Store({
            id: 'storeUnidades',
            proxy: proxyUnidades,
            reader: readerUnidades,
            writer: writerUnidades,
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            autoSave: true
            //baseParams: {}
        });
        storeUnidades = this.storeUnidades;
        storeUnidades.baseParams = {
            limit: limitemantenimiento
        };

        this.storeUnidades.load();


        //Inicio formato grid pestaña Unidades
        this.gridUnidades = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeUnidades,
            columns: [
                //Definición de campos bdd Unidades
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
                store: storeUnidades,
                displayInfo: true,
                displayMsg: 'Showing activity codes: {0} - {1} of {2} - PMA',
                emptyMsg: "No contributions to be shown"
            })
        });
        //Fin formato grid pestaña Unidades
        //Fin ventana mantenimiento Unidades


        //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla

            //this.seleccionDepar = 3;
            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeOrdenanzas;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeOrdenanzas;
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
                        //Pestaña Ordenanzas
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
                                    handler: this.addOrdenanzas,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    //Definición de botón Delete
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deleteOrdenanzas,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataOrdenanzas,
                                    scope: this,
                                    text: 'Reload data'
                                }
                            ]
                            //Llamado a función que arma la tabla de datos
                            , items: this.gridOrdenanzas
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
                                    handler: this.addUnidades,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón Delete
                                {
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deleteUnidades,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataUnidades,
                                    scope: this,
                                    text: 'Reload data'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridUnidades
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
                            title: 'Payroll',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 65
                            //Llamado a función que arma la tabla de datos
                            , items: [
                                {
                                    layout: 'border',
                                    // height: winHeight,
                                    items: [{
                                        region: 'west',
                                        id: 'west-panel',
                                        title: 'Payroll List',
                                        split: true,
                                        width: winWidth * 0.3 - 100,
                                        // minSize: 175,
                                        // maxSize: 400,
                                        // collapsible: true,
                                        // layoutConfig: {
                                        //     animate: true
                                        // },
                                        items: [{
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
                                        }]
                                    }, {
                                        title: 'Payroll detail',
                                        region: 'center',
                                        items: [
                                            {
                                                tbar: [
                                                    //Definición de botón nuevo
                                                    {
                                                        text: 'New',
                                                        scope: this,
                                                        handler: this.addDetailPayroll,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        text: "Delete",
                                                        scope: this,
                                                        handler: this.deleteDetailPayroll,
                                                        iconCls: 'delete-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón regargar datos
                                                    {
                                                        iconCls: 'reload-icon',
                                                        handler: this.requestGridDataDetailPayroll,
                                                        scope: this,
                                                        text: 'Reload data'
                                                    }
                                                ],
                                                //Llamado a función que arma la tabla de datos
                                                items: this.gridDetailPayroll
                                            }]


                                    }]
                                }
                            ]
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
                        // //Pestaña Ordenanzas
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
            this.storeOrdenanzas.load({
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
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
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
            title: 'Confirmación',
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
            location: '',
            grade: '',
            index_no: '',
            hr_position: '',
            monthly_cost_2018: 0
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
    deleteDetailPayroll: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDetailPayroll.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDetailPayroll.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de DetailPayroll
    addDetailPayroll: function () {
        var dataDetailPayroll = new this.storeDetailPayroll.recordType({
            id: ' ',
            number_months: '',
         //   number_staff : '',
            monthly_cost_2019 : '',
            expected_cost_2019 : '',
            without_increase : '',
            increase_2 : '',
            increase_5 : '',
            program_validation: '',
            id_pma_payroll : selectedPayroll,
            total : 0
        });
        this.gridDetailPayroll.stopEditing();
        this.storeDetailPayroll.insert(0, dataDetailPayroll);
        this.gridDetailPayroll.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de DetailPayroll
    requestGridDataDetailPayroll: function () {
        this.storeDetailPayroll.load();
    },

    //Función para eliminación de registros de GlCodes
    deleteGlCodes: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
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
            monthly_cost_2018: 0
        });
        this.gridGlCodes.stopEditing();
        this.storeGlCodes.insert(0, dataGlCodes);
        this.gridGlCodes.startEditing(0, 0);
    },
    //Función para actualizar los datos mostrados en pantalla de la pestaña de GlCodes
    requestGridDataGlCodes: function () {
        this.storeGlCodes.load();
    },
});
