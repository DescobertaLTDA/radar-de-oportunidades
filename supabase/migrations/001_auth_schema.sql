-- ════════════════════════════════════════════════════════════════
--  PainRadar — Auth Schema
--  Run this in the Supabase SQL Editor:
--  https://supabase.com/dashboard/project/ucbfmivrijgicradwoix/sql/new
-- ════════════════════════════════════════════════════════════════

-- ── 1. Profiles (extends auth.users) ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID        REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name  TEXT,
  avatar_url TEXT,
  plan       TEXT        NOT NULL DEFAULT 'free'
               CHECK (plan IN ('free', 'validar', 'dominar')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_owner_select" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_owner_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ── 2. Analyses ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.analyses (
  id                UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id           UUID        NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  idea              TEXT        NOT NULL,
  status            TEXT        NOT NULL DEFAULT 'processing'
                      CHECK (status IN ('processing', 'done', 'error')),
  opportunity_score INTEGER,
  saturation        TEXT,
  competition       TEXT,
  pain_points       TEXT[]      DEFAULT '{}',
  opportunity_text  TEXT,
  mvp_suggestion    TEXT,
  competitors       JSONB       DEFAULT '[]',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "analyses_owner_select" ON public.analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "analyses_owner_insert" ON public.analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "analyses_owner_update" ON public.analyses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "analyses_owner_delete" ON public.analyses
  FOR DELETE USING (auth.uid() = user_id);

-- ── 3. updated_at trigger ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS analyses_set_updated_at ON public.analyses;
CREATE TRIGGER analyses_set_updated_at
  BEFORE UPDATE ON public.analyses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 4. Auto-create profile on signup ─────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
