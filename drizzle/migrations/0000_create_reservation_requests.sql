CREATE TABLE public.reservation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_slug TEXT NOT NULL,
  edition_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  shoe_size TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reservation_requests TO anon, authenticated;
GRANT ALL ON public.reservation_requests TO service_role;

ALTER TABLE public.reservation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors may submit reservation requests"
  ON public.reservation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);