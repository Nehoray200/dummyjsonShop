import React from 'react';
import { Box, useTheme } from '@mui/material';

const GalleryThumbnail = ({ image,alt, onClick, isSelected }) => {
      const theme = useTheme();
    return (
        <Box
            component="img"
            src={image}
            onClick={onClick}
            alt={alt || "Thumbnail"}
            sx={{
                width: '100%',
                height: '80px',
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: 2,
                border: isSelected ? `2px solid ${theme.palette.primary.main}`
                    : '1px solid transparent',
                opacity: isSelected ? 1 : 0.7,
                transition: '0.2s',
                '&:hover': { opacity: 1 }
            }}
        />
    )
};

export default GalleryThumbnail;