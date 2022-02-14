import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './FormFindCity.module.css';

function FormFindCity({ onSubmit }) {
  const [cityName, setCityName] = useState("");

  const handleCityChange = event => { 
    setCityName(event.currentTarget.value)
  }

  const normalizeCityName = cityName.slice(0, 1).toUpperCase() + cityName.slice(1).toLocaleLowerCase()
 const handleSubmit = event => { 
    event.preventDefault()
    if (cityName.trim() === "") {
      toast.info("Введите название города")
      return
     } 
    
      onSubmit(normalizeCityName)
    setCityName("")
  }
 
    return (
      <header className={css.searchbar}>
      <form className={css.searchForm}  onSubmit={handleSubmit}>    
        <input className={css.searchFormInput} 
          type="text"
          name="cityName"          
          autoFocus
          value={cityName}
          placeholder = "Введите название города"
          onChange={handleCityChange}        
          />   
        <button type = "submit" className={css.searchFormButton}>
        Добавить город
        </button>  
</form>
</header>
    );
  
}

export default FormFindCity

FormFindCity.propTypes = {
  onSubmit: PropTypes.func.isRequired
}