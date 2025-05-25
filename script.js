'use strict'
// 1行目に記載している 'use strict' は削除しないでください
function test(actual, expected) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
      console.log("OK! Test PASSED.");
    } else {
      console.error("Test FAILED. Try again!");
      console.log("    actual: ", actual);
      console.log("  expected: ", expected);
      console.trace();
    }
  }

let task = document.getElementById("task");
let frequency = document.getElementById("frequency");
let work = document.getElementById("work");
let pjtValue = document.getElementById("pjt");
let other = document.getElementById("other");

let workTime = 0;
let workRe = 0;
let oneTimeWork = 0;
let pjt = 0;
let otherWork = 0;
let monthHourBefore = 0
let monthHourAfter = 0
let workTimeStr = "h";
let workReStr = "回";
let oneTimeWorkStr = "作業";
let pjtStr = "PJT";
let otherWorkStr = "";
let unitNumber = "";

const dropDownTime = document.getElementById("time");

dropDownTime.addEventListener("change", () => {
  workTimeStr = dropDownTime.selectedOptions[0].value;
});

const dropDownUnit = document.getElementById("unit")

dropDownUnit.addEventListener("change", () => {
  unitNumber = dropDownUnit.selectedOptions[0].value;
})

task.addEventListener("change", () => {
  workTime = task.value
});

frequency.addEventListener("change", () => {
  workRe = frequency.value
});

work.addEventListener("change", () => {
  oneTimeWork = work.value
});

pjtValue.addEventListener("change", () => {
  pjt = pjtValue.value
});

other.addEventListener("change", () => {
  otherWork = other.value
});


function calculateHoursBefore() {
  let strings = "";
  monthHourBefore = 1;
  const workTimeArr = [workTime, workTimeStr, "/"];
  const workReArr = [workReStr, " × ", workRe, workReStr, "/"];
  const oneTimeWorkArr = [oneTimeWorkStr, " × ", oneTimeWork, oneTimeWorkStr, "/"];
  const pjtArr = [pjtStr, " × ", pjt, pjtStr, "/"];
  const otherWorkArr = [otherWorkStr, " × ", otherWork, otherWorkStr, "/"];
  const calArr = [workTime, workRe, oneTimeWork, pjt, otherWork];
  const arrays = [workTimeArr, workReArr, oneTimeWorkArr, pjtArr, otherWorkArr];
  const stringsArr = [];
  for (let i = 0; i < calArr.length; i++) {
    if (calArr[i] != 0) {
      monthHourBefore = monthHourBefore * calArr[i];
      stringsArr.push(arrays[i]);
    }
  }
  monthHourBefore = Math.round(monthHourBefore / 12 * 100) / 100;
  stringsArr.push("年 ÷ 12カ月 = ", monthHourBefore, workTimeStr, "/月")
  const str = stringsArr.join()
  const arr = str.split(",")
  strings = arr.join("");
  if (workTime == 0 && workRe == 0 && oneTimeWork == 0 && pjt == 0 && otherWork == 0) {
    document.getElementById("resultBefore").innerText = "数値を入力してください。";
  } else if (workTime == 0) {
    document.getElementById("resultBefore").innerText = "工数を入力してください。";
  } else {
    document.getElementById("btnBefore").innerText = " 改善前再計算 "
    document.getElementById("resultBefore").innerText = strings;
    if (monthHourBefore > 0 && monthHourAfter > 0) {
      document.getElementById("result").innerText = ["改善前：", monthHourBefore, workTimeStr, "/月 - 改善後：", monthHourAfter, workTimeStr, "/月 = ", monthHourBefore - monthHourAfter, workTimeStr, "/月の工数低減"].join("");
       if (monthHourBefore - monthHourAfter >= 80) {
        document.getElementById("resultPoint").innerText = "結果ポイント：５";
      } else if (monthHourBefore - monthHourAfter >= 40) {
        document.getElementById("resultPoint").innerText = "結果ポイント：４";
      } else if (monthHourBefore - monthHourAfter >= 20) {
        document.getElementById("resultPoint").innerText = "結果ポイント：３";
      } else if (monthHourBefore - monthHourAfter >= 10) {
        document.getElementById("resultPoint").innerText = "結果ポイント：２";
      } else if (monthHourBefore - monthHourAfter >= 2) {
        document.getElementById("resultPoint").innerText = "結果ポイント：１";
      } else {
        document.getElementById("resultPoint").innerText = "結果ポイント：０";
      }
    }
  }
}

