let i = 3;

while (i) {
  alert( i-- );
}// answer 1
let i = 3;

alert(i--); // shows 3, decreases i to 2

alert(i--) // shows 2, decreases i to 1

alert(i--) // shows 1, decreases i to 0

// done, while(i) check stops the loop

for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );//The answer: from 0 to 4 in both cases

for (let i = 0; i < 3; i++) {
  alert( `number ${i}!` );
}

let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);