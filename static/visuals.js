function GameTick() {
    if (document.getElementById('points')) {
        document.getElementById('points').innerHTML = "You have:" + (Points) + " Dilyan Points";
    }
    //add anything that should be constantly running\
    roomids = document.querySelectorAll('[data-room-id]');
    #console.log(Points)
}
document.addEventListener('DOMContentLoaded', function () {
    setInterval(GameTick, 10);
});
