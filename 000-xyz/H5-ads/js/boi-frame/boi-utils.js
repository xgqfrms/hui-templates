//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}



/**
 * 计算两点经纬度的距离
 * @param {*} lat1 第一点的纬度
 * @param {*} lng1 第一点的经度
 * @param {*} lat2 第二点的纬度
 * @param {*} lng2 第二点的经度
 */
function GetDistance(lat1, lng1, lat2, lng2) {
	function Rad(d) {
		return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
	}
	var radLat1 = Rad(lat1);
	var radLat2 = Rad(lat2);
	var a = radLat1 - radLat2;
	var b = Rad(lng1) - Rad(lng2);
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137;// EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000; //输出为公里
	//s=s.toFixed(4);
	return s;
}



// 判断当前是是否是微信浏览器
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}



//--------------------------------
//监测应用是否是本地运行
function checkLocal() {
	if (location.host.substring(0,location.host.indexOf(":")) == "127.0.0.1" || location.host == "" || location.host=="localhost") {
		return true;
	} else {
		return false;
	}
}










// JavaScript Document

/**
 * 改变对象透明度
 * @param {jQuery Object} object 要改变的jQuery对象
 * @param {Number} alphaVol 目标透明度
 */
function alphaObject(object, alphaVol) {
	$(object).css("opacity", alphaVol);
	$(object).css("filter", "alpha(opacity=" + (alphaVol * 100) + ")");
	$(object).css("-moz-opacity", alphaVol);
}



/**
 * 改变对象缩放值
 * @param {jQuery Object} object 要改变的jQuery对象
 * @param {Int} scaleX x缩放值
 * @param {Int} scaleY y缩放值
 */
function scaleObject(object, scaleX, scaleY) {
	if (!object || !scaleX) {
		console.log("scaleObject时，object和scaleX不能为空");
		return;
	}

	var scaleStr  = "";
	if (scaleY) {
		scaleStr = "scale(" + scaleX + "," + scaleY + ")";
	} else {
		scaleStr = "scale(" + scaleX + ")";
	}

	$(object).css("transform", scaleStr);
	$(object).css("-webkit-transform", scaleStr);
	$(object).css("-moz-transform", scaleStr);
	$(object).css("-ms-transform", scaleStr);
	$(object).css("-o-transform", scaleStr);
}



/*
 * 检测对象是否是空对象(不包含任何可读属性)。 //如你上面的那个对象就是不含任何可读属性
 * 方法只既检测对象本身的属性，不检测从原型继承的属性。
 */
function isOwnEmpty(obj)
{
    for(var name in obj)
    {
        if(obj.hasOwnProperty(name))
        {
            return false;
        }
    }
    return true;
};


/*
 * 检测对象是否是空对象(不包含任何可读属性)。
 * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
 */
function isEmpty(obj)
{
    for (var name in obj)
    {
        return false;
    }
    return true;
};




//--------------------------------
//获取action随机码
function getActionStr(platform, action, task) {
	var str = randomString(2) + platform + randomString(7) + action + randomString(5) + task + randomString(3);
	return str;
}


//--------------------------------
//将秒数变成时间格式的字符串
function transformTimeStr(time) {
	var mm = Math.floor(time / 60);
	var ss = time % 60;
	if (mm < 10) {
		mm = "0" + mm;
	}
	if (ss < 10) {
		ss = "0" + ss;
	}
	return mm + ":" + ss;
}

//--------------------------------
//将浮点数变成百分比的字符串
function transformPercent(num) {
	return Math.floor(num * 100) + "%";
}


