declare namespace NodeJS {
    interface ProcessEnv {
        DB_HOST: string;
        DB_USER: string;
        DB_PW: string;
        DB_NAME: string;
        TEST_DB_HOST: string;
        TEST_DB_USER: string;
        TEST_DB_PW: string;
        TEST_DB_NAME: string;
        CORS_ORIGIN: string;
        ALLOCATOR_URL: string;
        EMAIL_PW: string;
        NODE_ENV: string;
        MAIL_SERVER: string;
        MAIL_PORT: string;
    }
}
