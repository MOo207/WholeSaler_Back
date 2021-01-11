require("dotenv").config();
const env = process.env; 
const dbUser = env.DB_USER;
const dbPass = env.DB_PASS;
const dbName = env.DB_NAME;
const secret = env.SECRET_KEY;
module.exports = {
    MONGO: `mongodb+srv://${dbUser}:${dbPass}@mongocluster.en0ah.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    SECRET_KEY: secret
}