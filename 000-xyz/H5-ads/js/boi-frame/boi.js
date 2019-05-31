
/**页面集 */
var pages = new Array();

/**浮层页集 */
var floatPages = new Array();

/**当前页面id */
var currentPageId = "";

/**设置器 */
var boi = {};

/**窗口宽 */
var windowWidth = $(window).width();

/**窗口高 */
var windowHeight = $(window).height();

/**配置页面参数 */
boi.config = {
    onInit: null,//初始函数
    onShow: null,//即将显示前，加载后的函数
    contentWidth: 375,//内容宽
    contentHeight: 724,//内容高
    resizeType: 'none',//缩放模式，none：不缩放；width：跟随舞台宽；cover：比例缩放占满，多余部分切掉；contain：比例缩放，撑满窗口，不裁切
    contentScale: 1,//内容的缩放比例，可读
    siteUrl: '',//
    apiUrl: ''
}

boi.mainContainer = {
    x: 0,
    y: 0
}

/**配置分享信息 */
boi.shareInfo = {//默认分享内容
    default: {
        title: '',
        url: '',
        pic: ''
    },
    wxTimeline: {//微信朋友圈分享信息
        title: '',
        url: '',
        pic: ''
    },
    wxAppMessage: {//微信好友分享信息
        title: '',
        url: '',
        desc: '',
        pic: ''
    },
    qq: {//分享到QQ的分享信息
        title: '',
        url: '',
        desc: '',
        pic: ''
    },
    weibo: {//分享到微博的分享信息
        title: '',
        url: '',
        desc: '',
        pic: ''
    }
}


/**
 *默认页相关配置
 * @param {*} templateId 模版id
 * @param {*} pageId 页面id
 * @param {*} constructor 构造函数
 */
boi.defaultPage = {
    templateId: '',/**模版id */
    pageId: '',//页面id
    constructor: null//构造函数
}



//本地测试时默认页相关配置
boi.defaultPageLocal = {
    templateId: '',//模版id
    pageId: '',//页面id
    constructor: null//构造函数
}


//默认浮层页配置
boi.defaultFloatPage = {
    templateId: '',//模版id
    pageId: '',//页面id
    constructor: null//构造函数
}



//预加载配置
var preloader;//预加载队列
boi.preload = {
    list: [],//默认加载项，除此之外框架会自动添加所以DIV的background-image
    listExclude: [],//预加载排除项
    listAdd: [],//预加载额外添加项
    listAfter: []//首页显示后需继续加载的项
}



//loading配置
boi.loading = {
    onInit: null,//初始化
    onProgress: null,//加载中
    onComplete: null,//加载完毕
    progress: 0//进度
}


//背景配置
boi.bg = {
    onInit: null//初始化
}

//前景配置
boi.front = {
    onInit: null//初始化
}


