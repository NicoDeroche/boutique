const fs = require("fs");
const matter = require("gray-matter");

const getProducts = () => {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);
    return filenames.map(filename => {
        const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
        const { data } = matter(fileContent);
        return data;
    });


}

exports.handler = async (event, context) => {
    const { cart } = JSON.parse(event.body);
  
    const products = getProducts();

    const cartWithProducts = cart.map(({ id, qty }) => {
        const product = products.find(p => p.id === id);
        return {
            ...product,
            qty
        };
    });

    console.log(cartWithProducts);

    return {
        statusCode: 200,
        body: "Votre carte a ete debitee"
    };
};