'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useEnvironment } from '@/context/EnvironmentContext';
import { getEnvironmentTheme } from '@/lib/environmentThemes';

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { season, timeOfDay } = useEnvironment();

  const seasonRef = useRef(season);
  const timeOfDayRef = useRef(timeOfDay);

  useEffect(() => {
    seasonRef.current = season;
    timeOfDayRef.current = timeOfDay;
  }, [season, timeOfDay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera & High-Precision Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Root World Group
    const worldGroup = new THREE.Group();
    // Offset slightly to the right on desktop for perfect balance with hero typography
    if (width > 1024) {
      worldGroup.position.x = 1.3;
    }
    scene.add(worldGroup);

    // 3. Dynamic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const coreLight = new THREE.PointLight(0x10b981, 2.5, 8);
    coreLight.position.set(0, 0, 0);
    worldGroup.add(coreLight);

    // 4. Central Neural Core (Geodesic Cage & Plasma Core)
    const coreGroup = new THREE.Group();
    worldGroup.add(coreGroup);

    // Wireframe Outer Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: true,
      emissive: 0x064e3b,
      emissiveIntensity: 0.5,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Inner Glowing Plasma Sphere
    const innerGeo = new THREE.SphereGeometry(0.82, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x10b981,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.88,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 5. Dual Gimbal Astrolabe Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.022, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3.2;
    worldGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.45, 0.018, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3.8;
    ring2.rotation.z = Math.PI / 6;
    worldGroup.add(ring2);

    // 6. Orbiting Constellation Data Micro-Nodes
    const nodesCount = 32;
    const nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.OctahedronGeometry(0.09, 0);

    const nodeMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < nodesCount; i++) {
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.7,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);

      const radius = 2.1 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      node.position.x = radius * Math.cos(theta) * Math.cos(phi);
      node.position.y = radius * Math.sin(phi);
      node.position.z = radius * Math.sin(theta) * Math.cos(phi);

      node.userData = {
        radius,
        theta,
        phi,
        speedTheta: (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        speedPhi: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      };

      nodesGroup.add(node);
      nodeMeshes.push(node);
    }
    worldGroup.add(nodesGroup);

    // 7. Seasonal Floating Shards (Crystals / Spores / Ripples)
    const seasonalItemsCount = 18;
    const seasonalGroup = new THREE.Group();
    const seasonalMeshes: THREE.Mesh[] = [];
    const seasonalGeo = new THREE.TetrahedronGeometry(0.14, 0);

    for (let i = 0; i < seasonalItemsCount; i++) {
      const sMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.9,
      });
      const sMesh = new THREE.Mesh(seasonalGeo, sMat);

      const dist = 1.6 + Math.random() * 1.5;
      const angle = (i / seasonalItemsCount) * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 2;

      sMesh.position.set(
        Math.cos(angle) * dist,
        yOffset,
        Math.sin(angle) * dist
      );

      sMesh.userData = {
        baseY: yOffset,
        speed: 0.015 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      };

      seasonalGroup.add(sMesh);
      seasonalMeshes.push(sMesh);
    }
    worldGroup.add(seasonalGroup);

    // 8. Ground Holographic Matrix Grid
    const gridPlaneGeo = new THREE.PlaneGeometry(16, 16, 24, 24);
    const gridPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const gridMesh = new THREE.Mesh(gridPlaneGeo, gridPlaneMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -2.2;
    worldGroup.add(gridMesh);

    // 9. Smooth Mouse Parallax Physics
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.targetX = (x - 0.5) * 1.6;
      mouse.targetY = (y - 0.5) * 1.2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const x = (touch.clientX - rect.left) / rect.width;
        const y = (touch.clientY - rect.top) / rect.height;
        mouse.targetX = (x - 0.5) * 1.2;
        mouse.targetY = (y - 0.5) * 0.8;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 10. Responsive Resizing
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width > 1024) {
        worldGroup.position.x = 1.3;
      } else {
        worldGroup.position.x = 0;
      }
    };

    window.addEventListener('resize', handleResize);

    // 11. Animation Loop with Seasonal Adaptation
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Retrieve dynamic active theme settings
      const activeTheme = getEnvironmentTheme(seasonRef.current, timeOfDayRef.current);
      const isNight = timeOfDayRef.current === 'night';
      const curSeason = seasonRef.current;

      // Color Palette updates based on active theme
      const primaryHex = activeTheme.threeGroundColor;
      const accentHex = activeTheme.threeAccentColor;

      // Update Lighting Colors
      ambientLight.color.setHex(activeTheme.ambientLightColor);
      ambientLight.intensity = isNight ? 0.45 : 0.85;

      mainLight.color.setHex(activeTheme.directionalLightColor);
      mainLight.intensity = isNight ? 0.9 : 1.5;

      coreLight.color.setHex(accentHex);

      // Core Mesh Material Interpolation
      outerMat.color.lerp(new THREE.Color(accentHex), 0.05);
      outerMat.emissive.lerp(new THREE.Color(primaryHex), 0.05);

      innerMat.color.lerp(new THREE.Color(accentHex), 0.05);
      innerMat.emissive.lerp(new THREE.Color(accentHex), 0.05);

      ring1Mat.color.lerp(new THREE.Color(primaryHex), 0.05);
      ring2Mat.color.lerp(new THREE.Color(accentHex), 0.05);
      gridPlaneMat.color.lerp(new THREE.Color(accentHex), 0.05);

      // Mouse Parallax Damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate Root World with mouse influence
      worldGroup.rotation.y = elapsedTime * 0.12 + mouse.x * 0.5;
      worldGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.05 + mouse.y * 0.4;

      // Spin Core & Rings
      outerMesh.rotation.x = elapsedTime * 0.25;
      outerMesh.rotation.y = elapsedTime * 0.35;

      innerMesh.rotation.x = -elapsedTime * 0.3;
      innerMesh.rotation.y = -elapsedTime * 0.4;
      const pulseScale = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale);

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.x = -elapsedTime * 0.35;

      // Update Orbiting Micro-Nodes
      for (let i = 0; i < nodeMeshes.length; i++) {
        const node = nodeMeshes[i];
        const u = node.userData;
        u.theta += u.speedTheta;
        u.phi += u.speedPhi;

        node.position.x = u.radius * Math.cos(u.theta) * Math.cos(u.phi);
        node.position.y = u.radius * Math.sin(u.phi);
        node.position.z = u.radius * Math.sin(u.theta) * Math.cos(u.phi);

        node.rotation.x += 0.02;
        node.rotation.y += 0.03;
      }

      // Update Seasonal Shards Floating Motion
      for (let i = 0; i < seasonalMeshes.length; i++) {
        const s = seasonalMeshes[i];
        const u = s.userData;
        s.position.y = u.baseY + Math.sin(elapsedTime * 1.5 + u.phase) * 0.25;
        s.rotation.x += u.speed;
        s.rotation.y += u.speed * 1.2;

        if (curSeason === 'winter') {
          // Scale like crystalline ice shards
          s.scale.set(0.9, 1.6, 0.9);
        } else if (curSeason === 'rainy') {
          // Flatten like water drop ripple beacons
          s.scale.set(1.4, 0.6, 1.4);
        } else {
          // Polyhedral solar spores
          s.scale.set(1, 1, 1);
        }
      }

      // Holographic Grid Wave Undulation
      const posAttr = gridPlaneGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const z = Math.sin(vx * 0.6 + elapsedTime * 1.2) * 0.12 + Math.cos(vy * 0.6 + elapsedTime * 1.2) * 0.12;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries and Materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      id="hero-3d-scene-container"
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
