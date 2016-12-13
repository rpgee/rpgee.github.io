(function loadPost() {
  var converter = new showdown.Converter();
  function getPostContent(dirPrefix, id, cb) {
    var url = dirPrefix + '/' + id + '.html?rand=' + encodeURI(Math.random());
    $.get(url, function success(data) {
      cb(null, data);
    })
    .fail(function fail() {
      cb(true, null);
    });
  }

  function renderHtml(data) {
    return converter.makeHtml(data);
  }

  function renderView() {
    var dirPrefix = arguments[0];
    var fileName = arguments[1];
    var outputDiv = arguments[2];
    var cb = arguments[3];

    getPostContent(dirPrefix, fileName, function callback(error, data) {
      if (error) {
        throw new Error('Unabe to load: ' + dirPrefix + '/' + fileName);
      }
      $(outputDiv).html(renderHtml(data));
      if (_.isFunction(cb)) {
        cb();
      }
    });
  }

  window.renderView = renderView;
}());
