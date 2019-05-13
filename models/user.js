module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {

      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      message: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1]
          }
      }
    });

    return User;

  };
 