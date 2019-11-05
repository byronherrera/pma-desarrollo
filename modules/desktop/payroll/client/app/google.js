 var mapaGoogle; var geocoder; var marcadorGoogle;

function ini_marcadorGoogle() {
    geocoder = new google.maps.Geocoder();
    var rsformmapDiv226 = document.getElementById('contenedor_marcadorGoogle');
    mapaGoogle = new google.maps.Map(rsformmapDiv226, {
        center: new google.maps.LatLng(-0.1756096,-78.4761627),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
    });

    marcadorGoogle = new google.maps.Marker({
        map: mapaGoogle,
        position: new google.maps.LatLng(-0.1756096,-78.4761627),
        draggable: true
    });

    google.maps.event.addListener(marcadorGoogle, 'drag', function() {
        geocoder.geocode({'latLng': marcadorGoogle.getPosition()}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    document.getElementById('geoposicionamiento').innerHTML  = marcadorGoogle.getPosition().toUrlValue();
                }
            }
        });
    });
}
google.maps.event.addDomListener(window, 'load', ini_marcadorGoogle);