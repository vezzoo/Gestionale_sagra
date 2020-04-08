// import {getPath} from "../../settings/routing.ts";

function hasUpperCase(string: string): number {
    for (let i = 0; i < string.length; i++) {
        let char = string.charAt(i);
        if (char === char.toUpperCase())
            return i;
    }

    return -1;
}

function adjustString(string: string, i: number, char: string): string {
    let tmp = string.split('');
    tmp.splice(i, 1);
    tmp.splice(i, 0, " ");
    tmp.splice(i + 1, 0, char);
    return tmp.join('');
}

export function getPageNameFromPath(path: string): string {
    let indexOfUppCase = hasUpperCase(path);
    if (indexOfUppCase !== -1)
        path = adjustString(path, indexOfUppCase, path.charAt(indexOfUppCase).toLowerCase());

    return path.charAt(0).toUpperCase() + path.slice(1);
}

export async function pushTo(router, path) {
    await router.navigate([path]);
}