//--------------------------------
//dom绘制完成
$(document).ready(function () {

    //初始显示处理
    //$("#bg").css("display","none");
    $("#front").css("display", "none");
    $("#pages").css("display", "none");
    $("#floatPages").css("display", "none");


    //全局设定
    $("img").crossOrigin = "*";

    //页面未显示前执行的初始函数
    //if (typeof init == "function") {init()};
    if (boi.config.onInit) {
        boi.config.onInit();
    }


    //////////////////获取需预加载素材
    var divAry = $("div").toArray();
    // console.log(divAry.length);



    for (var i in divAry) {

        // console.log($(divAry[i]).css('background'));

        //添加图片
        if ($(divAry[i]).css('background-image') != 'none' && $(divAry[i]).css('background-image').indexOf('url(') > -1) {

            var tempSrc = $(divAry[i]).css('background-image');
            tempSrc = tempSrc.replace('url("', '').replace('")', '');
            tempSrc = tempSrc.replace("url('", "").replace("')", "");
            tempSrc = tempSrc.replace('url(', '').replace(')', '');

            // console.log(tempSrc);

            var obj = {};
            obj.id = '';
            obj.src = tempSrc;
            boi.preload.list.push(obj);
        }
    }

     //console.log(boi.preload.list.length);

    //排除
    if (boi.preload.listExclude && boi.preload.listExclude.length > 0) {
        for (var m = boi.preload.list.length - 1; m >= 0; m--) {
            if (boi.preload.listExclude.indexOf(boi.preload.list[m]) != -1) {
                boi.preload.list.splice(m, 1);
            }
        }
    }

    //添加
    if (boi.preload.listAdd && boi.preload.listAdd.length > 0) {
        for (var n in boi.preload.listAdd) {
            if (typeof boi.preload.listAdd[n] != 'object') {
                var obj = {};
                obj.id = '';
                obj.src = boi.preload.listAdd[n];
                boi.preload.list.push(obj);
            } else {
                boi.preload.list.push(boi.preload.listAdd[n]);
            }
        }
    }

    // console.log('>>>' + boi.preload.list.length);


    ///////////////////////////////////////
    //缓存页面标签、清空页面
    pages = $("#pages").children("div").toArray();
    $("#pages").empty();

    //缓存浮层标签、清空浮层
    floatPages = $("#floatPages").children("div").toArray();
    $("#floatPages").empty();




    //防止下拉
	/*document.querySelector('body').addEventListener('touchmove', function(e) {
		//console.log(JSON.stringify(e));
	    e.preventDefault();///////
	})*/




    //缩放设置
    if (boi.config.resizeType != 'none') {
        trackWindow(boi.config.resizeType);
        $(window).resize(function () {
            trackWindow(boi.config.resizeType);
        });
    }
    /*if (boi.config.resizeType == 'width') {
        resizeToStageWidth();
        $(window).resize(resizeToStageWidth);
    } else if (boi.config.resizeType == 'contain') {
        trackWindow();
        $(window).resize(trackWindow);
    } else if (boi.config.resizeType == 'cover') {

    } else if (boi.config.resizeType == 'none') {

    } else {
        console.log('暂不支持此缩放模式');
    }*/




    //设定本地默认页
    if (checkLocal()) {
        if (boi.defaultPageLocal.templateId && boi.defaultPageLocal.pageId) {
            boi.defaultPage.templateId = boi.defaultPageLocal.templateId;
            boi.defaultPage.pageId = boi.defaultPageLocal.pageId;
        }
    }


    //loading进场
    if (boi.loading.onInit) boi.loading.onInit();

    // if (isWeiXin()) {
    // 	wxConfigAndShare();
    //        preLoadSource();
    // } else {
    // 	preLoadSource();
    // }
    preLoadSource();

});




//--------------------------------
//预加载
function preLoadSource() {

	/*if (checkLocal()) {
		console.log('本地播放不预加载..');
		startPage();
		return;
	}*/


    if (boi.preload.list.length <= 0) {

        console.log('预加载列表为空，不加载..');

        startPage();

        //再加载下一批
        if (boi.preload.listAfter && boi.preload.listAfter.length > 0) {
            console.log('加载下一批资源：listAfter');
            var preloader_after = new createjs.LoadQueue();
            preloader_after.loadManifest(boi.preload.listAfter);
        }

        return;
    }


    //开始预加载
    preloader = new createjs.LoadQueue();
    preloader.installPlugin(createjs.Sound);//注意加载音频文件需要调用如下代码行
    //preloader.on("fileload", handleFileLoad);//在载中的处理
    preloader.on("progress", handleFileProgress);
    preloader.on("complete", loadComplete);
    preloader.on("error", loadError);

    //console.log(boi.preload.list);

    preloader.loadManifest(boi.preload.list);


    //已加载完毕进度
    function handleFileProgress(event) {
        // console.log("加载进度：" + preloader.progress);
        //$('#loading_progress').text((preloader.progress*100|0) + "%");
        if (boi.loading.onProgress) { boi.loading.onProgress(preloader.progress) };
        boi.loading.progress = preloader.progress;
    }

    //全度资源加载完毕
    function loadComplete(event) {
        console.log("已加载完毕全部资源");
        $('#loading #txt').show();


        // $('#loading').click(function () {
        //     startPage();
        //     initAudio();
        //     $('#loading_game').fadeOut();
        //     $('#loading_logo').fadeOut();
        //     $('#audioSwitch').fadeIn();
        // });


        startPage();

        //再加载下一批
        if (boi.preload.listAfter && boi.preload.listAfter.length > 0) {
            console.log('加载下一批资源：listAfter');
            var preloader_after = new createjs.LoadQueue();
            preloader_after.loadManifest(boi.preload.listAfter);
        }

    }

    //处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
    function loadError(evt) {
        console.log("加载出错！", evt.text);
        //alert("加载出错！", evt.text);
    }
}




