const Pool = require("pg").Pool;

    ///////////////////////////
    // Connexion to DataBase //
    ///////////////////////////

const pool = new Pool({
    user : "postgres",
    password: "root",
    host : "localhost",
    port: 5432,
    database: "school_website"
});

module.exports = pool;