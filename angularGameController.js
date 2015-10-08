/**
 * Created by X086353 on 10/7/2015.
 */
angular.module('myApp', []).controller('gameCtrl', function ($scope) {
    $scope.counter = 0;
    $scope.label = '';
    $scope.showStartButton = true;
    $scope.operatorStringArray = ['+', '-', '*', '/']
    $scope.buttons = [];
    $scope.totalNumber = 0;
    $scope.operator = '';
    $scope.randomButtons = [];
    $scope.gameWon = false;
    $scope.wronfAnswer = false;

    $scope.setButtons = function () {
        for (var i = 0; i < 4; i++) {
            var operatorButton = {
                label: $scope.operatorStringArray[i],
                operator: $scope.operatorStringArray[i],
                disabled: true
            };
            var soRandom = Math.round(Math.random() * 6) + 2;
            var numberButtonNumber = {id: soRandom, label: soRandom.toString(), disabled: false, disabledAll: false};
            $scope.randomButtons.push(numberButtonNumber);
            $scope.buttons.push(operatorButton);
        }
        $scope.showStartButton = false;
    };

    $scope.solution = ' ';
    $scope.setSolutionOperator = function (operator) {
        $scope.solution += operator;
        $scope.counter++;
        for (var i = 0; i < 4; i++) {
            $scope.randomButtons[i].disabledAll = false;
            $scope.buttons[i].disabled = true;

        }
        $scope.operator = operator;
    };

    $scope.setSolution = function (randomButton) {
        $scope.solution += randomButton.id;
        randomButton.disabled = true;
        for (var i = 0; i < 4; i++) {
            $scope.randomButtons[i].disabledAll = true;
            if ($scope.counter != 3) {
                $scope.buttons[i].disabled = false;
            }
        }
        if ($scope.counter == 0) {
            $scope.totalNumber = randomButton.id;
        } else {
            switch ($scope.operator) {
                case ('+'):
                    $scope.totalNumber += randomButton.id;
                    break;
                case ('-'):
                    $scope.totalNumber -= randomButton.id;
                    break;
                case ('*'):
                    $scope.totalNumber *= randomButton.id;
                    break;
                case ('/'):
                    $scope.totalNumber /= randomButton.id;
                    break;
            }
        }
    };

    $scope.resetSolution = function () {
        for (var i = 0; i < 4; i++) {
            $scope.randomButtons[i].disabled = false;
            $scope.randomButtons[i].disabledAll = false;
            $scope.buttons[i].disabled = true;
            $scope.counter = 0;
            $scope.solution = '';
            $scope.totalNumber = 0;
            $scope.operator = '';
            $scope.wrongAnswer = false;
        }
    };

    $scope.calculate = function (id) {
        if ($scope.totalNumber == 24) {
            $scope.gameWon = true;
        } else {
            $scope.wrongAnswer = true;
        }
    };

    $scope.newGame = function () {
        $scope.gameWon = false;
        $scope.randomButtons = [];
        for (var i = 0; i < 4; i++) {
            var soRandom = Math.round(Math.random() * 6) + 2;
            var numberButtonNumber = {id: soRandom, label: soRandom.toString(), disabled: false, disabledAll: false};
            $scope.randomButtons.push(numberButtonNumber);
        }
        $scope.resetSolution();

    }
});