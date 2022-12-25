export interface OauthSingInModel {
  code: string;
  redirect_uri: string;
}

export interface OauthGetCodeModel {
  clientId: string;
  redirect_uri: string;
}
