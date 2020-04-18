import categories from "../categories";
import permissions from "../permissions";

export const cassa = {
    path: 'cassa',
    isInSideNav: true,
    hasSideNav: true,
    category: categories.servizi,
    icon: 'local_atm',
    requiredPermission: permissions.cassa.name
};
