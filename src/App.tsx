import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';

// Context
import { PortfolioProvider } from './context/PortfolioContext';

// Styles
import './App.css';

function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Initialize smooth scrolling
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Simulate loading time
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => {
			clearTimeout(timer);
			lenis.destroy();
		};
	}, []);

	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
			<PortfolioProvider>
				<Router>
					<div className="App">
						<AnimatePresence mode="wait">
							{isLoading ? (
								<LoadingScreen key="loading" />
							) : (
								<motion.div
									key="main"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
									className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
								>
									<Navigation />
									<main className="relative">
										<Hero />
										<About />
										<Projects />
										<Contact />
									</main>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</Router>
			</PortfolioProvider>
		</ThemeProvider>
	);
}

export default App;
