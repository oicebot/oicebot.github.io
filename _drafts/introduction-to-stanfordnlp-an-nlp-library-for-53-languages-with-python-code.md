---
layout: post
title: "Introduction to StanfordNLP: An NLP Library for 53 Languages (with Python code)"
tags: udacity translate python
author: Mohd Sanad Zaki Rizvi
from: https://medium.com/analytics-vidhya/introduction-to-stanfordnlp-an-nlp-library-for-53-languages-with-python-code-d7c3efdca118
excerpt: 今天的教程里，我们将手把手带你在 Python 上使用 StanfordNLP，进行自然语言处理实战
thumb: "/img/20190612/thumb.jpg"
---

> 不久之前，斯坦福大学公开了它最新的自然语言处理代码库—— StanfordNLP。它不但包含了完整的语义分析工具链，还带有 73 个不同的高精度神经网络模型，能解析 53 种不同的人类语言。是不是很牛×啊？今天的教程里，优达菌就手把手带你在 Python 上使用 StanfordNLP，进行一些自然语言处理实战。

----

在学习自然语言处理（NLP）的过程中，我们常常会遇到这样一个问题：“我们能不能为除英语之外的其他语言——比如中文——构建模型呢？”在很长一段时间里，这都是一个难以完成的任务。要知道，每种语言都有自己独特的语法模式和细微的语言差别，而且除了英语之外，其他语言的数据集实在是少之又少。

但如今，我们有了 StanfordNLP 这一神器。

当我第一次看到 StanfordNLP 的介绍时，我简直无法抑制自己的激动之情。作者声称它可以支持超过 53 中不同的人类语言！（没错，你没看错，确实是 53 种……我当时也觉得自己一定是眼花了。）

