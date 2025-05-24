
import { X } from "lucide-react";
import { TimelineEventData } from "./Timeline";

interface EventModalProps {
  event: TimelineEventData;
  onClose: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'philosophical-foundations':
      return 'from-violet-400 to-purple-500';
    case 'early-ai':
      return 'from-amber-400 to-orange-500';
    case 'symbolic-ai':
      return 'from-yellow-400 to-amber-500';
    case 'ai-winter':
      return 'from-slate-400 to-slate-600';
    case 'machine-learning':
      return 'from-green-400 to-emerald-500';
    case 'rise-of-statistical-methods':
      return 'from-teal-400 to-cyan-500';
    case 'technological-milestone':
      return 'from-blue-400 to-indigo-500';
    case 'generative-ai':
      return 'from-pink-400 to-rose-500';
    case 'transformers':
      return 'from-indigo-400 to-blue-500';
    case 'ai-applications':
      return 'from-emerald-400 to-green-500';
    case 'ai-ethics':
      return 'from-red-400 to-pink-500';
    case 'multimodal-ai':
      return 'from-purple-400 to-pink-500';
    case 'open-source-ai':
      return 'from-orange-400 to-red-500';
    case 'ai-future':
      return 'from-cyan-400 to-blue-500';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'philosophical-foundations':
      return 'Philosophical Foundations';
    case 'early-ai':
      return 'Early AI';
    case 'symbolic-ai':
      return 'Symbolic AI';
    case 'ai-winter':
      return 'AI Winter';
    case 'machine-learning':
      return 'Machine Learning';
    case 'rise-of-statistical-methods':
      return 'Statistical Methods';
    case 'technological-milestone':
      return 'Technological Milestone';
    case 'generative-ai':
      return 'Generative AI';
    case 'transformers':
      return 'Transformers';
    case 'ai-applications':
      return 'AI Applications';
    case 'ai-ethics':
      return 'AI Ethics';
    case 'multimodal-ai':
      return 'Multimodal AI';
    case 'open-source-ai':
      return 'Open-Source AI';
    case 'ai-future':
      return 'AI Future';
    default:
      return 'Unknown';
  }
};

const getRelatedLinks = (event: string) => {
  const links: { [key: string]: string[] } = {
    "Turing Test": [
      "https://en.wikipedia.org/wiki/Turing_test",
      "https://plato.stanford.edu/entries/turing-test/"
    ],
    "Dartmouth Conference": [
      "https://en.wikipedia.org/wiki/Dartmouth_workshop",
      "https://www.britannica.com/event/Dartmouth-Conference"
    ],
    "ELIZA Chatbot": [
      "https://en.wikipedia.org/wiki/ELIZA",
      "https://web.njit.edu/~ronkowit/eliza.html"
    ],
    "Chinese Room Argument": [
      "https://plato.stanford.edu/entries/chinese-room/",
      "https://en.wikipedia.org/wiki/Chinese_room"
    ],
    "Backpropagation Popularized": [
      "https://www.nature.com/articles/323533a0",
      "https://en.wikipedia.org/wiki/Backpropagation"
    ],
    "Support Vector Machines (SVMs)": [
      "https://en.wikipedia.org/wiki/Support-vector_machine",
      "https://scikit-learn.org/stable/modules/svm.html"
    ],
    "Long Short-Term Memory (LSTM)": [
      "https://en.wikipedia.org/wiki/Long_short-term_memory",
      "https://www.bioinf.jku.at/publications/older/2604.pdf"
    ],
    "Deep Learning Renaissance": [
      "https://www.cs.toronto.edu/~hinton/science.pdf",
      "https://en.wikipedia.org/wiki/Deep_learning"
    ],
    "NVIDIA launch CUDA": [
      "https://developer.nvidia.com/cuda-zone",
      "https://en.wikipedia.org/wiki/CUDA"
    ],
    "ImageNet Launched": [
      "http://www.image-net.org/",
      "https://en.wikipedia.org/wiki/ImageNet"
    ],
    "AlexNet": [
      "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html",
      "https://en.wikipedia.org/wiki/AlexNet"
    ],
    "GANs Introduced": [
      "https://arxiv.org/abs/1406.2661",
      "https://en.wikipedia.org/wiki/Generative_adversarial_network"
    ],
    "Attention Is All You Need": [
      "https://arxiv.org/abs/1706.03762",
      "https://papers.nips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html"
    ],
    "GPT-1": [
      "https://openai.com/research/language-unsupervised",
      "https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf"
    ],
    "GPT-2": [
      "https://openai.com/research/better-language-models",
      "https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
    ],
    "GPT-3": [
      "https://arxiv.org/abs/2005.14165",
      "https://openai.com/research/language-models-are-few-shot-learners"
    ],
    "Launch of DALL-E": [
      "https://openai.com/research/dall-e",
      "https://arxiv.org/abs/2102.12092"
    ],
    "Launch of ChatGPT": [
      "https://openai.com/blog/chatgpt",
      "https://chat.openai.com/"
    ],
    "GPT-4": [
      "https://arxiv.org/abs/2303.08774",
      "https://openai.com/research/gpt-4"
    ],
    "Claude 3 by Anthropic": [
      "https://www.anthropic.com/news/claude-3-family",
      "https://www.anthropic.com/claude"
    ],
    "Gemini by Google": [
      "https://deepmind.google/technologies/gemini/",
      "https://arxiv.org/abs/2312.11805"
    ]
  };
  
  return links[event] || [];
};

export const EventModal = ({ event, onClose }: EventModalProps) => {
  const colorClasses = getCategoryColor(event.category);
  const relatedLinks = getRelatedLinks(event.event);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-slate-600 shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="relative p-6 border-b border-slate-700">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-gradient-to-r ${colorClasses} text-white`}>
            {getCategoryLabel(event.category)}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">{event.year}</h2>
          <h3 className="text-2xl font-semibold text-blue-300">{event.event}</h3>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              {event.description}
            </p>
          </div>
          
          {/* Related Links */}
          {relatedLinks.length > 0 && (
            <div className="mt-8 p-4 bg-slate-700/50 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3">Related Resources</h4>
              <div className="space-y-2">
                {relatedLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-400 hover:text-blue-300 transition-colors underline text-sm"
                  >
                    {link.includes('arxiv.org') ? 'arXiv Paper' : 
                     link.includes('wikipedia.org') ? 'Wikipedia Article' :
                     link.includes('openai.com') ? 'OpenAI Research' :
                     link.includes('anthropic.com') ? 'Anthropic Research' :
                     link.includes('plato.stanford.edu') ? 'Stanford Encyclopedia' :
                     link.includes('deepmind.google') ? 'Google DeepMind' :
                     'External Link'} →
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Close button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
