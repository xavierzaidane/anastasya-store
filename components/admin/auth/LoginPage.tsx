"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Shield, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        adminSecret: "",
    });
    const [showPassword, setShowPassword] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    ...(formData.adminSecret && { adminSecret: formData.adminSecret }),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
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
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Glass card */}
                <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl shadow-zinc-900/5 border border-white/50 p-10">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1
                            className="text-4xl font-light text-zinc-800 mb-2"
                            style={{ fontFamily: "'Shanti', sans-serif" }}
                        >
                            Welcome Back
                        </h1>
                        <p className="text-zinc-500 text-sm">
                            Sign in to continue to your dashboard
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    className="w-full pl-12 pr-4 py-4 bg-white/80 border border-zinc-200 rounded-2xl text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-400 transition-all duration-200"
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
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-4 bg-white/80 border border-zinc-200 rounded-2xl text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-400 transition-all duration-200"
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
                        </div>

                        {/* Admin Secret field (optional) */}
                        <div className="space-y-2">
                            <label
                                htmlFor="adminSecret"
                                className="block text-sm font-medium text-zinc-600 ml-1"
                            >
                                Admin Secret <span className="text-zinc-400 font-normal">(optional)</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Shield className="h-5 w-5 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
                                </div>
                                <input
                                    id="adminSecret"
                                    name="adminSecret"
                                    type={showAdminSecret ? "text" : "password"}
                                    autoComplete="off"
                                    value={formData.adminSecret}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-4 bg-white/80 border border-zinc-200 rounded-2xl text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-400 transition-all duration-200"
                                    placeholder="Required for admin accounts"
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
                            <p className="text-xs text-zinc-400 ml-1">
                                Only required if logging in as an admin
                            </p>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 px-6 bg-zinc-800 hover:bg-zinc-900 text-white font-medium rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white/70 text-zinc-400">New here?</span>
                        </div>
                    </div>

                    {/* Register link */}
                    <Link
                        href="/admin/register"
                        className="w-full py-4 px-6 bg-transparent hover:bg-zinc-100/50 text-zinc-600 hover:text-zinc-800 font-medium rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-200 hover:border-zinc-300 group"
                    >
                        <span>Create an Account</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-center mt-8 text-sm text-zinc-400">
                    Protected by enterprise-grade security
                </p>
            </div>
        </div>
    );
}
