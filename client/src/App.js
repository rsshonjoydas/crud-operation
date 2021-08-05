import { AppBar, Container, Typography } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit">
          <Typography variant="h2" align="center">
            Post Box
          </Typography>
        </AppBar>
      </Container>
    </Provider>
  );
}

export default App;
