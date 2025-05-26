
import { X } from "lucide-react";
import { TimelineEventData } from "@/data/timelineData";
import { getCategoryColor, getCategoryLabel } from "@/utils/categoryUtils";

interface EventModalProps {
  event: TimelineEventData;
  onClose: () => void;
}

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

const formatLinkText = (url: string): string => {
  if (url.includes('arxiv.org')) return 'arXiv Paper';
  if (url.includes('wikipedia.org')) return 'Wikipedia Article';
  if (url.includes('openai.com')) return 'OpenAI Research';
  if (url.includes('anthropic.com')) return 'Anthropic Research';
  if (url.includes('plato.stanford.edu')) return 'Stanford Encyclopedia';
  if (url.includes('deepmind.google')) return 'Google DeepMind';
  if (url.includes('nature.com')) return 'Nature Article';
  if (url.includes('britannica.com')) return 'Britannica Article';
  return 'External Link';
};

export const EventModal = ({ event, onClose }: EventModalProps) => {
  const colorClasses = getCategoryColor(event.category);
  
  // Use event references first, then fallback to hardcoded links
  const eventReferences = event.references || [];
  const fallbackLinks = getRelatedLinks(event.event);
  const allLinks = eventReferences.length > 0 ? eventReferences : fallbackLinks;

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
          {allLinks.length > 0 && (
            <div className="mt-8 p-4 bg-slate-700/50 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3">Related Resources</h4>
              <div className="space-y-2">
                {allLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-400 hover:text-blue-300 transition-colors underline text-sm"
                  >
                    {formatLinkText(link)} →
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
