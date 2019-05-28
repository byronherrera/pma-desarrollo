QoDesk.InstruccionWindow = Ext.extend(Ext.app.Module, {
    id: 'instruccion',
    type: 'desktop/instruccion',

    init: function () {
        this.launcher = {
            text: 'Instrucción',
            iconCls: 'instruccion-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        //todo ver que perfiles dejar
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        var accesosInstruccion = this.app.isAllowedTo('accesosInstruccion', this.id);

        var accesosCoordinadorInspeccion = this.app.isAllowedTo('accesosAdministrador', this.id); //Todos los accesos, visualiza todos los trámites
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id); //Todos los accesos, visualiza trámites pendientes
        var accesosInspectores = this.app.isAllowedTo('accesosInspeccion', this.id); //Sin acceso a pestaña trámites pendientes, acceso a inspecciones asignadas
        var accesosSupervision = this.app.isAllowedTo('accesosSupervision', this.id); //Solo modo lectura

        // todo eliminar estas fechas ?
        var fecha_inicio_planificacion;
        var fecha_fin_planificacion;

        //todo borrar variable

        var fechaExpediente;

        //variable define que registro de instruccion se seleccion
        selectInstruccion = 0;

        // variable define
        finalizados = true;

        // variable para paginamiento
        limiteinstruccion = 100;

        // todo revisar los accesp
        // var acceso = (accesosAdministradorOpe || accesosInstruccion) ? true : false
        var acceso = true;

        var gridBlockInstruccion = false;
        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});


        var urlInstruccion = "modules/desktop/instruccion/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        var editorDate = new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i'})

        function formatDate(value, field) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }


