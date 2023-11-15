import CryptoJS from 'crypto-js';
import {
	config
} from '@/utils/config.js';
import {
	request
} from '@/utils/api.js'

/*
獲取當前時間
*/
export const getTime = () => {
	const date = new Date();
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

/*
格式化錢包地址
*/
export const formatWalletAddress = (walletAddress) => {
	const length = walletAddress.length;
	const prefix = walletAddress.substring(0, 5);
	const suffix = walletAddress.substring(length - 5);
	const maskedPart = '*'.repeat(Math.min(length - 10, 3));
	return `${prefix}${maskedPart}${suffix}`;
}

/*
上報異常日誌訊息
*/
export const LogReport = (params) => {
	// console.log('LogReport=>params=>', params);
	let api = "/Log/report";
	request.noTonkenGet({
		api,
		params,
	}).then(res => {
		// console.log('LogReport=>', res);
	});
}

/*
獲取加密後值
 */
export const getHash = (input) => {
	// console.log('getHash=>input=>', input);
	const encryptedMessage = CryptoJS.HmacMD5(input, config.secret).toString();
	return encryptedMessage;
}

/*
獲取加密後的引數值
*/
export const getParamsHash = (param) => {
	// console.log('getParamsHash param=>', param);
	const dic = eval(param || {});
	const res = Object.keys(dic).sort();
	let requestString = '';
	for (const key in res) {
		requestString += `${res[key]}=${window.btoa(unescape(encodeURIComponent(dic[res[key]])))}`;
	}
	const sign = getHash(requestString.toLowerCase());
	// console.log('sign=>', sign);
	return sign;
}