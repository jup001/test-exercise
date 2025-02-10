
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import FirstStep from "./component/firstStep";

import SecondStep from "./component/SecondStep";

const App = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const sendMessage = async () => {
    if (!idInstance || !apiTokenInstance || !phoneNumber || !message) {
      alert("Please fill all the fields!");
      return;
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const payload = {
      chatId: `${phoneNumber}@c.us`,
      message,
    };

    try {
      await axios.post(url, payload);
      setMessages([...messages, { sender: "You", text: message ,chatId: `${phoneNumber}@c.us`}]);
      setMessage("");
    } catch (error) {
      console.error("Message send error:", error);
    }
  };

  const fetchMessages = async () => {
    if (!idInstance || !apiTokenInstance) return;
    
    const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url);

      if (response.data && response.data.body) {
        const incomingMessage = response.data.body.messageData?.textMessageData?.textMessage;
console.log(incomingMessage,response.data.body)
        if (incomingMessage) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "Получатель", text: incomingMessage,chatId: response.data.body.senderData?.chatId },
          ]);
        }

        // Удаляем уведомление, чтобы не дублировать
        const receiptId = response.data.receiptId;
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
        );
      }
    } catch (error) {
      console.error("Ошибка получения сообщений:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [idInstance, apiTokenInstance]);

  const proceedToNextStep = () => {
    if (!idInstance || !apiTokenInstance) {
      alert("Please fill in the credentials first!");
      return;
    }
    setCurrentStep(2);
  };

  return (
    <div >
      {currentStep === 1 ? (
        <FirstStep
          idInstance={idInstance}
          setIdInstance={setIdInstance}
          apiTokenInstance={apiTokenInstance}
          setApiTokenInstance={setApiTokenInstance}
          proceedToNextStep={proceedToNextStep}
        />
      ) : (
        <SecondStep
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          message={message}
          setMessage={setMessage}
          messages={messages}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
};

export default App;

