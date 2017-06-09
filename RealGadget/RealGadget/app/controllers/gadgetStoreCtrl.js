angular.module('gadgetsStore')
    .constant('gadgetsUrl', 'http://localhost:56516/api/gadgets')
    .constant('ordersUrl', 'http://localhost:56516/api/orders')
    .constant('categoriesUrl', 'http://localhost:56516/api/categories')
    .constant('tempOrdersUrl', 'http://localhost:56516/api/sessions/temporders')
    .constant('registerUrl', 'http://localhost:56516/api/account/register')
.constant('tokenUrl', '/Token')
.constant('tokenKey', 'access_token')
    .controller('gadgetStoreCtrl', function ($scope, $http, $window, gadgetsUrl, categoriesUrl, ordersUrl, tempOrdersUrl, cart, tokenKey) {

        $scope.data = {};

        $http.get(gadgetsUrl)
            .then(function (data) {
                $scope.data.gadgets = data.data;
                console.log($scope.data.gadgets);
              
            })
            .catch(function (error) {
                $scope.data.error = error.data;
                });

        $http.get(categoriesUrl)
        .then(function (data) {
            $scope.data.categories = data.data;
        })
        .catch(function (error) {
            $scope.data.error = error.data;
        });

        $scope.sendOrder = function (shippingDetails) {
            var token = $window.sessionStorage.getItem(tokenKey);
            console.log(token);
            var headers = {};
            if(token)
            {
                headers.Authorization = 'Bearer' + token;
            }
            var order = angular.copy(shippingDetails);
            order.gadgets = cart.getProducts();
            $http.post(ordersUrl, order, { headers: { 'Authorization': 'Bearer' + ' ' + token } })
            .then(function (data, status, headers, config) {
                alert(data.headers('Location'));
                $scope.data.OrderLocation = data.headers('Location');
                $scope.data.OrderID = data.data.OrderID;
                cart.getProducts().length = 0;
                $scope.saveOrder();
                $window.location.href = "#!complete";


            })
            .catch(function (data, status, headers, config) {
                console.log(data.status);
                if (data.status != 401) {
                    $scope.data.orderError = data.data.Message;
                }
                else {
                    localStorage.setItem(URL, "#!/submit");
                    $window.location.href = "#!/login";
                  
                }
            });
        }

        $scope.saveOrder = function ()
        {
            var currentProducts = cart.getProducts();
           $http.post(tempOrdersUrl, currentProducts)
                .then(function (data, status, headers, config) {
                }).catch(function (error) {
                }).finally(function () {
                });
        }

        $scope.checkSessionGadgets = function () {
            $http.get('http://localhost:56516/api/sessions/temporders')
            .then(function (data) {
                if (data.data) {
                    
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        console.log(item);
                        cart.pushItem(item);
                    }
                }
            })
            .catch(function (error) {
                console.log('error checking session: ' + error);
            });
        }


        $scope.showFilter = function () {
            return $window.location.href == '#!/';
        }

        $scope.checkoutComplete = function () {
            return $window.location.href == '#!/complete';
        }
        $scope.logout = function () {
            $window.sessionStorage.removeItem(tokenKey);
        }
        $scope.createAccount = function () {
            $window.location.href="#!/register";
        }
       
        
    });