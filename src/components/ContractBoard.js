import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import contants from '../contants'
import CardWrapper from './CardWrapper'
import OptionalCard from './OptionalCard'

function renderCardSlot(cardId, cardType) {
    const piece = <OptionalCard isOnContract={true} type={cardType} cardId={cardId} />

    return (
        piece ? <CardWrapper isSlot={true} cardType={cardType} isOptional={false} cardId={cardId} key={`contract-${cardId}`} >{piece}</CardWrapper> : null
    )
}

function renderCardWrapperChoosed(cardId, cardType) {
    const piece = <OptionalCard isOnContract={true} type={cardType} cardId={cardId} />

    return (
        piece ? <CardWrapper isSlot={false} cardType={cardType} isOptional={true} cardId={cardId} key={`contract-${cardId}`} >{piece}</CardWrapper> : null
    )
}

export default function ContractBoard() {

    const choosedFunctions = useSelector((state) => state.contract.functions)
    const choosedImplEntities = useSelector((state) => state.contract.impl_entities)

    let functionRender = []
    let implEntityRender = []

    choosedFunctions.map(fnId => {
        const cardElement = renderCardWrapperChoosed(fnId, contants.CONTRACT_LAYOUT.FUNCTION)
        if (!!cardElement) {
            functionRender.push(cardElement)
        }
    })

    choosedImplEntities.map(implEntityId => {
        const cardElement = renderCardWrapperChoosed(implEntityId, contants.CONTRACT_LAYOUT.IMPL_ENTITY)
        if (!!cardElement) {
            implEntityRender.push(cardElement)
        }
    })

    return (
        <Grid xs={12} container
            justifyContent="center"
            alignItems="center">
            <Grid xs={12} container
                justifyContent="center"
                alignItems="center">

                <Card style={{
                    padding: '20px',
                    marginTop: '20px',
                    width: '80%'
                }} variant="outlined">
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Init Contract
                    </Typography>
                    {renderCardSlot(1, contants.CONTRACT_LAYOUT.CONTRACT)}
                </Card>
            </Grid>

            <Grid xs={12} container
                justifyContent="center"
                alignItems="center">

                <Card style={{
                    padding: '20px',
                    marginTop: '20px',
                    width: '80%'
                }} variant="outlined">
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Functions
                    </Typography>
                    {functionRender}
                    {renderCardSlot(1, contants.CONTRACT_LAYOUT.FUNCTION)}
                </Card>
            </Grid>

            <Grid xs={12} container
                justifyContent="center"
                alignItems="center">

                <Card style={{
                    padding: '20px',
                    marginTop: '20px',
                    width: '80%'
                }} variant="outlined">
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Entities
                    </Typography>
                    {implEntityRender}
                    {renderCardSlot(2, contants.CONTRACT_LAYOUT.IMPL_ENTITY)}
                </Card>
            </Grid>

        </Grid>
    )
}