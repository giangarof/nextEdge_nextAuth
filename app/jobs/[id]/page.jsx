import connectDB from "@/config/database";
import Job from "@/models/Job";
import JobDetail from "@/components/JobDetail";
import { convertToSerializableObject } from "@/utils/convertToObject";

import Bookmark from "@/components/BookmarkBtn";
import ShareBtn from "@/components/ShareBtn";
import ContactForm from "@/components/ContactForm";

const JobDetails = async ({ params }) => {
  await connectDB();
  const job = await Job.findById(params.id).lean();
  const plainJob = convertToSerializableObject(job);
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start md:gap-8 p-4 max-w-7xl mx-auto">
        {/* Job Detail - grows to take available space */}
        <div className="flex-1 mb-6 md:mb-0">
          <JobDetail job={plainJob} />
        </div>

        {/* Sidebar with actions */}
        <div className="flex flex-col gap-4 md:w-80 mt-5">
          <Bookmark job={job} />
          <ShareBtn job={job} />
          <ContactForm job={job} />
        </div>
      </div>
    </>
  );
};

export default JobDetails;
