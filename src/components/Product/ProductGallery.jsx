import React, { useState, useEffect } from 'react';
import { Box, Skeleton, Grid, Stack } from '@mui/material';
import ItemCard from '../ItemCard';
import GalleryThumbnail from './GalleryThumbnail';

const ProductGallery = ({ images, discount, loading }) => {

  const [selected, setSelected] = useState(images?.[0]);


  useEffect(() => {
    if (images && images.length > 0) {
      setSelected(images[0]);
    }
  }, [images]);



  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        height='500px'
        sx={{ borderRadius: 4 }}
        animation="wave"
      />
    )
  }


  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      <Grid container spacing={2} direction={'row'}>
        <Grid size={{ xs: 2 }}>
          <Stack spacing={2}
            direction='column'
            justifyContent="flex-start"
            alignItems="center" >
            {images && images.map((img, index) =>
              <GalleryThumbnail
                image={img}
                alt={`Product thumbnail ${index + 1}`}
                onClick={() => setSelected(img)}
                isSelected={img === selected}
                key={index} />
            )}
          </Stack>
        </Grid>
        <Grid size={{ xs: 10 }}>
          <ItemCard
            thumbnail={selected}
            discountBadge={discount ? `-${discount}% OFF` : null}
            onClick={() => { }}
            imgHeight='450px'
          />
        </Grid>
      </Grid >
    </Box >
  )
}

export default ProductGallery;