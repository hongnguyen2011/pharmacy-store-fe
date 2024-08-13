import axios from "axios";
const slugs = ['cham-soc-suc-khoe', 'duoc-pham', 'thuc-pham-chuc-nang', 'cham-soc-sac-dep'];

const headers = {
        'Content-Type': 'application/json',
    }
export const AddCategory = async (category, products) => {
    try {
        const response = await axios.post('https://localhost:7102/api/category/add', JSON.stringify(category), { headers });
        const result = response.data;
        console.log(result.message);
        if (result.status === 400) {
            return {
                status: result.status
            }
        }
        const message = await Promise.all(
            products.map(async product => {
                let _product = { ...product, idCategory: result.data.id };
                const message = await AddProduct(_product);
                console.log(message);
                return message;
            })
        )
        return {
            status:message
        };
    } catch (error) {
        console.error(error);
    }
}
export const AddProduct = async product => {
    try {
        const response = await axios.post('https://localhost:7102/api/product/add', JSON.stringify(product), {headers});
        const result = response.data;
        return {
            status: result.status
        };
    } catch (error) {
        console.error(error);
    }
}
export const handlerGetCategoryAndProduct = async slug => {
    try {
        const response = await axios(`https://api-gateway.pharmacity.vn/api/category?slug=${slug}`);
        const result = response.data;
        const category = {
            name: result.data.category.name,
            slug: result.data.category.slug
        };
        const _products = result.data.products.edges;
        
        var products = _products.map(item => {
            const product =
            {
                name: item.node.name,
                detail: item.node.description,
                quantity: item.node.variants[0].quantityAvailable,
                price: item.node.variants[0].pricing.priceUndiscounted.gross.amount,
                type: item.node.variants[0].name,
                pathImg: item.node.thumbnail.url
            }
            return product;
        });
        return {
            category,
            products
        };
    } catch (error) {
        console.error(error);
    }
};
export const getAllData = async () => {
    try {
        const _data = await Promise.all(
            slugs.map( async slug => {
                const response = await handlerGetCategoryAndProduct(slug);
                return {
                    category: response.category,
                    products: response.products
                };
            }))
            ;
        return _data;
    } catch (error) {
        console.error(error);
    }
};
export const PostAllCategory = async () => {
    const data = await getAllData();
    if (data) {
        try {
            const message = await Promise.all(
                data.map(async items => {
                    const response = await AddCategory(items.category, items.products);
                    return response.status
                }));
            return message;
        } catch (error) {
            console.error(error);
        }
    }
}