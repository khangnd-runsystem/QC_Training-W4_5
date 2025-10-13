export const ENV_KEYS = ['dev', 'stg', 'prod'] as const;
export type EnvKey = typeof ENV_KEYS[number];

export function isValidEnvKey(key: string | undefined): key is EnvKey {
  return !!key && (ENV_KEYS as readonly string[]).includes(key);
}
