const fs = require("fs");

// reading data cars
const loadCars = () => {
	const fileBuffer = fs.readFileSync("data/car.json", "utf-8");
	const cars = JSON.parse(fileBuffer);
	return cars;
};

const saveCars = (cars) => {
	fs.writeFileSync('data/car.json', JSON.stringify(cars));
}

const addCars = (car) => {
	const cars = loadCars();
	cars.push(car);
	saveCars(cars);
}

module.exports = {
	loadCars,
	addCars
};
