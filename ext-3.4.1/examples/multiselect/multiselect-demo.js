/*
 This file is part of Ext JS 3.4

 Copyright (c) 2011-2013 Sencha Inc

 Contact:  http://www.sencha.com/contact

 Commercial Usage
 Licensees holding valid commercial licenses may use this file in accordance with the Commercial
 Software License Agreement provided with the Software or, alternatively, in accordance with the
 terms contained in a written agreement between you and Sencha.

 If you are unsure which license is appropriate for your use, please contact the sales department
 at http://www.sencha.com/contact.

 Build date: 2013-04-03 15:07:25
 */
Ext.onReady(function () {

    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';

    /*
     * Ext.ux.form.MultiSelect Example Code
     */

    //inicio combo procedimientos PRSI
    var storePRSI = new Ext.data.JsonStore({
        fields: ['id', 'nombre'],
        autoLoad: true,
        data:
            [  {"id": 1, "nombre": "Construcciones ilegales, sin permiso y/o sin medida de seguridad"},
                {"id": 2, "nombre": "Ocupación de espacio público equipos, materiales y/o escombros"},
                {"id": 3, "nombre": "Excavar creando inestabilidad o riesgo a predios colindantes"},
                {"id": 4, "nombre": "Edificar sin respetar retiros determinados en la zonificación respectiva"},
                {"id": 5, "nombre": "Adosar sin contar con autorización de terceros"},
                {
                    "id": 6,
                    "nombre": "Realizar adecuaciones y/o remodelaciones sin permisos (LMU 20Simplificada, máximo 42m2)"
                },
                {
                    "id": 7,
                    "nombre": "Locales comerciales sin licenciamiento (LUAE, licencia única de actividad económica)"
                },
                {"id": 8, "nombre": "Uso indebido y/o daños al espacio público"},
                {"id": 9, "nombre": "Venta y consumo de bebidas alcohólicas en el espacio público"},
                {
                    "id": 10,
                    "nombre": "Mal mantenimiento de fachadas/Terrenos baldíos sin cerramientos/ Terrenos baldíos sin sanear"
                },
                {"id": 11, "nombre": "Sacar la basura fuera de horarios establecidos por el municipio"},
                {"id": 12, "nombre": "Maltrato y/o mala tenencia de mascotas"},
                {"id": 13, "nombre": "Mordedura y/o ataque de perros agresivos"},
                {"id": 14, "nombre": "Criaderos de aves de corral, chancheras y/o animales de pastoreo"},
                {"id": 15, "nombre": "Publicidad exterior silos debidos permisos"},
                {"id": 16, "nombre": "Instalación de antenas y/o bases celulares sin permisos"},
                {"id": 17, "nombre": "Escombros y/o basura en quebradas"},
                {"id": 18, "nombre": "Contaminación excesiva auditiva producida por actividad comercial"}
        ]
    });


    var msForm = new Ext.form.FormPanel({
        title: 'MultiSelect Test',
        width: 700,
        bodyStyle: 'padding:10px;',
        renderTo: 'multiselect',
        items: [{
            xtype: 'multiselect',
            fieldLabel: 'Multiselect<br />(Required)',
            name: 'multiselect',
            width: 250,
            height: 200,
            allowBlank: false,
            store: storePRSI,
            displayField: 'nombre',
            valueField: 'id',
            tbar: [{
                text: 'clear',
                handler: function () {
                    msForm.getForm().findField('multiselect').reset();
                }
            }],
            ddReorder: true
        }],
        tbar: [{
            text: 'Options',
            menu: [{
                text: 'Set Value (2,3)',
                handler: function () {
                    msForm.getForm().findField('multiselect').setValue('2,3');
                }
            }
            ]
        }],

        buttons: [{
            text: 'Save',
            handler: function () {
                if (msForm.getForm().isValid()) {
                    Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />' +
                        msForm.getForm().getValues(true));
                }
            }
        }]
    });


});
