// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import logo from "../../public/logo.webp";
// import { Link } from "react-router-dom";
// import { FaDiscourse } from "react-icons/fa";
// import { FaDownload } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { HiMenu, HiX } from "react-icons/hi"; // ADD: For sidebar toggle icons
// import { RiHome2Fill } from "react-icons/ri"; // ADD: For Home icon
// import { IoMdSettings } from "react-icons/io"; // ADD: For Settings icon
// import { IoLogIn, IoLogOut } from "react-icons/io5"; // ADD: For Login/Logout icons
// import { FiSearch } from "react-icons/fi"; // ADD: For search icon
// import { FaCircleUser } from "react-icons/fa6"; // ADD: For user avatar
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ADD: Sidebar state

//   console.log("Courses :", courses);

//   useEffect(() => {
//     const token = localStorage.getItem("user");
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchCourses = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:4001/api/v1/course/courses",   //
//       { withCredentials: true }
//     );
//     console.log("Fetched courses:", response.data.courses);
//     setCourses(response.data.courses);
//   } catch (error) {
//     console.log("error in fetchCourse is: ", error);
//   } finally {
//     setLoading(false);
//   }
// };

//     fetchCourses();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4001/api/v1/user/logout",      ///
//         { withCredentials: true }
//       );
//       toast.success(response.data.message);
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.log("Error in logging out ", error);
//       toast.error(error.response?.data?.errors || "Error in logging out ");
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex">
//       {/* Hamburger menu button for mobile */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
//         onClick={toggleSidebar}
//       >
//         {isSidebarOpen ? <HiX /> : <HiMenu />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:static`}
//       >
//         <div className="flex items-center mb-10 mt-10 md:mt-0">
//           <img src={logo} alt="Profile" className="rounded-full h-12 w-12" />
//         </div>
//         <nav>
//           <ul>
//             <li className="mb-4">
//               <a href="/" className="flex items-center">
//                 <RiHome2Fill className="mr-2" /> Home
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="flex items-center text-blue-500">
//                 <FaDiscourse className="mr-2" /> Courses
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="/purchases" className="flex items-center">
//                 <FaDownload className="mr-2" /> Purchases
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="flex items-center">
//                 <IoMdSettings className="mr-2" /> Settings
//               </a>
//             </li>
//             <li>
//               {isLoggedIn ? (
//                 <Link
//                   to={"/"}
//                   className="flex items-center"
//                   onClick={handleLogout}
//                 >
//                   <IoLogOut className="mr-2" /> Logout
//                 </Link>
//               ) : (
//                 <Link to={"/login"} className="flex items-center">
//                   <IoLogIn className="mr-2" /> Login
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="ml-0 md:ml-64 w-full bg-white p-10">
//         <header className="flex justify-between items-center mb-10">
//           <h1 className="text-xl font-bold">Courses</h1>
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type here to search..."
//                 className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
//               />
//               <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
//                 <FiSearch className="text-xl text-gray-600" />
//               </button>
//             </div>
//             <FaCircleUser className="text-4xl text-blue-600" />
//           </div>
//         </header>

//         {/* Vertically Scrollable Courses Section */}
//         <div className="overflow-y-auto h-[75vh]">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : courses.length === 0 ? (
//             <p className="text-center text-gray-500">
//               No course posted yet by admin
//             </p>
//           ) : (
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="border border-gray-200 rounded-lg p-4 shadow-sm"
//                 >
//                   <img
//                     src={course.image.url}
//                     alt={course.title}
//                     className="rounded mb-4"
//                   />
//                   <h2 className="font-bold text-lg mb-2">{course.title}</h2>
//                   <p className="text-gray-600 mb-4">
//                     {course.description.length > 100
//                       ? `${course.description.slice(0, 100)}...`
//                       : course.description}
//                   </p>
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="font-bold text-xl">
//                       ₹{course.price}{" "}
//                       <span className="text-gray-500 line-through">5999</span>
//                     </span>
//                     <span className="text-green-600">20% off</span>
//                   </div>
//                   <Link
//                     to={`/buy/${course._id}`}
//                     className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
//                   >
//                     Buy Now
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Courses;



//   "http://localhost:4001/api/v1/course/courses"
//   "http://localhost:4001/api/v1/user/logout"



import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API call
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi"; // Import menu and close icons
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

  console.log("courses: ", courses);

  // Check token
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/course/courses", {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  // Toggle sidebar for mobile devices
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger menu button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />} {/* Toggle menu icon */}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src={logo} alt="Profile" className="rounded-full h-12 w-12" />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <FaDiscourse className="mr-2" /> Courses
              </a>
            </li>
            <li className="mb-4">
              <a href="/purchases" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to={"/"}
                  
                  className="flex items-center"
                  onClick={handleLogout}
                >
                  <IoLogOut className="mr-2" /> Logout
                </Link>
              ) : (
                <Link to={"/login"} className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-0 md:ml-64 w-full bg-white p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">Courses</h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type here to search..."
                className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
              />
              <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
                <FiSearch className="text-xl text-gray-600" />
              </button>
            </div>

            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>

        {/* Vertically Scrollable Courses Section */}
        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            // Check if courses array is empty
            <p className="text-center text-gray-500">
              No course posted yet by admin
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="rounded mb-4"
                  />
                  <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl">
                      ₹{course.price}{" "}
                      <span className="text-gray-500 line-through">5999</span>
                    </span>
                    <span className="text-green-600">20% off</span>
                  </div>

                  {/* Buy page */}
                  <Link
                    to={`/buy/${course._id}`} // Pass courseId in URL
                    className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;