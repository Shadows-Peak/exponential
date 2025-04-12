
var roomids;
function GameTick() {
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

    if (document.readyState === 'complete') {
        // Code to execute when the body has finished loading

        if (window.processWaitingPackages) {
            window.processWaitingPackages(); // Call the function if it exists
        } else {
            console.error("processWaitingPackages is not defined yet.");
        }
    }
}

//export { GameTick };
