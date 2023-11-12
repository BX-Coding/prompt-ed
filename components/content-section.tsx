import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { CheckCircledIcon, MinusCircledIcon } from "@radix-ui/react-icons";

type ContentSectionProps = {
    content: string;
    checked?: boolean;
};

export const ContentSection: FC<ContentSectionProps> = ({ checked, content}) => {
  return (
  <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center text-foreground p-1 rounded-md">
            {!checked && <MinusCircledIcon className="text-accent" style={{height: 20, width: 20}}/>}
            {checked && <CheckCircledIcon className="text-green-700" style={{height: 20, width: 20}}/>}
        </div>
        <Separator orientation="vertical" className="h-full mr-2" />
        <div className="flex flex-col items-left text-foreground p-1 rounded-md">
        {content}
        </div>
    </div>
  );
};
