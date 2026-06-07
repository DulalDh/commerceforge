import { env } from '../config/env.js';

export const getAiProviderConfig = () => ({
  provider: env.AI_PROVIDER || 'placeholder',
  hasApiKey: Boolean(env.AI_API_KEY)
});

export const runAiCompletion = async ({ system, prompt, fallback }) => {
  const config = getAiProviderConfig();

  if (!config.hasApiKey) {
    return fallback;
  }

  // OpenAI or another provider can be connected here later with env.AI_PROVIDER and env.AI_API_KEY.
  return {
    ...fallback,
    provider: config.provider,
    prompt,
    system
  };
};
