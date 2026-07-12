---
title: "創建自己的加密貨幣-ERC20篇"
description: "創建自己的加密貨幣ERC20篇  Create your own cryptocurrency — ERC20  有興趣的人可以來看 Dexon版的虛擬貨幣發行 :  中文版  5分鐘創建專屬於你自己的密碼貨幣 你是否想創建一個具有你名字的貨幣呢？這很困難嗎？medium.comhttps:/..."
slug: "創建自己的加密貨幣-erc20篇"
publishedAt: 2019-01-17
type: blog
locale: zh-TW
draft: true
tags: ["javascript", "ethereum", "wallet", "dexon"]
---

---

### 創建自己的加密貨幣-ERC20篇

Create your own cryptocurrency — ERC20

有興趣的人可以來看 Dexon版的虛擬貨幣發行 :)

中文版

[**5分鐘創建專屬於你自己的密碼貨幣**
*你是否想創建一個具有你名字的貨幣呢？這很困難嗎？*medium.com](https://medium.com/open-coding-style/5%E5%88%86%E9%90%98%E5%89%B5%E5%BB%BA%E5%B0%88%E5%B1%AC%E6%96%BC%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E5%AF%86%E7%A2%BC%E8%B2%A8%E5%B9%A3-daa8a3d6e851)[](https://medium.com/open-coding-style/5%E5%88%86%E9%90%98%E5%89%B5%E5%BB%BA%E5%B0%88%E5%B1%AC%E6%96%BC%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E5%AF%86%E7%A2%BC%E8%B2%A8%E5%B9%A3-daa8a3d6e851)英文版 — [Wayne Chiu](https://medium.com/u/f2be1f70f3b9)

[**010 | Create Your Own Crypto Currency In 5 Minutes| Programmer Explain**
*Have you wonder how to create a crypto currency that has your name on it? Is it difficult?*medium.com](https://medium.com/dexon/010-create-your-own-crypto-currency-in-5-minutes-programmer-explain-e9fd4a95f876)[](https://medium.com/dexon/010-create-your-own-crypto-currency-in-5-minutes-programmer-explain-e9fd4a95f876)---

`必備條件
- [MetaMask 錢包 + 足夠的ETH](https://metamask.io/) 
- Chrome`密碼貨幣規格(Crypto Currency Spec)
- 名稱(Name): PANDA
- 符號(Symbol): PD
- 小數點(Decimal Point): 2
- 代幣總數(Token Amount): 10---

第一步請先將MetaMask的NetWork切換到Ropsten Test Network，並且到[這裡](https://faucet.metamask.io/)領取免費ETH
複製「程式碼([Code](https://gist.github.com/panda850819/4300543031b341b58921aa1b009166ce))」然後將這個貼在「智能合約編輯器([Smart Contract Online Editor](https://remix.ethereum.org/#optimize=false&version=soljson-v0.5.2+commit.1df8f40c.js))」![](https://cdn-images-1.medium.com/max/800/1*PnarD75i0GPE8uO1Yk38Lw.gif)第二步
修改三個參數(Modify three parameters)
姓名(Name) / 符號(Symbol) / 小數點(Decimal)![](https://cdn-images-1.medium.com/max/800/1*GEbRXWRfH5MboiQIV7UfKA.gif)第三步設定代幣總數到1000,然後部署合約到Etheruem測試網路。注意：
1000 with decimal of 2 --> 10.00
每一個單位為0.01 共有1000個 --> 10.00![](https://cdn-images-1.medium.com/max/800/1*FnhdW6Y3n01K3N824Pqs9Q.gif)第四步
- 複製Remix合約地址
- 打開Metamask錢包
- 新增代幣(Add tokens)中貼上合約地址
- 我們將會看到剛剛創建的貨幣 :)![](https://cdn-images-1.medium.com/max/800/1*iQ1Mm7RmFfMCE_NhXYe2uw.gif)小結
在很短的時間,ERC-20標準為所有ERC20 tokens 定義了一個通用的規則列表ERC-20 指定了6個 **functions**

六個方法1. 總供應量(totalSupply)
2. 代幣餘額(balanceOf)
3. 傳送方(transfer)
4. 從哪傳送來(transferFrom)
5. 指定付款方(approve)
6. 檢查token使用者的代幣數量(allowance)兩個事件
1. 傳送(transfer)
2. 指定付款方並記錄(Approval)### Contact Me

Hello, I am Panda .

![](https://cdn-images-1.medium.com/max/800/1*MO9B6CvwbG2STWcdRsvjcg.jpeg)覺得我有哪方面寫得不好/寫得好的部分,歡迎您在下方留言處給我點意見或是透過以下連結找到我!

Thx EveryBody !

- Email — kiss851990@gmail.com
- [GitHub](https://github.com/panda850819)
- [Facebook](https://www.facebook.com/profile.php?id=100023924749209)
- [Twitter](https://twitter.com/PandaZeng1)
- [Linkedin](https://www.linkedin.com/in/wei-chieh-tseng-369303161/)

> 如果大家喜歡這篇文章，歡迎多多分享，底下有個鼓掌(連壓可以至50下哦)也歡迎幫忙多多拍手，底下的LikeCoin也歡迎幫忙讚個 :)，記得要登入likecoin哦，也歡迎各位Donate杯咖啡錢 。

> Ether Address : 0x0CC9E059BFf58a6bBe4b34c81e7f3416Af91091a
