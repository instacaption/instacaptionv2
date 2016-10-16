(function () {
    //'use strict';

    // CLARIFAI HERE
    var app = new Clarifai.App(
        'wHIFmkeN4zK0u-9fbniBuBuRvr46iqH90Qm6TpHR', // id
        'oXH7OBXjkHkxUprD-1ldyof2Q29WU76xaAkeBLFw' // secret
    );

    // ANGULAR STARTS HERE
    angular.module('app1', [])
        .controller('appController', appController);

    appController.$inject = ['$scope'];

    function appController($scope) {
        $scope.addOnAddress = "https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en-US";
        $scope.frontImage = "img/canoe.jpg";
        $scope.tags = [];
        // predict the contents of an image by passing in a url
        $scope.image = "https://samples.clarifai.com/metro-north.jpg";
        //$scope.image = "img/canoe.jpg";

        $scope.loadImageFileAsURL = function () {
                console.log("hey");
                // NAME INPUT BOX 'inputFileToLoad'
                var filesSelected = document.getElementById("inputFileToLoad").files;
                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];

                    var srcData = fileToLoad.target.result; // <--- data: base64
                    console.log("srcData");

                    var divTest = document.getElementById("frontImage");

                    divTest.src = srcData;

                }
            }
            // file =>
        $scope.searchImage = function (image) {
            app.models.predict(Clarifai.GENERAL_MODEL, image).then(
                function (response) {
                    var temp = [];
                    var values = [];
                    var results = response["data"]["outputs"][0]["data"]["concepts"];
                    for (i = 0; i < results.length; i++) {
                        temp.push(results[i]["name"]);
                        values.push(results[i]["value"]);
                    }


                    //console.log(tags);
                    $scope.$apply(function () {
                        $scope.tags = temp;
                    });


                },
                function (err) {
                    console.error(err);
                }
            );
        }
        $scope.searchImage($scope.image);

    }
})()