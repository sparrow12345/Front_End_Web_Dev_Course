"use client";

import { ITask } from "@/types/tasks";
import { useEffect, useState } from "react";
import { FiEdit, FiInfo, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo } from "@/components/api";
import Image from "next/image";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imgUrl, setImageUrl] = useState<string | null>(null);
  const handleSubmitEditTodo = async (id: string) => {
    router.push("/mytasks/" + task.id + "/edit");
  };

  const handleDeleteTask = async (id: string) => {
    const flag = await deleteTodo(id);
    setOpenModalDeleted(false);
    if (flag) window.location.reload();
  };

  // const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const textDecoder = new TextDecoder();
    const imageUrl = textDecoder.decode(
      Buffer.from(task.image) as unknown as ArrayBuffer
    );
    if (imageUrl !== "//") setImageUrl(imageUrl);
  }, [task.image]);

  return (
    <tr key={task.id} style={{ backgroundColor: task.color, opacity: 0.7 }}>
      <td className="w-full text-black ">
        <div className={`flex gap-2 justify-start text-center items-center`}>
          <div>
            {imgUrl && (
              <Image
                src={imgUrl}
                width={70}
                height={70}
                alt="dd"
                className="rounded w-12 h-12"
              />
            )}
            {!imgUrl && (
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  N
                </span>
              </div>
            )}
          </div>
          {task.name}
        </div>
      </td>
      <td className=" text-white ">{task.status}</td>
      <td className="flex gap-2 items-center p-8">
        <FiInfo
          className="text-blue-500"
          onClick={() => {
            router.push("/mytasks/" + task.id);
          }}
          cursor="pointer"
          size={25}
        />
        <FiEdit
          onClick={() => handleSubmitEditTodo(task.id)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg text-black">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn btn-primary text-white"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenModalDeleted(false)}
              className="btn btn-primary text-white"
            >
              No
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
