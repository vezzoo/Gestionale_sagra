import it from "./lang/IT_it"

const dict = it;

export default function getMessage (obj: any) {
    if(obj.code && dict[obj.code]) return dict[obj.code];
    console.warn("Could not find a translation for", obj.code);
    return obj.message ?? "UNTRANSLATED";
}
