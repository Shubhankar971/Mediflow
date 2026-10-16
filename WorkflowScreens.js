import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { patients } from '../data/mockData';
import { C, Screen, Header, PrimaryButton, EmptyState } from '../components/UI';

const steps = [
  { title: 'Confirm patient', subtitle: 'Check identity and visit context', icon: 'person-circle-outline' },
  { title: 'Review follow-up', subtitle: 'Record symptoms and progress', icon: 'chatbox-ellipses-outline' },
  { title: 'Plan next steps', subtitle: 'Choose the follow-up action', icon: 'list-circle-outline' }
];

export function ClinicalWorkflowScreen({ navigation }) {
  const [selected, setSelected] = useState(patients[0].id);
  const [completed, setCompleted] = useState([]);
  const [query, setQuery] = useState('');
  const filtered = patients.filter(p => `${p.name} ${p.code}`.toLowerCase().includes(query.toLowerCase()));
  const patient = patients.find(p => p.id === selected);
  return <Screen>
    <Header title="Quick follow-up" subtitle="A 3-step guided clinical workflow"/>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={{ backgroundColor: '#087F8C', borderRadius: 20, padding: 17 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={{ width: 43, height: 43, borderRadius: 14, backgroundColor: '#FFFFFF24', alignItems: 'center', justifyContent: 'center' }}><Ionicons name="flash" size={23} color="#fff"/></View><View style={{ marginLeft: 11, flex: 1 }}><Text style={{ color: '#C8F2EC', fontSize: 10, fontWeight: '800' }}>SMART CLINICAL SHORTCUT</Text><Text style={{ color: '#fff', fontWeight: '900', fontSize: 18, marginTop: 4 }}>Finish a follow-up faster</Text></View></View>
        <Text style={{ color: '#E4F8F5', fontSize: 12, lineHeight: 18, marginTop: 13 }}>Patient context, review checklist and next action — all in one guided flow.</Text>
        <View style={{ height: 6, borderRadius: 3, backgroundColor: '#FFFFFF40', marginTop: 14, overflow: 'hidden' }}><View style={{ height: 6, width: `${completed.length / 3 * 100}%`, backgroundColor: '#B9F1D7' }}/></View>
        <Text style={{ color: '#fff', fontSize: 10, marginTop: 6 }}>{completed.length} of 3 steps complete</Text>
      </View>
      <Text style={heading}>1. Choose a patient</Text>
      <View style={{ backgroundColor: C.white, borderColor: C.border, borderWidth: 1, borderRadius: 13, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center' }}><Ionicons name="search-outline" size={17} color={C.muted}/><TextInput value={query} onChangeText={setQuery} placeholder="Search patient name or ID" style={{ padding: 11, flex: 1, fontSize: 12, color: C.ink }}/></View>
      {filtered.map(p => <TouchableOpacity key={p.id} onPress={() => { setSelected(p.id); setCompleted([]); }} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: selected === p.id ? '#E5F5F3' : C.white, borderColor: selected === p.id ? C.teal : C.border, borderWidth: 1, padding: 12, borderRadius: 14, marginTop: 8 }}>
        <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: '#D9EEEB', alignItems: 'center', justifyContent: 'center' }}><Ionicons name="person" size={18} color={C.teal}/></View>
        <View style={{ flex: 1, marginLeft: 10 }}><Text style={{ color: C.ink, fontWeight: '800', fontSize: 12 }}>{p.name}</Text><Text style={{ color: C.muted, fontSize: 10, marginTop: 3 }}>{p.code} · {p.visit}</Text></View>
        <Ionicons name={selected === p.id ? 'radio-button-on' : 'radio-button-off'} size={20} color={C.teal}/>
      </TouchableOpacity>)}
      <Text style={heading}>2. Complete workflow steps</Text>
      {steps.map((s, i) => <TouchableOpacity key={s.title} onPress={() => setCompleted(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 15, borderWidth: 1, borderColor: completed.includes(i) ? C.green : C.border, padding: 13, marginBottom: 9 }}>
        <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: completed.includes(i) ? '#DDF5EC' : C.pale, alignItems: 'center', justifyContent: 'center' }}><Ionicons name={completed.includes(i) ? 'checkmark-circle' : s.icon} size={22} color={completed.includes(i) ? C.green : C.teal}/></View>
        <View style={{ flex: 1, marginLeft: 11 }}><Text style={{ color: C.ink, fontWeight: '800', fontSize: 12 }}>{s.title}</Text><Text style={{ color: C.muted, fontSize: 10, marginTop: 4 }}>{s.subtitle}</Text></View>
        <Text style={{ color: completed.includes(i) ? C.green : C.teal, fontWeight: '800', fontSize: 10 }}>{completed.includes(i) ? 'Done' : 'Mark'}</Text>
      </TouchableOpacity>)}
      <PrimaryButton title="Review follow-up" icon="arrow-forward" disabled={completed.length !== 3 || !patient} onPress={() => navigation.navigate('WorkflowReview', { patient })} style={{ marginTop: 8 }}/>
      {completed.length !== 3 ? <Text style={{ color: C.muted, fontSize: 10, textAlign: 'center', marginTop: 8 }}>Complete all 3 checklist items to continue.</Text> : null}
    </ScrollView>
  </Screen>;
}

