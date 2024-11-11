export class Output {
  paths: [number, number][];
  visit_order: [number, number][];

  constructor({
    paths,
    visit_order,
  }: {
    paths: [number, number][];
    visit_order: [number, number][];
  }) {
    this.paths = paths;
    this.visit_order = visit_order;
  }
}
