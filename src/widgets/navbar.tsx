"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Menu, X, Heart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/shared/utils/cn"; // assuming cn utility exists

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const baseNavLinks = [
    { label: "Beranda", href: "/" },
    { label: "Produk", href: "/products" },
  ];

  const navLinks = isMounted && isAuthenticated 
    ? [...baseNavLinks, { label: "Dashboard", href: "/dashboard" }]
    : baseNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* L E F T  S I D E (Brand & Links) */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center text-background font-bold text-lg group-hover:bg-primary transition-colors">
              R
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
              rewear<span className="text-primary">.id</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    isActive 
                      ? "bg-foreground text-background" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* M I D D L E (Search Bar - Desktop Only) */}
        <div className="hidden lg:flex flex-1 max-w-sm ml-auto mr-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              className="block w-full h-10 pl-10 pr-4 text-sm border border-transparent bg-muted/50 rounded-full focus:bg-background focus:border-border focus:ring-4 focus:ring-border/20 outline-none transition-all placeholder:text-muted-foreground"
              placeholder="Cari tren, brand..." 
            />
          </div>
        </div>

        {/* R I G H T  S I D E (Actions) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link href="/products" className="lg:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-muted rounded-full transition-colors">
            <Search className="w-4 h-4" />
          </Link>
          
          <Link href="/wishlist" className="hidden sm:flex w-9 h-9 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors" title="Wishlist">
            <Heart className="w-4 h-4" />
          </Link>

          <div className="h-6 w-px bg-border hidden sm:block mx-1" />

          {isMounted && isAuthenticated ? (
            <button onClick={logout} className="hidden md:inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors">
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          ) : (
            <Link href="/login" className="hidden md:inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
              <User className="w-4 h-4" />
              Masuk
            </Link>
          )}

          <Link href="/products/new" className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90 transition-colors shadow-sm">
            Jual Baju
          </Link>

          <ThemeSwitcher />

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted rounded-md transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 border-b border-border/40 bg-background/95 backdrop-blur-md shadow-2xl p-5 flex flex-col gap-6 animate-in slide-in-from-top-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              autoFocus
              className="block w-full h-11 pl-10 pr-4 text-sm border border-transparent bg-muted/50 rounded-lg focus:bg-background focus:border-border outline-none transition-all placeholder:text-muted-foreground"
              placeholder="Cari kaos vintage, celana bahan..." 
            />
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-foreground text-background" : "hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <hr className="border-border/60 my-2" />
            
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/wishlist" className="px-4 py-3 text-sm font-medium hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
              <Heart className="w-4 h-4" /> Wishlist
            </Link>
            
            {isMounted && isAuthenticated && (
              <>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/orders" className="px-4 py-3 text-sm font-medium hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4" /> Pesanan Saya
                </Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/settings" className="px-4 py-3 text-sm font-medium hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <User className="w-4 h-4" /> Pengaturan
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex flex-col gap-3 pt-4 border-t border-border/40">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/products/new" className="flex items-center justify-center p-3 text-sm font-bold bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors shadow">
              Mulai Jual Baju
            </Link>

            {isMounted && isAuthenticated ? (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-red-500 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors">
                <LogOut className="w-4 h-4" />
                Keluar Akun
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="flex items-center justify-center p-3 text-sm font-medium bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  Masuk
                </Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/register" className="flex items-center justify-center p-3 text-sm font-medium border border-border rounded-lg hover:bg-accent transition-colors">
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
