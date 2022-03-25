const fs = require("fs");

// reading data order
const loadOrders = () => {
	const fileBuffer = fs.readFileSync("data/order.json", "utf-8");
	const orders = JSON.parse(fileBuffer);
	return orders;
};
module.exports = {
	loadOrders
};
