import { Component } from 'react';

export default class CityFindForm extends Component {
  state = {
    cityName: ""
  }

  handleCityChange = event => { 
    this.setState({cityName: event.currentTarget.value})
  }

  handleSubmit = event => { 
    event.preventDefault()
    if (this.state.cityName.trim() === "") {
      alert("Введите название города")
      return
     } 

    this.props.onSubmit(this.state.cityName)
    this.setState({cityName: ""})
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>    
        <input 
          type="text"
          name="cityName"
          value={this.state.cityName}
          onChange={this.handleCityChange}        
        />
        <button type = "submit">
        Добавить город
        </button>
</form>

    );
  }
}
