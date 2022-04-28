import { Scene, Camera } from 'three';
import { WEBGL_BUFFER_SAMPLES } from 'view/constants';
import { createRenderTarget } from './common';
import CopyPass from './CopyPass';

export default class WebGLBuffer {
  constructor(renderer) {
    this.renderer = renderer;

    this.buffer = createRenderTarget({ samples: WEBGL_BUFFER_SAMPLES });

    this.pass = new CopyPass(this.buffer);
    this.pass.copyFromBuffer = true;

    this.scene = new Scene();
    this.camera = new Camera();
  }

  setSize(width, height) {
    this.buffer.setSize(width, height);
  }

  dispose() {
    this.buffer.dispose();
  }

  clear() {
    const { renderer, buffer } = this;

    renderer.setRenderTarget(buffer);
    renderer.clear();
  }

  render(scene, camera) {
    const { renderer, buffer } = this;

    renderer.setRenderTarget(buffer);
    renderer.render(scene, camera);
  }
}
