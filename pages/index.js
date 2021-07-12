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
const directory= `${process.cwd()}/content`;
const filenames = fs.readdirSync(directory);
const products = filenames.map(filename => {
  const fileContent=fs.readFileSync(`${directory}/${filename}`).toString();
 console.log(fileContent);
  return{

  }
})
  return {
    props: {ok:"ok"}
  }

}


export default HomePage;