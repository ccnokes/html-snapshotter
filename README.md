# HTML Snapshotter (WIP)
A command-line tool and accompanying browser bookmarklet for saving snapshots of HTML.

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
Upon starting, the server will output the browser bookmarklet script that you can use to take HTML snapshots. Create a browser bookmark with the javascript as the URL. Simply click the bookmarklet when you want to save the current page. You can navigate to your saved snapshots at `localhost:<port>/static`. The server will handle re-writing URLs to be absolute so that they work and will remove all script tags.

## Why?
Mostly for UI testing (both manual and automated), as well as CSS development. When developing somewhere deep in the UI, it can be useful to remove all manual steps to get to that UI and instead snapshot that state, and develop against it. Automated visual UI testing can be very useful but tricky if parts of the UI require a lot of interaction to display. Scripts that navigate the UI are difficult to develop and brake easily. In those cases, I find it's helpful to instead maintain a separate directory of HTML snapshots and then test against those. While that does introduce the possibility of the snapshots becoming outdated, my hope is that the bookmarklet provided makes it easy to keep them up to date.
