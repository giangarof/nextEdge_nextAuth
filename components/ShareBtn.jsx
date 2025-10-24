"use client";
import { FaShare } from "react-icons/fa";
import {
  FacebookShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
const ShareBtn = ({ job }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/jobs/${job._id}`;
  return (
    <div>
      <div className="flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg hover:bg-cyan-100 transition">
        <h3>Share this job</h3>
        <FacebookShareButton
          url={shareUrl}
          quote={job.title}
          hashtag={`#${job.title.replace(/\s/g, "")} role at ${job.company}`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={job.title}
          hashtags={[`${job.title.replace(/\s/g, "")} role at ${job.company}`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={job.title}
          separator="::"
          // hashtags={[`${job.title.replace(/\s/g, "")} role at ${job.company}`]}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={job.title}
          body={`Check out this new job: ${shareUrl}`}
          // hashtags={[`${job.title.replace(/\s/g, "")} role at ${job.company}`]}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareBtn;
