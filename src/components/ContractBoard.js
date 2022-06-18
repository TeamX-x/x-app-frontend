import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import contants from '../contants'
import { requestDeploy } from '../store/contractSlice'
import CardWrapper from './CardWrapper'
import OptionalCard from './OptionalCard'
import OptionalForm from './OptionalForm'

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

function renderFormWrapper(id, name, cardType, attribute) {
    const piece = <OptionalForm id={id} attribute={attribute} isOnContract={true} type={cardType} name={name} />

    return (
        piece ? <CardWrapper isSlot={false} cardType={cardType} isOptional={true} cardId={id} key={`optional-${name}`} >{piece}</CardWrapper> : null
    )
}

export default function ContractBoard() {

    const [loadingBtn, setLoadinBtn] = useState(true)

    const dispatch = useDispatch()

    const choosedAttributes = useSelector((state) => state.contract.contract.attributes)
    const choosedFunctions = useSelector((state) => state.contract.functions)
    const choosedImplEntities = useSelector((state) => state.contract.impl_entities)

    let attributes = []
    let functionRender = []
    let implEntityRender = []

    choosedAttributes.map((attribute, index) => {
        const cardElement = renderFormWrapper(index, attribute.name, contants.CONTRACT_LAYOUT.CONTRACT, attribute)
        if (!!cardElement) {
            attributes.push(cardElement)
        }
    })


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
                    {attributes}
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
            <Grid xs={12}
                style={{
                    marginTop: '20px',
                }} container
                justifyContent="center">
                <Button loading onClick={() => dispatch(requestDeploy())} variant="contained">Deploy</Button>
            </Grid>
        </Grid>
    )
}