
import { useState } from "react";
import { TimelineEvent } from "./TimelineEvent";
import { EventModal } from "./EventModal";

export interface TimelineEventData {
  year: string;
  event: string;
  description: string;
  category: 'founding' | 'winter' | 'breakthrough' | 'modern' | 'recent';
}

const timelineData: TimelineEventData[] = [
  {
    year: "1956",
    event: "Dartmouth Conference",
    description: "The founding moment of AI as a field; organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon.",
    category: 'founding'
  },
  {
    year: "1950s-1980s",
    event: "Symbolic AI (GOFAI)",
    description: "AI systems based on logic and rules; focused on manipulating symbols and reasoning explicitly.",
    category: 'founding'
  },
  {
    year: "1974-1980",
    event: "First AI Winter",
    description: "Period of reduced funding and interest due to unmet expectations and lack of progress in GOFAI.",
    category: 'winter'
  },
  {
    year: "1980",
    event: "Chinese Room Argument",
    description: "Proposed by John Searle; a philosophical critique of the notion that symbol manipulation (as in Symbolic AI) equals understanding or consciousness. Searle imagined a person following rules to manipulate Chinese symbols without understanding their meaning, arguing that computers may appear to understand language but lack true comprehension or consciousness.",
    category: 'founding'
  },
  {
    year: "1986",
    event: "Backpropagation Popularized",
    description: "David Rumelhart, Geoffrey Hinton, and Ronald Williams popularized the use of backpropagation for training neural networks, making deep learning feasible.",
    category: 'breakthrough'
  },
  {
    year: "1987-1993",
    event: "Second AI Winter",
    description: "Second period of reduced funding and interest due to collapse in the market for specialised AI hardware.",
    category: 'winter'
  },
  {
    year: "1989",
    event: "Convolutional Neural Networks (CNNs)",
    description: "Yann LeCun and collaborators introduced CNNs, a neural network architecture designed for image recognition, using convolutional layers to automatically detect spatial patterns and features.",
    category: 'breakthrough'
  },
  {
    year: "1997",
    event: "Long Short-Term Memory (LSTM)",
    description: "Sepp Hochreiter and Jürgen Schmidhuber introduced LSTMs, a type of RNN that overcomes the vanishing gradient problem, making learning over long sequences possible.",
    category: 'breakthrough'
  },
  {
    year: "1990s-2000s",
    event: "Rise of Statistical Methods",
    description: "A shift from symbolic reasoning to statistical learning, enabled by more data and computational power.",
    category: 'breakthrough'
  },
  {
    year: "1990s",
    event: "Recurrent Neural Networks (RNNs)",
    description: "Introduced. Neural networks designed for processing sequential data, using recurrent connections to maintain memory and context. RNNs built upon prior work on backpropagation and LSTMs.",
    category: 'breakthrough'
  },
  {
    year: "1998",
    event: "MNIST Dataset Released",
    description: "A benchmark dataset of handwritten digits that became a standard for testing image classification algorithms.",
    category: 'breakthrough'
  },
  {
    year: "2000-2006",
    event: "Third AI Winter",
    description: "After early excitement around expert systems and neural networks in the 1990s, AI progress slowed. Funding declined as machine learning models underperformed expectations, and neural networks were seen as outdated compared to other statistical methods. Limited computational power and lack of large datasets also stalled major breakthroughs, setting the stage for the later deep learning revolution.",
    category: 'winter'
  },
  {
    year: "2006",
    event: "Deep Learning Renaissance",
    description: "Geoffrey Hinton et al. introduced Deep Belief Networks, sparking renewed interest in training deeper neural networks, leading to the modern deep learning boom.",
    category: 'breakthrough'
  },
  {
    year: "2007",
    event: "NVIDIA launch CUDA",
    description: "NVIDIA launched CUDA, a programming model that made it much easier for researchers to write GPU-accelerated code in C/C++. This was a major turning point for deep learning.",
    category: 'breakthrough'
  },
  {
    year: "2009",
    event: "ImageNet Launched",
    description: "A large-scale image dataset that provided the foundation for breakthroughs in computer vision.",
    category: 'breakthrough'
  },
  {
    year: "2012",
    event: "AlexNet",
    description: "A deep CNN by Alex Krizhevsky et al. that dramatically improved image classification performance on ImageNet. Ilya Sutskever (cofounder of OpenAI) and Geoffrey Hinton (father of back propagation) were co-authors. AlexNet was trained on two NVIDIA GTX 580 GPUs. This was the defining moment when GPU-powered deep learning hit the mainstream.",
    category: 'breakthrough'
  },
  {
    year: "2014",
    event: "GANs Introduced",
    description: "Ian Goodfellow et al. introduced Generative Adversarial Networks, a new class of generative models.",
    category: 'modern'
  },
  {
    year: "2017",
    event: "Attention Is All You Need",
    description: "Famous paper by Vaswani et al. introduced the Transformer architecture, a model that uses attention mechanisms to weigh the importance of different parts of the input data, enabling it to process information in parallel rather than sequentially as was the case with previous architectures (like RNNs). This parallel processing capability significantly increased the speed and efficiency of training and inference, revolutionizing the field of NLP (natural language processing).",
    category: 'modern'
  },
  {
    year: "2018",
    event: "Transformer Models (BERT, GPT)",
    description: "Transformers became dominant in NLP, surpassing RNNs.",
    category: 'modern'
  },
  {
    year: "2018",
    event: "GPT-1",
    description: "OpenAI released the first Generative Pre-trained Transformer, showing strong zero-shot performance.",
    category: 'modern'
  },
  {
    year: "2019",
    event: "GPT-2",
    description: "A significantly larger version of GPT-1; initially withheld due to concerns about misuse.",
    category: 'modern'
  },
  {
    year: "2020",
    event: "GPT-3",
    description: "A 175 billion parameter model enabling highly general-purpose text generation.",
    category: 'modern'
  },
  {
    year: "2020",
    event: "Launch of DALL-E",
    description: "OpenAI presented DALL-E, showing how transformer models could generate images from text prompts, opening a new era of creative AI.",
    category: 'modern'
  },
  {
    year: "2022",
    event: "Launch of ChatGPT",
    description: "OpenAI launched ChatGPT, a conversational AI based on GPT-3.5, marking a major milestone in public interaction with large language models.",
    category: 'recent'
  },
  {
    year: "2023",
    event: "GPT-4",
    description: "A multimodal model with improved reasoning, factuality, and image understanding. Multimodality refers to the ability of a model to process and understand information from multiple modes, such as text and images. This allows the model to have a more comprehensive understanding of the input, leading to improved performance on tasks that require multimodal understanding, such as image captioning and visual question answering.",
    category: 'recent'
  },
  {
    year: "2024",
    event: "Open-Source LLM Surge",
    description: "Multiple open-weight models (e.g., Mistral, Mixtral, Phi-2) gained traction for high performance in compact architectures.",
    category: 'recent'
  },
  {
    year: "2024",
    event: "Gemini by Google",
    description: "Google DeepMind launched Gemini 1, a family of powerful multimodal models rivaling GPT-4.",
    category: 'recent'
  },
  {
    year: "2024",
    event: "Claude 3 by Anthropic",
    description: "Anthropic released Claude 3 models with significant improvements in reasoning, language fluency, and safety. These are the models used by AI coding tools such as Cursor and Lovable.",
    category: 'recent'
  },
  {
    year: "2024",
    event: "DeepSeek Models Released",
    description: "DeepSeek, a prominent AI lab, released large-scale open-source LLMs and code models, increasing transparency and competition in the LLM space.",
    category: 'recent'
  },
  {
    year: "2025",
    event: "Further AI Multimodality Advances",
    description: "Major models increasingly support multimodal input/output, including video understanding and generation capabilities.",
    category: 'recent'
  }
];

