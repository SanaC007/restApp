import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Dishes from './dishes';
import { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from './context';
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

function RestaurantList(props) {
  console.log('propos', props);
  const [restaurantID, setRestaurantID] = useState(0);
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart);
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  // console.log(`Query Data: ${data.restaurants}`);

  // data has all the restaurants - below we are filtering for a match to props.search
  const searchQuery =
    data.restaurants.filter(res => {
      return res.name.toLowerCase().includes(props.search);
    }) || [];

  // the id of the matched restaurant is stored in restId
  let restId = searchQuery[0] ? searchQuery[0].id : null;
  // let restId = searchQuery[0].id;
  console.log('top', restId);

  // definet renderer for Dishes
  // const renderDishes = restaurant_ID => {
  //   console.log('test this', restaurant_ID);
  //   return <Dishes restId={restaurantID}> </Dishes>;
  // };

  if (searchQuery.length > 0) {
    const restList = searchQuery.map(res => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: '0 0.5rem 20px 0.5rem' }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={`http://localhost:1337` + res.image.url}
          />
          <CardBody>
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">
            <Link
              key={res.name}
              as={`/restaurants/${res.id}`}
              href={`/restaurants/[dishes]?id=${res.name}`}
            >
              {/* <Button color="info" onClick={() => setRestaurantID(res.id)}>
                {res.name}
              </Button> */}
              <a className="btn btn-primary">{res.name}</a>
            </Link>
          </div>
        </Card>
      </Col>
    ));

    return (
      <Container>
        <Row xs="3">{restList}</Row>
        {/* {console.log('return restId', restId)} */}
        {/* {console.log('restaurantID', restaurantID)} */}
        {/* <Row xs="3">{renderDishes(restaurantID)}</Row> */}
      </Container>
    );
  } else {
    return <h1> No Restaurants Found</h1>;
  }
}
export default RestaurantList;
