import { Fragment } from "react";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import Svg from "../../../public/Assets/Svg";

export const SocialShare = ({ url = "", title = "", description = "", image = "" }) => {

    return (
        <Fragment>
            <FacebookShareButton url={url} quote={title} media={image} summary={description}>
                {Svg().FacebookGray}
            </FacebookShareButton>
            <TwitterShareButton title={title} url={url} media={image}>
                {Svg().TwitterGray}
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title} summary={description} media={image}>
                {Svg().LinkedInGray}
            </LinkedinShareButton>
            {/* <WhatsappShareButton url={url} title={title} media={image}>
                {Svg().GroupGray}
            </WhatsappShareButton> */}
        </Fragment>
    )
}
