import React , { useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  Pencil,
} from "lucide-react";

export default function SettingsProfile() {

  const [profileMode, setProfileModel] = useState(false);

  const [profile, setProfile] = useState({
    name: "Hitesh Vekariya",
    email: "hiteshvekariya012@gmail.com",
    role: "Frontend Developer",
  });

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-7 shadow-lg">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
          <User
            size={22}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">
            Profile
          </h2>

          <p className="text-slate-400 text-sm">
            Manage your account information
          </p>
        </div>
      </div>

      {/* Profile */}

      <div className="flex flex-col md:flex-row gap-8">

        <div className="flex flex-col items-center">
          <img
            src="Profile_Pic.png"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-cyan-500 object-cover"
          />

          <button
            // onClick={() => setProfileModel(true)}
            className="mt-5 flex cursor-pointer items-center gap-2 bg-cyan-500 hover:bg-cyan-600
            transition px-5 py-2 rounded-xl font-medium text-white"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>

        {/* Information */}

        <div className="flex-1 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">

              <User
                size={18}
                className="text-cyan-400"
              />

              <span className="text-slate-400">
                Full Name
              </span>

            </div>

            <h3 className="text-xl font-semibold text-white">
              Hitesh Vekariya
            </h3>

          </div>

          <div className="bg-slate-900 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-2">

              <Mail
                size={18}
                className="text-cyan-400"
              />

              <span className="text-slate-400">
                Email
              </span>

            </div>

            <h3 className="text-white">
              hiteshvekariya012@example.com
            </h3>

          </div>

          <div className="bg-slate-900 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-2">

              <Briefcase
                size={18}
                className="text-cyan-400"
              />

              <span className="text-slate-400">
                Role
              </span>

            </div>

            <h3 className="text-white">
              Frontend Developer
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}