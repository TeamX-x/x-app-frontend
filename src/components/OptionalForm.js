import { Button, Grid, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import React from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import contants from '../contants'
import { handleDispatchByType, setContract, setContractAttributeValueByIndex, setElementTypeUsage, setElementUsageId } from '../store/contractSlice'

export default function OptionalForm({ id, type, name, isOnContract, attribute }) {

    const [value, setValue] = React.useState(new Date());



    const optionalContractInit = useSelector(state => state.contract.optionalContract.contract)
    const dispatch = useDispatch()

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'card',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        canDrag: () => {
            dispatch(setElementUsageId(id))
            dispatch(setElementTypeUsage(type))

            return true
        },
        end: () => {
            if (isOnContract) {
                dispatch(handleDispatchByType({ is_move_optional_to_contract: false }))
            }
        }
    }))

    const renderFormInit = () => {
        // return<TextField
        //         required
        //         id="outlined-required"
        //         label={attribute.name}
        //         defaultValue={attribute.value}
        //     />

        return <DateTimePicker
            label={attribute.name}
            value={value}
            onChange={() => dispatch(setContractAttributeValueByIndex({ index: id, value: value }))}
            renderInput={(params) => <TextField {...params} />}
        />
    }

    return <div ref={dragRef}>
        <Grid xs={12}>
            {(!isOnContract) && <Button variant="outlined">{name}</Button>}
            {isOnContract && renderFormInit()}
        </Grid>
    </div>
}