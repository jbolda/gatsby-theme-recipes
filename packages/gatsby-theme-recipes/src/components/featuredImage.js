/** @jsx jsx */
import { jsx } from "../context";
import Img from "gatsby-image";

export default ({ image }) => <Img fluid={image.fluid} />;
