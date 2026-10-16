import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { appointmentsSeed, departments, facilities, patients, services } from '../data/mockData';
import { C, Screen, Header, SectionTitle, StatCard, PrimaryButton, EmptyState, RemoteImage, styles } from '../components/UI';
import { AppointmentCard, BrowseCard } from '../components/Cards';

const quickActions = [
  { label: 'Patients', icon: 'people-outline', screen: 'Patients', color: '#E1F3F0' },
  { label: 'Doctors', icon: 'medkit-outline', screen: 'Doctors', color: '#E8E9FF' },
  { label: 'Appointments', icon: 'calendar-outline', screen: 'Appointments', color: '#FFF0DC' },
  { label: 'Departments', icon: 'business-outline', screen: 'Departments', color: '#E1EDFF' }
];

export function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const filteredDepartments = departments.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));
  const goDoctors = () => navigation.navigate('Doctors', { search: query });
  const Section = ({ title, action, data, render, onAll }) => <View>
    <SectionTitle title={title} action={action || 'View all'} onPress={onAll}/>
    <FlatList horizontal data={data} renderItem={render} keyExtractor={i => i.id} showsHorizontalScrollIndicator={false} />
  </View>;
  return <Screen>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
      <Header title="Good morning 👋" subtitle="Welcome to MediFlow Health" right={<View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="notifications-outline" size={20} color={C.teal}/></View>}/>
      <View style={{ backgroundColor: C.white, borderColor: C.border, borderWidth: 1, borderRadius: 15, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 17 }}>
        <Ionicons name="search-outline" size={19} color={C.muted}/>
        <TextInput placeholder="Search doctors, departments, services" placeholderTextColor="#93A1AC" value={query} onChangeText={setQuery} style={{ flex: 1, paddingVertical: 13, paddingHorizontal: 9, color: C.ink, fontSize: 12 }} returnKeyType="search" onSubmitEditing={goDoctors}/>
        <TouchableOpacity onPress={goDoctors}><Ionicons name="arrow-forward-circle" size={25} color={C.teal}/></TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Departments')} style={{ backgroundColor: '#087F8C', borderRadius: 21, padding: 18, flexDirection: 'row', overflow: 'hidden', minHeight: 146 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: '#BDEFE8', fontSize: 10, fontWeight: '800', letterSpacing: 1 }}>HEALTHY YOU, EVERY DAY</Text>
          <Text style={{ color: '#fff', fontWeight: '900', fontSize: 20, lineHeight: 26, marginTop: 7 }}>Your annual checkup,{"\n"}made simple.</Text>
          <Text style={{ color: '#E2F8F5', fontSize: 11, marginTop: 7 }}>Full body package from ₹1,499</Text>
          <View style={{ alignSelf: 'flex-start', marginTop: 12, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7 }}><Text style={{ color: C.teal, fontSize: 10, fontWeight: '900' }}>Explore packages  →</Text></View>
        </View>
        <View style={{ width: 70, justifyContent: 'center', alignItems: 'center' }}><View style={{ width: 66, height: 66, borderRadius: 22, backgroundColor: '#FFFFFF25', alignItems: 'center', justifyContent: 'center' }}><Ionicons name="heart" size={40} color="#fff"/></View></View>
      </TouchableOpacity>
      <Section title="Explore departments" data={filteredDepartments} onAll={() => navigation.navigate('Departments')} render={({ item }) => <BrowseCard item={item} onPress={() => navigation.navigate('Doctors', { specialty: item.name })}/>}/>
      <Section title="Find a doctor" data={require('../data/mockData').doctors.slice(0, 4).map(d => ({ ...d, subtitle: d.specialty, name: d.name, count: `★ ${d.rating} · ${d.availability}`, image: d.image }))} onAll={goDoctors} render={({ item }) => <BrowseCard item={item} onPress={() => navigation.navigate('DoctorProfile', { doctor: item })} width={165}/>}/>
      <Section title="Diagnostic services" data={services} onAll={() => navigation.navigate('Facilities')} render={({ item }) => <BrowseCard item={item} onPress={() => navigation.navigate('Facilities')}/>}/>
      <Section title="Hospital facilities" data={facilities} onAll={() => navigation.navigate('Facilities')} render={({ item }) => <BrowseCard item={item} onPress={() => navigation.navigate('Facilities')} width={145}/>}/>
    </ScrollView>
  </Screen>;
}

