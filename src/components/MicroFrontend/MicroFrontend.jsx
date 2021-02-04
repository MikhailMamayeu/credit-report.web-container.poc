import React from 'react';
import PropTypes from 'prop-types';

import useMicroFrontend from '../../hooks/useMicroFrontend';

const MicroFrontend = ({ microFrontend }) => {
  useMicroFrontend(microFrontend);

  return <section id={`${microFrontend.name}-container`} />;
};

MicroFrontend.propTypes = {
  microFrontend: PropTypes.shape({
    name: PropTypes.string,
    host: PropTypes.string,
    script: PropTypes.string,
    styles: PropTypes.string,
    render: PropTypes.func,
  }).isRequired,
};

export default MicroFrontend;
