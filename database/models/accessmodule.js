'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AccessModule.belongsTo(models.ModulePrivilege, {
        foreignKey: "module_privilege_id",
        as: "modulePrivilege"
      });
      AccessModule.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "users"
      });
    }
  }
  AccessModule.init({
    user_id: DataTypes.BIGINT,
    module_privilege_id: DataTypes.BIGINT,
    key: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'AccessModule',
  });
  return AccessModule;
};