import { cn } from "../../lib/utils";
import {
  Search,
  Star,
  Brain,
  Users,
  Clock,
  Shield,
  Zap,
  Heart,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Smart Professor Search",
      description:
        "Search by name, department, or teaching style to find the perfect match for your learning needs.",
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: "Real Student Reviews",
      description:
        "Access comprehensive ratings and detailed feedback from students who've been in your shoes.",
      icon: <Star className="h-6 w-6" />,
    },
    {
      title: "AI-Powered Insights",
      description:
        "Get personalized recommendations based on your learning style and academic goals.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Community Driven",
      description: "Built by students, for students. Join thousands making smarter academic choices.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Real-time Updates",
      description: "Always up-to-date information with the latest professor ratings and reviews.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Privacy First",
      description:
        "Your data is secure and private. We never share your personal information.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Lightning Fast",
      description:
        "Get instant results with our optimized search and AI-powered recommendations.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Made with Love",
      description: "Crafted with care to help students succeed in their academic journey.",
      icon: <Heart className="h-6 w-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-800",
        (index === 0 || index === 4) && "lg:border-l border-gray-800",
        index < 4 && "lg:border-b border-gray-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-800/50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-800/50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-gray-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-700 group-hover/feature:bg-indigo-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-400 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}; 