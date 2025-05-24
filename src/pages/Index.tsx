
import { Timeline } from "@/components/Timeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            The Evolution of Artificial Intelligence
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Journey through the key milestones that shaped modern AI, from the Dartmouth Conference to today's multimodal models
          </p>
        </div>
        <Timeline />
      </div>
    </div>
  );
};

export default Index;
