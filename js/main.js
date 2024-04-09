var app = angular.module("myApp", ["ngRoute"]);
      app.controller("myCtrl",function ($scope, $rootScope, $routeParams, $http) {
        // tao mang chua tai khoan
        $scope.list_acc =[];
        // tao object de lay thong tin tai khoan tu form
        $scope.info = {};
        // dang ky
        $scope.reg = function(){
          // day vao mang thong tin tren form
          if($scope.agree)
          {
            if($scope.list_acc.push(angular.copy($scope.info))){
              // chuyen thanh chuoi de luu vao localstore
              localStorage.setItem("list_taikhoan",angular.toJson($scope.list_acc));
              alert("Đăng Ký Thành Công");
            }
          }
          else{
            alert("Đăng Ký Không Thành Công");
          }
        }
        // chuyen nguoc lai thanh doi tuong
        if(localStorage.getItem("list_taikhoan")) // neu trong list-taikhoan co ton tai
          {
            $scope.list_acc = angular.fromJson(localStorage.getItem("list_taikhoan"));
          }
          console.log($scope.list_acc);
        $rootScope.isLogin = false;
        if(sessionStorage.getItem('login'))
        {
          $rootScope.isLogin = true;
          $scope.info = angular.fromJson(sessionStorage.getItem('login'));
        }
        $scope.login = function(){
          // goi function 
          var check = checkLogin($scope.info.name,$scope.info.pass);
          if(check !=null)
          {
            alert("Đăng Nhập Thành Công");
            sessionStorage.setItem('login',angular.toJson(check));
            window.location.href = "#!index"
            $rootScope.isLogin = true;
          }
          else
          {
            alert("Đăng Nhập Thất Bại");
            console.log(localStorage.getItem("list_taikhoan"));
            $rootScope.isLogin = false;
          }
        }
        function checkLogin(user,password){
          // duyet mang
          for(let i=0;i<$scope.list_acc.length;i++)
          {
            if($scope.list_acc[i].name == user && $scope.list_acc[i].pass == password)
            {
              return $scope.list_acc[i]; // tra phan tu tai vi tri i neu dieu kien dung
            }
          }
        }
        $rootScope.logout = function(){
          sessionStorage.removeItem('login');
          $rootScope.isLogin = false;
          window.location.href = "#!index";
        }
        // Kiem tra password
          $scope.passwordMatch = false;
          $scope.checkPasswordMatch = function () {
          $scope.passwordMatch = $scope.info.pass === $scope.info.passconf;
          };
          // chuc nang gio hang
          $rootScope.addcart = function(sp)
          {
            if(typeof $rootScope.cart=='undefined')
            {
              $rootScope.cart=[]; // tao mang chua gio hang
            }
            var index = $rootScope.cart.findIndex(p => p.id == sp.id) // tim san pham trong mang
            if(index>=0)
            {
              $rootScope.cart[index].soluong++; // tang so luong neu san pham co trong mang
            }
            else
            {
              var xincart = {id:sp.id,image:sp.image,name:sp.name,price:sp.price,soluong:1}; // cac thanh phan cua san pham them vao mang
              $rootScope.cart.push(xincart) // add vao mang 
            }
            console.log($scope.cart)
          }
          $rootScope.removeCart = function(index) // xoa san pham
          {
            $rootScope.cart.splice(index,1);
          }

          $rootScope.tongsoluong=function(){ // tinh tong so luong
            var tsl=0;
            for(i=0;i<$scope.cart.length;i++)
            {
              tsl +=$scope.cart[i].soluong;
            }
            return tsl;
          }

          $rootScope.tongtien=function(){ // tinh tong tien
            var tt=0;
            for(i=0;i<$scope.cart.length;i++)
            {
              tt +=$scope.cart[i].soluong*$scope.cart[i].price;
            }
            return tt;
          }
          $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/; // sdt
          $scope.products = [];
          //Đọc dữ liệu từ file json
          $http.get("./data/data.json").then(function (reponse) {
            $scope.products = reponse.data;
            //Khúc này là chuyển từ id để lấy sản phẩm 
            $scope.detailPro = $scope.products.find(item=>item.id==$routeParams.id);
          });        
        }
      );
      app.config(function ($routeProvider) {
        $routeProvider
          .when("/about", {
            templateUrl: "./html/about.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/home", {
            templateUrl: "./html/home.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/contact", {
            templateUrl: "./html/contact.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/detail/:id", {
            templateUrl: "./html/detailProduct.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/cart", {
            templateUrl: "./html/cart.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/login", {
            templateUrl: "./html/login.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/signup", {
            templateUrl: "./html/signup.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/product", {
            templateUrl: "./html/product.html?" + Math.random(),
            controller: "myCtrl",
          })
          .otherwise({
            templateUrl: "./html/home.html",
            controller: "myCtrl",
          });
      });
      


