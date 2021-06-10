declare namespace NodeJS {
    interface ProcessEnv {
        DB_URL: string;
        CORS_ORIGIN: string;
        ALLOCATOR_URL: string;
        EMAIL_PW: string;
        NODE_ENV: string;
        MAIL_SERVER: string;
        MAIL_PORT: string;
    }
}
