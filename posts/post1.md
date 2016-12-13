Although the _Alexandre Dumas's The Three Musketeers_ is a great creation (I haven't read it though..)_,_ this article is only about unit tests.

(I'm a _Node.Js_ developer, and I prefer to use _Mocha_ as my test suit and _Should.js_ as my assertion library.)

IMHO, when writing unit tests, check for assertions is a must. For an example, when I want to check a particular property exists in object, I have to write an assertion.

This is pretty simple when I want to check for a single property, as follows.

<pre spellcheck="false"><span class="hljs-meta">'use strict'</span>;
describe(<span class="hljs-string">'Running single assertion'</span>, () => {
  <span class="hljs-keyword">let</span> boy = <span class="hljs-literal">null</span>;
  before(() => {
  	boy = {
		arms: <span class="hljs-number">2</span>,
		legs: <span class="hljs-number">2</span>
  	}
  });	
  it(<span class="hljs-string">'property "arms" should exists'</span>, () => {
  	boy.should.have.ownProperty(<span class="hljs-string">'arms'</span>);
  });
});
</pre>

the expected output for the above test is as,

<pre spellcheck="false">  Running single assertion
    ✓ property <span class="hljs-string">"arms"</span> should exists
</pre>

and I'm happy...

But this gets complex when I want to run assertions on multiple properties.

In this situation, I may ,

1.  Run assertions for all the properties inside a single test case. (Which I like to call as "_**One for All**_").
2.  Write a single test case with single assertion for each property. (Which I like to call "_**All for one**_").

## _**Run assertion for all the properties inside a single test case. ("One for All**")_

Consider the following scenario.

<pre spellcheck="false"><span class="hljs-meta">'use strict'</span>;
describe(<span class="hljs-string">'Running multiple assertions'</span>, () => {
  <span class="hljs-keyword">let</span> boy = <span class="hljs-literal">null</span>;
  before(() => {
  	boy = {
		arms: <span class="hljs-number">2</span>,
		legs: <span class="hljs-number">2</span>
  	}
  });	
  it(<span class="hljs-string">'Body parts should exists'</span>, () => {
  	boy.should.have.ownProperty(<span class="hljs-string">'arms'</span>);
  	boy.should.have.ownProperty(<span class="hljs-string">'legs'</span>);
  });
});
</pre>

In the above test case, I run assertions for 2 properties, inside single test case. Since the assertions get successfully passed, the output is as follows.

<pre spellcheck="false">  Running multiple assertions
    ✓ Body parts should exists
</pre>

Now, let see what happen during invalid assertion check.

<pre spellcheck="false"><span class="hljs-meta">'use strict'</span>;
describe(<span class="hljs-string">'Running multiple assertions'</span>, () => {
  <span class="hljs-keyword">let</span> boy = <span class="hljs-literal">null</span>;
  before(() => {
  	boy = {
		arms: <span class="hljs-number">2</span>,
		legs: <span class="hljs-number">2</span>
  	}
  });	
  it(<span class="hljs-string">'Body parts should exists'</span>, () => {
  	boy.should.have.ownProperty(<span class="hljs-string">'arms'</span>);
  	boy.should.have.ownProperty(<span class="hljs-string">'head'</span>);
  	boy.should.have.ownProperty(<span class="hljs-string">'ears'</span>);
  	boy.should.have.ownProperty(<span class="hljs-string">'fingers'</span>);
  	boy.should.have.ownProperty(<span class="hljs-string">'nose'</span>);
  });
});
</pre>

In above test case, I run a single test case and check for multiple assertions. Since this test case guaranteed to fail, the output is as follows.

<pre spellcheck="false">  Running multiple assertions
    1) Body parts should exists

  0 passing (14ms)
  1 failing

</pre>

Now lets take a moment and examine the output. Although, There are invalid properties such as _'ears', 'finger'_ and _'nose',_ test case gets failed in first invalid assertion check.

In order to check for all the assertion failures, I have to fix each failure and run the test case multiple times. This makes my life harder, when I use this approach in real life test cases.

In that manner, I always try to avoid this approach.

## Write single test case with single assertion for each property. ("_All for one_")

Consider the following scenario.

In this approach, I write, single test case with single assertion.

<pre spellcheck="false"><span class="hljs-string">'use strict'</span>;
describe(<span class="hljs-string">'Running multiple assertions'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =></span> {
  let boy = <span class="hljs-literal">null</span>;
  before(<span class="hljs-function"><span class="hljs-params">()</span> =></span> {
  	boy = {
		arms: <span class="hljs-number">2</span>,
		legs: <span class="hljs-number">2</span>
  	}
  });	
  describe(<span class="hljs-string">'Body parts should exists'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =></span> {
  	it(<span class="hljs-string">'property "arms" should exists'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =></span> {
  		boy.should.have.ownProperty(<span class="hljs-string">'arms'</span>);
  	});
  	it(<span class="hljs-string">'property "head" should exists'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =></span> {
  		boy.should.have.ownProperty(<span class="hljs-string">'head'</span>);
  	});
  	it(<span class="hljs-string">'property "ears" should exists'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =></span> {
  		boy.should.have.ownProperty(<span class="hljs-string">'ears'</span>);
  	});
  	it(<span class="hljs-string">'property "fingers" should exists'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =></span> {
  		boy.should.have.ownProperty(<span class="hljs-string">'fingers'</span>);
  	});
  	it(<span class="hljs-string">'property "legs" should exists'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =></span> {
  		boy.should.have.ownProperty(<span class="hljs-string">'legs'</span>);
  	});
  });
});
</pre>

The output of the above test case execution is as follows.

<pre spellcheck="false">  Running multiple assertions
    Body parts should exists
      ✓ property <span class="hljs-string">"arms"</span> should exists
      1) property <span class="hljs-string">"head"</span> should exists
      2) property <span class="hljs-string">"ears"</span> should exists
      3) property <span class="hljs-string">"fingers"</span> should exists
      ✓ property <span class="hljs-string">"legs"</span> should exists

  2 passing (17ms)
  3 failing
</pre>

Now, let's examine this output. Here I can directly see the test cases which are failing and my life becomes is much more easier.

In this manner, I always try to take this approach.

In conclusion, I prefer _**All for One**_ over _**One for All**_.

I hope this article has given you some idea about writing better test cases.

Now please excuse me, I have to go and read _Alexandre Dumas's The Three Musketeers. (_just kidding, it's just Tintin).