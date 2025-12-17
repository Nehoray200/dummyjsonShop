import React from 'react';
import { Card, CardContent, Typography, CardActionArea, CardMedia, Chip, Box } from '@mui/material';


const ItemCard = ({ title, thumbnail, discountBadge, onClick, imgHeight = "220" }) => {
    return (
        <Card
            sx={{
                borderRadius: 4,
                transition: '0.3s',
                bgcolor: 'background.paper',
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
            }}
        >
            <CardActionArea
                onClick={onClick}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start'
                }}
            >
                {discountBadge && (
                    <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
                        <Chip
                            label={discountBadge}
                            size="small"
                            sx={{
                                bgcolor: 'secondary.main',
                                color: 'secondary.contrastText', 
                                fontWeight: 'bold',
                                borderRadius: 2,
                                fontSize: '0.7rem',
                                height: 24
                            }}
                        />
                    </Box>
                )}

                <CardMedia
                    component="img"
                    height={imgHeight} // <--- כאן השימוש בגובה הדינמי
                    image={thumbnail}
                    alt={title || "Product Image"}
                    sx={{
                        objectFit: 'contain',
                        p: 2,
                        bgcolor: 'background.paper'
                    }}
                />

                {/* מציג את הכותרת רק אם היא קיימת */}
                {title && (
                    <CardContent sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {title}
                        </Typography>
                    </CardContent>
                )}

            </CardActionArea>
        </Card>
    )
}

export default ItemCard;