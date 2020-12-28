import {MULT} from '/js/Constants.js';
import Citizen from '/js/Citizen.js';

const $canvas = document.querySelector("#screen");
const ctx = $canvas.getContext('2d');
const CW = ctx.canvas.width;
const CH = ctx.canvas.height;

export default class Population {
    constructor (nb = 10) {
        this.colors = {
            dead : '#222',
            healthy : '#1b1',
            immune: '#360',
            infected : '#cc1',
            sick: '#f11'
        };
        this.nbActive = 0;
        this.nbInfected = 0;
        this.state = 'healthy';
        this.people = [];
        const nbTotal = nb * MULT ** 3;
        for (let i = 0; i < nbTotal; i += 1) {
            this.people.push(new Citizen('healthy', MULT));
            if (i < MULT ** 2) {
                const infected = this.people[i];
                infected.state = 'infected';
                this.setTimer(infected);
            }
        }
    }

    collides(bob) {
        const len = this.people.length;
        for (let i = 0; i < len; i++) {
            const alice = this.people[i];
            if (bob !== alice && !alice.dead && !bob.dead) {
                const dx = alice.pos.x - bob.pos.x;
                const dy = alice.pos.y - bob.pos.y;
                const dist = dx * dx + dy * dy;
                if (dist <= (bob.r + alice.r) * (bob.r + alice.r)) {
                    // Collision
                    if ((!bob.healthy && alice.healthy || bob.healthy && !alice.healthy)
                        && (!bob.immune && !alice.immune)) {
                        if (Math.random() < 0.3) {
                            if (!bob.healthy) {
                                alice.state = 'infected';
                                this.setTimer(alice);
                            } else {
                                bob.state = 'infected';
                                this.setTimer(bob);
                            }
                        }
                    }
                    bob.dir = Math.atan2(dy, dx) - Math.PI;
                }
            }
        }
    }

    draw() {
        ctx.clearRect(0, 0, CW, CH);
        const len = this.people.length;
        for (let i = 0; i < len; i += 1) {
            const bob = this.people[i];
            if (bob.visible) {
                ctx.beginPath();
                ctx.arc(
                bob.pos.x / MULT,
                bob.pos.y / MULT,
                bob.r,
                0, 2 * Math.PI,
                true);
                ctx.fillStyle = this.colors[bob.state];
                ctx.fill()
            }
        }
    }

    setTimer(bob) {
        bob.timer = 125 * MULT * (1 + Math.random());
    }

    update(d) {
        this.nbActive = 0;
        this.nbInfected = 0;
        this.nbDead = 0;
        const len = this.people.length;
        for (let i = 0; i < len; i++) {
            const bob = this.people[i];
            if (!bob.dead) {
                bob.update();
                bob.pos.x += bob.vel.x;
                bob.pos.y += bob.vel.y;
                this.collides(bob);
                this.walls(bob);
                if (!bob.healthy) {
                    bob.timer -= 1;
                    this.nbInfected += 1;
                    this.nbActive += 1;

                    switch (bob.state) {
                        case 'infected':
                            if (bob.timer < 0) bob.state = 'sick';
                            break;
                        case 'sick':
                            if (bob.timer > -120) break;

                            if (Math.random() < 0.2) {
                                bob.state = 'dead';
                            } else {
                                bob.state = 'immune';
                            }
                            break;
                        default:
                            this.nbActive -= 1;
                    }
                }
            } else {
                this.nbDead += 1;
                if (bob.timer < -180) {
                    bob.visible = false;
                } else {
                    bob.timer -= 1;
                }
            }
        }
    }

    walls(bob) {
        if ((bob.pos.x > CW * MULT - bob.r) || (bob.pos.x < bob.r)) {
            bob.dir = Math.PI - bob.dir;
        }
        if ((bob.pos.y > CH * MULT - bob.r) || (bob.pos.y < bob.r)) {
            bob.dir *= -1;
        }
    }
}
