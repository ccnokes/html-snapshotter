const path = require('path');
const url = require('url');
const Promise = require('bluebird');
const writeFileAsync = Promise.promisify(require('fs').writeFile);
const cheerio = require('cheerio');
const mkdirp = Promise.promisify(require('mkdirp'));

var htmlMgr = exports;

var excludes = ['script']; //strip these from html
var rewrites = ['link', 'img']; //rewrite paths on these


/**
 * @param {jqObject} el
 * @param {String}   origin - protocol + host
 * @param {String}   attrName - html attribute to replace
 */
function rewrite(el, origin, attrName) {
    var orig = el.attr(attrName);
    if(orig) {
        el.attr(attrName, url.resolve(origin, orig));
    }
}

/**
 * @param  {jqObject} el
 * @return {String} - the tag name
 */
function getTagName(el) {
    return el.get(0).tagName;
}

/**
 * rewrite all relative paths to absolute
 * @param {String}   origin - protocol + host
 * @param {jqObject} els
 */
function rewritePaths(origin, els) {
    els.each((i, _el) => {
        var el = $(_el),
            tagName = getTagName(el);
        if(tagName === 'link') {
            rewrite(el, origin, 'href');
        }
        else if(tagName === 'img') {
            rewrite(el, origin, 'src');
        }
    });
}

/**
 * @param  {String} html
 * @param  {String} origin - protocol + host
 * @param  {String} selector - a CSS selector (feature currently unused)
 * @return {String} cleaned html doc as a string
 */
htmlMgr.cleanUpHTML = function(html, origin, selector) {
    //load in the html
    $ = cheerio.load(html);
    //remove excluded elements
    excludes.forEach(e => $(e).remove());
    //rewrite url paths to not be relative
    rewritePaths(origin, $(rewrites.join(',')) );
    //return html string
    return $.html(selector);
};

/**
 * save the HTML to a directory
 * @param  {String} baseFilePath - where to save it
 * @param  {Object} snapshot
 * @return {Promise} - resolves to {String} filepath it was saved at
 */
htmlMgr.saveHTML = function(baseFilePath, snapshot) {

    var filepath = path.join(baseFilePath, snapshot.name + '.html')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');

    var htmlStr = htmlMgr.cleanUpHTML(snapshot.html, snapshot.origin, snapshot.selector);

    return mkdirp(baseFilePath)
        .then(() => writeFileAsync(filepath, htmlStr))
        .then(() => filepath);
};
