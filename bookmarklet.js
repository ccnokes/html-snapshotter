const uglify = require('uglify-js');
const BOOKMARKLET_PATH = './client/saver-bookmarklet.js';

exports.getScript = function() {
    return 'javascript:' + uglify.minify(BOOKMARKLET_PATH).code;
};
