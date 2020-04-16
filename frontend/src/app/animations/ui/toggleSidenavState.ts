import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../../settings/ng_utils";

export const animazione_open = 'open';
export const animazione_close = 'close';
const animation = new ng_animation(animazione_open, animazione_close);

export const toggleSidenavState = trigger('toggleSidenavState', [
    state(animazione_open,
        style({
            'min-width': '{{maxWidth}}px' //190px (1920x1080)
        }),
        {params: {maxWidth: 1}}
    ),
    state(animazione_close,
        style({
            'min-width': '{{minWidth}}px' //65px (1920x1080)
        }),
        {params: {minWidth: 1}}),
    transition(animation.forward(), animate('150ms ease-out')),
    transition(animation.reverse(), animate('150ms ease-in')),
]);
