QoDesk.PayrollWindow = Ext.extend(Ext.app.Module, {
    id: 'payroll',
    type: 'desktop/payroll',

    init: function () {
        this.launcher = {
            text: 'Payroll',
            iconCls: 'payroll-icon',
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

        var win = desktop.getWindow('grid-win-payroll');
        var urlPayroll = "modules/desktop/payroll/server/";

        limitePayroll = 100;

        var intervalo1 = 30;
        var intervalo2 = 90;

        //incio variables visualizacion
        var textField = new Ext.form.TextField({allowBlank: false, readOnly: false});
        var textField10 = new Ext.form.TextField({allowBlank: false, readOnly: false, maxLength: 10});

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

        // inicio combos payroll



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
                    fields: ['id', 'commitment_description', 'glcode', 'gl_description'],
                    autoLoad: true,
                    url: 'modules/common/combos/combos.php?tipo=glcode'
                });

                var comboGLCode = new Ext.form.ComboBox({
                    id: 'comboGLCode',
                    store: storeGLCode,
                    valueField: 'id',
                    displayField: 'commitment_description',
                    triggerAction: 'all',
                    mode: 'local'
                });

                function glcode(id) {
                    var index = storeGLCode.findExact('id', id);
                    if (index > -1) {
                        var record = storeGLCode.getAt(index);
                        return record.get('commitment_description');
                    }
                }

                function glcode1(id) {
                    var index = storeGLCode.findExact('id', id);
                    if (index > -1) {
                        var record = storeGLCode.getAt(index);
                        return record.get('glcode');
                    }
                }

                function glcode2(id) {
                    var index = storeGLCode.findExact('id', id);
                    if (index > -1) {
                        var record = storeGLCode.getAt(index);
                        return record.get('gl_description');
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

        // inicio ventana contribuciones


                //Inicio mantenimiento DetailPayroll
                //Definición de url CRUD
                var proxyDetailPayroll = new Ext.data.HttpProxy({
                    api: {
                        create: urlPayroll + "crudDetailPayroll.php?operation=insert",
                        read: urlPayroll + "crudDetailPayroll.php?operation=select",
                        update: urlPayroll + "crudDetailPayroll.php?operation=update",
                        destroy: urlPayroll + "crudDetailPayroll.php?operation=delete"
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
                        {name: 'starting_month', allowBlank: false},
                        {name: 'end_month', allowBlank: false},
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
                    autoSave: true,
                    baseParams: {
                        limit: limitePayroll,
                        columna : ''
                    }
                });
                //Carga de datos al levantarse la pantalla
                storeDetailPayroll = this.storeDetailPayroll
                //Inicio formato grid pestaña DetailPayroll
                this.gridDetailPayroll = new Ext.grid.EditorGridPanel({
                    id: 'gridDetailPayroll',
                    height: winHeight - 124,
                    store: this.storeDetailPayroll,
                    listeners: {
                        beforeedit: function(o) {
                            // se indica que columna se esta editanto
                            storeDetailPayroll.baseParams.columna = o['field'];
                        }
                    },
                    columns: [
                        //Definición de campos bdd DetailPayroll
                        new Ext.grid.RowNumberer()
                        , {header: 'ID', dataIndex: 'id', sortable: true, width: 10, hidden: true, editor: textField}
                        // ,{header: 'ID', dataIndex: 'id', sortable: true, width: 10}
                        // ,{header: 'Location', dataIndex: 'location', sortable: true, width: 40, editor: textField}
                        // ,{header: 'Grade', dataIndex: 'grade', sortable: true, width: 100}
                        // ,{header: 'Index_no', dataIndex: 'index_no', sortable: true, width: 100}

                        , {header: 'Year', dataIndex: 'year', sortable: true, width: 100, editor: textField}
                        , {
                            header: 'Starting month',
                            dataIndex: 'starting_month',
                            sortable: true,
                            width: 100,
                            editor: comboStarting_month,
                            renderer: rendererStarting_month
                        }
                        , {
                            header: 'Ending month',
                            dataIndex: 'end_month',
                            sortable: true,
                            width: 100,
                            editor: comboEnding_month,
                            renderer: rendererEnding_month
                        }
                        // , {header: 'Number staff', dataIndex: 'number_staff', sortable: true, width: 100, editor: textField}
                        // , {header: 'Monthly cost', dataIndex: 'monthly_cost_2019', sortable: true, width: 100, editor: textField}
                        , {
                            header: 'Monthly cost',
                            dataIndex: 'monthly_cost_2019',
                            sortable: true,
                            width: 100,
                            editor: textField
                        }
                        , {header: 'Expected cost', dataIndex: 'expected_cost_2019', sortable: true, width: 100}
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
                        , {header: 'Total', dataIndex: 'total', sortable: true, width: 100}

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
                        pageSize: limitePayroll,
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
                        create: urlPayroll + "crudPayroll.php?operation=insert",
                        read: urlPayroll + "crudPayroll.php?operation=select",
                        update: urlPayroll + "crudPayroll.php?operation=update",
                        destroy: urlPayroll + "crudPayroll.php?operation=delete"
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
                    //, baseParams: {limit: limitePayroll}
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
                        , {header: 'ID', dataIndex: 'id', sortable: true, hidden: true, width: 10}
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
                        pageSize: limitePayroll,
                        store: this.storePayroll,
                        displayInfo: true,
                        displayMsg: 'Showing: {0} - {1} of {2} - PMA',
                        emptyMsg: "No data to be shown"
                    })
                });
                //Fin formato grid pestaña Payroll
                //Fin ventana mantenimiento Payroll


        var proxyContribuciones = new Ext.data.HttpProxy({
            api: {
                create: urlPayroll + "crudPayrollCosts.php?operation=insert",
                read: urlPayroll + "crudPayrollCosts.php?operation=select",
                update: urlPayroll + "crudPayrollCosts.php?operation=update",
                destroy: urlPayroll + "crudPayrollCosts.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                  // storeContribucionesr.load();
                  if (action = 'update') {
                      storeContribuciones.load();
                    }
                  if (action = 'insert') {
                      storeContribuciones.load();
                    }
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
              {name: 'id', allowBlank: true},
              {name: 'id_pma_costos_micro', allowBlank: true},
              {name: 'cost_code2', allowBlank: true},
              {name: 'cost_code3', allowBlank: true},
              {name: 'glcode', allowBlank: true},
              //{name: 'commitment_description', allowBlank: true},
              //{name: 'gl_description', allowBlank: true},
              {name: 'cost_code4', allowBlank: true},
              {name: 'cost_code5', allowBlank: true},
              {name: 'description_micro', allowBlank: true},
              {name: 'total_micro', allowBlank: true},
              {name: 'adjust', allowBlank: true},
              {name: 'total_after_adjust', allowBlank: true}
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
            baseParams: {}
        });
        storeContribuciones = this.storeContribuciones;
        // limitePayroll = 100;

        this.storeContribuciones.baseParams = {
            limit: limitePayroll
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
                  header: 'id_pma_costos_micro',
                  dataIndex: 'id_pma_costos_micro',
                  sortable: false,
                  width: 15,
                  hidden: true,
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
                    header: 'id_pma_costos_micro',
                    dataIndex: 'id_pma_costos_micro',
                    sortable: false,
                    width: 15,
                    hidden: true
                },
                {
                    header: 'Cost Code nivel 2',
                    dataIndex: 'cost_code2',
                    sortable: true,
                    width: 100,
                    // editor: comboCostCode2,
                    renderer: costCode2
                },
                {
                    header: 'Cost Code nivel 3',
                    dataIndex: 'cost_code3',
                    sortable: true,
                    width: 150,
                    // editor: comboCostCode3,
                    renderer: costCode3
                },
                {
                    header: 'GL description',
                    dataIndex: 'glcode',
                    sortable: true,
                    width: 100,
                    hidden: false,
                    // editor: comboGLCode,
                    renderer: glcode
                },
                {
                    header: 'GL code',
                    dataIndex: 'glcode',
                    sortable: true,
                    width: 100,
                    hidden: false,
                    // editor: comboGLCode,
                    renderer: glcode1
                },
                {
                    header: 'Commitment description',
                    dataIndex: 'glcode',
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
                    // editor: comboCostCode4,
                    renderer: costCode4
                },
                {
                    header: 'Cost Code nivel 5',
                    dataIndex: 'cost_code5',
                    sortable: true,
                    width: 150,
                    // editor: comboCostCode5,
                    renderer: costCode5
                },
                {
                    header: 'Descripción',
                    dataIndex: 'description_micro',
                    sortable: true,
                    width: 200,
                    // editor: textField
                },
                {
                    header: 'Total micro',
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
                    editor: textField
                },
                {
                    header: 'Total after adjustment',
                    dataIndex: 'total_after_adjust',
                    sortable: true,
                    renderer: 'usMoney',
                    width: 150
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
            height: 495,
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
                pageSize: limitePayroll,
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
                id: 'grid-win-payroll',
                title: 'Payroll Management',
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
                      //Pestaña Payroll
                        {
                            autoScroll: true,
                            title: 'Payroll costs',
                            closable: true,
                            height: winHeight - 70,
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

                                //***********Search Section*********

                                // '-',
                                // '->'
                                // , {
                                //     text: 'Search by:'
                                //     , xtype: 'tbtext'
                                // }
                                //
                                // , searchFieldBtn
                                // , ' ', ' '
                                // , new QoDesk.QoAdmin.SearchField({
                                //     paramName: 'filterText'
                                //     , store: this.storeContribuciones
                                // })
                            ],
                            items: this.formContribucionesDetalle
                        },
                        {
                            autoScroll: true,
                            title: 'Planification',
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

                        // , {
                        //     title: 'Reports',
                        //     closable: true,
                        //     layout: 'border',
                        //     //disabled: this.app.isAllowedTo('accesosSecretaria', this.id) ? false : true,
                        //     tbar: [
                        //         {
                        //             iconCls: 'reload-icon',
                        //             handler: this.requestGridDataDocumentoReporte,
                        //             scope: this,
                        //             text: 'Buscar'
                        //         },
                        //         {
                        //             iconCls: 'reload-icon',
                        //             handler: this.requestGridDataDocumentoReporteReset,
                        //             scope: this,
                        //             text: 'Borrar formulario'
                        //
                        //         },
                        //         {
                        //             iconCls: 'excel-icon',
                        //             handler: this.botonExportarDocumentoReporte,
                        //             scope: this,
                        //             text: 'Exportar listado',
                        //             tooltip: 'Se genera archivo Excel con la información solicitada',
                        //             id: 'tb_repoteContribucionesGuias',
                        //         }
                        //     ],
                        //     items: [
                        //         {
                        //             region: 'north',
                        //             height: 'auto',
                        //             minSize: 100,
                        //             maxSize: 150,
                        //             closable: true,
                        //             border: false,
                        //             autoScroll: false,
                        //             items: this.formConsultaDocumentos
                        //         },
                        //         {
                        //             region: 'center',
                        //             split: true,
                        //             autoScroll: true,
                        //             height: 300,
                        //             minSize: 100,
                        //             maxSize: 150,
                        //             items: this.gridDocumentosReporte
                        //         }
                        //     ]
                        //     //this.gridReportes
                        // }
                    ]
                })
            });

        }
        win.show();

        setTimeout(function () {
            this.storeContribuciones.load({
                params: {
                    start: 0,
                    limit: limitePayroll,
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
