import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/agate";
import { Badge } from "../ui/badge";
import { FiClock } from "react-icons/fi";
import formatUnixDate from "@/utils/dateConverter";

interface timelineItemProps {
  code: string;
  updatedAt: number;
  version: number;
  language: string;
}

interface props {
  history: timelineItemProps[];
  language: string;
}

const TimelineItem: React.FC<timelineItemProps> = ({
  code,
  updatedAt,
  version,
  language,
}) => {
  return (
    <div className="relative pl-10 pb-10 group">
      <div className="absolute left-3.5 top-3 h-full w-px bg-gradient-to-b from-zinc-500 to-zinc-800" />

      <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:border-zinc-600 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300">
        <FiClock />
      </div>

      <div className="space-y-1.5">
        <div className=" flex-center text-sm gap-2 text-zinc-400">
          <p className="font-semibold mt-1">{formatUnixDate(updatedAt)}</p>
        </div>

        <Badge># {version}</Badge>

        <SyntaxHighlighter
          customStyle={{ background: "transparent" }}
          style={docco}
          language={language}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const Timeline: React.FC<props> = ({ history, language }) => {
  const rev = history.reverse();
  return (
    <div className="relative py-6">
      {rev.map((item, index) => (
        <TimelineItem key={index} {...item} language={language} />
      ))}
    </div>
  );
};

export default Timeline;
