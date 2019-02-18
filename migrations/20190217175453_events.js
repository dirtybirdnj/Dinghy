
exports.up = function(knex, Promise) {

    return knex.schema.createTable('events', function (table){
        table.increments();
        table.boolean('active');
        table.date('createdAt');
        table.date('updatedAt');        
    });
    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events')
};
