import {useEffect, useState} from 'react';
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';


function Veggie() {
  const [veggie, setVeggie] = useState([]);


  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    
    const check = localStorage.getItem('veggie');

    if(check){
      // Pulling it back
      setVeggie(JSON.parse(check));
    }else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=vegetarian,dessert`
      );
      const data = await api.json();

      // In localStorage you can only save String => Need to stringify it as string
      localStorage.setItem('veggie', JSON.stringify(data.veg_recipes));
      setVeggie(data.veg_recipes);
      console.log(data.veg_recipes);
    }
    
  };
  return (
    <div>
        <Wrapper>
          <h3>Our Veggetarian Picks</h3>
          <Splide options={{
            perPage:3,
            arrows:false,
            pagination:false,
            drag:"free",
            gap:"5rem"
          }}>
            {veggie?.map((veg_recipe) => {
            return(
              <SplideSlide key={veg_recipe.id}>
                <Card>
                  <p>{ veg_recipe.title }</p>
                  <img src={veg_recipe.image} alt={veg_recipe.title} />
                <Gradient />
                </Card>
              </SplideSlide>
            ); 
            })}
          </Splide>
        </Wrapper>
    </div>
  )
}
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;

  }
  p {
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform: translate(-50%, 0%);
    color: white;
    width:80%;
    text-align:center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%'
    display: flex;
    justify-content: center;
    align-items:center;
  }
`;

const Gradient = styled.div`
  z-index:3;
  position: absolute;
  width:100%;
  height:100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))`;

export default Veggie;