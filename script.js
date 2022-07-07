const dbCars = './db/cars.json'
const selectCars = document.getElementById('cars')
const spanName = document.getElementById('name')
const spanCost = document.getElementById('cost')
// console.log(selectCars)

const putCarsSelect = (dataCars) => {

    dataCars.cars.forEach(car => {
        let carElem = document.createElement('option')
        carElem.classList.add('car')

        carElem.innerHTML = `<option>${car.brand}</option>`

        selectCars.append(carElem)
    });
}

const getCars = async (strDbCars) => {
    try {
        const response = await fetch(strDbCars)
        return await response.json()
    } catch (error) {
        return console.log(error)
    }
}

const putDataSpan = (dataCars, index) => {
    if (index === 0) {
        spanName.textContent = ''
        spanCost.textContent = ''
    } else {
        spanName.textContent = `Тачка ${dataCars.cars[index - 1].brand} ${dataCars.cars[index - 1].model}`
        spanCost.textContent = `${dataCars.cars[index - 1].price}$`
    }

}

//при загрузке наполняем select
getCars(dbCars).then((data) => {
    putCarsSelect(data)
})

//вешаем событие на селект
selectCars.addEventListener('input', (e) => {
    getCars(dbCars).then(data => putDataSpan(data, e.target.selectedIndex))
})