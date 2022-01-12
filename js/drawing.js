import $ from './canvas.js';

function getContextOf(canvas) {
    return (typeof(canvas) === 'string' ? $[canvas].ctx : canvas.getContext('2d'));
}

export function circle({canvas, x, y, d, color}) {
    const ctx = getContextOf(canvas);
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
    const ctx = getContextOf(canvas);
    ctx.beginPath();
    ctx.arc(
    x, y,
    d,
    0, 2 * Math.PI
    );
    ctx.fillStyle = color;
    ctx.fill()
}

export function noyau(sprite, infos) {
    const {x, y, dead, D} = infos;
    const center = {
        x: x + (sprite.width / 2),
        y: y + (sprite.height / 2),
    }
    // electron
    circle({
        x: center.x,
        y: center.y,
        d: D,
        color: '#555',
        canvas: sprite,
    });
    // noyau
    // vivant
    if (!dead) {
        disc({
            x: center.x,
            y: center.y,
            d: D / 2.5,
            color: '#fdd',
            canvas: sprite,
        });
        return;
    }
    // mort
    let diam = D/3;
    const space = diam * 0.3;
    disc({
        x: center.x - space,
        y: center.y - space,
        d: diam,
        color: '#f22',
        canvas: sprite,
    });
    disc({
        x: center.x + space,
        y: center.y + space,
        d: diam,
        color: '#f22',
        canvas: sprite,
    });
    return sprite;
}

export function drawSprite(sprite, pos, canvas = 'screen') {
    getContextOf(canvas).drawImage(sprite,
        pos.x - sprite.width / 2,
        pos.y - sprite.width / 2);
    return sprite;
}