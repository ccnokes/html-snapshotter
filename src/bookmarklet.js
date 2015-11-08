const path = require('path');
const uglify = require('uglify-js');
const BOOKMARKLET_PATH = path.resolve(__dirname, './client/saver-bookmarklet.js');

exports.getScript = function() {
    return 'javascript:' + uglify.minify(BOOKMARKLET_PATH).code;
};
