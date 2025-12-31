
import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../Context/ServerContext';
import ItemGrid from '../components/ItemGrid'
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom"

const SingleCategory = () => {
    const { id } = useParams()
    const { dummyServer } = useContext(ServerContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleCategoryClick = (id) => {
        console.log("hey:", id);
        navigate(`/products/${id}`)
    }

    useEffect(() => {
        const serverData = async () => {
            try {

                const response = await dummyServer.get(`/products/category/${id}`);
                const rawProducts = response.data.products;
                const formattedProducts = rawProducts.map((product) => {
                    return {
                        id: product.id,
                        title: product.title,
                        thumbnail: product.thumbnail,
                        discountBadge: product.discountPercentage >= 5 ? `Sale -${Math.round(product.discountPercentage)}%` : null,
                        price : product.price 
                    }
                });

                setProducts(formattedProducts)
                setLoading(false)

            } catch (error) {
                console.log("Error loading Product: " + error)
                setLoading(false)
            }
        }
        serverData()
    }, [id, dummyServer])


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                Product Items
            </Typography>
            <ItemGrid loading={loading}
                arrGrid={products}
                onItemClick={handleCategoryClick} />
        </Box>
    )
}

export default SingleCategory