// 01 Digital Root
let n1 = 9875;
while (n1 >= 10) {
  let sum = 0;
  let current = n1;
  while (current > 0) {
    sum += current % 10;
    current = Math.floor(current / 10);
  }
  n1 = sum;
}
console.log("01:", n1);

// 02 Countdown Machine
console.log("02:");
for (let i = 20; i >= 0; i--) {
  if (i === 0) {
    console.log("Liftoff! 🚀");
  } else if (i % 3 === 0) {
    continue;
  } else {
    console.log(i);
  }
}

// 03 Vowel Thief
const text3 = "programming is fun";
const vowels = "aeiou";
let result3 = "";
for (const letter of text3) {
  if (!vowels.includes(letter)) {
    result3 += letter;
  }
}
console.log("03:", result3);

// 04 Savings Goal
let balance = 1000;
let months = 0;
while (balance < 5000) {
  balance = balance * 1.02 + 150;
  months++;
}
console.log("04:", months, balance.toFixed(2));

// 05 Longest Streak
const temps = [18, 22, 25, 21, 19, 23, 24, 26, 22, 17];
let currentStreak = 0;
let longestStreak = 0;
for (const t of temps) {
  if (t > 20) {
    currentStreak++;
    if (currentStreak > longestStreak) longestStreak = currentStreak;
  } else {
    currentStreak = 0;
  }
}
console.log("05:", longestStreak);

// 06 Run-Length Encoding
const text6 = "aaabbbbcd";
let result6 = "";
let count = 1;
for (let i = 0; i < text6.length; i++) {
  if (text6[i] === text6[i + 1]) {
    count++;
  } else {
    result6 += text6[i] + count;
    count = 1;
  }
}
console.log("06:", result6);

// 07 Collatz Conjecture
let n7 = 27;
let steps = 0;
while (n7 !== 1) {
  if (n7 % 2 === 0) {
    n7 = n7 / 2;
  } else {
    n7 = n7 * 3 + 1;
  }
  steps++;
}
console.log("07:", steps);

// 08 Dice Duel
let rolls = 0;
let die1, die2;
do {
  die1 = Math.floor(Math.random() * 6) + 1;
  die2 = Math.floor(Math.random() * 6) + 1;
  rolls++;
} while (die1 !== 6 || die2 !== 6);
console.log("08:", rolls);

// 09 Caesar Cipher
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const word = "hello";
const shift = 3;
let encrypted = "";
for (const letter of word) {
  const index = alphabet.indexOf(letter);
  const newIndex = (index + shift) % 26;
  encrypted += alphabet[newIndex];
}
console.log("09:", encrypted);

// 10 Word Flipper
const text10 = "me love loops really I";
const words = text10.split(" ");
let result10 = "";
for (let i = words.length - 1; i >= 0; i--) {
  result10 += words[i];
  if (i > 0) result10 += " ";
}
console.log("10:", result10);

// 11 Emoji Poll
const votes = ["👍", "❤️", "👍", "😂", "👍", "❤️", "😂", "👍"];
const counts = {};
for (const vote of votes) {
  if (counts[vote] === undefined) {
    counts[vote] = 1;
  } else {
    counts[vote]++;
  }
}
let winner = "";
let max = 0;
for (const emoji in counts) {
  if (counts[emoji] > max) {
    max = counts[emoji];
    winner = emoji;
  }
}
console.log("11:", winner);

// 12 Luhn Check
const card = "79927398713";
let sum12 = 0;
let position = 0;
for (let i = card.length - 1; i >= 0; i--) {
  let digit = Number(card[i]);
  if (position % 2 === 1) {
    digit = digit * 2;
    if (digit > 9) digit -= 9;
  }
  sum12 += digit;
  position++;
}
console.log("12:", sum12 % 10 === 0 ? "ვალიდურია ✅" : "არავალიდურია ❌");

// 13 Perfect Numbers
console.log("13:");
for (let n = 2; n <= 10000; n++) {
  let divisorSum = 0;
  for (let d = 1; d < n; d++) {
    if (n % d === 0) {
      divisorSum += d;
    }
  }
  if (divisorSum === n) {
    console.log(n);
  }
}

// 14 Kaprekar's Constant
let n14 = 3524;
let steps14 = 0;
while (n14 !== 6174) {
  const digits = String(n14).padStart(4, "0").split("");
  const asc = Number(digits.slice().sort().join(""));
  const desc = Number(digits.slice().sort().reverse().join(""));
  n14 = desc - asc;
  steps14++;
}
console.log("14:", steps14);

// 15 Josephus Circle
const people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const k = 3;
let index15 = 0;
while (people.length > 1) {
  index15 = (index15 + k - 1) % people.length;
  people.splice(index15, 1);
}
console.log("15:", people[0]);
