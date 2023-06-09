import { Weather, WeatherData } from '../components/weather';
import { connect } from 'react-redux';
import { getWeatherRequest } from '../store/actions';

const mapStateToProps = state => {
  return {
    weather: state.weatherReducer.weather as WeatherData,
  };
};

const mapDispatchToProps = {
  getWeatherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
