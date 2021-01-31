import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

const countPizzasInToppings = (pizzas) => {
  // Return the pizzas with counts
  const counts = pizzas
    .map((pizza) => {
      return pizza.toppings;
    })
    .flat()
    .reduce((acc, topping) => {
      const existingTopping = acc[topping.id];
      // Check if this is an existing topping
      if (existingTopping) {
        // If it is, increment by 1
        existingTopping.count += 1;
      } else {
        // Otherwise create a new entry in our acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  const sortedToppings = Object.values(counts).sort((a, b) => {
    return b.count - a.count;
  });
  return sortedToppings;
};

const ToppingsFilter = ({ activeTopping }) => {
  // Get a list of all the toppings
  // Get a list of all the pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  // Count how many pizzas are in the topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // Link it up
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => {
        return (
          <Link key={topping.id} to={`/topping/${topping.name}`}>
            <span className="name">{topping.name}</span>
            <span className="count">{topping.count}</span>
          </Link>
        );
      })}
    </ToppingsStyles>
  );
};

export default ToppingsFilter;
