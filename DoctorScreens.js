import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doctors, specialties, timeSlots } from '../data/mockData';
import { C, Screen, Header, Chip, PrimaryButton, EmptyState, RemoteImage } from '../components/UI';
import { DoctorCard } from '../components/Cards';

export function DoctorsScreen({ navigation, route }) {
  const [query, setQuery] = useState(route.params?.search || '');
  const [specialty, setSpecialty] = useState(route.params?.specialty || 'All');
  const filtered = useMemo(() => doctors.filter(d => (specialty === 'All' || d.specialty === specialty) && `${d.name} ${d.specialty}`.toLowerCase().includes(query.toLowerCase())), [query, specialty]);
  return <Screen>
    <Header title="Find your doctor" subtitle="Trusted specialists, closer to you" right={<View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="heart-outline" size={20} color={C.teal}/></View>}/>
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 15, paddingHorizontal: 12, borderWidth: 1, borderColor: C.border, marginBottom: 13 }}>
      <Ionicons name="search-outline" size={18} color={C.muted}/><TextInput value={query} onChangeText={setQuery} placeholder="Doctor name or specialty" style={{ flex: 1, padding: 13, color: C.ink, fontSize: 12 }}/>{query ? <TouchableOpacity onPress={() => setQuery('')}><Ionicons name="close-circle" size={18} color={C.muted}/></TouchableOpacity> : null}
    </View>
    <Text style={{ color: C.ink, fontWeight: '800', fontSize: 12, marginBottom: 9 }}>Specialty</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 43, marginBottom: 12 }}>{specialties.map(s => <Chip key={s} label={s} active={specialty === s} onPress={() => setSpecialty(s)}/>)}</ScrollView>
    <Text style={{ color: C.muted, fontSize: 11, marginBottom: 10 }}>{filtered.length} specialists found</Text>
    <FlatList data={filtered} keyExtractor={i => i.id} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} ListEmptyComponent={<EmptyState title="No doctors match" body="Try another name or specialty."/>} renderItem={({ item }) => <DoctorCard doctor={item} onPress={() => navigation.navigate('DoctorProfile', { doctor: item })}/>}/>
  </Screen>;
}

export function DoctorProfileScreen({ navigation, route }) {
  const doctor = route.params?.doctor || doctors[0];
  return <Screen>
    <Header title="Doctor profile" subtitle="Specialist details" onBack={() => navigation.goBack()}/>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={{ backgroundColor: C.white, borderRadius: 22, borderWidth: 1, borderColor: C.border, padding: 16, alignItems: 'center' }}>
        <RemoteImage uri={doctor.image} style={{ width: 118, height: 118, borderRadius: 30 }} icon="person"/>
        <Text style={{ color: C.ink, fontWeight: '900', fontSize: 20, marginTop: 14 }}>{doctor.name}</Text>
        <Text style={{ color: C.teal, fontWeight: '800', marginTop: 5 }}>{doctor.specialty}</Text>
        <Text style={{ color: C.muted, fontSize: 12, marginTop: 8 }}>{doctor.experience} experience  ·  ★ {doctor.rating}</Text>
        <View style={{ flexDirection: 'row', marginTop: 15, gap: 9 }}>
          <View style={{ backgroundColor: '#E5F5F3', padding: 10, borderRadius: 12, alignItems: 'center', minWidth: 100 }}><Text style={{ color: C.teal, fontWeight: '900' }}>₹{doctor.fee}</Text><Text style={{ color: C.muted, fontSize: 10, marginTop: 3 }}>Consultation</Text></View>
          <View style={{ backgroundColor: '#FFF0DC', padding: 10, borderRadius: 12, alignItems: 'center', minWidth: 100 }}><Text style={{ color: C.ink, fontWeight: '900', fontSize: 11 }}>{doctor.availability}</Text><Text style={{ color: C.muted, fontSize: 10, marginTop: 3 }}>Availability</Text></View>
        </View>
      </View>
      <Text style={{ color: C.ink, fontWeight: '900', fontSize: 16, marginTop: 22, marginBottom: 8 }}>About doctor</Text>
      <Text style={{ color: C.muted, lineHeight: 21, fontSize: 13 }}>{doctor.about}</Text>
      <Text style={{ color: C.ink, fontWeight: '900', fontSize: 16, marginTop: 22, marginBottom: 8 }}>What to expect</Text>
      {['Personalized consultation', 'Review of your medical history', 'Clear next-step guidance'].map(x => <View key={x} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}><Ionicons name="checkmark-circle" size={18} color={C.green}/><Text style={{ color: C.ink, fontSize: 12, marginLeft: 8 }}>{x}</Text></View>)}
      <PrimaryButton title="Choose date & time" icon="calendar" onPress={() => navigation.navigate('Booking', { doctor })} style={{ marginTop: 17 }}/>
    </ScrollView>
  </Screen>;
}

