---
layout: post
title: "Benchmarking TensorFlow Lite on the New Raspberry Pi 4, Model B"
tags: udacity translate python Machine-Learning
author: Alasdair Allan
from: https://blog.hackster.io/benchmarking-tensorflow-lite-on-the-new-raspberry-pi-4-model-b-3fd859d05b98
excerpt: "How much faster is the new Raspberry Pi? It’s a lot faster."
thumb: "/img/20190730/thumb.png"
---

前不久，树莓派基金会又发布了最新的 Raspberry Pi 4 代单片机电脑，不但大幅提升了芯片运算能力，可选内存也增加到了最多 4GB，让这张小卡片拥有了类似 PC 级别的性能。而 35～55 美元的超低价格（国内代购的零售价一般在 200 ～ 400 元人民币左右，也算能接受得了啦），让树莓派一直以来都是学校和计算机爱好者手中的“神器”。

Raspberry Pi 4B 型硬件参数：

* 1.5GHz 四核 64 位 ARM Cortex-A72 芯片
* 可选 1 / 2 / 4GB LPDDR4 SDRAM 内存
* 全双工千兆以太网接口
* 板载双频802.11ac无线网络
* 板载蓝牙5.0
* 带有两个 USB 3.0 和两个 USB 2.0 接口
* 2 个 micro HDMI 输出，支持同时驱动双显示器，分辨率高达 4K
* VideoCore VI 显示芯片，支持 OpenGL ES 3.x.
* 支持 HEVC 视频 4Kp60 硬解码
* USB Type-C 供电接口

不仅如此，最近还有大佬成功在树莓派 4 上跑起了 TensorFlow，搞了一把机器学习模型的性能评测，真的这么神吗！

让我们一起看看吧！

## 太长不看版

Using TensorFlow Lite we see a considerable speed increase when compared with the original results from our previous benchmarks using full TensorFlow.
We see between a ×3 and ×4 increase in inferencing speed between our original TensorFlow benchmark, and the new results using TensorFlow Lite. 

1. 用上了最新的 TensorFlow Lite 之后，跑同一个数据集的速度达到了之前用 TensorFlow 时的 3 至 4 倍。

This decrease in inferencing time brings the Raspberry Pi 4 directly into competition with the NVIDIA Jetson Nano.

2. 树莓派 4B 处理机器学习任务的算力超过树莓派 3B+ 的4倍，已经能和 NVIDIA Jetson Nano 有的一拼了。

<img src="/img/20190730/001.jpg"><br><small>
新树莓派 4b 的机器学习任务跑分结果。单位：毫秒</small>

Benchmarking results in milli-seconds for MobileNet v1 SSD 0.75 depth model and the MobileNet v2 SSD model, both models trained using the Common Objects in Context (COCO) dataset with an input size of 300×300, for the new Raspberry Pi 4, Model B, running Tensor Flow (blue) and TensorFlow Lite (green).

3. 在新树莓派 4b 上分别使用 MobileNet v1 SSD 0.75 深度模型，以及 MobileNet v2 SSD 模型进行基准测试，都使用了 Common Objects in Context (COCO) 数据集进行训练，输入图像分辨率都是 300x300，使用 TensorFlow 时运算时间分别为 263.9 毫秒和 483.5 毫秒，而使用 TensorFlow Lite 时的运算时间为 82.7 毫秒和 122.6 毫秒。

## 第一部分 跑分测试细节

### 设备、模型和数据集

Benchmarking was done using both TensorFlow and TensorFlow Lite on a Raspberry Pi 3, Model B+, and on the 4GB version of the Raspberry Pi 4, Model B. Inferencing was carried out with the MobileNet v2 SSD and MobileNet v1 0.75 depth SSD models, both models trained on the Common Objects in Context (COCO) dataset, converted to TensorFlow Lite.

我们在树莓派 3b+、树莓派 4B（4G内存版）以及一些其他设备上都进行了测试，测试的模型均为 MobileNet v2 SSD 以及 MobileNet v1 0.75 深度 SSD 模型，且都使用 COCO 数据集进行了训练。

