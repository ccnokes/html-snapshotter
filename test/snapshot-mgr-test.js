var test = require('tape');
var rewire = require('rewire');
var path = require('path');
var snapshotMgr = rewire(path.resolve(__dirname, '../src/snapshot-mgr'));
var Promise = require('bluebird');



var readdirResults = ['test.html', '.DS_Store', 'static.html'];

function readdir(path, cb) {
    cb(null, readdirResults);
}

snapshotMgr.__set__('readdirAsync', function(path) {
    return Promise.promisify(readdir)(path);
});




test('snapshotMgr.getAll should return a promise', function(t) {
    t.plan(1);

    function isThenable(val) {
        return val && typeof val.then === 'function';
    }

    var p = snapshotMgr.getAll('./test');
    t.equal(isThenable(p), true);
});

test('snapshotMgr.getAll should resolve to an array of all the saved snapshots', function(t) {
    t.plan(1);

    snapshotMgr.getAll('./hello')
    .then(
        files => {
            t.deepEqual(files, ['test.html', 'static.html']);
        }
    );
});
