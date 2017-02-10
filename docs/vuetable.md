使用的是vue-table插件，源地址为
https://github.com/ratiw/vue-table
基本用法和wiki文档一样

修改了以下一些方法
列表的callback函数的回调参数加了这条数据的所有字段，callback(value, data)

callback除了默认的使用方法外，添加了额外的使用方法，可以使用
callback(value){
  return function(value) {}
}
这是因为原来的默认使用方法只能获取父级的函数

增加单选框 __radio 和复选框使用方法一样
添加"__radio:"不传入参数selectRow是当前$index,复选框同理

添加数据加载完成后的回调函数loadSuccessCallback

selectRow在换页时会重置为空

apiUrl在变化时会重新读取数据
