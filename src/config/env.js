/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 *
 */

let baseUrl = '';
let routerMode = 'hash';


if (process.env.NODE_ENV == 'development') {
	//baseUrl = '/apis';
	baseUrl = 'http://cs.nongchangyun.cn';
	//baseUrl = 'http://auth.farmeasy.cn';
}else if(process.env.NODE_ENV == 'production'){
	// 测试地址
	//baseUrl = 'http://cs.nongchangyun.cn';
	// 线上地址
	baseUrl = 'http://auth.farmeasy.cn';
}
export {
	baseUrl,
	routerMode
}