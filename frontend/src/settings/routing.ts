const pages = [
    {
        path: 'login',
        isInSideNav: false,
        hasSideNav: false,
        icon: '',
        hierarchy: {
            hasParent: false,
            parentURL: ""
        }
    },
    {
        path: 'ui',
        isInSideNav: false,
        hasSideNav: false,
        icon: '',
        hierarchy: {
            hasParent: false,
            parentURL: ""
        }
    },
    {
        path: 'dashboard',
        isInSideNav: true,
        hasSideNav: false,
        icon: 'dashboard',
        hierarchy: {
            hasParent: true,
            parentURL: "ui"
        }
    },
    {
        path: 'cassa',
        isInSideNav: true,
        hasSideNav: true,
        icon: 'local_atm',
        hierarchy: {
            hasParent: true,
            parentURL: "ui"
        }
    },
    {
        path: 'magazzino',
        isInSideNav: true,
        hasSideNav: true,
        icon: 'business',
        hierarchy: {
            hasParent: true,
            parentURL: "ui"
        }
    },
    {
        path: 'storico',
        isInSideNav: true,
        hasSideNav: true,
        icon: 'library_add_check',
        hierarchy: {
            hasParent: true,
            parentURL: "ui"
        }
    },
    {
        path: 'statistiche',
        isInSideNav: true,
        hasSideNav: true,
        icon: 'insert_chart_outlined',
        hierarchy: {
            hasParent: true,
            parentURL: "ui"
        }
    }
];

export function getPath(path): string {
    let filtered = pages.filter(e => e.path === path);

    if (filtered.length !== 1)
        return "";

    return filtered[0].path;

    // if (filtered[0].hierarchy.hasParent)
    //     newPath = filtered[0].hierarchy.parentURL + "/" + newPath;

    // return newPath;
}

export function pageHasSideNav(path) {
    let filtered = pages.filter(e => e.path === path);

    if (filtered.length !== 1)
        return false;

    return filtered[0].hasSideNav;
}

export function getPagesInSideNav() {
    return pages.filter(e => e.isInSideNav)
}
