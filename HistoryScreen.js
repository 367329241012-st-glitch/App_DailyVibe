import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { MoodContext } from '../context/MoodContext';

const MONTH_NAMES = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];
const DAYS_OF_WEEK = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

export default function HistoryScreen() {
  const { logs } = useContext(MoodContext);
  const [viewMode, setViewMode] = useState('calendar'); // 'list' หรือ 'calendar'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // คำนวณวันในเดือนสำหรับสร้างตารางปฏิทิน
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // สร้างแมทริกซ์วันในปฏิทิน
  const calendarRows = [];
  let dayCounter = 1;
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayIndex) || dayCounter > totalDays) {
        row.push(null);
      } else {
        row.push(dayCounter);
        dayCounter++;
      }
    }
    calendarRows.push(row);
    if (dayCounter > totalDays) break;
  }

  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  // กรองรายการตามวันที่เลือกในปฏิทิน
  const filteredLogs = selectedDateStr
    ? logs.filter((item) => item.dateString === selectedDateStr)
    : logs;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, marginRight: 8 }}>{item.mood}</Text>
          <Text style={{ fontWeight: '600', fontSize: 16, color: '#374151' }}>{item.moodName}</Text>
        </View>
        <View style={[globalStyles.badge, { backgroundColor: item.tagColor }]}>
          <Text style={[globalStyles.badgeText, { color: item.textColor }]}>{item.date}</Text>
        </View>
      </View>
      <Text style={{ color: '#4B5563', fontSize: 14 }} numberOfLines={2}>{item.note}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={globalStyles.headerTitle}>ประวัติความรู้สึก 📅</Text>

        {/* ปุ่มสลับมุมมอง รายการ / ปฏิทิน */}
        <View style={{ flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 12, padding: 4, marginBottom: 16 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              alignItems: 'center',
              backgroundColor: viewMode === 'calendar' ? '#FFFFFF' : 'transparent',
            }}
            onPress={() => setViewMode('calendar')}
          >
            <Text style={{ fontWeight: '600', color: viewMode === 'calendar' ? '#8B9B74' : '#6B7280' }}>
              📅 มุมมองปฏิทิน
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              alignItems: 'center',
              backgroundColor: viewMode === 'list' ? '#FFFFFF' : 'transparent',
            }}
            onPress={() => {
              setViewMode('list');
              setSelectedDateStr(null);
            }}
          >
            <Text style={{ fontWeight: '600', color: viewMode === 'list' ? '#8B9B74' : '#6B7280' }}>
              📋 รายการทั้งหมด
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* แสดง UI ปฏิทินเมื่อเลือก viewMode = 'calendar' */}
          {viewMode === 'calendar' && (
            <View style={globalStyles.card}>
              {/* Header เลื่อนเดือน */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <TouchableOpacity onPress={() => changeMonth(-1)}>
                  <Ionicons name="chevron-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#374151' }}>
                  {MONTH_NAMES[month]} {year + 543}
                </Text>
                <TouchableOpacity onPress={() => changeMonth(1)}>
                  <Ionicons name="chevron-forward" size={24} color="#374151" />
                </TouchableOpacity>
              </View>

              {/* หัวชื่อวันในสัปดาห์ */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 }}>
                {DAYS_OF_WEEK.map((day, idx) => (
                  <Text key={idx} style={{ width: 36, textAlign: 'center', fontWeight: '600', color: '#9CA3AF', fontSize: 12 }}>
                    {day}
                  </Text>
                ))}
              </View>

              {/* ตารางวันที่ในปฏิทิน */}
              {calendarRows.map((row, rIdx) => (
                <View key={rIdx} style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 4 }}>
                  {row.map((dayNum, cIdx) => {
                    if (!dayNum) {
                      return <View key={cIdx} style={{ width: 36, height: 44 }} />;
                    }

                    const mStr = String(month + 1).padStart(2, '0');
                    const dStr = String(dayNum).padStart(2, '0');
                    const fullDateStr = `${year}-${mStr}-${dStr}`;

                    // ค้นหาบันทึกของวันนั้นๆ
                    const logForDay = logs.find((l) => l.dateString === fullDateStr);
                    const isSelected = selectedDateStr === fullDateStr;

                    return (
                      <TouchableOpacity
                        key={cIdx}
                        onPress={() => setSelectedDateStr(isSelected ? null : fullDateStr)}
                        style={{
                          width: 38,
                          height: 46,
                          alignItems: 'center',
                          justify: 'center',
                          borderRadius: 10,
                          backgroundColor: isSelected ? '#8B9B74' : '#F9FAFB',
                          borderWidth: isSelected ? 2 : 0,
                          borderColor: '#657452',
                        }}
                      >
                        <Text style={{ fontSize: 12, fontWeight: '600', color: isSelected ? '#FFFFFF' : '#374151' }}>
                          {dayNum}
                        </Text>
                        {/* แสดงอิโมจิอารมณ์บนวันที่บันทึกไว้ */}
                        {logForDay ? (
                          <Text style={{ fontSize: 14, marginTop: 2 }}>{logForDay.mood}</Text>
                        ) : (
                          <View style={{ height: 16 }} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}

              {selectedDateStr && (
                <TouchableOpacity
                  onPress={() => setSelectedDateStr(null)}
                  style={{ marginTop: 12, alignItems: 'center' }}
                >
                  <Text style={{ color: '#8B9B74', fontSize: 12, fontWeight: '600' }}>
                    🔄 แสดงบันทึกทุกวัน
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* หัวข้อแสดงสถานะวันที่เลือก */}
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#4B5563', marginBottom: 12 }}>
            {selectedDateStr ? `บันทึกของวันที่: ${selectedDateStr}` : 'รายการบันทึกทั้งหมด'}
          </Text>

          {/* รายการบันทึก */}
          {filteredLogs.length > 0 ? (
            filteredLogs.map((item) => <View key={item.id}>{renderItem({ item })}</View>)
          ) : (
            <View style={[globalStyles.card, { alignItems: 'center', padding: 30 }]}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>🍃</Text>
              <Text style={{ color: '#9CA3AF' }}>ไม่มีรายการบันทึกในวันที่เลือก</Text>
            </View>
          )}
        </ScrollView>

        {/* Modal รายละเอียดบันทึก */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 }}>
            <View style={{ backgroundColor: '#FFF', borderRadius: 20, padding: 24 }}>
              <Text style={{ fontSize: 40, textAlign: 'center' }}>{selectedItem?.mood}</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 8 }}>
                {selectedItem?.moodName}
              </Text>
              <Text style={{ color: '#9CA3AF', textAlign: 'center', fontSize: 12, marginBottom: 16 }}>
                {selectedItem?.date}
              </Text>
              <Text style={{ fontSize: 15, color: '#374151', lineHeight: 22, marginBottom: 20 }}>
                "{selectedItem?.note}"
              </Text>
              <TouchableOpacity
                style={globalStyles.primaryButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={globalStyles.primaryButtonText}>ปิดหน้าต่าง</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}