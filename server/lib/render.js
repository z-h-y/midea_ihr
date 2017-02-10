var views = require('co-views');
module.exports = views(__dirname + '/../../dist', {
  map: { html: 'swig' }
});
