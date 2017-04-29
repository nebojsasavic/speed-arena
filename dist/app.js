'use strict';

(function (window) {

    var CANVAS = document.getElementById('canvas');
    var CONTEXT = CANVAS.getContext('2d');

    /* The main render function. */
    var render = function render() {

        CONTEXT.fillStyle = '#000000';
        CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);

        console.log('keksi smeksi');

        window.requestAnimationFrame(render);
    };

    var initializeCanvas = function initializeCanvas(CANVAS) {

        var resizeCanvas = function resizeCanvas() {
            CANVAS.width = window.innerWidth;
            CANVAS.height = window.innerHeight;
            render();
        };

        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas(CANVAS);
    };
    initializeCanvas(CANVAS);
})(window);