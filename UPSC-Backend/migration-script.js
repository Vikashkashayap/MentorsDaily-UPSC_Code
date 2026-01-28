const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = process.env.MONGO_URI;

if (!dbUri) {
  console.error('Error: MONGO_URI is not defined in your .env file.');
  process.exit(1);
}

const runMigration = async () => {
  try {
    console.log('Connecting to the database...');
    await mongoose.connect(dbUri);
    console.log('Database connected successfully.');

    const courseCollection = mongoose.connection.db.collection('courses');

    console.log('Starting migration...');

    const addFieldsResult = await courseCollection.updateMany(
      { price: { $exists: true }, sellingPrice: { $exists: false } },
      [
        {
          $set: {
            sellingPrice: '$price',
            discountPercentage: 0
          }
        }
      ]
    );
    console.log(`Step 1 (Add Fields): ${addFieldsResult.modifiedCount} documents updated.`);


    const renameFieldResult = await courseCollection.updateMany(
      { price: { $exists: true }, basePrice: { $exists: false } },
      {
        $rename: { 'price': 'basePrice' }
      }
    );
    console.log(`Step 2 (Rename Field): ${renameFieldResult.modifiedCount} documents updated.`);

    console.log('Migration complete.');

  } catch (error) {
    console.error('An error occurred during migration:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
};

runMigration();