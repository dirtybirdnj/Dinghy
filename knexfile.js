
module.exports = {
    
    migrations: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },
    client: 'sqlite3',
    connection: {
      filename: './db.development.sqlite'
    },
    useNullAsDefault: true
    
};