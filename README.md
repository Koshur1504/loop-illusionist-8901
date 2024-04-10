# Project Title

LUMINANCE

## Introduction

Introducing Luminance ,built for masai construct week block 34 . An innovative online Fashon Store application offering seamless access to the latest fashion. With user-friendly features including robust registration and authentication, and intuitive search capabilities, Luminance provides a fun experience for users worldwide.

## Project Type

Collabirative Frontend

## Team Members

1- Aamir Mir ft30_165

2- Pranoti Kadam fw29_155

3- Vibha Mauriya fw29_049

4- Madhu Mishra fw29_100

## Deplolyed App

Frontend: https://loop-illusionist-8901.vercel.app/ <br>
Backend: https://loop-illusionist-8901.onrender.com

## Directory Structure

```bash
loop-illusionist-8901
├── .DS_Store
├── README.md
├── backend/
│   ├── .DS_Store
│   ├── .gitignore
│   ├── .prettierrc
│   ├── db.json
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── test.rest
├── frontend/
│   ├── .DS_Store
│   ├── .gitignore
│   ├── .prettierrc
│   ├── assets/
│   │   ├── .DS_Store
│   │   ├── Homepage.png
│   │   ├── JSONServer.png
│   │   ├── favicon_io/
│   │   │   ├── android-chrome-192x192.png
│   │   │   ├── android-chrome-512x512.png
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── favicon-16x16.png
│   │   │   ├── favicon-32x32.png
│   │   │   ├── favicon.ico
│   │   │   └── site.webmanifest
│   │   ├── logo.jpeg
│   │   ├── logo_with_bg.jpeg
│   │   └── user5.jpg
│   ├── global.js
│   ├── index.css
│   ├── index.html
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── pages/
│   │   ├── .dummy
│   │   ├── Login/
│   │   │   ├── login.css
│   │   │   ├── login.html
│   │   │   └── login.js
│   │   ├── admin/
│   │   │   ├── admin.css
│   │   │   ├── admin.html
│   │   │   ├── admin.js
│   │   │   ├── customers.css
│   │   │   ├── customers.html
│   │   │   ├── customers.js
│   │   │   ├── orders.css
│   │   │   ├── orders.html
│   │   │   ├── orders.js
│   │   │   ├── products.css
│   │   │   ├── products.html
│   │   │   └── products.js
│   │   ├── cart/
│   │   │   ├── cart.css
│   │   │   ├── cart.html
│   │   │   └── cart.js
│   │   ├── categories/
│   │   │   ├── categories.css
│   │   │   ├── categories.html
│   │   │   └── categories.js
│   │   ├── checkout/
│   │   │   ├── checkout.html
│   │   │   ├── checkout.js
│   │   │   └── style.css
│   │   ├── completed/
│   │   │   ├── completed.css
│   │   │   ├── completed.html
│   │   │   └── completed.js
│   │   ├── men/
│   │   │   ├── index.css
│   │   │   ├── men.html
│   │   │   └── men.js
│   │   ├── payment/
│   │   │   ├── payment.css
│   │   │   ├── payment.html
│   │   │   └── payments.js
│   │   ├── productPage/
│   │   │   ├── index.css
│   │   │   ├── index.html
│   │   │   └── index.js
│   │   └── wishlist/
│   │   │   ├── wishlist.css
│   │   │   ├── wishlist.html
│   │   │   └── wishlist.js
│   └── utils/
│   │   └── urls.js
└── package.json
```

## Video Walkthrough of the project

[Project Presentation Video](https://youtu.be/JWMM98zGFww)

## Features

- User and admin registration and authentication functionality
- User profile creation and management
- Wishlist and Bag
- admin dashboard displays metrics of user distribution across the globe , total clicks reseived on the website and other key information
- ability for the admin to perform crud on news articles and users

## design decisions or assumptions

Create a look-a-like landing page from https://www.fwrd.com/ .

Use HTML/CSS?VANILA_JS to achieve the design.

Implement appropraite animations and effects.

Implement Login/Signup with Authentication functionality.

Implement Cart and Wishlist functionality.

Implement Admin Authrization functionality.

## Installation & Getting started

Detailed instructions on how to install, configure, and get the project running.

```bash
clone the repo
cd into loop-illusionist-8901
npm run install_things
npm run start_fe to start the frontend
```

## Usage

Provide instructions and examples on how to use your project.

```bash
npm install
npm run start_fe
npm run start_be
```

#### Backend

[<img alt="alt_text" width="700px" src="./frontend/assets/JSONServer.png" />](https://loop-illusionist-8901.onrender.com)

#### Frontend

[<img alt="alt_text" width="700px" src="./frontend/assets/Homepage.png" />](https://loop-illusionist-8901-1.onrender.com)

## Credentials

Admin Credentials

```bash
email- admin@mail.com
password- admin
```

User Credential

```Bash
email- user@mail.com
password- password
```

## API Endpoints

GET /products - retrieve all items
POST /products - create a new item
PATCH /products/:id - Patch an item
DELETE /products/:id - Delete an item
POST /sign - sign in a user
POST /register - create a user account
PATCH /users/id - Patch a user
DELETE /users/id - Delete a user

## Technology Stack

- HTML
- CSS
- Java Script
- Google Charts
- JSON server
