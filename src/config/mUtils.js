/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 是否是图片
 */
export const isImg = path => {
    if( /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(path) ) return true;
    else return false;
}
/**
 * 获取浏览器传递参数
 */
export const getParams = url => {
	var params = {};
	var paramString = (url === undefined || url === null) ? window.location.search.substr(1) : url;
	var paramArray = paramString.split('&');
	for( let i = 0; i < paramArray.length; i ++ ){
		var itemArray = paramArray[i].split('=');
		var key = '';
		var value = null;
		if( itemArray.length > 0 ) key = decodeURIComponent(itemArray[0]);
		if( itemArray.length > 1 ) value = decodeURIComponent(itemArray[1]);
		if( !key ) continue;
		params[key] = value;
	}
	return params;
};
/**
 * Pc or Mobile
 */
export const getType = () => {
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      return 'mobile';
    }else {
      return 'pc';
    }
};

/**
 * 填充函数
 */

const padLeft = ( value, num, pad ) => {
	var result = value + '';
	while( result.length < num ) {
		result = (pad || '0') + result;
	}
	return result;
}

/**
 * 格式化时间
 */

export const formatTime = ( date, format ) => {
	if( !date ) return '';
	if( typeof(date) == 'string' ) {
		date = Number(date);
	}
	if( typeof(date) == 'number' ) {
		date = new Date(date);
	}
	return (format || 'Y-m-d H:i:s.M').replace(/Y/g, padLeft(date.getFullYear(), 4))
		.replace(/m/g, padLeft(date.getMonth() + 1, 2))
		.replace(/d/g, padLeft(date.getDate(), 2))
		.replace(/H/g, padLeft(date.getHours(), 2))
		.replace(/i/g, padLeft(date.getMinutes(), 2))
		.replace(/s/g, padLeft(date.getSeconds(), 2))
		.replace(/M/g, padLeft(date.getMilliseconds(), 3));
}

 /**
  * 深克隆
  */

 export const deepClone = obj => {
	return JSON.parse( JSON.stringify(obj) )
}

/**
 * 根据步骤 映射 Class
 */

 export const step2Class = name => {
	switch (name) {
		case '采购': return 'CG';
		case '采收': return 'CS';
		case '包装': return 'BZ';
		case '田间': return 'TJ';
		case '种植': return 'ZZ';
		case '仓储': return 'CC';
		case '加工': return 'JG';
		case '运输': return 'YS';
		case '质检': return 'ZJ';
		case '原料': return 'YL';
	}
 }

 export const transData = data => {
	if ( !data ) return;
	
}

