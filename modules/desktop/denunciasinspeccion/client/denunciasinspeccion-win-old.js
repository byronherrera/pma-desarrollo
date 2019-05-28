QoDesk.DenunciasinspeccionWindow = Ext.extend(Ext.app.Module, {
    id: 'denunciasinspeccion',
    type: 'desktop/denunciasinspeccion',

    init: function () {
        this.launcher = {
            text: 'Denunciasinspeccion',
            iconCls: 'denunciasinspeccion-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win-denunciasinspeccion');
        var urlDenunciasinspeccion = "modules/desktop/denunciasinspeccion/server/";


        //inicio combo persona recepta la denuncia PRDI
        storePRDI = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalsecretaria'
        });

        var comboPRDI = new Ext.form.ComboBox({
            id: 'comboPRDI',
            store: storePRDI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personaReceptaDenunciaInspeccion(id) {
            var index = storePRDI.findExact('id', id);
            if (index > -1) {
                var record = storePRDI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la denuncia PRDI

        //inicio combo tipo documento  TIDI
        storeTIDI = new Ext.data.JsonStore({
            root: 'documento',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                documento: [
                    {"id": 1, "nombre": "Denunciasinspeccion"},
                    {"id": 2, "nombre": "Comunicados"}
                ]
            }
        });

        var comboTIDI = new Ext.form.ComboBox({
            id: 'comboTIDI',
            store: storeTIDI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personaTipoDocumentoIns(id) {
            var index = storeTIDI.findExact('id', id);
            if (index > -1) {
                var record = storeTIDI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo documento  TIDI

        //inicio combo reasignacion  REAI
        storeREAI = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidades'
        });

        var comboREAI = new Ext.form.ComboBox({
            id: 'comboREAI',
            store: storeREAI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoReasignacionIns(id) {
            var index = storeREAI.findExact('id', id);
            if (index > -1) {
                var record = storeREAI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo reasignacion REAI

        //inicio combo caracter del tramite CDTI
        storeCDTI = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Normal"},
                    {"id": 2, "nombre": "Medio"},
                    {"id": 3, "nombre": "Urgente"}
                ]
            }
        });

        var comboCDTI = new Ext.form.ComboBox({
            id: 'comboCDTI',
            store: storeCDTI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function caracterTramiteIns(id) {
            var index = storeCDTI.findExact('id', id);
            if (index > -1) {
                var record = storeCDTI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite CDTI

////////////////////////

        //inicio zona Inspeccion  ZONI
        storeZONI = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });
        var comboZONI = new Ext.form.ComboBox({
            id: 'comboZONI',
            store: storeZONI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function zonaIns(id) {
            var index = storeZONI.findExact('id', id);
            if (index > -1) {
                var record = storeZONI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo documento  ZONI


        //inicio combo actividad  ACTI
        storeACTI = new Ext.data.JsonStore({
            root: 'reasignacion',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                reasignacion: [
                    {"id": 0, "nombre": "Sin información"},
                    {"id": 1, "nombre": "a_Inspección_Técnica"},
                    {"id": 2, "nombre": "b_Inspección_General"},
                    {"id": 3, "nombre": "c_Inspección_Fauna_Urbana"}
                ]
            }
        });

        var comboACTI = new Ext.form.ComboBox({
            id: 'comboACTI',
            store: storeACTI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function actividadIns(id) {
            var index = storeACTI.findExact('id', id);
            if (index > -1) {
                var record = storeACTI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo actividad  ACTI


        //inicio combo Estado Recepcion Información Inspeccion ESREI
        storeESREI = new Ext.data.JsonStore({
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

        var comboESREI = new Ext.form.ComboBox({
            id: 'comboESREI',
            store: storeESREI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRecepcionInspeccion(id) {
            var index = storeESREI.findExact('id', id);
            if (index > -1) {
                var record = storeESREI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Estado Recepcion Información Inspeccion ESREI


        //inicio combo procedimientos PRSI
        storePRSI = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=procedimiento'
        });
        storePRSI.load();


        var comboPRSI = new Ext.form.ComboBox({
            id: 'comboPRSI',
            store: storePRSI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function procedimientosIns(id) {
            var index = storePRSI.findExact('id', id);
            if (index > -1) {
                var record = storePRSI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo procedimientos PRSI

        //inicio combo persona asignada PRASI
        storePRASI = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Sin asignar", "departamento": "1"},
                    {"id": 1, "nombre": "AGUAS MORA FEDERICO SANTIAGO", "departamento": "1"},
                    {"id": 2, "nombre": "AGUIRRE SALAZAR ALEX FABIAN", "departamento": "1"},
                    {"id": 3, "nombre": "CABRERA BORJA ANA BELEN", "departamento": "1"},
                    {"id": 4, "nombre": "ESCALANTE VITERI  GLORIA CECIBEL", "departamento": "1"},
                    {"id": 5, "nombre": "ESPINOZA CALLE ARNALDO ANDRES", "departamento": "1"},
                    {"id": 6, "nombre": "GALARZA MERO CESAR RICARDO", "departamento": "1"},
                    {"id": 7, "nombre": "GONGORA VILLAFUERTE DANNY EDMUNDO", "departamento": "1"},
                    {"id": 8, "nombre": "TERAN IMBAQUINGO HUGO ARTURO", "departamento": "1"},
                    {"id": 9, "nombre": "VALDOSPINOS NAVAS SARA ALEJANDRA", "departamento": "1"},
                    {"id": 10, "nombre": "ZAPATA JARAMILLO VERONICA CRISTINA", "departamento": "1"},

                    {"id": 11, "nombre": "BARZALLO RIVADENEIRA DANIELA ALEXANDRA", "departamento": "2"},
                    {"id": 12, "nombre": "CERON MONTENEGRO PATRICIO VASCO", "departamento": "2"},
                    {"id": 13, "nombre": "CHACON TALEYSSAT SANTIAGO", "departamento": "2"},
                    {"id": 14, "nombre": "HOLGUIN SCACCO GIANINNA NOEMI", "departamento": "2"},
                    {"id": 15, "nombre": "LEDESMA ALAVA PABLO ALBERTO", "departamento": "2"},
                    {"id": 16, "nombre": "LOMBEIDA JORGE LUIS", "departamento": "2"},
                    {"id": 17, "nombre": "MARTINEZ BALDEON  CATHERINE PAULINA", "departamento": "2"},
                    {"id": 18, "nombre": "MORA CAPIO ALVARO SEBASTIAN", "departamento": "2"},

                    {"id": 19, "nombre": "SALAZAR NARVAEZ LADY ELIZABETH", "departamento": "3"},
                    {"id": 20, "nombre": "SILVA REINA GEOVANY FRANCISCO", "departamento": "3"},

                ]
            }
        });

        var comboPRASI = new Ext.form.ComboBox({
            id: 'comboPRASI',
            store: storePRASI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personaAsignadaIns(id) {
            var index = storePRASI.findExact('id', id);
            if (index > -1) {
                var record = storePRASI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite PRASI

///////////////////////////////

        var proxyDenunciasinspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlDenunciasinspeccion + "crudDenunciasinspeccion.php?operation=insert",
                read: urlDenunciasinspeccion + "crudDenunciasinspeccion.php?operation=select",
                update: urlDenunciasinspeccion + "crudDenunciasinspeccion.php?operation=update",
                destroy: urlDenunciasinspeccion + "crudDenunciasinspeccion.php?operation=delete"
            }
        });

        var readerDenunciasinspeccion = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'estado_recepcion_informacion', allowBlank: false},
                {name: 'codigo_inspeccion', allowBlank: false},
                {name: 'codigo_procedimiento', allowBlank: false},
                {name: 'id_zona', allowBlank: false},
                {name: 'predio', allowBlank: false},
                {name: 'observacion', allowBlank: false},
                {name: 'actividad', allowBlank: false},
                //{name: 'procedimientos', allowBlank: false},
                {name: 'persona_asignada', allowBlank: false}
            ]
        });
        var writerDenunciasinspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeDenunciasinspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyDenunciasinspeccion,
            reader: readerDenunciasinspeccion,
            writer: writerDenunciasinspeccion,
            autoSave: true
        });
        this.storeDenunciasinspeccion.load();
        storeDenunciasinspeccion = this.storeDenunciasinspeccion;

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        this.gridDenunciasinspeccion = new Ext.grid.EditorGridPanel({
            height: 160,
            store: this.storeDenunciasinspeccion, columns: [
                {
                    header: 'id',
                    dataIndex: 'id',
                    sortable: true,
                    width: 10
                },
                {
                    header: 'Recepción documento',
                    dataIndex: 'recepcion_documento',
                    sortable: true,
                    width: 35,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i:s'
                    })
                },
                {
                    header: 'Estado recepción',
                    dataIndex: 'estado_recepcion_informacion',
                    sortable: true,
                    width: 40,
                    editor: comboESREI, renderer: estadoRecepcionInspeccion
                },
                {
                    header: 'Código inspección',
                    dataIndex: 'codigo_inspeccion',
                    sortable: true,
                    width: 40,
                    editor: textField
                },
                {
                    header: 'Código procedimiento',
                    dataIndex: 'codigo_procedimiento',
                    sortable: true,
                    width: 40,
                    editor: textField
                },
                {
                    header: 'Zona',
                    dataIndex: 'id_zona',
                    sortable: true,
                    width: 35,
                    editor: comboZONI,
                    renderer: zonaIns
                },
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 35, editor: textField},
                {header: 'Observacion', dataIndex: 'observacion', sortable: true, width: 40, editor: textField},
                {
                    header: 'Actividad',
                    dataIndex: 'actividad',
                    sortable: true,
                    width: 40,
                    editor: comboACTI,
                    renderer: actividadIns
                },
                /*{
                 header: 'Procedimientos',
                 dataIndex: 'procedimientos',
                 sortable: true,
                 width: 40,
                 editor: comboPRSI, renderer: procedimientosIns
                 },*/
                {
                    header: 'Persona asignada',
                    dataIndex: 'persona_asignada',
                    sortable: true,
                    width: 40,
                    editor: comboPRASI, renderer: personaAsignadaIns
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

            this.formDenunciasinspeccionDetalle = new Ext.FormPanel({
                id: 'formDenunciasinspeccionDetalle',



                items: [
                    {
                        collapsible: true,
                        id: 'formcabeceradenunciasinspeccion',
                        collapsedTitle: true,
                        titleCollapse: true,
                        split: true,
                        flex: 1,
                        autoScroll: true,
                        title: 'Listado Denuncias inspección',
                        layout: 'column', items: this.gridDenunciasinspeccion
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
                        title: 'Detalle Denunciasinspeccion',
                        bodyStyle: 'padding:0; background: #DFE8F6',
                        layout: 'column',
                        tbar: [
                            {
                                text: 'Grabar',
                                scope: this,
                                handler: this.grabardenunciasinspeccion,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_grabardenunciasinspeccion'
                            }
                        ],
                        items: [
                            {
                                frame: true,
                                columnWidth: 1,
                                layout: 'form',
                                id: 'formDenunciasinspeccion',
                                items: [{
                                    layout: 'column',
                                    items: [
                                        {
                                            columnWidth: .333,
                                            layout: 'form',
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Id',
                                                name: 'id',
                                                anchor: '95%',
                                                readOnly: true,
                                                cls: 'sololectura'
                                            },
                                                {
                                                    xtype: 'combo',
                                                    cls: 'sololectura',
                                                    fieldLabel: 'Persona recepta',
                                                    name: 'id_persona',
                                                    id: 'id_persona',
                                                    anchor: '95%',
                                                    readOnly: true,
                                                    hiddenName: 'id_persona',

                                                    store: storePRDI,
                                                    valueField: 'id',
                                                    displayField: 'nombre',
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    mode: 'local',
                                                    cls: 'sololectura'

                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Código trámite',
                                                    name: 'codigo_tramite',
                                                    anchor: '95%',
                                                    readOnly: true,
                                                    cls: 'sololectura'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Fecha recepción',
                                                    name: 'recepcion_documento',
                                                    anchor: '95%',
                                                    readOnly: true,
                                                    cls: 'sololectura'
                                                },
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Tipo documento',
                                                    name: 'id_tipo_documento',
                                                    anchor: '95%',
                                                    readOnly: true,

                                                    hiddenName: 'id_tipo_documento',
                                                    store: storeTIDI,
                                                    valueField: 'id',
                                                    displayField: 'nombre',
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    mode: 'local',
                                                    cls: 'sololectura'

                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Núm documento',
                                                    name: 'num_documento',
                                                    anchor: '95%',
                                                    readOnly: true,
                                                    cls: 'sololectura'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Remitente',
                                                    name: 'remitente',
                                                    anchor: '95%',
                                                    readOnly: true,
                                                    cls: 'sololectura'
                                                },
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Reasignado a',
                                                    name: 'reasignacion',
                                                    anchor: '95%',
                                                    readOnly: true,

                                                    hiddenName: 'reasignacion',
                                                    store: storeREAI,
                                                    valueField: 'id',
                                                    displayField: 'nombre',
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    mode: 'local',
                                                    cls: 'sololectura'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Descripción anexo',
                                                    name: 'descripcion_anexos',
                                                    anchor: '95%',
                                                    readOnly: true,
                                                    cls: 'sololectura'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Cantidad de fojas',
                                                    name: 'cantidad_fojas',
                                                    anchor: '95%',
                                                    readOnly: true,
                                                    cls: 'sololectura'
                                                }

                                            ]
                                        },
                                        {
                                            columnWidth: .333,
                                            layout: 'form',
                                            items: [
                                                {
                                                    xtype: 'textarea',
                                                    fieldLabel: 'Asunto',
                                                    name: 'asunto',
                                                    anchor: '95%',
                                                    readOnly: true,
                                                    cls: 'sololectura'
                                                },
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Persona asignada',
                                                    name: 'persona_asignada',
                                                    anchor: '95%',
                                                    readOnly: false,
                                                    hiddenName: 'persona_asignada',

                                                    store: storePRASI,
                                                    valueField: 'id',
                                                    displayField: 'nombre',
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    mode: 'local'
                                                },
                                                {
                                                    bodyStyle: 'padding:0; background: #ebfaeb',
                                                    xtype: 'combo',
                                                    fieldLabel: 'Estado Recepcion Información',
                                                    name: 'estado_recepcion_informacion',
                                                    anchor: '95%',
                                                    readOnly: false,
                                                    hiddenName: 'estado_recepcion_informacion',

                                                    store: storeESREI,
                                                    valueField: 'id',
                                                    displayField: 'nombre',
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    mode: 'local'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Cod inspección',
                                                    name: 'codigo_inspeccion',
                                                    anchor: '95%',
                                                    readOnly: false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Cod procedimiento',
                                                    name: 'codigo_procedimiento',
                                                    anchor: '95%',
                                                    readOnly: false
                                                },
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Zona',
                                                    name: 'id_zona',
                                                    anchor: '95%',
                                                    readOnly: false,
                                                    hiddenName: 'id_zona',

                                                    store: storeZONI,
                                                    valueField: 'id',
                                                    displayField: 'nombre',
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    mode: 'local'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Predio',
                                                    name: 'predio',
                                                    anchor: '95%',
                                                    readOnly: false
                                                }
                                            ]
                                        },
                                        {
                                            columnWidth: .333,
                                            layout: 'form',
//                                            bodyStyle: 'padding:0; background: #ebfaeb',

                                            items: [


                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Observación',
                                                    name: 'observacion',
                                                    anchor: '95%',
                                                    readOnly: false
                                                },
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Actividad',
                                                    name: 'actividad',
                                                    anchor: '95%',
                                                    readOnly: false,
                                                    hiddenName: 'actividad',

                                                    store: storeACTI,
                                                    valueField: 'id',
                                                    displayField: 'nombre',
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    mode: 'local'
                                                }/*,
                                                 {
                                                 xtype: 'combo',
                                                 fieldLabel: 'Procedimiento',
                                                 name: 'procedimientos',
                                                 anchor: '95%',
                                                 readOnly: false,
                                                 hiddenName: 'procedimientos',

                                                 store: storePRSI,
                                                 valueField: 'id',
                                                 displayField: 'nombre',
                                                 typeAhead: true,
                                                 triggerAction: 'all',
                                                 mode: 'local'
                                                 }*/,
                                                {
                                                    xtype: 'multiselect',
                                                    fieldLabel: 'Procedimientos<br />(Para seleccion<br /> multiple mantenga<br /> pulsada la tecla Ctrl)',
                                                    name: 'procedimientos',
                                                    width: 300,
                                                    height: 200,
                                                    allowBlank: false, store: storePRSI,
                                                    hiddenName: 'procedimientos',
                                                    displayField: 'nombre',
                                                    valueField: 'id',
                                                    ddReorder: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                                ]
                            }
                        ]


                    }
                ]
            });

            win = desktop.createWindow({
                id: 'grid-win-denunciasinspeccion',
                title: 'Denuncias inspeccion',
                width: winWidth,
                height: winHeight,
                iconCls: 'denunciasinspeccion-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                tbar: [
                    {
                        text: 'Nuevo',
                        scope: this,
                        handler: this.adddenunciasinspeccion,
                        iconCls: 'save-icon',
                        disabled: true
                    },
                    '-',
                    {
                        text: "Eliminar",
                        scope: this,
                        handler: this.deletedenunciasinspeccion,
                        iconCls: 'delete-icon',
                        disabled: true
                    },
                    '-',
                    {
                        iconCls: 'demo-grid-add',
                        handler: this.requestGridData,
                        scope: this,
                        text: 'Recargar Datos',
                        tooltip: 'Recargar datos en la grilla'
                    }

                ],
                items: this.formDenunciasinspeccionDetalle
            });
        }
        win.show();

        function cargaDetalle(denunciasinspeccion, forma) {

            forma.getForm().load({
                url: 'modules/desktop/denunciasinspeccion/server/crudDenunciasinspeccion.php?operation=selectForm',
                params: {
                    id: denunciasinspeccion
                }
            });
        };
        this.gridDenunciasinspeccion.on('rowclick', function (grid, rowIndex) {
            this.record = this.gridDenunciasinspeccion.getStore().getAt(rowIndex);
            this.idDenunciasinspeccionRecuperada = this.record.id;

            /*cargar el formulario*/
            cargaDetalle(this.idDenunciasinspeccionRecuperada, this.formDenunciasinspeccionDetalle);
            Ext.getCmp('tb_grabardenunciasinspeccion').setDisabled(false);
        }, this);
    }, deletedenunciasinspeccion: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDenunciasinspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDenunciasinspeccion.remove(rows);
                }
            }
        });
    }, adddenunciasinspeccion: function () {
        var denunciasinspeccion = new this.storeDenunciasinspeccion.recordType({
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
        this.gridDenunciasinspeccion.stopEditing();
        this.storeDenunciasinspeccion.insert(0, denunciasinspeccion);
        this.gridDenunciasinspeccion.startEditing(0, 0);
    }, requestGridData: function () {
        this.storeDenunciasinspeccion.load();
    }, grabardenunciasinspeccion: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formDenunciasinspeccionDetalle').getForm();
                    myForm.submit({
                        url: 'modules/desktop/denunciasinspeccion/server/crudDenunciasinspeccion.php?operation=updateForm',
                        method: 'POST',
                        fileUpload: true,
                        submitEmptyText: false,
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            storeDenunciasinspeccion.load();
                        }
                    });
                }
            }
        });
    }

});
