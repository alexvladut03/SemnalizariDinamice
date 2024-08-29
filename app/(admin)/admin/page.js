import { FaRegMoneyBillAlt, FaUserTie } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { IoBagHandle } from "react-icons/io5";
import DashboardCardSmall from "../_components/DashboardCardSmall";
import DashboardCardBig from "../_components/DashboardCardBig";

const AdminDashboard = () => {
  const cardsSmall = [
    {
      icon: IoBagHandle,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
      title: "Total Produse Vandute",
      value: "27",
      change: "2",
      changeType: "increase",
    },
    {
      icon: FaRegMoneyBillAlt,
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      title: "Bani Primiti",
      value: "3200 RON",
      change: "12",
      changeType: "increase",
    },
    {
      icon: FaUserTie,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      title: "Vizitatori pe site",
      value: "1500",
      change: "52",
      changeType: "increase",
    },
    {
      icon: GrCart,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500",
      title: "Total comenzi",
      value: "28",
      change: "5",
      changeType: "decrease",
    },
  ];
  return (
    <section className="flex flex-col flex-1 ">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {cardsSmall.map((card, index) => (
            <DashboardCardSmall
              key={index}
              icon={card.icon}
              bgColor={card.bgColor}
              iconColor={card.iconColor}
              title={card.title}
              value={card.value}
              change={card.change}
              changeType={card.changeType}
            />
          ))}
        </div>
        <DashboardCardBig />
      </div>
    </section>
  );
};

export default AdminDashboard;
