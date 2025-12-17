import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../Context/ServerContext';
import ItemGrid from '../components/ItemGrid'
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllCategories = () => {
    const { server } = useContext(ServerContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleCategoryClick = (id) => {
        console.log("Navigating to:", id);
        navigate(`/category/${id}`);
    }
    useEffect(() => {
        const serverData = async () => {
            try {
                const categoryNames = (await server.get('/products/categories')).data
                const promises = categoryNames.map(async (cat) => {
                    const response = await server.get(`/products/category/${cat.slug}?limit=10`);
                    const productData = response.data.products;
                    productData.sort((a, b) => b.discountPercentage - a.discountPercentage);
                    const bestDealProduct = productData[0];
                    const image = bestDealProduct.thumbnail;
                    const discount = bestDealProduct.discountPercentage;

                    return {
                        id: cat.slug,
                        title: cat.name,
                        thumbnail: image,
                        discountBadge: discount >= 5 ? `Up to ${Math.round(discount)}%` : null
                    }
                })
                const results = await Promise.all(promises);
                setCategories(results)
                setLoading(false)
            }
            catch (err) {
                console.error("Error loading categories", err)
                setLoading(false)
            }
        }
        serverData()
    }, [])

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                Categories Items
            </Typography>
            <ItemGrid loading={loading}
                arrGrid={categories}
                onItemClick={handleCategoryClick} />
        </Box>
    )
}

export default AllCategories;