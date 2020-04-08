import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../../settings/ng_utils";

export const animazione_mostra = 'show';
export const animazione_nascondi = 'hide';
const animation = new ng_animation(animazione_mostra, animazione_nascondi);

export const errorLoginText = trigger('errorLoginText', [
    state(animazione_mostra, style({
        opacity: 1
    })),
    state(animazione_nascondi, style({
        opacity: 0
    })),
    transition(animation.forward(), animate('500ms ease-out')),
    transition(animation.reverse(), animate('600ms ease-in'))
]);
