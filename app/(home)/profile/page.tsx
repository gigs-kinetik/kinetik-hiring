"use client";

import React, { useState, useEffect } from "react";

function UserProfile() {
  const [userType, setUserType] = useState("developer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    linkedIn: "",
    twitter: "",
    github: "",
    resume: "",
    companyName: "",
    location: "",
    age: "",
    gender: "",
    skills: [],
    citizenship: "",
  });

  const allSkills = [
    "JavaScript",
    "React",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Node.js",
    "HTML",
    "CSS",
    "SQL",
    "MongoDB",
    "Express.js",
    "Vue.js",
    "Angular",
    "TypeScript",
    "Django",
    "Flask",
    "Spring Boot",
    "PHP",
    "Kotlin",
    "Swift",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Git",
    "CI/CD",
    "Agile Development",
    "Other",
  ];

  const [availableSkills, setAvailableSkills] = useState(allSkills);
  const [customSkill, setCustomSkill] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(["United States", ...sortedCountries]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  const handleAddSkill = (skill) => {
    if (!skill || formData.skills.includes(skill)) return;
    setFormData((prevState) => ({
      ...prevState,
      skills: [...prevState.skills, skill],
    }));
    if (skill !== "Other") {
      setAvailableSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
    }
    setCustomSkill("");
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((s) => s !== skill),
    }));
    if (allSkills.includes(skill) && skill !== "Other") {
      setAvailableSkills((prevSkills) => [...prevSkills, skill].sort());
    }
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill)) {
      handleAddSkill(customSkill);
    }
  };

  const handleCustomSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCustomSkill();
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      firstName: "",
      lastName: "",
      linkedIn: "",
      twitter: "",
      github: "",
      resume: "",
      companyName: "",
      location: "",
      age: "",
      gender: "",
      skills: [],
      citizenship: "",
    });
    setAvailableSkills(allSkills);
  };

  return (
    <div className="mb-10 mt-10 p-10 bg-white rounded-lg max-w-5xl mx-auto shadow-lg font-poppins">
      {/* User Type Toggle */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-5 py-2 border rounded-lg mx-2 ${
            userType === "developer"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800 border-gray-400"
          }`}
          onClick={() => handleUserTypeChange("developer")}
        >
          Developer
        </button>
        <button
          className={`px-5 py-2 border rounded-lg mx-2 ${
            userType === "company"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800 border-gray-400"
          }`}
          onClick={() => handleUserTypeChange("company")}
        >
          Company
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mr-4"
          />
          <div>
            <p className="text-xl font-semibold">Jane Doe</p>
            <p className="text-gray-500">
              {userType === "developer" ? "Developer" : "Company"}
            </p>
            <p className="text-gray-500">
              {userType === "developer"
                ? "developer@gmail.com"
                : "company@gmail.com"}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <button className="bg-gray-800 text-white rounded-lg px-5 py-2">
            Link Bank Account
          </button>
          <button className="bg-gray-800 text-white rounded-lg px-5 py-2">
            Edit
          </button>
        </div>
      </div>

      {/* Form */}
      <h3 className="mb-6 text-lg font-semibold">My Information</h3>
      <div className="grid grid-cols-2 gap-6">
        {/* Shared Fields */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="p-3 border rounded-lg"
            placeholder="Your First Name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="p-3 border rounded-lg"
            placeholder="Your Last Name"
          />
        </div>
        {userType === "developer" && (
          <>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                className="p-3 border rounded-lg"
                placeholder="www.linkedin.com/in/yourprofile"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Twitter URL</label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="p-3 border rounded-lg"
                placeholder="www.twitter.com/yourprofile"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="p-3 border rounded-lg"
                placeholder="www.github.com/yourprofile"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Resume URL</label>
              <input
                type="url"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                className="p-3 border rounded-lg"
                placeholder="Link to your resume"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="p-3 border rounded-lg"
                placeholder="City, State, Country"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="p-3 border rounded-lg"
                placeholder="Your Age"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">
                Country of Citizenship
              </label>
              <select
                name="citizenship"
                value={formData.citizenship}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              >
                <option value="" disabled>
                  Select a country
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Skills</label>
              <select
                name="skills"
                className="p-3 border rounded-lg"
                onChange={(e) => handleAddSkill(e.target.value)}
                value=""
              >
                <option value="" disabled>
                  Select a skill
                </option>
                {availableSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <div className="mt-4 flex flex-wrap">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              {formData.skills.includes("Other") && (
                <div className="mt-5">
                  <input
                    type="text"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={handleCustomSkillKeyPress}
                    placeholder="Enter custom skill"
                    className="p-3 border rounded-lg"
                  />
                </div>
              )}
            </div>
          </>
        )}
        {userType === "company" && (
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              placeholder="Your Company Name"
            />
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          className="bg-gray-600 text-white px-5 py-2 rounded-lg"
          onClick={() => alert("Reset Password clicked")}
        >
          Reset Password
        </button>
        <button
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
          onClick={() => alert("Delete Account clicked")}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
