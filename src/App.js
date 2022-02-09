import { Routes, Route } from 'react-router-dom';

import HomeView from './views/HomeView';
import DetailWeatherCity from './views/DetailWeatherCity';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />}></Route>
      <Route path="/:cityId" element={<DetailWeatherCity />}></Route>
    </Routes>
  );
}

export default App;
