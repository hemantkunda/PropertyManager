angular.module('app').controller('PropertiesAddEditController', ['$scope', '$state', '$stateParams', PropertiesAddEditController]);

function PropertiesAddEditController($scope, $state, $stateParams, _) {
    if ($stateParams.property) {
        $scope.date = new Date($stateParams.property.date);
        $scope.address = $stateParams.property.address;
        $scope.listPrice = $stateParams.property.listPrice;
        $scope.purchasePrice = $stateParams.property.purchasePrice;
        $scope.interestRate = $stateParams.property.interestRate;
        $scope.loanTerm = $stateParams.property.loanTerm;
    }
    
    $scope.cancel = function() {
        $state.go('property');
    }
    
    $scope.submit = function() {
        $scope.prop = {
            date: $scope.date.getTime(),
            address: $scope.address,
            listPrice: $scope.listPrice,
            purchasePrice: $scope.purchasePrice,
            interestRate: $scope.interestRate,
            loanTerm: $scope.loanTerm
        };
        if (!validate($scope.prop)) {
            return;
        }
        console.log($scope.prop);
        $state.go('property');
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