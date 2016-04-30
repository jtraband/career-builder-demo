# CareerBuilder/Angular 2 Chart Examples

This repository contains example code demonstrating the use of Angular2 with the Google Charting library.

The application is deliberatly simple to focus on the minimum necessary code to easily
make use of Google Charts within an Angular2 application. 

**This is not the perfect arrangement for your application. It is not designed for production. 

## Clone the project 

Clone this repo into new project folder (e.g., `my-proj`).
```
git clone  https://github.com/jtraband/career-builder-demo  my-proj
cd my-proj
```

## Run it

```
npm install
npm start
```

The `npm install` command will bring down all of the needed dependencies; including any needed d.ts files. 

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with Ctrl-C.

### Notes

The code makes use of the most recent typings (d.ts) file available as of 4/30/16 for the 
google visualization library.  Unfortunately, this file is not really up to date or complete 
at this point.  So there may be times when you will need to bypass Typescript's strong
typing when using this library.    