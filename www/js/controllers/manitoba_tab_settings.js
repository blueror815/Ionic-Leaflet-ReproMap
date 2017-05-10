angular.module('manitoba_tab_settings.controllers', [])

.controller('manitobaTabSettingsCtrl', function(BACKEND_API, HEADERS, $rootScope, $state, $http, $ionicScrollDelegate, $ionicSideMenuDelegate, $scope,
 $ionicPlatform, $ionicHistory, $ionicLoading, $interval, $stateParams, Utils, $localstorage) {

	$ionicSideMenuDelegate.canDragContent(false);

    $scope.$on( "$ionicView.beforeEnter", function( scopes, states ) {
      if( states.stateName == "app.manitoba_tab.settings" ) {
        // console.log($rootScope.map_type);
      }
    });

    // $scope.goBack = function() {
    //    $state.go("app.main");
    // };

	$scope.map_types = [
		{ text: "Street View", value: "roadmap" },
		{ text: "Terrain", value: "terrain" },
		{ text: "Hybrid", value: "hybrid" },
		{ text: "Topographic", value: "satellite" }
	];

	$scope.boundary_types = [
		{ text: "Single Color", value: "single" },
		{ text: "Multi Color", value: "multi" }
	];

	$scope.overlay = {
		boundary : $rootScope.boundary_option,
		area : $rootScope.area_option
	};

	$scope.mapTypeChange = function(item) {
		$rootScope.map_type = item.value;
		console.log("Selected Map Type, text:", item.text, "value:", $rootScope.map_type);
	};

	$scope.change_bounday_option = function() {
		console.log($scope.overlay.boundary);
		$rootScope.boundary_option = $scope.overlay.boundary;
	};

	$scope.change_area_option = function() {
		console.log($scope.overlay.area);
		$rootScope.area_option = $scope.overlay.area;
	};

	$scope.boundaryTypeChange = function(item) {
		$rootScope.boundary_type = item.value;
		console.log($rootScope.boundary_type);
	};

	$scope.email_us = function() {
		console.log("Email US");
	};

	$scope.online_faq = function() {
		console.log("Online FAQ's");
	};

});