export function BookingScreen({ navigation, route }) {
  const doctor = route.params?.doctor || doctors[0];
  const [day, setDay] = useState('Today');
  const [slot, setSlot] = useState('');
  const [reason, setReason] = useState('General consultation');
  const days = ['Today', 'Tomorrow', 'Mon, 19'];
  const slots = day === 'Tomorrow' ? timeSlots.filter((_, i) => i !== 1 && i !== 4) : timeSlots.filter((_, i) => i !== 0 && i !== 6);
  const book = () => {
    if (!slot) { Alert.alert('Choose a time', 'Select one available time slot to continue.'); return; }
    navigation.navigate('Confirmation', { doctor, day, slot, reason, bookingId: `MF${Math.floor(100000 + Math.random() * 899999)}` });
  };
  return <Screen>
    <Header title="Book appointment" subtitle="Select a convenient slot" onBack={() => navigation.goBack()}/>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 17, padding: 12, borderWidth: 1, borderColor: C.border }}>
        <RemoteImage uri={doctor.image} style={{ width: 57, height: 61, borderRadius: 14 }} icon="person"/>
        <View style={{ flex: 1, marginLeft: 12 }}><Text style={{ color: C.ink, fontWeight: '900' }}>{doctor.name}</Text><Text style={{ color: C.teal, fontSize: 11, marginTop: 4 }}>{doctor.specialty}</Text><Text style={{ color: C.muted, fontSize: 10, marginTop: 4 }}>Consultation fee ₹{doctor.fee}</Text></View>
      </View>
      <Text style={section}>Select date</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>{days.map(d => <TouchableOpacity key={d} onPress={() => { setDay(d); setSlot(''); }} style={{ flex: 1, paddingVertical: 15, borderRadius: 14, alignItems: 'center', backgroundColor: day === d ? C.teal : C.white, borderWidth: 1, borderColor: day === d ? C.teal : C.border }}><Ionicons name="calendar-outline" size={18} color={day === d ? '#fff' : C.teal}/><Text style={{ color: day === d ? '#fff' : C.ink, fontWeight: '800', fontSize: 11, marginTop: 7 }}>{d}</Text></TouchableOpacity>)}</View>
      <Text style={section}>Available time slots</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>{slots.map(s => <TouchableOpacity key={s} onPress={() => setSlot(s)} style={{ width: '31.5%', paddingVertical: 12, marginBottom: 9, borderRadius: 12, alignItems: 'center', backgroundColor: slot === s ? '#DDF5F0' : C.white, borderWidth: 1, borderColor: slot === s ? C.teal : C.border }}><Text style={{ color: slot === s ? C.teal : C.ink, fontWeight: '700', fontSize: 11 }}>{s}</Text></TouchableOpacity>)}</View>
      <Text style={section}>Reason for visit</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{['General consultation', 'Follow-up', 'Second opinion'].map(r => <TouchableOpacity key={r} onPress={() => setReason(r)} style={{ padding: 10, marginRight: 7, marginBottom: 7, borderRadius: 12, backgroundColor: reason === r ? '#DDF5F0' : C.white, borderColor: reason === r ? C.teal : C.border, borderWidth: 1 }}><Text style={{ fontSize: 10, color: reason === r ? C.teal : C.muted, fontWeight: '700' }}>{r}</Text></TouchableOpacity>)}</View>
      <PrimaryButton title="Confirm booking" icon="checkmark-circle" onPress={book} style={{ marginTop: 14 }}/>
    </ScrollView>
  </Screen>;
}

export function ConfirmationScreen({ navigation, route }) {
  const { doctor, day, slot, reason, bookingId } = route.params;
  return <Screen style={{ justifyContent: 'center' }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 25, alignItems: 'center' }}>
      <View style={{ width: 86, height: 86, borderRadius: 30, backgroundColor: '#DDF5EC', alignItems: 'center', justifyContent: 'center' }}><Ionicons name="checkmark-circle" size={57} color={C.green}/></View>
      <Text style={{ color: C.ink, fontSize: 25, fontWeight: '900', marginTop: 20 }}>You're booked!</Text>
      <Text style={{ color: C.muted, textAlign: 'center', fontSize: 13, lineHeight: 20, marginTop: 8 }}>Your appointment has been added to the demo schedule.</Text>
      <View style={{ backgroundColor: C.white, borderRadius: 21, borderWidth: 1, borderColor: C.border, padding: 18, width: '100%', marginTop: 26 }}>
        <Text style={{ color: C.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1 }}>BOOKING REFERENCE</Text><Text style={{ color: C.teal, fontWeight: '900', fontSize: 19, marginTop: 5 }}>{bookingId}</Text>
        <View style={{ height: 1, backgroundColor: C.border, marginVertical: 16 }}/>
        {[['Doctor', doctor.name], ['Specialty', doctor.specialty], ['Date', day], ['Time', slot], ['Visit reason', reason], ['Consultation fee', `₹${doctor.fee}`}].map(([k,v]) => <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 13 }}><Text style={{ color: C.muted, fontSize: 12 }}>{k}</Text><Text style={{ color: C.ink, fontSize: 12, fontWeight: '800', maxWidth: '60%', textAlign: 'right' }}>{v}</Text></View>)}
      </View>
      <PrimaryButton title="Back to home" icon="home" onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} style={{ width: '100%', marginTop: 20 }}/>
      <Text style={{ color: C.muted, fontSize: 10, textAlign: 'center', marginTop: 12 }}>Demo only — no real appointment or payment is created.</Text>
    </ScrollView>
  </Screen>;
}
const section = { color: C.ink, fontWeight: '900', fontSize: 15, marginTop: 22, marginBottom: 11 };
