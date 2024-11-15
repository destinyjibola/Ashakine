// import { getAllPhotos } from "@/actions/uploadActions";
// import Photolist from "@/components/Photolist";

import Overview from "@/components/dashboard/Overview";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import Supporters from "@/components/dashboard/Supporters";

const page = async () => {
  // const photos = await getAllPhotos();

  return (
    <div className="flex flex-col space-y-8">
     <Overview/>
     <ProjectOverview/>
     <Supporters/>
    </div>
  );
};

export default page;
