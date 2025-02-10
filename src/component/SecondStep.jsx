import React from "react";

const SecondStep = ({ phoneNumber, setPhoneNumber, message, setMessage, messages, sendMessage }) => {
  const Img = "/pictures/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      sendMessage();
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius: "10px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          backgroundColor: "#075e54",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Chat
      </div>

      {/* Phone Number Input */}
      <div style={{ padding: "15px", backgroundColor: "#f0f0f0" }}>
  <style>
    {`
      input::placeholder {
        font-size: 14px; /* Adjust the font size for the placeholder */
      }
    `}
  </style>
  <input
    type="text"
    placeholder="Enter phone number (e.g., 792xxxxxxx)"
    value={phoneNumber}
    onChange={handlePhoneNumberChange}
    style={{
      width: "90%", // Adjust width to fit better
      height: "20px", // Set consistent height
      padding: "8px",
      margin: "0 auto", // Center the input horizontally
      borderRadius: "15px",
      border: "1px solid #ccc",
      fontSize: "16px",
      outline: "none",
    }}
  />
</div>


      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url(${Img})`,
          backgroundSize: "cover",
        }}
      >
        {messages
          .filter((msg) => msg.chatId.includes(phoneNumber))
          .map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "You" ? "#25D366" : "#E5E5EA",
                color: msg.sender === "You" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "15px",
                maxWidth: "70%",
                marginBottom: "5px",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </div>
          ))}
      </div>

      {/* Message Input & Send Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            backgroundColor: "#128C7E",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default SecondStep;
