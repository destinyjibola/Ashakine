import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();
  const {name,email, role} = session?.user

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">
        Welcome, {name}
      </h1>

      <div className="overflow-x-auto mb-10">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                Name
              </th>
              <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                Email
              </th>
              <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border text-center border-gray-300">
                {name}
              </td>
              <td className="px-4 py-2 border text-center border-gray-300">
               {email}
              </td>
              <td className="px-4 py-2 border text-center border-gray-300">{role}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="default">Log out</Button>
      </form>
    </div>
  );
};

export default page;
