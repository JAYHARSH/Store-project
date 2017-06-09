angular.module("gadgetsStore")
    .controller('accountController', function ($scope, $http, $window, registerUrl, tokenUrl, tokenKey) {

        $scope.hasLoginError = false;
        $scope.hasRegistrationError = false;

        // Registration
        $scope.register = function () {

            $scope.hasRegistrationError = false;
            $scope.result = '';

            var data = {
                Email: $scope.registerEmail,
                Password: $scope.registerPassword,
                ConfirmPassword: $scope.registerPassword2
            };

            $http.post(registerUrl, JSON.stringify(data))
                    .then(function (data, status, headers, config) {
                        console.log(data.data);
                        $window.location.href="#!/login";
                    }).catch(function (data, status, headers, config) {
                        $scope.hasRegistrationError = true;
                        var errorMessage = data.Message;
                        
                        $scope.registrationErrorDescription = errorMessage;

                        if (data.data.ModelState['model.Email'])
                            $scope.registrationErrorDescription += data.data.ModelState['model.Email'];

                        if (data.data.ModelState['model.Password'])
                            $scope.registrationErrorDescription += data.data.ModelState['model.Password'];

                        if (data.data.ModelState['model.ConfirmPassword'])
                            $scope.registrationErrorDescription += data.data.ModelState['model.ConfirmPassword'];

                        if (data.data.ModelState[''])
                            $scope.registrationErrorDescription += data.data.ModelState[''];

                    }).finally(function () {
                    });
        }

        $scope.login = function () {
            $scope.result = '';
           
            var loginData = {
                grant_type: 'password',
                username: $scope.loginEmail,
                password: $scope.loginPassword
            };

            $http({
                method: 'POST',
                url: tokenUrl,
                data: $.param(loginData),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (result) {
                console.log(result.data);
                $window.sessionStorage.setItem(tokenKey, result.data.access_token);
                $scope.hasLoginError = false;
                $scope.isAuthenticated = true;
                $window.location.href = localStorage.getItem(URL);
                
             
            }, function (data, status, headers, config) {
                $scope.hasLoginError = true;
                $scope.loginErrorDescription = data.data.error_description;
            });

        }

    });