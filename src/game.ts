///<reference path="../def/babylon.d.ts" />

class Game {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.Camera;
    private _light: BABYLON.Light;

    private _defaultZoom: BABYLON.Vector2;
    private _zoom: number = 1;
    constructor(canvasElement : string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._defaultZoom = new BABYLON.Vector2(12.5, 7);
    }
 
    loadBlenderScene() : void {
        // Create a basic BJS Scene object.
        //this._scene = new BABYLON.Scene(this._engine);

        BABYLON.SceneLoader.Load("./assets/", "level1.babylon", this._engine, 
        (scene) => {
            this.initRendering(scene);
            this.loadPlayer();
        } );




    }

    loadPlayer(): void {
        // this way this_scene is attributed only whent the blender scene is loaded
        var player = new BABYLON.TransformNode("player"); 
        BABYLON.SceneLoader.ImportMesh("", "./assets/", "prabbit_plane.babylon", this._scene, 
            (meshes) => 
                {
                    meshes.forEach((mesh)=>
                    {
                        mesh.parent = player;
                        if(mesh.material !== undefined)
                           this.setupLightmap(mesh.material as BABYLON.StandardMaterial); 
                    })
                }
        ); 
        player.setAbsolutePosition(new BABYLON.Vector3(2, -2, -2))
    }

    initRendering(scene : BABYLON.Scene): void {
        this._scene = scene
        this._camera = scene.activeCamera as BABYLON.Camera;
        console.log(''+scene.cameras);
        this._camera.attachControl(this._canvas, true);
        // Camera control and zoom recomputing    
        this._canvas.addEventListener("mousewheel", 
            (event) => {this.ComputeCameraView(event)} , false);
        
        this._camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        this._camera.orthoTop = this._defaultZoom.y;
        this._camera.orthoBottom = -this._defaultZoom.y;
        this._camera.orthoLeft = -this._defaultZoom.x;
        this._camera.orthoRight = this._defaultZoom.x;

        this._scene.lights.forEach((light:BABYLON.Light )=>{
            light.intensity *= 0;
        })

        // var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 0, -1), this._scene);
	    // light.diffuse = new BABYLON.Color3(1, 1, 1);
	    // light.specular = new BABYLON.Color3(1, 1, .5);
	    // light.groundColor = new BABYLON.Color3(0.05, 0, .2);

        this._scene.materials.forEach( (mat) => {
           this.setupLightmap(mat as BABYLON.StandardMaterial)
        } );

        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
            window.addEventListener('resize', () => {
            this._engine.resize();
        });


    }

    setupLightmap(material:BABYLON.StandardMaterial) : void{
        if (material.name === "default material" )
            return;

        console.log("Getting the Ligtmap for: "+ material.name)
        material.diffuseTexture = null;
        material.diffuseColor = BABYLON.Color3.White();
        material.specularColor = BABYLON.Color3.Black();
        
        var blenderName = material.name.substring(material.name.indexOf(".") + 1)
	    material.lightmapTexture = new BABYLON.Texture(
            "./assets/"+blenderName+".lightmap@x4.png", this._scene);
        // material.
    }

    ComputeCameraView(e: any) : void {
        var factor = e.wheelDelta < 0 ? 0.8 : 1.25;
        this._zoom *= factor;
        this._camera.orthoTop = this._defaultZoom.y * this._zoom;
        this._camera.orthoBottom = -this._defaultZoom.y * this._zoom;
        this._camera.orthoLeft = -this._defaultZoom.x * this._zoom;
        this._camera.orthoRight = this._defaultZoom.x * this._zoom;
    }
    

  }
  
  window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let game = new Game('renderCanvas');
  
    // Create the scene.
    game.loadBlenderScene();
  

  });