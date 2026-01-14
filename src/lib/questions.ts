import { Question } from './types';

export const dsaQuestions: Question[] = [
  {
    id: 'dsa-1',
    text: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    topic: 'Arrays - Two Sum',
    type: 'coding',
  },
  {
    id: 'dsa-2',
    text: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    topic: 'Linked Lists - Reverse a Linked List',
    type: 'coding',
  },
  {
    id: 'dsa-3',
    text: 'Given a string s, find the longest palindromic substring in s.',
    topic: 'Dynamic Programming - Longest Palindromic Substring',
    type: 'coding',
  },
];

export const csFundamentalsQuestions: Question[] = [
  {
    id: 'cs-1',
    text: "What's the difference between a process and a thread?",
    topic: 'Operating Systems',
    type: 'short-answer',
    answer: 'A process is an instance of a program, with its own memory space. A thread is the smallest unit of execution within a process, sharing the process\'s memory space.'
  },
  {
    id: 'cs-2',
    text: 'What is a deadlock in an operating system?',
    topic: 'Operating Systems',
    type: 'short-answer',
    answer: 'A situation where two or more processes are blocked forever, waiting for each other to release a resource.'
  },
  {
    id: 'cs-3',
    text: 'What is virtual memory?',
    topic: 'Operating Systems',
    type: 'mcq',
    options: ['Memory on the GPU', 'A memory management technique that provides an "idealized" abstraction of the storage resources', 'The same as RAM', 'A type of CPU cache'],
    answer: 'A memory management technique that provides an "idealized" abstraction of the storage resources'
  },
  {
    id: 'cs-4',
    text: 'What is the purpose of the `fork()` system call?',
    topic: 'Operating Systems',
    type: 'short-answer',
    answer: 'To create a new process, which is a copy of the calling process.'
  },
  {
    id: 'cs-5',
    text: 'Explain the ACID properties in the context of database transactions.',
    topic: 'DBMS',
    type: 'short-answer',
    answer: 'Atomicity, Consistency, Isolation, Durability. They guarantee that database transactions are processed reliably.'
  },
  {
    id: 'cs-6',
    text: 'What is the difference between SQL and NoSQL databases?',
    topic: 'DBMS',
    type: 'short-answer',
    answer: 'SQL databases are relational, use structured data, and have a predefined schema. NoSQL databases are non-relational, have dynamic schemas for unstructured data.'
  },
  {
    id: 'cs-7',
    text: 'What is an index in a database?',
    topic: 'DBMS',
    type: 'mcq',
    options: ['A way to join tables', 'A data structure that improves the speed of data retrieval operations', 'A type of database user', 'A backup of the database'],
    answer: 'A data structure that improves the speed of data retrieval operations'
  },
  {
    id: 'cs-8',
    text: 'What is normalization in DBMS?',
    topic: 'DBMS',
    type: 'short-answer',
    answer: 'The process of organizing columns and tables to minimize data redundancy.'
  },
  {
    id: 'cs-9',
    text: 'What is the main difference between TCP and UDP?',
    topic: 'Computer Networks',
    type: 'short-answer',
    answer: 'TCP is connection-oriented and reliable, providing error checking and ordered data delivery. UDP is connectionless and faster, but does not guarantee delivery or order.'
  },
  {
    id: 'cs-10',
    text: 'What does DNS stand for and what does it do?',
    topic: 'Computer Networks',
    type: 'short-answer',
    answer: 'Domain Name System. It translates human-readable domain names into machine-readable IP addresses.'
  }
];

export const systemDesignQuestions: Question[] = [
  {
    id: 'sd-1',
    text: 'Design a URL shortener service like TinyURL.',
    topic: 'System Design',
    type: 'system-design',
  },
    {
    id: 'sd-2',
    text: 'Design a rate limiter.',
    topic: 'System Design',
    type: 'system-design',
  },
    {
    id: 'sd-3',
    text: 'Design a chat application like WhatsApp or Messenger.',
    topic: 'System Design',
    type: 'system-design',
  },
];
