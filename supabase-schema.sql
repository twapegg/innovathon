-- Supabase SQL Schema for Youth Wellbeing Agentic System
-- Run this in your Supabase SQL Editor to create the required tables

-- ============================================================================
-- CHILDREN / USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS children (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  nickname TEXT,
  age INTEGER,
  parent_id UUID,
  theme TEXT DEFAULT 'adventure' CHECK (theme IN ('pet_care', 'adventure', 'garden', 'space', 'cozy')),
  pet_name TEXT DEFAULT 'Buddy',
  character_name TEXT DEFAULT 'Hero',
  garden_name TEXT DEFAULT 'Garden',
  preferred_categories TEXT[] DEFAULT ARRAY['movement', 'breathing', 'sunlight'],
  school_opt_in BOOLEAN DEFAULT FALSE,
  pro_opt_in BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- DAILY METRICS TABLE (from device integrations)
-- ============================================================================
CREATE TABLE IF NOT EXISTS daily_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- Screen time metrics
  screen_time_minutes INTEGER DEFAULT 0,
  social_media_minutes INTEGER DEFAULT 0,
  games_minutes INTEGER DEFAULT 0,
  entertainment_minutes INTEGER DEFAULT 0,
  education_minutes INTEGER DEFAULT 0,
  productivity_minutes INTEGER DEFAULT 0,
  other_minutes INTEGER DEFAULT 0,
  
  -- Device engagement patterns
  device_pickups INTEGER DEFAULT 0,
  notifications_received INTEGER DEFAULT 0,
  first_pickup_time TIME DEFAULT '07:30',
  
  -- Evening & sleep patterns
  late_night_screen_minutes INTEGER DEFAULT 0,
  bedtime_target_met BOOLEAN DEFAULT TRUE,
  sleep_hours DECIMAL(4,2) DEFAULT 8.0,
  
  -- Routine & engagement
  routine_consistency_score DECIMAL(3,2) DEFAULT 0.80,
  checkin_completion DECIMAL(3,2) DEFAULT 0.85,
  
  -- Physical wellness
  physical_activity_minutes INTEGER DEFAULT 30,
  outdoor_time_minutes INTEGER DEFAULT 30,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(child_id, date)
);

-- ============================================================================
-- BEHAVIORAL FINDINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS findings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  decision_id UUID,
  finding_id TEXT NOT NULL,
  title TEXT NOT NULL,
  evidence JSONB DEFAULT '{}',
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
  confidence DECIMAL(3,2) DEFAULT 0.5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- AGENTIC DECISIONS TABLE (main decisions log)
-- ============================================================================
CREATE TABLE IF NOT EXISTS agentic_decisions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  
  -- Planner output
  plan TEXT NOT NULL CHECK (plan IN ('HOLD', 'NUDGE_CHILD', 'BRIEF_PARENT', 'ESCALATE')),
  rationale TEXT,
  why_not_stronger TEXT,
  signal_summary TEXT,
  planner_confidence DECIMAL(3,2) DEFAULT 0.5,
  
  -- Safety check
  safety_approved BOOLEAN DEFAULT TRUE,
  safety_violations TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  
  -- Outcome tracking
  outcome TEXT CHECK (outcome IN ('child_engaged', 'ignored', 'parent_acknowledged', 'pending', NULL)),
  outcome_recorded_at TIMESTAMP WITH TIME ZONE
);

-- Add foreign key to findings
ALTER TABLE findings 
  ADD CONSTRAINT fk_findings_decision 
  FOREIGN KEY (decision_id) REFERENCES agentic_decisions(id) ON DELETE CASCADE;

-- ============================================================================
-- YOUTH NUDGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS nudges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  decision_id UUID REFERENCES agentic_decisions(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  
  -- Nudge content
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  category TEXT CHECK (category IN ('movement', 'routine_reset', 'hydration', 'sunlight', 'breathing', 'social_checkin', 'focus_break')),
  why_shown TEXT,
  opt_out_hint TEXT DEFAULT 'You can snooze this anytime.',
  
  -- Micro quest
  quest_title TEXT,
  quest_steps TEXT[],
  quest_duration_minutes INTEGER DEFAULT 5,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'shown', 'completed', 'snoozed', 'dismissed')),
  shown_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PARENT BRIEFINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS parent_briefings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  decision_id UUID REFERENCES agentic_decisions(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  
  -- Briefing content
  weekly_summary TEXT,
  top_changes TEXT[],
  suggested_actions TEXT[],
  suggested_activities TEXT[],
  conversation_starter TEXT,
  why_now TEXT,
  
  -- Status
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- ESCALATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS escalations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  decision_id UUID REFERENCES agentic_decisions(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  
  -- Escalation details
  level TEXT CHECK (level IN ('parent_only', 'counselor', 'professional')),
  reason TEXT,
  recommended_next_step TEXT,
  requires_parent_ack BOOLEAN DEFAULT FALSE,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'acknowledged', 'actioned', 'resolved')),
  acknowledged_by UUID,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- ACTION HISTORY TABLE (for memory/learning)
