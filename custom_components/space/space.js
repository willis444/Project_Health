import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

const Spacer = ({height}) => <View style={{height}}></View>;

Spacer.propTypes = {
  height: PropTypes.number,
};

Spacer.defaultProps = {
  height: 16,
};

export default Spacer;