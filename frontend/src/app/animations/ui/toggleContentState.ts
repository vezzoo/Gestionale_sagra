import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../../settings/ng_utils";

export const animazione_open = 'open';
export const animazione_close = 'close';
const animation = new ng_animation(animazione_open, animazione_close);

export const toggleContentState = trigger('toggleContentState', [
    state(animazione_open,
        style({
            'margin-left': '9.9vw' //190px (1920x1080)
        })
    ),
    state(animazione_close,
        style({
            'margin-left': '{{marginLeft}}vw'//'3.4vw' //65px (1920x1080)
        })
        , {params: {marginLeft: 1}}),
    transition(animation.forward(), animate('150ms ease-out')),
    transition(animation.reverse(), animate('150ms ease-in')),
]);
