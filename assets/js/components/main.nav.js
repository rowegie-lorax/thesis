(function(){
	'use strict';

	angular
		.module('app')
		.directive('mainNav', mainNav);


	function mainNav(){
		// Definition of directive
	    var mainNavigation = {
	    	restrict: 'E',
	    	scope: {
				login: '@',
				user: "="
			},
	    	templateUrl: 'views/layout/main-nav.html'
	    };
	    return mainNavigation;
	}

})();