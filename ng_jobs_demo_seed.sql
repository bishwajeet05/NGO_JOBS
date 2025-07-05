-- USERS
INSERT INTO users (id, name, email, password, role, is_active)
VALUES
  (1, 'John Doe', 'admin@ngo.com', 'admin123', 'super_admin', true),
  (2, 'Global Relief', 'employer1@ngo.com', 'employer123', 'employer', true),
  (3, 'Humanitarian Aid', 'employer2@ngo.com', 'employer123', 'employer', true),
  (4, 'Save The Children', 'employer3@ngo.com', 'employer123', 'employer', true),
  (5, 'UNICEF', 'employer4@ngo.com', 'employer123', 'employer', true),
  (6, 'Red Cross', 'employer5@ngo.com', 'employer123', 'employer', true),
  (7, 'Alice Candidate', 'alice@ngo.com', 'candidate123', 'candidate', true),
  (8, 'Bob Candidate', 'bob@ngo.com', 'candidate123', 'candidate', true),
  (9, 'Carol Candidate', 'carol@ngo.com', 'candidate123', 'candidate', true);

-- JOBS
INSERT INTO jobs (id, title, organization, role_category, employment_type, city, country, date_posted, valid_through, is_active)
VALUES
  (1, 'Project Manager', 'Global Relief', 'Management', 'Full-time', 'Delhi', 'India', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', true),
  (2, 'Field Coordinator', 'Humanitarian Aid', 'Operations', 'Full-time', 'Mumbai', 'India', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days', true),
  (3, 'Communications Officer', 'Save The Children', 'Marketing', 'Part-time', 'Bangalore', 'India', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', true),
  (4, 'Program Director', 'UNICEF', 'Management', 'Full-time', 'Chennai', 'India', NOW() - INTERVAL '5 days', NOW() + INTERVAL '25 days', true),
  (5, 'Finance Manager', 'Red Cross', 'Finance', 'Contract', 'Kolkata', 'India', NOW() - INTERVAL '2 days', NOW() + INTERVAL '30 days', true);

-- APPLICATIONS
INSERT INTO applications (id, job_id, candidate_id, status, applied_at)
VALUES
  (1, 1, 7, 'submitted', NOW() - INTERVAL '2 days'),
  (2, 1, 8, 'submitted', NOW() - INTERVAL '1 days'),
  (3, 2, 7, 'submitted', NOW() - INTERVAL '3 days'),
  (4, 2, 9, 'submitted', NOW() - INTERVAL '2 days'),
  (5, 3, 8, 'submitted', NOW() - INTERVAL '1 days'),
  (6, 4, 7, 'submitted', NOW() - INTERVAL '1 days'),
  (7, 4, 8, 'submitted', NOW() - INTERVAL '1 days'),
  (8, 5, 9, 'submitted', NOW() - INTERVAL '1 days');

-- Shortlists table for employer-candidate shortlisting
CREATE TABLE IF NOT EXISTS shortlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL,
  candidate_id UUID NOT NULL,
  job_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_shortlist_employer FOREIGN KEY(employer_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_candidate FOREIGN KEY(candidate_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_job FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE SET NULL
);