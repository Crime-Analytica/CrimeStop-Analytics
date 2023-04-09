import Image from "next/image";
export const Feature = () => {
    return (
      <section className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] mt-28 lg:mt-12 md:mt-12">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 max-w-[510px]">
            <div className="text-center lg:mb-20">
              <h2 className="mb-6 text-2xl font-bold sm:text-4xl md:text-[40px] text-white">
                Why use CrimeStop Analytics
              </h2>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="mb-8 rounded-[20px] bg-[#0a0a0a] p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                >
                  <div
                    className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                  >
                                                                           <Image src="/images/prevent.svg" className="w-16" alt={''} width={10} height={10} />

                  </div>
                  <h4 className="text-white mb-3 text-xl font-semibold">
                  Prevent and Solve Crimes
                  </h4>
                  <p className="text-body-color">
                  CrimeStop Analytics promotes partnerships between law enforcement and community organizations to foster trust and cooperation, enabling better prevention and solving of crimes                  </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="mb-8 rounded-[20px] bg-[#0A0D10] p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                >
                  <div
                    className=" mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                  >
                                                                          <Image src="/images/community.svg" className="w-16" alt={''} width={10} height={10} />

                  </div>
                  <h4 className="text-white mb-3 text-xl font-semibold">
                  Community-Focused

                  </h4>
                  <p className="text-body-color">
                  CrimeStop Analytics empowers communities to prevent crime by fostering community policing and enabling real-time communication between law enforcement and citizens, creating safer neighborhoods for all
                  </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="mb-8 rounded-[20px] bg-[#0A0D10] p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                >
                  <div
                    className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                  >
                                                                                             <Image src="/images/data.svg" className="w-16" alt={''} width={10} height={10} />

                  </div>
                  <h4 className="text-white mb-3 text-xl font-semibold">Data-Driven Insights</h4>
                  <p className="text-body-color">
                  CrimeStop Analytics uses data analysis to provide clear crime statistics, helping law enforcement and policymakers make informed decisions for safer communities.                   </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="mb-8 rounded-[20px] bg-[#0A0D10] p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                >
                  <div
                    className=" mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                  >
                                                        <Image src="/images/bell.svg" className="w-16" alt={''} width={10} height={10} />

                  </div>
                  <h4 className="text-white mb-3 text-xl font-semibold">Stay Alert</h4>
                  <p className="text-body-color">
                  Stay informed about criminal activity in your area with real-time notifications. Easily send distress signals for quick response in emergencies and stay up-to-date on missing persons and wanted criminals.   </p>             </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="mb-8 rounded-[20px] bg-[#0A0D10] p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                >
                  <div
                    className=" mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                  >
                                                                           <Image src="/images/communication.svg" className="w-16" alt={''} width={10} height={10} />

                  </div>
                  <h4 className="text-white mb-3 text-xl font-semibold">
                 Real-Time Communication

                  </h4>
                  <p className="text-body-color">
                  Our online forum provides a platform for real-time communication between community members and law enforcement, enabling quick response to crimes and effective collaboration.
                  </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="mb-8 rounded-[20px] bg-[#0A0D10] p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                >
                  <div
                    className=" mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                  >
                   
                   <Image src="/images/fc.svg" className="w-16" alt={''} width={10} height={10} />

                  </div>
                  <h4 className="text-white mb-3 text-xl font-semibold">Facial Recognition </h4>
                  <p className="text-body-color">
                  Our cutting-edge facial recognition technology empowers civilians to verify if someone suspicious has a criminal record, aiding law enforcement agencies in preventing and solving crimes more efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
    );
  };