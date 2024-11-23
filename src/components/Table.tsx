import { useState } from "react";
import { data } from "../utils/data";
import { BiSort } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdSort } from "react-icons/md";

type Project = {
  client: string;
  country: string;
  email: string;
  project: string;
  progress: string;
  status: string;
  date: string;
  image: string;
};

const Table = () => {
  const [projects, setProjects] = useState(data);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Project;
    order: string;
  } | null>(null);

  const [filters, setFilters] = useState({
    name: "",
    country: "",
    email: "",
    project: "",
    progress: "",
    status: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const sortProjects = (key: keyof Project) => {
    const sortedProjects = [...projects];

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.order === "ascending"
    ) {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      setSortConfig({ key, order: "descending" });
    } else {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({ key, order: "ascending" });
    }
    setProjects(sortedProjects);
  };

  const handleSortOptionClick = (key: keyof Project) => {
    sortProjects(key);
    setDropdownVisible(false);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearchQuery =
      searchQuery === "" ||
      Object.values(project).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilters =
      (filters.name === "" ||
        project.client.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.country === "" ||
        project.country
          .toLowerCase()
          .includes(filters.country.toLowerCase())) &&
      (filters.email === "" ||
        project.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.project === "" ||
        project.project
          .toLowerCase()
          .includes(filters.project.toLowerCase())) &&
      (filters.status === "" ||
        project.status.toLowerCase().includes(filters.status.toLowerCase()));

    return matchesSearchQuery && matchesFilters;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 md:w-[93%] mx-auto">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center mb-5 space-y-4 md:space-y-0 mt-12">
        {/* Sort Button */}
        <div className="relative">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="border border-gray-700 flex justify-center items-center text-white p-2 rounded w-full md:w-auto"
          >
            <BiSort className="mr-[0.3rem]" /> Sort
            <AiOutlineDown className="ml-2" />
          </button>
          {dropdownVisible && (
            <div className="absolute top-full left-0 z-50 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
              <button
                onClick={() => handleSortOptionClick("client")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Name
              </button>
              <button
                onClick={() => handleSortOptionClick("country")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Country
              </button>
              <button
                onClick={() => handleSortOptionClick("date")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Date
              </button>
            </div>
          )}
        </div>

        {/* Filter Button */}
        <div className="relative md:ml-4 w-full">
          <button
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="border border-gray-700 flex items-center justify-center text-white p-2 rounded w-full md:w-auto"
          >
            <MdSort className="mr-[0.3rem]" /> Filters
            <AiOutlineDown className="ml-2" />
          </button>
          {filtersVisible && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg p-4">
              <div className="mb-2">
                <label className="text-white">Filter By Name:</label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full mt-1"
                />
              </div>
              <div className="mb-2">
                <label className="text-white">Filter By Country:</label>
                <input
                  type="text"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full mt-1"
                />
              </div>
              <div className="mb-2">
                <label className="text-white">Filter By Email:</label>
                <input
                  type="text"
                  name="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full mt-1"
                />
              </div>
              <div className="mb-2">
                <label className="text-white">Filter By Project:</label>
                <input
                  type="text"
                  name="project"
                  value={filters.project}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full mt-1"
                />
              </div>
              <div className="mb-2">
                <label className="text-white">Filter By Status:</label>
                <input
                  type="text"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full mt-1"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded border border-gray-700 text-white">
          <thead>
            <tr>
              <th className="px-5 py-3 text-left">Image</th>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Country</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Project</th>
              <th className="px-5 py-3 text-left">Task Progress</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map(
              (
                { image, client, country, email, project, status, date },
                index
              ) => (
                <tr className="border border-gray-700" key={index}>
                  <td className="px-4 py-2">
                    <img
                      src={image}
                      alt={client}
                      className="w-[3rem] h-[3rem] object-cover rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{client}</td>
                  <td className="px-4 py-2">{country}</td>
                  <td className="px-4 py-2">{email}</td>
                  <td className="px-4 py-2">{project}</td>
                  <td className="px-4 py-2">
                    <div className="w-24 h-2 bg-gray-800 rounded">
                      <div className="bg-green-500 h-full rounded" />
                    </div>
                  </td>
                  <td className="px-4 py-2">{status}</td>
                  <td className="px-4 py-2">{date}</td>
                  <td className="px-4 py-2">
                    <BsThreeDots />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-gray-800 text-white" : "text-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
