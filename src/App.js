import logo from './logo.svg';
import './scss/main.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './pages';
import Navbar from './components/Navbar';

const App = () => {

    const renderComponent = (component) => {
        return(
            <div className="Container">
                <Navbar />
                {component}
            </div>
        )
    }
    return (
        <Router>
            <Routes>
                {routes.map(route => 
                    <Route
                        exact
                        key={route.name}
                        path={route.path}
                        element={renderComponent(route.component)}
                    />
                )}
                <Route path='*' element={<Navigate to='/by-item' />} />
            </Routes>
        </Router>
    );
}

export default App;
