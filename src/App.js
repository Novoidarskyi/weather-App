import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomeView from './views/HomeView';
import DetailWeatherView from './views/DetailWeatherView';

function App() {
  return (
    <Routes>
      <Route exact path="/weather-app" element={<HomeView />}></Route>
      <Route
        path="/weather-app/:cityId"
        element={<DetailWeatherView />}
      ></Route>
    </Routes>
  );
}

export default App;
