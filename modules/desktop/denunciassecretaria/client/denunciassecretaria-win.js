QoDesk.DenunciassecretariaWindow = Ext.extend(Ext.app.Module, {
    id: 'denunciassecretaria',
    type: 'desktop/denunciassecretaria',

    init: function () {
        this.launcher = {
            text: 'Denuncias - Secretaría General',
            iconCls: 'denunciassecretaria-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win-denunciassecretaria');
        var urlDenunciassecretaria = "modules/desktop/denunciassecretaria/server/";


        //inicio combo persona recepta la denuncia PRDS
        storePRDS = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 1, "nombre": "Araceli"},
                    {"id": 0, "nombre": "Jorge"}
                ]
            }
        });

        var comboPRDS = new Ext.form.ComboBox({
            id: 'comboPRDS',
            store: storePRDS,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personaReceptaDenunciaSec(id) {
            var index = storePRDS.findExact('id', id);
            if (index > -1) {
                var record = storePRDS.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la denuncia PRDS

        //inicio combo tipo documento  TIDS
        storeTIDS = new Ext.data.JsonStore({
            root: 'documento',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                documento: [
                    {"id": 1, "nombre": "Denunciassecretaria"},
                    {"id": 2, "nombre": "Comunicados"}
                ]
            }
        });

        var comboTIDS = new Ext.form.ComboBox({
            id: 'comboTIDS',
            store: storeTIDS,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personaTipoDocumentoSec(id) {
            var index = storeTIDS.findExact('id', id);
            if (index > -1) {
                var record = storeTIDS.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo documento  TIDS

        //inicio combo reasignacion  REAS (reasignacion secretaria)
        storeREAS = new Ext.data.JsonStore({
            root: 'reasignacion',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                reasignacion: [
                    {"id": 0, "nombre": "Secretaría General"},
                    {"id": 1, "nombre": "Supervisión Metropolitana de Control"},
                    {"id": 2, "nombre": "Dirección Metropolitana de Inspección"},
                    {"id": 3, "nombre": "Dirección Metropolitana de  Instrucción"},
                    {"id": 4, "nombre": "Dirección Metropolitana de Resolución y Ejecución"},
                    {"id": 5, "nombre": "Dirección Administrativa y Financiera"},
                    {"id": 6, "nombre": "Unidad de Talentoxº Humano"},
                    {"id": 7, "nombre": "Coordinación de Entidades Colaboradoras"},
                    {"id": 8, "nombre": "Unidad de Talento Humano"},
                    {"id": 9, "nombre": "Comunicación Social"},
                    {"id": 10, "nombre": "Unidad de Planificación"},
                    {"id": 11, "nombre": "Unidad de Informática"}
                ]
            }
        });

        var comboREAS = new Ext.form.ComboBox({
            id: 'comboREAS',
            store: storeREAS,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoReasignacionSec(id) {
            var index = storeREAS.findExact('id', id);
            if (index > -1) {
                var record = storeREAS.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo reasignacion REAS

        //inicio combo caracter del tramite secretaria CDTSS
        storeCDTS = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Normal"},
                    {"id": 2, "nombre": "Urgente"}
                ]
            }
        });

        var comboCDTS = new Ext.form.ComboBox({
            id: 'comboCDTS',
            store: storeCDTS,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function caracterTramiteSec(id) {
            var index = storeCDTS.findExact('id', id);
            if (index > -1) {
                var record = storeCDTS.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite CDTS

        var proxyDenunciassecretaria = new Ext.data.HttpProxy({
            api: {
                create: urlDenunciassecretaria + "crudDenunciassecretaria.php?operation=insert",
                read: urlDenunciassecretaria + "crudDenunciassecretaria.php?operation=select",
                update: urlDenunciassecretaria + "crudDenunciassecretaria.php?operation=update",
                destroy: urlDenunciassecretaria + "crudDenunciassecretaria.php?operation=delete"
            }
        });

        var readerDenunciassecretaria = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_persona', allowBlank: false},
                {name: 'codigo_tramite', allowBlank: false},
                {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_tipo_documento', allowBlank: false},
                {name: 'num_documento', allowBlank: false},
                {name: 'remitente', allowBlank: false},
                {name: 'asunto', allowBlank: false},
                {name: 'reasignacion', allowBlank: false},
                {name: 'descripcion_anexos', allowBlank: false},
                {name: 'id_caracter_tramite', allowBlank: false},
                {name: 'cantidad_fojas', allowBlank: false}
            ]
        });
        var writerDenunciassecretaria = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeDenunciassecretaria = new Ext.data.Store({
            id: "id",
            proxy: proxyDenunciassecretaria,
            reader: readerDenunciassecretaria,
            writer: writerDenunciassecretaria,
            autoSave: true
        });
        this.storeDenunciassecretaria.load();
        storeDenunciassecretaria = this.storeDenunciassecretaria;

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        this.gridDenunciassecretaria = new Ext.grid.EditorGridPanel({
            height: 160,
            store: this.storeDenunciassecretaria, columns: [
                {
                    header: 'id_persona', dataIndex: 'id_persona',
                    sortable: true,
                    width: 30,
                    editor: comboPRDS, renderer: personaReceptaDenunciaSec
                },
                {
                    header: 'codigo_tramite',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 30,
                    editor: textField
                }, {
                    header: 'recepcion_documento',
                    dataIndex: 'recepcion_documento',
                    sortable: true,
                    width: 30,
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
                    width: 30,
                    editor: comboTIDS, renderer: personaTipoDocumentoSec
                },
                {
                    header: 'N. documento',
                    dataIndex: 'num_documento',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Remitente',
                    dataIndex: 'remitente',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Asunto',
                    dataIndex: 'asunto',
                    sortable: true,
                    width: 70,
                    editor: new Ext.form.TextField({allowBlank: false})
                }, {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 80,
                    editor: comboREAS, renderer: departamentoReasignacionSec
                }, {
                    header: 'Descripcion anexos',
                    dataIndex: 'descripcion_anexos',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                }, {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 40,
                    editor: comboCDTS, renderer: caracterTramiteSec
                }, {
                    header: 'cantidad_fojas',
                    dataIndex: 'cantidad_fojas',
                    sortable: true,
                    width: 20,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({singleSelect: false}),
            border: false,
            stripeRows: true
        });


        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth() / 1.05;
            var winHeight = desktop.getWinHeight() / 1.05;

            this.formDenunciassecretariaDetalle = new Ext.FormPanel({
                id: 'formDenunciassecretariaDetalle',

                items: [
                    {
                        collapsible: true,
                        id: 'formcabeceradenunciassecretaria',
                        collapsedTitle: true,
                        titleCollapse: true,
                        split: true,
                        flex: 1,
                        autoScroll: true,
                        title: 'Listado Denuncias - Secretaría General ',
                        layout: 'column', items: this.gridDenunciassecretaria
                    },
                    {
                        collapsible: true,
                        collapsedTitle: true,
                        titleCollapse: true,
                        split: true,
                        flex: 2,
                        height: 'auto',
                        autoScroll: true,
                        labelAlign: 'left',
                        title: 'Detalle Denuncias - Secretaría General',
                        bodyStyle: 'padding:0; background: #DFE8F6',
                        layout: 'column',
                        tbar: [
                            {
                                text: 'Grabar',
                                scope: this,
                                handler: this.grabardenunciassecretaria,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_grabardenunciassecretaria'
                            }
                        ],
                        items: [
                            {
                                frame: true,
                                columnWidth: 1,
                                layout: 'form',
                                id: 'formDenunciassecretaria',
                                items: [{
                                    layout: 'column',
                                    items: [{
                                        columnWidth: .333,
                                        layout: 'form',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Id',
                                            name: 'id',
                                            anchor: '95%',
                                            readOnly: true
                                        },
                                            {
                                                xtype: 'combo',

                                                fieldLabel: 'Persona recepta',
                                                name: 'id_persona',
                                                id: 'id_persona',
                                                anchor: '95%',
                                                readOnly: false,
                                                hiddenName: 'id_persona',

                                                store: storePRDS,
                                                valueField: 'id',
                                                displayField: 'nombre',
                                                typeAhead: true,
                                                triggerAction: 'all',
                                                mode: 'local'

                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Código trámite',
                                                name: 'codigo_tramite',
                                                anchor: '95%',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Fecha recepción',
                                                name: 'recepcion_documento',
                                                anchor: '95%',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Tipo documento',
                                                name: 'id_tipo_documento',
                                                anchor: '95%',
                                                readOnly: false,

                                                hiddenName: 'id_tipo_documento',
                                                store: storeTIDS,
                                                valueField: 'id',
                                                displayField: 'nombre',
                                                typeAhead: true,
                                                triggerAction: 'all',
                                                mode: 'local'

                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Núm documento',
                                                name: 'num_documento',
                                                anchor: '95%',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Remitente',
                                                name: 'remitente',
                                                anchor: '95%',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Reasignado a',
                                                name: 'reasignacion',
                                                anchor: '95%',
                                                readOnly: false,

                                                hiddenName: 'reasignacion',
                                                store: storeREAS,
                                                valueField: 'id',
                                                displayField: 'nombre',
                                                typeAhead: true,
                                                triggerAction: 'all',
                                                mode: 'local'
                                            }

                                        ]
                                    }, {
                                        columnWidth: .333,
                                        layout: 'form',
                                        items: [
                                            {
                                                xtype: 'textarea',
                                                fieldLabel: 'Asunto',
                                                name: 'asunto',
                                                anchor: '95%',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Descripción anexo',
                                                name: 'descripcion_anexos',
                                                anchor: '95%',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Carácter del trámite',
                                                name: 'id_caracter_tramite',
                                                anchor: '95%',
                                                readOnly: false,
                                                hiddenName: 'id_caracter_tramite',

                                                store: storeCDTS,
                                                valueField: 'id',
                                                displayField: 'nombre',
                                                typeAhead: true,
                                                triggerAction: 'all',
                                                mode: 'local'
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Cantidad de fojas',
                                                name: 'cantidad_fojas',
                                                anchor: '95%',
                                                readOnly: false
                                            }]
                                    }, {
                                        columnWidth: .333,
                                        layout: 'form',
                                        bodyStyle: 'padding:0; background: #ebfaeb',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Estado Recepcion Información',
                                                name: 'estado_recepcion_informacion',
                                                anchor: '95%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Cod inspección',
                                                name: 'codigo_inspeccion',
                                                anchor: '95%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Cod procedimiento',
                                                name: 'codigo_procedimiento',
                                                anchor: '95%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Zona',
                                                name: 'id_zona',
                                                anchor: '95%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Predio',
                                                name: 'predio',
                                                anchor: '95%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Observación',
                                                name: 'observacion',
                                                anchor: '95%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Actividad',
                                                name: 'actividad',
                                                anchor: '95%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textarea',
                                                fieldLabel: 'Procedimiento',
                                                name: 'procedimientos',
                                                anchor: '95%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Persona asignada',
                                                name: 'persona_asignada',
                                                anchor: '95%',
                                                readOnly: true
                                            }
                                            ]
                                    }]
                                },

                                ]
                            }
                        ]


                    }
                ]
            });

            win = desktop.createWindow({
                id: 'grid-win-denunciassecretaria',
                title: 'Denuncias - Secretaría General',
                width: winWidth,
                height: winHeight,
                iconCls: 'denunciassecretaria-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                tbar: [
                    {text: 'Nuevo', scope: this, handler: this.adddenunciassecretaria, iconCls: 'save-icon'},
                    '-',
                    {text: "Eliminar", scope: this, handler: this.deletedenunciassecretaria, iconCls: 'delete-icon'},
                    '-',
                    {
                        iconCls: 'demo-grid-add',
                        handler: this.requestGridData,
                        scope: this,
                        text: 'Recargar Datos',
                        tooltip: 'Recargar datos en la grilla'
                    }

                ],
                items: this.formDenunciassecretariaDetalle
            });
        }
        win.show();

        function cargaDetalle(denunciassecretaria, forma) {

            forma.getForm().load({
                url: 'modules/desktop/denunciassecretaria/server/crudDenunciassecretaria.php?operation=selectForm',
                params: {
                    id: denunciassecretaria
                }
            });
        };
        this.gridDenunciassecretaria.on('rowclick', function (grid, rowIndex) {
            this.record = this.gridDenunciassecretaria.getStore().getAt(rowIndex);
            this.idDenunciassecretariaRecuperada = this.record.id;

            /*cargar el formulario*/
            cargaDetalle(this.idDenunciassecretariaRecuperada, this.formDenunciassecretariaDetalle);
            Ext.getCmp('tb_grabardenunciassecretaria').setDisabled(false);
        }, this);
    }, deletedenunciassecretaria: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDenunciassecretaria.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDenunciassecretaria.remove(rows);
                }
            }
        });
    }, adddenunciassecretaria: function () {
        var denunciassecretaria = new this.storeDenunciassecretaria.recordType({
            id_persona: '1',
            codigo_tramite: '12-34-56',
            recepcion_documento: (new Date()).clearTime(), id_tipo_documento: '1',
            num_documento: '',
            remitente: '',
            asunto: '',
            reasignacion: '0',
            descripcion_anexos: '',
            id_caracter_tramite: '1',
            cantidad_fojas: ''
        });
        this.gridDenunciassecretaria.stopEditing();
        this.storeDenunciassecretaria.insert(0, denunciassecretaria);
        this.gridDenunciassecretaria.startEditing(0, 0);
    }, requestGridData: function () {
        this.storeDenunciassecretaria.load();
    }, grabardenunciassecretaria: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formDenunciassecretariaDetalle').getForm();
                    myForm.submit({
                        url: 'modules/desktop/denunciassecretaria/server/crudDenunciassecretaria.php?operation=updateForm',
                        method: 'POST',
                        fileUpload: true,
                        submitEmptyText: false,
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            storeDenunciassecretaria.load();
                        }
                    });
                }
            }
        });
    }

});
