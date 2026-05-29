import { cn } from "@/shared/utils/cn";
import { Check, Clock, Package, Truck, Wallet } from "lucide-react";

interface TimelineStep {
  title: string;
  description: string;
  date?: string;
  isCompleted: boolean;
  isActive: boolean;
}

export function EscrowTimeline() {
  const steps: TimelineStep[] = [
    { title: "Pembayaran Diverifikasi", description: "Dana Anda tertahan aman di sistem Escrow.", date: "29 Mei, 10:00", isCompleted: true, isActive: false },
    { title: "Penjual Memproses", description: "Menunggu penjual menyerahkan paket ke kurir.", date: "29 Mei, 14:30", isCompleted: true, isActive: false },
    { title: "Sedang Dikirim", description: "Paket dalam perjalanan (Resi: GOSEND-88219)", date: "Estimasi: Hari Ini", isCompleted: false, isActive: true },
    { title: "Pesanan Diterima", description: "Anda harus melakukan konfirmasi terima barang.", isCompleted: false, isActive: false },
    { title: "Dana Diteruskan", description: "Sistem Escrow mencairkan dana ke penjual.", isCompleted: false, isActive: false },
  ];

  const getIcon = (idx: number, isCompleted: boolean, isActive: boolean) => {
    if (isCompleted) return <Check className="w-4 h-4 text-background" />;
    if (idx === 1) return <Package className="w-4 h-4 text-muted-foreground" />;
    if (idx === 2) return <Truck className="w-4 h-4 text-background" />;
    if (idx === 3) return <Check className="w-4 h-4 text-muted-foreground" />;
    if (idx === 4) return <Wallet className="w-4 h-4 text-muted-foreground" />;
    return <Clock className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="flex flex-col">
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex gap-6 pb-8 last:pb-0">
          {/* Vertical Line */}
          {idx !== steps.length - 1 && (
            <div className={cn(
              "absolute left-4 top-10 bottom-0 w-px -ml-px",
              step.isCompleted ? "bg-foreground" : "bg-border border-dashed"
            )} />
          )}

          {/* Indicator Node */}
          <div className="relative shrink-0 w-8 h-8 flex items-center justify-center rounded-full mt-1 outline outline-4 outline-background z-10 transition-colors">
            <div className={cn(
              "w-full h-full flex items-center justify-center rounded-full border transition-all duration-300",
              step.isCompleted ? "bg-foreground border-foreground text-background" : 
              step.isActive ? "bg-foreground border-foreground text-background shadow-[0_0_0_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.1)] animate-pulse" : 
              "bg-surface-container border-border/50"
            )}>
              {getIcon(idx, step.isCompleted, step.isActive)}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col">
            <h4 className={cn("font-bold text-base", step.isActive || step.isCompleted ? "text-foreground" : "text-muted-foreground")}>
              {step.title}
            </h4>
            <p className={cn("mt-1 text-sm leading-relaxed", step.isActive ? "text-foreground font-medium" : "text-muted-foreground")}>
              {step.description}
            </p>
            {step.date && (
              <span className="text-xs text-muted-foreground font-medium mt-1.5 inline-flex items-center gap-1.5 bg-surface-container w-max px-2 py-1 rounded-md">
                <Clock className="w-3 h-3" />
                {step.date}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
