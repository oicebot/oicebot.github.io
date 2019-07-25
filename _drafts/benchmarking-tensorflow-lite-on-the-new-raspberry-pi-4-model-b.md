---
layout: post
title: "Benchmarking TensorFlow Lite on the New Raspberry Pi 4, Model B"
tags: udacity translate python Machine-Learning
author: Alasdair Allan
from: https://blog.hackster.io/benchmarking-tensorflow-lite-on-the-new-raspberry-pi-4-model-b-3fd859d05b98
excerpt: "How much faster is the new Raspberry Pi? It’s a lot faster."
thumb: "/img/20190730/thumb.png"
---

Raspberry Pi 4型号B.

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



## Headline Results From Benchmarking

Using TensorFlow Lite we see a considerable speed increase when compared with the original results from our previous benchmarks using full TensorFlow.

<img src="/img/20190730/001.jpg"><br><small>
Benchmarking results in milli-seconds for MobileNet v1 SSD 0.75 depth model and the MobileNet v2 SSD model, both models trained using the Common Objects in Context (COCO) dataset with an input size of 300×300, for the new Raspberry Pi 4, Model B, running Tensor Flow (blue) and TensorFlow Lite (green).</small>

We see between a ×3 and ×4 increase in inferencing speed between our original TensorFlow benchmark, and the new results using TensorFlow Lite. This decrease in inferencing time brings the Raspberry Pi 4 directly into competition with the NVIDIA Jetson Nano.

## Part I — Benchmarking

### A More Detailed Analysis of the Results

Benchmarking was done using both TensorFlow and TensorFlow Lite on a Raspberry Pi 3, Model B+, and on the 4GB version of the Raspberry Pi 4, Model B. Inferencing was carried out with the MobileNet v2 SSD and MobileNet v1 0.75 depth SSD models, both models trained on the Common Objects in Context (COCO) dataset, converted to TensorFlow Lite.

A single 3888×2916 pixel test image was used containing two recognisable objects in the frame, a banana🍌 and an apple🍎. The image was resized down to 300×300 pixels before presenting it to the model, and each model was run 10,000 times before an average inferencing time was taken. The first inferencing run, which takes longer due to loading overheads, was discarded.

<img src="/img/20190730/002.jpg"><br><small>
Benchmarking results in milli-seconds for MobileNet v1 SSD 0.75 depth model and the MobileNet v2 SSD model, both trained using the Common Objects in Context (COCO) dataset with an input size of 300×300. Results for the Xnor.ai AI2GO platform are using their proprietary binary convolution network.</small>

> ⚠️Warning As per our previous results with the Raspberry Pi 4 the addition of a small fan, driven from the Raspberry Pi’s own GPIO headers, was need to keep the CPU temperature stable and prevent thermal throttling of the CPU.

These results can now be compared to our previously obtained benchmark results on the following platforms; the Coral Dev Board, the NVIDIA Jetson Nano, the Coral USB Accelerator with a Raspberry Pi, the original Movidus Neural Compute Stick with a Raspberry Pi, and the second generation Intel Neural Compute Stick 2 again with a Raspberry Pi. Comparison was also made with the Xnor.ai AI2GO platform using their proprietary binary convolution network.

> ℹ️ Information The Raspberry Pi 3, Model B+, has no USB 3 support, so no results are available for the Coral USB Accelerator using USB on the Raspberry Pi 3. While results for both generations of the Movidius-based Compute Stick, the Movidus Neural Compute Stick and the Intel Neural Compute Stick 2 are not available on the Raspberry Pi 4, Model B, as the Intel OpenVINO framework does not yet work with Python 3.7. You should not expect official support for the Intel Neural Compute Stick on the Raspberry Pi 4 in the near term.

Our initial TensorFlow results on the new Raspberry Pi 4 showed a ×2 increase in performance. This is roughly in line with expectations as with twice the NEON capacity more than the Raspberry Pi 3, we would expect this order of speedup in performance for well-written NEON kernels.

