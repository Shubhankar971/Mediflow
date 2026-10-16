export const doctors = [
  { id: 'd1', name: 'Dr. Aanya Mehta', specialty: 'Cardiology', experience: '12 years', rating: '4.9', availability: 'Available today', fee: 800, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80', about: 'Focused on preventive cardiology, heart-health reviews and long-term patient care.' },
  { id: 'd2', name: 'Dr. Rohan Shah', specialty: 'Dermatology', experience: '9 years', rating: '4.8', availability: 'Available today', fee: 650, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80', about: 'Provides evidence-based care for common skin conditions and routine skin checks.' },
  { id: 'd3', name: 'Dr. Isha Kulkarni', specialty: 'Pediatrics', experience: '10 years', rating: '4.9', availability: 'Tomorrow', fee: 700, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&auto=format&fit=crop&q=80', about: 'Supports child wellness, preventive visits and family-centred pediatric care.' },
  { id: 'd4', name: 'Dr. Kabir Nair', specialty: 'Orthopedics', experience: '15 years', rating: '4.7', availability: 'Available today', fee: 900, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80', about: 'Specializes in joint health, injury assessment and mobility-focused treatment plans.' },
  { id: 'd5', name: 'Dr. Neha Rao', specialty: 'Neurology', experience: '11 years', rating: '4.8', availability: 'Tomorrow', fee: 1000, image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&auto=format&fit=crop&q=80', about: 'Helps patients navigate neurological evaluations and follow-up care.' }
];

export const appointmentsSeed = [
  { id: 'a1', patient: 'Aarav Patil', doctor: 'Dr. Aanya Mehta', specialty: 'Cardiology', time: '09:30 AM', date: 'Today', status: 'Confirmed', color: '#DDF5F0' },
  { id: 'a2', patient: 'Mira Desai', doctor: 'Dr. Rohan Shah', specialty: 'Dermatology', time: '10:15 AM', date: 'Today', status: 'Waiting', color: '#FFF0D9' },
  { id: 'a3', patient: 'Vihaan Joshi', doctor: 'Dr. Isha Kulkarni', specialty: 'Pediatrics', time: '11:00 AM', date: 'Today', status: 'Confirmed', color: '#E8E9FF' }
];

export const patients = [
  { id: 'p1', name: 'Aarav Patil', age: 42, code: 'PT-1042', visit: 'Cardiology follow-up', status: 'Follow-up due' },
  { id: 'p2', name: 'Mira Desai', age: 29, code: 'PT-1038', visit: 'Dermatology review', status: 'Checked in' },
  { id: 'p3', name: 'Vihaan Joshi', age: 7, code: 'PT-1035', visit: 'Pediatric consultation', status: 'Upcoming' },
  { id: 'p4', name: 'Anaya Kulkarni', age: 56, code: 'PT-1029', visit: 'Routine health review', status: 'Needs review' }
];

export const departments = [
  { id: 'dep1', name: 'Cardiology', subtitle: 'Heart & circulation', icon: 'heart-pulse', color: '#E4F4F2', count: '8 doctors', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80' },
  { id: 'dep2', name: 'Dermatology', subtitle: 'Skin health', icon: 'hand', color: '#FFF0E5', count: '5 doctors', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=80' },
  { id: 'dep3', name: 'Pediatrics', subtitle: 'Care for children', icon: 'baby', color: '#E9E9FF', count: '6 doctors', image: 'https://images.unsplash.com/photo-1632053002928-191d7f6d6c13?w=600&auto=format&fit=crop&q=80' },
  { id: 'dep4', name: 'Orthopedics', subtitle: 'Bones & mobility', icon: 'bone', color: '#E3EFFC', count: '4 doctors', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=80' }
];

export const services = [
  { id: 's1', name: 'Full Body Checkup', subtitle: '80+ health parameters', price: '₹1,499', tag: 'Popular', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80' },
  { id: 's2', name: 'Blood Test Panel', subtitle: 'Reports in 24 hours', price: '₹799', tag: 'At-home option', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&auto=format&fit=crop&q=80' },
  { id: 's3', name: 'Imaging & Scan', subtitle: 'Modern diagnostic suite', price: 'From ₹999', tag: 'Book slot', image: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=600&auto=format&fit=crop&q=80' }
];

export const facilities = [
  { id: 'f1', name: 'Emergency Care', subtitle: '24/7 assistance', icon: 'shield-plus', color: '#FCE8E8' },
  { id: 'f2', name: 'Pharmacy', subtitle: 'In-hospital pharmacy', icon: 'pill', color: '#E2F5EC' },
  { id: 'f3', name: 'Private Rooms', subtitle: 'Comfort-first stays', icon: 'bed-double', color: '#E8EDFF' },
  { id: 'f4', name: 'Parking', subtitle: 'Visitor parking', icon: 'car-front', color: '#FFF0DC' }
];

export const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM'];
export const specialties = ['All', 'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology'];