//--------------------------------
//产生规定长度的随机字符串
function randomString(len) {
	len = len || 32;
	//默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = $chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}


//--------------------------------
//验证用户名
function checkUserName(str) {
	var Regex = /^(\w|[\u4E00-\u9FA5])*$/;

	if (Regex.test(str)){
		return true;
	} else {
		return false;
	}
}

//--------------------------------
//验证是否中文
function checkStrIsCN(str) {
	var Regex = /^[\u4E00-\u9FA5]+$/;

	if (Regex.test(str)){
		return true;
	} else {
		return false;
	}
}

//--------------------------------
//验证邮件地址
function checkEmail(emailAddress) {
	var Regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (Regex.test(emailAddress)){
		return true;
	} else {
		return false;
	}
}


//--------------------------------
//文本输入框验证
//txt 为 需要检查的文本对象
//type 为 类型：email——邮箱，phone——手机，username——用户名，zhongwen——全中文，name——姓名，verifyCode——验证码，identificationCard——身份证，tel——电话号码，carNumber——车牌号
function checkInputValue(txt, type) {

	// var defaultVal = $(txt).attr('defaultValue');//获得默认值
	var val = $(txt).val();//获得值

	// alert("defaultValue:" + defaultVal);
	// alert("value:" + val);


	var isDefaultValue = true;
	if (val == "") {
		isDefaultValue = true;
	} else {
		isDefaultValue = false;
	}

	if (type == "email") {
		if (isDefaultValue) {
			alert("请输入邮箱地址");
			return false;
		}
		else if (!checkStringType(val, type)) {
			alert("邮箱地址不符合规定");
			return false;
		}
		else {
			return true;
		}
	}


	else if (type == "phone") {
		if (isDefaultValue) {
			alert("请输入手机号码（11位纯数字）");
			return false;
		}
		else if (!checkStringType(val, type)) {
			alert("手机号码不符合规定（11位纯数字）");
			return false;
		}
		else {
			return true;
		}
	}


	else if (type == "username") {
		if (isDefaultValue) {
			alert("请输入用户名");
			return false;
		}
		else if (!checkStringType(val, type)) {
			alert("用户名必须为2-10位中文/英文/数字/下划线");
			return false;
		}
		else {
			return true;
		}
	}


	else if (type == "zhongwen") {
		if (isDefaultValue) {
			alert("请输入中文内容");
			return false;
		}
		else if (!checkStringType(val, type)) {
			alert("输入内容必须为中文字符");
			return false;
		}
		else {
			return true;
		}
	}

	else if (type == "name") {
		if (isDefaultValue) {
			alert("请输入您的姓名");
			return false;
		}
		else if (!checkStringType(val, type)) {
			alert("姓名必须为2-10位中文/英文");
			return false;
		}
		else {
			return true;
		}
	}

	else if (type == "verifyCode") {
		if (isDefaultValue) {
			alert("请输入验证码");
			return false;
		}
        else if (!checkStringType(val, type)) {
			alert("请输入正确的验证码");
			return false;
		}
		else {
			return true;
		}
	}

    else if (type == "identificationCard") {
		if (isDefaultValue) {
			alert("请输入身份证号码");
			return false;
		}
        else if (!checkStringType(val, type)) {
			alert("请输入正确的身份证号码");
			return false;
		}
		else {
			return true;
		}
	}

    else if (type == "tel") {
		if (isDefaultValue) {
			alert("请输入电话号码");
			return false;
		}
        else if (!checkStringType(val, type)) {
			alert("请输入正确的电话号码");
			return false;
		}
		else {
			return true;
		}
	}

    else if (type == "carNumber") {
		if (isDefaultValue) {
			alert("请输入车牌号");
			return false;
		}
        else if (!checkStringType(val, type)) {
			alert("车牌号格式有误");
			return false;
		}
		else {
			return true;
		}
	}


	else {
		if (isDefaultValue) {
			alert("请输入完整的信息");
			return false;
		}
		else {
			return true;
		}
	}
}

//--------------------------------
//字符串验证
//string 为 需要检查的字符串
//type 为 类型：email——邮箱，phone——手机，username——用户名，zhongwen——全中文，name——姓名，verifyCode——验证码，identificationCard——身份证，tel——电话号码，carNumber——车牌号
function checkStringType(string, type) {
	var Regex;

	//邮箱
	if (type == "email") {
		Regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return Regex.test(string);
	}

	//手机号
	else if (type == "phone") {
		if (isNaN(string) || string.length != 11) {
			return false;
		}
		else {
			return true;
		}
	}

	//用户名（2-10位中、英、-）
	else if (type == "username") {
		if (string.length < 2 || string.length > 10) {
			return false;
		}
		else {
			Regex = /^(\w|[\u4E00-\u9FA5])*$/;
			return Regex.test(string);
		}
	}

	//全中文
	else if (type == "zhongwen") {
		Regex = /^[\u4E00-\u9FA5]+$/;
		return Regex.test(string);
	}

	//姓名
	else if (type == "name") {
		if (string.length < 2 || string.length > 10) {
			return false;
		}
		else {
			Regex = /^(\w|[\u4E00-\u9FA5])*$/;
			return Regex.test(string);
		}
	}

	//验证码
	else if (type == "verifyCode") {
		if (string.length == 4 || string.length == 6) {
			return true;
		}
		else {
			return false;
		}
	}

	//身份证
	else if (type == "identificationCard") {
		if (string.length != 16 && string.length != 18) {
			return false;
		}
		else {
			Regex = /^\d{17}[\dX]$/;
			return Regex.test(string);
		}
	}

	//电话号码
	else if (type == "tel") {
		if (string.length < 7 || string.length > 11) {
			return false;
		}
		else {
			Regex = /^0[\d]{2,3}-[\d]{7,8}$/;
			return Regex.test(string);
		}
	}

	// 车牌号
	else if (type == "carNumber") {
		if (string.length != 7) {
			return false;
		}
		else {
			Regex = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z1-3]{1}[A-Z0-9]{4}[A-Z0-9港澳领学警]{1}[A-Z0-9]?)|([A-Z]{2}[A-Z0-9]{5})$/;
			return Regex.test(string);
		}
	}

	//当没有type的时候
	else {
		return true;
	}
}





