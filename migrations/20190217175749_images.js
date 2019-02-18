
exports.up = function(knex, Promise) {

    return knex.schema.createTable('images', function (table){
        table.increments();
        table.integer('event_id');
        table.string('localPath');
        table.string('bucketPath');
        table.date('uploaded');
        table.date('createdAt');
        table.date('updatedAt');
    });
    
    

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('images')
};
