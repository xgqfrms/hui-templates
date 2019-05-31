
// 设置默认页
boi.defaultPage.templateId = 'start';
boi.defaultPage.pageId = 'start';

// 设置默认浮层
/*boi.defaultFloatPage.templateId = 'submitDone';
boi.defaultFloatPage.pageId = 'submitDone';
boi.defaultFloatPage.constructor = intro_submitDone;*/

// 配置页面
//boi.config.contentWidth = 375;
//boi.config.contentHeight = 724;
//boi.config.resizeType = 'cover';

// 预加载资源
// 进入也面前加载的资源
boi.preload.listAdd = [
    'assets/images/xulie.jpg'
];
// 进入页面后加载的资源
boi.preload.listAfter = [
];

// 当前活动试驾code
var campaignCode = 'gm3';

// 项目初始化
boi.config.onInit = function () {
}

//loading进度处理
boi.loading.onProgress = function (_progress) {
    var loading_progress = (_progress * 100);
    $('#loading #txt').text(Math.floor(loading_progress) + '%');
}


//默认页初始化
boi.defaultPage.constructor = function () {
    var url = window.location.href;
    getConfig(
        url,
        function (configData) {
            console.log('config数据获取成功：', configData);
            initWx(configData.data.appId, configData.data.timestamp, configData.data.nonceStr, configData.data.signature);
        },
        function () {
            console.log('接口访问失败！');
        },
    );
    intro_start();
}

// 背景音乐开关
var isBgSound = false;




// ╔══════════════════ start 开始页 ═════════════════════╗
function intro_start() {

    resizeWindow();
    $(window).resize(resizeWindow);
    function resizeWindow() {
        //console.log('resizeWindow');
        // 视频适配
        /**窗口宽 */
        windowWidth = $(window).width();
        /**窗口高 */
        windowHeight = $(window).height();

        var videoWidth = 540;
        var videoHeight = 960;
        var kgb_content = videoWidth / videoHeight;
        var kgb_window = windowWidth / windowHeight;

        var bili;
        var w;
        var h;
        if (kgb_content > kgb_window) {
            h = windowHeight;
            w = h * kgb_content;
        } else {
            w = windowWidth;
            h = w / kgb_content;
        }
        $('#xulie').css('width', w + 'px');
        $('#xulie').css('height', h + 'px');
        $('#xulie').css('margin-left', -(w/2) + 'px');
        $('#xulie').css('margin-top', -(h/2) + 'px');
    }

    //if(videoWidth > windowWidth ){
    //    if (kgb_content >= kgb_window) {
    //        var scale = windowHeight / videoHeight;
    //    } else {
    //        var scale = windowWidth / videoWidth;
    //    }
    //    var w = videoWidth - (videoWidth - videoWidth * scale);
    //    var h = videoHeight - (videoHeight - videoHeight * scale);
    //    $('#xulie').css('width', w + 'px');
    //    $('#xulie').css('height', h + 'px');
    //    $('#xulie').css('margin-left', -(w/2) + 'px');
    //    $('#xulie').css('margin-top', -(h/2) + 'px');
    //}

    //序列帧对象
    var KeyFrames;
    // 加载序列图
    var keyFrameImgs;
    // 加载相关序列帧
    var list = [
        {id: "xulie", src:'assets/images/xulie.jpg'}
    ];
    loadKeyFrames(list, onLoaded);
    function loadKeyFrames(list, callback){
        //console.log(list);
        keyFrameImgs = new createjs.LoadQueue();
        keyFrameImgs.installPlugin(createjs.Sound);
        keyFrameImgs.on("complete", handleComplete, this);
        keyFrameImgs.loadManifest(list);
        function handleComplete(){
            callback();
        }
    }
    function onLoaded(data){
        // 序列播放
        var xulie = keyFrameImgs.getResult('xulie');
        initKeyFrames( '#xulie', xulie, 540, 960, 20);
    }
    function initKeyFrames( dom, img, width, height, fps, callback ){
        $(dom).empty();
        KeyFrames = new CanvasKeyFrames(document.querySelector(dom), 'sprite', img, {
            fps:fps,
            width:width,
            height:height,
            ratio:1,
            loop:'infinite'
        });
        KeyFrames.from(0, 'infinite', callback);
    }

    // 默认情况下自动播放背景音乐（IOS下不会自动播放）
    var myAuto = document.getElementById('bgSound');
    myAuto.play();
    // 监听背景音乐是否开始自动播放
    checkBgSound();
    function checkBgSound(){
        if(myAuto.paused){
            isBgSound = false;
            $('#audioSwitch').css('background-image', 'url(assets/images/off.png)');
        }else{
            isBgSound = true;
            $('#audioSwitch').css('background-image', 'url(assets/images/on.png)');
        }
    }
    // 点击音乐开关按钮
    $('#audioSwitch').click(function(){
        if(isBgSound){
            myAuto.pause();
            $('#audioSwitch').css('background-image', 'url(assets/images/off.png)');
            isBgSound = false;
            return;
        }
        if(!isBgSound){
            myAuto.play();
            $('#audioSwitch').css('background-image', 'url(assets/images/on.png)');
            isBgSound = true;
        }
    });
    // 点击进入按钮
    $('#nextBtn').click(function(){
        myAuto.pause();
        //$('#audioSwitch').text('关');
        isBgSound = false;
        shiftPage('driveForm', 'driveForm', intro_driveForm, null, 'XIA_SHANG');
        // shiftPage('done', 'done', intro_done, null, 'XIA_SHANG');
    });
}
// ╚════════════════════════════════════════════════════╝


