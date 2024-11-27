import birthday from "../assets/crowdfund/birthday.webp";
import church from "../assets/crowdfund/chuch.jpeg";
import community from "../assets/crowdfund/community.jpeg";
import DonationCard from "./DonationCard";

const DonationSection = () => {
  
  return (
    <section id="donation" className="container-spacing section-spacing ">
      <h2 className=" primaryheading mb-10 text-custom-gray">
      Donations
      </h2>
      <div className="mx-auto grid grid-cols-3 gap-4">
        <DonationCard
          title="Raise funds for health"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
          imageSrc={birthday.src}
          altText="Trauma Care"
          link="/service#trauma-care"
        />

        <DonationCard
          title="Area a Community projects"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
          imageSrc={church.src}
          altText="Trauma Care"
          link="/service#trauma-care"
        />
        <DonationCard
          title="donation for flood disaster"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
          imageSrc={community.src}
          altText="Trauma Care"
          link="/service#trauma-care"
        />
      </div>
    </section>
  );
};

export default DonationSection;
