import Display from 'core/Display';

export default class CanvasDisplay extends Display {
  constructor(Type, properties) {
    super(Type, properties);

    const { width = 1, height = 1 } = this.properties;

    this.canvas = new OffscreenCanvas(width, height);
    this.context = this.canvas.getContext('2d');
  }

  render(scene) {
    const { canvas, properties } = this;
    const { width, height } = canvas;

    if (width === 0 || height === 0) {
      return;
    }

    const origin = {
      x: width / 2,
      y: height / 2,
    };

    scene.renderToCanvas(canvas, properties, origin);
  }
}
