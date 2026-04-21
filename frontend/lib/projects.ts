export interface Project {
  id: string
  name: string
  tagline: string
  problem: string
  solution: string
  architecture: string
  stack: string[]
  decisions: string[]
  challenges: string[]
  improvements: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'learnlite',
    name: 'learnlite',
    tagline: 'Offline LLM tutoring with real-time streaming & local inference',
    problem: `
Most AI tutoring tools depend on cloud APIs, making them unreliable in low-connectivity environments and expensive to scale. 
Running LLMs locally introduces challenges around latency, memory usage, and response consistency.
`,    
solution: `
Built a fully offline AI tutoring system using a local LLM (Ollama) with FastAPI and React. 
Implemented real-time response streaming using Server-Sent Events (SSE) and added contextual memory for improved conversational continuity.

Focused on system stability by enforcing validation, retry logic, and request constraints to handle inconsistent LLM outputs.
`,
    architecture: `┌─────────────┐     SSE Stream     ┌──────────────────┐
│  React UI   │ ◄─────────────── │  FastAPI Backend │
│  (Browser)  │ ──── HTTP/WS ──► │  /chat endpoint  │
└─────────────┘                  └────────┬─────────┘
                                          │ Ollama API
                                  ┌───────▼────────┐
                                  │  Local LLM     │
                                  │ (Llama/Mistral)│
                                  └────────────────┘`,
    stack: ['FastAPI', 'React', 'Ollama', 'SSE', 'Python'],
    decisions: [
      'SSE over WebSockets for simpler unidirectional streaming',
      'Ollama abstracts model switching without code changes',
      'FastAPI async generators for non-blocking stream handling',
    ],
    challenges: [
      'Managing SSE connection lifecycle on client reconnects',
      'Prompt engineering for consistent multilingual output',
      'Memory footprint of local LLMs on consumer hardware',
    ],
    improvements: [
      'RAG-based curriculum ingestion from PDFs',
      'Session memory with vector store persistence',
      'Fine-tuned subject-specific model adapters',
    ],
  },
  {
    id: 'nexpenza',
    name: 'nexpenza',
    tagline: 'Secure full-stack expense system with RBAC and analytics',
problem: `
Most expense tracking tools are SaaS-based, limiting data ownership and customization. 
There is a need for a self-hosted system with fine-grained access control and efficient financial data querying.
`,    
solution: `
Developed a full-stack expense management system using Spring Boot and React with JWT-based authentication and role-based access control.

Designed REST APIs with optimized query handling for financial data aggregation and built interactive dashboards for analyzing spending patterns.
`,
    architecture: `┌──────────┐   REST/JSON   ┌─────────────────────────────────┐
│ React UI │ ────────────► │       Spring Boot API           │
└──────────┘              │  ┌──────────┐  ┌────────────┐  │
                           │  │JWT Filter│  │RBAC Layer  │  │
                           │  └──────────┘  └────────────┘  │
                           │  ┌──────────────────────────┐  │
                           │  │ Service Layer (Business)  │  │
                           │  └──────────────────────────┘  │
                           │  ┌──────────────────────────┐  │
                           │  │    JPA / PostgreSQL       │  │
                           │  └──────────────────────────┘  │
                           └─────────────────────────────────┘`,
    stack: ['Spring Boot', 'React', 'JWT', 'PostgreSQL', 'JPA', 'Recharts'],
    decisions: [
      'Stateless JWT auth — horizontally scalable from day one',
      'RBAC via Spring Security method-level annotations',
      'Repository pattern for clean domain separation',
    ],
    challenges: [
      'JWT refresh token rotation without session state',
      'Aggregation queries for dashboard performance',
      'Role inheritance edge cases in permission checks',
    ],
    improvements: [
      'CSV/PDF export with async job queue',
      'Budget alerts via email notifications',
      'Multi-currency support with fx rate caching',
    ],
  },
  {
    id: 'voiceauth',
    name: 'voiceauth',
tagline: 'Speaker verification using embeddings and ML-based spoof detection',
problem: `
Password-based authentication is vulnerable to reuse and phishing. 
Voice biometrics provide a passive authentication mechanism, but accuracy is affected by noise, recording quality, and speaker variability.
`,    
solution: `
Built a speaker verification system using MFCC feature extraction and Resemblyzer embeddings, combined with cosine similarity for identity matching.

Integrated an SVM classifier for spoof detection and applied audio preprocessing techniques such as noise reduction, normalization, and silence trimming to improve robustness.
`,    architecture: `Audio Input (WAV/mic)
       │
       ▼
┌──────────────────┐
│  Librosa         │  ── MFCC extraction (40 coefficients)
│  Preprocessing   │  ── Noise reduction, normalization
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Resemblyzer     │  ── d-vector speaker embeddings (256-dim)
│  Embedding       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Matching Engine │  ── Cosine similarity vs enrolled embeddings
│  + SVM Classifier│  ── Spoof/liveness detection
└────────┬─────────┘
         │
      ACCEPT / REJECT`,
    stack: ['Python', 'Librosa', 'Resemblyzer', 'scikit-learn', 'NumPy'],
    decisions: [
      "Resemblyzer's GE2E-trained embeddings over raw MFCC for robustness",
      'Cosine similarity over Euclidean — scale-invariant for voice',
      'SVM for anti-spoofing: deterministic, explainable, low latency',
    ],
    challenges: [
      'Threshold tuning for FAR/FRR tradeoff',
      'Microphone variability across recording conditions',
      'Short enrollment audio (< 5s) limiting embedding quality',
    ],
    improvements: [
      'Real-time streaming auth via WebRTC + WebSocket',
      'ECAPA-TDNN model for improved accuracy',
      'Multi-sample enrollment averaging for robustness',
    ],
  },
]
