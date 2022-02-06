import { useState } from 'react';

function FormFindCity({ onSubmit }) {
  const [cityName, setCityName] = useState("");

  const handleCityChange = event => { 
    setCityName(event.currentTarget.value)
  }

 const handleSubmit = event => { 
    event.preventDefault()
    if (cityName.trim() === "") {
      alert("Введите название города")
      return
     } 
    
   onSubmit(cityName)
    setCityName("")
  }


 
    return (
      <form onSubmit={handleSubmit}>    
        <input 
          type="text"
          name="cityName"
          value={cityName}
          onChange={handleCityChange}        
        />
        <button type = "submit">
        Добавить город
        </button>
</form>

    );
  
}

export default FormFindCity