function calculateHoursAfter() {
  let strings = "";
  monthHourAfter = 1;
  const workTimeArr = [workTime, workTimeStr, "/"];
  const workReArr = [workReStr, " × ", workRe, workReStr, "/"];
  const oneTimeWorkArr = [oneTimeWorkStr, " × ", oneTimeWork, oneTimeWorkStr, "/"];
  const pjtArr = [pjtStr, " × ", pjt, pjtStr, "/"];
  const otherWorkArr = [otherWorkStr, " × ", otherWork, otherWorkStr, "/"];
  const calArr = [workTime, workRe, oneTimeWork, pjt, otherWork];
  const arrays = [workTimeArr, workReArr, oneTimeWorkArr, pjtArr, otherWorkArr];
  const stringsArr = [];
  for (let i = 0; i < calArr.length; i++) {
    if (calArr[i] != 0) {
      monthHourAfter = monthHourAfter * calArr[i];
      stringsArr.push(arrays[i]);
    }
  }
  monthHourAfter = Math.round(monthHourAfter / 12 * 100) / 100;
  stringsArr.push("年 ÷ 12カ月 = ", monthHourAfter, workTimeStr, "/月")
  const str = stringsArr.join()
  const arr = str.split(",")
  strings = arr.join("");
  if (workTime == 0 && workRe == 0 && oneTimeWork == 0 && pjt == 0 && otherWork == 0) {
    document.getElementById("resultAfter").innerText = "数値を入力してください。";
  } else if (workTime == 0) {
    document.getElementById("resultAfter").innerText = "工数を入力してください。";
  } else {
    document.getElementById("btnAfter").innerText = " 改善後再計算 "
    document.getElementById("resultAfter").innerText = strings;
    if (monthHourBefore > 0 && monthHourAfter > 0) {
      document.getElementById("result").innerText = ["改善前：", monthHourBefore, workTimeStr, "/月 - 改善後：", monthHourAfter, workTimeStr, "/月 = ", monthHourBefore - monthHourAfter, workTimeStr, "/月の工数低減"].join("");
      if (monthHourBefore - monthHourAfter >= 80) {
        document.getElementById("resultPoint").innerText = "結果ポイント：５";
      } else if (monthHourBefore - monthHourAfter >= 40) {
        document.getElementById("resultPoint").innerText = "結果ポイント：４";
      } else if (monthHourBefore - monthHourAfter >= 20) {
        document.getElementById("resultPoint").innerText = "結果ポイント：３";
      } else if (monthHourBefore - monthHourAfter >= 10) {
        document.getElementById("resultPoint").innerText = "結果ポイント：２";
      } else if (monthHourBefore - monthHourAfter >= 2) {
        document.getElementById("resultPoint").innerText = "結果ポイント：１";
      } else {
        document.getElementById("resultPoint").innerText = "結果ポイント：０";
      }
    }
  }
}

function changeUnit() {
  const unit = document.getElementById("changeUnit").value;
  if (unit != 0){
    switch(unitNumber) {
      case "2":
        document.getElementById("forFrequency").innerText = unit + "数";
        document.getElementById("forTask").innerText = "1" + unit + "の工数";
        workReStr = unit;
        break;
      case "3":
        document.getElementById("forWork").innerText = unit + "数"
        oneTimeWorkStr = unit;
        break;
      case "4":
        document.getElementById("forPjt").innerText = unit + "数"
        pjtStr = unit;
        break;
      case "5":
        document.getElementById("forOther").innerText = unit + "数"
        otherWorkStr = unit;
        break;
      case "default":
        document.getElementById("forOther").innerText = "予備の入力";
    }
  }
}

const btnBefore = document.getElementById("btnBefore");

btnBefore.addEventListener("click", calculateHoursBefore);

const btnAfter = document.getElementById("btnAfter");

btnAfter.addEventListener("click", calculateHoursAfter);


const changeBtn = document.getElementById("changeBtn");

changeBtn.addEventListener("click", changeUnit);
