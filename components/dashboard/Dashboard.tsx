
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import DashboardContent from "./DashboardContent";

export function Dashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />

      <div className="flex flex-col">
        <TopNav />
        <DashboardContent />
      </div>
    </div>
  );
}
