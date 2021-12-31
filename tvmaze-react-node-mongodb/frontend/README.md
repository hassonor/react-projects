# TvMaze with JSONPlaceholder / Or Hasson

# How to run this, Please follow carefully

1. create the following MongoDB DBs before running the app:
`SubscriptionsDB` with Robo3T / Compass.

2. Import the DB I provided on `DB_TO_IMPORT` folder:
   1. Navigate to  `...\MongoDB\Server\[Version]\bin`
      The default path: `C:\Program Files\MongoDB\Server\4.4\bin`
   2. Create a new folder with the name `Dump`.
   3. Copy `usersDB` from `DB_TO_IMPORT` folder to `Dump`.
   4. Open CMD as Administrator and Navigate to `C:\Program Files\MongoDB\Server\4.4\bin`.
   5. Run the following command: `mongorestore -d usersDB Dump/usersDB`.



3. run `npm i` on  `subscrtiptions-ws`, `cinema-ws` and `frontend`;
4. run `npm start` on `subscrtiptions-ws`, `cinema-ws` and `frontend`;

5. run on your browser: `http://localhost:3000`


*** IMPORTANT: default USER for login: "admin;123123"; 
`username: admin`
`password: 123123`


## Enjoy :-)
