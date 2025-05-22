import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AttributesList from './components/Attributes/AttributesList';
import AttributeForm from './components/Attributes/AttributeForm';
import AttributeEdit from './components/Attributes/AttributeEdit';
import EmployeesList from './components/Employees/EmployeesList';
import EmployeeForm from './components/Employees/EmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Attributes Routes */}
          <Route path="/attributes" element={<AttributesList />} />
          <Route path="/attributes/new" element={<AttributeForm />} />
          <Route path="/attributes/:id" element={<AttributeEdit />} />
          
          {/* Employees Routes */}
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          {/* <Route path="/employees/:id" element={<EmployeeEdit />} /> */}
          
          {/* Map Routes */}
          {/* <Route path="/map" element={<EmployeeSearch />} /> */}
          {/* <Route path="/map/route/:id" element={<RouteMap />} /> */}
          
          {/* Default redirect */}
          <Route path="/" element={<AttributesList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;