"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create floating shapes
    const shapes: THREE.Mesh[] = [];

    // Icosahedron
    const geo1 = new THREE.IcosahedronGeometry(1, 4);
    const mat1 = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      wireframe: false,
    });
    const shape1 = new THREE.Mesh(geo1, mat1);
    shape1.position.set(-3, 2, 0);
    scene.add(shape1);
    shapes.push(shape1);

    // Torus
    const geo2 = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
    const mat2 = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x7c3aed,
    });
    const shape2 = new THREE.Mesh(geo2, mat2);
    shape2.position.set(3, -1, 0);
    scene.add(shape2);
    shapes.push(shape2);

    // Octahedron
    const geo3 = new THREE.OctahedronGeometry(1.2, 2);
    const mat3 = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
    });
    const shape3 = new THREE.Mesh(geo3, mat3);
    shape3.position.set(0, 3, -2);
    scene.add(shape3);
    shapes.push(shape3);

    // Lighting
    const light1 = new THREE.PointLight(0xffffff, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x6366f1, 0.5, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.001 * (i + 1);
        shape.rotation.y += 0.002 * (i + 1);
        shape.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 opacity-30 dark:opacity-20"
    />
  );
}