export const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventData | null>(null);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 h-full rounded-full shadow-lg shadow-blue-500/20"></div>
      
      {/* Timeline events */}
      <div className="space-y-8">
        {timelineData.map((eventData, index) => (
          <TimelineEvent
            key={`${eventData.year}-${eventData.event}`}
            eventData={eventData}
            index={index}
            onClick={() => setSelectedEvent(eventData)}
          />
        ))}
      </div>

      {/* References section */}
      <div className="mt-16 p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
        <h3 className="text-2xl font-bold text-white mb-4">References & Further Reading</h3>
        <div className="text-slate-300 space-y-2">
          <p>• <a href="https://www.britannica.com/technology/artificial-intelligence" className="text-blue-400 hover:text-blue-300 transition-colors">Britannica - Artificial Intelligence</a></p>
          <p>• <a href="https://arxiv.org/abs/1706.03762" className="text-blue-400 hover:text-blue-300 transition-colors">"Attention Is All You Need" - Original Transformer Paper</a></p>
          <p>• <a href="https://openai.com/research" className="text-blue-400 hover:text-blue-300 transition-colors">OpenAI Research Papers</a></p>
          <p>• <a href="https://www.deeplearningbook.org/" className="text-blue-400 hover:text-blue-300 transition-colors">Deep Learning Book by Ian Goodfellow, Yoshua Bengio, and Aaron Courville</a></p>
          <p>• <a href="https://www.anthropic.com/research" className="text-blue-400 hover:text-blue-300 transition-colors">Anthropic Research</a></p>
        </div>
      </div>

      {/* Event modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};
