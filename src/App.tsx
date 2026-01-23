import { motion } from 'framer-motion';
import { User, Mail, Briefcase, MapPin, Phone, Hash, Save, Trash2, ArrowRight, CheckCircle2, AlertCircle, Database, FileText, Settings, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function App() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex border-t-4 border-indigo-600">
            {/* Sidebar Info */}
            <aside className="hidden lg:flex w-[400px] flex-col p-12 bg-white border-r border-slate-200">
                <div className="mb-20 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Database className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-black tracking-tighter uppercase">Form<span className="text-indigo-600">Flow</span></h1>
                </div>

                <div className="space-y-12 flex-1">
                    <section>
                        <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-6">Workflow Status</h2>
                        <div className="space-y-6">
                            {[
                                { label: 'Validation Engine', status: 'Operational', color: 'text-emerald-500' },
                                { label: 'Database Sync', status: 'Encrypted', color: 'text-indigo-500' },
                                { label: 'Form version', status: 'v2.4.0', color: 'text-slate-900' }
                            ].map((item) => (
                                <div key={item.label} className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">{item.label}</span>
                                    <span className={item.color}>{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                        <ShieldCheck className="w-8 h-8 text-indigo-600 mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">Enterprise Security</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">All inputs are sanitized and encrypted with AES-256 before being committed to the vault.</p>
                    </section>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center gap-3 text-slate-400">
                        <Settings className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Portal Settings</span>
                    </div>
                </div>
            </aside>

            {/* Main Entry Form */}
            <main className="flex-1 p-8 lg:p-20 flex flex-col items-center overflow-y-auto">
                <div className="max-w-xl w-full">
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Record Entry</h2>
                        <p className="text-slate-500 font-medium">Please enter the required information for the database record.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="label-text">First Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input type="text" placeholder="John" required className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm input-glow" />
                                </div>
                            </div>
                            <div>
                                <label className="label-text">Last Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input type="text" placeholder="Doe" required className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm input-glow" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="label-text">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input type="email" placeholder="john.doe@company.com" required className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm input-glow" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="label-text">Role / Position</label>
                                <div className="relative group">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <select className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm input-glow appearance-none">
                                        <option>Engineer</option>
                                        <option>Manager</option>
                                        <option>Designer</option>
                                        <option>Analyst</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="label-text">Employee ID</label>
                                <div className="relative group">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input type="text" placeholder="EMP-492" className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm input-glow" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="label-text">Department Office</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input type="text" placeholder="San Francisco, HQ" className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm input-glow" />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-6">
                            <button type="button" className="px-8 py-3.5 text-slate-400 hover:text-rose-500 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                                <Trash2 className="w-4 h-4" /> Clear All
                            </button>

                            <button
                                disabled={isSubmitting}
                                className={`flex-1 md:flex-none px-12 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl ${isSuccess ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100'}`}
                            >
                                {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Database className="w-4 h-4" /></motion.div> : isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                {isSubmitting ? 'Syncing...' : isSuccess ? 'Record Saved' : 'Commit Record'}
                            </button>
                        </div>
                    </form>

                    {/* Footer Summary */}
                    <footer className="mt-32 pt-8 border-t border-slate-200 flex justify-between items-center opacity-50">
                        <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest tracking-tighter">Documentation available</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em]">© 2026 FORMFLOW // RECORD • 26/30 DISPATCHED</p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
