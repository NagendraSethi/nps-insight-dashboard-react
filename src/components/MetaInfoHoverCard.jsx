
import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';
import { Info } from 'lucide-react';

const MetaInfoHoverCard = ({ children, title, description, position = "right" }) => {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="cursor-help inline-flex items-center">
          {children}
          <Info className="h-4 w-4 ml-1 text-muted-foreground" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        className="bg-card border shadow-lg rounded-md p-3 max-w-sm animate-in fade-in"
        side={position} 
        align="center"
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MetaInfoHoverCard;
