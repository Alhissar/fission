import Barre from './Barre.js';
import Neutrons from './Neutrons.js';

import {$} from './canvas.js';
import {NB} from './constants.js';

const BARRE = new Barre(NB);
window.barre = BARRE;
const neutrons = new Neutrons(BARRE);

// LOOP
const loop = (time) => {
    neutrons.update();
    BARRE.update();
    $.ctx.clearRect(0, 0, $.CW, $.CH);
    neutrons.draw();
    BARRE.draw();

    requestAnimationFrame(loop);
};

loop();
