---
layout: post
title: 答疑解惑：Python 的 __name__ 变量，到底是个什么东西？
tags: udacity python 
author: Bert Carremans
from: https://medium.freecodecamp.org/whats-in-a-python-s-name-506262fe61e8
excerpt: "本文详细介绍了 Python 中的内置变量 __name__，以及它的用法，希望对各位新近接触 Python 语言的同学能有所帮助。"
thumb: "/img/20190217/snake.svg"
---

<img src="/img/20190217/snake.svg" style="max-width:300px;" alt="" />

我想，你应该已经在很多 Python 脚本里见到过这个 `__name__` 变量了吧？它经常是以类似这样的方式出现在我们的程序里：

```python
if __name__ == '__main__':
    main()
```

In this article, I want to show you how you can make use of this variable to create modules in Python.

Why is the _ _name_ _ variable used?
The __name__ variable (two underscores before and after) is a special Python variable. It gets its value depending on how we execute the containing script.

Sometimes you write a script with functions that might be useful in other scripts as well. In Python, you can import that script as a module in another script.

Thanks to this special variable, you can decide whether you want to run the script. Or that you want to import the functions defined in the script.

What values can the __name__ variable contain?
When you run your script, the __name__ variable equals __main__. When you import the containing script, it will contain the name of the script.

Let us take a look at these two use cases and describe the process with two illustrations.

Scenario 1 - Run the script
Suppose we wrote the script nameScript.py as follows:

def myFunction():
    print 'The value of __name__ is ' + __name__
def main():
    myFunction()
if __name__ == '__main__':
    main()
If you run nameScript.py, the process below is followed.


Before all other code is run, the __name__ variable is set to __main__. After that, the main and myFunction def statements are run. Because the condition evaluates to true, the main function is called. This, in turn, calls myFunction. This prints out the value of __main__.

Scenario 2 - Import the script in another script
If we want to re-use myFunction in another script, for example importingScript.py, we can import nameScript.py as a module.

The code in importingScript.py could be as follows:

import nameScript as ns
ns.myFunction()
We then have two scopes: one of importingScript and the second scope of nameScript. In the illustration, you’ll see how it differs from the first use case.


In importingScript.py the __name__ variable is set to __main__. By importing nameScript, Python starts looking for a file by adding .py to the module name. It then runs the code contained in the imported file.

But this time it is set to nameScript. Again the def statements for main and myFunction are run. But, now the condition evaluates to false and main is not called.

In importingScript.py we call myFunction which outputs nameScript. NameScript is known to myFunction when that function was defined.

If you would print __name__ in the importingScript, this would output __main__. The reason for this is that Python uses the value known in the scope of importingScript.

Conclusion
In this short article, I explained how you can use the __name__ variable to write modules. You can also run these modules on their own. This can be done by making use of how the values of these variables change depending on where they occur.