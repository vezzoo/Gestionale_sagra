import categories from "../categories";
import permissions from "../permissions";

export const magazzino = {
    path: 'magazzino',
    isInSideNav: true,
    hasSideNav: true,
    category: categories.gestione,
    icon: 'business',
    requiredPermission: permissions.magazzino.name
};
