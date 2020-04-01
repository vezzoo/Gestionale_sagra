#!/usr/bin/env sh

export CHROME_APP_CMD="google-chrome --profile-directory=Default"
export CHROME_APP_ID="<your id>"
export IS_SCRIPT=1

echo $CHROME_APP_CMD
echo $CHROME_APP_ID

npm run build_dbg
