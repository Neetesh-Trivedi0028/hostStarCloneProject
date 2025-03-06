import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
  {
    platformSettings: {
      platformName: { type: String, required: true },
      platformLogo: { type: String, required: true },
      platformPromo: { type: String, required: true },
      defaultLanguage: { type: String, default: 'en' },
      defaultTimezone: { type: String, default: 'UTC' },
      currency: { type: String, default: 'USD' },
      dateFormat: { type: String, required: true },
      timeFormat: { type: String, required: true },
      maintenanceMode: {
        enabled: { type: Boolean, default: false },
        message: { type: String, default: '' },
        scheduledAt: { type: Date },
      },
      cdnSettings: {
        provider: { type: String, required: true },
        url: { type: String, required: true },
        bandwidthLimit: { type: Number },
      },
    },
    subscriptionSettings: {
      plans: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          currency: { type: String, required: true },
          duration: { type: String, required: true },
          features: [{ type: String }],
          isActive: { type: Boolean, default: true },
          discounts: {
            percentage: { type: Number, default: 0 },
            validTill: { type: Date },
          },
        },
      ],
      freeTrial: {
        enabled: { type: Boolean, default: false },
        duration: { type: Number },
      },
      regionalPricing: {
        enabled: { type: Boolean, default: false },
        regions: [
          {
            country: { type: String, required: true },
            price: { type: Number, required: true },
            currency: { type: String, required: true },
          },
        ],
      },
    },
    contentModeration: {
      autoModeration: {
        enabled: { type: Boolean, default: false },
        aiDetectionLevel: { type: String },
      },
      reportingThreshold: { type: Number, default: 10 },
      flaggingRules: [
        {
          rule: { type: String, required: true },
          action: { type: String, required: true },
          severity: { type: String, required: true },
        },
      ],
      allowedContentFormats: [{ type: String }],
      contentApprovalWorkflow: {
        manualReview: { type: Boolean, default: false },
        moderatorApprovalRequired: { type: Boolean, default: true },
      },
    },
    userManagement: {
      accountSuspension: {
        autoBanThreshold: { type: Number, default: 5 },
        banDuration: { type: String, default: '7 days' },
        appealAllowed: { type: Boolean, default: true },
      },
    },
    financeSettings: {
      commissionRates: {
        studio: { type: Number, default: 10 },
        platformShare: { type: Number, default: 90 },
      },
      payoutMethods: [{ type: String, default: ['PayPal', 'Bank Transfer'] }],
      minPayoutThreshold: { type: Number, default: 50 },
      refundPolicy: {
        allowed: { type: Boolean, default: false },
        daysLimit: { type: Number, default: 7 },
      },
    },
    advertisementSettings: {
      adProviders: [
        {
          name: { type: String, required: true },
          apiKey: { type: String, required: true },
          status: { type: Boolean, default: true },
        },
      ],
      adRevenueSharing: {
        enabled: { type: Boolean, default: false },
        studioShare: { type: Number, default: 70 },
        platformShare: { type: Number, default: 30 },
      },
      adFormats: [
        { type: String, default: ['pre-roll', 'mid-roll', 'banner'] },
      ],
    },
    securitySettings: {
      drmProtection: {
        enabled: { type: Boolean, default: false },
        provider: { type: String },
      },
      geoBlocking: {
        enabled: { type: Boolean, default: false },
        restrictedCountries: [{ type: String }],
      },
      twoFactorAuthentication: {
        enabled: { type: Boolean, default: false },
        methods: [{ type: String }],
      },
    },
    notificationSettings: {
      emailNotifications: {
        enabled: { type: Boolean, default: true },
        templates: {
          subscriptionRenewal: { type: String },
          contentUpdate: { type: String },
        },
      },
      pushNotifications: {
        enabled: { type: Boolean, default: true },
        frequency: { type: String, default: 'daily' },
      },
    },
    reportingAndAnalytics: {
      dataRetentionPolicy: {
        enabled: { type: Boolean, default: false },
        retentionPeriod: { type: Number, default: 365 },
      },
      analyticsProviders: [
        {
          name: { type: String, required: true },
          apiKey: { type: String, required: true },
          status: { type: Boolean, default: true },
        },
      ],
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
    id: false,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

export const PlatformSettings = mongoose.model(
  'platformSettings',
  SettingsSchema
);
