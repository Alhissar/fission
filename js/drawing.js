import {$} from './canvas.js';

export function circle(x, y, d, color) {
    $.ctx.beginPath();
    $.ctx.arc(
    x, y,
    d,
    0, 2 * Math.PI
    );
    $.ctx.strokeStyle = color;
    $.ctx.stroke()
}
export function disc(x, y, d, color) {
    $.ctx.beginPath();
    $.ctx.arc(
    x, y,
    d,
    0, 2 * Math.PI
    );
    $.ctx.fillStyle = color;
    $.ctx.fill()
}
