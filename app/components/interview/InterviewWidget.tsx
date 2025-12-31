"use client";

import { useState } from "react";

type InterviewInfo = {
  interviewType: string;
  companyName: string;
  interviewDate: string;
  role: string;
};

type Tab = "details" | "mock";

export default function InterviewWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [hasStartedMock, setHasStartedMock] = useState(false);

  const [formData, setFormData] = useState<InterviewInfo>({
    interviewType: "",
    companyName: "",
    interviewDate: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormComplete =
    formData.interviewType &&
    formData.companyName &&
    formData.role &&
    formData.interviewDate;

  return (
    <>
      {/* Launch Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        Prepare Interview
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold">
                Interview Preparation
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActiveTab("details");
                  setHasStartedMock(false);
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <TabButton
                active={activeTab === "details"}
                onClick={() => setActiveTab("details")}
              >
                Interview Details
              </TabButton>

              <TabButton
                active={activeTab === "mock"}
                disabled={!hasStartedMock}
                onClick={() =>
                  hasStartedMock && setActiveTab("mock")
                }
              >
                Mock Interview
              </TabButton>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "details" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Interview Type
                    </label>
                    <select
                      name="interviewType"
                      value={formData.interviewType}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option value="behavioral">Behavioral</option>
                      <option value="technical">Technical</option>
                      <option value="hr">HR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Interview Date
                    </label>
                    <input
                      type="date"
                      name="interviewDate"
                      value={formData.interviewDate}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border px-3 py-2"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      disabled={!isFormComplete}
                      onClick={() => {
                        setHasStartedMock(true);
                        setActiveTab("mock");
                      }}
                      className={`w-full rounded-md px-4 py-2 text-white transition
                        ${
                          isFormComplete
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-300 cursor-not-allowed"
                        }
                      `}
                    >
                      Start Mock Interview
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "mock" && (
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium">
                    Mock Interview
                  </p>
                  <p className="mt-2 text-sm">
                    Mock interview experience will start here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TabButton({
  active,
  disabled,
  children,
  onClick,
}: {
  active: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 px-4 py-3 text-sm font-medium transition
        ${
          active
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-800"
        }
        ${
          disabled
            ? "cursor-not-allowed opacity-40 hover:text-gray-500"
            : ""
        }
      `}
    >
      {children}
    </button>
  );
}