//--------------------------------
//数值计算
function numCalculation(oldVol, Increase) {
	var danwei;
	if (oldVol.indexOf("%") > 0) {
		danwei = "%";
	} else if (oldVol.indexOf("px") > 0) {
		danwei = "px";
	}
	return (parseInt(oldVol.replace(danwei,"")) + Increase) + danwei;
}

//--------------------------------
//隐藏对象
function hideObj(obj) {
	$(obj).css("display", "none");
}

//--------------------------------
//获取url的参数
function getRequest() {
   var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}


/*
 * 按参数名获取URL参数
 * @name string 参数名
*/
function getQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


//--------------------------------
//截图
//displayObject: 要截取的DOM对应
//callback: 完成后回调函数，定义此函数接收截取结果
//pictyle: 返回的图片类型，"img"或"dataUrl"，img将返回img元素，dataUrl将返回图片数据
function snapPic(displayObject, callback, width, height, pictyle){
	var type = pictyle ? pictyle : "dataUrl";
	//var type = pictyle;

	if (!width) width = displayObject.style.width();
	if (!height) height = displayObject.style.height();

	//console.log(width + ':::' + height);

	html2canvas(displayObject, {
		allowTaint: true,
		taintTest: true,
		width: width,
		height: height,
		onrendered: function(canvas) {
			//截图完成
			canvas.crossOrigin = "*";
			var dataUrl = canvas.toDataURL("image/jpeg");//生成jpg图像
			if (callback) {
				if (type == "img") {
					var newImg = document.createElement("img");
					newImg.src =  dataUrl;
					callback(newImg);
				} else {
					callback(dataUrl);
				}
			}
		}
	});
}

//--------------------------------
//img截图(正方形)
//img: 要截取的<img>DOM对应
//num: 截图偏移量
//callback回调函数返回图片base64数据
function drowImgII(img, num, callback){
	// 图片原始尺寸
    var picW = img.naturalWidth, picH = img.naturalHeight;
    // 图片当前尺寸
    var imgW = img.width, imgH = img.height;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    if(imgW > imgH){
    	canvas.width = imgH;
    	canvas.height = imgH;
		var s = picH/imgH;
		ctx.drawImage(img, num*s,0, picH,picH, 0,0, imgH,imgH);
    }else{
    	canvas.width = imgW;
    	canvas.height = imgW;
		var s = picW/imgW;
		ctx.drawImage(img, 0,num*s, picW,picW, 0,0, imgW,imgW);
    }
    var dataUrl = canvas.toDataURL("image/jpeg");
    /*$(canvas).attr('style','position: absolute; top:600px; left:55px; border:solid 1px #000;');
    $(canvas).attr('id','mycanvas');
	$('#upUserWork_info').append(canvas);
	return;*/
	if(callback){
    	callback(dataUrl);
    }
}


