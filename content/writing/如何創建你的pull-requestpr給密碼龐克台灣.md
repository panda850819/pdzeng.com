---
title: "如何創建你的Pull Request(PR)給密碼龐克台灣"
description: "如何創建你的Pull RequestPR給密碼龐克台灣  PR 即為 Pull Request，在 Github 上必須先複製（Fork）一份原作的專案到你自己的 GitHub 帳號底下。 那自己的 Fork 專案想怎麼玩就怎麼玩，之後你就可以推上自己的 Fork 文件上，發個通知給 Cyph..."
slug: "如何創建你的pull-requestpr給密碼龐克台灣"
publishedAt: 2019-11-19
type: blog
locale: zh-TW
draft: true
tags: []
---

---

### 如何創建你的Pull Request(PR)給密碼龐克台灣

PR 即為 Pull Request，在 Github 上必須先複製（Fork）一份原作的專案到你自己的 GitHub 帳號底下。 那自己的 Fork 專案想怎麼玩就怎麼玩，之後你就可以推上自己的 Fork 文件上，發個通知給 Cypherpunks-core，讓團隊人員來審視這次的 PR 是否 ok，若是 ok 則會將您發起的 PR 合併進團隊文章裡，若不 ok 將會在底下描述為何沒通過的理由。

本文章同步分享至[密碼龐克台灣](https://cypherpunks-core.github.io/news/2019/11/18/%E5%A6%82%E4%BD%95%E5%89%B5%E5%BB%BA%E4%BD%A0%E7%9A%84Pull-Request-%E7%B5%A6%E5%AF%86%E7%A2%BC%E9%BE%90%E5%85%8B%E5%8F%B0%E7%81%A3/)。

![](https://cdn-images-1.medium.com/max/800/0*TMcAfQ5EEtBe3jLp.png)[**如何創建你的Pull Request(PR)給密碼龐克台灣**
*Published: Nov 18, 2019 by Cypherpunks Core PR 即為 Pull Request，在 Github 上必須先複製（Fork）一份原作的專案到你自己的 GitHub 帳號底下。 那自己的 Fork…*cypherpunks-core.github.io](https://cypherpunks-core.github.io/news/2019/11/18/%E5%A6%82%E4%BD%95%E5%89%B5%E5%BB%BA%E4%BD%A0%E7%9A%84Pull-Request-%E7%B5%A6%E5%AF%86%E7%A2%BC%E9%BE%90%E5%85%8B%E5%8F%B0%E7%81%A3/)[](https://cypherpunks-core.github.io/news/2019/11/18/%E5%A6%82%E4%BD%95%E5%89%B5%E5%BB%BA%E4%BD%A0%E7%9A%84Pull-Request-%E7%B5%A6%E5%AF%86%E7%A2%BC%E9%BE%90%E5%85%8B%E5%8F%B0%E7%81%A3/)> [密碼龐克台灣 Github](https://github.com/cypherpunks-core/cypherpunks-core.github.io)

![](https://cdn-images-1.medium.com/max/800/0*4sN2Zve7q17-agte.png)**圖1 密碼龐克台灣官網**### Step1 — 點擊 Fork 將專案複製至自己的遠端儲存庫

![](https://cdn-images-1.medium.com/max/800/0*6lVkJG6KXrQSE7FR.png)**圖2 點擊畫面右上角之 Fork**![](https://cdn-images-1.medium.com/max/800/0*p-pOO6umL4YKD_U2.png)**圖3 即可在自己的遠端資源庫中看到 cypherpunks-core 的專案**以我為例 就會看到 *panda850819 forked from cypherpunks-core* …

### Step2 — Clone 專案/下載專案

![](https://cdn-images-1.medium.com/max/800/0*vUiJZyXFLZIhj-m1.png)**圖4 在自己的專案中按下 Clone 到自己的資料夾**- 可以透過 Download ZIP 至你想要的位置解壓縮它
- 可以透過終端機指令，請先開啟終端機並且輸入底下指令

`$ cd desktop && mkdir cypherpunks-core && cd cypherpunks-core````
// 先將位置移動至桌面並且創立 cypherpunks-core 資料夾
```

```
$ git clone https://github.com/{你的github名稱}/cypherpunks-core.github.io.git
```

```
// 將專案下載至 cypherpunks-core 資料夾
```

### Step3 — 同步 Cypherpunks-core 專案

> *同步遠端專案*

```
$ git remote -v
```

```
// origin https://github.com/panda850819/cypherpunks-core.github.io.git (fetch)
// origin https://github.com/panda850819/cypherpunks-core.github.io.git (push)
```

```
$ git remote add upstream https://github.com/cypherpunks-core/cypherpunks-core.github.io.git
```

```
$ git remote -v 
```

```
// origin	https://github.com/panda850819/cypherpunks-core.github.io.git (fetch)
// origin	https://github.com/panda850819/cypherpunks-core.github.io.git (push)
// upstream	https://github.com/cypherpunks-core/cypherpunks-core.github.io.git (fetch)
// upstream	https://github.com/cypherpunks-core/cypherpunks-core.github.io.git (push)
```

> *同步 fork*

完成操作後，本地專案就會同步 Cypherpunk-core 專案中的變化!

`$ git fetch upstream````
$ git checkout master 
```

```
$ git merge upstream/master
```

### Step4 — 提交 PR 至 Cypherpunks-Core Team

當我們完成修改之後，我們先將修改後的專案推（`push`）到自己的專案中，接下來就是將修改的部分告知 Cypherpunks-Core Team，那就要來提交 PR 拉！

`記得要先將自己 fork 的專案推上去，才能提交 PR 喔！`

> *提交 PR*

![](https://cdn-images-1.medium.com/max/800/0*yhBunOC5P1IzLPlS.png)**圖5 — 提交 PR 至 Cypherpunk-core**

然後可以在上面輸入摘要跟主題，接下來就等著團隊給予回覆囉！

### 小結

透過幾個小小步驟，我們將了解如何 `Fork` 專案以及 `Clone` 專案，並且繳交自己的 `Pull Request` 給 Cypherpunks-Core Team。

> 希望大家能一起為這個社群做貢獻，若有任何想要瞭解的也可以至[官方網站](https://cypherpunks-core.github.io/)、[Facebook](https://www.facebook.com/CypherpunksTW/)觀看我們的文章和我們一起討論，最後 Cypherpunks Taiwan 密碼龐克 為 crypto 文化的聚集地 主題圍繞在 bitcoin 也是開源項目技術探討聚會，廣義的話圍繞在密碼龐克的隱私、加密傳輸、網路自由，若大家對我們有興趣也請不吝嗇的提交 PR 給我們!

### 參考文獻

- [為你自己學Git](https://gitbook.tw/chapters/github/pull-request.html)
- [git如何同步fork專案](https://www.itread01.com/content/1544771540.html?fbclid=IwAR2s4ATwibiiKRS3DYBnNsaNVuQeedOovTKZyGY9iaVqUukTDZppXzGu35w)

> *如果大家喜歡這篇文章，歡迎多多分享，底下有個鼓掌(連壓可以至50下哦)也歡迎幫忙多多拍手，底下的LikeCoin也歡迎幫忙讚個 :)，記得要登入likecoin哦，也歡迎各位Donate杯咖啡錢 。*

> *Ether Address : 0x0CC9E059BFf58a6bBe4b34c81e7f3416Af91091a*
