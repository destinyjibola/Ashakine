
import CircularProgressBar from "./CircularProgressBar";

const ProjectOverviewCard = () => {
  return (
    <div 
      className="grid grid-cols-2 border-2 gap-4 cursor-pointer border-bordercolor rounded-xl shadow-lg px-5 py-5 transition-all transform hover:bg-gray-100 hover:shadow-xl hover:shadow-gray-400/50 duration-300 ease-in-out">
      <div>
        <CircularProgressBar
          progress={30}
          size={160}
          strokeWidth={15}
          duration={1500}
        />
      </div>

      <div>
        <h2 className="paragraph-4 mb-2">Ade’s kidney surgery</h2>

        <div className="flex flex-col space-y-1">
          <div>
            <span className="paragraph-3 text-custom-gray-300">Target:</span>{" "}
            <span className="paragraph-3">$5,000</span>
          </div>
          <div>
            <span className="paragraph-3 text-custom-gray-300">Donation:</span>{" "}
            <span className="paragraph-3">$2,000</span>
          </div>

          <div>
            <span className="paragraph-3 text-custom-gray-300">Supporters:</span>{" "}
            <span className="paragraph-3">400</span>
          </div>

          <div>
            <span className="paragraph-3 text-custom-gray-300">Start on:</span>{" "}
            <span className="paragraph-3">11/11/2024</span>
          </div>

          <div>
            <span className="paragraph-3 text-custom-gray-300">Ends on:</span>{" "}
            <span className="paragraph-3">11/12/2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewCard;
