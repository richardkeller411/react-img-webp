import * as React from "react";
import { canUseWebP } from "./canUseWebP";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  webP?: string;
  useWebP?: boolean;
}

export const Image: React.FunctionComponent<ImageProps> = React.memo(props => {
  const childProps = { ...props };
  delete childProps.webP;
  delete childProps.useWebP;

  if (props.useLazySizes) {
    return (
      <img
        {...childProps}
        data-src={(props.useWebP && props.webP) || props.src}
        className="lazyload"
      />
    );
  }
  return (
    <img {...childProps} src={(props.useWebP && props.webP) || props.src} />
  );
});

const ImageDefaultProps: {
  [k in keyof ImageProps]?: any;
} = {
  useWebP: canUseWebP()
};

Image.defaultProps = ImageDefaultProps;
