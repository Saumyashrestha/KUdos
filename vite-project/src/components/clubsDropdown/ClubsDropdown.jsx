import React, { useState } from 'react';

const options = ['KUCC','KUCEC','KUCMC','GES','AMES','SEEE','KUARC']

const ClubsDropdown = ({onSelectClub}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectClub(option);
   
  };

  return (
    <div className="relative inline-block">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold border border-gray-300 rounded-md hover:bg-gray-300"
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption : "Select your club"}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClubsDropdown;
