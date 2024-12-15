//import { Points } from './variables.js';

var roomids;

function GameTick() {
    //console.log("running game tick")
    if (document.getElementById('points') && document.getElementById('number')) {
        document.getElementById('points').innerHTML = "You have:" + (Points) + " Dilyan Points";
        document.getElementById('number').innerHTML = (Points);
    }
    if (document.getElementById('version')) {
        document.getElementById('version').innerHTML = (output);
    }
    //add anything that should be constantly running\
    roomids = document.querySelectorAll('[data-room-id]');
    //console.log(Points)
}

//export { GameTick };
