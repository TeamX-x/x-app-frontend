import { createSlice } from '@reduxjs/toolkit'
import contants from '../contants';
import counter from '../templates/counter'

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function __setFunction(functionId, stateFunctions, stateOptionalContractFunctions) {
  stateFunctions.push(functionId)
  return {
    stateFunctions: stateFunctions,
    stateOptionalContractFunctions: arrayRemove(stateOptionalContractFunctions, functionId)
  }
}

function __setImplEntity(functionId, stateImplEntities, stateOptionalImplEntities) {
  stateImplEntities.push(functionId)
  return {
    stateImplEntities: stateImplEntities,
    stateOptionalImplEntities: arrayRemove(stateOptionalImplEntities, functionId)
  }
}

export const contractSlice = createSlice({
  name: 'contract',
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
        name: '',
        attributes: []
      },
      entities: [],
      functions: counter.functions,
      impl_entities: counter.impl_entities,
    }
  },
  reducers: {
    setContract: (state, contractDetail) => {
      state.contract = contractDetail
    },
    setEntity: (state, entityDetail) => {
      state.entities.push(entityDetail)
    },
    setFunction: (state, context) => {
      const functionId = context.payload
      const {
        stateFunctions,
        stateOptionalContractFunctions
      } = __setFunction(functionId, state.functions, state.optionalContract.functions)

      state.functions = stateFunctions
      state.optionalContract.functions = stateOptionalContractFunctions
    },
    setImplEntity: (state, context) => {
      const cardId = context.payload
      const {
        stateImplEntities,
        stateOptionalImplEntities
      } = __setImplEntity(cardId, state.impl_entities, state.optionalContract.impl_entities)

      state.impl_entities = stateImplEntities
      state.optionalContract.impl_entities = stateOptionalImplEntities
    },
    handleDispatchByType(state, context) {
      const { cardType, cardId } = context.payload
      
      switch (cardType) {
        case contants.CONTRACT_LAYOUT.FUNCTION:
          const {
            stateFunctions,
            stateOptionalContractFunctions
          } = __setFunction(cardId, state.functions, state.optionalContract.functions)
    
          state.functions = stateFunctions
          state.optionalContract.functions = stateOptionalContractFunctions
          return ;
        case contants.CONTRACT_LAYOUT.IMPL_ENTITY:
          const {
            stateImplEntities,
            stateOptionalImplEntities
          } = __setImplEntity(cardId, state.impl_entities, state.optionalContract.impl_entities)
    
          state.impl_entities = stateImplEntities
          state.optionalContract.impl_entities = stateOptionalImplEntities
          return ;
        default:
      }
    }

  },
})

// Action creators are generated for each case reducer function
export const { setContract, setEntity, setImplEntity, handleDispatchByType } = contractSlice.actions

export default contractSlice.reducer