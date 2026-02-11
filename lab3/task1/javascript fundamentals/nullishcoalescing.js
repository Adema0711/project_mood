let x = 1 && 2 ?? 3; // Syntax error

let x = (1 && 2) ?? 3; // Works

alert(x); // 2

// set height=100, if height is null or undefined
height = height ?? 100;

let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000

// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works this way (not what we want):
let area = height ?? (100 * width) ?? 50;

let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder