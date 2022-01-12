import $ from './canvas.js';

const CW = $.collisions.CW;
const CH = $.collisions.CH;
const ctx = $.collisions.ctx;
const steps = 140;

export default class Collisions {
    constructor () {
        this.frames = [];
        this.nb = [];
        this.moyenne = [];
    }
    
    draw() {
        ctx.clearRect(0,0,CW,CH);
        const start = (this.frames.length > CW) ? this.frames.length - CW : 0;
        // remplissage du canvas
        ctx.beginPath();
        ctx.moveTo(0, CH + 1);
        ctx.lineWidth = 3;
        for (let f = start; f < this.frames.length; f += 1) {
            ctx.lineTo(f - start, CH - CH * this.moyenne[f]);
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
        // const steps = 140;
        const f0 = (f - steps > 1) ? f - steps : 0;
        const sum = this.frames[f] - this.frames[f0];
        const moyenne = sum / steps;
        this.moyenne.push(moyenne);
    }
}