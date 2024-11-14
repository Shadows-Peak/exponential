
import { Points } from "./variables";
function GameTick() {
    document.getElementById('points').innerHTML = "You have:"+(Points)+" Dilyan Points";
    //add anything that should be constantly running 

}
setInterval(GameTick, 10);

