import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SinglePizzaPage = ({ data: { pizza } }) => {
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      {/* Not placing SEO inside PizzaGrid because don't want to mix markup with metadata */}
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul className="name">
            {pizza.toppings.map((topping) => {
              return <li key={topping.id}>{topping.name}</li>;
            })}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
};

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
// graphql requires a type passed, the '!' means it is absolutely required
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;

export default SinglePizzaPage;
