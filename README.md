[![Build Status](https://travis-ci.org/Efosaok/Events-Manager.svg?branch=develop)](https://travis-ci.org/Efosaok/Events-Manager) [![Coverage Status](https://coveralls.io/repos/github/Efosaok/Events-Manager/badge.svg?branch=develop)](https://coveralls.io/github/Efosaok/Events-Manager?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/85bfcc4c242d38ff6312/maintainability)](https://codeclimate.com/github/Efosaok/Events-Manager/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/85bfcc4c242d38ff6312/test_coverage)](https://codeclimate.com/github/Efosaok/Events-Manager/test_coverage)
[![codecov](https://codecov.io/gh/Efosaok/Events-Manager/branch/develop/graph/badge.svg)](https://codecov.io/gh/Efosaok/Events-Manager)

# Events Manager

  
Events Manager is a web app that helps you manage an event-center. Given you manage an events center, this app will help you accept applications to use your center / facilities,It contains features like notifying users of event cancellation via email notification. Get a feel of the app [here](https://events-manager-efosa.herokuapp.com/)

## [](#table-of-contents)Table of Contents

-   [Features](#features)
-   [Relevant stacks and technologies](#relevant)
-   [Installation and Setup](#installation-and-setup)
- [How to Contribute](#how-to-contribute)
-   [Limitations](#limitations)
-   [API Endpoints](#api-endpoints)
-   [Contact the Author](#contact-author)

## [](#features)Features

This application has the following features:

### [](#center-administration)Admin Related Features

> The application provides a robust set of features for Admins, owners of centers.
>
>   - Adding a center to the application.
>   - Editing an already existing center.
>   - Cancelling event(s) slated for a center.

### [](#booking-information)User Related Features

> Users of the application can also interact with the following features in the application.
> **NB**: _Some of the features below requires authentication._
> 
> - Creating an event.
> - Editing an event.
> - Deleting an event.
> - Viewing centers in the application.
> - View a center and the booked dates of the center.
> - Searching for centers by name or rental cost.

### [](#superadmin)Super Admin Related features

> This features are exclusive to the super admin, the sole owner of the application and all the centers. The superadmin also have access to admin features but admins cannot perform the actions mentioned below.
> 
> - See all users in the application.
> - Upgrade a user to admin.
> - Downgrade an admin user.

## [](#relevant)Relevant Stacks and Technologies

This application is a **Node.js** powered application and is built with the **MVC** software design architecture, The relevant stacks and technologies are as listed below;

1.  **Node.js/express.js**: The server side implementation of javascript with the help of the express.js framework was used solely to build the backend of the application.
3.  **ReactJS**: This framework manages the view of the application.
4.  **Redux**: This framework manages the state of the application, It is a predictable state container for applications.
5.  **PostgreSQL/sequelize**: PostgreSQL is the database used for this application, sequelize is the **ORM** use to interact with the postgreSQL database.

## [](#installation-and-setup)Installation and Setup

To get a local version of this application, please make sure to have the following system dependencies installed and ensure postgreSQL has been setup properly,

- [Node.js](https://nodejs.org/)
- [PostgresQL](https://www.postgresql.org/)

learn how to setup postgres [here](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)

1.  Clone the repository:

```
git clone  https://github.com/Efosaok/Events-Manager

```

2.  Navigate into the cloned repository directory using:

```
cd Events-Manager

```

3.  Install dependencies:

```
npm i 

```

4.  create a **.env** file and add the required environment variables as defined in the **.env.example** file
5.  Install  **sequelize-cli**  globally for running database migrations.

```
$ npm install -g seqeulize-cli  
```

6.  Now, we are all set. run the commands below to start the app.

```
npm run start:dev
```
Now log on to [localhost:<3000 or port defined in .env>]() in your browser to see the app live.

## [](#testing)Running the tests

To run the already-written tests of this application.

```
$ npm test       // backend tests
$ npm run jest       //frontend tests
$ npm run e2e          // end to end test
```

## [](#limitations)Limitations

The limitation currently existing in the app are as defined below.

**NB**: _contributions are welcome, please see the [contibuting.md]() file on how to contribute_

-   Password reset: The application provides no means of resetting the password of an account.
    
-   Payment: This application provides no means to pay for the rental cost of a center.


## [](#how-to-contribute)How to Contribute

Please see the [contributing.md](/CONTRIBUTING.md) file on instructions about how to contribute to this project.

## [](#api-endpoints)API Endpoints

See  [API Documentation](https://events-manager-efosa.herokuapp.com/api-docs)

## [](#contact-author)Contact the Author

- [Google](<mailto:[efosaokpugie@gmail.com](efosaokpugie@gmail.com)>)
- [LinkedIn](https://www.linkedin.com/in/efosa-okpugie-501306155/)