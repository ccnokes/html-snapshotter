const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

var snapshotMgr = exports;

snapshotMgr.getAll = function(filePath) {
    return fs.readdirAsync(filePath)
    .then(
        files => {
            return files.filter(file => path.extname(file) === '.html');
        }
    );
};
