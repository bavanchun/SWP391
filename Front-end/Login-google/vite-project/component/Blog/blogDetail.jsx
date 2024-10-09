import React, { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const BlogDetails = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const blogPost = {
    title: "The Future of Artificial Intelligence in Healthcare",
    author: "Dr. Jane Smith",
    date: "May 15, 2023",
    introduction:
      "Artificial Intelligence is revolutionizing the healthcare industry, promising to improve patient outcomes and streamline medical processes. This article explores the potential impact and challenges of AI in healthcare.",
    content: [
      {
        type: "paragraph",
        text: "The integration of Artificial Intelligence (AI) in healthcare is not just a futuristic concept anymore; it's a present reality that's rapidly evolving. From diagnostics to treatment plans, AI is making its mark across various domains of healthcare.",
      },
      {
        type: "heading",
        text: "Diagnostics and Imaging",
      },
      {
        type: "paragraph",
        text: "One of the most promising applications of AI in healthcare is in the field of diagnostics and medical imaging. AI algorithms can analyze medical images such as X-rays, MRIs, and CT scans with remarkable accuracy, often detecting abnormalities that might be overlooked by human eyes.",
      },
      {
        type: "list",
        items: [
          "Early detection of diseases",
          "Reduction in diagnostic errors",
          "Faster analysis of medical images",
          "Support for radiologists in high-volume environments",
        ],
      },
      {
        type: "heading",
        text: "Personalized Treatment Plans",
      },
      {
        type: "paragraph",
        text: "AI can analyze vast amounts of patient data, including genetic information, lifestyle factors, and medical history, to develop personalized treatment plans. This approach, known as precision medicine, can significantly improve patient outcomes by tailoring treatments to individual needs.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 transition-opacity duration-1000 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={blogPost.image}
            alt="AI in Healthcare"
            className="w-full h-64 object-cover object-center transition-transform duration-300 transform hover:scale-105"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              {blogPost.title}
            </h1>
            <div className="flex items-center mb-4 text-gray-600">
              <FaUser className="mr-2" />
              <span className="mr-4">{blogPost.author}</span>
              <FaCalendarAlt className="mr-2" />
              <span>{blogPost.date}</span>
            </div>
            <p className="text-gray-700 mb-6">{blogPost.introduction}</p>
            <div className="prose max-w-none">
              {blogPost.content.map((item, index) => {
                switch (item.type) {
                  case "paragraph":
                    return (
                      <p key={index} className="mb-4">
                        {item.text}
                      </p>
                    );
                  case "heading":
                    return (
                      <h2
                        key={index}
                        className="text-2xl font-semibold mt-6 mb-4"
                      >
                        {item.text}
                      </h2>
                    );
                  case "list":
                    return (
                      <ul key={index} className="list-disc pl-5 mb-4">
                        {item.items.map((listItem, listIndex) => (
                          <li key={listIndex} className="mb-2">
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
