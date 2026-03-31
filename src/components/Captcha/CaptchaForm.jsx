import React, { useState, useEffect } from "react";

const generateCaptcha = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const CaptchaForm = () => {
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInput("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === captcha) {
      setMessage("✅ CAPTCHA verified successfully!");
    } else {
      setMessage("❌ Incorrect CAPTCHA. Try again.");
      refreshCaptcha();
    }
  };

  return (
    <div className="w-1/4 mx-auto px-16 mt-6 py-20 shadow-2xl rounded-[30px]">
      <h2 className="text-center text-[20px] text-[#d08230] font-bold italic">
        Contact Form
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          className="mt-2 p-2 h-[40px] w-full border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="mt-2 p-2 h-[40px] w-full border rounded-lg"
        />

        {/* CAPTCHA Display */}
        <div
          style={{
            letterSpacing: "5px",
            userSelect: "none",
          }}
          className="bg-[#f2f2f2] p-[10px] text-[24px] font-bold text-center mt-4"
        >
          {captcha}
        </div>

        <button
          type="button"
          onClick={refreshCaptcha}
          className="mt-[5px] bg-blue-200 h-[30px] w-[150px] cursor-pointer rounded-[10px]"
        >
          Refresh CAPTCHA
        </button>

        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="mt-2 p-2 h-[40px] w-full border rounded-lg"
        />

        <button
          type="submit"
          className="mt-4 bg-[#d19b41] hover:bg-orange-400 font-medium h-[30px] w-full cursor-pointer rounded-[10px]"
        >
          Submit
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default CaptchaForm;
