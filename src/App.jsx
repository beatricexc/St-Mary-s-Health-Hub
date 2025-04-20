import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ErrorBoundary>
          <NavBar />
        </ErrorBoundary>
        <Routes>
          <Route path="/" element={
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          } />
          <Route path="/login" element={
            <ErrorBoundary>
              <LoginPage />
            </ErrorBoundary>
          } />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;