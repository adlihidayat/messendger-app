import React from "react";

const ChatDate = ({ message }: any) => {
  const rightNowDate = new Date();
  const year = rightNowDate.getFullYear();
  const month = rightNowDate.getMonth() + 1; // Months are zero-indexed (January is 0)
  const day = rightNowDate.getDate();
  const hours = rightNowDate.getHours();
  const minutes = rightNowDate.getMinutes();
  const seconds = rightNowDate.getSeconds();

  function extractFormattedDate(timestamp: any) {
    if (!timestamp) {
      return null;
    }
    const date = new Date(timestamp);
    const date2 = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (day === date2.getDate()) {
      return `Today`;
    } else if (date2.getDate() - day <= 365) {
      return `${day}/${month}`;
    }
    return `${day}/${month}/${year}`;
  }

  return (
    <div className=" w-full bg-slate-70 flex justify-center mb-4">
      {extractFormattedDate(message.timestamp) ===
      `${day} / ${month} / ${year}` ? (
        <span className=" bg-[#00000078] text-xs py-2 px-4 rounded-full">
          Today
        </span>
      ) : (
        <span className=" bg-[#00000078] text-xs py-2 px-4 rounded-full">
          {extractFormattedDate(message.timestamp)}
        </span>
      )}
    </div>
  );
};

export default ChatDate;
