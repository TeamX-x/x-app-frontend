import logo from './logo.svg';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ContractBoard from './components/ContractBoard';
import OptionalCardBoard from './components/OptionalCardBoard';
import { Grid } from '@mui/material';
import OptionalCard from './components/OptionalCard';

function App() {
  return (
    <div className="App">
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center" spacing={2}>

        <Grid xs={10} container
          direction="row"
          justifyContent="center"
          alignItems="center">
          <Grid container item xs={6}>
            <DndProvider backend={HTML5Backend}>
              <OptionalCardBoard></OptionalCardBoard>
            </DndProvider>
          </Grid>

          <Grid container item xs={6}>
            <DndProvider backend={HTML5Backend}>
              <ContractBoard></ContractBoard>
            </DndProvider>
          </Grid>
        </Grid>


      </Grid>


    </div>
  );
}

export default App;
