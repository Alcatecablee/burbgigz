import { supabaseAdmin, isSupabaseAvailable } from '../lib/supabase'

// SQL schema to create tables
const createTablesSQL = `
-- Users table for customer profiles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  service_area TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  problem_description TEXT,
  urgency TEXT DEFAULT 'normal',
  estimated_cost DECIMAL(10,2),
  callout_fee DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  is_new_customer BOOLEAN DEFAULT true,
  preferred_contact TEXT DEFAULT 'email',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Areas table
CREATE TABLE IF NOT EXISTS service_areas (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  callout_fee DECIMAL(10,2) DEFAULT 0,
  distance_km INTEGER,
  is_active BOOLEAN DEFAULT true,
  availability TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Pricing table
CREATE TABLE IF NOT EXISTS service_pricing (
  id SERIAL PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_category TEXT NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Sessions table
CREATE TABLE IF NOT EXISTS service_sessions (
  id SERIAL PRIMARY KEY,
  customer_id UUID REFERENCES users(id),
  booking_id INTEGER REFERENCES bookings(id),
  session_title TEXT NOT NULL,
  description TEXT,
  session_type TEXT,
  status TEXT DEFAULT 'scheduled',
  priority TEXT DEFAULT 'normal',
  estimated_duration INTEGER,
  actual_duration INTEGER,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  technician_id INTEGER,
  notes TEXT,
  total_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File Attachments table
CREATE TABLE IF NOT EXISTS file_attachments (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES service_sessions(id),
  booking_id INTEGER REFERENCES bookings(id),
  customer_id UUID REFERENCES users(id),
  file_name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session Status Updates table
CREATE TABLE IF NOT EXISTS session_status_updates (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES service_sessions(id) NOT NULL,
  status TEXT,
  message TEXT,
  progress INTEGER DEFAULT 0,
  technician_name TEXT,
  is_customer_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer Interactions table
CREATE TABLE IF NOT EXISTS customer_interactions (
  id SERIAL PRIMARY KEY,
  customer_id UUID REFERENCES users(id) NOT NULL,
  session_id INTEGER REFERENCES service_sessions(id),
  interaction_type TEXT NOT NULL,
  message TEXT,
  technician_name TEXT,
  is_from_customer BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_sessions_customer ON service_sessions(customer_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON service_sessions(status);
CREATE INDEX IF NOT EXISTS idx_file_attachments_session ON file_attachments(session_id);
CREATE INDEX IF NOT EXISTS idx_status_updates_session ON session_status_updates(session_id);
CREATE INDEX IF NOT EXISTS idx_interactions_customer ON customer_interactions(customer_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_status_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for service_sessions table
CREATE POLICY "Users can view own sessions" ON service_sessions
  FOR SELECT USING (auth.uid() = customer_id);

-- RLS Policies for file_attachments table
CREATE POLICY "Users can view own files" ON file_attachments
  FOR SELECT USING (auth.uid() = customer_id OR is_public = true);

CREATE POLICY "Users can upload files" ON file_attachments
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- RLS Policies for session_status_updates table
CREATE POLICY "Users can view session updates" ON session_status_updates
  FOR SELECT USING (
    session_id IN (
      SELECT id FROM service_sessions WHERE customer_id = auth.uid()
    ) AND is_customer_visible = true
  );

-- RLS Policies for customer_interactions table
CREATE POLICY "Users can view own interactions" ON customer_interactions
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Users can create interactions" ON customer_interactions
  FOR INSERT WITH CHECK (auth.uid() = customer_id);
`;

export async function initializeSupabaseSchema() {
  try {
    if (!isSupabaseAvailable()) {
      console.log('⚠️ Supabase not available - missing environment variables')
      return { success: false, error: 'Supabase not configured' }
    }

    console.log('Initializing Supabase database schema...')
    
    const { data, error } = await supabaseAdmin!
      .rpc('exec_sql', { sql: createTablesSQL })
    
    if (error) {
      console.error('Error creating schema:', error)
      return { success: false, error }
    }
    
    console.log('✅ Supabase database schema initialized successfully')
    return { success: true, data }
  } catch (err) {
    console.error('Failed to initialize schema:', err)
    return { success: false, error: err }
  }
}

// Create some sample data
export async function createSampleData() {
  try {
    if (!isSupabaseAvailable()) {
      console.log('⚠️ Supabase not available - missing environment variables')
      return { success: false, error: 'Supabase not configured' }
    }

    console.log('Creating sample service areas...')
    
    // Insert sample service areas
    const { error: areasError } = await supabaseAdmin!
      .from('service_areas')
      .upsert([
        {
          name: 'Lombardy East',
          description: 'Primary service area - no callout fee',
          callout_fee: 0,
          distance_km: 0,
          is_active: true,
          availability: 'Available 24/7 for emergencies'
        },
        {
          name: 'Johannesburg CBD',
          description: 'City center and surrounding areas',
          callout_fee: 150,
          distance_km: 15,
          is_active: true,
          availability: 'Business hours: 8AM-6PM'
        },
        {
          name: 'Sandton',
          description: 'Business district and residential areas',
          callout_fee: 200,
          distance_km: 25,
          is_active: true,
          availability: 'Business hours: 8AM-6PM'
        }
      ])
    
    if (areasError) {
      console.error('Error creating service areas:', areasError)
    }
    
    // Insert sample service pricing
    const { error: pricingError } = await supabaseAdmin!
      .from('service_pricing')
      .upsert([
        {
          service_name: 'Remote Support Session',
          service_category: 'Remote',
          base_price: 250,
          description: 'Secure remote troubleshooting and support',
          is_active: true
        },
        {
          service_name: 'Virus Removal',
          service_category: 'Remote',
          base_price: 350,
          description: 'Complete malware and virus cleaning',
          is_active: true
        },
        {
          service_name: 'SSD Installation',
          service_category: 'Hardware',
          base_price: 300,
          description: 'Install and configure new SSD drive',
          is_active: true
        },
        {
          service_name: 'RAM Upgrade',
          service_category: 'Hardware',
          base_price: 200,
          description: 'Install additional memory modules',
          is_active: true
        }
      ])
    
    if (pricingError) {
      console.error('Error creating service pricing:', pricingError)
    }
    
    console.log('✅ Sample data created successfully')
    return { success: true }
  } catch (err) {
    console.error('Failed to create sample data:', err)
    return { success: false, error: err }
  }
}