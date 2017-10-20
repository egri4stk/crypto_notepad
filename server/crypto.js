var aesjs = require('aes-js');



const encryptText = (text,key_) => {
	const key_arr = toUTF8Array(key_);
	const key = key_arr.slice(0,16);
	const iv = key_arr.slice(-16);
	const textBytes = aesjs.utils.utf8.toBytes(text);
	const aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
	const encryptedBytes = aesOfb.encrypt(textBytes);
	return encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
}

const decryptText = (text,key_) => {
	const key_arr = toUTF8Array(key_);
	const key = key_arr.slice(0,16);
	const iv = key_arr.slice(-16);

	let encryptedBytes = aesjs.utils.hex.toBytes(text);
	let aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
	let decryptedBytes = aesOfb.decrypt(encryptedBytes);
	return decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
}


function toUTF8Array(str) {
    var utf8= unescape(encodeURIComponent(str));
    var arr= new Array(utf8.length);
    for (var i= 0; i<utf8.length; i++)
        arr[i]= utf8.charCodeAt(i);
    return arr;
}


module.exports = {
	encryptText,
	decryptText,
	strToByte : toUTF8Array
}