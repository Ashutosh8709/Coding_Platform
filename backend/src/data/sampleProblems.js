import { Problem } from "../models/problem.model.js";

export const starterProblems = [
  /* ================= EASY (15) ================= */

  {
    title: "Two Sum",
    description:
      "Return indices of two numbers such that they add up to target.",
    inputFormat: "Array + target",
    outputFormat: "Indices",
    constraints: "2 ≤ n ≤ 10^4",
    difficulty: "Easy",
    testCases: [{ input: "2 7 11 15\n9", output: "0 1" }],
  },

  {
    title: "Valid Parentheses",
    description: "Check if parentheses string is valid.",
    inputFormat: "String",
    outputFormat: "true/false",
    constraints: "1 ≤ n ≤ 10^4",
    difficulty: "Easy",
    testCases: [{ input: "()", output: "true" }],
  },

  {
    title: "Binary Search",
    description: "Return index of target in sorted array.",
    inputFormat: "Sorted array + target",
    outputFormat: "Index",
    constraints: "1 ≤ n ≤ 10^5",
    difficulty: "Easy",
    testCases: [{ input: "1 2 3 4 5\n4", output: "3" }],
  },

  {
    title: "Reverse String",
    description: "Reverse input string.",
    inputFormat: "String",
    outputFormat: "String",
    constraints: "1 ≤ n ≤ 10^5",
    difficulty: "Easy",
    testCases: [{ input: "hello", output: "olleh" }],
  },

  {
    title: "Palindrome Number",
    description: "Check if integer is palindrome.",
    inputFormat: "Integer",
    outputFormat: "true/false",
    constraints: "-2^31 ≤ x ≤ 2^31-1",
    difficulty: "Easy",
    testCases: [{ input: "121", output: "true" }],
  },

  {
    title: "Merge Sorted Arrays",
    description: "Merge two sorted arrays.",
    inputFormat: "Array1 + Array2",
    outputFormat: "Merged array",
    constraints: "n ≤ 10^5",
    difficulty: "Easy",
    testCases: [{ input: "1 3 5\n2 4 6", output: "1 2 3 4 5 6" }],
  },

  {
    title: "Remove Duplicates",
    description: "Remove duplicates from sorted array.",
    inputFormat: "Sorted array",
    outputFormat: "Unique length",
    constraints: "1 ≤ n ≤ 10^5",
    difficulty: "Easy",
    testCases: [{ input: "1 1 2", output: "2" }],
  },

  {
    title: "FizzBuzz",
    description: "Print FizzBuzz sequence.",
    inputFormat: "Integer n",
    outputFormat: "Sequence",
    constraints: "1 ≤ n ≤ 10^4",
    difficulty: "Easy",
    testCases: [{ input: "5", output: "1 2 Fizz 4 Buzz" }],
  },

  {
    title: "Maximum Depth Binary Tree",
    description: "Find maximum depth of binary tree.",
    inputFormat: "Tree",
    outputFormat: "Depth",
    constraints: "Nodes ≤ 10^4",
    difficulty: "Easy",
    testCases: [{ input: "[3,9,20,null,null,15,7]", output: "3" }],
  },

  {
    title: "Contains Duplicate",
    description: "Return true if array contains duplicate.",
    inputFormat: "Array",
    outputFormat: "true/false",
    constraints: "n ≤ 10^5",
    difficulty: "Easy",
    testCases: [{ input: "1 2 3 1", output: "true" }],
  },

  {
    title: "Climbing Stairs",
    description: "Count ways to climb stairs.",
    inputFormat: "Integer n",
    outputFormat: "Ways",
    constraints: "1 ≤ n ≤ 45",
    difficulty: "Easy",
    testCases: [{ input: "3", output: "3" }],
  },

  {
    title: "Intersection of Two Arrays",
    description: "Return intersection of two arrays.",
    inputFormat: "Array1 + Array2",
    outputFormat: "Intersection",
    constraints: "n ≤ 10^4",
    difficulty: "Easy",
    testCases: [{ input: "1 2 2 1\n2 2", output: "2" }],
  },

  {
    title: "Single Number",
    description: "Find element appearing once.",
    inputFormat: "Array",
    outputFormat: "Integer",
    constraints: "n ≤ 10^5",
    difficulty: "Easy",
    testCases: [{ input: "2 2 1", output: "1" }],
  },

  {
    title: "Move Zeroes",
    description: "Move zeroes to end.",
    inputFormat: "Array",
    outputFormat: "Modified array",
    constraints: "n ≤ 10^4",
    difficulty: "Easy",
    testCases: [{ input: "0 1 0 3 12", output: "1 3 12 0 0" }],
  },

  {
    title: "Valid Anagram",
    description: "Check if two strings are anagrams.",
    inputFormat: "String1 + String2",
    outputFormat: "true/false",
    constraints: "n ≤ 10^5",
    difficulty: "Easy",
    testCases: [{ input: "anagram\nnagaram", output: "true" }],
  },

  /* ================= MEDIUM (20) ================= */

  {
    title: "Maximum Subarray",
    description: "Find max sum subarray.",
    inputFormat: "Array",
    outputFormat: "Max sum",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "-2 1 -3 4 -1 2 1 -5 4", output: "6" }],
  },

  {
    title: "Longest Substring Without Repeating",
    description: "Length of longest unique substring.",
    inputFormat: "String",
    outputFormat: "Length",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "abcabcbb", output: "3" }],
  },

  {
    title: "3Sum",
    description: "Find triplets sum to zero.",
    inputFormat: "Array",
    outputFormat: "Triplets",
    constraints: "n ≤ 10^4",
    difficulty: "Medium",
    testCases: [{ input: "-1 0 1 2 -1 -4", output: "[-1,-1,2],[-1,0,1]" }],
  },

  {
    title: "Rotate Array",
    description: "Rotate array by k steps.",
    inputFormat: "Array + k",
    outputFormat: "Rotated array",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "1 2 3 4 5\n2", output: "4 5 1 2 3" }],
  },

  {
    title: "Group Anagrams",
    description: "Group anagrams together.",
    inputFormat: "String list",
    outputFormat: "Grouped",
    constraints: "n ≤ 10^4",
    difficulty: "Medium",
    testCases: [{ input: "eat tea tan ate nat bat", output: "groups" }],
  },

  {
    title: "Kth Largest Element",
    description: "Find kth largest element.",
    inputFormat: "Array + k",
    outputFormat: "Integer",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "3 2 1 5 6 4\n2", output: "5" }],
  },

  {
    title: "Number of Islands",
    description: "Count islands in grid.",
    inputFormat: "Grid",
    outputFormat: "Integer",
    constraints: "m,n ≤ 300",
    difficulty: "Medium",
    testCases: [{ input: "11110,11010,11000,00000", output: "1" }],
  },

  {
    title: "Merge Intervals",
    description: "Merge overlapping intervals.",
    inputFormat: "Intervals",
    outputFormat: "Merged intervals",
    constraints: "n ≤ 10^4",
    difficulty: "Medium",
    testCases: [{ input: "1 3,2 6,8 10", output: "1 6,8 10" }],
  },

  {
    title: "Search Rotated Sorted Array",
    description: "Search in rotated array.",
    inputFormat: "Array + target",
    outputFormat: "Index",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "4 5 6 7 0 1 2\n0", output: "4" }],
  },

  {
    title: "Container With Most Water",
    description: "Find max water container.",
    inputFormat: "Array",
    outputFormat: "Max water",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "1 8 6 2 5 4 8 3 7", output: "49" }],
  },

  {
    title: "Subarray Sum Equals K",
    description: "Count subarrays equal k.",
    inputFormat: "Array + k",
    outputFormat: "Count",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "1 1 1\n2", output: "2" }],
  },

  {
    title: "Permutations",
    description: "Generate all permutations.",
    inputFormat: "Array",
    outputFormat: "Permutations",
    constraints: "n ≤ 6",
    difficulty: "Medium",
    testCases: [{ input: "1 2 3", output: "6 permutations" }],
  },

  {
    title: "Product of Array Except Self",
    description: "Return product except self.",
    inputFormat: "Array",
    outputFormat: "Array",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "1 2 3 4", output: "24 12 8 6" }],
  },

  {
    title: "Find Peak Element",
    description: "Find peak element index.",
    inputFormat: "Array",
    outputFormat: "Index",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "1 2 3 1", output: "2" }],
  },

  {
    title: "Coin Change",
    description: "Minimum coins to make amount.",
    inputFormat: "Coins + amount",
    outputFormat: "Minimum coins",
    constraints: "amount ≤ 10^4",
    difficulty: "Medium",
    testCases: [{ input: "1 2 5\n11", output: "3" }],
  },

  {
    title: "Word Break",
    description: "Check if string can be segmented.",
    inputFormat: "String + dictionary",
    outputFormat: "true/false",
    constraints: "n ≤ 10^4",
    difficulty: "Medium",
    testCases: [{ input: "leetcode\nleet code", output: "true" }],
  },

  {
    title: "Course Schedule",
    description: "Detect if courses can be finished.",
    inputFormat: "Courses + prerequisites",
    outputFormat: "true/false",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "2\n1 0", output: "true" }],
  },

  {
    title: "Validate BST",
    description: "Check if tree is valid BST.",
    inputFormat: "Tree",
    outputFormat: "true/false",
    constraints: "nodes ≤ 10^4",
    difficulty: "Medium",
    testCases: [{ input: "[2,1,3]", output: "true" }],
  },

  {
    title: "Spiral Matrix",
    description: "Return spiral order.",
    inputFormat: "Matrix",
    outputFormat: "Spiral order",
    constraints: "m,n ≤ 100",
    difficulty: "Medium",
    testCases: [
      { input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "1 2 3 6 9 8 7 4 5" },
    ],
  },

  {
    title: "Longest Increasing Subsequence",
    description: "Length of LIS.",
    inputFormat: "Array",
    outputFormat: "Length",
    constraints: "n ≤ 10^5",
    difficulty: "Medium",
    testCases: [{ input: "10 9 2 5 3 7 101 18", output: "4" }],
  },

  /* ================= HARD (15) ================= */

  {
    title: "Trapping Rain Water",
    description: "Compute trapped rainwater.",
    inputFormat: "Array",
    outputFormat: "Water amount",
    constraints: "n ≤ 10^5",
    difficulty: "Hard",
    testCases: [{ input: "0 1 0 2 1 0 1 3 2 1 2 1", output: "6" }],
  },

  {
    title: "LRU Cache Design",
    description: "Design LRU cache.",
    inputFormat: "Operations",
    outputFormat: "Results",
    constraints: "ops ≤ 10^5",
    difficulty: "Hard",
    testCases: [{ input: "put 1 1,get 1", output: "1" }],
  },

  {
    title: "Median of Two Sorted Arrays",
    description: "Find median efficiently.",
    inputFormat: "Array1 + Array2",
    outputFormat: "Median",
    constraints: "n ≤ 10^6",
    difficulty: "Hard",
    testCases: [{ input: "1 3\n2", output: "2" }],
  },

  {
    title: "Word Ladder",
    description: "Shortest transformation sequence.",
    inputFormat: "begin,end,wordList",
    outputFormat: "Length",
    constraints: "n ≤ 10^4",
    difficulty: "Hard",
    testCases: [{ input: "hit,cog,hot dot dog lot log cog", output: "5" }],
  },

  {
    title: "Serialize Deserialize Binary Tree",
    description: "Serialize tree.",
    inputFormat: "Tree",
    outputFormat: "Serialized",
    constraints: "nodes ≤ 10^4",
    difficulty: "Hard",
    testCases: [{ input: "[1,2,3,null,null,4,5]", output: "serialized" }],
  },

  {
    title: "N-Queens",
    description: "Return number of N-Queens solutions.",
    inputFormat: "Integer n",
    outputFormat: "Count",
    constraints: "1 ≤ n ≤ 9",
    difficulty: "Hard",
    testCases: [{ input: "4", output: "2" }],
  },

  {
    title: "Edit Distance",
    description: "Minimum edit operations.",
    inputFormat: "Word1 + Word2",
    outputFormat: "Distance",
    constraints: "n ≤ 500",
    difficulty: "Hard",
    testCases: [{ input: "horse\nros", output: "3" }],
  },

  {
    title: "Burst Balloons",
    description: "Max coins.",
    inputFormat: "Array",
    outputFormat: "Coins",
    constraints: "n ≤ 300",
    difficulty: "Hard",
    testCases: [{ input: "3 1 5 8", output: "167" }],
  },

  {
    title: "Maximum Rectangle",
    description: "Largest rectangle in matrix.",
    inputFormat: "Binary matrix",
    outputFormat: "Area",
    constraints: "m,n ≤ 200",
    difficulty: "Hard",
    testCases: [{ input: "matrix", output: "6" }],
  },

  {
    title: "Alien Dictionary",
    description: "Determine character order.",
    inputFormat: "Words list",
    outputFormat: "Order",
    constraints: "n ≤ 10^4",
    difficulty: "Hard",
    testCases: [{ input: "wrt wrf er ett rftt", output: "wertf" }],
  },

  {
    title: "Minimum Window Substring",
    description: "Smallest substring containing all chars.",
    inputFormat: "String + pattern",
    outputFormat: "Substring",
    constraints: "n ≤ 10^5",
    difficulty: "Hard",
    testCases: [{ input: "ADOBECODEBANC\nABC", output: "BANC" }],
  },

  {
    title: "Sudoku Solver",
    description: "Solve sudoku board.",
    inputFormat: "9x9 board",
    outputFormat: "Solved board",
    constraints: "Standard sudoku",
    difficulty: "Hard",
    testCases: [{ input: "board", output: "solved" }],
  },

  {
    title: "Merge K Sorted Lists",
    description: "Merge k linked lists.",
    inputFormat: "Lists",
    outputFormat: "Merged list",
    constraints: "k ≤ 10^4",
    difficulty: "Hard",
    testCases: [{ input: "lists", output: "merged" }],
  },

  {
    title: "Regular Expression Matching",
    description: "Implement regex match.",
    inputFormat: "String + pattern",
    outputFormat: "true/false",
    constraints: "n ≤ 1000",
    difficulty: "Hard",
    testCases: [{ input: "aa\na*", output: "true" }],
  },

  {
    title: "Maximum Flow",
    description: "Compute max flow in graph.",
    inputFormat: "Graph",
    outputFormat: "Max flow",
    constraints: "nodes ≤ 200",
    difficulty: "Hard",
    testCases: [{ input: "graph", output: "flow" }],
  },
];

