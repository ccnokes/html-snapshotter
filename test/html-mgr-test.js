// TODO: turn this into a test

var htmlStr = `
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

htmlMgr.saveHTML('./static', {
    name: 'test',
    html: htmlStr,
    origin: 'http://test.com',
    pathname: '/page'
});



// should equal:
`
<html>
    <head>
        <link href="http://test.com/test.css">
        <link href="http://test.com/fonts/fonts.css">
    </head>
    <body>
        <img src="http://test.com/blergh/img.png">
    </body>
</html>
`
