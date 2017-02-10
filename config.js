
//前端-本地环境
var serverport = 80;
module.exports = {
  host: 'http://www.ihr.com/',
  port: serverport,
  livereload: {
    port: 8089
  }
}


// //前端-sit环境 svn用这个配置，不要修改，不要提交
// var serverport = 8070;
// module.exports = {
//   host: 'http://10.16.80.167:' + serverport + '/',
//   port: serverport,
//   livereload: {
//     port: 8070
//   }
// }
