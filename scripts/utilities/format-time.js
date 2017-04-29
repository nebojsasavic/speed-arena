export default (timeDifferenceInMillis) => {
    return formatTime(parseInt(timeDifferenceInMillis, 10))
}
    
const PAD = '0';

function formatTime(seconds) {

    // Seconds.

    seconds = seconds % 60

    if (seconds < 10) {
        seconds =  PAD + seconds
    }

    // Minutes.

    let minutes = parseInt(seconds / 60, 10)

    if (minutes < 10) {
        minutes = PAD + minutes
    }

    return minutes + ':' + seconds

}
