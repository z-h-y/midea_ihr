const dateUtil = require('fecha');

export function merge(target) {
    var arr = Array.prototype.slice.call(arguments, 0);
    arr.forEach(function(val) {
        let source = val;
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    });
    return target;
}

function getMenuIcon(menuName) {
    var icon = '';
    switch (menuName) {
        case 'Home':
            icon = 'aside-menu-home';
            break;
        case 'Organization':
            icon = 'aside-menu-organization';
            break;
        case 'Position':
            icon = 'aside-menu-position';
            break;
        case 'Staff':
            icon = 'aside-menu-staff';
            break;
        case 'Performance':
            icon = 'aside-menu-performance';
            break;
        case 'Reports':
            icon = 'aside-menu-reports';
            break;
        case 'Notification':
            icon = 'aside-menu-notification';
            break;
        case 'System':
            icon = 'aside-menu-system';
            break;
        case 'My Record':
            icon = 'fa-book aside-menu-font';
            break;
        case 'My Performance':
            icon = 'aside-menu-myPerformance';
            break;
        case 'My Profile':
            icon = 'fa-address-book aside-menu-font';
            break;
        default:
    }
    return icon;
}
export function Datashaping(oriData, options) {
    let Items = [],
        temp = {},
        len = oriData.length,
        orderBy = '',
        menuId = (options && options.menuId) || 'menuId',
        children = (options && options.children) || 'children',
        sorting = 1; //默认升序 -1降序
    oriData.forEach(function(val) {
        if (!val.parentMenuId) {
            val.icon = getMenuIcon(val.menuName);
            Items.push(val);
            //debugger;
        } else {
            temp[val.parentMenuId] = temp[val.parentMenuId] || [];
            temp[val.parentMenuId].push(val);
        }
    });
    if (options && options.orderBy) {
        orderBy = options.orderBy;
        sorting = options.sorting || sorting;
        Items.sort(function(a, b) {
            return sorting * (a[orderBy] - b[orderBy]);
        });
    }

    for (let o_Key of Object.keys(temp)) {
        if (orderBy) {
            temp[o_Key].sort(function(a, b) {
                return sorting * (a[orderBy] - b[orderBy]);
            });
        }
        for (let j = 0; j < len; j++) {
            if (Object.is(oriData[j][menuId], o_Key)) {
                oriData[j][children] = temp[o_Key];
            }
        }
    }
    return Items;
}

export function initFormData(url, modal, params) {
    if (!(typeof url === "string")) return '';
    if (!(modal instanceof Object)) return '';
    if (!(params instanceof Object)) return '';
    return Vue.http.get(url, {
        params: params
    }).then((response) => {
        let props = response.json();
        for (let prop in props) {
            if (props.hasOwnProperty(prop)) {
                modal[prop] = props[prop];
            }
        }
        return;
    });
}

export function getDictMapping(dictCode) {
    // return new Promise((resolve) => {
    //     Vue.http.get(`/public-access/dicts/${dictCode}/items`).then((response) => {
    //         if (response.data) resolve(transformDict(response.data));
    //     });
    // });
    return Vue.http.get(`/public-access/dicts/${dictCode}/items`).then((response) => {
          if (response.data) return transformDict(response.data);
      });
}

/**
 * 字典转换
 */
export function transformDict(data) {
    let result = {};
    if (data && data instanceof Array) {
        for (let i = 0; i < data.length; i++) {
            result[data[i].name] = data[i].value
        }
    }
    return result;
}

/**
 * parrams filter undefined
 */
export function filterUndefined(data) {
    if (data && data instanceof Object) {
        for (var i in data) {
            if (typeof data[i] === 'undefined') {
                data[i] = '';
            }
        }
    }
}

/**
 * 根据字典 KEY 查找 Value
 */
