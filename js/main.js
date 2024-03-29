import Barre from './Barre.js';
import Collisions from './Collisions.js';
import Neutrons from './Neutrons.js';

import $ from './canvas.js';
import {NB} from './constants.js';

const BARRE = new Barre(NB);
const neutrons = new Neutrons(BARRE);
const collisions = new Collisions();

// LOOP
const loop = (time) => {
    neutrons.update();
    BARRE.update();
    collisions.update(BARRE.deads);

    $.screen.ctx.clearRect(0, 0, $.screen.CW, $.screen.CH);
    collisions.draw();
    neutrons.draw();
    BARRE.draw();
    if (neutrons.population.length === 0 && BARRE.deads != 0) {
        cancelAnimationFrame(anim);
    } else {
        requestAnimationFrame(loop);
    }
};

const anim = requestAnimationFrame(loop);
