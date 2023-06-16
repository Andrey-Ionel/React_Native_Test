import { SearchLocation } from '../components/searchLocation';
import { getWeatherRequest } from '../store/actions';
import { connect } from 'react-redux';
import { Unit } from '../store/types';
import { FC } from 'react';

const mapStateToProps = (state: any) => {
  return {
    unit: state.weatherReducer.unit as Unit,
  };
};

const mapDispatchToProps = {
  getWeatherRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchLocation as FC);
