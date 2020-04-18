import categories from "../categories";
import permissions from "../permissions";

export const gestioneUtenti = {
    path: 'gestioneUtenti',
    isInSideNav: true,
    hasSideNav: true,
    category: categories.amministrazione,
    icon: 'supervised_user_circle',
    requiredPermission: permissions.utenti.name
};
