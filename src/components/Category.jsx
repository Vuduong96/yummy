import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import { GiChiliPepper, GiChopsticks } from "react-icons/gi";
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import React from 'react'

function Category() {
  return (
    <List>
        <NavLink to={'/cuisine/Italian'}>
            <FaPizzaSlice/>
            <h4>Italian</h4>
        </NavLink>
        <NavLink to={'/cuisine/American'}>
            <FaHamburger/>
            <h4>American</h4>
        </NavLink>
        <NavLink to={'/cuisine/Thai'}>
            <GiChiliPepper/>
            <h4>ThaiFood</h4>
        </NavLink>
        <NavLink to={'/cuisine/Vietnamese'}>
            <GiChopsticks/>
            <h4>Vietnamese</h4>
        </NavLink>
    </List>
  )
}


const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`;


export default Category