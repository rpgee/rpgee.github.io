When it comes JavaScript, Anonymous function are very friendly and convenient. Although, when it comes to debugging, anonymous functions give the developer bit of a hard time.

For example,

**_//This shows as "anonymous function" in stack trace_**  
**_var dummyFunction = function(){_**  
**_thisCauseError(); //This will cause error_**  
**_}_**  
**_(function(){_**  
**_dummyFunction();_**  
**_})();_**  
The above code snippet generates following stacks trace :

_**Uncaught ReferenceError: thisCauseError is not defined**_  
_**(anonymous function) @(index):25**_  
_**window.onload @ (index):28**_

In above scenario, identifying exact location of the error is not difficult. Although, condition gets tough when complexity increased.

To avoid this, developer can follow below mentioned method  
For example,

_**//Notice the "thisWillShowInStackStrace" as function name**_  
_**var dummyFunction = function thisWillShowInStackStrace(){**_  
_**thisCauseError(); //This will cause error**_  
_**}**_

_**(function(){**_  
_**dummyFunction();**_  
_**})();**_

The above code snippet generates following stacks trace :

_**Uncaught ReferenceError: thisCauseError is not defined**_  
_**thisWillShowInStackStrace @ (index):25**_  
_**window.onload @ (index):28**_

In above scenario, developer can detect the exact function call which causes the error in a feasible manner.