import React, { createContext, useContext, useEffect, useState } from 'react';

interface PortfolioData {
	personal: {
		name: string;
		title: string;
		bio: string;
		location: string;
		email: string;
		phone: string;
		avatar: string;
		social: {
			github: string;
			linkedin: string;
			twitter: string;
			portfolio: string;
		};
	};
	about: {
		summary: string;
		experience: Array<{
			company: string;
			position: string;
			duration: string;
			description: string;
		}>;
		education: Array<{
			degree: string;
			school: string;
			year: string;
			gpa: string;
		}>;
		skills: {
			frontend: string[];
			backend: string[];
			tools: string[];
			design: string[];
			architecture: string[];
			databases: string[];
		};
	};
	projects: Array<{
		id: number;
		title: string;
		description: string;
		image: string;
		technologies: string[];
		features: string[];
		liveUrl: string;
		githubUrl: string;
		category: string;
	}>;
	achievements: Array<{
		title: string;
		description: string;
		year: string;
		icon: string;
	}>;
	testimonials: Array<{
		name: string;
		position: string;
		company: string;
		content: string;
		rating: number;
	}>;
}

interface PortfolioContextType {
	portfolioData: PortfolioData | null;
	isLoading: boolean;
	error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
	undefined
);

export const usePortfolio = () => {
	const context = useContext(PortfolioContext);
	if (context === undefined) {
		throw new Error('usePortfolio must be used within a PortfolioProvider');
	}
	return context;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPortfolioData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/data/portfolio.json');
				if (!response.ok) {
					throw new Error('Failed to fetch portfolio data');
				}
				const data = await response.json();
				setPortfolioData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setIsLoading(false);
			}
		};

		fetchPortfolioData();
	}, []);

	const value = {
		portfolioData,
		isLoading,
		error,
	};

	return (
		<PortfolioContext.Provider value={value}>
			{children}
		</PortfolioContext.Provider>
	);
};
