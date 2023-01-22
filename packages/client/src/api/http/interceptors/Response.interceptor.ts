// TODO затипизировать
export const responseInterceptor = (response: any) => {
  if (!response) return null;

  if (response.data) return response.data;

  if (['put', 'post', 'patch'].includes(response.config.method || '')) {
    return response.config.data;
  }

  return null;
};
