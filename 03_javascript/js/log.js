const person = {
  name: "John Doe",
  numHats: 2,
  isSmart: true,
};

if (typeof Storage !== "undefined") {
  // Use this statement to check for browser support

  // Store the object above
  window.localStorage.setItem("person", person);
}

window.localStorage.getItem("person"); // '[object Object]'

const person = {
  name: "John Doe",
  numHats: 2,
  isSmart: true,
};

if (typeof Storage !== "undefined") {
  // Use this statement to check for browser support

  // Store the object above without JSON
  localStorage.setItem("person", person);
  localStorage.getItem("person"); // '[object Object]' OH NO!

  // Store the object above with JSON
  localStorage.setItem("person", JSON.stringify(person));
  JSON.parse(localStorage.getItem("person")); // {name: 'John Doe', numHats: 2, isSmart: true}
}

if (typeof Storage !== "undefined") {
  // Use this statement to check for browser support

  // Store some data
  window.localStorage.setItem("name", "John Doe"); // or localStorage.name = "John Doe"
  window.localStorage.setItem("numHats", 2); // or localStorage.numHats = 2
  window.localStorage.setItem("isSmart", true); // or localStorage.isSmart = true
}

window.localStorage.getItem("name"); // or localStorage.name;
// 'John Doe'
window.localStorage.getItem("numHats"); // or localStorage.numHats;
// '2'
window.localStorage.getItem("numHats"); // or localStorage.numHats;
// 'true'
