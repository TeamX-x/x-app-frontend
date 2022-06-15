import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Paper } from '@mui/material';
import React from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { handleDispatchByType, setContract, setFunction, setImplEntity } from '../store/contractSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import contants from '../contants';

const WrapperStyled = styled(Paper)(({ theme }) => ({
    padding: '20px'
}));

export default function CardWrapper({ isOptional, cardId, children, cardType }) {

    const count = useSelector((state) => state.contract.value)
    const dispatch = useDispatch()


    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: 'card',
            drop: () => {
                console.log('xx');
                dispatch(handleDispatchByType({cardType, cardId}))
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        }),
        [cardId]
    )

    const slotContract = () => (<Button variant="outlined"><AddCircleOutlineIcon /></Button>)

    return (
        <div style={{ width: '100%' }} ref={drop}>
            <Grid xs={12} style={{ padding: '20px' }} >
                {(!isOptional) && slotContract()}
                {isOptional && children}
            </Grid>
        </div>

    )
}