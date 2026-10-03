import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { POSITIVE_QUOTES } from '../data/mockData';

export default function QuoteScreen() {
  const [isReminderOn, setIsReminderOn] = useState(true);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={globalStyles.headerTitle}>มุมพักใจ ☀️</Text>

        {/* Card คำคมฮีลใจ */}
        <View style={[globalStyles.card, { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' }]}>
          <Ionicons name="sparkles" size={24} color="#D97706" style={{ marginBottom: 8 }} />
          <Text style={{ fontSize: 16, fontStyle: 'italic', color: '#92400E', lineHeight: 24 }}>
            {POSITIVE_QUOTES[0]}
          </Text>
        </View>

        {/* Card ข้อคิดประจำวัน */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>💡 ข้อคิดดูแลสุขภาพใจ</Text>
          <Text style={{ color: '#4B5563', lineHeight: 22 }}>
            • หายใจเข้าลึกๆ 4 วินาที กลั้นไว้ 4 วินาที แล้วผ่อนลมหายใจออก 6 วินาที{'\n'}
            • ดื่มน้ำสะอาด 1 แก้วเพื่อเพิ่มความสดชื่น{'\n'}
            • พักสายตาจากหน้าจอโทรศัพท์ 5 นาที
          </Text>
        </View>

        {/* Card ตั้งค่าแจ้งเตือนด้วย Switch Component */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>การตั้งค่า</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#374151', fontSize: 15 }}>เตือนบันทึกอารมณ์ทุกวัน (20:00 น.)</Text>
            <Switch
              value={isReminderOn}
              onValueChange={setIsReminderOn}
              trackColor={{ false: '#D1D5DB', true: '#8B9B74' }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}