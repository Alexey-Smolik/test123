const app = angular.module('myApp', ['ngTable', 'ngMaterial']);

app.controller('investmentsCtrl', function($scope, NgTableParams) {
    $scope.isFind = false;
    $scope.investments = [
        {id: 1, name: 'inv1', imgUrl: './images/1.jpg', money: 1000000, country: '', areas: ['food', 'digital health'] },
        {id: 2, name: 'inv2', imgUrl: './images/2.jpg', money: 5000000, country: '', areas: ['Fintech', 'LegalTech'] },
        {id: 3, name: 'inv3', imgUrl: './images/3.jpg', money: 500000, country: 'Germany', areas: '' },
        {id: 4, name: 'inv4', imgUrl: './images/4.jpg', money: 1000000, country: 'Spain', areas: '' },
        {id: 5, name: 'inv5', imgUrl: './images/5.jpg', money: 10000000, country: '', areas: '' },
        {id: 6, name: 'inv6', imgUrl: './images/6.jpg', money: 250000, country: 'Germany', areas: '' }
    ];

    $scope.resultCountries = $scope.investments.filter(investment => investment.country).map(investment => investment.country).filter((country, index, self) => self.indexOf(country) === index);

    let areas = $scope.investments.filter(investment => investment.areas).map(investment => investment.areas).filter((area, index, self) => self.indexOf(area) === index);
    $scope.resultAreas = Array.prototype.concat.apply([], areas);

    $scope.find = () => {
        $scope.isFind = true;
        $scope.resultInvestments = $scope.investments.filter(investment => {
            return ((!$scope.money || investment.money >= $scope.money) && (!$scope.country || investment.country === $scope.country) && (!$scope.areas || checkArea(investment.areas, $scope.areas)));
        });

        /*$scope.investmentsTable = new NgTableParams({}, {
            dataset: $scope.investments.filter(investment => {
                return ((!$scope.money || investment.money >= $scope.money) && (!$scope.country || investment.country === $scope.country) && (!$scope.areas || checkArea(investment.areas, $scope.areas)));
            })
        });*/
    };

    function checkArea(investments, areas){
        return (new Set([...investments, ...areas])).size !== investments.length + areas.length;
    }

    $scope.getSelectedAreas = () => {
        if($scope.areas) return $scope.areas;
        return "Please select an area";
    };

    $scope.getSelectedCountry = () => {
        if($scope.country) return $scope.country;
        return "Please select a country";
    };

    $scope.cancel = () => {
        $scope.resultInvestments = [];
        $scope.isFind = false;
        $scope.money = '';
        $scope.country = '';
        $scope.areas = '';
    }
});