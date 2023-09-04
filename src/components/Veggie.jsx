//fetches the popular recipies / random / check api documentation
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import {Splide, SplideSlide} from '@splidejs/react-splide' //Image carosel
import '@splidejs/splide/dist/css/splide.min.css'   //its css doc
import { Link } from 'react-router-dom'

const Veggie = () => {

    const [veggie, setVeggie] =useState([]);


//calls api on startup
    useEffect(()=>{
        getVeggie();
    }, []);



const getVeggie = async()=>{

    //Check if we have anything in local storage
    const check= localStorage.getItem('Veggie');

    if(check){
        //parse it back into an array
        setVeggie(JSON.parse(check));
    }
    else{

    //call the api
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
    const data = await api.json();

    //we can only save strings in local storage
    localStorage.setItem("Veggie" , JSON.stringify(data.recipes)) 
    setVeggie(data.recipes);


    }




    }

return (
    <div>
                <Wrapper>
                    <h3>Veggie picks</h3>

                    <Splide options={{
                        perPage: 5,
                        arrows: false,
                        pagination: false, 
                        drag: "free",
                        gap: "5rem",
                        breakpoints: {
                        2000: {
                            perPage: 4,
                            perMove: 4
                        },
                        1600: {
                            perPage: 3,
                            perMove: 3
                        },
                        950: {
                            perPage: 2,
                            perMove: 2
                        },
                        600: {
                            perPage: 1,
                            perMove: 1
                        }
                    }
                    }}>
                    {veggie.map((recipe,index)=>{
                        return (
                            <SplideSlide>
                            <Link to={"/recipe/" +recipe.id}>
                            <Card key={recipe.id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title}></img>
                                <div className='gradient'/>
                            </Card>
                            </Link>
                        </SplideSlide>
                        )
                    })}
                    </Splide>
                </Wrapper>
            
    

    </div>
)
}


const Wrapper = styled.div`
    margin: 2rem 0rem;

`;

const Card = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    position: relative;

    img{
        position: relative;
        
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 2rem;

    }

    p{
        position: absolute;
        z-index: 4;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        padding: 1rem;
        justify-content: center; 
        align-items: center;
    }

    .gradient{
    position: absolute;
    z-index: 3;
    left:50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));

    }

 

`;



export default Veggie