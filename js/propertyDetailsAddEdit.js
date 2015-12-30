angular.module('app').controller('PropertyDetailsAddEditController', ['$scope', '$state', '$stateParams', PropertyDetailsAddEditController]);

function PropertyDetailsAddEditController($scope, $state, $stateParams, _) {
    if ($stateParams.detail) {
        $scope.date = new Date($stateParams.detail.date);
        $scope.activity = $stateParams.detail.activity;
        $scope.cost = $stateParams.detail.cost;
        $scope.taxation = $stateParams.detail.taxation;
        $scope.warranty = $stateParams.detail.warranty;
    }
    
    $scope.submit = function() {
        $scope.det = {
            date: $scope.date.getTime(),
            activity: $scope.activity,
            cost: $scope.cost,
            taxation: $scope.taxation,
            warranty: $scope.warranty,
        };
        if (!validate($scope.det)) {
            return;
        }
        console.log($scope.det);
        $state.go('property.details');
    }
    
    $scope.cancel = function() {
        $state.go('property.details');
    }
    
    function validate(obj) {
        var filled = true;
        angular.forEach(obj, function(value, key) {
           if (value == null) {
               alert(key.capitalize() + " is empty.");
               filled = false;
           } 
        });
        return filled;
    }
}