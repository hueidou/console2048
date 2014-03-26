//#!/usr/bin/env node

// 一些变量
var board = [
[2, 512, 4, 8],
[256, 1024, 8, 4],
[16, 64, 0, 128],
[2, 0, 32, 2048]
]; // 矩阵
var board = [
[2, 0, 4, 8],
[0, 0, 8, 4],
[16, 64, 0, 0],
[2, 0, 32, 0]
];
var pieces; // 
var flag_skip; // 

var moves; // 可用操作数，用于判断玩家是否已输掉了游戏

// 默认配置
var board_size = 4;
var target = 2048;

// 颜色
var blocks = {
    2: { 'str': ' 2  ', 'c': 'black', 'bc': '#eee4da' },
    4: { 'str': ' 4  ', 'c': 'black', 'bc': '#ede0c8' },
    8: { 'str': ' 8  ', 'c': '#f9f6f2', 'bc': '#f2b179' },
    16: { 'str': ' 16 ', 'c': '#f9f6f2', 'bc': '#f59563' },
    32: { 'str': ' 32 ', 'c': '#f9f6f2', 'bc': '#f67c5f' },
    64: { 'str': ' 64 ', 'c': '#f9f6f2', 'bc': '#f65e3b' },
    128: { 'str': '128 ', 'c': '#f9f6f2', 'bc': '#edcf72' },
    256: { 'str': '256 ', 'c': '#f9f6f2', 'bc': '#edcc61' },
    512: { 'str': '512 ', 'c': '#f9f6f2', 'bc': '#edc850' },
    1024: { 'str': '1024', 'c': '#f9f6f2', 'bc': '#edc53f' },
    2048: { 'str': '2048', 'c': '#f9f6f2', 'bc': '#edc22e' }
};

// 

for (var row in board) {
    var str = [];
    var css = [];
    for (var column in board[row]) {
        var num = board[row][column];
        if (num != 0) {
            str.push('%c' + blocks[num].str);
            css.push('"color: ' + blocks[num].c + ';background-color: ' + blocks[num].bc + ';border:#eee 1px solid"');
        } else {
            str.push('%c    ');
            css.push('"background-color: #ddd;border:#eee 1px solid"');
        }

    }
    var eval1 = 'console.log("' + str.join('') + '",' + css.join(',') + ')';
    eval(eval1);
    //console.log(str.join(''));
    //console.log(css.join(','));
}
