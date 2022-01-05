import $ from './canvas.js';

const LARGEUR_UTILE = 0.7;
export const X0 = $.screen.CW * (1 - LARGEUR_UTILE) / 2;
export const D = 7;
export const SPACE = 11;
// nb d'uranium en x et y (grille)
export const NB = {
    x: Math.round(LARGEUR_UTILE * $.screen.CW / SPACE),
    y: Math.round($.screen.CH / SPACE),
}
