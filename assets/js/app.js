(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider){
    	$locationProvider.hashPrefix('');
    	$stateProvider
    		.state('home', {
    			url: '/home',
    			templateUrl: 'views/layout/home.html',
                controller: 'MainController',
                controllerAs: 'vm'
    		})
    		.state('login', {
    			url: '/login',
    			templateUrl: 'views/authentication/login.html',
    			controller: 'AuthenticationController',
    			controllerAs: 'vm'
    		})
    		.state('register', {
    			url: '/register',
    			templateUrl: 'views/authentication/register.html',
    			controller: 'AuthenticationController',
    			controllerAs: 'vm'
    		})
            // .state('profile',{
            //     url: '/profile',
            //     templateUrl: 'views/authentication/register.html',
            //     controller: 'AuthenticationController',
            //     controllerAs: 'vm' 
            // })

    	$urlRouterProvider.otherwise('/home');
    }
})();


