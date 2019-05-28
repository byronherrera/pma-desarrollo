Ext.onReady(function(){
  /*  var fbutton = new Ext.ux.form.FileUploadField({
        renderTo: 'fi-button',
        buttonOnly: true,
        listeners: {
            'fileselected': function(fb, v){
                var el = Ext.fly('fi-button-msg');
                el.update('<b>Selected:</b> '+v);
                if(!el.isVisible()){
                    el.slideIn('t', {
                        duration: .2,
                        easing: 'easeIn',
                        callback: function(){
                            el.highlight();
                        }
                    });
                }else{
                    el.highlight();
                }
            }
        }
    });*/

    var fbutton = new Ext.ux.form.FileUploadField({
        renderTo: 'fi-button',
        buttonOnly: true,
        listeners: {
            'fileselected': function(fb, v){
                var el = Ext.fly('fi-button-msg');
                el.update('<b>Selected:</b> '+v);
                if(!el.isVisible()){
                    el.slideIn('t', {
                        duration: .2,
                        easing: 'easeIn',
                        callback: function(){
                            el.highlight();
                        }
                    });
                }else{
                    el.highlight();
                }
            }
        }
    });

    var fbutton = new Ext.ux.form.FileUploadField({

        buttonOnly: true,

    });

});