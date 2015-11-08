(function(){

    var POST_URL = 'http://localhost:9920/snapshots';

    function postToServer(pageToSave) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', POST_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(pageToSave));
        return xhr;
    }

    function getPageData(name) {
        return {
            name: name,
            html: document.documentElement.outerHTML,
            origin: location.protocol + '//' + location.host,
            pathname: location.pathname
        };
    }

    function promptForUser() {
        return prompt('Name this HTML snapshot:', document.title.replace(/\s+/g, '-').toLowerCase());
    }

    function init() {
        var name = promptForUser();
        var pageData = getPageData(name);
        postToServer(pageData);
    }

    init();

})();
