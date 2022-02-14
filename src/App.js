import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomeView from './views/HomeView';
import DetailWeatherCity from './views/DetailWeatherCity';

function App() {
  return (
    <Routes>
      <Route exact path="/weather-app" element={<HomeView />}></Route>
      <Route
        path="/weather-app/:cityId"
        element={<DetailWeatherCity />}
      ></Route>
    </Routes>
  );
}

export default App;