//--------------------------------
//初始化
function startPage(errors) {

    //return;

    initShow();

    //setTimeout(initShow, 1500);


    function initShow() {
        //褪去loading
        //out_loading();
        TweenLite.to($("#loading"), 0.3, {
            autoAlpha: 0, ease: Linear.easeOut, onComplete: function () {
                $("#loading").css("display", "none");
                $("#loading").remove();
            }
        });


        //背景组件进场
        //if (typeof intro_bg == "function") {intro_bg()};
        if (boi.bg.onInit) boi.bg.onInit();
        $("#bg").show();

        //前景组件进场
        //if (typeof intro_front == "function") {intro_front()};
        if (boi.front.onInit) boi.front.onInit();
        $("#front").show();

        //页面组件进场
        //if (typeof intro_pages == "function") {intro_pages()};
        if (boi.config.onShow) boi.config.onShow();
        $("#pages").show();


        //切换到第一页
        if (boi.defaultPage.templateId && boi.defaultPage.pageId) {
            shiftPage(boi.defaultPage.templateId, boi.defaultPage.pageId, boi.defaultPage.constructor, null, "FADE");
        }

        //显示默认浮层
        if (boi.defaultFloatPage.templateId && boi.defaultFloatPage.pageId) {
            setTimeout(addFloatPage, 500, boi.defaultFloatPage.templateId, boi.defaultFloatPage.pageId, boi.defaultFloatPage.constructor);
        }
    }
}









///////////////////////////////////
//动画

function motion_bo(jqObj) {
    //$(jqObj).css('transform', 'scale(0.5)');
    //TweenLite.to(jqObj, 0, {scale:0.8});

	/*TweenLite.to(jqObj, 0.2, {scale:1.08, ease:Cubic.easeOut, overwrite:1, onComplete:onC});
	function onC() {
		TweenLite.to(jqObj, 0.3, {scale:1, ease:Cubic.easeOut, overwrite:1});
	}*/

    TweenLite.to(jqObj, 0.2, { scale: 0.92, ease: Cubic.easeOut, overwrite: 1, onComplete: onC });
    function onC() {
        TweenLite.to(jqObj, 1, { scale: 1, ease: Elastic.easeOut, overwrite: 1 });
    }
}

function motion_anxia(jqObj) {
    TweenLite.to(jqObj, 0.2, { scale: 0.95, ease: Cubic.easeOut, overwrite: 1, onComplete: onC });
    function onC() {
        TweenLite.to(jqObj, 0.3, { scale: 1, ease: Cubic.easeOut, overwrite: 1 });
    }
}


function shanshan(jqObj) {
    jqObj.css('opacity', 0);
    shan1();
    function shan1() {
        TweenLite.to(jqObj, 0.1, { opacity: 1, ease: Linear.easeOut, onComplete: yin1, overwrite: 1 });
    }
    function yin1() {
        TweenLite.to(jqObj, 0.1, { opacity: 0, ease: Linear.easeOut, onComplete: shan2, overwrite: 1 });
    }
    function shan2() {
        TweenLite.to(jqObj, 0.1, { opacity: 1, ease: Linear.easeOut, overwrite: 1 });
    }
}













/**
 * 缩放页面适应屏幕大小
 * @param {*} resizeType 缩放模式，none：不缩放；width：跟随舞台宽；cover：比例缩放占满，多余部分切掉；contain：比例缩放，撑满窗口，不裁切
 */
