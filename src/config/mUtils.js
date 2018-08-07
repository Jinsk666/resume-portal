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
/**
 *
 * @param {Array} data
 * value 都为空  => Array = null;
 */
 const isSetGeneralInfoListNull = data => {
	if( data.generalInfoList && data.generalInfoList.length != 0 ){
		let count = 0; // !value count++
		data.generalInfoList.forEach( val => {
			if( !val.value ){
				count++;
			}
		});
		if( data.generalInfoList.length == count ) {
			data.generalInfoList = null;
		}
	}else {
		data.generalInfoList = null;
	}
 }


/**
 *
 * @param {Array} data
 * 控制 隐藏模块
 */
 export const formatData = data => {
	if ( !data ) return;
	// 基本信息处理
	isSetGeneralInfoListNull( data );
	// 处理模块 不包括 种植, 加工
	if( data.moduleInfos && data.moduleInfos.length != 0) {
		for( let i = 0; i < data.moduleInfos.length; i++ ){
			let one = data.moduleInfos[i];
			if( one.moduleName == '种植' || one.moduleName == '加工' ) {
				if( !one.subModelInfoInfoList ) continue;
				for(let y = 0; y < one.subModelInfoInfoList.length; y++) {
					let sub = one.subModelInfoInfoList[y];
					if( sub.label == '种植基本信息' || sub.label == '环境信息' || sub.label == '加工基本信息') {
						isSetGeneralInfoListNull(sub);
						// 如果 generalInfoList == null && 没有图片  就删掉
						if( sub.generalInfoList == null && !(sub.imgUrlList && sub.imgUrlList.length == 0) ) {
							one.subModelInfoInfoList.splice(y, 1);
							i--;
						}
					}else if(sub.label == '田间管理' || sub.label == '工序流程') {
						for( let z = 0; z < sub.subModelInfoInfoList.length; z++ ) {
							let last = sub.subModelInfoInfoList[z];
							isSetGeneralInfoListNull(last);
							if( last.generalInfoList == null && !(sub.imgUrlList && sub.imgUrlList.length == 0) ) {
								sub.subModelInfoInfoList.splice(z, 1);
								i--;
							}
						}
						// 流程便利完成 看 subModelInfoInfoList 是否为空
							// 流程外层 没有 图片 不判断是否有图片
						if( sub.subModelInfoInfoList == null || (sub.subModelInfoInfoList && sub.subModelInfoInfoList.length == 0)) {
							one.subModelInfoInfoList.splice(y, 1);
							i--;
						}
					}
				}
				// 最外层 判断是否为空
				if(one.subModelInfoInfoList && one.subModelInfoInfoList.length == 0) {
					one.subModelInfoInfoList = null;
				}
			}else {
				isSetGeneralInfoListNull(one)
			}
		}
	}
	return data;
}

