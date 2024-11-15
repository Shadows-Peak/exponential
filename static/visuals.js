
import { Points } from "./variables.js";
function GameTick() {
    document.getElementById('points').innerHTML = "You have:"+(window.Points)+" Dilyan Points";
    //add anything that should be constantly running 

}
setInterval(GameTick, 10);

