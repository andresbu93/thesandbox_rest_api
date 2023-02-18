'use strict';

module.exports = {
  async up(queryInterface) {
    return await queryInterface.bulkInsert('users', [
      {
        name: 'jon',
        lastName: 'Doe',
        email: 'jon@example.com',
        password:
          '$2a$12$lUlZ5plHOEdCsZ9naRddU.y8Mb0aROXLHEou7tmWki5bNpfQmdjom',
        role: 'USER',
      },
      {
        name: 'Kelly',
        lastName: 'Smith',
        email: 'kelly@example.com',
        password:
          '$2a$12$lUlZ5plHOEdCsZ9naRddU.y8Mb0aROXLHEou7tmWki5bNpfQmdjom',
        role: 'ADMIN',
      },
    ]);
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
