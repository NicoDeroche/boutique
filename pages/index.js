import matter from "gray-matter";
import Link from "next/link";
import fs from "fs";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const Container = styled.div`
background-color : white;
padding:1rem 2rem;
min-height:200px;
position:relative;
transition : transform 0.3s;
&:hover {
  transform :scale(1.02);
}
`

const ProductsContainer = styled.div`
display: grid;
grid-template-columns:1fr 1fr;
grid-gap:0.5rem;
margin : 0.5rem 0;
`

const Price = styled.div`
position:absolute;
bottom : 0.5rem;
right : 1rem;;
font-size:2.5rem;
`;

const renderProduct = (product, addItemToCart) => {
  
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product);
  }
  return (
    <Link key={product.id} href={product.slug}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <button onClick={handleClick}>Ajouter au panier</button>
          <Price>{product.price} €</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};



const HomePage = (props) => {
  const {  addItemToCart } = useCart();

  return (

    <ProductsContainer>
      {
        props.products.map(product => renderProduct(product, addItemToCart))
      }

    </ProductsContainer>
  );
}




export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  const products = filenames.map(filename => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    const { data } = matter(fileContent);
    const slug = `/products/${filename.replace('.md', '')}`;
    return {
      ...data,
      slug
    }
  });
  return {
    props: {
      products
    },
  }
}



export default HomePage;