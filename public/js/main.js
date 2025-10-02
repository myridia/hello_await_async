window.onload = function () {
  foo("First");
  foo("Second");

  //afetch("First");
  //afetch("Second");
};

async function foo(name) {
  console.log(name, "start");
  await console.log(name, "middle");
  console.log(name, "end");
}

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
