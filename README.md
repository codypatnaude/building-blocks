# building-blocks
Building blocks allows you to encapsulate peices of code on individual pages without the need for a larger framework. 

## Why?
I do a lot of work on web pages outside of the major js frameworks. Sometimes I've found myself wishing that I had an easy way to give a part of a page some kind of state. Or some way of encapsulating part of a page so it could remain seperate from everything else. Think of things like:

* Lists where each item needs to perform an action with it's own data
* A table where each row needs it's own persistant state
* A part of a page that needs to do something more complex than hiding or showing divs using onclick actions

In a perfect world we'd all be programming in Angular, React or \<insert framework here\> all the time and none of this would be a problem. Sometimes, however, you just want a lightweight, standard method of encapsulating the code for parts of a page. 

## Usage
Include the building-blocks library at the bottom of the body of your page.

```html
<script src="build/building-blocks.min.js"></script>
```

Next define a 'block' in your html. All elements in the block will be encapsulated together.

*Note: I'm using a tag to identify a block, you can use any query selector you'd like*

```html
<test-block>
  <button type="button" bb-click="count">Test 1</button>
</test-block>
```

Now define the functionality of the block. *Note: this should be placed in a script tag underneath where you included the library*

```javascript
build.block('test-block', (node)=>{
  let scope = {};
  scope.counter = 0;
  scope.count = function(){
    scope.counter++;
    console.log(scope.counter.toString());
  }
  return scope;
})
```

The 'block' function is used to create the encapsulation. It takes two parameters:
* The selector, used to select the element(s) that will be bound to the new scope.
* A factory function that returns the new scope. If you're familiar with Angular.js you can almost think of this as a controller.

If you run this you will have a page with a button Labeled 'Test 1'. if you click it and take a look at your console you'll see that the scope.counter variable is incrementing with every click.

## This is cool and all but...
... you could have done this with some simple js and an onclick right? Of course, but with building blocks all this code is encapsulated. To see what this means let's add another block.

```html
<test-block>
  <button type="button" bb-click="count">Test 1</button>
</test-block>

<test-block>
  <button type="button" bb-click="count">Test 2</button>
</test-block>
```
Go ahead and reload the page. You'll notice that each button will increment it's own counter. These two blocks execute the same code, but they have their own scope.

## scope.$elements
If you give names to elements inside a block they will be accessable in the scope.$elements array. This allows you to be sure that when you call an element you are only getting the element that is in your block. Here's an example:

Add this html
```html
<hide-block>
  <span name="hide-me">Hey look at me!</span>
  <button type="button" bb-click="hide">Hide the text</button>
</hide-block>
```

Add this script
```javascript
build.block('hide-block', (node)=>{
  let scope = {};
  scope.hide = function(){
    $(scope.$elements.hideMe).hide()
  }
  
  return scope;
})
```

*It should be noted here that I've included jquery on the page for this part of the example. Building blocks doesn't interfere with other libraries you may have loaded*

If you reload the page and click 'Hide the text', 'Hey look at me!' should dissapear.

Now let's try this with multiple blocks of html.

```html
<hide-block>
  <span name="hide-me">Button 1 will hide this text</span>
  <button type="button" bb-click="hide">Button 1</button>
</hide-block>

<hide-block>
  <span name="hide-me">Button 2 will hide this text</span>
  <button type="button" bb-click="hide">Button2</button>
</hide-block>
```

Reload and you'll notice that each button will hide the apropriate span.

## bb-click
You've probably noticed that all the buttons in these examples have used 'bb-click' instead of 'onclick'. The library COULD have been designed to replace 'onclick' but this way it is really obvious what's happening. Our number one goal with this library was to give you a way to add scoped scripts to pages in a non-convoluted fashion.

## Coming soon...
This is still very much a work in progress! In the future I plan to add:
* support for more evens (change, keyup, etc.)
* two way binding
* possibly even some templating directives (bb-show, bb-repeat, etc.)