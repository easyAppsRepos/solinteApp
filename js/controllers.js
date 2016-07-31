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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams, $localStorage) {




})

.controller('perfilCtrl', function($scope, $stateParams, $localStorage, $ionicPopup, $ionicLoading, getData, login) {



$scope.getPerfil = function(){

   $ionicLoading.show({
      template: 'Cargando...'
    }); 

    getData.getPerfil($localStorage.aToken).then(function(res){
      console.log(res);
if(res=='ERROR'){
  $ionicLoading.hide(); 
  alert('Ha ocurrido un error');
  return true;
}
      if(res.token.error=="expired_token"){
        console.log('token expire');
        login.renovarToken($localStorage.rToken).then(function(response){
            console.log(response);

                   if(response.access_token){
                $localStorage.aToken = response.access_token;
                $localStorage.rToken = response.refresh_token;
               $scope.getPerfil();
                   }  


        });
      }

      else{
           $ionicLoading.hide(); 
            $scope.perfil = res.solinte.usuario.perfil;

            console.log($scope.perfil);
      }
    });
  }

    $scope.getPerfil();

})

//$cordovaSocialSharing
.controller('mainController', function($scope, $stateParams, $localStorage, $ionicModal, $ionicPopup, $ionicLoading, $cordovaSocialSharing, getData, login) {
    console.log('Roles');


//modal





  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {

    $scope.modal = modal;
  });

    $ionicModal.fromTemplateUrl('my-modal2.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal2) {

    $scope.modal2 = modal2;
  });

  $scope.openModal = function() {
      console.log('44');
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

    $scope.openModal2 = function() {
      console.log('442');
    $scope.modal2.show();
  };

  $scope.closeModal2 = function() {
    $scope.modal2.hide();
  };


  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
     $scope.modal2.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


//end modal

//login.addRol($localStorage.aToken).then(function(response){

//  console.log(response);

//});


 $ionicLoading.show({
      template: 'Cargando...'
    }); 

$scope.compartirOtro=function(cuis,codigo,verificadores){
  $cordovaSocialSharing
    .share(null, null, null, 'CUIS Otorgante: '+cuis+' Código de Rol: '+codigo+' Verificadores: '+verificadores) // Share via native share sheet
    .then(function(result) {
      console.log(result);
      // Success!
    }, function(err) {
       console.log(err);
      // An error occured. Show a message to the user
    });


}

$scope.compartirWhats=function(cuis,codigo,verificadores){

    $cordovaSocialSharing
    .shareViaWhatsApp(null, null, 'CUIS Otorgante: '+cuis+' Código de Rol: '+codigo+' Verificadores: '+verificadores)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

}


$scope.infoCompartir = function(cuis,codigo,verificadores){

    var template=  '<div class="ttp"><div style="margin-top:15px"><a style="color:black;font-weight: bold;" >CUIS Otorgante:  </a>'+cuis+'<div><br>  <div><a style="color:black;font-weight: bold;">Código de Rol:  </a>'+codigo+'</div ><br><div><a style="color:black;font-weight: bold;">Verificadores:  </a>'+verificadores+'</div>   <div style="margin-top: 30px;margin-bottom: 8px;"> <a ng-click="compartirWhats('+"'"+cuis+"'"+','+"'"+codigo+"'"+','+"'"+verificadores+"'"+')" class="shareI icon ion-social-whatsapp"></a> <a class="shareI icon ion-android-mail"></a> <a ng-click="compartirOtro('+"'"+cuis+"'"+','+"'"+codigo+"'"+','+"'"+verificadores+"'"+')" class="shareI icon ion-android-textsms"></a> </div> </div>';

   // An elaborate, custm popup
   var myPopup = $ionicPopup.show({
    cssClass: 'confirmarPedido',
     template:template ,
      title: '<div class="texD">DATOS PARA COMPARTIR</div>',
   //  subTitle: '<div class="ss"> RESUMEN PEDIDO</div><div>Total del pedido:<br>  <h2>S/.'+(parseInt($scope.getTotal())+8.9)+'</h2><br><h3>Con cuanto cancelas?</h3></div>',
     scope: $scope,
     buttons: [
       { text: 'Cerrar',
          type:'fgg' },
     ]
   });

};

$scope.infoDetalle = function(rid){
 $ionicLoading.show({
      template: 'Cargando...'
    }); 

    getData.getSaldo(rid,$localStorage.aToken).then(function(res){

            if(res=='ERROR'){
  $ionicLoading.hide(); 
  alert('Ha ocurrido un error');
  return true;
}

  $ionicLoading.hide(); 
      console.log(res);
      $scope.saldo = res.solinte.usuario.roles.saldo;


        var template=  '<div class="saldoDetalle"><div style="margin-top:15px"><a style="color:black;font-weight: bold;">Saldo a pagar a fecha '+$scope.saldo.fecha+':</a></div><br>  <div><div style="color:black;font-weight: bold;font-size: 30px;text-align:center">$'+$scope.saldo.saldo+'</div></div ><br> </div>';

        // An elaborate, custm popup
        var myPopup = $ionicPopup.show({
        cssClass: 'confirmarPedido',
        template:template ,
        title: '<div class="texD">Detalle</div>',
        //  subTitle: '<div class="ss"> RESUMEN PEDIDO</div><div>Total del pedido:<br>  <h2>S/.'+(parseInt($scope.getTotal())+8.9)+'</h2><br><h3>Con cuanto cancelas?</h3></div>',
        scope: $scope,
        buttons: [
        { text: 'Cerrar',
        type:'fgg' },
        {
          text:'Ver Detalle',
          type:'button-positive',
          onTap: function(){
            $scope.openModal2();
          }  
        }
        ]
        });




    });

};


$scope.getDataRoles = function(){
    getData.getRol($localStorage.aToken).then(function(res){

      if(res=='ERROR'){
  $ionicLoading.hide(); 
  alert('Ha ocurrido un error');
  return true;
}


      console.log(res);

      if(res.token.error=="expired_token"){
        console.log('token expire');
        login.renovarToken($localStorage.rToken).then(function(response){
            console.log(response);

                   if(response.access_token){
                $localStorage.aToken = response.access_token;
                $localStorage.rToken = response.refresh_token;
               $scope.getDataRoles();
                   }  


        });
      }

      else{
             $ionicLoading.hide(); 
            $scope.roles = res.solinte.usuario.roles;
            console.log($scope.roles);
      }
    });
  }

$scope.getDataRoles();
})

