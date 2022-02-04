// Запрос о состоянии погоды в городе

const fetchCity = url => fetch(url).then(response => response.json());

export default fetchCity;
