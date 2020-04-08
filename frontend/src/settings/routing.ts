import * as pagesImported from "./pages_description/pagesDescription";
import categoriesImported from "./pages_description/categories";

export const categories = categoriesImported;

export const pages = getPages();

function getPages(): any {
    let pages = {};

    for (let page of Object.keys(pagesImported))
        pages[page] = pagesImported[page];

    return pages;
}

export function getPagesInSideNav(): any {
    const pagesNames = Object.keys(pages).filter(e => pages[e].isInSideNav);
    let toReturn = [];

    for (let page of pagesNames)
        toReturn.push(pages[page]);

    return toReturn;
}

export function getPagesOfCategory(cat: string): any {
    const pagesNames = Object.keys(pages).filter(e => pages[e].category.toLowerCase() === cat.toLowerCase());
    let toReturn = [];

    for (let page of pagesNames)
        toReturn.push(pages[page]);

    return toReturn;
}