//--------------------------------
//截取整个页面
function snapPage(){
	//alert("开始截图");

	html2canvas(document.body, {
		allowTaint: true,
		taintTest: false,
		onrendered: function(canvas) {
			//截图完成
			//canvas.id = "mycanvas";
			//document.body.appendChild(canvas);
			//生成base64图片数据
			var dataUrl = canvas.toDataURL();
			var newImg = document.createElement("img");
			newImg.src =  dataUrl;
			//document.body.appendChild(newImg);
			document.getElementById("page1").appendChild(newImg);
			//alert("ok");
		}
	});
}

//--------------------------------
//切换容器内的内容
function shiftContent(content, container){
	container.empty();//清空容器
	container.load(content);//加载内容
	//container.append("<div>aaasasasasa2</div>");  //追加元素至容器
}

//--------------------------------
//图片预加载
//  arr：可以是存放图片路径的一个数组，也可以是选取到的img的jquery对象；
//  funLoading：每一个单独的图片加载完成后执行的操作；
//  funOnLoad：全部图片都加载完成后的操作；
//  funOnError：单个图片加载出错时的操作。
function loadImg(arr, funLoading, funOnLoad, funOnError){
    var numLoaded=0,
    numError=0,
    isObject=Object.prototype.toString.call(arr)==="[object Object]" ? true : false;

    var arr=isObject ? arr.get() : arr;
    for(a in arr){
        var src=isObject ? $(arr[a]).attr("data-src") : arr[a];
        preload(src,arr[a]);
    }

    function preload(src,obj){
        var img=new Image();
        img.onload=function(){
            numLoaded++;
            funLoading && funLoading(numLoaded,arr.length,src,obj);
            funOnLoad && numLoaded==arr.length && funOnLoad(numError);
        };
        img.onerror=function(){
            numLoaded++;
            numError++;
            funOnError && funOnError(numLoaded,arr.length,src,obj);
        }
        img.src=src;
    }
}



//--------------------------------
//给phone加XXXX
function phoneXXXX(phoneStr) {
	if (phoneStr.length > 3) {
		if (phoneStr.length > 7) {
			var endStr = phoneStr.substring(7, phoneStr.length-1);
		}
		phoneStr = phoneStr.substr(0,3) + ("XXXX").substr(0, (phoneStr.length - 3));
		if (endStr) {
			phoneStr += endStr;
		}
		return phoneStr;
	} else {
		return phoneStr;
	}
}



//--------------------------------
//绑定文本提示
function inputBind(txt) {
	//输入文本处理
	txt.bind({
		focus:focusHandler,
		blur:blurHandler
	});

	function focusHandler() {
		if (this.value == this.defaultValue){
			this.value="";
		}
	}

	function blurHandler() {
		if (this.value == ""){
			this.value = this.defaultValue;
		}
	}
}


//--------------------------------
//绑定文本提示
function getTime()
{
	//获取时间
	var date = new Date();

	var currentYear = date.getFullYear();
	var currentMonth = date.getMonth() + 1;
	var currentDay = date.getDate();

	if (currentMonth < 10) currentMonth = "0" + String(currentMonth);
	if (date.date < 10) currentDay = "0" + String(currentDay);

	var _hours = date.getHours();
	var _minutes = date.getMinutes();
	var _seconds = date.getSeconds();

	if (_hours < 10) _hours = "0" + String(_hours);
	if (_minutes < 10) _minutes = "0" + String(_minutes);
	if (_seconds < 10) _seconds = "0" + String(_seconds);

	var str = currentYear + "-" + currentMonth + "-" + currentDay + " " + _hours + ":" + _minutes + ":" + _seconds;
	return str;
}


//--------------------------------
//取数组中的一个随机元素
function getRandomOne(oArray) {
	var n = Math.floor(Math.random() * (oArray.length - 0.000001));
	return(oArray[n]);
}



//--------------------------------
//将整个数组随机排序
function randomArray(oArray) {
	Arr1.sort(function(){return Math.random()>0.5?-1:1;});
	return(Arr1);
}

