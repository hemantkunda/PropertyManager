//Module declarations
angular.module('underscore', []);
angular.module('underscore').factory("_", function() {
   return window._; 
});
angular.module('app', ['ngMaterial', 'ngAnimate', 'ngAria', 'ui.router', 'underscore']);

//Route configuration
angular.module('app').config(['$stateProvider', function($stateProvider) {
    var property = {
        name: 'property',
        url: '/properties',
        views: {
            "@": {
                templateUrl: 'html/properties.html'
            }
        }
    },
    details = {
        name: 'property.details',
        url: '/details?:propertyId',
        views: {
            "@": {
                templateUrl: 'html/propertyDetails.html'
            }
        }
    },
    propertyAdd = {
        name: 'property.add',
        url: '/add',
        views: {
            "@": {
                templateUrl: 'html/propertiesAddEdit.html'
            }
        }
    },
    propertyEdit = {
        name: 'property.edit',
        url: '/edit?propertyId',
        views: {
            "@": {
                templateUrl: 'html/propertiesAddEdit.html'
            }
        },
        params: {
            property: {
                squash: true
            }
        }
    },
    detailsAdd = {
        name: 'property.details.add',
        url: '/add',
        views: {
            "@": {
                templateUrl: 'html/propertyDetailsAddEdit.html'
            }
        }
    },
    detailsEdit = {
        name: 'property.details.edit',
        url: '/edit?:detailId',
        views: {
            "@": {
                templateUrl: 'html/propertyDetailsAddEdit.html'
            }
        },
        params: {
            detail: {
                squash: true
            }
        }
    };
    $stateProvider.state(property.name, property);
    $stateProvider.state(details.name, details);
    $stateProvider.state(propertyAdd.name, propertyAdd);
    $stateProvider.state(propertyEdit.name, propertyEdit);
    $stateProvider.state(detailsAdd.name, detailsAdd);
    $stateProvider.state(detailsEdit.name, detailsEdit);
    
        
    String.prototype.capitalize = function() {
        return this.charAt(0) + this.slice(1);
    }
}])
.run(['$state', function($state) {
    $state.go('property');
}]);