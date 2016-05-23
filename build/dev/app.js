'use strict';

angular.module('appModule', ['ngMaterial'])
    .controller('MainCtrl', MainController);

//@ngInject    
MainController.$inject = ['$scope'];

function MainController($scope) {
	
}