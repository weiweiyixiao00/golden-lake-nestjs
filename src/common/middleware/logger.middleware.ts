export function logger({ req, res, next }: { req: any; res: any; next: any; }): void {
  const { method, path } = req;
  console.log(`${method} ${path}`);
  next();
};