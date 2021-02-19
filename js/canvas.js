const divs = ['screen', 'collisions'];
const $ = {};

divs.forEach((name) => {
    const ctx = document.querySelector(`#${name}`).getContext('2d');
    $[name] = {
        ctx,
        CW: ctx.canvas.width,
        CH: ctx.canvas.height,
    };
});

export default $;
