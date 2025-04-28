import { BrowserRouter } from 'react-router-dom';

// local imports
import { AppRoutes } from './routes';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
