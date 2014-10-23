$(document).ready(function () {
	initialize();
});

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();
var map;
var polylineOptionsActual = new google.maps.Polyline({
    strokeColor: '#75c8e6',
	strokeOpacity: 1.0,
	strokeWeight: 6
});
function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: polylineOptionsActual});
	var chicago = new google.maps.LatLng(41.850033, -87.6500523);
	var mapOptions = {
		zoom:7,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI:true,
		center: chicago
	}
	map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
	directionsDisplay.setMap(map);
	calcRoute();
}
function calcRoute() {
	var start = document.getElementById('start').value;
	var end = document.getElementById('end').value;

	codeAddress(start);
	codeAddress(end);
	var request = {
		origin:start,
		destination:end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
} 

function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		var myCity = new google.maps.Circle({
		  center:results[0].geometry.location,
		  radius:30000,
		  strokeColor:"#75c8e6",
		  strokeOpacity:0.8,
		  strokeWeight:2,
		  fillColor:"#75c8e6",
		  fillOpacity:0.4
		  });
		myCity.setMap(map);
      }
    });
}