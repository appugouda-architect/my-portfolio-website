import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
	return (
		<Sphere visible args={[1, 100, 200]} scale={2.4}>
			<MeshDistortMaterial
				color="#8b5cf6"
				attach="material"
				distort={0.5}
				speed={2}
				roughness={0}
			/>
		</Sphere>
	);
};

const LoadingScreen: React.FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
		>
			{/* 3D Sphere */}
			<div className="w-64 h-64 mb-8">
				<Canvas camera={{ position: [0, 0, 5] }}>
					<ambientLight intensity={0.5} />
					<directionalLight position={[10, 10, 5]} intensity={1} />
					<AnimatedSphere />
					<OrbitControls enableZoom={false} enablePan={false} />
				</Canvas>
			</div>

			{/* Loading Text */}
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.8 }}
				className="text-center"
			>
				<h1 className="text-4xl font-bold text-white mb-4">
					Appugouda B Patil
				</h1>
				<div className="flex items-center space-x-2">
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
						className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full"
					/>
					<span className="text-gray-300 text-lg">Loading portfolio...</span>
				</div>
			</motion.div>

			{/* Animated particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-purple-400 rounded-full"
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
							opacity: 0,
						}}
						animate={{
							y: [null, -100],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: Math.random() * 2,
							ease: 'easeOut',
						}}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default LoadingScreen;
