(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    run.$inject = ['$rootScope', 'LocalStorage' ];


    function config($stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.html5Mode(true);
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



    function run($rootScope, LocalStorage){
        console.log("runn");
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
            console.log('asdf');
            if( LocalStorage.get('is_logged_in') !== null && toState.name === 'login'){
                event.preventDefault();
                
                $state.go('home');
            }else{
                console.log("home");
            }
            // if( && !UsersService.getCurrentUser()) {
            // event.preventDefault();
            // $state.go('login');
            // }
        });

    }

})();


