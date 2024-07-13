import DashboardCardBig from "@/components/admin/dashboard/dashboardCardBig";
import DashboardCardSmall from "@/components/admin/dashboard/dashboardCardSmall";

const AdminDashboard = () => {
  return (
    <section className="flex flex-col flex-1 ">
      <div className="p-4">
        <DashboardCardSmall />
        <DashboardCardBig />
      </div>
    </section>
  );
};

export default AdminDashboard;
