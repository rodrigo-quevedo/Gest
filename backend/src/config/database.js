const mongoose = require('mongoose');
const uri = process.env.DB_URL;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log( await mongoose.connection.db.admin().command({ ping: 1 }) );
    console.log( "Pinged your deployment. You successfully connected to MongoDB!" );
    // console.log( await mongoose.connection.db.runCommand({ top: 1 }) );
  } catch(err) {console.log(err)} 
}

const connection = run().catch(console.dir);
mongoose.pluralize(null)


module.exports = connection