import React from 'react';
import { Box, Skeleton } from '@mui/material';
import ItemCard from './ItemCard';

const ItemGrid = ({ loading, arrGrid, onItemClick }) => {

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 3,
        }}>
            {loading
                ?
                Array.from(new Array(12)).map((_, index) => (
                    <Skeleton key={index} variant="rectangular" height={280} sx={{ borderRadius: 3 }} />
                ))
                :
                arrGrid.map((item) => (
                    <ItemCard title={item.title} thumbnail={item.thumbnail} discountBadge={item.discountBadge} onClick={() => onItemClick(item.id)} key={item.id} />
                ))
            }
        </Box>
    )
}

export default ItemGrid