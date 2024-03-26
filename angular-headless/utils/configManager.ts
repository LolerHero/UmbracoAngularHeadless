import { environment } from '../environments/environment';

export const getConfig = () => {
  const apiKey = environment.UMBRACO_API_KEY;
  const domain = environment.UMBRACO_DOMAIN;
  const previewEnabled = environment.UMBRACO_PREVIEW_ENABLED;

  return {
    apiKey,
    domain,
    previewEnabled,
  };
};
