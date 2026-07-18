import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (profile: { name: string; email: string; companyName: string }) => void;
  onBackToHome: () => void;
}

export default function Auth({ onLoginSuccess, onBackToHome }: AuthProps) {
  const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    setTimeout(() => {
      setIsLoading(false);
      if (authView === 'forgot') {
        setSuccessMsg('A password reset link has been dispatched to your email.');
      } else if (authView === 'signup') {
        setSuccessMsg('Account registered successfully! You can now log in.');
        setAuthView('login');
      } else {
        const profileName = email.split('@')[0];
        onLoginSuccess({
          name: profileName === 'john' ? 'John Doe' : (name || profileName),
          email: email,
          companyName: 'Apex Designs Inc'
        });
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Google User',
        email: 'user@google.com',
        companyName: 'Apex Designs Inc'
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch justify-center font-sans overflow-hidden">
      
      {/* LEFT COLUMN: BRAND VISUAL PANEL (HIDDEN ON MOBILE) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 text-white relative flex-col justify-between p-12 overflow-hidden border-r border-slate-900">
        <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Logo */}
        <button 
          onClick={onBackToHome}
          className="flex items-center space-x-2 text-white bg-transparent border-none text-left w-fit cursor-pointer hover:opacity-90 relative z-10"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-blue-500/20">
            CP
          </div>
          <span className="text-lg font-black tracking-tight">CashPilot AI</span>
        </button>

        {/* CSS Visual Graphic in the center */}
        <div className="relative z-10 space-y-8 my-auto max-w-md mx-auto w-full">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 bg-blue-900/40 border border-blue-800/60 px-3 py-1 rounded-full text-[10px] text-blue-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20 animate-pulse" />
              <span>Gemma 2 Financial Intelligence</span>
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight">
              Optimize Cash Flow. Maximize Runway. Scale Safely.
            </h1>
            <p className="text-slate-400 text-xs.5 leading-relaxed">
              Connect your accounting ledgers, invoices, and banking APIs. Watch Gemma map cash burn rates, classify seasonal outflows, and simulator strategic hires.
            </p>
          </div>

          {/* Premium UI Widget Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-[10px] font-bold text-slate-500">
              <span>SIMULATED CASH FLOW RUNWAY</span>
              <span className="text-blue-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                <span>ACTIVE AUDIT</span>
              </span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                <span className="text-slate-500 text-[9px] block font-bold uppercase tracking-wider">Estimated Buffer Runway</span>
                <span className="text-2xl font-black mt-1 block">8.4 Months</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 text-[9px] block font-bold uppercase tracking-wider">Health Score</span>
                <span className="text-sm font-bold text-emerald-450 block">92/100 (Excellent)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-slate-500 relative z-10">
          © 2026 CashPilot AI. All rights reserved. Google Gemma integrations are subject to terms of service.
        </p>
      </div>

      {/* RIGHT COLUMN: AUTH INPUTS PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 py-12 bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        
        {/* Floating Back to Home button for Mobile */}
        <button 
          onClick={onBackToHome}
          className="absolute top-6 left-6 lg:top-12 lg:left-12 flex items-center space-x-1.5 px-3 py-2 bg-slate-50 border border-slate-200/80 hover:border-slate-350 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <div className="w-full max-w-sm space-y-8 relative z-10">
          
          {/* Header Title block */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {authView === 'login' && 'Welcome Back'}
              {authView === 'signup' && 'Create Account'}
              {authView === 'forgot' && 'Reset Password'}
            </h2>
            <p className="text-xs.5 text-slate-500 mt-1.5 leading-relaxed">
              {authView === 'login' && 'Sign in to access your CashPilot AI financial console.'}
              {authView === 'signup' && 'Get started with your AI CFO copilot today.'}
              {authView === 'forgot' && 'Provide your account email to retrieve password links.'}
            </p>
          </div>

          {/* Success messages */}
          {successMsg && (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 font-semibold leading-relaxed">
              {successMsg}
            </div>
          )}

          {/* Error messages */}
          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-700 font-semibold leading-relaxed">
              {errorMsg}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.form 
              key={authView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit} 
              className="space-y-4 text-xs.5"
            >
              
              {/* Form Input: Name (SignUp only) */}
              {authView === 'signup' && (
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Full Name</label>
                  <div className="relative flex items-center bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all p-3">
                    <User className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-700 placeholder-slate-400 font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* Form Input: Email */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Email Address</label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all p-3">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-700 placeholder-slate-400 font-semibold"
                  />
                </div>
              </div>

              {/* Form Input: Password (Login & SignUp only) */}
              {authView !== 'forgot' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Password</label>
                    {authView === 'login' && (
                      <button 
                        type="button"
                        onClick={() => setAuthView('forgot')}
                        className="text-[10px] text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all p-3">
                    <Lock className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-700 placeholder-slate-400 font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer mt-6"
              >
                {isLoading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <span>
                    {authView === 'login' && 'Sign In'}
                    {authView === 'signup' && 'Create Account'}
                    {authView === 'forgot' && 'Send Reset Link'}
                  </span>
                )}
              </button>

            </motion.form>
          </AnimatePresence>

          {/* Social Sign-In (Login & SignUp only) */}
          {authView !== 'forgot' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span className="w-12 h-px bg-slate-100" />
                <span>or continue with</span>
                <span className="w-12 h-px bg-slate-100" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-350 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                {/* SVG Google Logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.6 15.02 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.85 2.99C6.25 7.37 8.9 5.04 12 5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.48-1.12 2.74-2.38 3.58l3.69 2.87c2.16-2 3.74-4.94 3.74-8.56z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.35 14.81c-.24-.73-.38-1.52-.38-2.33s.14-1.6.38-2.33L1.5 7.16C.54 9.1.01 11.27.01 13.56c0 2.29.53 4.46 1.49 6.4l3.85-3.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.69-2.87c-1.02.68-2.33 1.09-4.27 1.09-3.1 0-5.75-2.33-6.69-5.46L1.46 15.99C3.36 19.85 7.3 23 12 23z"
                  />
                </svg>
                <span>Google Account</span>
              </button>
            </div>
          )}

          {/* Form Switch links */}
          <div className="text-center text-xs font-semibold text-slate-500 pt-4 border-t border-slate-100">
            {authView === 'login' && (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => setAuthView('signup')}
                  className="text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            )}
            {authView === 'signup' && (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => setAuthView('login')}
                  className="text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}
            {authView === 'forgot' && (
              <p>
                Back to{' '}
                <button 
                  onClick={() => setAuthView('login')}
                  className="text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
