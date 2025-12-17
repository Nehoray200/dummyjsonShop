import React from 'react';
import { Box } from '@mui/material';
import ItemCard from '../components/ItemCard';

const ProductGallery = ({image, discount}) => {
     
  return (
          <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
            <ItemCard
              thumbnail={image}
              discountBadge={`-${discount}% OFF`}
              onClick={() => { }}
              imgHeight='500px'
            />
          </Box>
  )
}

export default ProductGallery