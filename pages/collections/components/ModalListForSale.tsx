import React, { useState } from "react";
import { Box, Button, Divider, Input, Modal, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { OwnedNft } from "alchemy-sdk";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    handleCloseListForSale: () => void;
    open: boolean;
    data: OwnedNft
}

const ModalListForSale = (props: Props) => {
    const { data, handleCloseListForSale, open } = props
    const [price, setPrice] = useState();

    return (
        <Modal
            open={open}
            onClose={handleCloseListForSale}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div onClick={handleCloseListForSale}>
                    <CloseIcon style={{ position: 'absolute', top: 5, right: 5 }} />
                </div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Qick list
                </Typography>
                <div className="display_flex flex_between">
                    <div className="display_flex center">
                        <Image
                            src={data?.media[0].gateway}
                            key={data?.tokenId}
                            alt={data?.title}
                            width={200}
                            height={200}
                            loading="lazy"
                            style={{ width: 'auto', height: 100, borderRadius: 5, marginRight: 5 }}
                        />
                        <div>
                            <span className="text_card title_card">{data?.title}</span>
                            <span className="text_card">{data?.description}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text_card title_card">Listing price</span>
                        <span className="text_card">{price ?? '--'} ETH</span>
                        {price && <span className="text_card">$31,794.60 USD</span>}
                    </div>
                </div>
                <Divider sx={{ padding: 1 }} />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    set price
                </Typography>
                <TextField
                    variant="outlined"
                    InputProps={{
                        endAdornment: <span>ETH</span>,
                    }}
                    fullWidth
                    className="input-price"
                    inputMode="decimal"
                />
                <Divider sx={{ margin: 2 }} />
                <div className="display_flex flex_between">
                    <span className="text_card title_card">Listing price</span>
                    <span className="text_card">{price ?? '--'} ETH</span>
                </div>
                <div className="display_flex flex_between">
                    <span className="text_card title_card">Creator erning</span>
                    <span className="text_card">{price ?? '--'} ETH</span>
                </div>
                <div className="display_flex flex_between">
                    <span className="text_card title_card">Fee</span>
                    <span className="text_card">{price ?? '--'} ETH</span>
                </div>
                <div className="display_flex flex_between">
                    <span className="text_card title_card">Total potential earnings </span>
                    <span className="text_card">{price ?? '--'} ETH</span>
                </div>
                <div className="display_flex center">
                    <Button
                        sx={{ marginTop: 2, width: '90%' }}
                        style={{
                            background: 'rgb(32, 129, 226)',
                            borderRadius: 8,
                            color: '#FFFF'
                        }}>
                        Complete Listing
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalListForSale

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 5
};