import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
	Mail,
	Phone,
	MapPin,
	Send,
	CheckCircle,
	AlertCircle,
	Github,
	Linkedin,
	Twitter,
	Download,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Button } from './ui/button';

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
}

const Contact: React.FC = () => {
	const { portfolioData } = usePortfolio();
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');

	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
		} else if (formData.name.trim().length < 2) {
			newErrors.name = 'Name must be at least 2 characters';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!formData.subject.trim()) {
			newErrors.subject = 'Subject is required';
		} else if (formData.subject.trim().length < 5) {
			newErrors.subject = 'Subject must be at least 5 characters';
		}

		if (!formData.message.trim()) {
			newErrors.message = 'Message is required';
		} else if (formData.message.trim().length < 10) {
			newErrors.message = 'Message must be at least 10 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// In a real application, you would submit to your backend or service like:
			// const response = await fetch('/api/contact', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(formData)
			// })

			setSubmitStatus('success');
			setFormData({ name: '', email: '', subject: '', message: '' });
		} catch (error) {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSubmitStatus('idle'), 5000);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	if (!portfolioData) return null;

	const { personal } = portfolioData;

	return (
		<section id="contact" className="relative py-20 lg:py-32 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900" />

			{/* Background decorations */}
			<div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
			<div className="absolute bottom-1/3 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

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
						<Mail className="mr-2" size={16} />
						Get In Touch
					</motion.div>

					<h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
						Let's Work
						<span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							Together
						</span>
					</h2>

					<div className="flex justify-center mb-6">
						<a
							href="/data/resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
						>
							<Download size={16} />
							<span>Here's my resume</span>
						</a>
					</div>

					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Ready to bring your ideas to life? I'm always excited to work on new
						projects and collaborate with amazing people. Let's create something
						incredible together!
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-2xl font-semibold text-white mb-6">
								Contact Information
							</h3>

							<div className="space-y-6">
								<motion.div
									whileHover={{ x: 10 }}
									className="flex items-center space-x-4"
								>
									<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
										<Mail className="text-white" size={20} />
									</div>
									<div>
										<p className="text-gray-400 text-sm">Email</p>
										<a
											href={`mailto:${personal.email}`}
											className="text-white hover:text-purple-300 transition-colors duration-200"
										>
											{personal.email}
										</a>
									</div>
								</motion.div>

								<motion.div
									whileHover={{ x: 10 }}
									className="flex items-center space-x-4"
								>
									<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
										<Phone className="text-white" size={20} />
									</div>
									<div>
										<p className="text-gray-400 text-sm">Phone</p>
										<a
											href={`tel:${personal.phone}`}
											className="text-white hover:text-purple-300 transition-colors duration-200"
										>
											{personal.phone}
										</a>
									</div>
								</motion.div>

								<motion.div
									whileHover={{ x: 10 }}
									className="flex items-center space-x-4"
								>
									<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
										<MapPin className="text-white" size={20} />
									</div>
									<div>
										<p className="text-gray-400 text-sm">Location</p>
										<p className="text-white">{personal.location}</p>
									</div>
								</motion.div>
							</div>
						</div>

						{/* Social Links */}
						<div>
							<h4 className="text-lg font-semibold text-white mb-4">
								Follow Me
							</h4>
							<div className="flex space-x-4">
								<motion.a
									href={personal.social.github}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.9 }}
									className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
								>
									<Github size={20} />
								</motion.a>

								<motion.a
									href={personal.social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.9 }}
									className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
								>
									<Linkedin size={20} />
								</motion.a>

								<motion.a
									href={personal.social.twitter}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.9 }}
									className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
								>
									<Twitter size={20} />
								</motion.a>
							</div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Name Input */}
							<div>
								<label
									htmlFor="name"
									className="block text-white text-sm font-medium mb-2"
								>
									Full Name *
								</label>
								<motion.input
									whileFocus={{ scale: 1.02 }}
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
										errors.name ? 'border-red-500' : 'border-white/20'
									}`}
									placeholder="Enter your full name"
								/>
								{errors.name && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-1 flex items-center"
									>
										<AlertCircle size={14} className="mr-1" />
										{errors.name}
									</motion.p>
								)}
							</div>

							{/* Email Input */}
							<div>
								<label
									htmlFor="email"
									className="block text-white text-sm font-medium mb-2"
								>
									Email Address *
								</label>
								<motion.input
									whileFocus={{ scale: 1.02 }}
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
										errors.email ? 'border-red-500' : 'border-white/20'
									}`}
									placeholder="Enter your email address"
								/>
								{errors.email && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-1 flex items-center"
									>
										<AlertCircle size={14} className="mr-1" />
										{errors.email}
									</motion.p>
								)}
							</div>

							{/* Subject Input */}
							<div>
								<label
									htmlFor="subject"
									className="block text-white text-sm font-medium mb-2"
								>
									Subject *
								</label>
								<motion.input
									whileFocus={{ scale: 1.02 }}
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleInputChange}
									className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
										errors.subject ? 'border-red-500' : 'border-white/20'
									}`}
									placeholder="What's this about?"
								/>
								{errors.subject && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-1 flex items-center"
									>
										<AlertCircle size={14} className="mr-1" />
										{errors.subject}
									</motion.p>
								)}
							</div>

							{/* Message Input */}
							<div>
								<label
									htmlFor="message"
									className="block text-white text-sm font-medium mb-2"
								>
									Message *
								</label>
								<motion.textarea
									whileFocus={{ scale: 1.02 }}
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									rows={5}
									className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none ${
										errors.message ? 'border-red-500' : 'border-white/20'
									}`}
									placeholder="Tell me about your project..."
								/>
								{errors.message && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-1 flex items-center"
									>
										<AlertCircle size={14} className="mr-1" />
										{errors.message}
									</motion.p>
								)}
							</div>

							{/* Submit Button */}
							<motion.button
								type="submit"
								disabled={isSubmitting}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
									submitStatus === 'success'
										? 'bg-green-600 text-white'
										: submitStatus === 'error'
										? 'bg-red-600 text-white'
										: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
								} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
							>
								{isSubmitting ? (
									<>
										<motion.div
											animate={{ rotate: 360 }}
											transition={{
												duration: 1,
												repeat: Infinity,
												ease: 'linear',
											}}
											className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
										/>
										<span>Sending...</span>
									</>
								) : submitStatus === 'success' ? (
									<>
										<CheckCircle size={20} />
										<span>Message Sent!</span>
									</>
								) : submitStatus === 'error' ? (
									<>
										<AlertCircle size={20} />
										<span>Failed to Send</span>
									</>
								) : (
									<>
										<Send size={20} />
										<span>Send Message</span>
									</>
								)}
							</motion.button>

							{/* Success/Error Messages */}
							{submitStatus === 'success' && (
								<motion.p
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-green-400 text-sm text-center"
								>
									Thank you for your message! I'll get back to you soon.
								</motion.p>
							)}

							{submitStatus === 'error' && (
								<motion.p
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-red-400 text-sm text-center"
								>
									Something went wrong. Please try again or contact me directly.
								</motion.p>
							)}
						</form>
					</motion.div>
				</div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6, delay: 1 }}
					className="text-center mt-20 pt-12 border-t border-white/10"
				>
					<p className="text-gray-400">
						© 2024 {personal.name}. Built with React, TypeScript, and ❤️
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default Contact;
