const Pool = require("pg").Pool;

    ////////////////////////
    // Connection à la DB //
    ////////////////////////

const pool = new Pool({
    user : "postgres",
    password: "root",
    host : "localhost",
    port: 5432,
    database: "school_website"
});

module.exports = pool;