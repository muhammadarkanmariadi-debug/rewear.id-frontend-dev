/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Menu, X, Heart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/shared/utils/cn"; // assuming cn utility exists
import { authService } from "@/services";
import Image from "next/image";


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isAuthenticated, logout, user } = useAuthStore();
  const isSeller = user?.is_seller || user?.is_seller_verified
  const isAdmin = user?.is_admin
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const baseNavLinks = [
    { label: "Beranda", href: "/" },
    { label: "Produk", href: "/products" },
    { label: "Tentang", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/contact" },

  ];

  const navLinks = [...baseNavLinks];
  if (isMounted && isAuthenticated) {
    if (isAdmin) {
      navLinks.push({ label: "Admin Dashboard", href: "/admin" });
    } else {
      if (isSeller) {
        navLinks.push({ label: "Dashboard", href: "/dashboard" });
      }
      navLinks.push({ label: "Pesanan Saya", href: "/orders" });
    }
  }


  return (
    <header className="top-0 z-50 sticky bg-background/80 supports-[backdrop-filter]:bg-background/60 backdrop-blur-xl border-border/40 border-b w-full">
      <div className="flex justify-between items-center gap-4 mx-auto px-4 md:px-6 h-16 container">

        {/* L E F T  S I D E (Brand & Links) */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2 shrink-0">
            <div className="flex justify-center items-center bg-foreground group-hover:bg-primary rounded w-8 h-8 font-bold text-background text-lg transition-colors">
              R
            </div>
            <span className="hidden sm:inline-block font-bold text-xl tracking-tight">
              rewear<span className="text-primary">.id</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200",
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



        {/* R I G H T  S I D E (Actions) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link href="/products" className="lg:hidden flex justify-center items-center hover:bg-muted rounded-full w-9 h-9 text-muted-foreground transition-colors">
            <Search className="w-4 h-4" />
          </Link>

          {isMounted && isAuthenticated && !isAdmin && (
            <Link href="/wishlist" className="hidden sm:flex justify-center items-center hover:bg-muted rounded-full w-9 h-9 text-muted-foreground hover:text-foreground transition-colors" title="Wishlist">
              <Heart className="w-4 h-4" />
            </Link>
          )}

          <div className="hidden sm:block mx-1 bg-border w-px h-6" />

          {isMounted && isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href={isAdmin ? "/admin" : "/settings"} className="flex items-center gap-2 hover:bg-muted px-2 py-1.5 rounded-full transition-colors">
                {user?.avatar_url ? (
                  <Image src={user.avatar_url} alt={user.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                    {user?.name?.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium pr-1">{user?.name}</span>
              </Link>
              <button onClick={async () => { await authService.logout(); logout(); window.location.href = '/login' }} title="Keluar" className="flex items-center justify-center hover:bg-red-500/10 w-9 h-9 rounded-full text-muted-foreground hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden lg:inline-flex items-center gap-2 hover:bg-muted px-3 py-2 rounded-md font-medium text-muted-foreground hover:text-foreground text-sm transition-colors">
              <User className="w-4 h-4" />
              Masuk
            </Link>
          )}

          {!isAdmin && (
            <Link href="/my-products/new" className="hidden lg:inline-flex justify-center items-center bg-foreground hover:bg-foreground/90 shadow-sm px-4 rounded-full h-9 font-medium text-background text-sm transition-colors">
              Jual Baju
            </Link>

          )}
          <ThemeSwitcher />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden z-50 flex justify-center items-center hover:bg-muted rounded-md w-9 h-9 text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden top-16 right-0 left-0 absolute flex flex-col gap-6 bg-background/95 slide-in-from-top-4 shadow-2xl backdrop-blur-md p-5 border-border/40 border-b animate-in">
          <div className="group relative w-full">
            <div className="left-0 absolute inset-y-0 flex items-center pl-3 text-muted-foreground pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              autoFocus
              className="block bg-muted/50 focus:bg-background pr-4 pl-10 border border-transparent focus:border-border rounded-lg outline-none w-full h-11 placeholder:text-muted-foreground text-sm transition-all"
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
                    "px-4 py-3 rounded-lg font-medium text-sm transition-colors",
                    isActive ? "bg-foreground text-background" : "hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <hr className="my-2 border-border/60" />

            {isMounted && isAuthenticated && (
              <>
                {!isAdmin && (
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/wishlist" className="flex items-center gap-3 hover:bg-muted px-4 py-3 rounded-lg font-medium text-sm transition-colors">
                    <Heart className="w-4 h-4" /> Wishlist
                  </Link>
                )}
                {!isAdmin && (
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/orders" className="flex items-center gap-3 hover:bg-muted px-4 py-3 rounded-lg font-medium text-sm transition-colors">
                    <ShoppingBag className="w-4 h-4" /> Pesanan Saya
                  </Link>
                )}
                <Link onClick={() => setIsMobileMenuOpen(false)} href={isAdmin ? "/admin" : "/settings"} className="flex items-center gap-3 hover:bg-muted px-4 py-3 rounded-lg font-medium text-sm transition-colors">
                  <User className="w-4 h-4" /> {isAdmin ? "Dashboard Admin" : "Pengaturan"}
                </Link>
              </>
            )}
          </nav>

          <div className="flex flex-col gap-3 pt-4 border-border/40 border-t">
            {!isAdmin && (
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/products/new" className="flex justify-center items-center bg-foreground hover:bg-foreground/90 shadow p-3 rounded-lg font-bold text-background text-sm transition-colors">
                Mulai Jual Baju
              </Link>
            )}


            {isMounted && isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg uppercase">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-semibold text-sm truncate">{user?.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                  </div>
                </div>
                <button onClick={async () => { await authService.logout(), logout(); setIsMobileMenuOpen(false); }} className="flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 p-3 rounded-lg font-medium text-red-500 text-sm transition-colors">
                  <LogOut className="w-4 h-4" />
                  Keluar Akun
                </button>
              </div>
            ) : (
              <div className="gap-3 grid grid-cols-2">
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="flex justify-center items-center bg-muted hover:bg-muted/80 p-3 rounded-lg font-medium text-sm transition-colors">
                  Masuk
                </Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/register" className="flex justify-center items-center hover:bg-accent p-3 border border-border rounded-lg font-medium text-sm transition-colors">
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
