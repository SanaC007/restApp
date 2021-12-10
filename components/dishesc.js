import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { useState, useContext } from 'react';
import AppContext from './context';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

function Dishesx(props) {
  console.log('dish propos', props);
  const [restaurantID, setRestaurantID] = useState();
  const { addItem } = useContext(AppContext);

  const GET_RESTAURANT_DISHES = gql`
    query ($id: ID!) {
      restaurant(id: $id) {
        id
        name
        dishes {
          id
          name
          description
          price
          image {
            url
          }
        }
      }
    }
  `;

  const router = useRouter();
  console.log('router', router.query.restaurant);

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.restaurant },
  });

  // const restId = router.query.restaurant;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;
  console.log('data :', data);
  // data has all the restaurants - below we are filtering for a match to props.search
  const searchQuery =
    data.restaurant.dishes.filter(res => {
      return res.name.toLowerCase().includes(props.search);
    }) || [];
  // console.log('restdish', data.restaurant.dishes[0].name);
  // console.log('restdish', searchQuery[0].name);

  let restId = searchQuery[0] ? searchQuery[0].id : null;

  if (restId > 0) {
    return (
      <>
      <Row>
        {searchQuery.map(res => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: '0 10px' }}>
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={`http://localhost:1337${res.image.url}`}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
                <CardText>${res.price}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  // color="info"
                  outline
                  color="primary"
                  onClick={() => addItem(res)}
                >
                  + Add To Cart
                </Button>
                <style jsx>
                  {`
                    a {
                      color: white;
                    }

                    a:link {
                      text-decoration: none;

                      color: white;
                    }

                    .container-fluid {
                      margin-bottom: 30px;
                    }

                    .btn-outline-primary {
                      color: #007bff !important;
                    }

                    a:hover {
                      color: white !important;
                    }
                  `}
                </style>
              </div>
            </Card>
          </Col>
          
        ))}
        </Row>
      </>
    );
  } else {
    return <h1> No Dishes</h1>;
  }
}
export default Dishesx;
