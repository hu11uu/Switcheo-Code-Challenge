//Using For Loop
var sum_to_n_a = function(n) {
    // your code here
    let sum = 0;
    for(let i  = 1; i <= n; i++){
        sum += i;
    }

    return sum;

};

console.log("Using for loop: " + sum_to_n_a(5));

//Using Recursion
var sum_to_n_b = function(n) {
    if(n === 1)
        return 1;
    return n + sum_to_n_b(n-1);
}

console.log("Using recursion: " + sum_to_n_b(5));

//Using Bit Shift
var sum_to_n_c = function(n){
    return(n * (n+1)) >> 1;
}

console.log("Using bit shift: " + sum_to_n_c(5));