export function DashboardScreen({ navigation }) {
  return <Screen>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
      <Header title="Staff dashboard" subtitle="Friday, 16 October · Shift overview"/>
      <View style={{ backgroundColor: C.teal, borderRadius: 18, padding: 17, marginBottom: 16 }}>
        <Text style={{ color: '#BCECE8', fontWeight: '700', fontSize: 11 }}>DAILY OPERATIONS</Text>
        <Text style={{ color: '#fff', fontWeight: '900', fontSize: 22, marginTop: 6 }}>Good work starts here.</Text>
        <Text style={{ color: '#E0F8F5', fontSize: 12, marginTop: 5 }}>Your care team is ready for today.</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <StatCard label="Total patients" value="128" icon="people" note="+12 this week" tint="#DDF5F0"/>
        <StatCard label="Appointments" value="24" icon="calendar" note="6 upcoming" tint="#E7E8FF"/>
        <StatCard label="Doctors available" value="18" icon="medkit" note="Across 6 departments" tint="#FFF0DC"/>
        <StatCard label="Pending tasks" value="07" icon="checkbox" note="3 need attention" tint="#FCE6E6"/>
      </View>
      <SectionTitle title="Quick actions"/>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {quickActions.map(a => <TouchableOpacity key={a.label} onPress={() => a.screen === 'Doctors' ? navigation.navigate('MainTabs', { screen: 'Doctors' }) : navigation.navigate(a.screen)} style={{ width: '48.5%', backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 17, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: a.color, alignItems: 'center', justifyContent: 'center', marginRight: 9 }}><Ionicons name={a.icon} size={19} color={C.teal}/></View>
          <View style={{ flex: 1 }}><Text style={{ color: C.ink, fontWeight: '800', fontSize: 12 }}>{a.label}</Text><Text style={{ color: C.muted, fontSize: 10, marginTop: 3 }}>Open module</Text></View>
          <Ionicons name="chevron-forward" size={15} color={C.muted}/>
        </TouchableOpacity>)}
      </View>
      <SectionTitle title="Recent appointments" action="View all" onPress={() => navigation.navigate('Appointments')}/>
      <FlatList data={appointmentsSeed} scrollEnabled={false} keyExtractor={i => i.id} renderItem={({ item }) => <AppointmentCard item={item} onPress={() => navigation.navigate('Appointments')}/>}/>
    </ScrollView>
  </Screen>;
}

export function PatientsScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const filtered = patients.filter(p => `${p.name} ${p.code} ${p.visit}`.toLowerCase().includes(query.toLowerCase()));
  return <Screen><Header title="Patients" subtitle={`${patients.length} patient records`} onBack={() => navigation.goBack()}/>
    <View style={searchBox}><Ionicons name="search-outline" size={18} color={C.muted}/><TextInput value={query} onChangeText={setQuery} placeholder="Search patient or ID" style={searchInput}/></View>
    <FlatList data={filtered} keyExtractor={i => i.id} contentContainerStyle={{ paddingBottom: 20 }} ListEmptyComponent={<EmptyState title="No patients found" body="Try another name or patient ID."/>} renderItem={({ item }) => <View style={listCard}>
      <View style={patientAvatar}><Ionicons name="person" size={20} color={C.teal}/></View><View style={{ flex: 1 }}><Text style={strong}>{item.name}</Text><Text style={muted}>{item.code} · Age {item.age}</Text><Text style={[muted, { marginTop: 5 }]}>{item.visit}</Text></View><View style={{ backgroundColor: '#E5F5F3', padding: 7, borderRadius: 8 }}><Text style={{ color: C.teal, fontSize: 9, fontWeight: '800' }}>{item.status}</Text></View>
    </View>}/></Screen>;
}

