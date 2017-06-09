﻿var app=angular.module("gadgetsStore", ['storeFilters','storeCart','ngRoute'])
            .config(function ($routeProvider) {
                $routeProvider.when("/gadgets", {
                    templateUrl: "app/views/gadgets.html"
                });
                $routeProvider.when("/checkout", {
                    templateUrl: "app/views/checkout.html"
                });
                $routeProvider.when("/submitorder", {
                    templateUrl: "app/views/submitOrder.html"
                });
                $routeProvider.when("/complete", {
                    templateUrl: "app/views/orderSubmitted.html"
                });
                $routeProvider.when("/login", {
                    templateUrl: "app/views/login.html"
                });
                $routeProvider.when("/register", {
                    templateUrl: "app/views/register.html"
                });
                $routeProvider.when("/admin", {
                    templateUrl: "app/views/admin.html"
                });
                $routeProvider.otherwise({
                    templateUrl: "app/views/gadgets.html"
                });
            });
