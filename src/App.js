import Category from "./components/Category";
import Pages from "./pages/Pages";
import Search from "./components/Search"
import styled from 'styled-components'
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Nav>
        <GiKnifeFork></GiKnifeFork>
        <Logo to={"/"}>RecipesHub</Logo>
      </Nav>
            <Search></Search>
            <Category></Category>
            <Pages></Pages>

    </div>

   );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
  `

  const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg{
    font-size: 2rem;
  }
  `
export default App;
