import type * as Three from "three";
export type FlightView = "solid"|"wireframe"|"clay";
export function buildFlightModel(T:typeof Three,subject:"aircraft"|"cube",view:FlightView):Three.Group{
  const group=new T.Group();
  const materials={
    body:new T.MeshStandardMaterial({color:view==="clay"?0xbfa891:0xeeeae1,metalness:view==="solid"?.45:0,roughness:.48,wireframe:view==="wireframe"}),
    dark:new T.MeshStandardMaterial({color:view==="clay"?0xbfa891:0x1b353e,metalness:.25,roughness:.48,wireframe:view==="wireframe"}),
    accent:new T.MeshStandardMaterial({color:view==="clay"?0xbfa891:0xdca47c,metalness:.2,roughness:.42,wireframe:view==="wireframe"})
  };
  function add(geometry:Three.BufferGeometry,material:Three.Material,x=0,y=0,z=0){const mesh=new T.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;}
  if(subject==="cube"){
    add(new T.BoxGeometry(2,2,2,3,3,3),materials.body,0,.2,0);group.rotation.set(.06,.4,0);return group;
  }
  add(new T.CylinderGeometry(.14,.32,5.2,24,12),materials.body).rotation.x=Math.PI/2;
  add(new T.ConeGeometry(.32,1.05,24,5),materials.body,0,0,-3.1).rotation.x=-Math.PI/2;
  const wing=new T.Shape();wing.moveTo(.14,.65);wing.lineTo(3.55,-.8);wing.lineTo(3.7,-1.18);wing.lineTo(.14,-.75);wing.closePath();
  const wingGeometry=new T.ExtrudeGeometry(wing,{depth:.09,bevelEnabled:false,curveSegments:2});wingGeometry.rotateX(-Math.PI/2);
  add(wingGeometry,materials.body,0,-.10,-.1);
  add(wingGeometry.clone(),materials.body,0,-.1,-.1).scale.x=-1;
  for(const side of [-1,1]){
    const tailWing=add(new T.BoxGeometry(1.65,.055,.56),materials.body,side*.78,.08,2.08);tailWing.rotation.y=side*.26;
    const tip=add(new T.BoxGeometry(.10,.4,.4),materials.accent,side*3.56,.1,.88);tip.rotation.z=-side*.25;
    const engine=add(new T.CylinderGeometry(.23,.25,1.05,20,5),materials.body,side*1.12,-.47,.15);engine.rotation.x=Math.PI/2;
    add(new T.TorusGeometry(.21,.045,8,20),materials.accent,side*1.12,-.47,-.38);
    add(new T.CircleGeometry(.18,20),materials.dark,side*1.12,-.47,-.395).rotation.y=Math.PI;
    for(let i=0;i<12;i++)add(new T.SphereGeometry(.043,8,6),materials.dark,side*.282,.15,-1.76+i*.25).scale.set(.35,1,1.35);
  }
  const finGeometry=new T.BufferGeometry();finGeometry.setAttribute("position",new T.Float32BufferAttribute([0,.05,1.25,0,1.36,2.38,0,.06,2.65],3));finGeometry.computeVertexNormals();
  const finMaterial=materials.accent.clone();finMaterial.side=T.DoubleSide;add(finGeometry,finMaterial);
  const cockpit=add(new T.SphereGeometry(.3,16,8),materials.dark,0,.13,-2.36);cockpit.scale.set(.78,.45,1.2);
  group.rotation.set(.05,-.35,-.045);return group;
}
export function disposeFlightModel(group:Three.Group){
  const materials=new Set<Three.Material>();
  group.traverse(object=>{const mesh=object as Three.Mesh;if(mesh.geometry)mesh.geometry.dispose();if(mesh.material){for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material])materials.add(material);}});
  materials.forEach(m=>m.dispose());
}
export function fitFlightCamera(T:typeof Three,camera:Three.PerspectiveCamera,model:Three.Group,aspect:number){
  model.updateMatrixWorld(true);
  const sphere=new T.Box3().setFromObject(model).getBoundingSphere(new T.Sphere());
  camera.aspect=Math.max(aspect,.3);
  const verticalHalf=T.MathUtils.degToRad(camera.fov/2);
  const horizontalHalf=Math.atan(Math.tan(verticalHalf)*camera.aspect);
  const distance=sphere.radius/Math.sin(Math.min(verticalHalf,horizontalHalf))*1.12;
  camera.position.copy(new T.Vector3(7,4.6,8).normalize().multiplyScalar(distance).add(sphere.center));
  camera.lookAt(sphere.center);camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
}
