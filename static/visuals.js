function GameTick() {
    document.getElementById('points').innerHTML = "You have:" + (Points) + " Dilyan Points";
    //add anything that should be constantly running\
    roomids = document.querySelectorAll('[room-id]');
    iteration = 0 
    roomids.forEach(node => {
        interation += 1
    });
    document.getElementById('value-container').innerHTML = iteration
}
setInterval(GameTick, 10);

