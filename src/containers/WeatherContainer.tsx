import { Weather, WeatherData } from '../components/weather';
import { connect } from 'react-redux';
import { getWeatherRequest, setUnits } from '../store/actions';

const mapStateToProps = state => {
  return {
    weather: state.weatherReducer.weather as WeatherData,
    unit: state.weatherReducer.unit as Unit,
    error: state.weatherReducer.error as string,
  };
};

const mapDispatchToProps = {
  getWeatherRequest,
  setUnits,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
