angular.module('manitoba_tab_map.controllers', [])

.controller('manitobaTabMapCtrl', function(BACKEND_API, HEADERS, $rootScope, $state, $http, $ionicScrollDelegate, $ionicSideMenuDelegate, $scope,
 $ionicPlatform, $ionicHistory, $ionicLoading, $interval, $stateParams, $compile, ParseService, ReproService, Utils ) {
    
    var infowindow = new google.maps.InfoWindow({
	  size: new google.maps.Size(150, 50)
	});

	$scope.map = "";

    $scope.$on( "$ionicView.enter", function( scopes, states ) {
		if( states.stateName == "app.manitoba_tab.map" ) {
			$ionicPlatform.ready(function() {
				leaflet_map_test();
				// initializeMaps();
				// $scope.map.setMapTypeId($rootScope.map_type);
				// infowindow.close();
				
			});
		}
    });

    

	// initializeMaps();
	// $scope.map.setMapTypeId($rootScope.map_type);
	// infowindow.close();

    // $scope.goBack = function() {
    //   // $state.go("app.main");
    // };

    $scope.goNext = function(index) {
		$ionicHistory.nextViewOptions({
		    disableAnimate: true
		});
    	$state.go("app.manitoba_tab.purchase", { "index": index});
    };

    function leaflet_map_test() {
    	// var map = new L.map('map').setView([51.19863244, -100.0639576], 9);

		// Location of the marker
		var markerLocation = new L.LatLng(51.19863244, -100.0639576);

		var map = new L.Map('map', 
			{center: new L.LatLng(51.19863244, -100.0639576), 
				zoom: 9, 
				attributionControl: true, 
				minZoom: 6,
				maxZoom: 12
		});

		var marker = new L.Marker(markerLocation);
		marker.bindPopup("<b>You are here!</b>").openPopup();
		map.addLayer(marker);

		/***** Open Street Map Layer *****/
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
		var osmLayer = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 16, attribution: osmAttrib});

		map.addLayer(osmLayer);

		/***** Natural Earch Layer in WMS Server *****/
		// var wmsLayer = L.tileLayer.wms('http://demo.opengeo.org/geoserver/ows?', {
		//     layers: 'ne:ne,ne:ne_10m_admin_0_boundary_lines_land'
		// });

		// map.addLayer(wmsLayer);


		/***** Open Street Map - Hot Layer *****/
		// var oms_hot_layer = L.tileLayer.provider('OpenStreetMap.HOT');
		// map.addLayer(oms_hot_layer);
		
		/***** Nasa Bluemarble Layer in WMS Server *****/
		// var wmsLayer = L.tileLayer.wms('http://demo.opengeo.org/geoserver/ows?', {
		//     layers: 'nasa:bluemarble'
		// });

		// map.addLayer(wmsLayer);

		// var mb_county = L.tileLayer.mbTiles('mbtiles/countries-raster.mbtiles', {
		// 	minZoom: 6,
		// 	maxZoom: 12
		// }).addTo(map);

	   	// var map = new L.map('map').setView([51.19863244, -100.0639576], 10);
	    // var map = new L.Map('map').fitWorld();

	    // countries-raster
	    // Dauphin Manitoba Canada app-Model-2
	    console.log(L.tileLayer.mbTiles);
		var mb = L.tileLayer.mbTiles('mbtiles/Dauphin Manitoba Canada app-Model-2.mbtiles', {
			minZoom: 6,
			maxZoom: 12
		}).addTo(map);

		mb.on('databaseloaded', function(ev) {
			console.info('MBTiles DB loaded', ev);
		});
		mb.on('databaseerror', function(ev) {
			console.info('MBTiles DB error', ev);
		});

		map.on('zoomend', function() {
		    console.log(this.getZoom());
		});
		/*	
	    ReproService.sync_map_data().then(function(response) {
			for ( var i = 0 ; i < response.length; i++ ) {

				var boundaries = response[i].get('boundaries');

				// Define the LatLng coordinates for the polygon's path.
				if(i = 0) {
					console.log(boundaries);
				}

				var boundary = boundaries.replace(/\s/g, '');
				boundary = boundary.replace(/lat/g, '"lat"');
				boundary = boundary.replace(/lng/g, '"lng"');
				boundary = JSON.parse(boundary);

				// Construct the polygon.
				var opt_polygon = {
					paths: boundary
				};

				if ($rootScope.boundary_type == "multi") {
					var color = getRandomColor();
				} else {
					var color = "#FF0000";
				};

				if ($rootScope.boundary_option) {
					opt_polygon.strokeColor = color;
					opt_polygon.strokeOpacity = 0.8;
					opt_polygon.strokeWeight = 2;
				} else {
					opt_polygon.strokeOpacity = 0.0;
					opt_polygon.strokeWeight = 0;
				};

				if ($rootScope.area_option) {
					opt_polygon.fillColor = color;
					opt_polygon.fillOpacity = 0.35;
				};
				

			}
	    }, function(resp) {
	    	console.log("Parse Backend Connnection Failed");
	    });
		*/
    };

    function initializeMaps() {

	  	// var latLng = new google.maps.LatLng(50.75730985029409, -99.0087890625); // center for manitoba
	  	var latLng = new google.maps.LatLng(51.19863244, -100.0639576); // center for dauphin

      	$scope.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10, // 7
			center: latLng,
			mapTypeId: $rootScope.map_type, // roadmap, satellite, hybrid, terrain
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			disableDefaultUI: true
        });

      	// https://jsfiddle.net/RichardBankert/w8hjx6tg/1/#&togetherjs=N49L26Ayit

		var imageBounds = {
			north: 51.44880471,
			south: 50.94846017,
			east: -99.852164,
			west: -100.2757512
		};

		/*
			{lat: 50.94846017, lng: -100.273823},
			{lat: 51.44880471, lng: -100.2757512},
			{lat: 51.44852277, lng: -99.92894304},
			{lat: 51.33138147, lng: -99.85385999},
			{lat: 51.15489756, lng: -99.852164},
			{lat: 50.95204459, lng: -99.85632397}
		*/


		var historicalOverlay = new google.maps.GroundOverlay(
			'img/Dauphin Manitoba Canada app-Model.png',
			imageBounds);
		historicalOverlay.setMap($scope.map);

	    ReproService.sync_map_data().then(function(response) {
			for ( var i = 0 ; i < response.length; i++ ) {

				var boundaries = response[i].get('boundaries');

				// Define the LatLng coordinates for the polygon's path.
				var boundary = boundaries.replace(/\s/g, '');
				boundary = boundary.replace(/lat/g, '"lat"');
				boundary = boundary.replace(/lng/g, '"lng"');
				boundary = JSON.parse(boundary);
				
				// Construct the polygon.
				var opt_polygon = {
					paths: boundary
				};

				if ($rootScope.boundary_type == "multi") {
					var color = getRandomColor();
				} else {
					var color = "#FF0000";
				};
				

				if ($rootScope.boundary_option) {
					opt_polygon.strokeColor = color;
					opt_polygon.strokeOpacity = 0.8;
					opt_polygon.strokeWeight = 2;
				} else {
					opt_polygon.strokeOpacity = 0.0;
					opt_polygon.strokeWeight = 0;
				};

				if ($rootScope.area_option) {
					opt_polygon.fillColor = color;
					opt_polygon.fillOpacity = 0.35;
				};
				
				var bermudaTriangle = new google.maps.Polygon(opt_polygon);

				bermudaTriangle.setMap($scope.map);

				var area_name = response[i].get('name');
				
				var center_pos = centroid(boundary);
				
				var area_center = new google.maps.LatLng(center_pos);

				area_info_window(bermudaTriangle, area_center, area_name, i);
			}
	    }, function(resp) {
	    	console.log("Parse Backend Connnection Failed");
	    });

    }

    function area_info_window(area, center, name, index) {

		// var iconBase = 'img/position-icon.png';

		// var baseIcon = new google.maps.MarkerImage(
		// 	  iconBase,
		// 	  new google.maps.Size(64, 64),
		// 	  new google.maps.Point(0, 0),
		// 	  null,
		// 	  new google.maps.Size(40, 40)
		// );

		// //Wait until the map is loaded
		// google.maps.event.addListenerOnce($scope.map, 'idle', function() {
		 
		// 	var marker = new google.maps.Marker({
		// 		map: $scope.map,
		// 		animation: google.maps.Animation.DROP,
		// 		position: center,
		// 		icon: baseIcon,
		// 		draggable: false
		// 	});

		// 	infoWindow = new google.maps.InfoWindow({
		// 		content: '<p id="sub_map">' + name + ' property ownership map</p>'
		// 	});

		// 	google.maps.event.addListener(marker, 'click', function () {
		// 		infoWindow.open($scope.map, marker);
		// 	});
		 
		// });

        area.addListener('click', function(event) {
        	infowindow.close();

        	if (event) {
				point = event.latLng;
			}
			var contentString = '<a href="" ng-click="goNext(' + index + ')" nav-transition="none" >' + name + ' Map Purchase</a>';
			// var contentString = '<a ui-sref="app.manitoba_tab.purchase({index: ' + index + '})" nav-transition="none" >' + name + ' Map Purchase</a>';
			var compiled = $compile(contentString)($scope);

	        infowindow = new google.maps.InfoWindow({
	          content : compiled[0]
	        });

			infowindow.setPosition(point);
          	infowindow.open($scope.map, area);
        });
    }

    /**
     * Generate Random color
     */
    function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
    }

	// Below is the code to find the center of polygon:

	function centroid(points) {
		var lat = 0.0, lng = 0.0;
		for (var i = 0; i < points.length; i++) {
			lat += points[i].lat;
			lng += points[i].lng;
		}

		var totalPoints = points.length;
		
		lat = lat / totalPoints;
		lng = lng / totalPoints;
		
		var centroid = {'lat' : lat, 'lng' : lng };
		return centroid;
	}

});