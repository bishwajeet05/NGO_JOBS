-- Add employer_id to grants and events tables for employer ownership
ALTER TABLE grants ADD COLUMN employer_id UUID REFERENCES users(id);
ALTER TABLE events ADD COLUMN employer_id UUID REFERENCES users(id); 