// inicio combos instruccion

        //inicio combo persona asignada INSPRASA
        storeINSPRASA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion'
        });

        function personaAsignadaInstr(id) {
            var index = storeINSPRASA.findExact('id', id);
            if (index > -1) {
                var record = storeINSPRASA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite INSPRASA

        //inicio combo persona asignada INSPRFULA
        storeINSPRFULA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion'
        });

        var comboINSPRFULA = new Ext.form.ComboBox({
            id: 'comboINSPRFULA',
            //store: storeINSPRFULA,
            store: storeINSPRASA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        /*        function personaAsignadaAdm(id) {
                    var index = storeINSPRFULA.findExact('id', id);
                    if (index > -1) {
                        var record = storeINSPRFULA.getAt(index);
                        return record.get('nombre');
                    }
                }*/

        function personaAsignadaInstruccion(id) {
            var index = storeINSPRASA.findExact('id', id);
            if (index > -1) {
                var record = storeINSPRASA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite INSPRFULA


        function reincidencia(val, meta) {
            if (val == 0) {
                // meta.style = "background-color:#e4765c;";
                return '<span style="color:green;">No</span>';
            } else if (val == 1) {
                meta.style = "background-color:#fdb09f; text-align: center;";
                return '<span style="color:white; font-weight: bolder;">Si</span>';
            }
            return val;
        }

        function columnaColor(value, meta) {
            meta.css = 'blue';
            return value;
        }

        //inicio combo ordenanzas  ORDINSTR
        storeORDINSTR = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });
        //var comboORDINSTR = new Ext.ux.form.CheckboxCombo({


        var comboORDINSTR = new Ext.form.ComboBox({
            id: 'comboINSPRFULA',
            //store: storeINSPRFULA,
            store: storeORDINSTR,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function ordenanzasInstruccion(id) {
            var index = storeORDINSTR.findExact('id', id);
            if (index > -1) {
                var record = storeORDINSTR.getAt(index);
                return record.get('nombre');
            }
        }

        //inicio combo ordenanzas  ORDINSTR

        //inicio combo instruccion tipo expedientes  INSTIEXP
        storeINSTIEXP = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposexpedientesinstruccion'
        });

        storeINSTIEXPFULL = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre', 'etapa'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposexpedientes'
        });

        var comboINSTIEXP = new Ext.form.ComboBox({
            id: 'comboINSTIEXP',
            store: storeINSTIEXP,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionTiposExpedientes(id) {
            var index = storeINSTIEXPFULL.findExact('id', id);
            if (index > -1) {
                var record = storeINSTIEXPFULL.getAt(index);
                return record.get('nombre');
            }
        }

        function instruccionVerificaExpedientesEtapa(id, etapa) {
            var index = storeINSTIEXPFULL.findExact('id', id);
            if (index > -1) {
                var record = storeINSTIEXPFULL.getAt(index);
                if (record.get('etapa') == etapa) {
                    return true
                } else {
                    return false
                }
            }
        }

        //inicio combo ordenanzas  INSTIEXP
        //inicio combo persona asignada SECTRAM
        storeSECTRAM = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=secretariatramites'
        });

        var comboSECTRAM = new Ext.form.ComboBox({
            id: 'comboSECTRAM',
            store: storeSECTRAM,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionSecretariaTramite(id) {
            var index = storeSECTRAM.findExact('id', id);
            if (index > -1) {
                var record = storeSECTRAM.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite SECTRAM

        //inicio combo Estado Recepcion Expediente Instruccion ESTEXP
        storeESTEXP = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Expediente sin asignar"},
                    {"id": 1, "nombre": "Expediente asignado a funcionario"},
                    {"id": 2, "nombre": "Expediente entregado trámite con acta"},
                    {"id": 3, "nombre": "Expediente finalizado"},
                    {"id": 4, "nombre": "Expediente fallido"}
                ]
            }
        });

        var comboESTEXP = new Ext.form.ComboBox({
            id: 'comboESTEXP',
            store: storeESTEXP,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRecepcionExpediente(id) {
            var index = storeESTEXP.find('id', id);
            if (index > -1) {
                var record = storeESTEXP.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Estado Recepcion Expediente Instruccion ESTEXP

        //inicio combo años luae ANILUAIN
        storeANILUAIN = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 2017, "nombre": "2017"},
                    {"id": 2018, "nombre": "2018"},
                    {"id": 2019, "nombre": "2019"},
                    {"id": 2020, "nombre": "2020"},
                    {"id": 2021, "nombre": "2021"},
                    {"id": 2022, "nombre": "2022"}
                ]
            }
        });

        var comboANILUAIN = new Ext.form.ComboBox({
            id: 'comboANILUAIN',
            store: storeANILUAIN,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function aniosluaeInstruccion(id, meta) {
            var index = storeANILUAIN.find('id', id);
            if (index > -1) {
                var record = storeANILUAIN.getAt(index);
                return record.get('nombre');
            }
            meta.css = 'blue';
        }

        //fin combo años luae ANILUAIN


        //inicio combo categoria instruccion CATINTR
        storeCATINTR = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "CATEGORIA (I)"},
                    {"id": 1, "nombre": "CATEGORIA (II)"},
                    {"id": 2, "nombre": "CATEGORIA (III)"},
                    {"id": 3, "nombre": "CATEGORIA DESCONCIDA"}
                ]
            }
        });

        var comboCATINTR = new Ext.form.ComboBox({
            id: 'comboCATINTR',
            store: storeCATINTR,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function categoriaInstruccion(id, meta) {
            var index = storeCATINTR.find('id', id);
            if (index > -1) {
                var record = storeCATINTR.getAt(index);
                return record.get('nombre');
            }
            meta.css = 'blue';
        }

        //fin combo categoria instruccion CATINTR
        //inicio combo instruccion auto INSTRAUTO
        storeINSTRAUTO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": '1', "nombre": "AUTO FLAGRANCIA"},
                    {"id": '2', "nombre": "AUTO ORDINARIO"}
                ]
            }
        });

        var comboINSTRAUTO = new Ext.form.ComboBox({
            id: 'comboINSTRAUTO',
            store: storeINSTRAUTO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionAuto(id) {
            var index = storeINSTRAUTO.find('id', id);
            if (index > -1) {
                var record = storeINSTRAUTO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin  combo instruccion auto INSTRAUTO

        //inicio  combo instruccion dmi INSTRDMI
        storeINSTRDMI = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": '1', "nombre": "ACTA INFRACCION"},
                    {"id": '2', "nombre": "INFORME TÉCNICO"}
                ]
            }
        });

        var comboINSTRDMI = new Ext.form.ComboBox({
            id: 'comboINSTRDMI',
            store: storeINSTRDMI,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionDmi(id) {
            var index = storeINSTRDMI.find('id', id);
            if (index > -1) {
                var record = storeINSTRDMI.getAt(index);
                return record.get('nombre');
            }
        }

        //fin  combo instruccion auto INSTRDMI

        //inicio combo instruccion medida cautelar INSTRMED
        storeINSTRMED = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": '1', "nombre": "CLAUSURA"},
                    {"id": '2', "nombre": "SUSPENSION DE ACTIVIDAD"},
                    {"id": '3', "nombre": "RETIRO DE BIENESD"}
                ]
            }
        });

        var comboINSTRMED = new Ext.form.ComboBox({
            id: 'comboINSTRMED',
            store: storeINSTRMED,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionMedidaCautelar(id) {
            var index = storeINSTRMED.find('id', id);
            if (index > -1) {
                var record = storeINSTRMED.getAt(index);
                return record.get('nombre');
            }
        }

        //fin  combo instruccion medida cautelar INSTRMED
// inicio pestañas de mantenimiento


// fin pestañas de mantenimiento

        // inicio ventana instruccion
        var proxyInstruccion = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccion.php?operation=insert",
                read: urlInstruccion + "crudInstruccion.php?operation=select",
                update: urlInstruccion + "crudInstruccion.php?operation=update",
                destroy: urlInstruccion + "crudInstruccion.php?operation=delete"
            },

            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerInstruccion = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'codigo_expediente', allowBlank: true},
                {name: 'id_persona', allowBlank: true},
                {name: 'fecha_ingreso', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'id_persona_encargada', allowBlank: true},
                {name: 'id_persona_reasignado', allowBlank: true},
                {name: 'fecha_asignacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha_reasignacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'expediente', allowBlank: false},
                {name: 'id_tramite', allowBlank: true},
                {name: 'id_acta', allowBlank: true},
                {name: 'id_estado', allowBlank: true},
                {name: 'detalle', allowBlank: true},
                {name: 'observaciones', allowBlank: true},
                {name: 'clausura', type: 'boolean', allowBlank: true},
                {name: 'skelta', allowBlank: true},
                {name: 'predio', allowBlank: true},
                {name: 'reincidencia_predio', allowBlank: true},
                {name: 'nombre_administrado', allowBlank: true},
                {name: 'reincidencia_administrado', allowBlank: true},
                {name: 'nombre_establecimiento', allowBlank: true},
                {name: 'direccion', allowBlank: true},
                {name: 'ruc', allowBlank: true},
                {name: 'cedula', allowBlank: true},
                {name: 'casillero_judicial', allowBlank: true},
                {name: 'actividad_verificada', allowBlank: true},
                {name: 'ciiu', allowBlank: true},
                {name: 'luae', type: 'boolean', allowBlank: true},
                {name: 'luae_anio', allowBlank: true},
                {name: 'categoria', allowBlank: true},
                {name: 'trabajos_varios', type: 'boolean', allowBlank: true},
                {name: 'construcciones', type: 'boolean', allowBlank: true},
                {name: 'id_ordenanza', allowBlank: true},
                {name: 'id_articulo', allowBlank: true},
                {name: 'id_literal', allowBlank: true},
                {name: 'auto', allowBlank: true},
                {name: 'dmi', allowBlank: true},
                {name: 'informe_otros', type: 'boolean', allowBlank: true},
                {name: 'entidad', allowBlank: true},
                {name: 'informe', allowBlank: true},
                {name: 'medida_cautelar', allowBlank: true},
                {name: 'ultima_actividad', allowBlank: true}
            ]
        });
        var writerInstruccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeInstruccion = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccion,
            reader: readerInstruccion,
            writer: writerInstruccion,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limiteinstruccion,
                finalizados: finalizados,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosAdministradorIns: accesosAdministradorIns,
                accesosInstruccion: accesosInstruccion,
                acceso: acceso
            }
        });
        storeInstruccion = this.storeInstruccion;

        this.gridInstruccion = new Ext.grid.EditorGridPanel({
            height: desktop.getWinHeight() - 380,
            store: this.storeInstruccion,
            columns: [
                new Ext.grid.RowNumberer(),

                {header: 'Código', dataIndex: 'codigo_expediente', sortable: true, width: 60, align: 'left'},
                {
                    header: 'Fecha Ingreso',
                    dataIndex: 'fecha_ingreso',
                    sortable: true,
                    width: 100,
                    renderer: formatDate
                },
                {
                    header: 'Asignación',
                    dataIndex: 'id_persona_encargada',
                    renderer: personaAsignadaInstruccion,
                    editor: comboINSPRFULA,
                    sortable: true,
                    width: 140
                },
                {
                    header: 'Fecha asignación'
                    , dataIndex: 'fecha_asignacion'
                    , sortable: true
                    , width: 100
                    , renderer: formatDate
                    //, editor: editorDate
                },
                {
                    header: 'Persona reasignado',
                    dataIndex: 'id_persona_reasignado',
                    sortable: true,
                    width: 100,
                    hidden: true
                },
                {
                    header: 'Fecha reasignación',
                    dataIndex: 'fecha_reasignacion',
                    sortable: true,
                    width: 100,
                    renderer: formatDate,
                    editor: editorDate, hidden: true
                },
                {
                    header: 'Estado',
                    dataIndex: 'id_estado',
                    sortable: true,
                    width: 210,
                    renderer: estadoRecepcionExpediente,
                    editor: comboESTEXP
                },

                {
                    header: 'Elaborado',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 100,
                    renderer: personaAsignadaInstr,
                    hidden: true
                },
                {header: 'Expediente', dataIndex: 'expediente', sortable: true, width: 130, editor: textField},
                {
                    header: 'Trámite General',
                    dataIndex: 'id_tramite',
                    sortable: true,
                    width: 100,
                    renderer: instruccionSecretariaTramite,
                    editor: comboSECTRAM
                },

                {header: 'Acta', dataIndex: 'id_acta', sortable: true, width: 120, editor: textField, hidden: true},
                {header: 'Detalle', dataIndex: 'detalle', sortable: true, width: 170, editor: textField},
                {header: 'Observaciones', dataIndex: 'observaciones', sortable: true, width: 170, editor: textField},
                {
                    header: 'Clausura', dataIndex: 'clausura', sortable: true, width: 60, align: 'center',
                    editor: {xtype: 'checkbox'}, falseText: 'No', menuDisabled: true, trueText: 'Si'
                    , xtype: 'booleancolumn'
                },
                {header: 'Skelta', dataIndex: 'skelta', sortable: true, width: 80, editor: textField},
                {
                    header: 'Predio Número',
                    dataIndex: 'predio',
                    sortable: true,
                    width: 80,
                    editor: textField,
                    xtype: 'numbercolumn',
                    format: '00000000'
                },
                {
                    header: 'Reincidencia Predio',
                    dataIndex: 'reincidencia_predio',
                    sortable: true,
                    width: 120,
                    align: 'center',
                    menuDisabled: true,
                    renderer: reincidencia
                },
                {
                    header: 'Nombre Administrado',
                    dataIndex: 'nombre_administrado',
                    sortable: true,
                    width: 120,
                    editor: textField
                },
                {
                    header: 'Nombre Establecimiento',
                    dataIndex: 'nombre_establecimiento',
                    sortable: true,
                    width: 120,
                    editor: textField
                },
                {
                    header: 'RUC',
                    dataIndex: 'ruc',
                    sortable: true,
                    width: 120,
                    editor: textField,
                    xtype: 'numbercolumn',
                    format: '00000000'
                },
                {
                    header: 'Cédula',
                    dataIndex: 'cedula',
                    sortable: true,
                    width: 80,
                    editor: textField,
                    xtype: 'numbercolumn',
                    format: '00000000'
                },
                {
                    header: 'Reincidencia administrado',
                    dataIndex: 'reincidencia_administrado',
                    sortable: true,
                    width: 130,
                    align: 'center',
                    menuDisabled: true,
                    renderer: reincidencia
                },
                {header: 'Dirección', dataIndex: 'direccion', sortable: true, width: 160, editor: textField},

                {
                    header: 'Casillero Judicial',
                    dataIndex: 'casillero_judicial',
                    sortable: true,
                    width: 100,
                    editor: textField,
                },
                {
                    header: 'Actividad Verificada',
                    dataIndex: 'actividad_verificada',
                    cls: 'blue',
                    sortable: true,
                    width: 100,
                    editor: textField,
                    renderer: columnaColor

                },
                {header: 'CIIU', dataIndex: 'ciiu', sortable: true, width: 50, editor: textField,
                    renderer: columnaColor},
                {
                    header: 'TIENE LUAE', dataIndex: 'luae', sortable: true, width: 70, align: 'center',
                    editor: {xtype: 'checkbox'}, falseText: 'No', menuDisabled: true, trueText: 'Si'
                    , xtype: 'booleancolumn',
                    renderer: columnaColor
                },
                {
                    header: 'Año LUAE',
                    dataIndex: 'luae_anio',
                    sortable: true,
                    width: 100,
                    renderer: aniosluaeInstruccion,
                    editor: comboANILUAIN
                },
                {
                    header: 'Categoría LUAE',
                    dataIndex: 'categoria',
                    sortable: true,
                    width: 100,
                    renderer: categoriaInstruccion,
                    editor: comboCATINTR
                },
                {
                    header: 'Trabajos Varios',
                    dataIndex: 'trabajos_varios',
                    sortable: true,
                    width: 100,
                    align: 'center',
                    editor: {xtype: 'checkbox'},
                    falseText: 'No',
                    menuDisabled: true,
                    trueText: 'Si'
                    ,
                    xtype: 'booleancolumn'
                },

                {
                    header: 'Construcciones', dataIndex: 'construcciones', sortable: true, width: 90, align: 'center',
                    editor: {xtype: 'checkbox'}, falseText: 'No', menuDisabled: true, trueText: 'Si'
                    , xtype: 'booleancolumn'
                },

                {
                    header: 'Ordenanza', dataIndex: 'id_ordenanza', sortable: true, width: 140,
                    renderer: ordenanzasInstruccion,
                    editor: comboORDINSTR
                },
                {header: 'Artículo', dataIndex: 'id_articulo', sortable: true, width: 100, editor: textField},
                {header: 'Literal', dataIndex: 'id_literal', sortable: true, width: 100, editor: textField},
                {
                    header: 'Auto', dataIndex: 'auto', sortable: true, width: 130,
                    renderer: instruccionAuto,
                    editor: comboINSTRAUTO
                },
                {
                    header: 'Dmi', dataIndex: 'dmi', sortable: true, width: 130,
                    renderer: instruccionDmi,
                    editor: comboINSTRDMI
                },
                {
                    header: 'Informe Otros', dataIndex: 'informe_otros', sortable: true, width: 90, align: 'center',
                    editor: {xtype: 'checkbox'}, falseText: 'No', menuDisabled: true, trueText: 'Si'
                    , xtype: 'booleancolumn'
                },
                {header: 'Entidad', dataIndex: 'entidad', sortable: true, width: 100, editor: textField},
                {header: 'Informe', dataIndex: 'informe', sortable: true, width: 120, editor: textField},
                {
                    header: 'Medida Cautelar', dataIndex: 'medida_cautelar', sortable: true, width: 180,
                    renderer: instruccionMedidaCautelar,
                    editor: comboINSTRMED
                },
                {
                    header: 'Última Actividad',
                    dataIndex: 'ultima_actividad',
                    sortable: true,
                    width: 140,
                    editor: textField
                },
            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    // validamos la fecha
                    /*  fechaActual = new Date();
                      fechaExpediente = record.get('fecha_fin_planificacion')

                      var diasDif = fechaActual.getTime() - fechaExpediente.getTime();
                      var horas = Math.round(diasDif / (1000 * 60 * 60));


                      if ((record.get('id_estado') == 1) && (horas > 86)) {
                          return 'redstate';
                      }

                      // registros que estan en planificacion
                      if (record.get('id_estado') == 1) {
                          // Ext.getCmp('id_persona_encargada').setReadOnly(true);
                          return 'gold';
                      }
                      // registros que ya estan realizados
                      if (record.get('id_estado') == 4) {
                          return 'bluestate';
                      }*/
                }
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {
                            //fecha_inicio_planificacion = rec.get('fecha_inicio_planificacion')
                            //fecha_fin_planificacion = rec.get('fecha_fin_planificacion');

                            // recuperamos la informacion de personal asignado a ese operativo
                            // todo quitar
                            selectInstruccion = rec.id;
                            storeInstruccionAcciones.load({params: {id_expediente: rec.id}});

                            Ext.getCmp('borrarexpedientedetalleacciones').setDisabled(false);
                            Ext.getCmp('addexpedientedetalleacciones').setDisabled(false);


                            // para el caso que el operativo se haya finalizado se bloquea ya el borrar o editar
                            if (acceso) {
                                gridBlockInstruccion = false;
                                if (rec.get("id_estado") != 1) {
                                    gridBlockInstruccion = false;
                                }
                                else {
                                    gridBlockInstruccion = false;
                                }
                            }
                            /*                            if (acceso) {
                                                            if (rec.get("id_estado") != 1) {
                                                                Ext.getCmp('informesAccionesTab').setDisabled(acceso ? false : true);
                                                                Ext.getCmp('informesInstruccionTab').setDisabled(acceso ? false : true);
                                                                Ext.getCmp('imagenesInstruccionTab').setDisabled(acceso ? false : true);
                                                                Ext.getCmp('detalleInstruccionTab').setDisabled(acceso ? false : true);
                                                                Ext.getCmp('retirosInstruccionTab').setDisabled(acceso ? false : true);
                                                                cargaDetalle(rec.id);
                                                            }
                                                            else {
                                                                Ext.getCmp('informesAccionesTab').setDisabled(true);
                                                                Ext.getCmp('informesInstruccionTab').setDisabled(true);
                                                                Ext.getCmp('imagenesInstruccionTab').setDisabled(true);
                                                                Ext.getCmp('detalleInstruccionTab').setDisabled(true);
                                                                Ext.getCmp('retirosInstruccionTab').setDisabled(true);
                                                                cargaDetalle(rec.id);
                                                            }

                                                            if ((rec.get("id_estado") == 1) || (rec.get("id_estado") == 4)) {
                                                                gridBlockInstruccion = false;
                                                                Ext.getCmp('savedetalleoperativo').setDisabled(false);

                                                                Ext.getCmp('borraroperativo').setDisabled(accesosAdministradorOpe ? false : true);
                                                                Ext.getCmp('addinstruccion').setDisabled(accesosAdministradorOpe ? false : true);

                                                                Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                                                Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                                                // en caso que se tenga acceso tambien se habilitan o deshabilitan los botones para agregar detalle
                                                                // valido si es el caso operativo tipo Permanentes Zonales


                                                                if (rec.get("tipo_operativo") == 2) {
                                                                    Ext.getCmp('borraroperativodetalle').setDisabled(false);
                                                                    Ext.getCmp('addoperativodetalle').setDisabled(false);
                                                                    //Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                                                    // Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                                                } else {
                                                                    Ext.getCmp('borraroperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                                                    Ext.getCmp('addoperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                                                    // Ext.getCmp('borraroperativoparticipantes').setDisabled(accesosAdministradorOpe ? false : true);
                                                                    // Ext.getCmp('addoperativoparticipantes').setDisabled(accesosAdministradorOpe ? false : true);
                                                                }

                                                                Ext.getCmp('borrarexpedientedetalleacciones').setDisabled(false);
                                                                Ext.getCmp('addexpedientedetalleacciones').setDisabled(false);

                                                                Ext.getCmp('borraroperativodetalleInforme').setDisabled(false);
                                                                Ext.getCmp('addoperativodetalleInforme').setDisabled(false);

                                                                Ext.getCmp('borraroperativoimagenes').setDisabled(false);

                                                                Ext.getCmp('addoperativoimagenes').setDisabled(false);
                                                                Ext.getCmp('subirimagen').setDisabled(false);
                                                                // solamente para el caso
                                                            }
                                                            else {
                                                                gridBlockInstruccion = true;
                                                                Ext.getCmp('savedetalleoperativo').setDisabled(true);

                                                                Ext.getCmp('borraroperativo').setDisabled(true);
                                                                Ext.getCmp('addinstruccion').setDisabled(true);

                                                                Ext.getCmp('borraroperativodetalle').setDisabled(true);
                                                                Ext.getCmp('addoperativodetalle').setDisabled(true);

                                                                Ext.getCmp('borraroperativoparticipantes').setDisabled(true);
                                                                Ext.getCmp('addoperativoparticipantes').setDisabled(true);

                                                                Ext.getCmp('borrarexpedientedetalleacciones').setDisabled(true);
                                                                Ext.getCmp('addexpedientedetalleacciones').setDisabled(true);

                                                                Ext.getCmp('borraroperativodetalleInforme').setDisabled(true);
                                                                Ext.getCmp('addoperativodetalleInforme').setDisabled(true);

                                                                Ext.getCmp('borraroperativoimagenes').setDisabled(true);
                                                                Ext.getCmp('addoperativoimagenes').setDisabled(true);
                                                                Ext.getCmp('subirimagen').setDisabled(true);

                                                            }


                                                            //para el caso  de los botones
                                                            if ((rec.get("id_estado") == 2) || (rec.get("id_estado") == 3) || (rec.get("id_estado") == 5)) {
                                                                Ext.getCmp('tb_repoteInstruccion').setDisabled(false);
                                                            } else {
                                                                Ext.getCmp('tb_repoteInstruccion').setDisabled(true);
                                                            }
                                                            //para el caso que se es administrador
                                                            if (accesosAdministradorOpe) {
                                                                Ext.getCmp('savedetalleoperativo').setDisabled(false);
                                                            }
                                                        }
                            */
                        }
                    }
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteinstruccion,
                store: storeInstruccion,
                displayInfo: true,
                displayMsg: 'Mostrando instruccion {0} - {1} de {2} - AMC',
                emptyMsg: "No existen instruccion que mostrar"
            }),

            listeners: {
                beforeedit: function (e) {
                    // si el operativo esta identificado como estado o planificado (1) o informe (4) se peude editar
                    /*if (acceso) {
                        if ((e.record.get("id_estado") == 1) || (e.record.get("id_estado") == 4)) {
                            return true;
                        }
                        return false;
                    } else {
                        return false;
                    }
                    */
                }
            }
        });
        // fin ventana instruccion


        var detalleExpediente = new Ext.FormPanel({
            id: 'formaDetalleExpediente',
            frame: true,
            bodyStyle: 'padding:0',
            width: '100%',
            items: [{
                layout: 'column',
                items: [{
                    xtype: 'hidden',
                    fieldLabel: 'Id',
                    name: 'id'
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Parroquias Intervenidas',
                        name: 'parroquias',
                        id: 'parroquias',
                        anchor: '95%'
                    }]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Barrios Intervenidos',
                        name: 'barrios',
                        id: 'barrios',
                        anchor: '95%'
                    }]
                }]
            }, {
                xtype: 'textarea',
                id: 'detalle',
                fieldLabel: 'Resumen Expediente',
                height: 145,
                anchor: '98%',
                name: 'detalle'
            }],
            defaults: {
                listeners: {
                    change: function (field, newVal, oldVal) {
                        var myForm = Ext.getCmp('formaDetalleExpediente').getForm();
                        myForm.submit({
                            url: 'modules/desktop/instruccion/server/crudInstruccion.php?operation=updateForm',
                            method: 'POST',
                            success: function (form, action) {
                            }
                        });
                    }
                },
            }


        });


        // inicio ventana instruccion detalle acciones
        var proxyInstruccionAcciones = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccionAcciones.php?operation=insert",
                read: urlInstruccion + "crudInstruccionAcciones.php?operation=select",
                update: urlInstruccion + "crudInstruccionAcciones.php?operation=update",
                destroy: urlInstruccion + "crudInstruccionAcciones.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerInstruccionAcciones = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_expediente', allowBlank: false},
                {name: 'id_persona', allowBlank: true},
                {name: 'amc_expedientes_tipos', allowBlank: false},
                {name: 'estado', type: 'boolean', allowBlank: true},
                {name: 'sancion', type: 'boolean', allowBlank: true},
                {name: 'fecha', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'num_resolucion', allowBlank: true},
                {name: 'observaciones', allowBlank: true}
            ]
        });

        var writerInstruccionAcciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInstruccionAcciones = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccionAcciones,
            reader: readerInstruccionAcciones,
            writer: writerInstruccionAcciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeInstruccionAcciones = this.storeInstruccionAcciones;

        this.gridInstruccionAcciones = new Ext.grid.EditorGridPanel({
            id: 'gridInstruccionAcciones',
            autoHeight: true,
            autoScroll: true,
            store: this.storeInstruccionAcciones,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id_expediente',
                    dataIndex: 'id_expediente',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'Funcionario',
                    dataIndex: 'id_persona',
                    sortable: true,
                    hidden: true,
                    width: 60,
                    renderer: personaAsignadaInstr
                },
                {
                    header: 'Etapas',
                    dataIndex: 'amc_expedientes_tipos',
                    sortable: true,
                    width: 60,
                    renderer: instruccionTiposExpedientes,
                    editor: comboINSTIEXP
                },
                {
                    header: 'Etapa activa',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 40,
                    align: 'center',
                    editor: {xtype: 'checkbox'},
                    falseText: 'No',
                    trueText: 'Si',
                    menuDisabled: true,
                    xtype: 'booleancolumn'
                },
                {
                    header: 'Sanción',
                    dataIndex: 'sancion',
                    sortable: true,
                    width: 40,
                    align: 'center',
                    editor: {xtype: 'checkbox'},
                    falseText: 'No',
                    trueText: 'Si',
                    menuDisabled: true,
                    xtype: 'booleancolumn'
                },
                {
                    header: 'Fecha inicio ',
                    dataIndex: 'fecha',
                    sortable: true,
                    width: 40,
                    renderer: formatDate,
                    editor: editorDate

                },
                {
                    header: 'Número documento',
                    dataIndex: 'num_resolucion',
                    sortable: true,
                    width: 120,
                    editor: textField
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 120,
                    editor: textField
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
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        //verifico que si no es administrador se bloque la edicion
                        if (accesosAdministradorOpe) {
                            return instruccionVerificaExpedientesEtapa(e.record.data.amc_expedientes_tipos, 'INSTRUCCION');
                        } else {
                            return false;
                        }
                    }
                    else {
                        return false
                    }
                }
            }


        });

        var gridInstruccionAcciones = this.gridInstruccionAcciones
        // inicio ventana instruccion detalle vehiculos


        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccion,
            reader: readerInstruccion,
            writer: writerInstruccion,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limiteinstruccion,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosAdministradorIns: accesosAdministradorIns,
                accesosInstruccion: accesosInstruccion

            }
        });

        storeDocumentosReporte = this.storeDocumentosReporte
        this.gridDocumentosReporte = new Ext.grid.EditorGridPanel({

            height: desktop.getWinHeight() - 268,
            autoScroll: true,
            store: this.storeDocumentosReporte,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'id',
                    sortable: true,
                    width: 17
                },
                {
                    header: 'Fecha inicio',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 37,
                    renderer: formatDate
                },
                {
                    header: 'Fecha Fin',
                    dataIndex: 'fecha_fin_planificacion',
                    sortable: true,
                    width: 37,
                    renderer: formatDate
                },
                {
                    header: 'Tipo de control',
                    dataIndex: 'id_tipo_control',
                    sortable: true,
                    width: 45,
                    // renderer: instruccionTipoInstruccion
                },
                {
                    header: 'Estado',
                    dataIndex: 'id_estado',
                    sortable: true,
                    width: 45,
                    //renderer: instruccionEstados
                },
                {
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 30,
                    //renderer: instruccionNivelComplejidad
                },
                {
                    header: 'Zonal',
                    dataIndex: 'id_zonal',
                    sortable: true,
                    width: 40,
                    //renderer: zonaAdm
                },
                {
                    header: 'Responsable',
                    dataIndex: 'id_persona_encargada',
                    sortable: true,
                    width: 40,
                    // renderer: personaReceptaDenuncia
                },
                /*                {
                 header: 'Participantes',
                 dataIndex: 'participantes',
                 sortable: true,
                 width: 55
                 },*/
                {
                    header: 'Punto Encuentro',
                    dataIndex: 'punto_encuentro_planificado',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Lugar intervención ',
                    dataIndex: 'zona',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Trámite',
                    dataIndex: 'tramite',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Elaborado',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 30,
                    hidden: true,
                    //  renderer: personaReceptaDenuncia
                },
                {
                    header: 'Fecha elaboracion',
                    dataIndex: 'fecha_planificacion',
                    sortable: true,
                    width: 45, hidden: true,
                    renderer: formatDate
                },
                {
                    header: 'Tipo'
                    , dataIndex: 'tipo_operativo'
                    , align: 'center'
                    , sortable: true
                    , width: 30
                    //,hidden: true
                    //, renderer: instruccionTipo
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
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeDocumentosReporte,
                displayInfo: true,
                displayMsg: 'Mostrando instruccion {0} - {1} de {2}  >>',
                emptyMsg: "No existen instruccion que mostrar"
            }),
        });
        // fin datastore and datagrid in Guia

        var win = desktop.getWindow('grid-win-instruccion');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            this.seleccionDepar = 3;

            this.formConsultaDocumentos = new Ext.FormPanel({
                layout: 'column',
                title: 'Ingrese los parámetros',
                frame: true,
                bodyStyle: 'padding:5px 5px 0',
                items: [
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'datetimefield',
                                fieldLabel: 'Fecha Inicio',
                                id: 'busqueda_fecha_inicio',
                                anchor: '95%',
                                dateFormat: 'Y-m-d',
                                timeFormat: 'H:i:s'
                            },
                            {
                                xtype: 'datetimefield',
                                fieldLabel: 'Fecha Fin',
                                id: 'busqueda_fecha_fin',
                                anchor: '95%',
                                dateFormat: 'Y-m-d',
                                timeFormat: 'H:i:s'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Tipo control',
                                id: 'busqueda_tipo_control',
                                name: 'busqueda_tipo_control',
                                hiddenName: 'busqueda_tipo_control',

                                anchor: '95%',
                                //store: storeOPTID,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Nivel Complejidad',
                                id: 'busqueda_nivel_complejidad',
                                name: 'busqueda_nivel_complejidad',
                                hiddenName: 'busqueda_nivel_complejidad',

                                anchor: '95%',
                                //store: storeOPNICO,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Responsable',
                                id: 'busqueda_persona_encargada',
                                name: 'busqueda_persona_encargada',
                                hiddenName: 'busqueda_persona_encargada',

                                anchor: '95%',
                                //store: storeIPRD,
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
                                fieldLabel: 'Zonal',
                                id: 'busqueda_zonal',
                                name: 'busqueda_zonal',
                                hiddenName: 'busqueda_zonal',

                                anchor: '95%',
                                // store: storeZONA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Unidad',
                                id: 'busqueda_unidad_asignado',
                                name: 'busqueda_unidad_asignado',
                                hiddenName: 'busqueda_unidad_asignado',

                                anchor: '95%',
                                //store: storeOPREA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Oper. Tipo',
                                id: 'busqueda_tipo_operativo',
                                name: 'busqueda_tipo_operativo',
                                hiddenName: 'busqueda_tipo_operativo',

                                anchor: '95%',
                                //store: storeOPTIPO,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Estado',

                                id: 'busqueda_estado',
                                name: 'busqueda_estado',
                                hiddenName: 'busqueda_estado',


                                anchor: '95%',
                                //store: storeOPESTA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Func.operante',
                                id: 'busqueda_personal_asignado',
                                name: 'busqueda_personal_asignado',
                                hiddenName: 'busqueda_personal_asignado',

                                anchor: '95%',
                                // store: storeIPRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            }
                            /*{
                             xtype: 'combo',
                             fieldLabel: 'Oper. Finalizado',
                             id: 'busqueda_finalizado',
                             name: 'busqueda_finalizado',
                             hiddenName: 'busqueda_finalizado',
                             anchor: '95%',
                             store: storeSINO,
                             valueField: 'id',
                             displayField: 'nombre',
                             typeAhead: true,
                             triggerAction: 'all',
                             mode: 'local'
                             },*/

                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [

                            {
                                xtype: 'textfield',
                                fieldLabel: 'Informe',
                                id: 'busqueda_informe',
                                name: 'busqueda_informe',
                                anchor: '95%'
                            },
                            /*{   xtype: 'textfield',
                             fieldLabel: 'Punto Encuentro',
                             id: 'busqueda_punto_encuentro',
                             name: 'busqueda_punto_encuentro',
                             anchor: '95%'
                             },*/
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Observaciones',
                                id: 'busqueda_observaciones',
                                name: 'busqueda_observaciones',
                                anchor: '95%'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Elaborado por',
                                id: 'busqueda_elaborado_por',
                                name: 'busqueda_elaborado_por',
                                hiddenName: 'busqueda_elaborado_por',

                                anchor: '95%',
                                // store: storeIPRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Revisado por',
                                id: 'busqueda_revisado_por',
                                name: 'busqueda_revisado_por',
                                hiddenName: 'busqueda_revisado_por',

                                anchor: '95%',
                                // store: storeIPRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Aprobado por',
                                id: 'busqueda_aprobado_por',
                                name: 'busqueda_aprobado_por',
                                hiddenName: 'busqueda_aprobado_por',

                                anchor: '95%',
                                //  store: storeIPRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            }]
                    }
                ]
            });


            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeInstruccion;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeInstruccion;
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
                            key: 'id',
                            scope: this,
                            text: 'Código'
                        },
                        {
                            checked: true,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'id_zonal',
                            scope: this,
                            text: 'Zona'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'id_persona_encargada',
                            scope: this,
                            text: 'Responsable'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'punto_encuentro_planificado',
                            scope: this,
                            text: 'Punto encuentro'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'observaciones',
                            scope: this,
                            text: 'Observaciones'
                        }
                    ]
                })
                , text: 'Código'
            });

            win = desktop.createWindow({
                id: 'grid-win-instruccion',
                title: 'Instrucción - Gestión trámites ',
                width: winWidth,
                height: winHeight,
                iconCls: 'instruccion-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',

                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        {
                            autoScroll: true,
                            title: 'Planificación instruccion',
                            closable: true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addinstruccion,
                                    iconCls: 'save-icon',
                                    id: 'addinstruccion',
                                    disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteinstruccion,
                                    id: 'borraroperativo',
                                    iconCls: 'delete-icon',
                                    disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                    //disabled: true
                                },
                                '-',
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridData,
                                    scope: this,
                                    text: 'Recargar Datos',
                                    tooltip: 'Recargar datos'
                                },
                                '-',
                                {

                                    xtype: 'checkbox',
                                    boxLabel: 'Ver Todos',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: false,
                                    inputValue: '0',
                                    tooltip: 'Recargar datosadsfadsfa',
                                    //disabled: !acceso,
                                   // cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        storeInstruccion.baseParams.finalizados = isChecked;
                                        storeInstruccion.load();
                                    }
                                }, '-',
                                {
                                    id: 'tb_repoteInstruccion',
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteExpediente,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de los operativo',
                                    disabled: true
                                },
                                /*'-',
                                 {
                                 xtype: 'checkbox',
                                 boxLabel: 'Todo personal',
                                 id: 'checkTodoPersonal',
                                 name: 'noenviados',
                                 checked: false,
                                 inputValue: '0',
                                 tooltip: 'Recargar datos',
                                 disabled: !acceso,
                                 cls: 'barramenu',
                                 handler: function (checkbox, isChecked) {
                                 storeIPRD.load({params: {todos: isChecked}});
                                 }
                                 },*/
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storeInstruccion
                                })
                            ],
                            items: [
                                {
                                    id: 'formcabecerainstruccion',
                                    titleCollapse: true,
                                    flex: 1,
                                    autoScroll: true,
                                    layout: 'column',
                                    items: this.gridInstruccion,
                                },
                                {
                                    flex: 2,
                                    bodyStyle: 'padding:0; background: #DFE8F6',
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'tabpanel',
                                            activeTab: 0,
                                            width: winWidth,
                                            cls: 'no-border',
                                            items: [
                                                {
                                                    title: 'Proceso administrativo',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridInstruccionAcciones,
                                                    id: 'informesAccionesTab',
                                                    autoScroll: true,
                                                    disabled: false,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addAcciones,
                                                            id: 'addexpedientedetalleacciones',
                                                            iconCls: 'save-icon',
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteAcciones,
                                                            id: 'borrarexpedientedetalleacciones',
                                                            iconCls: 'delete-icon',
                                                            disabled: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            title: 'Actas',
                            closable: true,
                            layout: 'border',
                            id: 'actas',
                            disabled: accesosInspectores,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDenunciasActa,
                                    scope: this,
                                    text: 'Recargar Datos'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonImprimirActa,
                                    scope: this,
                                    text: 'Imprimir Acta',
                                    tooltip: 'Se reimprime el acta seleccionada.',
                                    id: 'tb_repoteActas',
                                    // disabled: !acceso
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
                                    items: this.gridInspeccionActa

                                },
                                // create instance immediately
                                {

                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                    margins: '0 0 0 0',
                                    items: this.gridInspeccionActaSimple
                                }
                            ]

                        },

                        {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled: this.app.isAllowedTo('accesosInstruccion', this.id) ? false : true,
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
                                    xtype: 'checkbox',
                                    boxLabel: 'Detalle retiros',
                                    id: 'checkDetalleRecibidos',
                                    name: 'detalleretiros',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de los retiros efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                }, '-',

                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporte,
                                    scope: this,
                                    text: 'Exportar listado',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                    scope: this,
                                    text: 'Exportar calendario  personas',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                }
                                ,
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioInstruccion,
                                    scope: this,
                                    text: 'Exportar calendario  instruccion',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 175,
                                    minSize: 100,
                                    maxSize: 170,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaDocumentos
                                },
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 270,
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

        function cargaDetalle(instruccion) {
            //forma = Ext.getCmp('formaDetalleExpediente');
            detalleExpediente.getForm().load({
                url: urlInstruccion + 'crudInstruccion.php?operation=selectForm',
                params: {
                    id: instruccion
                }
            });
        };

        setTimeout(function () {
            this.storeInstruccion.load({
                params: {
                    start: 0,
                    limit: limiteinstruccion,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue(),
                    accesosAdministradorOpe: accesosAdministradorOpe,
                    accesosInstruccion: accesosInstruccion
                }
            });
        }, 1800);
    },
    deleteinstruccion: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccion.remove(rows);
                }
            }
        });
    },
    addinstruccion: function () {
        var instruccion = new this.storeInstruccion.recordType({
            id_persona: ''
            , fecha_ingreso: (new Date())
            //, fecha_asignacion: (new Date())
            , clausura: false
            , reincidencia_predio: 0
            , reincidencia_administrado: 0
            , luae: false
            , trabajos_varios: false
            , construcciones: false
            , informe_otros: false

        });

        this.gridInstruccion.stopEditing();
        this.storeInstruccion.insert(0, instruccion);
        this.gridInstruccion.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeInstruccion.load();
    },

    deleteAcciones: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccionAcciones.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccionAcciones.remove(rows);
                }
            }
        });
    },
    addAcciones: function () {
        var vehiculos = new this.storeInstruccionAcciones.recordType({

            id_expediente: selectInstruccion,
            //           'id_persona': '',
            //'amc_expedientes_tipos'
            'estado': false,
            'sancion': false,
            'fecha': (new Date()),
            'num_resolucion': '',
            'observaciones': ''
        });


        this.gridInstruccionAcciones.stopEditing();
        this.storeInstruccionAcciones.insert(0, vehiculos);
        this.gridInstruccionAcciones.startEditing(0, 0);
    },

    botonExportarReporteExpediente: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo con el informe<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/instruccion/server/descargaInstruccionId.inc.php?operativo=' + selectInstruccion;
                    /*setTimeout(function () {
                     storeInstruccion.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
                     }, 1000);*/

                }
            }
        });
    },

// funcion usada por boton

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

    requestGridDataDocumentoReporte: function () {
        this.storeDocumentosReporte.baseParams = this.formConsultaDocumentos.getForm().getValues();

        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosInstruccion = this.app.isAllowedTo('accesosInstruccion', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);

        this.storeDocumentosReporte.baseParams.accesosAdministradorOpe = accesosAdministradorOpe;
        this.storeDocumentosReporte.baseParams.accesosInstruccion = accesosInstruccion;
        this.storeDocumentosReporte.baseParams.accesosAdministradorIns = accesosAdministradorIns;


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
                    generaRetiros = checkDetalleRecibidos
                    generaRetiros = (Ext.getCmp('checkDetalleRecibidos').getValue());
                    window.location.href = 'modules/desktop/instruccion/server/descargaReporteInstruccion.inc.php?param=' + valueParams + '&retiros=' + generaRetiros;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioPersonal: function () {
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
                    window.location.href = 'modules/desktop/instruccion/server/descargaReporteInstruccioncalendario.inc.php?param=' + valueParams;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioInstruccion: function () {
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
                    window.location.href = 'modules/desktop/instruccion/server/descargaReporteInstruccioncalendario2.inc.php?param=' + valueParams;
                }
            }
        });
    }
});