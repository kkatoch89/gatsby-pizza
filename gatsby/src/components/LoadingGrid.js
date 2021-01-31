import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

const LoadingGrid = ({ count }) => {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => {
        return (
          <ItemStyles key={`loader-${i}`}>
            <p>
              <span className="mark">Loading...</span>
            </p>
            <img
              className="loading"
              src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
              alt="Loading"
              width="500"
              height="400"
            />
          </ItemStyles>
        );
      })}
    </ItemsGrid>
  );
};

export default LoadingGrid;
