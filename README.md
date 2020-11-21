# Meal Client

React single-page application for this [meal scheduler](https://github.com/Liversticks/meal-client).
Created by Liversticks (Oliver X.)  

## What is this?

This is an app that allows users to schedule meals/snacks and list ingredients.
For now, it's a good introduction to the React ecosystem.

## Libraries used:

* React
* React Router
* React Bootstrap
* Formik + Yup (forms and validation)
* Moment
* Axios
* Font Awesome (icons)

## Features

* Figure out who's making breakfast, lunch, dinner, snack and what it will be.

## Building

1. Set URLs in `local-dev.js` and `prod.js` to their development and production variants, respectively
2. Run `npm start` to launch the development server or `npm run build` to create a production-ready build.

You can also run `npm test` and `npm run eject` as this project was created using [Create React App](https://github.com/facebook/create-react-app).

## Tests

Work in Progress

## Usage

### Signup

Creates a new user. Required fields: username, password, email, birthday.

### Login

Upon successful login, a JWT token is created and stored in browser storage. This token is used to authenicate requests.

### Meals (main screen)

* A dropdown holds each week's meals.
* A green button indicates that meal slot is available. Click on the button and fill out the form with your planned meal information, then submit.
* A cyan button indicates that you previously signed up for that slot. You can change what you plan to make or delete your scheduled meal (letting someone else sign up).
* A greyed-out button indicates that someone else is signed up for that slow. You can view what they plan to cook by clicking on that button.

### Profile

You can view your profile picture, email, and birthday. You can also choose to upload a new profile picture or delete your current one.

## License

MIT License

Copyright (c) 2020 Oliver Xie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

Distributions of all or part of the Software intended to be used by the recipients as they would use the unmodified Software, containing modifications that substantially alter, remove, or disable functionality of the Software, outside of the documented configuration mechanisms provided by the Software, shall be modified such that the Original Author's bug reporting email addresses and urls are either replaced with the contact information of the parties responsible for the changes, or removed entirely.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
