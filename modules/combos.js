
        //inicio combo Unidades
        storeOPREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre', 'orden'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadessinfiltro',
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

        function instruccionUnidades(id) {
            var index = storeOPREA.findExact('id', id);
            if (index > -1) {
                var record = storeOPREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }

        //fin combo reasignacion OPREA


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

        function instruccionTipoInstruccionSimple(id) {
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

        function instruccionTipoInstruccionSimple2(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }


        function instruccionTipoInstruccion(id) {
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


        //inicio combo tipo TIPO ACCION operativo
        storeOPTIPOACC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposAccioInstruccion'
        });

        var comboOPTIPOACC = new Ext.form.ComboBox({
            id: 'comboOPTIPOACC',
            store: storeOPTIPOACC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionTipoAccion(id) {
            var index = storeOPTIPOACC.findExact('id', id);
            if (index > -1) {
                var record = storeOPTIPOACC.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo TIPO ACCION operativo

        //inicio combo tipo MEDIDA operativo
        storeOPINFOMEDIDA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposMedidasInstruccion'
        });

        var comboOPINFOMEDIDA = new Ext.form.ComboBox({
            id: 'comboOPINFOMEDIDA',
            store: storeOPINFOMEDIDA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionTipoMedida(id) {
            var index = storeOPINFOMEDIDA.findExact('id', id);
            if (index > -1) {
                var record = storeOPINFOMEDIDA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel MEDIDA OPERATIVO



        //inicio combo tipo operativo
        storeOPTIPO = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposinstruccion'
        });

        var comboOPTIPO = new Ext.form.ComboBox({
            id: 'comboOPTIPO',
            store: storeOPTIPO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionTipo(id) {
            var index = storeOPTIPO.findExact('id', id);
            if (index > -1) {
                var record = storeOPTIPO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad


        //inicio combo tipo operativo
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



        //inicio combo instruccion estado
        storeOPESTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=instruccionestados'
        });

        var comboOPESTA = new Ext.form.ComboBox({
            id: 'comboOPESTA',
            store: storeOPESTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionEstados(id) {
            var index = storeOPESTA.findExact('id', id);
            if (index > -1) {
                var record = storeOPESTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo instruccion estado

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
            url: 'modules/common/combos/combos.php?tipo=depInstruccion'
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


        ///////
        // llamada a personal
        ///

        //inicio combo persona asignada PRASA
        storePRASA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion'
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


        //inicio combo persona recepta la instruccion IPRD
        storeIPRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosInstruccion: accesosInstruccion,
                acceso: acceso
            }

        });


        var comboIPRD = new Ext.form.ComboBox({
            id: 'comboIPRD',
            store: storeIPRD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        var comboIPRD2 = new Ext.form.ComboBox({
            id: 'comboIPRD2',
            store: storeIPRD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaDenuncia(id) {
            var index = storeIPRD.findExact('id', id);
            if (index > -1) {
                var record = storeIPRD.getAt(index);
                return record.get('nombre');
            }
        }

        storeIPRD2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: true,
                accesosInstruccion: false,
                acceso: acceso
            }

        });

        var comboIPRD2 = new Ext.form.ComboBox({
            id: 'comboIPRD2',
            store: storeIPRD2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaDenuncia2(id) {
            //var index = storeIPRD2.findExact('id', id);
            var index = storeIPRD2.findExact('id', id);
            if (index > -1) {
                var record = storeIPRD2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la instruccion IPRD

        //inicio combo tipo documento  OPPERENC
        storeOPPERENC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion',
            baseParams: {
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosInstruccion: accesosInstruccion,
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

        function instruccionPersonalEncargado(id) {

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



        // combos simples
        // inicio combos secretaria

        //inicio combo activo
        storeOPOFAC = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'true', "nombre": "Si"},
                    {"id": 'false', "nombre": "No"}
                ]
            }
        });

        var comboOPOFAC = new Ext.form.ComboBox({
            id: 'comboOPOFAC',
            store: storeOPOFAC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionDespachadoActivo(id) {
            var index = storeOPOFAC.findExact('id', id);
            if (index > -1) {
                var record = storeOPOFAC.getAt(index);
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

        function instruccionNivelComplejidad(id) {
            var index = storeOPNICO.findExact('id', id);
            if (index > -1) {
                var record = storeOPNICO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad


        // fin combos secretaria

        // inicio combos instruccion


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
        //inicio combo Estado Recepcion Información Instruccion ESOPREA
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

        var comboESOPREA = new Ext.form.  ({
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

        //fin combo Estado Recepcion Información Instruccion ESOPREA

        //inicio combo estado retiros operativo ESREOP
        storeESREOP = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "Perecible", "nombre": "Perecible"},
                    {"id": "No perecible", "nombre": "No perecible"},
                    {"id": "Vehículos", "nombre": "Vehículos"},
                    {"id": "Otros", "nombre": "Otros"}
                ]
            }
        });

        var comboESREOP = new Ext.form.ComboBox({
            id: 'comboESREOP',
            store: storeESREOP,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRetirosAdm(id) {
            return id;
        }

        //fin combo Estado Recepcion Información Instruccion ESREOP

        //inicio combo Estado Recepcion Expediente Instruccion ESTEXP
        storeESTEXP = new Ext.data.JsonStore({
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

        var comboESTEXP = new Ext.form.  ({
            id: 'comboESTEXP',
            store: storeESTEXP,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRecepcionAdm(id) {
            var index = storeESTEXP.findExact('id', id);
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
                    {"id": 0, "nombre": "Sin información"},
                    {"id": 1, "nombre": "Conforme"},
                    {"id": 2, "nombre": "Inconforme"}
                ]
            }
        });

        var comboANILUAIN = new Ext.form.  ({
            id: 'comboANILUAIN',
            store: storeANILUAIN,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function aniosluaeInstruccion(id) {
            var index = storeANILUAIN.findExact('id', id);
            if (index > -1) {
                var record = storeANILUAIN.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo años luae ANILUAIN
        CATEGORIA (I)
        CATEGORIA (II)
        CATEGORIA (III)
        C. DESCONCIDA

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

        var comboCATINTR = new Ext.form.  ({
            id: 'comboCATINTR',
            store: storeCATINTR,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function categoriaInstruccion(id) {
            var index = storeCATINTR.findExact('id', id);
            if (index > -1) {
                var record = storeCATINTR.getAt(index);
                return record.get('nombre');
            }
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
                    {"id": '2', "nombre": "RETIRO DE BIENESD"}
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

        function instruccionDespachadoActivo(id) {
            var index = storeINSTRMED.find('id', id);
            if (index > -1) {
                var record = storeINSTRMED.getAt(index);
                return record.get('nombre');
            }
        }

        //fin  combo instruccion medida cautelar INSTRMED

        //inicio combo instruccion tipo expedientes  INSTIEXP
        storeINSTIEXP = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposexpedientes'
        });

        var comboINSTIEXP = new Ext.form.ComboBox({
            id: 'comboINSPRFULA',
            //store: storeINSPRFULA,
            store: storeINSTIEXP,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionTiposExpedientes(id) {
            var index = storeINSTIEXP.findExact('id', id);
            if (index > -1) {
                var record = storeINSTIEXP.getAt(index);
                return record.get('nombre');
            }
        }

        //inicio combo ordenanzas  INSTIEXP
