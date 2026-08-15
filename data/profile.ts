export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  interests: string[];
  education: {
    degree: string;
    institution: string;
    period: string;
    details: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Sharan Rai",
  role: "AI & Machine Learning Engineer",
  tagline: "I build intelligent systems combining AI, computer vision, robotics and modern software.",
  bio: "Passionate Artificial Intelligence and Machine Learning engineering student dedicated to bridging theoretical deep learning with low-latency physical systems. Specializing in computer vision models, robotic perception, tactile sensing hardware, and real-time edge intelligence.",
  location: "Bangalore / Global Remote",
  status: "Available for AI/ML Engineering & Research Roles",
  email: "sharanrai.ai@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "Robotics",
    "IoT",
    "Generative AI",
    "Software Development",
  ],
  stats: [
    { label: "Vision Latency", value: "<12ms", description: "Edge-optimized YOLO inference on TensorRT" },
    { label: "AI Models Trained", value: "35+", description: "From YOLOv11 to Transformer architectures" },
    { label: "Research Papers", value: "2", description: "Tactile Sensing & Real-Time Multimodal AI" },
    { label: "Embedded Nodes", value: "50+", description: "Microcontrollers & ESP32 sensor clusters" },
  ],
  education: [
    {
      degree: "B.Tech in Artificial Intelligence & Machine Learning",
      institution: "School of Computing & Engineering",
      period: "2022 - Present",
      details: "Focusing on Deep Learning architectures, Embedded Neural Acceleration, Autonomous Systems, and Statistical Pattern Recognition. Dean's Honor Roll.",
    },
  ],
};
