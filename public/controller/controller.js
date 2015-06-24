var app = angular.module('loginApp', []);

app.controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.submit = function() {
		$http.post('/login', $scope.login)
		.success(function(response) {
			if(response == "Logged in as ADMIN"){
				$scope.login.pass = "";
				$scope.show = response;
				window.location = "admin.html";
			}else{
				$scope.show = response;
				$scope.login.pass = "";
			}
		});
	};
	
}]);

app.controller('registerCtrl', ['$scope', '$http', function ($scope, $http) {

	var flag = 0;
	var flag2 = 0; 

	$scope.checkUsername = function() {
		$http.post('/checkUsername', $scope.regis)
		.success(function(response) {
			$scope.show = response;
			if(response == "Username cannot be blank" || response == "Username is already exist"){
				flag1 = 1;
			}else{
				flag1 = 0;
			}
		});
	};

	$scope.checkRetypePassword = function() {
		if($scope.regis.password != $scope.retype){
			$scope.show = "Password does not match";
			flag2 = 1;
		}else{
			$scope.show = "Password matched";
			flag2 = 0;
		}

	};

	$scope.register = function() {
		if($scope.regis.username == '' || $scope.retype == '' || $scope.regis.password == '' || flag1 != 0 || flag2 != 0){
			$scope.show = "Please enter Username and Password";
		}else{
			$http.post('/register', $scope.regis)
			.success(function(response) {
			});
			$scope.regis = "";
			$scope.retype = "";
			window.location = "/index.html";
		}
	};

}]);

app.controller('adminCtrl', ['$scope', '$http', function ($scope, $http) {

	var refresh = function () {
		$http.get('/admin')
		.success(function(response) {
			$scope.data = response;
			$scope.login = "";
		});
	};

	refresh();

	$scope.remove = function(id) {
		$http.delete('/admin/' + id)
		.success(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		$http.get('/admin/' + id)
		.success(function(response) {
			$scope.login = response;
		});
	};

	$scope.update = function() {
		console.log($scope.login._id);
		$http.put('admin/' + $scope.login._id, $scope.login)
		.success(function(response) {
			refresh();
		});
	};	
	
	
}]);


