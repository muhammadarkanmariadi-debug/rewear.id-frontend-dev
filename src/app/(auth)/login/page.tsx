import Link from "next/link";
import { Mail, Lock, LogIn} from "lucide-react";

export const metadata = {
  title: "Masuk | rewear.id - Aman & Terpercaya",
  description: "Masuk ke akun rewear.id Anda untuk membeli atau menjual pakaian preloved 100% aman berkat sistem Escrow.",
};

export default function LoginPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">Selamat Datang Kembali</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Lanjutkan pencarian fashion andalanmu.
        </p>
      </div>

      <form className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Mail className="h-4 w-4" />
            </div>
            <input 
              id="email" 
              type="email" 
              required
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" 
              placeholder="nama@email.com" 
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="password">Kata Sandi</label>
            <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
              Lupa Sandi?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="h-4 w-4" />
            </div>
            <input 
              id="password" 
              type="password" 
              required
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" 
              placeholder="••••••••" 
            />
          </div>
        </div>

        <button 
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Masuk Sekarang
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <span className="h-px w-full bg-border"></span>
        <span className="px-2">Atau</span>
        <span className="h-px w-full bg-border"></span>
      </div>

      <div className="mt-6">
        <button 
          type="button"
          className="inline-flex w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
        >
      
          Lanjutkan dengan Google
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Daftar Sekarang
        </Link>
      </div>
    </>
  );
}
