'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
//     username: johndoe, password: foobar, role: teacher
// username: pakdengklek, password: gogetgold, role: academic
// username: charlesxavier, password: magnetowhy, role: headmaster

    return queryInterface.bulkInsert('Users',[{
      username : 'johndoe',
      password : 'foobar',
      role : 'teacher',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      username : 'pakdengklek',
      password : 'gogetgold',
      role : 'academic',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      username : 'charlesxavier',
      password : 'magnetowhy',
      role : 'headmaster',
      createdAt : new Date(),
      updatedAt : new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
