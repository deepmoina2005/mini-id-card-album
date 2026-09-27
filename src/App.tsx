import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AlbumLayout from './pages/AlbumLayout';
import Settings from './pages/Settings';
import PrintModule from './pages/PrintModule';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="album-layout" element={<AlbumLayout />} />
          <Route path="settings" element={<Settings />} />
          <Route path="print" element={<PrintModule />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;