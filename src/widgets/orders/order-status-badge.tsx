import React from "react";

interface OrderStatusBadgeProps {
  status: string;
  className?: string;
}

export const getOrderStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending_payment":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20";
    case "paid":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20";
    case "processing":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-500 border border-purple-500/20";
    case "shipped":
      return "bg-sky-500/10 text-sky-600 dark:text-sky-500 border border-sky-500/20";
    case "delivered":
      return "bg-teal-500/10 text-teal-600 dark:text-teal-500 border border-teal-500/20";
    case "completed":
      return "bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20";
    case "cancelled":
    case "failed":
    case "refunded":
      return "bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/20";
    default:
      return "bg-surface-container text-muted-foreground border border-border";
  }
};

export function OrderStatusBadge({ status, className = "" }: OrderStatusBadgeProps) {
  const style = getOrderStatusStyle(status);
  const formattedStatus = status.replace(/_/g, " ");

  return (
    <span className={`px-2.5 py-1 font-bold rounded-md text-xs uppercase ${style} ${className}`}>
      {formattedStatus}
    </span>
  );
}
