export const envs = {
  local: 'local',
  development: 'development',
  staging: 'staging',
  production: 'production',
};

export const apiPath = '/api/v1';

export const domains = {
  [envs.local]: 'localhost:3000',
  [envs.development]: 'chargers.ltestl.com',
  [envs.staging]: 'chargers.ltestl.com',
  [envs.production]: '',
};

export const serverUrls = {
  [envs.local]: `https://${domains[envs.local]}:8000`,
  [envs.development]: `https://${domains[envs.development]}`,
  [envs.staging]: `https://${domains[envs.staging]}`,
  [envs.production]: `https://${domains[envs.production]}`,
};

export const apiUrls = {
  [envs.local]: `${serverUrls[envs.local]}${apiPath}`,
  [envs.development]: `${serverUrls[envs.development]}${apiPath}`,
  [envs.staging]: `${serverUrls[envs.staging]}${apiPath}`,
  [envs.production]: `${serverUrls[envs.production]}${apiPath}`,
};
