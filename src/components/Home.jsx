import React, { useEffect, useState } from "react";
import CustomPieChart from "./CustomPieChart";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserCount, setSelectedUserCount] = useState(100);
  const selectedCountries = ["US", "IN", "CA", "NZ"];

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${selectedUserCount}`)
      .then((response) => response.json())
      .then((data) => setUserData(data.results));
  }, [selectedUserCount]);

  const calculateGenderData = () => {
    const maleCount = userData.filter((user) => user.gender === "male").length;
    const femaleCount = userData.filter(
      (user) => user.gender === "female"
    ).length;
    const othersCount = userData.length - (maleCount + femaleCount);
    const totalUsers = userData.length;

    return {
      labels: ["Male", "Female", "Others"],
      data: [maleCount, femaleCount],
      details: {
        totalUsers,
        male: maleCount,
        female: femaleCount,
        others: othersCount,
      },
    };
  };

  const calculateNationalityData = () => {
    const selectedUserData = userData.slice(0, selectedUserCount);

    const nationalityCounts = {
      US: 0,
      IN: 0,
      CA: 0,
      NZ: 0,
      Others: 0,
    };

    selectedUserData.forEach((user) => {
      if (selectedCountries.includes(user.nat)) {
        nationalityCounts[user.nat]++;
      } else {
        nationalityCounts.Others++;
      }
    });

    const totalUsers = selectedUserData.length;

    return {
      labels: ["US", "Indian", "CA", "NZ", "Others"],
      data: [
        nationalityCounts.US,
        nationalityCounts.IN,
        nationalityCounts.CA,
        nationalityCounts.NZ,
        nationalityCounts.Others,
      ],
      details: {
        totalUsers,
        us: nationalityCounts.US,
        indian: nationalityCounts.IN,
        ca: nationalityCounts.CA,
        nz: nationalityCounts.NZ,
        others: nationalityCounts.Others,
      },
    };
  };

  const handleUserCountChange = (e) => {
    setSelectedUserCount(parseInt(e.target.value, 10));
  };

  const genderData = calculateGenderData();
  const nationalityData = calculateNationalityData();

  return (
    <section className="flex lg:flex-row-reverse sm:flex-col justify-evenly home-section shadow-md p-6">
      <div className="flex justify-end mt-4">
        <div className="border h-[100px] w-[300px] border-black rounded-full flex items-center px-4 py-2 m-2 bg-white shadow-md">
          <label htmlFor="userCount" className="mr-2 text-black">
            Select Number of Users:
          </label>
          <select
            id="userCount"
            value={selectedUserCount}
            onChange={handleUserCountChange}
            className="rounded-md px-2 py-1 bg-gray-100"
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-evenly">
        <CustomPieChart data={genderData} />
        <CustomPieChart data={nationalityData} />
      </div>
    </section>
  );
};

export default Home;
