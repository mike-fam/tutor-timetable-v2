# Tutor timetable

![Node.js CI](https://github.com/mike-fam/tutor-timetable-v2/workflows/Node.js%20CI/badge.svg)
![Deploy](https://github.com/mike-fam/tutor-timetable-v2/workflows/Deploy/badge.svg)

Proposed timetabling platform designed for UQ casual tutors, now in TypeScript

## Setting up

There are mainly two ways to use the development environment, manually and 
using docker. This page will explain both ways to set up the app. But before 
that, we need to set up an authentication system that mimics UQCloud’s.

### Mimicking UQCloud’s authentication

We need to somehow mimic UQCloud’s authentication system. As explained 
[here](https://stluc.manta.uqcloud.net/xlex/public/zones-guide.html#uq_single_sign_on_via_fakvd),
UQCloud zones attach the authentication headers to the incoming HTTP requests.
Since the TutorTimetable app checks for those headers, we need to somehow 
inject the same headers to the requests in our development environment. 
It is highly recommended to use the 
[ModHeader browser extension](https://bewisse.com/modheader/).  
You can install the extension and follow these steps:
1. Open its control panel.
2. click on the triple-dot icon (`⋮`) in the top-right corner
3. Choose “Import profile(s)”
4. Choose “Load from file”, and then select the `modheaders.json` file 
   in the `/bootstrap` directory.
5. If step 4 doesn't work, you will have to manually open the json file and 
   then copy it over to the extension.

After importing the file, you can view all the profiles on the ModHeader control panel and cycle through them to “log in” as different users in your development environment.

### Cloning the repo

To clone the repository, run:
```shell
git clone git@bitbucket.org:elipse-team/tutor-tt.git && cd tutor-tt
```

### Creating a .env file

We then need to create a new `.env` file to specify the environment 
variables. Copy the template `.env.example` file to make a new `.env` file.

Make sure you use `cp` when updating the env to avoid a symlink.

```shell
cp .env.example .env
```

We need to check in the content of the `.env` file.  
The content of the `.env` file depends on if you’re running the app 
manually or using Docker.  
If you’re using docker, the content of the file should be as follows. 
You can also consult the `.env.docker` file.

```dotenv
DB_HOST=postgres
DB_USER=postgres
DB_PW=postgres
DB_NAME=tutor-timetable-v2
TEST_DB_HOST=postgres
TEST_DB_USER=postgres
TEST_DB_PW=postgres
TEST_DB_NAME=tutor-timetable-v2-test
CORS_ORIGIN=http://localhost:3000
ALLOCATOR_URL=http://localhost:8000/allocator/
EMAIL_PW=8I43AYkrIuOAKzzUwvGU
NODE_ENV=development
MAIL_SERVER=mailhub.eait.uq.edu.au
MAIL_PORT=25
```

If you’re running the app manually, just change the value of `DB_HOST`
and `TEST_DB_HOST` from `postgres` to `localhost` and you’re set.

## Running the App

### Using Docker

After cloning the repo, run
```shell
yarn
```
to install all the dependencies, then run
```shell
yarn docker-dev
```
to run the docker images. This will run the backend app and the frontend 
app, and populate the database with seed data. If the database is already 
populated, it will skip this initialisation step.

***Note***: *Do **not** run `docker-compose up` since there is no 
`docker-compose.yml` file as of now. If you want to copy one of the 
compose files over, make sure to not commit it to the repo.*

The backend app is now available at `localhost` port 5000. The frontend 
React server is available at `localhost` port 3000. The Postgres server 
is available at `localhost` port 5431.

You can access the frontend and backend apps using the browser.

You can connect to the Postgres database by running

```shell
psql -h localhost -p 5431 -d tutor-timetable-v2 -U postgres
```

The password is `postgres`. After connecting the database, 
you can manipulate the data using raw SQL statements.

### Manually

After cloning the repo, run
```shell
yarn
```
to install all the dependencies.

We need to then set up a new database. Assuming that you have 
Postgres installed with all of its tools, you can run
```shell
createdb -U postgres tutor-timetable-v2
```
to create a new database. The password is whichever password you 
used to set up the postgres user when you first installed Postgres.

We can then apply the dump by running

```shell
psql -U postgres tutor-timetable-v2 < ./bootstrap/data<tutor_timetable_v2.sql
```

After setting up the database, we can then run the app. 
**Remember to update your `.env` file first if you just switched over 
from docker, as mentioned above.**

```shell
yarn migration-run && yarn server-dev
```
to run the development server, and then run
```shell
yarn client-dev
```
in another terminal window to run the React server.

## Testing the app

### Using docker

Run
```shell
yarn docker-test
```
to test the app.

### Manually

Before testing the app, you’ll have to create a new database as 
the database user. Refer to the `DB_USER` field in your `.env` file. 
By default, the username is `postgres`. The name of the database has 
to match the `TEST_DB_NAME` field in your `.env` file.

Assuming that you have PostgreSQL and all its utilities installed, you 
can run this command
```shell
createdb -U postgres tutor-timetable-v2-test
```
to create the new database.
Then you can run the tests by running
```shell
yarn test
```

