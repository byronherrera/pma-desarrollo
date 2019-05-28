QoDesk.MantenimientoWindow = Ext.extend(Ext.app.Module, {
    id: 'mantenimiento',
    type: 'desktop/mantenimiento',

    init: function () {
        this.launcher = {
            text: 'Recepción documentos',
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

        //Ubicación de la carpeta de mantenimiento
        var urlMantenimiento = "modules/desktop/mantenimiento/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        //Definición del formato de fecha
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        //Inicio ventana mantenimiento ordenanzas

        //inicio combo ZONAL
        storeZONALM = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboZONALM = new Ext.form.ComboBox({
            id: 'comboZONALM',
            store: storeZONALM,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function zonaAdmMantenimi(id) {
            var index = storeZONALM.findExact('id', id);
            if (index > -1) {
                var record = storeZONALM.getAt(index);
                return record.get('nombre');
            }
        }
        //fin combo ZONA

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
                {name: 'nombre', allowBlank: true},
                {name: 'nombre_completo', allowBlank: true},
                {name: 'activo', allowBlank: true},
                {name: 'orden', allowBlank: true},
                {name: 'base_legal', allowBlank: true}
            ]
        });

        //Definición de escritura en campos bdd Ordenanzas
        var writerOrdenanzas = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Ordenanzas
        this.storeOrdenanzas = new Ext.data.Store({
            id: "id",
            proxy: proxyOrdenanzas,
            reader: readerOrdenanzas,
            writer: writerOrdenanzas,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeOrdenanzas = this.storeOrdenanzas;
        limitemantenimiento = 100;
        storeOrdenanzas.baseParams = {
            limit: limitemantenimiento
        };

        //Inicio formato grid Ordenanzas
        this.gridOrdenanzas = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeOrdenanzas,
            columns: [
                //Definición de campos bdd Ordenanzas
                new Ext.grid.RowNumberer(),
                {header: 'Nombre', dataIndex: 'nombre', sortable: true, width: 200, editor: textField},
                {
                    header: 'Nombre Completo',
                    dataIndex: 'nombre_completo',
                    sortable: true,
                    width: 200,
                    editor: textField
                },
                {
                    header: 'Activo'
                    , dataIndex: 'activo'
                    , editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 50
                    , xtype: 'booleancolumn'
                },

                {header: 'Orden', dataIndex: 'orden', sortable: true, width: 100, editor: textField},
                {header: 'Base Legal', dataIndex: 'base_legal', sortable: true, width: 200, editor: textField}
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
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
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
                {name: 'nombre', allowBlank: false},
                {name: 'nombre_completo', allowBlank: false},
                {name: 'orden', allowBlank: true},
                {name: 'id_zonal', allowBlank: false},
                {name: 'activo', type: 'boolean', allowBlank: true},
                {name: 'secretaria', type: 'boolean', allowBlank: true},
                {name: 'prefijo', allowBlank: true},
                {name: 'orden', allowBlank: true,type: 'integer'}
            ]
        });

        //Definición de escritura de campos bdd Unidades
        var writerUnidades = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Unidades
        this.storeUnidades = new Ext.data.Store({
            id: "id",
            proxy: proxyUnidades,
            reader: readerUnidades,
            writer: writerUnidades,
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            autoSave: true
            //baseParams: {}
        });
        storeUnidades = this.storeUnidades;
        limitemantenimiento = 20;
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
                {header: 'Nombre', dataIndex: 'nombre', sortable: true, width: 200, editor: textField},
                {
                    header: 'Nombre Completo',
                    dataIndex: 'nombre_completo',
                    sortable: true,
                    width: 200,
                    editor: textField
                },

                {
                    header: 'Activo',
                    dataIndex: 'activo',
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
                    header: 'Es secretaría',
                    dataIndex: 'secretaria',
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
                } ,

                {header: 'Zonal', dataIndex: 'id_zonal', sortable: true, width: 100, editor: comboZONALM, renderer: zonaAdmMantenimi },
                {header: 'Prefijo', dataIndex: 'prefijo', sortable: true, width: 100, editor: textField },
                {header: 'Orden', dataIndex: 'orden', sortable: true, width: 100, editor: textField}
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
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid pestaña Unidades
        //Fin ventana mantenimiento Unidades

        //Inicio mantenimiento Zonas
        //Definición de url CRUD
        var proxyZonas = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudZonas.php?operation=insert",
                read: urlMantenimiento + "crudZonas.php?operation=select",
                update: urlMantenimiento + "crudZonas.php?operation=update",
                destroy: urlMantenimiento + "crudZonas.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Zonas
        var readerZonas = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'nombre', allowBlank: false},
                {name: 'activo', allowBlank: false}
            ]
        });

        //Definición de escritura en campos bdd Zonas
        var writerZonas = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Zonas
        this.storeZonas = new Ext.data.Store({
            id: "id",
            proxy: proxyZonas,
            reader: readerZonas,
            writer: writerZonas,
            autoSave: true
        });
        //Carga de datos al levantarse la pantalla
        this.storeZonas.load();

        //Inicio formato grid pestaña Zonas
        this.gridZonas = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeZonas, columns: [
                //Definición de campos bdd Zonas
                new Ext.grid.RowNumberer(),
                {
                    header: 'ID',
                    dataIndex: 'id',
                    sortable: true,
                    width: 10
                },
                {
                    header: 'Nombre',
                    dataIndex: 'nombre',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Activo'
                    , dataIndex: 'activo'
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
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limitemantenimiento,
                store: storeUnidades,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid pestaña Zonas
        //Fin ventana mantenimiento Zonas

        //Inicio ventana mantenimiento Procedimientos
        //Definición de url CRUD
        var proxyProcedimientos = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudProcedimientos.php?operation=insert",
                read: urlMantenimiento + "crudProcedimientos.php?operation=select",
                update: urlMantenimiento + "crudProcedimientos.php?operation=update",
                destroy: urlMantenimiento + "crudProcedimientos.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Procedimientos
        var readerProcedimientos = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'nombre', allowBlank: false},
                {name: 'observacion', allowBlank: false}
            ]
        });

        //Definición de escritura en campos bdd Procedimientos
        var writerProcedimientos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Procedimientos
        this.storeProcedimientos = new Ext.data.Store({
            id: "id",
            proxy: proxyProcedimientos,
            reader: readerProcedimientos,
            writer: writerProcedimientos,
            autoSave: true
        });
        //Carga de datos al levantarse la pantalla
        this.storeProcedimientos.load();

        //Inicio formato grid pestaña Procedimientos
        this.gridProcedimientos = new Ext.grid.EditorGridPanel({
            height: '100%',
            //Definición de campos bdd Procedimientos
            store: this.storeProcedimientos, columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'ID',
                    dataIndex: 'id',
                    sortable: true,
                    width: 10
                },
                {
                    header: 'Nombre',
                    dataIndex: 'nombre',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Observación',
                    dataIndex: 'observacion',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limitemantenimiento,
                store: storeUnidades,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid pestaña Procedimientos
        //Fin ventana mantenimiento procedimientos

        //Inicio ventana mantenimiento Tipos de operativos
        //Definición de url CRUD
        var proxyTiposOperativos = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudTipoOperativos.php?operation=insert",
                read: urlMantenimiento + "crudTipoOperativos.php?operation=select",
                update: urlMantenimiento + "crudTipoOperativos.php?operation=update",
                destroy: urlMantenimiento + "crudTipoOperativos.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Tipos de operativos
        var readerTiposOperativos = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'nombre', allowBlank: true},
                {name: 'nombre_completo', allowBlank: true},
                {name: 'activo', allowBlank: true},
                {name: 'orden', allowBlank: true}

            ]
        });

        //Definición de escritura en campos bdd Tipos de operativos
        var writerTiposOperativos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Tipos de operativos
        this.storeTiposOperativos = new Ext.data.Store({
            id: "id",
            proxy: proxyTiposOperativos,
            reader: readerTiposOperativos,
            writer: writerTiposOperativos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeTiposOperativos = this.storeTiposOperativos;
        limitemantenimiento = 100;
        storeTiposOperativos.baseParams = {
            limit: limitemantenimiento
        };

        //Carga de datos al levantarse la pantalla
        this.storeTiposOperativos.load();

        //Inicio formato grid pestaña Tipos de operativos
        this.gridTiposOperativos = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeTiposOperativos,
            columns: [
                //Definición de campos bdd Tipos de operativos
                new Ext.grid.RowNumberer(),
                {header: 'Nombre', dataIndex: 'nombre', sortable: true, width: 200, editor: textField},
                {
                    header: 'Nombre Completo',
                    dataIndex: 'nombre_completo',
                    sortable: true,
                    width: 200,
                    editor: textField
                },
                {header: 'Activo', dataIndex: 'activo', sortable: true, width: 100, editor: textField},
                {header: 'Orden', dataIndex: 'orden', sortable: true, width: 100, editor: textField}
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
                store: storeTiposOperativos,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid pestaña Tipos de operativos
        //Fin ventana mantenimiento Tipos de operativos

        //Inicio pestaña mantenimiento Entidades
        //Definición de url CRUD
        var proxyEntidades = new Ext.data.HttpProxy({
            api: {
                create: urlMantenimiento + "crudEntidades.php?operation=insert",
                read: urlMantenimiento + "crudEntidades.php?operation=select",
                update: urlMantenimiento + "crudEntidades.php?operation=update",
                destroy: urlMantenimiento + "crudEntidades.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Entidades
        var readerEntidades = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'nombre', allowBlank: true},
                {name: 'nombre_completo', allowBlank: true},
                {name: 'activo', allowBlank: true},
                {name: 'orden', allowBlank: true}

            ]
        });

        //Definición de escritura en campos bdd Entidades
        var writerEntidades = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Entidades
        this.storeEntidades = new Ext.data.Store({
            id: "id",
            proxy: proxyEntidades,
            reader: readerEntidades,
            writer: writerEntidades,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeEntidades = this.storeEntidades;
        limitemantenimiento = 100;
        storeEntidades.baseParams = {
            limit: limitemantenimiento
        };

        //Carga de datos al levantarse la pantalla
        this.storeEntidades.load();

        //Inicio formato grid pestaña Entidades
        this.gridEntidades = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeEntidades,
            //Definición de campos bdd Entidades
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Nombre', dataIndex: 'nombre', sortable: true, width: 200, editor: textField},
                {
                    header: 'Nombre Completo',
                    dataIndex: 'nombre_completo',
                    sortable: true,
                    width: 200,
                    editor: textField
                },
                {header: 'Activo', dataIndex: 'activo', sortable: true, width: 100, editor: textField},
                {header: 'Orden', dataIndex: 'orden', sortable: true, width: 100, editor: textField}
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
                store: storeEntidades,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid pestaña Entidades
        //Fin ventana mantenimiento Entidades

        //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();
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
                title: 'Consulta Mantenimiento',
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
                            title: 'Ordenanzas',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addOrdenanzas,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    //Definición de botón eliminar
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteOrdenanzas,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataOrdenanzas,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ]
                            //Llamado a función que arma la tabla de datos
                            , items: this.gridOrdenanzas
                        }
                        //Pestaña unidades
                        , {
                            autoScroll: true,
                            title: 'Unidades',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addUnidades,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteUnidades,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataUnidades,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridUnidades
                        }
                        //Pestaña Zonas
                        , {
                            autoScroll: true,
                            title: 'Zonas',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addZonas,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteZonas,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataZonas,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridZonas
                        }
                        //Pestaña Ordenanzas
                        , {
                            autoScroll: true,
                            title: 'Procedimientos',
                            closable: true,
                            //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addProcedimientos,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteProcedimientos,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataProcedimientos,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridProcedimientos
                        },
                        //Pestaña Tipos de operativos
                        {
                            autoScroll: true,
                            title: 'Tipos de operativos',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addTiposOperativos,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteTiposOperativos,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataTiposOperativos,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridTiposOperativos
                        },
                        //Pestaña Entidades
                        {
                            autoScroll: true,
                            title: 'Entidades',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addEntidades,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteEntidades,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataEntidades,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridEntidades
                        }
                    ]
                }),
            });
        }
        //Llamado a función que muestra la ventana en pantalla
        win.show();
        setTimeout(function () {
            this.storeOrdenanzas.load({
                params: {
                    start: 0,
                    limit: limitemantenimiento
                }
            });
        }, 10);
    },

    //Función para eliminación de registros de Ordenanzas
    deleteOrdenanzas: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOrdenanzas.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOrdenanzas.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Ordenanzas
    addOrdenanzas: function () {
        var operativos = new this.storeOrdenanzas.recordType({
            id: '',
            nombre: '',
            nombre_completo: '',
            activo: '',
            orden: '',
        });
        this.gridOrdenanzas.stopEditing();
        this.storeOrdenanzas.insert(0, operativos);
        this.gridOrdenanzas.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Ordenanzas
    requestGridDataOrdenanzas: function () {
        this.storeOrdenanzas.load();
    },

    //Función para carga de datos
    requestGridData: function () {
        this.storeOrdenanzas.load({
            params:
                {
                    start: 0,
                    limit: limitemantenimiento
                }
        });
    },

    //Función para eliminación de datos
    deleteUnidades: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridUnidades.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeUnidades.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Unidades
    addUnidades: function () {
        var ordenanzasUnidades = new this.storeUnidades.recordType({
            id: ' ',
            nombre: '',
            activo: '1',
            secretaria: '0'
        });
        this.gridUnidades.stopEditing();
        this.storeUnidades.insert(0, ordenanzasUnidades);
        this.gridUnidades.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Unidades
    requestGridDataUnidades: function () {
        this.storeUnidades.load();
    },

    //Función para eliminación de registros de Zonas
    deleteZonas: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridZonas.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeZonas.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Zonas
    addZonas: function () {
        var denunciasZonas = new this.storeZonas.recordType({
            id: ' ',
            nombre: '',
            activo: '1'
        });
        this.gridZonas.stopEditing();
        this.storeZonas.insert(0, denunciasZonas);
        this.gridZonas.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Zonas
    requestGridDataZonas: function () {
        this.storeZonas.load();
    },

    //Función para eliminación de registros de Procedimientos
    deleteProcedimientos: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridProcedimientos.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeProcedimientos.remove(rows);
                }
            }
        });
    },
    //Función para inserción de registros de Procedimientos
    addProcedimientos: function () {
        var denunciasProcedimientos = new this.storeProcedimientos.recordType({
            id: ' ',
            nombre: '',
            observacion: ''
        });
        this.gridProcedimientos.stopEditing();
        this.storeProcedimientos.insert(0, denunciasProcedimientos);
        this.gridProcedimientos.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Procedimientos
    requestGridDataProcedimientos: function () {
        this.storeProcedimientos.load();
    },

    //Función para eliminación de registros de Tipos de operativos
    deleteTiposOperativos: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridTiposOperativos.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeTiposOperativos.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Tipos de operativos
    addTiposOperativos: function () {
        var denunciasTiposOperativos = new this.storeTiposOperativos.recordType({
            id: ' ',
            nombre: '',
            nombre_completo: '',
            activo: ''
        });
        this.gridTiposOperativos.stopEditing();
        this.storeTiposOperativos.insert(0, denunciasTiposOperativos);
        this.gridTiposOperativos.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Tipos de operativos
    requestGridDataTiposOperativos: function () {
        this.storeTiposOperativos.load();
    },

    //Función para eliminación de Entidades
    deleteEntidades: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridEntidades.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeEntidades.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Entidades
    addEntidades: function () {
        var denunciasEntidades = new this.storeEntidades.recordType({
            id: ' ',
            nombre: '',
            nombre_completo: '',
            activo: ''
        });
        this.gridEntidades.stopEditing();
        this.storeEntidades.insert(0, denunciasEntidades);
        this.gridEntidades.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Entidades
    requestGridDataEntidades: function () {
        this.storeEntidades.load();
    }
});

