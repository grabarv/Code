const seed = 1234;
const startDate = new Date(2025, 4, 8);
const curDate = new Date();
const daysPassed = Math.trunc(
  (curDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24
);
let pseudoRandom = seed;

updateCode();

function updateCode() {
  for (let i = 0; i <= daysPassed; i++) {
    pseudoRandom **= 2;

    pseudoRandom = Math.trunc(pseudoRandom / 100);
    pseudoRandom = pseudoRandom % 10000;
  }
  let code = (pseudoRandom % 64).toString(2);
  while (code.endsWith("0")) code = code.slice(0, -1);
  let knockCode = code
    .split("")
    .reduce((acc, c) => (c === "1" ? acc + " 1xknock" : acc + " 1s_pause"), "");
  knockCode = knockCode.split(" ").slice(1);
  knockCode.forEach((el, i, arr) => {
    if (i === arr.length - 1) return;
    if (
      (el.endsWith("knock") && arr[i + 1].endsWith("knock")) ||
      (el.endsWith("pause") && arr[i + 1].endsWith("pause"))
    ) {
      let times = Number.parseInt(el);
      times++;
      arr[i] = times + el.slice(Number.parseInt(el).toString().length);
      arr.splice(i + 1, 1);
    }
  });
  knockCode = knockCode.join();
  knockCode = knockCode.replaceAll(",", ", ").replaceAll("s_", "s ");

  const html = `<h1> Todays code is: <span>${knockCode}<span>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", html);
  document.querySelector("span").style.backgroundColor = "rgb(123, 209, 9)";
}
