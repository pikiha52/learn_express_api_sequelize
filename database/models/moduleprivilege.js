'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ModulePrivilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ModulePrivilege.hasMany(models.AccessModule, { 
        foreignKey: "module_privilege_id",
        as: "accessModule" 
      });
    }
  }
  ModulePrivilege.init({
    module_id: DataTypes.BIGINT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ModulePrivilege',
  });
  return ModulePrivilege;
};