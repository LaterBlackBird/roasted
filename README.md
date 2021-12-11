# Roasted

Roasted is an application serving as a React.js, Redux, Express, PostgreSQL full stack solo project
 to display current skill level in these areas.  The aim is to make a copy of the popular Untapped.com website
  except centered around coffee.


## Demo

https://roasted-sh.herokuapp.com/

## Tech Stack

**Client:** 
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)


**Server:** 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

## Deployment

To deploy this project run

```bash
//../roasted/backend
  npm install
```
```bash
//../roasted/frontend
  npm install
```
* create an .env file following the structure prodivded by the .env.example file
* create a PostgreSQL user

```bash
//.../roasted/backend
  npm start
```
```bash
//.../roasted/frontend
  npm start
```



## Documentation

[Feature List](https://github.com/LaterBlackBird/roasted/wiki/Feature-List)

[Database-Schema](https://github.com/LaterBlackBird/roasted/wiki/Database-Schema)

[API Routes](https://github.com/LaterBlackBird/roasted/wiki/API-Documentation)

[React Components](https://github.com/LaterBlackBird/roasted/wiki/React-Components)

[Redux Store Tree](https://github.com/LaterBlackBird/roasted/wiki/Redux-Store-Tree)


## Features

- Create user account
- Log in with a created user account / Demo-user login
- Create/Read/Update/Delete coffee drinks
- Create/Read check-ins
- Create/Read/Update/Delete comments on check-ins


## Screenshots

![Landing Page](https://res.cloudinary.com/dd1ndszow/image/upload/v1639264667/Roasted/Documentation/Screenshot_2021-12-10_185729_qhhiso.png)
![Coffee List Page](https://res.cloudinary.com/dd1ndszow/image/upload/v1639264668/Roasted/Documentation/Screenshot_2021-12-10_185752_nzmjh5.png)
![Check-in Page](https://res.cloudinary.com/dd1ndszow/image/upload/v1639264666/Roasted/Documentation/Screenshot_2021-12-10_190320_plmmcj.png)
![Add Form Structure](https://res.cloudinary.com/dd1ndszow/image/upload/v1639264668/Roasted/Documentation/Screenshot_2021-12-10_185816_yafaxf.png)
![Add Comment](https://res.cloudinary.com/dd1ndszow/image/upload/v1639264665/Roasted/Documentation/Screenshot_2021-12-10_190353_uqefpv.png)
![Edit Comment](https://res.cloudinary.com/dd1ndszow/image/upload/v1639264665/Roasted/Documentation/Screenshot_2021-12-10_190335_se1cwf.png)
![Profile View](https://res.cloudinary.com/dd1ndszow/image/upload/v1639264666/Roasted/Documentation/Screenshot_2021-12-10_190423_nww9tx.png)
## To-Do/Future Features

* Comments on coffees added by the user
* Google map integration to assist check-in location
## Lessons Learned

First project using React components as well as Redux fetching a SQL database backend.  However, became smoother with each addition.  The use of vanilla CSS prooved to be difficult, but the site is built as I envisioned.

