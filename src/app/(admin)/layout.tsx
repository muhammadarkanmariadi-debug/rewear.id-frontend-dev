export default function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground p-4 shadow">
        <h1 className="text-xl font-bold">Admin Panel - rewear.id</h1>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
