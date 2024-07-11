import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";

interface TagInputProps {
  initialTags?: string[];
}

export const TagInput: React.FC<TagInputProps> = ({ initialTags = [] }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleTagDelete = (index: number): void => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap items-center border rounded gap-2 pl-2 pr-2 w-full">
      {tags.map((tag, index) => (
        <Badge key={index}>
          {tag}
          <button
            className="ml-1 text-gray-500 hover:text-gray-700"
            onClick={() => handleTagDelete(index)}
          >
            &times;
          </button>
        </Badge>
      ))}
      <Input
        className="flex-1 p-1 m-1 border-none outline-none !ring-0 !focus-visible:ring-0 !focus-visible:ring-transparent shadow-none"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type and press enter"
      />
    </div>
  );
};

export default TagInput;
