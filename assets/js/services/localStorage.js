;(function(){
	'use strict';

	angular
		.module('app')
		.factory('LocalStorage', LocalStorage);

	function LocalStorage(){
		var service = {};
		var retVal = null ;

		service.get = function(key){
			retVal = localStorage.getItem(key);
			return retVal !== null ? retVal : false ;
		}

		service.set = function(key, value){
			localStorage.setItem(key, value);
		}

		service.remove = function(key){
			var getKey = get(key);
			if ( getKey != null){
				localStorage.removeItem(key);
			}else{
				return getKey;
			}
		}

		return service;
	}

})();