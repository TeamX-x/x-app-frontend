import { createSlice } from '@reduxjs/toolkit'
import contants from '../contants';
import counter from '../templates/counter'
import loan from '../templates/loan';

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function __setFunction(functionId, stateFunctions, stateOptionalContractFunctions, isOptionalToContract) {
  let stateFunctionUpdated = stateFunctions
  let stateOptionalContractFunctionsUpdated = stateOptionalContractFunctions

  if(!isOptionalToContract) {
    stateOptionalContractFunctionsUpdated.push(functionId)
    stateFunctionUpdated =  arrayRemove(stateFunctions, functionId)
  } else {
    stateFunctionUpdated.push(functionId)
    stateOptionalContractFunctionsUpdated =  arrayRemove(stateOptionalContractFunctionsUpdated, functionId)
  }

  return {
    stateFunctions: stateFunctionUpdated,
    stateOptionalContractFunctions: stateOptionalContractFunctionsUpdated
  }
}

function __setImplEntity(functionId, stateImplEntities, stateOptionalImplEntities, isOptionalToContract) {
  stateImplEntities.push(functionId)
  return {
    stateImplEntities: stateImplEntities,
    stateOptionalImplEntities: arrayRemove(stateOptionalImplEntities, functionId)
  }
}

export const contractSlice = createSlice({
  name: 'contract',
  elementUsageId: '',
  elementTypeUsage: '',
  initialState: {
    contract: {
      name: '',
      attributes: []
    },
    entities: [],
    functions: [],
    impl_entities: [],
    optionalContract: {
      contract: {
        name: loan.contract.name,
        attributes: loan.contract.attributes
      },
      entities: [],
      functions: loan.functions,
      impl_entities: loan.impl_entities,
    },
  },
  reducers: {
    setContract: (state, contractDetail) => {
      state.contract = contractDetail
    },
    setEntity: (state, entityDetail) => {
      state.entities.push(entityDetail)
    },
    setFunction: (state) => {
      const functionId = state.elementUsageId
      if(functionId) {
        const {
          stateFunctions,
          stateOptionalContractFunctions
        } = __setFunction(functionId, state.functions, state.optionalContract.functions)
  
        state.functions = stateFunctions
        state.optionalContract.functions = stateOptionalContractFunctions
        state.elementUsageId = ''
      }
     
    },
    setImplEntity: (state) => {
      const cardId = state.elementUsageId
      if(!!cardId) {
        const {
          stateImplEntities,
          stateOptionalImplEntities
        } = __setImplEntity(cardId, state.impl_entities, state.optionalContract.impl_entities)
  
        state.impl_entities = stateImplEntities
        state.optionalContract.impl_entities = stateOptionalImplEntities
        state.elementUsageId = ''
      }
     
    },
    handleDispatchByType(state, context) {
      const cardType =  state.elementTypeUsage
      const cardId = state.elementUsageId

      const isMoveOptionalToContract = context.payload.is_move_optional_to_contract ?? true

      if(isMoveOptionalToContract && cardType != context.payload.card_type) {
        return ;
      }

      if(!!cardId) {
        switch (cardType) {
          case contants.CONTRACT_LAYOUT.FUNCTION:
            const {
              stateFunctions,
              stateOptionalContractFunctions
            } = __setFunction(cardId, state.functions, state.optionalContract.functions, isMoveOptionalToContract)
      
            state.functions = stateFunctions
            state.optionalContract.functions = stateOptionalContractFunctions
            state.elementTypeUsage = ''
            state.elementUsageId = ''

            console.log(stateFunctions)
            return ;
          case contants.CONTRACT_LAYOUT.IMPL_ENTITY:
            const {
              stateImplEntities,
              stateOptionalImplEntities
            } = __setImplEntity(cardId, state.impl_entities, state.optionalContract.impl_entities, isMoveOptionalToContract)
      
            state.impl_entities = stateImplEntities
            state.optionalContract.impl_entities = stateOptionalImplEntities
            state.elementTypeUsage = ''
            state.elementUsageId = ''
            return ;
          default:
        }
      }

    },
    setElementUsageId(state, context) {
      state.elementUsageId = context.payload
    },
    setElementTypeUsage(state, context) {
      state.elementTypeUsage = context.payload
    },


  },
})

// Action creators are generated for each case reducer function
export const { setContract, setEntity, setImplEntity, handleDispatchByType, setElementUsageId, setElementTypeUsage } = contractSlice.actions

export default contractSlice.reducer