import $ from './canvas.js';

const CW = $.collisions.CW;
const CH = $.collisions.CH;

export default class Collisions {
    constructor () {
        this.frames = [];
        this.nb = [];
    }
    
    draw() {
        const ctx = $.collisions.ctx;
        ctx.clearRect(0,0,CW,CH);
        const start = (this.frames.length > CW) ? this.frames.length - CW : 0;
        // remplissage du canvas
        const steps = 140;
        ctx.beginPath();
        ctx.moveTo(0, CH + 1);
        for (let f = start; f < this.frames.length; f += 1) {
            const f0 = (f - steps > 1) ? f - steps : 0;
            // sum = nb de collisions entre frame f0 et frame f
            const sum = this.frames[f] - this.frames[f0];
            const moyenne = sum / steps;
            // y : hauteur de la ligne a tracer
            // si !collision y = affichage normal
            // si collision y = 0 (le haut du canvas)
            // const y = !this.nb[f] ? CH - CH * moyenne : 0;
            const y = CH - CH * moyenne;
            // stroke : couleur du trait (si collision)
            // const stroke = !this.nb[f] ? '#fff' : '#f77a';
            ctx.lineTo(f - start, y);
        }
        ctx.lineTo(this.frames.length - 1, CH + 1);
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        ctx.fillStyle = "#f88";
        ctx.fill();
    }

    update(deads) {
        this.frames.push(deads);
        const f = this.frames.length - 1;
        const nbCollisions = (f !== 0) ? this.frames[f] - this.frames[f - 1] : 0;
        this.nb.push(nbCollisions);
    }

}