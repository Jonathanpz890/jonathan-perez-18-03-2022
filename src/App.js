import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './pages';

const App = () => {

    const renderComponent = (component) => {
        return component;
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
