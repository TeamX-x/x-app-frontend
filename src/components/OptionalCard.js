import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useDrag } from 'react-dnd'
import { setContract } from '../store/contractSlice'

export default function OptionalCard({text}) {

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'card',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return <div ref={dragRef}>
        <Grid xs={12}>
            <Button variant="outlined">{text}</Button>
        </Grid>
    </div>
}