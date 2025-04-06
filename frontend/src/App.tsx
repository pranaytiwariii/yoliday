import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import MobileNav from "./components/MobileNav.tsx";
import type { Project } from "./types";
import { getProjects, addToCart, getCart } from "./services/api";

const MOCK_USER = {
  name: "Lorem Ips",
  role: "Manager",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

// Mock projects for initial render
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Kemampuan Merangkum Tulisan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus ea tempus.Lorem ipsum dolor sit amet consectetur...",
    category: "BAHASA SUNDA",
    author: "Doni Al-Bajaj Samson",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
  },
  {
    id: "2",
    title: "Kemampuan Merangkum Tulisan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus ea tempus.Lorem ipsum dolor sit amet consectetur...",
    category: "BAHASA SUNDA",
    author: "Doni Al-Bajaj Samson",
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "3",
    title: "Kemampuan Merangkum Tulisan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus ea tempus.Lorem ipsum dolor sit amet consectetur...",
    category: "BAHASA SUNDA",
    author: "Doni Al-Bajaj Samson",
    imageUrl:
      "https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
];

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects(pagination.page, pagination.limit);

        // Transform the data to match our frontend Project type
        const transformedProjects = data.projects.map((project: any) => ({
          id: project.id.toString(),
          title: project.title,
          description: project.description,
          category: project.category,
          author: project.author,
          imageUrl: project.image_url,
        }));

        setProjects(transformedProjects);
        setPagination({
          ...pagination,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
        });
        setDbConnected(true);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects. Using mock data instead.");
        setProjects(MOCK_PROJECTS);
        setDbConnected(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [pagination.page, pagination.limit]);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Using a mock user ID of 1 for now
        const cartItems = await getCart(1);

        // Transform the data to match our frontend Project type
        const transformedCartItems = cartItems.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          category: item.category,
          author: item.author,
          imageUrl: item.image_url,
        }));

        setCart(transformedCartItems);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
        // Don't set error here as it's not critical
      }
    };

    if (dbConnected) {
      fetchCart();
    }
  }, [dbConnected]);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = async (project: Project) => {
    try {
      if (dbConnected) {
        // Using a mock user ID of 1 for now
        await addToCart(project.id, 1);
      }

      // Update local cart state
      if (!cart.find((p) => p.id === project.id)) {
        setCart([...cart, project]);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="">
          <Navbar user={MOCK_USER} onSearch={setSearchQuery} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {loading && (
              <div className="text-center py-4">Loading projects...</div>
            )}

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onAddToCart={handleAddToCart}
                  isMobile={window.innerWidth < 768}
                />
              ))}
            </div>

            {dbConnected && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                  disabled={pagination.page === 1}
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page - 1 })
                  }
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page + 1 })
                  }
                >
                  Next
                </button>
              </div>
            )}
            {!dbConnected && (
              <div className="bg-gray-100 text-gray-500 text-sm p-2 rounded mb-4 text-center">
                SQL database not connected. Please configure database
                connection.
              </div>
            )}
          </div>
        </main>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}

export default App;
