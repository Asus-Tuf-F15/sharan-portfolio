export interface ResearchItem {
  id: string;
  title: string;
  field: 'Tactile Sensing & Robotics' | 'Edge Computer Vision' | 'Multimodal NLP & Fact-Checking' | 'Embedded Neural Acceleration';
  status: 'Published' | 'Under Review' | 'Active Investigation' | 'Conference Preprint';
  venue: string;
  year: string;
  abstract: string;
  methodology: string[];
  findings: string[];
  keywords: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  citation: string;
  paperUrl?: string;
  githubUrl?: string;
  interactiveDemoId?: string;
}

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 'tactile-electronic-skin-research',
    title: 'High-Resolution Dynamic Tactile Sensing Arrays via Piezoresistive Microstructures for Robotic Surface Discrimination',
    field: 'Tactile Sensing & Robotics',
    status: 'Published',
    venue: 'IEEE International Conference on Robotics & Embedded Sensing (ICRES)',
    year: '2025',
    abstract: 'Robotic manipulation in unstructured environments requires fine-grained tactile feedback analogous to human mechanoreceptors. We present a scalable fabrication process for flexible piezoresistive sensor matrices utilizing micro-domed PDMS conductive elastomer composite. When coupled with an edge-quantized 1D-CNN temporal feature extractor, our system discriminates 12 micro-textures with 96.2% accuracy under varying normal load dynamics.',
    methodology: [
      'Engineered micro-domed polydimethylsiloxane (PDMS) substrates doped with multi-walled carbon nanotubes (MWCNTs).',
      'Captured dynamic mechanical shear vibrations at 500Hz sampling bandwidth using high-precision low-noise differential transimpedance amplifiers.',
      'Constructed a dual-stream wavelet transformation & 1D convolutional feature pipeline for time-series tactile signal decomposition.',
    ],
    findings: [
      'Micro-domed elastomeric geometries enhanced low-pressure sensitivity by 3.8x compared to planar conductive sheets.',
      'Achieved robust tactile texture classification across variable robotic sliding velocities (20mm/s to 80mm/s).',
      'Demonstrated sub-20ms inference response time on low-power 240MHz microcontroller hardware.',
    ],
    keywords: ['Tactile Sensing', 'Electronic Skin', 'Robotic Manipulation', 'TinyML', 'Edge Classification'],
    metrics: [
      { label: 'Classification Accuracy', value: '96.2%' },
      { label: 'Pressure Sensitivity', value: '14.8 kPa⁻¹' },
      { label: 'Response Time', value: '18 ms' },
      { label: 'Fatigue Cycles', value: '>10,000' },
    ],
    citation: 'Rai, S. et al. (2025). "High-Resolution Dynamic Tactile Sensing Arrays via Piezoresistive Microstructures for Robotic Surface Discrimination." IEEE ICRES, pp. 112-119.',
    githubUrl: 'https://github.com/sharanrai/flexible-electronic-skin-classifier',
  },
  {
    id: 'edge-yolo-optimization-research',
    title: 'Sub-15ms Multi-Agent Urban Tracking via Quantized Cross-Layer Feature Pyramids on Embedded TensorRT Engines',
    field: 'Edge Computer Vision',
    status: 'Conference Preprint',
    venue: 'Computer Vision & Autonomous Systems Symposia (CVAS)',
    year: '2025',
    abstract: 'High-density urban autonomous driving demands real-time pedestrian and multi-class vehicle detection on thermal- and power-constrained edge compute units. We introduce an optimized anchor-free convolutional backbone with channel-pruned multi-scale attention heads, achieving INT8 quantization with <0.6% mAP degradation on embedded NVIDIA Jetson platforms.',
    methodology: [
      'Profiled layer-wise computational bottlenecks in YOLOv11 nano/small backbones under high bounding box density.',
      'Introduced dynamic cross-stage partial connections with depthwise separable convolutions to reduce FLOPs by 34%.',
      'Implemented post-training symmetric INT8 quantization using entropy calibration on diverse weather condition datasets (fog, rain, direct sunlight).',
    ],
    findings: [
      'Boosted edge frame throughput from 42 FPS to 94.2 FPS on Jetson Orin Nano with identical detection reliability.',
      'Maintained 88.4% MOTA tracking stability through rapid camera ego-motion and severe object occlusions.',
      'Reduced thermal footprint by 4.2W, preventing edge thermal throttling in sealed enclosure deployments.',
    ],
    keywords: ['YOLO Optimization', 'TensorRT', 'Edge AI', 'Object Tracking', 'Embedded Vision'],
    metrics: [
      { label: 'FPS on Edge', value: '94.2' },
      { label: 'mAP@0.5', value: '91.8%' },
      { label: 'INT8 Precision Drop', value: '-0.6%' },
      { label: 'Power Reduction', value: '-28%' },
    ],
    citation: 'Rai, S. (2025). "Sub-15ms Multi-Agent Urban Tracking via Quantized Cross-Layer Feature Pyramids on Embedded TensorRT Engines." arXiv:2504.08912.',
    githubUrl: 'https://github.com/sharanrai/pedestrian-vehicle-detection-yolo',
  },
  {
    id: 'multimodal-fact-checking-research',
    title: 'Contrastive Dual-Encoder Alignment for Automated Real-Time Claim Verification and Explainable Disinformation Scoring',
    field: 'Multimodal NLP & Fact-Checking',
    status: 'Active Investigation',
    venue: 'AI Ethics & Natural Language Processing Journal (In Preparation)',
    year: '2026',
    abstract: 'Automated mitigation of synthetic misinformation necessitates swift factual cross-examination against corroborated reference corpora. We propose a hybrid cross-encoder retrieval architecture that evaluates semantic claim entails, syntactic exaggeration markers, and knowledge-graph relational consistency, producing calibrated confidence scores with highlighted claim rationale.',
    methodology: [
      'Curated a balanced multi-domain benchmark dataset consisting of 1.2M verified claims and synthetic counter-arguments.',
      'Formulated an asymmetric dual-encoder loss penalizing speculative assertiveness and linguistic clickbait markers.',
      'Trained cross-attention transformer heads to compute word-level token contribution weights for explainability heatmaps.',
    ],
    findings: [
      'Surpassed standard BERT baseline F1 scores by 7.4% on out-of-domain breaking news snippets.',
      'Lowered false positive hallucination flags by 42% via structured knowledge-graph entity disambiguation.',
      'Sub-200ms end-to-end verification pipeline suitable for live browser extension overlays.',
    ],
    keywords: ['NLP', 'Transformers', 'Misinformation Detection', 'Explainable AI', 'Knowledge Graphs'],
    metrics: [
      { label: 'F1 Verification', value: '93.7%' },
      { label: 'Inference Latency', value: '180 ms' },
      { label: 'Corpus Size', value: '1.2M Claims' },
      { label: 'Explainability Accuracy', value: '89.2%' },
    ],
    citation: 'Rai, S. & Lab Collaborators (2026). "Contrastive Dual-Encoder Alignment for Automated Real-Time Claim Verification." (Under submission).',
    githubUrl: 'https://github.com/sharanrai/breaking-the-fake-news-verification',
  },
];
