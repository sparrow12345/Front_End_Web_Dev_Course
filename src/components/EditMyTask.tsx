import { useRouter } from "next/navigation";
import { ITask, TaskStatus } from "@/types/tasks";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { editTodo } from "@/components/api";
import { Radio } from "@material-tailwind/react";

interface TaskProps {
  task: ITask;
}

const EditMyTask: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const {
    id,
    name,
    description,
    due_date,
    priority,
    status,
    color: defaultColor,
    image: defaultImage,
  } = task;

  const [taskToEdit, setTaskToEdit] = useState<string>(name);
  const [taskDetailsToEdit, setTaskDetailsToEdit] =
    useState<string>(description);
  const [taskDueDateToEdit, setTaskDueDateToEdit] = useState<string>(due_date);
  const [taskPriorityToEdit, setTaskPriorityToEdit] =
    useState<string>(priority);
  const [taskStatusToEdit, setTaskStatusToEdit] = useState<string>(status);
  const [error, setError] = useState<string>("");

  const [image, setImage] = useState<string>(
    new TextDecoder().decode(Buffer.from(defaultImage)),
  );
  const [preview, setPreview] = useState<string>("");
  const [color, setColor] = useState<string>(defaultColor); // default color

  const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  // Handle image file change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (taskToEdit.trim() === "") {
      setError("No Name?!");
      return;
    } else if (taskDetailsToEdit.trim() === "") {
      setError("No Details?!");
      return;
    }

    const res = await editTodo({
      id,
      name: taskToEdit,
      description: taskDetailsToEdit,
      due_date: taskDueDateToEdit,
      priority: taskPriorityToEdit,
      status: taskStatusToEdit as TaskStatus,
      image: image,
      color: color,
    });
    if (res) {
      setTimeout(() => {
        router.push("/mytasks");
      }, 300);
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-10">
      <form id="1" className="space-y-1" onSubmit={handleSubmitEditTodo}>
        <h4>Name:</h4>
        <input
          value={taskToEdit}
          onChange={(e) => setTaskToEdit(e.target.value)}
          type="text"
          placeholder={taskToEdit}
          className="input input-bordered w-full h-30 bg-gray-300"
        />
        <h4>Description:</h4>
        <textarea
          value={taskDetailsToEdit}
          onChange={(e) => setTaskDetailsToEdit(e.target.value)}
          placeholder={taskDetailsToEdit}
          className="input input-bordered w-full h-40 bg-gray-300 p-2" // p-2.5
        />

        <h4>Due Date:</h4>
        <input
          type="date"
          value={
            taskDetailsToEdit &&
            new Date(taskDueDateToEdit).toISOString().split("T")[0]
          }
          onChange={(e) => setTaskDueDateToEdit(e.target.value)}
          className="input input-bordered w-full bg-gray-300"
        />

        <h4>Priority:</h4>
        <select
          value={taskPriorityToEdit}
          onChange={(e) => setTaskPriorityToEdit(e.target.value)}
          className="select select-bordered w-full bg-gray-300"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <h4>Status:</h4>
        <select
          value={taskStatusToEdit}
          onChange={(e) => setTaskStatusToEdit(e.target.value)}
          className="select select-bordered w-full bg-gray-300"
        >
          <option value="Todo">Todo</option>
          <option value="InProgress">InProgress</option>
          <option value="Done">Done</option>
        </select>
        <h4>Image:</h4>
        <input
          type="file"
          onChange={handleImageChange}
          className="input input-bordered w-full bg-gray-300 p-2"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2"
          />
        )}

        <div className="flex gap-10 flex-nowrap">
          <div className="p-2 text-gray-700"> Color:</div>
          <Radio
            name="type"
            label="Green"
            color="green"
            value="green"
            crossOrigin="cross"
            defaultChecked={color === "green"}
            onChange={handleColor}
          />
          <Radio
            name="type"
            label="Red"
            color="red"
            value="red"
            crossOrigin=""
            defaultChecked={color === "red"}
            onChange={handleColor}
          />
          <Radio
            name="type"
            label="Blue"
            color="blue"
            value="blue"
            crossOrigin=""
            defaultChecked={color === "blue"}
            onChange={handleColor}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="btn btn-primary text-white w-full md:w-1/2  mx-auto"
          >
            Edit Task
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
};

export default EditMyTask;