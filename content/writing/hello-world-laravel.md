---
title: "Hello World Laravel !"
description: "Hello World Laravel   PHP Laravel Framework — Hello World  現今大多的公司都會徵求後端工程師/PHP工程師，而他們徵的只是原生的PHP工程師嗎？  No，現在沒學過幾個前端框架node.js/react.js/vue.js/後端框架Ci..."
slug: "hello-world-laravel"
publishedAt: 2018-11-09
type: blog
locale: zh-TW
draft: true
tags: ["react", "javascript", "tutorial", "laravel", "go", "research"]
---

---

### Hello World Laravel !

PHP Laravel Framework — Hello World!

現今大多的公司都會徵求後端工程師/PHP工程師，而他們徵的只是原生的PHP工程師嗎？

No，現在沒學過幾個前端框架(node.js/react.js/vue.js)/後端框架(Ci/Smarty/Laravel)，人家都對你的實力打了一個大大的問號。

說了這麼多，為了可以符合外界需求標準，那我們就從零開始建立我們的第一個Laravel網頁吧！

在做網頁之前，必須要先知道幾點:

- [Laravel](https://laravel.com/)為[MVC框架](https://ithelp.ithome.com.tw/articles/10197959)(Model、View、Controller)
- Laravel為PHP的框架(廢話)

Okay，那我們開始吧！

> 以下示範皆為MacOS,若有Win的問題在歡迎提出!

麻煩請先下載以下程式(程式的安裝就不論述了)，基本上就是找到自己的作業系統一直下一步。

- [XAMPP](https://www.apachefriends.org/zh_tw/download.html)
- [Sublime](https://www.sublimetext.com/3) /[ VsCode](https://code.visualstudio.com/download)
- [Composer](https://getcomposer.org/download/)

> Composer安裝(Win用戶直接下載程式下一步到底就好了，需先裝Xampp)

打開terminal 輸入

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '93b54496392c062774670ac18b134c3b3a95e5a5e5c8f1a9f115f203b75bf9a129d5daa8ba6a13e2cc8a1da0806388a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"在terminal輸入

composer -v![](https://cdn-images-1.medium.com/max/800/1*-W65KHbJzl0LgHdHQV6BgA.png)Composer 圖示出來，表示成功了！> 將composer設置為全域指令

sudo mv composer.phar /usr/local/bin/composer> PHP設置於PATH內

打開Terminal輸入以下即可。

PATH=”/opt/lampp/bin:$PATH”> 安裝Laravel

請先將XAMPP中的Apache、MySQL打開以便後續安裝！

cd /Applications/XAMPP/htdocs```
composer create-project --prefer-dist laravel/laravel HelloWorld
```

![](https://cdn-images-1.medium.com/max/800/1*jWUkAy9tmRZEW4wVsztnBQ.png)需要安裝一段時間，可以先泡杯咖啡在回來看安裝完後

![](https://cdn-images-1.medium.com/max/800/1*OV-Rl7AVTYVdE6puMRO9QQ.png)看到successfully就成功拉!接下來在要將資料夾權限開到最大，Terminal輸入

cd HelloWorldchmod -R 777 storage 
chmod -R 777 bootstrap/cache最後在terminal輸入

php artisan serve打開瀏覽器，在網址列輸入

localhost:8000 or 127.0.0.1:8000![](https://cdn-images-1.medium.com/max/800/1*FqmN_DBuSXDPlIs9xP-ALQ.png)這下就大功告成拉!!!!

可是HelloWorld在哪裡呢？

> Laravle — HelloWorld

打開sublime > File > Open >HelloWorld 然後按下Open！

按下command+P 輸入welcome.blade.php 往下滑會看到

![](https://cdn-images-1.medium.com/max/800/1*hajNjz7xszkvhlWIZXKYxQ.png)看到我們的Title為Laravel 我們將它改成HelloWorld!!!![](https://cdn-images-1.medium.com/max/800/1*pqjTFWRT4hh8BBShSwglcA.png)修改完成後，我們回到localhost:8000頁面按下重新整理![](https://cdn-images-1.medium.com/max/800/1*CUf8v4P-kxkL-afunHLe2g.png)我們的HelloWorld就完成拉!### Conclusion

最近時間多了一點，除了論文學習上，我覺得前後端能力也是不可或缺的!

之前是PHP原生開發，趁現在還有空，把我的後端能力補一補!

現在有前端框架、後端框架、Golang、

### Contact Me

Hello, I am Panda .

覺得我有哪方面寫得不好/寫得好的部分,歡迎您在下方留言處給我點意見或是透過以下連結找到我!

Thx EveryBody !

- Email — kiss851990@gmail.com
- [GitHub](https://github.com/panda850819)
- [Facebook](https://www.facebook.com/profile.php?id=100023924749209)
- [Twitter](https://twitter.com/PandaZeng1)

---

> 如果大家喜歡這篇文章，歡迎多多分享，底下有個鼓掌(連壓可以至50下哦)也歡迎幫忙多多拍手，底下的LikeCoin也歡迎幫忙讚個 :)，記得要登入likecoin哦，也歡迎各位Donate杯咖啡錢 。

> Ether Address : 0x0CC9E059BFf58a6bBe4b34c81e7f3416Af91091a

### Reference

- [XAMPP建置Laravle環境](https://ithelp.ithome.com.tw/articles/10193428)
- [Laravel Doc](https://laravel.com/docs/5.7)
- [Composer](https://getcomposer.org/download/)