However we see a significantly larger speed increase with TensorFlow Lite, with a ×3 to ×4 increase in inferencing speeds between our TensorFlow benchmark, and the new results using TensorFlow Lite. This result is much larger than we saw when a similar comparison was made with the Raspberry Pi 3, where we saw only a ×2 increase in performance between the two packages. We are therefore seeing almost double the expected speed gain by using TensorFlow Lite over TensorFlow on the Raspberry Pi 4.

<img src="/img/20190730/003.jpg"><br><small>
Inferencing time in milli-seconds for the for MobileNet v1 SSD 0.75 depth model (left hand bars) and the MobileNet v2 SSD model (right hand bars), both trained using the Common Objects in Context (COCO) dataset with an input size of 300×300. The (single) bars for the Xnor AI2GO platform use their proprietary binary weight model. All measurements on the Raspberry Pi 3, Model B+, are shown in yellow, measurements on the Raspberry Pi 4, Model B, are shown in red. Other stand-alone platforms that are not dependent on the Raspberry Pi are shown in green.</small>

This decrease in inferencing time brings the Raspberry Pi 4 directly into competition with both the NVIDIA Jetson Nano and the Movidius-based hardware from Intel.

> ⚠️Warning It is probable that the Movidius Neural Compute Stick and the Intel Neural Compute Stick 2 will show better performance when connected to the Raspberry Pi 4 using USB 3 rather than USB 2. However until the OpenVINO framework supports Python 3.7 it is impossible to know for certain. Right now the Movidius-based hardware from Intel is **not usable** with the Rapsberry Pi 4.

If you were looking at purchasing the NVIDIA Jetson Nano to use for machine learning, there now seems no reason to do so as the Raspberry Pi 4 performs at a similar level, but for half the cost.

### Summary
The performance increase seen with the new Raspberry Pi 4 makes it a very competitive platform for machine learning inferencing at the edge. The increase in inferencing performance we see with TensorFlow Lite on the Raspberry Pi 4 puts it directly into competition with the NVIDIA Jetson Nano and the Intel Neural Compute Stick 2.

Priced at $35 for the 1GB version, and $55 for the 4GB version, the new Raspberry Pi 4 is significantly cheaper than both the NVIDIA Jetson Nano, and the Intel Neural Compute Stick 2, both of which cost $99. Especially considering that, for the Compute Stick, this cost is in addition to the cost of the Raspberry Pi itself which therefore comes to a total of $134.

While the Coral Dev Board from Google is still the ‘best in class’ board, the addition on USB 3 to the Raspberry Pi 4 means that it is now also price competitive with the Dev Board. Priced at $35 the 1GB version of the new Raspberry Pi 4 is significantly cheaper than the $149 Coral Dev Board. Adding an additional $74.99 for the Coral USB Accelerator to the price of the Raspberry Pi means that you can outperform the previous ‘best in class’ board for a cost of $109.99. That’s a saving of $39.01 over the cost of the Coral Dev Board, for better performance.

## Part II — Methodology

### Installing TensorFlow Lite on the Raspberry Pi

Installing TensorFlow on the Raspberry Pi used to be a difficult process, however towards the middle of last year everything became a lot easier. Fortunately, thanks to the community, installing TensorFlow Lite isn’t that much harder. We aren’t going to have to resort to building it from source.

<img src="/img/20190730/003.jpg"><br><small>
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

### The Benchmarking Code


The code from our previous benchmarks was reused unchanged.

> 链接: https://pan.baidu.com/s/1DzUpkF89bYGccMXExXJMNQ 提取码: e7fr 


## In Closing

Comparing these platforms on an even footing continues to be difficult. But it is clear that the new Raspberry Pi 4 is a solid platform for machine learning inferencing at the edge.

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) ，译者：欧剃 转载请保留此信息）_