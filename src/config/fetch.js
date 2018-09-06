import {
	baseUrl
} from './env'

// promise 封装 Ajax
export default async(url = '', data = {}, type = 'GET') => {
	type = type.toUpperCase();
	// 测试
	//let path = '';
	// 正式
	let path = '/farmeasy-api-gateway';
	url = baseUrl + path + url;
	console.log(url);
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	return new Promise((resolve, reject) => {
		let requestObj;
		if (window.XMLHttpRequest) {
			requestObj = new XMLHttpRequest();
		} else {
			requestObj = new ActiveXObject;
		}

		requestObj.open(type, url, true);

		let sendData = '';
		if (type == 'POST') {
			sendData = JSON.stringify(data);
			requestObj.setRequestHeader("Content-type", "application/json");
			requestObj.setRequestHeader("Platform-Code", "1s7kc8zvwwat");
			requestObj.setRequestHeader("Platform-Secret", "08xwwf336woy1688uudkelyyhl3i13mk");
		}

		requestObj.send(sendData);

		requestObj.onreadystatechange = () => {
			if (requestObj.readyState == 4) {
				if (requestObj.status == 200) {
					let obj = requestObj.response
					if (typeof obj !== 'object') {
						obj = JSON.parse(obj);
					}
					resolve(obj)
				} else {
					reject(requestObj)
				}
			}
		}
	})
}