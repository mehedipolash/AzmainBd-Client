import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ScrollToTop from '../components/ScrollToTop';
import WelcomeOffer from '../components/WelcomeOffer';

const RootLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <WelcomeOffer />
            <Navbar></Navbar>
            <main className="flex-1">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
