import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../../settings/ng_utils";

export const animazione_open = 'open';
export const animazione_close = 'close';
const animation = new ng_animation(animazione_open, animazione_close);

export const toggleSidenavState = trigger('toggleSidenavState', [
    state(animazione_open,
        style({
            'min-width': '9.9vw' //190px (1920x1080)
        })
    ),
    state(animazione_close,
        style({
            'min-width': '3.4vw' //65px (1920x1080)
        })
    ),
    transition(animation.forward(), animate('150ms ease-out')),
    transition(animation.reverse(), animate('150ms ease-in')),
]);
