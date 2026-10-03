import React, { createContext, useState } from 'react';
import { INITIAL_LOGS } from '../data/mockData';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [logs, setLogs] = useState(INITIAL_LOGS);

  // ฟังก์ชันสำหรับเพิ่มข้อมูลบันทึกใหม่
  const addLog = (newLog) => {
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  return (
    <MoodContext.Provider value={{ logs, addLog }}>
      {children}
    </MoodContext.Provider>
  );
};