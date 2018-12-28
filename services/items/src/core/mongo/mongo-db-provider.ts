import { injectable } from 'inversify';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const CONNECTION_URL =
  'mongodb://vadims:vadims123@ds145043.mlab.com:45043/lend-me-db-items';

@injectable()
export class MongoDbProvider {
  async provideConnection() {
    return new Promise((resolve, reject) => {
      mongoose.connect(
        CONNECTION_URL,
        { useNewUrlParser: true }
      );

      let db = mongoose.connection;

      db.on('error', error => {
        console.error('Error connecting to database:', error);
        reject();
      });

      db.once('open', () => {
        console.info('Successfully connected to database.');
        resolve();
      });
    });
  }
}
