import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  Receipt, 
  Cpu, 
  FileSpreadsheet, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Send, 
  ArrowLeft, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  DollarSign,
  FileDown,
  ChevronDown,
  Eye,
  EyeOff,
  User,
  Trash2
} from 'lucide-react';
import DecisionSimulator from './DecisionSimulator';

interface ChatMessage {
  sender: 'user' | 'gemma';
  text?: string;
  isCard?: boolean;
  cardType?: 'decreasing_cash' | 'hire_employee' | 'invoice_priority' | 'improve_liquidity' | 'biggest_expense' | 'default';
  cardData?: any;
}

interface DashboardProps {
  onBackToLanding: () => void;
  userProfile?: { name: string; email: string; companyName: string } | null;
}

export default function Dashboard({ onBackToLanding, userProfile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // AI Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'gemma', text: "Hello! I am your Gemma-powered CFO Copilot. I've synced with your bank feeds and accounting systems. How can I help optimize your capital today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Recommendations accordion state
  const [expandedRecs, setExpandedRecs] = useState<Record<string, boolean>>({});

  const toggleRecExplanation = (id: string) => {
    setExpandedRecs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Document Upload flow state
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'extracted'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeFileName, setActiveFileName] = useState('');
  const [activeFileSize, setActiveFileSize] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isForecastRecalculating, setIsForecastRecalculating] = useState(false);
  const [ingestionFeed, setIngestionFeed] = useState(
    userProfile 
      ? [] 
      : [
          { name: "Q2_Stripe_Ledger.csv", size: "2.4 MB", date: "Uploaded 2 hours ago", status: "Verified", details: "Reconciled with Bank account #3294" },
          { name: "Apex_Contract_September.pdf", size: "850 KB", date: "Uploaded yesterday", status: "Verified", details: "12 accounts receivable lines verified" },
          { name: "OfficeRent_Receipt_Aug2026.pdf", size: "120 KB", date: "Uploaded 3 days ago", status: "Verified", details: "Expense allocated under Operations" },
        ]
  );

  // Toast Alert state
  const [toastMsg, setToastMsg] = useState('');
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // Settings states
  const [gemmaApiKey, setGemmaApiKey] = useState('gemma-live-32948293c20c029319ad8c290');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileName, setProfileName] = useState(userProfile?.name || 'John Doe');
  const [profileEmail, setProfileEmail] = useState(userProfile?.email || 'john@apexdesigns.com');
  const [companyName, setCompanyName] = useState(userProfile?.companyName || 'Apex Designs Inc');
  
  // Dynamic Financial KPI states
  const [cashBalance, setCashBalance] = useState(userProfile ? 0 : 142500);
  const [monthlyRevenue, setMonthlyRevenue] = useState(userProfile ? 0 : 84200);
  const [monthlyExpenses, setMonthlyExpenses] = useState(userProfile ? 0 : 42100);
  const [outstandingInvoices, setOutstandingInvoices] = useState(userProfile ? 0 : 30500);
  const [healthScore, setHealthScore] = useState(userProfile ? 0 : 92);
  const [liquidityScore, setLiquidityScore] = useState(userProfile ? 0 : 85);

  const [riskLevel, setRiskLevel] = useState(userProfile ? 'None' : 'Medium');
  const [aiReasoning, setAiReasoning] = useState(userProfile ? 'Please upload bank statements or ledger spreadsheets to begin CashPilot analysis.' : 'Supplier payments are increasing 18% faster than revenue over the last 30 days.');
  const [recText, setRecText] = useState(userProfile ? 'Navigate to the Documents tab to import raw ledger records.' : 'Delay Vendor B payment by 5 days to maintain positive cash flow.');
  const [aiConfidence, setAiConfidence] = useState(userProfile ? 0 : 92);
  
  // Dynamic extracted statistics states (for upload view)
  const [extractedRevenue, setExtractedRevenue] = useState(userProfile ? 'Rs. 0' : 'Rs. 45,200');
  const [extractedExpenses, setExtractedExpenses] = useState(userProfile ? 'Rs. 0' : 'Rs. 12,800');
  const [extractedInvoicesCount, setExtractedInvoicesCount] = useState(userProfile ? '0 Invoices' : '8 Invoices');
  const [extractedSuppliersCount, setExtractedSuppliersCount] = useState(userProfile ? '0' : '5');
  const [extractedCustomersCount, setExtractedCustomersCount] = useState(userProfile ? '0' : '4');
  const [extractedTransactions, setExtractedTransactions] = useState<any[]>(userProfile ? [] : [
    { date: "2026-07-10", description: "Stripe Payout Ref#902", category: "Revenue", type: "Inflow", amount: "Rs. 32,500", confidence: "98%" },
    { date: "2026-07-12", description: "GCP Cloud Compute Payout", category: "Software", type: "Outflow", amount: "Rs. 4,200", confidence: "96%" },
    { date: "2026-07-14", description: "Apex Invoice INV-3294", category: "Revenue", type: "Inflow", amount: "Rs. 12,700", confidence: "97%" },
    { date: "2026-07-15", description: "Office Rent Supply Corp", category: "Rent", type: "Outflow", amount: "Rs. 8,600", confidence: "99%" },
  ]);

  const [companyAddress, setCompanyAddress] = useState('100 Vercel Way, San Francisco, CA');
  const [businessType, setBusinessType] = useState('sme_corporation');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);



  const startMockUpload = (fileName: string, fileSizeStr: string, rawFile: File) => {
    setActiveFileName(fileName);
    setActiveFileSize(fileSizeStr);
    setUploadState('uploading');
    setUploadProgress(0);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      
      if (fileName.toLowerCase().endsWith('.csv')) {
        try {
          const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
          if (lines.length > 1) {
            const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
            const dateIdx = headers.findIndex(h => h.includes('date'));
            const descIdx = headers.findIndex(h => h.includes('desc') || h.includes('detail') || h.includes('name') || h.includes('vendor'));
            const amountIdx = headers.findIndex(h => h.includes('amount') || h.includes('val') || h.includes('cost'));
            const catIdx = headers.findIndex(h => h.includes('cat'));
            const typeIdx = headers.findIndex(h => h.includes('type') || h.includes('flow'));

            let totalRev = 0;
            let totalExp = 0;
            let parsedTxs: any[] = [];
            let uniqueSuppliers = new Set();
            let uniqueCustomers = new Set();

            for (let i = 1; i < lines.length; i++) {
              const columns = lines[i].split(',').map(col => col.trim().replace(/^["']|["']$/g, ''));
              if (columns.length < 2) continue;
              
              const dateVal = dateIdx !== -1 && columns[dateIdx] ? columns[dateIdx] : "2026-07-18";
              const descVal = descIdx !== -1 && columns[descIdx] ? columns[descIdx] : "Ingested Entry";
              const amountValStr = amountIdx !== -1 && columns[amountIdx] ? columns[amountIdx] : "0";
              const amountVal = parseFloat(amountValStr.replace(/[^0-9.-]/g, '')) || 0;
              const catVal = catIdx !== -1 && columns[catIdx] ? columns[catIdx] : "Operations";
              
              let typeVal = "Inflow";
              if (typeIdx !== -1 && columns[typeIdx]) {
                const typeStr = columns[typeIdx].toLowerCase();
                if (typeStr.includes('out') || typeStr.includes('exp') || typeStr.includes('pay') || typeStr.includes('debit')) {
                  typeVal = "Outflow";
                }
              } else {
                if (amountVal < 0) {
                  typeVal = "Outflow";
                }
              }

              const absAmt = Math.abs(amountVal);
              if (typeVal === "Inflow") {
                totalRev += absAmt;
                uniqueCustomers.add(descVal);
              } else {
                totalExp += absAmt;
                uniqueSuppliers.add(descVal);
              }

              parsedTxs.push({
                date: dateVal,
                description: descVal,
                category: catVal,
                type: typeVal,
                amount: `Rs. ${absAmt.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`,
                confidence: `${Math.floor(Math.random() * 5) + 95}%`
              });
            }

            // Simulate progress bar and set parsed state variables
            let progress = 0;
            const progressInterval = setInterval(() => {
              progress += 20;
              setUploadProgress(progress);
              if (progress >= 100) {
                clearInterval(progressInterval);
                setUploadState('processing');
                
                setTimeout(() => {
                  setUploadState('extracted');
                  setCashBalance(Math.max(0, totalRev - totalExp));
                  setMonthlyRevenue(totalRev);
                  setMonthlyExpenses(totalExp);
                  setOutstandingInvoices(Math.floor(totalExp * 0.44));
                  setHealthScore(totalRev > totalExp ? 94 : 45);
                  setLiquidityScore(totalRev > totalExp ? 88 : 35);
                  setRiskLevel(totalExp > totalRev ? 'High' : 'Low');
                  setAiReasoning(totalExp > totalRev ? 'Expenses exceed incoming revenues, dropping runway cushion.' : 'Consistent inflows support healthy treasury runway.');
                  setRecText(totalExp > totalRev ? 'Postpone discretionary supplier payables immediately.' : 'Maintain current client collection routines.');
                  setAiConfidence(96);

                  setExtractedRevenue(`Rs. ${totalRev.toLocaleString(undefined, {maximumFractionDigits: 0})}`);
                  setExtractedExpenses(`Rs. ${totalExp.toLocaleString(undefined, {maximumFractionDigits: 0})}`);
                  setExtractedInvoicesCount(`${Math.floor(parsedTxs.length * 0.5)} Invoices`);
                  setExtractedSuppliersCount(`${uniqueSuppliers.size}`);
                  setExtractedCustomersCount(`${uniqueCustomers.size}`);
                  setExtractedTransactions(parsedTxs);
                  
                  setIngestionFeed(current => [
                    { name: fileName, size: fileSizeStr, date: "Uploaded just now", status: "Verified", details: "Extracted using Google Gemma OCR" },
                    ...current
                  ]);
                }, 1000);
              }
            }, 100);
            return;
          }
        } catch (err) {
          console.error("Local CSV parsing error:", err);
        }
      }
      
      // Fallback if not a CSV or parsing failed
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 20;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(progressInterval);
          setUploadState('processing');
          
          setTimeout(() => {
            setUploadState('extracted');
            setCashBalance(142500);
            setMonthlyRevenue(84200);
            setMonthlyExpenses(42100);
            setOutstandingInvoices(30500);
            setHealthScore(92);
            setLiquidityScore(85);
            setRiskLevel('Medium');
            setAiReasoning('Supplier payments are increasing 18% faster than revenue over the last 30 days.');
            setRecText('Delay Vendor B payment by 5 days to maintain positive cash flow.');
            setAiConfidence(92);

            setExtractedRevenue('Rs. 45,200');
            setExtractedExpenses('Rs. 12,800');
            setExtractedInvoicesCount('8 Invoices');
            setExtractedSuppliersCount('5');
            setExtractedCustomersCount('4');
            setExtractedTransactions([
              { date: "2026-07-10", description: "Stripe Payout Ref#902", category: "Revenue", type: "Inflow", amount: "Rs. 32,500", confidence: "98%" },
              { date: "2026-07-12", description: "GCP Cloud Compute Payout", category: "Software", type: "Outflow", amount: "Rs. 4,200", confidence: "96%" },
              { date: "2026-07-14", description: "Apex Invoice INV-3294", category: "Revenue", type: "Inflow", amount: "Rs. 12,700", confidence: "97%" },
              { date: "2026-07-15", description: "Office Rent Supply Corp", category: "Rent", type: "Outflow", amount: "Rs. 8,600", confidence: "99%" },
            ]);
            
            setIngestionFeed(current => [
              { name: fileName, size: fileSizeStr, date: "Uploaded just now", status: "Verified", details: "Extracted using Google Gemma OCR" },
              ...current
            ]);
          }, 1000);
        }
      }, 100);
    };

    reader.readAsText(rawFile);
  };

  const removeUploadedFile = (fileName: string) => {
    setIngestionFeed(current => current.filter(f => f.name !== fileName));
    triggerToast(`File "${fileName}" removed successfully.`);
    
    if (activeFileName === fileName) {
      setUploadState('idle');
      setActiveFileName('');
      setActiveFileSize('');
      
      if (userProfile) {
        setCashBalance(0);
        setMonthlyRevenue(0);
        setMonthlyExpenses(0);
        setOutstandingInvoices(0);
        setHealthScore(0);
        setLiquidityScore(0);
        setRiskLevel('None');
        setAiReasoning('Please upload bank statements or ledger spreadsheets to begin CashPilot analysis.');
        setRecText('Navigate to the Documents tab to import raw ledger records.');
        setAiConfidence(0);
        setExtractedRevenue('Rs. 0');
        setExtractedExpenses('Rs. 0');
        setExtractedInvoicesCount('0 Invoices');
        setExtractedSuppliersCount('0');
        setExtractedCustomersCount('0');
        setExtractedTransactions([]);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      startMockUpload(file.name, sizeStr, file);
    }
  };

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "Critical: Liquidity alert - runway warning in October", type: 'critical' },
    { id: 2, text: "Invoice INV-3294 is projected to clear 8 days late", type: 'medium' },
    { id: 3, text: "Gemma: 2 payment optimizations ready to execute", type: 'low' }
  ]);

  const handlePresetQuestion = (q: string) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setIsTyping(true);
    
    setTimeout(() => {
      let reply: ChatMessage = { sender: 'gemma' };
      const normalized = q.toLowerCase();
      
      if (normalized.includes('decreasing') || normalized.includes('cash flow')) {
        reply = {
          sender: 'gemma',
          isCard: true,
          cardType: 'decreasing_cash',
          cardData: {
            reason: "Supplier payments grew 18% month-on-month, while collections slowed down by 5 days.",
            impact: "Compresses monthly liquid cash float from $28,000 to $12,500.",
            recommendation: "Negotiate Net-45 term extension with Apex Logistics or offer early invoice discounts.",
            confidence: "94%"
          }
        };
      } else if (normalized.includes('hire') || normalized.includes('employee')) {
        reply = {
          sender: 'gemma',
          isCard: true,
          cardType: 'hire_employee',
          cardData: {
            title: "Simulated Hiring Impact",
            cost: "$12,000 / month",
            runwayBefore: "8.4 months",
            runwayAfter: "7.2 months",
            status: "SAFE",
            confidence: "92%"
          }
        };
      } else if (normalized.includes('invoice') || normalized.includes('pay first')) {
        reply = {
          sender: 'gemma',
          isCard: true,
          cardType: 'invoice_priority',
          cardData: {
            recommendations: [
              { invoice: "INV-3293", vendor: "Zenith Supplies", amount: "$12,000", action: "Pay by Aug 10 to avoid 2.5% late penalty fee", priority: "High" },
              { invoice: "INV-3294", vendor: "Apex Logistics", amount: "$18,500", action: "Delay by 5 days (interest-free credit period)", priority: "Low" }
            ],
            confidence: "95%"
          }
        };
      } else if (normalized.includes('liquidity') || normalized.includes('improve')) {
        reply = {
          sender: 'gemma',
          isCard: true,
          cardType: 'improve_liquidity',
          cardData: {
            actions: [
              "Offer 1.5% discount on early settlements for client Apex Designs.",
              "Adjust Vendor B payable term from Net-30 to Net-45.",
              "Reduce discretionary marketing expenses by 15%."
            ],
            confidence: "93%"
          }
        };
      } else if (normalized.includes('expense') || normalized.includes('biggest')) {
        reply = {
          sender: 'gemma',
          isCard: true,
          cardType: 'biggest_expense',
          cardData: {
            category: "Payroll Outflows",
            amount: "$18,945",
            percentage: "45% of total expenses",
            confidence: "99%"
          }
        };
      } else {
        reply = {
          sender: 'gemma',
          text: "I analyzed your query. Your business health score is 92/100, which is strong. Ensure outstanding invoices are collected and non-critical expenses are audited monthly."
        };
      }
      
      setChatMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 1200);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'forecast', label: 'Forecast', icon: TrendingUp },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'simulator', label: 'Decision Simulator', icon: Cpu },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare, badge: 'Gemma' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800 relative">
      
      {/* FLOATING ACTION BUTTON IN THE BOTTOM RIGHT */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveTab('assistant')}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs px-5 py-4 rounded-full shadow-2xl flex items-center space-x-2 border border-blue-400/20 cursor-pointer animate-pulse"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 absolute -top-2.5 -right-2.5 fill-cyan-400/10 animate-bounce" />
        </div>
        <span>Ask Gemma</span>
      </motion.button>

      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-400 shrink-0">
        {/* Brand Header */}
        <div className="flex items-center space-x-2 px-6 py-5 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <span className="font-extrabold text-sm">CP</span>
          </div>
          <span className="text-lg font-extrabold text-white tracking-tight">CashPilot <span className="text-blue-400">AI</span></span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    isActive ? 'bg-blue-700 text-blue-200' : 'bg-slate-800 text-blue-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Back to Landing & Profile */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <button 
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs">
              JD
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-bold text-slate-200 truncate">John Doe</p>
              <p className="text-[11px] text-slate-500 truncate">john@apexdesigns.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        
        {/* TOP BAR */}
        <header className="flex justify-between items-center h-16 bg-white border-b border-slate-200/80 px-6 shrink-0 relative z-30">
          {/* Search bar */}
          <div className="flex items-center space-x-2.5 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 w-72 md:w-96 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search invoices, recommendations, files... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-700 placeholder-slate-400 font-medium"
            />
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 z-50">
                  <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Alerts Console</span>
                    <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Clear all</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3.5 hover:bg-slate-50 transition-colors flex items-start space-x-2.5">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          n.type === 'critical' ? 'bg-red-500' : n.type === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                        }`} />
                        <p className="text-xs text-slate-650 leading-relaxed font-semibold">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu (Mobile Drawer Trigger/Indicator) */}
            <button className="md:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-500">
              <LayoutDashboard className="w-5 h-5" onClick={() => setActiveTab('dashboard')} />
            </button>

            <div className="w-8.5 h-8.5 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-blue-500/10 cursor-pointer">
              JD
            </div>
          </div>
        </header>

        {/* MAIN VIEWPORT BODY */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in-up">
              
              {/* Personalized Executive Summary Header */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900">Welcome back, John 👋</h1>
                    <p className="text-xs.5 text-slate-500 mt-1">Here is Today's Financial Health executive summary.</p>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-[10px] text-blue-700">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-600/10" />
                    <span className="font-bold">Gemma Active Guard</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/40">
                    <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[9px]">Overall Business Score</span>
                    <span className="text-base font-extrabold text-slate-900 mt-1 block">92 / 100</span>
                  </div>
                  <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/40">
                    <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[9px]">Cash Safe Until</span>
                    <span className="text-base font-extrabold text-slate-900 mt-1 block">March 2027</span>
                  </div>
                  <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/40">
                    <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[9px]">Critical Alerts</span>
                    <span className="text-base font-extrabold text-rose-655 mt-1 block">1 Active Alert</span>
                  </div>
                  <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/40">
                    <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[9px]">AI Recommendations Today</span>
                    <span className="text-base font-extrabold text-blue-600 mt-1 block">2 Actionable Insights</span>
                  </div>
                </div>
              </div>

              {/* Gemma AI Analysis Card */}
              <div className="bg-gradient-to-tr from-slate-950 to-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="flex justify-between items-center pb-3.5 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                    <span className="text-xs font-black tracking-wider text-slate-400 uppercase">Gemma AI Analysis</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-blue-955/50 border border-blue-900 px-3 py-1 rounded-full text-[10px] text-blue-300 font-bold">
                    <span>Powered by Google Gemma</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
                  <div className="md:col-span-3 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Liquidity Risk</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                        riskLevel === 'High' ? 'bg-rose-500' : riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-slate-450'
                      }`} />
                      <span className={`text-lg font-black ${
                        riskLevel === 'High' ? 'text-rose-500' : riskLevel === 'Medium' ? 'text-amber-500' : 'text-slate-500'
                      }`}>{riskLevel}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-1">Confidence: {aiConfidence}%</span>
                  </div>
                  
                  <div className="md:col-span-5 border-y md:border-y-0 md:border-x border-slate-850 py-4 md:py-0 md:px-6 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Reasoning</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {aiReasoning}
                    </p>
                  </div>

                  <div className="md:col-span-4 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Actionable Recommendation</span>
                    <p className="text-xs text-blue-400 mt-1 leading-relaxed font-bold">
                      {recText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                
                {/* Health Score Widget */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Health Score</span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{healthScore === 0 ? '0' : healthScore} / 100</h3>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md mt-2 inline-block ${
                      healthScore >= 80 ? 'text-emerald-600 bg-emerald-50' : healthScore >= 50 ? 'text-amber-600 bg-amber-50' : 'text-slate-500 bg-slate-50'
                    }`}>{healthScore >= 80 ? 'Excellent' : healthScore >= 50 ? 'Medium' : 'No Data'}</span>
                  </div>
                  <div className="w-14 h-14 relative flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#3b82f6" strokeDasharray={`${healthScore}, 100`} strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-[10px] font-black text-slate-700">{healthScore}%</span>
                  </div>
                </div>

                {/* Cash Available */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cash Available</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">Rs. {cashBalance.toLocaleString()}</h3>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] text-emerald-600 font-semibold">{cashBalance > 0 ? '+14.2%' : '0%'}</span>
                    <span className="text-[9px] text-slate-400">vs last mo</span>
                  </div>
                </div>

                {/* Expected Revenue */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Expected Revenue</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">Rs. {monthlyRevenue.toLocaleString()}</h3>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-[10px] text-slate-400 font-semibold">September Projection</span>
                  </div>
                </div>

                {/* Expected Expenses */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Expected Expenses</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">Rs. {monthlyExpenses.toLocaleString()}</h3>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-[10px] text-rose-500 font-semibold">{monthlyExpenses > 0 ? '-2.4%' : '0%'}</span>
                  </div>
                </div>

                {/* Outstanding Invoices */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Outstanding Invoices</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">Rs. {outstandingInvoices.toLocaleString()}</h3>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md mt-2 inline-block ${
                    outstandingInvoices > 0 ? 'text-amber-600 bg-amber-50' : 'text-slate-550 bg-slate-50'
                  }`}>{outstandingInvoices > 0 ? '4 Pending' : '0 Pending'}</span>
                </div>

                {/* Upcoming Payments */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Upcoming Payments</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">Rs. {(monthlyExpenses * 0.44).toLocaleString(undefined, {maximumFractionDigits:0})}</h3>
                  <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-1.5 py-0.5 rounded-md mt-2 inline-block">{monthlyExpenses > 0 ? 'Due in 14 days' : 'No upcoming payables'}</span>
                </div>

              </div>

              {/* Today's AI Recommendation Flagship Card */}
              <div className="bg-white border-2 border-blue-500 rounded-3xl p-6 sm:p-8 shadow-lg shadow-blue-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
                
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-600 fill-blue-50" />
                    <h2 className="text-base sm:text-lg font-black text-slate-900">Today's AI Recommendation</h2>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200/60 rounded-full px-3.5 py-1 text-[10px] font-semibold text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>✓ Powered by Google Gemma</span>
                  </div>
                </div>

                {/* Grid metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                  <div className="bg-slate-50/50 p-4.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Potential Savings</span>
                    <span className="text-2xl font-black text-slate-900 mt-1.5 block">₹42,000</span>
                  </div>
                  <div className="bg-slate-50/50 p-4.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Priority Level</span>
                    <span className="text-xs.5 font-black text-rose-600 mt-2 block bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 w-fit">High</span>
                  </div>
                  <div className="bg-slate-50/50 p-4.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Confidence Score</span>
                    <span className="text-2xl font-black text-blue-600 mt-1.5 block">94%</span>
                  </div>
                  <div className="bg-slate-50/50 p-4.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Primary Action</span>
                    <span className="text-xs.5 font-bold text-slate-900 mt-2 block">Delay Vendor B payment by 5 days.</span>
                  </div>
                </div>

                {/* Description details */}
                <div className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs.5 leading-relaxed">
                    <div className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Business Reasoning</span>
                      <p className="text-slate-700">
                        Vendor B offers a 30-day credit period while Vendor A applies late-payment penalties after 7 days. Delaying Vendor B preserves liquidity without increasing costs.
                      </p>
                    </div>
                    <div className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Expected Financial Impact</span>
                      <p className="text-slate-700 font-semibold">
                        Improves projected month-end cash balance by ₹42,000.
                      </p>
                    </div>
                  </div>

                  {/* Explain Why Accordion */}
                  <div className="pt-1">
                    <button
                      onClick={() => toggleRecExplanation('primary')}
                      className="px-4.5 py-2.5 bg-slate-950 hover:bg-slate-850 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{expandedRecs['primary'] ? 'Hide Explanation' : 'Explain Why'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedRecs['primary'] ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {expandedRecs['primary'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="mt-4 p-5 bg-blue-50/20 border border-blue-100 rounded-2xl text-xs.5 leading-relaxed text-slate-700 space-y-2.5"
                        >
                          <p className="font-bold flex items-center space-x-1.5 text-blue-800">
                            <Sparkles className="w-4 h-4 text-blue-600 fill-blue-50" />
                            <span>Gemma Model Analysis:</span>
                          </p>
                          <p>
                            Gemma parsed your Accounts Payable ledger alongside invoice dates. Vendor B ('Apex Logistical Services') grants a net-30 term ending October 5th without interest penalty. In contrast, Vendor A ('Zenith Core Supply') triggers a 2% compound late fee if not settled by August 10th. By shifting the Vendor B payout to October 2nd, you retain ₹42,000 cash in the operational feed to absorb current payroll burn, avoiding interest expenses and maximizing capital float.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Charts Display Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Cash Flow Trend Line chart (8 Columns) */}
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[350px]">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-sm.5 font-bold text-slate-900">Cash Flow Projections</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Linechart comparing Baseline inflows against Operating outflows</p>
                    </div>
                    <div className="flex items-center space-x-4 text-[10px] font-semibold">
                      <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full" /> <span className="text-slate-500">Inflows</span></span>
                      <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-cyan-400 rounded-full" /> <span className="text-slate-500">Outflows</span></span>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-48 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />

                      <path 
                        d="M0 120 C 80 110, 160 80, 240 100 C 320 60, 400 45, 500 30" 
                        fill="none" 
                        stroke="#2563eb" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                      />
                      
                      <path 
                        d="M0 135 C 80 125, 160 140, 240 110 C 320 100, 400 85, 500 70" 
                        fill="none" 
                        stroke="#06b6d4" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-2 mt-4">
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>

                {/* Expense Distribution Donut Chart (4 Columns) */}
                <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[350px]">
                  <div>
                    <h4 className="text-sm.5 font-bold text-slate-900">Expense Allocation</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Top expenditure pools (September)</p>
                  </div>

                  <div className="relative flex justify-center items-center h-36 mt-4">
                    <svg className="w-32 h-32" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#2563eb" strokeWidth="4.2" strokeDasharray="45 100" strokeDashoffset="100" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#06b6d4" strokeWidth="4.2" strokeDasharray="25 100" strokeDashoffset="55" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#4f46e5" strokeWidth="4.2" strokeDasharray="18 100" strokeDashoffset="30" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#a855f7" strokeWidth="4.2" strokeDasharray="12 100" strokeDashoffset="12" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <p className="text-xs text-slate-400 font-bold">Total Out</p>
                      <p className="text-sm font-extrabold text-slate-900">Rs. {monthlyExpenses.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold mt-4">
                    <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-blue-600 rounded" /> <span className="text-slate-500">Payroll (45%)</span></span>
                    <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-cyan-400 rounded" /> <span className="text-slate-500">Marketing (25%)</span></span>
                    <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-indigo-600 rounded" /> <span className="text-slate-500">Operations (18%)</span></span>
                    <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-purple-500 rounded" /> <span className="text-slate-500">Software (12%)</span></span>
                  </div>
                </div>

              </div>

              {/* Bottom Feeds: Risk Alerts + Recent Activity Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Risk Alerts (Improved Risk Audit Section) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />
                    <span>Active Risk Audit</span>
                  </h4>
                  <div className="space-y-4">
                    {/* Audit Risk Item 1 */}
                    <div className="border border-slate-200 bg-slate-50/20 p-4 rounded-2xl space-y-2.5 text-xs text-slate-700">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h5 className="font-black text-slate-900">Revenue Growth Slowing</h5>
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-750 text-[8px] font-black rounded uppercase border border-amber-200">Medium</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Detection Reason</span>
                        <p className="mt-0.5">Revenue has decreased by 11% over the past two months while operational expenses continue to rise.</p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Business Impact</span>
                        <p className="mt-0.5 font-semibold text-rose-600">Cash reserves may fall below the recommended threshold within 45 days.</p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Suggested Action</span>
                        <p className="mt-0.5 font-semibold text-slate-800">Reduce discretionary expenses and prioritize high-value customer collections.</p>
                      </div>
                    </div>

                    {/* Audit Risk Item 2 */}
                    <div className="border border-slate-200 bg-slate-50/20 p-4 rounded-2xl space-y-2.5 text-xs text-slate-700">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h5 className="font-black text-slate-900">October Liquidity Deficit</h5>
                        <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[8px] font-black rounded uppercase border border-red-200">Critical</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Detection Reason</span>
                        <p className="mt-0.5">Heavy tax schedules overlap with projected delays from three major invoices.</p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Business Impact</span>
                        <p className="mt-0.5 font-semibold text-rose-600">Runway breaks beneath safety threshold of 6 months down to 4.6.</p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Suggested Action</span>
                        <p className="mt-0.5 font-semibold text-slate-800">Initiate invoice early collections and shift Vendor B payable terms.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations (Enhanced) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <Sparkles className="w-4.5 h-4.5 text-blue-600 fill-blue-50" />
                    <span>Gemma Copilot Insights</span>
                  </h4>
                  <div className="space-y-4 text-xs">
                    
                    {/* Recommendation Card 1 */}
                    <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/60 space-y-3">
                      <div className="flex items-start space-x-2.5">
                        <div className="p-1 bg-emerald-50 rounded text-emerald-600 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Early reward on INV-3294</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Offer client 1.5% settlement reward.</p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5 pt-2 border-t border-slate-200/50 text-[9px] font-semibold text-slate-500">
                        <span>✓ Powered by Google Gemma</span>
                        <span>✓ Confidence Score: 91%</span>
                      </div>

                      <button
                        onClick={() => toggleRecExplanation('rec1')}
                        className="text-[10px] text-blue-600 font-bold hover:underline flex items-center space-x-0.5 cursor-pointer"
                      >
                        <span>{expandedRecs['rec1'] ? 'Hide Explanation' : 'Explain Why'}</span>
                        <ChevronRight className={`w-3 h-3 transition-transform ${expandedRecs['rec1'] ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedRecs['rec1'] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border border-slate-100 p-3 rounded-xl text-[10px] leading-relaxed text-slate-650"
                          >
                            Gemma detected that the client historically holds payments for 10 days past terms. Offering 1.5% discount secures cash before the end of the month, avoiding the October capital drop.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Recommendation Card 2 */}
                    <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/60 space-y-3">
                      <div className="flex items-start space-x-2.5">
                        <div className="p-1 bg-blue-50 rounded text-blue-600 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Reschedule Apex Logistics bill</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Delay payment of $12K by 6 days.</p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5 pt-2 border-t border-slate-200/50 text-[9px] font-semibold text-slate-500">
                        <span>✓ Powered by Google Gemma</span>
                        <span>✓ Confidence Score: 88%</span>
                      </div>

                      <button
                        onClick={() => toggleRecExplanation('rec2')}
                        className="text-[10px] text-blue-600 font-bold hover:underline flex items-center space-x-0.5 cursor-pointer"
                      >
                        <span>{expandedRecs['rec2'] ? 'Hide Explanation' : 'Explain Why'}</span>
                        <ChevronRight className={`w-3 h-3 transition-transform ${expandedRecs['rec2'] ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedRecs['rec2'] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border border-slate-100 p-3 rounded-xl text-[10px] leading-relaxed text-slate-655"
                          >
                            Apex Logistics contracts do not impose finance penalties until 15 days past due. Delaying 6 days expands your immediate working cash float by 9.2% risk-free.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* OCR Ingestion Feed list */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <UploadCloud className="w-4.5 h-4.5 text-slate-500" />
                    <span>OCR Ingestion Feed</span>
                  </h4>
                  <div className="space-y-3">
                    {ingestionFeed.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="truncate pr-4">
                          <p className="text-xs font-bold text-slate-800 truncate">{f.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{f.size} • {f.details || 'Parsed'}</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Parsed</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}
          
          {/* TAB 2: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-8 animate-fade-in-up">
              
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Documents Vault</h1>
                  <p className="text-xs.5 text-slate-500 mt-1">Upload statements, invoices, and ledgers for automated Google Gemma extraction.</p>
                </div>
                {uploadState === 'extracted' && (
                  <button 
                    onClick={() => setUploadState('idle')}
                    className="px-4.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Upload Another Document
                  </button>
                )}
              </div>

              {/* State 1: IDLE */}
              {uploadState === 'idle' && (
                <div className="space-y-8">
                  {/* Hidden Input file selector */}
                  <input
                    type="file"
                    id="doc-upload-input"
                    className="hidden"
                    accept=".pdf,.csv,.xls,.xlsx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
                        startMockUpload(file.name, sizeStr, file);
                      }
                    }}
                  />

                  {/* Large drag-and-drop area */}
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => { setIsDragOver(false); handleDrop(e); }}
                    className={`border-2 border-dashed rounded-3xl p-16 bg-white flex flex-col items-center justify-center text-center transition-all duration-300 relative ${
                      isDragOver ? 'border-blue-500 bg-blue-50/10' : 'border-slate-200/80 hover:border-blue-500'
                    }`}
                  >
                    <UploadCloud className="w-14 h-14 text-blue-500/80 mb-4 animate-pulse" />
                    <h3 className="text-sm.5 font-black text-slate-850">Drag and drop files here</h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-2.5 leading-relaxed">
                      Supported files: <span className="font-semibold text-slate-800">PDF, CSV, Excel</span> (Invoices, Bank Statements, Expense Reports).
                    </p>
                    <button 
                      onClick={() => document.getElementById('doc-upload-input')?.click()}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-colors mt-6 cursor-pointer"
                    >
                      Browse Files
                    </button>
                  </div>

                  {/* Recent uploaded files */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center">
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Recent Uploaded Files</h4>
                      <span className="text-[10px] text-slate-400 font-semibold">{ingestionFeed.length} files total</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {ingestionFeed.map((f, idx) => (
                        <div key={idx} className="p-4.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center space-x-3.5">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                              {f.name.split('.').pop()?.toUpperCase() || 'FILE'}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{f.name}</p>
                              <p className="text-[10px] text-slate-400 mt-1">{f.date} • {f.size} • {f.details}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 rounded-md">
                              {f.status}
                            </span>
                            <button
                              onClick={() => removeUploadedFile(f.name)}
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete File"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* State 2: UPLOADING */}
              {uploadState === 'uploading' && (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto animate-fade-in-up">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs shrink-0 animate-bounce">
                    {activeFileName.split('.').pop()?.toUpperCase() || 'FILE'}
                  </div>
                  <div className="space-y-1.5 w-full">
                    <h3 className="text-sm font-bold text-slate-850 truncate max-w-full">{activeFileName}</h3>
                    <p className="text-xs text-slate-400">Uploading file... ({activeFileSize})</p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full space-y-2">
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-blue-600 h-full rounded-full" 
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                      <span>Progress</span>
                      <span>{uploadProgress}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* State 3: PROCESSING */}
              {uploadState === 'processing' && (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto animate-fade-in-up">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
                    <Sparkles className="w-6 h-6 text-blue-600 fill-blue-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div className="space-y-1.5 w-full">
                    <h3 className="text-sm font-bold text-slate-850">Processing Statement Data</h3>
                    <p className="text-xs text-slate-450 leading-relaxed max-w-xs mx-auto">
                      Google Gemma models are performing OCR ingestion, categorizing expense rows, and mapping suppliers...
                    </p>
                  </div>
                </div>
              )}

              {/* State 4: EXTRACTED VIEWPORT */}
              {uploadState === 'extracted' && (
                <div className="space-y-8 animate-fade-in-up">
                  
                  {/* File Metadata Pill info */}
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[9px]">Extracted From Document</span>
                      <span className="font-bold text-slate-800">{activeFileName}</span>
                      <span className="text-slate-450 font-medium ml-2">({activeFileSize})</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white border border-blue-200/60 rounded-full px-3.5 py-1 text-[10px] font-semibold text-blue-700">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
                      <span>✓ Gemma OCR Scan: 98% Accuracy</span>
                    </div>
                  </div>

                  {/* Extracted Statistics Cards Row */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                      <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Extracted Revenue</span>
                      <span className="text-xl font-extrabold text-slate-900 mt-1 block">{extractedRevenue}</span>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                      <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Extracted Expenses</span>
                      <span className="text-xl font-extrabold text-slate-900 mt-1 block">{extractedExpenses}</span>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                      <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Invoices Found</span>
                      <span className="text-xl font-extrabold text-blue-600 mt-1 block">{extractedInvoicesCount}</span>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                      <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Unique Suppliers</span>
                      <span className="text-xl font-extrabold text-slate-900 mt-1 block">{extractedSuppliersCount} Suppliers</span>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                      <span className="text-slate-450 text-[9px] uppercase font-black tracking-wider block">Unique Customers</span>
                      <span className="text-xl font-extrabold text-slate-900 mt-1 block">{extractedCustomersCount} Customers</span>
                    </div>
                  </div>

                  {/* Extracted Transactions List Table */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Extracted Transaction Ledger</h4>
                      <span className="text-[10px] text-slate-450 font-semibold">Gemma mapped classifications</span>
                    </div>
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 font-black uppercase tracking-wider border-b border-slate-100">
                          <th className="p-4">Transaction Date</th>
                          <th className="p-4">Description</th>
                          <th className="p-4">Accounting Category</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Gemma Confidence</th>
                          <th className="p-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {extractedTransactions.map((t, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-4 text-slate-900 font-bold">{t.date}</td>
                            <td className="p-4">{t.description}</td>
                            <td className="p-4"><span className="px-2 py-0.5 bg-slate-100 text-slate-650 rounded-md">{t.category}</span></td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-md ${
                                t.type === 'Inflow' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                              }`}>
                                {t.type}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-slate-900">{t.amount}</td>
                            <td className="p-4 text-blue-600 flex items-center space-x-1">
                              <Sparkles className="w-3.5 h-3.5 fill-blue-50 text-blue-500/80 shrink-0" />
                              <span>{t.confidence}</span>
                            </td>
                            <td className="p-4 text-right">
                              <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer">
                                Reconcile
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* TAB 3: FORECAST */}
          {activeTab === 'forecast' && (
            <div className="space-y-8 animate-fade-in-up">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Financial Analysis & Forecasts</h1>
                  <p className="text-xs.5 text-slate-500 mt-1">Gemma-powered cash flow forecasting, liquidity analytics, and expense trends.</p>
                </div>
                {uploadState === 'extracted' && !isForecastRecalculating && (
                  <button 
                    onClick={() => {
                      setIsForecastRecalculating(true);
                      setTimeout(() => setIsForecastRecalculating(false), 1500);
                    }}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 fill-blue-50" />
                    <span>Recalculate AI Forecast</span>
                  </button>
                )}
              </div>

              {/* STATE A: EMPTY STATE (No uploaded documents parsed yet) */}
              {uploadState !== 'extracted' && (
                <div className="space-y-8">
                  {/* Empty state promotion card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center max-w-2xl mx-auto shadow-sm space-y-6">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto animate-pulse">
                      <TrendingUp className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-black text-slate-900">Unlock Predictive Cash Flow Forecasts</h3>
                      <p className="text-xs.5 text-slate-550 leading-relaxed max-w-md mx-auto">
                        Upload bank feeds, invoices, or expense ledgers in the Documents Vault. Once processed, our Gemma AI models will compile a full liquidity audit, net margin indices, and seasonal outflows.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('documents')}
                      className="px-6 py-3 bg-slate-950 hover:bg-slate-855 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
                    >
                      Go to Documents Vault
                    </button>
                  </div>

                  {/* Visual Preview (Disabled Low-Opacity Skeletons) */}
                  <div className="opacity-30 pointer-events-none space-y-8 select-none">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl h-24" />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl h-40" />
                      ))}
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl h-60" />
                  </div>
                </div>
              )}

              {/* STATE B: RECALCULATING SKELETON LOADER */}
              {uploadState === 'extracted' && isForecastRecalculating && (
                <div className="space-y-8 animate-pulse">
                  {/* KPI Row skeletons */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white border border-slate-200/80 p-5 rounded-2xl h-24 flex flex-col justify-between">
                        <div className="h-2.5 bg-slate-200 rounded w-2/3" />
                        <div className="h-5 bg-slate-200 rounded w-1/2" />
                      </div>
                    ))}
                  </div>

                  {/* AI Insights Card skeletons */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white border border-slate-200/80 p-5 rounded-2xl h-44 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="h-3 bg-slate-200 rounded w-1/3" />
                          <div className="h-4 bg-slate-200 rounded w-3/4" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 bg-slate-100 rounded" />
                          <div className="h-2 bg-slate-100 rounded w-5/6" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart panel skeletons */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 bg-white border border-slate-200/80 p-6 rounded-2xl h-72 flex flex-col justify-between">
                      <div className="h-3 bg-slate-200 rounded w-1/4" />
                      <div className="h-44 bg-slate-50 rounded" />
                    </div>
                    <div className="lg:col-span-4 bg-white border border-slate-200/80 p-6 rounded-2xl h-72 flex flex-col justify-between">
                      <div className="h-3 bg-slate-200 rounded w-1/3" />
                      <div className="h-44 bg-slate-50 rounded" />
                    </div>
                  </div>
                </div>
              )}

              {/* STATE C: POPULATED FINANCIAL ANALYSIS PAGE */}
              {uploadState === 'extracted' && !isForecastRecalculating && (
                <div className="space-y-8">
                  
                  {/* KPI Metrics Cards Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
                    
                    {/* Business Health Score */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-28">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Business Health</span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">{healthScore === 0 ? '0' : healthScore} / 100</h3>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded w-fit ${
                        healthScore >= 80 ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-55'
                      }`}>{healthScore >= 80 ? 'Excellent' : 'No Audit'}</span>
                    </div>

                    {/* Cash Balance */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-28">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Cash Balance</span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">Rs. {cashBalance.toLocaleString()}</h3>
                      <span className="text-[9px] text-slate-400">Synced via bank feed</span>
                    </div>

                    {/* Monthly Revenue */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-28">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Monthly Revenue</span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">Rs. {monthlyRevenue.toLocaleString()}</h3>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded w-fit ${
                        monthlyRevenue > 0 ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-55'
                      }`}>{monthlyRevenue > 0 ? 'On Track' : 'No Data'}</span>
                    </div>

                    {/* Monthly Expenses */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-28">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Monthly Expenses</span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">Rs. {monthlyExpenses.toLocaleString()}</h3>
                      <span className="text-[9px] text-slate-400">Burn rate: Rs. {(monthlyExpenses * 0.58).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    </div>

                    {/* Profit */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-28">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Net profit</span>
                      <h3 className={`text-xl font-black mt-1 ${monthlyRevenue - monthlyExpenses >= 0 ? 'text-emerald-650' : 'text-rose-600'}`}>
                        {monthlyRevenue - monthlyExpenses >= 0 ? '+' : ''}Rs. {(monthlyRevenue - monthlyExpenses).toLocaleString()}
                      </h3>
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded w-fit">{monthlyRevenue > 0 ? ((monthlyRevenue - monthlyExpenses) / monthlyRevenue * 100).toFixed(0) + "% Margin" : '0% Margin'}</span>
                    </div>

                    {/* Liquidity Score */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-28">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Liquidity Score</span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">{liquidityScore === 0 ? '0' : liquidityScore} / 100</h3>
                      <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded w-fit">{liquidityScore > 0 ? 'Good Buffer' : 'No Data'}</span>
                    </div>

                  </div>

                  {/* AI Insights Cards Row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    {/* Top Expense Category */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[160px]">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Top Expense Category</span>
                        <h4 className="text-sm.5 font-bold text-slate-900 mt-2">Payroll Outflows</h4>
                        <p className="text-xs text-slate-450 mt-1 leading-relaxed">
                          Payroll represents 45% of total expenses at $18,945 monthly.
                        </p>
                      </div>
                      <div className="text-[9px] text-slate-400 font-semibold pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span>✓ Mapped by Gemma</span>
                        <span>Confidence: 99%</span>
                      </div>
                    </div>

                    {/* Late Payments */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[160px]">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Late Payments projection</span>
                        <h4 className="text-sm.5 font-bold text-slate-900 mt-2">INV-3294 Delay</h4>
                        <p className="text-xs text-slate-450 mt-1 leading-relaxed">
                          Client historically settles accounts 8 days past due. Delay risk: High.
                        </p>
                      </div>
                      <div className="text-[9px] text-slate-400 font-semibold pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span>✓ Mapped by Gemma</span>
                        <span>Confidence: 91%</span>
                      </div>
                    </div>

                    {/* Cash Shortage Warning */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[160px] border-l-4 border-l-rose-500">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block text-rose-600">Shortage Warning</span>
                        <h4 className="text-sm.5 font-bold text-slate-900 mt-2">October Tax compression</h4>
                        <p className="text-xs text-slate-450 mt-1 leading-relaxed">
                          $38,000 scheduled corporate tax compresses cash runway to 4.6 months.
                        </p>
                      </div>
                      <div className="text-[9px] text-slate-400 font-semibold pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span>✓ Detected by Gemma</span>
                        <span>Confidence: 96%</span>
                      </div>
                    </div>

                    {/* Revenue Growth */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[160px]">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Revenue Growth</span>
                        <h4 className="text-sm.5 font-bold text-slate-900 mt-2">MoM Growth Rate</h4>
                        <p className="text-xs text-slate-455 mt-1 leading-relaxed">
                          Steady 6.2% quarter-on-quarter growth in recurring service fees.
                        </p>
                      </div>
                      <div className="text-[9px] text-slate-400 font-semibold pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span>✓ Tracked by Gemma</span>
                        <span>Confidence: 98%</span>
                      </div>
                    </div>

                  </div>

                  {/* Cash Flow Forecast Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Forecast Timeline (8 Columns) */}
                    <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm min-h-[360px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm.5 font-bold text-slate-900">Projected Cash Runway Timeline</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Simulated cash reserves balance over 6 months including tax adjustments</p>
                      </div>
                      
                      {/* SVG Line Graph */}
                      <div className="h-44 w-full relative mt-6">
                        <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                          <line x1="0" y1="30" x2="500" y2="30" stroke="#f8fafc" strokeWidth="1" />
                          <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="120" x2="500" y2="120" stroke="#f8fafc" strokeWidth="1" />

                          {/* Cash line projection */}
                          <path 
                            d="M0 60 C 80 50, 160 85, 240 110 C 320 80, 400 45, 500 35" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="3.5" 
                            strokeLinecap="round"
                          />
                          {/* Dotted threshold line */}
                          <line x1="0" y1="95" x2="500" y2="95" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" />
                        </svg>
                        
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-2 mt-4">
                          <span>Jul</span>
                          <span>Aug</span>
                          <span>Sep</span>
                          <span className="text-rose-600 font-black">Oct (Taxes)</span>
                          <span>Nov</span>
                          <span>Dec</span>
                        </div>
                      </div>
                      
                      <span className="text-[10px] text-slate-450 font-bold block pt-3 border-t border-slate-100 flex items-center space-x-1 text-rose-600">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Critical: Cash reserves cross safety threshold in October due to scheduled taxes.</span>
                      </span>
                    </div>

                    {/* Revenue vs Expense Trend Lines (4 Columns) */}
                    <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm min-h-[360px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm.5 font-bold text-slate-900">Revenue & Expense Trends</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Historical and projected MoM convergence</p>
                      </div>

                      {/* Small dual trend SVG */}
                      <div className="h-32 w-full relative mt-4">
                        <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                          {/* Revenue */}
                          <path d="M0 60 C 50 50, 100 45, 200 30" fill="none" stroke="#10b981" strokeWidth="2.5" />
                          {/* Expenses */}
                          <path d="M0 80 C 50 78, 100 70, 200 65" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                        </svg>
                        <div className="flex justify-between text-[9px] text-slate-400 font-semibold px-1 mt-4">
                          <span>History</span>
                          <span>Current</span>
                          <span>AI Forecast</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold pt-4 border-t border-slate-100">
                        <span className="flex items-center space-x-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> <span className="text-slate-500">Revenue (+6.2%)</span></span>
                        <span className="flex items-center space-x-1.5"><span className="w-2 h-2 bg-amber-500 rounded-full" /> <span className="text-slate-500">Expenses (+2.4%)</span></span>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 4: INVOICES */}
          {activeTab === 'invoices' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Invoices Directory</h1>
                  <p className="text-xs.5 text-slate-500 mt-1">Track outstanding accounts receivable and vendor bills.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>Create Invoice</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-black uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4">Invoice ID</th>
                      <th className="p-4">Client / Vendor</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Due Date</th>
                      <th className="p-4">AI Risk Assessment</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">INV-3294</td>
                      <td className="p-4">Apex Designs</td>
                      <td className="p-4 font-bold">$18,500</td>
                      <td className="p-4">Sept 15, 2026</td>
                      <td className="p-4 text-amber-600 flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>High delay risk (10 days late)</span>
                      </td>
                      <td className="p-4"><span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-100">Sent</span></td>
                    </tr>

                    <tr className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">INV-3293</td>
                      <td className="p-4">Zenith Supplies</td>
                      <td className="p-4 font-bold">$12,000</td>
                      <td className="p-4">Sept 22, 2026</td>
                      <td className="p-4 text-emerald-600 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Safe (Prompt vendor payout)</span>
                      </td>
                      <td className="p-4"><span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">Sent</span></td>
                    </tr>

                    <tr className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">INV-3292</td>
                      <td className="p-4">BioLogistics Inc</td>
                      <td className="p-4 font-bold">$34,000</td>
                      <td className="p-4">Sept 05, 2026</td>
                      <td className="p-4 text-slate-400">—</td>
                      <td className="p-4"><span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100 font-bold">Paid</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="animate-fade-in-up">
              <DecisionSimulator />
            </div>
          )}

          {/* TAB 6: REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-8 animate-fade-in-up print:bg-white print:p-0">
              
              {/* Header buttons bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-200 print:hidden">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Financial Reports</h1>
                  <p className="text-xs.5 text-slate-500 mt-1">Export board-ready financial summaries and investor updates compiled by Google Gemma models.</p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => triggerToast("Copied report link: https://cashpilot.ai/share/report-apex-q3")}
                    className="px-4 py-2.5 bg-white border border-slate-200/80 hover:border-slate-350 hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>Share Report</span>
                  </button>
                  <button
                    onClick={() => triggerToast("Generating board-ready PDF Report...")}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md shadow-slate-900/10"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* REPORT DOCUMENT CONTAINER */}
              <div className="bg-white border border-slate-200/85 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none print:hidden" />

                {/* Print layout title header */}
                <div className="hidden print:flex justify-between items-center pb-6 border-b border-slate-200">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">CashPilot AI Operating Report</h2>
                    <p className="text-xs text-slate-500 mt-1">Company: Apex Designs Inc | Date: July 18, 2026</p>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 border border-slate-200 px-3 py-1 rounded-full uppercase">
                    CONFIDENTIAL
                  </span>
                </div>

                {/* Executive score & summary row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Health score badge card */}
                  <div className="md:col-span-4 bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between text-center min-h-[160px] print:bg-white print:border-slate-200">
                    <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Business Health Rating</span>
                    <div className="my-auto">
                      <span className="text-4xl font-black text-slate-900">{healthScore === 0 ? '0' : healthScore}/100</span>
                      <span className={`text-xs font-black block mt-1.5 uppercase ${
                        healthScore >= 80 ? 'text-emerald-600' : 'text-slate-550'
                      }`}>{healthScore >= 80 ? 'Excellent Health' : 'No Audit Data'}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block font-semibold">Calculated from 12 operational indices</span>
                  </div>

                  {/* Summary commentary paragraph */}
                  <div className="md:col-span-8 bg-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between min-h-[160px] relative overflow-hidden print:bg-white print:text-slate-800 print:border print:border-slate-200">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none print:hidden" />
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-800 print:border-slate-200 text-[10px]">
                      <span className="text-blue-400 font-black tracking-wider uppercase flex items-center space-x-1 print:text-blue-600">
                        <Sparkles className="w-3.5 h-3.5 fill-blue-500/10 shrink-0" />
                        <span>Executive Gemma Digest</span>
                      </span>
                      <span className="text-slate-500 font-bold">Confidence Score: {aiConfidence}%</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed py-2 print:text-slate-600">
                      {userProfile ? `Company maintains a dynamic cash position of Rs. ${cashBalance.toLocaleString()} with a monthly net margin of ${monthlyRevenue > 0 ? ((monthlyRevenue - monthlyExpenses) / monthlyRevenue * 100).toFixed(1) : '0.0'}%. Cash flows are stable. Uploading invoices introduces predictive collection schedules to secure additional cash buffers.` : "Apex Designs maintains a strong cash position of Rs. 142,500 with a monthly net margin of 50.0%. Cash flows are stable, though Scheduled October tax payables (Rs. 38,000) introduce moderate compression risk. Accelerating high-value accounts receivable payments by 4 days will secure a 1.2-month buffer cushion."}
                    </p>
                  </div>
                </div>

                {/* Key Metric cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Monthly Revenue", val: userProfile ? `Rs. ${monthlyRevenue.toLocaleString()}` : "Rs. 84,200", change: "+6.2% MoM", isUp: true },
                    { label: "Monthly Expenses", val: userProfile ? `Rs. ${monthlyExpenses.toLocaleString()}` : "Rs. 42,100", change: "-2.4% MoM", isUp: false },
                    { label: "Net Margin Profit", val: userProfile ? `Rs. ${(monthlyRevenue - monthlyExpenses).toLocaleString()}` : "Rs. 42,100", change: "50.0% Ratio", isUp: true },
                    { label: "Active Runway Buffer", val: userProfile && monthlyExpenses > 0 ? `${(cashBalance / monthlyExpenses).toFixed(1)} Months` : "8.4 Months", change: "Safe limit (6.0)", isUp: true }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4.5 print:bg-white print:border-slate-200">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">{item.label}</span>
                      <span className="text-xl font-extrabold text-slate-850 block mt-2">{item.val}</span>
                      <span className={`text-[9px] font-bold mt-1.5 block ${
                        item.isUp ? 'text-emerald-600' : 'text-slate-500'
                      }`}>
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 6-Month Projection curves SVGs */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 print:bg-white print:border-slate-200">
                  <div className="flex justify-between items-center text-[10px] font-black tracking-wider text-slate-500 uppercase">
                    <span>Forecast Runway projection curve (Jul - Dec)</span>
                    <div className="flex items-center space-x-3 normal-case font-bold text-[9px]">
                      <span className="flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>Projected Balance</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        <span>Safety threshold</span>
                      </span>
                    </div>
                  </div>

                  <div className="h-36 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      {/* Grid background lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="#e2e8f0" strokeWidth="0.5" />
                      <line x1="0" y1="55" x2="300" y2="55" stroke="#e2e8f0" strokeWidth="0.5" />
                      <line x1="0" y1="85" x2="300" y2="85" stroke="#e2e8f0" strokeWidth="0.5" />

                      {/* Safety threshold line */}
                      <line x1="0" y1="65" x2="300" y2="65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />

                      {/* Cash Projection line */}
                      <path
                        d="M0 30 L60 25 L120 20 L180 50 L240 35 L300 22"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="flex justify-between text-[9px] text-slate-400 font-semibold mt-2 px-1">
                      <span>Jul ($142.5K)</span>
                      <span>Aug ($149K)</span>
                      <span>Sep ($155K)</span>
                      <span>Oct ($131K)</span>
                      <span>Nov ($145K)</span>
                      <span>Dec ($160K)</span>
                    </div>
                  </div>
                </div>

                {/* AI recommendations table */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Treasury Action Items</h4>
                  <div className="space-y-2.5">
                    {[
                      { action: "Offer 1.5% Settlement Incentives", detail: "Accelerate invoice INV-3294 collections for Apex Designs by 8 days to optimize October liquidity.", impact: "+$18,500 Cash" },
                      { action: "Extend Vendor B payable schedule", detail: "Negotiate payment extension with Apex Logistics to Net-45 interest-free credits.", impact: "Preserves $12,000 float" },
                      { action: "Scale down discretionary marketing", detail: "Phase seasonal digital marketing budget allocation until Q4 inflows settle.", impact: "Saves $4,500/month" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 flex justify-between items-center text-xs print:bg-white print:border-slate-200">
                        <div>
                          <span className="font-extrabold text-slate-900 block">{item.action}</span>
                          <p className="text-[10px] text-slate-500 mt-1 max-w-lg leading-relaxed">{item.detail}</p>
                        </div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase shrink-0 ml-4 print:bg-white print:border-slate-200">
                          {item.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 7: AI ASSISTANT CHAT */}
          {activeTab === 'assistant' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-10rem)] max-w-6xl mx-auto overflow-hidden animate-fade-in-up">
              
              {/* LEFT SIDEBAR: SUGGESTED QUESTIONS */}
              <div className="lg:col-span-4 flex flex-col space-y-4 overflow-y-auto pr-2">
                <div className="pb-3 border-b border-slate-200">
                  <h3 className="text-sm font-black text-slate-850">Gemma AI Prompts</h3>
                  <p className="text-[10px] text-slate-450 mt-1">Select an audit query to analyze bank feeds and invoice ledgers.</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    { q: "Why is my cash flow decreasing?", desc: "Analyze cash inflows vs monthly outflows." },
                    { q: "Can I hire another employee?", desc: "Simulate onboarding payroll margins." },
                    { q: "Which invoices should I pay first?", desc: "Audit and prioritize vendor payables." },
                    { q: "How can I improve liquidity?", desc: "Evaluate early-discount optimizations." },
                    { q: "What is my biggest expense?", desc: "Deconstruct total monthly operating pools." }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetQuestion(item.q)}
                      className="w-full p-4 bg-white border border-slate-205 hover:border-blue-500 rounded-2xl text-left transition-all hover:shadow-md hover:shadow-blue-500/5 group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 block transition-colors">{item.q}</span>
                      <span className="text-[10px] text-slate-450 mt-1 block">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: CHAT WINDOW */}
              <div className="lg:col-span-8 flex flex-col h-full bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
                {/* Chat window header */}
                <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-600 animate-pulse fill-blue-50" />
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Gemma CFO Copilot</h4>
                      <p className="text-[10px] text-slate-450 mt-0.5">Synced with live bank feeds</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase">
                    Gemma 2 Active
                  </span>
                </div>

                {/* Messages Log area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20">
                  {chatMessages.map((m, idx) => (
                    <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                      {m.isCard ? (
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 max-w-lg mt-1 text-slate-800 relative">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                          <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 text-[9px] font-semibold text-slate-405">
                            <span className="flex items-center space-x-1 text-blue-600 font-bold uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5 fill-blue-50 text-blue-500" />
                              <span>Gemma AI Audit Card</span>
                            </span>
                            <span>✓ Powered by Google Gemma</span>
                          </div>

                          {m.cardType === 'decreasing_cash' && (
                            <div className="space-y-3 text-xs leading-relaxed">
                              <h5 className="font-extrabold text-slate-900 text-sm.5">Outflow Cash Volatility Analysis</h5>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Outflow Catalyst</span>
                                  <span className="font-bold text-rose-600 block mt-1">{m.cardData.reason}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Runway Impact</span>
                                  <span className="font-bold text-slate-900 block mt-1">{m.cardData.impact}</span>
                                </div>
                              </div>
                              <p className="bg-blue-50/30 border border-blue-100/50 p-3 rounded-xl font-medium text-slate-700">
                                <span className="font-bold text-blue-800 block text-[9px] uppercase tracking-wider mb-1">AI Recommendation</span>
                                {m.cardData.recommendation}
                              </p>
                              <span className="text-[9px] text-slate-450 font-semibold block">Confidence Score: {m.cardData.confidence}</span>
                            </div>
                          )}

                          {m.cardType === 'hire_employee' && (
                            <div className="space-y-3 text-xs leading-relaxed">
                              <h5 className="font-extrabold text-slate-900 text-sm.5">{m.cardData.title}</h5>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Monthly Cost</span>
                                  <span className="font-extrabold text-slate-800 mt-1 block">{m.cardData.cost}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Before Runway</span>
                                  <span className="font-bold text-slate-600 mt-1 block">{m.cardData.runwayBefore}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                                  <span className="text-[9px] uppercase font-bold text-slate-400 block">After Runway</span>
                                  <span className="font-extrabold text-blue-600 mt-1 block">{m.cardData.runwayAfter}</span>
                                </div>
                              </div>
                              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center space-x-2 text-emerald-800">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span className="font-bold text-[10px]">Hiring feasibility is SAFE. Reserves absorb payroll expansion.</span>
                              </div>
                              <span className="text-[9px] text-slate-455 font-semibold block">Confidence Score: {m.cardData.confidence}</span>
                            </div>
                          )}

                          {m.cardType === 'invoice_priority' && (
                            <div className="space-y-3 text-xs leading-relaxed">
                              <h5 className="font-extrabold text-slate-900 text-sm.5">Vendor Invoice Settlement Priority</h5>
                              <div className="space-y-2.5">
                                {m.cardData.recommendations.map((item: any, i: number) => (
                                  <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                                    <div>
                                      <span className="font-bold text-slate-850">{item.invoice} ({item.vendor})</span>
                                      <p className="text-[10px] text-slate-505 mt-0.5">{item.action}</p>
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${
                                      item.priority === 'High' ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-slate-500 bg-slate-100 border-slate-200'
                                    }`}>
                                      {item.priority}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <span className="text-[9px] text-slate-450 font-semibold block">Confidence Score: {m.cardData.confidence}</span>
                            </div>
                          )}

                          {m.cardType === 'improve_liquidity' && (
                            <div className="space-y-3 text-xs leading-relaxed">
                              <h5 className="font-extrabold text-slate-900 text-sm.5">Actionable Treasury Enhancements</h5>
                              <ul className="space-y-2">
                                {m.cardData.actions.map((act: string, i: number) => (
                                  <li key={i} className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-202 flex items-start space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                    <span className="font-semibold text-slate-700">{act}</span>
                                  </li>
                                ))}
                              </ul>
                              <span className="text-[9px] text-slate-450 font-semibold block">Confidence Score: {m.cardData.confidence}</span>
                            </div>
                          )}

                          {m.cardType === 'biggest_expense' && (
                            <div className="space-y-3 text-xs leading-relaxed">
                              <h5 className="font-extrabold text-slate-900 text-sm.5">Monthly Outflow Audit</h5>
                              <div className="bg-blue-50/20 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-slate-450 block">Largest Outflow Category</span>
                                  <span className="text-base font-extrabold text-slate-900 mt-1 block">{m.cardData.category}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-base font-extrabold text-blue-600 block">{m.cardData.amount}</span>
                                  <span className="text-[10px] text-slate-500 font-semibold">{m.cardData.percentage}</span>
                                </div>
                              </div>
                              <span className="text-[9px] text-slate-450 font-semibold block">Confidence Score: {m.cardData.confidence}</span>
                            </div>
                          )}

                        </div>
                      ) : (
                        <div className={`max-w-[75%] rounded-2xl p-4.5 text-xs.5 leading-relaxed shadow-sm ${
                          m.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-white border border-slate-200 text-slate-750 rounded-tl-none relative'
                        }`}>
                          {m.sender === 'gemma' && (
                            <div className="absolute top-3.5 -left-2.5 w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center scale-75 border border-blue-100">
                              <Sparkles className="w-3 h-3 fill-blue-50 text-blue-600" />
                            </div>
                          )}
                          <p className={m.sender === 'gemma' ? 'pl-2' : ''}>{m.text}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs.5 text-slate-500 flex items-center space-x-1.5 shadow-sm">
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem('message') as HTMLInputElement;
                    if (input.value.trim()) {
                      handlePresetQuestion(input.value.trim());
                      input.value = '';
                    }
                  }}
                  className="shrink-0 flex items-center space-x-2 bg-white border-t border-slate-100 p-4"
                >
                  <input 
                    type="text" 
                    name="message"
                    placeholder="Ask Gemma a financial question..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs.5 focus:outline-none focus:border-blue-500 text-slate-700 font-medium"
                  />
                  <button 
                    type="submit"
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Settings Console</h1>
                <p className="text-xs.5 text-slate-500 mt-1">Configure your profile, company details, notifications, and API credentials.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Side: General Profile & Company */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Profile Section */}
                  <div className="bg-white border border-slate-200/85 rounded-3xl p-6 shadow-sm space-y-5">
                    <h3 className="text-sm.5 font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>User Profile</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="bg-slate-50 border border-slate-205 text-slate-700 font-semibold rounded-xl px-4 py-2.5 text-xs.5 focus:outline-none focus:border-blue-500 w-full"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                        <input
                          type="email"
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="bg-slate-50 border border-slate-205 text-slate-700 font-semibold rounded-xl px-4 py-2.5 text-xs.5 focus:outline-none focus:border-blue-500 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="bg-white border border-slate-200/85 rounded-3xl p-6 shadow-sm space-y-5">
                    <h3 className="text-sm.5 font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Company Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Legal Business Name</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="bg-slate-50 border border-slate-205 text-slate-700 font-semibold rounded-xl px-4 py-2.5 text-xs.5 focus:outline-none focus:border-blue-500 w-full"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Business Type</label>
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="bg-slate-50 border border-slate-205 text-slate-700 font-bold rounded-xl px-4 py-2.5 text-xs.5 focus:outline-none focus:border-blue-500 w-full"
                        >
                          <option value="sme_corporation">SME Corporation</option>
                          <option value="partnership">Partnership</option>
                          <option value="sole_proprietor">Sole Proprietorship</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Business Address</label>
                      <input
                        type="text"
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                        className="bg-slate-50 border border-slate-205 text-slate-700 font-semibold rounded-xl px-4 py-2.5 text-xs.5 focus:outline-none focus:border-blue-500 w-full"
                      />
                    </div>
                  </div>

                  {/* API Credentials */}
                  <div className="bg-white border border-slate-200/85 rounded-3xl p-6 shadow-sm space-y-5">
                    <h3 className="text-sm.5 font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span>API Settings</span>
                    </h3>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Google Gemma API Key</label>
                      <div className="relative flex items-center bg-slate-50 border border-slate-205 rounded-xl focus-within:border-blue-500 focus-within:bg-white transition-all p-3">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value={gemmaApiKey}
                          onChange={(e) => setGemmaApiKey(e.target.value)}
                          className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-700 font-mono font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="text-slate-400 hover:text-slate-650 bg-transparent border-none cursor-pointer"
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-450 leading-relaxed">
                        API key synced to your sandbox models for forecasting, decision analysis, and chatbot audit queries.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Right Side: Preferences, Security, Save */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-6">
                    
                    {/* Dark Mode toggle & preferences */}
                    <div className="bg-white border border-slate-200/85 rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="text-xs.5 font-extrabold text-slate-900 uppercase tracking-wider">Preferences</h3>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700">Dark Mode</span>
                        <button
                          onClick={() => {
                            setIsDarkMode(!isDarkMode);
                            triggerToast(isDarkMode ? "Switched to Light theme." : "Switched to Dark theme.");
                          }}
                          className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-250 cursor-pointer ${
                            isDarkMode ? 'bg-blue-600' : 'bg-slate-200'
                          }`}
                        >
                          <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transform transition-transform duration-250 ${
                            isDarkMode ? 'translate-x-4.5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* Notification Toggles */}
                    <div className="bg-white border border-slate-200/85 rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="text-xs.5 font-extrabold text-slate-900 uppercase tracking-wider">Notifications</h3>
                      
                      <div className="space-y-3.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700">Email liquidity alerts</span>
                          <input
                            type="checkbox"
                            checked={emailAlerts}
                            onChange={(e) => setEmailAlerts(e.target.checked)}
                            className="accent-blue-600 w-4 h-4 cursor-pointer"
                          />
                        </div>
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700">Weekly Gemma digest</span>
                          <input
                            type="checkbox"
                            checked={weeklyDigest}
                            onChange={(e) => setWeeklyDigest(e.target.checked)}
                            className="accent-blue-600 w-4 h-4 cursor-pointer"
                          />
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700">Critical SMS warnings</span>
                          <input
                            type="checkbox"
                            checked={smsAlerts}
                            onChange={(e) => setSmsAlerts(e.target.checked)}
                            className="accent-blue-600 w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security Toggle */}
                    <div className="bg-white border border-slate-200/85 rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="text-xs.5 font-extrabold text-slate-900 uppercase tracking-wider">Security</h3>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700">Two-Factor Auth (2FA)</span>
                        <button
                          onClick={() => {
                            setEnable2FA(!enable2FA);
                            triggerToast(enable2FA ? "2FA disabled." : "2FA enabled successfully.");
                          }}
                          className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-250 cursor-pointer ${
                            enable2FA ? 'bg-blue-600' : 'bg-slate-200'
                          }`}
                        >
                          <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transform transition-transform duration-250 ${
                            enable2FA ? 'translate-x-4.5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Save Configuration Settings */}
                  <button
                    onClick={() => triggerToast("Dashboard preferences saved successfully.")}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <span>Save Settings</span>
                  </button>

                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-800"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
