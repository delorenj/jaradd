'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpaceScene } from '@/components/canvas/SpaceScene';
import { useAppStore, portfolioData } from '@/lib/store';

// Navigation component
const Navigation = () => {
  const { currentScene, setCurrentScene, isMenuOpen, toggleMenu } = useAppStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="flex justify-between items-center">
        {/* Logo/Name */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => setCurrentScene('home')}
        >
          Jarad DeLorenzo
        </motion.h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {[
            { key: 'home', label: 'Home' },
            { key: 'work', label: 'Work' },
            { key: 'music', label: 'Music' }
          ].map(({ key, label }) => (
            <motion.button
              key={key}
              onClick={() => setCurrentScene(key as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentScene === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
            }`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
            }`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-gray-800 rounded-lg p-4"
          >
            {[
              { key: 'home', label: 'Home' },
              { key: 'work', label: 'Work' },
              { key: 'music', label: 'Music' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentScene(key as any);
                  toggleMenu();
                }}
                className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                  currentScene === key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Work Scene placeholder
const WorkScene = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-900 to-green-700"
  >
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Work Portfolio</h2>
      <p className="text-xl mb-8">Interactive 3D portfolio coming soon...</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
        {portfolioData.slice(0, 6).map((item) => (
          <motion.div
            key={item.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm opacity-80">{item.description}</p>
            <div className="mt-2 text-xs opacity-60">
              {item.technologies.join(', ')} • {item.year}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Music Scene placeholder
const MusicScene = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-purple-700"
  >
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Music & Audio</h2>
      <p className="text-xl mb-8">Interactive music visualizations coming soon...</p>
      <div className="space-y-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="font-bold">Audio Visualizer</h3>
          <p className="text-sm opacity-80">Real-time music visualization with Web Audio API</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="font-bold">Interactive Compositions</h3>
          <p className="text-sm opacity-80">Click and drag to create musical patterns</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Loading screen
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50"
  >
    <div className="text-center text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold mb-2">Loading Experience...</h2>
      <p className="text-gray-400">Preparing interactive elements</p>
    </div>
  </motion.div>
);

// Main page component
export default function Home() {
  const { 
    currentScene, 
    isLoading, 
    setLoading, 
    setPortfolioItems,
    setMousePosition 
  } = useAppStore();

  // Initialize app
  useEffect(() => {
    // Load portfolio data
    setPortfolioItems(portfolioData);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading, setPortfolioItems]);

  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setMousePosition]);

  return (
    <main className="w-full h-screen overflow-hidden bg-slate-900">
      <Navigation />
      
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <div key={currentScene} className="w-full h-full">
            {currentScene === 'home' && <SpaceScene />}
            {currentScene === 'work' && <WorkScene />}
            {currentScene === 'music' && <MusicScene />}
          </div>
        )}
      </AnimatePresence>

      {/* Footer info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-6 text-white/60 text-sm"
      >
        <p>Software Architect • Web Developer • Space Enthusiast</p>
        <p className="text-xs mt-1">Built with Next.js + React Three Fiber</p>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-6 right-6 flex space-x-4"
      >
        {[
          { name: 'LinkedIn', url: 'https://linkedin.com/in/delorenj' },
          { name: 'GitHub', url: 'https://github.com/delorenj' },
          { name: 'Twitter', url: 'https://twitter.com/delorenj' }
        ].map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {social.name}
          </motion.a>
        ))}
      </motion.div>
    </main>
  );
}
