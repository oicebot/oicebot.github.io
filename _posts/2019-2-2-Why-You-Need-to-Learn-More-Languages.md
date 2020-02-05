---
layout: post
title: 学几个不同的编程语言有啥好处？
tags: Udacity Translate
from: https://blog.usejournal.com/why-you-need-to-learn-more-programming-languages-9160d609eac3
author: Akshat Giri
thumb: "/img/20190202/thumb.jpg"
excerpt: "你可能会问，我为什么要学习这么多语言？我觉得，这是因为我很容易被诱惑，每当我看到其他语言的一个很酷的功能，我就忍不住想学习它..."
---

<img src="{{site.cdn}}/img/20190202/001.jpg" alt="" />


## 对编程语言，我从来就不是“从一而终”的。

我的编程生涯，到现在差不多有 4 年了。一开始，我开始用 C# 做游戏开发，然后转到用 python 做机器学习。我学过用 Javascript 和 Typescript 做前端，然后为了编写移动应用程序，我又学习了 Ionic、React 和 React Native。为了打造更高性能的后端，Go 是我最佳的选择。当 Flutter 问世时，我又学会了 Dart，并用它制作更多的移动应用。我为一些大学课程学习了 Java，在 Facebook 工作的时候还学了 PHP。

我并没有声称我精通上面每一种语言，只是我对某些语言/框架的经验会比其他语言更多一点。你可能会问，我为什么要学习这么多语言？我觉得，这是因为我很容易被诱惑，每当我看到其他语言的一个很酷的功能，我就忍不住想学习它。

<img src="{{site.cdn}}/img/20190202/002.jpg" alt="" />

<span style="color:red">但为什么我要叫你也这样做呢？因为只有你知道每一种工具是什么，以及什么工具擅长做什么事情，不然就无法选择合适的工具。</span>俗话说，磨刀不误砍柴工，一件合适的工具或武器，能帮你赢得大部分的战斗。我个人也觉得，它们在我的生活中发挥了很大的作用。为问题选择正确的语言大大减少了解决问题所需的工作量。

## 解决我的“第一世界问题”

我想举一个我自己的简单例子，来说明一下“选择正确的语言”能节省下多少时间。当然，你完全可以跳过这一段，直接看最后的**划重点**部分。 

几个月前，我一直在挑选蓝牙耳机，最后我决定用 AirPods。这可以说是 Apple 发布的最好的科技产品了。在此之前，我尝试了很多其他蓝牙耳机，但没有一个像它一样方便。

但不管怎么样，我遇到了一点问题，也就是我使用 Windows 笔记本电脑和 Android 手机（供个人使用），而 AirPods 会自动连接到我的手机，却不会自动连接我的笔记本电脑。我必须每次都进行设置并手动连接到 AirPods。这是一个痛苦的过程，因为我需要经常在手机和笔记本电脑之间切换。我希望有一个简单方便的按钮，点一下就让 AirPods 连接到我的笔记本电脑。

我的第一个想法是用 python，因为我确信我能找到一个现成的 python 库，让我可以控制我电脑的蓝牙设置。然而，我失败了，并没有这样的第三方库。而下一个明显的选项是 Node.js。果不其然，很快就我找到了一个 Javascript 库来控制笔记本电脑上的蓝牙。通过运行这个简单的 Nodejs 脚本，我能够让笔记本立即连接到 AirPods 上：

```javascript
// App.js
const device = new bluetooth.DeviceINQ();

const airpodsAddress = "18:81:0E:B2:6B:A6"
const airpodsName = "Akshat's Airpods";

device.findSerialPortChannel(airpodsAddress, function (channel) {

    // make bluetooth connect to remote device
    bluetooth.connect(airpodsAddress, channel, function (err, connection) {
        if (err) return console.error(err);

        console.log('YAY! Airpods Connected');
        // Don't need a communication stream between the two 
        // so let's just exit the stream.  
        setTimeout(() => process.exit(0), 5000);
        
    });
});
```

现在我需要在屏幕上弄一个方便点击的按钮，以便运行上面的代码。我以为我可以简单地把那个脚本文件放在任务栏上，但是 Windows 不让。我试着写了一个 bat 批处理脚本，想包装一下放进任务栏，然而我失败了。于是，我就想，该用什么语言打包一个 .exe 可执行文件，以便把它放到任务栏上？这时 Golang 进入了我的视线。于是，我写了几行简单的 go 代码，用它运行我的 nodejs 脚本：

