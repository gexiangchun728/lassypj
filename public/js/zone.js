$(document).ready(function () {
	$('.addr-list').on('click', ':button',function(){
		$(this).parent().find("input[type='text']").addClass("hide");
		$(this).parent().find("span.hide").removeClass("hide").addClass("show").text($(this).parent().find("input[type='text']").val());
		$(this).addClass("hide");
		$(this).parent().find("a.hide").removeClass("hide").addClass("show")
		var number = $(this).parent().parent().find('li').length+1;
		var index = $(this).parent().parent().find('li').index($(this).parent());
		$(this).parent().parent().append("<li> <span class='number'>"+number+". </span><input type='text' placeholder='Name of LassyZone...' value='' id='zonename-"+number+"' name='zonename-"+number+"'><span class='zonename-"+number+" hide'></span><input type='button' class='btn btn-primary' value='Save &amp; Add New' id='zonebtn-"+number+"'><a class='editlink-"+number+" hide'>Edit Name</a></li>");
		codeAddress($(this).parent().find("input[type='text']").val(), index);
	});
	$('.addr-list').on('click', 'a', function(){
		$(this).parent().find('span.show').removeClass('show').addClass('hide');
		$(this).parent().find("input[type='text'].hide").removeClass("hide");
		$(this).removeClass("show").addClass("hide");
		$(this).parent().find("input[type='button'].hide").removeClass("hide");
		$(this).parent().parent().find('li:last').remove();
	});

	$('#searchbtn').click(function(){
		if($('#search-addr').val() != ""){
			searchAddress($('#search-addr').val());
		}
	});
	initialize();
});

var amsterdam=new google.maps.LatLng(52.395715,4.888916);
var map;
var geocoder = new google.maps.Geocoder();
var latlngbounds = new google.maps.LatLngBounds( );
function initialize()
{
  var mapProp = {
	  center:amsterdam,
	  zoom:10,
	  disableDefaultUI:true,
	  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  codeAddress('Chicago', 0);
}

var myCity = [];
function codeAddress(address, index) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
		if(myCity[index])
	        myCity[index].setMap(null);
		myCity[index] = new google.maps.Circle({
		  center:results[0].geometry.location,
		  radius:2000,
		  strokeColor:"#75c8e6",
		  strokeOpacity:0.8,
		  strokeWeight:2,
		  fillColor:"#75c8e6",
		  fillOpacity:0.4
		  });
//		latlngbounds.extend( results[0].geometry.location );
		myCity[index].setMap(map);
		map.fitBounds(results[0].geometry.location); 
      }
    });
}

function searchAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
      }
    });


}
