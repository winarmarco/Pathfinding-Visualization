export class Output {
  paths: [number, number][];
  visit_order: [number, number][];
  pathLength: number;

  constructor({
    paths,
    visit_order,
    pathLength,
  }: {
    paths: [number, number][];
    visit_order: [number, number][];
    pathLength: number;
  }) {
    this.paths = paths;
    this.visit_order = visit_order;
    this.pathLength = pathLength;
  }
}
