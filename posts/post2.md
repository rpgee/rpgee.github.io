"Tests, tests and some more tests" is a golden rule to follow, when writing (relatively) "bulletproof" codes. Apart from all these rules and best practices, I feel lazy to write tests sometimes.

Fine, now I'm going to "defend" my laziness. Check the below mentioned scenario.

(I'm Node.js developer, so I use _**Node.Js**_ v4.4.3 along with _**mocha**_ v3.1.2 and _**shouldjs**_ v11.1.1)

I have the following object and have written tests to check properties and values.

<pre spellcheck="false"><span class="hljs-built_in">let</span> me = {
	first_name: <span class="hljs-string">'Ruwan'</span>,
	last_name: <span class="hljs-string">'Geeganage'</span>,
	no_of_hands: 2,
	no_of_legs: 2,
	no_of_heads: 1,
	finger_per_hand: 10
}
</pre>

The unit test cases are as follows.

<pre spellcheck="false"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">let</span> me = {
	first_name: <span class="hljs-string">'Ruwan'</span>,
	last_name: <span class="hljs-string">'Geeganage'</span>,
	no_of_hands: <span class="hljs-number">2</span>,
	no_of_legs: <span class="hljs-number">2</span>,
	no_of_heads: <span class="hljs-number">1</span>,
	finger_per_hand: <span class="hljs-number">10</span>
};

describe(<span class="hljs-string">'Checking me'</span>, () => {
	it(<span class="hljs-string">'I should have fist_name as "Ruwan"'</span>, () => {
		me.should.have.ownProperty(<span class="hljs-string">'first_name'</span>).and.equal(<span class="hljs-string">'Ruwan'</span>);
	});
	it(<span class="hljs-string">'I should have last_name as "Geeganage"'</span>, () => {
		me.should.have.ownProperty(<span class="hljs-string">'last_name'</span>).and.equal(<span class="hljs-string">'Geeganage'</span>);
	});
	it(<span class="hljs-string">'I should have no_of_hands as 2'</span>, () => {
		me.should.have.ownProperty(<span class="hljs-string">'no_of_hands'</span>).and.equal(<span class="hljs-number">2</span>);
	});
	<span class="hljs-comment">/*
	So on, life goes on.. sighhhh...
	*/</span>
});
</pre>

When you inspect above test cases, you will come across some repetitions. when I want to check for a new property, I have to copy and paste a test case and change the values. Those repetitions make me lazy.

So, I came across a nice solution to defeat the laziness, while I work with a team of brilliant team of developers.

here it is,

Check out the following test cases.

<pre spellcheck="false"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">const</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lodash'</span>);

<span class="hljs-keyword">let</span> me = {
	first_name: <span class="hljs-string">'Ruwan'</span>,
	last_name: <span class="hljs-string">'Geeganage'</span>,
	no_of_hands: <span class="hljs-number">2</span>,
	no_of_legs: <span class="hljs-number">2</span>,
	no_of_heads: <span class="hljs-number">1</span>,
	finger_per_hand: <span class="hljs-number">10</span>
}

describe(<span class="hljs-string">'Checking myself with happy face'</span>, () => {
	<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testCase</span>(<span class="hljs-params">obj, property, expectedValue</span>)</span> {
		obj.should.have.ownProperty(property).and.equal(expectedValue);
	}

	<span class="hljs-comment">/*
	Put your properties and expected values here
	*/</span>
	<span class="hljs-keyword">let</span> checks = {
		first_name: <span class="hljs-string">'Ruwan'</span>,
		last_name: <span class="hljs-string">'Geeganage'</span>,
		no_of_hands: <span class="hljs-number">2</span>,
		no_of_legs: <span class="hljs-number">2</span>,
		no_of_heads: <span class="hljs-number">1</span>,
		finger_per_hand: <span class="hljs-number">10</span>
	}
	_.each(checks, (v, k) => {
		it(<span class="hljs-string">`I should have <span class="hljs-subst">${k}</span> as <span class="hljs-subst">${v}</span>`</span>, () => {
			testCase(me, k, v);
		});
	});
});

</pre>

The output of the above test cases as follows.

<pre spellcheck="false">  Checking myself <span class="hljs-keyword">with</span> happy face
    ✓ I should have first_name <span class="hljs-keyword">as</span> Ruwan
    ✓ I should have last_name <span class="hljs-keyword">as</span> Geeganage
    ✓ I should have no_of_hands <span class="hljs-keyword">as</span> <span class="hljs-number">2</span>
    ✓ I should have no_of_legs <span class="hljs-keyword">as</span> <span class="hljs-number">2</span>
    ✓ I should have no_of_heads <span class="hljs-keyword">as</span> <span class="hljs-number">1</span>
    ✓ I should have finger_per_hand <span class="hljs-keyword">as</span> <span class="hljs-number">10</span>

  <span class="hljs-number">6</span> passing (<span class="hljs-number">8</span>ms)
</pre>

So no more repetitions.

during a failure of a test case, the output is as follows.

<pre spellcheck="false">  Checking myself <span class="hljs-keyword">with</span> happy face
    ✓ I should have first_name <span class="hljs-keyword">as</span> Ruwan
    ✓ I should have last_name <span class="hljs-keyword">as</span> Geeganage
    ✓ I should have no_of_hands <span class="hljs-keyword">as</span> <span class="hljs-number">2</span>
    ✓ I should have no_of_legs <span class="hljs-keyword">as</span> <span class="hljs-number">2</span>
    <span class="hljs-number">1</span>) I should have no_of_heads <span class="hljs-keyword">as</span> <span class="hljs-number">0</span>
    ✓ I should have finger_per_hand <span class="hljs-keyword">as</span> <span class="hljs-number">10</span>

  <span class="hljs-number">5</span> passing (<span class="hljs-number">11</span>ms)
  <span class="hljs-number">1</span> failing

  <span class="hljs-number">1</span>) Checking myself <span class="hljs-keyword">with</span> happy face I should have no_of_heads <span class="hljs-keyword">as</span> <span class="hljs-number">0</span>:

      AssertionError: expected <span class="hljs-number">1</span> to be <span class="hljs-number">0</span>
      + expected - actual

      <span class="hljs-number">-1</span>
      +<span class="hljs-number">0</span>
</pre>

What if you want to add _**beforeEach()**_ or _**afterEach()** _**?** no problem, just add them. the output will be as follows.

<pre spellcheck="false">  Checking myself <span class="hljs-keyword">with</span> happy face
beforeEach()
    ✓ I should have first_name <span class="hljs-keyword">as</span> Ruwan
afterEach()

beforeEach()
    ✓ I should have last_name <span class="hljs-keyword">as</span> Geeganage
afterEach()

beforeEach()
    ✓ I should have no_of_hands <span class="hljs-keyword">as</span> <span class="hljs-number">2</span>
afterEach()

beforeEach()
    ✓ I should have no_of_legs <span class="hljs-keyword">as</span> <span class="hljs-number">2</span>
afterEach()

beforeEach()
    ✓ I should have no_of_heads <span class="hljs-keyword">as</span> <span class="hljs-number">1</span>
afterEach()

beforeEach()
    ✓ I should have finger_per_hand <span class="hljs-keyword">as</span> <span class="hljs-number">10</span>
afterEach()

  <span class="hljs-number">6</span> passing (<span class="hljs-number">9</span>ms)
</pre>

So, now I don't have to feel lazy anymore.

Thanks for reading. _Alles Gute... !_