// ╔══════════════════ start 开始页 ═════════════════════╗
function intro_driveForm(){
    //添加省份
    for (var i in areaData) {
        $('#form #province select').append('<option>' + areaData[i].province + '</option>');
    }
    // 选择省份
    $('#form #province select').change(onChangeProvince);
    // 选择省份后设置城市
    function onChangeProvince(e) {
        var index = $('#form #province select').children('option:selected').index() - 1;
        if (index != -1) {
            $('#form #city select').empty();
            for (var j in areaData[index].city) {
                $('#form #city select').append('<option>' + areaData[index].city[j] + '</option>');
            }
        } else {
            $('#form #city select').empty();
            $('#form #city select').append('<option>请选择城市</option>');
        }
    }

    // 为表单必填项添加提示功能
    $('#form #lastName input').on('input', onInput);
    $('#form #firstName input').on('input', onInput);
    $('#form #email input').on('input', onInput);
    $('#form #mobile input').on('input', onInput);
    $('#price input').on('input', onInput);

    $('#form #lastName input').on('blur', onBlur);
    $('#form #firstName input').on('blur', onBlur);
    $('#form #email input').on('blur', onBlur);
    $('#form #mobile input').on('blur', onBlur);
    $('#price input').on('blur', onBlur);
    $('#form #province select').on('blur', onBlur);
    $('#form #city select').on('blur', onBlur);

    function onInput(e) {
        var id = $(e.currentTarget).parent().attr('id');
        //console.log(id);
        if (id != 'email' && id != 'mobile') {
            checkInput(e.currentTarget);
        }

    }

    function onBlur(e) {
        console.log('aaa');
        checkInput(e.currentTarget);
    }

    function checkInput(obj) {
        var id = $(obj).parent().attr('id');
        console.log(id);
        if ((id == 'price' && !$(obj).val()) || (id == 'price' && parseFloat($(obj).val()) <= 0)) {
            $(obj).siblings('.inputTip').text('请填写您预测的价格');
            $(obj).parent().addClass('mustFill');
            return false;
        } else if (!$(obj).val() || (id == 'province' && $(obj).val() == '请选择省份') || (id == 'city' && $(obj).val() == '请选择城市')) {
            $(obj).siblings('.inputTip').text('必填字段');
            $(obj).parent().addClass('mustFill');
            return false;
        } else if (id == 'email' && !checkStringType($(obj).val(), 'email')) {
            $(obj).siblings('.inputTip').text('不是有效的电子邮箱地址');
            $(obj).parent().addClass('mustFill');
            return false;
        } else if (id == 'mobile' && !checkStringType($(obj).val(), 'phone')) {
            $(obj).siblings('.inputTip').text('无效的手机号码');
            $(obj).parent().addClass('mustFill');
            return false;
        }else {
            $(obj).siblings('.inputTip').text('提示');
            $(obj).parent().removeClass('mustFill');
            return true;
        }
    }


    // 点击提交按钮
    $('#submitBtn').bind('click', submit);
    function submit(e) {
        //测试用
        //onSuccess({});
        //return;


        //判断值
        var doneCount = 0;
        if (checkInput($('#price input'))) doneCount++;
        if (checkInput($('#form #lastName input'))) doneCount++;
        if (checkInput($('#form #firstName input'))) doneCount++;
        if (checkInput($('#form #email input'))) doneCount++;
        if (checkInput($('#form #mobile input'))) doneCount++;
        if (checkInput($('#form #province select'))) doneCount++;
        if (checkInput($('#form #city select'))) doneCount++;
        if (doneCount >= 7) {
            console.log('试驾信息全，可提交');
            disableSubmitBtn();
            $('#submitBtn').text('提交中...');
            var lastName = $('#form #lastName input').val();
            var firstName = $('#form #firstName input').val();
            var email = $('#form #email input').val();
            var mobile = $('#form #mobile input').val();
            var province = $('#form #province select').val();
            var city = $('#form #city select').val();
            var price = $('#price input').val();
            var _datas = {
                note: '猜测价格为:' + price,
                lastname: lastName,
                firstname: firstName,
                email: email,
                mobile: mobile,
                province: province,
                city: city,
                update: 0,
                app: campaignCode
            }
            console.log('提交试驾数据：' + JSON.stringify(_datas));
            $.ajax({
                url: 'https://wechat.teslamotors.com/externalApi/td.php',
                type: 'POST',
                data: _datas,
                dataType: 'jsonp',
                success: function (data) {
                    onSuccess(data);
                },
                error: function (data) {
                    // ==============================对方接口问题，即使失败也视为成功
                    onSuccess(data);
                }
            });
        } else {
            var top = $('#price').offset().top - 60;
            $('html,body').animate({scrollTop: top}, 600);
        }
    }

    function disableSubmitBtn() {
        $('#submitBtn').unbind('click', submit);
        $('#submitBtn').css('background-color', '#990000');
    }

    function enabledSubmitBtn() {
        $('#submitBtn').bind('click', submit);
        $('#submitBtn').css('background-color', '#CC0000');
    }

    function onSuccess(_data) {

        shiftPage('done', 'done', intro_done, null, 'XIA_SHANG');
        //$('#submitBtn').text('预约试驾');
        enabledSubmitBtn();
        //alert('aaaa');
    }

    //隐私与法律
    $('#privacy').click(function(){
        window.location.href = 'https://www.tesla.cn/about/legal';
    });
}
// ╚════════════════════════════════════════════════════╝


