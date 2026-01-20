import { useState } from "react";
import Header from "./header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function HelpModal({ onClose }) {
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  return (
    <div className="w-full  bg-white">
      <Header></Header>
    <div className="flex w-full m-4 h-[60vh]  items-center justify-center px-4">
      <div className="w-[60%] h-full   rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Help & Support
          </h2>
         
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3">
          {[
            "Order Issue",
            "Payment Issue",
            "Address Problem",
            "App Bug",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setIssue(item)}
              className={`rounded-lg border px-3 py-2 text-sm
              ${issue === item
                ? "border-green-500 bg-green-50 text-green-600"
                : "hover:bg-gray-50"}`}
            >
              {item}
            </button>
          ))}
        </div>
        {issue && (
          <>
            <p className="mb-2 text-sm text-gray-600">
              Selected: <span className="font-medium">{issue}</span>
            </p>
            <textarea
              rows="4"
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border p-2 text-sm outline-none focus:border-green-500"
            />
            <button
              className="mt-4 w-full rounded-xl bg-green-500 py-2 font-semibold text-white hover:bg-green-600"
              onClick={()=> navigate('/')}
            >
              Submit Request
            </button>
          </>
        )}
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}
