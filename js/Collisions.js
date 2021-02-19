import $ from './canvas.js';

const CW = $.collisions.CW;
const CH = $.collisions.CH;

export default class Collisions {
    constructor () {
        this.frames = [];
    }
    
    draw() {
        const ctx = $.collisions.ctx;
        ctx.clearRect(0,0,CW,CH);
        const start = (this.frames.length > CW) ? this.frames.length - CW : 0;
        // remplissage du canvas
        for (let f = start; f < this.frames.length; f += 1) {
            const steps = 100;
            let sum = 0;
            // somme des 'step' dernieres images
            for (let smoothing = steps; smoothing > 0; smoothing -= 1) {
                if (f > smoothing + 1) {
                    sum += this.nb(f - smoothing);
                }
            }
            const moyenne = sum / steps;
            // y : hauteur de la ligne a tracer
            // si 0 collision y = affichage normal
            // si collision y = 0 (le haut du canvas)
            const y = !this.nb(f) ? CH - CH * moyenne * 1.2 : 0;
            // stroke : couleur du trait (si collision)
            const stroke = !this.nb(f) ? '#fff' : '#f77a';
            ctx.beginPath();
            ctx.moveTo(f - start, y);
            ctx.lineTo(f - start, CH);
            ctx.strokeStyle = stroke;
            ctx.stroke();
        }
    }

    // nb de collision à l'image 'current'
    nb(current) {
        if (current < 1) return 0;
        return this.frames[current] - this.frames[current - 1];
    }

    update(deads) {
        this.frames.push(deads);
    }

}