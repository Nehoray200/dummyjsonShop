import React from 'react'
import {Grid} from '@mui/material'

const ImageSide = ({lightImage,darkImage}) => {
    return (
        <Grid
            size={{ xs: 0, sm: 4, md: 7 }}
            sx={{
                display: { xs: 'none', sm: 'block' },
                backgroundColor: (t) => t.palette.background.default,

                backgroundImage: (t) => t.palette.mode === 'light' ? `url(${lightImage})` : `url(${darkImage})`,

                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    )
}

export default ImageSide