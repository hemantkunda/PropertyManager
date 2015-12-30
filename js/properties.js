angular.module('app').controller('PropertiesTableController', ['$http', '$scope', '$state', '$stateParams', '_', PropertiesTableController]);

function PropertiesTableController($http, $scope, $state, $stateParams, _) {
    initializeTableData();
    
    function initializeTableData() {
        $http.get("test.json").then(function(response) {
            $scope.tableEntries = response.data.properties;  
            $scope.tableEntries.sort(function(a, b) {
                if (a.date > b.date) {
                    return -1;
                }
                if (a.date < b.date) {
                    return 1;
                }
                return 0;
            });
        }, function (response) {
            console.log("no");
        });
    }
    
    $scope.deleteRow = function() {
        if ($scope.row == null) {
            return;
        }
        $scope.tableEntries = _.without($scope.tableEntries, $scope.row);
        $scope.row = null;
    }
    
    $scope.selectRow = function(entry) {
        if ($scope.row === entry) {
            $scope.row = null;
        }
        else {
            $scope.row = entry;
        }
    }
    
    $scope.showAllRows = function() {
        angular.forEach($scope.tableEntries, function(entry) {
            entry.hidden = false;
        });
    }
    
    $scope.hideSelectedRow = function() {
        if ($scope.row == null) {
            return;
        }
        $scope.row.hidden = true;
        $scope.row = null;
    }
    
    $scope.addRow = function() {
        $state.go('property.add');
    }
    
    $scope.editRow = function() {
        var row = $scope.row;
        $scope.row = null;
        $state.go('property.edit', {property: row});
    }
    
    $scope.activity = function() {
        console.log("changing state:", $scope.row.id);
        $state.go('property.details', {propertyId: $scope.row.id});
    }
}