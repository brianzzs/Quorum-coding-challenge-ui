import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import HeaderComponent from './components/Header/Header'
import HomePage from './pages/HomePage';
import BillsPage from './pages/BillsPage';
import LegislatorsPage from './pages/LegislatorsPage';
import FooterSection from './components/LandingPage/FooterSection'; 
import { AppShell } from '@mantine/core';

function App() {


  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <HeaderComponent />
      </AppShell.Header>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/legislators" element={<LegislatorsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell.Main>
      <FooterSection /> 
    </AppShell>
  )
}

export default App
