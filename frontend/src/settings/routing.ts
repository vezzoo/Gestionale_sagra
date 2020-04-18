import * as pagesImported from "./pages_description/pagesDescription";
import categoriesImported from "./pages_description/categories";
import {Page} from "../app/interfaces/Page";
import permissionsImported from "./pages_description/permissions";

export const categories = categoriesImported;
export const permissions = permissionsImported;

export const pages = getPages();

function getPages(): any {
    let pages = {};

    for (let page of Object.keys(pagesImported))
        pages[page] = pagesImported[page];

    return pages;
}

export function getPagesInSideNav(userPermissions: string[]): Page[] {
    return Object.keys(pages)
        .filter(e => pages[e].isInSideNav)
        .filter(e => userPermissions.includes('root') || (userPermissions.includes(pages[e].requiredPermission) || pages[e].requiredPermission === ''))
        .map(e => pages[e]);
}

export function getPagesOfCategory(cat: string, userPermissions: string[]): Page[] {
    return Object.keys(pages)
        .filter(e => pages[e].category.toLowerCase() === cat.toLowerCase())
        .filter(e => userPermissions.includes('root') || (userPermissions.includes(pages[e].requiredPermission) || pages[e].requiredPermission === ''))
        .map(e => pages[e]);
}

