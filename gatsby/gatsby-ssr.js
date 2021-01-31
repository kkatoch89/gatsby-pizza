import React from 'react';

import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return <OrderProvider>{element}</OrderProvider>;
};

// You do the same thing as gatsby-browser in this (gatsby-ssr.js)
// because you want to also do server side render
// gatsby-browser.js does browser side render. Doing it in both spots makes it faster
