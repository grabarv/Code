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

  code = code.split("");
  code = code.map(function (el) {
    if (el === "0") return -1;
    if (el === "1") return 1;
  });

  code = code.reduce(function (acc, el) {
    if (acc.length === 0) return [el];
    if ((acc.at(-1) > 0 && el > 0) || (acc.at(-1) < 0 && el < 0))
      acc[acc.length - 1] = el + acc.at(-1);
    else acc.push(el);
    return acc;
  }, []);
  code = code.map((el) => {
    if (el > 0) {
      return `${el}xknock`;
    } else {
      return `${-el}s pause`;
    }
  });
  code = code.toString().replaceAll(",", ", ");
  const html = `<h1> Todays code is: <span>${code}<span>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", html);
  document.querySelector("span").style.backgroundColor = "rgb(123, 209, 9)";
}
