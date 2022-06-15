import { Box, Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import contants from '../contants'
import CardWrapper from './CardWrapper'
import OptionalCard from './OptionalCard'

function renderCardWrapper(cardId, cardType) {
    const piece = <OptionalCard text={cardId} />

    return (
        piece ? <CardWrapper cardType={cardType} isOptional={false} cardId={cardId} key={`contract-${cardId}`} >{piece}</CardWrapper> : null
    )
}

function renderCardWrapperChoosed(cardId, cardType) {
    const piece = <OptionalCard text={cardId} />

    return (
        piece ? <CardWrapper cardType={cardType} isOptional={true} cardId={cardId} key={`contract-${cardId}`} >{piece}</CardWrapper> : null
    )
}

export default function ContractBoard() {

    const functions = useSelector((state) => state.contract.optionalContract.functions)
    const implEntities = useSelector((state) => state.contract.optionalContract.impl_entities)

    const choosedFunctions= useSelector((state) => state.contract.functions)
    const choosedImplEntities = useSelector((state) => state.contract.impl_entities)

    let functionRender = []
    let implEntityRender = []

    functions.map(fnId => {
        const cardElement = renderCardWrapper(fnId, contants.CONTRACT_LAYOUT.FUNCTION)
        if(!!cardElement) {
            functionRender.push(cardElement)
        }
    })

    implEntities.map(implEntityId => {
        const cardElement = renderCardWrapper(implEntityId, contants.CONTRACT_LAYOUT.IMPL_ENTITY)
        if(!!cardElement) {
            implEntityRender.push(cardElement)
        }
    })

    choosedFunctions.map(fnId => {
        const cardElement = renderCardWrapperChoosed(fnId, contants.CONTRACT_LAYOUT.FUNCTION)
        if(!!cardElement) {
            functionRender.push(cardElement)
        }
    })

    choosedImplEntities.map(implEntityId => {
        const cardElement = renderCardWrapperChoosed(implEntityId, contants.CONTRACT_LAYOUT.IMPL_ENTITY)
        if(!!cardElement) {
            implEntityRender.push(cardElement)
        }
    })

    return (
        <Grid xs={12} container
            justifyContent="center"
            alignItems="center">
            {functionRender}
            {implEntityRender}
        </Grid>
    )
}