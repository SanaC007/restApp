import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from '../../styles/Home.module.css';
import Cart from '../../components/cart';
import Dishes from '../../components/dishesc';
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import RestaurantList from '../../components/restaurantListCopy';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from 'reactstrap';

function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  // console.log(`URL: ${API_URL}`);
  const [query, setQuery] = useState('');
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });
  const router = useRouter();




  return (
    <ApolloProvider client={client}>
      <div className="search">
        <h2> Local Restaurants {router.query.restaurant}</h2>
        {/* {console.log('query Sana', props)}   */}
        <InputGroup>
          <InputGroupAddon addonType="append"> Search </InputGroupAddon>
          <Input
            onChange={e => setQuery(e.target.value.toLocaleLowerCase())}
            value={query}
          />
        </InputGroup>
        <br></br>
      </div>
      <Dishes search={query} />
      <Col xs="6" style={{ padding: 0 }}>
        <div>
          <Cart />
        </div>
      </Col>
      <br></br>
    </ApolloProvider>
  );
}
export default Home;
