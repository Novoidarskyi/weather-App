import {useNavigate} from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();
   const handleGoBack = () => {
    navigate('/weather-app');
  };
  return (
    <button type="button" onClick={() => { handleGoBack() }}><p>Вернуться на главную</p>
    </button>
  );
};

export default GoBackButton; 