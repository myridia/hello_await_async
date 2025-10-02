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

/*
async function afetch(name) {
  console.log(name, "start");
  // Replace with your API
  const url =
    "http://127.0.0.1:8088/gold_pvd_loss_controls?date_from=20250801&ldate_until=20250731&ldate_from=20250701&date_until=20250831&clear_cache=1";
  //await console.log(name, "middle");
  const r = await fetch(url);
  const d = await r.json();
  console.log(name, "end");
}
*/

/* Logger to console and textarea */
async function log(msg) {
  document.querySelector("#log").value += msg + "\n";
  console.log(msg);
}