These results can now be compared to our previously obtained benchmark results on the following platforms; the Coral Dev Board, the NVIDIA Jetson Nano, the Coral USB Accelerator with a Raspberry Pi, the original Movidus Neural Compute Stick with a Raspberry Pi, and the second generation Intel Neural Compute Stick 2 again with a Raspberry Pi. Comparison was also made with the Xnor.ai AI2GO platform using their proprietary binary convolution network.

我们使用的其他设备包括 Coral 开发板、NVIDIA Jetson Nano，分别加挂了 Coral USB 加速器、初代 Movidus 神经网络计算棒、二代英特尔神经网络计算棒的树莓派，以及一台 MacBook Pro。此外，我们还加入了在树莓派上运行 Xnor.ai 的 AI2GO 平台，使用的是 Xnor 的私有卷积网络程序。

> ℹ️ Information The Raspberry Pi 3, Model B+, has no USB 3 support, so no results are available for the Coral USB Accelerator using USB on the Raspberry Pi 3. While results for both generations of the Movidius-based Compute Stick, the Movidus Neural Compute Stick and the Intel Neural Compute Stick 2 are not available on the Raspberry Pi 4, Model B, as the Intel OpenVINO framework does not yet work with Python 3.7. You should not expect official support for the Intel Neural Compute Stick on the Raspberry Pi 4 in the near term.

> ℹ️ 附注：树莓派 3B+ 型没有 USB 3 接口，所以无法使用 USB 3 版本的 Coral USB 加速器。由于 Intel OpenVINO 不支持 Python 3.7，所以初代 Movidus 神经网络计算棒和二代英特尔神经网络计算棒在树莓派 4 上还无法正常工作。但随着新设备的普及，近期内官方可能就会推出针对树莓派 4 的适配了。

在纯靠树莓派算力的版本中，我们还进行了 TensorFlow 和 TensorFlow Lite（模型经过转换）的对比测试。

A single 3888×2916 pixel test image was used containing two recognisable objects in the frame, a banana🍌 and an apple🍎. The image was resized down to 300×300 pixels before presenting it to the model, and each model was run 10,000 times before an average inferencing time was taken. The first inferencing run, which takes longer due to loading overheads, was discarded.

机器学习任务方面，我准备了一张分辨率为 3888x2916 的待识别图片，图片中包含两个可识别的对象：一个香蕉🍌，一个苹果🍎。在喂给模型之前，图片将会被缩小到 300x300 像素，每个模型将会执行一万次，抛弃第一次的处理结果（可能存在因为载入瓶颈造成的延迟），将剩下的处理结果取平均速度。

<img src="/img/20190730/002.jpg"><br><small>
程序要识别的就是这样张图</small>

### 详细数据

<img src="/img/20190730/003.jpg"><br><small>
Benchmarking results in milli-seconds for MobileNet v1 SSD 0.75 depth model and the MobileNet v2 SSD model, both trained using the Common Objects in Context (COCO) dataset with an input size of 300×300. Results for the Xnor.ai AI2GO platform are using their proprietary binary convolution network.
测试结果，单位：毫秒。其中在 Xnor.ai 的 AI2GO 平台上运行的程序使用的是他们私有的卷积网络程序。
</small>

> ⚠️Warning As per our previous results with the Raspberry Pi 4 the addition of a small fan, driven from the Raspberry Pi’s own GPIO headers, was need to keep the CPU temperature stable and prevent thermal throttling of the CPU.
> ⚠️ 注意：根据我们之前对树莓派 4 的评测结果，你需要在板子上添加一个由树莓派 GPIO 口驱动的散热风扇，以便保持 CPU 的温度稳定，避免因为高温造成 CPU 保护性降速。

Our initial TensorFlow results on the new Raspberry Pi 4 showed a ×2 increase in performance. This is roughly in line with expectations as with twice the NEON capacity more than the Raspberry Pi 3, we would expect this order of speedup in performance for well-written NEON kernels.

一开始，在 TensorFlow 测试中，我们发现树莓派 4 的处理速度比上代提升了大约一倍，这差不多算是因为新的 ARM Cortex-A72 处理器对 NEON 指令集的处理容量比上代多了将近一倍。也就是说，如果能用上效率更高的 NEON 内核代码，这个速度还有提升的空间。