//--------------------------------
//将图片旋转并且转换成canvas标签
//id  标签id
//angle 旋转角度
//whence 来源（这个参数可不传，暂时不知道作用是什么。）
function rotate(id,angle,whence) {
	var p = document.getElementById(id);
	var sca;

	// we store the angle inside the image tag for persistence
	if (!whence) {
		p.angle = ((p.angle==undefined?0:p.angle) + angle) % 360;
	} else {
		p.angle = angle;
	}

	if (p.angle >= 0) {
		var rotation = Math.PI * p.angle / 180;
	} else {
		var rotation = Math.PI * (360+p.angle) / 180;
	}
	var costheta = Math.cos(rotation);
	var sintheta = Math.sin(rotation);

	if (document.all && !window.opera) {
		var canvas = document.createElement('img');

		canvas.src = p.src;
		canvas.height = p.height;
		canvas.width = p.width;

		canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M12="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
	} else {
		var canvas = document.createElement('canvas');
		if (!p.oImage) {
			canvas.oImage = new Image();
			canvas.oImage.src = p.src;
			// alert(canvas.oImage.width);
			sca = 750/canvas.oImage.width;
			canvas.oImage.width = canvas.oImage.width * sca;
			canvas.oImage.height = canvas.oImage.height * sca;
		} else {
			canvas.oImage = p.oImage;
			sca = 750/canvas.oImage.width;
			canvas.oImage.width = canvas.oImage.width * sca;
			canvas.oImage.height = canvas.oImage.height * sca;
		}

		canvas.style.width = canvas.width = Math.abs(costheta*canvas.oImage.width) + Math.abs(sintheta*canvas.oImage.height);
		canvas.style.height = canvas.height = Math.abs(costheta*canvas.oImage.height) + Math.abs(sintheta*canvas.oImage.width);

		var context = canvas.getContext('2d');
		context.save();
		if (rotation <= Math.PI/2) {
			context.translate(sintheta*canvas.oImage.height,0);
		} else if (rotation <= Math.PI) {
			context.translate(canvas.width,-costheta*canvas.oImage.height);
		} else if (rotation <= 1.5*Math.PI) {
			context.translate(-costheta*canvas.oImage.width,canvas.height);
		} else {
			context.translate(0,-sintheta*canvas.oImage.width);
		}
		context.rotate(rotation);
		context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
		context.restore();
	}
	canvas.id = p.id;
	canvas.angle = p.angle;
	p.parentNode.replaceChild(canvas, p);
}





// 针对IOS图片截图旋转问题
function selectFileImage(fileObj, container, callback) {
    var file = fileObj.files['0'];
    //图片方向角 added by lzk
    var Orientation = null;

    if (file) {
        console.log("正在上传,请稍后...");
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
        if (!rFilter.test(file.type)) {
            //showMyTips("请选择jpeg、png格式的图片", false);
            return;
        }
        // var URL = URL || webkitURL;
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function() {
           // alert(EXIF.pretty(this));
            EXIF.getAllTags(this);
            //alert(EXIF.getTag(this, 'Orientation'));
            Orientation = EXIF.getTag(this, 'Orientation');
            //return;
        });

        var oReader = new FileReader();
        oReader.onload = function(e) {
            //var blob = URL.createObjectURL(file);
            //_compress(blob, file, basePath);
            var image = new Image();
            image.src = e.target.result;
            image.onload = function() {
                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;

                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                    expectWidth = 800;
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                    expectHeight = 1200;
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                }
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                var base64 = null;
                //修复ios
                if (navigator.userAgent.match(/iphone/i)) {
                    console.log('iphone');
                    //alert(expectWidth + ',' + expectHeight);
                    //如果方向角不为1，都需要进行旋转 added by lzk
                    if(Orientation != "" && Orientation != 1){
                        // alert('旋转处理');
                        switch(Orientation){
                            case 6://需要顺时针（向左）90度旋转
                                // alert('需要顺时针（向左）90度旋转');
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                // alert('需要顺时针（向右）90度旋转');
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                // alert('需要180度旋转');
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                        }
                    }

                    /*var mpImg = new MegaPixImage(image);
                    mpImg.render(canvas, {
                        maxWidth: 800,
                        maxHeight: 1200,
                        quality: 0.8,
                        orientation: 8
                    });*/
                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                }else if (navigator.userAgent.match(/Android/i)) {// 修复android
                	// alert('Android');
                    // var encoder = new JPEGEncoder();
                    // base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                    if(Orientation != "" && Orientation != 1){
                        //alert('旋转处理');
                        switch(Orientation){
                            case 6://需要顺时针（向左）90度旋转
                                // alert('需要顺时针（向左）90度旋转');
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                // alert('需要顺时针（向右）90度旋转');
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                // alert('需要180度旋转');
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                        }
                    }

                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                }else{
                    //alert(Orientation);
                    if(Orientation != "" && Orientation != 1){
                        //alert('旋转处理');
                        switch(Orientation){
                            case 6://需要顺时针（向左）90度旋转
                                // alert('需要顺时针（向左）90度旋转');
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                // alert('需要顺时针（向右）90度旋转');
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                // alert('需要180度旋转');
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                        }
                    }

                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                }
                var img = new Image();
                img.src = base64;
                $(img).attr("id", "isUpPic");//生成的图片标签的id
                container.empty();
                container.append($(img));
                img.onload = function (){
                	// alert(img.naturalWidth);
                	// alert(img.naturalHeight);
	                if(img.naturalWidth > img.naturalHeight){
	                	var direction = 'x';
						$(img).attr('style', 'height:100%;');
						container.scrollLeft(100000);
						scrollNum = container.scrollLeft();
						var scl = scrollNum/2;
						container.scrollLeft(scl);
						scrollNum = container.scrollLeft();
	                }else{
	                	var direction = 'y';
						$(img).attr('style', 'width:100%;');
						container.scrollTop(100000);
						scrollNum = container.scrollTop();
						var scl = scrollNum/2;
						container.scrollTop(scl);
						scrollNum = container.scrollTop();
	                }
	                if(callback){
	                	callback($(img), direction, scl);
	                }
                }
            };
        };
        oReader.readAsDataURL(file);
    }
}

