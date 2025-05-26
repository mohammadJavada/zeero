import React, { useState } from "react";
import {
  FiCompass,
  FiSettings,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { MdOutlineMedicalInformation } from "react-icons/md";

const CollapsibleSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navItems = [
    { icon: <GrProjects size={20} />, title: "پروژه ها", href: "/projects" },
    { icon: <FiFileText size={20} />, title: "گزارش ها", href: "/explore" },
    {
      icon: <MdOutlineMedicalInformation size={20} />,
      title: "مشکلات",
      href: "/docs",
    },
    { icon: <FiSettings size={20} />, title: "تنظیمات", href: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-4 flex items-center justify-center  transition-colors"
        >
          {isCollapsed ? (
            <FiChevronRight size={20} />
          ) : (
            <FiChevronLeft size={20} />
          )}
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 p-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors gap-3 ${
                    isCollapsed ? "justify-center" : "justify-start"
                  }`}
                >
                  <span className="text-gray-200">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis text-white">
                      {item.title}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CollapsibleSidebar;
