import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomeView from './views/HomeView';
import DetailWeatherView from './views/DetailWeatherView';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeView />}></Route>
      <Route path="/:cityId" element={<DetailWeatherView />}></Route>
    </Routes>
  );
}

export default App;
