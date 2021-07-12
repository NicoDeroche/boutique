import matter from "gray-matter";

const HomePage = (props) => {
 
  console.log(props);
  return (
    <div>
      <h1>
        Bienvenue dans ma boutique
      </h1>
    </div>
  )
}


export const getStaticProcs = async () => {
  console.log("ok");
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  const products = filenames.map(filename => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    const { data } = matter(fileContent);
    const slug = `/products/${filename.replace('.md','')}`;
    return {
      ...data,
      slug
    }
  });
  return {
    props: { products  }
  }

}


export default HomePage;