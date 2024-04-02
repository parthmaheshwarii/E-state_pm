import Image from "next/image";
import Link from "next/link";
import "./page.css";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Welcome to the College Estate Department</h1>
          <p>
            Explore our services for managing and maintaining our campus estate.
          </p>
        </div>
      </section>
      <br />
      <section className="services">
        <div className="service-container" id="our-services">
          <h2>Our Services</h2>
          <div className="service">
            <div className="flex px-8 py-3 justify-end mx-5 rounded-md shadow-md border-2 flex-col">
              <div className="land-and-building flex justify-center items-center my-5 ">
                <Image
                  src="/land and building.jpg"
                  alt="Booking service img"
                  height="400"
                  width="400"
                />
              </div>
              <h3>Booking Service</h3>
              <p>
                Book facilities and spaces for events, meetings, and other
                purposes.
              </p>
              <Link href={"/book"} className="service-button">
                Book Now
              </Link>
            </div>
            <div className="flex px-8 py-3 justify-end mx-5 rounded-md shadow-md border-2 flex-col">
              <div className="repair flex justify-center items-center my-5">
                <Image
                  src="/repair image.jpg"
                  alt="Damage and repair img"
                  height="400"
                  width="400"
                />
              </div>
              <h3>Damage Repair Service</h3>
              <p>
                Report damages and request repairs for campus buildings and
                facilities.
              </p>
              <Link href={"/repair"} className="service-button">
                Request Repair
              </Link>
            </div>
          </div>
        </div>
      </section>
      <br />
      <section className="row ">
        <div className="container ">
          <section className="gallery" id="gallery">
            <h2>Gallery</h2>

            <Gallery />

            {/* <!-- Add more images with appropriate classNamees --> */}
          </section>
        </div>
      </section>
      <section id="find-us" className="bg-white">
        <div className="p-5 text-center">
          <h2 className="text-3xl mx-auto my-5">Find Us</h2>
          <div className="landbuilding flex justify-center  p-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3078.7886798051395!2d85.4412176639987!3d23.4128987622601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBIT%20Mesra%20College%20Campus%2CMesra!5e0!3m2!1sen!2sin!4v1712046493685!5m2!1sen!2sin"
              width="600"
              height="450"
              className="border-0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* <Image
              src="/bit-building.jpeg"
              alt="Booking service img"
              height="400"
              width="400"
              className="mx-auto"
            /> */}
          </div>
          <p className="my-2">
            Explore information about our colleges land and building
            infrastructure.
          </p>
        </div>
      </section>
    </>
  );
}
