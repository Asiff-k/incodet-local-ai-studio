CREATE TABLE public.bookings (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(),
 slot_start timestamptz NOT NULL, slot_end timestamptz NOT NULL, visitor_timezone text NOT NULL,
 full_name text NOT NULL, company_name text NOT NULL, company_email text NOT NULL, phone text,
 project_type text NOT NULL, budget text NOT NULL, delivery_time text NOT NULL, message text NOT NULL,
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')), email_sent boolean NOT NULL DEFAULT false
);
GRANT SELECT, UPDATE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read bookings" ON public.bookings FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins update bookings" ON public.bookings FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE UNIQUE INDEX bookings_active_slot ON public.bookings(slot_start) WHERE status <> 'cancelled';
CREATE FUNCTION public.taken_booking_slots(range_start timestamptz, range_end timestamptz) RETURNS TABLE(slot_start timestamptz) LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT b.slot_start FROM public.bookings b WHERE b.status <> 'cancelled' AND b.slot_start >= range_start AND b.slot_start < range_end AND range_end > range_start AND range_end <= range_start + interval '33 days' $$;
REVOKE ALL ON FUNCTION public.taken_booking_slots(timestamptz,timestamptz) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.taken_booking_slots(timestamptz,timestamptz) TO anon,authenticated,service_role;
CREATE FUNCTION public.consume_contact_rate_limit(hash text) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN PERFORM pg_advisory_xact_lock(hashtextextended(hash,0)); IF (SELECT count(*) FROM public.contact_rate_limits WHERE ip_hash=hash AND created_at >= now()-interval '1 hour') >= 5 THEN RETURN false; END IF; INSERT INTO public.contact_rate_limits(ip_hash) VALUES(hash); RETURN true; END $$;
REVOKE ALL ON FUNCTION public.consume_contact_rate_limit(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consume_contact_rate_limit(text) TO service_role;