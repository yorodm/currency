const mongoose = require('mongoose');//tell mongoose to use es6 implementation of promises
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { poolSize: 2 });
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ',error);
  });

afterEach((done) => {
  mongoose.connection.collections["currencies"].drop(() => {
    //this function runs after the drop is completed

	done(); //go ahead everything is done now.
  });
});
