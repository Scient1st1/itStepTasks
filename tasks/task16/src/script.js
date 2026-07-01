// // 5.1
// let result = Math.round(Math.sqrt(127));
// console.log(result);
// // 5.2
// let randomNum = Math.floor(Math.random() * 50) + 1;
// console.log(randomNum);
// // 5.3
// let power = Math.pow(56.23, 2);
// console.log(Math.trunc(power));
// //5.4
// let BigNum = 98;
// const isBig = BigNum > 100;

// console.log(isBig);
// // 5.5
// let num = 35;
// let notBetween;

// if (num < 10 || num > 50) {
//   notBetween = true;
// } else {
//   notBetween = false;
// }

// console.log(notBetween);

// //5.6
// let gender = "female";

// if (gender === "female") {
//   console.log("მდედრობითი სქესი");
// } else if (gender === "male") {
//   console.log("მამრობითი სქესი");
// } else {
//   console.log("გაურკვეველი სქესი");
// }

// //5.7
// let animal = "სპილო";

// if (animal !== "სპილო") {
//   console.log("ეს ცხოველი სპილო არაა");
// } else {
//   console.log("ეს ცხოველი სპილოა");
// }

// //5.8

// let num1 = 99;
// let num2 = 19;

// if (num1 > num2) {
//   console.log("num1 მეტია num2-ზე");
// } else if (num1 < num2) {
//   console.log("num1 ნაკლებია num2-ზე");
// } else {
//   console.log("num1 ტოლია num2-ის");
// }

// //5.9
// let month = 7;

// if ((month > 0 && month < 3) || month === 12) {
//   console.log("ზამთარია");
// } else if (month >= 3 && month <= 5) {
//   console.log("გაზაფხულია");
// } else if (month >= 6 && month <= 8) {
//   console.log("ზაფხულია");
// } else if (month >= 9 && month <= 11) {
//   console.log("შემოდგომაა");
// } else {
//   console.log("არასწორი თვე");
// }

// // 5.10

// let season = "winter";

// switch (season) {
//   case "winter":
//     console.log("ზამთარია");
//     break;

//   case "spring":
//     console.log("გაზაფხულია");
//     break;

//   case "summer":
//     console.log("ზაფხულია");
//     break;

//   case "autumn":
//     console.log("შემოდგომაა");
//     break;

//   default:
//     console.log("წლის პერიოდი არაა განსაზღვრული");
// }

// //5.11
// let clock = 23;
// let dayPeriod;

// if (clock >= 0 && clock < 12) {
//   dayPeriod = "AM - დღე-ღამის პირველი პერიოდია";
// } else {
//   dayPeriod = "PM - დღე-ღამის მეორე პერიოდია";
// }

// console.log(dayPeriod);

// // 5.12

// let clock2 = 23;

// let dayPeriod2 =
//   clock2 >= 0 && clock2 < 12
//     ? "AM - დღე-ღამის პირველი პერიოდია"
//     : "PM - დღე-ღამის მეორე პერიოდია";

// console.log(dayPeriod2);

// // 5.13
// let string = "Hello World";

// if (string.length > 100) {
//   console.log("ტექსტის სიგრძე აჭარბებს დაშვებულ ნორმას");
// } else {
//   console.log("ტექსტის სიგრძე დაშვებული ნორმის ფარგლებშია");
// }

// // 5.14

// let arr = [-7, 55.4, 33, 102];

// if (arr.length > 10) {
//   console.log(
//     "ეს მასივი ვერ დამუშავდება, მისი სიგრძე აჭარბებს დაშვებულ ნორმას",
//   );
// } else {
//   let sum = 0;

//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//   }

//   console.log(sum);
// }

// // 5.15

// let phone = "+995 551 169 534";

// if (phone.startsWith("+995")) {
//   console.log("ეს ქართული ტელეფონის ნომერია");
// } else {
//   console.log("ეს არ არის ქართული ტელეფონის ნომერი");
// }

// // 5.16

// let phone1 = "551 169 534";

// let myPhoneIndex = phone1.substr(0, 3);

// let indexOfBeeline = ["568", "571", "574", "579", "592", "597"];

// if (indexOfBeeline.includes(myPhoneIndex)) {
//   alert(`${phone1} - ბილაინის ნომერი`);
// } else {
//   alert(`${phone1} - გაურკვეველი ოპერატორის ნომერი`);
// }

// //5.17

// let indexOfMagti = ["599", "511", "551", "591", "595", "596", "598"];
// let indexOfSilknet = ["577", "593", "555", "557", "558", "514", "570"];
// let indexOfBeeline1 = ["568", "571", "574", "579", "592", "597"];

// let myPhone1 = prompt("შეიყვანეთ ნომერი:");

// let myPhoneIndex1 = myPhone1.substr(0, 3);

// if (indexOfMagti.includes(myPhoneIndex1)) {
//   alert("მაგთი");
// } else if (indexOfSilknet.includes(myPhoneIndex1)) {
//   alert("სილქნეტი");
// } else if (indexOfBeeline1.includes(myPhoneIndex1)) {
//   alert("ბილაინი");
// } else {
//   alert("უცნობი ოპერატორი");
// }

// // 5.18

// const delayedNotification = () => {
//   setTimeout(() => {
//     console.log("თქვენი შეკვეთა შესრულებულია");
//   }, 2000);
// };

// delayedNotification();

// //5.19
// let timerId = setInterval(() => {
//   console.log("პროცესი ჯერ არ დასრულებულა");
// }, 1000);

// setTimeout(() => {
//   clearInterval(timerId);
//   console.log("პროცესი დასრულებულია");
// }, 10000);

// 5.20
// see html

// 6.1

for (var i = 10; i < 120; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// 6.2

let arr1 = [2, 2, 3, 4, 5];

for (let i = 0; i < arr1.length; i++) {
  if (arr1[i] % 2 !== 0) {
    console.log("კენტი ელემენტი " + arr1[i] + "\n");
  }
}

// 6.3
let oddSum = 0;
for (let i = 20; i < 90; i++) {
  if (i % 2 !== 0) {
    oddSum += i;
  }
}
console.log(`კენტთა ჯამი 20-90 = ${oddSum}`);

// 6.4
let arr2 = [10, 200, 3, 40, 50];
let filteredArr2 = arr2.filter((item) => item > 30);
console.log(filteredArr2);

//6.5

let names = ["ხვიჩა", "გოგა", "მაკა", "ანა", "ინა"];
for (let i = 0; i < names.length; i++) {
  console.log(`ინდექსი ${i}, სახელი: ${names[i]}\n`);
}

//6.6

let now = new Date();
console.log(now.toLocaleDateString("ka-GE"));

// 6.7

let days = [
  "კვირა",
  "ორშაბათი",
  "სამშაბათი",
  "ოთხშაბათი",
  "ხუთშაბათი",
  "პარასკევი",
  "შაბათი",
];

let birthDay = new Date("1995-03-12");

let dayIndex = birthDay.getDay();
let actualDay = days[dayIndex];

console.log(dayIndex, actualDay);
