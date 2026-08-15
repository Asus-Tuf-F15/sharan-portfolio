export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI/ML' | 'Computer Vision' | 'IoT' | 'Web';
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  architectureOverview: string;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'pedestrian-vehicle-yolo',
    title: 'Pedestrian & Vehicle Detection using YOLO',
    tagline: 'High-speed multi-class urban traffic perception running at 94+ FPS on edge TensorRT.',
    category: 'Computer Vision',
    description: 'Real-time multi-agent vision framework tracking pedestrian trajectories, vehicle velocity vectors, and high-density occlusion zones.',
    longDescription: 'Engineered an end-to-end urban perception pipeline tailored for embedded edge devices and intelligent transportation systems. Using custom-trained YOLO architectures integrated with ByteTrack and DeepSORT, the system achieves 94 FPS on NVIDIA Jetson with sub-15ms inference latency. Features robust bounding-box stabilization under harsh glare and night rain conditions.',
    technologies: ['YOLOv8/v11', 'PyTorch', 'OpenCV', 'TensorRT', 'Python', 'C++'],
    image: 'https://picsum.photos/seed/yolo-vision/800/500',
    githubUrl: 'https://github.com/sharanrai/pedestrian-vehicle-detection-yolo',
    liveDemoUrl: 'https://github.com/sharanrai/pedestrian-vehicle-detection-yolo',
    featured: true,
    metrics: [
      { label: 'Inference Speed', value: '94.2 FPS' },
      { label: 'mAP@0.5', value: '91.8%' },
      { label: 'Edge Latency', value: '10.6 ms' },
      { label: 'Tracking Accuracy', value: '88.4% MOTA' },
    ],
    highlights: [
      'Engineered custom anchor head adaptations for micro-pedestrian detection at 100m+ distances.',
      'Quantized FP32 weights to INT8 precision with negligible 0.6% accuracy degradation.',
      'Developed Kalman filter trajectory extrapolation to maintain IDs through 30+ frame occlusions.',
    ],
    architectureOverview: 'Camera Feed (RTSP / USB) -> OpenCV Buffer Queue -> TensorRT INT8 Engine -> Feature Pyramid Network -> ByteTrack Association -> Trajectory Vector Output.',
    color: '#06B6D4',
  },
  {
    id: 'gesture-action-sharing',
    title: 'Gesture-Based Action Sharing System',
    tagline: 'Contactless spatial gesture recognition enabling real-time multi-device control.',
    category: 'Computer Vision',
    description: 'Spatial gesture recognition platform combining 3D hand landmark tracking with low-latency WebSocket peer broadcasting.',
    longDescription: 'Created a touchless human-computer interaction system that translates complex multi-finger hand gestures into instantaneous system commands. Leveraging MediaPipe landmarks with a lightweight temporal 1D-CNN, the platform detects 18 discrete gesture classes with 98.4% classification accuracy. Commands are synchronized in <5ms across networked client nodes.',
    technologies: ['Computer Vision', 'MediaPipe', 'React', 'WebSockets', 'Python', 'Flask'],
    image: 'https://picsum.photos/seed/gesture-ai/800/500',
    githubUrl: 'https://github.com/sharanrai/gesture-action-sharing-system',
    liveDemoUrl: 'https://github.com/sharanrai/gesture-action-sharing-system',
    featured: true,
    metrics: [
      { label: 'Gesture Accuracy', value: '98.4%' },
      { label: 'Latency', value: '12 ms' },
      { label: 'Gesture Classes', value: '18 Actions' },
      { label: 'Sync Delay', value: '<5 ms' },
    ],
    highlights: [
      'Trained dynamic gesture classifier using normalized 3D hand vector trajectories.',
      'Constructed peer-to-peer WebSocket event broker for zero-latency screen-to-device casting.',
      'Implemented robust background clutter rejection and adaptive lighting compensation.',
    ],
    architectureOverview: 'Webcam Stream -> MediaPipe 21 Landmark Extractor -> Temporal Spatial CNN -> State Machine Action Parser -> WebSocket Broadcast Gateway -> Target IoT & Screen Nodes.',
    color: '#3B82F6',
  },
  {
    id: 'breaking-the-fake',
    title: 'Breaking the Fake — Real-Time News Verification',
    tagline: 'Multimodal fact-checking and automated misinformation debunking engine.',
    category: 'AI/ML',
    description: 'Deep learning NLP framework analyzing claim veracity, linguistic bias markers, and source credibility graphs.',
    longDescription: 'Developed an automated anti-disinformation platform designed to cross-examine breaking claims against verified semantic knowledge bases in real-time. Employs fine-tuned RoBERTa and DeBERTa transformers along with contrastive semantic embeddings to classify factual consistency, detect synthetic generation artifacts, and present calibrated confidence scores with cited corroboration.',
    technologies: ['Hugging Face', 'Transformers', 'FastAPI', 'PyTorch', 'Next.js', 'Scikit-learn'],
    image: 'https://picsum.photos/seed/fake-news-ai/800/500',
    githubUrl: 'https://github.com/sharanrai/breaking-the-fake-news-verification',
    liveDemoUrl: 'https://github.com/sharanrai/breaking-the-fake-news-verification',
    featured: true,
    metrics: [
      { label: 'F1 Score', value: '93.7%' },
      { label: 'Query Latency', value: '180 ms' },
      { label: 'Corpus Indexed', value: '1.2M Articles' },
      { label: 'Hallucination Drop', value: '-42%' },
    ],
    highlights: [
      'Fine-tuned cross-encoder transformer on Liar and FEVER benchmark datasets.',
      'Designed vector semantic retrieval pipeline leveraging HNSW approximate nearest neighbors.',
      'Constructed explainable AI heatmap visualizer highlighting misleading sentence fragments.',
    ],
    architectureOverview: 'Raw Article / URL -> Text Normalizer -> Dense Vector Embedding -> Dual Semantic Cross-Encoder -> Credibility Knowledge Graph -> Explainability Score Generator.',
    color: '#8B5CF6',
  },
  {
    id: 'flexible-electronic-skin',
    title: 'Flexible Electronic Skin for Material Classification',
    tagline: 'Piezoresistive tactile sensor array with embedded neural network for robotic touch.',
    category: 'IoT',
    description: 'Hardware-software co-design featuring custom flexible piezoresistive sensor matrix classifying surface textures via touch.',
    longDescription: 'Pioneered a wearable and robotic tactile sensing e-skin that captures high-resolution dynamic pressure profiles. By fabricating a flexible polydimethylsiloxane (PDMS) piezoresistive grid connected to an ESP32 microcontroller, the device records micro-vibrations during surface sliding. An on-device 1D-CNN classifies 12 distinct material textures (e.g. silk, wood, aluminum, acrylic) with 96.2% precision.',
    technologies: ['ESP32', 'Sensors', 'PyTorch', 'C++', 'IoT', 'Scikit-learn'],
    image: 'https://picsum.photos/seed/eskin-tactile/800/500',
    githubUrl: 'https://github.com/sharanrai/flexible-electronic-skin-classifier',
    liveDemoUrl: 'https://github.com/sharanrai/flexible-electronic-skin-classifier',
    featured: true,
    metrics: [
      { label: 'Material Accuracy', value: '96.2%' },
      { label: 'Sampling Rate', value: '500 Hz' },
      { label: 'Sensor Grid', value: '4x4 Matrix' },
      { label: 'Power Draw', value: '85 mW' },
    ],
    highlights: [
      'Fabricated multi-layer flexible piezoresistive composite with high durability under repeated strain.',
      'Engineered low-noise high-frequency analog frontend with I2C multi-channel ADC reading.',
      'Deployed quantized neural network directly on ESP32 dual-core Xtensa processor in C++.',
    ],
    architectureOverview: 'Flexible PDMS Tactile Matrix -> Analog Conditioning Array -> ESP32 High-Speed ADC -> FFT & Wavelet Feature Extractor -> Edge Tensor 1D-CNN -> Surface Material Label.',
    color: '#10B981',
  },
  {
    id: 'autonomous-drone-vision',
    title: 'Autonomous Swarm Navigation & Spatial SLAM',
    tagline: 'Visual-inertial odometry and obstacle avoidance for micro-UAVs in GPS-denied environments.',
    category: 'Computer Vision',
    description: 'Edge-computed stereo visual odometry allowing micro aerial vehicles to navigate dense indoor obstacle courses autonomously.',
    longDescription: 'Engineered a real-time SLAM and obstacle avoidance system for autonomous micro-drones. Combines lightweight stereo disparity maps, optical flow feature tracking, and YOLOv11 nano object detection running concurrently on onboard microprocessors, enabling safe 3D trajectory replanning in GPS-deprived environments.',
    technologies: ['C++', 'OpenCV', 'YOLOv11', 'ROS2', 'PyTorch', 'Sensors'],
    image: 'https://picsum.photos/seed/drone-slam/800/500',
    githubUrl: 'https://github.com/sharanrai/autonomous-drone-slam-vision',
    liveDemoUrl: 'https://github.com/sharanrai/autonomous-drone-slam-vision',
    featured: false,
    metrics: [
      { label: 'Trajectory Drift', value: '<1.2%' },
      { label: 'Planning Cycle', value: '18 ms' },
      { label: 'Obstacle FOV', value: '140°' },
      { label: 'Payload Weight', value: '65 g' },
    ],
    highlights: [
      'Implemented stereo feature point tracking in C++ with sub-pixel disparity accuracy.',
      'Developed 3D OctoMap dynamic occupancy grid generator with real-time Euclidean distance fields.',
      'Benchmarked flight stability in GPS-jammed laboratory tunnels.',
    ],
    architectureOverview: 'Stereo CMOS Sensors -> Epipolar Rectification -> Optical Flow Tracker -> Extended Kalman Filter -> 3D OctoMap Spatial Occupancy -> RRT* Trajectory Planner.',
    color: '#EC4899',
  },
  {
    id: 'smart-agri-edge-ai',
    title: 'Solar-Powered EdgeAI Agro-Ecosystem Node',
    tagline: 'Ultra-low power autonomous soil & crop pathology diagnostic station with LoRaWAN telemetry.',
    category: 'IoT',
    description: 'Decentralized agricultural sensor pod leveraging tinyML for on-leaf fungal disease classification and microclimate optimization.',
    longDescription: 'Created a standalone outdoor IoT telemetry device equipped with multispectral light sensors, soil capacitive arrays, and a miniature CMOS camera. Incorporates TinyML quantization algorithms to classify early-stage crop blight locally on low-power ARM microcontrollers without requiring continuous cloud connectivity.',
    technologies: ['Arduino', 'ESP32', 'Next.js', 'TensorFlow', 'IoT', 'Docker'],
    image: 'https://picsum.photos/seed/smart-agri/800/500',
    githubUrl: 'https://github.com/sharanrai/solar-edgeai-agro-node',
    liveDemoUrl: 'https://github.com/sharanrai/solar-edgeai-agro-node',
    featured: false,
    metrics: [
      { label: 'Blight Accuracy', value: '94.8%' },
      { label: 'Transmission Range', value: '12 km' },
      { label: 'Battery Lifespan', value: 'Solar 24/7' },
      { label: 'Model Footprint', value: '78 KB' },
    ],
    highlights: [
      'Engineered solar energy harvesting circuit with deep sleep consuming under 15uA quiescent current.',
      'Built LoRaWAN long-range mesh broadcasting to central farm telemetry dashboard.',
      'Designed responsive Next.js analytics dashboard with microclimate forecasting.',
    ],
    architectureOverview: 'Multispectral Camera + Soil Sensors -> ARM Cortex MCU -> TinyML Quantized Classifier -> LoRaWAN Radio -> Gateway Cloud -> Next.js Real-time Dashboard.',
    color: '#F59E0B',
  },
];
