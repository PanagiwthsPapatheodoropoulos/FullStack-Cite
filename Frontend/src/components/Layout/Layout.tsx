import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="container mt-4 mb-5">
        {children}
      </main>
      <footer className="bg-light py-3 text-center">
        <div className="container">
          <p className="mb-0">Employee Management System &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;