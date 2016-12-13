(function loadList() {
  function getList(jsonFile, cb) {
    var url = 'config/' + jsonFile + '.json?rand=' + encodeURI(Math.random());
    $.get(url, function success(data) {
      cb(null, data);
    })
    .fail(function fail() {
      cb(true, null);
    });
  }

  function getOrderedPostList(postList, order) {
    var postListArray = [];
    _.each(postList, function loop(v, k) {
      postListArray.push({
        t: k,
        p: v,
      });
    });
    if (order) {
      return postListArray;
    }
    return _(postListArray).reverse().value();
  }

  function renderList() {
    var renderingFunction = arguments[0];
    var listName = arguments[1];
    var dirPrefix = arguments[2];
    var outputDiv = arguments[3];
    var singlePostOutputDiv = arguments[4];
    var order = arguments[5];
    var cb = arguments[6];

    var postListArray = null;
    var outputList = [];
    getList(listName, function postList(error, data) {
      if (error) {
        throw new Error('Unabe to load the post');
      }
      postListArray = getOrderedPostList(data, order);
      outputList.push('<ul>');
      _.each(postListArray, function loop(p) {
        outputList.push('<li><a href="#" onclick="' + renderingFunction + '(\'' + dirPrefix + '\',\'' + p.p + '\',\'' + singlePostOutputDiv + '\');">' + p.t + '</a>');
      });
      outputList.push('</ul>');
      $(outputDiv).html(outputList.join(''));
      if (_.isFunction(cb)) {
        cb();
      }
    });
  }

  window.renderList = renderList;
}());
