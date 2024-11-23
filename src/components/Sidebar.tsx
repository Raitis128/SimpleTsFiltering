import { useState } from "react";

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setSidebarVisible(!isSidebarVisible)}
        className="md:hidden p-2 fixed top-2 left-4 z-50 bg-gray-800 text-white rounded"
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 border-r border-gray-700 p-4 flex flex-col items-center space-y-8 z-40 transition-transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-16`}
      >
        <div className="text-white mt-14">Logo</div>
        <div className="text-gray-400">📁</div>
        <div className="text-gray-400">🧑‍💼</div>
        <div className="text-gray-400">⚙️</div>
      </div>
    </>
  );
};

export default Sidebar;
