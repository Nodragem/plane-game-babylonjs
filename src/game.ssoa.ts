// ///<reference path="../def/babylon.d.ts" />


// class GameSSOA {

//     private _canvas: HTMLCanvasElement;
//     private _engine: BABYLON.Engine;
//     private _scene: BABYLON.Scene;
//     private _camera: BABYLON.Camera;
//     private _light: BABYLON.Light;

//     constructor(canvasElement : string) {
//         // Create canvas and engine.
//         this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
//         this._engine = new BABYLON.Engine(this._canvas, true);
//     }

//     loadBlenderScene() : void {
//         // Create a basic BJS Scene object.
//         //this._scene = new BABYLON.Scene(this._engine);

//         BABYLON.SceneLoader.Load("./assets/", "level1.babylon", this._engine, 
//         (scene) => {this.initRendering(scene)} );

//             // this way this_scene is attributed only whent the blender scene is loaded
//         var player = new BABYLON.TransformNode("player"); 
//         BABYLON.SceneLoader.ImportMesh("", "./assets/", "prabbit_plane.babylon", this._scene, 
//             (meshes) => 
//                 {meshes.forEach((mesh)=>
//                     {
//                         mesh.parent = player;
//                         //this.setupLightmap(mesh.material as BABYLON.StandardMaterial); 
//                     })
//                 }
//         ); 
//         player.setAbsolutePosition(new BABYLON.Vector3(2, -2, -2))
//     }

//     initRendering(scene : BABYLON.Scene): void {
//         this._scene = scene
//         this._camera = scene.activeCamera as BABYLON.Camera;
//         console.log(''+scene.cameras);
//         this._camera.attachControl(this._canvas);
//         this._camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
//         this._camera.orthoTop = 7.;
//         this._camera.orthoBottom = -7.;
//         this._camera.orthoLeft = -12.5;
//         this._camera.orthoRight = 12.5;

//          // Create SSAO and configure all properties (for the example)
//         var ssaoRatio = {
//             ssaoRatio: 0.5, // Ratio of the SSAO post-process, in a lower resolution
//             combineRatio: 1.0 // Ratio of the combine post-process (combines the SSAO and the scene)
//         };

//         var ssao = new BABYLON.SSAORenderingPipeline("ssaopipeline", scene, ssaoRatio);
//         ssao.fallOff = 0.000001;
//         ssao.area = 1;
//         ssao.radius = 0.0001;
//         ssao.totalStrength = 1;
//         ssao.base = 0.5;

//         scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssaopipeline", this._camera);

//         this._scene.lights.forEach((light:BABYLON.Light )=>{
//             light.intensity *= 1.5;
//         })

//         this._scene.materials.forEach( (mat) => {
//            // this.setupLightmap(mat as BABYLON.StandardMaterial)
//         } );

//         // Run the render loop.
//         this._engine.runRenderLoop(() => {
//             this._scene.render();
//         });

//         // The canvas/window resize event handler.
//             window.addEventListener('resize', () => {
//             this._engine.resize();
//         });
//     }

//     setupLightmap(material:BABYLON.StandardMaterial) : void{
//         if (material.name === "default material" )
//             return;

//         console.log("Getting the Ligtmap for: "+ material.name)
//         material.diffuseTexture = null;
//         material.diffuseColor = BABYLON.Color3.White();
//         material.specularColor = BABYLON.Color3.Black();
        
//         var blenderName = material.name.substring(material.name.indexOf(".") + 1)
// 	    material.lightmapTexture = new BABYLON.Texture(
//             "./assets/"+blenderName+".lightmap@x4.png", this._scene);
//         // material.
//     }

//   }
  
//   window.addEventListener('DOMContentLoaded', () => {
//     // Create the game using the 'renderCanvas'.
//     let game = new Game('renderCanvas');
  
//     // Create the scene.
//     game.loadBlenderScene();
  
//     // Start render loop.
//     //game.doRender();
//   });