process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var pg = require('pg');
pg.defaults.ssl = true;

var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public']
});


knex.schema.createTable('posts', function (table) {
  table.increments();
  table.string('title');
  table.string('body');
  table.timestamps(true, true);
})
  .then(data => {
    const post = { title: 'test', body: 'test post' };

    knex('posts')
      .insert(post)
      .then(data => {
        console.log(data);
      })

  })
  .catch(err => {
    console.log(err);
  })


