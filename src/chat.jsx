import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatApp = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Функция отправки сообщения
  const sendMessage = async () => {
    if (!idInstance || !apiTokenInstance || !phoneNumber || !message) {
      alert("Заполните все поля");
      return;
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const payload = {
      chatId: `${phoneNumber}@c.us`, // Формат номера телефона
      message: message,
    };

    try {
      await axios.post(url, payload);
      setMessages([...messages, { sender: "Вы", text: message }]);
      setMessage("");
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    }
  };

  // Функция получения входящих сообщений
  useEffect(() => {
    const fetchMessages = async () => {
      if (!idInstance || !apiTokenInstance) return;
      
      const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

      try {
        const response = await axios.get(url);

        if (response.data && response.data.body) {
          const incomingMessage = response.data.body.messageData?.textMessageData?.textMessage;

          if (incomingMessage) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: "Получатель", text: incomingMessage },
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

    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [idInstance, apiTokenInstance]);

  return (
    <div>
      <h2>WhatsApp Чат (без бэкенда)</h2>
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="Номер получателя (792xxxxxxx)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Введите сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Отправить</button>

      <h3>Чат:</h3>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><b>{msg.sender}:</b> {msg.text}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;