export function filterDict(dicts, key) {
    if (dicts && dicts instanceof Array && key) {
        let value;
        for (let key of dicts.keys()) {
            if (dicts[key] === key) {
                value = key;
                break;
            }
        }
        return value;
    }
}
export function convert(object, ret, prefix, forSubmit) {
    if (object instanceof Array) {
        if (forSubmit === true) {
            for (var i = 0; i < object.length; i++) {
                var value = object[i];
                if (value === undefined || value === null) {
                    continue;
                }
                var name = prefix + "[" + i + "]";
                if (value instanceof Array || (typeof value === 'object')) {
                    convert(value, ret, name);
                } else {
                    ret[name] = value;
                }
            }
        } else {
            //TODO luxiaocheng 需要考虑多维数组等情况
            let name = prefix;
            ret[name] = object;
        }
    } else if (typeof object === 'object') {
        for (var prop in object) {
            let value = object[prop];
            if (value === undefined || value === null) {
                continue;
            }
            let name = null;
            if (prefix === '') {
                name = prop;
            } else {
                if (prop.indexOf("'") < 0) {
                    name = prefix + "." + prop;
                } else {
                    name = prefix + "[" + prop + "]";
                }
            }

            if (value instanceof Array || (typeof value === 'object')) {
                convert(value, ret, name, forSubmit);
            } else {
                ret[name] = value;
            }
        }
    }
}

export function formatDate(date, format) {
    if (!(date instanceof Date)) return '';
    return dateUtil.format(date, format || 'YYYY-MM-DD');
}

export function parseDate(string, format) {
    return dateUtil.parse(string, format || 'YYYY-MM-DD');
}

export function debounce(fn, delay) {
    var timer;

    return function() {
        var context = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function() {
            fn.apply(context, args);
            timer = null;
        }, delay);
    };
}

export function getNestedPath(object, nestedProp) {
    let propertyArr = nestedProp.split('.');
    let property = propertyArr.pop();
    return getPath(object, propertyArr.join('.')).fields[property];
}

export function getPath(object, prop) {
    prop = prop || '';
    var paths = prop.split('.');
    var current = object;
    var result = null;
    for (var i = 0, j = paths.length; i < j; i++) {
        var path = paths[i];
        if (!current) break;

        if (i === j - 1) {
            result = current[path];
            break;
        }
        current = current[path];
    }
    return result;
}

export function setPath(object, prop, value) {
    if (prop === undefined || prop === null) return;

    if (typeof prop === 'object') {
        var target = prop;
        for (prop in target) {
            if (target.hasOwnProperty(prop)) {
                setPath(object, prop, target[prop]);
            }
        }
    } else {
        prop = prop || '';
        var paths = prop.split('.');
        var current = object;
        for (var i = 0, j = paths.length; i < j; i++) {
            var path = paths[i];
            if (!current) break;
            if (i === j - 1) {
                current[path] = value;
                break;
            }
            current = current[path];
        }
    }
}

let scrollbarWidth;
export function getScrollbarWidth() {
    if (scrollbarWidth !== undefined) {
        return scrollbarWidth;
    }

    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}
export function downloadFile(url, data, method) {
    let t = document.getElementById('ihr_table_export_form');
    let curMethod = method || 'GET';
    if (!t) {
        t = document.createElement('form');
        t.setAttribute("id", 'ihr_table_export_form');
        t.setAttribute("style", 'display: none');
        t.setAttribute("action", Vue.config.APIURL + url);
        t.setAttribute("method", curMethod);
        document.body.appendChild(t);
    } else {
        t.setAttribute("action", Vue.config.APIURL + url);
        t.setAttribute("method", curMethod);
    }
    t.innerHTML = '';
    var input = document.createElement('input');
    input.setAttribute("name", 'ewpAdminAuthorization');
    input.setAttribute("value", localStorage.getItem('ewptoken'));
    t.appendChild(input);
    if (data) {
        for (let key of Object.keys(data)) {
            if (data[key] !== undefined && data[key] !== null) {
                input = document.createElement('input');
                input.setAttribute("name", key);
                input.setAttribute("value", data[key]);
                t.appendChild(input);
            }
        }
    }
    t.submit();
}
