export default function CheckoutLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div>
        <div className="h-8 bg-surface-container rounded-lg w-1/3 mb-2" />
        <div className="h-4 bg-surface-container rounded-lg w-1/2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="h-6 bg-surface-container rounded-lg w-1/4 mb-4" />
            <div className="space-y-4">
              <div className="h-10 bg-surface-container rounded-xl w-full" />
              <div className="h-24 bg-surface-container rounded-xl w-full" />
              <div className="h-10 bg-surface-container rounded-xl w-full" />
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="bg-card border border-border rounded-2xl p-6 h-fit space-y-6">
          <div className="h-6 bg-surface-container rounded-lg w-1/2 mb-4" />
          
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-surface-container rounded-xl shrink-0" />
            <div className="space-y-2 w-full">
              <div className="h-4 bg-surface-container rounded w-full" />
              <div className="h-3 bg-surface-container rounded w-1/2" />
              <div className="h-4 bg-surface-container rounded w-1/3" />
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex justify-between">
              <div className="h-4 bg-surface-container rounded w-1/3" />
              <div className="h-4 bg-surface-container rounded w-1/4" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-surface-container rounded w-1/3" />
              <div className="h-4 bg-surface-container rounded w-1/4" />
            </div>
            <div className="pt-3 border-t border-border flex justify-between">
              <div className="h-5 bg-surface-container rounded w-1/3" />
              <div className="h-5 bg-surface-container rounded w-1/3" />
            </div>
          </div>

          <div className="h-12 bg-surface-container rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}
