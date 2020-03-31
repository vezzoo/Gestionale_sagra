#!/bin/bash

NAME=$1

ng generate component $NAME

cd src/app
cp $NAME/$NAME.component.ts components/
cp $NAME/$NAME.component.html models/
cp $NAME/$NAME.component.sass ../styles/
rm -r $NAME

sed -i 's/'"$NAME"'/components/' app.module.ts

sed -i 's|./'"$NAME"'.component.html|../models/'"$NAME"'.component.html|' components/$NAME.component.ts

sed -i 's|./'"$NAME"'.component.sass|../../styles/'"$NAME"'.component.sass|' components/$NAME.component.ts
