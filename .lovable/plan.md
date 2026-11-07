# Booking calendar and team locations

- Limit each homepage service strip to two placeholder tiles, using generic code-built service cards for remaining spaces.
- Replace Cal.com with one accessible three-step booking calendar on the homepage and booking page, with visitor-local times, project preselection and calendar downloads.
- Secure bookings against double booking, reuse spam protections, and send optional owner and visitor emails.
- Add admin booking management and today's count.
- Show the six supplied team locations across footer, hero, menu and privacy, retain Perth as the only street address, and remove founding-year references.
- Test booking creation and competing submissions, delete test records, and check keyboard access and layouts at 375, 768 and 1280 pixels.

## Technical details
Settings use Perth scheduling, all seven days, 30-minute slots, 12-hour notice and a 30-day horizon. A partial unique database index protects active slots. Public availability returns times only; admin reads and updates require authenticated database roles.

## Assumption
Starter selects Booking website and $500 to $1,000; Growth selects Website + AI agent and $1,000 to $3,500; Scale selects Custom software or SaaS and $3,500 to $10,000.