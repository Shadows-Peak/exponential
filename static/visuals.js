function GameTick() {
    document.getElementById('points').innerHTML = "You have:" + (Points) + " Dilyan Points";
    //add anything that should be constantly running\
    roomids = document.querySelectorAll('[data-room-id]');
    console.log(Points)
}
setInterval(GameTick, 10);

