export const booking = {
  timezone: 'Australia/Perth', workingDays: [0, 1, 2, 3, 4, 5, 6],
  slotMinutes: 30, minNoticeHours: 12, maxDaysAhead: 30,
  meetingLabel: '30 minute video call',
} as const;

export const projectTypes = ['Booking website', 'AI website chatbot', '24/7 AI calling agent', 'Website + AI agent', 'Mobile app', 'UI/UX design', 'Custom software or SaaS', 'Business automation', 'Social media growth', 'Not sure yet'] as const;
export const budgets = ['Under $500', '$500 to $1,000', '$1,000 to $3,500', '$3,500 to $10,000', '$10,000+'] as const;
export const deliveryTimes = ['1 to 2 weeks', '2 to 4 weeks', '1 to 2 months', '2 months or more', 'Flexible'] as const;