.controller('loginCtrl', function($scope, $stateParams, $state, $localStorage, $ionicPopup, $ionicLoading, login, getData) {

$scope.logout = function (){
                $localStorage.aToken = null;
                $localStorage.rToken = null;

  $state.go('login');

}

$scope.loginData={};
  $scope.doLogin = function (){

 $ionicLoading.show({
      template: 'Cargando...'
    }); 

    var user = $scope.loginData.username;
    var pass = $scope.loginData.password;

   // console.log(user);


  login.login(user,pass).then(function(res){

      if(res=='ERROR'){
  $ionicLoading.hide(); 
  alert('Ha ocurrido un error');
  return true;
}

      console.log(res);
       if(res.access_token){
          $ionicLoading.hide(); 
                $localStorage.aToken = res.access_token;
                $localStorage.rToken = res.refresh_token;
                $state.go('app.search');
        }   
        else{
            $ionicLoading.hide(); 
          alert('credenciales invalidas');
        } 


    });


  //  console.log('loginnnn');
  }
})

.factory('login', function($http, $q) {
  return {
    login: function(user,pass) {

  var deferred = $q.defer();
      $http({
    method: 'POST',
    url: 'https://solinte.net/OAuth2/Token',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },//'demo10@solinte.net' //demo
    data: {grant_type:'password',client_id:'solinteasyeapp',client_secret:'plmoknijbuhvygctfxrdzesawq',username:user,password:pass, scope:'perfil admin_rol'}
}).success(function (response, status) {
 // console.log(response);
  deferred.resolve(response);}).error(function(){deferred.resolve('ERROR')});
    return deferred.promise;
    },

      renovarToken: function(refreshToken) {
console.log(refreshToken);
  var deferred = $q.defer();
      $http({
    method: 'POST',
    url: 'https://solinte.net/OAuth2/Token',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {grant_type:'refresh_token', refresh_token: refreshToken, client_id:'solinteasyeapp',client_secret:'plmoknijbuhvygctfxrdzesawq'}
}).success(function (response, status) {
 // console.log(response);
  deferred.resolve(response);}).error(function(){deferred.resolve('ERROR')});
    return deferred.promise;
    },

          addRol: function(token) {

  var deferred = $q.defer();
      $http({
    method: 'POST',
    url: 'https://solinte.net/api.v1/usuario/roles/incorpora',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data:{acces_token: token, descripcion:'Prueba addRol', cuis:"DEMO10", rol_codigo: 'asCdy7YpST', rol_verificador:'RR'}
}).success(function (response, status) {
 // console.log(response);
  deferred.resolve(response);}).error(function(){deferred.resolve('ERROR')});
    return deferred.promise;
    }

    

  }
})

.factory('getData', function($http, $q) {
  return {
    getRol: function(token) {

  var deferred = $q.defer();
      $http({
    method: 'GET',
    url: 'https://solinte.net/api.v1/usuario/roles?acces_token='+token,
}).success(function (response, status) {
  deferred.resolve(response);}).error(function(){deferred.resolve('ERROR')});
    return deferred.promise;
    },



        addRol: function(token) {

  var deferred = $q.defer();
      $http({
    method: 'POST',
    url: 'https://solinte.net/api.v1/usuario/roles/incorpora',
    data: {acces_token: token, descripcion:'Prueba addRol', cuis:"DEMO10", rol_codigo: 'asCdy7YpST', rol_verificador:'RR'}
}).success(function (response, status) {
  deferred.resolve(response);}).error(function(){deferred.resolve('ERROR')});
    return deferred.promise;
    },


        getPerfil: function(token) {

  var deferred = $q.defer();
      $http({
    method: 'GET',
    url: 'https://solinte.net/api.v1/usuario/perfil?acces_token='+token,
}).success(function (response, status) {
  deferred.resolve(response);}).error(function(){deferred.resolve('ERROR')});
    return deferred.promise;
    },

        getSaldo: function(rid,token) {

  var deferred = $q.defer();
      $http({
    method: 'GET',
    url: 'https://solinte.net/api.v1/usuario/roles/saldo/'+rid+'/hoy?acces_token='+token,
}).success(function (response, status) {
  deferred.resolve(response);}).error(function(){deferred.resolve('ERROR')});
    return deferred.promise;
    }




  }
});

///usuario/roles/saldo/{rid}/{fecha}


//https://solinte.net/api.v1/usuario/roles?acces_token=25e4ae7370e6f62f4725973d9961529562a7e884

