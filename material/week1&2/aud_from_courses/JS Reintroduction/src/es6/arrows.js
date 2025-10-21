// Arrow functions

var evens = [2, 4, 6, 8, 10]; // Create an array
console.log("evens: ", evens);

// Expression bodies

//The code:
var odds = evens.map(function(v){return v + 1} );

// Can be written as:
var odds_arrow = evens.map(v => v + 1);

console.log("odds: ", odds, '\n', 'odds_arrow:', odds_arrow);

var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));

// Statement bodies
nums.forEach(v => {
    if (v % 5 === 0)
        fives.push(v);
});

// Lexical this
var bob = {
    _name: "Bob",
    _friends: [],
    printFriends() {
        this._friends.forEach(f =>
                              console.log(this._name + " knows " + f));
    }
};

