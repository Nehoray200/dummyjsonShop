import React, { useEffect, useState, useContext } from 'react'
import { Container, Grid, Box, Typography, Button, Stack, Divider, Rating, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ServerContext } from '../Context/ServerContext'
import { useParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard';

const SingleProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true);
  const { server } = useContext(ServerContext);
  const theme = useTheme();

  useEffect(() => {
    const result = async () => {
      try {
        const response = await server.get(`/products/${id}`)
        setProduct(response.data)
        setLoading(false)
      } catch (error) {
        console.log("error loading Product: " + error)
        setLoading(false)
      }
    }
    result()
  }, [id, server])

  if (loading) return <Typography sx={{ p: 4 }}>Loading...</Typography>
  if (!product) return <Typography sx={{ p: 4 }}>Product not found</Typography>

  const discount = product.discountPercentage > 5
    ? Math.round(product.discountPercentage)
    : null;
  const calcPrice = (product.price * (1 - (discount / 100.0))).toFixed(2)

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={6} alignItems="flex-start">

        {/* --- צד שמאל: תמונה --- */}
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
            <ItemCard
              thumbnail={product.images[0]}
              discountBadge={`-${discount}% OFF`}
              onClick={() => { }}
              imgHeight='500px'
            />
          </Box>
        </Grid>

        {/* --- צד ימין: פרטים --- */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={4}>

            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
                {product.brand} • {product.category}
              </Typography>

              <Typography variant="h3" fontWeight="800" sx={{ mb: 2, color: 'text.primary' }}>
                {product.title}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({product.rating} / 5)
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                {discount ? (
                  <> 
                    <Typography variant="h4" fontWeight="bold" color="secondary.main">
                      ${calcPrice}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }} 
                    >
                      ${product.price}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    ${product.price}
                  </Typography>
                )}
              </Stack>

              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
                {product.description}
              </Typography>
            </Box>

            <Divider />
            <Stack spacing={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: 4
                }}
              >
                Add to Cart
              </Button>

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ color: 'success.main', mt: 1 }}>
                <CheckCircleIcon fontSize="small" />
                <Typography variant="caption" fontWeight="bold">
                  {product.stock > 0 ? 'In Stock & Ready to Ship' : 'Out of Stock'}
                </Typography>
              </Stack>
            </Stack>

          </Stack>
        </Grid>

      </Grid>
    </Container>
  );
};
export default SingleProduct;