export function AppointmentsScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState(appointmentsSeed);
  const [query, setQuery] = useState('');
  const routeItems = navigation.getState ? items : items;
  const filtered = routeItems.filter(a => (filter === 'All' || a.status === filter) && `${a.patient} ${a.doctor} ${a.specialty}`.toLowerCase().includes(query.toLowerCase()));
  return <Screen><Header title="Appointments" subtitle="Manage today's schedule" right={<TouchableOpacity onPress={() => navigation.navigate('Doctors')} style={styles.back}><Ionicons name="add" size={24} color={C.teal}/></TouchableOpacity>}/>
    <View style={searchBox}><Ionicons name="search-outline" size={18} color={C.muted}/><TextInput value={query} onChangeText={setQuery} placeholder="Search patient or doctor" style={searchInput}/></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 44, marginBottom: 12 }}>{['All','Confirmed','Waiting'].map(x => <View key={x}><TouchableOpacity onPress={() => setFilter(x)} style={{ backgroundColor: filter === x ? C.teal : C.white, borderColor: filter === x ? C.teal : C.border, borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 9, marginRight: 8 }}><Text style={{ color: filter === x ? '#fff' : C.muted, fontWeight: '700', fontSize: 12 }}>{x}</Text></TouchableOpacity></View>)}</ScrollView>
    <FlatList data={filtered} keyExtractor={i => i.id} ListEmptyComponent={<EmptyState title="No matching appointments" body="Change the status filter or search term."/>} renderItem={({ item }) => <AppointmentCard item={item} onPress={() => {}}/>}/>
    <PrimaryButton title="Book an appointment" icon="calendar" onPress={() => navigation.navigate('Doctors')} style={{ marginBottom: 12 }}/>
  </Screen>;
}

export function DepartmentsScreen({ navigation }) {
  return <Screen><Header title="Departments" subtitle="Care across specialties" onBack={() => navigation.goBack()}/>
    <FlatList data={departments} keyExtractor={i => i.id} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between' }} contentContainerStyle={{ paddingBottom: 20 }} renderItem={({ item }) => <TouchableOpacity onPress={() => navigation.navigate('Doctors', { specialty: item.name })} style={{ width: '48.5%', backgroundColor: C.white, borderRadius: 18, overflow: 'hidden', marginBottom: 13, borderColor: C.border, borderWidth: 1 }}>
      <View style={{ height: 110 }}><RemoteImage uri={item.image} style={{ width: '100%', height: 110 }} /><View style={{ position: 'absolute', top: 9, left: 9, zIndex: 2, backgroundColor: '#FFFFFFE8', borderRadius: 11, padding: 7 }}><Ionicons name={item.icon} size={20} color={C.teal}/></View></View>
      <View style={{ padding: 12 }}><Text style={strong}>{item.name}</Text><Text style={muted}>{item.subtitle}</Text><Text style={{ color: C.teal, fontSize: 10, fontWeight: '800', marginTop: 8 }}>{item.count}</Text></View>
    </TouchableOpacity>}/>
  </Screen>;
}

export function FacilitiesScreen({ navigation }) {
  return <Screen><Header title="Services & facilities" subtitle="Everything you need in one place" onBack={() => navigation.goBack()}/>
    <ScrollView showsVerticalScrollIndicator={false}>
      <SectionTitle title="Diagnostic services"/>
      {services.map(s => <View key={s.id} style={listCard}><View style={{ width: 65, height: 65, borderRadius: 13, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}><Ionicons name="flask-outline" size={25} color={C.teal}/></View><View style={{ flex: 1 }}><Text style={strong}>{s.name}</Text><Text style={muted}>{s.subtitle}</Text><Text style={{ color: C.teal, fontWeight: '800', marginTop: 5 }}>{s.price}</Text></View><TouchableOpacity onPress={() => navigation.navigate('Doctors')}><Ionicons name="arrow-forward-circle" size={26} color={C.teal}/></TouchableOpacity></View>)}
      <SectionTitle title="Hospital facilities"/>
      {facilities.map(f => <View key={f.id} style={listCard}><View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: f.color, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}><Ionicons name={f.icon} size={23} color={C.teal}/></View><View style={{ flex: 1 }}><Text style={strong}>{f.name}</Text><Text style={muted}>{f.subtitle}</Text></View><Ionicons name="checkmark-circle" size={20} color={C.green}/></View>)}
    </ScrollView>
  </Screen>;
}

const searchBox = { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, marginBottom: 14 };
const searchInput = { flex: 1, paddingVertical: 12, paddingHorizontal: 9, color: C.ink, fontSize: 12 };
const listCard = { flexDirection: 'row', alignItems: 'center', padding: 13, borderRadius: 16, backgroundColor: C.white, borderWidth: 1, borderColor: C.border, marginBottom: 10 };
const patientAvatar = { width: 42, height: 42, borderRadius: 14, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center', marginRight: 11 };
const strong = { color: C.ink, fontWeight: '800', fontSize: 13 };
const muted = { color: C.muted, fontSize: 10, marginTop: 4 };
