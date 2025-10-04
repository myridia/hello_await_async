window.start = 0;
window.end = 0;

window.onload = function () {
  /************* 1 Button *****************/
  document
    .querySelector("#syncron_basic")
    .addEventListener("click", function (e) {
      document.querySelector("#log").value =
        "...click button " + e.target.id + "\n";
      reset_time();
      window.start = Date.now();
      setTimeout(syncron_basic, 1000);
    });

  /************* 2 Button *****************/
  document
    .querySelector("#async_basic")
    .addEventListener("click", function (e) {
      document.querySelector("#log").value =
        "...click button " + e.target.id + "\n";
      reset_time();
      window.start = Date.now();
      setTimeout(async_basic, 1000);
    });

  /************* 3 Button *****************/
  document
    .querySelector("#sync_all_fetch")
    .addEventListener("click", function (e) {
      document.querySelector("#log").value =
        "...click button " + e.target.id + "\n";
      reset_time();
      window.start = Date.now();
      setTimeout(sync_all_fetch, 1000);
    });

  /************* 4 Button *****************/
  document
    .querySelector("#async_all_fetch")
    .addEventListener("click", function (e) {
      document.querySelector("#log").value =
        "...click button " + e.target.id + "\n";
      reset_time();
      window.start = Date.now();
      setTimeout(async_all_fetch, 1000);
    });
};

/********************** 1 button ********************/
function syncron_basic(e) {
  foo("First");
  foo("Second");
  set_time(window.start, Date.now());
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
  set_time(window.start, Date.now());
}
async function afoo(name) {
  log(name + " start");
  await log(name + " middle");
  log(name + " end");
}

/********************** 3 button ********************/
async function sync_all_fetch(e) {
  log("...request worlds postal codes with 10 requests");
  let a = [];
  for (let x = 1; x <= 10; x++) {
    const n = String(x).padStart(2, "0");
    const url =
      "https://hello-await-async.myridia.com/json/postal_code_" + n + ".json";
    log(url);
    const r = await fetch(url);
    const d = await r.json();
    a.push(...d);
  }
  log("...you have you now " + a.length + "x Postalcodes in your Browser");
  log("...let me download them as postal_codes.json");
  download_file(a);
  set_time(window.start, Date.now());
}

/********************** 4 button ********************/
function async_all_fetch(e) {
  log("...request worlds postal codes with 10 requests");
  const url1 = "https://hello-await-async.myridia.com/json/postal_code_01.json";
  const url2 = "https://hello-await-async.myridia.com/json/postal_code_02.json";
  const url3 = "https://hello-await-async.myridia.com/json/postal_code_03.json";
  const url4 = "https://hello-await-async.myridia.com/json/postal_code_04.json";
  const url5 = "https://hello-await-async.myridia.com/json/postal_code_05.json";
  const url6 = "https://hello-await-async.myridia.com/json/postal_code_06.json";
  const url7 = "https://hello-await-async.myridia.com/json/postal_code_07.json";
  const url8 = "https://hello-await-async.myridia.com/json/postal_code_08.json";
  const url9 = "https://hello-await-async.myridia.com/json/postal_code_09.json";
  const url10 =
    "https://hello-await-async.myridia.com/json/postal_code_10.json";

  afetch_all(
    call_me_back,
    url1,
    url2,
    url3,
    url4,
    url5,
    url6,
    url7,
    url8,
    url9,
    url10,
  );
}

function call_me_back(m) {
  log("...got all 10 requests back and sample them together");
  m.sort((a, b) => a[1] - b[1]); // Sort Return as we requested them
  let a = [];
  for (let i in m) {
    a.push(...m[i][1]);
  }
  log("...you have now " + a.length + "x Postalcodes in your Browser");
  log("...let me download them as postal_codes.json");
  download_file(a);
  set_time(window.start, Date.now());
}

function download_file(o) {
  //Convert JSON Array to string.
  let json = JSON.stringify(o);
  //Convert JSON string to BLOB.
  json = [json];
  let blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
  //Check the Browser.
  var isIE = false || !!document.documentMode;
  if (isIE) {
    window.navigator.msSaveBlob(blob1, "postal_codes.json");
  } else {
    var url = window.URL || window.webkitURL;
    link = url.createObjectURL(blob1);
    var a = document.createElement("a");
    a.download = "postal_codes.json";
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function afetch_all(callback, ...urls) {
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
function wait_for_all(...ps) {
  return Promise.all(ps.map(this.handle_rejection));
}

async function afetch(i, url) {
  const r = await fetch(url);
  const d = await r.json();
  return [parseInt(i), d];
}

function handle_rejection(p) {
  return p.catch((error) => ({
    error,
  }));
}

/* Logger to console and textarea */
async function log(msg) {
  document.querySelector("#log").value += msg + "\n";
  console.log(msg);
}

function set_time(start, end) {
  const passed = end - start;
  document.querySelector("#time").innerHTML = passed + " milliseconds";
}

function reset_time() {
  document.querySelector("#time").innerHTML = "";
}
