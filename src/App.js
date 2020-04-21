import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 12; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.controls.autoRotateSpeed = 5.0;
    this.controls.autoRotate = true;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const blueMaterial = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });

    const redMaterial = new THREE.MeshPhongMaterial({
      color: 0x0ff000,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });

    const whiteMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });

    const purpleMaterial = new THREE.MeshPhongMaterial({
      color: 0x493E63,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });

    this.cube = new THREE.Mesh(geometry, blueMaterial);
    this.cube.position.set(5, 0, 0);

    this.scene.add(this.cube);

    this.cube2 = new THREE.Mesh(geometry, redMaterial);
    this.cube2.position.set(-5, 0, 0);

    this.scene.add(this.cube2);


    this.cube3 = new THREE.Mesh(geometry, whiteMaterial);
    this.cube3.position.set(0, 0, 5);

    this.scene.add(this.cube3);

    this.cube4 = new THREE.Mesh(geometry, purpleMaterial);
    this.cube4.position.set(0, 0, -5);

    this.scene.add(this.cube4);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    
    this.cube2.rotation.x -= 0.01;
    this.cube2.rotation.y -= 0.01;

    this.cube3.rotation.x += 0.01;
    this.cube3.rotation.y += 0.01;

    this.cube4.rotation.x -= 0.01;
    this.cube4.rotation.y -= 0.01;

    this.controls.update();

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div ref={ref => (this.el = ref)} />;
  }
}

export default App;
