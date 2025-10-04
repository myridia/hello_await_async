window.onload = function () {
  /************* 1 Button *****************/
  document
    .querySelector("#syncron_basic")
    .addEventListener("click", function (e) {
      document.querySelector("#log").value =
        "...click button " + e.target.id + "\n";
      setTimeout(syncron_basic, 1000);
    });

  /************* 2 Button *****************/
  document
    .querySelector("#async_basic")
    .addEventListener("click", function (e) {
      document.querySelector("#log").value =
        "...click button " + e.target.id + "\n";
      setTimeout(async_basic, 1000);

      //async_basic(e);
    });
};

/********************** 1 button ********************/
function syncron_basic(e) {
  foo("First");
  foo("Second");
}
async function foo(name) {
  log(name + " start");
  log(name + " middle");
  log(name + " end");
}

/********************** 2 button ********************/
function async_basic(e) {
  afoo("First");
  afoo("Second");
}
async function afoo(name) {
  log(name + " start");
  await log(name + " middle");
  log(name + " end");
}


  function  afetch_all(callback, ...urls) {
    // Create the function array from the urls
    let function_array = [];
    for (let i in urls) {
      function_array.push(this.afetch(i, urls[i]));
    }

    /* Send the function array wait for all function
     * Once its processed it send the final result back to the callback caller
     */
    this.wait_for_all(...function_array).then((results) => callback(results));
  }

 /*
https://github.com/veto8/vanilla-website-utils/blob/main/vanilla-website-utils.js#L458
*/
 function  wait_for_all(...ps) {
    return Promise.all(ps.map(this.handle_rejection));
  }

 
  async function  afetch(i, url) {
    const r = await fetch(url);
    const d = await r.json();
    return [parseInt(i), d];
  }

 function  handle_rejection(p) {
    return p.catch((error) => ({
      error,
    }));
  }


/* Logger to console and textarea */
async function log(msg) {
  document.querySelector("#log").value += msg + "\n";
  console.log(msg);
}
