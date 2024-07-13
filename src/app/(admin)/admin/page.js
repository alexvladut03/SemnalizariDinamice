import DashboardCardBig from "@/components/admin/dashboard/DashboardCardBig";
import DashboardCardSmall from "@/components/admin/dashboard/DashboardCardSmall";

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
