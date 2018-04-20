cyndyApp.controller('manageUserCtrl', function ($scope, $state, apiCall) {
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
        apiCall.getData('POST', 'getAllUsers', json, token).then(function (dataResponse) {

            if (dataResponse.data.status == 200) {
                $scope.users = dataResponse.data.data;
            }
            else {
                alert(dataResponse.data.message);
            }
        });
    }

})