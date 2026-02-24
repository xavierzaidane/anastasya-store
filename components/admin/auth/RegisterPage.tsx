"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Shield, Loader2, ArrowRight, ArrowLeft, Check } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "CUSTOMER" as "CUSTOMER" | "ADMIN",
        adminSecret: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showAdminSecret, setShowAdminSecret] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
    };

    const passwordRequirements = [
        { label: "At least 8 characters", met: formData.password.length >= 8 },
        { label: "Contains a number", met: /\d/.test(formData.password) },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    adminSecret: formData.role === "ADMIN" ? formData.adminSecret : undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }

            router.push("/admin");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#F8F3EC] via-[#FDF9F3] to-[#F0E8DC]">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-20 w-80 h-80 bg-emerald-200/15 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-100/15 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Glass card */}
                <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl shadow-zinc-900/5 border border-white/50 p-10">
                    {/* Back link */}
                    <Link
                        href="/admin/login"
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to login
                    </Link>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1
                            className="text-4xl font-light text-zinc-800 mb-2"
                            style={{ fontFamily: "'Shanti', sans-serif" }}
                        >
                            Create Account
                        </h1>
                        <p className="text-zinc-500 text-sm">
                            Join us and start your journey
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-zinc-600 ml-1"
                            >
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-zinc-200 rounded-2xl text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-400 transition-all duration-200"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-zinc-600 ml-1"
                            >
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-zinc-200 rounded-2xl text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-400 transition-all duration-200"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-zinc-600 ml-1"
                            >
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-3.5 bg-white/80 border border-zinc-200 rounded-2xl text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-400 transition-all duration-200"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {/* Password requirements */}
                            {formData.password && (
                                <div className="mt-2 space-y-1">
                                    {passwordRequirements.map((req, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-2 text-xs transition-colors ${req.met ? 'text-emerald-600' : 'text-zinc-400'
                                                }`}
                                        >
                                            <Check className={`h-3 w-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                                            {req.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-zinc-600 ml-1"
                            >
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3.5 bg-white/80 border rounded-2xl text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 transition-all duration-200 ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                            ? 'border-red-300 focus:border-red-400'
                                            : formData.confirmPassword && formData.password === formData.confirmPassword
                                                ? 'border-emerald-300 focus:border-emerald-400'
                                                : 'border-zinc-200 focus:border-zinc-400'
                                        }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Role selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-zinc-600 ml-1">
                                Account Type
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, role: "CUSTOMER", adminSecret: "" }))}
                                    className={`py-3 px-4 rounded-2xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${formData.role === "CUSTOMER"
                                            ? "bg-zinc-800 text-white border-zinc-800 shadow-lg"
                                            : "bg-white/80 text-zinc-600 border-zinc-200 hover:border-zinc-300"
                                        }`}
                                >
                                    <User className="h-4 w-4" />
                                    Customer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, role: "ADMIN" }))}
                                    className={`py-3 px-4 rounded-2xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${formData.role === "ADMIN"
                                            ? "bg-zinc-800 text-white border-zinc-800 shadow-lg"
                                            : "bg-white/80 text-zinc-600 border-zinc-200 hover:border-zinc-300"
                                        }`}
                                >
                                    <Shield className="h-4 w-4" />
                                    Admin
                                </button>
                            </div>
                        </div>

                        {/* Admin Secret field (conditional) */}
                        {formData.role === "ADMIN" && (
                            <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                                <label
                                    htmlFor="adminSecret"
                                    className="block text-sm font-medium text-zinc-600 ml-1"
                                >
                                    Admin Secret Key
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Shield className="h-5 w-5 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
                                    </div>
                                    <input
                                        id="adminSecret"
                                        name="adminSecret"
                                        type={showAdminSecret ? "text" : "password"}
                                        required={formData.role === "ADMIN"}
                                        value={formData.adminSecret}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-12 py-3.5 bg-amber-50/50 border border-amber-200 rounded-2xl text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200"
                                        placeholder="Enter admin secret"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowAdminSecret(!showAdminSecret)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
                                    >
                                        {showAdminSecret ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-amber-600 ml-1">
                                    Admin accounts require a valid secret key
                                </p>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 px-6 bg-zinc-800 hover:bg-zinc-900 text-white font-medium rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-zinc-900/20 hover:shadow-xl hover:shadow-zinc-900/30 hover:-translate-y-0.5 mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Terms */}
                    <p className="mt-6 text-xs text-center text-zinc-400">
                        By creating an account, you agree to our{" "}
                        <a href="#" className="text-zinc-600 hover:underline">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="text-zinc-600 hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
