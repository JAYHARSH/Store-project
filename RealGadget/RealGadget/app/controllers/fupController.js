
angular.module('gadgetsStore')
    .directive('ngFiles', ['$parse', function ($parse) {

        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        };

        return {
            link: fn_link
        }
    }])
    .controller('fupController', function ($scope, $http,$window,tokenKey) {

        var formdata = new FormData();

        $scope.getTheFiles = function ($files) {
            console.log($files);
            console.log($files[0].type);
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
                console.log(key + '' + value.name);
            });
        };
        $scope.AddCategory = function (category) {
            console.log(category.name);
            var token = $window.sessionStorage.getItem(tokenKey);
            console.log(token);
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer' + token;
            }
            formdata.append("name",category.name);
            var request = {
                method: 'POST',
                url: 'http://localhost:56516/api/categoryupload/',
                data: formdata,
                headers: {
                    'Authorization': 'Bearer' + ' ' + token,
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            };
            $http(request)
              .then(function (d) {
                  alert(d.data);
                  
              })
              .catch(function (data, status, headers, config) {
                  console.log(data.status);
                  if (data.status != 401) {
                      $scope.data.orderError = data.data.Message;
                  }
                  else {
                      localStorage.setItem(URL, "#!/admin");
                      $window.location.href = "#!/login";
                      
                  }
              });

        };


       

            // NOW UPLOAD THE FILES.
        $scope.AddGadget = function (gadget) {
            var token = $window.sessionStorage.getItem(tokenKey);
            console.log(token);
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer' + token;
            }
             angular.forEach(gadget, function (value, key) { formdata.append(key, value); console.log(key + ' ' + value); });
             var request = {
                 method: 'POST',
                 url: 'http://localhost:56516/api/imageupload/',
                 data: formdata,
                 headers: {
                     'Authorization': 'Bearer' + ' ' + token,
                     'Content-Type': undefined
                 },
                 transformRequest: angular.identity
             };

             // SEND THE FILES.
             $http(request)
                 .then(function (d) {
                     alert(d.data);
                 })
                 .catch(function (data, status, headers, config) {
                     console.log(data.status);
                     if (data.status != 401) {
                         $scope.data.orderError = data.data.Message;
                     }
                     else {
                         localStorage.setItem(URL,"#!/admin");
                         $window.location.href = "#!/login";
                  
                     }
                 });
         };

         $http.get('http://localhost:56516/api/categories/').then(function (d) { $scope.category = d.data; console.log(d.data); }).catch(function (error) { alert(error); });

    });


