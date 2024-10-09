import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNewsManagement = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("all");
  const [errors, setErrors] = useState({});

  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch news data from API
    // This is a placeholder. Replace with actual API call
    const fetchedNews = [
      {
        id: 1,
        title: "Breaking News",
        content: "This is breaking news content",
        category: "World",
        date: "2023-06-15",
      },
      {
        id: 2,
        title: "Tech Update",
        content: "Latest in technology",
        category: "Technology",
        date: "2023-06-14",
      },
      // Add more dummy data here
    ];
    setNews(fetchedNews);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit news post
      // This is a placeholder. Replace with actual API call
      console.log({ title, content, category, image });
      toast.success("News post submitted successfully!");
      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log("Edit news with id:", id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log("Delete news with id:", id);
  };

  const handleView = (id) => {
    // Implement view functionality
    console.log("View news with id:", id);
  };

  const filteredNews = news
    .filter(
      (item) => filterCategory === "all" || item.category === filterCategory
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return a.title.localeCompare(b.title);
    });

  const pageCount = Math.ceil(filteredNews.length / itemsPerPage);
  const displayedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin News Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Post News</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                aria-invalid={errors.title ? "true" : "false"}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <p id="title-error" className="text-red-500 text-sm mt-1">
                  {errors.title}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="content" className="block mb-1">
                Content
              </label>
              <ReactQuill
                value={content}
                onChange={setContent}
                className="h-48 mb-2"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
              <p className="text-sm text-gray-500">
                Character count: {content.length}
              </p>
            </div>
            <div>
              <label htmlFor="category" className="block mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                aria-invalid={errors.category ? "true" : "false"}
                aria-describedby={
                  errors.category ? "category-error" : undefined
                }
              >
                <option value="">Select a category</option>
                <option value="World">World</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              {errors.category && (
                <p id="category-error" className="text-red-500 text-sm mt-1">
                  {errors.category}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block mb-1">
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
                aria-invalid={errors.image ? "true" : "false"}
                aria-describedby={errors.image ? "image-error" : undefined}
              />
              {errors.image && (
                <p id="image-error" className="text-red-500 text-sm mt-1">
                  {errors.image}
                </p>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 max-w-full h-auto"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit News
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">News List</h2>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <label htmlFor="sort" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 border rounded-md"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
            </div>
            <div>
              <label htmlFor="filter" className="mr-2">
                Filter by category:
              </label>
              <select
                id="filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-2 py-1 border rounded-md"
              >
                <option value="all">All</option>
                <option value="World">World</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            {displayedNews.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.category}</p>
                <p className="text-sm text-gray-500 mb-4">{item.date}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-500 hover:text-blue-600"
                    aria-label={`Edit ${item.title}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-600"
                    aria-label={`Delete ${item.title}`}
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => handleView(item.id)}
                    className="text-green-500 hover:text-green-600"
                    aria-label={`View ${item.title}`}
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AdminNewsManagement;