However we see a significantly larger speed increase with TensorFlow Lite, with a ×3 to ×4 increase in inferencing speeds between our TensorFlow benchmark, and the new results using TensorFlow Lite. This result is much larger than we saw when a similar comparison was made with the Raspberry Pi 3, where we saw only a ×2 increase in performance between the two packages. We are therefore seeing almost double the expected speed gain by using TensorFlow Lite over TensorFlow on the Raspberry Pi 4.

接着，我们发现在使用 TensorFlow Lite 的时候，整体速度有了相当显著的提升，总速度达到了 TensorFlow 测试的 3～4 倍。有趣的是，在树莓派 3 上，TensorFlow Lite 的提升则相对有限，只能达到原来的 2 倍上下。

<img src="/img/20190730/004.jpg"><br><small>
各设备运算时间横向对比。单位：毫秒</small>

Inferencing time in milli-seconds for the for MobileNet v1 SSD 0.75 depth model (left hand bars) and the MobileNet v2 SSD model (right hand bars), both trained using the Common Objects in Context (COCO) dataset with an input size of 300×300. The (single) bars for the Xnor AI2GO platform use their proprietary binary weight model. All measurements on the Raspberry Pi 3, Model B+, are shown in yellow, measurements on the Raspberry Pi 4, Model B, are shown in red. Other stand-alone platforms that are not dependent on the Raspberry Pi are shown in green.

上图是各设备运算时间的横向对比。每一个设备有两组数据，左侧的是用 MobileNet v1 SSD 0.75 深度模型，右侧的是 MobileNet v2 SSD 模型。Xnor AI2GO 平台的两个设备（树莓派3/4）都只使用 Xnor 私有的权重模型。Raspberry Pi 3B+ 的所有测试结果均以黄色显示，Raspberry Pi 4B 上的测试结果以红色显示。其他不依赖于 Raspberry Pi 的独立平台以绿色显示。

This decrease in inferencing time brings the Raspberry Pi 4 directly into competition with both the NVIDIA Jetson Nano and the Movidius-based hardware from Intel.

拜 TensorFlow Lite 所赐，树莓派 4 的运算时间已经减少到能正面刚 NVIDIA Jetson Nano 和英特尔 Movidius 系列硬件的程度了。

> ⚠️Warning It is probable that the Movidius Neural Compute Stick and the Intel Neural Compute Stick 2 will show better performance when connected to the Raspberry Pi 4 using USB 3 rather than USB 2. However until the OpenVINO framework supports Python 3.7 it is impossible to know for certain. Right now the Movidius-based hardware from Intel is **not usable** with the Rapsberry Pi 4.

> ⚠️ 注意：Movidius 神经网络计算棒和英特尔神经网络计算棒 2 代因为树莓派 3 没有 USB 3 的接口，所以只能在 USB 2 下工作，所以速度受到了一定的限制。然而，<span class="hl">目前这两个设备无法在树莓派 4 上正常工作</span>，所以对应的测试无法进行。也许这要等 OpenVINO 框架支持 Python 3.7 之后了吧。

If you were looking at purchasing the NVIDIA Jetson Nano to use for machine learning, there now seems no reason to do so as the Raspberry Pi 4 performs at a similar level, but for half the cost.

如果你曾经准备购买 NVIDIA Jetson Nano 来进行机器学习工作，我个人觉得你不妨看看价格只有它一半的树莓派 4 😊。

### 结果汇总

The performance increase seen with the new Raspberry Pi 4 makes it a very competitive platform for machine learning inferencing at the edge. The increase in inferencing performance we see with TensorFlow Lite on the Raspberry Pi 4 puts it directly into competition with the NVIDIA Jetson Nano and the Intel Neural Compute Stick 2.

Priced at $35 for the 1GB version, and $55 for the 4GB version, the new Raspberry Pi 4 is significantly cheaper than both the NVIDIA Jetson Nano, and the Intel Neural Compute Stick 2, both of which cost $99. Especially considering that, for the Compute Stick, this cost is in addition to the cost of the Raspberry Pi itself which therefore comes to a total of $134.

