import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../../settings/ng_utils";

export const animazione_mostra = 'show';
export const animazione_nascondi = 'hide';
const animation = new ng_animation(animazione_mostra, animazione_nascondi);

export const toggleShowPathAnimation = trigger('toggleShowPathAnimation', [
    state(animazione_nascondi, style({transform: 'rotate(0)'})),
    state(animazione_mostra, style({transform: 'rotate(-180deg)'})),
    transition(animation.forward(), animate('350ms ease-out')),
    transition(animation.reverse(), animate('350ms ease-in'))
]);
