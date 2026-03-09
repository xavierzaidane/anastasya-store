"use client";

import { useState, CSSProperties } from "react";
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

    const heroGradientStyle: CSSProperties = {
        background:
            "radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--primary) 65%, transparent) 0%, transparent 55%)," +
            "radial-gradient(circle at 85% 5%, color-mix(in srgb, var(--accent) 55%, transparent) 0%, transparent 60%)," +
            "linear-gradient(135deg, color-mix(in srgb, var(--primary) 70%, var(--background) 30%), color-mix(in srgb, var(--secondary) 80%, var(--background) 20%))",
    };

    const heroNoiseStyle: CSSProperties = {
        backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--primary-foreground) 18%, transparent) 1px, transparent 0)",
        backgroundSize: "4px 4px",
    };

    const heroLineColor = "color-mix(in srgb, var(--primary-foreground) 35%, transparent)";
    const heroMutedForeground = "color-mix(in srgb, var(--primary-foreground) 75%, transparent)";
    const heroSubtleForeground = "color-mix(in srgb, var(--primary-foreground) 60%, transparent)";

    const heroSurfaceStyle: CSSProperties = {
        border: "1px solid color-mix(in srgb, var(--primary-foreground) 28%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--primary-foreground) 9%, transparent)",
        boxShadow: "0 35px 90px color-mix(in srgb, var(--primary) 22%, transparent)",
    };

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
        <div className="min-h-screen bg-background text-foreground">
            <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
                <section className="order-2 md:order-1 relative flex min-h-full flex-col overflow-hidden">
                    <div className="absolute inset-0" style={heroGradientStyle} aria-hidden />
                    <div className="absolute inset-0 mix-blend-soft-light opacity-40" style={heroNoiseStyle} aria-hidden />
                    <div className="pointer-events-none absolute inset-0" style={{ color: heroLineColor, opacity: 0.1 }} aria-hidden>
                        <svg viewBox="0 0 1200 1200" preserveAspectRatio="none" className="h-full w-full">
                            <path d="M0,900 C300,780 480,1080 800,960 C1040,872 1100,520 1200,460" stroke="currentColor" strokeWidth="0.8" fill="none" />
                            <path d="M-20,600 C220,500 500,700 720,640 C960,570 1120,260 1240,120" stroke="currentColor" strokeWidth="0.6" strokeDasharray="12 14" fill="none" />
                        </svg>
                    </div>
                    <div className="relative z-10 flex h-full items-center px-10 py-12 lg:px-16">
                        <div className="mx-auto flex w-full max-w-xl flex-col gap-8 text-primary-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 motion-safe:slide-in-from-bottom-6">

                            <div className="space-y-4">
                                <p className="text-sm font-semibold font-mono uppercase tracking-[0.35em]" style={{ color: heroMutedForeground }}>
                                    Hello Admin
                                </p>

                                <h1 className="text-4xl font-semibold font-mono tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                                    Hello Admin
                                </h1>
                                <p className="text-lg leading-relaxed" >
                                    Manage your dashboard efficiently. Automate workflows and monitor system activity in one place.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="order-1 md:order-2 flex items-center justify-center px-6 py-10 sm:py-16">
                    <div className="w-full max-w-md rounded-3xl border border-border bg-card/95 backdrop-blur-sm">
                        <div className="px-6 py-10 sm:px-10">
                            <div className="mb-8 text-center">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Secure Access</p>
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
        </div>
    );
}
