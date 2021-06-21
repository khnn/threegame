import { Mesh } from "three";

export const isBox = (object:Mesh) => {
  if (!object.geometry) return false;
  return object.geometry.type === 'BoxGeometry' ? true : false
} 