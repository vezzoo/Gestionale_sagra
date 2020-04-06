const categoriesName = {
    servizi: 'servizi',
    gestione: 'gestione',
    amministrazione: 'amministrazione'
};

export let categories: any[] = populateCategories();

const pages = [
    {
        path: 'login',
        isInSideNav: false,
        hasSideNav: false,
        category: '',
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
        category: '',
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
        category: '',
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
        category: categoriesName.servizi,
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
        category: categoriesName.gestione,
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
        category: categoriesName.gestione,
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
        category: categoriesName.gestione,
        icon: 'insert_chart_outlined',
        hierarchy: {
            hasParent: true,
            parentURL: "ui"
        }
    },
    {
        path: 'gestioneUtenti',
        isInSideNav: true,
        hasSideNav: true,
        category: categoriesName.amministrazione,
        icon: 'supervised_user_circle',
        hierarchy: {
            hasParent: true,
            parentURL: "ui"
        }
    }
];

function populateCategories() {
    let categories = [];
    Object.keys(categoriesName).forEach(cat => categories.push(cat))
    return categories;
}

export function getPath(path): string {
    let filtered = pages.filter(e => e.path === path);

    if (filtered.length !== 1)
        return "";

    return filtered[0].path;
}

export function pageHasSideNav(path) {
    let filtered = pages.filter(e => e.path === path);

    if (filtered.length !== 1)
        return false;

    return filtered[0].hasSideNav;
}

export function getPagesInSideNav(): {
    path: string,
    isInSideNav: boolean,
    hasSideNav: boolean,
    category: string,
    icon: string,
    hierarchy: {
        hasParent: boolean,
        parentURL: string
    }
}[] {
    return pages.filter(e => e.isInSideNav)
}

export function getPagesOfCategory(cat: string): {
    path: string,
    isInSideNav: boolean,
    hasSideNav: boolean,
    category: string,
    icon: string,
    hierarchy: {
        hasParent: boolean,
        parentURL: string
    }
}[] {
    return pages.filter(e => e.category.toLowerCase() === cat.toLowerCase());
}
