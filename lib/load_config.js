(function loadConfigt() {
  function getConfigFile(cb) {
    var url = 'config/settings.json?rand=' + encodeURI(Math.random());
    $.get(url, function success(data) {
      cb(null, data);
    })
    .fail(function fail() {
      cb(true, null);
    });
  }

  function getConfig(cb) {
    getConfigFile(function configs(error, data) {
      if (error) {
        throw new Error('Unable to load configs');
      }
      cb(data);
    });
  }

  window.loadBlogConfig = getConfig;
}());