export function WorkflowReviewScreen({ navigation, route }) {
  const patient = route.params?.patient || patients[0];
  const [summary, setSummary] = useState('Patient reports improvement since last visit.');
  const [plan, setPlan] = useState('Schedule routine follow-up in 2 weeks.');
  const [priority, setPriority] = useState('Routine');
  return <Screen><Header title="Review follow-up" subtitle="Step 2 of 3 · Capture the plan" onBack={() => navigation.goBack()}/>
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: C.white, borderRadius: 17, padding: 15, borderWidth: 1, borderColor: C.border, flexDirection: 'row', alignItems: 'center' }}><View style={{ width: 43, height: 43, borderRadius: 14, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="person" size={20} color={C.teal}/></View><View style={{ marginLeft: 11 }}><Text style={{ color: C.ink, fontWeight: '900' }}>{patient.name}</Text><Text style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{patient.code} · {patient.visit}</Text></View></View>
      <Text style={label}>Visit summary</Text><TextInput multiline value={summary} onChangeText={setSummary} style={input} placeholder="Record the patient's reported progress"/>
      <Text style={label}>Next-step plan</Text><TextInput multiline value={plan} onChangeText={setPlan} style={input} placeholder="Add the agreed next step"/>
      <Text style={label}>Priority</Text><View style={{ flexDirection: 'row', gap: 8 }}>{['Routine', 'Soon', 'Urgent'].map(p => <TouchableOpacity key={p} onPress={() => setPriority(p)} style={{ flex: 1, alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: priority === p ? C.teal : C.border, backgroundColor: priority === p ? '#DDF5F0' : C.white }}><Text style={{ color: priority === p ? C.teal : C.muted, fontWeight: '800', fontSize: 11 }}>{p}</Text></TouchableOpacity>)}</View>
      <View style={{ backgroundColor: '#FFF6E7', borderRadius: 13, padding: 12, marginTop: 18, flexDirection: 'row' }}><Ionicons name="information-circle-outline" size={19} color="#A96D19"/><Text style={{ color: '#8A622A', fontSize: 11, lineHeight: 17, flex: 1, marginLeft: 8 }}>Demo workflow only. Do not enter real patient-identifying or clinical information.</Text></View>
      <PrimaryButton title="Complete follow-up" icon="checkmark-circle" onPress={() => {
        if (!summary.trim() || !plan.trim()) { Alert.alert('Missing details', 'Enter both the summary and next-step plan.'); return; }
        navigation.navigate('WorkflowComplete', { patient, summary, plan, priority });
      }} style={{ marginTop: 20 }}/>
    </ScrollView>
  </Screen>;
}

export function WorkflowCompleteScreen({ navigation, route }) {
  const { patient, summary, plan, priority } = route.params;
  return <Screen style={{ justifyContent: 'center' }}><ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 24 }}>
    <View style={{ width: 85, height: 85, borderRadius: 29, backgroundColor: '#DDF5EC', alignItems: 'center', justifyContent: 'center' }}><Ionicons name="checkmark-done-circle" size={56} color={C.green}/></View>
    <Text style={{ color: C.ink, fontSize: 24, fontWeight: '900', marginTop: 18 }}>Follow-up completed</Text>
    <Text style={{ color: C.muted, fontSize: 12, marginTop: 7, textAlign: 'center' }}>The demo workflow has reached its completion state.</Text>
    <View style={{ width: '100%', backgroundColor: C.white, borderRadius: 19, borderWidth: 1, borderColor: C.border, padding: 16, marginTop: 23 }}>
      <Text style={{ color: C.teal, fontSize: 10, fontWeight: '900', letterSpacing: 1 }}>COMPLETION SUMMARY</Text>
      <Text style={{ color: C.ink, fontWeight: '900', fontSize: 16, marginTop: 8 }}>{patient.name}</Text>
      <Text style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{patient.code} · Priority: {priority}</Text>
      <Text style={label}>Visit summary</Text><Text style={{ color: C.ink, fontSize: 12, lineHeight: 19 }}>{summary}</Text>
      <Text style={label}>Next-step plan</Text><Text style={{ color: C.ink, fontSize: 12, lineHeight: 19 }}>{plan}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, backgroundColor: '#E5F5F3', padding: 11, borderRadius: 12 }}><Ionicons name="shield-checkmark-outline" size={19} color={C.teal}/><Text style={{ color: C.tealDark, fontSize: 10, fontWeight: '700', marginLeft: 8, flex: 1 }}>All checklist items marked complete</Text></View>
    </View>
    <PrimaryButton title="Start another follow-up" icon="refresh" onPress={() => navigation.navigate('MainTabs', { screen: 'Workflow' })} style={{ width: '100%', marginTop: 20 }}/>
    <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Dashboard' })} style={{ padding: 14 }}><Text style={{ color: C.teal, fontWeight: '800', fontSize: 12 }}>Return to staff dashboard</Text></TouchableOpacity>
  </ScrollView></Screen>;
}
const heading = { color: C.ink, fontSize: 15, fontWeight: '900', marginTop: 20, marginBottom: 10 };
const label = { color: C.ink, fontSize: 13, fontWeight: '900', marginTop: 19, marginBottom: 8 };
const input = { minHeight: 95, borderRadius: 14, backgroundColor: C.white, borderColor: C.border, borderWidth: 1, padding: 13, color: C.ink, fontSize: 12, textAlignVertical: 'top' };
