const path = require('path');
const Promise = require('bluebird');
var readdirAsync = Promise.promisify(require('fs').readdir);


var snapshotMgr = exports;

snapshotMgr.getAll = function(filePath) {
    return readdirAsync(filePath)
    .then(
        files => {
            return files.filter(file => path.extname(file) === '.html');
        }
    );
};
