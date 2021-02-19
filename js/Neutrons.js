import {D} from './constants.js';
import $ from './canvas.js';
import {disc} from './drawing.js';

export default class Neutrons {
    constructor(barre) {
        this.barre = barre;
        this.population = [];
    }

    create(x, y, angle) {
        return {
            x, y,
            vel : 250,
            angle: angle || Math.PI / 3 * Math.random() - Math.PI / 6,
        }
    }

    // AFFICHAGE
    draw() {
        this.population.forEach(({x, y}) => {
            disc({ x, y ,
                d : D / 5,
                color : '#89f',
                canvas : 'screen',
            });
        });
    }

    // UPDATE
    update() {
        let newNeutrons = [];

        // création d'un neutron (3 emitters)
        for (let i = 1; i <= 3; i += 1) {
            if (Math.random() < 1/60 * 1 &&
                (this.barre.deads / this.barre.popNumber) < 0.65) {
                    this.population.push(this.create(0, i * $.screen.CH  * 0.25));
            }
        }

        // DEPLACEMENT
        this.population.forEach((neutron, i) => {
            let {x, y, vel, angle} = neutron;
            // update x et y
            x += Math.cos(angle) * vel * 1/60;
            y += Math.sin(angle) * vel * 1/60;
            // verifier si collision
            const pos = {x, y};
            const grid = this.barre.toGrid(pos);
            // SENSIBILITE
            const mini = 0.05;
            if (grid.x >= 0 && grid.x <= this.barre.grid.x && Math.abs(grid.x - Math.round(grid.x)) < mini &&
            grid.y >= 0 && grid.y <= this.barre.grid.y && Math.abs(grid.y - Math.round(grid.y)) < mini) {
                // COLLISION ?
                const X = Math.round(grid.x);
                const Y = Math.round(grid.y);
                if (X < this.barre.grid.x && Y < this.barre.grid.y &&
                    !this.barre.population[Y][X].dead) {
                    this.barre.fission(X, Y);
                    newNeutrons.push(this.create(x, y, Math.PI * 2 * Math.random()));
                    newNeutrons.push(this.create(x, y, Math.PI * 2 * Math.random()));
                    angle = Math.PI * 2 * Math.random();
                    // console.log(grid);
                    // debugger;
                }
            }

            // Ajout aux nouveaux neutrons si non-mort
            if (x >= 0 && x < $.screen.CW &
                y >= 0 && y < $.screen.CH) {
                    const newNeutron = this.create(x, y, angle);
                    newNeutrons.push(newNeutron);
            }

        });
        // remplacement de la population mise à jour
        this.population = newNeutrons;
    }
}