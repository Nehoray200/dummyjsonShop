import { Box, Typography, List, ListItem, Divider, Stack, Avatar, Rating, Grid, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react'

const ProductReviews = ({ reviews }) => {

    if (!reviews || reviews.length === 0) {
        return (
            <Box sx={{ mt: 4, p: 2 }}>
                <Typography>No Reviews Yet</Typography>
            </Box>
        )
    }

    return (
        <Grid sx={{ width: '100%', mt: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, p: 3 }}>
            <Box sx={{ mb: 2 }}> {/* הוספתי קצת מרווח מתחת לכותרת */}
                <Typography variant="h5" fontWeight="bold">
                    Customer Reviews
                </Typography>
            </Box>

            <List>
                {reviews.map((review, index) => (
                    // React.Fragment מאפשר לנו להחזיר שני אלמנטים (פריט + קו מפריד) בלי לעטוף בדיב מיותר
                    <Box key={index}>

                        <ListItem alignItems="flex-start"> {/* alignItems עוזר כשיש טקסט ארוך */}

                            <ListItemAvatar>
                                {/* 1. הוספנו צבע וגם את האות הראשונה */}
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    {review.reviewerName ? review.reviewerName[0] : 'U'}
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primary={
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        {/* שם המבקר */}
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {review.reviewerName}
                                        </Typography>

                                        {/* 2. הוספנו תאריך בצד ימין */}
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(review.date).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                }
                                secondary={
                                    <Box sx={{ mt: 1 }}>
                                        {/* הכוכבים */}
                                        <Rating name="read-only" value={review.rating} readOnly size="small" />

                                        {/* התגובה עצמה */}
                                        <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                                            {review.comment}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>

                        {index < reviews.length - 1 && <Divider variant="inset" component="li" />}

                    </Box>
                ))}
            </List>
        </Grid>
    )
}

export default ProductReviews