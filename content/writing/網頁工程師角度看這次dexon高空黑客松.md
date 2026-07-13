---
title: "網頁工程師角度看這次Dexon高空黑客松"
description: "網頁工程師角度看這次Dexon高空黑客松  https://cdnimages1.medium.com/max/800/1WnP7XcKAdkFqb52DgEsLg.pngHello , I am Panda .  我很開心可以和我的夥伴們參與這次的黑客松 ，由於這次的黑客松我們團隊都是第一次參..."
slug: "網頁工程師角度看這次dexon高空黑客松"
publishedAt: 2018-12-17
type: blog
locale: zh-TW
draft: true
tags: ["blockchain", "react", "javascript", "wallet", "dexon"]
---

---

網頁工程師角度看這次Dexon高空黑客松

![](https://cdn-images-1.medium.com/max/800/1*Wn-P7XcKAdkFqb52DgEsLg.png)Hello , I am Panda .

我很開心可以和我的夥伴們參與這次的黑客松 ，由於這次的黑客松我們團隊都是第一次參與。

所以這次的體驗算是還不錯，那就開始介紹下這次的黑客松！

#### 【 新世代底層公鏈 — DEXON 】DAPP高空黑客松

- 12/15–12/16
- 台北101大樓39樓 COBINHOOD 辦公室
- 三餐供應
- Dexon區塊鏈 Testnet Dapp測試開發
- 高擴展性、**低延遲**

這次的黑客松，將18隊團隊拉上了101的39樓，讓各位有滿滿的求生慾望(誤xD

各個組別，都是在這兩天將自己的創意發想，盡自己的能力將最好的成品呈現給各位。

![](https://cdn-images-1.medium.com/max/800/1*aIDOl9p6F0kh1JQqm39dTQ.jpeg)Dexon-Hackthon 合影#### 比賽當下

剛進到這個黑客松比賽，基本上除了[Wayne](https://medium.com/@chaoweichiu)和組員以外，大概都不知道是誰。

有些點蠻有趣的

- 我們整組基本上是不懂智能合約甚至不懂區塊鏈
- 我們成員配置為四個網頁工程師(前後端能力不等)
- 當你可能還在思考該怎麼做的時候又放飯了XD

我在黑客松之前有先去了解一下Dapp的實作大概是怎樣。

#### Dapp和Webapp差別在？

流程大約是以下

> Webapp — API — Database

- 我們看到app會直觀地想到前端UI寫function去接後端開出的api

> Dapp — SmartContract — Blockchain

- Dapp也是前端UI寫function去接SmartContract打回來的值
- SmartContract部署之後，就無法在修改
- 資料庫的資料都會被放在鏈上(這點會讓後端工程師無限confuse)，因為在他的觀念上會一定有需要一個DB只是這個DB換成Blockchain而已。

#### ChainKiller

> 高科大資管系學生(跨四屆組成的團隊)

![](https://cdn-images-1.medium.com/max/800/1*HX-H61rnG5db-2LgRLObOQ.jpeg)基本上我們在開發上，分為前端(版面)和後端(Js Function && Solidity)

其實開發Dapp和製作一般的Web Page / Web App沒有差異很大。

主要在於你的Solidity(Smart Contract語言)撰寫的好不好，會不會讓使用者付過多的Gas Fee和有沒有嚴重性的漏洞。

然而，當然以上都是我個人小小見解，如果有誤請務必來指正我Thx!

#### i— Petition

> 九合一選舉猶如真人版DDOS再臨

創意發想來自這次的九合一選舉，各個投票所的外圍基本上都排很長一條路，不但沒有遞減趨勢甚至還遞增，公投選完一堆人呼喊說：『為什麼不採用電子投票？如果用區塊鏈達成不是很好嗎？』

> 有幾個嚴重的問題存在著

- 人民和政府對於區塊鏈的不信任
- 人民使用區塊鏈上的困難
- 可能會有衍伸的道德問題

現在的人民和政府聽到區塊鏈第一個想到的，基本上是**虛擬貨幣**，而虛擬貨幣人們想到的是ICO和無限的龐氏騙局。

就算人民真的知道區塊鏈的原理和他在做什麼之後，人民也不一定會使用Dapp，分成幾點。

- 錢包安裝上的困難
- 地址私鑰分不清楚
- 每筆應用都需要付gas而confuse

> i-Petition是什麼？

現階段為一個native js 搭配web3.js 開發的一個平台 ！

![](https://cdn-images-1.medium.com/max/800/1*avXbblRTU031G8EwE5B6Hw.jpeg)i-Petition提案page(內容出自[公共政策網路參與平臺](https://join.gov.tw/),個人資訊為虛構)透過區塊鏈**透明且無法竄改資訊**的特性，將公投提案發想透過上鏈來做連署議題，當連署議題到達一個定量，可以讓政府看見有一個提案連署並且這部分連署和提案會透過人臉識別做身份識別，即可防範有一些提案連署是虛構的部分。

當連署完成，也可以透過此平台，做投票的一個動作。

此平台目的為了改善

- 時間(投票排隊過久，且Dexon速度快到不行基本上為即時)
- 空間(人在外地，想投票卻需要從外地趕回來)
- 人力(不需要驗票人員)
- 有效性(人民投票前先作實命認證，透過人臉辨識進行投票)

#### 小結

這次的區塊鏈黑客松，時間真的過得很快，也讓我深刻體悟到『人有無限的可能性』，除了我當時會寫solidity以外，我的團隊成員根本沒人聽過 XD

當時在討論開發時，大家為了前端要用什麼框架也討論了一段時間，畢竟有個點很重要 — 開發上不能只有**你知道**，不然其他的人都會呈現發呆且無法code review的情況發生！

那我們在很多的資源上會看到，撰寫Dapp需要透過front-end framework (react.js node.js) 和 truffle 部署合約之後 使用web3.js 透過metamask去做回調合約的動作，看完這些之後腦中有幾個想法。

- 為什麼要用前端框架？
- 原生開發不行嗎？
- 只有truffle才能部署合約嗎？

但在這次的黑客松，我們也找到了解答。

基本上不論是node架server or Apache / Ngnix…等架server都是沒有問題的，透過前端框架只是因為基本上的頁面都屬前端語言再搭配上會比較順手…等原因。

Truffle是一個很好用的框架，他可以讓你很輕易的部屬你的合約(前提是solidity要寫得好XD)，否則只能透過remix deploy smartcontract 了～

> 如果有想要看其他組別的介紹可以看此篇

[**新世代底層公鏈 DEXON Dapps 高空黑客松**
*在12/15、12/16這兩天，DEXON 舉辦了台灣首場由由底層鏈舉辦的 DAPPS 的黑客松；DEXON 不管是在台灣或是全球都是備受矚目的底層鏈項目，首創的 Blocklattice 的共識演算法，除了解決現在區塊鏈最大的問題 — …*medium.com](https://medium.com/@imjamesccw/%E6%96%B0%E4%B8%96%E4%BB%A3%E5%BA%95%E5%B1%A4%E5%85%AC%E9%8F%88-dexon-dapps-%E9%AB%98%E7%A9%BA%E9%BB%91%E5%AE%A2%E6%9D%BE-c906ea8331aa)[](https://medium.com/@imjamesccw/%E6%96%B0%E4%B8%96%E4%BB%A3%E5%BA%95%E5%B1%A4%E5%85%AC%E9%8F%88-dexon-dapps-%E9%AB%98%E7%A9%BA%E9%BB%91%E5%AE%A2%E6%9D%BE-c906ea8331aa)### Contact Me

Hello, I am Panda .

覺得我有哪方面寫得不好/寫得好的部分,歡迎您在下方留言處給我點意見或是透過以下連結找到我!

Thx EveryBody !

- Email — kiss851990@gmail.com
- [GitHub](https://github.com/panda850819)
- [Facebook](https://www.facebook.com/profile.php?id=100023924749209)
- [Twitter](https://twitter.com/PandaZeng1)
- [Linkedin](https://www.linkedin.com/in/wei-chieh-tseng-369303161/)

---

> 如果大家喜歡這篇文章，歡迎多多分享，底下有個鼓掌(連壓可以至50下哦)也歡迎幫忙多多拍手，底下的LikeCoin也歡迎幫忙讚個 :)，記得要登入likecoin哦，也歡迎各位Donate杯咖啡錢 。

> Ether Address : 0x0CC9E059BFf58a6bBe4b34c81e7f3416Af91091a
