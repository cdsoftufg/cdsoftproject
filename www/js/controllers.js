angular.module('starter.controllers', ['ngCordova'])


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
    console.log('Doing login', $scope.loginData.username);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LoginCtrl', function($scope, $state, $http) {
    $scope.loginData = {};

    $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }

     // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
        var loginurl = 'https://webdesktop.ufg.edu.sv/ws/rest/tokenr.php';
        var data = {method:'certificate',callback:'angular'};
        $scope.phA=localStorage.getItem("carnet");

        $http({method:'POST',
              url:loginurl,
              data:"method=certificate",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            if (typeof data != 'undefined') {
                if (typeof data.modulo != 'undefined') {
                    var rsa=mmRSA();
                    var encstring=rsa.mkRSA($scope.loginData.username,$scope.loginData.password,data.modulo,data.exponente);
                    
                    $http({method:'POST',
          url:loginurl,
          data:"method=authenticate&enc=" + encstring,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function(data,status,headers,config) {
            if(data.login==1) {
              localStorage.setItem("sessionid", data.sessionid);
              localStorage.setItem("carnet", data.carnet);
              $state.go('app.main');
            }
          })
          }
          }
        })
        .error(function(data, status, headers, config){
      console.log('data error');
    });
  };
})

.controller('MainCtrl', function($scope, $state) {  
  $scope.phA=localStorage.getItem("carnet");
})

.controller('AulasCtrl', function($scope, $http) {
    $scope.aulas = "";
    $scope.phA=localStorage.getItem("carnet");        

    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getAulas.ashx',
      data: "query=" + localStorage.getItem("carnet"),
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

.controller('CalendAcadCtrl', function($scope, $http) {
    $scope.calendario = "";
    $scope.phA=localStorage.getItem("carnet");    
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getCalendarioAcademico.ashx',
      data: "query=" + localStorage.getItem("carnet"),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      //console.log('data success');
      //console.log(data); // for browser console
      $scope.calendario = data; // for UI
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(calendario){
      things = calendario.data;
    }); 
})

.controller('EstadoCuentaCtrl', function($scope, $http) {
    $scope.phA=localStorage.getItem("carnet");    
})

.controller('ECHistoricoCtrl', function ($scope, $stateParams, $http) {
    $scope.pagos = "";
    $scope.phA=localStorage.getItem("carnet");     

    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getHistoricoPagos.ashx',
      data: "query=" + localStorage.getItem("carnet"),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      //console.log('data success');
      //console.log(data); // for browser console      
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
    $scope.ciclos = "";
    $scope.phA=localStorage.getItem("carnet");          

    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getPagosPendientes.ashx',
      data: "query=" + localStorage.getItem("carnet"),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      //console.log('data success');
      //console.log(data); // for browser console
      $scope.pagospendientes = data.splice(0, data.length-1); // for UI
      $scope.ciclos = data;    
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(pagospendientes){
      things = pagospendientes.data;
    });
})

.controller('PensumCtrl', function($scope, $http) {
    $scope.phA=localStorage.getItem("carnet");
})

.controller('PHistoricoCtrl', function ($scope, $stateParams, $http) {
    $scope.asignaturasP = "";
    $scope.phA=localStorage.getItem("carnet");        
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getPensumHistorico.ashx',
      data: "query=" + localStorage.getItem("carnet"),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      //console.log('data success');
      //console.log(data); // for browser console
      
      $scope.asignaturasP = [];
      var ciclos = [];
      for (var i=0; i<data.length; i++) {
        var ciclo=data[i]['ciclo'];
        //console.log(ciclo);
        var items=[];
        if (ciclos[ciclo]) {
          items=ciclos[ciclo];
        } 

          items.push({'asignatura':data[i]['asignatura'],'codAsignatura':data[i]['codAsignatura'],'uv':data[i]['uv']});
          ciclos[ciclo]=items;
      }
      //console.log(ciclos);
      //console.log(ciclos.length);      
      for (var i=0; i<ciclos.length-1;i++) {
        $scope.asignaturasP[i] = {
          ciclo: i+1,
          items: ciclos[i+1]
        };              
        //console.log(data[i]);  
      }
      
      /*
       * if given group is the selected group, deselect it
       * else, select the given group
       */
      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };

      //$scope.asignaturasP = data; // for UI

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
    $scope.phA=localStorage.getItem("carnet");        
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getPensumAprobadas.ashx',
      data: "query=" + localStorage.getItem("carnet"),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      //console.log('data success');
      //console.log(data); // for browser console
      $scope.asignaturasA = data; // for UI
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(asignaturasA){
      things = asignaturasA.data;
    });
})

