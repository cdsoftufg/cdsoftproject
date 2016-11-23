angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AulasCtrl', function($scope, $http) {
    $scope.aulas = "";    
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getAulas.ashx',
      data: "query=" + 'oc100516',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      //console.log('data success');
      //console.log(data); // for browser console
      $scope.aulas = data; // for UI
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(aulas){
      things = aulas.data;
    });
})

.controller('EstadoCuentaCtrl', function($scope, $http) {

})

.controller('ECHistoricoCtrl', function ($scope, $stateParams, $http) {
    $scope.pagos = "";    
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getHistoricoPagos.ashx',
      data: "query=" + 'oc100516',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.pagos = data; // for UI
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(pagos){
      things = pagos.data;
    });
})
   
.controller('ECActualCtrl', function ($scope, $stateParams, $http) {
    $scope.pagospendientes = "";    
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getPagosPendientes.ashx',
      data: "query=" + 'oc100516',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.pagospendientes = data; // for UI
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(pagospendientes){
      things = pagospendientes.data;
    });
})

.controller('PensumCtrl', function($scope, $http) {

})

.controller('PHistoricoCtrl', function ($scope, $stateParams, $http) {
    $scope.asignaturasP = "";    
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getPensumHistorico.ashx',
      data: "query=" + 'oc100516',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.asignaturasP = data; // for UI
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(asignaturasP){
      things = asignaturasP.data;
    });
})
   
.controller('PActualCtrl', function ($scope, $stateParams, $http) {
    $scope.asignaturasA = "";    
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getPensumAprobadas.ashx',
      data: "query=" + 'oc100516',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.asignaturasA = data; // for UI
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(asignaturasA){
      things = asignaturasA.data;
    });
})

.controller('CalificacionesCtrl', function($scope, $http) {
    $scope.calificaciones = "";    
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getAsignaturas.ashx',
      data: "query=" + 'oc100516',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.calificaciones = data; // for UI
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(calificaciones){
      things = calificaciones.data;
    });
})

.controller('CalificacionCtrl', function($scope, $stateParams, $http) {
  $scope.calificacion = "";
  $scope.cum = "";    
  $http({
    method: 'POST',
    url: 'http://192.168.2.44/wsUVirtualApp/getCalificaciones.ashx',
    data: "query=" + $stateParams.codInscrito,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .success(function(data, status, headers, config){
      //console.log('data success');
      //console.log(data); // for browser console      
      $scope.calificacion = data.splice(0, data.length-1); // for UI      
      $scope.cum = data;

    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(calificacion){
      things = calificacion.data;      
    });
});

