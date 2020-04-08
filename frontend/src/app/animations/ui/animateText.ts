import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../../settings/ng_utils";

export const animazione_testo_mostra = 'show';
export const animazione_testo_nascondi = 'hide';
const animazione_open = 'open';
const animazione_close = 'close';
const animation = new ng_animation(animazione_open, animazione_close);

export const animateText = trigger('animateText', [
    state(animazione_testo_mostra,
        style({
            'display': 'block',
            opacity: 1,
        })
    ),
    state(animazione_testo_nascondi,
        style({
            'display': 'none',
            opacity: 0,
        })
    ),
    transition(animation.forward(), animate('150ms ease-out')),
    transition(animation.reverse(), animate('150ms ease-in')),
]);
