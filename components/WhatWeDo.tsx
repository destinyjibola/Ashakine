import ServiceCard from "./ServiceCard";
import birthday from "../assets/crowdfund/birthday.webp";
import church from "../assets/crowdfund/chuch.jpeg";
import community from "../assets/crowdfund/community.jpeg";

const WhatWeDo = () => {
  return (
    <section id="welcome" className="container-spacing section-spacing ">
      <h2 className="text-center primaryheading mb-10 text-custom-gray">
      What we offer
      </h2>
      <div className="mx-auto grid grid-cols-3 gap-4 w-[90%]">
        <ServiceCard
          title="Celebrate Life’s Moments with Support"
          description="Create a campaign for your special moments, whether it's birthdays, weddings, funerals, or any personal need. Let friends and family rally behind you."
          imageSrc={birthday.src}
          altText="Trauma Care"
          link="/service#trauma-care"
        />

        <ServiceCard
          title="Transforming Communities, Together"
          description="Start a campaign to repair bridges, improve schools, or enhance local infrastructure. Connect with neighbors and make a lasting difference."
          imageSrc={church.src}
          altText="Trauma Care"
          link="/service#trauma-care"
        />
        <ServiceCard
          title="Empowering Faith and Fellowship"
          description="Support church projects, tithing, or mission efforts. Mobilize your faith community and make an impact, publicly or privately."
          imageSrc={community.src}
          altText="Trauma Care"
          link="/service#trauma-care"
        />
      </div>
    </section>
  );
};

export default WhatWeDo;
