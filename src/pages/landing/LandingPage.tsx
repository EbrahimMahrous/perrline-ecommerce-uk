// ** Components
import AboutUs from "./sections/AboutUs";
import Brands from "./sections/Brands";
import CallToAction from "./sections/CallToAction";
import ContactUs from "./sections/ContactUs";
import GoFurther from "./sections/GoFurther";
import Home from "./sections/Home";
import JoinUs from "./sections/JoinUs";
import Steps from "./sections/Steps";
import Wholesaler from "./sections/Wholesaler";

export default function LandingPage() {
  return (
    <div>
      <Home />
      <Wholesaler />
      <Brands />
      <JoinUs />
      <GoFurther />
      <Steps />
      <AboutUs />
      <ContactUs />
      <CallToAction />
    </div>
  );
}
