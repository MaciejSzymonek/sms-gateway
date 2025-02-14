import React from "react";

interface TableNavProps {
  onUserClick: () => void;
  onCustomerClick: () => void;
  onTokenClick: () => void;
}

const TableNav: React.FC<TableNavProps> = ({
  onUserClick,
  onCustomerClick,
  onTokenClick,
}) => {
  const cards = [
    { title: "Users", color: "bg-blue-500", onClick: onUserClick },
    { title: "Customers", color: "bg-green-500", onClick: onCustomerClick },
    { title: "Tokens", color: "bg-purple-500", onClick: onTokenClick },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {cards.map((card, index) => (
        <button
          key={index}
          onClick={card.onClick}
          className={`flex-1 ${card.color} flex items-center justify-center text-white text-2xl font-semibold p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 hover:shadow-xl`}
        >
          {card.title}
        </button>
      ))}
    </div>
  );
};

export default TableNav;
