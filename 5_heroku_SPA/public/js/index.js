
angular
  .module("DemoApp",['firebase',
                     'cl.paging',
                     'ngMaterial'
                    ])
  .controller("MainController", function DashCtrl(
                                              $scope,
                                              $firebaseArray,
                                              $firebaseAuth,
                                              $firebaseObject
                                              ) {



  $scope.currentPage = 0;

  $scope.paging = {
    total: 100,
    current: 1,
    onPageChanged: loadPages,
  };



firebase.initializeApp({
	apiKey: "AIza",
    authDomain: "chat",
    databaseURL: "https://",
    storageBucket: "chatbotpoc",
    messagingSenderId: "1046270112685"
    
});


  $scope.loginEmail = function() {
           
           var email="gar"
           var senha="gar"
        firebase.auth()
          .signInWithEmailAndPassword(email,senha)
              .then(function(result) {
              console.log("Successfully user uid:", $scope.signedInUser);
               console.log(" Atendente"+ $scope.email);
              },
                function(error) {
                //sharedUtils.hideLoading();
                //sharedUtils.showAlert("Please note","Authentication Error");
                alert('Please note","Authentication Error'+ error);
                console.log(error);
              }
        );
  }// fim da funcao login 

$scope.loginEmail();


var db = firebase.database();
var ref = db.ref(); 



var ref = new Firebase("https://chatbotpoc.com");
var chamados = $firebaseArray(ref);

console.log(chamados)

$scope.chamados = $firebaseArray(ref);
  console.log($scope.chamados);


// Once
//ref.once("value", function(snapshot) {  
//
//        $scope.$apply(function () { // Atualizando na view 
//        $scope.dados=  snapshot.val();
//        //console.log(snapshot.val());
//        });
//});







  function loadPages() {
    console.log('Current page is : ' + $scope.paging.current);

    // TODO : Load current page Data here

    $scope.currentPage = $scope.paging.current;
  }

});