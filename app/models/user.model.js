module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		firstname: {
			type: Sequelize.STRING
		},
		lastname: {
			type: Sequelize.STRING
		},
		username: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		role: {
			type: Sequelize.STRING
		},
		signature: {
			type: Sequelize.BLOB
		}
	  });
	return User;
}