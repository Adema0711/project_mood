let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)

let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined

let user = null;
let x = 0;

user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++

alert(x); // 0, value not incremented

let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)

let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

let user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"