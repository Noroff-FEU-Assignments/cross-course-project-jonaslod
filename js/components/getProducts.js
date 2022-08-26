export default async function getProducts(url = "https://marieogjonas.com/jonas/skole/cross-course-project/wp-json/wc/store/products"){
    try{
        const response = await fetch(url);
        return response.json();
    }
    catch(error){
        console.log(error);
    }
}