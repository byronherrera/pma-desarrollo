QoDesk.PersonalWindow = Ext.extend(Ext.app.Module, {
    id: 'personal',

    type: 'desktop/personal',

    init: function () {
        this.launcher = {
            text: 'Personal',
            iconCls: 'personal-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosPersonal = this.app.isAllowedTo('accesosPersonal', this.id);
        finalizados = true;
        limitepersonal = 100;
        this.selectPersonal = 0;
        selectPersonal = 0;

        var acceso = (accesosAdministradorOpe || accesosPersonal ) ? true : false


        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var winWidth = desktop.getWinWidth();
        var winHeight = desktop.getWinHeight();

        var win = desktop.getWindow('grid-win-personal');
        var urlPersonal = "modules/desktop/personal/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }
        function formatDateMin(value) {
            return value ? value.dateFormat('Y-m-d') : '';
        }

        function formatDateFull(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }

// inicio combos secretaria

        //inicio combo tipo documento  OPTID
        storeOPTID = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboOPTID = new Ext.ux.form.CheckboxCombo({
            width: 250,
            mode: 'local',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            allowBlank: false,
            listeners: {
                'change': function (cmb, arr) {
                }
            }
        });

        var comboOPTIDSimple = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalTipoPersonalSimple(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }

        var comboOPTIDSimple2 = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalTipoPersonalSimple2(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }

        function personalTipoPersonal(id) {
            if (id === '') return '';
            var nombres = id.split(",");
            retorno = '';
            for (var i = 0; i < nombres.length; i++) {
                index = storeOPTID.findExact('id', nombres[i]);
                var record = storeOPTID.getAt(index);
                if (typeof record !== 'undefined') {
                    retorno = record.data.nombre + ',' + retorno
                }
            }
            return retorno
        }

        //fin combo tipo documento  OPTID
        //inicio combo tipo MEDIDA personal
        storeOPINFOMEDIDA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposMedidasPersonal'
        });

        var comboOPINFOMEDIDA = new Ext.form.ComboBox({
            id: 'comboOPINFOMEDIDA',
            store: storeOPINFOMEDIDA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalTipoMedida(id) {
            var index = storeOPINFOMEDIDA.findExact('id', id);
            if (index > -1) {
                var record = storeOPINFOMEDIDA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel MEDIDA OPERATIVO
        //inicio combo activo
        storePEOFAC = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": '1', "nombre": "Si"},
                    {"id": '0', "nombre": "No"}
                ]
            }
        });

        var comboPEOFAC = new Ext.form.ComboBox({
            id: 'comboOPOFAC',
            store: storePEOFAC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalActivo(id) {
            var index = storePEOFAC.findExact('id', id);
            if (index > -1) {
                var record = storePEOFAC.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo activo

        //inicio combo nivel complejidad
        storeOPNICO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": '1', "nombre": "Alto"},
                    {"id": '2', "nombre": "Medio"},
                    {"id": '3', "nombre": "Bajo"}
                ]
            }
        });

        var comboOPNICO = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPNICO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalNivelComplejidad(id) {
            var index = storeOPNICO.findExact('id', id);
            if (index > -1) {
                var record = storeOPNICO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo tipo personal
        storeOPTIPO = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tipospersonal'
        });

        var comboOPTIPO = new Ext.form.ComboBox({
            id: 'comboOPTIPO',
            store: storeOPTIPO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalTipo(id) {
            var index = storeOPTIPO.findExact('id', id);
            if (index > -1) {
                var record = storeOPTIPO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo tipo personal
        storeOPENTT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposentidades'
        });

        var comboOPENTT = new Ext.form.ComboBox({
            id: 'comboOPENTT',
            store: storeOPENTT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function entidadesTipo(id) {
            var index = storeOPENTT.findExact('id', id);
            if (index > -1) {
                var record = storeOPENTT.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo Unidades
        storeOPREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre', 'orden'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadespersonal',
            remoteSort: true, //true for server sorting
            sorters: [{
                property: 'orden',
                direction: 'ASC' // or 'ASC'
            }],
        });

        storeOPREA.sort('orden', 'ASC');
        var comboOPREA = new Ext.form.ComboBox({
            id: 'comboOPREA',
            store: storeOPREA,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        function personalUnidades(id) {
            var index = storeOPREA.findExact('id', id);
            if (index > -1) {
                var record = storeOPREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }

        //fin combo reasignacion OPREA


        //inicio combo reasignacion  OPREATOT
        storeOPREATOT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadestotal'
        });

        var comboOPREATOT = new Ext.form.ComboBox({
            id: 'comboOPREATOT',
            store: storeOPREATOT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoOPREATOTsignacion(id) {
            var index = storeOPREATOT.findExact('id', id);
            var record = storeOPREATOT.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion OPREATOT
        //inicio combo personal estado
        storeOPESTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalestados'
        });

        var comboOPESTA = new Ext.form.ComboBox({
            id: 'comboOPESTA',
            store: storeOPESTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personalEstados(id) {
            var index = storeOPESTA.findExact('id', id);
            if (index > -1) {
                var record = storeOPESTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo personal estado
        //inicio combo guia  OPREAGUIA
        storeOPREAGUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=guia'
        });

        var comboOPREAGUIA = new Ext.form.ComboBox({
            id: 'comboOPREAGUIA',
            store: storeOPREAGUIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoOPREAGUIAS(id) {
            var index = storeOPREAGUIA.findExact('id', id);
            var record = storeOPREAGUIA.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion OPREAGUIA

        //inicio combo tipo documento  OPPERENC
        storeOPPERENC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalpersonal',
            baseParams: {
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosPersonal: accesosPersonal,
                acceso: acceso
            }
        });

        var comboOPPERENC = new Ext.ux.form.CheckboxCombo({
            width: 250,
            mode: 'local',
            store: storeOPPERENC,
            valueField: 'id',
            displayField: 'nombre',
            allowBlank: false,
            listeners: {
                'change': function (cmb, arr) {
                }
            }
        });

        function personalPersonalEncargado(id) {

            if (id === '') return ' ';
            if (id === null) return ' ';
            var nombres = id.split(",");
            retorno = '';

            for (var i = 0; i < nombres.length; i++) {
                index = storeOPPERENC.findExact('id', nombres[i]);
                var record = storeOPPERENC.getAt(index);
                if (typeof record !== 'undefined') {
                    retorno = record.data.nombre + ',' + retorno
                }
            }
            return retorno
        }

        //fin combo tipo documento  OPPERENC


        //inicio combo persona recepta la personal PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalpersonal',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosPersonal: accesosPersonal,
                acceso: acceso
            }

        });

        var comboPRD = new Ext.form.ComboBox({
            id: 'comboPRD',
            store: storePRD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        var comboPRD2 = new Ext.form.ComboBox({
            id: 'comboPRD2',
            store: storePRD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaDenuncia(id) {
            var index = storePRD.findExact('id', id);
            if (index > -1) {
                var record = storePRD.getAt(index);
                return record.get('nombre');
            }
        }

        storePRD2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalpersonal',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: true,
                accesosPersonal: false,
                acceso: acceso
            }

        });

        var comboPRD2 = new Ext.form.ComboBox({
            id: 'comboPRD2',
            store: storePRD2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaDenuncia2(id) {
            var index = storePRD2.findExact('id', id);
            if (index > -1) {
                var record = storePRD2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la personal PRD

// fin combos secretaria

// inicio combos personal

        //inicio combo ZONA
        storeZONA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboZONA = new Ext.form.ComboBox({
            id: 'comboZONA',
            store: storeZONA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function zonaAdm(id) {
            var index = storeZONA.findExact('id', id);
            if (index > -1) {
                var record = storeZONA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ZONA

        //inicio combo actividad  ACTA
        storeACTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=depPersonal'
        });

        var comboACTA = new Ext.form.ComboBox({
            id: 'comboACTA',
            store: storeACTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function actividadAdm(id) {
            var index = storeACTA.findExact('id', id);
            if (index > -1) {
                var record = storeACTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo actividad  ACTA
        storeSINO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 'false', "nombre": "NO"},
                    {"id": 'true', "nombre": "SI"}
                ]
            }
        });
        //inicio combo Estado Recepcion Información Personal ESOPREA
        storeESOPREA = new Ext.data.JsonStore({
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

        var comboESOPREA = new Ext.form.ComboBox({
            id: 'comboESOPREA',
            store: storeESOPREA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRecepcionAdm(id) {
            var index = storeESOPREA.findExact('id', id);
            if (index > -1) {
                var record = storeESOPREA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Estado Recepcion Información Personal ESOPREA

        //inicio combo procedimientos PRSA
        storePRSA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=procedimiento'
        });

        var comboPRSA = new Ext.form.ComboBox({
            id: 'comboPRSA',
            store: storePRSA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function procedimientosAdm(id) {
            var index = storePRSA.findExact('id', id);
            if (index > -1) {
                var record = storePRSA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo procedimientos PRSA

        //inicio combo persona asignada PRASA
        storePRASA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalpersonal'
        });

        var comboPRASA = new Ext.form.ComboBox({
            id: 'comboPRASA',
            store: storePRASA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personaAsignadaAdm(id) {
            var index = storePRASA.findExact('id', id);
            if (index > -1) {
                var record = storePRASA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite PRASA
// inicio combos personal

// inicio pestañas de mantenimiento


// fin pestañas de mantenimiento

        // inicio ventana personal
        var proxyPersonal = new Ext.data.HttpProxy({
            api: {
                create: urlPersonal + "crudPersonal.php?operation=insert",
                read: urlPersonal + "crudPersonal.php?operation=select",
                update: urlPersonal + "crudPersonal.php?operation=update",
                destroy: urlPersonal + "crudPersonal.php?operation=delete"
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

        var readerPersonal = new Ext.data.JsonReader({
            totalProperty: 'total',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'apellidos', allowBlank: false},
                {name: 'nombres', allowBlank: false},
                {name: 'partida', allowBlank: true},
                {name: 'rol', allowBlank: true},
                {name: 'denominacion', allowBlank: true},
                {name: 'grado', allowBlank: true},
                {name: 'regimen', allowBlank: true},
                {name: 'modalidad', allowBlank: true},
                {name: 'rmu', allowBlank: true},
                {name: 'unidad', allowBlank: true},
                {name: 'id_zonal', allowBlank: true},
                {name: 'telefono_institucional', allowBlank: true},
                {name: 'extencion', allowBlank: true},
                {name: 'piso', allowBlank: true},
                {name: 'id_estado', allowBlank: true},
                {name: 'observaciones', allowBlank: true},

                {name: 'email', allowBlank: true},

                {name: 'fecha_salida', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha_entrada', type: 'date', dateFormat: 'c', allowBlank: true},

                {name: 'telefono1', allowBlank: true},
                {name: 'telefono2', allowBlank: true},
                {name: 'direccionprincipal', allowBlank: true},
                {name: 'direccionsecundaria', allowBlank: true},
                {name: 'direccionnumero', allowBlank: true},
                {name: 'parroquia', allowBlank: true},
                {name: 'barrio', allowBlank: true},
                {name: 'recorrido', allowBlank: true},
                {name: 'geoposicionamiento', allowBlank: true},

                {name: 'fecha_nacimiento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'cargas_familiares', allowBlank: true},
                {name: 'discapacidades', allowBlank: true},
                {name: 'enfermedades', allowBlank: true},
            ],
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data'
        });
        var writerPersonal = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storePersonal = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonal,
            reader: readerPersonal,
            writer: writerPersonal,
            autoSave: acceso,
            remoteSort: true,
            baseParams: {
                finalizados: finalizados,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosPersonal: accesosPersonal,
                acceso: acceso
            }
        });
        storePersonal = this.storePersonal;

        this.gridPersonal = new Ext.grid.EditorGridPanel({
            //autoHeight: true,
            height: winHeight - 92,
            autoScroll: true,
            store: this.storePersonal,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Id', dataIndex: 'id', sortable: true, width: 45},
                {
                    header: 'Activo',
                    dataIndex: 'id_estado',
                    sortable: true,
                    width: 45,
                    align: 'center',
                    editor: comboPEOFAC,
                    renderer: personalActivo
                },
                {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 90, editor: textField},
                {header: 'Apellidos', dataIndex: 'apellidos', sortable: true, width: 140, editor: textField},
                {header: 'Nombres', dataIndex: 'nombres', sortable: true, width: 140, editor: textField},
                {
                    header: 'Extensión',
                    dataIndex: 'extencion',
                    sortable: true,
                    width: 80,
                    editor: textField,
                    align: 'right'
                },
                {header: 'Partida', dataIndex: 'partida', sortable: true, width: 60, editor: textField, align: 'right'},
                {header: 'Rol', dataIndex: 'rol', sortable: true, width: 240, editor: textField},
                {header: 'Grado Ocupacional', dataIndex: 'denominacion', sortable: true, width: 200, editor: textField},
                {header: 'Grado', dataIndex: 'grado', sortable: true, width: 60, editor: textField, align: 'right'},

                {header: 'Régimen', dataIndex: 'regimen', sortable: true, width: 200, editor: textField},
                {header: 'Modalidad', dataIndex: 'modalidad', sortable: true, width: 200, editor: textField},
                {
                    header: 'rmu',
                    dataIndex: 'rmu',
                    sortable: true,
                    width: 90,
                    editor: textField,
                    renderer: 'usMoney',
                    align: 'right'
                },
                {
                    header: 'Unidad', dataIndex: 'unidad', sortable: true, width: 200, editor: comboOPREA,
                    renderer: personalUnidades
                },
                {
                    header: 'Zonal',
                    dataIndex: 'id_zonal',
                    sortable: true,
                    width: 120,
                    editor: comboZONA,
                    renderer: zonaAdm,
                    align: 'left'
                },
                {
                    header: 'Teléfono institucional',
                    dataIndex: 'telefono_institucional',
                    sortable: true,
                    width: 80,
                    editor: textField,
                    align: 'right'
                },


                {header: 'Email', dataIndex: 'email', sortable: true, width: 140, editor: textField},
                {header: 'Piso', dataIndex: 'piso', sortable: true, width: 140, editor: textField},
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 280,
                    editor: textField
                },{
                    header: 'Fecha salida',
                    dataIndex: 'fecha_salida',
                    sortable: true,
                    width: 100,
                    renderer: formatDateMin,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: ''
                    })
                },{
                    header: 'Fecha entrada',
                    dataIndex: 'fecha_entrada',
                    sortable: true,
                    width: 100,
                    renderer: formatDateMin,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: ''
                    })
                },



                {header: 'Teléfono 1', dataIndex: 'telefono1', sortable: true, width: 140, editor: textField},
                {header: 'Teléfono 2', dataIndex: 'telefono2', sortable: true, width: 140, editor: textField},
                {header: 'Direccion principal', dataIndex: 'direccionprincipal', sortable: true, width: 140, editor: textField},
                {header: 'Direccion secundaria', dataIndex: 'direccionsecundaria', sortable: true, width: 140, editor: textField},
                {header: 'Direccion número', dataIndex: 'direccionnumero', sortable: true, width: 140, editor: textField},
                {header: 'Parroquia', dataIndex: 'parroquia', sortable: true, width: 140, editor: textField},
                {header: 'Barrio', dataIndex: 'barrio', sortable: true, width: 140, editor: textField},
                {header: 'Recorrido', dataIndex: 'recorrido', sortable: true, width: 140, editor: textField},
                {
                    header: 'Fecha nacimiento',
                    dataIndex: 'fecha_nacimiento',
                    sortable: true,
                    width: 100,
                    renderer: formatDateMin,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: ''
                    })
                },
                {header: 'Cargas familiares', dataIndex: 'cargas_familiares', sortable: true, width: 200, editor: textField},
                {header: 'Discapacidades', dataIndex: 'discapacidades', sortable: true, width: 200, editor: textField},
                {header: 'Enfermedades', dataIndex: 'enfermedades', sortable: true, width: 200, editor: textField},

                {header: 'Geoposicionamiento', dataIndex: 'geoposicionamiento',  width: 140,editor: textField,
                    renderer: function (value) {
                        return '<a href="https://www.google.com/maps?q='+ value+'" target="_blank">'+value+'</a> ';
                    }
                    },

            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {

                    // registros que estan en planificacion
                    if (record.get('id_estado') == 1) {
                        return 'gold';
                    }
                    // registros que ya estan realizados
                    if (record.get('id_estado') == 0) {
                        return 'bluestate';
                    }
                }
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {
                            // recuperamos la informacion de personal asignado a ese personal
                            selectPersonal = rec.id;
                            //maestro detalle llamadas
                            //storePersonalParticipantes.load({params: {id_personal: rec.id}});
                            //storePersonalImagenes.load({params: {id_personal: rec.id}});

                            // para el caso que el personal se haya finalizado se bloquea ya el borrar o editar
                            if (acceso) {
                                //para el caso que se es administrador
                                if (accesosAdministradorOpe) {
                                    // Ext.getCmp('savedetallepersonal').setDisabled(false);
                                }
                            }
                        }
                    }
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitepersonal,
                store: storePersonal,
                displayInfo: true,
                displayMsg: 'Mostrando personal {0} - {1} de {2} - AMC',
                emptyMsg: "No existen personal que mostrar"
            }),

            listeners: {
                beforeedit: function (e) {
                    // si el personal esta identificado como estado o planificado (1) o informe (4) se peude editar
                    /*  if (acceso) {
                        if ((e.record.get("id_estado") == 1) || (e.record.get("id_estado") == 4)) {
                            return true;
                        }
                        return false;
                    } else {
                        return false;
                    }*/
                }
            }
        });
        // fin ventana personal


        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyPersonal,
            reader: readerPersonal,
            writer: writerPersonal,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
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
                    renderer: personalTipoPersonal
                },
                {
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 30,
                    renderer: personalNivelComplejidad
                },
                {
                    header: 'Zonal',
                    dataIndex: 'id_zonal',
                    sortable: true,
                    width: 40,
                    renderer: zonaAdm
                },
                {
                    header: 'Responsable',
                    dataIndex: 'id_persona_encargada',
                    sortable: true,
                    width: 40,
                    renderer: personalPersonalEncargado
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
                    renderer: personaReceptaDenuncia
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
                    , dataIndex: 'tipo_personal'
                    , align: 'center'
                    , sortable: true
                    , width: 30
                    //,hidden: true
                    , renderer: personalTipo
                },
                /* {
                 header: 'Fallido'
                 , dataIndex: 'fallido'
                 , align: 'center'
                 , falseText: 'No'
                 , menuDisabled: true
                 , trueText: 'Si'
                 , sortable: true
                 , width: 25
                 , xtype: 'booleancolumn'
                 },*/
                /*{
                 header: 'Finalizado'
                 , dataIndex: 'finalizado'
                 , align: 'center'
                 , falseText: 'No'
                 , menuDisabled: true
                 , trueText: 'Si'
                 , sortable: true
                 , width: 25
                 , xtype: 'booleancolumn'
                 }*/
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
                displayMsg: 'Mostrando personal {0} - {1} de {2}  >>',
                emptyMsg: "No existen personal que mostrar"
            }),
        });
        // fin datastore and datagrid in Guia


        var win = desktop.getWindow('layout-win');

        if (!win) {


            this.seleccionDepar = 3;

            this.formConsultaDocumentos = new Ext.FormPanel({
                layout: 'column',
                // title: 'Ingrese los parámetros',
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
                                store: storeOPTID,
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
                                store: storeOPNICO,
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
                                store: storePRD,
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
                                store: storeZONA,
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
                                store: storeOPREA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Oper. Tipo',
                                id: 'busqueda_tipo_personal',
                                name: 'busqueda_tipo_personal',
                                hiddenName: 'busqueda_tipo_personal',

                                anchor: '95%',
                                store: storeOPTIPO,
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
                                store: storeOPESTA,
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
                                store: storePRD,
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
                                store: storePRD,
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
                                store: storePRD,
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
                                store: storePRD,
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
                    var store = this.storePersonal;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storePersonal;
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
                            key: 'apellidos',
                            scope: this,
                            text: 'Apellidos'
                        },
                        {
                            checked: true,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'cedula',
                            scope: this,
                            text: 'Cédula'
                        },

                        {
                            checked: true,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'unidad',
                            scope: this,
                            text: 'Unidad'
                        },
                        {
                            checked: true,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'modalidad',
                            scope: this,
                            text: 'Modalidad'
                        }
                    ]
                })
                , text: 'Apellidos'
            });

            win = desktop.createWindow({
                id: 'grid-win-personal',
                title: 'Talento Humano - Distributivo Personal',
                width: winWidth,
                height: winHeight,
                iconCls: 'personal-icon',
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
                            title: 'Listado personal',
                            closable: true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addpersonal,
                                    iconCls: 'save-icon',
                                    id: 'addpersonal',
                                    disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deletepersonal,
                                    id: 'borrarpersonal',
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
                                    boxLabel: 'Personal activo',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: true,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        storePersonal.baseParams.finalizados = isChecked;
                                        storePersonal.load();
                                    }
                                }, '-',
                                {
                                    id: 'tb_repotePersonal',
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReportePersonal,
                                    scope: this,
                                    text: 'Generar Distributivo personal',
                                    tooltip: 'Se genera el distributivo de personal',
                                    disabled: false
                                },
                                 '-',
                                {
                                    id: 'tb_repotePersonalTodo',
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReportePersonalTodo,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte con todos los campos',
                                    disabled: false
                                },
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storePersonal
                                })
                            ],
                            items: this.gridPersonal,
                        }
                        , {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled:true,
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
                                    disabled: !acceso,
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                    scope: this,
                                    text: 'Exportar calendario  personas',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    disabled: !acceso,
                                }
                                ,
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                    scope: this,
                                    text: 'Exportar calendario  personal',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    disabled: !acceso,
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
                                    split: true,
                                    height: 270,
                                    minSize: 100,
                                    maxSize: 150,
                                    region: 'center',
                                    autoEl: {
                                        id: 'iframemap',
                                        tag: 'iframe',
                                        style: 'height: 360px; width: 100%; border: none',
                                        src: 'http://localhost:8080/mapaRecorrido.html'
                                        //src: 'http://agenciadecontrol.quito.gob.ec/mapaPersonal.html'
                                    },
                                    id: 'data_export_iframe'
                                }
                            ]

                        }

                    ]
                })
            });
        }
        win.show();
        function cargaDetalle(personal) {
            //forma = Ext.getCmp('formaDetallePersonal');
            detallePersonal.getForm().load({
                url: urlPersonal + 'crudPersonal.php?operation=selectForm',
                params: {
                    id: personal
                }
            });
        };

        setTimeout(function () {
            this.storePersonal.load({
                params: {
                    start: 0,
                    limit: limitepersonal,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue(),
                    accesosAdministradorOpe: accesosAdministradorOpe,
                    accesosPersonal: accesosPersonal
                }
            });
        }, 600);
    },
    deletepersonal: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridPersonal.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storePersonal.remove(rows);
                }
            }
        });
    },
    addpersonal: function () {
        var personal = new this.storePersonal.recordType({
            id_persona: '-',
            id: ' ',
            visible: '',
            id_tipo_control: '',
            id_nivel_complejidad: ' ',
            observaciones: ' ',
            punto_encuentro_planificado: ' ',
            id_zonal: 0,
            rmu: 0,
            unidad: 0,
            tipo_personal: '1',
            id_persona_encargada: ' ',
            fecha_entrada: (new Date()),

            id_estado: 1
        });
        this.gridPersonal.stopEditing();
        this.storePersonal.insert(0, personal);
        this.gridPersonal.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storePersonal.load();
    },


    botonExportarReportePersonal: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo con el informe<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/personal/server/descargaPersonalId.inc.php?personal=' + selectPersonal;
                }
            }
        });
    },
    botonExportarReportePersonalTodo: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo con el informe<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/personal/server/descargaPersonalTodo.php?personal=' + selectPersonal;
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
        this.storeDocumentosReporte.baseParams = this.formConsultaDocumentos.getForm().getValues();

        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosPersonal = this.app.isAllowedTo('accesosPersonal', this.id);

        this.storeDocumentosReporte.baseParams.accesosAdministradorOpe = accesosAdministradorOpe;
        this.storeDocumentosReporte.baseParams.accesosPersonal = accesosPersonal;

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
                    window.location.href = 'modules/desktop/personal/server/descargaReportePersonal.inc.php?param=' + valueParams;
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
                    window.location.href = 'modules/desktop/personal/server/descargaReportePersonalcalendario.inc.php?param=' + valueParams;
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
                    window.location.href = 'modules/desktop/personal/server/descargaReportePersonalcalendario2.inc.php?param=' + valueParams;
                }
            }
        });
    }
});