//对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas) {
    //alert(img);
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    var height = img.height;
    var width = img.width;
    //var step = img.getAttribute('step');
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}



/*
 * Javascript base64_encode() base64加密函数
   用于生成字符串对应的base64加密字符串
 * 吴先成  www.51-n.com ohcc@163.com QQ:229256237
 * @param string str 原始字符串
 * @return string 加密后的base64字符串
*/
function base64_encode(str){
        var c1, c2, c3;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var i = 0, len= str.length, string = '';

        while (i < len){
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len){
                        string += base64EncodeChars.charAt(c1 >> 2);
                        string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                        string += "==";
                        break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len){
                        string += base64EncodeChars.charAt(c1 >> 2);
                        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                        string += "=";
                        break;
                }
                c3 = str.charCodeAt(i++);
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                string += base64EncodeChars.charAt(c3 & 0x3F)
        }
                return string
}
/*
 * Javascript base64_decode() base64解密函数
   用于解密base64加密的字符串
 * 吴先成  www.51-n.com ohcc@163.com QQ:229256237
 * @param string str base64加密字符串
 * @return string 解密后的字符串
*/
function base64_decode(str){
        var c1, c2, c3, c4;
        var base64DecodeChars = new Array(
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
                58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,  1,  2,  3,  4,  5,  6,
                7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
                -1, -1
        );
        var i=0, len = str.length, string = '';

        while (i < len){
                do{
                        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                } while (
                        i < len && c1 == -1
                );

                if (c1 == -1) break;

                do{
                        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                } while (
                        i < len && c2 == -1
                );

                if (c2 == -1) break;

                string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                do{
                        c3 = str.charCodeAt(i++) & 0xff;
                        if (c3 == 61)
                                return string;

                        c3 = base64DecodeChars[c3]
                } while (
                        i < len && c3 == -1
                );

                if (c3 == -1) break;

                string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

                do{
                        c4 = str.charCodeAt(i++) & 0xff;
                        if (c4 == 61) return string;
                        c4 = base64DecodeChars[c4]
                } while (
                        i < len && c4 == -1
                );

                if (c4 == -1) break;

                string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
        }
        return utf8to16(string);
}
function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}
function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
			case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
				// 0xxxxxxx
				out += str.charAt(i - 1);
				break;
			case 12: case 13:
				// 110x xxxx   10xx xxxx
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
			case 14:
				// 1110 xxxx  10xx xxxx  10xx xxxx
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x0F) << 12) |
					((char2 & 0x3F) << 6) |
					((char3 & 0x3F) << 0));
				break;
		}
	}
	return out;
}

/*
 * 获取URL参数
 * @name string 参数名
*/
function getQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


/*
 * 获取数组的一个随机项
 * @arry Array 数组
*/
function randomItem(arry) {
	var length = arry.length;
	var index = Math.floor(Math.random() * (length - 0.000001));
	return arry[index];
}





//获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
