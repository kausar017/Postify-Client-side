import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

const ShareComponent = () => {
  const shareUrl = "https://example.com";
  const title = "Check this out!";

  return (
    <div>
      <FacebookShareButton url={shareUrl} quote={title}>
        Share on Facebook
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        Share on Twitter
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        Share on WhatsApp
      </WhatsappShareButton>
    </div>
  );
};

export default ShareComponent;
