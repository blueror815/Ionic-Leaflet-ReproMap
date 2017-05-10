angular.module('purchase.controllers', [])

.controller('purchaseCtrl', function(BACKEND_API, HEADERS, $rootScope, $state, $http, $ionicScrollDelegate, $ionicSideMenuDelegate, $scope,
 $ionicPlatform, $ionicHistory, $ionicLoading, $interval, $stateParams, Utils, ReproService ) {

    $scope.$on( "$ionicView.enter", function( scopes, states ) {
      if( states.stateName == "app.manitoba_tab.purchase" ) {
        console.log($rootScope.map_type);

	    if($stateParams.index == null) {
	      $scope.msg = "Invalidate Listing Index";
	    } else {
	    	$scope.map_data = ReproService.get_map_data();

			$scope.boundaries = $scope.map_data[$stateParams.index].get('boundaries');
			$scope.area_name = $scope.map_data[$stateParams.index].get('name');
			console.log($scope.area_name);
	    }
      }
    });

    $scope.goBack = function() {
		$ionicHistory.nextViewOptions({
		    disableAnimate: true
		});
      	$state.go("app.manitoba_tab.map");
    };

});