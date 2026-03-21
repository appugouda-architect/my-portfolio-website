import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
	ExternalLink,
	Github,
	Code,
	Smartphone,
	ShoppingCart,
	Globe,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ProjectCard: React.FC<{ project: any; index: number }> = ({
	project,
	index,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	const getCategoryIcon = (category: string) => {
		switch (category.toLowerCase()) {
			case 'mobile application':
				return Smartphone;
			case 'e-commerce':
				return ShoppingCart;
			case 'web application':
			default:
				return Globe;
		}
	};

	const CategoryIcon = getCategoryIcon(project.category);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ y: -10 }}
			className="group"
		>
			<div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500">
				{/* Project Image */}
				<div className="relative overflow-hidden h-48">
					<motion.img
						src={project.image}
						alt={project.title}
						className="w-20 h-20 object-cover p-1"
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.6 }}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

					{/* Category Badge */}
					<div className="absolute top-4 left-24">
						<div className="flex items-center px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">
							<CategoryIcon size={14} className="text-white mr-2" />
							<span className="text-white text-xs font-medium">
								{project.category}
							</span>
						</div>
					</div>

					{/* Quick Links */}
					<div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<motion.a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors duration-200"
						>
							<ExternalLink size={16} />
						</motion.a>
						<motion.a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors duration-200"
						>
							<Github size={16} />
						</motion.a>
					</div>
				</div>

				{/* Project Content */}
				<div className="p-6">
					<h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
						{project.title}
					</h3>

					<p className="text-gray-300 text-sm leading-relaxed mb-4">
						{project.description}
					</p>

					{/* Features */}
					<div className="mb-4">
						<h4 className="text-white text-sm font-medium mb-2">
							Key Features:
						</h4>
						<ul className="space-y-1">
							{project.features
								.slice(0, 3)
								.map((feature: string, idx: number) => (
									<li
										key={idx}
										className="text-gray-400 text-xs flex items-center"
									>
										<div className="w-1 h-1 bg-purple-400 rounded-full mr-2" />
										{feature}
									</li>
								))}
						</ul>
					</div>

					{/* Technologies */}
					<div className="flex flex-wrap gap-2 mb-4">
						{project.technologies.map((tech: string) => (
							<span
								key={tech}
								className="px-2 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-md text-xs text-purple-300"
							>
								{tech}
							</span>
						))}
					</div>

					{/* Action Buttons */}
					<div className="flex space-x-3">
						<motion.a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
						>
							<ExternalLink size={16} className="mr-2" />
							Live Demo
						</motion.a>

						<motion.a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="flex items-center justify-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
						>
							<Github size={16} className="mr-2" />
							Code
						</motion.a>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const Projects: React.FC = () => {
	const { portfolioData } = usePortfolio();
	const [filter, setFilter] = useState('All');
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	if (!portfolioData) return null;

	const { projects } = portfolioData;

	const categories = [
		'All',
		...Array.from(new Set(projects.map((p) => p.category))),
	];
	const filteredProjects =
		filter === 'All' ? projects : projects.filter((p) => p.category === filter);

	return (
		<section id="projects" className="relative py-20 lg:py-32 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800" />

			{/* Background decorations */}
			<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
			<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={
							isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
						}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-purple-300 text-sm font-medium mb-6"
					>
						<Code className="mr-2" size={16} />
						My Projects
					</motion.div>

					<h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
						Featured
						<span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							Work
						</span>
					</h2>

					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						A collection of projects that showcase my skills in AWS
						Cloud,full-stack development, serverless and modern web
						technologies.
					</p>
				</motion.div>

				{/* Filter Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex flex-wrap justify-center gap-4 mb-12"
				>
					{categories.map((category) => (
						<motion.button
							key={category}
							onClick={() => setFilter(category)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
								filter === category
									? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
									: 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 hover:text-white hover:bg-white/20'
							}`}
						>
							{category}
						</motion.button>
					))}
				</motion.div>

				{/* Projects Grid */}
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<AnimatePresence mode="wait">
						{filteredProjects.map((project, index) => (
							<ProjectCard key={project.id} project={project} index={index} />
						))}
					</AnimatePresence>
				</motion.div>

				{/* View More Projects */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-center mt-16"
				>
					<motion.a
						href="#contact"
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
					>
						<Github className="mr-2" size={20} />
						View More on GitHub
						<ExternalLink className="ml-2" size={16} />
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
};

export default Projects;