function trackWindow(resizeType) {

    windowWidth = $(window).width();
    windowHeight = $(window).height();

    var kgb_content = boi.config.contentWidth / boi.config.contentHeight;
    var kgb_window = windowWidth / windowHeight;

    switch (resizeType) {
        case 'contain':
            if (kgb_content >= kgb_window) {
                boi.config.contentScale = windowWidth / boi.config.contentWidth;
            } else {
                boi.config.contentScale = windowHeight / boi.config.contentHeight;
            }
            $('#mainContainer').css('transform', 'scale(' + boi.config.contentScale + ')');
            boi.mainContainer.x = Math.round((windowWidth - boi.config.contentWidth * boi.config.contentScale) / 2);
            boi.mainContainer.y = Math.round((windowHeight - boi.config.contentHeight * boi.config.contentScale) / 2);
            $('#mainContainer').css('left', boi.mainContainer.x);
            $('#mainContainer').css('top', boi.mainContainer.y);
            break;

        case 'cover':
            if (kgb_content >= kgb_window) {
                boi.config.contentScale = windowHeight / boi.config.contentHeight;
            } else {
                boi.config.contentScale = windowWidth / boi.config.contentWidth;
            }
            $('#mainContainer').css('transform', 'scale(' + boi.config.contentScale + ')');
            boi.mainContainer.x = Math.round((windowWidth - boi.config.contentWidth * boi.config.contentScale) / 2);
            boi.mainContainer.y = Math.round((windowHeight - boi.config.contentHeight * boi.config.contentScale) / 2);
            $('#mainContainer').css('left', boi.mainContainer.x);
            $('#mainContainer').css('top', boi.mainContainer.y);
            $('body').css('overflow', 'hidden');
            break;

        case 'width':

            boi.config.contentScale = windowWidth / boi.config.contentWidth;
            $('#mainContainer').css('transform', 'scale(' + boi.config.contentScale + ')');

            boi.config.contentHeight = windowHeight / boi.config.contentScale;
            // $('#mainContainer').css('height', boi.config.contentHeight + 'px');
            $('body').css('overflow', 'initial');
            break;
    }
}




/**
 * 切换页面
 * @param {*} templateId 模板ID
 * @param {*} pageId 页面ID，不需要#号
 * @param {*} constructor 页面构造函数
 * @param {*} constructorParams 页面构造函数参数
 * @param {*} motionType introMode值：show—>渐显渐隐，FADE->渐显渐隐，scroll—>滚动切换，hideScroll—>先隐藏老页面，在滚动滑出新页面
 */
function shiftPage(templateId, pageId, constructor, constructorParams, motionType) {
    if (!motionType) motionType = 'XIA_SHANG';

    //获取页面的索引值
    var id = -1;
    for (var i in pages) {
        if ($(pages[i]).attr("templateId") == templateId) {
            id = i;
        }
    }
    if (id == -1) {
        alert("没有对应的浮层");
        return;
    }

    if (!pageId) {
        alert('必须传入新页面的pageId');
        return;
    }


    //添加与显示
    var oldPage;
    if (currentPageId) { oldPage = $("#" + currentPageId); };
    var newPage = pages[id].cloneNode(true);
    if (pageId) {
        $(newPage).attr('id', pageId);
        $(newPage).attr('data-airx-id', pageId);
        //$("[data-airx-id='pageId']")[0]  可以调用到此DOM，注意pageId换成真实pageId
    }

    var old_t_opacity, old_t_top;//老页面的目标属性
    var new_d_opacity, new_d_top;//新页面的起始属性
    var new_t_opacity, new_t_top;//新页面的目标属性



    if (motionType == "XIA_SHANG" || motionType == "SHANG_XIA") {
        shift_scroll();
    } else if (motionType == "FADE") {
        shift_show();
    } else if (motionType == "BLOCK") {
        shift_block();
    } else {
        alert('motionType 参数有误');
    }

    function shift_block() {
        addNewPage();
        setTimeout(emptyOldPage, 300)
        // emptyOldPage();
        function addNewPage() {
            $("#pages").append(newPage);
            if (constructor) { constructor(constructorParams); }
        }
    }

    function shift_show() {

        if (oldPage) {
            old_t_opacity = 0;
            TweenLite.to(oldPage, 0.6, { css: { opacity: old_t_opacity }, ease: Linear.easeOut, overwrite: 1, onComplete: oldPageOutEnd });
        } else {
            oldPageOutEnd();
        }

        function oldPageOutEnd() {
            emptyOldPage();
            addNewPage();
        }

        function addNewPage() {

            $("#pages").append(newPage);

            new_d_opacity = 0;
            $(newPage).css("opacity", new_d_opacity);

            new_t_opacity = 1;
            TweenLite.to($(newPage), 0.6, { css: { opacity: new_t_opacity }, ease: Linear.easeOut, onComplete: shiftEnd, overwrite: 1 });

            if (constructor) { constructor(constructorParams); }
        }
    }

    function shift_scroll() {

        //获取页面的滚动值
        var scrollTop = $("body").scrollTop();
        if (!scrollTop) { scrollTop = $("html").scrollTop(); }

        //console.log($(oldPage).offset().top);

        //获取窗口高度(非绝对高度，而是缩放后高度)
        var stageH = ($(window).height() - boi.mainContainer.y) / boi.config.contentScale;
        //console.log(stageH);

        //复位页面位置，不改变显示
        if (oldPage) { $(oldPage).css("top", -scrollTop / boi.config.contentScale + "px"); }
        $("body").scrollTop(0);
        $("html").scrollTop(0);


        if (motionType == 'XIA_SHANG') {//正向滑动
            if (oldPage) { old_t_top = numCalculation($(oldPage).css("top"), -stageH); };
            //new_d_top = stageH + (boi.config.contentHeight - windowHeight)/2 + "px";
            new_d_top = stageH + "px";
            new_t_top = "0px";

            movingPage();

        } else {//反向滑动
            //if (oldPage) { old_t_top = numCalculation($(oldPage).css("top"), stageH); };
            if (oldPage) { old_t_top = stageH };
            new_d_top = -stageH + "px";//项目的特殊性，所以页面都正向滑动
            new_t_top = "0px";

            $(newPage).css('z-index', 0);
            $(oldPage).css('z-index', 1);

            var ttt = $(oldPage).position().top;
            console.log(ttt);
            if (ttt != 0) {
                TweenLite.to(oldPage, Math.abs(ttt) / 600 / boi.config.contentScale, { top: 0, ease: Cubic.easeOut, onComplete: movingPage, overwrite: 1 });
            } else {
                movingPage();
            }
        }

        function movingPage() {
            if (oldPage) {
                TweenLite.to(oldPage, 1.2, { css: { top: old_t_top }, ease: Cubic.easeInOut, onComplete: emptyOldPage, overwrite: 1 });
            }

            $("#pages").append(newPage);
            $(newPage).css("top", new_d_top);
            TweenLite.to($(newPage), 1.2, { css: { top: new_t_top }, ease: Cubic.easeInOut, onComplete: shiftEnd, overwrite: 1 });

            if (constructor) { constructor(constructorParams); }
        }

    }

    function shiftEnd() {
        //切换完成
    }

    function emptyOldPage() {
        $(oldPage).remove();
    }


    currentPageId = pageId;

}







