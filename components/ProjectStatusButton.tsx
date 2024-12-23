import React from 'react';

const ProjectStatusButton = ({ paid }: { paid: number }) => {
  const getStatusConfig = (paidStatus: number): {
    bgColor: string;
    text: string;
  } => {
    switch (paidStatus) {
      case 1:
        return {
          bgColor: "bg-red-200",
          text: "Pay 10%"
        };
      case 2:
        return {
          bgColor: "bg-orange-200",
          text: "Pay 90%!"
        };
      case 3:
        return {
          bgColor: "bg-green-200",
          text: "Approved!"
        };
      default:
        return {
          bgColor: "bg-gray-200",
          text: "N/A"
        };
    }
  };

  const config = getStatusConfig(paid);

  return (
    <div 
      className={`
        ${config}
        px-2 
        py-2 
        font-semibold 
        text-sm 
        rounded-md 
        shadow-md 
        cursor-pointer
        transition-all 
        duration-300
        hover:opacity-80
      `}
    >
      {config.text}
    </div>
  );
};

export default ProjectStatusButton;