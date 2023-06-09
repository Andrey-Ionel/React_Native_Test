import { SearchLocation } from '../components/searchLocation';
import { WeatherData } from '../components/weather';
import { getWeatherRequest } from '../store/actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    weather: state.weatherReducer.weather as WeatherData,
  };
};

const mapDispatchToProps = {
  getWeatherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);
