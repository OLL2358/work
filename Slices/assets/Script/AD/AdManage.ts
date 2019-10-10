import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

// import NetRequest from "../manager/NetRequest";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdManage extends cc.Component {

    // static s_user_token = "116f642b80bd4944228fd3a107bec3cb";//用户的token
    static s_user_token = "";//用户的token
    static s_project_id = "1089";//项目id
    static s_version = "1.7.3";//版本号
    static s_init_info = null;//从服务器获取的初始化数据（包含广告、分享、开关等数据）
    static s_banner_id = "adunit-e693e0c5176f13b9";//二跳页面的banner广告id
    static domain_name = "https://wyzsf.mrqpby.com";//服务器域名

    // static domain_name = "http://47.112.137.182";
    // LIFE-CYCLE CALLBACKS:
    static ad_info;//广告物料内容的数据
    static guess_like_data;//猜你喜欢广告内容的数据
    static drawer_data;//抽屉广告的广告内容数组
    static icon_carousel_data;//Icon图轮播的广告内容数组
    static more_game_data;//更多游戏的广告内容数组
    static empty_window_data;//Banner空窗广告的广告内容数组
    static exit_icon_data;//退出广告Icon的广告内容数组
    static exit_banner_data;//退出广告Banner的广告内容数组
    static play_game_ad_data;//静态Icon的广告的广告内容数组
    static game_box_data;//游戏盒子的数据
    

    static s_blinded_layer_color;//蒙蔽层背景颜色
    static s_icon_border;//Icon边框
    static s_drawer_show = null;//抽屉是否打开状态
    
    static s_rewardFunc = null;//分享、视频成功之后的回调函数
    static s_reward_param = null;//分享、视频成功之后的回调函数的参数
    static s_share_time = null;//最后一次分享的时间
    static s_video_ad_list = new Object();//视频广告列表
    static s_fail_tip = "";//广告失败的提示文字
    static s_transfer_node = new Array();
    static s_banner_ad = new Object();//banner广告集
    static s_is_login = 0;//一个标识符，0.用户未登陆成功，1.用户已经登录成功
    /**
     * 从广告物料的数组中查询对应id的广告物料的数据信息
     * @return 广告物料的数据信息
     */
    static getAdInfoById(ad_info_array,id) {
        for(var i=0;i<ad_info_array.length;i++){
            if(ad_info_array[i]["id"]==id) return ad_info_array[i];
        }
        return null;
    }
    static getShareInfo(){
        if(!AdManage.s_init_info["share_array"] || AdManage.s_init_info["share_array"].length<=0) return {title:null,imageUrl:null};
        var rand_num = Math.floor(Math.random()*AdManage.s_init_info["share_array"].length);//从分享物料中随机获取一行分享信息
        var title = AdManage.s_init_info["share_array"][rand_num]["share_title"];//分享标题
        var imageUrl = AdManage.s_init_info["share_array"][rand_num]["img"];//分享图片URL
        return {title:title,imageUrl:imageUrl};
    }

    /**
     * 分享（不受开关控制）
     */
    static openShare(is_open_share=1){
        wx.showShareMenu({ withShareTicket: true });//显示分享按钮
        var param = new Object();
        param["token"] = AdManage.s_user_token;
        param["ad_type_id"] = 2;
        //右上角的分享按钮触发的消息事件
        wx.onShareAppMessage(() => {
            //统计分享数据
            AdManage.sendRequest(AdManage.domain_name+'/gg/public/index.php/index/Index/adStatistics?project_id=' + AdManage.s_project_id, param, null,null);
            return AdManage.getShareInfo();
        })
        if(!is_open_share) return ;
        AdManage.s_share_time = new Date().getTime();//最后一次分享的时间
        wx.shareAppMessage(AdManage.getShareInfo());
        AdManage.sendRequest(AdManage.domain_name+'/gg/public/index.php/index/Index/adStatistics?project_id=' + AdManage.s_project_id, param, null,null);
    }

    //应用程序的onShow事件
    static onShow(in_param,res){
        //如果用户是从其他程序请求打开当前盒子里面的应用
        console.log("onShow=======================",in_param,res);
        var param = new Object();
        if(res.query.goto_ad_materiel){
            param["id"] = res.query.goto_ad_materiel;
            
            //根据id查询广告信息
            AdManage.sendRequest(AdManage.domain_name+'/gg/public/index.php/index/Switchcontrol/getAdMaterielById', param, AdManage.createBoxTransferPage,in_param,10*60*60*24);
            return ;
        }
        if(in_param && in_param["call_func"]!=null) in_param["call_func"](in_param["parent_node"]);//初始化广告组件
        
        //如果不是分享事件
        if(AdManage.s_reward_param==null || AdManage.s_reward_param["type"]!="分享") return ;
        var sub_time = new Date().getTime()-AdManage.s_share_time;//时间戳
        AdManage.s_reward_param["share_count"] = AdManage.s_init_info["user_info"]["share_count"];//当日分享次数
        AdManage.s_reward_param["share_time"] = sub_time;//分享时间
        //调用成功函数
        if(AdManage.s_rewardFunc) AdManage.s_rewardFunc(AdManage.s_reward_param);
        AdManage.s_reward_param["type"]=null;
    }
    
    /**
     * 激励视频广告、分享
     * @param ad_id 广告位id如果不填则直接调用分享（受开关控制）
     * @param successFunc 回调函数，视频类型可直接获得奖励，分享根据条件判断是否可以获得奖励
     * @param param 回调函数的参数
     * @param str_tip 次数达到限制的提示文字
     * @param discontinue_tip 视频中断的提示文字
     */
    static showRewardedVideoAd(ad_id="",successFunc=null,func_param=null,str_tip="今日视频已看完，请明日再观看",discontinue_tip="没有获得奖励!"){
        let videoAd = null;//视频对象
        var param = new Object();
        if(func_param == null) func_param = new Object();
        AdManage.s_rewardFunc = successFunc;//分享、视频成功之后的回调函数
        AdManage.s_reward_param = func_param;//分享、视频成功之后的回调函数的参数

        //如果视频开关为关闭状态或者次数达到限制次数
        if(ad_id=="" || !AdManage.s_init_info["ad_set"]["control_switch"]["video"] || AdManage.s_init_info["user_info"]["video_count"]>=AdManage.s_init_info["ad_set"]["control_switch"]["video_number"]){
            //如果分享开启并且次数未达到限制
            if(AdManage.s_init_info["ad_set"]["control_switch"]["share"] && AdManage.s_init_info["user_info"]["share_count"]<AdManage.s_init_info["ad_set"]["control_switch"]["share_number"]){
                AdManage.s_init_info["user_info"]["share_count"] += 1;
                AdManage.s_reward_param["type"] = "分享";
                AdManage.openShare();//打开分享
                return true;
            }else{
                wx.showToast({ title: str_tip, icon: 'none', duration: 1000, mask: false });//弹框
            }
            return false;
        }

        videoAd = AdManage.createVideo(ad_id,discontinue_tip);
        //显示视频
        if(videoAd){
            videoAd.show().catch(err=>{
                //失败重试
                videoAd.load().then(()=>videoAd.show());
            })
        }
    }

    /**
     * 创建空窗广告
     * @param uuid uuid
     * @param left 左距离
     * @param top 上距离
     * @param width 宽度
     */
    static createEmptyBanner(uuid,left,top,width){
        var size = cc.director.getWinSize();//获取屏幕大小
        var screenWidth = wx.getSystemInfoSync();
        var parent_node = new cc.Node();//容器节点
        AdManage.s_banner_ad[uuid]["obj"].destroy();//销毁banner节点
        AdManage.s_banner_ad[uuid]["type"] = "custom";//修改banner广告的类型
        if(width<300) width = 300;
        if(width>screenWidth.screenWidth) width = screenWidth.screenWidth;
        var ad_height=180,ad_width=width*1.74;

        parent_node.setPosition(left*1.74+ad_width/2,size.height-ad_height/2-top*1.74);
        cc.director.getScene().addChild(parent_node);
        AdManage.s_banner_ad[uuid]["obj"] = parent_node;
        AdManage.emptyCarousel(uuid,ad_width,ad_height,-1);//banner轮播
    }
    
    
    /**
     * 空窗轮播
     * @param uuid uuid
     * @param left 左距离
     * @param top 上距离
     * @param width 宽度
     */
    static emptyCarousel(uuid,ad_width,ad_height,index,count=50){
        console.log(AdManage.s_banner_ad[uuid]["obj"]);
        if(AdManage.s_banner_ad[uuid]["destroy"]) {
            AdManage.s_banner_ad[uuid]["obj"].destroy();//销毁节点
            delete AdManage.s_banner_ad[uuid];//删除元素
            return ;
        }
        var new_index = index;
        if(++new_index>=AdManage.empty_window_data.length) new_index = 0;
        
        var empty_window_ad = AdManage.getAdInfoById(AdManage.ad_info,AdManage.empty_window_data[new_index]);//获取广告物料信息
        var empty_window = AdManage.createSpriteByUrl(empty_window_ad["appIcon"],ad_width,ad_height,null);//创建空窗节点
        AdManage.s_banner_ad[uuid]["obj"].addChild(empty_window);
        empty_window.name = "banner_img"+new_index;
        setTimeout(function () {
            if(index>=0) AdManage.s_banner_ad[uuid]["obj"].getChildByName("banner_img"+index).destroy();//销毁上一张banner
            AdManage.emptyCarousel(uuid,ad_width,ad_height,new_index,1);//创建下一张banner
        }, 5000);//
    }
    
    /**
     * 销毁空窗节点
     * @param uuid uuid
     */
    static destroyEmpty(uuid){
        if(AdManage.s_banner_ad[uuid]["type"]=="wx") {
            AdManage.s_banner_ad[uuid]["obj"].hide();
            AdManage.s_banner_ad[uuid]["obj"].destroy();//销毁节点
            delete AdManage.s_banner_ad[uuid];//删除元素
            return ;
        }
        AdManage.s_banner_ad[uuid]["obj"].active=false;
        AdManage.s_banner_ad[uuid]["destroy"] = true;
    }

    /**
     * 生成uuid
     */
    static generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
    
    /**
     * 创建banner广告
     * @param ad_id 广告位id如果不填则直接调用分享（受开关控制）
     */
    static createBanner(ad_id="",left=0,top=0,width=350){
        var uuid = AdManage.generateUUID();//生成uuid
        AdManage.s_banner_ad[uuid] = new Object();
        AdManage.s_banner_ad[uuid]["type"] = "wx";
        console.log(uuid);
        // 创建 Banner 广告实例，提前初始化
        var bannerAd = wx.createBannerAd({
            adUnitId: ad_id,
            style: {
                left: left,
                top: top,
                width: width
            }
        })
        
        bannerAd.onError((err)=>{
            console.log(ad_id+"Banner广告发生错误,创建空窗：",err);
            bannerAd = AdManage.createEmptyBanner(uuid,left,top,width);//创建空窗banner广告
        });
        // 在适合的场景显示 Banner 广告
        bannerAd.show().catch(err => function (){
            console.log(ad_id+"Banner广告显示异常，创建空窗",err)
            bannerAd = AdManage.createEmptyBanner(uuid,left,top,width);//创建空窗banner广告
        });
        AdManage.s_banner_ad[uuid]["obj"] = bannerAd;
        return uuid;
    }




    /**
     * 视频广告的id创建视频广告
     * @param ad_id 视频广告的id
     * @param discontinue_tip 播放中途退出的提示文字
     * @return 返回一个视频广告对象
     */
    static createVideo(ad_id,discontinue_tip){
        var param = new Object();
        AdManage.s_fail_tip = discontinue_tip;
        //如果广告已经存在
        if(AdManage.s_video_ad_list[ad_id]) {
            return AdManage.s_video_ad_list[ad_id];
        }

        if(wx.createRewardedVideoAd){
            AdManage.s_video_ad_list[ad_id]=new Object();
            AdManage.s_video_ad_list[ad_id] = wx.createRewardedVideoAd({adUnitId:ad_id});
        }
        if(AdManage.s_video_ad_list && Object.keys(AdManage.s_video_ad_list).length>1) return AdManage.s_video_ad_list[ad_id];
        
        AdManage.s_video_ad_list[ad_id].onClose((status)=>{
            if(status && status.isEnded || status ===undefined){
                //正常播放结束，可以下发游戏奖励
                //视频统计
                param["token"] = AdManage.s_user_token;
                param["ad_type_id"] = 1;
                AdManage.sendRequest(AdManage.domain_name+'/gg/public/index.php/index/Index/adStatistics?project_id=' + AdManage.s_project_id, param, null,null);
                AdManage.s_init_info["user_info"]["video_count"] += 1;
                AdManage.s_reward_param["type"] = "视频";
                if(AdManage.s_rewardFunc) AdManage.s_rewardFunc(AdManage.s_reward_param);
            }else{
                //播放中途退出，不下发游戏奖励
                wx.showToast({ title: AdManage.s_fail_tip, icon: 'none', duration: 1000, mask: false });//弹框
            }
        })
        
        AdManage.s_video_ad_list[ad_id].onError((status)=>{
            console.log("视频播放发生错误，错误信息为：",status);
            //如果分享开启并且次数未达到限制
            if(AdManage.s_init_info["ad_set"]["control_switch"]["share"] && AdManage.s_init_info["user_info"]["share_count"]<AdManage.s_init_info["ad_set"]["control_switch"]["share_number"]){
                AdManage.s_init_info["user_info"]["share_count"] += 1;
                AdManage.s_reward_param["type"] = "分享";
                AdManage.openShare();//打开分享
                return true;
            }
            wx.showToast({ title: "播放视频发生错误，未能获得奖励!", icon: 'none', duration: 1000, mask: false });//弹框
        })
        return AdManage.s_video_ad_list[ad_id];
    }

    /**
     * 根据字体设置信息创建一个Label节点
     * @return 返回一个cc.Node对象
     */
    static createLabel(size,string,font_size,color,horizontal_align=1) {
        var label;
        var node = new cc.Node();
        node.setContentSize(size);//设置节点的大小
        label = node.addComponent(cc.Label);
        label.enableWrapText = false;//禁止换行
        label.overflow = 2;//文字溢出模式
        label.string = string;//需要显示的字符串
        label.fontFamily="Microsoft YaHei";//字体名称
        label.fontSize=font_size;//字体大小
        label.isSystemFontUsed=true;//是否使用系统字体
        label.enabled=true;//是否启用
        label.horizontalAlign = horizontal_align;//居中对齐
        node.color=color;
        return node;
    }
    
    /**
     * 创建一个遮罩节点
     * @param url 图片
     * @param width 宽
     * @param height 高
     * @return 返回Sprite节点
     */
    static createMaskNode(width,height) {
        var node = new cc.Node();
        node.setContentSize(cc.size(width, height));//设置节点的大小
        node.addComponent(cc.Mask);
        return node;
    }

    /**
     * 根据图片的URL创建一个新的Sprite节点
     * @param url 图片
     * @param width 宽
     * @param height 高
     * @return 返回Sprite节点
     */
    static createSpriteByUrl(url,width,height,rect,node_type = cc.Sprite) {
        var sprite;
        var node = new cc.Node();
        sprite = node.addComponent(node_type);
        cc.loader.load(url, (err, res) => {
            if (err) console.log('资源加载发生错误：' + err);
            let image = new cc.SpriteFrame(res);

            //如果创建的节点为九宫格节点
            if(rect!=null){
                image.insetLeft = rect.x;
                image.insetTop = rect.y;
                image.insetRight = rect.width;
                image.insetBottom = rect.height;
                sprite.type = cc.Sprite.Type.SLICED;
            }

            sprite.spriteFrame = image;
            node.setContentSize(cc.size(width, height));//设置节点的大小
        })

        return node;
    }



    /**
     * 盒子中转页面
     */
    static createBoxTransferPage(res,in_param){
        var size = cc.director.getWinSize();//获取屏幕大小
        var node = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_box/bg.png",size.width,size.height,null);//创建背景节点
        var icon_node = AdManage.createSpriteByUrl(res["data"]["appIcon"],260,260,null);//创建游戏图标

        var mask_node = AdManage.createMaskNode(260,260);//创建一个遮罩节点
        mask_node.addChild(icon_node);



        var temp_lable = AdManage.createLabel(cc.size(240, 70),res["data"]["appName"],65,cc.color(0, 0, 0));//游戏名称
        var return_game = AdManage.createLabel(cc.size(300, 70),"返回游戏",30,cc.color(255, 255, 255));//返回游戏的按钮
        var start_game = AdManage.createLabel(cc.size(260, 50),"开始游戏",35,cc.color(255, 255, 255));//开始游戏
        var open_game = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_box/annui.png",347,82,null);//创建打开游戏按钮的背景图片
        var hand_img = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_box/shou.png",155,168,null);//手的图片
        
        var xuanfuwu = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_box/xuanfuwu.png",537,332,null);//彩带
        var node_info = new Object();
        var hand_x=150,hand_y=-125;
        node_info["node"] =node;
        node_info["in_param"] = in_param;
        AdManage.s_transfer_node.push(node_info);
        return_game.setPosition(-size.width/2+70,size.height/2-25-30);
        mask_node.setPosition(0,320);
        temp_lable.setPosition(0,120);
        hand_img.setPosition(hand_x,hand_y);
        xuanfuwu.setPosition(0,330);
        node.on(cc.Node.EventType.TOUCH_START,function(e){
            return false;
        })
        
        return_game.on(cc.Node.EventType.TOUCH_START,function(e){
            //关闭所有banner节点
            Object.keys(AdManage.s_banner_ad).map((key,item)=>{
                AdManage.destroyEmpty(key);
            });


            AdManage.openGameBox(cc.director.getScene(),1,cc.color(0, 0, 0));//打开盒子节点
            return false;
        })
        
        open_game.on(cc.Node.EventType.TOUCH_START,function(e){
            wx.navigateToMiniProgram({
                appId: res["data"]["appId"],
                path : res["data"]["path"],
            })
            return false;
        })
        open_game.addChild(start_game);
        node.addChild(xuanfuwu);
        node.addChild(hand_img);
        node.addChild(return_game);
        node.addChild(open_game);
        node.addChild(temp_lable);
        node.addChild(mask_node);
        
        

        hand_img.runAction(cc.sequence(cc.moveTo(0.5,cc.p(hand_x+30,hand_y-30)),cc.moveTo(0.5,cc.p(hand_x,hand_y))).repeatForever());
        
        
        cc.director.getScene().addChild(node);
        node.setPosition(size.width/2,size.height/2);
        var uuid = AdManage.createBanner(AdManage.s_banner_id,30,550);
        // setTimeout(function () {AdManage.destroyEmpty(uuid);}, 2000);//

        var mask = mask_node.getComponent(cc.Mask);
        mask.type=1;
    }



    /**
     * 发送登录请求
     */
    static RequestLogin(reset=false){
        if(++AdManage.s_is_login>1 && !reset) return;//预防重复登录
        var goto_type = null,goto_id = null;
        var res = wx.getLaunchOptionsSync();
        if(res.query.release_id){
            goto_id = res.query.release_id;
            goto_type = "1";
        }

        // 登录
        wx.login({
            success: res => {
                var param = new Object();
                // g_app.globalData.code = res["code"];//获取code
                param["js_code"] = res["code"];
                if (goto_type != null && goto_id != null) {
                    param["goto_type"] = goto_type;
                    param["goto_id"] = goto_id;
                }
                AdManage.sendRequest(AdManage.domain_name+'/gg/public/index.php/index/Index/login?project_id=' + AdManage.s_project_id, param, AdManage.loginSuccess,null,10*60*60*24);
            },
            fail: function(){
                setTimeout(function () {AdManage.RequestLogin(true); }, 1000);//失败重新调用
            }
        })
    }
    
    /**
     * 登录成功的回调
     */ 
    static loginSuccess(res) {
        console.log("loginSuccess=",res);
        if(AdManage.s_user_token!="") return ;//如果已经登录过
        AdManage.s_user_token = res["token"];
        wx.onShow(function(res){AdManage.onShow(null,res);});
    }


    
    //把一个Obj对象转换成JSON对象
    static toJson(obj) {
        var json_str = JSON.stringify(obj);
        var json_obj = JSON.parse(json_str);
        return json_obj;
    }
    
    /**
     * 发送网络请求
     * @param url 网络请求的URL
     * @param data 请求发送的POST数据
     * @param callFunc 请求发送成功之后的回调函数
     * @param param 回调函数的附加参数
     * @param reset_count 网络失败之后的重调次数
     */ 
    static sendRequest(url, data, callFunc, param,reset_count=0) {
        // console.log("发送请求,请求参数为：",data);
        var delay_time=1000;
        //如果网络请求有token并且此时token为空
        if (data["token"] != null && AdManage.s_user_token == "") {
          setTimeout(function () { AdManage.sendRequest(url, data, callFunc, param,reset_count) }, delay_time);//延迟调用
          return;
        }
        if (data["token"] != null) data["token"] = AdManage.s_user_token;
        
        wx.request({
          url: url,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data: AdManage.toJson(data),
          success: function (res) {
            if (res["data"]["code"]==1){
                console.log(url);
                console.log(res["data"]);
                wx.showToast({ title: res["data"]["msg"], icon: 'none', duration: 1000, mask: false });//弹框
                // if(reset_count>0) setTimeout(function () { AdManage.sendRequest(url, data, callFunc, param,--reset_count); }, delay_time);//重新调用
                return ;
            }
            if (res["statusCode"] != 200){
              wx.showToast({ title: "错误代码：" + res["statusCode"], icon: 'none', duration: 5000, mask: false });//弹框

              if(res["statusCode"]==404 || res["statusCode"]==502) delay_time = 5000;//如果服务器网络不好

              if(reset_count>0) setTimeout(function () { console.log("回调成功========"+reset_count);AdManage.sendRequest(url, data, callFunc, param,--reset_count); }, delay_time);//重新调用
              return;
            }
            if (callFunc != null) callFunc(res["data"], param);
          },
          fail: function(){
            if(callFunc==AdManage.loginSuccess){
                console.log("登录失败=============================");
                setTimeout(function () {AdManage.RequestLogin(true); }, delay_time);//失败重新调用
            }else
            if(reset_count>0) setTimeout(function () { AdManage.sendRequest(url, data, callFunc, param,--reset_count); }, delay_time);//重新调用
          }
        })
      }
      
      /**
       * 添加展示统计
       * @param ad_type_id ad_type_id广告的显示类型
       * @param str_ad_ids str_ad_ids包含广告的id字符串。例如：1,200,2301
       */ 
      static addShowCount(ad_type_id,str_ad_ids){
        var param = new Object();
        param["token"] = AdManage.s_user_token;
        param["ad_type_id"] = ad_type_id;
        param["str_ad_ids"] = str_ad_ids;
        param["trigger_type"] = "3";
        //发送添加展示统计的网络请求
        // AdManage.sendRequest(AdManage.domain_name+"/gg/public/index.php/index/Adanalysis/adRecord?project_id="+AdManage.s_project_id, param, null,null);
      }


      /**
       * 打开一个广告
       * @param node 广告节点
       * @param ad_id 广告的id
       * @param ad_type_id 广告的显示类型
       */ 
      static openAd(node_info,node,ad_type_id){
        node_info = AdManage.getAdInfoById(AdManage.ad_info,node.data_id);
        var param = new Object();
        var appid,path;
        param["token"] = AdManage.s_user_token;
        param["ad_type_id"] = ad_type_id;
        param["ad_materiel_id"] = node_info["id"];
        param["trigger_type"] = "1";
        //点击统计
        AdManage.sendRequest(AdManage.domain_name+"/gg/public/index.php/index/Adanalysis/adRecord?project_id="+AdManage.s_project_id, param, null,null);
        //如果广告的打开方式为二维码海报图
        if(node_info["mode"] == "image"){
            wx.previewImage({
                current: node_info["imageUrl"],
                urls: [node_info["imageUrl"]]
            })
        }else{//否则以程序跳转的方式打开广告
            appid = node_info["appId"];
            path = node_info["path"];
            if(node_info["box_appid"]) {
                appid=node_info["box_appid"];//如果需要跳转到盒子
                path = "pages/index/index?goto_ad_materiel="+node_info["id"];
            }
            wx.navigateToMiniProgram({
                appId: appid,
                path: path,
                envVersion:"trial",
                success(res) {
                    param["trigger_type"] = "2";
                    //跳转统计
                    AdManage.sendRequest(AdManage.domain_name+"/gg/public/index.php/index/Adanalysis/adRecord?project_id="+AdManage.s_project_id, param, null,null);
                }
            })
        }
      }


      /**
       * 广告的点击事件
       * @param node 广告节点
       * @param ad_id 广告的id
       * @param ad_type_id 广告的显示类型
       */ 
      static addAdClick (node,ad_id,ad_type_id,event_type) {
        var node_info;
        var start_point,end_point;
        //为Icon节点添加点击事件
        node.attr({"data_id":ad_id});
        //
        node.on(cc.Node.EventType.TOUCH_START,function(e){
            start_point = e.touch._point.clone();
            if(event_type==cc.Node.EventType.TOUCH_START) AdManage.openAd(node_info,node,ad_type_id);
            return false;
        })
        
        //
        node.on(cc.Node.EventType.TOUCH_END,function(e){
            end_point = e.touch._point.clone();
            if(start_point.x==end_point.x && start_point.y==end_point.y && event_type==cc.Node.EventType.TOUCH_END) {
                AdManage.openAd(node_info,node,ad_type_id);
            }
            return false;
        })
      
      }
      
      /**
       * 初始化
       * @param parent_node 父节点
       * @param func_name 组件初始化完毕之后的回调函数
       * @param icon_border_img 广告Icon的边框图片
       * @param blinded_layer_img 广告弹框蒙蔽层背景图片
       */ 
        static initComponent (
            parent_node,
            func_name,
            icon_border_img = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/icon_bian_5.png",
            blinded_layer_img = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/black_bk.png"
        ) {
        if (wx == null) return false;
            
        AdManage.s_blinded_layer_color = blinded_layer_img;
        AdManage.s_icon_border = icon_border_img;

        if(AdManage.s_init_info!=null) {
            if(func_name!=null) func_name(parent_node);//信息获取完毕调用回调函数
            return true;
        }
        
        if(AdManage.s_user_token=="") AdManage.RequestLogin();//登录
        var param = new Object();
        var param2 = new Object();
        param["token"] = AdManage.s_user_token;
        param["version"] = AdManage.s_version;
        param["version_environment"] = __wxConfig.envVersion;//版本环境
        param2["parent_node"] = parent_node;
        param2["call_func"] = func_name;
        // switch (version)
        // {
        //     case 'develop':
        //     return 'https://测试版环境域名';
        //     break;
        //     case 'trial':
        //     return 'https://体验版环境域名';
        //     break;
        //     case 'release':
        //     return 'https://线上环境域名';
        //     break;
        //     default:
        //     return 'https://测试版环境域名';
        // }
        // console.log("当前环境为：",version);
        //获取广告数据
        AdManage.sendRequest(AdManage.domain_name+"/gg/public/index.php/index/index/getInitInfo?project_id="+AdManage.s_project_id, param, AdManage.initComponentBack,param2,10*60*60*24);
      }

    /**
     * 组建初始化
     */ 
    static initComponentBack(res,in_param){
        console.log("s_init_info====================================",res);
        AdManage.s_init_info = res;
        AdManage.ad_info = res["ad_info"];//猜你喜欢的广告内容数组
        AdManage.guess_like_data = res["guess_like"];//猜你喜欢的广告内容数组
        AdManage.drawer_data = res["drawer"];//抽屉广告的广告内容数组
        AdManage.icon_carousel_data = res["icon_carousel"];//Icon图轮播的广告内容数组
        AdManage.more_game_data = res["more_game"];//更多游戏的广告内容数组
        AdManage.empty_window_data = res["empty_window"];//Banner空窗广告的广告内容数组
        AdManage.exit_icon_data = res["exit_icon"];//退出广告Icon的广告内容数组
        AdManage.exit_banner_data = res["exit_banner"];//退出广告Banner的广告内容数组
        AdManage.play_game_ad_data = res["play_game_ad"];//静态Icon的广告的广告内容数组
        AdManage.game_box_data = new Object();//游戏盒子的内容
        for(var i=0;i<res["game_box"].length;i++){
            AdManage.game_box_data[res["game_box"][i]["category_name"]] = res["game_box"][i]["inventory"].split(",");
        }
        AdManage.openShare(0);//初始化分享信息

        AdManage.onShow(in_param,wx.getLaunchOptionsSync());
        // if(in_param["call_func"]!=null) in_param["call_func"](in_param["parent_node"]);//信息获取完毕调用回调函数
    }

    /**
     * 创建退出游戏按钮
     * @param parent_node 父节点
     * @param x X坐标
     * @param y Y坐标
     * @param zoom 缩放比例
     * @param exit_game_width 主界面图标宽
     * @param exit_game_height 主界面图标高
     * @param exit_game_icon 图标
     * @param exit_game_bk 退出游戏的背景
     * @param exit_game_font 更多精品的文字
     * @param exit_game_title_font 标题文字
     * @param exit_game_close 关闭按钮
     * @param font_color 字体颜色
     * @return cc.Node对象
     */ 
    static createExitBtn(
        parent_node,
        x=-300,
        y=420,
        zoom=1,
        exit_game_width = 115*zoom,
        exit_game_height = 70*zoom,
        exit_game_icon = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/tuichu_icon.png",//图标
        exit_game_bk = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/white_zhezhao.png",//退出游戏的背景
        exit_game_font = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/gengduojingxuianyouxi.png",//更多精品的文字
        exit_game_title_font = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/querentuichuma.png",//标题文字
        exit_game_close = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/guanbi.png",//关闭按钮
        font_color = cc.color(50, 50, 50),//字体颜色
    ){
        if(!AdManage.s_init_info["ad_set"]["control_switch"]["ad"]) return null;
        if(!(AdManage.exit_banner_data.length>0 || AdManage.exit_icon_data.length>0)) return null;
        var exit_btn;

        exit_btn = AdManage.createSpriteByUrl(exit_game_icon,exit_game_width,exit_game_height,null);//创建退出按钮的节点
        exit_btn.setPosition(x,y);
        parent_node.addChild(exit_btn);
        exit_btn.on(cc.Node.EventType.TOUCH_START,function(e){
            AdManage.openExitAd(parent_node,zoom,exit_game_bk,exit_game_font,exit_game_title_font,exit_game_close,font_color);
            return false;
        })
        return exit_btn;
    }

    /**
     * 创建更多游戏
     * @param parent_node 父节点
     * @param x X坐标
     * @param y Y坐标
     * @param zoom 缩放比例
     * @param more_game_width 主界面图标宽
     * @param more_game_height 主界面图标高
     * @param more_game_icon 更多游戏的按钮图片
     * @param more_game_bk 更多游戏的九宫格背景
     * @param more_game_shadow 更多游戏的标题阴影
     * @param more_game_cancel 更多游戏的退出按钮
     * @param exit_game_title 更多游戏的标题
     * @return cc.Node对象
     */ 
    static createMoreGame(
        parent_node,
        x,
        y,
        zoom = 1,
        more_game_width = 130*zoom,
        more_game_height = 170*zoom,
        more_game_icon = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/more_game_3.png",//更多游戏的按钮图片
        more_game_bk = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/di.png",//更多游戏的九宫格背景
        more_game_shadow = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/dibanheng.png",//更多游戏的标题阴影
        more_game_cancel = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/exit_btn.png",//更多游戏的退出按钮
        exit_game_title = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/more_game.png",//更多游戏的标题
    ){
        if(!AdManage.s_init_info["ad_set"]["control_switch"]["ad"]) return null;
        if(AdManage.more_game_data.length<=0) return null;
        



        var more_game;
        more_game = AdManage.createSpriteByUrl(more_game_icon,more_game_width,more_game_height,null);//创建更多游戏的节点
        more_game.setPosition(x,y);
        parent_node.addChild(more_game);
        more_game.on(cc.Node.EventType.TOUCH_START,function(e){
            AdManage.openMoreGame(parent_node,zoom,more_game_bk,more_game_shadow,more_game_cancel,exit_game_title);
            return false;
        })
        return more_game;
    }

    /**
     * 创建游戏盒子
     * @param parent_node 父节点
     * @param x X坐标
     * @param y Y坐标
     * @param zoom 缩放比例
     * @param more_game_width 主界面图标宽
     * @param more_game_height 主界面图标高
     * @param game_box_icon 主界面图标
     * @param font_color 字体颜色
     * @return cc.Node对象
     */ 
    static createGameBox(
        parent_node,
        x=210,
        y=-345,
        zoom = 1,
        game_box_width = 130*zoom,
        game_box_height = 170*zoom,
        game_box_icon = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/more_game_3.png",
        font_color = cc.color(0, 0, 0),//字体颜色
    ){
        if(!AdManage.s_init_info["ad_set"]["control_switch"]["ad"]) return null;
        if(Object.keys(AdManage.game_box_data).length<=0) return null;
        
        var game_box;
        game_box = AdManage.createSpriteByUrl(game_box_icon,game_box_width,game_box_height,null);//创建游戏盒子的节点
        game_box.setPosition(x,y);
        parent_node.addChild(game_box);
        game_box.on(cc.Node.EventType.TOUCH_START,function(e){
            AdManage.openGameBox(cc.director.getScene(),zoom,font_color);
            return false;
        })
        
        return game_box;
    }


    /**
     * 创建一个游戏盒子的模块
     * @param title 模块标题
     * @param ad_data 广告数据
     * @param zoom 缩放
     */
    static createModul(title,ad_data,zoom=1,font_color = cc.color(0, 0, 0)){
        var size = cc.director.getWinSize();//获取屏幕大小
        var row_count = 4,//每行显示的广告数量
            icon_size=120*zoom,
            out_data = new Object(),
            lable_info = new Object();


        
        lable_info["width"] = 140*zoom;
        lable_info["height"] = 40*zoom;
        lable_info["font_size"] = 23;
        lable_info["color"] = font_color;
        lable_info["margin_top"] = 12*zoom;
        
        var modul_width = size.width,module_height=60+Math.ceil(ad_data.length/row_count)*(icon_size+lable_info["height"]-lable_info["margin_top"]),title_height = 60,content_height = module_height-title_height,
            title_icon_width=10,title_icon_height=40,title_font_width = 200,title_font_height=title_icon_height;
        var node = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/bk_white.png",modul_width,module_height,null);//创建模块节点
        var title_node = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/bk_white.png",modul_width,title_height,null);//标题节点
        var content_node = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/bk_white.png",modul_width,content_height,null);//内容节点
        var title_icon = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/orange.png",title_icon_width,title_icon_height,null);//创建标题图标
        var title_font = AdManage.createLabel(cc.size(title_font_width, title_font_height),title,30,cc.color(0, 0, 0),0);//
        var icon_node,temp_element,line_height = 0;

        //添加广告到内容节点中去
        for(var i=0;i<ad_data.length;i++){
            temp_element = AdManage.getAdInfoById(AdManage.ad_info,ad_data[i]);
            if(temp_element==null) continue;
            lable_info["title"] = temp_element["appName"];
            icon_node = AdManage.createIconNode(temp_element,icon_size,icon_size,140*zoom,140*zoom,lable_info);//创建一个Icon节点
            line_height = Math.floor(i/row_count);
            icon_node.setPosition(-modul_width/2+icon_size/2+icon_size*(i%row_count)+50*((i%row_count)+1)*zoom,content_height/2-icon_size/2-line_height*(icon_size+30*zoom));
            AdManage.addAdClick(icon_node.getChildByName("icon_parent").getChildByName("mask_node").getChildByName("icon_obj"),temp_element["id"],7,cc.Node.EventType.TOUCH_END);
            content_node.addChild(icon_node);
        }
        
        title_icon.setPosition(-modul_width/2+title_icon_width/2,0);
        title_font.setPosition(-modul_width/2+title_font_width/2+30,0);
        title_node.setPosition(0,module_height/2-title_height/2);//设置标题节点的位置
        content_node.setPosition(0,module_height/2-content_height/2-title_height);//设置内容节点的位置
        title_node.addChild(title_icon);
        title_node.addChild(title_font);
        node.addChild(title_node);
        node.addChild(content_node);
        out_data["node"] = node;
        out_data["height"] = module_height;
        return out_data;
    }

    static autoMove(end_point,start_point,parent_node,auto_move,position,scroll_value){
        if(!auto_move) return ;

        //当前是最大距离
        if(position==-scroll_value){
                parent_node.stopAllActions();
                parent_node.runAction(cc.sequence(cc.moveTo(scroll_value/70, new cc.Vec2(20,0)),cc.moveTo(scroll_value/70, new cc.Vec2(-scroll_value-20,0))).repeatForever());
        }else
        //当前是最小距离
        if(position==0){
                parent_node.stopAllActions();
                parent_node.runAction(cc.sequence(cc.moveTo(scroll_value/70, new cc.Vec2(-scroll_value-20,0)),cc.moveTo(scroll_value/70, new cc.Vec2(20,0))).repeatForever());
        }else{//
            if(end_point.x>start_point.x){
                parent_node.stopAllActions();
                parent_node.runAction(cc.sequence(cc.moveTo((-position)/70,0,0),cc.callFunc(function (){
                    parent_node.runAction(cc.sequence(cc.moveTo(scroll_value/70, new cc.Vec2(-scroll_value-20,0)),cc.moveTo(scroll_value/70, new cc.Vec2(20,0))).repeatForever());
                })));
            }else if(end_point.x<start_point.x){
                parent_node.stopAllActions();
                parent_node.runAction(cc.sequence(cc.moveTo((scroll_value+position)/70,-scroll_value,0),cc.callFunc(function (){
                    parent_node.runAction(cc.sequence(cc.moveTo(scroll_value/70, new cc.Vec2(20,0)),cc.moveTo(scroll_value/70, new cc.Vec2(-scroll_value-20,0))).repeatForever());
                })));
            }else{
                parent_node.resumeAllActions();
            }
        }

    } 
    
    /**
     * 为一个节点添加上下滑动的效果
     * @param parent_node 父节点
     */
    static addScroollNode(axis,auto_move,parent_node,view_width,view_height,scroll_value){

        var scroll_node = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/bk_white.png",view_width,view_height,null);//创建滑动节点
        var mask_node = AdManage.createMaskNode(view_width,view_height);//创建一个遮罩节点
        scroll_node.setPosition(0,0);
        mask_node.addChild(scroll_node);//把滑动节点加入到遮罩中
        scroll_node.addChild(parent_node);//把滑动内容加入到滑动节点中
        var start_point,pre_point,current_point,end_point,position;

        // var test=new cc.Node();
        // test.resumeAllActions();
        // test.stopAllActions();

        scroll_node.on(cc.Node.EventType.TOUCH_START,function(e){
            if(auto_move){
                parent_node.pauseAllActions();
                // parent_node.stopAllActions();
            }
            start_point = e.touch._point.clone();
            pre_point = e.touch._point.clone();
            return false;
        })
        
        scroll_node.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            current_point = e.touch._point.clone();
            if(axis=="x")
                parent_node.x=parent_node.x+(current_point.x-pre_point.x);
            else
                parent_node.y=parent_node.y+(current_point.y-pre_point.y);

            pre_point = e.touch._point.clone();
            return false;
        })
        
        scroll_node.on(cc.Node.EventType.TOUCH_END,function(e){
            end_point = e.touch._point.clone();

            position = AdManage.slideAction(axis,parent_node,scroll_value,function(){
                AdManage.autoMove(end_point,start_point,parent_node,auto_move,position,scroll_value);
            });

            return false;
        })
        
        scroll_node.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
            position = AdManage.slideAction(axis,parent_node,scroll_value,function(){
                AdManage.autoMove(end_point,start_point,parent_node,auto_move,position,scroll_value);
            });
            return false;
        })

        //是否执行自动滑动效果
        if(auto_move){
            parent_node.runAction(cc.sequence(cc.moveTo(scroll_value/70, new cc.Vec2(-scroll_value-20,0)),cc.moveTo(scroll_value/70, new cc.Vec2(20,0))).repeatForever());
        }

        return mask_node;
    }

    /**
     * 打开游戏盒子
     */
    static openGameBox (
        parent_node,
        zoom=1,
        font_color = cc.color(0, 0, 0),//字体颜色
        box_bk_img = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/bk_white.png",//背景图片
    ) {
        var size = cc.director.getWinSize();//获取屏幕大小
        var black_bk = AdManage.createSpriteByUrl(box_bk_img,size.width,size.height,null);//创建盒子的背景节点
        var font_width = 150*zoom,font_height=40*zoom,return_parent_height = 80,row_2_height = size.height-return_parent_height;


        var row_1,row_2,row_2_scroll,modul_node;//
        var return_game,total_height = 0;
        var str_ad_ids="";

        row_1 = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/bk_white.png",size.width,return_parent_height,null);//创建返回游戏的容器节点
        row_2 = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/bk_white.png",size.width,row_2_height,null);//创建返回游戏的容器节点
        row_1.setPosition(0,size.height/2-return_parent_height/2);

        return_game = AdManage.createLabel(cc.size(font_width, font_height),"返回游戏",30,cc.color(0, 0, 0));
        return_game.setPosition(-size.width/2+font_width/2,0);//设置返回游戏的文字坐标
        row_1.addChild(return_game);

        return_game.on(cc.Node.EventType.TOUCH_START,function(e){
            //关闭所有中转节点
            Object.keys(AdManage.s_transfer_node).map((key,item)=>{
                AdManage.s_transfer_node[key]["node"].destroy();
                if(AdManage.s_transfer_node[key]["in_param"] && AdManage.s_transfer_node[key]["in_param"]["call_func"]!=null) AdManage.s_transfer_node[key]["in_param"]["call_func"](AdManage.s_transfer_node[key]["in_param"]["parent_node"]);//初始化广告组件
            });

            AdManage.s_transfer_node = new Array();

            black_bk.destroy();
            return false;
        })

        parent_node.addChild(black_bk);
        black_bk.setPosition(size.width/2,size.height/2);

        black_bk.addChild(row_1);
        
        black_bk.on(cc.Node.EventType.TOUCH_START,function(e){
            return false;
        })

        //创建广告模块
        Object.keys(AdManage.game_box_data).forEach(function(key){
            modul_node = AdManage.createModul(key,AdManage.game_box_data[key],zoom,font_color);
            row_2.addChild(modul_node["node"]);
            modul_node["node"].setPosition(0,row_2_height/2-modul_node["height"]/2-total_height);
            total_height += modul_node["height"];
            str_ad_ids += ","+AdManage.game_box_data[key].join(',');
       });
       if(str_ad_ids.length>0) AdManage.addShowCount(7,str_ad_ids.substr(1));//数据统计
       
       row_2_scroll = AdManage.addScroollNode("y",false,row_2,size.width,row_2_height,total_height-row_2_height);
       row_2_scroll.setPosition(0,size.height/2-row_2_height/2-return_parent_height);
        black_bk.addChild(row_2_scroll);
    }

    /**
     * 创建横向显示静态Icon
     * @param parent_node 父节点
     * @param data_array 一个广告内容数组
     * @param start 开始索引
     * @param end 结束索引
     * @param x X坐标
     * @param y Y坐标
     * @param space 图标间距
     * @param direction 图标排列方式，值为1的时候横向排列，否则纵向排列
     * @param zoom 缩放比例
     * @param font_color 广告字体的颜色
     * @return cc.Node对象
     */ 
    static createStaticIcon (parent_node,data_array,start,end,x=0,y=0,space=0,is_transverse=true,zoom=1,font_color=cc.color(255, 255, 255)) {
        if(start<0 || start>end) return null

        var lable_info = new Object();
        var play_game_ad = new cc.Node();//
        var show_data = new Array();

        var temp_element,icon_node,icon_size=100*zoom;//图标大小
        
        lable_info["width"] = icon_size+space;
        lable_info["height"] = 40*zoom;
        lable_info["font_size"] = 23;
        lable_info["color"] = font_color;
        lable_info["margin_top"] = 7*zoom;
        lable_info["icon_action"] = cc.repeatForever(cc.sequence(
            cc.rotateTo(0.5, -10.0),
            cc.rotateTo(0.25, 15.0),
            cc.rotateTo(0.25, 0.0),
            cc.delayTime(1),
        ));

        for(var i=start;i<=end && i<data_array.length;i++){
            temp_element = AdManage.getAdInfoById(AdManage.ad_info,data_array[i]);
            if(temp_element==null) continue;
            lable_info["title"] = temp_element["appName"];
            icon_node = AdManage.createIconNode(temp_element,icon_size,icon_size,135*zoom,135*zoom,lable_info);//创建一个Icon节点
            if(is_transverse===true) {
                icon_node.setPosition((icon_size+space)*i,0);
            }else{
                icon_node.setPosition(0,(icon_size+space+lable_info["height"])*i);
            }

            play_game_ad.addChild(icon_node);
            AdManage.addAdClick (icon_node.getChildByName("icon_parent").getChildByName("mask_node").getChildByName("icon_obj"),data_array[i],4,cc.Node.EventType.TOUCH_START);//为广告节点添加点击事件
            show_data.push(data_array[i]);
        }
        if(is_transverse===true){
            play_game_ad.setPosition(-((icon_size+space)*(show_data.length-1))/2+x,icon_size/2+y);
        }else{
            play_game_ad.setPosition(0,-(icon_size+space+lable_info["height"])*(show_data.length-1)/2);
        }
        parent_node.addChild(play_game_ad);
        if(show_data.length>0) AdManage.addShowCount("4",show_data.toString());//展示统计
        return play_game_ad;
    }

    
    /**
     * 创建静态Icon的广告组件
     * @param parent_node 父节点
     * @param x X坐标
     * @param y Y坐标
     * @param zoom 缩放比例
     * @param space 左右间距
     * @param space_y 上下间距
     * @param max_count 图标最大数量
     * @param font_color 广告字体的颜色
     * @return cc.Node对象
     */ 
    static createPlayGameAd (parent_node,x=0,y=0,zoom=1,space_x=0,space_y=0,max_count=null,font_color=cc.color(255, 255, 255)) {
        if(!AdManage.s_init_info["ad_set"]["control_switch"]["ad"]) return null;
        if(AdManage.play_game_ad_data.length<=0) return null;
        var play_game_ad_data = AdManage.play_game_ad_data,line_height,temp_node,temp_lable,lable_info = new Object();
        var play_game_ad = new cc.Node();//
        var left_ad = new cc.Node();//左边广告节点
        var right_ad = new cc.Node();//右边广告节点

        var play_icon_size = 100*zoom;//图标大小

        var temp_element,icon_node,icon_size=play_icon_size;
        var play_width = 135*zoom;//宽
        var play_height = 135*zoom;//高
        
        left_ad.setPosition(-290+x+space_x,190+y);
        right_ad.setPosition(290+x-space_x,190+y);

        lable_info["width"] = 140*zoom;
        lable_info["height"] = 40*zoom;
        lable_info["font_size"] = 23;
        lable_info["color"] = font_color;
        lable_info["margin_top"] = 7*zoom;
        lable_info["icon_action"] = cc.repeatForever(cc.sequence(
            cc.rotateTo(0.5, -10.0),
            cc.rotateTo(0.25, 15.0),
            cc.rotateTo(0.25, 0.0),
            cc.delayTime(1),
        ));

        for(var i=0;i<play_game_ad_data.length;i++){
            if(max_count && i>=max_count) break;
            temp_element = AdManage.getAdInfoById(AdManage.ad_info,play_game_ad_data[i]);
            if(temp_element==null) continue;
            line_height = Math.floor(i/2);
            lable_info["title"] = temp_element["appName"];

            icon_node = AdManage.createIconNode(temp_element,icon_size,icon_size,play_width,play_height,lable_info);//创建一个Icon节点
            icon_node.setPosition(0,-(icon_size+space_y)*line_height-40*line_height);
            if(i%2==0){
                left_ad.addChild(icon_node);
            }else{
                right_ad.addChild(icon_node);
            }

            AdManage.addAdClick (icon_node.getChildByName("icon_parent").getChildByName("mask_node").getChildByName("icon_obj"),play_game_ad_data[i],4,cc.Node.EventType.TOUCH_START);//为广告节点添加点击事件
        }
        
        play_game_ad.addChild(left_ad);
        play_game_ad.addChild(right_ad);
        parent_node.addChild(play_game_ad);
        AdManage.addShowCount("4",AdManage.play_game_ad_data.toString());//展示统计
        return play_game_ad;
    }


    /**
     * 创建猜你喜欢
     * @param parent_node 父节点
     * @param x X坐标
     * @param y Y坐标
     * @param zoom 缩放比例
     * @param bk_img 猜你喜欢的背景图
     * @param ad_icon_x 广告Icon的X坐标偏移
     * @param ad_icon_y 广告Icon的Y坐标偏移
     * @param guess_font_size 文字标签大小
     * @param bk_rect 九宫格矩形
     * @param guess_width 背景图片宽
     * @param guess_height 的背景图片高
     * @param font_color 字体颜色
     * @return cc.Node对象
     */ 
    static createGuessLike (
        parent_node,
        x=5,
        y=-540,
        zoom = 1,//缩放
        bk_img = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/guess_like.png",//背景图片
        ad_icon_x = 0,//广告Icon的X坐标偏移
        ad_icon_y = 0,//广告Icon的Y坐标偏移
        guess_font_size = 25*zoom,//文字标签大小
        bk_rect = new cc.Rect(40,40,65,65),//九宫格矩形
        guess_width = 715*zoom,//背景图片宽
        guess_height = 200*zoom,//的背景图片高
        font_color = cc.color(55, 152, 185),//字体颜色
    ) {
        if(!AdManage.s_init_info["ad_set"]["control_switch"]["ad"]) return null;
        if(AdManage.guess_like_data.length<=0) return null;
        var temp_element,icon_node,temp_lable,temp_node;
        var icon_size = 120*zoom;//图标大小
        var guess_mask_width = guess_width*0.9;//遮罩宽
        var guess_mask_height = guess_height;//遮罩高
        var guess_font_width = 135*zoom;//文字标签的宽
        var guess_font_height = 40*zoom;//文字标签的高
        var max_width = (AdManage.guess_like_data.length)*(icon_size+8)*2;
        var min_guess_length = AdManage.guess_like_data.length>=5?AdManage.guess_like_data.length:5;
        
        var mask = AdManage.createMaskNode(max_width,guess_mask_height);//创建遮罩
        var guess_like_ad = AdManage.createSpriteByUrl(bk_img,guess_width,guess_height,bk_rect);//创建猜你喜欢的背景
        guess_like_ad.setPosition(x,y);
        var scroll_value = (min_guess_length-5)*(icon_size+8);
        var scrool_guess_like = AdManage.addScroollNode("x",true,mask,guess_mask_width,guess_mask_height*0.8,scroll_value);
        // var scroll_node = scrool_guess_like.getChildByName("scroll_node");//获取滚动节点
        mask.x = -100;
        
        guess_like_ad.addChild(scrool_guess_like);
        scrool_guess_like.setPosition((guess_width-guess_mask_width)*0.1,0);
        
        for(var i=0;i<AdManage.guess_like_data.length;i++){
            temp_element = AdManage.getAdInfoById(AdManage.ad_info,AdManage.guess_like_data[i]);
            if(temp_element==null) continue;
            //创建一个广告容器
            temp_node = new cc.Node();
            //创建文字标签
            temp_lable = AdManage.createLabel(cc.size(guess_font_width, guess_font_height),temp_element["appName"],guess_font_size,font_color);
            temp_lable.setPosition(0,(-icon_size/1.7-0));
            icon_node = AdManage.createIconNode(temp_element,icon_size,icon_size,145,145,null);//创建一个Icon节点
            icon_node.setPosition(0,guess_mask_height*0.05);
            
            //设置广告内容和坐标
            temp_node.addChild(icon_node);
            temp_node.addChild(temp_lable);
            temp_node.setPosition((icon_size*i+8*i)-guess_mask_width*0.39+ad_icon_x,ad_icon_y);//设置节点坐标

            mask.addChild(temp_node);
            mask.setPosition(0,5);//设置节点坐标

            AdManage.addAdClick (icon_node.getChildByName("icon_parent").getChildByName("mask_node").getChildByName("icon_obj"),AdManage.guess_like_data[i],6,cc.Node.EventType.TOUCH_END);//为广告节点添加点击事件
        }
        parent_node.addChild(guess_like_ad);
        
        AdManage.addShowCount("6",AdManage.guess_like_data.toString());//展示统计
        return guess_like_ad;
    }


    /**
     * 创建一个Icon节点
     */
    static createIconNode(ad_info,icon_widht,icon_height,mask_width,mask_height,lable_info, isOutLine=false){
        var label_name = null;
        //创建一个广告容器
        var temp_node = new cc.Node();
        var temp_lable,icon_parent = new cc.Node(),temp_action;
        var icon_obj = AdManage.createSpriteByUrl(ad_info["appIcon"],icon_widht-8,icon_height-8,null);
        var mask_node = AdManage.createMaskNode(icon_widht,icon_widht);//创建一个遮罩节点
        var border_obj = AdManage.createSpriteByUrl(AdManage.s_icon_border,icon_widht,icon_height,new cc.Rect(50,50,55,55));
        var lable_width = 40,lable_height=20;
        



        mask_node.addChild(icon_obj);
        icon_parent.name = "icon_parent";
        mask_node.name="mask_node";
        icon_obj.name="icon_obj";

        
        //如果Icon节点有标题
        if(lable_info!=null && lable_info["title"]!=null){
            //创建文字标签
            temp_lable = AdManage.createLabel(cc.size(lable_info["width"], lable_info["height"]),lable_info["title"],lable_info["font_size"],lable_info["color"]);
            temp_lable.setPosition(0,-mask_height/2-lable_info["margin_top"]);
            if (isOutLine) {
                let labelOut = temp_lable.addComponent(cc.LabelOutline);
                labelOut.color = cc.color(255, 255, 255);
                labelOut.width = 2;
            }
            temp_node.addChild(temp_lable);
        }

        //图标动画
        if(lable_info!=null && lable_info["icon_action"]!=null){
            temp_action = lable_info["icon_action"].clone();
            // mask_node.runAction(temp_action);
            icon_parent.runAction(temp_action);


        }
        icon_parent.addChild(mask_node);
        mask_node.addChild(border_obj);
        temp_node.addChild(icon_parent);
        if(ad_info["label_name"]!=null && ad_info["label_name"].length>0){
            label_name = AdManage.createSpriteByUrl("https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/jiaobiao.png",lable_width,lable_height,null);
            temp_lable = AdManage.createLabel(cc.size(lable_width, lable_height),ad_info["label_name"],31,cc.color(255, 255, 255));
            label_name.addChild(temp_lable);
            icon_parent.addChild(label_name);
            label_name.setPosition(-icon_widht/2+lable_width/2-10,icon_height/2-lable_height/2+5);
        }



        return temp_node;
    }


    /**
     * 打开退出游戏广告
     */
    static openExitAd(
        parent_node,
        zoom=1,
        exit_game_bk="",//退出游戏的背景
        exit_game_font = "",//更多精品的文字
        exit_game_title_font = "",//标题文字
        exit_game_close = "",//关闭按钮
        font_color = cc.color(50, 50, 50),//字体颜色
    ){
        var exit_icon_data = AdManage.exit_icon_data;//退出广告Icon的广告内容数组
        var exit_banner_data = AdManage.exit_banner_data;//退出广告Banner的广告内容数组
        var node_parent = new cc.Node();

        var ad_module_width=600*zoom,ad_module_height=900*zoom+(150-150*zoom),icon_size=120*zoom,icon_ad = new cc.Node(),icon_node,banner_node,temp_element,lable_info = new Object();
        var line_height = 0,cancel_btn,confirm_btn,temp_node,exit_icon_size=50,font_height = 40;
        var size = cc.director.getWinSize();//获取屏幕大小
        var exit_ad = AdManage.createSpriteByUrl(exit_game_bk,ad_module_width,ad_module_height,new cc.Rect(90,90,65,65));//创建一个广告容器
        var more_game_font = AdManage.createSpriteByUrl(exit_game_font,ad_module_width/2+50,font_height,null);//更多精品游戏的文字节点
        var ad_title_font = AdManage.createSpriteByUrl(exit_game_title_font,ad_module_width/2,40,null);//创建一个标题文字
        var exit_icon = AdManage.createSpriteByUrl(exit_game_close,exit_icon_size,exit_icon_size,null);//创建一个退出按钮
        var black_bk = AdManage.createSpriteByUrl(AdManage.s_blinded_layer_color,size.width,size.height,null);//创建蒙蔽层节点
        exit_ad.addChild(more_game_font);
        exit_ad.addChild(icon_ad);
        exit_ad.addChild(ad_title_font);
        exit_ad.addChild(exit_icon);
        ad_title_font.setPosition(0,ad_module_height/2-font_height/2-25);
        more_game_font.setPosition(0,ad_module_height/2-font_height/2-80);
        
        exit_icon.setPosition(-ad_module_width/2+exit_icon_size/2+15,ad_module_height/2-exit_icon_size/2-20);
        exit_ad.setPosition(0,100);
        black_bk.opacity = 150;//设置蒙蔽层透明度
        
        lable_info["width"] = 140*zoom;
        lable_info["height"] = 40*zoom;
        lable_info["font_size"] = 23;
        lable_info["color"] = font_color;
        lable_info["margin_top"] = lable_info["height"]/2;

        //遍历Icon
        for(var i=0;i<exit_icon_data.length;i++){
            temp_element = AdManage.getAdInfoById(AdManage.ad_info,exit_icon_data[i]);
            if(temp_element==null) continue;
            line_height = Math.floor(i/4);
            lable_info["title"] = temp_element["appName"];
            icon_node = AdManage.createIconNode(temp_element,icon_size,icon_size,135*zoom,135*zoom,lable_info);//创建一个Icon节点
            icon_node.setPosition(icon_size*(i%4)+(i%4)*23*zoom-ad_module_width/2+icon_size/2+23*zoom,ad_module_height/2-icon_size/2-120-(line_height*icon_size+line_height*50*zoom));
            exit_ad.addChild(icon_node);
            AdManage.addAdClick (icon_node.getChildByName("icon_parent").getChildByName("mask_node").getChildByName("icon_obj"),exit_icon_data[i],1,cc.Node.EventType.TOUCH_START);//为广告节点添加点击事件
        }
        
        //遍历Banner
        for(var i=0;i<exit_banner_data.length;i++){
            temp_element = AdManage.getAdInfoById(AdManage.ad_info,exit_banner_data[i]);
            if(temp_element==null) continue;
            banner_node = AdManage.createSpriteByUrl(AdManage.getBannerUrl(temp_element),ad_module_width-ad_module_width*0.08,170*zoom,null);//创建一个Banner广告
            banner_node.setPosition(0,-170*zoom/2-20-(170*zoom*i+i*20*zoom));
            exit_ad.addChild(banner_node);
            AdManage.addAdClick (banner_node,exit_banner_data[i],1,cc.Node.EventType.TOUCH_START);//为广告节点添加点击事件
        }


        cancel_btn = AdManage.createLabel(cc.size(110, 40),"取消",30,cc.color(55, 55, 55));//取消按钮
        confirm_btn = AdManage.createLabel(cc.size(110, 40),"确认",30,cc.color(55, 55, 55));//确认按钮
        cancel_btn.setPosition(-ad_module_width/2+200*zoom,-ad_module_height/2+30);
        confirm_btn.setPosition(ad_module_width/2-200*zoom,-ad_module_height/2+30);

        exit_ad.addChild(cancel_btn);
        exit_ad.addChild(confirm_btn);
        //标题上的取消按钮
        exit_icon.on(cc.Node.EventType.TOUCH_START,function(e){
            node_parent.destroy();
            return false;
        })
        //取消按钮
        cancel_btn.on(cc.Node.EventType.TOUCH_START,function(e){
            node_parent.destroy();
            return false;
        })
        //确认按钮
        confirm_btn.on(cc.Node.EventType.TOUCH_START,function(e){
            wx.exitMiniProgram();//退出游戏
            return false;
        })
        
        black_bk.on(cc.Node.EventType.TOUCH_START,function(e){
            return false;
        })

        AdManage.addShowCount("1",exit_icon_data.concat(exit_banner_data).toString());//展示统计
        node_parent.addChild(black_bk);
        node_parent.addChild(exit_ad);
        parent_node.addChild(node_parent);
    }


    /**
     * 打开抽屉
     */
    static openDrawer (
        parent_node,
        x,
        y,
        drawer_width,
        drawer_height,
        drawer_node_height,
        zoom=1,
        drawer_right_img = "",//抽屉广告的右拉按钮
        drawer_nine = "",//抽屉广告九宫格背景
        drawer_title_img = "",//抽屉广告的标题
        drawer_icon_position=220,//右拉按钮的位置调整
        ad_font_color=cc.color(55, 152, 185),//广告文字的颜色
    ) {
        var drawer_parent = new cc.Node();
        var node_parent = new cc.Node();
        var icon_size = 110*zoom;
        var line_height = 0;//图标的行高
        var drawer_node_width = 490*zoom;//

        
        var drawer_mask_height_tuning = 30*zoom;
        var mask_width = drawer_node_width,title_height = drawer_node_height*0.11,mask_height = drawer_node_height-title_height-drawer_mask_height_tuning-10;
        var drawer_node_width = drawer_node_width,drawer_node_height = drawer_node_height;
        var drawer_data = AdManage.drawer_data;
        var scroll_node = new cc.Node();//创建游戏抽屉的广告容器滑动节点
        var line_count = Math.ceil(drawer_data.length/3)-5,max_height;//行高
        var current_index = 15;//最后一行显示的元素的索引

        var size = cc.director.getWinSize();//获取屏幕大小
        var black_bk = AdManage.createSpriteByUrl(AdManage.s_blinded_layer_color,size.width,size.height,null);//创建蒙蔽层节点
        var drawer_right = AdManage.createSpriteByUrl(drawer_right_img,drawer_width,drawer_height,null);//右拉按钮
        var title_width = drawer_node_width*0.9;
        
        var drawer_node = AdManage.createSpriteByUrl(drawer_nine,drawer_node_width,drawer_node_height,new cc.Rect(50,50,50,50));//抽屉九宫格背景
        var drawer_title = AdManage.createSpriteByUrl(drawer_title_img,title_width,title_height,null);//创建抽屉标题节点

        drawer_title.setPosition(0,drawer_node_height/2-title_height/2-drawer_mask_height_tuning);
        
        // var drawer_mask = AdManage.createMaskNode(mask_width,mask_height-30-drawer_mask_height_tuning);//创建游戏抽屉的遮罩
        var drawer_mask = AdManage.createMaskNode(mask_width,mask_height);//创建游戏抽屉的遮罩
        var icon_node,temp_info,temp_count,temp_node,temp_lable,drawer_parent_y = 220+y;
        var start_point,current_point,end_point,pre_point;
        var statistics_data;
        
        black_bk.opacity = 150;//设置蒙蔽层透明度
        drawer_right.setPosition(-drawer_node_width/2-drawer_width/2+2, drawer_node_height/4+drawer_icon_position);//设置右拉按钮位置
        drawer_node.setPosition(0, 0);//设置抽屉节点的位置605
        drawer_parent.setPosition(size.width/2+drawer_node_width/2+x, drawer_parent_y);//设置抽屉节点的位置605
        drawer_mask.setPosition(0,drawer_node_height/2-mask_height/2-title_height-drawer_mask_height_tuning);
        
        //遍历抽屉广告
        for(var i=0;i<drawer_data.length;i++){
            line_height = Math.floor(i/3);
            temp_count = i%3;
            temp_info = AdManage.getAdInfoById(AdManage.ad_info,drawer_data[i]);//获取广告信息
            //创建一个广告容器
            temp_node = new cc.Node();
            icon_node = AdManage.createIconNode(temp_info,icon_size,icon_size,140,140,null);//创建图标节点
            //创建文字标签
            temp_lable = AdManage.createLabel(cc.size(140*zoom, 40*zoom),temp_info["appName"],23,ad_font_color);
            temp_lable.setPosition(0,-icon_size/2-40*0.5*zoom);
            temp_node.setPosition((icon_size*temp_count+temp_count*40*zoom)-mask_width*0.5+icon_size/2+40*zoom, -line_height*icon_size-line_height*(35*zoom)+mask_height*0.5-icon_size*0.5-mask_height*0.18+drawer_mask_height_tuning+title_height);//设置容器坐标
            temp_node.addChild(icon_node);
            temp_node.addChild(temp_lable);
            scroll_node.addChild(temp_node);
            AdManage.addAdClick (icon_node.getChildByName("icon_parent").getChildByName("mask_node").getChildByName("icon_obj"),drawer_data[i],5,cc.Node.EventType.TOUCH_END);//为广告节点添加点击事件
        }
        drawer_mask.addChild(scroll_node);
        
        max_height = line_count*icon_size+line_count*40*zoom+(-line_count*5*zoom+130*zoom);

        drawer_mask.on(cc.Node.EventType.TOUCH_START,function(e){
            start_point = e.touch._point.clone();
            pre_point = e.touch._point.clone();;
            return false;
        })

        drawer_mask.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            current_point = e.touch._point.clone();
            scroll_node.y=scroll_node.y+(current_point.y-pre_point.y);
            pre_point = e.touch._point.clone();
            current_index = (5+Math.floor(AdManage.slideAction("y",scroll_node,max_height,null,false)/(icon_size+35)*zoom))*3;
            statistics_data = AdManage.copyData(AdManage.drawer_data,AdManage.s_drawer_show.length,current_index+3);
            if(statistics_data.length>0) AdManage.addShowCount("5",statistics_data.toString());//展示统计
            return false;
        })
        
        drawer_mask.on(cc.Node.EventType.TOUCH_END,function(e){
            end_point = e.touch._point.clone();
            AdManage.slideAction("y",scroll_node,max_height);
            return false;
        })

        drawer_mask.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
            AdManage.slideAction("y",scroll_node,max_height);
            return false;
        })

        black_bk.on(cc.Node.EventType.TOUCH_START,function(e){
            return false;
        })
        drawer_right.on(cc.Node.EventType.TOUCH_START,function(e){
            AdManage.s_drawer_show=null;
            drawer_parent.runAction(
                cc.sequence(cc.moveTo(0.2, new cc.Vec2(size.width/2+drawer_node_width/2,drawer_parent_y)),cc.callFunc(function (){node_parent.destroy();}))
            );
            return false;
        })
        
        drawer_node.addChild(drawer_mask);
        drawer_node.addChild(drawer_title);
        drawer_parent.addChild(drawer_right);
        drawer_parent.addChild(drawer_node);
        node_parent.addChild(black_bk);
        node_parent.addChild(drawer_parent);
        parent_node.addChild(node_parent);

        AdManage.addShowCount("5",AdManage.s_drawer_show.toString());//展示统计
        drawer_parent.runAction(cc.moveTo(0.2, new cc.Vec2(size.width/2-drawer_node_width/2,drawer_parent_y)));
        
    }

    /**
     * 从数组中的指定位置复制元素
     */
    static copyData(data_array,start,end){
        var out_data = new Array();
        var count = 0;
        for(var i=start;i<end;i++){
            if(!data_array[i]) return out_data;
            out_data[count++] = data_array[i];
            AdManage.s_drawer_show[i]=data_array[i];
        }
        return out_data;
    }

    /**
     * 滑动动画(到顶或者到底)
     * @param scroll_node 滑动的节点
     * @param max_value 最大滑动数值
     * @param is_action 是否执行滑动动画
     * @return 返回节点当前位置
     */
    static slideAction(axis,scroll_node,max_value,callFunc=null,is_action=true){
        var current_position = axis=="y"?scroll_node.y:scroll_node.x;

        if(axis=="x"){
            // if(max_value>0) max_value=0;
            if(current_position>0) {
                if(is_action){
                    scroll_node.stopAllActions();
                    scroll_node.runAction(
                        cc.sequence(
                            cc.moveTo(0.3, new cc.Vec2(0,0)).easing(cc.easeIn(0.3)),cc.callFunc(function(){if(callFunc) callFunc()})
                        )
                    )
                }
                current_position = 0;
            }else
            if(-current_position>max_value) {
                if(is_action){
                    scroll_node.stopAllActions();
                    scroll_node.runAction(
                        cc.sequence(
                            cc.moveTo(0.3, new cc.Vec2(-max_value,0)).easing(cc.easeIn(0.3)),cc.callFunc(function(){if(callFunc) callFunc()})
                        )
                    )
                }
                current_position = -max_value;
            }else{
                if(callFunc) callFunc();
            }
        }else{
            if(max_value<0) max_value=0;
            if(current_position<0) {
                if(is_action){
                    scroll_node.stopAllActions();
                    scroll_node.runAction(
                        cc.sequence(
                            cc.moveTo(0.3, new cc.Vec2(0,0)).easing(cc.easeIn(0.3)),cc.callFunc(function(){if(callFunc) callFunc()})
                        )
                    )
                }
                current_position = 0;
            }else
            if(current_position>max_value) {
                if(is_action){
                    scroll_node.stopAllActions();
                    scroll_node.runAction(
                        cc.sequence(
                            cc.moveTo(0.3, new cc.Vec2(0,max_value)).easing(cc.easeIn(0.3)),cc.callFunc(function(){if(callFunc) callFunc()})
                        )
                    )
                }
                current_position = max_value;
            }else{
                if(callFunc) callFunc();
            }
        }
        return current_position;
    }
    
    /**
     * 给定一个广告元素，返回banner图片
     */
    static getBannerUrl(temp_element){
        return temp_element["mode"]=="image"?temp_element["appIcon"]:temp_element["imageUrl"];
    }

    /**
     * 打开更多游戏
     */
    static openMoreGame (
        parent_node,
        zoom=1,
        more_game_bk = "",//更多游戏的九宫格背景
        more_game_shadow = "",//更多游戏的标题阴影
        more_game_cancel = "",//更多游戏的退出按钮
        exit_game_title = "",//更多游戏的标题

    ) {
        var node_parent = new cc.Node();
        var more_game_data = AdManage.more_game_data;
        var bk_node,title_shadow,exit_btn,more_game,temp_element,temp_node,temp_url,mask_node;
        var bk_node_width = 560*zoom;//九宫格背景的宽
        var bk_node_height = 905*zoom;//九宫格背景的高

        var size = cc.director.getWinSize();//获取屏幕大小
        var black_bk = AdManage.createSpriteByUrl(AdManage.s_blinded_layer_color,size.width,size.height,null);//创建蒙蔽层节点
        mask_node = AdManage.createMaskNode(490*zoom,170*4*zoom+6*20*zoom);//创建一个遮罩节点
        mask_node.setPosition(0,80);
        
        //创建九宫格背景
        bk_node = AdManage.createSpriteByUrl(more_game_bk,bk_node_width,bk_node_height,new cc.Rect(50,50,65,65));
        bk_node.setPosition(0,70);

        //标题阴影
        title_shadow = AdManage.createSpriteByUrl(more_game_shadow,bk_node_width,60*zoom,null);
        bk_node.addChild(title_shadow);
        title_shadow.setPosition(0,bk_node_height/2-60*zoom/2);
        
        //创建退出按钮
        exit_btn = AdManage.createSpriteByUrl(more_game_cancel,85*zoom,85*zoom,null);
        exit_btn.on(cc.Node.EventType.TOUCH_START,function(e){
            node_parent.destroy();
            return false;
        })
        exit_btn.setPosition(bk_node_width/2-20,bk_node_height/2+60);

        //更多游戏的标题
        more_game = AdManage.createSpriteByUrl(exit_game_title,385*zoom,205*zoom,null);
        bk_node.addChild(more_game);
        more_game.setPosition(-bk_node_width/2+385*zoom/2-(385*zoom)*0.09,bk_node_height/2-(205*zoom/2)*0.35);

        black_bk.opacity = 150;//设置蒙蔽层透明度
        
        //遍历更多游戏的数据
        for(var i=0;i<more_game_data.length;i++){
            temp_element = AdManage.getAdInfoById(AdManage.ad_info,more_game_data[i]);
            if(temp_element==null) continue;
            //创建游戏节点
            temp_node = AdManage.createSpriteByUrl(AdManage.getBannerUrl(temp_element),490*zoom,170*zoom,null);
            temp_node.setPosition(0,(-170*zoom)*i-(20*zoom)*i+(170*zoom*2)-(170*zoom/2+20*zoom));
            mask_node.addChild(temp_node);
            AdManage.addAdClick (temp_node,more_game_data[i],2,cc.Node.EventType.TOUCH_START);//为广告节点添加点击事件
        }
        
        black_bk.on(cc.Node.EventType.TOUCH_START,function(e){
            return false;
        })

        AdManage.addShowCount("2",more_game_data.toString());//展示统计
        node_parent.addChild(black_bk);
        node_parent.addChild(bk_node);
        node_parent.addChild(exit_btn);
        node_parent.addChild(mask_node);
        parent_node.addChild(node_parent);
    }

    /**
     * 创建抽屉广告
     * @param parent_node 父节点
     * @param x X坐标
     * @param y Y坐标
     * @param zoom 缩放比例
     * @param drawer_width 主界面图标宽
     * @param drawer_height 主界面图标高
     * @param drawer_icon_position //左拉、右拉按钮的位置调整
     * @param ad_font_color //广告的字体颜色
     * @param drawer_left //抽屉广告的左拉按钮
     * @param drawer_right_img //抽屉广告的右拉按钮
     * @param drawer_nine //抽屉广告九宫格背景
     * @param drawer_title_img //抽屉广告的标题
     * @return cc.Node对象
     */
    static createDrawer (
        parent_node,
        x=0,
        y=0,
        zoom=1,
        drawer_width=101*zoom,
        drawer_height=96*zoom,
        drawer_icon_position = 220,//左拉、右拉按钮的位置调整
        ad_font_color = cc.color(55, 152, 185),//广告的字体颜色
        drawer_left = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/drawer_left_5.png",//抽屉广告的左拉按钮
        drawer_right_img = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/drawer_right_5.png",//抽屉广告的右拉按钮
        drawer_nine = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/drawer_nine_5.png",//抽屉广告九宫格背景
        drawer_title_img = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/drawer_title_5.png",//抽屉广告的标题
    ) {
        if(!AdManage.s_init_info["ad_set"]["control_switch"]["ad"]) return null;
        if(AdManage.drawer_data.length<=0) return null;
        var drawer_node_height = 720*zoom;//
        
        var drawer_icon = AdManage.createSpriteByUrl(drawer_left,drawer_width,drawer_height,null);//创建抽屉图标
        var size = cc.director.getWinSize();//获取屏幕大小

        drawer_icon.setPosition(size.width/2-drawer_width/2+x, drawer_node_height/4+drawer_icon_position+y);//设置容器坐标
        parent_node.addChild(drawer_icon);
        drawer_icon.on(cc.Node.EventType.TOUCH_START,function(e){
            if(!AdManage.s_drawer_show){
                AdManage.s_drawer_show = new Array();
                AdManage.s_drawer_show = AdManage.copyData(AdManage.drawer_data,0,15);
                AdManage.openDrawer(parent_node,x,y,drawer_width,drawer_height,drawer_node_height,zoom,drawer_right_img,drawer_nine,drawer_title_img,drawer_icon_position-220,ad_font_color);
            }

            return false;
        })
        return drawer_icon;
    }
    
    
    /**
     * 创建轮播Icon
     * @param parent_node 父节点
     * @param x X坐标
     * @param y Y坐标
     * @param zoom 缩放比例
     * @param carousel_bk 背景图片
     * @return cc.Node对象
     */ 
    static createCarouselIcon (
        parent_node,
        x=-295,
        y=315,
        zoom=1,
        carousel_bk = "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/bk_white.png",
    ) {
        if(!AdManage.s_init_info["ad_set"]["control_switch"]["ad"]) return null;
        if(AdManage.icon_carousel_data.length<=0) return null;
        var icon_node,mask_node,parent_mask;
        var mask_width = 105*zoom;//图标遮罩宽
        var mask_height = 105*zoom;//图标遮罩高
        var parent_node_width = 110*zoom;//父节点宽度
        var parent_node_height = 128*zoom;//父节点高度
        var parent_mask_width = 155*zoom;//父节点遮罩宽
        var parent_mask_height = 155*zoom;//父节点遮罩高
        var font_height = 100*zoom;//文字高度
        var font_width = 40*zoom;//文字宽度
        var font_size = 25*zoom;//文字大小
        var font_coLor = cc.color(50, 50, 50);//文字颜色

        //创建一个Icon容器
        var icon_parent_node = AdManage.createSpriteByUrl(carousel_bk,parent_node_width,parent_node_height,null);//创建容器的背景
        //创建文字标签
        var font_lable = AdManage.createLabel(cc.size(font_height,font_width),"精选游戏",font_size,font_coLor);
        parent_mask = AdManage.createMaskNode(parent_mask_width,parent_mask_height);//创建父节点的遮罩
        font_lable.setPosition(0, (-parent_node_height/2)+parent_node_height*0.1);//设置文字坐标
        parent_mask.setPosition(x, y);//设置容器坐标
        mask_node = AdManage.createMaskNode(mask_width,mask_height);//创建一个遮罩节点
        mask_node.setPosition(0, parent_node_height*0.1);//设置遮罩坐标
        icon_parent_node.addChild(mask_node);
        icon_parent_node.addChild(font_lable);
        parent_mask.addChild(icon_parent_node);
        AdManage.carousel (mask_node,0,null,zoom);
        parent_node.addChild(parent_mask);
        return parent_mask;
    }

    /**
     * Icon轮播
     */ 
    static carousel (parent_node,num,icon_node,zoom=1) {

        var info,icon_node;
        var icon_width = 85*zoom;//Icon宽
        var icon_height = 85*zoom;//Icon高


        if(icon_node!=null) {
            icon_node.destroy();
        }
        //获取轮播图的Icon信息
        info = AdManage.getAdInfoById(AdManage.ad_info,AdManage.icon_carousel_data[num]);

        icon_node = AdManage.createIconNode(info,icon_width,icon_height,140,140,null);//创建图标节点

        if(!parent_node.isValid) return ;//如果组件已经被销毁
        
        parent_node.addChild(icon_node);
        AdManage.addShowCount("3",String(AdManage.icon_carousel_data[num]));//展示统计
        
        AdManage.addAdClick (icon_node,AdManage.icon_carousel_data[num],3,cc.Node.EventType.TOUCH_START);//为广告节点添加点击事件
        new cc.Component().scheduleOnce(function() {

            if(num<AdManage.icon_carousel_data.length-1) {
                num = num + 1;
            }else{
                num = 0;
            }
            AdManage.carousel (parent_node,num,icon_node,zoom);
        }, 5);
    }
}
