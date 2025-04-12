import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { v4 as uuid } from "uuid";
import config from "./config";
import { nextCookies } from "better-auth/next-js";
 
export const auth = betterAuth({
  secret: config.betterAuth.secret,
  database: new Pool({
    connectionString: config.db.url,
  }),
  plugins: [
    nextCookies(),
  ],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    generateId: uuid,
  },
  user: {
    modelName: 'users',
    fields: {
      emailVerified: 'email_verified',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        input: false,
      },
    }
  },
  session: {
    modelName: 'sessions',
    fields: {
      userId: 'user_id',
      expiresAt: 'expires_at',
      ipAddress: 'ip_address',
      userAgent: 'user_agent',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  },
  account: {
    modelName: 'accounts',
    fields: {
      userId: 'user_id',
      accountId: 'account_id',
      providerId: 'provider_id',
      idToken: 'id_token',
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      accessTokenExpiresAt: 'access_token_expires_at',
      refreshTokenExpiresAt: 'refresh_token_expires_at',
      createdAt:   'created_at',
      updatedAt: 'updated_at',
    }
  },
  verification: {
    modelName: 'verifications',
    fields: {
      expiresAt: 'expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  }
})