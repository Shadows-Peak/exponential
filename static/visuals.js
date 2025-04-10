//import { Points } from './variables.js';

var roomids;

function GameTick() {
    processWaitingPackages(); // Dont mind this being here
    //console.log("running game tick")
    if (document.getElementById('points')) {
        document.getElementById('points').innerHTML = "You have:" + (DilyanPoints) + " Dilyan Points";
        document.getElementById('number').innerHTML = (HarvestPoints)+"/"+(HarvestPointsNeeded);
        document.getElementById('processDisplay').innerHTML = (queuedResources)+'/'+(maxQueueableResources)+' Resources Queued   ---  '+(shipmentsQueued)+'/'+(maxQueueableShipments)+' Shipments Queued';
        document.getElementById('shipmentsCounter').textContent = `Shipments Loaded: ${shipmentsLoaded}/${maxShipments}`;
    }
    if (document.getElementById('version')) {
        document.getElementById('version').innerHTML = (output);
    }
    //add anything that should be constantly running\
    roomids = document.querySelectorAll('[data-room-id]');
    //console.log(Points)
}

//export { GameTick };
