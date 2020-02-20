# Yunyun-Study-for-Mobile（芸云课堂移动端）   
![avatar](/static/images/headerIcon.png)   
### 项目介绍  
芸云课堂是一款在线技能学习的视频资源网站，本项目提供移动端web、微信小程序（进一步要求：iOS和AndroidApp），UI参考网易云课堂。  
### 项目目录  
```JavaScript  
├─common                        // 公共组件
│  ├─request                    // uni.request封装
│  ├─User                       // 用户动作(登录、注册、获取验证码、注销)封装
│  └─globalData                 // 全局函数封装
│ 
├─components                    // 公共组件
│  ├─page-animation             // H5路由动画
│  │ ├─index.css                // 路由css动画
│  │ ├─index.vue                // 操作路由钩子
│  │ └─setting.js               // 页面权重 配置
│  │
│  ├─verify5-ui                 // V5安全组件（详见内置README.md）
│  ├─betterSticky.vue           // 吸顶效果组件
│  ├─yunBox.vue                 // 图片+文字说明 的特殊盒子
│  ├─yunHeader.vue              // 页面导航栏
│  ├─yunImage.vue               // 原生image封装组件
│  ├─yunInput.vue               // 页面输入框
│  ├─yunModal.vue		        // 拟态框
│  ├─yunMoveVerify.vue          // 滑动验证组件
│  ├─yunRefresh.vue             // 自定义下拉刷新组件
│  ├─yunSelect.vue              // (搜索页)下拉选择卡组件
│  ├─yunSwiper.vue              // 轮播图组件
│  ├─yunTab.vue                 // tab选择卡组件
│  └─yunThemes.vue              // 类似首页的页面内容
│
├─pages                         // 前端页面
│  ├─allCourse                  // 机构/讲师 全部课程页面
│  ├─cart                       // 购物车页面
│  ├─center                     // 个人中心
│  ├─chooseLogin                // 选择登陆方式页
│  ├─classification             // 分类页
│  ├─coupon                     // 优惠券页
│  ├─Coursedetails              // 课程详情页
│  ├─index                      // 主页
│  ├─Mycourse                   // 我的课程页
│  ├─order                      // 订单页
│  ├─phoneLogin                 // 账号密码登陆页
│  ├─payConfirm                 // 确认支付页面
│  ├─provider                   // 机构/讲师 页面
│  ├─register                   // 注册页
│  ├─search                     // 搜索页
│  └─userEdit	                // 用户信息页
│
├─store                         // vuex的状态管理
│  ├─index.js                   // store入口
│  ├─cartStore                  // 购物车store
│  └─commonStroe                // 普通store
│        
├─static                        // 静态资源
├─styles                        // 公共样式文件
├─uniUI                         // uniUI跨端UI组件（注意：已对uniUI进行自定义修改，不要由npm导入）
│
├─utils                         // 公共函数
│  ├─mymath.js                  // 计算函数
│  └─timeFormat.js              // 时间格式转换函数
│ 
├─.gitignore                    // git提交忽略设置文件
├─App.vue                       // 页面入口文件
├─index.html                    // H5端 HTML模版
├─main.js                       // 程序入口文件，加载各种公共组件
├─manifest.json                 // 配置应用名称、appid、logo、版本等打包信息
├─package.json                  // npm设置
├─package-lock.json             // npm生成配置
├─pages.json                    // 配置页面路由、导航条、选项卡等页面类信息
└─uni.scss                      // 公共scss变量
```
### 技术选型 
技术 | 说明 |  文档    
-|-|-  
uni-app |  基于 Vue.js 的前端跨端开发框架 | [https://uniapp.dcloud.io/README](https://uniapp.dcloud.io/README) |  
uni-ui | 官方跨端ui库 | [https://uniapp.dcloud.io/component/README?id=uniui](https://uniapp.dcloud.io/component/README?id=uniui) |  
sass | css处理器 | [https://www.sass.hk/guide/](https://www.sass.hk/guide/) |
vuex | vue状态管理器 | [https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/) |  
yapi | 可视化接口管理平台（模拟接口管理，已部署在个人服务器上） | [https://www.bookstack.cn/read/YApi-zh/docs-documents-api.md](https://www.bookstack.cn/read/YApi-zh/docs-documents-api.md) <br> 基于[mockjs](http://mockjs.com) | 
V5   | 客户端识别及验证控件 | [http://help.verify5.com](http://help.verify5.com/hc/kb/article/1332405/) | 
express | 用于代理转发 | [http://www.expressjs.com.cn](http://www.expressjs.com.cn) | 

### 相关链接  
github地址: [https://github.com/MIchaelJier/Yunyun-Study-for-Mobile](https://github.com/MIchaelJier/Yunyun-Study-for-Mobile).  
部署网址：[http://www.yingjiechen.cn/yun/](http://www.yingjiechen.cn/yun/).  
小程序：个人微信搜索“芸云学堂”.  
后端接口文档：[芸云课堂后端接口文档](https://zfroot.top:8081/yun/doc.html)  
衍生插件：uni H5路由动画插件([路由动画 page-animation升级版](https://ext.dcloud.net.cn/plugin?id=1265))

### 目前完成进度  
 1. 首页  
 2. 我的课程页 (我的微专业 x)
 3. 个人中心页   
 4. 搜索页
 5. 分类页  
 6. 详情页 (对已购买者的判断 x)
 7. 选择登录页（第三方登陆 x）
 8. 账号密码登录页 
 9. 用户信息页 (只有对昵称的修改)
 10. 我的订单
 11. 我的优惠券
 12. 我的购物车
 13. 支付页面( 微信/支付宝支付 x) 
 14. 讲师/机构介绍和精选课程页
 15. 讲师/机构全部课程页

### 导入 
 1. 打开HBuilder X，文件 -> 从Git导入
 2. npm i