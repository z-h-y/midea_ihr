let koa = require('koa');
let app = koa();
let router = require('koa-router');
var render = require('./lib/render');
var serve = require('koa-static');
var path = require('path');
var cors = require('kcors');
var cacheControl = require('koa-cache-control');
var compress = require('koa-compress')
//var gzip = require('koa-gzip');

var conditional = require('koa-conditional-get');
var etag = require('koa-etag');
//var fresh = require('koa-fresh');

var config  = require('../config')
let staticpath = path.join(path.resolve('../'), "dist");




//app.use(gzip());
//app.use(fresh());
app.use(cacheControl());

app.use(function *(next){
    this.cacheControl = {
        maxAge: 3600
    };
    try {
        yield next;
    } catch (err) {
        this.cacheControl = {
            maxAge: 60
        };
    }
});

app.use(compress({
  filter: function (content_type) {
    return true
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));


// etag works together with conditional-get
app.use(conditional());
app.use(etag());


app.use(cors());
app.use(serve(staticpath));




var api = router();
api.get('/', function*() {
    this.body = yield render('index');
});

app.use(api.routes())
    .use(api.allowedMethods());
app.listen(config.port);
