import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

interface HelmetProps {
  children: React.ReactNode;
}

const Helmet: React.FC<HelmetProps> = ({ children }) => {
  return <ReactHelmet>{children}</ReactHelmet>;
};

export default Helmet;