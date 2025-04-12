export default {
    env: process.env.NODE_ENV ?? 'development',
    db: {
        url: process.env.DATABASE_URL ?? '',
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
        apiKey: process.env.CLOUDINARY_API_KEY ?? '',
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
        url: process.env.CLOUDINARY_URL ?? '',
    },
    betterAuth: {
        secret: process.env.BETTER_AUTH_SECRET ?? '',
        url: process.env.BETTER_AUTH_URL ?? '',
    }
}
