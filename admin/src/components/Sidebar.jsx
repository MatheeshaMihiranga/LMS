import React from 'react';
import { FaPlus, FaList, FaBox, FaUserFriends, FaUsers, FaTags, FaStore } from 'react-icons/fa'; // Icons for sidebar items

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg rounded-lg p-6 bg-opacity-60 backdrop-blur-lg border border-gray-200">
            {/* Sidebar Items */}
            <ul className="space-y-6">
                
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaList className="text-gray-700" />
                    <a href="/educator-requests" className="text-gray-800 font-semibold text-base">Educator Requests</a>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaUsers className="text-gray-700" />
                    <a href="/all-educators" className="text-gray-800 font-semibold text-base">All Educators</a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
