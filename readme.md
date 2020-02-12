# YelpCamp

> A MERN Stack Application that allows user to create, read, update, and delete camp ground information

![YelpCamp Screenshot](./img/screenshot.png)

## Features

<ul>
<li>Authentication</li>
<ul>
<li> User registration </li>
<li> User login with email and password </li>
<li> Email collision feature </li>
</ul>
<li>Authorization:</li>
<ul>
<li> User cannot create new campground without being authenticated </li>
<li> Users cannot edit or delete campground created by another user </li>
</ul>
<li> Manage campground posts with basic functionalities: </li>
<ul>
<li>Create, edit and delete posts and comments</li>
<li>Upload campground photos</li>
<li>Browse through a list of campgrounds</li>
</ul>
<li>Responsive Web Design
</ul>

## Getting Started

### Clone or download this repository

> git clone https://github.com/binhthaitrinh/yelp-camp-react.git

### Install dependencies

> npm install

Change cwd to client and run

> npm install

### Run on local machine

> npm run start

## Built with

### Front-end:

- React
- Redux
- SASS

### Back-end

- bcryptjs
- express
- jsonwebtoken
- mongoDB
- mongoose
- moment

## License

MIT