function intro_done(){
    var numbers = [225, 0, 5.6, 0, 2, 460, 2, 56000, 8, 3, 27800, 3];
    var numbers_id = Math.floor(Math.random()*(numbers.length - 0.000001));
    //setTimeout(function(){
    //    var allIntegral = new CountUp('t3', 0, numbers[numbers_id], 0, 2);
    //    allIntegral.start();
    //},600)
    $('#done #t3').text(numbers[numbers_id]);
}

// ╔══════════ submitDone 提交成功 - 浮层 ═══════════╗
function intro_submitDone(){
    console.log('sss');
    $('#submitDone .close, #submitDone #background, #submitDone #confirm').click(outThis);
    function outThis(){
        outFloatPage('submitDone', null, 'SHANG_XIA');
    }
}
// ╚════════════════════════════════════════════════════╝



// 获取微信Config
function getConfig(url, onSuccess, onError) {
    $.ajax({
        url: "http://campaign.boi-ad.com/wechat_jssdk_api/wx_share.php",
        type: 'GET',
        data: {
            url: url // 必填项 不传值获取到的签名无效
        },
        dataType: 'json',
        success: function (result) {
            if(onSuccess){
                onSuccess(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}
// 载入微信SDK
function initWx(appId, timestamp, nonceStr, signature) {

    console.log(appId, timestamp, nonceStr, signature);

    var title = '中国制造的 Model 3，你猜的价格是？';
    var desc = '猜中的，可能会在儿童节收到惊喜礼品';
    var link = 'http://campaign.boi-ad.com/tesla_model3Guess/';
    var imgUrl = 'http://campaign.boi-ad.com/tesla_wxapp/h5/share/sharePic_model3TD.jpg';

    console.log('开始激活微信JSSDK');

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表
    });
    wx.ready(function () {
        console.log('激活微信JSSDK - 成功');
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '',
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareQQ({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    trigger: function (res) {
                        //alert('用户点击分享到QQ');
                    },
                    complete: function (res) {
                        //alert(JSON.stringify(res));
                    },
                    success: function (res) {
                        //alert('已分享');
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });
        //分享到微博”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareWeibo({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    trigger: function (res) {
                        //alert('用户点击分享到微博');
                    },
                    complete: function (res) {
                        //alert(JSON.stringify(res));
                    },
                    success: function (res) {
                        //alert('已分享');
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });
    });
    wx.error(function (res) {
        console.log('激活微信JSSDK - 失败', res);
    });
}
