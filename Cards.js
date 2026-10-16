import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, RemoteImage } from './UI';

export function AppointmentCard({ item, onPress }) {
  const waiting = item.status === 'Waiting';
  return <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ backgroundColor: C.white, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 13, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ width: 43, height: 48, borderRadius: 13, backgroundColor: item.color || C.pale, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
      <Ionicons name="calendar-outline" size={20} color={C.teal}/><Text style={{ fontSize: 8, fontWeight: '800', color: C.ink, marginTop: 2 }}>{item.time}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ color: C.ink, fontWeight: '800', fontSize: 13 }}>{item.patient}</Text>
      <Text style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{item.doctor}</Text>
      <Text style={{ color: C.muted, fontSize: 10, marginTop: 2 }}>{item.specialty}</Text>
    </View>
    <View style={{ backgroundColor: waiting ? '#FFF0D9' : '#DDF5EC', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 9 }}><Text style={{ color: waiting ? '#9A641F' : '#187A5C', fontSize: 9, fontWeight: '800' }}>{item.status}</Text></View>
  </TouchableOpacity>;
}

export function DoctorCard({ doctor, onPress }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={{ backgroundColor: C.white, borderRadius: 18, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: C.border, flexDirection: 'row', alignItems: 'center' }}>
    <RemoteImage uri={doctor.image} style={{ width: 76, height: 84, borderRadius: 14 }} icon="person"/>
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={{ color: C.ink, fontWeight: '800', fontSize: 14 }}>{doctor.name}</Text>
      <Text style={{ color: C.teal, fontSize: 12, fontWeight: '700', marginTop: 4 }}>{doctor.specialty}</Text>
      <Text style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{doctor.experience} experience · ★ {doctor.rating}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: doctor.availability.includes('today') ? C.green : C.orange, marginRight: 5 }}/>
        <Text style={{ color: C.muted, fontSize: 10 }}>{doctor.availability}</Text>
      </View>
    </View>
    <Ionicons name="chevron-forward" size={18} color={C.muted}/>
  </TouchableOpacity>;
}

export function BrowseCard({ item, onPress, width = 155 }) {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={{ width, backgroundColor: C.white, borderRadius: 17, overflow: 'hidden', marginRight: 11, borderWidth: 1, borderColor: C.border }}>
    {item.image ? <RemoteImage uri={item.image} style={{ width: '100%', height: 94 }} /> : <View style={{ height: 82, backgroundColor: item.color || C.pale, alignItems: 'center', justifyContent: 'center' }}><Ionicons name={item.icon || 'medical'} size={28} color={C.teal}/></View>}
    <View style={{ padding: 11 }}>
      <Text numberOfLines={1} style={{ fontWeight: '800', color: C.ink, fontSize: 12 }}>{item.name}</Text>
      <Text numberOfLines={2} style={{ color: C.muted, fontSize: 10, marginTop: 4, lineHeight: 14 }}>{item.subtitle}</Text>
      {item.count || item.price ? <Text style={{ color: C.teal, fontWeight: '800', fontSize: 10, marginTop: 7 }}>{item.count || item.price}</Text> : null}
    </View>
  </TouchableOpacity>;
}
