import Container from 'react-bootstrap/Container';
import CoinsList from './pages/CoinsList';
import CoinDetails from './pages/CoinDetails';
import NoMatch from './pages/NoMatch';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = () => (
  <Container style={{marginTop: '50px'}}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="coins" />} />
        <Route path="coins" element={<CoinsList />} />
        <Route path="/coins/:param" element={<CoinDetails />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  </Container>
);

export default App;
