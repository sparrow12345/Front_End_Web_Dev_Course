"use client";

import { getToDo } from "@/components/api";
import MyTask from "@/components/EditMyTask";
import TaskDetails from "@/components/TaskDetails";
import { ITask } from "@/types/tasks";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetcher = async () => {
      const taskData = await getToDo(params.id);
      setTask(taskData);
    };
    fetcher();
    setLoading(false);
  }, [params.id]);

  return (
    <main className=" mx-auto  min-h-screen bg-zinc-100 w-full text-black">
      <div className="max-w-2xl mx-auto pt-20">
        {loading && <span>Loading...</span>}
        {!!task && <TaskDetails task={task} />}
        {/* {!task && !loading && <span>Not found!</span>} */}
      </div>
    </main>
  );
}
