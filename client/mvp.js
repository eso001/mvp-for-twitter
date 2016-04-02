angular.module('mvp', ['ui.router'])
.factory('Links', function ($http) {
  // Your code here
  function get(url){
    return $http.get(url)
  }
  function post(serverPath, username){
  	console.log("INSIDE POST METHOD OF LINKS FACTORY");
    return $http.post(serverPath, username);
  }
  return {
    get: get,
    post: post
  }
})
.factory('linksfactory', function(Links){
  var getPromise;
  function init(url){
     console.log("IM IN THE INIT");
    getPromise = Links.get(url)
  }

  function getLinks(){
    return getPromise;
  }

  return {
    getLinks: getLinks,
    init: init,
    mapLinks: mapLinks
  }
})
.controller('mainController', function($scope, Links){

	$scope.hello = 'Tweets of';
	$scope.sendUser = function(){
	var requestedUser = {user: $scope.username};
		Links.post('/', requestedUser).then(function(data){
			$scope.allData = data.data;
		// 	for(var i = 0; i < data.data.length; i++){
		// 	console.log(data.data[i].text);
		// }
		})

	}
})

// .config(function($stateProvider, $httpProvider, $urlRouterProvider){
// 	$urlRouterProvider.otherwise('home');

// 	$stateProvider
// 	  .state('tweets', {
// 	  	url: '/tweets',
// 	  	templateUrl: 'client/pages/tweets.html',
// 	  	controller: 'tweets'
// 	  });
// 	})
