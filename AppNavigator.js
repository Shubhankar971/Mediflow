import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../components/UI';
import { HomeScreen, DashboardScreen, PatientsScreen, AppointmentsScreen, DepartmentsScreen, FacilitiesScreen } from '../screens/CoreScreens';
import { DoctorsScreen, DoctorProfileScreen, BookingScreen, ConfirmationScreen } from '../screens/DoctorScreens';
import { ClinicalWorkflowScreen, WorkflowReviewScreen, WorkflowCompleteScreen } from '../screens/WorkflowScreens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false, tabBarActiveTintColor: C.teal, tabBarInactiveTintColor: '#8B9AA5',
    tabBarStyle: { height: 63, paddingBottom: 8, paddingTop: 6, borderTopColor: C.border, backgroundColor: '#fff' },
    tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
    tabBarIcon: ({ color, size }) => {
      const icons = { Home: 'home-outline', Dashboard: 'grid-outline', Doctors: 'medkit-outline', Appointments: 'calendar-outline', Workflow: 'clipboard-outline' };
      return <Ionicons name={icons[route.name]} size={size} color={color}/>;
    }
  })}>
    <Tab.Screen name="Home" component={HomeScreen}/>
    <Tab.Screen name="Dashboard" component={DashboardScreen}/>
    <Tab.Screen name="Doctors" component={DoctorsScreen}/>
    <Tab.Screen name="Appointments" component={AppointmentsScreen}/>
    <Tab.Screen name="Workflow" component={ClinicalWorkflowScreen}/>
  </Tab.Navigator>;
}

export default function AppNavigator() {
  return <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: C.bg } }}>
      <Stack.Screen name="MainTabs" component={MainTabs}/>
      <Stack.Screen name="Patients" component={PatientsScreen}/>
      <Stack.Screen name="Departments" component={DepartmentsScreen}/>
      <Stack.Screen name="Facilities" component={FacilitiesScreen}/>
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen}/>
      <Stack.Screen name="Booking" component={BookingScreen}/>
      <Stack.Screen name="Confirmation" component={ConfirmationScreen}/>
      <Stack.Screen name="WorkflowReview" component={WorkflowReviewScreen}/>
      <Stack.Screen name="WorkflowComplete" component={WorkflowCompleteScreen}/>
    </Stack.Navigator>
  </NavigationContainer>;
}
