import React from 'react'
import  {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Recipe = () => {

    let params = useParams();   
    const [details,setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions')

    const fetchDetails = async()=>{
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
        setDetails(detailData);

    }

    useEffect(()=>{
        fetchDetails();

    },[params.name])

  return (
    <DetailWrapper>
        <div className='info-container'>
            <h2>{details.title}</h2>
            <div className='img-container'>
            <img src={details.image} alt={details.title}></img>
            </div>
        </div>
        
        <Info>
        
        <div className='btn-container'>
            <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={()=> setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={()=> setActiveTab("ingredients")}>Ingredients</Button>
        </div>

            {activeTab === 'instructions' && (
            <div>
                <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>

            </div>

        )}
    
            {activeTab === 'ingredients' && (
            <ul>
                {details.extendedIngredients.map((ingredient)=>(
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>
            )}
        

        </Info>
    </DetailWrapper>
)
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    flex-direction: row;

    .btn-container{
        display: flex; 
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .info-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .img-container{
        height: 20rem;
        width: 30rem;
    }

     img{
        height: 100%;
        width: 100%;
        border-radius: 2rem;
        object-fit: contain;


    }

    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2{
        margin-bottom: 2rem;
    }

    li{
        font-size: 1.2rem;
        line-height: 2.5rem;

    }

    ul{
        margin-top: 2rem;
    }

    @media screen and (max-width: 1400px){
        flex-direction: column;
        margin-top: 5rem;

        .info-container{
        margin-bottom: 3rem;
    }

    @media screen and (max-width: 700px){
       .img-container{
        height: 10rem;
        width: 22rem;
       }
    }
    }
`

const Button = styled.button`

    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;

`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0rem 5rem;

    @media screen and (max-width: 1400px){
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }

    @media screen and (max-width: 800px){
    h3{
        font-size: 1.3rem;
    }

    p{
        font-size: 0.7rem;
    }
    }

`

export default Recipe