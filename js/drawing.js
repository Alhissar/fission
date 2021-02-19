import $ from './canvas.js';

export function circle({canvas, x, y, d, color}) {
    // ctx.beginPath();
    const ctx = $[canvas].ctx;
    ctx.beginPath();
    ctx.arc(
        x, y,
        d,
        0, 2 * Math.PI
        );
        ctx.strokeStyle = color;
        ctx.stroke()
    }
    export function disc({canvas, x, y, d, color}) {
    const ctx = $[canvas].ctx;
    ctx.beginPath();
    ctx.arc(
    x, y,
    d,
    0, 2 * Math.PI
    );
    ctx.fillStyle = color;
    ctx.fill()
}
