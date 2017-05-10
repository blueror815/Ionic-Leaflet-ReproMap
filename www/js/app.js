
var app = angular.module('repromap', ['ionic', 'ngCordova', 'appctrl.controllers', 'manitobaTabCtrl.controllers', 
  'manitoba_tab_map.controllers', 'purchase.controllers', 'manitoba_tab_waypoints.controllers', 'manitoba_tab_settings.controllers', ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();

      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusbar.styleColor('white');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  document.body.classList.remove("platform-ios");
  document.body.classList.remove("platform-android");
  document.body.classList.add("platform-ios");
  document.body.classList.add("platform-android");

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.manitoba_tab', {
    url: '/manitoba-tab',
    // abstract: true,
    views: {
      'menuContent': {
        templateUrl: 'templates/manitoba-tab.html',
        controller: 'manitobaTabCtrl'
      }
    }
  })

  .state('app.manitoba_tab.map', {
    url: '/map',
    views: {
      'manitoba-tab-map': {
        templateUrl: 'templates/manitoba-tab-map.html',
        controller: 'manitobaTabMapCtrl'
      }
    }
  })

  .state('app.manitoba_tab.purchase', {
    url: '/purchase/:index',
    views: {
      'manitoba-tab-map': {
        templateUrl: 'templates/purchase.html',
        controller: 'purchaseCtrl'
      }
    }
  })

  .state('app.manitoba_tab.waypoints', {
    url: '/waypoints',
    views: {
      'manitoba-tab-waypoints': {
        templateUrl: 'templates/manitoba-tab-waypoints.html',
        controller: 'manitobaTabWaypointsCtrl'
      }
    }
  })

  .state('app.manitoba_tab.settings', {
    url: '/settings',
    views: {
      'manitoba-tab-settings': {
        templateUrl: 'templates/manitoba-tab-settings.html',
        controller: 'manitobaTabSettingsCtrl'
      }
    }
  })

  .state('app.citymap', {
    url: '/citymap',
    // abstract: true,
    views: {
      'menuContent': {
        templateUrl: 'templates/citymap.html'
        // controller: 'manitobaTabCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/manitoba-tab/map');
});
