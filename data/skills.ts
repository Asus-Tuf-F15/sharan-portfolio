export interface SkillItem {
  name: string;
  category: 'programming' | 'aiml' | 'vision' | 'web' | 'tools' | 'hardware';
  level: 'Expert' | 'Advanced' | 'Proficient';
  experience: string;
  iconName: string;
  color: string;
  highlight: string;
  projectsCount: number;
}

export interface SkillCategory {
  id: 'programming' | 'aiml' | 'vision' | 'web' | 'tools' | 'hardware';
  title: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'aiml',
    title: 'AI / Machine Learning',
    iconName: 'BrainCircuit',
    description: 'Neural network architectures, model training, fine-tuning, transformer pipelines, and evaluation metrics.',
    skills: [
      { name: 'PyTorch', category: 'aiml', level: 'Expert', experience: '3+ yrs', iconName: 'Flame', color: '#EE4C2C', highlight: 'Custom loss functions, CUDA acceleration & TensorRT export', projectsCount: 12 },
      { name: 'TensorFlow', category: 'aiml', level: 'Advanced', experience: '2+ yrs', iconName: 'Layers', color: '#FF6F00', highlight: 'TF-Lite quantization for embedded microcontroller nodes', projectsCount: 8 },
      { name: 'Scikit-learn', category: 'aiml', level: 'Expert', experience: '3+ yrs', iconName: 'BarChart2', color: '#F7931E', highlight: 'Feature engineering, clustering, SVMs & ensemble regressors', projectsCount: 15 },
      { name: 'YOLO', category: 'aiml', level: 'Expert', experience: '3+ yrs', iconName: 'Target', color: '#00FFFF', highlight: 'Custom dataset labeling, anchor tuning & batch inference', projectsCount: 10 },
      { name: 'Hugging Face', category: 'aiml', level: 'Advanced', experience: '2+ yrs', iconName: 'Sparkles', color: '#FFD21E', highlight: 'Transformers, BERT/RoBERTa fine-tuning & LoRA adaptation', projectsCount: 7 },
    ],
  },
  {
    id: 'vision',
    title: 'Computer Vision',
    iconName: 'Eye',
    description: 'Real-time object tracking, spatial geometry, gesture recognition, and multi-camera sensor fusion.',
    skills: [
      { name: 'YOLOv11', category: 'vision', level: 'Expert', experience: 'Latest', iconName: 'Cpu', color: '#06B6D4', highlight: 'Real-time multi-class tracking with C++ TensorRT pipelines', projectsCount: 5 },
      { name: 'YOLOv8', category: 'vision', level: 'Expert', experience: '2+ yrs', iconName: 'Scan', color: '#3B82F6', highlight: 'Instance segmentation & pose estimation edge deployment', projectsCount: 9 },
      { name: 'OpenCV', category: 'vision', level: 'Expert', experience: '3+ yrs', iconName: 'Camera', color: '#5C3EE8', highlight: 'Perspective transforms, optical flow, contours & morphological filters', projectsCount: 16 },
    ],
  },
  {
    id: 'programming',
    title: 'Programming Languages',
    iconName: 'Code2',
    description: 'Core languages powering low-level hardware routines, fast data structures, and web servers.',
    skills: [
      { name: 'Python', category: 'programming', level: 'Expert', experience: '4+ yrs', iconName: 'Terminal', color: '#3776AB', highlight: 'NumPy vectorized operations, multiprocessing, asynchronous APIs', projectsCount: 22 },
      { name: 'C++', category: 'programming', level: 'Advanced', experience: '3+ yrs', iconName: 'Binary', color: '#00599C', highlight: 'Embedded firmware, pointers/memory optimization, OpenCV C++ bindings', projectsCount: 11 },
      { name: 'TypeScript', category: 'programming', level: 'Advanced', experience: '2+ yrs', iconName: 'FileCode2', color: '#3178C6', highlight: 'Type-safe full-stack architectures, generics, modern event systems', projectsCount: 9 },
      { name: 'JavaScript', category: 'programming', level: 'Advanced', experience: '3+ yrs', iconName: 'FileCode', color: '#F7DF1E', highlight: 'ESNext, browser WebGL contexts, async streams', projectsCount: 14 },
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware & IoT',
    iconName: 'Cpu',
    description: 'Physical computing, flexible tactile sensor arrays, microcontrollers, and edge telemetry.',
    skills: [
      { name: 'ESP32', category: 'hardware', level: 'Expert', experience: '3+ yrs', iconName: 'Radio', color: '#E7352C', highlight: 'FreeRTOS dual-core scheduling, BLE & WiFi MQTT telemetry', projectsCount: 8 },
      { name: 'Arduino', category: 'hardware', level: 'Expert', experience: '4+ yrs', iconName: 'CircuitBoard', color: '#00979D', highlight: 'I2C/SPI bus communication, interrupt handling & ADC acquisition', projectsCount: 12 },
      { name: 'Sensors', category: 'hardware', level: 'Expert', experience: '3+ yrs', iconName: 'Activity', color: '#10B981', highlight: 'Piezoresistive tactile matrices, IMUs, ultrasonic & LiDAR', projectsCount: 10 },
      { name: 'IoT', category: 'hardware', level: 'Advanced', experience: '2+ yrs', iconName: 'Wifi', color: '#8B5CF6', highlight: 'Edge-to-cloud pipelines, low-power sleep modes, edge inference', projectsCount: 7 },
    ],
  },
  {
    id: 'web',
    title: 'Web & Backend',
    iconName: 'Globe',
    description: 'Full-stack reactive web applications, high throughput micro-APIs, and telemetry dashboards.',
    skills: [
      { name: 'React', category: 'web', level: 'Expert', experience: '3+ yrs', iconName: 'Atom', color: '#61DAFB', highlight: 'Hook architectures, state machines, canvas integration', projectsCount: 14 },
      { name: 'Next.js', category: 'web', level: 'Advanced', experience: '2+ yrs', iconName: 'Zap', color: '#000000', highlight: 'App router, server-side streaming, static generation', projectsCount: 8 },
      { name: 'Flask', category: 'web', level: 'Expert', experience: '3+ yrs', iconName: 'Server', color: '#000000', highlight: 'Lightweight AI model serving endpoints with ONNX Runtime', projectsCount: 11 },
      { name: 'Node.js', category: 'web', level: 'Proficient', experience: '2+ yrs', iconName: 'Network', color: '#339933', highlight: 'WebSocket stream servers for real-time video frames', projectsCount: 6 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    iconName: 'Wrench',
    description: 'Reproducible research environments, containerization, version control, and GPU acceleration.',
    skills: [
      { name: 'Docker', category: 'tools', level: 'Advanced', experience: '2+ yrs', iconName: 'Box', color: '#2496ED', highlight: 'NVIDIA container toolkit for isolated GPU inference pods', projectsCount: 7 },
      { name: 'Git', category: 'tools', level: 'Expert', experience: '4+ yrs', iconName: 'GitBranch', color: '#F05032', highlight: 'Rebasing, bisecting regression bugs, submodules', projectsCount: 25 },
      { name: 'GitHub', category: 'tools', level: 'Expert', experience: '4+ yrs', iconName: 'Github', color: '#181717', highlight: 'CI/CD workflows for linting, model packaging & automated releases', projectsCount: 25 },
      { name: 'Google Colab', category: 'tools', level: 'Expert', experience: '3+ yrs', iconName: 'CloudRain', color: '#F9AB00', highlight: 'Distributed A100 training scripts & experiment tracking', projectsCount: 18 },
    ],
  },
];
