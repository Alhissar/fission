import {$} from './canvas.js';

const LARGEUR_UTILE = 0.5;
export const X0 = $.CW * (1 - LARGEUR_UTILE) / 2;
export const D = 14;
export const SPACE = 30;
// nb d'uranium en x et y (grille)
export const NB = {
    x: Math.round(LARGEUR_UTILE * $.CW / SPACE),
    y: Math.round($.CH / SPACE),
}
