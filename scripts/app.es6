(function(window) {
    
    const CANVAS  = document.getElementById('canvas')
    const CONTEXT = CANVAS.getContext('2d')

    /* The main render function. */
    let render = () => {

        CONTEXT.fillStyle = '#000000'
        CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)

        window.requestAnimationFrame(render)

    }

    let initializeCanvas = CANVAS => {

        let resizeCanvas = () => {
            CANVAS.width  = window.innerWidth
            CANVAS.height = window.innerHeight
            render()
        }

        window.addEventListener('resize', resizeCanvas, false)
        resizeCanvas(CANVAS)
    }
    initializeCanvas(CANVAS)

})(window)
