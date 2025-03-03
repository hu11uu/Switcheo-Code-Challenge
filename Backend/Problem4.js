package main

import "fmt"

func sum_to_n_a(n int) int {
	// your code here
	sum := 0
    for i := 1; i <= n; i++ {
        sum += i
    }
    return sum
}

func sum_to_n_b(n int) int {
	// your code here
	return (n * (n+1)) / 2;
}

func sum_to_n_c(n int) int {
	// your code here
	if n == 1 {
        return 1
    }
    return n + sum_to_n_c(n-1)

}

func main(){
	fmt.Println(sum_to_n_a(5));
	fmt.Println(sum_to_n_b(5));
	fmt.Println(sum_to_n_c(5));
}

//func sum_to_n_a() -> Loop approach
//Time Complexity: O(n)
//Space Complexity: O(1)
//Effciency: Effcient, but slower than sum_to_n_b() approach

//func sum_to_n_b() -> Formula approach
//Time Complexity: O(1)
//Space Complexity: O(1)
//Effciency: Most effcient

//func sum_to_n_b() -> Recursive approach
//Time Complexity: O(n)
//Space Complexity: O(n)
//Effciency: Not effcient

