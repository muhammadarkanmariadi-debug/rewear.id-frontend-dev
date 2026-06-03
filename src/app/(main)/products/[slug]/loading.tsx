import { ArrowLeft } from "lucide-react";

export default function ProductDetailLoading() {
  return (
    <div className="mx-auto px-4 md:px-6 py-6 md:py-10 max-w-7xl container animate-pulse">
      <div className="inline-flex items-center gap-2 mb-6 text-muted-foreground/50 text-sm">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Katalog
      </div>

      <div className="gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          <div className="w-full aspect-[3/4] md:aspect-square bg-surface-container rounded-3xl" />

          {/* Mobile Title */}
          <div className="lg:hidden space-y-4">
            <div className="h-8 bg-surface-container rounded-lg w-3/4" />
            <div className="h-6 bg-surface-container rounded-lg w-1/3" />
          </div>

          <div className="pt-8 border-border border-t">
            <div className="h-6 bg-surface-container rounded-lg w-40 mb-4" />
            <div className="gap-y-4 grid grid-cols-2 bg-surface-container-low mb-8 p-5 border border-border/50 rounded-xl">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-surface-container rounded w-16" />
                  <div className="h-4 bg-surface-container rounded w-24" />
                </div>
              ))}
            </div>

            <div className="h-6 bg-surface-container rounded-lg w-48 mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-surface-container rounded w-full" />
              <div className="h-4 bg-surface-container rounded w-full" />
              <div className="h-4 bg-surface-container rounded w-5/6" />
              <div className="h-4 bg-surface-container rounded w-4/6" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative lg:col-span-5">
          <div className="top-28 sticky flex flex-col gap-6">
            <div className="bg-card shadow-sm p-6 border border-border rounded-2xl">
              <div className="hidden lg:block mb-4 space-y-3">
                <div className="h-8 bg-surface-container rounded-lg w-5/6" />
                <div className="h-10 bg-surface-container rounded-lg w-1/2" />
              </div>

              <div className="h-24 bg-surface-container rounded-xl mb-6" />

              <div className="flex flex-col gap-3">
                <div className="h-12 bg-surface-container rounded-xl w-full" />
                <div className="flex gap-3">
                  <div className="h-12 bg-surface-container rounded-xl w-12" />
                  <div className="h-12 bg-surface-container rounded-xl w-12" />
                </div>
              </div>
            </div>

            <div className="h-28 bg-surface-container rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
