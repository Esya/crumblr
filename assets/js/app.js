angular
  .module('app', [
    'ui.router',
    'ngAnimate'
  ])
  .config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'templates/login.html'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html'
      })
  }]);
