import React, { useEffect, useState, useContext } from 'react'
import { Container, Grid, Typography } from '@mui/material'; 
import { ServerContext } from '../Context/ServerContext'
import { useParams } from 'react-router-dom'
import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'

const SingleProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true);
  const { server } = useContext(ServerContext);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await server.get(`/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.log("error loading Product: " + error)
      } finally {
        setLoading(false) 
      }
    }
    result()
  }, [id, server])

  if (!loading && !product) return <Typography sx={{p:4}}>Product not found</Typography>

  const discount = product?.discountPercentage > 5
    ? Math.round(product.discountPercentage)
    : null;

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={6}>

        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <ProductGallery 
            image={product?.images ? product.images[0] : null} 
            discount={discount} 
            loading={loading}
          />
        </Grid> 

        <Grid size={{ xs: 12, md: 5 }}>
          <ProductInfo 
            product={product} 
            discount={discount} 
            loading={loading} 
          />
        </Grid>

      </Grid>
    </Container>
  );
};
export default SingleProduct;