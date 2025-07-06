-- Migration: NGO Jobs Schema

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    responsibilities TEXT,
    qualifications TEXT NOT NULL,
    requirements TEXT,
    career_prospects TEXT,
    role_category VARCHAR(100),
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
    user_id VARCHAR(50),
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

-- Grants Table
CREATE TABLE IF NOT EXISTS grants (
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
CREATE TABLE IF NOT EXISTS events (
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