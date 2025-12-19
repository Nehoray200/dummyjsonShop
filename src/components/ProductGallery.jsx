import React, { useState, useEffect } from 'react';
import { Box, Skeleton, Grid, Stack, useTheme } from '@mui/material';
import ItemCard from '../components/ItemCard';

const ProductGallery = ({ images, discount, loading }) => {
  const theme = useTheme(); // Hook 1

  // --- השינוי כאן: הזזנו את ה-Hooks למעלה, לפני הבדיקה של ה-loading ---

  // Hook 2
  const [selected, setSelected] = useState(images?.[0]);

  // Hook 3
  useEffect(() => {
    if (images && images.length > 0) {
      setSelected(images[0]);
    }
  }, [images]);

  // --- ורק עכשיו בודקים את ה-loading ---

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

  // --- המשך הקוד כרגיל ---

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      <Grid container spacing={2} direction={'row'}>
        <Grid size={{ xs: 2 }}>
          <Stack spacing={2}
            direction='column'
            justifyContent="flex-start"
            alignItems="center" >
            {images && images.map((img, index) =>
              <Box
                key={index}
                component="img"
                src={img}
                onClick={() => setSelected(img)}
                sx={{
                  width: '100%',
                  height: '80px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: selected === img ? `2px solid ${theme.palette.primary.main}`
                    : '1px solid transparent',
                  opacity: selected === img ? 1 : 0.7,
                  transition: '0.2s',
                  '&:hover': { opacity: 1 }
                }}
              />
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