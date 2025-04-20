
function GameTick() {
    //console.log("running game tick")
    if (document.getElementById('points')) {
        document.getElementById('points').innerHTML = "You have:" + (DilyanPoints) + " Dilyan Points";
        document.getElementById('number').innerHTML = (HarvestPoints)+"/"+(HarvestPointsNeeded);
        document.getElementById('processDisplay').innerHTML = (queuedResources)+'/'+(maxQueueableResources)+' Resources Queued   ---  '+(shipmentsQueued)+'/'+(maxQueueableShipments)+' Shipments Queued';
        document.getElementById('shipmentsCounter').textContent = `Shipments Loaded: ${shipmentsLoaded}/${maxShipments}`;
    }
    
    if (document.readyState === 'complete') {
        // Code to execute when the body has finished loading

        if (window.animatePackageToShippingStation) {
            window.animatePackageToShippingStation(false); // Call the function if it exists
        } else {
            console.error("processWaitingPackages is not defined yet.");
        }
    }
}