```golang
// main.go
package main

import (
	"fmt"
	"os/exec"
)

func main() {
	output, err := exec.Command("npm", "start").CombinedOutput()

	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(string(output))
}
```

接下来，我把它编译成 .exe 文件，并在桌面上为它创建了一个快捷方式，并给了它这个可爱的图标。 

<img src="{{site.cdn}}/img/20190202/logo.jpg" alt="" />

最后，我把快捷方式放在我的任务栏上。哈哈！搞定！我只要点击这个按钮，就可以非常快速地连接到我的 AirPods 啦。

<img src="{{site.cdn}}/img/20190202/003.gif" alt="图很大，在加载…" />

没错，我知道用 C# 也可以得到相同的结果。但我实在不想在我的笔记本电脑上安装 Visual Studio 这样臃肿的怪胎。当然，我还可以用 nexe 之类的其他工具将 Nodejs 应用程序打包到 exe 中，但这并没有什么真正的意义。

没错，这只是一个非常简单的例子。我只是希望说明，了解不同的工具将如何让你能轻松地解决问题。你看，要是我所知道的只有 Python、Java 或 Go 这一种语言，要完成上面这些事情将会相当困难。

此外，在日常的工作与学习中，有许多事情都不是只懂一种语言就能搞得定的。

比如，为了整理展示自己的作品，你可能需要编写一个自己的网站或是网页应用程序。诚然，你可以纯用 Flask + Python 写出一个后端（这还是不把 HTML 和 CSS 算成语言的情况），但你还需要使用 JavaScript 来丰富网站的前端界面，动态加载一些元素，完成一些只需要在前端执行的功能。

又比如，需要用 Python 完成一些任务，但又嫌 Python 速度慢，这时候会 C 语言的大佬就展现出自己的优势了：你可以把许多常用的函数和计算模块用 C 语言编写，在 Python 里直接调用编译好的模块，能给你带来可读性和高效性的完美结合。

绕了这么久，大家想要的重点来啦：

## 划个重点

1. 我个人的感受是，学习不同的语言真的很有趣。此外，它还可以扩展你的视野，让你置身于舒适区之外，保持不断汲取新知识的动力。
2. 学习更多语言的另一个原因是，这能训练你习惯跳出一种语言或范式的框架来思考问题。面向对象编程很棒，但你也该了解函数式编程或面向过程编程。一旦你习惯于跳出特定语言的框架之外来思考编程问题，你将不再受限于它。
3. 学习第一门编程语言总是比较难的，而第二语言的难度将会更大，但一旦你掌握之后，这就只是小菜一碟而已。不同语言之间的区别也不过就是些语法变化和特性的区别。掌握了这些，你就能逐步了解该语言的特定库和框架，熟悉它所面向的方向。
4. 在我看来，学习更多语言的还有另一个令人信服的理由，那就是 WASM。Web Assembly 让你可以在浏览器上运行你想要的任何语言，这意味着，如果你掌握了更快速的语言（比如 C++ ），你就可以充分利用这一速度优势，并创建出像https://squoosh.app/ 这样厉害的东西。

## 结论
* 如果你已经掌握了 Javascript 或 python，我强烈建议你学习一门底层一点的编程语言。你当然可以选 C 或 C++，但个人建议你试试 Golang。用 Go 语言，你可以轻松获得类似 C++ 的速度，也能少受许多 C 系列给人带来的挫折。
* 对于已经掌握一门底层语言的程序员，请尝试用用 python 或 Javascript。如果你还没有尝试过这些语言，那你真的错过了太多生命中的美好。Python 代码读起来就像伪代码，而现在 Javascript 基本上已经是无处不在了。不仅如此，这两种语言都可以和你已经习惯的底层语言协作使用。你可以为 Nodejs 和 Python 编写 C++ 模块。相信我，它能有效提高你的生活质量。

我希望，你现在已经跃跃欲试，想要“勾搭”一些新的编程语言，获得一些全新的令人兴奋的体验了吧？

如果你已经学会了两种相当不同的语言，你现在感觉如何？这对你的工作和生活带来了什么样的助益？欢迎大家在下面留言吐槽！


_（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 译者：欧剃 转载请保留此信息）_
