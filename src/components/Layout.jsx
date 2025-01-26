import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

function Layout(props) {
  return (
    <div className="Layout">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
