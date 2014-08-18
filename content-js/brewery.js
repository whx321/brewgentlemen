var map = null;

$( document ).ready(function() {
	console.log("BREWERY JS HERE");

	//if we start on the brewery page we must setup the map
	if (window.location.hash.replace("#","") === "brewery") {
		setupMap();
	}
});

function setupMap() {
	var marker;

    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(40.410, -79.870340),//40.408
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    if (map == null) {
    	map = new google.maps.Map(document.getElementById('brewery-map'), mapOptions);
	    var contentString = '<div class="marker-box"><div class="marker-title"><strong>The Brew Gentlemen Beer Company</strong></div><div class="marker-address">512 Braddock Ave<br />Braddock, PA 15104<br />412.871.5075</div><div class="marker-footer"><a href="http://goo.gl/lW8xvZ" target="_blank">View in larger map</a></div></div>';

	    var infoWindow = new google.maps.InfoWindow({
	        content: contentString
	    });

	    marker = new google.maps.Marker({
	        position: new google.maps.LatLng(40.404331, -79.870340),
	        map: map,
	        title: 'The brew Gentlemen Beer Company',
	        animation: google.maps.Animation.DROP
	    });

	    // //marker.setIcon('img/spotlight-poi.png');

	    google.maps.event.addListener(marker, 'click', function() {
	        infoWindow.open(map,marker);
	    });

	    setTimeout(function() { infoWindow.open(map,marker); }, 1000);
    }
}