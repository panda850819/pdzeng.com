---
title: "From Zero to know React — Webpack"
description: "From Zero to know React — Webpack  Using Webpack to package out javascript  The wirter uses mac , if you use another os system , you can do another..."
slug: "from-zero-to-know-react-webpack"
publishedAt: 2019-02-15
type: blog
locale: en
draft: true
tags: ["react", "javascript", "tutorial"]
---

---

### From Zero to know React — Webpack

Using Webpack to package out javascript

The wirter uses mac , if you use another os system , you can do another from my tutorial :)

I want to learn Javascript Framework , and how do I choose ?

You can look this page .

[**Angular vs Vue vs React: Which Framework to Choose in 2019**
*As seen from the trends of late 2018, the number of jobs that require a skill set of Angular or React is roughly the…*www.codeinwp.com](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)[](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)And I choose React , because React has a huge number of contributions from the community , and job marketing for React is good !

That’s go to the React’s World .

First , we learn webpack to package our project .

### Env

#### Install node and npm

I am using Homebrew to install npm package .

If you didn’t install homebrew , you can type this code on terminal.

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`Using Homebrew to install node and npm .

$ brew install -g node // if you okay , you can type node -v and npm -v on your terminal !$ node -v 
$ npm -v ### Install Webpack

What is Webpack , you can see their gits .

In short, using Webpack can is to bundle JavaScript files for usage in a browser , and this package is very useful for me !

[**webpack/webpack**
*A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows for loading…*github.com](https://github.com/webpack/webpack)[](https://github.com/webpack/webpack)#### that’s install it :)

$ npm install webpack-cli -g 
// if you okay, you can type webpack -v ### That’s coding

#### Step 1 Create A folder for react

Create a folder on anywhere , and I using instruction on terminal .

$ mkdir hello-react#### Step 2 Init your folder

$ npm init -y #### Step 3 prepare our package

$ npm install webpack --save-dev$ npm install webpack-cli -dev#### Step 4 add content to index.js

console.log('hello react !');#### Step 5 Add content to webpack.config.js

![](https://cdn-images-1.medium.com/max/800/1*ROdqcF4yAZPhaUCwgDeEhg.png)webpack.config.js#### Step 6 package our javascript file

cd our project dir , and type instruction on terminal .

$ webpack -v Step 7 Create our Html (named index.html)

![](https://cdn-images-1.medium.com/max/800/1*hj6BrzS6Bx3XuOQ0NTwe0g.png)index.html#### Final , you can see the output in browser (index.html) !

![](https://cdn-images-1.medium.com/max/800/1*8m_mt8nwzq6jxt7gQfvj9w.png)### Conclusion

Webpack is a good tool for package projects !

and next article will introduce how to use React :)

> If everybody like this article , welcome to share it and clapped (pressure can be up to 50)!

> Weclome to help me like my LikeCoin Button(Logged in LikeCoin) .

> My Ether Address : 0x0CC9E059BFf58a6bBe4b34c81e7f3416Af91091a

### Contact Me

Hello, I am Panda .

> Welcome to give me some comments or find me through the link.

> Thx EveryBody !

- Email — kiss851990@gmail.com
- [GitHub](https://github.com/panda850819)
- [Facebook](https://www.facebook.com/profile.php?id=100023924749209)
- [Twitter](https://twitter.com/PandaZeng1)
