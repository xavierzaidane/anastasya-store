"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Shield, Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        adminSecret: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showAdminSecret, setShowAdminSecret] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
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
                    rememberMe: formData.rememberMe,
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
        <div className="relative min-h-screen bg-background text-foreground">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/cover.png')" }}
                aria-hidden
            />
            <div className="absolute inset-0 bg-background/20" aria-hidden />
            <section className="relative flex min-h-screen items-center justify-center px-6 py-10 sm:py-16">
                <div className="w-full max-w-md rounded-3xl border border-border bg-card/90 backdrop-blur-sm shadow-lg">
                    <div className="px-6 py-10 sm:px-10">
                        <div className="mb-8 text-center">
                            <h2 className="mt-3 text-3xl font-semibold font-mono text-foreground">Admin Sign In</h2>
                            <p className="mt-2 text-sm text-muted-foreground">Use your admin credentials to continue.</p>
                        </div>

                            {error && (
                                <div className="mb-6 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                    {error}
                                </div>
                            )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                                        Email or Username
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                        </span>
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            autoComplete="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-input bg-background/70 px-12 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                            <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-sm font-medium text-foreground">
                                            Password
                                        </label>
                                        <Link href="/admin/forgot-password" className="text-xs font-medium text-primary hover:underline">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
                                            <Lock className="h-4 w-4" />
                                        </span>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-input bg-background/70 px-12 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                            <div className="space-y-2">
                                <label htmlFor="adminSecret" className="text-sm font-medium text-foreground flex items-center gap-2">
                                    Admin Secret <span className="text-xs font-normal text-muted-foreground"></span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
                                        <Shield className="h-4 w-4" />
                                    </span>
                                    <input
                                        id="adminSecret"
                                        name="adminSecret"
                                        type={showAdminSecret ? "text" : "password"}
                                        autoComplete="off"
                                        value={formData.adminSecret}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-input bg-background/70 px-12 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                                        placeholder="Required for privileged access"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowAdminSecret((prev) => !prev)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground"
                                        aria-label={showAdminSecret ? "Hide admin secret" : "Show admin secret"}
                                    >
                                        {showAdminSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground">Only needed when accessing elevated admin areas.</p>
                            </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                            className="h-4 w-4 rounded border-input text-primary focus:ring-primary/40"
                                        />
                                        Remember me
                                    </label>
                                    <span className="text-xs text-muted-foreground">Enterprise SSO enabled</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground  transition-all hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Signing in...
                                        </span>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>

                            <p className="text-center text-xs text-muted-foreground">
                                Need access? <span className="font-semibold text-foreground">Contact Super Admin</span>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
