var app = angular.module('app', []);

app.controller('mainController', ['$scope', '$timeout', function($scope, $timeout) {

    // 2 5 8
    // 1 4 7
    // 0 3 6

    var player = "";
    var comp = "";
    $scope.ttt = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    $scope.disabled = [true, true, true, true, true, true, true, true, true];
    var used = [];
    var random = 0;
    var winner = "";
    var flag = false;
    $scope.over = "";
    var finish = false;

    $scope.start = function(str) {
        if (str === "X") {
            player = str;
            comp = "O";
        } else if (str === "O") {
            player = str;
            comp = "X";
        }
        var num = parseInt(Math.random() * 9);
        if (num === 1 || num === 3 || num === 5 || num === 7) {
            $scope.start();
        } else {
            $scope.ttt[num] = comp;
            $scope.disabled[num] = false;
            used.push(num);
            $("#" + num).removeClass("btn-default cursor");
        }
    };
    $scope.square = function(id) {
        flag = true;
        $scope.ttt[id] = player;
        $scope.disabled[id] = false;
        used.push(id);
        over();
        if (used.length === 2) {
            ai2(id);
        } else if (used.length === 4) {
            ai4();
        } else if (used.length === 6) {
            ai6();
        } else if (used.length === 8) {
            ai8();
        }
    };

    var generate = function() {
        random = parseInt(Math.random() * 9);
        for (var i in used) {
            if (random === used[i]) {
                generate();
            }
        }
    };
    var ai = function(num) {
        $scope.ttt[num] = comp;
        $scope.disabled[num] = false;
        used.push(num);
        flag = false;

    };
    var ai2 = function(id) {
        generate();
        if (used[0] === 0 || used[0] === 2 || used[0] === 6 || used[0] === 8) {
            if (random === 0 || random === 2 || random === 6 || random === 8) {
                verify(random);
            } else {
                ai2(id);
            }
        } else if (used[0] === 4) {
            if (id === 1 || id === 3 || id === 5 || id === 7) {
                if (random === 0 || random === 2 || random === 6 || random === 8) {
                    verify(random);
                } else {
                    ai2(id);
                }
            } else if (id === 0 || id === 2 || id === 6 || id === 8) {
                if (random === 0 || random === 2 || random === 6 || random === 8) {
                    verify(random);
                } else {
                    ai2(id);
                }
            }
        }
    };
    var ai4 = function() {
        check(0, 2);
        over();
        check(1, 3);
        over();
        complicated();
        over();
        if (flag) {
            generate();
            verify(random);
            over();
        }
    };
    var ai6 = function() {
        check(0, 2);
        over();
        check(2, 4);
        over();
        check(0, 4);
        over();
        check(1, 3);
        over();
        check(3, 5);
        over();
        check(1, 5);
        over();
        gamble();
        over();
        if (flag) {
            generate();
            verify(random);
            over();
        }
    };
    var ai8 = function() {
        check(0, 2);
        over();
        check(2, 4);
        over();
        check(4, 6);
        over();
        check(0, 4);
        over();
        check(2, 6);
        over();
        check(0, 6);
        over();
        check(1, 3);
        over();
        check(3, 5);
        over();
        check(5, 7);
        over();
        check(1, 5);
        over();
        check(3, 7);
        over();
        check(1, 7);
        over();
        if (flag) {
            generate();
            verify(random);
            over();
        }
        if (!finish) {
            draw();
        }
    };
    var over = function() {
        if ($scope.ttt[0] === player && $scope.ttt[3] === player && $scope.ttt[6] === player) {
            win(player);
            animate("#0, #3, #6");
        } else if ($scope.ttt[1] === player && $scope.ttt[4] === player && $scope.ttt[7] === player) {
            win(player);
            animate("#1, #4, #7");
        } else if ($scope.ttt[2] === player && $scope.ttt[5] === player && $scope.ttt[8] === player) {
            win(player);
            animate("#2, #5, #8");
        } else if ($scope.ttt[0] === player && $scope.ttt[1] === player && $scope.ttt[2] === player) {
            win(player);
            animate("#0, #1, #2");
        } else if ($scope.ttt[3] === player && $scope.ttt[4] === player && $scope.ttt[5] === player) {
            win(player);
            animate("#3, #4, #5");
        } else if ($scope.ttt[6] === player && $scope.ttt[7] === player && $scope.ttt[8] === player) {
            win(player);
            animate("#6, #7, #8");
        } else if ($scope.ttt[0] === player && $scope.ttt[4] === player && $scope.ttt[8] === player) {
            win(player);
            animate("#0, #4, #8");
        } else if ($scope.ttt[2] === player && $scope.ttt[4] === player && $scope.ttt[6] === player) {
            win(player);
            animate("#2, #4, #6");
        } else if ($scope.ttt[0] === comp && $scope.ttt[3] === comp && $scope.ttt[6] === comp) {
            win(comp);
            animate("#0, #3, #6");
        } else if ($scope.ttt[1] === comp && $scope.ttt[4] === comp && $scope.ttt[7] === comp) {
            win(comp);
            animate("#1, #4, #7");
        } else if ($scope.ttt[2] === comp && $scope.ttt[5] === comp && $scope.ttt[8] === comp) {
            win(comp);
            animate("#2, #5, #8");
        } else if ($scope.ttt[0] === comp && $scope.ttt[1] === comp && $scope.ttt[2] === comp) {
            win(comp);
            animate("#0, #1, #2");
        } else if ($scope.ttt[3] === comp && $scope.ttt[4] === comp && $scope.ttt[5] === comp) {
            win(comp);
            animate("#3, #4, #5");
        } else if ($scope.ttt[6] === comp && $scope.ttt[7] === comp && $scope.ttt[8] === comp) {
            win(comp);
            animate("#6, #7, #8");
        } else if ($scope.ttt[0] === comp && $scope.ttt[4] === comp && $scope.ttt[8] === comp) {
            win(comp);
            animate("#0, #4, #8");
        } else if ($scope.ttt[2] === comp && $scope.ttt[4] === comp && $scope.ttt[6] === comp) {
            win(comp);
            animate("#2, #4, #6");
        }
    };
    var win = function(xo) {
        finish = true;
        if (xo === player) {
            winner = "You";
        } else if (xo === comp) {
            winner = "I";
        }
        $scope.disabled = [false, false, false, false, false, false, false, false, false];
        $("td").removeClass("btn-default cursor")
        $scope.over = "<span class='mono'>[<b>" + xo + "</b>]</span>&nbsp;" + winner + "&nbsp;Win!&nbsp;";
        dialog();
    };
    var draw = function() {
        finish = true;
        $scope.over = "Draw!&nbsp;";
        $('#over').modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });
    };

    $scope.again = function() {
        finish = false;
        player = "";
        comp = "";
        random = 0;
        winner = "";
        flag = false;
        $scope.ttt = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        $scope.disabled = [true, true, true, true, true, true, true, true, true];
        used = [];
        $('#start').modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });
        $("td").addClass("btn-default cursor").removeClass("animated flash");
    };

    var check = function(i, j) {
        if (flag) {
            if (used[i] === 0 && used[j] === 1) {
                verify(2);
            } else if (used[i] === 0 && used[j] === 2) {
                verify(1);
            } else if (used[i] === 0 && used[j] === 3) {
                verify(6);
            } else if (used[i] === 0 && used[j] === 4) {
                verify(8);
            } else if (used[i] === 0 && used[j] === 6) {
                verify(3);
            } else if (used[i] === 0 && used[j] === 8) {
                verify(4);
            } else if (used[i] === 1 && used[j] === 0) {
                verify(2);
            } else if (used[i] === 1 && used[j] === 2) {
                verify(0);
            } else if (used[i] === 1 && used[j] === 4) {
                verify(7);
            } else if (used[i] === 1 && used[j] === 7) {
                verify(4);
            } else if (used[i] === 2 && used[j] === 0) {
                verify(1);
            } else if (used[i] === 2 && used[j] === 1) {
                verify(0);
            } else if (used[i] === 2 && used[j] === 4) {
                verify(6);
            } else if (used[i] === 2 && used[j] === 5) {
                verify(8);
            } else if (used[i] === 2 && used[j] === 6) {
                verify(4);
            } else if (used[i] === 2 && used[j] === 8) {
                verify(5);
            } else if (used[i] === 3 && used[j] === 0) {
                verify(6);
            } else if (used[i] === 3 && used[j] === 4) {
                verify(5);
            } else if (used[i] === 3 && used[j] === 5) {
                verify(4);
            } else if (used[i] === 3 && used[j] === 6) {
                verify(0);
            } else if (used[i] === 4 && used[j] === 0) {
                verify(8);
            } else if (used[i] === 4 && used[j] === 1) {
                verify(7);
            } else if (used[i] === 4 && used[j] === 2) {
                verify(6);
            } else if (used[i] === 4 && used[j] === 3) {
                verify(5);
            } else if (used[i] === 4 && used[j] === 5) {
                verify(3);
            } else if (used[i] === 4 && used[j] === 6) {
                verify(2);
            } else if (used[i] === 4 && used[j] === 7) {
                verify(1);
            } else if (used[i] === 4 && used[j] === 8) {
                verify(0);
            } else if (used[i] === 5 && used[j] === 2) {
                verify(8);
            } else if (used[i] === 5 && used[j] === 3) {
                verify(4);
            } else if (used[i] === 5 && used[j] === 4) {
                verify(3);
            } else if (used[i] === 5 && used[j] === 8) {
                verify(2);
            } else if (used[i] === 6 && used[j] === 0) {
                verify(3);
            } else if (used[i] === 6 && used[j] === 2) {
                verify(4);
            } else if (used[i] === 6 && used[j] === 3) {
                verify(0);
            } else if (used[i] === 6 && used[j] === 4) {
                verify(2);
            } else if (used[i] === 6 && used[j] === 7) {
                verify(8);
            } else if (used[i] === 6 && used[j] === 8) {
                verify(7);
            } else if (used[i] === 7 && used[j] === 1) {
                verify(4);
            } else if (used[i] === 7 && used[j] === 4) {
                verify(1);
            } else if (used[i] === 7 && used[j] === 6) {
                verify(8);
            } else if (used[i] === 7 && used[j] === 8) {
                verify(6);
            } else if (used[i] === 8 && used[j] === 0) {
                verify(4);
            } else if (used[i] === 8 && used[j] === 2) {
                verify(5);
            } else if (used[i] === 8 && used[j] === 4) {
                verify(0);
            } else if (used[i] === 8 && used[j] === 5) {
                verify(2);
            } else if (used[i] === 8 && used[j] === 6) {
                verify(7);
            } else if (used[i] === 8 && used[j] === 7) {
                verify(6);
            }
        }
    };
    var verify = function(num) {
        if ($scope.disabled[num]) {
            ai(num);
        }
    };

    var complicated = function() {
        if (flag) {
            if (used[0] === 0 && used[2] === 2) {
                if (used[1] === 1 || used[3] === 1) {
                    if (used[1] === 3 || used[3] === 3 || used[1] === 6 || used[3] === 6) {
                        verify(8);
                    } else if (used[1] === 5 || used[3] === 5 || used[1] === 8 || used[3] === 8) {
                        verify(6);
                    }
                }
            } else if (used[0] === 0 && used[2] === 6) {
                if (used[1] === 3 || used[3] === 3) {
                    if (used[1] === 7 || used[3] === 7 || used[1] === 8 || used[3] === 8) {
                        verify(2);
                    } else if (used[1] === 1 || used[3] === 1 || used[1] === 2 || used[3] === 2) {
                        verify(8);
                    }
                }
            } else if (used[0] === 2 && used[2] === 0) {
                if (used[1] === 1 || used[3] === 1) {
                    if (used[1] === 3 || used[3] === 3 || used[1] === 6 || used[3] === 6) {
                        verify(8);
                    } else if (used[1] === 5 || used[3] === 5 || used[1] === 8 || used[3] === 8) {
                        verify(6);
                    }
                }
            } else if (used[0] === 2 && used[2] === 8) {
                if (used[1] === 5 || used[3] === 5) {
                    if (used[1] === 0 || used[3] === 0 || used[1] === 1 || used[3] === 1) {
                        verify(6);
                    } else if (used[1] === 6 || used[3] === 6 || used[1] === 7 || used[3] === 7) {
                        verify(0);
                    }
                }
            } else if (used[0] === 6 && used[2] === 0) {
                if (used[1] === 3 || used[3] === 3) {
                    if (used[1] === 7 || used[3] === 7 || used[1] === 8 || used[3] === 8) {
                        verify(2);
                    } else if (used[1] === 1 || used[3] === 1 || used[1] === 2 || used[3] === 2) {
                        verify(8);
                    }
                }
            } else if (used[0] === 6 && used[2] === 8) {
                if (used[1] === 7 || used[3] === 7) {
                    if (used[1] === 2 || used[3] === 2 || used[1] === 5 || used[3] === 5) {
                        verify(0);
                    } else if (used[1] === 0 || used[3] === 0 || used[1] === 3 || used[3] === 3) {
                        verify(2);
                    }
                }
            } else if (used[0] === 8 && used[2] === 2) {
                if (used[1] === 5 || used[3] === 5) {
                    if (used[1] === 0 || used[3] === 0 || used[1] === 1 || used[3] === 1) {
                        verify(6);
                    } else if (used[1] === 6 || used[3] === 6 || used[1] === 7 || used[3] === 7) {
                        verify(0);
                    }
                }
            } else if (used[0] === 8 && used[2] === 6) {
                if (used[1] === 7 || used[3] === 7) {
                    if (used[1] === 2 || used[3] === 2 || used[1] === 5 || used[3] === 5) {
                        verify(0);
                    } else if (used[1] === 0 || used[3] === 0 || used[1] === 3 || used[3] === 3) {
                        verify(2);
                    }
                }
            } else if (used[0] === 0 && used[2] === 4) {
                if (used[1] === 8 || used[3] === 8) {
                    if (used[1] === 3 || used[3] === 3) {
                        verify(2);
                    } else if (used[1] === 1 || used[3] === 1) {
                        verify(6);
                    }
                }
            } else if (used[0] === 2 && used[2] === 4) {
                if (used[1] === 6 || used[3] === 6) {
                    if (used[1] === 1 || used[3] === 1) {
                        verify(8);
                    } else if (used[1] === 5 || used[3] === 5) {
                        verify(0);
                    }
                }
            } else if (used[0] === 4 && used[2] === 0) {
                if (used[1] === 8 || used[3] === 8) {
                    if (used[1] === 3 || used[3] === 3) {
                        verify(2);
                    } else if (used[1] === 1 || used[3] === 1) {
                        verify(6);
                    }
                }
            } else if (used[0] === 4 && used[2] === 2) {
                if (used[1] === 6 || used[3] === 6) {
                    if (used[1] === 1 || used[3] === 1) {
                        verify(8);
                    } else if (used[1] === 5 || used[3] === 5) {
                        verify(0);
                    }
                }
            } else if (used[0] === 4 && used[2] === 6) {
                if (used[1] === 2 || used[3] === 2) {
                    if (used[1] === 7 || used[3] === 7) {
                        verify(0);
                    } else if (used[1] === 3 || used[3] === 3) {
                        verify(8);
                    }
                }
            } else if (used[0] === 4 && used[2] === 8) {
                if (used[1] === 0 || used[3] === 0) {
                    if (used[1] === 5 || used[3] === 5) {
                        verify(6);
                    } else if (used[1] === 7 || used[3] === 7) {
                        verify(2);
                    }
                }
            } else if (used[0] === 6 && used[2] === 4) {
                if (used[1] === 2 || used[3] === 2) {
                    if (used[1] === 7 || used[3] === 7) {
                        verify(0);
                    } else if (used[1] === 3 || used[3] === 3) {
                        verify(8);
                    }
                }
            } else if (used[0] === 8 && used[2] === 4) {
                if (used[1] === 0 || used[3] === 0) {
                    if (used[1] === 5 || used[3] === 5) {
                        verify(6);
                    } else if (used[1] === 7 || used[3] === 7) {
                        verify(2);
                    }
                }
            }
        }
    };
    var gamble = function() {
        if (flag) {
            var binary = parseInt(Math.random() * 2);
            if ($scope.disabled[3] && $scope.disabled[5] && !$scope.disabled[4]) {
                if (!$scope.disabled[6] && !$scope.disabled[8]) {
                    if (!$scope.disabled[0]) {
                        if (binary) {
                            verify(2);
                        } else if (!binary) {
                            verify(5);
                        }
                    } else if (!$scope.disabled[2]) {
                        if (binary) {
                            verify(0);
                        } else if (!binary) {
                            verify(3);
                        }
                    }
                } else if (!$scope.disabled[0] && !$scope.disabled[2]) {
                    if (!$scope.disabled[6]) {
                        if (binary) {
                            verify(5);
                        } else if (!binary) {
                            verify(8);
                        }
                    } else if (!$scope.disabled[8]) {
                        if (binary) {
                            verify(3);
                        } else if (!binary) {
                            verify(6);
                        }
                    }
                }
            } else if ($scope.disabled[1] && $scope.disabled[7] && !$scope.disabled[4]) {
                if (!$scope.disabled[0] && !$scope.disabled[6]) {
                    if (!$scope.disabled[2]) {
                        if (binary) {
                            verify(7);
                        } else if (!binary) {
                            verify(8);
                        }
                    } else if (!$scope.disabled[8]) {
                        if (binary) {
                            verify(1);
                        } else if (!binary) {
                            verify(2);
                        }
                    }
                } else if (!$scope.disabled[2] && !$scope.disabled[8]) {
                    if (!$scope.disabled[0]) {
                        if (binary) {
                            verify(6);
                        } else if (!binary) {
                            verify(7);
                        }
                    } else if (!$scope.disabled[6]) {
                        if (binary) {
                            verify(0);
                        } else if (!binary) {
                            verify(1);
                        }
                    }
                }
            }
        }
    };

    var animate = function(i, j, k) {
        $(i).addClass("animated flash");
        $(j).addClass("animated flash");
        $(k).addClass("animated flash");
    };

    var dialog = function() {
        $timeout(function() {
            $('#over').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });
        }, 2000);
    };

}]);

app.filter('renderHtml', ['$sce', function($sce) {
    return function(str) {
        return $sce.trustAsHtml(str);
    };
}]);

$(document).ready(function() {
    $("td").height($("td").width());
    $(window).resize(function() {
        $("td").height($("td").width());
    });
    $('#start').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
    $('td').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass("animated flash");
    });
    $("td").click(function() {
        $(this).removeClass("btn-default cursor");
    });
});