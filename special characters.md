- - 入口：用户下载/导出文件到外部SD卡时
  - Issue： AntennaPod，2385，68（FAT32），1203（exfat），4358（两个文件夹），owncloud 962 （FAT），nextcloud 685，
  - 注意：SD相关的问题好像都不被解决...
  

  
- - 入口：http get post 等

  - Issue： AntennaPod  5416（Use UTF8 PostMethod everywhere），

  - 注意：同pdf里的第一个

    

- - Issue： NextCloud 5371
- 注意：同pdf的8
  



- - 入口：用户搜索中文日文
  - Issue： Signal-Android   8629
  - 注意：同pdf的3

- - 入口：用户输入密码

  - Issue： AppAuth-Android  337（Authorization header）

  - 注意：同pdf的4




- - 入口：用户在银行名称或账号中输入特殊字符，程序崩溃
  - issue: openMF/android-client  1261
  - 注意: repo比较小，没人贴log和修复的commit要自己去找传递和出口



- - 入口：名称带有”-“ 和” “的联系人没有被正确链接
  - issue: Signal-Android  9877
  - 注意:  未被修复，描述了一大堆 但是感觉是个小问题



- - 入口：notification activity read characters in other scripts
  - Issue：apps-android-commons  1766
  
  - 注意： 模式中无法识别的反斜杠转义序列java.util.regex.Pattern.compileImpl



- - 入口：用户点击一个有特殊字符标题的文章时发生 Parsing Error
  - issue: 1Rramp-Android 109
  - 注意: repo的star 太少 不更新了

###### 

- - 入口：对特殊字符按退格键会导致未知字符出现
  - issue: AnySoftKeyboard 1636
  - 注意: 



- - 入口：过快的点击会导致错误的字符

  - issue: AnySoftKeyboard 518

  - 注意: 如果你快速输入‘ mama’ ，你就会得到‘ maá’。 

    

- - issue: mozilla-mobile/fenix  15383（不确定是special character导致的，太新了） ，10737（不是特殊字符），7479（输邮箱@之后出bug），6959（捷克语转译失败），
- 注意: 