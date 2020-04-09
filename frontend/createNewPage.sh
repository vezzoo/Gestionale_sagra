#!/bin/bash

NAME=$1

cd src/settings/pages_description/pages
touch $NAME.ts
echo "export const ${NAME} = {
    path: '${NAME}',
    isInSideNav: true,
    hasSideNav: true,
    category: '',
    icon: '',
    requiredPermission: ''
};" > $NAME.ts

cd ..
echo "export {${NAME}} from './pages/${NAME}';" >> pagesDescription.ts
