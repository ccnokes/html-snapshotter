# HTML Snapshotter

## Install
```
npm install html-snapshotter
```

## How to use
```
./snapshotter.js
```
Options:
```
-h, --help            output usage information
-V, --version         output the version number
-s, --saveTo [value]  The directory we save HTML snapshots to. Default is ./static.
-p, --port <n>        The port the server runs on. (Not implemented yet). Default is 9920.
```
Upon starting, the server will output the browser bookmarklet script that you can use to take HTML snapshots. Create a bookmarklet with the javascript as the URL. Simply click the bookmarklet when you want to save the current page. You can navigate to your saved snapshots at `localhost:<port>/static`. The server will handle re-writing URLs to be absolute so that they work and removing all script tags.

## Why?
Mostly for UI testing (both manual and automated), as well as CSS development. When developing somewhere deep in the UI, it can be useful to remove all manual steps to get to that UI and instead snapshot that state, and develop against it.
