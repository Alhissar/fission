const $canvas = document.querySelector("#screen");
const ctx = $canvas.getContext('2d');
export const $ = {
    ctx,
    CW: ctx.canvas.width,
    CH: ctx.canvas.height
}
