import {circle, disc} from './drawing.js';
import {D, SPACE, X0} from './constants.js';

export default class BarreUranium {
    constructor (grid) {
        this.grid = grid;
        this.uranium = {
            pos: {
                x: 0,
                y: 0,
            },
            color: '#fdd',
            dead: false,
            dying: -1,
        },
        this.dechet = {
            color: '#f66',
            dead: true
        }
        this.population = this.createPopulation();
    }
    
    createPopulation() {
        return Array(this.grid.y)
        .fill()
        .map(() => Array(this.grid.x).fill(this.uranium));
    }

    draw() {
        for (let Y = 0; Y < this.grid.y; Y += 1) {
            for (let X = 0; X < this.grid.x; X += 1) {
                const {pos, color, dead, dying} = this.population[Y][X];
                // electron
                let x, y;
                let dx = (Math.random() < 0.15) ? 2 : 0;
                dx *= (Math.random() < 0.5) ? -1 : 1;
                let dy = (Math.random() < 0.15) ? 2 : 0;
                dy *= (Math.random() < 0.5) ? -1 : 1;
                circle(pos.x + dx, pos.y + dy, D, '#555');
                // noyau
                if (!dead) {
                    disc(pos.x + dx / 2, pos.y + dy / 2, D/2.5, color);
                } else {
                    let diam = D/4;
                    const space = diam * 0.9;
                    disc(pos.x - space + dx, pos.y - space + dy, diam, color);
                    disc(pos.x + space + dx, pos.y + space + dy, diam, color);
                    // DYING ?
                    if (dying > 0) {
                        diam = diam * dying / 1.5;
                        disc(pos.x + space + dx, pos.y + space + dy, diam, '#fff');

                    }
                }
            }
        }
    }

    fission(x, y) {
        // TODO Animation
        const dying = 10;
        const dechet = {...this.dechet};
        const pos = {...this.population[y][x]};
        const new1 = {...dechet, pos, dying};
        this.population[y][x] = new1;
    }

    update() {
        const newPopulation = [];
        // NEW
        this.population.forEach((ligne, l) => {
            newPopulation.push([]);
            ligne.forEach((noyau, i) => {
                const pos = {
                    x: i * SPACE + X0 + (l % 2) * SPACE / 2,
                    y: l * SPACE
                };
                let {color, dead, dying} = {...noyau};
                if (dying > 0) dying --;
                const new1 = {pos, color, dead, dying};
                newPopulation[l].push(new1);
            });
        });

        this.population = newPopulation;
    }

    toGrid(pos) {
        const y = pos.y / SPACE;
        const x = (pos.x - X0 - (Math.round(y) % 2) * SPACE / 2) / SPACE
        return {x, y};
    }
}
