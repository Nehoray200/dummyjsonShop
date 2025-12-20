import React, { useEffect, useState, useContext } from 'react'
import { Container, Grid, Typography, Box } from '@mui/material';
import { ServerContext } from '../Context/ServerContext'
import { useParams } from 'react-router-dom'
import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'
import ProductTabs from '../components/ProductTabs'

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

  if (!loading && !product) return <Typography sx={{ p: 4 }}>Product not found</Typography>

  const discount = product?.discountPercentage > 5
    ? Math.round(product.discountPercentage)
    : null;

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={6}>

        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <ProductGallery
            images={product?.images ? product.images : null}
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
        <Box sx={{ mt: 8 }}>
          <ProductTabs product={product} />
        </Box>
      </Grid>
    </Container>
  );
};
export default SingleProduct;