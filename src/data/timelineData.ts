
export interface TimelineEventData {
  year: string;
  event: string;
  description: string;
  category: 'philosophical-foundations' | 'early-ai' | 'symbolic-ai' | 'ai-winter' | 'machine-learning' | 'rise-of-statistical-methods' | 'technological-milestone' | 'generative-ai' | 'transformers' | 'ai-applications' | 'ai-ethics' | 'multimodal-ai' | 'open-source-ai' | 'robotics' | 'ai-policy' | 'cultural-impact' | 'speculative' | 'government-initiative';
}

// Get the current data from localStorage if available, otherwise use the existing data
const getCurrentTimelineData = (): TimelineEventData[] => {
  try {
    const stored = localStorage.getItem('ai-timeline-data');
    if (stored) {
      const parsedData = JSON.parse(stored);
      if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].year && parsedData[0].event) {
        return parsedData;
      }
    }
  } catch (error) {
    console.log('Failed to load current timeline data from localStorage:', error);
  }
  
  // Fallback to the previous default data if localStorage is empty
  return [
    {
      year: "1950",
      event: "Turing Test",
      description: "Alan Turing proposed the Turing Test as a measure of machine intelligence, suggesting that if a machine could converse indistinguishably from a human, it could be considered intelligent.",
      category: 'philosophical-foundations'
    },
    {
      year: "1956",
      event: "Dartmouth Conference",
      description: "The founding moment of AI as a field; organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon.",
      category: 'early-ai'
    },
    {
      year: "1965",
      event: "ELIZA Chatbot",
      description: "Joseph Weizenbaum created ELIZA, an early natural language processing program that simulated conversation, marking the beginning of human-computer interaction research.",
      category: 'early-ai'
    },
    {
      year: "1950s-1980s",
      event: "Symbolic AI (GOFAI)",
      description: "AI systems based on logic and rules; focused on manipulating symbols and reasoning explicitly.",
      category: 'symbolic-ai'
    },
    {
      year: "1974-1980",
      event: "First AI Winter",
      description: "Period of reduced funding and interest due to unmet expectations and lack of progress in GOFAI.",
      category: 'ai-winter'
    },
    {
      year: "1980",
      event: "Chinese Room Argument",
      description: "Proposed by John Searle; a philosophical critique of the notion that symbol manipulation equals understanding or consciousness.",
      category: 'philosophical-foundations'
    },
    {
      year: "1986",
      event: "Backpropagation Popularized",
      description: "David Rumelhart, Geoffrey Hinton, and Ronald Williams popularized the use of backpropagation for training neural networks, making deep learning feasible.",
      category: 'machine-learning'
    },
    {
      year: "1987-1993",
      event: "Second AI Winter",
      description: "Second period of reduced funding and interest due to collapse in the market for specialized AI hardware.",
      category: 'ai-winter'
    },
    {
      year: "1992",
      event: "Support Vector Machines (SVMs)",
      description: "Vladimir Vapnik and Alexey Chervonenkis introduced SVMs, a powerful algorithm for classification and regression, marking a shift towards more robust machine learning models.",
      category: 'machine-learning'
    },
    {
      year: "1990s",
      event: "Recurrent Neural Networks (RNNs)",
      description: "Neural networks designed for processing sequential data, using recurrent connections to maintain memory and context.",
      category: 'machine-learning'
    },
    {
      year: "1990s-2000s",
      event: "Rise of Statistical Methods",
      description: "A shift from symbolic reasoning to statistical learning, enabled by more data and computational power.",
      category: 'rise-of-statistical-methods'
    },
    {
      year: "1997",
      event: "Long Short-Term Memory (LSTM)",
      description: "Sepp Hochreiter and Jürgen Schmidhuber introduced LSTMs, a type of RNN that overcomes the vanishing gradient problem, making learning over long sequences possible.",
      category: 'machine-learning'
    },
    {
      year: "1998",
      event: "MNIST Dataset Released",
      description: "A benchmark dataset of handwritten digits that became a standard for testing image classification algorithms.",
      category: 'machine-learning'
    },
    {
      year: "2000-2006",
      event: "Third AI Winter",
      description: "After early excitement around expert systems and neural networks in the 1990s, AI progress slowed. Funding declined as machine learning models underperformed expectations, and neural networks were seen as outdated.",
      category: 'ai-winter'
    },
    {
      year: "2006",
      event: "Deep Learning Renaissance",
      description: "Geoffrey Hinton et al. introduced Deep Belief Networks, sparking renewed interest in training deeper neural networks, leading to the modern deep learning boom.",
      category: 'technological-milestone'
    },
    {
      year: "2007",
      event: "NVIDIA launch CUDA",
      description: "NVIDIA launched CUDA, a programming model that made it much easier for researchers to write GPU-accelerated code in C/C++, a major turning point for deep learning.",
      category: 'technological-milestone'
    },
    {
      year: "2009",
      event: "ImageNet Launched",
      description: "A large-scale image dataset that provided the foundation for breakthroughs in computer vision.",
      category: 'technological-milestone'
    },
    {
      year: "2012",
      event: "AlexNet",
      description: "A deep CNN by Alex Krizhevsky et al. that dramatically improved image classification performance on ImageNet, marking the mainstream success of deep learning with GPU-powered models.",
      category: 'technological-milestone'
    },
    {
      year: "2014",
      event: "GANs Introduced",
      description: "Ian Goodfellow et al. introduced Generative Adversarial Networks, a new class of generative models that could create high-quality images, text, and other media.",
      category: 'generative-ai'
    },
    {
      year: "2017",
      event: "Attention Is All You Need",
      description: "Famous paper by Vaswani et al. introduced the Transformer architecture, revolutionizing NLP with its attention mechanisms for parallel data processing.",
      category: 'transformers'
    },
    {
      year: "2018",
      event: "Transformer Models (BERT, GPT)",
      description: "Transformers became dominant in NLP, surpassing RNNs for tasks like translation and summarization.",
      category: 'transformers'
    },
    {
      year: "2018",
      event: "GPT-1",
      description: "OpenAI released the first Generative Pre-trained Transformer, showing strong zero-shot performance in a variety of NLP tasks.",
      category: 'generative-ai'
    },
    {
      year: "2019",
      event: "GPT-2",
      description: "A significantly larger version of GPT-1; initially withheld due to concerns about misuse, it showcased impressive text generation capabilities.",
      category: 'generative-ai'
    },
    {
      year: "2020",
      event: "GPT-3",
      description: "OpenAI released GPT-3, a 175 billion parameter model that set a new standard for general-purpose text generation, enabling a wide range of applications.",
      category: 'generative-ai'
    },
    {
      year: "2020",
      event: "Launch of DALL-E",
      description: "OpenAI presented DALL-E, showing how transformer models could generate images from text prompts, opening a new era of creative AI.",
      category: 'generative-ai'
    },
    {
      year: "2020",
      event: "AI in Healthcare",
      description: "IBM Watson for Oncology was used to assist oncologists in diagnosing and recommending treatments, marking the beginning of AI's widespread integration in healthcare.",
      category: 'ai-applications'
    },
    {
      year: "2022",
      event: "Launch of ChatGPT",
      description: "OpenAI launched ChatGPT, a conversational AI based on GPT-3.5, marking a major milestone in public interaction with large language models.",
      category: 'generative-ai'
    },
    {
      year: "2022",
      event: "AI Ethics Boards",
      description: "Rise of AI ethics boards reflecting increased awareness of AI's potential biases, ethical challenges, and its role in issues like discrimination and surveillance.",
      category: 'ai-ethics'
    },
    {
      year: "2023",
      event: "GPT-4",
      description: "A multimodal model with improved reasoning, factuality, and image understanding, expanding the capabilities of AI in handling text and images together.",
      category: 'multimodal-ai'
    },
    {
      year: "2024",
      event: "Open-Source LLM Surge",
      description: "Multiple open-weight models (e.g., Mistral, Mixtral, Phi-2) gained traction for high performance in compact architectures.",
      category: 'open-source-ai'
    },
    {
      year: "2024",
      event: "Gemini by Google",
      description: "Google DeepMind launched Gemini 1, a family of powerful multimodal models rivaling GPT-4.",
      category: 'generative-ai'
    },
    {
      year: "2024",
      event: "Claude 3 by Anthropic",
      description: "Anthropic released Claude 3 models with significant improvements in reasoning, language fluency, and safety, used in AI coding tools like Cursor and Lovable.",
      category: 'generative-ai'
    },
    {
      year: "2024",
      event: "DeepSeek Models Released",
      description: "DeepSeek, a prominent AI lab, released large-scale open-source LLMs and code models, increasing transparency and competition in the LLM space.",
      category: 'open-source-ai'
    },
    {
      year: "2025",
      event: "Further AI Multimodality Advances",
      description: "Major models increasingly support multimodal input/output, including video understanding and generation capabilities.",
      category: 'multimodal-ai'
    },
    {
      year: "2026",
      event: "AI and Quantum Computing",
      description: "The first viable quantum AI models are developed, harnessing quantum computing to solve complex optimization problems previously unsolvable by classical AI.",
      category: 'speculative'
    }
  ];
};

export const timelineData: TimelineEventData[] = getCurrentTimelineData();
