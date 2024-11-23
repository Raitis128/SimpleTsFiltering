import Sidebar from "./Sidebar";
import Table from "./Table";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-900 overflow-auto">
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
