import { useEffect, useRef, useState } from 'react';

const HeroSection = ({ onEnquiryClick }) => {
  const stats = [
    { label: 'Aspirants Mentored', value: 2500, suffix: '+', color: 'from-blue-600 to-blue-700' },
    { label: 'Selections & Interviews', value: 1200, suffix: '+', color: 'from-blue-700 to-blue-800' },
    { label: 'Expert Mentors', value: 40, suffix: '+', color: 'from-blue-800 to-blue-900' },
    { label: 'Mentors Availability', value: 24, suffix: '/7', color: 'from-blue-900 to-indigo-900' },
  ]

  const features = [
    'Daily 1:1 Personalised Mentorship Sessions',
    'Answer Writing & Evaluation Sessions',
    'Psychological Support & Personality Development Sessions',
    'Daily study targets',
    'Prelims + Mains Modular & Weekly Tests',
    'Mandatory Post-Test Discussion',
    'Current Affairs Support',
    'Performance Tracking & Personalized Feedback',
    '24/7 Mentor Support',
  ]

  const statsRef = useRef(null)
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isBlinking, setIsBlinking] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const element = statsRef.current
    if (!element) return

    const onIntersect = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
        const durationMs = 1200
        const startTime = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - startTime) / durationMs, 1)
          setAnimatedValues(
            stats.map((s, index) => {
              if (index === 3) {
                const target = s.value
                const eased = target * progress
                return Math.round(eased * 10) / 10
              }
              return Math.floor(s.value * progress)
            })
          )
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }

    const io = new IntersectionObserver(onIntersect, { threshold: 0.35 })
    io.observe(element)
    return () => io.disconnect()
  }, [hasAnimated, stats])

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232563eb' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center space-y-12">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-blue-100">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-semibold text-sm tracking-wide">
              India's Premier UPSC Mentorship Platform
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Empowering UPSC Aspirants,{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                  Daily
                </span>
                <span className={`inline-block w-1 h-[0.9em] bg-blue-600 ml-1 align-middle ${isBlinking ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`} />
              </span>
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
              MentorsDaily transforms UPSC preparation through expert mentorship, structured learning, and a supportive community. We're dedicated to making your journey to success clearer, more focused, and truly rewarding.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#courses"
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Courses
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </a>
            <button
              onClick={() => onEnquiryClick && onEnquiryClick()}
              className="inline-flex items-center justify-center gap-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enquire Now
            </button>
            <button
              onClick={() => onEnquiryClick && onEnquiryClick()}
              className="inline-flex items-center justify-center gap-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Free Consultation
            </button>
          </div>

          {/* Features Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-100">
              <p className="text-gray-700 font-semibold mb-6 flex items-center justify-center gap-2 text-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                What we offer:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex text-left gap-3 text-gray-700 bg-blue-50 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((s, idx) => (
              <div key={s.label} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl text-center">
                  <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-2`}>
                    {idx === 3 ? animatedValues[idx] : animatedValues[idx].toLocaleString()}
                    <span className="text-blue-800">{s.suffix}</span>
                  </div>
                  <div className="text-gray-600 text-sm font-medium leading-tight">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 lg:h-24 text-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="currentColor" opacity="0.5" />
          <path d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection