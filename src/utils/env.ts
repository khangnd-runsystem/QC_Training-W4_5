import { ENV_KEYS, isValidEnvKey, type EnvKey } from '../../constants/envKeys';

function getEnvKey(): EnvKey {
    const key = process.env.test_env;
    if (isValidEnvKey(key)) return key;
    // fallback to 'dev' but warn
    // eslint-disable-next-line no-console
    console.warn(`test_env is not set or invalid. Using default 'dev'. Valid keys: ${ENV_KEYS.join(', ')}`);
    return 'dev';
}

const envKey = getEnvKey();

export default class ENV {
    public static ENV_KEY: EnvKey = envKey;
    public static BASE_URL: string = process.env.BASE_URL || 'https://demoqa.com';
    public static USERNAME: string | undefined = process.env.USERNAME;
    public static EMAIL: string | undefined = process.env.EMAIL;
    public static PASSWORD: string | undefined = process.env.PASSWORD;
    public static HEADLESS: boolean = process.env.HEADLESS === 'true';
    public static WORKERS: number = Number(process.env.WORKERS) || 4;
    public static SLOW_MO: number | undefined = process.env.SLOW_MO ? Number(process.env.SLOW_MO) : undefined;
}