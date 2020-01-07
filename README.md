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
│  ├─Coursedetails              // 课程详情页
│  ├─index                      // 主页
│  ├─Mycourse                   // 我的课程页
│  ├─phoneLogin                 // 账号密码登陆页
│  ├─search                     // 搜索页
│  └─userEdit	                // 用户信息页
│
├─store                         // vuex的状态管理
│      index.js   
│          
├─static                        // 静态资源
├─styles                        // 公共样式文件
│      uxIcon.css               // 云课堂专属图标
│
├─uniUI                         // uniUI跨端UI组件
│
├─utils                         // 公共函数
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
### 相关链接  
github地址: [https://github.com/MIchaelJier/Yunyun-Study-for-Mobile](https://github.com/MIchaelJier/Yunyun-Study-for-Mobile).  
部署网址：[http://www.yingjiechen.cn/yun/](http://www.yingjiechen.cn/yun/).  
小程序：微信搜索“芸云学堂”.  
yapi（模拟接口管理）：服务器9000端口.  
后端接口文档：[文档](http://zfroot.top:8081/yun)  
### 目前完成进度  
 1. 首页  
 2. 我的课程页 (我的微专业 x)
 3. 个人中心页   
 4. 搜索页 (上拉加载更多 x)   
 5. 分类页  
 6. 详情页 (视频播放 x , 视频权限管理 x)
 7. 选择登录页（第三方登陆 x）
 8. 账号密码登录页
 9. 用户信息页
 
