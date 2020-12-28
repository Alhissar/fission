const $canvas = document.querySelector("#screen");
const ctx = $canvas.getContext('2d');
const CW = ctx.canvas.width;
const CH = ctx.canvas.height;

export default class Citizen {
    constructor (state, MULT) {
        this.dir = Math.random() * 2 * Math.PI;
        this.r = 5 / MULT;
        this.pos = {
            x: Math.floor(Math.random() * (CW * MULT -  2 * this.r) + this.r),
            y: Math.floor(Math.random() * (CH * MULT - 2 * this.r) + this.r)
        };
        this.speed = 1;
        this.state = state;
        this.timer = 0;
        this.visible = true;
    }

    get dead() {
        return this.state === 'dead'
    }
    get infected() {
        return this.state === 'infected'
    }
    get healthy() {
        return this.state === 'healthy'
    }
    get immune() {
        return this.state === 'immune'
    }
    get sick() {
        return this.state === 'sick'
    }
    get vel() {
        return {
            x: this.speed * Math.cos(this.dir),
            y: this.speed * Math.sin(this.dir),
        };
    }

    update() {
        // update angle
        const angle = (Math.floor(Math.random() * 5) - 2) / 12;
        this.dir = (this.dir + angle) % (Math.PI * 2);
        // update velocity

    }

}

