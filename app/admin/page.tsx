"use client";

import { useAuth } from "@/hooks/AuthContext";
import Overview from "@/components/Overview";
import AdminOverview from "@/components/AdminOverview";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <div className="p-4">
        <Overview />
      </div>
    );
  }

  return (
    <div className="p-4">
      <AdminOverview />
    </div>
  );
};

export default AdminDashboard;
