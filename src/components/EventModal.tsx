
import { X } from "lucide-react";
import { TimelineEventData } from "./Timeline";

interface EventModalProps {
  event: TimelineEventData;
  onClose: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'founding':
      return 'from-amber-400 to-orange-500';
    case 'winter':
      return 'from-slate-400 to-slate-600';
    case 'breakthrough':
      return 'from-green-400 to-emerald-500';
    case 'modern':
      return 'from-blue-400 to-indigo-500';
    case 'recent':
      return 'from-purple-400 to-pink-500';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'founding':
      return 'Foundation Era';
    case 'winter':
      return 'AI Winter';
    case 'breakthrough':
      return 'Breakthrough';
    case 'modern':
      return 'Modern AI';
    case 'recent':
      return 'Recent Advances';
    default:
      return 'Unknown';
  }
};

const getRelatedLinks = (event: string) => {
  const links: { [key: string]: string[] } = {
    "Dartmouth Conference": [
      "https://en.wikipedia.org/wiki/Dartmouth_workshop",
      "https://www.britannica.com/event/Dartmouth-Conference"
    ],
    "Backpropagation Popularized": [
      "https://www.nature.com/articles/323533a0",
      "https://en.wikipedia.org/wiki/Backpropagation"
    ],
    "Attention Is All You Need": [
      "https://arxiv.org/abs/1706.03762",
      "https://papers.nips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html"
    ],
    "GPT-1": [
      "https://openai.com/research/language-unsupervised",
      "https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf"
    ],
    "ChatGPT": [
      "https://openai.com/blog/chatgpt",
      "https://chat.openai.com/"
    ],
    "Claude 3 by Anthropic": [
      "https://www.anthropic.com/news/claude-3-family",
      "https://www.anthropic.com/claude"
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
