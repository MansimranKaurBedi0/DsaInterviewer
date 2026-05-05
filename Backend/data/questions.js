const questions = {
  arrays: {
    easy: [
      { title: "Find Maximum", problem: "Find the maximum element in an array." },
      { title: "Find Minimum", problem: "Find the minimum element in an array." },
      { title: "Reverse Array", problem: "Reverse the array in-place." },
      { title: "Contains Duplicate", problem: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct." }
    ],
    medium: [
      { title: "Two Sum", problem: "Given an array of integers and a target, return indices of two numbers whose sum equals target." },
      { title: "Top K Frequent Elements", problem: "Given an integer array nums and an integer k, return the k most frequent elements." },
      { title: "Product of Array Except Self", problem: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]." }
    ],
    hard: [
      { title: "Trapping Rain Water", problem: "Compute how much water can be trapped after raining." },
      { title: "First Missing Positive", problem: "Given an unsorted integer array nums, return the smallest missing positive integer." }
    ]
  },
  two_pointers: {
    easy: [
      { title: "Valid Palindrome", problem: "Given a string s, return true if it is a palindrome, or false otherwise." },
      { title: "Reverse String", problem: "Write a function that reverses a string. The input string is given as an array of characters s." }
    ],
    medium: [
      { title: "3Sum", problem: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0." },
      { title: "Container With Most Water", problem: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water." }
    ],
    hard: [
      { title: "Trapping Rain Water (Two Pointers)", problem: "Solve Trapping Rain water using two pointers with O(1) space." }
    ]
  },
  linked_list: {
    easy: [
      { title: "Reverse Linked List", problem: "Given the head of a singly linked list, reverse the list, and return the reversed list." },
      { title: "Merge Two Sorted Lists", problem: "Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists." },
      { title: "Linked List Cycle", problem: "Given head, the head of a linked list, determine if the linked list has a cycle in it." }
    ],
    medium: [
      { title: "Remove Nth Node From End of List", problem: "Given the head of a linked list, remove the nth node from the end of the list and return its head." },
      { title: "Copy List with Random Pointer", problem: "Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes." },
      { title: "Add Two Numbers", problem: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list." }
    ],
    hard: [
      { title: "Merge k Sorted Lists", problem: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it." },
      { title: "Reverse Nodes in k-Group", problem: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list." }
    ]
  },
  trees: {
    easy: [
      { title: "Invert Binary Tree", problem: "Given the root of a binary tree, invert the tree, and return its root." },
      { title: "Maximum Depth of Binary Tree", problem: "Given the root of a binary tree, return its maximum depth." },
      { title: "Same Tree", problem: "Given the roots of two binary trees p and q, write a function to check if they are the same or not." }
    ],
    medium: [
      { title: "Lowest Common Ancestor of a Binary Search Tree", problem: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST." },
      { title: "Binary Tree Level Order Traversal", problem: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level)." },
      { title: "Validate Binary Search Tree", problem: "Given the root of a binary tree, determine if it is a valid binary search tree (BST)." }
    ],
    hard: [
      { title: "Binary Tree Maximum Path Sum", problem: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root." },
      { title: "Serialize and Deserialize Binary Tree", problem: "Design an algorithm to serialize and deserialize a binary tree." }
    ]
  },
  sliding_window: {
    easy: [
      { title: "Best Time to Buy and Sell Stock", problem: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock." },
      { title: "Contains Duplicate II", problem: "Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k." }
    ],
    medium: [
      { title: "Longest Substring Without Repeating Characters", problem: "Given a string s, find the length of the longest substring without repeating characters." },
      { title: "Longest Repeating Character Replacement", problem: "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times." }
    ],
    hard: [
      { title: "Minimum Window Substring", problem: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window." },
      { title: "Sliding Window Maximum", problem: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. Return the max sliding window." }
    ]
  },
  stack: {
    easy: [
      { title: "Valid Parentheses", problem: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid." },
      { title: "Min Stack", problem: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time." }
    ],
    medium: [
      { title: "Evaluate Reverse Polish Notation", problem: "Evaluate the value of an arithmetic expression in Reverse Polish Notation." },
      { title: "Generate Parentheses", problem: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses." }
    ],
    hard: [
      { title: "Largest Rectangle in Histogram", problem: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram." },
      { title: "Maximal Rectangle", problem: "Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area." }
    ]
  },
  binary_search: {
    easy: [
      { title: "Binary Search", problem: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums." },
      { title: "Search Insert Position", problem: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order." }
    ],
    medium: [
      { title: "Search a 2D Matrix", problem: "Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties: Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row." },
      { title: "Koko Eating Bananas", problem: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. Find the minimum integer k such that she can eat all the bananas within h hours." }
    ],
    hard: [
      { title: "Median of Two Sorted Arrays", problem: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays." },
      { title: "Find Minimum in Rotated Sorted Array II", problem: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]]. Given the sorted rotated array nums that may contain duplicates, return the minimum element of this array." }
    ]
  },
  graphs: {
    easy: [
      { title: "Flood Fill", problem: "An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc]." },
      { title: "Find if Path Exists in Graph", problem: "There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). Given edges, determine if there is a valid path that exists from vertex source to vertex destination." }
    ],
    medium: [
      { title: "Number of Islands", problem: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands." },
      { title: "Clone Graph", problem: "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph." }
    ],
    hard: [
      { title: "Word Ladder", problem: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si for 1 <= i <= k is in wordList." },
      { title: "Alien Dictionary", problem: "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules." }
    ]
  }
};

export default questions;