.controller('EmergenciasCtrl', function($scope, $state) {  
  $scope.phA=localStorage.getItem("carnet");
})

.controller('CalificacionesCtrl', function($scope, $http) {
    $scope.calificaciones = "";
    $scope.phA=localStorage.getItem("carnet");    
    $http({
      method: 'POST',
      url: 'http://192.168.2.44/wsUVirtualApp/getAsignaturas.ashx',
      data: "query=" + localStorage.getItem("carnet"),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      //console.log('data success');
      //console.log(data); // for browser console
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
  $scope.calificacionL = "";
  $scope.calificacionP = "";
  $scope.cum = "";
  $scope.phA=localStorage.getItem("carnet");    
  $http({
    method: 'POST',
    url: 'http://192.168.2.44/wsUVirtualApp/getCalificaciones.ashx',
    data: "query=" + $stateParams.codInscrito,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .success(function(data, status, headers, config){
      $scope.calificacionL = [];
      $scope.calificacionP = [];
      var info = data.splice(0, data.length-1); // for UI
      $scope.cum = data;

      var tipos = [];
      for (var i=0; i<info.length; i++) {
        var tipo=info[i]['tipoEvaluacion'];
        //console.log(ciclo);
        var items=[];
        if (tipos[tipo]) 
        {
          items=tipos[tipo];
        } 

        items.push({'calificacion':info[i]['calificacion'],'nEvaluacion':info[i]['nEvaluacion'],'porcentaje':info[i]['porcentaje'],'tipoeval':info[i]['tipoEvaluacion']});
        tipos[tipo]=items;
      }
      
        $scope.calificacionL.push({
          tip: 'Laboratorios',
          items: tipos.L
        }); 

            $scope.calificacionP.push({
          tip: 'Examenes',
          items: tipos.P
        });    
      

      //console.log($scope.calificacionL);
      
      /*
       * if given group is the selected group, deselect it
       * else, select the given group
       */
      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };
    })
    .error(function(data, status, headers, config){
      console.log('data error');
    })
    .then(function(calificacion){
      things = calificacion.data;      
    });
})

.controller('GeoCtrl', function($scope, $cordovaGeolocation) {
  $scope.phA=localStorage.getItem("carnet");
   var posOptions = {timeout: 10000, enableHighAccuracy: false};
   $cordovaGeolocation
   .getCurrentPosition(posOptions)
  
   .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      console.log(lat + '   ' + long)
   }, function(err) {
      console.log(err)
   });

   var watchOptions = {timeout : 3000, enableHighAccuracy: false};
   var watch = $cordovaGeolocation.watchPosition(watchOptions);
  
   watch.then(
      null,
    
      function(err) {
         console.log(err)
      },
    
      function(position) {
         var lat  = position.coords.latitude
         var long = position.coords.longitude
         console.log(lat + '' + long)
      }
   );

   watch.clearWatch();

})

.controller('AulaVirtualCtrl', function($scope, $cordovaInAppBrowser) {

  var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no'
    };
    //debugger;
  
    $cordovaInAppBrowser.open('http://cvirtual.ufg.edu.sv/portal', '_system', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });

    $state.go('app.menu');
    //$cordovaInAppBrowser.close();

  

  /*$rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){

  });

  $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
    // insert CSS via code / file
    $cordovaInAppBrowser.insertCSS({
      code: 'body {background-color:blue;}'
    });

    // insert Javascript via code / file
    $cordovaInAppBrowser.executeScript({
      file: 'script.js'
    });
  });

  $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){

  });

  $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){

  });*/

})

.controller('NoticiasCtrl', function($scope, $state, $cordovaInAppBrowser) {  
  $scope.phA=localStorage.getItem("carnet");

  var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no'
    };
    //debugger;
  
    $cordovaInAppBrowser.open('http://k-rudy.github.io/phonegap-twitter-timeline/?440593178345734145', '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });

      $state.go('app.menu');
});

