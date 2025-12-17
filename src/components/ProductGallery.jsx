import React from 'react';
import { Box, Skeleton } from '@mui/material';
import ItemCard from '../components/ItemCard';

const ProductGallery = ({ image, discount, loading }) => {

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      {loading ? (
        // מצב טעינה
        <Skeleton 
          variant="rectangular" 
          height='500px'
          sx={{ borderRadius: 4 }} 
          animation="wave" 
        />
      ) : (
        // מצב תצוגה
        <ItemCard
          thumbnail={image}
          discountBadge={discount ? `-${discount}% OFF` : null}
          onClick={() => { }}
          imgHeight='500px'
        />
      )}
    </Box>
  )
}

export default ProductGallery;