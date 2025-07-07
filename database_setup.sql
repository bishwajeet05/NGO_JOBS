-- Unified NGO Jobs Database Schema
-- Run this SQL to set up your database properly

-- Drop existing tables if they exist (be careful in production!)
DROP TABLE IF EXISTS shortlists CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS grants CASCADE;
DROP TABLE IF EXISTS events CASCADE;

-- Create the users table (unified schema)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(50) UNIQUE, -- For backward compatibility
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'candidate',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger to automatically update the updated_at timestamp for users
CREATE OR REPLACE FUNCTION update_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_timestamp();

-- Create the jobs table (unified schema)
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    responsibilities TEXT,
    qualifications TEXT NOT NULL,
    requirements TEXT,
    career_prospects TEXT,
    role_category VARCHAR(100),
    role_type VARCHAR(100),
    employment_type VARCHAR(50),
    experience_min INTEGER,
    experience_max INTEGER,
    education_required TEXT,
    industry_type VARCHAR(100),
    department VARCHAR(100),
    key_skills TEXT,
    salary_currency VARCHAR(10),
    salary_value DECIMAL(10, 2),
    salary_unit_text VARCHAR(20),
    date_posted DATE,
    valid_through TIMESTAMP WITH TIME ZONE,
    user_id VARCHAR(50), -- References users.user_id
    employer_id UUID, -- References users.id
    is_remote BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    organization VARCHAR(255),
    organization_type VARCHAR(100),
    location_id VARCHAR(100),
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    pin_code VARCHAR(20),
    street_address VARCHAR(255),
    applylink TEXT,
    how_to_apply TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on slug for faster lookups
CREATE INDEX idx_jobs_slug ON jobs(slug);

-- Create a trigger to automatically update the updated_at timestamp for jobs
CREATE TRIGGER trigger_update_jobs_updated_at
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_timestamp();

-- Create applications table
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'submitted',
    applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create shortlists table
CREATE TABLE shortlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Grants Table
CREATE TABLE grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    sector VARCHAR(255),
    eligible TEXT,
    amount VARCHAR(100),
    deadline DATE,
    link TEXT,
    rfp_url TEXT,
    description TEXT,
    tags VARCHAR(255),
    status VARCHAR(50),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    organizer VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    mode VARCHAR(50),
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    link TEXT,
    email VARCHAR(255),
    poster_url TEXT,
    description TEXT,
    tags VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (id, user_id, name, email, password, first_name, last_name, role) VALUES
(gen_random_uuid(), 'superadmin', 'Super Admin', 'admin@ngo.com', '$2a$10$hashedpassword', 'Super', 'Admin', 'super_admin'),
(gen_random_uuid(), 'employer1', 'Global Relief', 'employer1@ngo.com', '$2a$10$hashedpassword', 'Global', 'Relief', 'employer'),
(gen_random_uuid(), 'employer2', 'Humanitarian Aid', 'employer2@ngo.com', '$2a$10$hashedpassword', 'Humanitarian', 'Aid', 'employer'),
(gen_random_uuid(), 'candidate1', 'Alice Candidate', 'alice@ngo.com', '$2a$10$hashedpassword', 'Alice', 'Candidate', 'candidate'),
(gen_random_uuid(), 'candidate2', 'Bob Candidate', 'bob@ngo.com', '$2a$10$hashedpassword', 'Bob', 'Candidate', 'candidate');

-- Insert sample jobs
INSERT INTO jobs (id, title, slug, description, qualifications, role_category, employment_type, experience_min, salary_currency, salary_value, salary_unit_text, date_posted, valid_through, organization, organization_type, country, state, city, is_active, featured) VALUES
(gen_random_uuid(), 'Project Manager – Education', 'project-manager-education', 'Lead and manage education projects, coordinate with stakeholders, and ensure timely delivery of project milestones.', 'Project Management, Communication, MS Office', 'Education', 'Full-time', 5, 'INR', 65000.00, 'YEAR', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '30 days', 'Teach For All', 'NGO', 'India', 'Maharashtra', 'Mumbai', true, true),
(gen_random_uuid(), 'Health Coordinator', 'health-coordinator', 'Coordinate health programs and initiatives in rural communities.', 'Public Health, Community Development, Communication', 'Health', 'Full-time', 3, 'INR', 45000.00, 'YEAR', CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE + INTERVAL '25 days', 'Doctors Without Borders', 'NGO', 'India', 'Karnataka', 'Bangalore', true, false),
(gen_random_uuid(), 'Finance Manager', 'finance-manager', 'Manage financial operations and ensure compliance with donor requirements.', 'Finance, Accounting, Budget Management', 'Finance', 'Full-time', 7, 'INR', 75000.00, 'YEAR', CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE + INTERVAL '20 days', 'Oxfam India', 'NGO', 'India', 'Delhi', 'New Delhi', true, true);

-- Insert sample grants
INSERT INTO grants (title, organization, type, sector, eligible, amount, deadline, link, description, tags, status) VALUES
('Education Innovation Grant', 'Ministry of Education', 'Grant', 'Education', 'NGOs working in education sector', '₹50,00,000', CURRENT_DATE + INTERVAL '30 days', 'https://example.com/grant1', 'Supporting innovative education programs', 'education,innovation,ngo', 'Open'),
('Healthcare Access Grant', 'WHO India', 'Grant', 'Healthcare', 'Healthcare NGOs', '₹75,00,000', CURRENT_DATE + INTERVAL '45 days', 'https://example.com/grant2', 'Improving healthcare access in rural areas', 'healthcare,rural,access', 'Open');

-- Insert sample events
INSERT INTO events (title, organizer, type, mode, location, start_date, end_date, link, description, tags) VALUES
('NGO Leadership Summit 2024', 'NGO Federation', 'Conference', 'Hybrid', 'Mumbai, India', CURRENT_DATE + INTERVAL '15 days', CURRENT_DATE + INTERVAL '17 days', 'https://example.com/event1', 'Annual leadership conference for NGO professionals', 'leadership,conference,networking', 'Upcoming'),
('Digital Transformation Workshop', 'Tech for Good', 'Workshop', 'Online', 'Virtual', CURRENT_DATE + INTERVAL '7 days', CURRENT_DATE + INTERVAL '7 days', 'https://example.com/event2', 'Workshop on digital tools for NGOs', 'digital,workshop,technology', 'Upcoming');

COMMIT; 