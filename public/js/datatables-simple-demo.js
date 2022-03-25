window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const listOrder = document.getElementById('listOrder');
    const listCar = document.getElementById('listCar');

    if (listCar && listOrder) {
        new simpleDatatables.DataTable(listOrder);
        new simpleDatatables.DataTable(listCar);

    }
});
