import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import useMicroFrontend from '../../hooks/useMicroFrontend';

const MicroFrontend = ({ microFrontend }) => {
  const history = useHistory();

  useMicroFrontend(microFrontend, history);

  return <section id={`${microFrontend.name}-container`} />;
};

MicroFrontend.propTypes = {
  microFrontend: PropTypes.shape({
    name: PropTypes.string,
    host: PropTypes.string,
    script: PropTypes.string,
    styles: PropTypes.string,
    render: PropTypes.string,
  }).isRequired,
};

export default MicroFrontend;
