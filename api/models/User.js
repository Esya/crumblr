var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    is_active : { type: 'boolean', defaultsTo: false },
    is_admin  : { type: 'boolean', defaultsTo: false }
  }
};

module.exports = User;
