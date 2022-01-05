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
        this.vibe = [[-2, -2], [-2, 2], [0, 0], [2, -2], [2, 2]];
        // création des sprites
        // this.sprites = [dead, alive]
        this.sprites = [];
        const deadSprite = document.createElement('canvas');
        deadSprite.width = D * 2;
        deadSprite.height = D * 2;
        noyau(deadSprite, {x: 0, y: 0, dead: true, D});
        // on dessine le noyau (dead ou pas) dans les sprites
        const livingSprite = document.createElement('canvas');
        livingSprite.width = D * 2;
        livingSprite.height = D * 2;
        noyau(livingSprite, {x: 0, y: 0, dead: false, D});
        this.sprites.push(deadSprite, livingSprite);
        // 
    }
    
    createPopulation() {
        return Array(this.grid.y)
        .fill()
        .map(() => Array(this.grid.x).fill(this.uranium));
    }

    draw() {
        const flashes = [];
        const proba = 0.3;
        const ctx = 'screen';
        for (let Y = 0; Y < this.grid.y; Y += 1) {
            for (let X = 0; X < this.grid.x; X += 1) {
                const {pos, color, dead, dying} = this.population[Y][X];
                // Radiatif ? Vibration !
                let dx = 0, dy = 0;
                const rand = Math.random();
                if (dead & rand < proba) {
                    const indice = Math.floor(rand * 5 / proba);
                    [dx, dy] = this.vibe[indice];
                };
                // noyau
                // vivant
                if (!dead) {
                    drawSprite(this.sprites[1], pos);
                } else {
                    // mort : on ajoute vibration dx, dy
                    const x = pos.x + dx;
                    const y = pos.y + dy;
                    drawSprite(this.sprites[0], {x, y});
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
        }
            // affichage des flashes
        flashes.forEach(({x, y, dying}) => {
            disc({
                x, y,
                d: D * 0.2 * dying,
                color: '#fff',
                canvas: 'screen',
            });

        })
    }

    fission(x, y) {
        const dying = 10;
        const dechet = {...this.dechet};
        const pos = {...this.population[y][x]};
        const new1 = {...dechet, pos, dying};
        this.population[y][x] = new1;
        this.deads += 1;
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
