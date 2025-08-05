import 'dotenv/config'; 

function getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined && defaultValue === undefined) {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return value || defaultValue!;
}

export const APP_CONFIG = {
    port: parseInt(getEnv('PORT', '3000'), 10), 
    environment: getEnv('NODE_ENV', 'development'),
};

export const JWT_CONFIG = {
    secret: getEnv('JWT_SECRET'), 
    expiresIn: getEnv('JWT_EXPIRES_IN', '1h'),
};

export const DB_CONFIG = {
    databaseUrl: getEnv('DATABASE_URL'), 
};

export const PORT = APP_CONFIG.port;
export const NODE_ENV = APP_CONFIG.environment;
export const JWT_SECRET = JWT_CONFIG.secret;
export const JWT_EXPIRES_IN = JWT_CONFIG.expiresIn;
