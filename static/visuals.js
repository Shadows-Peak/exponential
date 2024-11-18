function GameTick() {
    document.getElementById('points').innerHTML = "You have:" + (Points) + " Dilyan Points";
    //add anything that should be constantly running\
    roomids = document.querySelectorAll('[room-id]');
    document.getElementById('value-container').innerHTML = roomids

}
setInterval(GameTick, 10);

