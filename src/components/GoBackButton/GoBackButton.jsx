import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

const GoBackButton = () => {
  const navigate = useNavigate();
   const handleGoBack = () => {
    navigate('/');
  };
  return (
    <>
<Button
          variant="outlined"
          type="button"
          sx={{
            color: 'white',
            border: '1px solid white',
            position: 'relative',
            top: '15px',
            left: '15px'
          }}
          onClick={() => { handleGoBack() }}
        >Вернуться на главную</Button>
   </>
  );
};

export default GoBackButton; 