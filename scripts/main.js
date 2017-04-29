import GAME_STATES from './game_state/game-states'
import formatTime  from './utilities/format-time'
import KEY_CODES   from './config/char-codes'

const CANVAS  = document.getElementById('canvas')
const CONTEXT = CANVAS.getContext('2d')

let currentGameState = GAME_STATES.PLAYING
let gameStart        = +(new Date())
let timeDelta        = 0
let gameTimeElapsed  = 0

setupEventListeners()

/* The main render function. */
let render = () => {

    switch (currentGameState) {
        case GAME_STATES.MAIN_MENU:
            drawMainMenu(CONTEXT)
            break;
        case GAME_STATES.PLAYING:
            CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)

            CONTEXT.fillStyle = 'black'
            CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)

            CONTEXT.font      = '40px Arial'
            CONTEXT.fillStyle = 'red'
            CONTEXT.textAlign = 'center'

            // Calculate time.
            // timeDelta += (+(new Date) - gameStart) / 1000
            // if (timeDelta > 1) {
            //     gameTimeElapsed += parseInt(timeDelta, 10)
            //     timeDelta %= 1
            // }

            CONTEXT.fillText(formatTime(gameTimeElapsed), CANVAS.width / 2, CANVAS.height / 2)

            window.requestAnimationFrame(render)
            break;
        case GAME_STATES.PAUSED:
            CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)

            CONTEXT.fillStyle = 'red'
            CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)
            break;
    }

}

function drawMainMenu(CONTEXT) {
    // Draw background.
    CONTEXT.fillStyle = 'black'
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)

    // Draw menu buttons.
    CONTEXT.font      = '40px Arial'
    CONTEXT.fillStyle = 'red'
    CONTEXT.textAlign = 'center'
    CONTEXT.fillText('PLAY', CANVAS.width / 2, CANVAS.height / 2)
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




function setupEventListeners() {
    window.addEventListener('keypress', event => {
        switch (event.charCode) {
            case KEY_CODES.p:
                if (currentGameState === GAME_STATES.PAUSED) {
                    currentGameState = GAME_STATES.PLAYING
                    window.requestAnimationFrame(render)
                } else {
                    currentGameState = GAME_STATES.PAUSED
                }
                break
        }
        console.log(currentGameState)
    })
}
