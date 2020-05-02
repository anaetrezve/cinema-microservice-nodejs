export interface Options {
  repo: any;
  port: number;
}

export type Movie = {
  id: string;
  title: string;
  format: string;
  releaseYear: number;
  releaseMonth: number;
  releaseDay: number;
};
