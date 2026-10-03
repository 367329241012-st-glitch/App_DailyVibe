import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { MOOD_OPTIONS } from '../data/mockData';
import { MoodContext } from '../context/MoodContext';

export default function HomeScreen({ navigation }) {
  const { logs, addLog } = useContext(MoodContext);
  const [selectedMood, setSelectedMood] = useState(MOOD_OPTIONS[0]);
  const [noteText, setNoteText] = useState('');

  const handleSaveMood = () => {
    if (!noteText.trim()) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`; // รูปแบบ YYYY-MM-DD

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const newEntry = {
      id: Date.now().toString(),
      dateString: dateString,
      date: `วันนี้, ${hours}:${minutes} น.`,
      mood: selectedMood.emoji,
      moodName: selectedMood.label,
      energy: '75%',
      note: noteText,
      tagColor: selectedMood.color,
      textColor: selectedMood.textColor,
    };
    
    addLog(newEntry);
    setNoteText('');
    alert('บันทึกอารมณ์เรียบร้อยแล้ว!');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={globalStyles.headerTitle}>DailyVibe 🌱</Text>
        <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 20 }}>
          วันนี้คุณรู้สึกอย่างไรบ้าง?
        </Text>

        {/* Card 1: เลือกอารมณ์ */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>เลือกรีแอคชั่นของคุณ</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            {MOOD_OPTIONS.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedMood(item)}
                style={{
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 12,
                  backgroundColor: selectedMood.label === item.label ? item.color : '#F9FAFB',
                  borderWidth: selectedMood.label === item.label ? 1.5 : 0,
                  borderColor: item.textColor,
                }}
              >
                <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                <Text style={{ fontSize: 11, color: '#4B5563', marginTop: 4 }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Card 2: พิมพ์ไดอารี่ */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>เล่าเรื่องราวสั้นๆ ให้เราฟัง</Text>
          <TextInput
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: 12,
              padding: 12,
              height: 100,
              textAlignVertical: 'top',
              fontSize: 14,
              color: '#374151',
            }}
            placeholder="วันนี้มีอะไรพิเศษเกิดขึ้น หรือมีเรื่องกังวลใจไหม..."
            multiline
            value={noteText}
            onChangeText={setNoteText}
          />
          <TouchableOpacity style={globalStyles.primaryButton} onPress={handleSaveMood}>
            <Text style={globalStyles.primaryButtonText}>บันทึกความรู้สึก</Text>
          </TouchableOpacity>
        </View>

        {/* Card 3: สรุปบันทึกล่าสุด */}
        <View style={globalStyles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={globalStyles.cardTitle}>บันทึกล่าสุด</Text>
            <TouchableOpacity onPress={() => navigation.navigate('HistoryTab')}>
              <Text style={{ color: '#8B9B74', fontWeight: '600', fontSize: 13 }}>ดูทั้งหมด</Text>
            </TouchableOpacity>
          </View>
          {logs.length > 0 && (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
              onPress={() => navigation.navigate('HistoryTab')}
            >
              <Text style={{ fontSize: 32, marginRight: 12 }}>{logs[0].mood}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: '#1F2937' }}>{logs[0].moodName}</Text>
                <Text style={{ color: '#6B7280', fontSize: 12 }} numberOfLines={1}>
                  {logs[0].note}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}