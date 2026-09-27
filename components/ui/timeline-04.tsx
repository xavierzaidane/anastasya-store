import React from "react";

export interface TimelineItem {
  title?: React.ReactNode;
  description: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TimelineProps {
  items?: TimelineItem[];
  className?: string;
}

const defaultSteps: TimelineItem[] = [
  {
    title: "Research",
    description:
      "Gather information and analyze requirements to understand the problem and define objectives.",
  },
  {
    title: "Planning",
    description:
      "Create a roadmap, define the scope, and outline the necessary steps to achieve the goal.",
  },
  {
    title: "Design",
    description:
      "Develop wireframes, mockups, and prototypes to visualize the structure and user experience.",
  },
  {
    title: "Development",
    description:
      "Write code, integrate features, and build the core functionality of the application.",
  },
  {
    title: "Testing",
    description:
      "Perform quality assurance, fix bugs, and optimize performance before release.",
  },
  {
    title: "Deployment",
    description:
      "Launch the project in a live environment and ensure smooth deployment.",
  },
  {
    title: "Maintenance",
    description:
      "Monitor performance, update features, and provide ongoing support and improvements.",
  },
];

export default function Timeline({ items = defaultSteps, className = "" }: TimelineProps) {
  return (
    <div className={`mx-auto w-full ${className}`}>
      <div className="relative ml-4 sm:ml-5">
        {/* Timeline line */}
        <div className="absolute inset-y-0 left-0 border-l border-border" />

        {items.map((item, index) => (
          <div className="relative pb-8 sm:pb-10 pl-7 sm:pl-9 last:pb-0" key={index}>
            {/* Timeline Icon / Number */}
            <div className="absolute left-px flex h-7 w-7 sm:h-8 sm:w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-muted ring-6 sm:ring-8 ring-background text-foreground font-medium text-xs sm:text-sm">
              <span>{index + 1}</span>
            </div>

            {/* Content */}
            <div className="space-y-1 pt-0.5 sm:pt-1">
              {item.title && (
                <h3 className="font-medium text-base sm:text-lg tracking-[-0.01em] text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  {item.icon && React.createElement(item.icon, { className: "w-4 h-4 text-primary shrink-0" })}
                  <span>{item.title}</span>
                </h3>
              )}
              <div className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

