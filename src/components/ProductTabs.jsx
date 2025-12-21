import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Stack } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PolicyIcon from '@mui/icons-material/Policy';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const ProductTabs = ({ product }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if(!product)
        return(<>erorr</>)
    return (
        <Box sx={{ width: '100%', mt: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" centered>
                    <Tab label="Specifications" sx={{ fontWeight: 'bold' }}  />
                    <Tab label="Shipping & Policies" sx={{ fontWeight: 'bold' }} />
                </Tabs>
            </Box>

            {/* --- טאב 1: מפרט טכני --- */}
            <CustomTabPanel value={value} index={0}>
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee' }}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%' }}>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                                <TableCell>{product.weight}g</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Dimensions</TableCell>
                                <TableCell>
                                    {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} cm
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                                <TableCell>{product.sku}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Barcode</TableCell>
                                <TableCell>{product.meta?.barcode}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Stack spacing={3}>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <LocalShippingIcon color="primary" fontSize="large" />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Shipping Information</Typography>
                            <Typography variant="body2" color="text.secondary">{product.shippingInformation}</Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <VerifiedUserIcon color="primary" fontSize="large" />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Warranty Protection</Typography>
                            <Typography variant="body2" color="text.secondary">{product.warrantyInformation}</Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <PolicyIcon color="primary" fontSize="large" />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Return Policy</Typography>
                            <Typography variant="body2" color="text.secondary">{product.returnPolicy}</Typography>
                        </Box>
                    </Stack>

                </Stack>
            </CustomTabPanel>

        </Box>
    );
}

export default ProductTabs;