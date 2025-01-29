import { Question } from '../types/quiz';

export const quizQuestions: { [key: string]: Question[] } = {
  easy: [
    {
      type: "multiple-choice" as const,
      question: "Which of the following is a JavaScript framework?",
      options: ["React", "CSS", "HTML", "Python"],
      correctAnswer: "React"
    },
    {
      type: "true-false",
      question: "JavaScript is a compiled language.",
      correctAnswer: "false"
    },
    {
      type: "text-input",
      question: "What does DOM stand for?",
      correctAnswer: "Document Object Model"
    },
    {
      type: "multiple-choice",
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var x = 5;", "variable x = 5;", "x := 5;", "int x = 5;"],
      correctAnswer: "var x = 5;"
    },
    {
      type: "true-false",
      question: "HTML is a programming language.",
      correctAnswer: "false"
    },
    {
      type: "text-input",
      question: "What does CSS stand for?",
      correctAnswer: "Cascading Style Sheets"
    },
    {
      type: "multiple-choice",
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "#", "/* */", "<!-- -->"],
      correctAnswer: "//"
    },
    {
      type: "true-false",
      question: "The external JavaScript file must contain the <script> tag.",
      correctAnswer: "false"
    },
    {
      type: "text-input",
      question: "What is the file extension for JavaScript files?",
      correctAnswer: ".js"
    },
    {
      type: "multiple-choice",
      question: "Which operator is used to assign a value to a variable?",
      options: ["=", "==", "===", ":="],
      correctAnswer: "="
    }
  ],
  medium: [
    {
      type: "multiple-choice",
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "Oracle"],
      correctAnswer: "Netscape"
    },
    {
      type: "true-false",
      question: "JavaScript supports automatic memory management.",
      correctAnswer: "true"
    },
    {
      type: "text-input",
      question: "What keyword is used to define a constant in JavaScript?",
      correctAnswer: "const"
    },
    {
      type: "multiple-choice",
      question: "What is the purpose of the 'use strict' directive?",
      options: ["Enforces stricter parsing", "Increases performance", "Enables new features", "Disables debugging"],
      correctAnswer: "Enforces stricter parsing"
    },
    {
      type: "true-false",
      question: "let and const declarations are hoisted.",
      correctAnswer: "false"
    },
    {
      type: "text-input",
      question: "What method is used to parse a JSON string?",
      correctAnswer: "JSON.parse"
    },
    {
      type: "multiple-choice",
      question: "Which method removes the last element from an array?",
      options: ["pop()", "shift()", "splice()", "slice()"],
      correctAnswer: "pop()"
    },
    {
      type: "true-false",
      question: "Arrow functions have their own 'this' binding.",
      correctAnswer: "false"
    },
    {
      type: "text-input",
      question: "What is the name of the function that creates a new instance of an object?",
      correctAnswer: "constructor"
    },
    {
      type: "multiple-choice",
      question: "Which event occurs when a user clicks on an HTML element?",
      options: ["onclick", "onmouseclick", "onpress", "clickevent"],
      correctAnswer: "onclick"
    }
  ],
  hard: [
    {
      type: "multiple-choice",
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: "push()"
    },
    {
      type: "true-false",
      question: "JavaScript is single-threaded.",
      correctAnswer: "true"
    },
    {
      type: "text-input",
      question: "What is the result of 0.1 + 0.2 === 0.3 in JavaScript?",
      correctAnswer: "false"
    },
    {
      type: "multiple-choice",
      question: "What is the output of typeof null?",
      options: ["object", "null", "undefined", "number"],
      correctAnswer: "object"
    },
    {
      type: "true-false",
      question: "Promises can have multiple resolve calls.",
      correctAnswer: "false"
    },
    {
      type: "text-input",
      question: "What is the name of the error thrown when we try to access a property of undefined?",
      correctAnswer: "TypeError"
    },
    {
      type: "multiple-choice",
      question: "Which of these is not a valid way to create an object in JavaScript?",
      options: ["new Object()", "{}", "Object.create(null)", "Object.make()"],
      correctAnswer: "Object.make()"
    },
    {
      type: "true-false",
      question: "The event loop is part of the JavaScript engine.",
      correctAnswer: "false"
    },
    {
      type: "text-input",
      question: "What method is used to prevent event bubbling?",
      correctAnswer: "stopPropagation"
    },
    {
      type: "multiple-choice",
      question: "What is the time complexity of Array.prototype.indexOf?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
      correctAnswer: "O(n)"
    }
  ]
};