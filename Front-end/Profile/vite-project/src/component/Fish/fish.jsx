import React, { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FishList = () => {
  const [selectedFish, setSelectedFish] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const fishPerPage = 3;

  const fishData = [
    {
      id: 1,
      name: "Clownfish",
      image:
        "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description:
        "Small, colorful reef fish known for its symbiotic relationship with sea anemones.",
      habitat: "Coral reefs in the Indo-Pacific",
      diet: "Omnivorous, feeding on algae and small invertebrates",
      size: "Up to 4 inches",
      funFact: "Made famous by the movie 'Finding Nemo'",
    },
    {
      id: 2,
      name: "Blue Tang",
      image:
        "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description:
        "Vibrant blue fish with a yellow tail, popular in marine aquariums.",
      habitat: "Coral reefs in the Indo-Pacific",
      diet: "Herbivorous, primarily feeding on algae",
      size: "Up to 12 inches",
      funFact: "Can produce a toxic secretion when stressed",
    },
    {
      id: 3,
      name: "Great White Shark",
      image:
        "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description:
        "Large predatory shark known for its size and powerful jaws.",
      habitat: "Coastal and offshore waters worldwide",
      diet: "Carnivorous, feeding on fish, seals, and other marine mammals",
      size: "Up to 20 feet",
      funFact: "Can detect a drop of blood in 25 gallons of water",
    },
    {
      id: 4,
      name: "Angelfish",
      image:
        "https://images.unsplash.com/photo-1535438412612-4a7c58f0d39c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Colorful freshwater fish with distinctive flat bodies.",
      habitat: "Amazon Basin and other South American rivers",
      diet: "Omnivorous, feeding on small invertebrates and plants",
      size: "Up to 6 inches",
      funFact: "Known for their aggressive territorial behavior",
    },
    {
      id: 5,
      name: "Lionfish",
      image:
        "https://images.unsplash.com/photo-1621908784643-f3ec4eb9e988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Venomous marine fish with distinctive zebra-like stripes.",
      habitat: "Indo-Pacific coral reefs and rocky reefs",
      diet: "Carnivorous, preying on small fish and crustaceans",
      size: "Up to 15 inches",
      funFact: "Invasive species in the Atlantic Ocean and Caribbean Sea",
    },
  ];

  const indexOfLastFish = currentPage * fishPerPage;
  const indexOfFirstFish = indexOfLastFish - fishPerPage;
  const currentFish = fishData.slice(indexOfFirstFish, indexOfLastFish);

  const openModal = (fish) => {
    setSelectedFish(fish);
  };

  const closeModal = () => {
    setSelectedFish(null);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(fishData.length / fishPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Fish Species</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFish.map((fish) => (
          <div
            key={fish.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => openModal(fish)}
          >
            <img
              src={fish.image}
              alt={fish.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{fish.name}</h2>
              <p className="text-gray-600">{fish.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          <FaChevronLeft className="inline mr-2" /> Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(fishData.length / fishPerPage)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next <FaChevronRight className="inline ml-2" />
        </button>
      </div>

      {selectedFish && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-lg p-6 max-w-2xl w-full animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedFish.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <img
              src={selectedFish.image}
              alt={selectedFish.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2">
              <p>
                <strong>Habitat:</strong> {selectedFish.habitat}
              </p>
              <p>
                <strong>Diet:</strong> {selectedFish.diet}
              </p>
              <p>
                <strong>Size:</strong> {selectedFish.size}
              </p>
              <p>
                <strong>Fun Fact:</strong> {selectedFish.funFact}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FishList;
