import { Box, Typography, Button, Stack, Divider, Rating, Skeleton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriceText from './PriceText'
const ProductInfo = ({ product, loading }) => {

  if (loading) {
    return (
      <Stack spacing={4}>
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton variant="text" height={80} width="80%" />
        <Stack direction="row" spacing={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={100} />
        </Stack>
        <Skeleton variant="text" width={120} height={60} />
        <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" height={2} />
        <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 3 }} />
      </Stack>
    );
  }



  return (
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
        </Stack>

       <PriceText price={product.price} discount={product.discountPercentage} size={4}/>
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
  );
}

export default ProductInfo;