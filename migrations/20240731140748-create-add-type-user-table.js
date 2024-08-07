'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Medecins', 'typeuser', {
      type: Sequelize.INTEGER,
      references: {
        model: 'TypeUsers',
        key: 'id',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Medecins', 'typeuser');
  }
};
