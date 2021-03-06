// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngResource','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
      url: '/login',      
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'  
  })

  .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }
      }
    })

  .state('app.aulas', {
    url: '/aulas',
    views: {
      'menuContent': {
        templateUrl: 'templates/aulas.html',
        controller: 'AulasCtrl'
      }
    }
  })

  .state('app.biblioweb', {
      url: '/biblioweb',
      views: {
        'menuContent': {
          templateUrl: 'templates/biblioweb.html'
        }
      }
    })

  .state('app.calendario', {
    url: '/calendario',
    views: {
      'menuContent': {
        templateUrl: 'templates/calendario.html',
        controller: 'CalendAcadCtrl'
      }
    }
  })

  .state('app.estadocuenta', {
      url: '/estadocuenta',
      views: {
        'menuContent': {
          templateUrl: 'templates/estadocuenta.html', 
          controller: 'EstadoCuentaCtrl',         
          abstract:true
        }
      }
    })

  .state('app.ecactual', {
      url: '/ecactual',
      views: {
        'menuContent': {
          templateUrl: 'templates/ecactual.html',
          controller: 'ECActualCtrl'
        }
      }
    })

    .state('app.echistorico', {
      url: '/echistorico',
      views: {
        'menuContent': {
          templateUrl: 'templates/echistorico.html',
          controller: 'ECHistoricoCtrl'
        }
      }
    })

  .state('app.notievent', {
    url: '/notievent',
    views: {
      'menuContent': {        
        controller: 'NoticiasCtrl'
      }
    }
  })

  .state('app.aulavirtual', {
      url: '/aulavirtual',
      views: {
        'menuContent': {          
          controller: 'AulaVirtualCtrl'
        }
      }
    })

    .state('app.pensum', {
      url: '/pensum',
      views: {
        'menuContent': {
          templateUrl: 'templates/pensum.html',
          controller: 'PensumCtrl',
          abstract:true
        }
      }
    })

  .state('app.pactual', {
      url: '/pactual',
      views: {
        'menuContent': {
          templateUrl: 'templates/pactual.html',
          controller: 'PActualCtrl'
        }
      }
    })

    .state('app.phistorico', {
      url: '/phistorico',
      views: {
        'menuContent': {
          templateUrl: 'templates/phistorico.html',
          controller: 'PHistoricoCtrl'
        }
      }
    })

    .state('app.calificaciones', {
      url: '/calificaciones',
      views: {
        'menuContent': {
          templateUrl: 'templates/calificaciones.html',
          controller: 'CalificacionesCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/calificaciones/:codInscrito',
    views: {
      'menuContent': {
        templateUrl: 'templates/calificacion.html',
        controller: 'CalificacionCtrl'
      }
    }
  })

  .state('app.emergencias', {
      url: '/emergencias',
      views: {
        'menuContent': {
          templateUrl: 'templates/emergencias.html',
          controller: 'EmergenciasCtrl'
        }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
