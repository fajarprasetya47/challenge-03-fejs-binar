const fs = require("fs");

// reading data users
const loadUsers = () => {
	const fileBuffer = fs.readFileSync("data/user.json", "utf-8");
	const users = JSON.parse(fileBuffer);
	return users;
};
module.exports = {
	loadUsers
};