While the Coral Dev Board from Google is still the ‘best in class’ board, the addition on USB 3 to the Raspberry Pi 4 means that it is now also price competitive with the Dev Board. Priced at $35 the 1GB version of the new Raspberry Pi 4 is significantly cheaper than the $149 Coral Dev Board. Adding an additional $74.99 for the Coral USB Accelerator to the price of the Raspberry Pi means that you can outperform the previous ‘best in class’ board for a cost of $109.99. That’s a saving of $39.01 over the cost of the Coral Dev Board, for better performance.

## 第二部分 测试方法与代码

### 在树莓派上安装 TensorFlow Lite

Installing TensorFlow on the Raspberry Pi used to be a difficult process, however towards the middle of last year everything became a lot easier. Fortunately, thanks to the community, installing TensorFlow Lite isn’t that much harder. We aren’t going to have to resort to building it from source.

<img src="/img/20190730/005.jpg"><br><small>
The new Raspberry Pi 4.</small>

Go ahead and download the latest release of Raspbian Lite and set up your Raspberry Pi. Unless you’re using wired networking, or have a display and keyboard attached to the Raspberry Pi, at a minimum you’ll need to put the Raspberry Pi on to your wireless network, and enable SSH.

Once you’ve set up your Raspberry Pi go ahead and power it on, and then open up a Terminal window on your laptop and SSH into the Raspberry Pi.

```
% ssh pi@raspberrypi.local
```

Fortunately while the official TensorFlow binary distribution does not include a build of TensorFlow Lite, there is an unofficial distribution which does, and that means we don’t have to resort to building and install from source.

Once you’re logged into your Raspberry Pi go ahead and update and install our build tools, before going ahead and install TensorFlow Lite.

```
$ sudo apt-get update
$ sudo apt-get install build-essential
$ sudo apt-get install git
```

> ℹ️ Information If you’re working on an existing installation, and you already have the official version of TensorFlow installed, you should make sure you have uninstalled it first, by doing `sudo pip3 uninstall tensorflow`.

While there isn’t yet a build of TensorFlow Lite specifically for Python 3.7, we can make use of one of the Python 3.5 builds. However, you’ll need to make some tweaks before installation.

```
$ sudo apt-get install libatlas-base-dev
$ sudo apt-get install python3-pip
$ git clone https://github.com/PINTO0309/Tensorflow-bin.git
$ cd Tensorflow-bin
$ mv tensorflow-1.14.0-cp35-cp35m-linux_armv7l.whl tensorflow-1.14.0-cp37-cp37m-linux_armv7l.whl
$ pip3 install --upgrade setuptools
$ pip3 install tensorflow-1.14.0-cp37-cp37m-linux_armv7l.whl
```

It’ll take some time to install. So you might want to take a break and get some coffee. Once it has finished installing you can test the installation as follows.

```
$ python3 -c "import tensorflow as tf; tf.enable_eager_execution(); print(tf.reduce_sum(tf.random_normal([1000, 1000])))"
```

> ⚠️Warning You will receive ‘Runtime Warnings’ when you `import tensorflow`. These aren’t a concern and just indicate that the wheel was built under Python 3.5 and you’re using it with Python 3.7. You can safely ignore the warnings.

Now TensorFlow has been successfully installed we need to install OpenCV, the Pillow fork of the Python Imaging Library (PIL) and the NumPy library.

```
$ sudo apt-get install python3-opencv
$ pip3 install Pillow
$ pip3 install numpy
```

We should now be ready to run our benchmarking scripts.

### 测试代码及资料下载


The code from our previous benchmarks was reused unchanged.

> 链接: https://pan.baidu.com/s/1DzUpkF89bYGccMXExXJMNQ 提取码: e7fr 


## 结语

Comparing these platforms on an even footing continues to be difficult. But it is clear that the new Raspberry Pi 4 is a solid platform for machine learning inferencing at the edge.

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) ，译者：欧剃 转载请保留此信息）_