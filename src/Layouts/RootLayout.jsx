import React from 'react';
import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import AOS from 'aos';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ScrollToTop from '../components/ScrollToTop';
import WelcomeOffer from '../components/WelcomeOffer';
import WhatsAppButton from '../components/WhatsAppButton';
import UseAos from '../Hooks/UseAos';

const RootLayout = () => {
    const { pathname } = useLocation();
    UseAos();

    // Elements mounted by a new route are invisible to the observer AOS set up
    // on first load, so it needs re-scanning after every navigation.
    useEffect(() => {
        AOS.refreshHard();
    }, [pathname]);

    return (
        <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <WelcomeOffer />
            <Navbar></Navbar>
            <main className="flex-1">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
            {/* Sits outside <main> so it stays fixed over every route — orders
                are placed on WhatsApp, so this must never scroll away. */}
            <WhatsAppButton />
        </div>
    );
};

export default RootLayout;
