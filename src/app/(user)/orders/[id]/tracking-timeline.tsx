/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { shipmentService } from "@/services";
import { CheckCircle2, Clock } from "lucide-react";

export function TrackingTimeline({ shipmentId }: { shipmentId: string }) {
  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await shipmentService.track(shipmentId);
        if (res.status && res.data) {
          setTracking(res.data);
        } else {
          setTracking(null);
        }
      } catch (e) {
        console.error("Failed to fetch tracking data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [shipmentId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-16 bg-muted rounded w-full"></div>
      </div>
    );
  }

  if (!tracking) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Data pelacakan belum tersedia. Silakan cek kembali beberapa saat lagi.
      </p>
    );
  }

  const { summary, manifest } = tracking;

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-foreground/5 rounded-xl border border-border">
        <div>
          <p className="text-xs text-muted-foreground uppercase">Status</p>
          <p className="font-bold">{summary?.status || "On Process"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase">Pengirim</p>
          <p className="font-medium">{summary?.shipper_name || "-"}</p>
          <p className="text-sm text-muted-foreground">{summary?.origin || "-"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase">Penerima</p>
          <p className="font-medium">{summary?.receiver_name || "-"}</p>
          <p className="text-sm text-muted-foreground">{summary?.destination || "-"}</p>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 border-l-2 border-border ml-3">
        {manifest && manifest.length > 0 ? (
          manifest.map((item: any, idx: number) => {
            const isLatest = idx === 0;
            return (
              <div key={idx} className="relative">
                <div className={`absolute -left-[35px] rounded-full p-1 border-2 border-background ${isLatest ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {item.manifest_code === "DELIVERED" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <p className={`text-sm ${isLatest ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'}`}>
                    {item.manifest_description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.manifest_date} {item.manifest_time} • {item.city_name}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground">Belum ada riwayat pergerakan.</p>
        )}
      </div>
    </div>
  );
}