const sampleProblem = {
  title: "Two Sum",

  description: `
Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.

You may assume exactly one solution exists.
  `,

  inputFormat: `
First line: integer n
Second line: n space separated integers
Third line: target integer
  `,

  outputFormat: `
Two integers representing indices.
  `,

  constraints: `
2 ≤ n ≤ 10^4
-10^9 ≤ nums[i] ≤ 10^9
  `,

  difficulty: "Easy",

  testCases: [
    {
      input: `4
2 7 11 15
9`,
      output: `0 1`,
      explanation: "nums[0] + nums[1] = 9",
    },
  ],

  hiddenTestCases: [
    {
      input: `3
3 2 4
6`,
      output: `1 2`,
    },
    {
      input: `2
3 3
6`,
      output: `0 1`,
    },
  ],

  execution: {
    functionName: "twoSum",

    // ⭐ CODE USER SEES IN EDITOR
    starterCode: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {

        // Write your code here

    }
};`,

      javascript: `var twoSum = function(nums, target) {

    // Write your code here

};`,

      python: `class Solution:
    def twoSum(self, nums, target):

        # Write your code here
        pass`,

      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {

        // Write your code here

    }
}`,
    },

    // ⭐ DRIVER CODE (JUDGE ONLY — USER NEVER SEES)
    driverCode: {
      cpp: `
#include<bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main(){

    int n;
    cin>>n;

    vector<int> nums(n);

    for(int i=0;i<n;i++)
        cin>>nums[i];

    int target;
    cin>>target;

    Solution sol;
    vector<int> ans = sol.twoSum(nums,target);

    cout<<ans[0]<<" "<<ans[1];
}
`,

      javascript: `
{{USER_CODE}}

const readline = require('readline');

const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

let data = [];

rl.on('line', line => data.push(line));

rl.on('close', () => {

 const n = Number(data[0]);
 const nums = data[1].split(" ").map(Number);
 const target = Number(data[2]);

 const res = twoSum(nums,target);

 console.log(res.join(" "));
});
`,

      python: `
{{USER_CODE}}

n = int(input())
nums = list(map(int,input().split()))
target = int(input())

sol = Solution()
ans = sol.twoSum(nums,target)

print(*ans)
`,

      java: `
import java.util.*;

{{USER_CODE}}

public class Main {

 public static void main(String[] args){

  Scanner sc = new Scanner(System.in);

  int n = sc.nextInt();

  int[] nums = new int[n];

  for(int i=0;i<n;i++)
    nums[i] = sc.nextInt();

  int target = sc.nextInt();

  Solution sol = new Solution();

  int[] ans = sol.twoSum(nums,target);

  System.out.println(ans[0]+" "+ans[1]);

 }
}
`,
    },
  },
};

const addProblem = async () => {
  try {
    await Problem.insertOne(sampleProblem);
  } catch (error) {
    console.log(error.message);
  }
  return;
};

export { addProblem };
