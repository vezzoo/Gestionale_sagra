import categories from "../categories";
import permissions from "../permissions";

export const statistiche = {
    path: 'statistiche',
    isInSideNav: true,
    hasSideNav: true,
    category: categories.gestione,
    icon: 'insert_chart_outlined',
    requiredPermission: permissions.statistiche
};
