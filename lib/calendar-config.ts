export const calendarConfig = {
  calendly: {
    url: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username/demo-call',
    apiToken: process.env.CALENDLY_API_TOKEN,
    webhookSecret: process.env.CALENDLY_WEBHOOK_SECRET,
  },
  google: {
    clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  },
  microsoft: {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    tenantId: process.env.MICROSOFT_TENANT_ID,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    webhookSecret: process.env.WEBHOOK_SECRET,
  }
}

export const calendlyWidgetConfig = {
  hideGdprBanner: true,
  primaryColor: '9333ea', // Purple theme
  backgroundColor: '1a1a1a', // Dark theme
  textColor: 'ffffff',
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
}
