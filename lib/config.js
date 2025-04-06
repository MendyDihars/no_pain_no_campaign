export default {
    env: process.env.NODE_ENV ?? 'development',
    db: {
        url: process.env.DATABASE_URL ?? '',
    }
}