//--------------------------------
/*
   浮层页操作，动画只支持部分
   templateId —— 模版id
   pageId —— 页面id
   constructor —— 构造函数
   constructorParams —— 构造函数参数
   isAlone —— 是否独立显示
   motionType —— 动画形式
*/
function addFloatPage(templateId, pageId, constructor, constructorParams, isAlone, motionType) {
    if (!motionType) motionType = 'XIA_SHANG';

    //获取页面的索引值
    var id = -1;
    for (var i in floatPages) {
        //console.log($(floatPages[i]).attr("templateId"));
        if ($(floatPages[i]).attr("templateId") == templateId) {
            id = i;
        }
    }

    if (id == -1) {
        alert("没有对应的浮层");
        return;
    }

    if (!pageId) {
        alert('必须传入新浮层页的pageId');
        return;
    }

    if (!motionType) motionType = 'XIA_SHANG';

    //如果浮层需要独占，则清空之前的浮层
    if (isAlone) {
        clearFloatPage();
    }

    //添加与显示
    var fp = floatPages[id].cloneNode(true);
    var fp_m = $(fp).children("#main");//主体
    var fp_bg = $(fp).children("#background");//浮层

    $("#floatPages").append(fp);//添加显示

    //$("#floatPages").append(floatPages[id].outerHTML);//添加显示
    //var currentFloatPage = $("#floatPages").children("#" + pageId);//当前页面
    //var fp_m = $(currentFloatPage).children("#main");//主体
    //var fp_bg = $(currentFloatPage).children("#background");//浮层


    $(fp_m).css("opacity", 0);
    $(fp_m).css("visibility", 'hidden');
    $(fp_bg).css("opacity", 0);
    $(fp_bg).css("visibility", 'hidden');



    if (pageId) {
        $(fp).attr('id', pageId);
        $(fp).attr('data-airx-id', pageId);
        //$("[data-airx-id='pageId']")[0]  可以调用到此DOM，注意pageId换成真实pageId
    }
    /*if (pageDataId) {
            $(fp_m).attr('data-id', pageDataId);
        }*/


    TweenLite.to($(fp_bg), 0.6, { autoAlpha: 1, ease: Linear.easeOut, overwrite: 1 });

    setTimeout(show_fp_m, 50);
    function show_fp_m() {
        if (motionType == "SHANG_XIA" || motionType == "XIA_SHANG") {
            //获取坐标
            var top_org//原始TOP
            var danwei;//单位
            var top_num;//目标TOP值
            var dd;//动画前的初始偏移

            top_org = $(fp_m).css('top');

            if (top_org.indexOf("%") == -1) {
                danwei = 'px';
                top_num = parseInt(top_org.replace('px', ''));
                dd = 260;
            } else {
                danwei = '%';
                top_num = parseInt(top_org.replace('%', ''));
                dd = 50;
            }

            if (motionType == "SHANG_XIA") {
                $(fp_m).css("top", (top_num - dd) + danwei);
            } else {
                $(fp_m).css("top", (top_num + dd) + danwei);
            }


            TweenLite.to($(fp_m), 0.6, { autoAlpha: 1, top: top_num + danwei, ease: Back.easeOut, overwrite: 1 });


        } else if (motionType == "FADE") {
            TweenLite.to($(fp_m), 0.6, { autoAlpha: 1, ease: Linear.easeOut, overwrite: 1 });
        } else if (motionType == "BLOCK") {
            TweenLite.to($(fp_m), 0, { autoAlpha: 1, ease: Linear.easeOut, overwrite: 1 });
        } else {
            alert('motionType 参数有误');
        }
    }




    //console.log("当前有浮层个数：" + $("#floatPage").children().length);
    //$("#floatPages").show();//显示
    $("#floatPages").css('display', 'block');

    //alert(pageId);
    //alert(params);

    //调用
    if (constructor) {
        constructor(constructorParams);
    }

    //添加默认事件
    //console.log('aa>>' + $(fp).attr('id'));

    //////////
    //点背景后退出浮层
    /*$(fp_bg).on('click', outThis);
	$(fp).find('.closeBtn').on('click', outThis);
    function outThis() {
		outFloatPage(pageId);
		//解除绑定
        //$('#captcha #background').unbind();
        //$('#captcha .closeBtn').unbind();

        $(fp_bg).unbind('click', outThis);
        $(fp).find('.closeBtn').unbind('click', outThis);
	}*/

    $('body').css('overflow', 'hidden');
}



