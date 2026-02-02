import { motion } from 'framer-motion';
import { User, Mail, Briefcase, MapPin, Phone, Hash, Save, Trash2, ArrowRight, CheckCircle2, AlertCircle, Database, FileText, Settings, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    employeeId: string;
    location: string;
    phone: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    employeeId?: string;
    location?: string;
    phone?: string;
}

export default function App() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        role: 'Engineer',
        employeeId: '',
        location: '',
        phone: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());

    const validateField = (name: keyof FormData, value: string): string | undefined => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) {
                    return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
                }
                if (value.trim().length < 2) {
                    return `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
                }
                if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    return `${name === 'firstName' ? 'First' : 'Last'} name can only contain letters, spaces, hyphens, and apostrophes`;
                }
                break;
            case 'email':
                if (!value.trim()) {
                    return 'Email address is required';
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return 'Please enter a valid email address';
                }
                break;
            case 'employeeId':
                if (value && !/^EMP-\d{3,6}$/.test(value)) {
                    return 'Employee ID must be in format EMP-XXX (e.g., EMP-492)';
                }
                break;
            case 'phone':
                if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
                    return 'Please enter a valid phone number (at least 10 digits)';
                }
                break;
            case 'location':
                if (value && value.trim().length < 3) {
                    return 'Location must be at least 3 characters';
                }
                break;
        }
        return undefined;
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched.has(name)) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (name: keyof FormData) => {
        setTouched(prev => new Set(prev).add(name));
        const error = validateField(name, formData[name]);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched(new Set(Object.keys(formData) as Array<keyof FormData>));

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    };

    const handleClear = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            role: 'Engineer',
            employeeId: '',
            location: '',
            phone: ''
        });
        setErrors({});
        setTouched(new Set());
    };

    const inputClass = (fieldName: keyof FormData) => `
        w-full bg-white border rounded-xl py-3.5 pl-12 pr-4 text-sm transition-all
        ${errors[fieldName] ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}
        input-glow
    `;

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
                                { label: 'Form version', status: 'v2.5.0', color: 'text-slate-900' }
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
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">All inputs are validated, sanitized, and encrypted with AES-256 before being committed to the vault.</p>
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
            <main className="flex-1 p-8 lg:p-20 flex flex-col items-center overflow-y-auto" role="main">
                <div className="max-w-xl w-full">
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Record Entry</h2>
                        <p className="text-slate-500 font-medium">Please enter the required information for the database record.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="label-text" htmlFor="firstName">First Name <span className="text-rose-500">*</span></label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder="John"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        onBlur={() => handleBlur('firstName')}
                                        className={inputClass('firstName')}
                                        aria-invalid={errors.firstName ? 'true' : 'false'}
                                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                                    />
                                </div>
                                {errors.firstName && (
                                    <p id="firstName-error" className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.firstName}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="label-text" htmlFor="lastName">Last Name <span className="text-rose-500">*</span></label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Doe"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        onBlur={() => handleBlur('lastName')}
                                        className={inputClass('lastName')}
                                        aria-invalid={errors.lastName ? 'true' : 'false'}
                                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                                    />
                                </div>
                                {errors.lastName && (
                                    <p id="lastName-error" className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="label-text" htmlFor="email">Email Address <span className="text-rose-500">*</span></label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john.doe@company.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    onBlur={() => handleBlur('email')}
                                    className={inputClass('email')}
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                />
                            </div>
                            {errors.email && (
                                <p id="email-error" className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="label-text" htmlFor="role">Role / Position</label>
                                <div className="relative group">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <select
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => handleInputChange('role', e.target.value)}
                                        className={inputClass('role')}
                                    >
                                        <option>Engineer</option>
                                        <option>Manager</option>
                                        <option>Designer</option>
                                        <option>Analyst</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="label-text" htmlFor="employeeId">Employee ID</label>
                                <div className="relative group">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="text"
                                        id="employeeId"
                                        placeholder="EMP-492"
                                        value={formData.employeeId}
                                        onChange={(e) => handleInputChange('employeeId', e.target.value)}
                                        onBlur={() => handleBlur('employeeId')}
                                        className={inputClass('employeeId')}
                                        aria-invalid={errors.employeeId ? 'true' : 'false'}
                                        aria-describedby={errors.employeeId ? 'employeeId-error' : undefined}
                                    />
                                </div>
                                {errors.employeeId && (
                                    <p id="employeeId-error" className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.employeeId}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="label-text" htmlFor="location">Department Office</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    id="location"
                                    placeholder="San Francisco, HQ"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    onBlur={() => handleBlur('location')}
                                    className={inputClass('location')}
                                    aria-invalid={errors.location ? 'true' : 'false'}
                                    aria-describedby={errors.location ? 'location-error' : undefined}
                                />
                            </div>
                            {errors.location && (
                                <p id="location-error" className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.location}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="label-text" htmlFor="phone">Phone Number</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    onBlur={() => handleBlur('phone')}
                                    className={inputClass('phone')}
                                    aria-invalid={errors.phone ? 'true' : 'false'}
                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                />
                            </div>
                            {errors.phone && (
                                <p id="phone-error" className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                                </p>
                            )}
                        </div>

                        <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-6">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="px-8 py-3.5 text-slate-400 hover:text-rose-500 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> Clear All
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 md:flex-none px-12 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl ${isSuccess ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100'} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Database className="w-4 h-4" /></motion.div> : isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                {isSubmitting ? 'Syncing...' : isSuccess ? 'Record Saved' : 'Commit Record'}
                            </button>
                        </div>
                    </form>

                    {/* Footer Summary */}
                    <footer className="mt-32 pt-8 border-t border-slate-200 flex justify-between items-center opacity-50" role="contentinfo">
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
