import categories from "../categories";
import permissions from "../permissions";

export const storico = {
    path: 'storico',
    isInSideNav: true,
    hasSideNav: true,
    category: categories.gestione,
    icon: 'library_add_check',
    requiredPermission: permissions.ordini.name
};
