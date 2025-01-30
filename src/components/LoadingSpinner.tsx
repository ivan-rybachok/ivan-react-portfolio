import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#F7AB0A]/20 border-t-[#F7AB0A] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
