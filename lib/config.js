export default {
    env: process.env.NODE_ENV ?? 'development',
    db: {
        url: process.env.DATABASE_URL ?? '',
    },
    uploadcare: {
        publicKey: process.env.UPLOADCARE_PUBLIC_KEY ?? '',
        secretKey: process.env.UPLOADCARE_SECRET_KEY ?? '',
    },
    betterAuth: {
        secret: process.env.BETTER_AUTH_SECRET ?? '',
        url: process.env.BETTER_AUTH_URL ?? '',
    }
}
