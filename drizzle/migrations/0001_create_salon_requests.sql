CREATE TABLE public.salon_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.salon_requests TO anon, authenticated;
GRANT ALL ON public.salon_requests TO service_role;

ALTER TABLE public.salon_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors may request a salon invitation"
  ON public.salon_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);