import { useEffect, useState } from "react";
import styled from 'styled-components';
import {useParams} from "react-router-dom";

import React from 'react'

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({}); // object
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async() => {

    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
    

    

  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt=""/>
        </div>
      <Info>
        <Button 
          className={activeTab === 'instructions' ? 'active' : ''} 
          onClick={() => setActiveTab('instructions')}>
            Instructions
        </Button>
        <Button 
          className={activeTab === 'ingredients' ? 'active' : ''} 
          onClick={() => setActiveTab('ingredients')}>
            Ingredients
        </Button>

        {activeTab === 'instructions' && (
          <div>
             <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
             <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          </div>
        )}       
        {activeTab === 'ingredients' && (
          <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
          <ul>
            {details.extendedIngredients.map((ingredient) =>(
            <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
          
          )};
      </Info>
    </DetailWrapper>
  );
}


const DetailWrapper = styled.div`
 margin-top:10rem;
 margin-bottom: 5rem;
 display: flex;
 
 .active{
  background: linear-gradient(35deg, #494949, #313131) ;
  color: white;
  font-size:1rem;
 }
 h2{
  margin-bottom: 2rem;
  margin-right:5rem;
  font-size: 0.9rem;
  font-weight:600;
  width:300%;
 }

 h3{
  margin-top:2rem;
  margin-right:1rem;
  font-size: 0.8rem;
  font-weight:bold;
 }
 p{
  display:flex
 }
 li{
  font-size: 1rem;
  font-weight:bold;
  width:100%;
 }
 ul{
  margin-top:2rem;
  margin-right:1rem;
  font-size: 10rem;
  width:100%;
  
 }
 img{
  width:200%;
  margin-top:1rem;
  margin-right:5rem;
 }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  color: 313131;
  background: white;
  border: 2px solid black;
  margin-top:0rem;
  margin-right:5rem;
  font-weight:600;
  font-size:1rem;
`;

const Info = styled.div`
  margin-left: 15rem;
  font-size: 0.9rem;
`;



export default Recipe