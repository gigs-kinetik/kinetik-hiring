"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Gender } from "../../../util/wrapper/basicTypes";
import { UserInstance, CompanyInstance } from "../../../util/wrapper/instance";
import { User, Company } from "../../../util/wrapper/static";
import { getInstance } from "../../../util/wrapper/globals";

interface FormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  linkedIn?: string;
  twitter?: string;
  github?: string;
  resume?: string;
  location?: string;
  age?: string;
  gender?: Gender;
  skills?: string[];
  otherSkill?: string;
  citizenship?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

function UserProfile() {
  const router = useRouter();
  const [userType, setUserType] = useState<"developer" | "company">("developer");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
  });
  
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [availableSkills] = useState([
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
  ]);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedCountries = data
          .map((country: any) => country.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCountries(["United States", ...sortedCountries]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      const instance = await getInstance();
      if (instance instanceof User) {
        setUserType("developer");
        setFormData({
          firstName: instance.firstName || "",
          lastName: instance.lastName || "",
          linkedIn: "",
          twitter: "",
          github: "",
          resume: "",
          location: (instance instanceof UserInstance ? instance.location : ""),
          age: (instance instanceof UserInstance ? instance.age : ""),
          gender: (instance instanceof UserInstance ? instance.gender : ""),
          skills: (instance instanceof UserInstance ? instance.skills : []),
          citizenship: (instance instanceof UserInstance ? instance.countryOfCitizenship : ""),
        } as FormData);
      } else if (instance instanceof Company) {
        setUserType("company");
        setFormData({
          firstName: instance.firstName || "",
          lastName: instance.lastName || "",
          companyName: (instance instanceof CompanyInstance ? instance.name : ""),
        });
      }
      setLoading(false);
    };

    fetchCountries();
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSkillChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "Other") {
      setFormData((prev) => ({
        ...prev,
        otherSkill: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), value],
        otherSkill: undefined,
      }));
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.oldPassword) {
      setMessage({ type: "error", text: "Please enter your old password." });
      return;
    }
  
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }
  
    try {
      // Fetch the current user or company instance
      const instance = await getInstance();
  
      // Check if the current instance is a User or Company
      if (instance instanceof UserInstance || instance instanceof CompanyInstance) {
        // Pass the old and new passwords to the backend for validation and update
        const updatedInstance = await instance.update({
          password: formData.newPassword,
        });
  
        if (updatedInstance) {
          setMessage({ type: "success", text: "Password reset successfully!" });
        } else {
          setMessage({ type: "error", text: "Failed to reset password. Please try again." });
        }
      } else {
        setMessage({ type: "error", text: "Invalid user or company instance." });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage({ type: "error", text: "Failed to reset password. Please try again." });
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      if (userType === "developer") {
        const instance = await getInstance();
        if (instance) {
          await instance.update({
            first_name: formData.firstName,
            last_name: formData.lastName,
            location: formData.location,
            age: parseInt(formData.age || "0") || null,
            gender: formData.gender,
            country_of_citizenship: formData.citizenship,
            skills: formData.skills,
          });
        }
      } else if (userType === "company") {
        const instance = await getInstance();
        if (instance) {
          await instance.update({
            first_name: formData.firstName,
            last_name: formData.lastName,
            company_name: formData.companyName,
          });
        }
      }
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

return (
  <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-lg max-w-full md:max-w-5xl mx-auto shadow-lg font-poppins">
    {/* Inline Message */}
    {message && (
      <div
        className={`p-3 mb-4 rounded-lg ${
          message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {message.text}
      </div>
    )}
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mr-4"
          />
          <div>
            <p className="text-xl font-semibold">
              {formData.firstName || "First Name"} {formData.lastName || "Last Name"}
            </p>
            <p className="text-gray-500">{userType === "developer" ? "Developer" : "Company"}</p>
            <p className="text-gray-500">example@example.com</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="bg-gray-800 text-white rounded-lg px-5 py-2">
            Link Bank Account
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-gray-800 text-white rounded-lg px-5 py-2"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Your First Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Your Last Name"
          />
        </div>
{userType === "company" && (
  <div>
    <label className="block text-sm font-medium mb-2">Company Name</label>
    <input
      type="text"
      name="companyName"
      value={formData.companyName}
      onChange={handleChange}
      className="w-full p-3 border rounded-lg"
      placeholder="Your Company Name"
    />
  </div>
)}
{userType === "developer" && (
  <>
    <div>
      <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
      <input
        type="url"
        name="linkedIn"
        value={formData.linkedIn || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        placeholder="LinkedIn Profile"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Twitter URL</label>
      <input
        type="url"
        name="twitter"
        value={formData.twitter || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        placeholder="Twitter Profile"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">GitHub URL</label>
      <input
        type="url"
        name="github"
        value={formData.github || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        placeholder="GitHub Profile"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Resume URL</label>
      <input
        type="url"
        name="resume"
        value={formData.resume || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        placeholder="Resume Link"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        placeholder="City, State, Country"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Age</label>
      <input
        type="number"
        name="age"
        value={formData.age || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        placeholder="Your Age"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Gender</label>
      <select
        name="gender"
        value={formData.gender || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Country of Citizenship</label>
      <select
        name="citizenship"
        value={formData.citizenship || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      >
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Skills</label>
      <select
        name="skills"
        className="w-full p-3 border rounded-lg"
        onChange={handleSkillChange}
        value=""
      >
        <option value="">Select a skill</option>
        {availableSkills.map((skill, index) => (
          <option key={index} value={skill}>
            {skill}
          </option>
        ))}
      </select>
      <div className="mt-4 flex flex-wrap">
        {(formData.skills || []).map((skill, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
          >
            {skill}
            <button
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  skills: prev.skills?.filter((s) => s !== skill),
                }))
              }
              className="ml-2 text-red-500"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      {formData.otherSkill !== undefined && (
  <div className="mt-4">
    <label className="block text-sm font-medium mb-2">Other Skill</label>
    <input
      type="text"
      name="otherSkill"
      value={formData.otherSkill}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          otherSkill: e.target.value,
        }))
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" && formData.otherSkill?.trim()) {
          e.preventDefault(); // Prevent default Enter behavior (e.g., form submission)
          setFormData((prev) => ({
            ...prev,
            skills: [...(prev.skills || []), formData.otherSkill!.trim()],
            otherSkill: "", // Clear the Other Skill input field
          }));
        }
      }}
      className="w-full p-3 border rounded-lg"
      placeholder="Specify your skill and press Enter"
    />
  </div>
)}
    </div>
  </>
)}
</div>

<div className="flex justify-start space-x-4 mt-4">
  {/* Reset Password Modal Trigger */}
  <button
    onClick={() => setShowPasswordModal(true)}
    className="bg-blue-500 text-white px-5 py-2 rounded-lg"
  >
    Reset Password
  </button>

  {/* Delete Account */}
  <button className="bg-red-500 text-white px-5 py-2 rounded-lg">
    Delete Account
  </button>
</div>

{/* Reset Password Modal */}
{showPasswordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <label className="block text-sm font-medium mb-2">Old Password</label>
      <input
        type="password"
        name="oldPassword"
        value={formData.oldPassword || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Enter your old password"
      />
      <label className="block text-sm font-medium mb-2">New Password</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Enter new password"
      />
      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Confirm new password"
      />
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setShowPasswordModal(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handlePasswordReset}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Reset Password
        </button>
      </div>
    </div>
  </div>
)}
</div>
);
}

export default UserProfile;
