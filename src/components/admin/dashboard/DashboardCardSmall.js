import React from "react";

const DashboardCardSmall = ({
  icon: Icon,
  bgColor,
  iconColor,
  title,
  value,
  change,
  changeType,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg flex items-center">
      <div
        className={`${bgColor} ${iconColor} rounded-lg p-2 w-12 h-12 flex-shrink-0`}
      >
        <Icon className="w-full h-full" />
      </div>
      <div className="ml-4">
        <div>{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div
          className={
            changeType === "increase" ? "text-green-500" : "text-red-500"
          }
        >
          {changeType === "increase" ? `A crescut` : `A scazut`} cu {change}%
          față de luna trecută
        </div>
      </div>
    </div>
  );
};

export default DashboardCardSmall;
