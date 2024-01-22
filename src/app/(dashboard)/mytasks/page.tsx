import AddTask from "@/components/AddTask";
import TodoList from "@/components/TodoList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Your asynchronous functional component
export default async function mytasks() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (session?.user) {
    return (
      <main className="mx-auto  min-h-[93vh] justify-between p-8 xl:p-24 bg-zinc-100">
        <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
          <div className="text-center my-5 flex flex-row-reverse ">
            {/* <h1 className='text-2xl font-bold text-black'>Todo List App</h1> */}

            <AddTask id={session.user.id} />
          </div>
          <TodoList />
        </div>
      </main>
    );
  } else {
    return (
      <main className=" mx-auto min-h-screen justify-between p-24 bg-zinc-100">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-black">
            Please sign in to view the contents of this page
          </h1>
        </div>
      </main>
    );
  }
}