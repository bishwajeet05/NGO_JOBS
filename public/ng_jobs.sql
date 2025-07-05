-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Auto-generated UUID for id
    user_id VARCHAR(50) NOT NULL UNIQUE, -- Unique user identifier (e.g., username or email)
    password VARCHAR(255) NOT NULL, -- Hashed password
    email VARCHAR(255) NOT NULL UNIQUE, -- User's email, unique
    first_name VARCHAR(100), -- User's first name
    last_name VARCHAR(100), -- User's last name
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Auto-generated creation timestamp
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP -- Auto-generated update timestamp
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

-- Create the jobs table
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Auto-generated UUID for id
    title VARCHAR(255) NOT NULL, -- Job title
    slug VARCHAR(255) NOT NULL UNIQUE, -- Unique slug for the job
    description TEXT NOT NULL, -- Detailed job description
    responsibilities TEXT NOT NULL, -- Job responsibilities
    qualifications TEXT NOT NULL, -- Required qualifications
    requirements TEXT NOT NULL, -- Job requirements
    career_prospects TEXT NOT NULL, -- Career prospects
    role_category VARCHAR(100) NOT NULL, -- Role category
    role_type VARCHAR(100) NOT NULL, -- Role type
    employment_type VARCHAR(50) NOT NULL, -- Employment type (e.g., FULL_TIME, PART_TIME)
    experience_min INTEGER NOT NULL CHECK (experience_min >= 0), -- Minimum experience in years
    experience_max INTEGER NOT NULL CHECK (experience_max >= experience_min), -- Maximum experience in years
    education_required TEXT NOT NULL, -- Required education
    industry_type VARCHAR(100) NOT NULL, -- Industry type
    department VARCHAR(100) NOT NULL, -- Department
    key_skills TEXT NOT NULL, -- Comma-separated key skills
    salary_currency VARCHAR(10) NOT NULL, -- Currency code (e.g., USD)
    salary_value DECIMAL(10, 2) NOT NULL CHECK (salary_value >= 0), -- Salary value
    salary_unit_text VARCHAR(20) NOT NULL, -- Salary unit (e.g., HOUR, MONTH, YEAR)
    date_posted DATE NOT NULL, -- Date the job was posted
    valid_through TIMESTAMP WITH TIME ZONE NOT NULL, -- Job validity end date/time
    user_id VARCHAR(50) NOT NULL, -- Foreign key to users table (references user_id)
    is_remote BOOLEAN NOT NULL DEFAULT FALSE, -- Whether the job is remote
    is_active BOOLEAN NOT NULL DEFAULT TRUE, -- Whether the job is active
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Auto-generated creation timestamp
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Auto-generated update timestamp

    -- Add foreign key constraint to user_id
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT
);

-- Create an index on slug for faster lookups
CREATE INDEX idx_jobs_slug ON jobs(slug);

-- Create a trigger to automatically update the updated_at timestamp for jobs
CREATE TRIGGER trigger_update_jobs_updated_at
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_timestamp();

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

