---
title: "Let’s Go Hello World !"
description: "Let’s Go Hello World   golang — HelloWorld  https://cdnimages1.medium.com/max/800/0ucQTB_36z7A4jZQj.jpg Incentitive  Golang has many characteristic..."
slug: "lets-go-hello-world"
publishedAt: 2018-11-07
type: blog
locale: en
draft: true
tags: ["tutorial", "go"]
---

---

### Let’s Go Hello World !

golang — HelloWorld!

![](https://cdn-images-1.medium.com/max/800/0*ucQTB_36z7A4jZQj.jpg)### Incentitive

Golang has many characteristic , i will show it under.

- Similiar C language
- Syntax Simple
- High performance

### Env (MacOS)

#### Install Homebrew

Open your terminal and enter it .

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`#### Install Golang(1.11.2)

$ brew update && brew upgrade
$ brew install go #### Add usr/local/go/bin to PATH Env

```
$ export PATH=$PATH:/usr/local/go/bin
```

#### You can use Go version command

$ go version
$ go env #### Go Env

GOARCH="amd64"
GOBIN=""
GOCACHE="/Users/cuzo/Library/Caches/go-build"
GOEXE=""
GOFLAGS=""
GOHOSTARCH="amd64"
GOHOSTOS="darwin"
GOOS="darwin"
GOPATH="/Users/deweixu/coding/Go/go_path"
GOPROXY=""
GORACE=""
GOROOT="/usr/local/opt/go/libexec"
GOTMPDIR=""
GOTOOLDIR="/usr/local/opt/go/libexec/pkg/tool/darwin_amd64"
GCCGO="gccgo"
CC="clang"
CXX="clang++"
CGO_ENABLED="1"
GOMOD=""
CGO_CFLAGS="-g -O2"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-g -O2"
CGO_FFLAGS="-g -O2"
CGO_LDFLAGS="-g -O2"=
PKG_CONFIG="pkg-config"
GOGCCFLAGS="-fPIC -m64 -pthread -fno-caret-diagnostics -Qunused-arguments -fmessage-length=0 -fdebug-prefix-map=/var/folders/lv/7lxtn1dd75d5kbjmn50ghd080000gn/T/go-build138926056=/tmp/go-build -gno-record-gcc-switches -fno-common"### Hello World !

Create a file hello-world.go

package main

  fmt.Println("Hello world!")
}Open your terminal and enter it .

$ go run hello-world.goHello World!### Conclusion

Golang is very popular in backends recently , and it have a title “High performance” .

So I will learn “Golang”and share my experience .

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

### Reference

- [Go Wiki](https://zh.wikipedia.org/wiki/Go)
- [Homebrew](https://brew.sh/index_zh-tw)
