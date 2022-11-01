import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const HeroImage = '../images/IMG_4610.jpeg';

export default function Hero({children}) {
  // Replaces using background-image with a grid where image and contents share the same space
  return (
    <div className="grid">
      {/* You can use a GatsbyImage component if the image is dynamic */}
      <StaticImage
        style={{
          gridArea: "1/1",
          // You can set a maximum height for the image, if you wish.
          maxHeight: 250,
        }}
        placeholder="blurred"
        layout="fullWidth"
        // You can optionally force an aspect ratio for the generated image
        //aspectRatio={3 / 1}
        // This is a presentational image, so the alt should be an empty string
        alt=""
        src={HeroImage}
        formats={["auto", "webp", "avif"]}
      />
      <div className="relative grid place-items-center"
        style={{
          // By using the same grid area for both, they are stacked on top of each other
          gridArea: "1/1",
        }}
      >
        {/* Any content here will be centered in the component */}
        {children}
      </div>
    </div>
  );
}
