import useTilt from '../hooks/useTilt.js';

/** Wrapper that applies the 3D tilt hook to any card element. */
export default function TiltCard({ as: Tag = 'article', max = 10, glare = true, className, children, ...rest }) {
  const ref = useTilt({ max, glare });
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
