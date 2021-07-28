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

const filepath=`${process.cwd()}/functions/products.json`;
const products=getProducts();
fs.writeFileSync(filepath,JSON.stringify(products));