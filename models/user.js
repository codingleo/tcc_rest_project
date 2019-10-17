import Sequelize from 'sequelize'
import db from '../config/db'

const User = db.define('User', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthDate: {
    type: Sequelize.DATE
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address2: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  db,
  modelName: 'user',
  timestamps: true
})
User.associate = function (models) {
  // associations can be defined here
}

export default User
