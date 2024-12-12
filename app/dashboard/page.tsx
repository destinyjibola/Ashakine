import Overview from "@/components/dashboard/Overview";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import Supporters from "@/components/dashboard/Supporters";
import dashboardOverview from "@/helpers/dashboardOverview";
import getUserDonations from "@/helpers/getUserDonations";
import getUserProjects from "@/helpers/getUserProjects";
import { ProjectResponse } from "@/lib/types";
import { cookies } from "next/headers";
// Adjust the path to where your ProjectResponse is defined

const page = async () => {
  const cookieStore = await cookies();
  const user: { name: string; value: string } | undefined =
    cookieStore.get("user");
  const userId = user?.value;

  // Execute asynchronous calls concurrently
  const [dashboard, project, donations] = await Promise.all([
    dashboardOverview(userId),
    getUserProjects(userId),
    getUserDonations(userId),
  ]);

 
//  console.log(project);
  // Ensure project.data is an array of ProjectResponse
  // const projects = [] as ProjectResponse[]
  const projects = project.data as ProjectResponse[];
  // const donation = [] as ProjectResponse[]

  const donation = donations.data as ProjectResponse[];

  return (
    <div className="flex flex-col space-y-8">
      <Overview data={dashboard.data} />
      <ProjectOverview projects={projects} />{" "}
      <Supporters projects={donation} />
    </div>
  );
};

export default page;