-- ============================================================================
CREATE TABLE IF NOT EXISTS action_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  decision_id UUID REFERENCES agentic_decisions(id) ON DELETE CASCADE,
  
  date DATE NOT NULL,
  plan_taken TEXT NOT NULL,
  findings_at_time TEXT[],
  outcome TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_daily_metrics_child_date ON daily_metrics(child_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_findings_child ON findings(child_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_decisions_child ON agentic_decisions(child_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_nudges_child_status ON nudges(child_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_briefings_child ON parent_briefings(child_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_escalations_child_status ON escalations(child_id, status, created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agentic_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nudges ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_history ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (configure proper auth policies in production)
CREATE POLICY "Allow all on children" ON children FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on daily_metrics" ON daily_metrics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on findings" ON findings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on agentic_decisions" ON agentic_decisions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on nudges" ON nudges FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on parent_briefings" ON parent_briefings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on escalations" ON escalations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on action_history" ON action_history FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- SAMPLE DATA FOR DEVELOPMENT
-- ============================================================================

-- Insert sample child
INSERT INTO children (id, name, nickname, age, theme, pet_name, character_name)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Alex Thompson', 'Alex', 14, 'adventure', 'Luna', 'StarKnight');

-- Insert sample daily metrics for the past week
INSERT INTO daily_metrics (child_id, date, screen_time_minutes, social_media_minutes, games_minutes, entertainment_minutes, education_minutes, sleep_hours, late_night_screen_minutes, bedtime_target_met, routine_consistency_score, checkin_completion, physical_activity_minutes, outdoor_time_minutes, device_pickups)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - 6, 165, 35, 40, 35, 40, 7.8, 12, true, 0.85, 0.90, 45, 35, 48),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - 5, 180, 45, 35, 40, 45, 6.5, 25, false, 0.72, 0.75, 30, 25, 62),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - 4, 195, 50, 45, 35, 50, 6.2, 35, false, 0.68, 0.70, 25, 20, 75),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - 3, 210, 55, 50, 40, 45, 5.8, 45, false, 0.60, 0.55, 20, 15, 82),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - 2, 185, 48, 42, 38, 42, 6.8, 28, false, 0.70, 0.68, 35, 28, 68),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - 1, 155, 35, 38, 32, 40, 7.5, 15, true, 0.82, 0.85, 50, 40, 52),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE, 140, 30, 35, 28, 38, 8.2, 8, true, 0.88, 0.92, 55, 45, 45);

-- Insert sample agentic decision
INSERT INTO agentic_decisions (id, child_id, plan, rationale, why_not_stronger, signal_summary, planner_confidence, safety_approved)
VALUES (
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  'NUDGE_CHILD',
  'Sleep rhythm shifted mid-week with increased late-night screen time. A gentle nudge could help without parent involvement.',
  'Pattern is recovering, so BRIEF_PARENT would be premature. No persistent high-severity issues.',
  'Sleep dropped to 5.8-6.2 hours mid-week, late night screen time spiked to 45min. Routine consistency dropped to 60%. Showing recovery in last 2 days.',
  0.78,
  true
);

-- Insert sample findings
INSERT INTO findings (child_id, decision_id, finding_id, title, evidence, severity, confidence)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'sleep_rhythm_shift', 'Rest Rhythm Shifted', '{"baseline_value": 7.8, "recent_value": 6.1, "days_affected": 3, "metric_name": "sleep_hours"}', 'medium', 0.82),
  ('550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'evening_energy_pattern', 'Evening Wind-Down Changed', '{"baseline_value": 12, "recent_value": 35, "days_affected": 4, "metric_name": "late_night_screen_minutes"}', 'medium', 0.75);

-- Insert sample nudge
INSERT INTO nudges (decision_id, child_id, title, text, category, why_shown, quest_title, quest_steps, quest_duration_minutes, status)
VALUES (
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  'Training Grounds Await, StarKnight!',
  'A true hero never neglects their physical training! Your strength stats need a boost before the next quest.',
  'movement',
  'Your energy reserves have been focused on screen battles lately. Time to power up!',
  'Hero Training Session',
  ARRAY['Warrior stance! Stand and shake out your limbs', '5 shoulder rolls to loosen your armor', 'Scout the area from the nearest window'],
  5,
  'pending'
);

-- Insert sample parent briefing
INSERT INTO parent_briefings (decision_id, child_id, weekly_summary, top_changes, suggested_actions, suggested_activities, conversation_starter, why_now)
VALUES (
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  'Alex had a variable week with some evening routine shifts mid-week, but has been bouncing back nicely over the last couple of days. Sleep and activity are trending back toward their usual patterns.',
  ARRAY['Rest rhythm shifted mid-week (5.8-6.2 hours vs usual 7.5+)', 'Evening wind-down time increased but improving'],
  ARRAY['Consider a gentle check-in about how the week felt', 'Maybe suggest winding down screens a bit earlier together'],
  ARRAY['Take a 15-minute walk together after dinner', 'Have a tech-free game night with board games', 'Cook their favorite meal together this weekend'],
  'Hey, how''s your week been? Anything interesting happen?',
  'Mid-week showed some pattern shifts that are now recovering. Good time for a light touch base.'
);
