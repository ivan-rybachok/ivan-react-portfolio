import React from "react";
import { Mail, MapPin } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "../types";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {
  pageInfo: PageInfo;
};

function ContactMe({ pageInfo }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:${pageInfo.email}?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`;
  };

  return (
    <div className="flex relative flex-col text-center md:text-left max-w-7xl justify-evenly mx-auto items-center pt-20 md:pt-32 pb-16">
      <h3 className="section-title mt-24">Contact</h3>

      <div className="flex flex-col space-y-8 mt-5">
        <h4 className="dark:text-gray_300 text-lg md:text-3xl font-semibold text-center">
          Got something for me?{" "}
          <span className="underline decoration-[#F7AB0A]/50 underline-offset-4">
            Gotcha!
          </span>
        </h4>

        <div className="space-y-2 lg:space-y-4 flex flex-col items-start mx-auto">
          <div className="flex items-center space-x-3 justify-center">
            <Mail className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="dark:text-gray_300 text-md md:text-2xl">
              {pageInfo.email}
            </p>
          </div>

          <div className="flex items-center space-x-3 justify-center">
            <MapPin className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="dark:text-gray_300 text-md md:text-2xl">
              {pageInfo.address}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 mx-auto max-w-sm"
        >
          <div className="flex gap-3 flex-wrap sm:flex-nowrap">
            <input
              required
              {...register("name")}
              placeholder="Name"
              className="contact-input w-full"
              type="text"
            />
            <input
              required
              {...register("email")}
              placeholder="Email"
              className="contact-input w-full"
              type="text"
            />
          </div>

          <input
            required
            {...register("subject")}
            placeholder="Subject"
            className="contact-input"
            type="text"
          />

          <textarea
            required
            {...register("message")}
            placeholder="Message"
            className="contact-input resize-none overflow-y-auto scrollbar-thin scrollbar-track-gray_50/40 scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-thumb-blue_900 h-32"
          />

          <button
            type="submit"
            className="bg-[#F7AB0A] transition-all hover:bg-[#F7AB0A] text-gray_100 rounded-md font-bold py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactMe;
