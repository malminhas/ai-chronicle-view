
export const getCategoryColor = (category: string) => {
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
    case 'robotics':
      return 'from-cyan-400 to-teal-500';
    case 'ai-policy':
      return 'from-rose-400 to-red-500';
    case 'cultural-impact':
      return 'from-lime-400 to-green-500';
    case 'speculative':
      return 'from-fuchsia-400 to-purple-500';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

export const getCategoryLabel = (category: string) => {
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
    case 'robotics':
      return 'Robotics';
    case 'ai-policy':
      return 'AI Policy';
    case 'cultural-impact':
      return 'Cultural Impact';
    case 'speculative':
      return 'Speculative';
    default:
      return 'Unknown';
  }
};
