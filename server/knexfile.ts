import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  }, 
  micrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'micrations')
  }, 
  useNullAsDefault: true
};