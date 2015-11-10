var test = require('tape');
var htmlMgr = require('../src/html-mgr');

var testHTML = `
    <html>
        <head>
            <link href="test.css">
            <link href="fonts/fonts.css">
        </head>
        <body>
            <img src="/blergh/img.png"/>
        </body>
    </html>
`;

var expectedHTML = `
    <html>
        <head>
            <link href="http://test.com/test.css">
            <link href="http://test.com/fonts/fonts.css">
        </head>
        <body>
            <img src="http://test.com/blergh/img.png">
        </body>
    </html>
`;

test('htmlMgr.cleanUpHTML should be clean HTML properly', function(t) {
    t.plan(1);
    var actual = htmlMgr.cleanUpHTML(testHTML, 'http://test.com');
    t.equal(actual, expectedHTML);
});

test('htmlMgr.saveHTML should save a file', function(t) {
    t.plan(1);

    var actual = htmlMgr.saveHTML('./static', {
        name: 'this is a test',
        html: testHTML,
        origin: 'http://test.com',
        pathname: '/page'
    });

    actual.then(
        filepath => {
            t.equal(filepath, 'static/this-is-a-test.html');
        }
    );
});

test('htmlMgr.saveHTML - when saving, it should create folders recursively', function (t) {
    t.plan(1);

    var actual = htmlMgr.saveHTML('./static/test/test', {
        name: 'recursive test',
        html: testHTML,
        origin: 'http://test.com',
        pathname: '/page'
    });

    actual.then(
        filepath => {
            t.equal(filepath, 'static/test/test/recursive-test.html');
        }
    );
});

test('htmlMgr.saveHTML should return a promise', function(t) {
    t.plan(1);

    var actual = htmlMgr.saveHTML('./static', {
        name: 'test',
        html: testHTML,
        origin: 'http://test.com',
        pathname: '/page'
    });

    function isThenable(val) {
        return val && typeof val.then === 'function';
    }

    t.equal(isThenable(actual), true);
});
