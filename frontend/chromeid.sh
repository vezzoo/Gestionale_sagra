#!/usr/bin/env sh

export CHROME_APP_CMD="google-chrome --profile-directory=Default"
if [ "`(whoami)`" = "stefano" ]; then
  #tetofonta's app id
  export CHROME_APP_ID="fcbongldgohbnfekhbfbhgnmoojdhpdl"
  cp src/chrome_app_manifests/manifest_tetofonta.json src/manifest.json
else
  #vezoo's app id
  export CHROME_APP_ID="hoidfnnjpbnmpfhgpbclapijbjjdhfbc"
  cp src/chrome_app_manifests/manifest_vezzoo.json src/manifest.json
fi
export IS_SCRIPT=1

echo $CHROME_APP_CMD
echo $CHROME_APP_ID

npm run build_dbg
