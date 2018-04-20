cyndyApp.controller('dashboardCtrl', function ($scope, $state, apiCall, $stateParams) {

    var token = localStorage.getItem('token');

    if (token == 'null') {
        $state.go('login');
    }
    else {
        var userType = localStorage.getItem('userType');
        var json = {
            userType: userType
        };
        $scope.users = [];
        $scope.viewDetail = function (userData) {
            params = {
                'user': userData
            }
            $state.go('navigation.viewDetails', params);
        };

        $scope.manageImage = function (userData) {
            params = {
                'user': userData
            }
            $state.go('navigation.manage', params);
        };


        apiCall.getData('POST', 'getUsersToManageImage', json, token).then(function (dataResponse) {

            if (dataResponse.data.status == 200) {
                $scope.users = dataResponse.data.data;
            }
            else {
                alert(dataResponse.data.message);
            }
        });


        $scope.downloadPdf = function (user) {
            var pdf = new jsPDF();
            var img = new Image;
            img.onload = function () {
                pdf.text(20, 20, 'User Name :');
                pdf.text(60, 20, user.userName);
                pdf.text(20, 30, 'Email Id :');
                pdf.text(60, 30, user.email);
                pdf.text(20, 40, 'Mob. Number :');
                pdf.text(60, 40, user.phoneNumber);
                pdf.text(20, 50, 'Stylist Name :');
                pdf.text(60, 50, user.stylistName);
                pdf.text(20, 70, 'User Image');
                pdf.addImage(this, 20, 80);
                pdf.save("test.pdf");
            };
            img.crossOrigin = "";  // for demo as we are at different origin than image
            img.src = user.imageUrl;

        }
    }

})