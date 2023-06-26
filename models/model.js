const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../config/db");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    JobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "employees",
  },
  {
    createdAt: false,
    updateAt: false,
  }
);

const Contact = sequelize.define(
  "contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{10}$/,
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "contacts",
  },
  {
    createdAt: false,
    updateAt: false,
  }
);
Employee.hasOne(Contact, { foreignKey: "employeeId", onDelete: "CASCADE" });
Contact.belongsTo(Employee, { foreignKey: "employeeId" });

module.exports = {
  Contact,
  Employee,
};
