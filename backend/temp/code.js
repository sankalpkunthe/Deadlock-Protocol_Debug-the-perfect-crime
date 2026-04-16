function isPalindrome(s) {
  // remove non-alphanumeric + convert to lowercase
  let clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  // reverse and compare
  let reversed = clean.split("").reverse().join("");

  return clean === reversed;
}


// for your judge (stdin style)
const input = require("fs").readFileSync(0, "utf-8").trim();

console.log(isPalindrome(input));