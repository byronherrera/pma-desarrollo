QoDesk.PersonalmapaWindow = Ext.extend(Ext.app.Module, {
    id: 'personalmapa',
    type: 'desktop/personalmapa',

    init: function () {
        this.launcher = {
            text: 'Recepción documentos',
            iconCls: 'personalmapa-icon',
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
        var win = desktop.getWindow('grid-win-personalmapa');

        var urlPersonalmapa = "modules/desktop/personalmapa/server/";

        var textField = new Ext.form.TextField({allowBlank: false});
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        // inicio ventana personalmapa
        var proxyPersonalmapa = new Ext.data.HttpProxy({
            api: {
                create: urlPersonalmapa + "crudPersonalmapa.php?operation=insert",
                read: urlPersonalmapa + "crudPersonalmapa.php?operation=select",
                update: urlPersonalmapa + "crudPersonalmapa.php?operation=update",
                destroy: urlPersonalmapa + "crudPersonalmapa.php?operation=delete"
            }
        });

        var readerPersonalmapa = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'numero_tramite', allowBlank: true},
                {name: 'ruc_licencia', allowBlank: true},
                {name: 'razon_social', allowBlank: true},
                {name: 'codigo', allowBlank: true},
                {name: 'descripcion_actividad_economica', allowBlank: true},
                {name: 'patente', allowBlank: true},
                {name: 'predio', allowBlank: true},
                {name: 'categoria', allowBlank: true},
                {name: 'secretaria_otorgante', allowBlank: true},
                {name: 'parroquia', allowBlank: true},
                {name: 'calle', allowBlank: true},
                {name: 'calle2', allowBlank: true},
                {name: 'numero', allowBlank: true},
                {name: 'telefono1', allowBlank: true},
                {name: 'telefono2', allowBlank: true},
                {name: 'mail', allowBlank: true},
                {name: 'estado', allowBlank: true},
                {name: 'zonal', allowBlank: true},
            ]
        });
        var writerPersonalmapa = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storePersonalmapa = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonalmapa,
            reader: readerPersonalmapa,
            writer: writerPersonalmapa,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {}
        });
        storePersonalmapa = this.storePersonalmapa;
        limitepersonalmapa = 100;

        storePersonalmapa.baseParams = {
            limit: limitepersonalmapa
        };

        this.gridPersonalmapa = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storePersonalmapa,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Número trámite', dataIndex: 'numero_tramite', sortable: true,width: 125},
                {header: 'RUC/Licencia', dataIndex: 'ruc_licencia', sortable: true,width: 100},
                {header: 'Razón social', dataIndex: 'razon_social', sortable: true,width: 240},
                {header: 'Código', dataIndex: 'codigo', sortable: true,width: 80},
                {header: 'Descripción actividad económica', flex:1, dataIndex: 'descripcion_actividad_economica', sortable: true,width: 300},
                {header: 'Patente', dataIndex: 'patente', sortable: true,width: 70},
                {header: 'Predio', dataIndex: 'predio', sortable: true,width: 70},
                {header: 'Parroquia', dataIndex: 'parroquia', sortable: true,width: 200},
                {header: 'Calle', dataIndex: 'calle', sortable: true,width: 120},
                {header: 'Calle2', dataIndex: 'calle2', sortable: true,width: 120},
                {header: 'Número', dataIndex: 'numero', sortable: true,width: 80},
                {header: 'Teléfono 1', dataIndex: 'telefono1', sortable: true,width:90},
                {header: 'Teléfono 2', dataIndex: 'telefono2', sortable: true,width:90},
                {header: 'Mail', dataIndex: 'mail', sortable: true,width: 100},
                {header: 'Estado', dataIndex: 'estado', sortable: true,width: 90},
                {header: 'Categoria', dataIndex: 'categoria', sortable: true,width: 80},
                {header: 'Secretaria Otorgante', dataIndex: 'secretaria_otorgante', sortable: true,width: 60},
                {header: 'Zonal', dataIndex: 'zonal', sortable: true,width: 100}
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitepersonalmapa,
                store: storePersonalmapa,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });

        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            this.seleccionDepar = 3;

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storePersonalmapa;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storePersonalmapa;
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

            win = desktop.createWindow({
                id: 'grid-win-personalmapa',
                title: 'Mapa Personal',
                width: winWidth,
                height: winHeight,
                iconCls: 'personalmapa-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                tbar: [
                     { text: 'Mapa: <a:', xtype: 'tbtext'}
                ],
                layout: 'fit',
                items: {
                    // lazily created panel (xtype:'panel' is default)

                    region: 'center',
                    autoEl: {
                        id: 'iframemap',
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%; border: none',
//                        src: 'http://agenciadecontrol.quito.gob.ec/mapaPersonal.html'
                        src: 'https://www.google.com/maps/d/u/0/embed?mid=13va7Wgcg4SjIfTX6DkOgi04BDWaZnRSr'
                        //src: 'https://www.openstreetmap.org/#map=12/-0.1578/-78.4815'
                        //src: 'http://agenciadecontrol.quito.gob.ec/mapaPersonal.html'
                    },
                    id: 'data_export_iframe'
              }
            });
        }
        win.show();
        setTimeout(function () {
            this.storePersonalmapa.load({
                params: {
                    start: 0,
                    limit: limitepersonalmapa
                }
            });
        }, 10);
    },

    requestGridData: function () {
        this.storePersonalmapa.load({params:
            {
                start: 0,
                limit: limitepersonalmapa
            }
        });
    },

});