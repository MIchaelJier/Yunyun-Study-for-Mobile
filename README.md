# Yunyun-Study-for-Mobile（芸云课堂移动端）   
![avatar](/static/headerIcon.png)   
### 项目介绍  
芸云课堂是一款在线技能学习的视频资源网站，本项目提供移动端web、微信小程序（进一步要求：iOS和AndroidApp），UI参考网易云课堂。  
### 项目目录  
```JavaScript  
├─components                    // 公共组件
│  ├─betterSticky.vue           // 吸顶效果组件
│  ├─yunBox.vue                 // 图片+文字说明 的特殊盒子
│  ├─yunHeader.vue              // 页面导航栏
│  ├─yunInput.vue               // 页面输入框
│  ├─yunModal.vue		        // 拟态框
│  ├─yunMoveVerify.vue          // 滑动验证组件
│  ├─yunSelect.vue              // (搜索页)下拉选择卡组件
│  ├─yunSwiper.vue              // 轮播图组件
│  ├─yunTab.vue                 // tab选择卡组件
│  └─yunThemes.vue              // 类似首页的页面内容
│
├─pages                         // 前端页面
│  ├─center                     // 个人中心
│  ├─chooseLogin                // 选择登陆方式页
│  ├─classification             // 分类页
│  ├─classification             // 分类页
│  ├─coupon                     // 优惠券页
│  ├─index                      // 主页
│  ├─Mycourse                   // 我的课程页
│  ├─order                      // 订单页
│  ├─phoneLogin                 // 账号密码登陆页
│  ├─search                     // 搜索页
│  └─userEdit	                // 用户信息页
│
├─store                         // vuex的状态管理
│  ├─cartStore                  // 购物车store
│  └─commonStroe                // 普通store
│          
├─static                        // 静态资源
├─styles                        // 公共样式文件
├─uniUI                         // uniUI跨端UI组件
│
├─utils                         // 公共函数
│  ├─mymath.js                  // 计算函数
│  ├─request.js                 // uni.request封装
│  └─timeFormat.js              // 时间格式转换函数
│ 
├─.gitignore                    // git提交忽略设置文件
├─App.vue                       // 页面入口文件
├─main.js                       // 程序入口文件，加载各种公共组件
├─manifest.json                 // 配置应用名称、appid、logo、版本等打包信息
├─pages.json                    // 配置页面路由、导航条、选项卡等页面类信息
└─uni.scss                      // 公共scss变量
```
### 技术选型 
技术 | 说明 |  文档    
-|-|-  
uni-app |  是一个使用 Vue.js 开发所有前端应用的框架 | [https://uniapp.dcloud.io/README](https://uniapp.dcloud.io/README) |  
uni-ui | 官方跨端ui库 | [https://uniapp.dcloud.io/component/README?id=uniui](https://uniapp.dcloud.io/component/README?id=uniui) |  
vuex | vue状态管理器 | [https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/) |  
yapi | 可视化接口管理平台（模拟接口管理，部署在个人服务器9000端口） | [https://www.bookstack.cn/read/YApi-zh/docs-documents-api.md](https://www.bookstack.cn/read/YApi-zh/docs-documents-api.md) <br> 基于[mockjs](http://mockjs.com) | 
express | 用于代理转发 | [http://www.expressjs.com.cn](http://www.expressjs.com.cn) | 

### 相关链接  
github地址: [https://github.com/MIchaelJier/Yunyun-Study-for-Mobile](https://github.com/MIchaelJier/Yunyun-Study-for-Mobile).  
部署网址：[http://www.yingjiechen.cn/yun/](http://www.yingjiechen.cn/yun/).  
小程序：微信搜索“芸云学堂”.  
后端接口文档：[文档](http://zfroot.top:8081/yun)  

### 目前完成进度  
 1. 首页  
 2. 我的课程页 (我的微专业 x)
 3. 个人中心页   
 4. 搜索页
 5. 分类页  
 6. 详情页 (对已购买者的判断 x)
 7. 选择登录页（第三方登陆 x）
 8. 账号密码登录页 (验证码与后端的交互 x)
 9. 用户信息页 (只有对昵称的修改)
 10. 我的订单
 11. 我的优惠券
 12. 我的购物车
 13. 支付页面( 微信/支付宝支付 x) 
 14. x 微专业
 15. x 注册页 
 16. x 讲师/机构课程页
 17. x 我的学习卡
 17. ...
 
其他：
 x 返回顶部按钮
 x 菜单悬浮栏
 x 部分页面的刷新功能
