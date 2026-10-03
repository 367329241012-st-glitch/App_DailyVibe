// ฟังก์ชันช่วยจัดรูปแบบวันที่ให้อยู่ในฟอร์แมต YYYY-MM-DD
const formatDateStr = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const today = new Date();
const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
const twoDaysAgo = new Date(); twoDaysAgo.setDate(today.getDate() - 2);

export const INITIAL_LOGS = [
  { id: '1', dateString: formatDateStr(today), date: 'วันนี้, 10:30 น.', mood: '😊', moodName: 'มีความสุข', energy: '80%', note: 'ได้กินกาแฟอร่อยๆ และสอบผ่านวิชาโปรแกรมมิ่ง!', tagColor: '#E2F0D9', textColor: '#385723' },
  { id: '2', dateString: formatDateStr(yesterday), date: 'เมื่อวาน, 21:15 น.', mood: '😴', moodName: 'เหนื่อยล้า', energy: '30%', note: 'ปั่นงานส่งอาจารย์ทั้งวัน อยากนอนพักยาวๆ', tagColor: '#FFF2CC', textColor: '#806000' },
  { id: '3', dateString: formatDateStr(twoDaysAgo), date: '2 วันที่แล้ว', mood: '😌', moodName: 'ผ่อนคลาย', energy: '65%', note: 'ไปเดินเล่นสวนสาธารณะกับเพื่อน อากาศดีมาก', tagColor: '#E0F2FE', textColor: '#0369A1' },
];

export const MOOD_OPTIONS = [
  { emoji: '😊', label: 'มีความสุข', color: '#E2F0D9', textColor: '#385723' },
  { emoji: '😌', label: 'ผ่อนคลาย', color: '#E0F2FE', textColor: '#0369A1' },
  { emoji: '😐', label: 'เฉยๆ', color: '#F3F4F6', textColor: '#4B5563' },
  { emoji: '😴', label: 'เหนื่อยล้า', color: '#FFF2CC', textColor: '#806000' },
  { emoji: '🥺', label: 'กังวล', color: '#FCE7F3', textColor: '#9D174D' },
];

export const POSITIVE_QUOTES = [
  "\"ไม่เป็นไรเลยถ้าวันนี้จะทำได้ไม่สมบูรณ์แบบ แค่พยายามก็เก่งมากแล้ว\"",
  "\"พักผ่อนบ้างนะ ร่างกายและจิตใจของคุณต้องการความดูแลเช่นกัน\"",
  "\"ก้าวเล็กๆ ในทุกๆ วัน ก็พาเราไปถึงจุดหมายได้เหมือนกัน\"",
];