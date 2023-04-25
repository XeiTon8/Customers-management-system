# 📜 Customer management system
Developed this SPA for better understanding connection between front-end and back-end side of the application. App fetches data from mongoDB and then displays it to the user, allowing to perform CRUD operations.

 **Functionality**:
 + CRUD operations:
 1. Create - add customers to mongoDB;
 2. Read - search for customers in real time;
 3. Update - update customers;
 4. Delete - delete customers.
 + Auth;
 + Routing (each customer has its own page);

## 🚀 Stack
Frontend: Angular, ngRx;
Backend: MongoDB, Express, Node.js;
Auth: Firebase;
Libraries: AngularFireAuth, AngularReactiveForms, AngularRouting and others.
Additional: SASS, BEM.

## 🌠 Motivation
This project helped me to understand client-to-server interaction and architecture of Angular applications. 

What have I learned:

**1. Building REST APIs.** 
For each CRUD operation I've created an API endpoint filled with neccessary logic for operation (e.g. for fetching all customers API was sending a call to mongoDB to get all documents from the collection)

**2. Creating architecture for Angular applications.** 
Divided the app into different modules:
- Core module with essential components like Auth and Dashboard;
- Features module with features like a single page for each customer;
- Shared module for shared components that could be used in any parts of the application (like Header, buttons, etc).

**3. Using ngRx and rxJS.**
Instailled ngRx to get a better understanding of reactive programming and practice my skills with Flux architecture.
