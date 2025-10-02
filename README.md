# Hello await async
Showcase the useage of JavaScript await async 

* Start the docker inside dockers
* Access the page under http://127.0.0.1
* Open your Browser Inspector to the console.log() 


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

```
async function foo(name) {
  console.log(name, "start");
  await console.log(name, "middle");
  console.log(name, "end");
}

foo("First");
foo("Second");

// First start
// First middle
// Second start
// Second middle
// First end
// Second end

```
## Demo site
 [myridia.github.io ](https://hello_await_async.myridia.com/)
