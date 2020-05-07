# videoGameDB
database class project

To run the app locally:
1. Clone the repo, locally
2. Install environmental necessities such as npm, nodejs, and mysql.
3. In mysql, run `SOURCE db;`
4. Run, from the command line, `npm install`
5. Run `RDS_HOSTNAME=127.0.0.1 RDS_USERNAME=root RDS_PASSWORD=[password] RDS_PORT=3306 RDS_DB_NAME=VIDEO_GAMES node app.js`
That will provide necessary environmental variables to the nodejs process.
6. Navigate to `localhost:8000` in your favorite web browser and have fun.