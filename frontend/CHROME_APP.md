# A note in order to help during the development of the chrome app

## General notes
1.  You sadly can't serve the app while developing with `ng serve` standard command: 
because you're testing a packaged app, you should build it and test from chrome.
    * Use npm build_dbg.
    output will be stored in the dist (default) directory along the app manifest, icon and bg script.

2.  You should add an unpacked app to your chrome extensions: goto `chrome://extensions`
and enable "develpoper mode": now you can load an unpacked app pointing to the `dist/gestionale-sagra-frontend` folder.

3.  Extensions and apps, while development, need to be reloaded whenever any edit has been done.
I recommend the installation of the chrome extension `Extensions Reloader` (v.^1.14)
to be able to reload the extensions with npm.
The extension will reload all the development extensions when we navigate to the url `http://reload.extensions` (see npm build_dbg_auto): 
 
4.  The build is configured for use of the inline source maps, so you can debug your code normally.

5. Change the app-id value (`chromeid.sh`) to the one matching your chrome installation (tip: check ~/.local/share/applications files)

6. Run the debug app with `npm run serve_dbg`

