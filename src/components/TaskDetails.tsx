import React, { useEffect, useState } from "react";
import { ITask } from "@/types/tasks";
import Image from "next/image";

interface TaskDetailsProps {
  task: ITask;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  const { name, description, status, owner_id, due_date, priority, image } =
    task;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const textDecoder = new TextDecoder();
    const imageUrl = textDecoder.decode(
      Buffer.from(task.image) as unknown as ArrayBuffer,
    );
    if (imageUrl !== "//") setImageUrl(imageUrl);
  }, [task.image]);

  return (
    <div className="bg-white border-l-4 border-gray-200 rounded shadow-lg overflow-hidden">
      <div className={`bg-black-500 p-4`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">{name}</h2>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black-200 text-black-800`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700">{description}</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            className="mt-2 max-w-full rounded"
            width={200}
            height={200}
          />
        )}
        <div className="mt-4">
          {due_date && (
            <p className="text-sm text-gray-600">
              <strong>Due:</strong> {due_date.split("T")[0]}
            </p>
          )}
          <p className="text-sm text-gray-600">
            <strong>Priority:</strong> {priority}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Color:</strong> {task.color}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
