// ==========================================
// ლექცია 6 [21] - საშინაო დავალება
// ==========================================

// დავალება 6.1
console.log("--- დავალება 6.1 ---");
for (let i = 55; i <= 77; i++) {
  console.log(i);
}

// დავალება 6.2
console.log("--- დავალება 6.2 ---");
for (let i = 10; i <= 120; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

// დავალება 6.3
console.log("--- დავალება 6.3 ---");
for (let i = 110; i >= 90; i--) {
  console.log(i);
}

// დავალება 6.4
console.log("--- დავალება 6.4 ---");
let toys1 = ["ოვერბორდი", "პაზლი", "Lego", "Yo-yo"];
for (let i = 1; i < toys1.length - 1; i++) {
  console.log(toys1[i]);
}

// დავალება 6.5
console.log("--- დავალება 6.5 ---");
// შეცდომა იყო პირობაში i <= toys.length. ბოლო ინდექსია length - 1.
let toys2 = ["ოვერბორდი", "პაზლი", "Lego", "Yo-yo"];
for (let i = 0; i < toys2.length; i++) {
  console.log(toys2[i]);
}

// დავალება 6.6
console.log("--- დავალება 6.6 ---");
let arr1 = [2, 2, 3, 4, 5];
for (let element of arr1) {
  console.log(element);
}

// დავალება 6.7
console.log("--- დავალება 6.7 ---");
let i1 = 10;
while (i1 <= 30) {
  console.log(i1);
  i1++;
}

// დავალება 6.8
console.log("--- დავალება 6.8 ---");
let i2 = 1;
while (i2 <= 10) {
  console.log(i2 * i2);
  i2++;
}

// დავალება 6.9
console.log("--- დავალება 6.9 ---");
let arr2 = [2, 2, 3, 4, 5];
for (let element of arr2) {
  if (element % 2 === 0) {
    console.log(element);
  }
}

// დავალება 6.10
console.log("--- დავალება 6.10 ---");
let arr3 = [1, 77, 9, 17, 4, 3, 9, 8, 20];
for (let i = 0; i < arr3.length; i++) {
  if (arr3[i] > 5 && arr3[i] < 10) {
    console.log(arr3[i]);
  }
}

// დავალება 6.11
console.log("--- დავალება 6.11 ---");
let object1 = { a: 7, b: 8, c: 15, d: 20, e: 55 };
for (let key in object1) {
  if (object1[key] % 2 === 0) {
    console.log(object1[key]);
  }
}

// დავალება 6.12
console.log("--- დავალება 6.12 ---");
let sum1 = 0;
for (let i = 10; i <= 80; i++) {
  if (i % 2 === 0) {
    sum1 += i;
  }
}
console.log(sum1);

// დავალება 6.13
console.log("--- დავალება 6.13 ---");
let product1 = 1;
for (let i = 5; i <= 30; i++) {
  product1 *= i;
}
console.log(product1);

// დავალება 6.14
console.log("--- დავალება 6.14 ---");
let str1 = "";
for (let i = 2; i <= 14; i += 2) {
  str1 += i;
}
console.log(str1);

// დავალება 6.15
console.log("--- დავალება 6.15 ---");
let str2 = "-";
for (let i = 11; i >= 3; i--) {
  str2 += i + "-";
}
console.log(str2);

// დავალება 6.16
console.log("--- დავალება 6.16 ---");
for (let i = 50; i <= 500; i++) {
  let strNum = i.toString();
  let digit1 = parseInt(strNum[0]);
  let digit2 = parseInt(strNum[1]);
  if (digit1 + digit2 === 4) {
    console.log(i);
  }
}

// დავალება 6.17
console.log("--- დავალება 6.17 ---");
let arr4 = [10.8, 7.227, 9, 17.34, 10.34, 3, 7.9, -8, 20, 100, 77, 345.67];
let sum2 = 0;
for (let i = 0; i < arr4.length; i++) {
  if (arr4[i] < 0) {
    break;
  }
  sum2 += arr4[i];
}
console.log(sum2);

// დავალება 5.18
console.log("--- დავალება 5.18 ---");
let names1 = [
  "ხვიჩა",
  "გოგა",
  "მაკა",
  "ანა",
  "ინა",
  "მაიკლი",
  "ფანტომასი",
  "ბონდო",
  "ობამა",
  "მესი",
  "მარადონა",
];
let position = names1.indexOf("ფანტომასი");
console.log(position);

// დავალება 5.19
console.log("--- დავალება 5.19 ---");
let sum3 = 0;
let count1 = 0;
while (sum3 <= 200) {
  count1++;
  sum3 += count1;
}
console.log(count1);

// დავალება 5.20
console.log("--- დავალება 5.20 ---");
// კოდის გაშვების გარეშე: დაიბეჭდება "11223344"
console.log("11223344");

// დავალება 5.21
console.log("--- დავალება 5.21 ---");
let matr1 = [
  [128, 52, 6, 76, 200],
  [95, 36, 2, 44, 300],
  [2, 4, 7, 9, 2],
];
let sumsArray = [];
for (let i = 0; i < matr1.length; i++) {
  let rowSum = 0;
  for (let j = 0; j < matr1[i].length; j++) {
    rowSum += matr1[i][j];
  }
  sumsArray.push(rowSum);
}
console.log(sumsArray);

// დავალება 5.22
console.log("--- დავალება 5.22 ---");
// კონსოლზე გამოვა ReferenceError, რადგან num ბლოკურ Scope-შია (let).
console.log("ReferenceError: num is not defined");

// დავალება 5.23
console.log("--- დავალება 5.23 ---");
let emptyArr = [];
for (let i = 20; i <= 40; i++) {
  emptyArr.push(i);
}
console.log(emptyArr);

// დავალება 5.24
console.log("--- დავალება 5.24 ---");
let arr5 = [1, -77, 9, 17, -4, 3, 9, -8, 20];
let positiveArr = [];
for (let i = 0; i < arr5.length; i++) {
  if (arr5[i] > 0) {
    positiveArr.push(arr5[i]);
  }
}
console.log(positiveArr);

// დავალება 5.25
console.log("--- დავალება 5.25 ---");
let arr6 = [10.8, 7.227, 9, 17.34, 10.34, 3, 7.9, -8, 20, 100, 77, 345.67];
for (let i = 0; i < arr6.length; i++) {
  arr6[i] = arr6[i] * arr6[i];
}
console.log(arr6);

// დავალება 5.26
console.log("--- დავალება 5.26 ---");
let obj1 = {};
let keys1 = ["ორ.", "სამშ.", "ოთხ.", "ხუთ.", "პარ.", "შაბ.", "კვ."];
let values1 = [1, 2, 3, 4, 5, 6, 7];
for (let i = 0; i < keys1.length; i++) {
  obj1[keys1[i]] = values1[i];
}
console.log(obj1);

// დავალება 5.27
console.log("--- დავალება 5.27 ---");
let cars1 = {
  BMW: "შავი",
  Mercedes: "ვერცხლისფერი",
  Nissan: "შავი",
  Ford: "წითელი",
  Toyota: "შავი",
};
let blackCars = {};
for (let key in cars1) {
  if (cars1[key] === "შავი") {
    blackCars[key] = cars1[key];
  }
}
console.log(blackCars);

// დავალება 5.28
console.log("--- დავალება 5.28 ---");
let currentDay = new Date().getDay();
let dayText = "";
if (currentDay === 0 || currentDay === 6) {
  dayText = "დასვენების დღე";
} else {
  dayText = "სამუშაო დღე";
}
document.write(dayText);

// დავალება 5.29
console.log("--- დავალება 5.29 ---");
let months1 = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];
let currentMonthIndex = new Date().getMonth();
console.log(months1[currentMonthIndex]);
