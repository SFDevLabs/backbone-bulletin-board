Backbone Bullatin Board Demo
===================

#### A demo of Backbone.js and Node with authentication.

[See a DEMO](http://sfdevlabs.com:3000/)

## Introduction

This demo was written to illustrate how authentication can be added to multi-user Backbone.js app.

#### Technologies Used In This Demo

- [Underscore.js](http://documentcloud.github.com/underscore/) - A utility-belt library for JavaScript without extending any of the built-in JavaScript objects.
- [Backbone.js](http://documentcloud.github.com/backbone/) - Gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.
- [jQuery](http://jquery.com/) - A fast, concise, library that simplifies how to traverse HTML documents, handle events, perform animations, and add AJAX.
- [node.js](http://nodejs.org/) - Event-driven I/O server-side JavaScript environment based on V8.
- [Express](http://expressjs.com/) - High performance, high class web development for node.js.
- [Jade](http://jade-lang.com/) - High performance template engine heavily influenced by Haml and implemented with JavaScript for node.js.
- [Stylus](http://learnboost.github.com/stylus/) - Expressive, dynamic, robust CSS for node.js
- [Mongoose](http://mongoosejs.com/) - A MongoDB object modeling tool designed to work in an asynchronous environment.
- [MongoDB](http://www.mongodb.org/) - A scalable, high-performance, open source NoSQL database.
- [Passport](http://passportjs.org/) - Simple, unobtrusive authentication for Node.js.



## Running the Demo locally

1. Install [node.js](http://nodejs.org/#download).
2. Install [MongoDB](http://www.mongodb.org/downloads).
3. Start the MongoDB server from a terminal window:
```
$ mongod
```
4. Change the working directory to the project root:
```
$ cd <path to directory>
```
4. Install dependencies using the node package manger (npm):
```
$ sudo npm install
```
5. Start the server:
```
$ sudo npm start
```
6. Visit [http://localhost:3000](http://localhost:3000) in a web browser.

## Credit

[Based on Backbone MVC](https://github.com/jamesor/todomvc/tree/939bf7a47d297562cfb61c453320dea281e24e83/labs/architecture-examples/backbone_node_mongo)

- [Jeff Jenkins](http://jenkinsj.com/) - Added Authentication Layer
- [Jehan Trembeck](http://jehantremback.com/) - Backbone and FrontEnd

## License

Public Domain
