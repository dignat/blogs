---
title: How Autoboxing works in JavaScript
---

Autoboxing in Java Script is one of the most fascinating and confusing features. I will try to explain it so I could cement my own knowledge about it.

To understand Autoboxing we need to start with an example.
Primitives ( primitive value, primitive data type) in Java Script are not objects and do not have properties or methods.

  
First example is with string primitive:

`const str = 'Jane'`

A simple string primitive with no methods or properties, and normally we would not expect this to work: 

`console.log(str.length)`

Output

`6`

Normally we would expect error, but ‘console.log’ has displayed the length of our string. Why is that?

  

Whenever we treat primitives like objects, Java Script automatically chains the primitive to the appropriate built in object prototype in the language. In our case this would be String.prototype

  

Let see another example with number primitive:

`const number = 7.6789`

According to above explanation , if we treat this number primitive as an object we would be able to access the properties and methods that are available for the appropriate object prototype Number.prototype. 
Lets try.

`console.log(number.toFixed(2))`

Output

`7.68`

We see once again that Java Script has automatically chained our primitive number to the Number.prototype object from where it inherits object’s properties and methods.

  

Number.prototype available methods and properties:

You can invoke on the web console 'console.log()' method and see the available properties and methods on Number object:

`console.log(Number.prototype)`

String.prototype chain with properties and methods:

`console.log(String.protype)`

