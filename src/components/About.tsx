import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Briefcase, Award, Code, Palette, Server, Wrench } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

const SkillCard: React.FC<{ skills: string[], icon: React.ElementType, title: string, color: string }> = ({ 
  skills, icon: Icon, title, color 
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-xl ${color} mr-4`}>
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

const ExperienceCard: React.FC<{ 
  experience: any, 
  index: number 
}> = ({ experience, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-400 transform -translate-x-1/2 hidden lg:block" />
      
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transform -translate-x-1/2 hidden lg:block" />

      <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center mb-3">
            <Briefcase className="text-purple-400 mr-3" size={20} />
            <span className="text-purple-300 text-sm font-medium">{experience.duration}</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{experience.position}</h3>
          <h4 className="text-lg text-purple-300 mb-4">{experience.company}</h4>
          <p className="text-gray-300 leading-relaxed">{experience.description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

const About: React.FC = () => {
  const { portfolioData } = usePortfolio()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (!portfolioData) return null

  const { about } = portfolioData

  const skillCategories = [
    {
      title: "Frontend",
      skills: about.skills.frontend,
      icon: Code,
      color: "bg-gradient-to-r from-blue-500 to-purple-600"
    },
    {
      title: "Backend",
      skills: about.skills.backend,
      icon: Server,
      color: "bg-gradient-to-r from-green-500 to-blue-600"
    },
    {
      title: "Tools & DevOps",
      skills: about.skills.tools,
      icon: Wrench,
      color: "bg-gradient-to-r from-orange-500 to-red-600"
    },
    {
      title: "Design",
      skills: about.skills.design,
      icon: Palette,
      color: "bg-gradient-to-r from-pink-500 to-purple-600"
    }
  ]

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

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
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-purple-300 text-sm font-medium mb-6"
          >
            <User className="mr-2" size={16} />
            About Me
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Crafting Digital
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {about.summary}
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={category.title}
                {...category}
              />
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Professional Experience</h3>
          <div className="relative space-y-12">
            {about.experience.map((exp, index) => (
              <ExperienceCard
                key={exp.company}
                experience={exp}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">Education</h3>
          {about.education.map((edu) => (
            <motion.div
              key={edu.school}
              whileHover={{ scale: 1.02 }}
              className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="text-purple-400 mr-3" size={24} />
                <span className="text-purple-300 font-medium">{edu.year}</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{edu.degree}</h4>
              <p className="text-gray-300">{edu.school}</p>
              <p className="text-purple-300 text-sm mt-2">GPA: {edu.gpa}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Fix the import
import { User } from 'lucide-react'

export default About
