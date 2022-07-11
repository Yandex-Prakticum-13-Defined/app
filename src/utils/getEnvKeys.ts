import dotenv, { DotenvParseOutput } from 'dotenv';

export function getEnvKeys() {
  const env = dotenv.config().parsed as DotenvParseOutput;

  return Object.keys(env).reduce((prev, next) => {
    (prev as Record<string, unknown>)[`process.env.${next}`] = JSON.stringify(env[next]);

    return prev;
  }, {});
}
