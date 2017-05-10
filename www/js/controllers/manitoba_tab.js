angular.module('manitobaTabCtrl.controllers', [])

.controller('manitobaTabCtrl', function($scope, $window, $state, $rootScope, $ionicPlatform, $timeout, Utils, $ionicSideMenuDelegate) {


	$rootScope.map_type = "roadmap"; // roadmap, satellite, hybrid, terrain

	$rootScope.boundary_option = true;
	$rootScope.area_option = true;

	$rootScope.boundary_type = "multi";

	$ionicSideMenuDelegate.canDragContent(false)

	$scope.$on( "$ionicView.enter", function( scopes, states ) {
		// if( states.stateName == "app.manitoba_tab.map" ) {
		// 	$ionicPlatform.ready(function() {
				
		// 	});
		// }
	});

	$scope.goMap = function() {
      	$state.go("app.manitoba_tab.map");
	};

});
