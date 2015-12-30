angular.module('app').controller('PropertyDetailsTableController', ['$http','$scope', '$state', '$stateParams', '_', PropertyDetailsTableController]);

function PropertyDetailsTableController($http, $scope, $state, $stateParams, _) {
    $scope.propertyid = $stateParams.propertyId;
    initializeListData();
    
    function initializeListData() {
        $http.get("test.json").then(function (response) {
            console.log(response.data); 
            $scope.property = response.data.properties.filter(function(p) {
                return p.id == $scope.propertyid;
            })[0];
            $scope.tableEntries = $scope.property.entries;    
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
        $state.go('property.details.add');
    }
    
    $scope.editRow = function() {
        var row = $scope.row;
        $scope.row = null;
        $state.go('property.details.edit', {detail: row});
    }
    
    $scope.return = function() {
        $state.go('property');
    }
}