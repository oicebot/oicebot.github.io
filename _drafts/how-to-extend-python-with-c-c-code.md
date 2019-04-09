---
layout: post
title: "How to extend Python with C/C++ Code"
tags: udacity translate python
author: Matthias Bitzer
from: https://medium.com/@matthiasbitzer94/how-to-extend-python-with-c-c-code-aa205417b2aa
excerpt: ""
thumb: "/img/20190410/thumb.jpg"
---
<img src="/img/20190410/000.png" /><br><small>
</small>

Have you ever wondered how some calculations (for example in the NumPy library) can be executed very fast although Python (as an interpreted language) is not popular for being the fastest language. This is mainly the case because time critical code within a library is often written in C or C++.

In this short tutorial I will explain how to create a Python module (or package) by writing it in C or C++. The main source for this recipe is the [Python Documentation](https://docs.python.org/3/extending/extending.html#a-simple-example). As an example I will create a math module which has a method for calculating the factorial **n!=n*(n-1)*(n-2)…** written in C. For this purpose we need two files: A python file called `setup.py` and our C File `cmath.c` .

The `setup.py` file will be used to build our C program properly (compiling, finding the right Python C libraries, linking). In order to get our program/module executed when calling it in a python script, the module needs to communicate properly with the Python Interpreter `CPython` . Therefore we need to bring it in the right structure by using several Objects from the `Python.h` Header File. Basically what we are going to do is to build a wrapper around our actual C method which can be called through the Python Interpreter, so that we can use it in a python script like a normal python function. First we need to include the Header File in our `cmath.c` by typing

```c
#include Python.h
```

All objects and functions we are using to bring our program in the right structure for the python interpreter are declared in the Python Header and start with the prefix `Py` . The main C object (basically an opaque object) which can represent every python object type is called `PyObject` . But before using these objects we need to write our method for calculating the factorial (remember that **0!=1**):

```c
int fastfactorial(int n){
 if(n<=1)
 return 1;
 else
 return n * fastfactorial(n-1);
}
```

After that, we need to write a wrapper around that function. This wrapper gets a pointer to the arguments which are passed in the python script later represented as a `PyObject` and returns a pointer to the result of the calculation also represented as a `PyObject`. For this purpose we create the following wrapper method

```C
static PyObject* factorial(PyObject* self, PyObject* args){
int n;
if (!PyArg_ParseTuple(args,"i",&n))
  return NULL;
int result = fastfactorial(n);
return Py_BuildValue("i",result);
}
```

These wrapper methods always need a `PyObject` pointer `self` pointing to the Module object itself and a `PyObject` pointer `args` that represents the arguments which get passed in the python script later. We parse these arguments by the `PyArg_ParseTuple` method and declare that we are searching for an integer by specifying “i” in the second argument. The parsed value is than saved in the variable `n` . After that our factorial method is called `fastfactorial(n)` and the result is turned to a `PyObject*` again by using the `Py_BuildValue` method from the Python Header. In the end the result object is returned by this wrapper method.

Now that we have build the wrapper method around our actual factorial function we need to create an instance of the `PyModuleDef` struct (which is also declared in the `Python.h`). This struct defines everything the Python Interpreter needs to know about a Module. One part of a module are the definitions of all its methods. This is done by another struct, the `PyMethodDef` struct, or rather an array of those structs that summarizes all methods of the Module. In our case this declaration is done through

```C
static PyMethodDef mainMethods[] = {
 {"factorial",factorial,METH_VARARGS,"Calculate the factorial of n"},
 {NULL,NULL,0,NULL}
};
```
which initializes the array of `PyMethodDef` structs. Besides a struct of `NULL`s that always need to be included in the array we add the struct for our wrapper method, which we named `factorial`, and specify that this method actually gets arguments through the `METH_VARARGS` constant. Now that we have initialized all the methods (just one in our case) that will exist in our python module, we can create an instance of `PyModuleDef`, the struct that represents our whole python module. This is done in our case by

```C
static PyModuleDef cmath = {
 PyModuleDef_HEAD_INIT,
 "cmath","Factorial Calculation",
 -1,
 mainMethods
};
```

Here we give our module the name `cmath` and pass the array of methods `mainMethods`. Additional to that, a documentation for the module can be added. The last step is to create a method that gets executed when the python program gets called by a script to import the module. This is done by

```C
PyMODINIT_FUNC PyInit_cmath(void){
 return PyModule_Create(&cmath);
}
```
The `PyMODINIT_FUNC` return type declares that the method actually returns a `PyObject` pointer. This is a pointer to the python module itself (which is in the end also a PyObject) which gets created by `PyModule_Create` . When a module is imported in a python script this method gets called and returns the pointer to the whole Module including all its methods.

Now our C file is ready and has all the methods and the structure the Python Interpreter needs to load the module and execute our factorial method. Therefore we can continue building it. For building the final program the C file has to be compiled and get linked to the right libraries (here the libraries with the definitions for the methods and objects declared in the `Python` Header). To simplify that building process the `setup` and `Extension` methods from the `distutils.core` module in python can be used. The `setup` method basically takes care for the whole build process. We import both methods in our `setup.py` file, which should be located in the same folder as the `cmath.c` . The setup file should look like this

```python
from distutils.core import setup, Extension
factorial_module = Extension('cmath',sources = ['cmath.c'])
setup(name = 'MathExtension',version='1.0',description = 'This is a math package',ext_modules = [factorial_module])
```

First we declare the `factorial_module` as an C Extension with the C file as source. This is needed to tell the setup method which files it should build. Then we call the setup function where we define a package name, in our case `MathExtension`, a version, a short documentation of the package and finally which C Extensions/Modules should be included (here just the `factorial_module`). Now we are done in the `setup.py` file.

Finally, we can run the `setup.py` file either with the option `build`, which only builds the module (a .so library file) and puts it in a build folder right under the current folder, or with the option `install` which puts the compiled library in a path where the python program can access it. We take the build option by typing the following command in a shell

```
python setup.py build
```

This finally builds our library as an `.so` extension and saves it in the `build` folder. This library can be called by the python program to execute our factorial method. To test it we create a `test.py` file right in the folder where the `.so` library is (when the install option is used this is not necessary). The `test.py` file looks as follows

```python
from cmath import factorial
print(factorial(6))
```

and it outputs 720. Great! We made a C Extension for python and can import and execute it.

<img src="/img/20190410/002.jpg" /><br><small>
</small>

>（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）