function outFloatPage(pageId, onComplete, motionType) {
    if (!motionType) motionType = 'XIA_SHANG';

    var currentFloatPage = $("#floatPages").children("#" + pageId);//当前页面
    //这里需要判断有没有这个页面
    var fp_m = $(currentFloatPage).children("#main");//主体
    var fp_bg = $(currentFloatPage).find("#background");//浮层



    //动画隐藏
    if (motionType == "SHANG_XIA" || motionType == "XIA_SHANG") {
        //获取坐标
        var top_org = $(fp_m).css('top');
        var danwei = top_org.indexOf("%") > 0 ? '%' : 'px';
        var top_num;//目标TOP值

        if (danwei == '%') {
            top_num = parseInt(top_org.replace('%', ''));
        } else {
            top_num = parseInt(top_org.replace('px', ''));
        }
        //alert(top_num);

        var dd = danwei == '%' ? 50 : 300;

        if (motionType == "SHANG_XIA") {
            //$(fp_m).css("top", (top_num - dd) + danwei);
            top_num += dd;
        } else {
            //$(fp_m).css("top", (top_num + dd) + danwei);
            top_num -= dd;
        }

        TweenLite.to($(fp_m), 0.6, { autoAlpha: 0, top: top_num + danwei, ease: Back.easeIn, overwrite: 1 });

    } else if (motionType == "FADE") {
        TweenLite.to($(fp_m), 0.6, { autoAlpha: 0, ease: Linear.easeOut, overwrite: 1 });
    } else if (motionType == "BLOCK") {

    }



    TweenLite.to($(fp_bg), 0.6, { autoAlpha: 0, ease: Linear.easeOut, overwrite: 1, onComplete: onC });
    function onC() {
        $(currentFloatPage).remove();
        if ($("#floatPages").children().length < 1) {
            //console.log("浮层元素已全部清空，隐藏浮层容器");
            $("#floatPages").css("display", "none");
            $("#floatPages").empty();
        }
        if (onComplete) onComplete();
    }


    // $('body').attr('style', '');
    $('body').css('overflow', 'scroll');


}




function clearFloatPage(pageId) {
    $("#floatPages").empty();
    $("#floatPages").css("display", "none");
}




