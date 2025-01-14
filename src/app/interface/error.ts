export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorRespone = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
