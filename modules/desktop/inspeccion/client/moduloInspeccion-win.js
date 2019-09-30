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
        //Control en caso de tener asignado el perfil de administrador


        var limiteModuloMacro = 100;

        var intervalo1 = 30;
        var intervalo2 = 90;

        if (accesosSecretaria) {
            isChecked = true;
        } else {
            isChecked = false;
        }

        var bloqueo = (accesosCoordinadorInspeccion || accesosSecretaria || accesosInspectores || accesosSupervision) ? true : false

        var desktop = this.app.getDesktop();

        var winHeight = desktop.getWinHeight();
        var winWidth = desktop.getWinWidth();


        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-moduloInspeccion');

        //Ubicación de la carpeta de Inspeccion
        var urlMacro = "modules/desktop/inspeccion/server/";

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

        //inicio combos

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
            return id;
        }
        //fin combo GRANT

        //inicio combo Status
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
        // fin combos

        //// inicio datawindows
        //Inicio Definición de CRUD contribucions
        var proxyModuloContrinbuciones = new Ext.data.HttpProxy({
            api: {
                create: urlMacro + "crudContribuciones.php?operation=insert",
                read: urlMacro + "crudContribuciones.php?operation=select",
                update: urlMacro + "crudContribuciones.php?operation=update",
                destroy: urlMacro + "crudContribuciones.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerModuloContribuciones = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'grant_number', type: 'string', allowBlank: false},
                {name: 'estado', allowBlank: true},
                {name: 'crn', allowBlank: true},
                {name: 'donor', allowBlank: true},
                {name: 'fund', allowBlank: true},
                {name: 'comments', allowBlank: true},
                {name: 'isc', allowBlank: true},
                {name: 'total_grant', allowBlank: false},
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

        //Definición de escritura en campos bdd Inspeccion
        var writerModuloContribuciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Inspeccion
        this.storeModuloInspeccion = new Ext.data.Store({
            id: "storeModuloInspeccion",
            proxy: proxyModuloContrinbuciones,
            reader: readerModuloContribuciones,
            writer: writerModuloContribuciones,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
             baseParams: {
                limit: limiteModuloMacro
            }
        });
        storeModuloInspeccion = this.storeModuloInspeccion;

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
                    width: 38,
                    editor: textField10
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
                    editor: numero,
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

        this.gridModuloContribuciones = new Ext.grid.EditorGridPanel({
            id: 'gridModuloContribuciones',
            colModel: createColModel(),
            loadMask: true,
            plugins: [filters],
            autoExpandColumn: 'id',
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight * 0.35,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth - 16,
            store: this.storeModuloInspeccion,

            viewConfig: {
                //para dar color a la fila
                forceFit: true,
                getRowClass: function (record, index) {
                    // si estado es cerrado retorna amarillo
                    if (record.get('estado') == 'Closed') {
                        return 'goldstate';
                    }

                    // si la fecha esta proxima a su vencimiento 30 dias
                    fecha_actual = new Date();
                    var diff = Math.abs(record.get('grant_tdd') - fecha_actual) / 3600000 / 24;

                    // regresa diff en dias

                    if (diff < intervalo1) {
                        return 'redstate';
                    }
                    // si la fecha esta proxima a su vencimiento 60 dias
                    if (diff < intervalo2) {
                        return 'bluestate';
                    }
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        selectContribuciones = rec.id;
                        storeDetalleContribuciones.baseParams.id = selectContribuciones;
                        storeDetalleContribuciones.load();

                        contribucionSeleccionada = rec.id;
                        inspeccionSeleccionada = rec.id_denuncia;

                        //storeDetalleContribuciones.load({params: {filterText: rec.data.codigo_tramite}});
                        if (creacionDatosInspeccion) {
                            Ext.getCmp('btnNuevoDetalleContribuciones').setDisabled(false);
                            Ext.getCmp('btnEliminarDetalleContribuciones').setDisabled(false);
                            Ext.getCmp('gridDetalleContribuciones').setVisible(true);
                        }
                        // vacio costos macro
                        storeCostoMacro.load({params: {id: 0}});
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloMacro,
                store: this.storeModuloInspeccion,
                displayInfo: true,
                displayMsg: 'Showing contributions: {0} - {1} of {2} - PMA',
                emptyMsg: "No contributions to be shown"
            })
        });
        gridModuloContribuciones = this.gridModuloContribuciones;
        this.gridModuloContribuciones.getBottomToolbar().add([
            '->', {
                text: 'Clear Filter Data',
                handler: function () {
                    gridModuloContribuciones.filters.clearFilters();
                }
            }
        ]);

        //Inicio Definición de CRUD contribucions

        //Inicio Definición de CRUD detalle contribucions
        var proxyDetalleContribuciones = new Ext.data.HttpProxy({
            api: {
                create: urlMacro + "crudDetalleContribuciones.php?operation=insert",
                read: urlMacro + "crudDetalleContribuciones.php?operation=select",
                update: urlMacro + "crudDetalleContribuciones.php?operation=update",
                destroy: urlMacro + "crudDetalleContribuciones.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerDetalleContribuciones = new Ext.data.JsonReader({

            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_pma_contribuciones_detalle', allowBlank: false},
                {name: 'year', allowBlank: false},
                {name: 'so', allowBlank: false},
                {name: 'activity', allowBlank: false},
                {name: 'total_planned', allowBlank: true},
                {name: 'total', allowBlank: true},
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerDetalleContribuciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Inspeccion
        this.storeDetalleContribuciones = new Ext.data.Store({
            id: "storeDetalleContribuciones",
            proxy: proxyDetalleContribuciones,
            reader: readerDetalleContribuciones,
            writer: writerDetalleContribuciones,
            autoSave: true, // dependiendo de si se tiene acceso para grabar
            baseParams: {
                id: contribucionSeleccionada,
                limit: limiteModuloMacro
            }
        });
        storeDetalleContribuciones = this.storeDetalleContribuciones;

        this.gridDetalleContribuciones = new Ext.grid.EditorGridPanel({
            id: 'gridDetalleContribuciones',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes

            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: 'auto',
            height: winHeight - winHeight * .35 - 165,
            readOnly: false,
            store: this.storeDetalleContribuciones,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id_pma_contribuciones_detalle',
                    dataIndex: 'id_pma_contribuciones_detalle',
                    hidden: true,
                    width: 50
                },
                {header: 'Year', dataIndex: 'year', hidden: false, width: 50, editor: textField},
                {
                    header: 'Strategic Objectives',
                    dataIndex: 'so',
                    sortable: true,
                    width: 110,
                    editor: comboSO,
                    renderer: costSO
                },
                {
                    header: 'Activity',
                    dataIndex: 'activity',
                    sortable: true,
                    width: 60,
                    editor: comboActivities,
                    renderer: costActivities
                },
                {
                    header: 'Total planned',
                    dataIndex: 'total_planned',
                    sortable: true,
                    width: 100,
                    renderer: 'usMoney',
                    editor: numero,
                    align: 'right'
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
                            Ext.getCmp('btnNuevoDetalleContribuciones').setDisabled(false);
                            Ext.getCmp('btnEliminarDetalleContribuciones').setDisabled(false);
                            Ext.getCmp('gridCostoMacro').setVisible(true);
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloMacro,
                store: storeDetalleContribuciones,
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
        //Fin  Definición de CRUD detalle contribucions

        //Inicio Definición de CRUD costos macro
        var proxyCostoMacro = new Ext.data.HttpProxy({
            api: {
                create: urlMacro + "crudCostosMacro.php?operation=insert",
                read: urlMacro + "crudCostosMacro.php?operation=select",
                update: urlMacro + "crudCostosMacro.php?operation=update",
                destroy: urlMacro + "crudCostosMacro.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    this.storeDetalleContribuciones.load();
                    this.storeModuloInspeccion.load();
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

        this.storeCostoMacro = new Ext.data.Store({
            id: "storeCostoMacro",
            proxy: proxyCostoMacro,
            reader: readerCostoMacro,
            writer: writerCostoMacro,
            autoSave: true,
            baseParams: {
                limit: limiteModuloMacro,
                //inspeccionSeleccionada
            }
        });
        storeCostoMacro = this.storeCostoMacro;

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
                    editor: textField
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
                    editor: textField, align: 'right'
                },
                {
                    header: 'Adjust',
                    dataIndex: 'adjust',
                    hidden: false,
                    width: 100,
                    renderer: 'usMoney',
                    editor: textField, align: 'right'
                },
                {
                    header: 'Total adjusted',
                    dataIndex: 'total_adjusted',
                    align: 'right',
                    hidden: false,
                    width: 100,
                    renderer: 'usMoney'
                },
                {header: 'Comment', dataIndex: 'comment', hidden: false, width: 150, editor: textField},
                {
                    header: 'Register Date',
                    dataIndex: 'fecha_registro',
                    hidden: false,
                    width: 100,
                    renderer: formatDate,
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
                pageSize: limiteModuloMacro,
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
        //fin Definición de CRUD costos macro
        //// inicio datawindows

        // inicio funciones busqueda
        var checkHandler = function (item, checked) {
            if (checked) {
                var store = this.storeModuloInspeccion;
                store.baseParams.filterField = item.key;
                searchFieldBtn.setText(item.text);
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
                        text: 'All columns'
                    }
                ]
            })
            , text: 'All columns'
        });
        // inicio funciones busqueda

        //Fin formato grid detalle inspeccion

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
                                    disabled: true,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Delete",
                                    scope: this,
                                    handler: this.deleteModuloInspeccion,
                                    disabled: true,
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
                                    items: this.gridModuloContribuciones
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
                                                            id: 'btnNuevoDetalleContribuciones',
                                                            text: 'New',
                                                            scope: this,
                                                            handler: this.addDetalleContribuciones,
                                                            disabled: false,
                                                            iconCls: 'save-icon'
                                                        },
                                                        '-',
                                                        //Definición de botón eliminar
                                                        {
                                                            id: 'btnEliminarDetalleContribuciones',
                                                            text: "Delete",
                                                            scope: this,
                                                            handler: this.deleteDetalleContribuciones,
                                                            //disabled: true,
                                                            iconCls: 'delete-icon'
                                                        },
                                                        '-',
                                                        //Definición de botón Recargar datos
                                                        {
                                                            id: 'btnRecargarDatosDetalleContribuciones',
                                                            iconCls: 'reload-icon',
                                                            handler: this.requestGridDataDetalleContribuciones,
                                                            disabled: false,
                                                            scope: this,
                                                            text: 'Reload data'
                                                        }

                                                    ],
                                                    items: this.gridDetalleContribuciones
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
                    limit: limiteModuloMacro,
                    pendientesAprobar: isChecked
                }
            });
        }, 500);
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
                    var rows = this.gridModuloContribuciones.getSelectionModel().getSelections();
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
            total_contribution: 0,
            total_programmed: 0
        });
        this.gridModuloContribuciones.stopEditing();
        this.storeModuloInspeccion.insert(0, inspeccion);
        this.gridModuloContribuciones.startEditing(0, 1);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloInspeccion
    requestGridDataModuloInspeccion: function () {
        this.storeModuloInspeccion.load();
    },

    //Función para eliminación de registros de Inspeccion
    deleteDetalleContribuciones: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDetalleContribuciones.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDetalleContribuciones.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de inspeccion
    addDetalleContribuciones: function () {
        var inspeccion = new this.storeDetalleContribuciones.recordType({
            year: (new Date().getFullYear()),
            so: '',
            activity: '',
            total_planned: 0,
            //id_cost: '',
            id_pma_contribuciones_detalle: selectContribuciones
        });
        this.gridDetalleContribuciones.stopEditing();
        this.storeDetalleContribuciones.insert(0, inspeccion);
        this.gridDetalleContribuciones.startEditing(0, 1);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridDataDetalleContribuciones: function () {
        console.log(contribucionSeleccionada)
        this.storeDetalleContribuciones.load({
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
                    limit: limiteModuloMacro
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
                    limit: limiteModuloMacro
                }
        });
    },

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

});
