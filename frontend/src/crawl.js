import axios from "axios";
import { useEffect } from "react";

async function GetResponse1(slug) {
    const respone = await axios.get(`https://api-gateway.pharmacity.vn/api/category?slug=${slug}`);
    return respone
}

export default function CrawlData() {
    let config = (_url, _method, _data) => {
        if (_method === 'get') {
            return {
                method: _method,
                maxBodyLength: Infinity,
                url: _url,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
        return {
            method: _method,
            maxBodyLength: Infinity,
            url: _url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(_data)
        }
    };
    useEffect(() => {
        var slugs = ['cham-soc-suc-khoe', 'duoc-pham', 'thuc-pham-chuc-nang', 'cham-soc-sac-dep'];
        slugs.map( async (slug) => {
            const response = await GetResponse1(slug);
            var result = response;
            console.log(result);
            // const [_category, products] = 
            // axios.request(config(`https://api-gateway.pharmacity.vn/api/category?slug=${url}`, 'get', null))
            //     .then((response) => {
            //         var result = response.data.data;
            //         const category =  result.category;
            //         const products =  result.products.edges;
            //         var _category = {
            //                 name: category.name,
            //                 slug: category.slug
            //             }
            //             return [_category, products];
                        
            //             // axios.request(config('https://localhost:7210/api/category/add', 'post', _category))
            //             //     .then((response) => {
            //             //         var result = response.data;
            //             //         if (result.status === 200) {
            //             //             console.log("Add category success");
            //             //         } else {
            //             //             console.log("Add category error");
            //             //         }
            //             //     })
            //             //     .catch((error) => {
            //             //         console.log(error);
            //             //     });                    
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // console.log(_category, products);
        })
        // products.map((item) => {
        //                                 var _product = {
        //                                     name: item.node.name,
        //                                     detail: item.node.description,
        //                                     quantity: item.node.variants[0].quantityAvailable,
        //                                     price: item.node.variants[0].pricing.priceUndiscounted.gross.amount,
        //                                     type: item.node.variants[0].name,
        //                                     idCategory
        //                                 }
        //                                 axios.request(config('https://localhost:7210/api/product/add', 'post', _product))
        //                                     .then((response) => {
        //                                         var result = response.data;
        //                                         if (result.status === 200) {
        //                                             console.log("Add product success");
        //                                         } else {
        //                                             console.log("Add product error");
        //                                         }
        //                                     })
        //                             })
    }, [])
    return (
        <p>Hello</p>
    )
}