angular.module('repromap')
.service('ReproService', function ($q, $http, BACKEND_API, HEADERS, Utils, $localstorage, ParseService) {

	var self = this;

    self.map_data = "";
    
    self.sync_map_data = function() {

        Utils.show("Loading Map Data...");

        var defer = $q.defer();

        ParseService.getAll('Area').then(function(response) {
            Utils.hide();
            self.map_data = response;
            defer.resolve(self.map_data);
        }, function(error) {
            Utils.hide();
            Utils.alertshow("Repro Map", "Network Connection Failed!");
            defer.reject();
        });
        
        return defer.promise;
    };

    self.get_map_data = function() {
        return self.map_data;
    };

});