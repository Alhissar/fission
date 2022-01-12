import {drawSprite, disc, noyau} from './drawing.js';
import {D, SPACE, X0} from './constants.js';

export default class BarreUranium {
    constructor (grid) {
        this.grid = grid;
        this.deads = 0;
        this.popNumber = grid.x * grid.y;
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
        this.vibe = [[0, 0], [-2, -2], [-2, 2], [2, -2], [2, 2]];
        // création des sprites
        this.sprites = [];
        // this.sprites = [dead, alive]
        [true, false].forEach(dead => {
            const sprite = document.createElement('canvas');
            sprite.width = D * 2;
            sprite.height = D * 2;
            noyau(sprite, {x: 0, y: 0, dead, D});
            this.sprites.push(sprite);
        });
    }
    
    createPopulation() {
        const blanck = Array(this.grid.y)
        .fill()
        .map(() => Array(this.grid.x).fill(this.uranium));
        const newPopulation = [];
        blanck.forEach((ligne, l) => {
            newPopulation.push([]);
            ligne.forEach((noyau, i) => {
                const pos = {
                    x: i * SPACE + X0 + (l % 2) * SPACE / 2,
                    y: l * SPACE
                };
                let {color, dead, dying} = noyau;
                // if (dying > 0) dying --;
                const new1 = {pos, color, dead, dying};
                newPopulation[l].push(new1);
            });
        });
        return newPopulation;
    }

    draw() {
        const flashes = [];
        // version cachée
        let dx = 0, dy = 0, indice = 0, pos, dead, dying;
        for (let Y = 0; Y < this.grid.y; Y += 1) {
            for (let X = 0; X < this.grid.x; X += 1) {
                ({pos, dead, dying} = this.population[Y][X]);
                // Radiatif ? Vibration !
                if (dead) {
                    indice = Math.floor(Math.random() * 5);
                    [dx, dy] = this.vibe[indice];
                    indice = 0;
                };
                // noyau
                drawSprite(this.sprites[Number(!dead)], {x: pos.x + dx, y: pos.y + dy});
                // reset vibration
                dx = 0, dy = 0;
                // DYING ? FLASH !
                if (dying > 0) {
                    flashes.push({
                        x: pos.x + dx,
                        y: pos.y + dy,
                        dying,
                    });
                }
            }
        }
        // affichage des flashes
        flashes.forEach(({x, y, dying}) => {
            disc({
                x, y,
                d: D * 0.2 * dying,
                color: '#ff0',
                canvas: 'screen',
            });
        })
    }

    fission(x, y) {
        const dying = 10;
        const pos = this.population[y][x].pos;
        this.population[y][x] = {...this.dechet, pos, dying};
        this.deads += 1;
    }

    update() {
        const newPopulation = [];
        this.population.forEach((ligne) => {
            ligne.forEach((noyau) => {
                if (noyau.dying > 0) noyau.dying --;
            });
        });
    }

    toGrid(pos) {
        const y = pos.y / SPACE;
        const x = (pos.x - X0 - (Math.round(y) % 2) * SPACE / 2) / SPACE
        return {x, y};
    }
}
