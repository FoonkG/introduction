"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			ID: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			discordID: DataTypes.STRING,
			bank: DataTypes.INTEGER,
			cash: DataTypes.INTEGER,
			timestampDaily: DataTypes.STRING,
			timestampWeekly: DataTypes.STRING,
		},
		{}
	);
	User.associate = (models) => {
		// associations can be defined here
	};
	return User;
};
