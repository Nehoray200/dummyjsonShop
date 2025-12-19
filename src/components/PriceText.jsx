import React from 'react'
import { Typography,Stack } from '@mui/material';

const PriceText = ({ discount, price, size }) => {
    const getDiscountValue = (str) => {
        if (!str) return null;
        const match = str.toString().match(/(\d+)/);
        return match ? parseInt(match[0]) : null;
    };
    const finalPrice = (price * (1 - (getDiscountValue(discount) / 100.0))).toFixed(2);
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            {discount ? (
                <>
                    <Typography variant={`h${size}`} fontWeight="bold" color="secondary.main">
                        ${finalPrice}
                    </Typography>
                    <Typography
                        variant={`h${size+1}`} 
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                    >
                        ${price}
                    </Typography>
                </>
            ) : (
                <Typography variant={`h${size}`}  fontWeight="bold" color="primary.main">
                    ${price}
                </Typography>
            )}
        </Stack>
    )
}

export default PriceText