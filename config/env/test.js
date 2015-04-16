/**
 * Test environment setting
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  log: {
    level: 'error'
  },
  models: {
     connection: 'localDiskDb',
     migrate: 'drop'
  }

};