在 StanfordNLP 的[官方网站](https://stanfordnlp.github.io/stanfordnlp/models.html#human-languages-supported-by-stanfordnlp)上，作者列出了目前支持的所有 53 种人类语言，其中包含了许多其他 NLP 库所没有的语言，比如印地语、日语和我们最爱的中文。这简直是为我们打开了通往无限可能的新世界的大门啊！

<img src="/img/20190612/001.jpeg" />

## StanfordNLP 到底是何方神圣，我为啥需要用它？

<span class="hl">简单地说，StanfordNLP 是一系列预训练好的，高水平的神经网络模型。</span>目前的 73 个模型都是来自 2017、18 年 CoNLL 会议上的研究者。它们都是用 PyTorch 训练而来的，你也可以用自己的语料库来训练和评估它们，是不是很酷炫？

<img src="/img/20190612/002.jpg" />

此外，StanfordNLP 还包含了一个官方的 [CoreNLP](https://stanfordnlp.github.io/CoreNLP/) 封装。CoreNLP 作为一款广受好评的史诗级 NLP 库，在此之前，你只能依靠 Java 才能用上它。对有兴趣的读者，我建议你看看[这个教程](https://www.analyticsvidhya.com/blog/2017/12/introduction-computational-linguistics-dependency-trees?utm_source=blog&utm_medium=stanfordnlp-nlp-library-python)，了解更多有关 CoreNLP 的信息，以及它在 Python 中的工作原理。

对 NLP 爱好者来说，真是夫复何求啊！现在，就让我们在 Python 中实际操作一下吧！

## 在 Python 中安装设置 StanfordNLP 库

最初，这个库里有一些奇怪的东西，让我感到十分困惑。例如，你需要使用 Python 3.6 / 3.7 或更高版本才能使用 StanfordNLP。为了安全起见，我在 Anaconda 中设置了一个单独的 Python 3.7.1 环境。具体步骤如下：

1. 打开 conda 命令行，输入：

```
conda create -n stanfordnlp python=3.7.1
```

一般来说一路 yes 到底即可。

2. 接着激活刚建立的环境：

```
source activate stanfordnlp
```

conda 4.6 或更高版本可以用：

```
conda activate stanfordnlp
```

3. 在新环境里安装 StanfordNLP 库：

```
pip install stanfordnlp
```

4. 接下来，我们需要下载对应自然语言的模型。打开一个 Python 命令行，导入 StanfordNLP 库：

```python
import stanfordnlp
```

接着下载对应的语言模型，以英语（“en”）为例：

```
stanfordnlp.download('en')
```

根据你网络速度的不同，这可能需要花费一些时间。这些语言模型一般来说都挺大的（英语的大约1.96GB）。

### A couple of important notes、
### 一些注意事项

* **StanfordNLP is built on top of PyTorch 1.0.0.** It might crash if you have an older version. Here’s how you can check the version installed on your machine:
* <span class="hl">StanfordNLP 是基于 PyTorch 1.0.0 构建的。</span>如果你尝试在更早的版本上运行它，可能会遇到一些奇怪的问题。你可以在命令行运行这样的命令来检查你的 PyTorch 版本：

```
pip freeze | grep torch
```

which should give an output like `torch==1.0.0`

正常情况下你应该看到类似 `torch==1.0.0` 这样的输出。

* I tried using the library without GPU on my Lenovo Thinkpad E470 (8GB RAM, Intel Graphics). I got a memory error in Python pretty quickly. Hence, I switched to a GPU enabled machine and would advise you to do the same as well. You can try [Google Colab](https://colab.research.google.com/) which comes with free GPU support

* 我试过在没有独立显示芯片的机器上跑这个库，比如我的联想 Thinkpad E470（8G 内存，英特尔核显），结果是，Python 很快就甩了一个 memory error 给我。因此，我换到一台有独立显卡的机器上来运行这些代码，我强烈建议你也这么做。对了，你可以试试 Google 出品的[地表最强 Python 编辑器](https://oicebot.github.io/2019/04/20/colab-is-best-python-editor-for-you.html)——[Google Colab](https://colab.research.google.com/)，它提供了巨大的内存，以及免费的 GPU 算力。

That’s all! Let’s dive into some basic NLP processing right away.

好啦，说了这么多，你应该已经装好了相关的库和模型了吧？让我们试着开始一些基本的 NLP 处理吧。

## Using StanfordNLP to Perform Basic NLP Tasks
## 使用 StanfordNLP 完成简单的 NLP 任务

Let’s start by creating a text pipeline:
假设我们要分析一段英文材料，那么可以这样建立一个文字管道：

```python
nlp = stanfordnlp.Pipeline(processors = "tokenize,mwt,lemma,pos")
doc = nlp("""The prospects for Britain’s orderly withdrawal from the European Union on March 29 have receded further, even as MPs rallied to stop a no-deal scenario. An amendment to the draft bill on the termination of London’s membership of the bloc obliges Prime Minister Theresa May to renegotiate her withdrawal agreement with Brussels. A Tory backbencher’s proposal calls on the government to come up with alternatives to the Irish backstop, a central tenet of the deal Britain agreed with the rest of the EU.""")
```

The `processors = ""` argument is used to specify the task. All five processors are taken by default if no argument is passed. Here is a quick overview of the processors and what they can do:

我们通过 `processors = ""` 参数指定需要分析的具体任务。如果不传入任何参数，程序将默认调用全部 5 个处理模块进行分析。具体可见下表：

  参数名 | 标注器（Annotator）类名 | 工作方式/结果 | 备注
   --- | --- | --- | ---
   tokenize | TokenizeProcessor | 将一个文档（ `Document` ）分成许多句子（ `Sentence` ）,每个句子都包含着一个分词结果的列表，列表的元素是 `Token`。分词处理器还会预测哪些单词/字会组成多字词/词组，以便后续用 MWT 处理模块进行扩展。 | 常规的分词工具，用来对输入的文字进行分词处理。
  mwt | MWTProcessor | 对上一步预测的多字词/词组进行处理，将它们进行扩展 |   
  lemma | LemmaProcessor | 利用单词（ `Word` ）的 `Word.text` 和 `Word.upos` 属性，对每个单词进行词形还原。处理结果将存放在 `Word.lemma` 中。 |   
  pos | POSProcessor | 产生 UPOS、XPOS 以及 UFeats 标注，存放在 `Word` 对象的 `pos` 、 `xpos` 以及 `ufeats` 属性中。 | 对每个 `token` 都进行全局词性分析（universal POS，UPOS）和基于语料库的词性分析（treebank-specific POS，XPOS) 标注，以及全局的形态特征（universal morphological features ，UFeats)标注。 
  depparse | DepparseProcessor | 确定句子中每个单词的句法核心（syntactic head），以及两个单词之间的依存关系。分析结果保存在 `Word` 对象的 `governor` 和 `dependency_relation` 属性中。 | 它提供了一个准确的句法依存关系解析器。

<small>表格内容翻译自 [StanfordNLP 项目主页](https://stanfordnlp.github.io/stanfordnlp/processors.html)</small>

Let’s see each of them in action.
让我们在实战中检验一下这些分析器吧。

### Tokenization
### 分词处理

This process happens implicitly once the Token processor is run. It is actually pretty quick. You can have a look at tokens by using `print_tokens()`:

```python
doc.sentences[0].print_tokens()
```

<img src="/img/20190612/004.png" />

The token object contains the index of the token in the sentence and a list of word objects (in case of a multi-word token). **Each word object contains useful information, like the index of the word, the lemma of the text, the pos (parts of speech) tag and the feat (morphological features) tag.**

### Lemmatization
This involves using the “lemma” property of the words generated by the lemma processor. Here’s the code to get the lemma of all the words:

```python
# FileName： lemma.py

import pandas as pd

def extract_lemma(doc):
    parsed_text = {'word':[], 'lemma':[]}
    for sent in doc.sentences:
        for wrd in sent.words:
            #extract text and lemma
            parsed_text['word'].append(wrd.text)
            parsed_text['lemma'].append(wrd.lemma)
    #return a dataframe
    return pd.DataFrame(parsed_text)
extract_lemma(doc)
```

https://gist.github.com/mohdsanadzakirizvi/b81a65d1dfde36f9ef07e5a1093989ce#file-lemma-py

This returns a pandas data frame for each word and its respective lemma:

<img src="/img/20190612/005.png" />

### Parts of Speech (PoS) Tagging
The PoS tagger is quite fast and works really well across languages. Just like lemmas, PoS tags are also easy to extract:

```python
# FileName： parts_of_speech.py

#dictionary to hold pos tags and their explanations
pos_dict = {
'CC': 'coordinating conjunction',
'CD': 'cardinal digit',
'DT': 'determiner',
'EX': 'existential there (like: \"there is\" ... think of it like \"there exists\")',
'FW': 'foreign word',
'IN':  'preposition/subordinating conjunction',
'JJ': 'adjective \'big\'',
'JJR': 'adjective, comparative \'bigger\'',
'JJS': 'adjective, superlative \'biggest\'',
'LS': 'list marker 1)',
'MD': 'modal could, will',
'NN': 'noun, singular \'desk\'',
'NNS': 'noun plural \'desks\'',
'NNP': 'proper noun, singular \'Harrison\'',
'NNPS': 'proper noun, plural \'Americans\'',
'PDT': 'predeterminer \'all the kids\'',
'POS': 'possessive ending parent\'s',
'PRP': 'personal pronoun I, he, she',
'PRP$': 'possessive pronoun my, his, hers',
'RB': 'adverb very, silently,',
'RBR': 'adverb, comparative better',
'RBS': 'adverb, superlative best',
'RP': 'particle give up',
'TO': 'to go \'to\' the store.',
'UH': 'interjection errrrrrrrm',
'VB': 'verb, base form take',
'VBD': 'verb, past tense took',
'VBG': 'verb, gerund/present participle taking',
'VBN': 'verb, past participle taken',
'VBP': 'verb, sing. present, non-3d take',
'VBZ': 'verb, 3rd person sing. present takes',
'WDT': 'wh-determiner which',
'WP': 'wh-pronoun who, what',
'WP$': 'possessive wh-pronoun whose',
'WRB': 'wh-abverb where, when',
'QF' : 'quantifier, bahut, thoda, kam (Hindi)',
'VM' : 'main verb',
'PSP' : 'postposition, common in indian langs',
'DEM' : 'demonstrative, common in indian langs'
}

def extract_pos(doc):
    parsed_text = {'word':[], 'pos':[], 'exp':[]}
    for sent in doc.sentences:
        for wrd in sent.words:
            if wrd.pos in pos_dict.keys():
                pos_exp = pos_dict[wrd.pos]
            else:
                pos_exp = 'NA'
            parsed_text['word'].append(wrd.text)
            parsed_text['pos'].append(wrd.pos)
            parsed_text['exp'].append(pos_exp)
    return pd.DataFrame(parsed_text)

extract_pos(doc)
```

https://gist.github.com/mohdsanadzakirizvi/745e150f7c15e360dc6ac2693f09f16c#file-parts_of_speech-py

Notice the big dictionary in the above code? It is just a mapping between PoS tags and their meaning. This helps in getting a better understanding of our document’s syntactic structure.

The output would be a data frame with three columns — word, pos and exp (explanation). The explanation column gives us the most information about the text (and is hence quite useful).

<img src="/img/20190612/006.png" />

Adding the explanation column makes it much easier to evaluate how accurate our processor is. I like the fact that the tagger is on point for the majority of the words. It even picks up the tense of a word and whether it is in base or plural form.

### Dependency Extraction
Dependency extraction is another out-of-the-box feature of StanfordNLP. You can simply call `print_dependencies()` on a sentence to get the dependency relations for all of its words:

```
doc.sentences[0].print_dependencies()
```

<img src="/img/20190612/007.png" />

The library computes all of the above during a single run of the pipeline. This will hardly take you a few minutes on a GPU enabled machine.

We have now figured out a way to perform basic text processing with StanfordNLP. It’s time to take advantage of the fact that we can do the same for 51 other languages!


## Implementing StanfordNLP on the Hindi Language

**StanfordNLP really stands out in its performance and multilingual text parsing support.** Let’s dive deeper into the latter aspect.

### Processing text in Hindi (Devanagari Script)
First, we have to download the Hindi language model (comparatively smaller!):

```python
stanfordnlp.download('hi')
```

Now, take a piece of text in Hindi as our text document:

```python
hindi_doc = nlp("""केंद्र की मोदी सरकार ने शुक्रवार को अपना अंतरिम बजट पेश किया. कार्यवाहक वित्त मंत्री पीयूष गोयल ने अपने बजट में किसान, मजदूर, करदाता, महिला वर्ग समेत हर किसी के लिए बंपर ऐलान किए. हालांकि, बजट के बाद भी टैक्स को लेकर काफी कन्फ्यूजन बना रहा. केंद्र सरकार के इस अंतरिम बजट क्या खास रहा और किसको क्या मिला, आसान भाषा में यहां समझें""")
```

This should be enough to generate all the tags. Let’s check the tags for Hindi:

```python
extract_pos(hindi_doc)
```

<img src="/img/20190612/008.png" />

The PoS tagger works surprisingly well on the Hindi text as well. Look at “अपना” for example. The PoS tagger tags it as a pronoun — I, he, she — which is accurate.

## Using CoreNLP’s API for Text Analytics
[CoreNLP](https://stanfordnlp.github.io/CoreNLP/) is a time tested, industry grade NLP tool-kit that is known for its performance and accuracy. StanfordNLP takes three lines of code to start utilizing CoreNLP’s sophisticated API. Literally, just three lines of code to set it up!

1. Download the CoreNLP package. Open your Linux terminal and type the following command:
```bash
wget http://nlp.stanford.edu/software/stanford-corenlp-full-2018-10-05.zip
```
2. Unzip the downloaded package:
```bash
unzip stanford-corenlp-full-2018-10-05.zip
```
3. Start the CoreNLP server:
```bash
java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -port 9000 -timeout 15000
```
_**Note**: CoreNLP requires Java8 to run. Please make sure you have JDK and JRE 1.8.x installed.p_

Now, make sure that StanfordNLP knows where CoreNLP is present. For that, you have to export `$CORENLP_HOME` as the location of your folder. In my case, this folder was in **the home** itself so my path would be like

```
export CORENLP_HOME=stanford-corenlp-full-2018-10-05/
```

After the above steps have been taken, you can start up the server and make requests in Python code. Below is a comprehensive example of starting a server, making requests, and accessing data from the returned object.

### 1. Setting up the CoreNLPClient

```python
#FireName: corenlp_setup.py 
from stanfordnlp.server import CoreNLPClient
# example text
print('---')
print('input text')
print('')
text = "Chris Manning is a nice person. Chris wrote a simple sentence. He also gives oranges to people."
print(text)
# set up the client
print('---')
print('starting up Java Stanford CoreNLP Server...')
# set up the client
with CoreNLPClient(annotators=['tokenize','ssplit','pos','lemma','ner','depparse','coref'], timeout=30000, memory='16G') as client:
    # submit the request to the server
    ann = client.annotate(text)
    # get the first sentence
    sentence = ann.sentence[0]
```

https://gist.github.com/mohdsanadzakirizvi/770fb04192a2f1731ccfa854eda352d4#file-corenlp_setup-py

### 2. Dependency Parsing and POS

```python
#FireName: corenlp_depparse.py 

    #get the dependency parse of the first sentence
    print('---')
    print('dependency parse of first sentence')
    dependency_parse = sentence.basicDependencies
    print(dependency_parse)
    # get the first token of the first sentence
    print('---')
    print('first token of first sentence')
    token = sentence.token[0]
    print(token)
    # get the part-of-speech tag
    print('---')
    print('part of speech tag of token')
    token.pos
    print(token.pos)
```
https://gist.github.com/mohdsanadzakirizvi/4cad767690af9e400017a1cd487e3dbc#file-corenlp_depparse-py

### 3. Named Entity Recognition and Co-Reference Chains

```python
#FireName: corenlp_ner.py 

# get the named entity tag
    print('---')
    print('named entity tag of token')
    print(token.ner)
    # get an entity mention from the first sentence
    print('---')
    print('first entity mention in sentence')
    print(sentence.mentions[0])
    # access the coref chain
    print('---')
    print('coref chains for the example')
    print(ann.corefChain)
    # Use tokensregex patterns to find who wrote a sentence.
    pattern = '([ner: PERSON]+) /wrote/ /an?/ []{0,3} /sentence|article/'
    matches = client.tokensregex(text, pattern)
    # sentences contains a list with matches for each sentence.
    assert len(matches["sentences"]) == 3
    # length tells you whether or not there are any matches in this
    assert matches["sentences"][1]["length"] == 1
    # You can access matches like most regex groups.
    matches["sentences"][1]["0"]["text"] == "Chris wrote a simple sentence"
    matches["sentences"][1]["0"]["1"]["text"] == "Chris"
    # Use semgrex patterns to directly find who wrote what.
    pattern = '{word:wrote} >nsubj {}=subject >dobj {}=object'
    matches = client.semgrex(text, pattern)
    # sentences contains a list with matches for each sentence.
    assert len(matches["sentences"]) == 3
    # length tells you whether or not there are any matches in this
    assert matches["sentences"][1]["length"] == 1
    # You can access matches like most regex groups.
    matches["sentences"][1]["0"]["text"] == "wrote"
    matches["sentences"][1]["0"]["$subject"]["text"] == "Chris"
    matches["sentences"][1]["0"]["$object"]["text"] == "sentence"
```

https://gist.github.com/mohdsanadzakirizvi/566641bf2823488857cd1a3506b90ae4#file-corenlp_ner-py

What I like the most here is the ease of use and increased accessibility this brings when it comes to using CoreNLP in python.

## My Thoughts on using StanfordNLP — Pros and Cons
A few things that excite me regarding the future of StanfordNLP:

1. Its out-of-the-box support for multiple languages
2. The fact that it is going to be an official Python interface for CoreNLP. This means it will only improve in functionality and ease of use going forward
3. It is fairly fast (barring the huge memory footprint)
4. Straightforward set up in Python

There are, however, a few chinks to iron out. Below are my thoughts on where StanfordNLP could improve:

1. The size of the language models is too large (English is 1.9 GB, Chinese ~ 1.8 GB)
2. The library requires a lot of code to churn out features. Compare that to NLTK where you can quickly script a prototype — this might not be possible for StanfordNLP
3. Currently missing visualization features. It is useful to have for functions like dependency parsing. StanfordNLP falls short here when compared with libraries like SpaCy

**Make sure you check out [StanfordNLP’s official documentation](https://stanfordnlp.github.io/stanfordnlp/).**

## End Notes

Clearly, StanfordNLP is very much in the beta stage. It will only get better from here so this is a really good time to start using it — get a head start over everyone else.

For now, the fact that such amazing toolkits (CoreNLP) are coming to the Python ecosystem and research giants like Stanford are making an effort to open source their software, I am optimistic about the future.

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_
